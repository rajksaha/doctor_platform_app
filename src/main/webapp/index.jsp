<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html lang="en" ng-app="doctorPlatform">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <link href="<c:url value="/resources/lib/css/bootstrap.min.css"/>" type="text/css" rel="stylesheet"/>
    <link href="<c:url value="/resources/lib/css/smt-bootstrap.css"/>" type="text/css" rel="stylesheet"/>
    <link href="<c:url value="/resources/lib/css/custom-icon.css"/>" type="text/css" rel="stylesheet"/>
    <link href="<c:url value="/resources/lib/css/bootstrap-theme-ktr.css"/>" type="text/css" rel="stylesheet"/>
    <link href="<c:url value="/resources/css/common/bottomUp.css"/>" type="text/css" rel="stylesheet"/>
    <link href="<c:url value="/resources/vendors/font-awesome/css/font-awesome.min.css"/>" type="text/css" rel="stylesheet">
    <link href="<c:url value="/resources/lib/css/jquery-ui-1.11.0/jquery-ui.min.css"/>" type="text/css" rel="stylesheet"/>


    <!-- ng-table -->
    <link href="<c:url value="/resources/lib/css/ng-table.min.css"/>" type="text/css" rel="stylesheet"/>
    <link href="<c:url value="/resources/lib/css/ng-sortable.min.css"/>" type="text/css" rel="stylesheet"/>

    <!-- Animate.css -->
    <link href="<c:url value="/resources/lib/css/animate.css"/>" type="text/css" rel="stylesheet"/>


    <link href="<c:url value="/resources/css/theme/kaitair/login.css"/>" type="text/css" rel="stylesheet"/>
    <link href="<c:url value="/resources/css/theme/kaitair/approval-center.css"/>" type="text/css" rel="stylesheet"/>
    <link href="<c:url value="/resources/css/theme/kaitair/colors.css"/>" type="text/css" rel="stylesheet"/>
    <link href="<c:url value="/resources/css/theme/kaitair/menu.css"/>" type="text/css" rel="stylesheet"/>

    <link href="<c:url value="/resources/css/common/autocomplete.css"/>" type="text/css" rel="stylesheet"/>




    <!-- Superslides v0.6.2 -->
    <link href="<c:url value="/resources/lib/css/superslides.css"/>" rel='stylesheet' />

    <!-- Sticky Footer -->
    <link href="<c:url value="/resources/css/common/sticky-footer.css"/>" rel='stylesheet' />

    <%--Adapt-Strap table--%>
    <link href="<c:url value="/resources/lib/adapt-strap/adapt-strap.min.css"/>" rel="stylesheet"/>


    <title>Doctor</title>
</head>

<body>
<div class="main">
    <div ui-view="header"></div>
    <div ui-view="status"></div>
    <div ui-view="menu" class="container-menu"></div>
    <div ui-view="container" class="page container-main container-fluid"></div>
    <div ui-view="footer" class="footer"></div>
</div>

<!-- Based on http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html -->
<!-- Load JS at the bottom -->


<!-- JQuery-UI -->
<script src="<c:url value="/resources/lib/javascript/jquery-2.1.1.min.js"/>"></script>

<!-- Superslides v0.6.2 -->
<script src="<c:url value="/resources/lib/javascript/jquery.animate-enhanced.min.js"/>"></script>
<script src="<c:url value="/resources/lib/javascript/jquery.easing.1.3.js"/>"></script>
<script src="<c:url value="/resources/lib/javascript/jquery.superslides.js"/>"></script>


<!-- <script type="text/javascript" src="<c:url value="/resources/lib/javascript/angular-file-upload/angular-file-upload-shim.min.js"/>"> -->


<!-- Angular -->
<script src="<c:url value="/resources/lib/javascript/angular-1.2.23/angular.js"/>"></script>

<!-- Angular modules -->
<script src="<c:url value="/resources/lib/javascript/angular-ui-modules-0.1.1/event/event.js"/>"></script>

<!-- Angular extension -->
<!-- Using angular-ui-router instead of angular-route-->
<script type="text/javascript" src="<c:url value="/resources/lib/javascript/ui-router-0.2.10/angular-ui-router.min.js"/>"></script>
<script src="<c:url value="/resources/lib/javascript/ui-bootstrap-0.10.0.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/lib/javascript/ui-bootstrap-tpls-0.10.0.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/lib/javascript/ui-slider.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/lib/javascript/angular-file-upload/angular-file-upload.min.js"/>"></script>



<script src="<c:url value="/resources/lib/javascript/angular-block-ui/angular-block-ui.js"/>"></script>

<script src="<c:url value="/resources/lib/javascript/angular-calendar.js"/>"></script>

<!-- ozLazyLoad - lazy loading -->
<script src="<c:url value="/resources/lib/javascript/ocLazyLoad.min.js"/>"></script>


<!-- Kaitair lib -->
<!-- core -->
<script src="<c:url value="/resources/javascript/app.js?v=1.0"/>"></script>
<script src="<c:url value="/resources/javascript/config.js?v=1.0"/>"></script>
<!-- listener, for login -->

<script src="<c:url value="/resources/javascript/listener.js"/>"></script>

<script src="<c:url value="/resources/javascript/services/security/authenticationService.js"/>"></script>
<script src="<c:url value="/resources/javascript/services/applicationService.js"/>"></script>


<!-- angular-block-ui -->
<link href='<c:url value="/resources/lib/angular-block-ui/angular-block-ui.css" />' rel="stylesheet"/>

<!-- directives -->
<script src="<c:url value="/resources/javascript/directives/roomPicture.js"/>"></script>
<script src="<c:url value="/resources/javascript/directives/scroller.js"/>"></script>
<script src="<c:url value="/resources/javascript/directives/ktrConfirmation.js"/>"></script>
<script src="<c:url value="/resources/javascript/directives/ktrOtaConfirmation.js"/>"></script>
<script src="<c:url value="/resources/javascript/directives/imageRepaint.js"/>"></script>

<!-- filters -->
<script src="<c:url value="/resources/javascript/filters/common.js"/>"></script>

<!-- Input Validator -->
<script type="text/javascript" src="<c:url value="/resources/javascript/inputValidator/inputValidator.0.1.js"/>"></script>
<script src="<c:url value="/resources/javascript/controllers/angular-sortable.js"/>"></script>
<script src="<c:url value="/resources/lib/javascript/resource/angular-resource.js"/>"></script>


<%--Adapt-Strap table--%>
<script src="<c:url value="/resources/lib/adapt-strap/adapt-strap.js"/>"></script>
<script src="<c:url value="/resources/lib/adapt-strap/adapt-strap.tpl.js"/>"></script>



</body>
</html>

