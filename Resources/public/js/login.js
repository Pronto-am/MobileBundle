!function(t){var n={};function o(e){if(n[e])return n[e].exports;var c=n[e]={i:e,l:!1,exports:{}};return t[e].call(c.exports,c,c.exports,o),c.l=!0,c.exports}o.m=t,o.c=n,o.d=function(t,n,e){o.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="/",o(o.s=3)}({3:function(t,n,o){t.exports=o("IJDD")},IJDD:function(t,n){$(document).ready(function(){$(".activate-loader").click(function(){$(".loader-container").fadeIn(200)}),$(".collection-customers .collection-item, .collection-applications .collection-item").click(function(){var t=$(this).data("id"),n=$(this).closest(".collection").hasClass("collection-customers")?"/admin/customers":"/admin/applications";$.ajax({url:n,type:"POST",dataType:"json",data:{id:t},success:function(t){t.error||(window.location=t.data.url)}})})})}});