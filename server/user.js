/**
 * User server side methods.
 */

Meteor.methods({
    /**
     * Update user profile information.
     *
     * @param firstname
     * @param lastname
     */
    changeUserInfo: function (firstname, lastname) {
        if (!Meteor.user()) {
            return;
        }

        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile.firstname': firstname,
                'profile.lastname': lastname
            }
        });
    }
});