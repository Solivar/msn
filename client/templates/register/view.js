/**
 * Register view template functions.
 */
Template.register_view.onCreated(function () {
    document.title = 'MSN - Register';
});

Template.register_view.onRendered(function () {
    const maxDate = moment().subtract(4, 'years');

    $('#user-register-form-dob').datetimepicker({
        format: 'MMMM Do YYYY',
        useCurrent: false,
        defaultDate: maxDate,
        maxDate: maxDate
    });

    /* jQuery Validation */
    $('#user-register-form').validate({
        rules : {
            email : {
                required : true,
                email    : true
            },
            email_repeat : {
                required : true,
                email    : true,
                equalTo  : '#user-register-form-email'
            },
            password : {
                required : true
            },
            password_repeat : {
                required : true,
                equalTo  : '#user-register-form-password'
            },
            firstname : {
                required : true
            },
            lastname : {
                required : true
            }
        },

        messages: {
            email: {
                required : 'Email is required',
                email    : 'Must be a valid email address'
            },
            email_repeat : {
                required : 'Repeated email is required',
                email    : 'Must be a valid email address',
                equalTo  : 'Emails must match'
            },
            password : {
                required : 'Password is required'
            },
            password_repeat : {
                required : 'Repeated password is required',
                equalTo  : 'Passwords must match'
            },
            firstname : {
                required : 'First name is required'
            },
            lastname : {
                required : 'Last name is required'
            }
        }
    });
});

Template.register_view.events({
    /**
     * Register user in the sytem.
     *
     * @param {Object} e Event
     */
    'submit #user-register-form': function (e) {
        e.preventDefault();

        let email    = $('#user-register-form-email').val(),
            password = $('#user-register-form-password').val();

        let inputDataArray = $('#user-register-form').find('[data-profile]').serializeArray(),
            profileData = {};

        _.each(inputDataArray, function (entity) {
            /* Date of birth needs to be formatted */
            if (entity.name === 'dob') {
                entity.value = $('#user-register-form-dob').data('DateTimePicker').date().format();
            }

            profileData[entity.name] = entity.value;
        });

        Accounts.createUser({
            email    : email,
            password : password,
            profile  : profileData
        }, function (error) {
            if (!error) {
                FlowRouter.go('home');
            } else {
                $('.error-register').text(error.reason);
            }
        });
    }
});