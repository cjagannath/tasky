import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['taskitem'],
    classNameBindings:['selected'],
    selected:function(){
        return this.get('selectedTask.id') === this.get('item.id');
    }.property('selectedTask'),
    didInsert: function(){
        
    },
    didRender: function(){
        this._super(...arguments);
        
        document.addEventListener("focusTask", function(e){
            if(e.detail.taskid === this.get("item.id")){
                var title = this.$(".name .content");
                if(title){
                    title.attr("contenteditable","true").focus();
                }
            }
        }.bind(this), false);
     },
    actions: {
        createTaskHandler: function(props,callback){
            console.log("AAAA");
            this.sendAction('createTaskHandler', props, callback);
        },
        updateTaskHandler: function(props, callback){
            this.sendAction('updateTaskHandler', props);
        },
        handleEnter: function(isShiftKey){
            this.sendAction('enterHandler', this.get("item.id"), isShiftKey);
        },
        handleTab: function(isShiftKey){
            this.sendAction('tabHandler', this.get("item.id"), isShiftKey);
        },
        handleUp: function(taskid){
            this.sendAction('upHandler', this.get("item.id"));
        },
        handleDown: function(taskid){
            this.sendAction('downHandler', this.get("item.id"));
        }
    }
});
