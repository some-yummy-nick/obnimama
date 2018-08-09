function addPhoneMask(elements) {
	var phones = document.querySelectorAll(elements);
	Array.prototype.forEach.call(phones, function(child) {
		var mask = new IMask(child,{
			mask: '{8}(000)000-00-00'
		});
	});
}

function addVoidForLinks(links) {
  $.each(links, function () {
    if ($(this).attr("href") == "" || $(this).attr("href") == "#") {
      $(this).attr("href", "javascript:void(0)");
    }
  });
}

//start accordion
(function ($) {
	var methods = {
		init: function (options) {
			var defaults = {
				close: false
			};
			var keys = {
				down: 40,
				up: 38
			};
			return this.each(function () {
				var settings = $.extend(defaults, options);
				var self = $(this);
				var that = this;
				var button = self.find(".js-accordion__button");
				var close = self.attr("data-close");
				var label = self.attr("aria-label");

				self.on("keydown", function (e) {
					var focused = $(":focus");

					if (e.keyCode == keys.down) {
						if (focused.parent().next()) {
							focused
								.parent()
								.next()
								.find(".js-accordion__button")
								.focus();
						}
					} else if (e.keyCode == keys.up) {
						if (focused.parent().prev()) {
							focused
								.parent()
								.prev()
								.find(".js-accordion__button")
								.focus();
						}
					}
				});

				button.each(function ( index) {
					var child = $(this);
					var block = this.parentNode;
					var content = $(this)[0].nextElementSibling;
					var selected = child.attr("aria-selected");
					child.attr("aria-expanded", selected);
					child.attr("id", label + "-tab-" + index);
					child.attr("aria-controls", label + "-panel-" + index);
					content.setAttribute("aria-labelledby",label + "-tab-" + index );
					content.setAttribute("id",label + "-panel-" + index );
					content.setAttribute("aria-hidden", true);

					function activeBlocks() {
						if (child.attr("aria-selected") == "true") {
							button.each(function () {
								$(this).attr("aria-selected", false);
							})
							child.attr("aria-selected", true);
							block.classList.add("active");
							content.setAttribute("aria-hidden", false);
							content.style.maxHeight = content.scrollHeight + "px";
						}
					}

					activeBlocks();

					child.on("click", function () {
						button.each(function () {
							$(this).attr("aria-selected", "false");
						});
						child.attr("aria-selected", "true");

						if (settings.close || close) {
							var otherBlocks = that.querySelectorAll(".js-accordion__block");
							var otherContent = that.querySelectorAll(".js-accordion__content");

							for (let i = 0; i < otherContent.length; i++) {
								otherContent[i].style.maxHeight = null;
							}
						}
						if (block.classList.contains("active")) {
							block.classList.remove("active");
							content.setAttribute("aria-hidden", "true");
							child.attr("aria-expanded", "false");
							content.style.maxHeight = null;
						} else {
							if (settings.close || close) {
								for (let i = 0; i < otherBlocks.length; i++) {
									otherBlocks[i].classList.remove("active");
								}
							}
							block.classList.add("active");
							content.setAttribute("aria-hidden", "false");
							child.attr("aria-expanded", "true");
							content.style.maxHeight = content.scrollHeight + "px";
						}
					});
				});
			});
		}
	};

	$.fn.accordion = function (action) {
		if (methods[action]) {
			return methods[action].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof action === "object" || !action) {
			return methods.init.apply(this, arguments);
		} else {
			console.info("Action " + "'" + action + "'" + " not found in this plugin");
		}
	};
})(jQuery);
//end accordion




