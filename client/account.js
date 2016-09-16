import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.account.events({
	'click #logoutBtn'(event){
		event.preventDefault();

		Meteor.logout();
	},
	'click #loginBtn'(event, instance){
		event.preventDefault();

		// create modal effect
		$("body").toggleClass("loginIsOpen");
	},
	'click #registerBtn'(event, instance){
		event.preventDefault();

		$("body").toggleClass("registerIsOpen");
	},
});

Template.login.events({
	'submit form'(event){
		event.preventDefault();

		let	email = event.target.email.value;
		let	password = event.target.password.value;
		Meteor.loginWithPassword(email, password);

		//$('#email').val('');
		//$('#password').val('');
		$("body").toggleClass("loginIsOpen");
	},
	'click #cancelLogin'(event){
		event.preventDefault();

		$("body").toggleClass("loginIsOpen");
	},
});

Template.register.events({
	'submit form'(event){
		event.preventDefault();

		// jQuery bugging here, thus avoiding jQuery methods
		let username = event.target.username.value;
		let	email = event.target.email.value;
		let	password= event.target.password.value;

		Accounts.createUser({
			username: username,
			email: email,
			password: password
			}, function(error) {
				if (error){
					console.log(error);
				}else{
					console.log("Success creating an account!");
				}
			});

		$('#username').val('');
		event.target.email.value = '';
		event.target.password.value = '';
		$("body").toggleClass("registerIsOpen");
	},
	'click #cancelRegister'(event){
		event.preventDefault();

		$("body").toggleClass("registerIsOpen");
	},
});
