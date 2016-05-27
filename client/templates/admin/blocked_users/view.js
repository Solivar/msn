/**
 * Admin blocked users template functions.
 */

Template.admin_blocked_users_view.onCreated(function () {
    this.bannedUsers = new ReactiveVar([]);

    this.subscribe('bannedUsers', () => {
        this.bannedUsers.set(Meteor.users.find({ 'isBlocked' : true }).fetch());
        console.log(Meteor.users.find({}).fetch());
        console.log(this.bannedUsers.get());
    });
});

Template.admin_blocked_users_view.helpers({
    getBannedUsers: function () {
        return Template.instance().bannedUsers.get();
    }
});