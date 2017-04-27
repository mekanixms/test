/*

 XMS - Online Web Development

 Copyright (c) 2010 Cezar Lucan cezar.lucan@aws-dms.com
 Licensed under GPL license.
 http://www.aws-dms.com

 Date: 2010-10-24
*/
$.fn.closureEditDialog=function(e,t){var a=this.get(0);null==e&&(e=a.marker.customDetails);var g=this;a.defaults={autoOpen:!1,width:.3*$(window).width(),maxHeight:.9*$(window).height(),create:function(){a.objectToTable.apply(this,[e])},open:function(){a.objectToTable.apply(this,[e])},buttons:{"Add property":function(){var b=prompt("Name");if(!0===a.options.blacklist(b)){var c=confirm('Single Value (OK) or List ["",""] (Cancel)?')?"":[];Object.defineProperty(e,b,{enumerable:!0,configurable:!0,writable:!0,
value:c});g.trigger("MARKER_CUSTOM_DETAILS_CHANGED")}else alert("Not allowed to create such property: "+b)}},blacklist:function(a){return!0},types:function(a){return typeOf(this[a])},constraints:{},showType:!1};a.options=$.extend({},a.defaults,t);g.markerDetailsEditDialog_valueToTR=function(b,c,d){var n=this,h=d.createElement("tr"),e=d.createElement("td"),q=d.createElement("td"),l=d.createElement("td");if(a.options.showType)var m=d.createElement("td");var p=d.createElement("span");p.setAttribute("class",
"ui-icon ui-icon-trash");p.style.display="display: inline-block;";l.appendChild(p);q.style.align="center";var k=d.createElement("input");k.setAttribute("type","text");k.style.textAlign="center";k.size="40";k.ref=c;h.appendChild(e);h.appendChild(q);a.options.showType&&h.appendChild(m);h.appendChild(l);var f,l=a.options.types.apply(n,[b]);a.options.showType&&m.appendChild(m.ownerDocument.createTextNode(l+("Array"==l?"("+n[b].length+")":"")));"String"!=l||isNaN(n[b])||(l="Number");k.valType=l;switch(l){case "Array":case "Object":if("Object"==
typeOf(c)||"Array"==typeOf(c))f=JSON.stringify(c);break;case "Function":f=c;break;case "String":f=c;break;case "Number":f=c;break;case "Boolean":f=c,k.setAttribute("type","checkbox"),k.checked=Boolean(c)}k.valType=l;e.appendChild(d.createTextNode(b));q.appendChild(k);k.setAttribute("value",f);p.onclick=function(){confirm("Delete property "+b+" ?")&&n[b]==c&&(delete n[b],g.trigger("MARKER_CUSTOM_DETAILS_CHANGED"))};k.onchange=function(){var c=$(this).val();switch(this.valType){case "Array":case "Object":c=
JSON.parse(c);break;case "Boolean":c=$(this).is(":checked")?!0:!1;break;case "Number":c=Number(c)}n[b]=a.getValueFromConstraints(b,c)};return h};a.objectToTable=function(b){a.closure=b;$(this).empty();var c=a.ownerDocument.createElement("table");c.style.width="100%";if("object"==typeof b){for(var d in b)if(!0===a.options.blacklist(d)){var n=g.markerDetailsEditDialog_valueToTR.apply(b,[d,b[d],a.ownerDocument]);c.appendChild(n)}g.append(c)}$(this).find("tr:even").addClass("ui-state-active")};a.hasConstraints=
function(b){return a.options.constraints.hasOwnProperty(b)?!0:!1};a.getConstraints=function(b){return a.options.constraints.hasOwnProperty(b)?a.options.constraints[b]:!1};a.getValueFromConstraints=function(b,c){if(a.hasConstraints(b)){var d=a.getConstraints(b);return"function"==typeof d?d(c):d}return c};g.on("MARKER_CUSTOM_DETAILS_CHANGED",function(){a.objectToTable.apply(this,[e])});return this.dialog(a.options)};
$.fn.closureEditor=function(e,t){var a=this.get(0);null==e&&(e=a.marker.customDetails);var g=this;a.defaults={autoOpen:!1,width:.3*$(window).width(),maxHeight:.9*$(window).height(),buttons:{"Add property":function(){var a=prompt("Name");if(!0===this.options.blacklist(a)){var d=confirm('Single Value (OK) or List ["",""] (Cancel)?')?"":[];Object.defineProperty(e,a,{enumerable:!0,configurable:!0,writable:!0,value:d});g.trigger("MARKER_CUSTOM_DETAILS_CHANGED")}else alert("Not allowed to create such property: "+
a)}},blacklist:function(a){return!0},types:function(a){return typeOf(this[a])},constraints:{},showType:!1};a.options=$.extend({},a.defaults,t);a.addButton=function(c,d){var b=a.ownerDocument.createElement("button");b.textContent=c;a.buttonsPanel.appendChild(b);$(b).click(function(){d.apply(a,[])})};g.append('<div id="closureEditorContainer"/><div id="closureEditorContainer_buttonsPanel"/>');a.container=g.find("#closureEditorContainer").get(0);a.buttonsPanel=g.find("#closureEditorContainer_buttonsPanel").get(0);
for(var b in a.options.buttons)a.addButton(b,a.options.buttons[b]);g.markerDetailsEditDialog_valueToTR=function(c,d,b){var h=this,e=b.createElement("tr"),q=b.createElement("td"),l=b.createElement("td"),m=b.createElement("td");if(a.options.showType)var p=b.createElement("td");var k=b.createElement("span");k.setAttribute("class","ui-icon ui-icon-trash");k.style.display="display: inline-block;";m.appendChild(k);l.style.align="center";var f=b.createElement("input");f.setAttribute("type","text");f.style.textAlign=
"center";f.size="40";f.ref=d;e.appendChild(q);e.appendChild(l);a.options.showType&&e.appendChild(p);e.appendChild(m);var r,m=a.options.types.apply(h,[c]);a.options.showType&&p.appendChild(p.ownerDocument.createTextNode(m+("Array"==m?"("+h[c].length+")":"")));"String"!=m||isNaN(h[c])||(m="Number");f.valType=m;switch(m){case "Array":case "Object":if("Object"==typeOf(d)||"Array"==typeOf(d))r=JSON.stringify(d);break;case "Function":r=d;break;case "String":r=d;break;case "Number":r=d;break;case "Boolean":r=
d,f.setAttribute("type","checkbox"),f.checked=Boolean(d)}f.valType=m;q.appendChild(b.createTextNode(c));l.appendChild(f);f.setAttribute("value",r);k.onclick=function(){confirm("Delete property "+c+" ?")&&h[c]==d&&(delete h[c],g.trigger("MARKER_CUSTOM_DETAILS_CHANGED"))};f.onchange=function(){var b=$(this).val();switch(this.valType){case "Array":case "Object":b=JSON.parse(b);break;case "Boolean":b=$(this).is(":checked")?!0:!1;break;case "Number":b=Number(b)}h[c]=a.getValueFromConstraints(c,b)};return e};
a.objectToTable=function(c){a.closure=c;var b=this.get(0).container;$(b).empty();var e=a.ownerDocument.createElement("table");e.style.width="100%";if("object"==typeof c){for(var h in c)if(!0===a.options.blacklist(h)){var t=g.markerDetailsEditDialog_valueToTR.apply(c,[h,c[h],a.ownerDocument]);e.appendChild(t)}b.appendChild(e)}$(this).find("tr:even").addClass("ui-state-active")};a.hasConstraints=function(b){return a.options.constraints.hasOwnProperty(b)?!0:!1};a.getConstraints=function(b){return a.options.constraints.hasOwnProperty(b)?
a.options.constraints[b]:!1};a.getValueFromConstraints=function(b,d){if(a.hasConstraints(b)){var e=a.getConstraints(b);return"function"==typeof e?e(d):e}return d};g.on("MARKER_CUSTOM_DETAILS_CHANGED",function(){a.objectToTable.apply(g,[e])});a.objectToTable.apply(g,[e]);return this};