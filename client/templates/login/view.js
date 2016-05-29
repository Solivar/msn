/**
 * Login view template functions.
 */
Template.login_view.onCreated(function () {
    document.title = 'MSN - Login';
});

Template.login_view.onRendered(function () {
    /* jQuery Validation */
    $('#user-login-form').validate({
        rules : {
            email : {
                required: true
            },
            password : {
                required: true
            }
        },

        messages: {
            email : {
                required: 'Email is required'
            },
            password : {
                required: 'Password is required'
            }
        }
    });
});

Template.login_view.events({
    /**
     * Log user into the system.
     *
     * @param e
     */
    'submit #user-login-form': function (e) {
        e.preventDefault();

        var email    = $('#user-login-form-email').val(),
            password = $('#user-login-form-password').val();

        Meteor.loginWithPassword(email, password, function (error) {
            if (error) {
                $('.error-login').text(error.reason);
            } else {
                FlowRouter.go('home');
            }
        });
    }
});