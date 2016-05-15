/**
 * Friends requests template functions.
 */
Template.friends_requests_view.onCreated(function () {
    document.title = 'MSN - Friends';

    this.incomingRequests = new ReactiveVar([]);
    this.outgoingRequests = new ReactiveVar([]);

    let friendRequests = this.subscribe('friendRequests', () => {
        let outgoing = Requests.find({
            'inviter' : Meteor.userId(),
            'isPending' : true
        }).fetch();

        let incoming = Requests.find({
            'user' : Meteor.userId(),
            'isPending' : true
        }).fetch();

        let incomingIds = _.pluck(incoming, 'inviter'),
            outgoingIds = _.pluck(outgoing, 'user');

        Meteor.call('getRequestedUsers', incomingIds, (error, result) => {
            if (!error) {
                this.incomingRequests.set(result);
            }
        });

        Meteor.call('getRequestedUsers', outgoingIds, (error, result) => {
            if (!error) {
                this.outgoingRequests.set(result);
            }
        });
    });
});

Template.friends_requests_view.onRendered(function () {

});

Template.friends_requests_view.helpers({
    getIncomingRequests: function () {
        return Template.instance().incomingRequests.get();
    },

    getOutgoingRequests: function () {
        return Template.instance().outgoingRequests.get();
    }
});

Template.friends_requests_view.events({

});