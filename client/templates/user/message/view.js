/**
 * User profile message template functions.
 */
Template.user_profile_message_view.onCreated(function () {

});

Template.user_profile_message_view.events({
    'submit #user-profile-message-form': function (e) {
        e.preventDefault();

        let message = $('#user-profile-message-form-message').val(),
            user    = Template.instance().data;

        console.log(message);
        console.log(user._id);

        Meteor.call('addProfileMessage', user._id, message, (error, result) => {
            if (!error && result) {
                console.log('added');
            } else {
                console.log(error);
            }
        });
    }
});
