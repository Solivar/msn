/**
 * Friend request publications and server methods.
 */

/**
 * Publish collection with user friends.
 */
Meteor.publish('friendRequests', function () {
    let friendRequests = Requests.find({
        $or: [
            { 'inviter'   : this.userId },
            { 'addressee' : this.userId }
        ]
    });

    if (friendRequests) {
        return friendRequests;
    }

    return this.ready();
});

/**
 * Publish collection with friendship request status of current user.
 * 
 * @param userId User id whose profile is being viewed.
 */
Meteor.publish('friendStatus', function (userId) {
    let friendStatus = Requests.find( {
        'inviter'   : { $in : [userId, this.userId] },
        'addressee' : { $in : [userId, this.userId] }
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
     * Send a friend friends to a user.
     *
     * @param userId User id that is going to be invited
     */
    sendFriendRequest: function (userId) {
        if (!this.userId) {
            throw new Meteor.Error(401, 'You must be logged in');
        } else if (!userId) {
            throw new Meteor.Error(400, 'Friend request is already pending');
        }

        let alreadyInvited = Requests.findOne({
            'inviter'   : { $in : [userId, this.userId] },
            'addressee' : { $in : [userId, this.userId] },
            'isPending' : true
        });
        
        if (alreadyInvited) {
            throw new Meteor.Error(400, 'Friend request is already sent');
        }

        return Requests.insert({
            'inviter'   : this.userId,
            'addressee' : userId,
            'isPending' : true
        });
    },
    
    /**
     *
     * @param userId _id
     */
    acceptFriendRequest: function (userId) {
        if (!this.userId) {
            throw new Meteor.Error(401, 'You must be logged in');
        } else if (!userId) {
            throw new Meteor.Error(400, 'Accepting a friend request requires an inviter');
        }

        Meteor.call('addFriend', userId, (error, result) => {
            if (!error && result) {
                let activeRequest = Requests.findOne({
                    'inviter'   : userId,
                    'addressee' : this.userId,
                    'isPending' : true
                });

                Requests.update(activeRequest._id, {
                    $set : {
                        'isPending' : false
                    }
                });
            } else if (error) {
                console.log(error);
            }
        });
    }
});