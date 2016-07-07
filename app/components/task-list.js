import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'ul',
    classNames: ['tasklist'],
    didRender: function(){
        this.$().sortable({
            connectWith: ".tasklist",
            handle: ".bullet",
        });
    },
    getParentTask: function(currentTask){
        var el = currentTask.parents(".project");
        return el.length?el.first():undefined;    
    },
    decrementPosition: function(taskitems, startpos){

        taskitems.each(function(index, taskitem){
            var id = Ember.$(taskitem).attr("projectid");    
            this.send('updateTaskHandler', {
                id: id,
                position: startpos++
            });            
        }.bind(this));    
    },
    incrementPosition: function(taskitems, startpos){

        taskitems.each(function(index, taskitem){
            var id = Ember.$(taskitem).attr("projectid");    
            this.send('updateTaskHandler', {
                id: id,
                position: startpos
            });
            startpos++;
        }.bind(this));    
    },
    sendTaskEvent: function(record){
        var newTaskEvent = new CustomEvent("focusTask",{
            detail:{
                taskid: record.id
            }
        });
        document.dispatchEvent(newTaskEvent);
    },
    getPreviousTask: function(currenttask){
        var prevTask = currenttask.prev().find(".project:last");
        
        if(prevTask.length){
            return prevTask;
        }
        prevTask = currenttask.prev();
        if(prevTask.length){
            return prevTask;
        }
        return currenttask.parents(".project:first");
    },
    getNextTask: function(currenttask){
        var nextTask = currenttask.find(".project:first");
        if(nextTask.length){
            return nextTask;
        }
        nextTask = currenttask.next();
        if(nextTask.length){
            return nextTask;
        }
        return currenttask.parents(".project:first").next();
    },    
    actions: {
        createTaskHandler: function(props, callback){
            console.log("Create task handler in task list called %O", props);
             
            this.sendAction('createTaskHandler', props, function(record){
                
                if(callback){
                    callback(record);
                }
                
                
            }.bind(this));
        },
        updateTaskHandler: function(props, callback){
            this.sendAction('updateTaskHandler', props, function(record){                
                if(callback){
                    callback(record);
                }                                
            }.bind(this));
        },
        handleEnter: function(taskid, isShiftKey){
            console.log("Handle enter task list called %s", taskid);
            var that = this;
            
            var curtask = this.$(".project[projectid='"+taskid+"']");
            
            //Update current task
            var titlefld = curtask.find(".name[projectid='"+taskid+"'] .content");
            var titleval = titlefld.text();
            titlefld.removeAttr("contenteditable");
                                
            var props = {
                id: taskid,
                title: titleval
            };
            this.send('updateTaskHandler', props);
            
            if(!isShiftKey){
                //Create a new task as a sibling to the current task
                var currentpos = curtask.index()+1;
                var tasksafter = curtask.nextAll();

                var parenttask = this.getParentTask(curtask);

                props = {
                    position: currentpos+1
                };
                if(parenttask){
                    props.parentTask = parenttask.attr("projectid");
                }
                this.send('createTaskHandler',props, function(record){
                    Ember.run.schedule("afterRender",this,function() {                    
                        this.sendTaskEvent(record);                        
                    }.bind(this));
                }.bind(this));

                //Increment the positions of following tasks
                this.incrementPosition(tasksafter, currentpos+2);
            }
        },
        handleTab: function(taskid, isShiftKey){
            console.log("tab handler called...");
            var currenttask = this.$(".project[projectid='"+taskid+"']");
            var titlefld = currenttask.find(".name[projectid='"+taskid+"'] .content");
            
            var title = titlefld.text();
            
            if(!isShiftKey){
                var previoustask = currenttask.prev();
                if(previoustask.length > 0){

                    var prevtaskid = previoustask.attr("projectid");
                    var children = previoustask.find(".tasklist:first > .project").length;
                    console.log(previoustask);
                    
                    this.send('updateTaskHandler', {
                        id: taskid,
                        parent: prevtaskid,
                        title: title,
                        position: ++children
                    }, function(record){
                        Ember.run.schedule("afterRender",this,function() {                    
                            this.sendTaskEvent(record);                        
                        }.bind(this));
                    }.bind(this));

                    var nextTasks = currenttask.nextAll();
                    var newpos = currenttask.index()+1;
                    this.decrementPosition(nextTasks, newpos);
                }
            }
            else{
                //Get the parent task for position
                //Get the parent of parent task to set as parent
                var parentTask = this.getParentTask(currenttask);
                                
                if(parentTask){
                    var parentTaskPos = parentTask.index()+1;
                    var tasksAfter = parentTask.nextAll();
                    var parentOfParent = this.getParentTask(parentTask);
                    
                    var props = {};
                    props.id = taskid;
                    props.position = parentTaskPos+1;
                    props.title = title;
                    
                    if(parentOfParent){
                        props.parent = parentOfParent.attr("projectid");
                    }
                    else {
                        props.parent = "null";
                    }
                    console.log("About to update task for shift tab %O", props);
                    this.send('updateTaskHandler', props, function(record){
                        
                        this.incrementPosition(tasksAfter, parentTaskPos+2);    
                        
                        Ember.run.schedule("afterRender",this,function() {                    
                            this.sendTaskEvent(record);                        
                        }.bind(this));
                    }.bind(this));
                    
                    
                }
            }
        },
        handleUp: function(taskid, isShiftKey){
            var currenttask = this.$(".project[projectid='"+taskid+"']");
            var titlefld = currenttask.find(".name[projectid='"+taskid+"'] .content");            
            var title = titlefld.text();
            
            
            
            var parentTask = this.getPreviousTask(currenttask);
            
            console.log("closest task %O", parentTask);
            if(parentTask){
                this.sendTaskEvent({
                    id: parentTask.attr("projectid")
                });
            }
            
            this.send('updateTaskHandler', {
                id: taskid,
                title: title
            });
        },
        handleDown: function(taskid, isShiftKey){
            var currenttask = this.$(".project[projectid='"+taskid+"']");
            var titlefld = currenttask.find(".name[projectid='"+taskid+"'] .content");            
            var title = titlefld.text();
            
            this.send('updateTaskHandler', {
                id: taskid,
                title: title
            });
            
            var nextTask = this.getNextTask(currenttask);
            
            console.log("closest task %O", nextTask);
            if(nextTask){
                this.sendTaskEvent({
                    id: nextTask.attr("projectid")
                });
            }   
        }
    }
});
