/**
 * My profile template functions.
 */
Template.user_my_profile_view.onCreated(function () {
    document.title = 'MSN - My Profile';
    this.subscribe('userProfile', Meteor.userId());
});

Template.user_my_profile_view.helpers({
    /**
     * Get currently open user profile data.
     *
     * @returns {Object}
     */
    getUser: function () {
        return Meteor.users.findOne({ _id : Meteor.userId() });
    }
    
});