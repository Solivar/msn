/**
 * User profile template functions.
 */
Template.user_profile_view.events({

});

Template.user_profile_view.helpers({
    getUser: function () {
        console.log(Meteor.users.find({ _id : FlowRouter.getParam('userId') }));
        return Meteor.users.find({ _id : FlowRouter.getParam('userId') }).fetch();
    }
});