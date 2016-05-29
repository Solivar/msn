/**
 * User profile template functions.
 */
Template.user_profile_view.onCreated(function () {
    /* Run Tracker autorun to ensure that the document.title and subscription gets updated
     * because FlowRouter does not re-render templates on route parameter change
     * which causes problems when navigating from one user profile to another.
     */
    this.autorun(function () {
        this.userId = FlowRouter.getParam('userId');

        this.subscribe('userProfile', this.userId, () => {
            let user = Meteor.users.findOne({ _id : this.userId });

            document.title = `MSN - ${user.profile.firstname} ${user.profile.lastname}`;
        });

        this.subscribe('requestStatus', this.userId);
        this.subscribe('friendStatus', this.userId);
    }.bind(Template.instance()));
});

Template.user_profile_view.events({
    /**
     * Send a friend request.
     *
     * @param {Object} e Event
     */
    'click .request-friend': function (e) {
        e.preventDefault();

        Meteor.call('sendFriendRequest', this._id);
    },

    /**
     * Accept a friend request.
     *
     * @param {Object} e Event
     */
    'click .action-accept': function (e) {
        e.preventDefault();

        Meteor.call('acceptFriendRequest', this._id);
    },

    /**
     * Deny a friend request.
     *
     * @param {Object} e Event
     */
    'click .action-deny': function (e) {
        e.preventDefault();

        Meteor.call('denyFriendRequest', this._id);
    },

    /**
     * Toggle user block state.
     *
     * @param {Object} e Event
     */
    'click .action-ban': function (e) {
        e.preventDefault();

        Meteor.call('toggleUserBlock', this._id);
    },

    /**
     * Remove user as a friend.
     *
     * @param {Object} e Event
     */
    'click .action-unfriend': function (e) {
        e.preventDefault();

        Meteor.call('removeFriend', this._id);
    }
});

Template.user_profile_view.helpers({
    /**
     * Get currently open user profile data.
     *
     * @returns {Object}
     */
    getUser: function () {
        return Meteor.users.findOne({ _id : Template.instance().userId });
    },

    /**
     * Check if user is friend.
     *
     * @returns {Object}
     */
    getFriendship: function () {
        return Friends.findOne({ 'isActive' : { $ne : false } });
    },

    /**
     * Check if friend request is already sent.
     *
     * @returns {Object}
     */
    getRequest: function () {
        return Requests.findOne({ 'isPending' : true });
    },

    /**
     * Check if user that is being viewed has sent current user a friend request.
     *
     * @returns {Object}
     */
    canAccept: function () {
        return Requests.findOne({ 'isPending' : true, 'inviter' : Template.instance().userId });
    },

    /**
     * Check if friend request can be sent.
     *
     * @returns {Boolean}
     */
    canAddFriend: function () {
        return !Friends.findOne({ 'isActive' : { $ne : false } }) && !Requests.findOne({ 'isPending' : true });
    },

    /**
     * Check if current user is admin.
     * 
     * @returns {Boolean}
     */
    canBan: function () {
        return Meteor.user().isAdmin;
    },

    isBanned: function () {
        let user = Meteor.users.findOne({ _id : Template.instance().userId });

        return user.isBlocked;
    }
});