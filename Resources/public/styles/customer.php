<?php
header('Content-type: text/css; charset: UTF-8');

$primaryColor = '#' . $_GET['primaryColor'];
$secondaryColor = '#' . $_GET['secondaryColor'];
$sidebarColor = '#' . $_GET['sidebarColor'];

$primaryColorRGB = sscanf($primaryColor, '#%02x%02x%02x');
$secondaryColorRGB = sscanf($secondaryColor, '#%02x%02x%02x');
$sidebarColorRGB = sscanf($sidebarColor, '#%02x%02x%02x');

echo '.text-primary { color: ' . $primaryColor . ' !important }';
echo '.text-secondary { color: ' . $secondaryColor . ' !important }';

echo '#side-nav { background-color: ' . $sidebarColor . ' !important; }';
echo '#side-nav header { background-color: ' . $sidebarColor . ' !important; }';
echo '#side-nav #menu ul li a:not(:hover) { border-color: ' . $sidebarColor . ' !important; }';
echo '#side-nav #menu ul li a span:first-child { color: ' . $secondaryColor . ' !important; }';
echo '#side-nav #menu ul li a.active { border-color: ' . $secondaryColor . ' !important; }';

echo '#container #main #top-nav ul li a:not(.active):hover { color: ' . $primaryColor . ' !important }';

echo '#container #main #page h2 span, #container #main #page h3 span { color: ' . $secondaryColor . ' !important }';

echo '#container #main #page a.column-sortable.column-active { color: ' . $secondaryColor . ' !important }';

echo 'table thead { border-bottom-color: ' . $primaryColor . ' !important; }';

echo '.card.card-vertical-tabs .card-content .list .list-item, .tabs .tab a { color: rgba(' . implode(', ', $primaryColorRGB) . ', 0.7) !important; }';
echo '.card.card-vertical-tabs .card-content .list .list-item.active, .card.card-vertical-tabs .card-content .list .list-item:hover, .tabs .tab a.active, .tabs .tab a:hover { color: ' . $primaryColor . ' !important; border-color: rgba(' . implode(', ', $primaryColorRGB) . ', 0.75) !important; }';
echo '.tabs .indicator { background-color: rgba(' . implode(', ', $primaryColorRGB) . ', 0.7) !important; }';

echo '.modal .modal-header h1 { color: ' . $primaryColor . ' !important; }';

echo '.btn:not(.red):not(.custom-background):not(.disabled), .btn-large:not(.disabled) { background-color: ' . $secondaryColor . ' !important; }';
echo '.btn:not(.red):not(.custom-background):not(.disabled):hover, .btn-large:not(.disabled):hover { background-color: rgba(' . implode(', ', $secondaryColorRGB) . ', 0.8) !important; }';

echo '.btn.white.custom-background { color: ' . $primaryColor . ' !important; }';

echo '.block-groups .block-group a.btn.active { border-left-color: ' . $secondaryColor . ' !important; }';

echo '.card.card-clickable:not(.plugin-disabled) > i {color: ' . $secondaryColor . ' !important;}';

echo '#container #main #page .progress {background-color: rgba(' . implode(', ', $secondaryColorRGB) . ', 0.3) !important;}';
echo '#container #main #page .progress .indeterminate {background-color: ' . $secondaryColor . ' !important;}';

echo '#container #main h1.border-bottom {border-bottom-color: ' . $secondaryColor . ' !important;}';