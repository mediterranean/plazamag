define([
    'jquery',     // lib/jquery/jquery
    'underscore', // lib/underscore/underscore
    'backbone',    // lib/backbone/backbone
    'serializeObject',
    'models/gossip/GossipModel',
    'text!templates/gossip/newGossipTemplate.html'
], function($, _, Backbone, serializeObject, GossipModel, newGossipTemplate){

    var NewGossipView = Backbone.View.extend({
        events:{
            'click #submit':'submit'
        },
        initialize:function(){
            this.user =  this.options.user;
            this.model = new GossipModel();
            Backbone.Validation.bind(this);
        },
        render:function(){
            this.$el.append(newGossipTemplate);
            return this;
        },
        submit:function(e){
            e.preventDefault();
            var data = this.$('#newGossip').serializeObject();
            this.model.set(data)
            if(this.model.isValid(true))
                this.model.save({},{success:this.saved});
        },
        saved:function(model, xhr, options){
            Backbone.history.navigate('gossips', true);
        }

    });
    return NewGossipView;
});