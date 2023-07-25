$(function() {
	$('.btn.edit').click(function(){
		$('#infoScreen').slideUp();
		$('#editScreen').slideDown();
	});
	
	$('input[name="backSweepScheduleTime"]').blur(function(){
		/*
		 * This code is a fork of $scope.watchTimeFormat in
		 * manual-override.js to validate the time entered
		 */
		var obj = $(this).val();

		if (obj == '' || obj == 0 || obj == '00:00' || obj == undefined) {
			$(this).val('00:00');
			return;
		}
		var time = obj;
		var len = time.length;
		var result = "";

		var pos = time.indexOf(":");
		if (pos < 0) {
			pos = time.indexOf(".");
		}
		if (time.indexOf('m') < 0 && pos < 0 && parseInt(time) > 12
				&& parseInt(time) < 12) {
			time = time + 'm';
		}
		if (time.indexOf('m') > 0) {
			time = parseFloat(time.substring(0, time.indexOf('m')));
			if (isNaN(time)) {
				GtsJQuery
						.showErrorMsg('Hours entered is invalid [00:00] or [00.00] or [00h] or [00m]');
				$(this).val("00:00");
				return;
			} else {
				if (time > 59) {
					result = parseInt(time / 60);
					result = result
							+ ":"
							+ (Math.floor(time - (result * 60)) < 10
									? '0'
											+ Math.floor(time
													- (result * 60))
									: Math.floor(time - (result * 60)))
				} else {
					result = "00:"
							+ (parseFloat(time) <= 9
									? "0" + time
									: time);
				}
			}
			$(this).val(result);
			return;
		}
		var hour = "00";
		if (time.charAt(0) == '0') {
			hour = '0'
					+ (parseFloat(time.substring(1, 2))
							? parseFloat(time.substring(1, 2))
							: '0');
		} else {
			hour = (parseFloat(time.substring(0, 2)) ? parseFloat(time
					.substring(0, 2)) : '00');
			hour = (hour > 24 ? 24 : (hour < 10 ? (hour == 0
					? '00'
					: '0' + hour) : hour));
		}
		var mins = "00";
		if (pos != -1) {
			if (time.charAt(pos + 1) == '0') {
				mins = '0'
						+ (parseFloat(time.substring(pos + 2, pos + 3))
								? parseFloat(time.substring(pos + 2,
										pos + 3))
								: '0');
			} else {
				mins = (parseFloat(time.substring(pos + 1, 5))
						? parseFloat(time.substring(pos + 1, 5))
						: '00');
				mins = (mins >= 60 ? 59 : (mins < 10 ? (mins >= 6
						? 59
						: mins + '0') : mins));
				mins = (hour == 24 ? 45 : mins);
			}
		} else {
			if (len == 4) {
				var a = time.substring(2, 4);
				mins = a;
				mins = (mins >= 60 ? 59 : mins);

			}
		}
		if(hour>=24){
			hour=23;
			mins=59;
		}
		result = hour + ":" + mins;
		$(this).val(result);
	
	});
	
	$('.btn.save').click(function(){
		var form = $('#backSweepForm');		
		if (!form.valid()) {
			return;
		}

		var backSweepScheduleTime=$('input[name="backSweepScheduleTime"]').val();
		var a = backSweepScheduleTime.split(':'); // split it at the colons
		// minute is worth 60 seconds. Hour is worth 60 minutes.
		var seconds = a[0] * 60 * 60 + a[1] * 60;
		//convert to milliseconds
		backSweepScheduleTime=seconds*1000;

		var backSweepDays=$('input[name="backSweepDays"]').val();
		
			$.ajax({
						url : GtsUtils.getContextPath() + '/setting/back-sweep/save',
						data : {
							backSweepScheduleTime : backSweepScheduleTime,
							backSweepDays : backSweepDays
						},
						type : 'POST'
					}).done(function(data) {
						GtsUtils
								.successMsg('Setting updated successfully !');
						$('#scheduleTime').text($('input[name="backSweepScheduleTime"]').val());
						$('#backSweepDays').text($('input[name="backSweepDays"]').val());
						$('#infoScreen').slideDown();
						$('#editScreen').slideUp();
					});
		
	});
	
	$('#backSweepForm').validate({
		rules : {
			'backSweepScheduleTime' : {
				required : true
			},
			'backSweepDays' : {
				required : true
			}
		}
	});
});