/**
 * User collection methods.
 */

/**
 * Publish collection with user profile information.
 */
Meteor.publish('userProfiles', function () {
    return Meteor.users.find({});
});