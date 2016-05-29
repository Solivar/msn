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

    let user = Meteor.users.find({ '_id' : userId }, {
        fields : {
            'profile.firstname' : 1,
            'profile.lastname'  : 1,
            'profile.dob'       : 1,
            'profile.gender'    : 1,
            'profile.country'   : 1,
            'profile.city'      : 1,
            'profile.about'     : 1,
            'avatar'            : 1,
            'isBlocked'         : 1
        }
    });

    if (user) {
        return user;
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
            'profile.lastname'  : 1,
            'avatar'            : 1
        },
        sort   : { 'createdAt' : -1 },
        limit  : 20
    });

    if (users) {
        return users;
    }

    return this.ready();
});

Meteor.publish('userData', function () {
    let user = Meteor.users.find({ '_id' : this.userId }, {
        fields : {
            'profile.firstname' : 1,
            'profile.lastname'  : 1,
            'profile.dob'       : 1,
            'profile.gender'    : 1,
            'profile.country'   : 1,
            'profile.city'      : 1,
            'profile.about'     : 1,
            'isAdmin'           : 1,
            'isBlocked'         : 1
        }
    });

    if (user) {
        return user;
    }

    return this.ready();
});

Meteor.publish('bannedUsers', function () {
    let users = Meteor.users.find({ 'isBlocked' : true }, {
        fields : {
            'profile.firstname' : 1,
            'profile.lastname'  : 1,
            'isBlocked'         : 1
        }
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
        if (!this.userId) {
            throw new Meteor.Error(401, 'You must be logged in');
        }

        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile' : userData
            }
        });
    },

    /**
     * Find users whose first name or last name matches name.
     *
     * @param {String} name
     * @returns {Array}
     */
    searchUsers: function (name) {
        if (!this.userId) {
            throw new Meteor.Error(401, 'You must be logged in');
        } else if (!name) {
            throw new Meteor.Error(400, 'Name is required');
        }

        console.log("^" + name + "\\b");

        let regex = `^${name}`;

        /* Find users whose first or last name begins with given name in parameter.
         * Make sure it is a case insensitive search.
         */
        return Meteor.users.find({
            $or : [
                { 'profile.firstname' : { $regex: regex, $options: 'i' } },
                { 'profile.lastname'  : { $regex: regex, $options: 'i' } }
            ]
        }, {
            fields : {
                'profile.firstname' : 1,
                'profile.lastname'  : 1,
                'avatar'            : 1
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
        if (!this.userId) {
            throw new Meteor.Error(401, 'You must be logged in');
        }

        return Meteor.users.find(
            { '_id' : { $in : userIds } },
            { fields : {
                'profile.firstname' : 1,
                'profile.lastname'  : 1,
                'avatar'            : 1
            } }
        ).fetch();
    },

    /**
     * Either block or unblock user from system
     * depending if they are currently blocked.
     *
     * @param {String} userId
     */
    toggleUserBlock: function (userId) {
        if (!this.userId) {
            throw new Meteor.Error(401, 'You must be logged in');
        } else if (!userId) {
            throw new Meteor.Error(400, 'A user must be provided');
        } else if (this.userId === userId) {
            throw new Meteor.Error(400, 'You cannot block yourself');
        }

        let user = Meteor.users.findOne(userId);

        if (!user) {
            throw new Meteor.Error(400, 'User not found');
        }

        if (_.has(user, 'isBlocked') && user.isBlocked === true) {
            Meteor.users.update(user._id, {
                $set : {
                    isBlocked : false
                }
            })
        } else {
            /* Emptying loginTokens to force user to logout from the system */
            Meteor.users.update(user._id, {
                $set : {
                    'isBlocked' : true,
                    'services.resume.loginTokens' : []
                }
            })
        }
    },

    /**
     * Update user avatar.
     *
     * @param {String} imageUrl
     */
    updateAvatar: function (imageUrl) {
        if (!this.userId) {
            throw new Meteor.Error(401, 'You must be logged in');
        }

        let user = Meteor.users.findOne(this.userId);

        if (!user) {
            throw new Meteor.Error(400, 'User not found');
        }

        Meteor.users.update(user._id, {
            $set : {
                avatar : imageUrl
            }
        });
    }
});