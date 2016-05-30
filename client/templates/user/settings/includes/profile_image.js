/**
 * Change user profile image template functions.
 */

import filepicker from 'filepicker-js';

Template.user_settings_includes_profile_image.onCreated(function () {
    document.title = 'MSN - Change Profile Image';

    filepicker.setKey(Meteor.settings.public.filestackAPIKey);

    this.subscribe('userProfile', Meteor.userId());
});

Template.user_settings_includes_profile_image.helpers({
    /**
     * Get currently open user profile data.
     *
     * @returns {Object}
     */
    getUser: function () {
        return Meteor.users.findOne({ _id : Meteor.userId() });
    }
});

Template.user_settings_includes_profile_image.events({
    /**
     * Upload user image.
     *
     * @param e
     */
    'click .pick-image': function (e) {
        e.preventDefault();

        filepicker.pick(
            {
                mimetype : 'image/*',
                services : ['COMPUTER', 'URL'],
                language : 'en',
                imageDim : [300, 300]
            },

            /* On successful upload */
            function (Blob) {
                Meteor.call('updateAvatar', Blob.url);
            }
        );
    },

    'click .delete-image': function (e) {
        e.preventDefault();

        Meteor.call('deleteAvatar');
    }
});