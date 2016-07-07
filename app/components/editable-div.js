import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    attributeBindings: ['contenteditable'],
    // Variables:
	editable: true,
	isUserTyping: false,
	plaintext: true,
    
    // Properties:
	contenteditable: (function() {
		var editable = this.get('editable');

		return editable ? 'true' : undefined;
	}).property('editable'),
    
    // Processors:
    processValue: function() {
        if (!this.get('isUserTyping') && this.get('value')) {
            return this.setContent();
        }
    },

	// Observers:
	valueObserver: (function() {
        Ember.run.once(this, 'processValue');
    }).observes('value', 'isUserTyping'),

	// Events:
	didInsertElement: function() {
		return this.setContent();
	},

	focusOut: function() {
		return this.set('isUserTyping', false);
	},

	keyDown: function(event) {
		if (!event.metaKey) {
            
            var keyCode = event.keyCode || event.which;
            var isShiftKey = event.shiftKey? true: false;
                
            if(keyCode === 13) {
                event.preventDefault();
                //$(e.target).removeAttr("contenteditable");
                this.send('enterHandler', isShiftKey);
            }
            else if (keyCode === 9) {
                event.preventDefault();
                this.send('tabHandler', isShiftKey);
            }
            else if(keyCode === 38){
                event.preventDefault();
                this.send('upHandler');                
            }
            else if(keyCode === 40){
                event.preventDefault();
                this.send('downHandler');                
            }
            
			return this.set('isUserTyping', true);
		}
	},

	keyUp: function(event) {
		if (this.get('plaintext')) {
			return this.set('value', this.$().text());
		} else {
			return this.set('value', this.$().html());
		}
	},

	setContent: function() {
		return this.$().html(Ember.Handlebars.Utils.escapeExpression(this.get('value')));
	},
    
    actions:{
        enterHandler: function(isShiftKey){
            this.sendAction('enterHandler', isShiftKey);
        },
        tabHandler: function(isShiftKey){
            this.sendAction('tabHandler', isShiftKey);
        },
        upHandler: function(){
            this.sendAction('upHandler');
        },
        downHandler: function(){
            this.sendAction('downHandler');
        }
    },
    didRender: function(){
        
    }
});
