import Ember from 'ember';

export default Ember.Controller.extend({
    isSingleTask: false,
    
    selectedTask: undefined,
    
    sortProps: ['position:asc'],
    
    rootTasks: Ember.computed.filter('model.@each.parent',function(item, index, arr){
        return this.get("isSingleTask")? true: item.get('parent.content') == null;
    }),
    
    sortedTasks: Ember.computed.sort('rootTasks','sortProps'),
    
    breadcrumb: function(){
        var items = Ember.A();
        if(this.get('selectedTask')){
            this.getParentTasks(items, this.get("selectedTask"));
        }
        return items;
    }.property('selectedTask'),
    
    getParentTasks: function(items, task){
        var parent = task.get("parent");
        if(parent.get('content') != null){
            this.getParentTasks(items, parent);
            items.pushObject(parent);
        }
        
    },
    actions:{
        createTask: function(props, callback){
            
            props = props? props:{};

            console.log("About to create a new task %s %O", props.parentTask, props);
            
            props.position = props.position?props.position:1;
            props.title = props.title? props.title:'';
            props.description = props.description? props.description:'';
            
            var parenttaskid;
            if(props.parentTask){
                parenttaskid = props.parentTask;                
                
                delete props.parentTask;
            }
            
            props.id = '_' + Math.random().toString(36).substr(2, 9);
            var task = this.store.createRecord('task',props);
            
            if(parenttaskid){
                var parentTask = this.store.findRecord("task", parenttaskid).then(function(parentTask){
                    console.log("Parent task %O", parentTask);
                    parentTask.get("children").pushObject(task);
                    parentTask.save();
                });
                
            }
            task.save().then(function(record){
                if(callback){
                    callback(record);
                }
            });
            
        },
        updateTask: function(props, callback){
            console.log("In index route update task %O", props);
            
            var parenttaskid = props.parent;
            delete props.parent;
            
            if(parenttaskid && parenttaskid != 'null'){
                this.store.findRecord("task", parenttaskid).then(function(parentTask){
                
                    var children = parentTask.get("children.length");
                    console.log("Length of children %s",children );
                    props.parent = parentTask;
                    //props.position = ++children;
                    
                    this.store.findRecord('task', props.id).then(function(task){
                        task.setProperties(props);
                        task.save().then(function(record){
                            if(callback){
                                callback(record);
                            }
                        });
                        parentTask.save();
                    });
                }.bind(this));                
            }
            else{
                if(parenttaskid == 'null'){
                    props.parent = null;
                }
                this.store.findRecord('task', props.id).then(function(task){
                    task.setProperties(props);
                    task.save().then(function(record){
                        if(callback){
                            callback(record);
                        }
                    });
                });
            }
        }
    }
});
