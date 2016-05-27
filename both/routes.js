/* Only logged in users can access these routes */
let privateRoutes = FlowRouter.group({
    triggersEnter: [
        function (context, redirect) {
            /* Render layouts in body element */
            BlazeLayout.setRoot('body');

            if (!Meteor.userId()) {
                Session.set('loginRedirect', context.path);
                return redirect('login');
            }
        }
    ]
});

/* Everyone can access these routes */
let publicRoutes = FlowRouter.group({
    triggersEnter: [
        function () {
            /* Render layouts in body element */
            BlazeLayout.setRoot('body');
        }
    ]
});

/* Only non-logged in users can access these roues */
let guestOnlyRoutes = FlowRouter.group({
    triggersEnter: [
        function (context, redirect) {
            /* Render layouts in body element */
            BlazeLayout.setRoot('body');
            if (Meteor.userId()) {
                return redirect('home');
            }
        }
    ]
});

let adminOnlyRoues = FlowRouter.group({
    triggersEnter: [
        function (context, redirect) {
            /* Render layouts in body element */
            BlazeLayout.setRoot('body');
            if (!Meteor.userId()) {
                Session.set('loginRedirect', context.path);
                return redirect('login');
            }
        }
    ]
});

adminOnlyRoues.route('/admin', {
    name: 'admin',
    action: function () {

        /* Check if current user is an administrator */
        Meteor.subscribe('userData', () => {
            if (!Meteor.user().isAdmin) {
                FlowRouter.go('404');
            }
        });

        BlazeLayout.render('layouts_base', {
            main: 'admin_blocked_users_view'
        });
    }
});

/**
 * 404 page.
 */
FlowRouter.notFound = {
    name: '404',
    action: function () {
        BlazeLayout.render('not_found_view');
    }
};

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
    },
    triggersExit: [
        function (context, redirect) {
            if (Session.get('loginRedirect')) {
                redirect(Session.get('loginRedirect'));
                delete Session.keys['loginRedirect'];
            }
        }
    ]
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
let userSettingsRoutes = privateRoutes.group({
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

/**
 * Friend friends route.
 */
privateRoutes.route('/friends', {
    name: 'friends',
    action: function () {
        BlazeLayout.render('layouts_base', {
            main: 'friends_view'
        });
    }
});