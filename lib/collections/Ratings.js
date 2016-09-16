Ratings = new Mongo.Collection("ratings");


//Collection2
var Schemas = {};

Schemas.Rating = new SimpleSchema({
	owner:{
		type: String
	},
	author: {
		type: String
	},
	authorName: {
		type: String
	},
	rating: {
		type: Number
	},
	createdAt: {
		type: Date
	},
	mutable: {
		type: Boolean
	}
});

Ratings.attachSchema(Schemas.Rating);




