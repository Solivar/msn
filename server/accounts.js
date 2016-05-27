/**
 * Check if user is banned before logging them in.
 */
Accounts.validateLoginAttempt(function(attemptData) {
    if(_.has(attemptData, 'user') && attemptData.user.isBlocked) {
        throw new Meteor.Error(403, 'You are banned');
    }

    return true;
});