<#import "/spring.ftl" as spring />
<#import "freemarker/macro.ftl" as macro/>

<@macro.showHeader innerpage=false notitle=true/>
<style type="text/css">
.login-form-banner{
	display:table;
	padding-bottom:8px;
}
.version-display{
	display:table-cell;
	padding-left:9px;
	font-weight:bold;
	vertical-align:bottom;
	color:#1ABBEF;
}
</style>

<div id="remote-login" class='row-fluid'>
	<div class='offset2 span8 setup-container'>
	   <div class="login-form-banner">
			<img src='/resources/images/gta-big.png'/>
			<div class="version-display">v${(astraVersion)!''}</div>
	   </div>
		<p class='bold'>Welcome to Greytip Astra, the travel agent, that transports attendance swipes of employees from your office to the cloud!</p>

		<h4>Your Greytip Online Account Information</h4>
		<form id="repository-setup" method="POST" class="form-horizontal">
			<@macro.ctrltext name="url" label="URL" value="${(config.customerUrl)!''}" placeholder="https://mycompany.greytip.in"/>
			<@macro.ctrltext name="user" label="User ID"/>
			<@macro.ctrlpassword name="password" label="Password"/>
			<br />
			If you are using a network proxy for internet connection <a href="#" class="network-proxy">click here</a>
			<div class="proxy-settings hide" style="padding-top: 10px">
				<@macro.ctrltext name="proxyHost" label="Host" value="${(config.proxyHost)!''}"/>
				<@macro.ctrltext name="proxyPort" label="Port" value="${(config.proxyPort?string('##############'))!''}"/>
				<@macro.ctrltext name="proxyUser" label="User" value="${(config.proxyUser)!''}"/>
				<@macro.ctrlpassword name="proxyPassword" label="Password"/>
			</div>

			<div class="form-actions">
				<button class="btn-primary btn login">Login Now!</button>
			</div>
		</form>
	</div>
</div>
	
<@macro.showFooter innerpage=false>
	<@macro.scriptresource "resources/js/main/login" />
	<script>
		$(function(){
			new gts.attendance.asca.login.Main("#remote-login", {});
		});
	</script>
</@macro.showFooter>
