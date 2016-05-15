/**
 * Friends publications and server methods.
 */

/**
 * Friends server side methods.
 */
Meteor.methods({
    /**
     * 
     * @param userId _id
     * @returns {String} _id
     */
    addFriend: function (userId) {
        if (!this.userId) {
            throw new Meteor.Error(401, 'You must be logged in');
        } else if (!userId) {
            throw new Meteor.Error(400, 'Accepting a friend request requires an inviter');
        }


        let friendship =  Friends.findOne({
            'inviter'   : { $in : [userId, this.userId] },
            'addressee' : { $in : [userId, this.userId] }
        });

        if (friendship) {
            throw new Meteor.Error(400, 'You are already friends with this user');
        }

        return Friends.insert({
            'inviter'   : userId,
            'addressee' : this.userId
        });
    }
});