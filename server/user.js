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
    },
    
    getUserInfo: function () {
        if (!Meteor.user()) {
            return {};
        }
        
        let user = Meteor.users.findOne(Meteor.userId());
        
        return user.profile;
    }
});