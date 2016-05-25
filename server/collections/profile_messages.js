/**
 * Profile messages publications and server methods.
 */

/**
 * Publish collection with user profile messages.
 */
Meteor.publish('profileMessages', function (userId) {
    let profileMessages = ProfileMessages.find({
        'addressee' : userId,
        'isDeleted' : { $ne : true }
    });

    if (profileMessages) {
        return profileMessages;
    }

    return this.ready();
});

/**
 * Profile messages server side methods.
 */
Meteor.methods({
    /**
     * Add a message in a user profile.
     *
     * @param {String} userId Addressee user ID
     * @param {String} message
     * @returns {String} Profile message ID
     */
    addProfileMessage: function (userId, message) {
        if (!this.userId) {
            throw new Meteor.Error(401, 'You must be logged in');
        } else if (!userId) {
            throw new Meteor.Error(400, 'Profile message requires addressee');
        } else if (message.trim().length === 0) {
            throw new Meteor.Error(400, 'Message cannot be empty');
        }

        if (this.userId !== userId) {
            let friendship = Meteor.call('checkFriendship', userId);
            console.log('tes');
            console.log(friendship);

            if (!friendship) {
                throw new Meteor.Error(400, 'You must be friends with this user to leave a profile message');
            }
        }

        return ProfileMessages.insert({
            author    : this.userId,
            addressee : userId,
            message   : message
        });
    },

    /**
     * Remove a profile message.
     *
     * @param messageId
     */
    removeProfileMessage: function(messageId) {
        if (!this.userId) {
            throw new Meteor.Error(401, 'You must be logged in');
        } else if (!messageId) {
            throw new Meteor.Error(400, 'Removing a message requires its ID');
        }

        let message = ProfileMessages.findOne(messageId);

        if (!message) {
            throw new Meteor.Error(400, 'Message no found');
        } else if (message.addressee !== this.userId) {
            throw new Meteor.Error(401, 'Permission denied');
        } else {
            console.log(message._id);
            ProfileMessages.update(message._id, {
                $set : {
                    'isDeleted' : true
                }
            });
        }
    }
});