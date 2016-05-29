/**
 * User profile message list template functions.
 */
Template.user_profile_message_list.onCreated(function () {
    this.messages = new ReactiveVar([]);
    /* Passed from profile view as data */
    this.userId = this.data.userId;

    this.autorun(function () {
        this.userId = FlowRouter.getParam('userId') ? FlowRouter.getParam('userId') : this.data.userId;
        this.subscribe('profileMessages', this.userId, () => {
            let profileMessages = ProfileMessages.find({ 'isDeleted' : { $ne : false }}, { sort : { 'createdAt' : -1 }}).fetch(),
                authorIds       = _.uniq(_.pluck(profileMessages, 'author'));

            Meteor.call('getRequestedUsers', authorIds, (error, result) => {
                if (!error && result) {

                    /* Bind message author first and last name to the message object
                     * Binding data like this means that the data is not going to be
                     * reactive within the template and page refresh will be necessary
                     * to load data changes.
                     */
                    _.each(profileMessages, (message) => {
                        _.each(result, (author) => {
                            if (message.author === author._id) {
                                _.extend(message, author.profile);
                            }
                        });
                    });

                    this.messages.set(profileMessages);
                }
            });
        });
    }.bind(Template.instance()));

});

Template.user_profile_message_list.helpers({
    /**
     * Get user profile messages.
     *
     * @returns {Array}
     */
    getMessages: function () {
        return Template.instance().messages.get();
    },

    /**
     * Check if profile belongs to user.
     *
     * @returns {Boolean}
     */
    isProfileOwner: function () {
        return Template.instance().data.userId === Meteor.userId() || Meteor.user().isAdmin;
    }
});

Template.user_profile_message_list.events({
    /**
     * Remove specified profile message.
     *
     * @param e
     */
    'click .remove-message': function (e) {
        e.preventDefault();

        /* this._id represents current message id in template */
        Meteor.call('removeProfileMessage', this._id, (error, result) => {
            if (!error) {
                document.location.reload(true);
            }
        });
    }
});