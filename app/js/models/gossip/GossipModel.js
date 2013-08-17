define([
    'jquery',     // lib/jquery/jquery
    'underscore', // lib/underscore/underscore
    'backbone'    // lib/backbone/backbone
], function($, _, Backbone){
    var GossipModel = Backbone.Model.extend({
        defaults:{
            id: null,
            title:"",
            explanation:"",
            good:0,
            bad:0,
            company:"",
            nickname:"",
            age:"",
            gender:0,
            location:""
        },
        url : function() {
            var base = '/api/v1/gossips/';
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
        }
    });
    return GossipModel;
});
