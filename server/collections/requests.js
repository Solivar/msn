/**
 * Friend request publications and server methods.
 */

/**
 * Publish collection with user friend requests.
 */
Meteor.publish('friendRequests', function () {
    let friendRequests = Requests.find({
        $or: [
            { inviter: this.userId },
            { user: this.userId }
        ]
    });

    if (friendRequests) {
        return users;
    }

    return this.ready();
});

/**
 * Publish collection with friendship status of current user.
 * 
 * @param userId User id whose profile is being viewed.
 */
Meteor.publish('friendStatus', function (userId) {
    let friendStatus = Requests.find( {
        'inviter'   : { $in : [userId, this.userId] },
        'user'      : { $in : [userId, this.userId] }
    });

    if (friendStatus) {
        return friendStatus;
    }

    return this.ready();
});

/**
 * Friend request server side methods.
 */
Meteor.methods({
    /**
     * Send a friend requests to a user.
     *
     * @param userId User id that is going to be invited
     */
    sendFriendRequest: function (userId) {
        if (!this.userId) {
            return;
        }

        let alreadyInvited = Requests.findOne({
            'inviter'   : this.userId,
            'user'      : userId,
            'isPending' : true
        });
        
        if (alreadyInvited) {
            throw new Meteor.Error(400, 'Friend request is already sent');
        }

        return Requests.insert({
            'inviter'   : this.userId,
            'user'      : userId,
            'isPending' : true
        });
    }
});