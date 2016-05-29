/**
 * Change user password template functions.
 */

Template.user_settings_includes_changepass.onCreated(function () {
    document.title = 'MSN - Change Password';
});

Template.user_settings_includes_changepass.onRendered(function () {
    /* jQuery Validation */
    $('#user-changepass-form').validate({
        rules : {
            password_old : {
                required : true
            },
            password : {
                required : true
            },
            password_repeat : {
                required : true,
                equalTo  : '#user-changepass-form-new'
            }
        },

        messages: {
            password_old : {
                required : 'Old password is required'
            },
            password : {
                required : 'New password is required'
            },
            password_repeat : {
                required : 'Repeated new password is required',
                equalTo  : 'Passwords must match'
            }
        }
    });
});

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

        Accounts.changePassword(oldPassword, newPassword, function (error) {
            if (error) {
                $('.error-changepass').text(error.reason);
            } else {
                $('.error-changepass').text('');
                $('#user-changepass-form').trigger('reset');
            }
        });
    }
});