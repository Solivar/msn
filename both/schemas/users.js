/**
 * Users collection schema definition.
 */

Schema = {};

Schema.UserProfile = new SimpleSchema({
    firstname : {
        type  : String,
        max   : 32,
        label : 'First name'
    },

    lastname : {
        type  : String,
        max   : 32,
        label : 'Last name'
    },

    dob : {
        type  : Date,
        label : 'Date of birth'
    },

    gender : {
        type          : String,
        allowedValues : ['male', 'female', 'unspecified'],
        label         : 'Gender'
    },

    country : {
        type     : String,
        max      : 32,
        optional : true,
        label    : 'Country'
    },

    city : {
        type     : String,
        max      : 32,
        optional : true,
        label    : 'City'
    },

    about : {
        type     : String,
        max      : 400,
        optional : true,
        label    : 'About'
    }
});

Schema.User = new SimpleSchema({
    emails: {
        type : Array
    },

    "emails.$": {
        type : Object
    },
    "emails.$.address": {
        type  : String,
        regEx : SimpleSchema.RegEx.Email
    },

    "emails.$.verified": {
        type : Boolean
    },

    createdAt: {
        type : Date
    },

    profile: {
        type : Schema.UserProfile
    }
});

Meteor.users.attachSchema(Schema.User);