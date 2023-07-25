$(function() {
	$.Class('gts.attendance.asca.loader.setting.Main', {}, {
		init : function(el, options) {
			this.el = $(el);
			$.extend(this.options, options);
			this.options = $.extend({}, options);

			this.elPageSelector = $(".page-path-selector", this.el);
			this.elPageContainer = $(".page-content", this.el);

			$(this.elPageSelector).on("click", "li.ui-selectee > a",
					this.proxy('onPathSelectorClick'));

			if (this.options.page) {
				this.loadPage(this.options.page);
			} else {
				var sval;
				if (sval
						&& $("li.ui-selectee > a[href='" + sval + "']",
								this.elPageSelector).length > 0) {
					this.loadPage(sval);
				} else if ($("li.ui-selectee > a[href]", this.elPageSelector).length > 0) {
					var href = $("li.ui-selectee > a[href]",
							this.elPageSelector).attr("href");
					if (href) {
						this.loadPage(href);
					}
				}
			}

		},
		loadPage : function(location) {
			$("li", this.elPageSelector).removeClass("active");

			$("li.ui-selected", this.elPageSelector).removeClass("ui-selected");
			$("a[href='" + location + "']", this.elPageSelector).closest("li")
					.addClass("ui-selected");
			$("li.ui-selected", this.elPageSelector).addClass("active")
			this.elPageContainer
					.load(GtsUtils.getContextPath() + location,
							false, this.proxy("onApplyContentLoad"));

		},

		onPathSelectorClick : function(e) {
			var target = $(e.target);
			var href = target.attr("href");
			if (href) {
				this.loadPage(href);
			}
			e.preventDefault();
			return false;
		},

		onApplyContentLoad : function(responseText, textStatus, XMLHttpRequest) {
		}

	});
});