define([
    'underscore',
    'backbone',
    'models/gossip/GossipModel'
], function(_, Backbone, GossipModel){
    var GossipCollection = Backbone.Collection.extend({
        model: GossipModel,
        url:'/api/v1/gossips/',
        parse: function(response) {
            return response.gossips;
        }
    });
    return GossipCollection;
});
