/**
 * User server side methods.
 */
Meteor.methods({
    /**
     * Update user profile information.
     *
     * @param userData
     */
    changeUserInfo: function (userData) {
        if (!Meteor.user()) {
            return;
        }

        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile' : userData
            }
        });
    }
});
