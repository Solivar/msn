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

        var currRouteSelector = '#' + context.route.name;
        $('.nav li').removeClass('active');
        $(currRouteSelector).addClass('active');
    });
});