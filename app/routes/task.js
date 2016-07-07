import Ember from 'ember';

export default Ember.Route.extend({

    model: function(param){   
        var taskitem = this.store.findRecord('task', param.task_id);
        return taskitem;
    },
    setupController: function(controller, model){
        console.log("Setting up controller %O", model);
        this.controllerFor("index").setProperties({
            isSingleTask: true,
            selectedTask: model,
            content: Ember.A([model])
        });    
    },
    renderTemplate: function(){
        this.render("index");
    },
    
    actions: {
        willTransition: function(transition) {
            console.log("Transition %O", transition);
            this.controllerFor("index").setProperties({
                isSingleTask: false,
                selectedTask: undefined
            });
        }
    }
});
