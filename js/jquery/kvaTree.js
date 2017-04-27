/*

 XMS - Online Web Development

 Copyright (c) 2010 Cezar Lucan cezar.lucan@aws-dms.com
 Licensed under GPL license.
 http://www.aws-dms.com

 Date: 2010-10-24
 The original kvaTree plugin doesnt belong to me and seems is no longer maintained;
 this is a modified version that fits the needs of this project
 but all credits for this script go to original developer of kvaTree
*/
(function(b){b.fn.kvaTree=function(l){return b(this).each(function(){var e=b(this),a=this;a.options={autoclose:!0,autoExpandOnAdd:!1,background:"white",imgFolder:"images/",overrideEvents:!1,dragdrop:!0,dropOk:!1,onClick:!1,onDblClick:!1,onBeforeExpand:!1,onAfterExpand:!1,onBeforeCollapse:!1,onAfterCollapse:!1,onAddNode:!1,onEditNode:!1,onDeleteNode:!1,onDrag:!1,onDrop:!1};a.opts=b.extend({},a.options,l);$(a).find(":checkbox").on("change",function(){"function"==typeof a.opts.onNodeCheckedCallback&&
a.opts.onNodeCheckedCallback.apply(this.parentNode,[this.checked]);$(a).trigger({type:"checked",status:this.checked,target:this.parentNode})});b.fn.kvaTree.InitKvaTree=function(){e.find("li:not(.separator)").filter(function(){return b(this).prev("li.separator").get(0)?!1:!0}).each(function(){b(this).before('<li class="separator"></li>')});e.find("li > span").not(".sign").not(".clr").addClass("text").attr("unselectable","on");a.opts.dragdrop&&(a.ClearEmptyNodes(),a.FillEmptyNodes(),e.find("li.separator.artificial").hide());
e.find("li:not(.separator,.node,.leaf)").filter(":has(ul)").addClass("node").end().filter(":not(.node)").addClass("leaf");a.Clean();a.AddSigns();e.data("kvaTree_binded")||a.BindEvents()};a.FillEmptyNodes=function(){e.find("li.node").each(function(){b(this).children("ul").get(0)?b(this).find("> ul > li").get(0)||b(this).find("> ul").append('<li class="separator artificial"></li>'):b(this).find("span.text").after('<ul><li class="separator artificial"></li></ul>')})};a.ClearEmptyNodes=function(){e.find("li.separator.artificial").each(function(){b(this).siblings("li").get(0)&&
b(this).remove()})};b.fn.kvaTree.AddNode=function(d){var c=e.find("span.ui-state-highlight").get(0);if(c){var f=b(c).parents("li:first");if(!b(c).parents("li.node:first").is(".fixedLevel")||"node"!=d){d='<li class="separator"></li>'+("<li"+("leaf"==d?"":' class="node"')+'><span class="text">&nbsp;</span><input type="text" value="New item" /></li>');var h=!1;if(f.is(".leaf")){f.after(d);var g=f.nextAll("li:not(.separator):first"),k=f.parent(),h=!0}else f.is(".node")&&((g=f.children("ul").get(0))?b(g).append(d):
(f.append("<ul>"+d+"</ul>"),g=f.children("ul").get(0)),g=b(g).children("li:not(.separator):last"),a.opts.autoExpandOnAdd&&a.ExpandNode(f),k=f,h=!0);h&&(b(c).removeClass("ui-state-highlight"),k.find("input:text").focus().select().blur(function(){a.SaveInput(b(this))}));b.fn.kvaTree.InitKvaTree();if("function"==typeof a.opts.onAddNode)a.opts.onAddNode(g)}}};b.fn.kvaTree.AddNodeTo=function(d,c,f){var h=!1;e.find("li").each(function(){1==this.nodeType&&"object"==typeof this.documentRef&&f.parentNode===
this.documentRef&&(h=b(this).children("ul").get(0))});if(h){var g=b(h).parents("li:first");if(!b(h).parents("li.node:first").is(".fixedLevel")||"node"!=c){d=$('<li class="separator"></li>'+("<li"+("leaf"==c?"":' class="node"')+'><input type="checkbox" style="position:relative; left: -54px; top: -3px; border: 1px solid;"/><span class="text" style="position:relative; left: -20px; top: -4px;">'+d+"</span>"));c=!1;d.find(":checkbox").on("change",function(){"function"==typeof a.opts.onNodeCheckedCallback&&
a.opts.onNodeCheckedCallback.apply(this.parentNode,[this.checked]);$(a).trigger({type:"checked",status:this.checked,target:this.parentNode})});if(g.is(".leaf")){g.after(d);var k=g.nextAll("li:not(.separator):first");g.parent();c=!0}else g.is(".node")&&((k=g.children("ul").get(0))?b(k).append(d):(g.append("<ul>"+d+"</ul>"),k=g.children("ul").get(0)),k=b(k).children("li:not(.separator):last"),a.opts.autoExpandOnAdd&&a.ExpandNode(g),c=!0);c&&b(h).removeClass("ui-state-highlight");b.fn.kvaTree.InitKvaTree();
if("function"==typeof a.opts.onAddNode)a.opts.onAddNode(k,f)}}};b.fn.kvaTree.EditNode=function(){var d=e.find("span.ui-state-highlight").get(0);if(d){var c=b(d).parents("li:first");b(d).replaceWith('<span class="text">&nbsp;</span><input type="text" value="'+b(d).text()+'" />');c.find("input:text").focus().select().blur(function(){a.SaveInput(b(this))});if("function"==typeof a.opts.onEditNode)a.opts.onEditNode(c)}};b.fn.kvaTree.DeleteNode=function(d){var c=!1;d?e.find("li").each(function(){1==this.nodeType&&
"object"==typeof this.documentRef&&this.documentRef==d&&(c=this)}):c=e.find("span.ui-state-highlight").get(0);if(c){var f=b(c).parents("li:first"),h=f.parents("li.node:first");f.prev("li.separator").remove().end().remove();b.fn.kvaTree.InitKvaTree();if("function"==typeof a.opts.onDeleteNode)a.opts.onDeleteNode(f,h)}};a.SaveInput=function(a){a.prev("span.text").remove();var c=""!=b.trim(a.get(0).value)?a.get(0).value:"_____";a.replaceWith('<span class="ui-state-highlight text">'+c+"</span>");b.fn.kvaTree.InitKvaTree()};
a.IeSetStyles=function(){e.find("li.node.open").next("li.separator").css("background","none");e.find("li.node:not(.open) > ul").hide();e.find("li.node.open > ul").css("margin-bottom","1px")};a.Clean=function(){e.find("li:not(.separator)").each(function(){var d=b(this).next("li:not(.artificial)").get(0)?"url("+a.opts.imgFolder+"line-vertical.gif) left top repeat-y":a.opts.background;b(this).find("span.clr").remove();var c=b(this).height(),e=b(this).is(".node")?12:8;b(this).append('<span class="clr" style="width: 1px; height: '+
c+"px; position: absolute; left: 0; top: "+e+"px; background: "+d+';"></span>')})};a.AddSigns=function(){e.find("li.node").each(function(){b(this).hasClass("open")?b(this).find("span.sign").remove().end().append('<span class="sign minus"></span>'):b(this).find("span.sign").remove().end().append('<span class="sign plus"></span>')})};a.BindEvents=function(){e.click(function(d){var c=b(d.target);if(c.is("span.sign")){var f=c.parents("li:eq(0)");a.ToggleNode(f)}else c.is("span.text")&&(f=c.parents("li:eq(0)"),
"function"==typeof a.opts.onClick?(a.opts.overrideEvents||(e.find(".ui-state-highlight").removeClass("ui-state-highlight"),c.addClass("ui-state-highlight")),a.opts.onClick(d,f)):(e.find(".ui-state-highlight").removeClass("ui-state-highlight"),c.addClass("ui-state-highlight")))});e.dblclick(function(d){var c=b(d.target);c.is("span.text")&&(c=c.parents("li:eq(0)"),"function"==typeof a.opts.onDblClick?(!a.opts.overrideEvents&&c.is(".node")&&a.ToggleNode(c),a.opts.onDblClick(d,c)):c.is(".node")&&a.ToggleNode(c))});
e.data("kvaTree_binded",1)};a.ToggleNode=function(b){b.hasClass("open")?a.CollapseNode(b):a.ExpandNode(b);a.Clean()};a.redrawOpenNode=function(b){b.hasClass("open")&&(a.CollapseNode(b),a.ExpandNode(b));a.Clean()};a.ExpandNode=function(d){if("function"==typeof a.opts.onBeforeExpand)a.opts.onBeforeExpand(d);d.addClass("open");a.opts.autoclose&&d.siblings(".open").each(function(){a.CollapseNode(b(this))});d.find("span.sign:last").removeClass("plus").addClass("minus");if("function"==typeof a.opts.onAfterExpand)a.opts.onAfterExpand(d);
$("#nodeListDiv").scrollTo(d)};a.CollapseNode=function(b){if("function"==typeof a.opts.onBeforeCollapse)a.opts.onBeforeCollapse(b);b.removeClass("open");b.find("span.sign:last").removeClass("minus").addClass("plus");if("function"==typeof a.opts.onAfterCollapse)a.opts.onAfterCollapse(b)};b(this).is("ul")&&(e=b(this),e.addClass("kvaTree"),b.fn.kvaTree.InitKvaTree())})}})(jQuery);
