/**
 * Base layout template functions.
 */
Template.layouts_base.onRendered(function () {
    /**
     * Add active class to navigation element on route change.
     */
    Tracker.autorun(function() {
        FlowRouter.watchPathChange();
        var context = FlowRouter.current();

        /* If currently active view is part of a route group, add active class to dropdown menu triggering element */
        var currRouteSelector = context.route.group.name ? '#' + context.route.group.name : '#' + context.route.name;
        $('.nav li').removeClass('active');
        $(currRouteSelector).addClass('active');
    });
});