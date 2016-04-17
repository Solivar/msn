/**
 * User profile template functions.
 */
Template.user_profile_view.onCreated(function () {
    Meteor.subscribe('userProfiles');
});

Template.user_profile_view.events({

});

Template.user_profile_view.helpers({
    getUser: function () {
        var userId = FlowRouter.getParam('userId');

        if (userId) {
            return Meteor.users.findOne({ _id : userId });
        }

        return Meteor.users.findOne({ _id : Meteor.userId() });
    }
});