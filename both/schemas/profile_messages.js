/**
 * Profile messages collection schema definition.
 */

Schema = {};


Schema.ProfileMessages = new SimpleSchema({
    author : {
        type  : String,
        regEx : SimpleSchema.RegEx.Id
    },

    addressee : {
        type  : String,
        regEx : SimpleSchema.RegEx.Id
    },

    message : {
        type  : String,
        label : 'Message'
    },

    isDeleted : {
        type     : Boolean,
        optional : true
    },

    createdAt : {
        type      : Date,
        autoValue : function () {
            if (this.isInsert) {
                return new Date();
            }
        }
    }
});

ProfileMessages.attachSchema(Schema.ProfileMessages);