/**
 * Friends collection schema definition.
 */

Schema = {};


Schema.Friends = new SimpleSchema({
    inviter : {
        type  : String,
        regEx : SimpleSchema.RegEx.Id
    },

    addressee : {
        type  : String,
        regEx : SimpleSchema.RegEx.Id
    },

    isActive : {
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

Friends.attachSchema(Schema.Friends);