/**
 * User profile template functions.
 */
Template.user_profile_view.onCreated(function () {
    /* Run Tracker autorun to ensure that the document.title and subscription gets updated
     * because FlowRouter does not re-render templates on parameter change
     * which causes problems when navigating from on user profile to another.
     */
    this.autorun(function () {
        let userId = FlowRouter.getParam('userId');

        this.subscribe('userProfile', userId, function () {
            let user = userId ? Meteor.users.findOne({ _id : userId }) : Meteor.users.findOne({ _id : Meteor.userId() });

            userId ? document.title = `MSN - ${user.profile.firstname} ${user.profile.lastname}` : document.title = 'MSN - My Profile';
        });

        if (userId) {
            let friendStatus = this.subscribe('friendStatus', userId);
        }
    }.bind(Template.instance()));
});

Template.user_profile_view.events({
    'click .add-friend': function () {
        /* this represents current user document */
        Meteor.call('sendFriendRequest', this._id, function (error, result) {
            if (!error) {
                console.log(`Request sent ${result}`);
            } else {
                console.log(error);
            }
        });
    }
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
    },

    /**
     * Check if user is viewing their own profile.
     *
     * @returns {String}
     */
    isMyProfile: function () {
        var userId = FlowRouter.getParam('userId');

        return !userId;
    },

    /**
     * Check if friend request can be sent.
     *
     * @returns {Boolean}
     */
    canInvite: function () {
        return !Requests.findOne({ 'isPending' : true });
    }
});