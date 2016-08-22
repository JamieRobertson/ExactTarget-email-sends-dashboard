import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Emails = new Mongo.Collection('emails');

  // Publish documents with useful data to the client
  Meteor.publish('emails', function() {  // emails.public
  	return Emails.find({
  		// UserGroup: 'Figure'
  		NumberSent: {$gt: 0}, 
  		UserGroup: {$nin: ['Test']}
  	}, {
  		fields: {
  			UserGroup: 1,
  			SentDate: 1,
  			OpenRate: 1,
  			ClickThroughRate: 1,
  			UnsubscribeRate: 1
  		},
  		sort: {SentDate: 1}  // This sorts all data by ascending date - '-1' makes it descending  // http://meteor.hromnik.com/blog/how-to-sort-collections-in-meteor
  	});
  });  // , {is_auto: true} // this is to disable autopublish warning - can also be disabled on command line

});