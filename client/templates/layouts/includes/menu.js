/**
 * Menu layout includes functions.
 */
Template.layouts_includes_menu.helpers({
    /**
     * Check if user is admin.
     *
     * @returns {Object}
     */
    isAdmin: function () {
        return Meteor.users.findOne({ '_id' : Meteor.userId(), 'isAdmin' : true });
    }
});