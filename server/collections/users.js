/**
 * User collection publications.
 */

/**
 * Publish collection with user profile information.
 */
/**
 * TODO: Publish only necessary info
 */
Meteor.publish('userProfiles', function () {
    return Meteor.users.find({});
});

/**
 * Publish latest users in search.
 */
Meteor.publish('latestUsers', function () {
    let users = Meteor.users.find({ '_id' : { $ne : this.userId } }, {
        fields : {
            'profile.firstname' : 1,
            'profile.lastname'  : 1
        },
        sort   : { 'createdAt' : -1 },
        limit  : 20
    });

    if (users) {
        return users;
    }

    return this.ready();
});