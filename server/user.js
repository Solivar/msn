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

        let user = Meteor.users.findOne(Meteor.userId()),
            profile = user.profile;

        console.log(profile);
        return;

        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile' : profile
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