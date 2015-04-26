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

      Tasks.insert({text: value, createdAt: new Date()});

      $input.val('');
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