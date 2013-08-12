define([
    "models/task.js",
    "collections/task_collection.js",
    "text!templates/index.html",
    "text!templates/show.html"
], function(Task, TaskList, indexTemplate, showTemplate){
    var TaskView = Backbone.View.extend({
	el: "body",
	render: function() {
	    var that = this;
	    var tasks = new TaskList();
	    tasks.fetch({
		success: function(){
		    var template = _.template(indexTemplate, { tasks: tasks.models });
		    that.$el.html(template);
		}
	    });
	},
	events: {
	    "change #new-task": "saveTask"
	},
	saveTask: function (ev) {
	    var target = $(ev.currentTarget);
	    var task = new Task({
		item: target.val(),
		status: "pending"
	    });

	    task.save(task.toJSON(), {
		success: function() {
		    var taskList = new TaskView();
		    taskList.render();
		}
	    });
	}
    });

    return TaskView;
});