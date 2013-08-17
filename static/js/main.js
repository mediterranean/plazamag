

require.config({
    paths: {
        jquery: 'jquery',
        underscore: 'underscore-min',
        backbone: 'backbone-min',
        bootstrap:'bootstrap.min',
        validation:'backbone.validation',
        validationbootstrap:'backbone.validation.bootstrap',
        serializeobject:'serialize-object',
        cookie:'jquery.cookie',
        json:'json',
        app:'/static/app',
        templates: '/static/js/templates'
    },
    shim: {
        'backbone': {
            deps: ['jquery','underscore'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        validation:{
            deps:['jquery','backbone','underscore'],
            exports:'Backbone.Validation'
        },
        validationbootstrap:{
            deps:['jquery','backbone','underscore','validation']
        },
        cookie:{
            deps:['jquery'],
            exports:'jquery.cookie'
        }
    }
});

define([
    // Load our app module and pass it to our definition function
    'app',
    'bootstrap'
], function(App){

    Backbone.View.prototype.close = function () {
        if (this.beforeClose) {
            this.beforeClose();
        }
        Backbone.Validation.unbind(this);
        this.unbind();
        this.remove();
    };

    Backbone.old_sync = Backbone.sync
    Backbone.sync = function(method, model, options) {
        var new_options =  _.extend({
            beforeSend: function(xhr) {
               xhr.setRequestHeader('X-CSRFToken', $('input[name=csrfmiddlewaretoken]').val());
            }
        }, options)
        Backbone.old_sync(method, model, new_options);
    };
    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    App.initialize();
    // Define your master router on the application namespace and trigger all
    // navigation from this instance.

    // Trigger the initial route and enable HTML5 History API support, set the
    // root folder to '/' by default.  Change in app.js.
    Backbone.history.start({ pushState: true, root: '/' });

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
    // attribute, bypass the delegation completely.
    $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
        // Get the absolute anchor href.
        var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
        // Get the absolute root.
        var root = location.protocol + "//" + location.host +'/';
        // Ensure the root is part of the anchor href, meaning it's relative.
        if (href.prop.slice(0, root.length) === root) {
            // Stop the default event to ensure the link will not cause a page
            // refresh.
            evt.preventDefault();

            // `Backbone.history.navigate` is sufficient for all Routers and will
            // trigger the correct events. The Router's internal `navigate` method
            // calls this anyways.  The fragment is sliced from the root.
            Backbone.history.navigate(href.attr, true);
        }
    });

});