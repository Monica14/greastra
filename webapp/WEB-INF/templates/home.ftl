<#import "/spring.ftl" as spring />
<#import "freemarker/macro.ftl" as macro/>

<@macro.showHeader notitle=true/>

<div class='row-fluid connection-status' id = "mainDiv">
	<div class='span12'>
		<#if info?exists>
		<table id='status-table' class="table table-bordered">
		<tbody>
			<tr>
				<td class='td-50 swipe-reader'>
				    <div class='status-icon swipe-ok pull-left'></div>
					<div class='status-outer'>
						<div class='title'>Swipes From Reader: <span class="swipe-status"><#if info.swipeOK?exists && info.swipeOK>OK<#else>Check!</#if></span></div>
						<div class='small'>Last swipe <span class="swipe-time"><abbr class="timeago" title="${info.ISOLastSwipeDate!""}"></abbr></span></div>
					</div>
				</td>
				<td class='td-50 cloud-connect'>
				    <div class='status-icon cloud-ok pull-left'></div>
					<div class='status-outer'>
						<div class='title'>Uplink to Greytip: <span class="sync-status"><#if info.syncOK?exists && info.syncOK>OK<#else>Check!</#if></span></div>
						<div class='small'>Last sync <span class="sync-time"><abbr class="timeago" title="${info.ISOLastSyncDate!""}"></abbr></span>. Sent <span class="lastSyncCount">${info.lastSyncCount!"0"?string}</span> swipes</div>
						<#if !(info.syncOK?exists) || info.syncOK == false><div class='small'>Error! <span class="sync-error">${info.syncError!""}</span></div></#if>
					</div>
				</td>
			</tr>
		</tbody>
		</table>
		</#if>
    </div>		
</div>

<div class='row-fluid' id = "mainDiv">
	<div class='span12'>
		<h4>Recent Swipes</h4>
		<table class="table table-bordered table-hover swipeTable">
			<thead >
				<th>Swipe Date</th>
				<th>Emp Id</th>
				<th>Emp Name</th>
				<th>Access Id</th>
				<th>Door</th>
				<th>In-Out Indicator</th>
			</thead >
			<tbody>
				
				<#list swipeData as swipe>
					<tr>
						<td>${swipe.swipeDate?if_exists}</td>
						<td>${swipe.employeeId?if_exists}</td>
						<td>${swipe.employeeName?if_exists}</td>
						<td>${swipe.accessId?if_exists}</td>
						<td>${swipe.doorName?if_exists}</td>
						<td>${swipe.inOutIndicator?if_exists}</td>
					</tr>
				</#list>
			</tbody>
		</table>
	</div>
</div>

<@macro.showFooter>
<@macro.scriptresource "resources/js/loader/home" />
<script>
		$(function(){
			new gts.attendance.asca.loader.home.Main("#mainDiv", {
			});
		});
	</script>
</@macro.showFooter>
