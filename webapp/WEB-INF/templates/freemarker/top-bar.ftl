<div class="navbar navbar-inverse navbar-fixed-top">
	<div class="navbar-inner">
		<div class="container">
			<a class="brand" href="${rc.getContextPath()}/home">Greytip Astra</a>

			<#if _authenticated_?exists && _authenticated_>
				<#include "menu.ftl" />
			</#if>

			<#if _authenticated_?exists && _authenticated_>
				<div class="nav-collapse collapse pull-right">
					<ul class="nav">
						<li><a href="/setting">Settings</a></li>
						<li class="_logout"><a href="/logout">Logout</a></li>
					</ul>
				</div>
			</#if>
		</div>
	</div>
</div>        
