/**
 * User collection publications and server methods.
 */

/**
 * Publish collection with user profile information.
 */
Meteor.publish('userProfile', function (userId) {
    if (!userId) {
        return [];
    }

    let users = Meteor.users.find({ '_id' : userId }, {
        fields : {
            'profile.firstname' : 1,
            'profile.lastname'  : 1,
            'profile.dob'       : 1,
            'profile.gender'    : 1,
            'profile.country'   : 1,
            'profile.city'      : 1,
            'profile.about'     : 1
        }
    });

    if (users) {
        return users;
    }

    return this.ready();
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

/**
 * User server side methods.
 */
Meteor.methods({
    /**
     * Update user profile information.
     *
     * @param userData
     */
    changeUserInfo: function (userData) {
        if (!Meteor.user()) {
            return;
        }

        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile' : userData
            }
        });
    },

    /**
     * Find users whose firstname or lastname matches name.
     *
     * @param {String} name
     * @returns {Array}
     */
    searchUsers: function (name) {
        if (!Meteor.user()) {
            return;
        }

        /* TODO: Save user firstname and lastname in lowercase and search in lowercase too */
        return Meteor.users.find({
            $or : [{ 'profile.firstname' : name }, { 'profile.lastname' : name }]
        }, {
            fields : {
                'profile.firstname' : 1,
                'profile.lastname'  : 1
            }
        }).fetch();
    },

    /* TODO: Create a publication for active user, sub to it and remove this */
    getUserInfo: function () {
        if (!Meteor.user()) {
            return {};
        }

        let user = Meteor.users.findOne(Meteor.userId());

        return user.profile;
    },

    /**
     * Get the profile information of requested users.
     *
     * @param userIds User ids whose profile information is needed
     * @returns {Array}
     */
    getRequestedUsers: function (userIds) {
        if (!userIds) {
            return;
        }

        return Meteor.users.find(
            { '_id' : { $in : userIds } },
            { fields : {
                'profile.firstname' : 1,
                'profile.lastname'  : 1
            } }
        ).fetch();
    }
});