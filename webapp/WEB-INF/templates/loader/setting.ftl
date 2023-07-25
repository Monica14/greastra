<#import "/spring.ftl" as spring />
<#import "../freemarker/macro.ftl" as macro/>
<@macro.showHeader />

<div id="loader-setting">
	<div class="row-fluid">
		<div class="span3">
			<ul class="nav nav-list bs-docs-sidenav page-path-selector">
				<#if (items.children)?exists && items.children?size &gt; 0>
					<#list items.children as item>
						<li class="ui-selectee"><a href="${item.href}"><i class="icon-chevron-right"></i> ${messageResolver.getMessage(item.title)}</a></li>
					</#list>
				</#if>
        	</ul>
		</div>
		<div class="span9">
			<div class="page-content">
			</div>
		</div>
	</div>
</div>

	
<@macro.showFooter>
	<@macro.scriptresource "resources/js/loader/setting" />
	<script>
		$(function(){
			new gts.attendance.asca.loader.setting.Main("#loader-setting", {
			page: '${page!""}'
			});
		});
	</script>
</@macro.showFooter>
