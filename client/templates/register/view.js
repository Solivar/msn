/**
 * Register view template functions.
 */
Template.register_view.onCreated(function () {
    document.title = 'MSN - Register';
});

Template.register_view.events({
    /**
     * Register user in the sytem.
     *
     * @param e
     */
    'submit #user-register-form': function (e) {
        e.preventDefault();

        /* TODO: Password repeat */
        var email = $('#user-register-form-email').val(),
            password = $('#user-register-form-password').val();

        Accounts.createUser({
            email    : email,
            password : password
        }, function (error) {
            if (!error) {
                FlowRouter.go('home');
            }
        });
    }
});