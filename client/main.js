import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';

import './main.html';

/* Section*/

Template.ratingboard.helpers({
	user(){
		let currentUser = Meteor.userId();
		return Meteor.users.find({_id: {$ne: currentUser}});
	},
	ratingExisted(){
		let documentId = this._id;

		let currentUser = Meteor.userId();

		let collect = Ratings.findOne({owner: documentId, author: currentUser});
		console.log("collect:", collect);

		if(collect != undefined){
			return collect;
			console.log("here");
		}else{
			return {
				owner: documentId,
				mutable: true,
				rating: 0,
			};
		}
	},
});
Template.ratingboard.events({
	'click .stars'(event){
		event.preventDefault();

		/*
		// 5 minutes represented in milliseconds
		const countDown = 300000;*/

		let currentUser = Meteor.userId();
		let currentUserName = Meteor.user().username;

		let ownerId = this.id;
		let point = $(event.currentTarget).data('userrating');		
		//console.log("id:", ownerId);

		let collect = Ratings.findOne({owner: ownerId, author: currentUser});

		if(collect === undefined){
			Ratings.insert({
					owner: ownerId,
					author: currentUser,
					authorName: currentUserName,
					rating: point,
					createdAt: new Date(),
					mutable: false
				}, function(error, result){
					if(error){
						console.log(error);
					}else{
						console.log("Success inserting a rating!");
						/*Meteor.setTimeout(function(){
							removeRatings(result);
						}, countDown);*/
					}
			});
		}else{
			return;
		}
	},
});

Template.myratings.helpers({
	data(){
		let currentId = Meteor.userId();

		return collect = Ratings.find({owner: currentId});
	},
});

/*let removeRatings = function(resultId){
	Ratings.remove({_id: resultId});
	console.log("Remove function executed!");
}*/





