/**
 * User profile message template functions.
 */
Template.user_profile_message_view.events({
    'submit #user-profile-message-form': function (e) {
        e.preventDefault();

        let message = $('#user-profile-message-form-message').val(),
            user    = Template.instance().data;

        Meteor.call('addProfileMessage', user._id, message, (error, result) => {
            if (!error && result) {
                document.location.reload(true);
            } else {
                $('.error-profile-message').text(error.reason);
            }
        });
    }
});