/**
 * Admin blocked users template functions.
 */

Template.admin_blocked_users_view.onCreated(function () {
    this.subscribe('bannedUsers');
});

Template.admin_blocked_users_view.helpers({
    /**
     * Get a list of blocked users.
     *
     * @returns {Array}
     */
    getBannedUsers: function () {
        return Meteor.users.find({ 'isBlocked' : true }).fetch();
    }
});