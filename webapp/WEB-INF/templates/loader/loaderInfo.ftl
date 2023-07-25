<#import "/spring.ftl" as spring />
<#import "../freemarker/macro.ftl" as macro/>

<div id = "loaderInfo">
	
	<div class="pull-right"><span class="btn editLoader"><i class="icon-edit"></i> Edit</span></div><br>
	<br><div class="record"></div>
	
	<script class="asca-setting-jdbc-tmpl" type="text/x-jsrender">
    	<div class="row-fluid">
    		<div class="span12">
    			<table class="table table-bordered">
    				<tr>
    					<td>Vendor</td>
    					<td>${(selectedVendor)!""}</td>
    				</tr>
    				<tr>
    					<td>DB Provider</td>
    					<td>{{:dbProvider}}</td>
    				</tr>
    				<tr>
    					<td>DB Host</td>
    					<td>{{:dbHost}}</td>
    				</tr>
    				<tr>
    					<td>DB Port</td>
    					<td>{{:dbPort}}</td>
    				</tr>
    				<tr>
    					<td>File Location</td>
    					<td>{{:fileLocation}}</td>
    				</tr>
    				<tr>
    					<td>DB Name</td>
    					<td>{{:dbName}}</td>
    				</tr>
    				<tr>
    					<td>DB UserName</td>
    					<td>{{:dbUserName}}</td>
    				</tr>
    				{{if !dbIsDynamicTable}}
    				<tr>
    					<td>DB SwipeTable</td>
    					<td>{{:dbSwipeTable}}</td>
    				</tr>
    				{{else}}
    				<tr>
    					<td>DB SwipeTablePrefix</td>
    					<td>{{:dbTablePrefix}}</td>
    				</tr>
    				<tr>
    					<td>DB SwipeTableFormat</td>
    					<td>{{:dbTableFormat}}</td>
    				</tr>
    				
    				<tr>
    					<td>DB SwipeTableSuffix</td>
    					<td>{{:dbTableSuffix}}</td>
    				</tr>	
    				{{/if}}
    				
    				<tr>
    					<td>DB SchemaName</td>
    					<td>{{:dbSchemaName}}</td>
    				</tr>
					<tr>
						<td>Notes</td>
						<td>{{:notes}}</td>
					</tr>
    			</table>
    			<table class="table table-bordered">
    				<tr>
    					<th>Source</th>
    					<th>Destination</th>
    					<th>Settings</th>
    				</tr>
    				{{for mapping tmpl="#asca-setting-mapping-tmpl"/}}
    			</table>
    			
    		</div>
    	</div>
    </script>
	<script class="asca-setting-csv-tmpl" type="text/x-jsrender">
    	<div class="row-fluid">
    		<div class="span12">
    			<table class="table table-bordered">
    				<tr>
    					<td>Vendor</td>
    					<td>${(selectedVendor)!""}</td>
    				</tr>
    				<tr>
    					<td>Example File</td>
    					<td>{{:examplefile}}</td>
    				</tr>
    				<tr>
    					<td>File Location</td>
    					<td>{{:fileLocation}}</td>
    				</tr>
    				<tr>
    					<td>File Date Format</td>
    					<td>{{:fileDateFormat}}</td>
    				</tr>
    				<tr>
    					<td>File Extension</td>
    					<td>{{:fileExtension}}</td>
    				</tr>
					<tr>
						<td>Notes</td>
						<td>{{:notes}}</td>
					</tr>
    			</table>
    			<table class="table table-bordered">
    				<tr>
    					<th>Source</th>
    					<th>Destination</th>
    					<th>Settings</th>
    				</tr>
    				{{for mapping tmpl="#asca-setting-mapping-tmpl"/}}
    			</table>
    			
    		</div>
    	</div>
    </script>
	<script id="asca-setting-mapping-tmpl" type="text/x-jsrender">
    	<tr>
    		<td>{{:source}}</td>
    		<td>{{:destination}}</td>
    		{{if destination == 'inout'}}
    		<td>
    			IN: {{:~getInOutIndicators(inoutFormat, 1)}}<br>
    			OUT: {{:~getInOutIndicators(inoutFormat, 0)}}
    		</td> 
    		{{else}}
    		<td>{{:format}}</td>
    		{{/if}}
    	</tr>	
    </script>
</div>
<@macro.scriptresource "resources/js/loader/loaderInfo" />
	<script>
		$(function(){
			var loaderInfo = ${(loaderInfo)!"{}"};
			new gts.attendance.asca.loader.loaderInfo.Main("#loaderInfo", {loaderInfo:loaderInfo});
		});
		
</script>
	