/**
 * Requests collection schema definition.
 */

Schema = {};


Schema.Requests = new SimpleSchema({
    inviter : {
        type  : String,
        regEx : SimpleSchema.RegEx.Id
    },

    addressee : {
        type  : String,
        regEx : SimpleSchema.RegEx.Id
    },

    isPending : {
        type     : Boolean,
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

Requests.attachSchema(Schema.Requests);