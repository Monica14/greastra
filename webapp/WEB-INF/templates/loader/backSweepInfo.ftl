<#import "/spring.ftl" as spring />
<#import "../freemarker/macro.ftl" as macro/>
<div id="mainDiv">
	
	<div class="row-fluid" id="infoScreen">
		<div class="span12">
			<table class="table table-bordered">
				<tr><td width="50%">Back Sweep Run Time(HH:mm)</td><td><span id="scheduleTime">${(backSweepScheduleTime)!''}</span></td></tr>
				<tr><td>Back Sweep Days</td><td><span id="backSweepDays">${(backSweepDays)!''}</span></td></tr>
				<tr><td colspan="2"><span class="btn btn-danger edit offset4">Edit Setting</span></td></tr>
			</table>
		</div>
	</div>
	<div class="row-fluid" id="editScreen" style="display:none">
		<div class="span12">
		<form id="backSweepForm" class="form-horizontal">
			<table class="table table-bordered">
				<tr>
					<td width="50%">Back Sweep Run Time(HH:mm)</td>
					<td><input type="text" name="backSweepScheduleTime" maxlength="5" value="${(backSweepScheduleTime)!''}"/></td>
				</tr>
				<tr>
					<td>Back Sweep Days</td>
					<td><input type="number" name="backSweepDays" min="1" max="30" value="${(backSweepDays)!''}"/></td>
				</tr>
				<tr><td colspan="2"><span class="btn btn-primary save offset4">Save</span></td></tr>
			</table>
		</form>
		</div>
	</div>	

</div>
<@macro.scriptresource "resources/js/loader/backSweepInfo" />