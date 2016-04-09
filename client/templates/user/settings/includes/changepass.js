/**
 * Change user password template functions.
 */
Template.user_settings_includes_changepass.events({
    /**
     * Change user account password.
     *
     * @param e
     */
    'submit #user-changepass-form': function (e) {
        e.preventDefault();

        var oldPassword = $('#user-changepass-form-old').val(),
            newPassword = $('#user-changepass-form-new').val();

        /* TODO: Implement input value check */
        Accounts.changePassword(oldPassword, newPassword, function (error) {
            if (error) {
                /* TODO: Implement error output in client */
                console.log(error.reason);
            } else {
                console.log('Password changed');
            }
        });
    }
});