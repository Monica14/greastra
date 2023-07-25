$(function() {

	$.views.helpers({
				getInOutIndicators : function(object, type) {
					var indicators = [];
					$.each(object, function(i, v) {
								if (v.value == type) {
									indicators.push(v.key);
								}
							});
					return indicators.join(', ');
				}
			});

	$.Class('gts.attendance.asca.loader.loaderInfo.Main', {}, {
				init : function(el, options) {
					this.el = $(el);
					$.extend(this.options, options);
					this.options = $.extend({}, options);
					$.templates("asca-setting-jdbc-tmpl",
							$('.asca-setting-jdbc-tmpl')[0]);
					$.templates("asca-setting-csv-tmpl",
							$('.asca-setting-csv-tmpl')[0]);
					if (this.options.loaderInfo.fileType == 'jdbc') {
						$($.render["asca-setting-jdbc-tmpl"](this.options.loaderInfo))
								.appendTo($('.record', this.el));

					} else {
						$($.render["asca-setting-csv-tmpl"](this.options.loaderInfo))
								.appendTo($('.record', this.el));

					}
					$('span.editLoader', this.el).on('click', function() {
						window.location = GtsUtils.getContextPath()
								+ "/loader/setup";
					})

				}

			});
});