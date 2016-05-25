/**
 * User profile message list template functions.
 */
Template.user_profile_message_list.onCreated(function () {
    this.userId   = FlowRouter.getParam('userId');
    this.messages = new ReactiveVar([]);

    this.subscribe('profileMessages', this.userId, () => {
        let profileMessages = ProfileMessages.find({}).fetch(),
            authorIds       = _.uniq(_.pluck(profileMessages, 'author'));

        Meteor.call('getRequestedUsers', authorIds, (error, result) => {
            if (!error && result) {

                /* Bind message author first and last name to the message object */
                _.each(profileMessages, (message) => {
                    _.each(result, (author) => {
                        if (message.author === author._id) {
                            _.extend(message, author.profile);
                        }
                    });
                });

                this.messages.set(profileMessages);
            } else {
                console.log(error);
            }
        });
    });
});

Template.user_profile_message_list.helpers({
    /**
     * Get user profile messages.
     *
     * @returns {Array}
     */
    getMessages: function () {
        return Template.instance().messages.get();
    }
});