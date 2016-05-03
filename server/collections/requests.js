/**
 * Friend request publications.
 */
Requests = new Mongo.Collection('requests');

/**
 * Friend request server side methods.
 */
Meteor.methods({
    sendFriendRequest: function (userId) {
        if (!this.userId) {
            return;
        }

        return Requests.insert({
            'inviter' : this.userId,
            'user'    : userId
        });
    }
});