"use strict";!function(a){"function"==typeof define&&define.amd?define(["selectize","jquery.flot","jquery.flot.resize","jquery.flot.categories","jquery.flot.time","jquery.flot.tooltip","jquery.flot.spline"],a):a()}(function(){$(function(){$("#selectize-customselect").selectize(),$(".sparklines").sparkline("html",{enableTagOptions:!0}),$.plot("#chart-audience",[{label:"Visit (All)",color:"#DC554F",data:[["Jan",47],["Feb",84],["Mar",60],["Apr",143],["May",39],["Jun",86],["Jul",87]]},{label:"Visit (Mobile)",color:"#9365B8",data:[["Jan",83],["Feb",32],["Mar",16],["Apr",47],["May",98],["Jun",84],["Jul",18]]}],{series:{lines:{show:!1},splines:{show:!0,tension:.4,lineWidth:2,fill:.8},points:{show:!0,radius:4}},grid:{borderColor:"rgba(0, 0, 0, 0.05)",borderWidth:1,hoverable:!0,backgroundColor:"transparent"},tooltip:!0,tooltipOpts:{content:"%x : %y",defaultTheme:!1},xaxis:{tickColor:"rgba(0, 0, 0, 0.05)",mode:"categories"},yaxis:{tickColor:"rgba(0, 0, 0, 0.05)"},shadowSize:0})})});