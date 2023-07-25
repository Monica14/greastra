<#import "/spring.ftl" as spring />
<#import "../freemarker/macro.ftl" as macro/>

<@macro.showHeader />

	<div class="row-fluid">
		<div class="span3">
		</div>
		<div class="span9">
			<div id="loader-setup">
			
				<div class="wizard-panel storage-type hide active" data-btns="next,cancel" data-configkeys="installationName,fileType,vendor">
					<form class="form-horizontal">
					    <@macro.ctrltext name="installationName" label="Installation Name" size="span6" helptext="Provide an unique name for this installation. This will be used as Office Location for tracking purpose."/>
						<@macro.ctrlselect2 name="fileType" label="Data Storage Type" size="span6" />
						<@macro.ctrlselect2 name="vendor" label="Vendor" size="span6" />
					</form>
				</div>

				<div class="wizard-panel storage-file-det hide" data-btns="prev,next,cancel" data-configKeys="examplefile,fileLocation,filePrefix,fileDateFormat,fileSuffix,fileExtension,notes">
					<form class="form-horizontal" enctype="multipart/form-data">
						<@macro.ctrlfile name="examplefile" label="Example File" size="span6"/>
						<@macro.ctrltext name="fileLocation" label="File Location" class="span8" size="span6"/>
						<@macro.ctrltext name="filePrefix" label="Prefix" class="span8" size="span6"/>
						<@macro.ctrlselect2 name="fileDateFormat" label="Date Format" size="span6" />
						<@macro.ctrltext name="fileSuffix" label="Suffix" size="span6" />
						<@macro.ctrltext name="fileExtension" label="Extension" size="span6" value="${(config.inputFileExtension)!''}"/>
						<@macro.ctrltextarea name="notes" label="Notes" size="span6" />
					</form>
				</div>

				<div class="wizard-panel storage-db-det hide" data-btns="prev,next,cancel" data-configKeys="dbProvider,dbHost,dbPort,dbName,dbUserName,dbPassword,dbSwipeTable,dbSchemaName,notes,
				dbIsDynamicTable,dbTablePrefix,dbTableFormat,dbTableSuffix,fileLocation">
					<form class="form-horizontal">
						<form class="form-horizontal" enctype="multipart/form-data">
						<@macro.ctrlselect2 name="dbProvider" label="Database Provider" size="span6" />
						<@macro.ctrltext name="dbHost" label="Host" class="span8" size="span6" class="notMsaccess"/>
						<@macro.ctrltext name="dbPort" label="Port" class="span8" size="span6" class="notMsaccess"/>
						<@macro.ctrltext name="fileLocation" label="File Location" class="span8" size="span6" class="msAccess"/>
						<@macro.ctrltext name="dbName" label="Database Name" size="span6" />
						<@macro.ctrltext name="dbSchemaName" label="Schema Name" size="span6" class="notMsaccess"/>
						<@macro.ctrltext name="dbUserName" label="Username" size="span6" autocomplete="new-password"/>
						<@macro.ctrlpassword name="dbPassword" label="Password" size="span6" autocomplete="new-password"/>
						<div class="control-group">
							<label class="control-label">Is Dynamic Table</label>
							<div class="controls">
								<input type="checkbox" name="dbIsDynamicTable" id="dbIsDynamicTable" error-placement="inline" />
							</div>
						</div>
						<div id="dynamicTable">
						<div class="control-group">
							<label class="control-label">Tabel Name Prefix</label>
							<div class="controls">
								<input type="text" name="dbTablePrefix" id="dbTablePrefix" error-placement="inline" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label">Table Format</label>
							<div class="controls">
								<input type="text" name="dbTableFormat" id="dbTableFormat" error-placement="inline" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label">Tabel Name Suffix</label>
							<div class="controls">
								<input type="text" name="dbTableSuffix" id="dbTableSuffix" error-placement="inline" />
							</div>
						</div>
						</div>
						<div class="control-group" id="swipeTable">
						<label class="control-label">Swipe Tables</label>
						<div class="controls">
							<input type="text" name="dbSwipeTable"" class="span6" error-placement="inline" all-true="true" data-config=""/>
							<span class="help-inline fetchTableBtn"><span class="btn">Fetch Tables</span></span>
							<span class="help-block field-help hide"></span>
						</div>
						</div>
						<@macro.ctrltextarea name="notes" label="Notes" size="span6" />
						<span class="btn btn-primary offset4 test-connection" id="testConnection">Test Connection</span>
						
					</form>
					</form>
				</div>


				<div class="wizard-panel fields-csv hide" data-btns="prev,cancel,finish" data-configKeys="">
					<div class="field-mappings">
					</div>
				</div>

				<div class="wizard-panel fields-db hide" data-btns="prev,next,cancel,finish" data-configKeys="">
					<form class="form-horizontal">
						DB mapping
					</form>
				</div>
			
				<div class="form-actions text-center wizard-actions" style="text-align: center;">
					<div class="pull-left">
						<span class="btn wizard-prev hide wizard-btn">Back</span>
					</div>
					<span class="btn wizard-cancel hide wizard-btn">Cancel</span>
					<div class="pull-right">
						<span class="btn btn-primary wizard-finish hide wizard-btn">Finish</span>
						<span class="btn btn-primary wizard-next hide wizard-btn">Next</span>
					</div>
				</div>

				<script class="tmpl-field-format-settings-dt" type="text/x-jsrender">
					<@macro.uimodalwrapper class="hide field-format-settings">
						<@macro.uimodalheader title="Field Format">
						</@macro.uimodalheader>
						<@macro.uimodalbody>
							<form class="form-horizontal">
								<@macro.ctrlselect2 name="format" label="Field Format" size="span6" />
							</form>
						</@macro.uimodalbody>
						<@macro.uimodalfooter>
							<span class="btn btn-primary save-format">Save</span>
						</@macro.uimodalfooter>
					</@macro.uimodalwrapper>
				</script>
				
				<script class="tmpl-field-inout-settings-dt" type="text/x-jsrender">
					<@macro.uimodalwrapper class="hide field-inout-settings">
						<@macro.uimodalheader title="Field Format">
						</@macro.uimodalheader>
						<@macro.uimodalbody>
							<form class="form-horizontal">
								<@macro.ctrlselect2 name="inFormat" label="IN" size="span10" />
								<@macro.ctrlselect2 name="outFormat" label="OUT" size="span10" />
							</form>
						</@macro.uimodalbody>
						<@macro.uimodalfooter>
							<span class="btn btn-primary save-format">Save</span>
						</@macro.uimodalfooter>
					</@macro.uimodalwrapper>
				</script>

				<script class="tmpl-csv-field-mapping" type="text/x-jsrender">
					<form class="form-horizontal">
						<@macro.ctrltext name="column-count" label="No of Columns" size="span6" value="{{:columns.length}}"/>
						<fieldset class="col-fields">
							{{for columns tmpl=~tmplField/}}
						</fieldset>
					</form>
				</script>

				<script class="tmpl-csv-field-mapping-field" type="text/x-jsrender">
					<div class="control-group">
						<label class="control-label">{{:column}}</label>
						<div class="controls">
							<input type="text" name="field-{{:index}}" class="column-field span6" error-placement="inline" all-true="true" data-config="" data-fieldsource="{{:source}}"/>
							<span class="help-inline hide field-settings"><span class="btn"><i class="icon-asterisk"></i></span></span>
							<span class="help-block field-help hide"></span>
						</div>
					</div>
				</script>

			</div>
		</div>
	</div>

<@macro.showFooter>
	<@macro.scriptresource "resources/js/loader/setup" />
	<script>
	var vendorItem=[];
	<#if vendors??>
		<#list vendors as vendor>
			vendorItem.push({id : '${(vendor.vendor_code)!""}', text : '${(vendor.vendor_name)!''}'});
		</#list>
	</#if>
		$(function(){
			var config = ${(config.getMappingJson())!"{}"};
			new gts.attendance.asca.loader.setup.Main("#loader-setup", {"config":config,"vendorItem":vendorItem});
		});
	</script>
</@macro.showFooter>
