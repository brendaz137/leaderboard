import { Meteor } from 'meteor/meteor';
PlayersList = new Mongo.Collection('players');
console.log("Hello World");

Meteor.startup(() => {
  // code to run on server at startup
});
