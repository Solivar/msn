/**
 * My profile template functions.
 */
Template.user_my_profile_view.onCreated(function () {
    /* Run Tracker autorun to ensure that the document.title and subscription gets updated
     * because FlowRouter does not re-render templates on route parameter change
     * which causes problems when navigating from one user profile to another.
     */
    this.autorun(function () {
        this.userId = FlowRouter.getParam('userId');

        this.subscribe('userProfile', this.userId, () => {
            let user = this.userId ? Meteor.users.findOne({ _id : this.userId }) : Meteor.users.findOne({ _id : Meteor.userId() });

            this.userId ? document.title = `MSN - ${user.profile.firstname} ${user.profile.lastname}` : document.title = 'MSN - My Profile';
        });

        if (this.userId) {
            let friendStatus = this.subscribe('friendStatus', this.userId);
        }
    }.bind(Template.instance()));
});

Template.user_my_profile_view.helpers({
    /**
     * Get currently open user profile data.
     *
     * @returns {Object}
     */
    getUser: function () {
        let template = Template.instance();

        if (template.userId) {
            return Meteor.users.findOne({ _id : template.userId });
        }

        return Meteor.users.findOne({ _id : Meteor.userId() });
    },

    /**
     * Check if user is viewing their own profile.
     *
     * @returns {Boolean}
     */
    isMyProfile: function () {
        return !Template.instance().userId;
    },

    /**
     * Check if friend request can be sent.
     *
     * @returns {Boolean}
     */
    canInvite: function () {
        return !Requests.findOne({ 'isPending' : true });
    },

    /**
     * Check if user that is being viewed has sent current user a friend request.
     *
     * @returns {Object | Boolean}
     */
    canAccept: function () {
        let template = Template.instance();

        if (template.userId) {
            return Requests.findOne({ 'isPending' : true, 'inviter' : template.userId });
        }

        return false;
    }
});