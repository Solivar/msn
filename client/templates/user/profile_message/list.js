/**
 * User profile message list template functions.
 */
Template.user_profile_message_list.onCreated(function () {
    this.userId   = FlowRouter.getParam('userId');
    this.messages = new ReactiveVar([]);

    this.subscribe('profileMessages', this.userId, () => {
        this.messages.set(ProfileMessages.find({}).fetch());
    });
});

Template.user_profile_message_list.helpers({
    getMessages: function () {
        console.log(Template.instance().messages.get());
        return Template.instance().messages.get();
    }
});