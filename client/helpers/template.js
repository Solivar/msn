/**
 * Global template helpers.
 */

/**
 * Retrieve age from date of birth.
 *
 * @returns {Number}
 */
Template.registerHelper('dobToAge', (dob) => {
    let dobDate = new Date(dob);
    return moment().diff(dobDate, 'years');
});