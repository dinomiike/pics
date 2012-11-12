$(document).ready(function() {
		// Model ===================================================
		var Pics = Backbone.Model.extend({
			urlRoot: "/assets/api/getPic", 
			defaults: {
				fileName: 'No-file',
				fileNumber: 'No-number',
				description: 'No-description'
			}
		});

		// View - Pic ===============================================
		var PicsView = Backbone.View.extend({
			tagName: "div",
			id: "pic",
			render: function() {
				// Collect the tags for this image
				//var tags = this.model.get("tags");

				// Assign the content of the main div
				var html = "<img src=\"assets/photos/miike/" + this.model.get("fileName") + "\">";
				html += "<h3>" + this.model.get("description") + "</h3>";

				/*if (tags.length !== 0) {
					var temp = "";
					tags.forEach(function(tag) {
						temp += "<button class=\"btn btn-primary\">" + tag + "</button>&nbsp; ";
					});
					html += temp;
				}*/

				return this.$el.html(html);
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
		/* May not need one for now */

		// Router ==================================================
		var PicsRouter = new (Backbone.Router.extend({
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

			start: function() {
				Backbone.history.start();
			},

			view: function(id) {
				//if (typeof data.pics[id] === "undefined") {
					//console.log("This image cannot be found");
					//$("#error").slideDown("fast");
				//} else {
					//this.pics = new Pics(data.pics[id]);
					this.pics = new Pics({refid: id});
					this.picsView = new PicsView({model: this.pics});

					//console.log("View a particular image. In this case, "+id);
					$("#console").html(this.picsView.render());
				//}
			},

			tags: function() {
				//console.log("View the tags of a pic or the tags posted by a user");
			},

			usr: function() {
				//console.log("View the profile of a user, including their pics and tags");
			}
		}));

		$(function() {
			PicsRouter.start();
		});
});
