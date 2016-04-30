/**
 * Search template functions.
 */
Template.search_view.onCreated(function () {
    document.title = 'MSN - Search';

    let self = this;

    self.latestUsers = [];
    self.queryingLatest = new ReactiveVar(true);
    self.searchInitialized = new ReactiveVar(true);
    self.queryingSearch = new ReactiveVar(true);
    self.searchedUsers = new ReactiveVar([]);

    this.subscribe('latestUsers', function () {
        self.latestUsers = Meteor.users.find({ '_id' : { $ne : Meteor.userId() } }).fetch();
        self.queryingLatest.set(false);
    });
});

Template.search_view.onRendered(function () {

});

Template.search_view.helpers({
    /**
     * Get latest users query status.
     *
     * @returns {Boolean}
     */
    queryingLatest: function () {
        return Template.instance().queryingLatest.get();
    },

    /**
     * Get latest users.
     *
     * @returns {Array}
     */
    getUsers: function () {
        return Template.instance().latestUsers;
    },

    /**
     * Get search query status.
     *
     * @returns {Boolean}
     */
    queryingSearch: function () {
        return Template.instance().queryingSearch.get();
    },

    /**
     * Get latest users.
     *
     * @returns {Array}
     */
    getSearch: function () {
        return Template.instance().searchedUsers.get();
    }
});

Template.search_view.events({

    'submit #search-form': function (e) {
        e.preventDefault();
        //Template.instance().searchInitialized.set(true);

        let name = $('#search-form-name').val();

        /* TODO: Don't show loading before querying for the first time */
        Meteor.call('searchUsers', name, function (error, result) {
            if (!error) {
                this.searchedUsers.set(result);
                this.queryingSearch.set(false);
            }
        }.bind(Template.instance()));
    }
});