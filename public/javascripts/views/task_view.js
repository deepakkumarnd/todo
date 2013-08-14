define(
    [
        "models/task",
        "collections/tasks",
        "text!templates/index.html",
        "text!templates/show.html"
    ],
    function(Task, TaskList, index_template, show_template){

        var TaskView = Backbone.View.extend({
            initialize: function(task) {
                this.task = task;
            },
            el: ".task-list",
            render: function() {
                var that = this;
                var task = this.task || new Task();
                task.fetch({
                    success: function(){
                        var template = _.template(show_template, { task: task });
                        that.$el.append(template);
                    }
                });
            }
        });

        var TaskListView = Backbone.View.extend({
	    el: "body",
	    render: function() {
	        var that = this;
	        var tasks = new TaskList();
	        tasks.fetch({
		    success: function(){
		        var template = _.template(index_template, { tasks: tasks.models });
		        that.$el.html(template);
		    }
	        });
	    },
	    events: {
	        "change #new-task": "saveTask"
	    },
	    saveTask: function (ev) {
	        var target = $(ev.currentTarget);
	        var task = new Task({ item: target.val().trim() });

	        task.save(task.toJSON(), {
		    success: function(task) {
		        var task_view = new TaskView(task);
		        task_view.render();
		    }
	        });
	    }
        });
        return({ task_list_view: TaskListView, task_view: TaskView});
    }
);
