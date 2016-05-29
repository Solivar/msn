/**
 * Search template functions.
 */
Template.search_view.onCreated(function () {
    document.title = 'MSN - Search';
    
    this.searchInitialized = new ReactiveVar(false);
    this.searchedUsers = new ReactiveVar([]);

    this.subscribe('latestUsers');
});

Template.search_view.onRendered(function () {

});

Template.search_view.helpers({
    /**
     * Get latest users.
     *
     * @returns {Array}
     */
    getUsers: function () {
        return Meteor.users.find({ '_id' : { $ne : Meteor.userId() } });
    },

    /**
     * Get searched users.
     *
     * @returns {Array}
     */
    getSearched: function () {
        return Template.instance().searchedUsers.get();
    },

    /**
     * Check if a search was made.
     *
     * @returns {Boolean}
     */
    getInitialized: function () {
        return Template.instance().searchInitialized.get();
    }
});

Template.search_view.events({
    /**
     * Search users.
     *
     * @param {Object} e Event
     * @param {Object} template Blaze template instance
     */
    'submit #search-form': function (e, template) {
        e.preventDefault();

        let name = $('#search-form-name').val();

        Meteor.call('searchUsers', name, function (error, result) {
            if (!error) {
                this.searchedUsers.set(result);
                $('.error-search').text('');
                template.searchInitialized.set(true);
            } else {
                $('.error-search').text(error.reason);
            }
        }.bind(Template.instance()));
    }
});