<#import "/spring.ftl" as spring />
<#import "../freemarker/macro.ftl" as macro/>
<div id="mainDiv">
	<div class="row-fluid">
		<div class="btn-group pull-right">
			<button class="btn btn-success btnView onBtn" data-viewtype="onBtn">ON</button>
			<button class="btn btn-danger btnView offBtn" data-viewtype="offBtn">OFF</button>
	    </div>
	</div><br>
	<div class="row-fluid">
		<div class="span12">
			<table class="table table-bordered">
				<tr><td>Run Date</td><td>${(cursorInfo.runDate?date)!''}</td></tr>
				<tr><td>Last Swipe Date</td><td>${(cursorInfo.lastSwipeDate?datetime)!''}</td></tr>
				<tr><td>Last Swipe Count</td><td>${cursorInfo.lastSwipeCount!''}</td></tr>
				<tr><td>Last Sync Date</td><td>${(cursorInfo.lastSyncDate?datetime)!''}</td></tr>
				<tr><td>Last Sync Count</td><td>${cursorInfo.lastSyncCount!''}</td></tr>
				<tr><td>Source</td><td>${cursorInfo.source!''}</td></tr>
				<tr><td>Sync Error</td><td>${cursorInfo.syncError!''}</td></tr>
				<tr><td colspan="2"><span class="btn btn-danger edit offset4">Edit Setting</span></td></tr>
			</table>
		</div>
	</div>
	<div class="row-fluid">
		<div class="4 well hide editDiv">
				<form class="form-horizontal">
				<div class="control-group">
					<label class="control-label">Date</label>
					<div class="controls">
						<input type="text" name="date" class="span3"/>
						<span class="help-inline fetchTableBtn"><span class="btn editSave">Save</span></span>
					</div>
					</form>
				</div> 
		</div class="span8">
		</div>
	</div>
</div>
<@macro.scriptresource "resources/js/loader/cursorInfo" />
	<script>
		$(function(){
			new gts.attendance.asca.loader.cursorInfo.Main("#mainDiv", {"isOnOff":'${isOnOff?string}'});
		});
		
</script>