/**
 * Friends publications and server methods.
 */

/**
 * Publish collection with user friends.
 */
Meteor.publish('friends', function () {
    let friends = Friends.find({
        $or: [
            { 'inviter'   : this.userId },
            { 'addressee' : this.userId }
        ],
        'isActive' : { $ne : false }
    });

    if (friends) {
        return friends;
    }

    return this.ready();
});

/**
 * Publish collection with user friend status.
 * 
 * @param userId User _id whose profile is being viewed.
 */
Meteor.publish('friendStatus', function (userId) {
    let friendStatus = Friends.find({
        'inviter'   : { $in : [userId, this.userId] },
        'addressee' : { $in : [userId, this.userId] },
    });

    if (friendStatus) {
        return friendStatus;
    }

    return this.ready();
});

/**
 * Friends server side methods.
 */
Meteor.methods({
    /**
     * Add the user who requested friendship as friend.
     *
     * @param {String} userId Inviting user _id.
     * @returns {String} _id
     */
    addFriend: function (userId) {
        if (!this.userId) {
            throw new Meteor.Error(401, 'You must be logged in');
        } else if (!userId) {
            throw new Meteor.Error(400, 'Accepting a friend request requires an inviter');
        } else if (this.userId === userId) {
            throw new Meteor.Error(400, 'Cannot become friends with yourself');
        }

        let friendship = Meteor.call('checkFriendship', userId);

        if (friendship) {
            throw new Meteor.Error(400, 'You are already friends with this user');
        }

        return Friends.insert({
            'inviter'   : userId,
            'addressee' : this.userId
        });
    },

    /**
     * Check if a friendship already exists between two users.
     *
     * @param {String} userId The other user _id in a friendship
     * @returns {Object}
     */
    checkFriendship: function (userId) {
        return Friends.findOne({
            'inviter'   : { $in : [userId, this.userId] },
            'addressee' : { $in : [userId, this.userId] },
            'isActive'  : { $ne : false }
        });
    },

    /**
     * Stop friendship with a user.
     *
     * @param {String} userId
     */
    removeFriend: function (userId) {
        if (!this.userId) {
            throw new Meteor.Error(401, 'You must be logged in');
        } else if (!userId) {
            throw new Meteor.Error(400, 'User must be provided');
        }

        let friendship = Meteor.call('checkFriendship', userId);

        if (!friendship) {
            throw new Meteor.Error(400, 'You must be friends with this user');
        }

        Friends.update(friendship._id, {
            $set : {
                'isActive' : false
            }
        });
    }
});