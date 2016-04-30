/* Only logged in users can access these routes */
var privateRoutes = FlowRouter.group({
    triggersEnter: [
        function (context, redirect) {
            BlazeLayout.setRoot('body');

            if (!Meteor.userId()) {
                return redirect('login');
            }
        }
    ]
});

/* Everyone can access these routes */
var publicRoutes = FlowRouter.group({
    triggersEnter: [
        function () {
            BlazeLayout.setRoot('body');
        }
    ]
});

/* Only non-logged in users can access these roues */
var guestOnlyRoutes = FlowRouter.group({
    triggersEnter: [
        function (context, redirect) {
            BlazeLayout.setRoot('body');
            if (Meteor.userId()) {
                return redirect('home');
            }
        }
    ]
});

/**
 * Home route.
 */
privateRoutes.route('/', {
    name: 'home',
    action: function () {
        BlazeLayout.render('layouts_base', {
            main: 'user_profile_view'
        });
    }
});

/**
 * Login route.
 */
guestOnlyRoutes.route('/login', {
    name: 'login',
    action: function () {
        BlazeLayout.render('login_view');
    }
});

/**
 * Register route.
 */
guestOnlyRoutes.route('/register', {
    name: 'register',
    action: function () {
        BlazeLayout.render('register_view');
    }

});

/**
 * Logout route.
 */
publicRoutes.route('/logout', {
    name: 'logout',
    action: function () {
        Meteor.logout(function () {
            FlowRouter.go('login');
        });
    }
});

/**
 * About route.
 */
    publicRoutes.route('/about', {
    name: 'logout',
    action: function () {
        BlazeLayout.render('about_view');
    }
});

/* User settings related routes */
var userSettingsRoutes = privateRoutes.group({
    prefix: '/settings',
    name: 'settings'
});

/**
 * Change password route.
 */
userSettingsRoutes.route('/changepass', {
    name: 'settings-changepass',
    action: function () {
        BlazeLayout.render('layouts_base', {
            main: 'user_settings_includes_changepass'
        });
    }
});

/**
 * Change user info route.
 */
userSettingsRoutes.route('/info', {
    name: 'settings-info',
    action: function () {
        BlazeLayout.render('layouts_base', {
            main: 'user_settings_includes_info'
        });
    }
});

/**
 * User profile route.
 */
privateRoutes.route('/profile/:userId', {
    name: 'user-profile',
    action: function () {
        BlazeLayout.render('layouts_base', {
            main: 'user_profile_view'
        });
    }
});

/**
 * Search route.
 */
privateRoutes.route('/search', {
    name: 'search',
    action: function () {
        BlazeLayout.render('layouts_base', {
            main: 'search_view'
        });
    }
});