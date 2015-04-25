// if (Meteor.isClient) {
//   // counter starts at 0
//   Session.setDefault('counter', 0);

//   Template.hello.helpers({
//     counter: function () {
//       return Session.get('counter');
//     }
//   });

//   Template.hello.events({
//     'click button': function () {
//       // increment the counter when button is clicked
//       Session.set('counter', Session.get('counter') + 1);
//     }
//   });
// }

// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }

var Tasks = new Mongo.Collection("tasks");

if( Meteor.isClient ){
  
  Template.body.helpers({
    tasks: function(){
      return Tasks.find({});
    }
  });

  Template.create.events({
    'click .js-add': function(event, template){
      var $input = template.$('.js-text'),
          value = $input.val();

      Tasks.insert({
        text: value,
        createdAt: new Date()
      });
    }
  });

  Template.task.events({
    'click .js-del': function(){
      Tasks.remove(this._id);
    },
    'change .js-check': function(event, template){
      Tasks.update(this._id, {$set:{
        checked: !this.checked
      }});
    }
  });
}