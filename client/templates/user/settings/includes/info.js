/**
 * Change user information settings template functions.
 */
Template.user_settings_includes_info.onCreated(function () {
    document.title = 'MSN - Profile Information';
});

Template.user_settings_includes_info.onRendered(function () {

    Meteor.call('getUserInfo', function (error, result) {
        if (!error) {
            const maxDate = moment().subtract(4, 'years');
            let defaultDate;

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
                    defaultDate = value ? new Date(value) : maxDate;
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
                entity.value = $('#user-info-form-dob').data('DateTimePicker').date().format();
            }

            userData[entity.name] = entity.value;
        });

        /* TODO: Implement input value check */
        /* TODO: Pass data as object in 1 param */
        Meteor.call('changeUserInfo', userData, function (error, result) {
            if (!error) {
                console.log('success');
            }
        });
    }
});