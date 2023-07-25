<#import "macro.ftl" as macro/>

<script type="text/javascript">
	var _contextPath = '${rc.getContextPath()}';
</script>

<@macro.scriptresource "resources/js/jquery-1.8.1.min" />

<@macro.scriptresource "resources/js/jquerymx-3.2.custom" />
<@macro.scriptresource "resources/js/json2" />
<@macro.scriptresource "resources/js/jquery.cookies.2.2.0.min" />
<@macro.scriptresource "resources/js/jquery.form" />
<@macro.scriptresource "resources/js/jquery.validate.min" />
<@macro.scriptresource "resources/js/jquery.validate.additional-methods.min" />
<@macro.scriptresource "resources/js/jsrender" />
<@macro.scriptresource "resources/js/jquery-timeago" />

<@macro.scriptresource "resources/jquery-ui/jquery-ui-1.9.0.custom.min" />
<@macro.scriptresource "resources/select2/select2" />

<@macro.scriptresource "resources/bootstrap/bootstrap.min" />
<@macro.scriptresource "resources/utils" />


<script type="text/javascript">
	$(document).ready(function() {
  		$("abbr.timeago").timeago();
	});
</script>
