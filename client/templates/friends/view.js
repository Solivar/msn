/**
 * Friends template functions.
 */
Template.friends_view.onCreated(function () {
    document.title = 'MSN - Friends';

    this.friends = new ReactiveVar([]);

    this.subscribe('friends', () => {
        let friends   = Friends.find({}).fetch(),
            friendIds = [];

        _.each(friends, (friend) => {
            if (friend.inviter !== Meteor.userId()) {
                friendIds.push(friend.inviter);
            } else {
                friendIds.push(friend.addressee);
            }
        });

        Meteor.call('getRequestedUsers', friendIds, (error, result) => {
            if (!error) {
                this.friends.set(result);
            }
        });
    });
});

Template.friends_view.helpers({
    /**
     * Get a list of friends.
     *
     * @returns {Cursor}
     */
    getFriends: function () {
        return Template.instance().friends.get();
    }
});