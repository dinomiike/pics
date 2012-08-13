(function($, window, undefined) {
	var source = $("#photoTemplate").html();

	// Model ===================================================
	window.Pics = Backbone.Model.extend({
		urlRoot: "/pics/assets/api/getPic",
		defaults: {
			filename: 'No-file',
			description: 'No-description'
		}
	});

	// View - Pic ===============================================
	window.PicsView = Backbone.View.extend({
		tagName: "div",
		id: "pic",
		template: Handlebars.compile($("#photoTemplate").html()), //source),
		initialize: function() {
			this.model.fetch();
			this.model.on("change", this.render, this);
			//this.model.bind("change", this.render, this);
		},
		render: function() {
			// Assign the content of the main div
			var attributes = this.model.toJSON();

			// Modify the filename attribute to contain the relative path to the image
			// Note: If you use <img src={{filename}}> in the Handlebars template, the web browser tries to 
			// interpret the root of the src without a filename, resulting in a the wrong MIME type being sent
			//attributes.filename = "src=assets/photos/miike/"+attributes.filename;

			this.$el.html(this.template(attributes));
			return this;
		}
	});

	// View - Index =============================================
	var IndexView = Backbone.View.extend({
		tagName: "div",
		id: "hero-container",
		render: function() {
			var html = "<div class=\"hero-unit\"><h1>We got pics.</h1>";
			html += "<p>Pics is a tool for sharing photos with anyone online.</p></div>";
			return this.$el.html(html);
		}
	});

	// View - Errors ============================================
	// May not need one for now

	// Router ==================================================
	//var PicsRouter = new (Backbone.Router.extend({
	var PicsRouter = Backbone.Router.extend({
		routes: {
			"": "index",
			"view/:id": "view",
			"tags": "tags",
			"user": "usr"
		},

		initialize: function() {
			//console.log("Initialize invoked");
		},

		index: function() {
			//console.log("Index invoked");
			this.indexView = new IndexView({});
			$("#console").html(this.indexView.render());
		},

		/*start: function() {
			Backbone.history.start();
		},*/

		view: function(id) {
			//if (typeof data.pics[id] === "undefined") {
			//	//console.log("This image cannot be found");
			//	$("#error").slideDown("fast");
			//} else {
			//	//this.pics = new Pics(data.pics[id]);

			//this.pics = new Pics({id: id});
			//this.picsView = new PicsView({model: this.pics});
			//$("#console").html(this.picsView.render().el);

			var pics = new Pics({id: id});
			var picsView = new PicsView({model: pics});

			$("#console").html(picsView.render().el);
			//}
		},

		tags: function() {
			//console.log("View the tags of a pic or the tags posted by a user");
		},

		usr: function() {
			//console.log("View the profile of a user, including their pics and tags");
		}
	});

	var app = new PicsRouter();
	Backbone.history.start();
	//PicsRouter.start();
}(jQuery, window));
