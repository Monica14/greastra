<#import "/spring.ftl" as spring />

<#macro showHeader htmlclass="" innerpage=true notitle=false>
<!doctype html>
	<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
	<!--[if lt IE 7]> <html class="no-js ie6 oldie ${htmlclass}" lang="en"> <![endif]-->
	<!--[if IE 7]>	<html class="no-js ie7 oldie ${htmlclass}" lang="en"> <![endif]-->
	<!--[if IE 8]>	<html class="no-js ie8 oldie ${htmlclass}" lang="en"> <![endif]-->
	<!-- Consider adding an manifest.appcache: h5bp.com/d/Offline -->
	<!--[if gt IE 8]><!--> <html class="no-js ${htmlclass}" lang="en"> <!--<![endif]-->

	<head>
		<meta charset="utf-8">
	
		<!-- Use the .htaccess and remove these lines to avoid edge case issues.
			More info: h5bp.com/b/378 -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
	
		<title><@spring.message _page_title!"" /></title>
		<meta name="description" content="">
		<meta name="author" content="">
	
		<!-- Mobile viewport optimized: j.mp/bplateviewport -->
		<meta name="viewport" content="width=device-width,initial-scale=1">
	
		<!-- Place favicon.ico and apple-touch-icon.png in the root directory: mathiasbynens.be/notes/touch-icons -->

		<#include "header-resources.ftl" />

	</head>
	
	<body>
		<#include "top-bar.ftl" />
		
		<header class='masthead'>
		</header>

		<div class='outer'>
		<div class="container <#if innerpage>inner-page-container</#if>">
			<div class="content">
				<div class="ajax-message-wrapper">
					<div id="ajax-messages">
						<div class="row">
							<div class="span7">
								<div class="alert">
									<a class="close icon icon-remove"></a>
									<div class="message-content"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			
			<#if !notitle>
				<@macro.title />
			</#if>
</#macro>

<#macro showFooter innerpage=true>
			</div><!-- end of content -->
		</div><!-- end of container -->

		<#include "bottom-bar.ftl" />

		</div> <!-- outer -->

		<script type="text/javascript">
			var _context = '${rc.getContextPath()}';
		</script>

		<#include "footer-resources.ftl" />
 
		<#nested>

		<!-- Prompt IE 6 users to install Chrome Frame. Remove this if you want to support IE 6.
			chromium.org/developers/how-tos/chrome-frame-getting-started -->
		<!--[if lt IE 7 ]>
			<script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
			<script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
		<![endif]-->

	</body>
	</html>
</#macro>

<#macro title>
<div class="row-fluid page-title">
	<div class="span12">
		<div class="inner-col">
			<h3>
				<@spring.message _page_title!"" />
			</h3>
		</div>
	</div>
</div>
</#macro>

<#macro scriptresource path>
	<script type="text/javascript" src ="${rc.getContextPath()}/${path}.js"></script>
</#macro>
<#macro cssresource path>
	<link type="text/css" href="${rc.getContextPath()}/${path}.css" rel="Stylesheet"></link>
</#macro>


<#macro ctrlselect2 name label class="" size="" errorplacement="inline" helptext="">
	<div class="control-group">
		<label class="control-label">${messageResolver.getMessage( label )}</label>
		<div class="controls">
			<input type="text" name="${name}" class="${class} ${size} gts-select2" error-placement="${errorplacement}" all-true="true"/>
			<#if helptext?has_content>
				<span class="help-block">${helptext}</span>
			</#if>
		</div>
	</div>
</#macro>
<#macro ctrlfile name label class="" size="" errorplacement="inline" helptext="">
	<div class="control-group">
		<label class="control-label">${messageResolver.getMessage( label )}</label>
		<div class="controls">
			<input type="file" name="${name}" class="${class} ${size}" error-placement="${errorplacement}" all-true="true"/>
			<#if helptext?has_content>
				<span class="help-block">${helptext}</span>
			</#if>
		</div>
	</div>
</#macro>
<#macro ctrltextarea name label value="" class="" size="" errorplacement="inline" helptext="">
	<div class="control-group">
		<label class="control-label">${messageResolver.getMessage( label )}</label>
		<div class="controls">
			<textarea name="${name}" class="${class} ${size}" error-placement="${errorplacement}" all-true="true">${value}</textarea>
			<#if helptext?has_content>
				<span class="help-block">${helptext}</span>
			</#if>
		</div>
	</div>
</#macro>

<#macro ctrltext name label value="" placeholder="" class="" size="" errorplacement="inline" helptext="" autocomplete="">
	<div class="control-group">
		<label class="control-label">${messageResolver.getMessage( label )}</label>
		<div class="controls">
			<input type="text" name="${name}" value="${value}" class="${class} ${size}" error-placement="${errorplacement}" placeholder="${placeholder}" autocomplete="${autocomplete}"/>
			<#if helptext?has_content>
				<span class="help-block">${helptext}</span>
			</#if>
		</div>
	</div>
</#macro>
<#macro ctrlreadonly name label value="" class="" size="" errorplacement="inline" helptext="">
	<div class="control-group">
		<label class="control-label">${messageResolver.getMessage( label )}</label>
		<div class="controls">
			<input type="text" name="${name}" value="${value}" class="uneditable-input ${class} ${size}" error-placement="${errorplacement}" readonly="readonly"/>
			<#if helptext?has_content>
				<span class="help-block">${helptext}</span>
			</#if>
		</div>
	</div>
</#macro>
<#macro ctrlpassword name label value="" class="" size="" errorplacement="inline" helptext="" placeholder="" autocomplete="">
	<div class="control-group">
		<label class="control-label">${messageResolver.getMessage( label )}</label>
		<div class="controls">
			<input type="password" name="${name}" value="${value}" class="${class} ${size}" error-placement="${errorplacement}" placeholder="${placeholder}" autocomplete="${autocomplete}"/>
			<#if helptext?has_content>
				<span class="help-block">${helptext}</span>
			</#if>
		</div>
	</div>
</#macro>
<#macro ctrllabel text="" label="" class="" size="">
	<div class="control-group">
		<label class="control-label">${messageResolver.getMessage( label )}</label>
		<div class="controls">
			<label class="control-label" style="text-align: left; width: 100%;">${messageResolver.getMessage( text )}</label>
		</div>
	</div>
</#macro>

<#macro uimodalheader title showClose=true>
	<div class="modal-header">
		<#if showClose == true>
			<a class="close icon icon-remove" data-dismiss="modal">&nbsp;</a>
		</#if>
		<h3>${title}</h3>
	</div>
</#macro>
<#macro uimodalbody>
	<div class="modal-body">
		<#nested>
	</div>
</#macro>
<#macro uimodalfooter showClose=true>
	<div class="modal-footer">
        <#nested>
		<#if showClose == true>
          <a href="#" class="btn" data-dismiss="modal">Close</a>
		</#if>
	</div>
</#macro>
<#macro uimodalwrapper class="">
	<div class="modal ${class}">
        <#nested>
	</div>
</#macro>
