$(function() {
	$.Class('gts.attendance.asca.loader.home.Main', {}, {
		init : function(el, options) {
			this.el = $(el);
			$.extend(this.options, options);
			setInterval(function() {
				$.ajax({
							url : GtsUtils.getContextPath() + '/home/swipeinfo',
							type : 'GET',
							msgprocessing : {
								hideMessage : true
							}
						}).done(function(data) {
					if (data) {

						if (data.swipeList.length > 0) {
							$('table.swipeTable tr:gt(0)').remove();
							var html = '<tbody>';
							var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
									'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
									'Dec'];
							for (var i = 0; i < data.swipeList.length; i++) {
								var date = data.swipeList[i].swipeDate != null ? new Date(data.swipeList[i].swipeDate): null;
								if(date != null){
								dateStr = month[date.getMonth()] + " "
										+ date.getDate() + ", "
										+ date.getFullYear() + " "
										+ date.getHours() + ":"
										+ date.getMinutes() + ":"
										+ date.getSeconds() + " ";

								dateStr += date.getHours() < 12 ? 'AM' : 'PM';
								html += '<tr><td>' + dateStr + '</td><td>'
										+ data.swipeList[i].employeeId
										+ '</td><td>'
										+ (data.swipeList[i].employeeName || '')
										+ '</td><td>'
										+ (data.swipeList[i].accessId || '')
										+ '</td><td>'
										+ (data.swipeList[i].doorName || '')
										+ '</td><td>'
										+ data.swipeList[i].inOutIndicator
										+ '</td></tr>'
							}
							}
							html += '</tbody>';
						}

						$('table.swipeTable').append(html);

					}
				});

			}, 15000);

			this.elConnectStatus = $('.connection-status');
			this.elSwipeTime = $('.swipe-time',this.elConnectStatus);
			this.elSyncTime = $('.sync-time',this.elConnectStatus);
			this.elSyncCount = $('.lastSyncCount',this.elConnectStatus);
			
			this.elSwipeStatus = $('span.swipe-status',this.elConnectStatus);
			this.elSwipeStatusIcon = $('.swipe-reader .status-icon',this.elConnectStatus);
			
			this.elSyncStatus = $('span.sync-status',this.elConnectStatus);
			this.elSyncStatusIcon = $('.cloud-connect .status-icon',this.elConnectStatus);
			this.elSyncError = $('span.sync-error',this.elConnectStatus);
			
			this.checkConnectionStatus();
			setInterval($.proxy(this.checkConnectionStatus, this), 15000);

		},

		checkConnectionStatus : function() {
			$.ajax({
						url : GtsUtils.getContextPath() + '/home/cursorinfo',
						type : 'GET',
						msgprocessing : {
							hideMessage : true
						}
					}).done($.proxy(function(data) {
						if (data) {
							var iSOLastSwipeDate = jQuery
									.timeago(data.ISOLastSwipeDate);
							this.elSwipeTime.html(iSOLastSwipeDate);
							var iSOLastSyncDate = jQuery
									.timeago(data.ISOLastSyncDate);
							this.elSyncTime.html(iSOLastSyncDate);
							this.elSyncCount.text(data.lastSyncCount);
							if (data.swipeOK) {
								this.elSwipeStatus.text('OK');
								this.elSwipeStatusIcon
										.removeClass('swipe-error')
										.addClass('swipe-ok');
							} else {
								this.elSwipeStatus.text('CHECK');
								this.elSwipeStatusIcon.removeClass('swipe-ok')
										.addClass('swipe-error');
							}
							if (data.isSyncOK) {
								this.elSyncStatus.text('OK');
								this.elSyncStatusIcon
										.removeClass('cloud-error')
										.addClass('cloud-ok');
								this.elSyncError.text('');
							} else {
								this.elSyncStatus.text('CHECK');
								this.elSyncStatusIcon.removeClass('cloud-ok')
										.addClass('cloud-error');
								this.elSyncError.text(data.syncError);
							}
						}
					}, this));
		}
		
			/*
			 * showHideTableRows : function(e) { var action =
			 * $(e.currentTarget).data('action'); if (action == 'more') { var
			 * parent = $(e.currentTarget).parent().parent();
			 * $(parent).remove(); var tableRowCount = $('table.swipeTable
			 * tr').length; var hiddenRowCount = $('table.swipeTable
			 * tr.hide').length; var startIndex = parseInt(tableRowCount -
			 * hiddenRowCount); var endIndex = startIndex + 8;
			 * $('table.swipeTable tr:gt(' + 1 + '):lt(' + endIndex + ')')
			 * .removeClass('hide').addClass('visible'); var a; if
			 * (tableRowCount > endIndex) { a = '<span class="btn btn-link"
			 * data-action="more">More</span><span class="btn btn-link
			 * pull-right" data-action="less">Less</span>'; } else { a = '<span
			 * class="btn btn-link pull-right" data-action="less">Less</span>'; }
			 * 
			 * $('table.swipeTable').append('<tr><td colspan="7">' + a + '</td></tr>') }
			 * else { var parent = $(e.currentTarget).parent().parent();
			 * $(parent).remove(); var tableRowCount = $('table.swipeTable
			 * tr').length; var visibleRowCount = $('table.swipeTable
			 * tr.visible').length; var startIndex = parseInt(visibleRowCount -
			 * 9); var endIndex = visibleRowCount; $('table.swipeTable tr:gt(' +
			 * startIndex + '):lt(' + endIndex +
			 * ')').addClass('hide').removeClass('visible'); var a; a = '<span
			 * class="btn btn-link" data-action="more">More</span><span
			 * class="btn btn-link pull-right" data-action="less">Less</span>';
			 * $('table.swipeTable').append('<tr><td colspan="7">' + a + '</td></tr>') } }
			 */
	});
});