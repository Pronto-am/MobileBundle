(()=>{var r={7571:()=>{jQuery.fn.colourBrightness=function(){var r,t,e,s=function(r){for(var t="";"html"!=r[0].tagName.toLowerCase()&&("rgba(0, 0, 0, 0)"==(t=r.css("background-color"))||"transparent"==t);)r=r.parent();return t}(this);return s.match(/^rgb/)?(r=(s=(s=s.match(/rgba?\(([^)]+)\)/)[1]).split(/ *, */).map(Number))[0],t=s[1],e=s[2]):"#"==s[0]&&7==s.length?(r=parseInt(s.slice(1,3),16),t=parseInt(s.slice(3,5),16),e=parseInt(s.slice(5,7),16)):"#"==s[0]&&4==s.length&&(r=parseInt(s[1]+s[1],16),t=parseInt(s[2]+s[2],16),e=parseInt(s[3]+s[3],16)),125>(299*r+587*t+114*e)/1e3?this.removeClass("light").addClass("dark"):this.removeClass("dark").addClass("light"),this}},2499:(r,t,e)=>{e(7571)}},t={};function e(s){var a=t[s];if(void 0!==a)return a.exports;var n=t[s]={exports:{}};return r[s](n,n.exports,e),n.exports}(()=>{e(2499);$(document).ready((function(){$("div.circle").each((function(){$(this).colourBrightness()}))}))})()})();