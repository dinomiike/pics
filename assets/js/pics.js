(function($, window, undefined) {
	var source = $("#photoTemplate").html();

	// Models ==================================================
	window.Pics = Backbone.Model.extend({
		urlRoot: "/pics/assets/api/getPic",
		defaults: {
			filename: 'No-file',
			description: 'No-description'
		}
	});

	window.PicsTagged = Backbone.Model.extend({
		urlRoot: "/pics/assets/api/getPicsTagged",
		defaults: {
			id: 'No-id'
		}
	});

	window.TagsCloud = Backbone.Model.extend({
		urlRoot: "/pics/assets/api/getTagCloud"
	});

	window.SearchTags = Backbone.Model.extend({
		urlRoot: "/pics/assets/api/searchTagsFor"
	});

	window.SearchPics = Backbone.Model.extend({
		urlRoot: "/pics/assets/api/searchPicsFor"
	});

	// View - Pic ===============================================
	window.PicsView = Backbone.View.extend({
		tagName: "div",
		id: "pic",
		template: Handlebars.compile($("#photoTemplate").html()), //source),
		events: {
			"click button": "pickTag"
		},
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
		},
		pickTag: function(event) {
			_gaq.push(['_trackEvent', 'tags', event.currentTarget.id]);
			if ($("#pic").is(":visible")) {
				$("#pic").hide();
			}
			window.location = "#tags/"+event.currentTarget.id;
		}
	});

	// View - Tag List ==========================================
	window.TagsView = Backbone.View.extend({
		tagName: "div",
		id: "tags",
		template: Handlebars.compile($("#tagsTemplate").html()),
		events: {
			"click button": "pickTag"
		},
		initialize: function() {
			this.model.fetch();
			this.model.on("change", this.render, this);
		},
		render: function() {
			var attributes = this.model.toJSON();

			//console.log(attributes);
			this.$el.html(this.template(attributes));
			return this;
		},
		pickTag: function(event) {
			_gaq.push(['_trackEvent', 'tags', event.currentTarget.id])
		}
	});

	// View - Index =============================================
	var IndexView = Backbone.View.extend({
		tagName: "div",
		id: "hero-container",
		template: Handlebars.compile($("#startTemplate").html()),
		events: {
			"click button": "pickTag"
		},
		initialize: function() {
			this.model.fetch();
			this.model.on("change", this.render, this);
		},
		render: function() {
			var attributes = this.model.toJSON();
			this.$el.html(this.template(attributes));
			return this;
		},
		pickTag: function(event) {
			_gaq.push(['_trackEvent', 'tags', event.currentTarget.id]);
			window.location = "#tags/"+event.currentTarget.id;
		}
	});

	// View - Search Tags  ======================================
	var SearchTagsView = Backbone.View.extend({
		tagName: "div",
		id: "searchTagsResults",
		template: Handlebars.compile($("#searchTagsTemplate").html()),
		initialize: function() {
			this.model.fetch();
			this.model.on("change", this.render, this);
		},
		render: function() {
			var attributes = this.model.toJSON();
			this.$el.html(this.template(attributes));
			return this;
		}
	});

	// View - Search Pics =======================================
	var SearchPicsView = Backbone.View.extend({
		tagName: "div",
		id: "searchPicsResults",
		template: Handlebars.compile($("#searchPicsTemplate").html()),
		initialize: function() {
			this.model.fetch();
			this.model.on("change", this.render, this);
		},
		render: function() {
			var attributes = this.model.toJSON();
			this.$el.html(this.template(attributes));
			return this;
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
			"tags/:name": "tags",
			"user": "usr",
			"search/:params": "search"
		},

		initialize: function() {
			//console.log("Initialize invoked");
		},

		index: function() {
			var tagsCloud = new TagsCloud({});
			var indexView = new IndexView({model: tagsCloud});
			$("#console").html(indexView.render().el);
		},

		/*start: function() {
			Backbone.history.start();
		},*/

		view: function(id) {
			var pics = new Pics({id: id});
			var picsView = new PicsView({model: pics});

			$("#console").html(picsView.render().el);
		},

		tags: function(name) {
			//console.log("View all the images for the " + name + " tag"); 
			var tags = new PicsTagged({id: name});
			var tagsView = new TagsView({model: tags});

			$("#console").html(tagsView.render().el);
		},

		usr: function() {
			//console.log("View the profile of a user, including their pics and tags");
		},

		search: function(params) {
			var searchTags = new SearchTags({id: params});
			var searchTagsView = new SearchTagsView({model: searchTags});

			var searchPics = new SearchPics({id: params});
			var searchPicsView = new SearchPicsView({model: searchPics});

			$("#console").html(searchTagsView.render().el);
			$("#console").append(searchPicsView.render().el);
		}
	});

	var app = new PicsRouter();
	Backbone.history.start();

	// Search Form
	$("#search").on("submit", function() {
		var path = location.href;
		var point = path.indexOf("#search");
		var criteria = $("#searchCriteria").val();
		window.location = point != -1 ? path.substring(0, point)+"#search/"+criteria : path+"#search/"+criteria;
		return false;
	});
}(jQuery, window));
