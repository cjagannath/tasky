import Ember from 'ember';
import DS from 'ember-data';

//import Model from 'ember-data/model';
// import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),
    position: DS.attr('number'),
    children: DS.hasMany("tasks", { inverse: "parent" }),
    parent: DS.belongsTo("task", { inverse: "children" }),
    orderedSubtasks: Ember.computed.sort('children.@each.position', function(task1, task2){
        var pos1 = task1.get('position');
        var pos2 = task2.get('position');
        
        if(pos1 > pos2){
            return 1;
        }
        else if(pos1 < pos2){
            return -1;
        }
        
        return 0;
    })
});