/**
 * User profile template functions.
 */
Template.user_profile_view.onCreated(function () {
    this.subscribe('userProfiles', function () {
        var userId = FlowRouter.getParam('userId'),
            user = userId ? Meteor.users.findOne({ _id : userId }) : Meteor.users.findOne({ _id : Meteor.userId() });

        userId ? document.title = `MSN - ${user.profile.firstname} ${user.profile.lastname}` : document.title = 'MSN - My Profile';
    });
});

Template.user_profile_view.events({

});

Template.user_profile_view.helpers({
    /**
     * Get currently open user profile data.
     *
     * @returns {Object}
     */
    getUser: function () {
        var userId = FlowRouter.getParam('userId');

        if (userId) {
            return Meteor.users.findOne({ _id : userId });
        }

        return Meteor.users.findOne({ _id : Meteor.userId() });
    }
});