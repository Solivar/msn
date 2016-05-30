/**
 * Change user information settings template functions.
 */
Template.user_settings_includes_info.onCreated(function () {
    document.title = 'MSN - Profile Information';
});

Template.user_settings_includes_info.onRendered(function () {
    Meteor.call('getUserInfo', function (error, result) {
        if (!error) {
            const maxDate   = moment().subtract(4, 'years');
            let defaultDate = maxDate;

            _.each(result, function (value, key) {
                if (key === 'gender') {
                    switch (result.gender) {
                        case 'male':
                            $('#user-info-form-male').prop('checked', true);
                            break;
                        case 'female':
                            $('#user-info-form-female').prop('checked', true);
                            break;
                        case 'unspecified':
                            $('#user-info-form-unspecified').prop('checked', true);
                            break;
                    }
                } else if (key === 'dob') {
                    /* Use age that is set instead of maxDate as default */
                    defaultDate = new Date(value);
                } else {
                    let selector = '#user-info-form-' + key;
                    $(selector).val(value);
                }
            });

            $('#user-info-form-dob').datetimepicker({
                format: 'MMMM Do YYYY',
                useCurrent: false,
                defaultDate: defaultDate,
                maxDate: maxDate
            });
        }
    });

    /* jQuery Validation */
    $('#user-info-form').validate({
        rules : {
            firstname : {
                required  : true,
                maxlength : 32
            },
            lastname : {
                required  : true,
                maxlength : 32
            }
        },

        messages: {
            firstname : {
                required  : 'First name is required',
                maxlength : 'First name cannot exceed 32 characters'
            },
            lastname : {
                required  : 'Last name is required',
                maxlength : 'Last name cannot exceed 32 characters'
            }
        }
    });
});

Template.user_settings_includes_info.events({
    /**
     * Change user information.
     *
     * @param e
     */
    'submit #user-info-form': function (e) {
        e.preventDefault();

        let inputDataArray = $('#user-info-form').serializeArray(),
            userData = {};

        _.each(inputDataArray, function (entity) {
            /* Date of birth needs to be formatted */
            if (entity.name === 'dob') {
                let dob = $('#user-info-form-dob').data('DateTimePicker').date().format();
                entity.value = new Date(dob);
            }

            userData[entity.name] = entity.value;
        });

        Meteor.call('changeUserInfo', userData, function (error, result) {
            if (error) {
                $('.error-info').text(error.reason);
            }
        });
    }
});