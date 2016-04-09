/* Only logged in users can access these routes */
var privateRoutes = FlowRouter.group({
    triggersEnter: [
        function (context, redirect) {
            if (!Meteor.userId()) {
                return redirect('login');
            }
        }
    ]
});

/* Everyone can access these routes */
var publicRoutes = FlowRouter.group({
});

/* Only non-logged in users can access these roues */
var guestOnlyRoutes = FlowRouter.group({
    triggersEnter: [
        function (context, redirect) {
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
            main: 'home_view'
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