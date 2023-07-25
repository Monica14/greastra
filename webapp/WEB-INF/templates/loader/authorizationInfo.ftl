<#import "/spring.ftl" as spring />
<#import "../freemarker/macro.ftl" as macro/>
<div id="mainDiv">
	<div class="row-fluid">
		<div class="span12">
			<table class="table table-bordered">
				<tr><td>Authorization ID</td><td>${(configuration.authorizationId)!''}</td></tr>
				<tr><td>Company URL</td><td>${(configuration.customerUrl)!''}</td></tr>
			</table>
		</div>
	</div>
</div>