<ul class="nav">
	<#if (_navigation_.children)?exists>
		<#list _navigation_.children as node>
			<#assign nodeItems = "" />
			<#if !node.isHidden() && (node.children)?exists && (node.children)?size &gt; 0>
				<#assign dropdownItems = "" />

				<#list node.children as item>
					<#if item.isContainer()>
						<#assign l3Items = "" />
						<#list item.children as l3>
							<#if !l3.isHidden() && (l3.href!"") != "">
								<#assign l3Items>
									${l3Items}
											<#if l3.spacer?? && l3.spacer = "_above">
												<li class="divider"></li>
											</#if>
									<li><a href="${rc.getContextPath()}${l3.href}">${messageResolver.getMessage(l3.title)}</a></li>
											<#if l3.spacer?? && l3.spacer = "_below">
												<li class="divider"></li>
											</#if>
								</#assign>
							</#if>
						</#list>
						<#if l3Items != "">
							<#assign dropdownItems>
								${dropdownItems}
								<li class="dropdown-submenu">
									<a href="#">${messageResolver.getMessage(item.title)}</a>
									<ul class="dropdown-menu">
										${l3Items}
									</ul>
								</li>
							</#assign>
						</#if>
					<#elseif !item.isHidden() && (item.href!"") != "">
						<#assign dropdownItems>
							${dropdownItems}
									<#if item.spacer?? && item.spacer = "_above">
										<li class="divider"></li>
									</#if>
							<li><a href="${rc.getContextPath()}${item.href}">${messageResolver.getMessage(item.title)}</a></li>
									<#if item.spacer?? && item.spacer = "_below">
										<li class="divider"></li>
									</#if>
						</#assign>
					</#if>
				</#list>

				<#if dropdownItems != "">
					<#assign nodeItems>
						${nodeItems}
						<ul class="dropdown-menu">
							${dropdownItems}
 						</ul>
					</#assign>
				</#if>
			</#if>
			
			<#if nodeItems != "">
				<li class="dropdown" data-nodeId="${node.id}">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">${messageResolver.getMessage(node.title)}<b class="caret"></b></a>
					${nodeItems}
			<#elseif !node.isContainer() && !node.isHidden() && (node.href!"") != "">
				<li>
					<a href="${rc.getContextPath()}${node.href}">${messageResolver.getMessage(node.title)}</a>
				</li>
			</#if>
		</#list>
	</#if>
</ul>
