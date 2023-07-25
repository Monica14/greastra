$(function() {
	$.Class('gts.attendance.asca.loader.cursorInfo.Main', {}, {
		init : function(el, options) {
			this.el = $(el);
			$.extend(this.options, options);
			this.options = $.extend({}, options);
			$('button.btnView', this.el).on('click',
					this.callback('changeViewType'));
			$('span.edit', this.el).on('click', this.callback('editSetting'));
			$('span.editSave', this.el).on('click',
					this.callback('saveEditChanges'))

			$(':input[name="date"]', this.el).datepicker({
						dateFormat : "dd M yy",
						maxDate : new Date()
					});
			
			$('button.btnView').removeClass('disabled')
			if (this.options.isOnOff == true || this.options.isOnOff == 'true') {
				$('button.onBtn', this.el).addClass('disabled');

			} else {
				$('button.offBtn', this.el).addClass('disabled');
			}

		},
		editSetting : function() {
			$('div.editDiv').slideToggle();
		},
		saveEditChanges : function() {
			var date = $(':input[name="date"]').val();
			var timestamp = Date.parse($(':input[name="date"]').val());
			if (date == '') {
				GtsUtils
						.errorMsg('Please enter the date OR select from datepicker.')
				return;
			} else if (isNaN(timestamp) == true) {
				GtsUtils
						.errorMsg('Entered value is not date !! Enter proper date.')
				return;
			} else {
				$.ajax({
							url : GtsUtils.getContextPath() + '/setting/edit',
							data : {
								date : date
							},
							type : 'POST',
							msgprocessing : {
								hideMessage : true
							}
						}).done(function(data) {

							GtsUtils
									.successMsg('Setting updated successfully !')

						});

			}
		},
		changeViewType : function(e) {
			var el = $(e.currentTarget);
			if (!$(el).hasClass('disabled')) {
				$('button.btnView').removeClass('disabled')
				$(el).addClass('disabled');
				this.btnAction = $(el).data('viewtype');
				$.ajax({

							url : GtsUtils.getContextPath()
									+ '/setting/setonoff',

							data : {
								action : this.btnAction
							},
							type : 'POST'
						}).done(function(data) {
						})
			}
		}

	});
});