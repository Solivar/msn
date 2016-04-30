/**
 * Global template helpers.
 */

/**
 * Retrieve age from date of birth.
 *
 * @oaram {String} User dob
 * @returns {Number}
 */
Template.registerHelper('dobToAge', (dob) => {
    let dobDate = new Date(dob);
    return moment().diff(dobDate, 'years');
});

/**
 * Generate a URL path for user profile.
 *
 * @params {String} User _id
 * @returns {String}
 */
Template.registerHelper('profileUrl', (userId) => {
    if (Meteor.userId() === userId) {
        return FlowRouter.path('home')
    }

    return FlowRouter.path('user-profile', { 'userId' : userId });
});