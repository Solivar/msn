/**
 * Change user profile image template functions.
 */

import filepicker from 'filepicker-js';

Template.user_settings_includes_profile_image.onCreated(function () {
    document.title = 'MSN - Change Profile Image';

    filepicker.setKey(Meteor.settings.public.filestackAPIKey);
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
                console.log(Blob);
                Meteor.call('updateAvatar', Blob.url);
            }
        );
    }
});