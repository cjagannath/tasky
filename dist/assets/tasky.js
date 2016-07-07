"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('tasky/adapters/application', ['exports', 'ember-localstorage-adapter'], function (exports, _emberLocalstorageAdapter) {
    exports['default'] = _emberLocalstorageAdapter['default'].extend({
        namespace: 'tasky'
    });
});
define('tasky/adapters/ls-adapter', ['exports', 'ember-localstorage-adapter/adapters/ls-adapter'], function (exports, _emberLocalstorageAdapterAdaptersLsAdapter) {
  exports['default'] = _emberLocalstorageAdapterAdaptersLsAdapter['default'];
});
define('tasky/app', ['exports', 'ember', 'tasky/resolver', 'ember-load-initializers', 'tasky/config/environment'], function (exports, _ember, _taskyResolver, _emberLoadInitializers, _taskyConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _taskyConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _taskyConfigEnvironment['default'].podModulePrefix,
    Resolver: _taskyResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _taskyConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('tasky/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'tasky/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _taskyConfigEnvironment) {

  var name = _taskyConfigEnvironment['default'].APP.name;
  var version = _taskyConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('tasky/components/bread-crumb', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        tagName: 'ul',
        classNames: ['breadcrumb']
    });
});
define('tasky/components/editable-div', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        tagName: 'div',
        attributeBindings: ['contenteditable'],
        // Variables:
        editable: true,
        isUserTyping: false,
        plaintext: true,

        // Properties:
        contenteditable: (function () {
            var editable = this.get('editable');

            return editable ? 'true' : undefined;
        }).property('editable'),

        // Processors:
        processValue: function processValue() {
            if (!this.get('isUserTyping') && this.get('value')) {
                return this.setContent();
            }
        },

        // Observers:
        valueObserver: (function () {
            _ember['default'].run.once(this, 'processValue');
        }).observes('value', 'isUserTyping'),

        // Events:
        didInsertElement: function didInsertElement() {
            return this.setContent();
        },

        focusOut: function focusOut() {
            return this.set('isUserTyping', false);
        },

        keyDown: function keyDown(event) {
            if (!event.metaKey) {

                var keyCode = event.keyCode || event.which;
                var isShiftKey = event.shiftKey ? true : false;

                if (keyCode === 13) {
                    event.preventDefault();
                    //$(e.target).removeAttr("contenteditable");
                    this.send('enterHandler', isShiftKey);
                } else if (keyCode === 9) {
                    event.preventDefault();
                    this.send('tabHandler', isShiftKey);
                } else if (keyCode === 38) {
                    event.preventDefault();
                    this.send('upHandler');
                } else if (keyCode === 40) {
                    event.preventDefault();
                    this.send('downHandler');
                }

                return this.set('isUserTyping', true);
            }
        },

        keyUp: function keyUp(event) {
            if (this.get('plaintext')) {
                return this.set('value', this.$().text());
            } else {
                return this.set('value', this.$().html());
            }
        },

        setContent: function setContent() {
            return this.$().html(_ember['default'].Handlebars.Utils.escapeExpression(this.get('value')));
        },

        actions: {
            enterHandler: function enterHandler(isShiftKey) {
                this.sendAction('enterHandler', isShiftKey);
            },
            tabHandler: function tabHandler(isShiftKey) {
                this.sendAction('tabHandler', isShiftKey);
            },
            upHandler: function upHandler() {
                this.sendAction('upHandler');
            },
            downHandler: function downHandler() {
                this.sendAction('downHandler');
            }
        },
        didRender: function didRender() {}
    });
});
define('tasky/components/jqui-accordion/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-accordion/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiAccordionComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiAccordionComponent['default'];
});
define('tasky/components/jqui-autocomplete/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-autocomplete/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiAutocompleteComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiAutocompleteComponent['default'];
});
define('tasky/components/jqui-button/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-button/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiButtonComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiButtonComponent['default'];
});
define('tasky/components/jqui-datepicker/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-datepicker/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiDatepickerComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiDatepickerComponent['default'];
});
define('tasky/components/jqui-menu/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-menu/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiMenuComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiMenuComponent['default'];
});
define('tasky/components/jqui-progress-bar/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-progress-bar/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiProgressBarComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiProgressBarComponent['default'];
});
define('tasky/components/jqui-slider/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-slider/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiSliderComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiSliderComponent['default'];
});
define('tasky/components/jqui-spinner/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-spinner/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiSpinnerComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiSpinnerComponent['default'];
});
define('tasky/components/jqui-tabs/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-tabs/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiTabsComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiTabsComponent['default'];
});
define('tasky/components/task-item', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        classNames: ['taskitem'],
        classNameBindings: ['selected'],
        selected: (function () {
            return this.get('selectedTask.id') === this.get('item.id');
        }).property('selectedTask'),
        didInsert: function didInsert() {},
        didRender: function didRender() {
            this._super.apply(this, arguments);

            document.addEventListener("focusTask", (function (e) {
                if (e.detail.taskid === this.get("item.id")) {
                    var title = this.$(".name .content");
                    if (title) {
                        title.attr("contenteditable", "true").focus();
                    }
                }
            }).bind(this), false);
        },
        actions: {
            createTaskHandler: function createTaskHandler(props, callback) {
                console.log("AAAA");
                this.sendAction('createTaskHandler', props, callback);
            },
            updateTaskHandler: function updateTaskHandler(props, callback) {
                this.sendAction('updateTaskHandler', props);
            },
            handleEnter: function handleEnter(isShiftKey) {
                this.sendAction('enterHandler', this.get("item.id"), isShiftKey);
            },
            handleTab: function handleTab(isShiftKey) {
                this.sendAction('tabHandler', this.get("item.id"), isShiftKey);
            },
            handleUp: function handleUp(taskid) {
                this.sendAction('upHandler', this.get("item.id"));
            },
            handleDown: function handleDown(taskid) {
                this.sendAction('downHandler', this.get("item.id"));
            }
        }
    });
});
define('tasky/components/task-list', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        tagName: 'ul',
        classNames: ['tasklist'],
        didRender: function didRender() {
            this.$().sortable({
                connectWith: ".tasklist",
                handle: ".bullet"
            });
        },
        getParentTask: function getParentTask(currentTask) {
            var el = currentTask.parents(".project");
            return el.length ? el.first() : undefined;
        },
        decrementPosition: function decrementPosition(taskitems, startpos) {

            taskitems.each((function (index, taskitem) {
                var id = _ember['default'].$(taskitem).attr("projectid");
                this.send('updateTaskHandler', {
                    id: id,
                    position: startpos++
                });
            }).bind(this));
        },
        incrementPosition: function incrementPosition(taskitems, startpos) {

            taskitems.each((function (index, taskitem) {
                var id = _ember['default'].$(taskitem).attr("projectid");
                this.send('updateTaskHandler', {
                    id: id,
                    position: startpos
                });
                startpos++;
            }).bind(this));
        },
        sendTaskEvent: function sendTaskEvent(record) {
            var newTaskEvent = new CustomEvent("focusTask", {
                detail: {
                    taskid: record.id
                }
            });
            document.dispatchEvent(newTaskEvent);
        },
        getPreviousTask: function getPreviousTask(currenttask) {
            var prevTask = currenttask.prev().find(".project:last");

            if (prevTask.length) {
                return prevTask;
            }
            prevTask = currenttask.prev();
            if (prevTask.length) {
                return prevTask;
            }
            return currenttask.parents(".project:first");
        },
        getNextTask: function getNextTask(currenttask) {
            var nextTask = currenttask.find(".project:first");
            if (nextTask.length) {
                return nextTask;
            }
            nextTask = currenttask.next();
            if (nextTask.length) {
                return nextTask;
            }
            return currenttask.parents(".project:first").next();
        },
        actions: {
            createTaskHandler: function createTaskHandler(props, callback) {
                console.log("Create task handler in task list called %O", props);

                this.sendAction('createTaskHandler', props, (function (record) {

                    if (callback) {
                        callback(record);
                    }
                }).bind(this));
            },
            updateTaskHandler: function updateTaskHandler(props, callback) {
                this.sendAction('updateTaskHandler', props, (function (record) {
                    if (callback) {
                        callback(record);
                    }
                }).bind(this));
            },
            handleEnter: function handleEnter(taskid, isShiftKey) {
                console.log("Handle enter task list called %s", taskid);
                var that = this;

                var curtask = this.$(".project[projectid='" + taskid + "']");

                //Update current task
                var titlefld = curtask.find(".name[projectid='" + taskid + "'] .content");
                var titleval = titlefld.text();
                titlefld.removeAttr("contenteditable");

                var props = {
                    id: taskid,
                    title: titleval
                };
                this.send('updateTaskHandler', props);

                if (!isShiftKey) {
                    //Create a new task as a sibling to the current task
                    var currentpos = curtask.index() + 1;
                    var tasksafter = curtask.nextAll();

                    var parenttask = this.getParentTask(curtask);

                    props = {
                        position: currentpos + 1
                    };
                    if (parenttask) {
                        props.parentTask = parenttask.attr("projectid");
                    }
                    this.send('createTaskHandler', props, (function (record) {
                        _ember['default'].run.schedule("afterRender", this, (function () {
                            this.sendTaskEvent(record);
                        }).bind(this));
                    }).bind(this));

                    //Increment the positions of following tasks
                    this.incrementPosition(tasksafter, currentpos + 2);
                }
            },
            handleTab: function handleTab(taskid, isShiftKey) {
                console.log("tab handler called...");
                var currenttask = this.$(".project[projectid='" + taskid + "']");
                var titlefld = currenttask.find(".name[projectid='" + taskid + "'] .content");

                var title = titlefld.text();

                if (!isShiftKey) {
                    var previoustask = currenttask.prev();
                    if (previoustask.length > 0) {

                        var prevtaskid = previoustask.attr("projectid");
                        var children = previoustask.find(".tasklist:first > .project").length;
                        console.log(previoustask);

                        this.send('updateTaskHandler', {
                            id: taskid,
                            parent: prevtaskid,
                            title: title,
                            position: ++children
                        }, (function (record) {
                            _ember['default'].run.schedule("afterRender", this, (function () {
                                this.sendTaskEvent(record);
                            }).bind(this));
                        }).bind(this));

                        var nextTasks = currenttask.nextAll();
                        var newpos = currenttask.index() + 1;
                        this.decrementPosition(nextTasks, newpos);
                    }
                } else {
                    //Get the parent task for position
                    //Get the parent of parent task to set as parent
                    var parentTask = this.getParentTask(currenttask);

                    if (parentTask) {
                        var parentTaskPos = parentTask.index() + 1;
                        var tasksAfter = parentTask.nextAll();
                        var parentOfParent = this.getParentTask(parentTask);

                        var props = {};
                        props.id = taskid;
                        props.position = parentTaskPos + 1;
                        props.title = title;

                        if (parentOfParent) {
                            props.parent = parentOfParent.attr("projectid");
                        } else {
                            props.parent = "null";
                        }
                        console.log("About to update task for shift tab %O", props);
                        this.send('updateTaskHandler', props, (function (record) {

                            this.incrementPosition(tasksAfter, parentTaskPos + 2);

                            _ember['default'].run.schedule("afterRender", this, (function () {
                                this.sendTaskEvent(record);
                            }).bind(this));
                        }).bind(this));
                    }
                }
            },
            handleUp: function handleUp(taskid, isShiftKey) {
                var currenttask = this.$(".project[projectid='" + taskid + "']");
                var titlefld = currenttask.find(".name[projectid='" + taskid + "'] .content");
                var title = titlefld.text();

                var parentTask = this.getPreviousTask(currenttask);

                console.log("closest task %O", parentTask);
                if (parentTask) {
                    this.sendTaskEvent({
                        id: parentTask.attr("projectid")
                    });
                }

                this.send('updateTaskHandler', {
                    id: taskid,
                    title: title
                });
            },
            handleDown: function handleDown(taskid, isShiftKey) {
                var currenttask = this.$(".project[projectid='" + taskid + "']");
                var titlefld = currenttask.find(".name[projectid='" + taskid + "'] .content");
                var title = titlefld.text();

                this.send('updateTaskHandler', {
                    id: taskid,
                    title: title
                });

                var nextTask = this.getNextTask(currenttask);

                console.log("closest task %O", nextTask);
                if (nextTask) {
                    this.sendTaskEvent({
                        id: nextTask.attr("projectid")
                    });
                }
            }
        }
    });
});
define('tasky/controllers/index', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        isSingleTask: false,

        selectedTask: undefined,

        sortProps: ['position:asc'],

        rootTasks: _ember['default'].computed.filter('model.@each.parent', function (item, index, arr) {
            return this.get("isSingleTask") ? true : item.get('parent.content') == null;
        }),

        sortedTasks: _ember['default'].computed.sort('rootTasks', 'sortProps'),

        breadcrumb: (function () {
            var items = _ember['default'].A();
            if (this.get('selectedTask')) {
                this.getParentTasks(items, this.get("selectedTask"));
            }
            return items;
        }).property('selectedTask'),

        getParentTasks: function getParentTasks(items, task) {
            var parent = task.get("parent");
            if (parent.get('content') != null) {
                this.getParentTasks(items, parent);
                items.pushObject(parent);
            }
        },
        actions: {
            createTask: function createTask(props, callback) {

                props = props ? props : {};

                console.log("About to create a new task %s %O", props.parentTask, props);

                props.position = props.position ? props.position : 1;
                props.title = props.title ? props.title : '';
                props.description = props.description ? props.description : '';

                var parenttaskid;
                if (props.parentTask) {
                    parenttaskid = props.parentTask;

                    delete props.parentTask;
                }

                props.id = '_' + Math.random().toString(36).substr(2, 9);
                var task = this.store.createRecord('task', props);

                if (parenttaskid) {
                    var parentTask = this.store.findRecord("task", parenttaskid).then(function (parentTask) {
                        console.log("Parent task %O", parentTask);
                        parentTask.get("children").pushObject(task);
                        parentTask.save();
                    });
                }
                task.save().then(function (record) {
                    if (callback) {
                        callback(record);
                    }
                });
            },
            updateTask: function updateTask(props, callback) {
                console.log("In index route update task %O", props);

                var parenttaskid = props.parent;
                delete props.parent;

                if (parenttaskid && parenttaskid != 'null') {
                    this.store.findRecord("task", parenttaskid).then((function (parentTask) {

                        var children = parentTask.get("children.length");
                        console.log("Length of children %s", children);
                        props.parent = parentTask;
                        //props.position = ++children;

                        this.store.findRecord('task', props.id).then(function (task) {
                            task.setProperties(props);
                            task.save().then(function (record) {
                                if (callback) {
                                    callback(record);
                                }
                            });
                            parentTask.save();
                        });
                    }).bind(this));
                } else {
                    if (parenttaskid == 'null') {
                        props.parent = null;
                    }
                    this.store.findRecord('task', props.id).then(function (task) {
                        task.setProperties(props);
                        task.save().then(function (record) {
                            if (callback) {
                                callback(record);
                            }
                        });
                    });
                }
            }
        }
    });
});
define('tasky/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('tasky/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('tasky/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'tasky/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _taskyConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_taskyConfigEnvironment['default'].APP.name, _taskyConfigEnvironment['default'].APP.version)
  };
});
define('tasky/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('tasky/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('tasky/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('tasky/initializers/export-application-global', ['exports', 'ember', 'tasky/config/environment'], function (exports, _ember, _taskyConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_taskyConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _taskyConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_taskyConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('tasky/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('tasky/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('tasky/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("tasky/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('tasky/models/task', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {

    //import Model from 'ember-data/model';
    // import attr from 'ember-data/attr';
    // import { belongsTo, hasMany } from 'ember-data/relationships';

    exports['default'] = _emberData['default'].Model.extend({
        title: _emberData['default'].attr('string'),
        description: _emberData['default'].attr('string'),
        position: _emberData['default'].attr('number'),
        children: _emberData['default'].hasMany("tasks", { inverse: "parent" }),
        parent: _emberData['default'].belongsTo("task", { inverse: "children" }),
        orderedSubtasks: _ember['default'].computed.sort('children.@each.position', function (task1, task2) {
            var pos1 = task1.get('position');
            var pos2 = task2.get('position');

            if (pos1 > pos2) {
                return 1;
            } else if (pos1 < pos2) {
                return -1;
            }

            return 0;
        })
    });
});
define('tasky/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('tasky/router', ['exports', 'ember', 'tasky/config/environment'], function (exports, _ember, _taskyConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _taskyConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('task', {
      path: '/task/:task_id'
    });
  });

  exports['default'] = Router;
});
define('tasky/routes/index', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Route.extend({
        model: function model() {

            return this.store.findAll('task');
        }

    });
});
define('tasky/routes/task', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Route.extend({

        model: function model(param) {
            var taskitem = this.store.findRecord('task', param.task_id);
            return taskitem;
        },
        setupController: function setupController(controller, model) {
            console.log("Setting up controller %O", model);
            this.controllerFor("index").setProperties({
                isSingleTask: true,
                selectedTask: model,
                content: _ember['default'].A([model])
            });
        },
        renderTemplate: function renderTemplate() {
            this.render("index");
        },

        actions: {
            willTransition: function willTransition(transition) {
                console.log("Transition %O", transition);
                this.controllerFor("index").setProperties({
                    isSingleTask: false,
                    selectedTask: undefined
                });
            }
        }
    });
});
define('tasky/serializers/application', ['exports', 'ember-localstorage-adapter'], function (exports, _emberLocalstorageAdapter) {
  exports['default'] = _emberLocalstorageAdapter.LSSerializer.extend();
});
define('tasky/serializers/ls-serializer', ['exports', 'ember-localstorage-adapter/serializers/ls-serializer'], function (exports, _emberLocalstorageAdapterSerializersLsSerializer) {
  exports['default'] = _emberLocalstorageAdapterSerializersLsSerializer['default'];
});
define('tasky/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("tasky/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "tasky/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1, "id", "title");
        var el2 = dom.createTextNode("Tasky");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [3, 0], [3, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tasky/templates/components/bread-crumb", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 8
            },
            "end": {
              "line": 2,
              "column": 45
            }
          },
          "moduleName": "tasky/templates/components/bread-crumb.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Home");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 8
              },
              "end": {
                "line": 6,
                "column": 79
              }
            },
            "moduleName": "tasky/templates/components/bread-crumb.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["content", "breadcrumbitem.title", ["loc", [null, [6, 55], [6, 79]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 4
            },
            "end": {
              "line": 8,
              "column": 4
            }
          },
          "moduleName": "tasky/templates/components/bread-crumb.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1, "class", "breadcrumbitem");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "link-to", ["task", ["get", "breadcrumbitem", ["loc", [null, [6, 26], [6, 40]]]]], ["class", "name"], 0, null, ["loc", [null, [6, 8], [6, 91]]]]],
        locals: ["breadcrumbitem"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "tasky/templates/components/bread-crumb.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("    ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("li");
        dom.setAttribute(el1, "class", "breadcrumbitem");
        var el2 = dom.createTextNode("\n        ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "link-to", ["index"], ["class", "name"], 0, null, ["loc", [null, [2, 8], [2, 57]]]], ["block", "each", [["get", "items", ["loc", [null, [4, 12], [4, 17]]]]], [], 1, null, ["loc", [null, [4, 4], [8, 13]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tasky/templates/components/editable-div", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "tasky/templates/components/editable-div.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tasky/templates/components/task-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 4
            },
            "end": {
              "line": 2,
              "column": 43
            }
          },
          "moduleName": "tasky/templates/components/task-item.hbs"
        },
        isEmpty: true,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "tasky/templates/components/task-item.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "name");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "description");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "content");
        dom.setAttribute(el2, "contenteditable", "");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(5);
        morphs[0] = dom.createAttrMorph(element0, 'projectid');
        morphs[1] = dom.createAttrMorph(element0, 'selectedTask');
        morphs[2] = dom.createMorphAt(element0, 1, 1);
        morphs[3] = dom.createMorphAt(element0, 3, 3);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [2, 1]), 0, 0);
        return morphs;
      },
      statements: [["attribute", "projectid", ["concat", [["get", "item.id", ["loc", [null, [1, 31], [1, 38]]]]]]], ["attribute", "selectedTask", ["concat", [["get", "selectedTask.id", ["loc", [null, [1, 58], [1, 73]]]]]]], ["block", "link-to", ["task", ["get", "item", ["loc", [null, [2, 22], [2, 26]]]]], ["class", "bullet"], 0, null, ["loc", [null, [2, 4], [2, 55]]]], ["inline", "editable-div", [], ["value", ["subexpr", "@mut", [["get", "item.title", ["loc", [null, [4, 25], [4, 35]]]]], [], []], "class", "content", "enterHandler", "handleEnter", "tabHandler", "handleTab", "upHandler", "handleUp", "downHandler", "handleDown"], ["loc", [null, [4, 4], [4, 149]]]], ["content", "item.description", ["loc", [null, [7, 41], [7, 61]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tasky/templates/components/task-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "tasky/templates/components/task-list.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1, "class", "project");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        \n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        \n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element0, 'projectid');
          morphs[1] = dom.createAttrMorph(element0, 'position');
          morphs[2] = dom.createMorphAt(element0, 1, 1);
          morphs[3] = dom.createMorphAt(element0, 3, 3);
          return morphs;
        },
        statements: [["attribute", "projectid", ["concat", [["get", "item.id", ["loc", [null, [2, 37], [2, 44]]]]]]], ["attribute", "position", ["concat", [["get", "item.position", ["loc", [null, [2, 60], [2, 73]]]]]]], ["inline", "task-item", [], ["item", ["subexpr", "@mut", [["get", "item", ["loc", [null, [3, 25], [3, 29]]]]], [], []], "selectedTask", ["subexpr", "@mut", [["get", "selectedTask", ["loc", [null, [3, 43], [3, 55]]]]], [], []], "createTaskHandler", "createTaskHandler", "updateTaskHandler", "updateTaskHandler", "enterHandler", "handleEnter", "tabHandler", "handleTab", "upHandler", "handleUp", "downHandler", "handleDown"], ["loc", [null, [3, 8], [3, 229]]]], ["inline", "task-list", [], ["model", ["subexpr", "@mut", [["get", "item.orderedSubtasks", ["loc", [null, [5, 26], [5, 46]]]]], [], []], "selectedTask", ["subexpr", "@mut", [["get", "selectedTask", ["loc", [null, [5, 60], [5, 72]]]]], [], []], "createTaskHandler", "createTaskHandler", "updateTaskHandler", "updateTaskHandler"], ["loc", [null, [5, 8], [5, 150]]]]],
        locals: ["item"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "tasky/templates/components/task-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [1, 8], [1, 13]]]]], [], 0, null, ["loc", [null, [1, 0], [8, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tasky/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 4
            },
            "end": {
              "line": 5,
              "column": 4
            }
          },
          "moduleName": "tasky/templates/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "bread-crumb", [], ["items", ["subexpr", "@mut", [["get", "breadcrumbitem", ["loc", [null, [4, 28], [4, 42]]]]], [], []]], ["loc", [null, [4, 8], [4, 44]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "tasky/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "page");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        var el3 = dom.createTextNode("+");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [5]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createElementMorph(element1);
        return morphs;
      },
      statements: [["block", "if", [["get", "selectedTask", ["loc", [null, [3, 10], [3, 22]]]]], [], 0, null, ["loc", [null, [3, 4], [5, 11]]]], ["inline", "task-list", [], ["model", ["subexpr", "@mut", [["get", "sortedTasks", ["loc", [null, [7, 22], [7, 33]]]]], [], []], "selectedTask", ["subexpr", "@mut", [["get", "selectedTask", ["loc", [null, [7, 47], [7, 59]]]]], [], []], "createTaskHandler", "createTask", "updateTaskHandler", "updateTask"], ["loc", [null, [7, 4], [7, 123]]]], ["element", "action", ["createTask"], [], ["loc", [null, [9, 7], [9, 30]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tasky/templates/task", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "tasky/templates/task.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('tasky/config/environment', ['ember'], function(Ember) {
  var prefix = 'tasky';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("tasky/app")["default"].create({"name":"tasky","version":"0.0.0+3377cb80"});
}

/* jshint ignore:end */
//# sourceMappingURL=tasky.map