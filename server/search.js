/**
 * Search server side methods.
 */
Meteor.methods({
    /**
     * Find users whose firstname or lastname matches name.
     *
     * @param {String} name
     * @returns {Array}
     */
    searchUsers: function (name) {
        if (!Meteor.user()) {
            return;
        }

        /* TODO: Save user firstname and lastname in lowercase and search in lowercase too */
        return Meteor.users.find({
            $or : [{ 'profile.firstname' : name }, { 'profile.lastname' : name }]
        }, {
            fields : {
                'profile.firstname' : 1,
                'profile.lastname'  : 1
            }
        }).fetch();
    }
});
