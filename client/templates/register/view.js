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
});

Template.register_view.events({
    /**
     * Register user in the sytem.
     *
     * @param e
     */
    'submit #user-register-form': function (e) {
        e.preventDefault();

        /* TODO: Validation */
        let email = $('#user-register-form-email').val(),
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
            }
        });
    }
});