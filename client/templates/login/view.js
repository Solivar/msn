/**
 * Login view template functions.
 */
Template.login_view.events({
    /**
     * Log user into the system.
     *
     * @param e
     */
    'submit #user-login-form': function (e) {
        e.preventDefault();

        var email = $('#user-login-form-email').val(),
            password = $('#user-login-form-password').val();

        /* TODO: Implement input value check */
        Meteor.loginWithPassword(email, password, function (error) {
            if (error) {
                /* TODO: Implement error output in client */
                console.log(error.reason);
            } else {
                FlowRouter.go('home');
            }
        });
    }
});