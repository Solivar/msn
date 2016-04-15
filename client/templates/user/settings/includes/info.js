/**
 * Change user information settings template functions.
 */
Template.user_settings_includes_info.events({
    /**
     * Change user information.
     *
     * @param e
     */
    'submit #user-info-form': function (e) {
        e.preventDefault();

        var firstname = $('#user-info-form-firstname').val(),
            lastname = $('#user-info-form-lastname').val();

        /* TODO: Implement input value check */
        /* TODO: Pass data as object in 1 param */
        Meteor.call('changeUserInfo', firstname, lastname, function (error, result) {
            if (!error) {
                console.log('success');
            }
        });
    }
});