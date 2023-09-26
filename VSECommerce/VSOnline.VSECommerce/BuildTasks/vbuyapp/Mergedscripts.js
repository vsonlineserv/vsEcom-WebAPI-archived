/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
//# sourceMappingURL=jquery.min.map
*/(function(e,t){var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p="1.9.1",f=c.concat,d=c.push,h=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,b=function(e,t){return new b.fn.init(e,t,r)},x=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^[\],:{}\s]*$/,E=/(?:^|:|,)(?:\s*\[)+/g,S=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,A=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,j=/^-ms-/,D=/-([\da-z])/gi,L=function(e,t){return t.toUpperCase()},H=function(e){(o.addEventListener||"load"===e.type||"complete"===o.readyState)&&(q(),b.ready())},q=function(){o.addEventListener?(o.removeEventListener("DOMContentLoaded",H,!1),e.removeEventListener("load",H,!1)):(o.detachEvent("onreadystatechange",H),e.detachEvent("onload",H))};b.fn=b.prototype={jquery:p,constructor:b,init:function(e,n,r){var i,a;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:o,!0)),C.test(i[1])&&b.isPlainObject(n))for(i in n)b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(a=o.getElementById(i[2]),a&&a.parentNode){if(a.id!==i[2])return r.find(e);this.length=1,this[0]=a}return this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return h.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return b.each(this,e,t)},ready:function(e){return b.ready.promise().done(e),this},slice:function(){return this.pushStack(h.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(b.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:d,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||b.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(o=arguments[u]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,a=e&&b.isArray(e)?e:[]):a=e&&b.isPlainObject(e)?e:{},s[i]=b.extend(c,a,r)):r!==t&&(s[i]=r));return s},b.extend({noConflict:function(t){return e.$===b&&(e.$=u),t&&e.jQuery===b&&(e.jQuery=s),b},isReady:!1,readyWait:1,holdReady:function(e){e?b.readyWait++:b.ready(!0)},ready:function(e){if(e===!0?!--b.readyWait:!b.isReady){if(!o.body)return setTimeout(b.ready);b.isReady=!0,e!==!0&&--b.readyWait>0||(n.resolveWith(o,[b]),b.fn.trigger&&b(o).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===b.type(e)},isArray:Array.isArray||function(e){return"array"===b.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==b.type(e)||e.nodeType||b.isWindow(e))return!1;try{if(e.constructor&&!y.call(e,"constructor")&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||y.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=b.trim(n),n&&k.test(n.replace(S,"@").replace(A,"]").replace(E,"")))?Function("return "+n)():(b.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||b.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&b.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(j,"ms-").replace(D,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:v&&!v.call("\ufeff\u00a0")?function(e){return null==e?"":v.call(e)}:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?b.merge(n,"string"==typeof e?[e]:e):d.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(g)return g.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return f.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),b.isFunction(e)?(r=h.call(arguments,2),i=function(){return e.apply(n||this,r.concat(h.call(arguments)))},i.guid=e.guid=e.guid||b.guid++,i):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===b.type(r)){o=!0;for(u in r)b.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,b.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(b(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),b.ready.promise=function(t){if(!n)if(n=b.Deferred(),"complete"===o.readyState)setTimeout(b.ready);else if(o.addEventListener)o.addEventListener("DOMContentLoaded",H,!1),e.addEventListener("load",H,!1);else{o.attachEvent("onreadystatechange",H),e.attachEvent("onload",H);var r=!1;try{r=null==e.frameElement&&o.documentElement}catch(i){}r&&r.doScroll&&function a(){if(!b.isReady){try{r.doScroll("left")}catch(e){return setTimeout(a,50)}q(),b.ready()}}()}return n.promise(t)},b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=b.type(e);return b.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=b(o);var _={};function F(e){var t=_[e]={};return b.each(e.match(w)||[],function(e,n){t[n]=!0}),t}b.Callbacks=function(e){e="string"==typeof e?_[e]||F(e):b.extend({},e);var n,r,i,o,a,s,u=[],l=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=u.length,n=!0;u&&o>a;a++)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,u&&(l?l.length&&c(l.shift()):r?u=[]:p.disable())},p={add:function(){if(u){var t=u.length;(function i(t){b.each(t,function(t,n){var r=b.type(n);"function"===r?e.unique&&p.has(n)||u.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=u.length:r&&(s=t,c(r))}return this},remove:function(){return u&&b.each(arguments,function(e,t){var r;while((r=b.inArray(t,u,r))>-1)u.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?b.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],this},disable:function(){return u=l=r=t,this},disabled:function(){return!u},lock:function(){return l=t,r||p.disable(),this},locked:function(){return!l},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!u||i&&!l||(n?l.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},b.extend({Deferred:function(e){var t=[["resolve","done",b.Callbacks("once memory"),"resolved"],["reject","fail",b.Callbacks("once memory"),"rejected"],["notify","progress",b.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return b.Deferred(function(n){b.each(t,function(t,o){var a=o[0],s=b.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?b.extend(e,r):r}},i={};return r.pipe=r.then,b.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=h.call(arguments),r=n.length,i=1!==r||e&&b.isFunction(e.promise)?r:0,o=1===i?e:b.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?h.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,u,l;if(r>1)for(s=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(a(t,l,n)).fail(o.reject).progress(a(t,u,s)):--i;return i||o.resolveWith(l,n),o.promise()}}),b.support=function(){var t,n,r,a,s,u,l,c,p,f,d=o.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*"),r=d.getElementsByTagName("a")[0],!n||!r||!n.length)return{};s=o.createElement("select"),l=s.appendChild(o.createElement("option")),a=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={getSetAttribute:"t"!==d.className,leadingWhitespace:3===d.firstChild.nodeType,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:"/a"===r.getAttribute("href"),opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!a.value,optSelected:l.selected,enctype:!!o.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==o.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===o.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},a.checked=!0,t.noCloneChecked=a.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!l.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}a=o.createElement("input"),a.setAttribute("value",""),t.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),t.radioValue="t"===a.value,a.setAttribute("checked","t"),a.setAttribute("name","t"),u=o.createDocumentFragment(),u.appendChild(a),t.appendChecked=a.checked,t.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;return d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip,b(function(){var n,r,a,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",u=o.getElementsByTagName("body")[0];u&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",u.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",a=d.getElementsByTagName("td"),a[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===a[0].offsetHeight,a[0].style.display="",a[1].style.display="none",t.reliableHiddenOffsets=p&&0===a[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=4===d.offsetWidth,t.doesNotIncludeMarginInBodyOffset=1!==u.offsetTop,e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(o.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(u.style.zoom=1)),u.removeChild(n),n=d=a=r=null)}),n=s=u=l=r=a=null,t}();var O=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,B=/([A-Z])/g;function P(e,n,r,i){if(b.acceptData(e)){var o,a,s=b.expando,u="string"==typeof n,l=e.nodeType,p=l?b.cache:e,f=l?e[s]:e[s]&&s;if(f&&p[f]&&(i||p[f].data)||!u||r!==t)return f||(l?e[s]=f=c.pop()||b.guid++:f=s),p[f]||(p[f]={},l||(p[f].toJSON=b.noop)),("object"==typeof n||"function"==typeof n)&&(i?p[f]=b.extend(p[f],n):p[f].data=b.extend(p[f].data,n)),o=p[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[b.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[b.camelCase(n)])):a=o,a}}function R(e,t,n){if(b.acceptData(e)){var r,i,o,a=e.nodeType,s=a?b.cache:e,u=a?e[b.expando]:b.expando;if(s[u]){if(t&&(o=n?s[u]:s[u].data)){b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in o?t=[t]:(t=b.camelCase(t),t=t in o?[t]:t.split(" "));for(r=0,i=t.length;i>r;r++)delete o[t[r]];if(!(n?$:b.isEmptyObject)(o))return}(n||(delete s[u].data,$(s[u])))&&(a?b.cleanData([e],!0):b.support.deleteExpando||s!=s.window?delete s[u]:s[u]=null)}}}b.extend({cache:{},expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!$(e)},data:function(e,t,n){return P(e,t,n)},removeData:function(e,t){return R(e,t)},_data:function(e,t,n){return P(e,t,n,!0)},_removeData:function(e,t){return R(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),b.fn.extend({data:function(e,n){var r,i,o=this[0],a=0,s=null;if(e===t){if(this.length&&(s=b.data(o),1===o.nodeType&&!b._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>a;a++)i=r[a].name,i.indexOf("data-")||(i=b.camelCase(i.slice(5)),W(o,i,s[i]));b._data(o,"parsedAttrs",!0)}return s}return"object"==typeof e?this.each(function(){b.data(this,e)}):b.access(this,function(n){return n===t?o?W(o,e,b.data(o,e)):null:(this.each(function(){b.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){b.removeData(this,e)})}});function W(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(B,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:O.test(r)?b.parseJSON(r):r}catch(o){}b.data(e,n,r)}else r=t}return r}function $(e){var t;for(t in e)if(("data"!==t||!b.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}b.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=b._data(e,n),r&&(!i||b.isArray(r)?i=b._data(e,n,b.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=b.queue(e,t),r=n.length,i=n.shift(),o=b._queueHooks(e,t),a=function(){b.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return b._data(e,n)||b._data(e,n,{empty:b.Callbacks("once memory").add(function(){b._removeData(e,t+"queue"),b._removeData(e,n)})})}}),b.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?b.queue(this[0],e):n===t?this:this.each(function(){var t=b.queue(this,e,n);b._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&b.dequeue(this,e)})},dequeue:function(e){return this.each(function(){b.dequeue(this,e)})},delay:function(e,t){return e=b.fx?b.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=b.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=b._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var I,z,X=/[\t\r\n]/g,U=/\r/g,V=/^(?:input|select|textarea|button|object)$/i,Y=/^(?:a|area)$/i,J=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,G=/^(?:checked|selected)$/i,Q=b.support.getSetAttribute,K=b.support.input;b.fn.extend({attr:function(e,t){return b.access(this,b.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e)})},prop:function(e,t){return b.access(this,b.prop,e,t,arguments.length>1)},removeProp:function(e){return e=b.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=b.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?b.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return b.isFunction(e)?this.each(function(n){b(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=b(this),u=t,l=e.match(w)||[];while(o=l[a++])u=r?u:!s.hasClass(o),s[u?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&b._data(this,"__className__",this.className),this.className=this.className||e===!1?"":b._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(X," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=b.isFunction(e),this.each(function(n){var o,a=b(this);1===this.nodeType&&(o=i?e.call(this,n,a.val()):e,null==o?o="":"number"==typeof o?o+="":b.isArray(o)&&(o=b.map(o,function(e){return null==e?"":e+""})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=b.valHooks[o.type]||b.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(U,""):null==n?"":n)}}}),b.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;for(;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(b.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&b.nodeName(n.parentNode,"optgroup"))){if(t=b(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=b.makeArray(t);return b(e).find("option").each(function(){this.selected=b.inArray(b(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var o,a,s,u=e.nodeType;if(e&&3!==u&&8!==u&&2!==u)return typeof e.getAttribute===i?b.prop(e,n,r):(a=1!==u||!b.isXMLDoc(e),a&&(n=n.toLowerCase(),o=b.attrHooks[n]||(J.test(n)?z:I)),r===t?o&&a&&"get"in o&&null!==(s=o.get(e,n))?s:(typeof e.getAttribute!==i&&(s=e.getAttribute(n)),null==s?t:s):null!==r?o&&a&&"set"in o&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r):(b.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=b.propFix[n]||n,J.test(n)?!Q&&G.test(n)?e[b.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!b.support.radioValue&&"radio"===t&&b.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!b.isXMLDoc(e),a&&(n=b.propFix[n]||n,o=b.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):V.test(e.nodeName)||Y.test(e.nodeName)&&e.href?0:t}}}}),z={get:function(e,n){var r=b.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?K&&Q?null!=i:G.test(n)?e[b.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?b.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&b.propFix[n]||n,n):e[b.camelCase("default-"+n)]=e[n]=!0,n}},K&&Q||(b.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return b.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t},set:function(e,n,r){return b.nodeName(e,"input")?(e.defaultValue=n,t):I&&I.set(e,n,r)}}),Q||(I=b.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},b.attrHooks.contenteditable={get:I.get,set:function(e,t,n){I.set(e,""===t?!1:t,n)}},b.each(["width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),b.support.hrefNormalized||(b.each(["href","src","width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),b.each(["href","src"],function(e,t){b.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),b.support.style||(b.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),b.support.enctype||(b.propFix.enctype="encoding"),b.support.checkOn||b.each(["radio","checkbox"],function(){b.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),b.each(["radio","checkbox"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,n){return b.isArray(n)?e.checked=b.inArray(b(e).val(),n)>=0:t}})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}b.event={global:{},add:function(e,n,r,o,a){var s,u,l,c,p,f,d,h,g,m,y,v=b._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=b.guid++),(u=v.events)||(u=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof b===i||e&&b.event.triggered===e.type?t:b.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(w)||[""],l=n.length;while(l--)s=rt.exec(n[l])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),p=b.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=b.event.special[g]||{},d=b.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&b.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=u[g])||(h=u[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),b.event.global[g]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,p,f,d,h,g,m=b.hasData(e)&&b._data(e);if(m&&(c=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(s=rt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=b.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));u&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||b.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)b.event.remove(e,d+t[l],n,r,!0);b.isEmptyObject(c)&&(delete m.handle,b._removeData(e,"events"))}},trigger:function(n,r,i,a){var s,u,l,c,p,f,d,h=[i||o],g=y.call(n,"type")?n.type:n,m=y.call(n,"namespace")?n.namespace.split("."):[];if(l=f=i=i||o,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+b.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),u=0>g.indexOf(":")&&"on"+g,n=n[b.expando]?n:new b.Event(g,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:b.makeArray(r,[n]),p=b.event.special[g]||{},a||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!a&&!p.noBubble&&!b.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(l=l.parentNode);l;l=l.parentNode)h.push(l),f=l;f===(i.ownerDocument||o)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((l=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(b._data(l,"events")||{})[n.type]&&b._data(l,"handle"),s&&s.apply(l,r),s=u&&l[u],s&&b.acceptData(l)&&s.apply&&s.apply(l,r)===!1&&n.preventDefault();if(n.type=g,!(a||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===g&&b.nodeName(i,"a")||!b.acceptData(i)||!u||!i[g]||b.isWindow(i))){f=i[u],f&&(i[u]=null),b.event.triggered=g;try{i[g]()}catch(v){}b.event.triggered=t,f&&(i[u]=f)}return n.result}},dispatch:function(e){e=b.event.fix(e);var n,r,i,o,a,s=[],u=h.call(arguments),l=(b._data(this,"events")||{})[e.type]||[],c=b.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=b.event.handlers.call(this,e,l),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(o=[],a=0;u>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?b(r,this).index(l)>=0:b.find(r,this,null,[l]).length),o[r]&&o.push(i);o.length&&s.push({elem:l,handlers:o})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[b.expando])return e;var t,n,r,i=e.type,a=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new b.Event(a),t=r.length;while(t--)n=r[t],e[n]=a[n];return e.target||(e.target=a.srcElement||o),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,a):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,a,s=n.button,u=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||o,a=i.documentElement,r=i.body,e.pageX=n.clientX+(a&&a.scrollLeft||r&&r.scrollLeft||0)-(a&&a.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(a&&a.scrollTop||r&&r.scrollTop||0)-(a&&a.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&u&&(e.relatedTarget=u===e.target?n.toElement:u),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return b.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==o.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===o.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},b.removeEvent=o.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},b.Event=function(e,n){return this instanceof b.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&b.extend(this,n),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0,t):new b.Event(e,n)},b.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){b.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;
return(!i||i!==r&&!b.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),b.support.submitBubbles||(b.event.special.submit={setup:function(){return b.nodeName(this,"form")?!1:(b.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=b.nodeName(n,"input")||b.nodeName(n,"button")?n.form:t;r&&!b._data(r,"submitBubbles")&&(b.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),b._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return b.nodeName(this,"form")?!1:(b.event.remove(this,"._submit"),t)}}),b.support.changeBubbles||(b.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(b.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),b.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate("change",this,e,!0)})),!1):(b.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!b._data(t,"changeBubbles")&&(b.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||b.event.simulate("change",this.parentNode,e,!0)}),b._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return b.event.remove(this,"._change"),!Z.test(this.nodeName)}}),b.support.focusinBubbles||b.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){b.event.simulate(t,e.target,b.event.fix(e),!0)};b.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),b.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return b().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=b.guid++)),this.each(function(){b.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){b.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){b.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?b.event.trigger(e,n,r,!0):t}}),function(e,t){var n,r,i,o,a,s,u,l,c,p,f,d,h,g,m,y,v,x="sizzle"+-new Date,w=e.document,T={},N=0,C=0,k=it(),E=it(),S=it(),A=typeof t,j=1<<31,D=[],L=D.pop,H=D.push,q=D.slice,M=D.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},_="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=F.replace("w","w#"),B="([*^$|!~]?=)",P="\\["+_+"*("+F+")"+_+"*(?:"+B+_+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+O+")|)|)"+_+"*\\]",R=":("+F+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+P.replace(3,8)+")*)|.*)\\)|)",W=RegExp("^"+_+"+|((?:^|[^\\\\])(?:\\\\.)*)"+_+"+$","g"),$=RegExp("^"+_+"*,"+_+"*"),I=RegExp("^"+_+"*([\\x20\\t\\r\\n\\f>+~])"+_+"*"),z=RegExp(R),X=RegExp("^"+O+"$"),U={ID:RegExp("^#("+F+")"),CLASS:RegExp("^\\.("+F+")"),NAME:RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:RegExp("^("+F.replace("w","w*")+")"),ATTR:RegExp("^"+P),PSEUDO:RegExp("^"+R),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+_+"*(even|odd|(([+-]|)(\\d*)n|)"+_+"*(?:([+-]|)"+_+"*(\\d+)|))"+_+"*\\)|)","i"),needsContext:RegExp("^"+_+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+_+"*((?:-\\d)?\\d*)"+_+"*\\)|)(?=[^-]|$)","i")},V=/[\x20\t\r\n\f]*[+~]/,Y=/^[^{]+\{\s*\[native code/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,G=/^(?:input|select|textarea|button)$/i,Q=/^h\d$/i,K=/'|\\/g,Z=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,et=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{q.call(w.documentElement.childNodes,0)[0].nodeType}catch(nt){q=function(e){var t,n=[];while(t=this[e++])n.push(t);return n}}function rt(e){return Y.test(e+"")}function it(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>i.cacheLength&&delete e[t.shift()],e[n]=r}}function ot(e){return e[x]=!0,e}function at(e){var t=p.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function st(e,t,n,r){var i,o,a,s,u,l,f,g,m,v;if((t?t.ownerDocument||t:w)!==p&&c(t),t=t||p,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!d&&!r){if(i=J.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&y(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return H.apply(n,q.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&T.getByClassName&&t.getElementsByClassName)return H.apply(n,q.call(t.getElementsByClassName(a),0)),n}if(T.qsa&&!h.test(e)){if(f=!0,g=x,m=t,v=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){l=ft(e),(f=t.getAttribute("id"))?g=f.replace(K,"\\$&"):t.setAttribute("id",g),g="[id='"+g+"'] ",u=l.length;while(u--)l[u]=g+dt(l[u]);m=V.test(e)&&t.parentNode||t,v=l.join(",")}if(v)try{return H.apply(n,q.call(m.querySelectorAll(v),0)),n}catch(b){}finally{f||t.removeAttribute("id")}}}return wt(e.replace(W,"$1"),t,n,r)}a=st.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},c=st.setDocument=function(e){var n=e?e.ownerDocument||e:w;return n!==p&&9===n.nodeType&&n.documentElement?(p=n,f=n.documentElement,d=a(n),T.tagNameNoComments=at(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),T.attributes=at(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),T.getByClassName=at(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),T.getByName=at(function(e){e.id=x+0,e.innerHTML="<a name='"+x+"'></a><div name='"+x+"'></div>",f.insertBefore(e,f.firstChild);var t=n.getElementsByName&&n.getElementsByName(x).length===2+n.getElementsByName(x+0).length;return T.getIdNotName=!n.getElementById(x),f.removeChild(e),t}),i.attrHandle=at(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==A&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},T.getIdNotName?(i.find.ID=function(e,t){if(typeof t.getElementById!==A&&!d){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){return e.getAttribute("id")===t}}):(i.find.ID=function(e,n){if(typeof n.getElementById!==A&&!d){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==A&&r.getAttributeNode("id").value===e?[r]:t:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){var n=typeof e.getAttributeNode!==A&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=T.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.NAME=T.getByName&&function(e,n){return typeof n.getElementsByName!==A?n.getElementsByName(name):t},i.find.CLASS=T.getByClassName&&function(e,n){return typeof n.getElementsByClassName===A||d?t:n.getElementsByClassName(e)},g=[],h=[":focus"],(T.qsa=rt(n.querySelectorAll))&&(at(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||h.push("\\["+_+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||h.push(":checked")}),at(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&h.push("[*^$]="+_+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||h.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),h.push(",.*:")})),(T.matchesSelector=rt(m=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){T.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",R)}),h=RegExp(h.join("|")),g=RegExp(g.join("|")),y=rt(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},v=f.compareDocumentPosition?function(e,t){var r;return e===t?(u=!0,0):(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&r||e.parentNode&&11===e.parentNode.nodeType?e===n||y(w,e)?-1:t===n||y(w,t)?1:0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return u=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:0;if(o===a)return ut(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?ut(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},u=!1,[0,0].sort(v),T.detectDuplicates=u,p):p},st.matches=function(e,t){return st(e,null,null,t)},st.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Z,"='$1']"),!(!T.matchesSelector||d||g&&g.test(t)||h.test(t)))try{var n=m.call(e,t);if(n||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return st(t,p,null,[e]).length>0},st.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},st.attr=function(e,t){var n;return(e.ownerDocument||e)!==p&&c(e),d||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):d||T.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},st.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},st.uniqueSort=function(e){var t,n=[],r=1,i=0;if(u=!T.detectDuplicates,e.sort(v),u){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e};function ut(e,t){var n=t&&e,r=n&&(~t.sourceIndex||j)-(~e.sourceIndex||j);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function lt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ct(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function pt(e){return ot(function(t){return t=+t,ot(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}o=st.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=st.selectors={cacheLength:50,createPseudo:ot,match:U,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||"").replace(et,tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||st.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&st.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return U.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&z.test(n)&&(t=ft(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(et,tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[e+" "];return t||(t=RegExp("(^|"+_+")"+e+"("+_+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==A&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=st.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[x]||(m[x]={}),l=c[e]||[],d=l[0]===N&&l[1],f=l[0]===N&&l[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[N,d,f];break}}else if(v&&(l=(t[x]||(t[x]={}))[e])&&l[0]===N)f=l[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[x]||(p[x]={}))[e]=[N,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||st.error("unsupported pseudo: "+e);return r[x]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ot(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=M.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ot(function(e){var t=[],n=[],r=s(e.replace(W,"$1"));return r[x]?ot(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ot(function(e){return function(t){return st(e,t).length>0}}),contains:ot(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ot(function(e){return X.test(e||"")||st.error("unsupported lang: "+e),e=e.replace(et,tt).toLowerCase(),function(t){var n;do if(n=d?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return Q.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:pt(function(){return[0]}),last:pt(function(e,t){return[t-1]}),eq:pt(function(e,t,n){return[0>n?n+t:n]}),even:pt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:pt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:pt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:pt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[n]=lt(n);for(n in{submit:!0,reset:!0})i.pseudos[n]=ct(n);function ft(e,t){var n,r,o,a,s,u,l,c=E[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=i.preFilter;while(s){(!n||(r=$.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(o=[])),n=!1,(r=I.exec(s))&&(n=r.shift(),o.push({value:n,type:r[0].replace(W," ")}),s=s.slice(n.length));for(a in i.filter)!(r=U[a].exec(s))||l[a]&&!(r=l[a](r))||(n=r.shift(),o.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?st.error(e):E(e,u).slice(0)}function dt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function ht(e,t,n){var i=t.dir,o=n&&"parentNode"===i,a=C++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,s){var u,l,c,p=N+" "+a;if(s){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[x]||(t[x]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,s)||r,l[1]===!0)return!0}}function gt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function mt(e,t,n,r,i){var o,a=[],s=0,u=e.length,l=null!=t;for(;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function yt(e,t,n,r,i,o){return r&&!r[x]&&(r=yt(r)),i&&!i[x]&&(i=yt(i,o)),ot(function(o,a,s,u){var l,c,p,f=[],d=[],h=a.length,g=o||xt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:mt(g,f,e,s,u),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,u),r){l=mt(y,d),r(l,[],s,u),c=l.length;while(c--)(p=l[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?M.call(o,p):f[c])>-1&&(o[l]=!(a[l]=p))}}else y=mt(y===a?y.splice(h,y.length):y),i?i(null,a,y,u):H.apply(a,y)})}function vt(e){var t,n,r,o=e.length,a=i.relative[e[0].type],s=a||i.relative[" "],u=a?1:0,c=ht(function(e){return e===t},s,!0),p=ht(function(e){return M.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>u;u++)if(n=i.relative[e[u].type])f=[ht(gt(f),n)];else{if(n=i.filter[e[u].type].apply(null,e[u].matches),n[x]){for(r=++u;o>r;r++)if(i.relative[e[r].type])break;return yt(u>1&&gt(f),u>1&&dt(e.slice(0,u-1)).replace(W,"$1"),n,r>u&&vt(e.slice(u,r)),o>r&&vt(e=e.slice(r)),o>r&&dt(e))}f.push(n)}return gt(f)}function bt(e,t){var n=0,o=t.length>0,a=e.length>0,s=function(s,u,c,f,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,T=l,C=s||a&&i.find.TAG("*",d&&u.parentNode||u),k=N+=null==T?1:Math.random()||.1;for(w&&(l=u!==p&&u,r=n);null!=(h=C[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,u,c)){f.push(h);break}w&&(N=k,r=++n)}o&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,o&&b!==v){g=0;while(m=t[g++])m(x,y,u,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=L.call(f));y=mt(y)}H.apply(f,y),w&&!s&&y.length>0&&v+t.length>1&&st.uniqueSort(f)}return w&&(N=k,l=T),x};return o?ot(s):s}s=st.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=ft(e)),n=t.length;while(n--)o=vt(t[n]),o[x]?r.push(o):i.push(o);o=S(e,bt(i,r))}return o};function xt(e,t,n){var r=0,i=t.length;for(;i>r;r++)st(e,t[r],n);return n}function wt(e,t,n,r){var o,a,u,l,c,p=ft(e);if(!r&&1===p.length){if(a=p[0]=p[0].slice(0),a.length>2&&"ID"===(u=a[0]).type&&9===t.nodeType&&!d&&i.relative[a[1].type]){if(t=i.find.ID(u.matches[0].replace(et,tt),t)[0],!t)return n;e=e.slice(a.shift().value.length)}o=U.needsContext.test(e)?0:a.length;while(o--){if(u=a[o],i.relative[l=u.type])break;if((c=i.find[l])&&(r=c(u.matches[0].replace(et,tt),V.test(a[0].type)&&t.parentNode||t))){if(a.splice(o,1),e=r.length&&dt(a),!e)return H.apply(n,q.call(r,0)),n;break}}}return s(e,p)(r,t,d,n,V.test(e)),n}i.pseudos.nth=i.pseudos.eq;function Tt(){}i.filters=Tt.prototype=i.pseudos,i.setFilters=new Tt,c(),st.attr=b.attr,b.find=st,b.expr=st.selectors,b.expr[":"]=b.expr.pseudos,b.unique=st.uniqueSort,b.text=st.getText,b.isXMLDoc=st.isXML,b.contains=st.contains}(e);var at=/Until$/,st=/^(?:parents|prev(?:Until|All))/,ut=/^.[^:#\[\.,]*$/,lt=b.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};b.fn.extend({find:function(e){var t,n,r,i=this.length;if("string"!=typeof e)return r=this,this.pushStack(b(e).filter(function(){for(t=0;i>t;t++)if(b.contains(r[t],this))return!0}));for(n=[],t=0;i>t;t++)b.find(e,this[t],n);return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=b(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(b.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1))},filter:function(e){return this.pushStack(ft(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?lt.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,o=[],a=lt.test(e)||"string"!=typeof e?b(e,t||this.context):0;for(;i>r;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&11!==n.nodeType){if(a?a.index(n)>-1:b.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}}return this.pushStack(o.length>1?b.unique(o):o)},index:function(e){return e?"string"==typeof e?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);return this.pushStack(b.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),b.fn.andSelf=b.fn.addBack;function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}b.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return b.dir(e,"parentNode")},parentsUntil:function(e,t,n){return b.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return b.dir(e,"nextSibling")},prevAll:function(e){return b.dir(e,"previousSibling")},nextUntil:function(e,t,n){return b.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return b.dir(e,"previousSibling",n)},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return b.sibling(e.firstChild)},contents:function(e){return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes)}},function(e,t){b.fn[e]=function(n,r){var i=b.map(this,t,n);return at.test(e)||(r=n),r&&"string"==typeof r&&(i=b.filter(r,i)),i=this.length>1&&!ct[e]?b.unique(i):i,this.length>1&&st.test(e)&&(i=i.reverse()),this.pushStack(i)}}),b.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t)},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!b(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(t=t||0,b.isFunction(t))return b.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return b.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=b.grep(e,function(e){return 1===e.nodeType});if(ut.test(t))return b.filter(t,r,!n);t=b.filter(t,r)}return b.grep(e,function(e){return b.inArray(e,t)>=0===n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Nt=/^(?:checkbox|radio)$/i,Ct=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:b.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(o),Dt=jt.appendChild(o.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,b.fn.extend({text:function(e){return b.access(this,function(e){return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(b.isFunction(e))return this.each(function(t){b(this).wrapAll(e.call(this,t))});if(this[0]){var t=b(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return b.isFunction(e)?this.each(function(t){b(this).wrapInner(e.call(this,t))}):this.each(function(){var t=b(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=b.isFunction(e);return this.each(function(n){b(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){b.nodeName(this,"body")||b(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=0;for(;null!=(n=this[r]);r++)(!e||b.filter(e,[n]).length>0)&&(t||1!==n.nodeType||b.cleanData(Ot(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Mt(Ot(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&b.cleanData(Ot(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&b.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return b.clone(this,e,t)})},html:function(e){return b.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!b.support.htmlSerialize&&mt.test(e)||!b.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(b.cleanData(Ot(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=b.isFunction(e);return t||"string"==typeof e||(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;n&&(b(this).remove(),n.insertBefore(e,t))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=f.apply([],e);var i,o,a,s,u,l,c=0,p=this.length,d=this,h=p-1,g=e[0],m=b.isFunction(g);if(m||!(1>=p||"string"!=typeof g||b.support.checkClone)&&Ct.test(g))return this.each(function(i){var o=d.eq(i);m&&(e[0]=g.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(p&&(l=b.buildFragment(e,this[0].ownerDocument,!1,this),i=l.firstChild,1===l.childNodes.length&&(l=i),i)){for(n=n&&b.nodeName(i,"tr"),s=b.map(Ot(l,"script"),Ht),a=s.length;p>c;c++)o=l,c!==h&&(o=b.clone(o,!0,!0),a&&b.merge(s,Ot(o,"script"))),r.call(n&&b.nodeName(this[c],"table")?Lt(this[c],"tbody"):this[c],o,c);if(a)for(u=s[s.length-1].ownerDocument,b.map(s,qt),c=0;a>c;c++)o=s[c],kt.test(o.type||"")&&!b._data(o,"globalEval")&&b.contains(u,o)&&(o.src?b.ajax({url:o.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):b.globalEval((o.text||o.textContent||o.innerHTML||"").replace(St,"")));l=i=null}return this}});function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function Ht(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function Mt(e,t){var n,r=0;for(;null!=(n=e[r]);r++)b._data(n,"globalEval",!t||b._data(t[r],"globalEval"))}function _t(e,t){if(1===t.nodeType&&b.hasData(e)){var n,r,i,o=b._data(e),a=b._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)b.event.add(t,n,s[n][r])}a.data&&(a.data=b.extend({},a.data))}}function Ft(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!b.support.noCloneEvent&&t[b.expando]){i=b._data(t);for(r in i.events)b.removeEvent(t,r,i.handle);t.removeAttribute(b.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Nt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){b.fn[e]=function(e){var n,r=0,i=[],o=b(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),b(o[r])[t](n),d.apply(i,n.get());return this.pushStack(i)}});function Ot(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||b.nodeName(o,n)?s.push(o):b.merge(s,Ot(o,n));return n===t||n&&b.nodeName(e,n)?b.merge([e],s):s}function Bt(e){Nt.test(e.type)&&(e.defaultChecked=e.checked)}b.extend({clone:function(e,t,n){var r,i,o,a,s,u=b.contains(e.ownerDocument,e);if(b.support.html5Clone||b.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(b.support.noCloneEvent&&b.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||b.isXMLDoc(e)))for(r=Ot(o),s=Ot(e),a=0;null!=(i=s[a]);++a)r[a]&&Ft(i,r[a]);if(t)if(n)for(s=s||Ot(e),r=r||Ot(o),a=0;null!=(i=s[a]);a++)_t(i,r[a]);else _t(e,o);return r=Ot(o,"script"),r.length>0&&Mt(r,!u&&Ot(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,u,l,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===b.type(o))b.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),u=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[u]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!b.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!b.support.tbody){o="table"!==u||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)b.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l)
}b.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),b.support.appendChecked||b.grep(Ot(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===b.inArray(o,r))&&(a=b.contains(o.ownerDocument,o),s=Ot(f.appendChild(o),"script"),a&&Mt(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,u=b.expando,l=b.cache,p=b.support.deleteExpando,f=b.event.special;for(;null!=(n=e[s]);s++)if((t||b.acceptData(n))&&(o=n[u],a=o&&l[o])){if(a.events)for(r in a.events)f[r]?b.event.remove(n,r):b.removeEvent(n,r,a.handle);l[o]&&(delete l[o],p?delete n[u]:typeof n.removeAttribute!==i?n.removeAttribute(u):n[u]=null,c.push(o))}}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+x+")(.*)$","i"),Yt=RegExp("^("+x+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+x+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===b.css(e,"display")||!b.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=b._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=b._data(r,"olddisplay",un(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&b._data(r,"olddisplay",i?n:b.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}b.fn.extend({css:function(e,n){return b.access(this,function(e,n,r){var i,o,a={},s=0;if(b.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=b.css(e,n[s],!1,o);return a}return r!==t?b.style(e,n,r):b.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?b(this).show():b(this).hide()})}}),b.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=b.camelCase(n),l=e.style;if(n=b.cssProps[u]||(b.cssProps[u]=tn(l,u)),s=b.cssHooks[n]||b.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(b.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||b.cssNumber[u]||(r+="px"),b.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=b.camelCase(n);return n=b.cssProps[u]||(b.cssProps[u]=tn(e.style,u)),s=b.cssHooks[n]||b.cssHooks[u],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||b.isNumeric(o)?o||0:a):a},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||b.contains(e.ownerDocument,e)||(u=b.style(e,n)),Yt.test(u)&&Ut.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):o.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),Yt.test(u)&&!zt.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=b.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=b.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=b.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=b.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=b.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function un(e){var t=o,n=Gt[e];return n||(n=ln(e,t),"none"!==n&&n||(Pt=(Pt||b("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=ln(e,t),Pt.detach()),Gt[e]=n),n}function ln(e,t){var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],"display");return n.remove(),r}b.each(["height","width"],function(e,n){b.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(b.css(e,"display"))?b.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,i),i):0)}}}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===b.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),b(function(){b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,n){return n?b.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!b.support.pixelPosition&&b.fn.position&&b.each(["top","left"],function(e,n){b.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?b(e).position()[n]+"px":r):t}}})}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!b.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||b.css(e,"display"))},b.expr.filters.visible=function(e){return!b.expr.filters.hidden(e)}),b.each({margin:"",padding:"",border:"Width"},function(e,t){b.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(b.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;b.fn.extend({serialize:function(){return b.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=b.prop(this,"elements");return e?b.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!b(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=b(this).val();return null==n?null:b.isArray(n)?b.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),b.param=function(e,n){var r,i=[],o=function(e,t){t=b.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional),b.isArray(e)||e.jquery&&!b.isPlainObject(e))b.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(b.isArray(t))b.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==b.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){b.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),b.fn.hover=function(e,t){return this.mouseenter(e).mouseleave(t||e)};var mn,yn,vn=b.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Nn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Cn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=b.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=a.href}catch(Ln){yn=o.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(b.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(u){var l;return o[u]=!0,b.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||a||o[c]?a?!(l=c):t:(n.dataTypes.unshift(c),s(c),!1)}),l}return s(n.dataTypes[0])||!o["*"]&&s("*")}function Mn(e,n){var r,i,o=b.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&b.extend(!0,e,r),e}b.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),b.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&b.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?b("<div>").append(b.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},b.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){b.fn[t]=function(e){return this.on(t,e)}}),b.each(["get","post"],function(e,n){b[n]=function(e,r,i,o){return b.isFunction(r)&&(o=o||i,i=r,r=t),b.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Nn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Mn(Mn(e,b.ajaxSettings),t):Mn(b.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,u,l,c,p=b.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?b(f):b.event,h=b.Deferred(),g=b.Callbacks("once memory"),m=p.statusCode||{},y={},v={},x=0,T="canceled",N={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else N.always(e[N.status]);return this},abort:function(e){var t=e||T;return l&&l.abort(t),k(0,t),this}};if(h.promise(N).complete=g.add,N.success=N.done,N.error=N.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=b.trim(p.dataType||"*").toLowerCase().match(w)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?80:443))==(mn[3]||("http:"===mn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=b.param(p.data,p.traditional)),qn(An,p,n,N),2===x)return N;u=p.global,u&&0===b.active++&&b.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Cn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(b.lastModified[o]&&N.setRequestHeader("If-Modified-Since",b.lastModified[o]),b.etag[o]&&N.setRequestHeader("If-None-Match",b.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&N.setRequestHeader("Content-Type",p.contentType),N.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)N.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,N,p)===!1||2===x))return N.abort();T="abort";for(i in{success:1,error:1,complete:1})N[i](p[i]);if(l=qn(jn,p,n,N)){N.readyState=1,u&&d.trigger("ajaxSend",[N,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){N.abort("timeout")},p.timeout));try{x=1,l.send(y,k)}catch(C){if(!(2>x))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,C=n;2!==x&&(x=2,s&&clearTimeout(s),l=t,a=i||"",N.readyState=e>0?4:0,r&&(w=_n(p,N,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=N.getResponseHeader("Last-Modified"),T&&(b.lastModified[o]=T),T=N.getResponseHeader("etag"),T&&(b.etag[o]=T)),204===e?(c=!0,C="nocontent"):304===e?(c=!0,C="notmodified"):(c=Fn(p,w),C=c.state,y=c.data,v=c.error,c=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),N.status=e,N.statusText=(n||C)+"",c?h.resolveWith(f,[y,C,N]):h.rejectWith(f,[N,C,v]),N.statusCode(m),m=t,u&&d.trigger(c?"ajaxSuccess":"ajaxError",[N,p,c?y:v]),g.fireWith(f,[N,C]),u&&(d.trigger("ajaxComplete",[N,p]),--b.active||b.event.trigger("ajaxStop")))}return N},getScript:function(e,n){return b.get(e,t,n,"script")},getJSON:function(e,t,n){return b.get(e,t,n,"json")}});function _n(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(s in c)s in r&&(n[c[s]]=r[s]);while("*"===l[0])l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in u)if(u[s]&&u[s].test(o)){l.unshift(s);break}if(l[0]in r)a=l[0];else{for(s in r){if(!l[0]||e.converters[s+" "+l[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function Fn(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(i in e.converters)a[i.toLowerCase()]=e.converters[i];for(;r=u[++s];)if("*"!==r){if("*"!==l&&l!==r){if(i=a[l+" "+r]||a["* "+r],!i)for(n in a)if(o=n.split(" "),o[1]===r&&(i=a[l+" "+o[0]]||a["* "+o[0]])){i===!0?i=a[n]:a[n]!==!0&&(r=o[0],u.splice(s--,0,r));break}if(i!==!0)if(i&&e["throws"])t=i(t);else try{t=i(t)}catch(c){return{state:"parsererror",error:i?c:"No conversion from "+l+" to "+r}}}l=r}return{state:"success",data:t}}b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return b.globalEval(e),e}}}),b.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),b.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=o.head||b("head")[0]||o.documentElement;return{send:function(t,i){n=o.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var On=[],Bn=/(=)\?(?=&|$)|\?\?/;b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=On.pop()||b.expando+"_"+vn++;return this[e]=!0,e}}),b.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||b.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,On.push(o)),s&&b.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}b.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=b.ajaxSettings.xhr(),b.support.cors=!!Rn&&"withCredentials"in Rn,Rn=b.support.ajax=!!Rn,Rn&&b.ajaxTransport(function(n){if(!n.crossDomain||b.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=b.noop,$n&&delete Pn[a]),i)4!==u.readyState&&u.abort();else{p={},s=u.status,l=u.getAllResponseHeaders(),"string"==typeof u.responseText&&(p.text=u.responseText);try{c=u.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,l)},n.async?4===u.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},b(e).unload($n)),Pn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+x+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=Yn.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(b.cssNumber[e]?"":"px"),"px"!==r&&s){s=b.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,b.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=b.now()}function Zn(e,t){b.each(t,function(t,n){var r=(Qn[t]||[]).concat(Qn["*"]),i=0,o=r.length;for(;o>i;i++)if(r[i].call(e,t,n))return})}function er(e,t,n){var r,i,o=0,a=Gn.length,s=b.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;for(;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=b.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(tr(c,l.opts.specialEasing);a>o;o++)if(r=Gn[o].call(l,e,c,l.opts))return r;return Zn(l,c),b.isFunction(l.opts.start)&&l.opts.start.call(e,l),b.fx.timer(b.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function tr(e,t){var n,r,i,o,a;for(i in e)if(r=b.camelCase(i),o=t[r],n=e[i],b.isArray(n)&&(o=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),a=b.cssHooks[r],a&&"expand"in a){n=a.expand(n),delete e[r];for(i in n)i in e||(e[i]=n[i],t[i]=o)}else t[r]=o}b.Animation=b.extend(er,{tweener:function(e,t){b.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,u,l,c,p,f=this,d=e.style,h={},g=[],m=e.nodeType&&nn(e);n.queue||(c=b._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,p=c.empty.fire,c.empty.fire=function(){c.unqueued||p()}),c.unqueued++,f.always(function(){f.always(function(){c.unqueued--,b.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===b.css(e,"display")&&"none"===b.css(e,"float")&&(b.support.inlineBlockNeedsLayout&&"inline"!==un(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",b.support.shrinkWrapBlocks||f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(i in t)if(a=t[i],Vn.exec(a)){if(delete t[i],u=u||"toggle"===a,a===(m?"hide":"show"))continue;g.push(i)}if(o=g.length){s=b._data(e,"fxshow")||b._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?b(e).show():f.done(function(){b(e).hide()}),f.done(function(){var t;b._removeData(e,"fxshow");for(t in h)b.style(e,t,h[t])});for(i=0;o>i;i++)r=g[i],l=f.createTween(r,m?s[r]:0),h[r]=s[r]||b.style(e,r),r in s||(s[r]=l.start,m&&(l.end=l.start,l.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(b.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=b.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[b.cssProps[e.prop]]||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},b.each(["toggle","show","hide"],function(e,t){var n=b.fn[t];b.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),b.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=b.isEmptyObject(e),o=b.speed(t,n,r),a=function(){var t=er(this,b.extend({},e),o);a.finish=function(){t.stop(!0)},(i||b._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=b.timers,a=b._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&b.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=b._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=b.timers,a=r?r.length:0;for(n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}b.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){b.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),b.speed=function(e,t,n){var r=e&&"object"==typeof e?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};return r.duration=b.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue)},r},b.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){var e,n=b.timers,r=0;for(Xn=b.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||b.fx.stop(),Xn=t},b.fx.timer=function(e){e()&&b.timers.push(e)&&b.fx.start()},b.fx.interval=13,b.fx.start=function(){Un||(Un=setInterval(b.fx.tick,b.fx.interval))},b.fx.stop=function(){clearInterval(Un),Un=null},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){return b.grep(b.timers,function(t){return e===t.elem}).length}),b.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){b.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,b.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},b.offset={setOffset:function(e,t,n){var r=b.css(e,"position");"static"===r&&(e.style.position="relative");var i=b(e),o=i.offset(),a=b.css(e,"top"),s=b.css(e,"left"),u=("absolute"===r||"fixed"===r)&&b.inArray("auto",[a,s])>-1,l={},c={},p,f;u?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),b.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(l.top=t.top-o.top+p),null!=t.left&&(l.left=t.left-o.left+f),"using"in t?t.using.call(e,l):i.css(l)}},b.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===b.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],"html")||(n=e.offset()),n.top+=b.css(e[0],"borderTopWidth",!0),n.left+=b.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-b.css(r,"marginTop",!0),left:t.left-n.left-b.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||o.documentElement;while(e&&!b.nodeName(e,"html")&&"static"===b.css(e,"position"))e=e.offsetParent;return e||o.documentElement})}}),b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);b.fn[e]=function(i){return b.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?b(a).scrollLeft():o,r?o:b(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return b.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}b.each({Height:"height",Width:"width"},function(e,n){b.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){b.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return b.access(this,function(n,r,i){var o;return b.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?b.css(n,r,s):b.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=b,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return b})})(window);
/*!
 * Bootstrap v3.3.2 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.2",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.2",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.2",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a(this.options.trigger).filter('[href="#'+b.id+'"], [data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.2",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":a.extend({},e.data(),{trigger:this});c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.2",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.2",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.options.backdrop&&d.adjustBackdrop(),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$element.find(".modal-dialog").one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').prependTo(this.$element).on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.options.backdrop&&this.adjustBackdrop(),this.adjustDialog()},c.prototype.adjustBackdrop=function(){this.$backdrop.css("height",0).css("height",this.$element[0].scrollHeight)},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){this.bodyIsOverflowing=document.body.scrollHeight>document.documentElement.clientHeight,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.2",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=this.tip(),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||"destroy"!=b)&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.2",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.2",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.2",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()
}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.2",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a("body").height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
!function(t){var e={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};t.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){t(this).bxSlider(n)}),this;var o={},r=this;e.el=this;var a=t(window).width(),l=t(window).height(),d=function(){o.settings=t.extend({},s,n),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return o.cssPrefix=e[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),r.data("origStyle",r.attr("style")),r.children(o.settings.slideSelector).each(function(){t(this).data("origStyle",t(this).attr("style"))}),c()},c=function(){r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=t('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?100*o.children.length+215+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing"),f(),o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:p()}),o.settings.pager||o.viewport.parent().css({margin:"0 auto 0px"}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.css("width",u()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:o.settings.slideZIndex,display:"block"})),o.controls.el=t('<div class="bx-controls" />'),o.settings.captions&&P(),o.active.last=o.settings.startSlide==x()-1,o.settings.video&&r.fitVids();var e=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(e=o.children),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&T(),o.settings.controls&&C(),o.settings.auto&&o.settings.autoControls&&E(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),g(e,h)},g=function(e,i){var s=e.find("img, iframe").length;if(0==s)return i(),void 0;var n=0;e.find("img, iframe").each(function(){t(this).one("load",function(){++n==s&&i()}).each(function(){this.complete&&t(this).load()})})},h=function(){if(o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var e="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,e).clone().addClass("bx-clone"),s=o.children.slice(-e).clone().addClass("bx-clone");r.append(i).prepend(s)}o.loader.remove(),S(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(v()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,o.settings.responsive&&t(window).bind("resize",Z),o.settings.auto&&o.settings.autoStart&&H(),o.settings.ticker&&L(),o.settings.pager&&q(o.settings.startSlide),o.settings.controls&&W(),o.settings.touchEnabled&&!o.settings.ticker&&O()},v=function(){var e=0,s=t();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var n=1==o.settings.moveSlides?o.active.index:o.active.index*m();for(s=o.children.eq(n),i=1;i<=o.settings.maxSlides-1;i++)s=n+i>=o.children.length?s.add(o.children.eq(i-1)):s.add(o.children.eq(n+i))}else s=o.children.eq(o.active.index);else s=o.children;return"vertical"==o.settings.mode?(s.each(function(){e+=t(this).outerHeight()}),o.settings.slideMargin>0&&(e+=o.settings.slideMargin*(o.settings.minSlides-1))):e=Math.max.apply(Math,s.map(function(){return t(this).outerHeight(!1)}).get()),e},p=function(){var t="100%";return o.settings.slideWidth>0&&(t="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),t},u=function(){var t=o.settings.slideWidth,e=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>e&&!o.carousel||"vertical"==o.settings.mode?t=e:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(e>o.maxThreshold||e<o.minThreshold&&(t=(e-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),t},f=function(){var t=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)t=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)t=o.settings.maxSlides;else{var e=o.children.first().width();t=Math.floor(o.viewport.width()/e)}else"vertical"==o.settings.mode&&(t=o.settings.minSlides);return t},x=function(){var t=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)t=o.children.length/m();else for(var e=0,i=0;e<o.children.length;)++t,e=i+f(),i+=o.settings.moveSlides<=f()?o.settings.moveSlides:f();else t=Math.ceil(o.children.length/f());return t},m=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=f()?o.settings.moveSlides:f()},S=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var t=o.children.last(),e=t.position();b(-(e.left-(o.viewport.width()-t.width())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,e=o.children.eq(i).position();b(-e.top,"reset",0)}}else{var e=o.children.eq(o.active.index*m()).position();o.active.index==x()-1&&(o.active.last=!0),void 0!=e&&("horizontal"==o.settings.mode?b(-e.left,"reset",0):"vertical"==o.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(o.usingCSS){var n="vertical"==o.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?r.css(o.animProp,n):"ticker"==e&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),N()}))}else{var a={};a[o.animProp]=t,"slide"==e?r.animate(a,i,o.settings.easing,function(){D()}):"reset"==e?r.css(o.animProp,t):"ticker"==e&&r.animate(a,speed,"linear",function(){b(s.resetValue,"reset",0),N()})}},w=function(){for(var e="",i=x(),s=0;i>s;s++){var n="";o.settings.buildPager&&t.isFunction(o.settings.buildPager)?(n=o.settings.buildPager(s),o.pagerEl.addClass("bx-custom-pager")):(n=s+1,o.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}o.pagerEl.html(e)},T=function(){o.settings.pagerCustom?o.pagerEl=t(o.settings.pagerCustom):(o.pagerEl=t('<div class="bx-pager" />'),o.settings.pagerSelector?t(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),w()),o.pagerEl.on("click","a",I)},C=function(){o.controls.next=t('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=t('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",y),o.controls.prev.bind("click",z),o.settings.nextSelector&&t(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&t(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=t('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},E=function(){o.controls.start=t('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=t('<div class="bx-controls-auto" />'),o.controls.autoEl.on("click",".bx-start",k),o.controls.autoEl.on("click",".bx-stop",M),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?t(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),A(o.settings.autoStart?"stop":"start")},P=function(){o.children.each(function(){var e=t(this).find("img:first").attr("title");void 0!=e&&(""+e).length&&t(this).append('<div class="bx-caption"><span>'+e+"</span></div>")})},y=function(t){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),t.preventDefault()},z=function(t){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),t.preventDefault()},k=function(t){r.startAuto(),t.preventDefault()},M=function(t){r.stopAuto(),t.preventDefault()},I=function(e){o.settings.auto&&r.stopAuto();var i=t(e.currentTarget),s=parseInt(i.attr("data-slide-index"));s!=o.active.index&&r.goToSlide(s),e.preventDefault()},q=function(e){var i=o.children.length;return"short"==o.settings.pagerType?(o.settings.maxSlides>1&&(i=Math.ceil(o.children.length/o.settings.maxSlides)),o.pagerEl.html(e+1+o.settings.pagerShortSeparator+i),void 0):(o.pagerEl.find("a").removeClass("active"),o.pagerEl.each(function(i,s){t(s).find("a").eq(e).addClass("active")}),void 0)},D=function(){if(o.settings.infiniteLoop){var t="";0==o.active.index?t=o.children.eq(0).position():o.active.index==x()-1&&o.carousel?t=o.children.eq((x()-1)*m()).position():o.active.index==o.children.length-1&&(t=o.children.eq(o.children.length-1).position()),t&&("horizontal"==o.settings.mode?b(-t.left,"reset",0):"vertical"==o.settings.mode&&b(-t.top,"reset",0))}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},A=function(t){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[t]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},W=function(){1==x()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==x()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},H=function(){o.settings.autoDelay>0?setTimeout(r.startAuto,o.settings.autoDelay):r.startAuto(),o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},L=function(){var e=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();e="horizontal"==o.settings.mode?-i.left:-i.top}b(e,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var e=0;o.children.each(function(){e+="horizontal"==o.settings.mode?t(this).outerWidth(!0):t(this).outerHeight(!0)});var i=o.settings.speed/e,s="horizontal"==o.settings.mode?"left":"top",n=i*(e-Math.abs(parseInt(r.css(s))));N(n)}),N()},N=function(t){speed=t?t:o.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?e=r.find(".bx-clone").first().position():i=o.children.first().position();var s="horizontal"==o.settings.mode?-e.left:-e.top,n="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:n};b(s,"ticker",speed,a)},O=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",X)},X=function(t){if(o.working)t.preventDefault();else{o.touch.originalPos=r.position();var e=t.originalEvent;o.touch.start.x=e.changedTouches[0].pageX,o.touch.start.y=e.changedTouches[0].pageY,o.viewport.bind("touchmove",Y),o.viewport.bind("touchend",V)}},Y=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-o.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-o.touch.start.y);if(3*i>s&&o.settings.preventDefaultSwipeX?t.preventDefault():3*s>i&&o.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var n=0;if("horizontal"==o.settings.mode){var r=e.changedTouches[0].pageX-o.touch.start.x;n=o.touch.originalPos.left+r}else{var r=e.changedTouches[0].pageY-o.touch.start.y;n=o.touch.originalPos.top+r}b(n,"reset",0)}},V=function(t){o.viewport.unbind("touchmove",Y);var e=t.originalEvent,i=0;if(o.touch.end.x=e.changedTouches[0].pageX,o.touch.end.y=e.changedTouches[0].pageY,"fade"==o.settings.mode){var s=Math.abs(o.touch.start.x-o.touch.end.x);s>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var s=0;"horizontal"==o.settings.mode?(s=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(s=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&s>0||o.active.last&&0>s)?b(i,"reset",200):Math.abs(s)>=o.settings.swipeThreshold?(0>s?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):b(i,"reset",200)}o.viewport.unbind("touchend",V)},Z=function(){var e=t(window).width(),i=t(window).height();(a!=e||l!=i)&&(a=e,l=i,r.redrawSlider(),o.settings.onSliderResize.call(r,o.active.index))};return r.goToSlide=function(e,i){if(!o.working&&o.active.index!=e)if(o.working=!0,o.oldIndex=o.active.index,o.active.index=0>e?x()-1:e>=x()?0:e,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=x()-1,o.settings.pager&&q(o.active.index),o.settings.controls&&W(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",o.settings.slideZIndex+1).fadeIn(o.settings.speed,function(){t(this).css("zIndex",o.settings.slideZIndex),D()});else{o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);n=a.position(),s=o.viewport.width()-a.outerWidth()}else{var l=o.children.length-o.settings.minSlides;n=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-m():(x()-1)*m()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);n=a.position()}else if("next"==i&&0==o.active.index)n=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(e>=0){var c=e*m();n=o.children.eq(c).position()}if("undefined"!=typeof n){var g="horizontal"==o.settings.mode?-(n.left-s):-n.top;b(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var t=parseInt(o.active.index)+1;r.goToSlide(t,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var t=parseInt(o.active.index)-1;r.goToSlide(t,"prev")}},r.startAuto=function(t){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=t&&A("stop"))},r.stopAuto=function(t){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=t&&A("start"))},r.getCurrentSlide=function(){return o.active.index},r.getCurrentSlideElement=function(){return o.children.eq(o.active.index)},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).outerWidth(u()),o.viewport.css("height",v()),o.settings.ticker||S(),o.active.last&&(o.active.index=x()-1),o.active.index>=x()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(w(),q(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,t(".bx-clone",this).remove(),o.children.each(function(){void 0!=t(this).data("origStyle")?t(this).attr("style",t(this).data("origStyle")):t(this).removeAttr("style")}),void 0!=t(this).data("origStyle")?this.attr("style",t(this).data("origStyle")):t(this).removeAttr("style"),t(this).unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.settings.controls&&o.pagerEl.remove(),t(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),o.settings.responsive&&t(window).unbind("resize",Z))},r.reloadSlider=function(t){void 0!=t&&(n=t),r.destroySlider(),d()},d(),this}}(jQuery);
/*
 AngularJS v1.3.2
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(T,U,t){'use strict';function v(b){return function(){var a=arguments[0],c;c="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.3.2/"+(b?b+"/":"")+a;for(a=1;a<arguments.length;a++){c=c+(1==a?"?":"&")+"p"+(a-1)+"=";var d=encodeURIComponent,e;e=arguments[a];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;c+=d(e)}return Error(c)}}function Sa(b){if(null==b||Ta(b))return!1;var a=b.length;return b.nodeType===
ka&&a?!0:G(b)||H(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function r(b,a,c){var d,e;if(b)if(u(b))for(d in b)"prototype"==d||"length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d)||a.call(c,b[d],d,b);else if(H(b)||Sa(b)){var f="object"!==typeof b;d=0;for(e=b.length;d<e;d++)(f||d in b)&&a.call(c,b[d],d,b)}else if(b.forEach&&b.forEach!==r)b.forEach(a,c,b);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d,b);return b}function Bd(b,a,c){for(var d=Object.keys(b).sort(),e=0;e<d.length;e++)a.call(c,
b[d[e]],d[e]);return d}function kc(b){return function(a,c){b(c,a)}}function Cd(){return++ib}function lc(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function F(b){for(var a=b.$$hashKey,c=1,d=arguments.length;c<d;c++){var e=arguments[c];if(e)for(var f=Object.keys(e),g=0,h=f.length;g<h;g++){var k=f[g];b[k]=e[k]}}lc(b,a);return b}function aa(b){return parseInt(b,10)}function mc(b,a){return F(new (F(function(){},{prototype:b})),a)}function A(){}function la(b){return b}function da(b){return function(){return b}}
function w(b){return"undefined"===typeof b}function y(b){return"undefined"!==typeof b}function M(b){return null!==b&&"object"===typeof b}function G(b){return"string"===typeof b}function V(b){return"number"===typeof b}function ea(b){return"[object Date]"===Ka.call(b)}function u(b){return"function"===typeof b}function jb(b){return"[object RegExp]"===Ka.call(b)}function Ta(b){return b&&b.window===b}function Ua(b){return b&&b.$evalAsync&&b.$watch}function Va(b){return"boolean"===typeof b}function nc(b){return!(!b||
!(b.nodeName||b.prop&&b.attr&&b.find))}function Dd(b){var a={};b=b.split(",");var c;for(c=0;c<b.length;c++)a[b[c]]=!0;return a}function sa(b){return R(b.nodeName||b[0].nodeName)}function Wa(b,a){var c=b.indexOf(a);0<=c&&b.splice(c,1);return a}function Da(b,a,c,d){if(Ta(b)||Ua(b))throw Xa("cpws");if(a){if(b===a)throw Xa("cpi");c=c||[];d=d||[];if(M(b)){var e=c.indexOf(b);if(-1!==e)return d[e];c.push(b);d.push(a)}if(H(b))for(var f=a.length=0;f<b.length;f++)e=Da(b[f],null,c,d),M(b[f])&&(c.push(b[f]),
d.push(e)),a.push(e);else{var g=a.$$hashKey;H(a)?a.length=0:r(a,function(b,c){delete a[c]});for(f in b)b.hasOwnProperty(f)&&(e=Da(b[f],null,c,d),M(b[f])&&(c.push(b[f]),d.push(e)),a[f]=e);lc(a,g)}}else if(a=b)H(b)?a=Da(b,[],c,d):ea(b)?a=new Date(b.getTime()):jb(b)?(a=new RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=b.lastIndex):M(b)&&(e=Object.create(Object.getPrototypeOf(b)),a=Da(b,e,c,d));return a}function ta(b,a){if(H(b)){a=a||[];for(var c=0,d=b.length;c<d;c++)a[c]=b[c]}else if(M(b))for(c in a=
a||{},b)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=b[c];return a||b}function ma(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(H(b)){if(!H(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!ma(b[d],a[d]))return!1;return!0}}else{if(ea(b))return ea(a)?ma(b.getTime(),a.getTime()):!1;if(jb(b)&&jb(a))return b.toString()==a.toString();if(Ua(b)||Ua(a)||Ta(b)||Ta(a)||H(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&
!u(b[d])){if(!ma(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==t&&!u(a[d]))return!1;return!0}return!1}function kb(b,a,c){return b.concat(Ya.call(a,c))}function oc(b,a){var c=2<arguments.length?Ya.call(arguments,2):[];return!u(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,c.concat(Ya.call(arguments,0))):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Ed(b,a){var c=a;"string"===typeof b&&
"$"===b.charAt(0)&&"$"===b.charAt(1)?c=t:Ta(a)?c="$WINDOW":a&&U===a?c="$DOCUMENT":Ua(a)&&(c="$SCOPE");return c}function ua(b,a){return"undefined"===typeof b?t:JSON.stringify(b,Ed,a?"  ":null)}function pc(b){return G(b)?JSON.parse(b):b}function va(b){b=z(b).clone();try{b.empty()}catch(a){}var c=z("<div>").append(b).html();try{return b[0].nodeType===lb?R(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+R(b)})}catch(d){return R(c)}}function qc(b){try{return decodeURIComponent(b)}catch(a){}}
function rc(b){var a={},c,d;r((b||"").split("&"),function(b){b&&(c=b.replace(/\+/g,"%20").split("="),d=qc(c[0]),y(d)&&(b=y(c[1])?qc(c[1]):!0,Ib.call(a,d)?H(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Jb(b){var a=[];r(b,function(b,d){H(b)?r(b,function(b){a.push(Ea(d,!0)+(!0===b?"":"="+Ea(b,!0)))}):a.push(Ea(d,!0)+(!0===b?"":"="+Ea(b,!0)))});return a.length?a.join("&"):""}function mb(b){return Ea(b,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Ea(b,a){return encodeURIComponent(b).replace(/%40/gi,
"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,a?"%20":"+")}function Fd(b,a){var c,d,e=nb.length;b=z(b);for(d=0;d<e;++d)if(c=nb[d]+a,G(c=b.attr(c)))return c;return null}function Gd(b,a){var c,d,e={};r(nb,function(a){a+="app";!c&&b.hasAttribute&&b.hasAttribute(a)&&(c=b,d=b.getAttribute(a))});r(nb,function(a){a+="app";var e;!c&&(e=b.querySelector("["+a.replace(":","\\:")+"]"))&&(c=e,d=e.getAttribute(a))});c&&(e.strictDi=null!==Fd(c,"strict-di"),
a(c,d?[d]:[],e))}function sc(b,a,c){M(c)||(c={});c=F({strictDi:!1},c);var d=function(){b=z(b);if(b.injector()){var d=b[0]===U?"document":va(b);throw Xa("btstrpd",d.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);c.debugInfoEnabled&&a.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);a.unshift("ng");d=Kb(a,c.strictDi);d.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",
d);c(b)(a)})}]);return d},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;T&&e.test(T.name)&&(c.debugInfoEnabled=!0,T.name=T.name.replace(e,""));if(T&&!f.test(T.name))return d();T.name=T.name.replace(f,"");wa.resumeBootstrap=function(b){r(b,function(b){a.push(b)});d()}}function Hd(){T.name="NG_ENABLE_DEBUG_INFO!"+T.name;T.location.reload()}function Id(b){return wa.element(b).injector().get("$$testability")}function Lb(b,a){a=a||"_";return b.replace(Jd,function(b,d){return(d?a:"")+b.toLowerCase()})}
function Kd(){var b;tc||((na=T.jQuery)&&na.fn.on?(z=na,F(na.fn,{scope:La.scope,isolateScope:La.isolateScope,controller:La.controller,injector:La.injector,inheritedData:La.inheritedData}),b=na.cleanData,na.cleanData=function(a){var c;if(Mb)Mb=!1;else for(var d=0,e;null!=(e=a[d]);d++)(c=na._data(e,"events"))&&c.$destroy&&na(e).triggerHandler("$destroy");b(a)}):z=S,wa.element=z,tc=!0)}function Nb(b,a,c){if(!b)throw Xa("areq",a||"?",c||"required");return b}function ob(b,a,c){c&&H(b)&&(b=b[b.length-1]);
Nb(u(b),a,"not a function, got "+(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function Ma(b,a){if("hasOwnProperty"===b)throw Xa("badname",a);}function uc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&u(b)?oc(e,b):b}function pb(b){var a=b[0];b=b[b.length-1];var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return z(c)}function oa(){return Object.create(null)}function Ld(b){function a(a,b,c){return a[b]||
(a[b]=c())}var c=v("$injector"),d=v("ng");b=a(b,"angular",Object);b.$$minErr=b.$$minErr||v;return a(b,"module",function(){var b={};return function(f,g,h){if("hasOwnProperty"===f)throw d("badname","module");g&&b.hasOwnProperty(f)&&(b[f]=null);return a(b,f,function(){function a(c,d,e,f){f||(f=b);return function(){f[e||"push"]([c,d,arguments]);return n}}if(!g)throw c("nomod",f);var b=[],d=[],e=[],q=a("$injector","invoke","push",d),n={_invokeQueue:b,_configBlocks:d,_runBlocks:e,requires:g,name:f,provider:a("$provide",
"provider"),factory:a("$provide","factory"),service:a("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),animation:a("$animateProvider","register"),filter:a("$filterProvider","register"),controller:a("$controllerProvider","register"),directive:a("$compileProvider","directive"),config:q,run:function(a){e.push(a);return this}};h&&q(h);return n})}})}function Md(b){F(b,{bootstrap:sc,copy:Da,extend:F,equals:ma,element:z,forEach:r,injector:Kb,noop:A,bind:oc,toJson:ua,
fromJson:pc,identity:la,isUndefined:w,isDefined:y,isString:G,isFunction:u,isObject:M,isNumber:V,isElement:nc,isArray:H,version:Nd,isDate:ea,lowercase:R,uppercase:qb,callbacks:{counter:0},getTestability:Id,$$minErr:v,$$csp:Za,reloadWithDebugInfo:Hd});$a=Ld(T);try{$a("ngLocale")}catch(a){$a("ngLocale",[]).provider("$locale",Od)}$a("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:Pd});a.provider("$compile",vc).directive({a:Qd,input:wc,textarea:wc,form:Rd,script:Sd,select:Td,style:Ud,
option:Vd,ngBind:Wd,ngBindHtml:Xd,ngBindTemplate:Yd,ngClass:Zd,ngClassEven:$d,ngClassOdd:ae,ngCloak:be,ngController:ce,ngForm:de,ngHide:ee,ngIf:fe,ngInclude:ge,ngInit:he,ngNonBindable:ie,ngPluralize:je,ngRepeat:ke,ngShow:le,ngStyle:me,ngSwitch:ne,ngSwitchWhen:oe,ngSwitchDefault:pe,ngOptions:qe,ngTransclude:re,ngModel:se,ngList:te,ngChange:ue,pattern:xc,ngPattern:xc,required:yc,ngRequired:yc,minlength:zc,ngMinlength:zc,maxlength:Ac,ngMaxlength:Ac,ngValue:ve,ngModelOptions:we}).directive({ngInclude:xe}).directive(rb).directive(Bc);
a.provider({$anchorScroll:ye,$animate:ze,$browser:Ae,$cacheFactory:Be,$controller:Ce,$document:De,$exceptionHandler:Ee,$filter:Cc,$interpolate:Fe,$interval:Ge,$http:He,$httpBackend:Ie,$location:Je,$log:Ke,$parse:Le,$rootScope:Me,$q:Ne,$$q:Oe,$sce:Pe,$sceDelegate:Qe,$sniffer:Re,$templateCache:Se,$templateRequest:Te,$$testability:Ue,$timeout:Ve,$window:We,$$rAF:Xe,$$asyncCallback:Ye})}])}function ab(b){return b.replace(Ze,function(a,b,d,e){return e?d.toUpperCase():d}).replace($e,"Moz$1")}function Dc(b){b=
b.nodeType;return b===ka||!b||9===b}function Ec(b,a){var c,d,e=a.createDocumentFragment(),f=[];if(Ob.test(b)){c=c||e.appendChild(a.createElement("div"));d=(af.exec(b)||["",""])[1].toLowerCase();d=ha[d]||ha._default;c.innerHTML=d[1]+b.replace(bf,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;f=kb(f,c.childNodes);c=e.firstChild;c.textContent=""}else f.push(a.createTextNode(b));e.textContent="";e.innerHTML="";r(f,function(a){e.appendChild(a)});return e}function S(b){if(b instanceof S)return b;var a;
G(b)&&(b=P(b),a=!0);if(!(this instanceof S)){if(a&&"<"!=b.charAt(0))throw Pb("nosel");return new S(b)}if(a){a=U;var c;b=(c=cf.exec(b))?[a.createElement(c[1])]:(c=Ec(b,a))?c.childNodes:[]}Fc(this,b)}function Qb(b){return b.cloneNode(!0)}function sb(b,a){a||tb(b);if(b.querySelectorAll)for(var c=b.querySelectorAll("*"),d=0,e=c.length;d<e;d++)tb(c[d])}function Gc(b,a,c,d){if(y(d))throw Pb("offargs");var e=(d=ub(b))&&d.events,f=d&&d.handle;if(f)if(a)r(a.split(" "),function(a){if(y(c)){var d=e[a];Wa(d||
[],c);if(d&&0<d.length)return}b.removeEventListener(a,f,!1);delete e[a]});else for(a in e)"$destroy"!==a&&b.removeEventListener(a,f,!1),delete e[a]}function tb(b,a){var c=b.ng339,d=c&&vb[c];d&&(a?delete d.data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),Gc(b)),delete vb[c],b.ng339=t))}function ub(b,a){var c=b.ng339,c=c&&vb[c];a&&!c&&(b.ng339=c=++df,c=vb[c]={events:{},data:{},handle:t});return c}function Rb(b,a,c){if(Dc(b)){var d=y(c),e=!d&&a&&!M(a),f=!a;b=(b=ub(b,!e))&&b.data;if(d)b[a]=
c;else{if(f)return b;if(e)return b&&b[a];F(b,a)}}}function Sb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function Tb(b,a){a&&b.setAttribute&&r(a.split(" "),function(a){b.setAttribute("class",P((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+P(a)+" "," ")))})}function Ub(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");r(a.split(" "),function(a){a=P(a);-1===
c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",P(c))}}function Fc(b,a){if(a)if(a.nodeType)b[b.length++]=a;else{var c=a.length;if("number"===typeof c&&a.window!==a){if(c)for(var d=0;d<c;d++)b[b.length++]=a[d]}else b[b.length++]=a}}function Hc(b,a){return wb(b,"$"+(a||"ngController")+"Controller")}function wb(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=H(a)?a:[a];b;){for(var d=0,e=a.length;d<e;d++)if((c=z.data(b,a[d]))!==t)return c;b=b.parentNode||11===b.nodeType&&b.host}}function Ic(b){for(sb(b,
!0);b.firstChild;)b.removeChild(b.firstChild)}function Jc(b,a){a||sb(b);var c=b.parentNode;c&&c.removeChild(b)}function ef(b,a){a=a||T;if("complete"===a.document.readyState)a.setTimeout(b);else z(a).on("load",b)}function Kc(b,a){var c=xb[a.toLowerCase()];return c&&Lc[sa(b)]&&c}function ff(b,a){var c=b.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&Mc[a]}function gf(b,a){var c=function(c,e){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=a[e||c.type],g=f?f.length:0;if(g){if(w(c.immediatePropagationStopped)){var h=
c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();h&&h.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};1<g&&(f=ta(f));for(var k=0;k<g;k++)c.isImmediatePropagationStopped()||f[k].call(b,c)}};c.elem=b;return c}function Na(b,a){var c=b&&b.$$hashKey;if(c)return"function"===typeof c&&(c=b.$$hashKey()),c;c=typeof b;return c="function"==c||"object"==c&&null!==b?b.$$hashKey=
c+":"+(a||Cd)():c+":"+b}function bb(b,a){if(a){var c=0;this.nextUid=function(){return++c}}r(b,this.put,this)}function hf(b){return(b=b.toString().replace(Nc,"").match(Oc))?"function("+(b[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function Vb(b,a,c){var d;if("function"===typeof b){if(!(d=b.$inject)){d=[];if(b.length){if(a)throw G(c)&&c||(c=b.name||hf(b)),Fa("strictdi",c);a=b.toString().replace(Nc,"");a=a.match(Oc);r(a[1].split(jf),function(a){a.replace(kf,function(a,b,c){d.push(c)})})}b.$inject=d}}else H(b)?
(a=b.length-1,ob(b[a],"fn"),d=b.slice(0,a)):ob(b,"fn",!0);return d}function Kb(b,a){function c(a){return function(b,c){if(M(b))r(b,kc(a));else return a(b,c)}}function d(a,b){Ma(a,"service");if(u(b)||H(b))b=q.instantiate(b);if(!b.$get)throw Fa("pget",a);return p[a+"Provider"]=b}function e(a,b){return function(){var c=s.invoke(b,this,t,a);if(w(c))throw Fa("undef",a);return c}}function f(a,b,c){return d(a,{$get:!1!==c?e(a,b):b})}function g(a){var b=[],c;r(a,function(a){function d(a){var b,c;b=0;for(c=
a.length;b<c;b++){var e=a[b],f=q.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,!0);try{G(a)?(c=$a(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):u(a)?b.push(q.invoke(a)):H(a)?b.push(q.invoke(a)):ob(a,"module")}catch(e){throw H(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Fa("modulerr",a,e.stack||e.message||e);}}});return b}function h(b,c){function d(a){if(b.hasOwnProperty(a)){if(b[a]===k)throw Fa("cdep",
a+" <- "+l.join(" <- "));return b[a]}try{return l.unshift(a),b[a]=k,b[a]=c(a)}catch(e){throw b[a]===k&&delete b[a],e;}finally{l.shift()}}function e(b,c,f,g){"string"===typeof f&&(g=f,f=null);var k=[];g=Vb(b,a,g);var h,l,n;l=0;for(h=g.length;l<h;l++){n=g[l];if("string"!==typeof n)throw Fa("itkn",n);k.push(f&&f.hasOwnProperty(n)?f[n]:d(n))}H(b)&&(b=b[h]);return b.apply(c,k)}return{invoke:e,instantiate:function(a,b,c){var d=function(){};d.prototype=(H(a)?a[a.length-1]:a).prototype;d=new d;a=e(a,d,b,
c);return M(a)||u(a)?a:d},get:d,annotate:Vb,has:function(a){return p.hasOwnProperty(a+"Provider")||b.hasOwnProperty(a)}}}a=!0===a;var k={},l=[],m=new bb([],!0),p={$provide:{provider:c(d),factory:c(f),service:c(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:c(function(a,b){return f(a,da(b),!1)}),constant:c(function(a,b){Ma(a,"constant");p[a]=b;n[a]=b}),decorator:function(a,b){var c=q.get(a+"Provider"),d=c.$get;c.$get=function(){var a=s.invoke(d,c);return s.invoke(b,
null,{$delegate:a})}}}},q=p.$injector=h(p,function(){throw Fa("unpr",l.join(" <- "));}),n={},s=n.$injector=h(n,function(a){var b=q.get(a+"Provider");return s.invoke(b.$get,b,t,a)});r(g(b),function(a){s.invoke(a||A)});return s}function ye(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===sa(a))return b=a,!0});return b}function f(b){if(b){b.scrollIntoView();var c;
c=g.yOffset;u(c)?c=c():nc(c)?(c=c[0],c="fixed"!==a.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):V(c)||(c=0);c&&(b=b.getBoundingClientRect().top,a.scrollBy(0,b-c))}else a.scrollTo(0,0)}function g(){var a=c.hash(),b;a?(b=h.getElementById(a))?f(b):(b=e(h.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var h=a.document;b&&d.$watch(function(){return c.hash()},function(a,b){a===b&&""===a||ef(function(){d.$evalAsync(g)})});return g}]}function Ye(){this.$get=["$$rAF","$timeout",
function(b,a){return b.supported?function(a){return b(a)}:function(b){return a(b,0,!1)}}]}function lf(b,a,c,d){function e(a){try{a.apply(null,Ya.call(arguments,1))}finally{if(x--,0===x)for(;B.length;)try{B.pop()()}catch(b){c.error(b)}}}function f(a,b){(function za(){r(K,function(a){a()});E=b(za,a)})()}function g(){h();k()}function h(){I=b.history.state;I=w(I)?null:I;ma(I,Q)&&(I=Q);Q=I}function k(){if(C!==m.url()||J!==I)C=m.url(),J=I,r(W,function(a){a(m.url(),I)})}function l(a){try{return decodeURIComponent(a)}catch(b){return a}}
var m=this,p=a[0],q=b.location,n=b.history,s=b.setTimeout,O=b.clearTimeout,D={};m.isMock=!1;var x=0,B=[];m.$$completeOutstandingRequest=e;m.$$incOutstandingRequestCount=function(){x++};m.notifyWhenNoOutstandingRequests=function(a){r(K,function(a){a()});0===x?a():B.push(a)};var K=[],E;m.addPollFn=function(a){w(E)&&f(100,s);K.push(a);return a};var I,J,C=q.href,ca=a.find("base"),N=null;h();J=I;m.url=function(a,c,e){w(e)&&(e=null);q!==b.location&&(q=b.location);n!==b.history&&(n=b.history);if(a){var f=
J===e;if(C!==a||d.history&&!f){var g=C&&Ga(C)===Ga(a);C=a;J=e;!d.history||g&&f?(g||(N=a),c?q.replace(a):q.href=a):(n[c?"replaceState":"pushState"](e,"",a),h(),J=I);return m}}else return N||q.href.replace(/%27/g,"'")};m.state=function(){return I};var W=[],X=!1,Q=null;m.onUrlChange=function(a){if(!X){if(d.history)z(b).on("popstate",g);z(b).on("hashchange",g);X=!0}W.push(a);return a};m.$$checkUrlChange=k;m.baseHref=function(){var a=ca.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};
var ba={},y="",fa=m.baseHref();m.cookies=function(a,b){var d,e,f,g;if(a)b===t?p.cookie=encodeURIComponent(a)+"=;path="+fa+";expires=Thu, 01 Jan 1970 00:00:00 GMT":G(b)&&(d=(p.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+";path="+fa).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(p.cookie!==y)for(y=p.cookie,d=y.split("; "),ba={},f=0;f<d.length;f++)e=d[f],g=e.indexOf("="),0<g&&(a=l(e.substring(0,g)),ba[a]===
t&&(ba[a]=l(e.substring(g+1))));return ba}};m.defer=function(a,b){var c;x++;c=s(function(){delete D[c];e(a)},b||0);D[c]=!0;return c};m.defer.cancel=function(a){return D[a]?(delete D[a],O(a),e(A),!0):!1}}function Ae(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new lf(b,d,a,c)}]}function Be(){this.$get=function(){function b(b,d){function e(a){a!=p&&(q?q==a&&(q=a.n):q=a,f(a.n,a.p),f(a,p),p=a,p.n=null)}function f(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw v("$cacheFactory")("iid",
b);var g=0,h=F({},d,{id:b}),k={},l=d&&d.capacity||Number.MAX_VALUE,m={},p=null,q=null;return a[b]={put:function(a,b){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}if(!w(b))return a in k||g++,k[a]=b,g>l&&this.remove(q.key),b},get:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return k[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b==p&&(p=b.p);b==q&&(q=b.n);f(b.n,b.p);delete m[a]}delete k[a];g--},removeAll:function(){k={};g=0;m={};p=q=null},destroy:function(){m=
h=k=null;delete a[b]},info:function(){return F({},h,{size:g})}}}var a={};b.info=function(){var b={};r(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function Se(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function vc(b,a){function c(a,b){var c=/^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,d={};r(a,function(a,e){var f=a.match(c);if(!f)throw ia("iscp",b,e,a);d[e]={mode:f[1][0],collection:"*"===f[2],optional:"?"===f[3],attrName:f[4]||e}});return d}var d=
{},e=/^\s*directive\:\s*([\w\-]+)\s+(.*)$/,f=/(([\w\-]+)(?:\:([^;]+))?;?)/,g=Dd("ngSrc,ngSrcset,src,srcset"),h=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,k=/^(on[a-z]+|formaction)$/;this.directive=function p(a,e){Ma(a,"directive");G(a)?(Nb(e,"directiveFactory"),d.hasOwnProperty(a)||(d[a]=[],b.factory(a+"Directive",["$injector","$exceptionHandler",function(b,e){var f=[];r(d[a],function(d,g){try{var k=b.invoke(d);u(k)?k={compile:da(k)}:!k.compile&&k.link&&(k.compile=da(k.link));k.priority=k.priority||0;k.index=
g;k.name=k.name||a;k.require=k.require||k.controller&&k.name;k.restrict=k.restrict||"EA";M(k.scope)&&(k.$$isolateBindings=c(k.scope,k.name));f.push(k)}catch(h){e(h)}});return f}])),d[a].push(e)):r(a,kc(p));return this};this.aHrefSanitizationWhitelist=function(b){return y(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};var l=!0;this.debugInfoEnabled=
function(a){return y(a)?(l=a,this):l};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,c,s,O,D,x,B,K,E,I){function J(a,b){try{a.addClass(b)}catch(c){}}function C(a,b,c,d,e){a instanceof z||(a=z(a));r(a,function(b,c){b.nodeType==lb&&b.nodeValue.match(/\S+/)&&(a[c]=z(b).wrap("<span></span>").parent()[0])});var f=ca(a,b,a,c,d,e);C.$$addScopeClass(a);var g=null;return function(b,
c,d){Nb(b,"scope");d=d||{};var e=d.parentBoundTranscludeFn,k=d.transcludeControllers;d=d.futureParentElement;e&&e.$$boundTransclude&&(e=e.$$boundTransclude);g||(g=(d=d&&d[0])?"foreignobject"!==sa(d)&&d.toString().match(/SVG/)?"svg":"html":"html");d="html"!==g?z(T(g,z("<div>").append(a).html())):c?La.clone.call(a):a;if(k)for(var h in k)d.data("$"+h+"Controller",k[h].instance);C.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,e);return d}}function ca(a,b,c,d,e,f){function g(a,c,d,e){var f,h,l,q,n,p,B;if(s)for(B=
Array(c.length),q=0;q<k.length;q+=3)f=k[q],B[f]=c[f];else B=c;q=0;for(n=k.length;q<n;)h=B[k[q++]],c=k[q++],f=k[q++],c?(c.scope?(l=a.$new(),C.$$addScopeInfo(z(h),l)):l=a,p=c.transcludeOnThisElement?N(a,c.transclude,e,c.elementTranscludeOnThisElement):!c.templateOnThisElement&&e?e:!e&&b?N(a,b):null,c(f,l,h,d,p)):f&&f(a,h.childNodes,t,e)}for(var k=[],h,l,q,n,s,p=0;p<a.length;p++){h=new V;l=W(a[p],[],h,0===p?d:t,e);(f=l.length?ba(l,a[p],h,b,c,null,[],[],f):null)&&f.scope&&C.$$addScopeClass(h.$$element);
h=f&&f.terminal||!(q=a[p].childNodes)||!q.length?null:ca(q,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||h)k.push(p,f,h),n=!0,s=s||f;f=null}return n?g:null}function N(a,b,c,d){return function(d,e,f,g,k){d||(d=a.$new(!1,k),d.$$transcluded=!0);return b(d,e,{parentBoundTranscludeFn:c,transcludeControllers:f,futureParentElement:g})}}function W(b,c,g,k,h){var l=g.$attr,q;switch(b.nodeType){case ka:fa(c,xa(sa(b)),"E",k,h);for(var n,s,B,O=b.attributes,D=0,K=O&&O.length;D<
K;D++){var I=!1,J=!1;n=O[D];q=n.name;n=P(n.value);s=xa(q);if(B=Aa.test(s))q=Lb(s.substr(6),"-");var x=s.replace(/(Start|End)$/,""),C;a:{var E=x;if(d.hasOwnProperty(E)){C=void 0;for(var E=a.get(E+"Directive"),r=0,ca=E.length;r<ca;r++)if(C=E[r],C.multiElement){C=!0;break a}}C=!1}C&&s===x+"Start"&&(I=q,J=q.substr(0,q.length-5)+"end",q=q.substr(0,q.length-6));s=xa(q.toLowerCase());l[s]=q;if(B||!g.hasOwnProperty(s))g[s]=n,Kc(b,s)&&(g[s]=!0);S(b,c,n,s,B);fa(c,s,"A",k,h,I,J)}b=b.className;if(G(b)&&""!==
b)for(;q=f.exec(b);)s=xa(q[2]),fa(c,s,"C",k,h)&&(g[s]=P(q[3])),b=b.substr(q.index+q[0].length);break;case lb:Y(c,b.nodeValue);break;case 8:try{if(q=e.exec(b.nodeValue))s=xa(q[1]),fa(c,s,"M",k,h)&&(g[s]=P(q[2]))}catch(W){}}c.sort(v);return c}function X(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ia("uterdir",b,c);a.nodeType==ka&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return z(d)}function Q(a,b,c){return function(d,
e,f,g,k){e=X(e[0],b,c);return a(d,e,f,g,k)}}function ba(a,d,e,f,g,k,l,s,p){function B(a,b,c,d){if(a){c&&(a=Q(a,c,d));a.require=L.require;a.directiveName=ga;if(N===L||L.$$isolateScope)a=Z(a,{isolateScope:!0});l.push(a)}if(b){c&&(b=Q(b,c,d));b.require=L.require;b.directiveName=ga;if(N===L||L.$$isolateScope)b=Z(b,{isolateScope:!0});s.push(b)}}function K(a,b,c,d){var e,f="data",g=!1,k=c,l;if(G(b)){l=b.match(h);b=b.substring(l[0].length);l[3]&&(l[1]?l[3]=null:l[1]=l[3]);"^"===l[1]?f="inheritedData":"^^"===
l[1]&&(f="inheritedData",k=c.parent());"?"===l[2]&&(g=!0);e=null;d&&"data"===f&&(e=d[b])&&(e=e.instance);e=e||k[f]("$"+b+"Controller");if(!e&&!g)throw ia("ctreq",b,a);return e||null}H(b)&&(e=[],r(b,function(b){e.push(K(a,b,c,d))}));return e}function I(a,c,f,g,k){function h(a,b,c){var d;Ua(a)||(c=b,b=a,a=t);F&&(d=x);c||(c=F?W.parent():W);return k(a,b,d,c,Wb)}var n,p,B,J,x,cb,W,Q;d===f?(Q=e,W=e.$$element):(W=z(f),Q=new V(W,e));N&&(J=c.$new(!0));k&&(cb=h,cb.$$boundTransclude=k);E&&(ca={},x={},r(E,function(a){var b=
{$scope:a===N||a.$$isolateScope?J:c,$element:W,$attrs:Q,$transclude:cb};B=a.controller;"@"==B&&(B=Q[a.name]);b=D(B,b,!0,a.controllerAs);x[a.name]=b;F||W.data("$"+a.name+"Controller",b.instance);ca[a.name]=b}));if(N){C.$$addScopeInfo(W,J,!0,!(ba&&(ba===N||ba===N.$$originalDirective)));C.$$addScopeClass(W,!0);g=ca&&ca[N.name];var X=J;g&&g.identifier&&!0===N.bindToController&&(X=g.instance);r(J.$$isolateBindings=N.$$isolateBindings,function(a,d){var e=a.attrName,f=a.optional,g,k,h,l;switch(a.mode){case "@":Q.$observe(e,
function(a){X[d]=a});Q.$$observers[e].$$scope=c;Q[e]&&(X[d]=b(Q[e])(c));break;case "=":if(f&&!Q[e])break;k=O(Q[e]);l=k.literal?ma:function(a,b){return a===b||a!==a&&b!==b};h=k.assign||function(){g=X[d]=k(c);throw ia("nonassign",Q[e],N.name);};g=X[d]=k(c);f=function(a){l(a,X[d])||(l(a,g)?h(c,a=X[d]):X[d]=a);return g=a};f.$stateful=!0;f=a.collection?c.$watchCollection(Q[e],f):c.$watch(O(Q[e],f),null,k.literal);J.$on("$destroy",f);break;case "&":k=O(Q[e]),X[d]=function(a){return k(c,a)}}})}ca&&(r(ca,
function(a){a()}),ca=null);g=0;for(n=l.length;g<n;g++)p=l[g],$(p,p.isolateScope?J:c,W,Q,p.require&&K(p.directiveName,p.require,W,x),cb);var Wb=c;N&&(N.template||null===N.templateUrl)&&(Wb=J);a&&a(Wb,f.childNodes,t,k);for(g=s.length-1;0<=g;g--)p=s[g],$(p,p.isolateScope?J:c,W,Q,p.require&&K(p.directiveName,p.require,W,x),cb)}p=p||{};for(var J=-Number.MAX_VALUE,x,E=p.controllerDirectives,ca,N=p.newIsolateScopeDirective,ba=p.templateDirective,fa=p.nonTlbTranscludeDirective,A=!1,Oa=!1,F=p.hasElementTranscludeDirective,
Y=e.$$element=z(d),L,ga,v,Ha=f,R,S=0,Aa=a.length;S<Aa;S++){L=a[S];var yb=L.$$start,aa=L.$$end;yb&&(Y=X(d,yb,aa));v=t;if(J>L.priority)break;if(v=L.scope)L.templateUrl||(M(v)?(za("new/isolated scope",N||x,L,Y),N=L):za("new/isolated scope",N,L,Y)),x=x||L;ga=L.name;!L.templateUrl&&L.controller&&(v=L.controller,E=E||{},za("'"+ga+"' controller",E[ga],L,Y),E[ga]=L);if(v=L.transclude)A=!0,L.$$tlb||(za("transclusion",fa,L,Y),fa=L),"element"==v?(F=!0,J=L.priority,v=Y,Y=e.$$element=z(U.createComment(" "+ga+
": "+e[ga]+" ")),d=Y[0],zb(g,Ya.call(v,0),d),Ha=C(v,f,J,k&&k.name,{nonTlbTranscludeDirective:fa})):(v=z(Qb(d)).contents(),Y.empty(),Ha=C(v,f));if(L.template)if(Oa=!0,za("template",ba,L,Y),ba=L,v=u(L.template)?L.template(Y,e):L.template,v=Pc(v),L.replace){k=L;v=Ob.test(v)?Qc(T(L.templateNamespace,P(v))):[];d=v[0];if(1!=v.length||d.nodeType!==ka)throw ia("tplrt",ga,"");zb(g,Y,d);Aa={$attr:{}};v=W(d,[],Aa);var nf=a.splice(S+1,a.length-(S+1));N&&y(v);a=a.concat(v).concat(nf);w(e,Aa);Aa=a.length}else Y.html(v);
if(L.templateUrl)Oa=!0,za("template",ba,L,Y),ba=L,L.replace&&(k=L),I=mf(a.splice(S,a.length-S),Y,e,g,A&&Ha,l,s,{controllerDirectives:E,newIsolateScopeDirective:N,templateDirective:ba,nonTlbTranscludeDirective:fa}),Aa=a.length;else if(L.compile)try{R=L.compile(Y,e,Ha),u(R)?B(null,R,yb,aa):R&&B(R.pre,R.post,yb,aa)}catch(da){c(da,va(Y))}L.terminal&&(I.terminal=!0,J=Math.max(J,L.priority))}I.scope=x&&!0===x.scope;I.transcludeOnThisElement=A;I.elementTranscludeOnThisElement=F;I.templateOnThisElement=Oa;
I.transclude=Ha;p.hasElementTranscludeDirective=F;return I}function y(a){for(var b=0,c=a.length;b<c;b++)a[b]=mc(a[b],{$$isolateScope:!0})}function fa(b,e,f,g,k,h,l){if(e===k)return null;k=null;if(d.hasOwnProperty(e)){var q;e=a.get(e+"Directive");for(var s=0,B=e.length;s<B;s++)try{q=e[s],(g===t||g>q.priority)&&-1!=q.restrict.indexOf(f)&&(h&&(q=mc(q,{$$start:h,$$end:l})),b.push(q),k=q)}catch(O){c(O)}}return k}function w(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;r(a,function(d,e){"$"!=e.charAt(0)&&
(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});r(b,function(b,f){"class"==f?(J(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function mf(a,b,c,d,e,f,g,k){var h=[],l,q,p=b[0],n=a.shift(),B=F({},n,{templateUrl:null,transclude:null,replace:null,$$originalDirective:n}),O=u(n.templateUrl)?n.templateUrl(b,c):n.templateUrl,D=n.templateNamespace;
b.empty();s(K.getTrustedResourceUrl(O)).then(function(s){var I,K;s=Pc(s);if(n.replace){s=Ob.test(s)?Qc(T(D,P(s))):[];I=s[0];if(1!=s.length||I.nodeType!==ka)throw ia("tplrt",n.name,O);s={$attr:{}};zb(d,b,I);var x=W(I,[],s);M(n.scope)&&y(x);a=x.concat(a);w(c,s)}else I=p,b.html(s);a.unshift(B);l=ba(a,I,c,e,b,n,f,g,k);r(d,function(a,c){a==I&&(d[c]=b[0])});for(q=ca(b[0].childNodes,e);h.length;){s=h.shift();K=h.shift();var E=h.shift(),C=h.shift(),x=b[0];if(!s.$$destroyed){if(K!==p){var Q=K.className;k.hasElementTranscludeDirective&&
n.replace||(x=Qb(I));zb(E,z(K),x);J(z(x),Q)}K=l.transcludeOnThisElement?N(s,l.transclude,C):C;l(q,s,x,d,K)}}h=null});return function(a,b,c,d,e){a=e;b.$$destroyed||(h?(h.push(b),h.push(c),h.push(d),h.push(a)):(l.transcludeOnThisElement&&(a=N(b,l.transclude,e)),l(q,b,c,d,a)))}}function v(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function za(a,b,c,d){if(b)throw ia("multidir",b.name,c.name,a,va(d));}function Y(a,c){var d=b(c,!0);d&&a.push({priority:0,
compile:function(a){a=a.parent();var b=!!a.length;b&&C.$$addBindingClass(a);return function(a,c){var e=c.parent();b||C.$$addBindingClass(e);C.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function T(a,b){a=R(a||"html");switch(a){case "svg":case "math":var c=U.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function Ha(a,b){if("srcdoc"==b)return K.HTML;var c=sa(a);if("xlinkHref"==b||"form"==c&&"action"==b||
"img"!=c&&("src"==b||"ngSrc"==b))return K.RESOURCE_URL}function S(a,c,d,e,f){var h=b(d,!0);if(h){if("multiple"===e&&"select"===sa(a))throw ia("selmulti",va(a));c.push({priority:100,compile:function(){return{pre:function(c,d,l){d=l.$$observers||(l.$$observers={});if(k.test(e))throw ia("nodomevents");l[e]&&(h=b(l[e],!0,Ha(a,e),g[e]||f))&&(l[e]=h(c),(d[e]||(d[e]=[])).$$inter=!0,(l.$$observers&&l.$$observers[e].$$scope||c).$watch(h,function(a,b){"class"===e&&a!=b?l.$updateClass(a,b):l.$set(e,a)}))}}}})}}
function zb(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,k;if(a)for(g=0,k=a.length;g<k;g++)if(a[g]==d){a[g++]=c;k=g+e-1;for(var h=a.length;g<h;g++,k++)k<h?a[g]=a[k]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=U.createDocumentFragment();a.appendChild(d);z(c).data(z(d).data());na?(Mb=!0,na.cleanData([d])):delete z.cache[d[z.expando]];d=1;for(e=b.length;d<e;d++)f=b[d],z(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function Z(a,b){return F(function(){return a.apply(null,
arguments)},a,b)}function $(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(k){c(k,va(d))}}var V=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=a};V.prototype={$normalize:xa,$addClass:function(a){a&&0<a.length&&E.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&E.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=Rc(a,b);c&&c.length&&E.addClass(this.$$element,c);(c=Rc(b,a))&&c.length&&E.removeClass(this.$$element,
c)},$set:function(a,b,d,e){var f=this.$$element[0],g=Kc(f,a),k=ff(f,a),f=a;g?(this.$$element.prop(a,b),e=g):k&&(this[k]=b,f=k);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=Lb(a,"-"));g=sa(this.$$element);if("a"===g&&"href"===a||"img"===g&&"src"===a)this[a]=b=I(b,"src"===a);else if("img"===g&&"srcset"===a){for(var g="",k=P(b),h=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,h=/\s/.test(k)?h:/(,)/,k=k.split(h),h=Math.floor(k.length/2),l=0;l<h;l++)var q=2*l,g=g+I(P(k[q]),!0),g=g+(" "+P(k[q+
1]));k=P(k[2*l]).split(/\s/);g+=I(P(k[0]),!0);2===k.length&&(g+=" "+P(k[1]));this[a]=b=g}!1!==d&&(null===b||b===t?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&r(a[f],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=oa()),e=d[a]||(d[a]=[]);e.push(b);x.$evalAsync(function(){!e.$$inter&&c.hasOwnProperty(a)&&b(c[a])});return function(){Wa(e,b)}}};var Oa=b.startSymbol(),ga=b.endSymbol(),Pc="{{"==Oa||"}}"==ga?la:function(a){return a.replace(/\{\{/g,
Oa).replace(/}}/g,ga)},Aa=/^ngAttr[A-Z]/;C.$$addBindingInfo=l?function(a,b){var c=a.data("$binding")||[];H(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:A;C.$$addBindingClass=l?function(a){J(a,"ng-binding")}:A;C.$$addScopeInfo=l?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:A;C.$$addScopeClass=l?function(a,b){J(a,b?"ng-isolate-scope":"ng-scope")}:A;return C}]}function xa(b){return ab(b.replace(of,""))}function Rc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),
f=0;a:for(;f<d.length;f++){for(var g=d[f],h=0;h<e.length;h++)if(g==e[h])continue a;c+=(0<c.length?" ":"")+g}return c}function Qc(b){b=z(b);var a=b.length;if(1>=a)return b;for(;a--;)8===b[a].nodeType&&pf.call(b,a,1);return b}function Ce(){var b={},a=!1,c=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,c){Ma(a,"controller");M(a)?F(b,a):b[a]=c};this.allowGlobals=function(){a=!0};this.$get=["$injector","$window",function(d,e){function f(a,b,c,d){if(!a||!M(a.$scope))throw v("$controller")("noscp",d,
b);a.$scope[b]=c}return function(g,h,k,l){var m,p,q;k=!0===k;l&&G(l)&&(q=l);G(g)&&(l=g.match(c),p=l[1],q=q||l[3],g=b.hasOwnProperty(p)?b[p]:uc(h.$scope,p,!0)||(a?uc(e,p,!0):t),ob(g,p,!0));if(k)return k=function(){},k.prototype=(H(g)?g[g.length-1]:g).prototype,m=new k,q&&f(h,q,m,p||g.name),F(function(){d.invoke(g,m,h,p);return m},{instance:m,identifier:q});m=d.instantiate(g,h,p);q&&f(h,q,m,p||g.name);return m}}]}function De(){this.$get=["$window",function(b){return z(b.document)}]}function Ee(){this.$get=
["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function Xb(b,a){if(G(b)){b=b.replace(qf,"");var c=a("Content-Type");if(c&&0===c.indexOf(Sc)||rf.test(b)&&sf.test(b))b=pc(b)}return b}function Tc(b){var a={},c,d,e;if(!b)return a;r(b.split("\n"),function(b){e=b.indexOf(":");c=R(P(b.substr(0,e)));d=P(b.substr(e+1));c&&(a[c]=a[c]?a[c]+", "+d:d)});return a}function Uc(b){var a=M(b)?b:t;return function(c){a||(a=Tc(b));return c?a[R(c)]||null:a}}function Vc(b,a,c){if(u(c))return c(b,
a);r(c,function(c){b=c(b,a)});return b}function He(){var b=this.defaults={transformResponse:[Xb],transformRequest:[function(a){return M(a)&&"[object File]"!==Ka.call(a)&&"[object Blob]"!==Ka.call(a)?ua(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ta(Yb),put:ta(Yb),patch:ta(Yb)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},a=!1;this.useApplyAsync=function(b){return y(b)?(a=!!b,this):a};var c=this.interceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory",
"$rootScope","$q","$injector",function(d,e,f,g,h,k){function l(a){function c(a){var b=F({},a);b.data=a.data?Vc(a.data,a.headers,d.transformResponse):a.data;a=a.status;return 200<=a&&300>a?b:h.reject(b)}var d={method:"get",transformRequest:b.transformRequest,transformResponse:b.transformResponse},e=function(a){var c=b.headers,d=F({},a.headers),e,f,c=F({},c.common,c[R(a.method)]);a:for(e in c){a=R(e);for(f in d)if(R(f)===a)continue a;d[e]=c[e]}(function(a){var b;r(a,function(c,d){u(c)&&(b=c(),null!=
b?a[d]=b:delete a[d])})})(d);return d}(a);F(d,a);d.headers=e;d.method=qb(d.method);var f=[function(a){e=a.headers;var d=Vc(a.data,Uc(e),a.transformRequest);w(d)&&r(e,function(a,b){"content-type"===R(b)&&delete e[b]});w(a.withCredentials)&&!w(b.withCredentials)&&(a.withCredentials=b.withCredentials);return m(a,d,e).then(c,c)},t],g=h.when(d);for(r(n,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=
f.shift();var k=f.shift(),g=g.then(a,k)}g.success=function(a){g.then(function(b){a(b.data,b.status,b.headers,d)});return g};g.error=function(a){g.then(null,function(b){a(b.data,b.status,b.headers,d)});return g};return g}function m(c,f,k){function n(b,c,d,e){function f(){m(c,b,d,e)}J&&(200<=b&&300>b?J.put(r,[b,c,Tc(d),e]):J.remove(r));a?g.$applyAsync(f):(f(),g.$$phase||g.$apply())}function m(a,b,d,e){b=Math.max(b,0);(200<=b&&300>b?E.resolve:E.reject)({data:a,status:b,headers:Uc(d),config:c,statusText:e})}
function K(){var a=l.pendingRequests.indexOf(c);-1!==a&&l.pendingRequests.splice(a,1)}var E=h.defer(),I=E.promise,J,C,r=p(c.url,c.params);l.pendingRequests.push(c);I.then(K,K);!c.cache&&!b.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(J=M(c.cache)?c.cache:M(b.cache)?b.cache:q);if(J)if(C=J.get(r),y(C)){if(C&&u(C.then))return C.then(K,K),C;H(C)?m(C[1],C[0],ta(C[2]),C[3]):m(C,200,{},"OK")}else J.put(r,I);w(C)&&((C=Wc(c.url)?e.cookies()[c.xsrfCookieName||b.xsrfCookieName]:t)&&(k[c.xsrfHeaderName||
b.xsrfHeaderName]=C),d(c.method,r,f,n,k,c.timeout,c.withCredentials,c.responseType));return I}function p(a,b){if(!b)return a;var c=[];Bd(b,function(a,b){null===a||w(a)||(H(a)||(a=[a]),r(a,function(a){M(a)&&(a=ea(a)?a.toISOString():ua(a));c.push(Ea(b)+"="+Ea(a))}))});0<c.length&&(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var q=f("$http"),n=[];r(c,function(a){n.unshift(G(a)?k.get(a):k.invoke(a))});l.pendingRequests=[];(function(a){r(arguments,function(a){l[a]=function(b,c){return l(F(c||
{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){r(arguments,function(a){l[a]=function(b,c,d){return l(F(d||{},{method:a,url:b,data:c}))}})})("post","put","patch");l.defaults=b;return l}]}function tf(){return new T.XMLHttpRequest}function Ie(){this.$get=["$browser","$window","$document",function(b,a,c){return uf(b,tf,b.defer,a.angular.callbacks,c[0])}]}function uf(b,a,c,d,e){function f(a,b,c){var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;
m=function(a){f.removeEventListener("load",m,!1);f.removeEventListener("error",m,!1);e.body.removeChild(f);f=null;var g=-1,n="unknown";a&&("load"!==a.type||d[b].called||(a={type:"error"}),n=a.type,g="error"===a.type?404:200);c&&c(g,n)};f.addEventListener("load",m,!1);f.addEventListener("error",m,!1);e.body.appendChild(f);return m}return function(e,h,k,l,m,p,q,n){function s(){x&&x();B&&B.abort()}function O(a,d,e,f,g){E&&c.cancel(E);x=B=null;a(d,e,f,g);b.$$completeOutstandingRequest(A)}b.$$incOutstandingRequestCount();
h=h||b.url();if("jsonp"==R(e)){var D="_"+(d.counter++).toString(36);d[D]=function(a){d[D].data=a;d[D].called=!0};var x=f(h.replace("JSON_CALLBACK","angular.callbacks."+D),D,function(a,b){O(l,a,d[D].data,"",b);d[D]=A})}else{var B=a();B.open(e,h,!0);r(m,function(a,b){y(a)&&B.setRequestHeader(b,a)});B.onload=function(){var a=B.statusText||"",b="response"in B?B.response:B.responseText,c=1223===B.status?204:B.status;0===c&&(c=b?200:"file"==Ba(h).protocol?404:0);O(l,c,b,B.getAllResponseHeaders(),a)};e=
function(){O(l,-1,null,null,"")};B.onerror=e;B.onabort=e;q&&(B.withCredentials=!0);if(n)try{B.responseType=n}catch(K){if("json"!==n)throw K;}B.send(k||null)}if(0<p)var E=c(s,p);else p&&u(p.then)&&p.then(s)}}function Fe(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(a){return"\\\\\\"+a}function g(f,g,n,s){function O(c){return c.replace(l,b).replace(m,
a)}function D(a){try{var b;var c=n?e.getTrusted(n,a):e.valueOf(a);if(null==c)b="";else{switch(typeof c){case "string":break;case "number":c=""+c;break;default:c=ua(c)}b=c}return b}catch(g){a=Zb("interr",f,g.toString()),d(a)}}s=!!s;for(var x,B,K=0,E=[],I=[],J=f.length,C=[],r=[];K<J;)if(-1!=(x=f.indexOf(b,K))&&-1!=(B=f.indexOf(a,x+h)))K!==x&&C.push(O(f.substring(K,x))),K=f.substring(x+h,B),E.push(K),I.push(c(K,D)),K=B+k,r.push(C.length),C.push("");else{K!==J&&C.push(O(f.substring(K)));break}if(n&&1<
C.length)throw Zb("noconcat",f);if(!g||E.length){var N=function(a){for(var b=0,c=E.length;b<c;b++){if(s&&w(a[b]))return;C[r[b]]=a[b]}return C.join("")};return F(function(a){var b=0,c=E.length,e=Array(c);try{for(;b<c;b++)e[b]=I[b](a);return N(e)}catch(g){a=Zb("interr",f,g.toString()),d(a)}},{exp:f,expressions:E,$$watchDelegate:function(a,b,c){var d;return a.$watchGroup(I,function(c,e){var f=N(c);u(b)&&b.call(this,f,c!==e?d:f,a);d=f},c)}})}}var h=b.length,k=a.length,l=new RegExp(b.replace(/./g,f),"g"),
m=new RegExp(a.replace(/./g,f),"g");g.startSymbol=function(){return b};g.endSymbol=function(){return a};return g}]}function Ge(){this.$get=["$rootScope","$window","$q","$$q",function(b,a,c,d){function e(e,h,k,l){var m=a.setInterval,p=a.clearInterval,q=0,n=y(l)&&!l,s=(n?d:c).defer(),O=s.promise;k=y(k)?k:0;O.then(null,null,e);O.$$intervalId=m(function(){s.notify(q++);0<k&&q>=k&&(s.resolve(q),p(O.$$intervalId),delete f[O.$$intervalId]);n||b.$apply()},h);f[O.$$intervalId]=s;return O}var f={};e.cancel=
function(b){return b&&b.$$intervalId in f?(f[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),delete f[b.$$intervalId],!0):!1};return e}]}function Od(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),
SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function $b(b){b=b.split("/");for(var a=b.length;a--;)b[a]=
mb(b[a]);return b.join("/")}function Xc(b,a,c){b=Ba(b,c);a.$$protocol=b.protocol;a.$$host=b.hostname;a.$$port=aa(b.port)||vf[b.protocol]||null}function Yc(b,a,c){var d="/"!==b.charAt(0);d&&(b="/"+b);b=Ba(b,c);a.$$path=decodeURIComponent(d&&"/"===b.pathname.charAt(0)?b.pathname.substring(1):b.pathname);a.$$search=rc(b.search);a.$$hash=decodeURIComponent(b.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function ya(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ga(b){var a=
b.indexOf("#");return-1==a?b:b.substr(0,a)}function ac(b){return b.substr(0,Ga(b).lastIndexOf("/")+1)}function bc(b,a){this.$$html5=!0;a=a||"";var c=ac(b);Xc(b,this,b);this.$$parse=function(a){var e=ya(c,a);if(!G(e))throw db("ipthprfx",a,c);Yc(e,this,b);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Jb(this.$$search),b=this.$$hash?"#"+mb(this.$$hash):"";this.$$url=$b(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$parseLinkUrl=function(d,
e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;(f=ya(b,d))!==t?(g=f,g=(f=ya(a,f))!==t?c+(ya("/",f)||f):b+g):(f=ya(c,d))!==t?g=c+f:c==d+"/"&&(g=c);g&&this.$$parse(g);return!!g}}function cc(b,a){var c=ac(b);Xc(b,this,b);this.$$parse=function(d){var e=ya(b,d)||ya(c,d),e="#"==e.charAt(0)?ya(a,e):this.$$html5?e:"";if(!G(e))throw db("ihshprfx",d,a);Yc(e,this,b);d=this.$$path;var f=/^\/[A-Z]:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));f.exec(e)||(d=(e=f.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};
this.$$compose=function(){var c=Jb(this.$$search),e=this.$$hash?"#"+mb(this.$$hash):"";this.$$url=$b(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$parseLinkUrl=function(a,c){return Ga(b)==Ga(a)?(this.$$parse(a),!0):!1}}function Zc(b,a){this.$$html5=!0;cc.apply(this,arguments);var c=ac(b);this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;b==Ga(d)?f=d:(g=ya(c,d))?f=b+a+g:c===d+"/"&&(f=c);f&&this.$$parse(f);return!!f};this.$$compose=
function(){var c=Jb(this.$$search),e=this.$$hash?"#"+mb(this.$$hash):"";this.$$url=$b(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+a+this.$$url}}function Ab(b){return function(){return this[b]}}function $c(b,a){return function(c){if(w(c))return this[b];this[b]=a(c);this.$$compose();return this}}function Je(){var b="",a={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(a){return y(a)?(b=a,this):b};this.html5Mode=function(b){return Va(b)?(a.enabled=b,this):M(b)?(Va(b.enabled)&&(a.enabled=
b.enabled),Va(b.requireBase)&&(a.requireBase=b.requireBase),Va(b.rewriteLinks)&&(a.rewriteLinks=b.rewriteLinks),this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,f){function g(a,b,c){var e=k.url(),f=k.$$state;try{d.url(a,b,c),k.$$state=d.state()}catch(g){throw k.url(e),k.$$state=f,g;}}function h(a,b){c.$broadcast("$locationChangeSuccess",k.absUrl(),a,k.$$state,b)}var k,l;l=d.baseHref();var m=d.url(),p;if(a.enabled){if(!l&&a.requireBase)throw db("nobase");p=m.substring(0,
m.indexOf("/",m.indexOf("//")+2))+(l||"/");l=e.history?bc:Zc}else p=Ga(m),l=cc;k=new l(p,"#"+b);k.$$parseLinkUrl(m,m);k.$$state=d.state();var q=/^\s*(javascript|mailto):/i;f.on("click",function(b){if(a.rewriteLinks&&!b.ctrlKey&&!b.metaKey&&2!=b.which){for(var e=z(b.target);"a"!==sa(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var g=e.prop("href"),h=e.attr("href")||e.attr("xlink:href");M(g)&&"[object SVGAnimatedString]"===g.toString()&&(g=Ba(g.animVal).href);q.test(g)||!g||e.attr("target")||b.isDefaultPrevented()||
!k.$$parseLinkUrl(g,h)||(b.preventDefault(),k.absUrl()!=d.url()&&(c.$apply(),T.angular["ff-684208-preventDefault"]=!0))}});k.absUrl()!=m&&d.url(k.absUrl(),!0);var n=!0;d.onUrlChange(function(a,b){c.$evalAsync(function(){var d=k.absUrl(),e=k.$$state;k.$$parse(a);k.$$state=b;c.$broadcast("$locationChangeStart",a,d,b,e).defaultPrevented?(k.$$parse(d),k.$$state=e,g(d,!1,e)):(n=!1,h(d,e))});c.$$phase||c.$digest()});c.$watch(function(){var a=d.url(),b=d.state(),f=k.$$replace,l=a!==k.absUrl()||k.$$html5&&
e.history&&b!==k.$$state;if(n||l)n=!1,c.$evalAsync(function(){c.$broadcast("$locationChangeStart",k.absUrl(),a,k.$$state,b).defaultPrevented?(k.$$parse(a),k.$$state=b):(l&&g(k.absUrl(),f,b===k.$$state?null:k.$$state),h(a,b))});k.$$replace=!1});return k}]}function Ke(){var b=!0,a=this;this.debugEnabled=function(a){return y(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:
a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||A;a=!1;try{a=!!e.apply}catch(k){}return a?function(){var a=[];r(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function pa(b,a){if("__defineGetter__"===b||"__defineSetter__"===b||"__lookupGetter__"===
b||"__lookupSetter__"===b||"__proto__"===b)throw qa("isecfld",a);return b}function ra(b,a){if(b){if(b.constructor===b)throw qa("isecfn",a);if(b.window===b)throw qa("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw qa("isecdom",a);if(b===Object)throw qa("isecobj",a);}return b}function dc(b){return b.constant}function Pa(b,a,c,d){ra(b,d);a=a.split(".");for(var e,f=0;1<a.length;f++){e=pa(a.shift(),d);var g=ra(b[e],d);g||(g={},b[e]=g);b=g}e=pa(a.shift(),d);ra(b[e],d);return b[e]=
c}function Qa(b){return"constructor"==b}function ad(b,a,c,d,e,f,g){pa(b,f);pa(a,f);pa(c,f);pa(d,f);pa(e,f);var h=function(a){return ra(a,f)},k=g||Qa(b)?h:la,l=g||Qa(a)?h:la,m=g||Qa(c)?h:la,p=g||Qa(d)?h:la,q=g||Qa(e)?h:la;return function(f,g){var h=g&&g.hasOwnProperty(b)?g:f;if(null==h)return h;h=k(h[b]);if(!a)return h;if(null==h)return t;h=l(h[a]);if(!c)return h;if(null==h)return t;h=m(h[c]);if(!d)return h;if(null==h)return t;h=p(h[d]);return e?null==h?t:h=q(h[e]):h}}function wf(b,a){return function(c,
d){return b(c,d,ra,a)}}function bd(b,a,c){var d=a.expensiveChecks,e=d?xf:yf,f=e[b];if(f)return f;var g=b.split("."),h=g.length;if(a.csp)f=6>h?ad(g[0],g[1],g[2],g[3],g[4],c,d):function(a,b){var e=0,f;do f=ad(g[e++],g[e++],g[e++],g[e++],g[e++],c,d)(a,b),b=t,a=f;while(e<h);return f};else{var k="";d&&(k+="s = eso(s, fe);\nl = eso(l, fe);\n");var l=d;r(g,function(a,b){pa(a,c);var e=(b?"s":'((l&&l.hasOwnProperty("'+a+'"))?l:s)')+"."+a;if(d||Qa(a))e="eso("+e+", fe)",l=!0;k+="if(s == null) return undefined;\ns="+
e+";\n"});k+="return s;";a=new Function("s","l","eso","fe",k);a.toString=da(k);l&&(a=wf(a,c));f=a}f.sharedGetter=!0;f.assign=function(a,c){return Pa(a,b,c,b)};return e[b]=f}function ec(b){return u(b.valueOf)?b.valueOf():zf.call(b)}function Le(){var b=oa(),a=oa();this.$get=["$filter","$sniffer",function(c,d){function e(a){var b=a;a.sharedGetter&&(b=function(b,c){return a(b,c)},b.literal=a.literal,b.constant=a.constant,b.assign=a.assign);return b}function f(a,b){for(var c=0,d=a.length;c<d;c++){var e=
a[c];e.constant||(e.inputs?f(e.inputs,b):-1===b.indexOf(e)&&b.push(e))}return b}function g(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=ec(a),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function h(a,b,c,d){var e=d.$$inputs||(d.$$inputs=f(d.inputs,[])),k;if(1===e.length){var h=g,e=e[0];return a.$watch(function(a){var b=e(a);g(b,h)||(k=d(a),h=b&&ec(b));return k},b,c)}for(var l=[],q=0,n=e.length;q<n;q++)l[q]=g;return a.$watch(function(a){for(var b=!1,c=0,f=e.length;c<f;c++){var h=e[c](a);
if(b||(b=!g(h,l[c])))l[c]=h&&ec(h)}b&&(k=d(a));return k},b,c)}function k(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;u(b)&&b.apply(this,arguments);y(a)&&d.$$postDigest(function(){y(f)&&e()})},c)}function l(a,b,c,d){function e(a){var b=!0;r(a,function(a){y(a)||(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,c,d){g=a;u(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function m(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},
function(a,c,d){u(b)&&b.apply(this,arguments);e()},c)}function p(a,b){if(!b)return a;var c=function(c,d){var e=a(c,d),f=b(e,c,d);return y(e)||b.$stateful?f:e};a.$$watchDelegate&&a.$$watchDelegate!==h?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=h,c.inputs=[a]);return c}var q={csp:d.csp,expensiveChecks:!1},n={csp:d.csp,expensiveChecks:!0};return function(d,f,g){var r,B,K;switch(typeof d){case "string":K=d=d.trim();var E=g?a:b;r=E[K];r||(":"===d.charAt(0)&&":"===d.charAt(1)&&
(B=!0,d=d.substring(2)),g=g?n:q,r=new fc(g),r=(new eb(r,c,g)).parse(d),r.constant?r.$$watchDelegate=m:B?(r=e(r),r.$$watchDelegate=r.literal?l:k):r.inputs&&(r.$$watchDelegate=h),E[K]=r);return p(r,f);case "function":return p(d,f);default:return p(A,f)}}}]}function Ne(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return cd(function(a){b.$evalAsync(a)},a)}]}function Oe(){this.$get=["$browser","$exceptionHandler",function(b,a){return cd(function(a){b.defer(a)},a)}]}function cd(b,a){function c(a,
b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function d(){this.$$state={status:0}}function e(a,b){return function(c){b.call(a,c)}}function f(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,b(function(){var b,d,e;e=c.pending;c.processScheduled=!1;c.pending=t;for(var f=0,g=e.length;f<g;++f){d=e[f][0];b=e[f][c.status];try{u(b)?d.resolve(b(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(k){d.reject(k),a(k)}}}))}function g(){this.promise=
new d;this.resolve=e(this,this.resolve);this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var h=v("$q",TypeError);d.prototype={then:function(a,b,c){var d=new g;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return l(b,!0,a)},function(b){return l(b,!1,a)},b)}};g.prototype={resolve:function(a){this.promise.$$state.status||
(a===this.promise?this.$$reject(h("qcycle",a)):this.$$resolve(a))},$$resolve:function(b){var d,e;e=c(this,this.$$resolve,this.$$reject);try{if(M(b)||u(b))d=b&&b.then;u(d)?(this.promise.$$state.status=-1,d.call(b,e[0],e[1],this.notify)):(this.promise.$$state.value=b,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),a(g)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;f(this.promise.$$state)},
notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&d&&d.length&&b(function(){for(var b,e,f=0,g=d.length;f<g;f++){e=d[f][0];b=d[f][3];try{e.notify(u(b)?b(c):c)}catch(k){a(k)}}})}};var k=function(a,b){var c=new g;b?c.resolve(a):c.reject(a);return c.promise},l=function(a,b,c){var d=null;try{u(c)&&(d=c())}catch(e){return k(e,!1)}return d&&u(d.then)?d.then(function(){return k(a,b)},function(a){return k(a,!1)}):k(a,b)},m=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,
c,d)},p=function n(a){if(!u(a))throw h("norslvr",a);if(!(this instanceof n))return new n(a);var b=new g;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};p.defer=function(){return new g};p.reject=function(a){var b=new g;b.reject(a);return b.promise};p.when=m;p.all=function(a){var b=new g,c=0,d=H(a)?[]:{};r(a,function(a,e){c++;m(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};
return p}function Xe(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.mozCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};f.supported=e;return f}]}function Me(){var b=10,a=v("$rootScope"),c=null,d=null;this.digestTtl=function(a){arguments.length&&
(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(e,f,g,h){function k(){this.$id=++ib;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings=null}function l(b){if(s.$$phase)throw a("inprog",s.$$phase);s.$$phase=b}function m(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];
while(a=a.$parent)}function p(){}function q(){for(;x.length;)try{x.shift()()}catch(a){f(a)}d=null}function n(){null===d&&(d=h.defer(function(){s.$apply(q)}))}k.prototype={constructor:k,$new:function(a,b){function c(){d.$$destroyed=!0}var d;b=b||this;a?(d=new k,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=function(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$id=++ib;this.$$ChildScope=null},this.$$ChildScope.prototype=
this),d=new this.$$ChildScope);d.$parent=b;d.$$prevSibling=b.$$childTail;b.$$childHead?(b.$$childTail.$$nextSibling=d,b.$$childTail=d):b.$$childHead=b.$$childTail=d;(a||b!=this)&&d.$on("$destroy",c);return d},$watch:function(a,b,d){var e=g(a);if(e.$$watchDelegate)return e.$$watchDelegate(this,b,d,e);var f=this.$$watchers,k={fn:b,last:p,get:e,exp:a,eq:!!d};c=null;u(b)||(k.fn=A);f||(f=this.$$watchers=[]);f.unshift(k);return function(){Wa(f,k);c=null}},$watchGroup:function(a,b){function c(){k=!1;h?(h=
!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,k=!1,h=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});r(a,function(a,b){var h=g.$watch(a,function(a,f){e[b]=a;d[b]=f;k||(k=!0,g.$evalAsync(c))});f.push(h)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,k;if(!w(e)){if(M(e))if(Sa(e))for(f!==
p&&(f=p,s=f.length=0,l++),a=e.length,s!==a&&(l++,f.length=s=a),b=0;b<a;b++)k=f[b],g=e[b],d=k!==k&&g!==g,d||k===g||(l++,f[b]=g);else{f!==q&&(f=q={},s=0,l++);a=0;for(b in e)e.hasOwnProperty(b)&&(a++,g=e[b],k=f[b],b in f?(d=k!==k&&g!==g,d||k===g||(l++,f[b]=g)):(s++,f[b]=g,l++));if(s>a)for(b in l++,f)e.hasOwnProperty(b)||(s--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$stateful=!0;var d=this,e,f,k,h=1<b.length,l=0,m=g(a,c),p=[],q={},n=!0,s=0;return this.$watch(m,function(){n?(n=!1,b(e,e,d)):b(e,k,
d);if(h)if(M(e))if(Sa(e)){k=Array(e.length);for(var a=0;a<e.length;a++)k[a]=e[a]}else for(a in k={},e)Ib.call(e,a)&&(k[a]=e[a]);else k=e})},$digest:function(){var e,g,k,m,n,r,x=b,N,t=[],X,Q,y;l("$digest");h.$$checkUrlChange();this===s&&null!==d&&(h.defer.cancel(d),q());c=null;do{r=!1;for(N=this;O.length;){try{y=O.shift(),y.scope.$eval(y.expression)}catch(v){f(v)}c=null}a:do{if(m=N.$$watchers)for(n=m.length;n--;)try{if(e=m[n])if((g=e.get(N))!==(k=e.last)&&!(e.eq?ma(g,k):"number"===typeof g&&"number"===
typeof k&&isNaN(g)&&isNaN(k)))r=!0,c=e,e.last=e.eq?Da(g,null):g,e.fn(g,k===p?g:k,N),5>x&&(X=4-x,t[X]||(t[X]=[]),Q=u(e.exp)?"fn: "+(e.exp.name||e.exp.toString()):e.exp,Q+="; newVal: "+ua(g)+"; oldVal: "+ua(k),t[X].push(Q));else if(e===c){r=!1;break a}}catch(z){f(z)}if(!(m=N.$$childHead||N!==this&&N.$$nextSibling))for(;N!==this&&!(m=N.$$nextSibling);)N=N.$parent}while(N=m);if((r||O.length)&&!x--)throw s.$$phase=null,a("infdig",b,ua(t));}while(r||O.length);for(s.$$phase=null;D.length;)try{D.shift()()}catch(A){f(A)}},
$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;if(this!==s){for(var b in this.$$listenerCount)m(this,this.$$listenerCount[b],b);a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=
this.$applyAsync=A;this.$on=this.$watch=this.$watchGroup=function(){return A};this.$$listeners={};this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=this.$$watchers=null}}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a){s.$$phase||O.length||h.defer(function(){O.length&&s.$digest()});O.push({scope:this,expression:a})},$$postDigest:function(a){D.push(a)},$apply:function(a){try{return l("$apply"),this.$eval(a)}catch(b){f(b)}finally{s.$$phase=
null;try{s.$digest()}catch(c){throw f(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&x.push(b);n()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(c[d]=null,m(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,g=!1,k={name:a,targetScope:e,stopPropagation:function(){g=!0},preventDefault:function(){k.defaultPrevented=
!0},defaultPrevented:!1},h=kb([k],arguments,1),l,m;do{d=e.$$listeners[a]||c;k.currentScope=e;l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,h)}catch(p){f(p)}else d.splice(l,1),l--,m--;if(g)return k.currentScope=null,k;e=e.$parent}while(e);k.currentScope=null;return k},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var g=kb([e],arguments,1),k,h;c=d;){e.currentScope=
c;d=c.$$listeners[a]||[];k=0;for(h=d.length;k<h;k++)if(d[k])try{d[k].apply(null,g)}catch(l){f(l)}else d.splice(k,1),k--,h--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var s=new k,O=s.$$asyncQueue=[],D=s.$$postDigestQueue=[],x=s.$$applyAsyncQueue=[];return s}]}function Pd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=
function(a){return y(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return y(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,f;f=Ba(c).href;return""===f||f.match(e)?c:"unsafe:"+f}}}function Af(b){if("self"===b)return b;if(G(b)){if(-1<b.indexOf("***"))throw Ca("iwcard",b);b=dd(b).replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+b+"$")}if(jb(b))return new RegExp("^"+b.source+"$");throw Ca("imatcher");}function ed(b){var a=[];y(b)&&r(b,function(b){a.push(Af(b))});
return a}function Qe(){this.SCE_CONTEXTS=ja;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=ed(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=ed(b));return a};this.$get=["$injector",function(c){function d(a,b){return"self"===a?Wc(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};
return b}var f=function(a){throw Ca("unsafe");};c.has("$sanitize")&&(f=c.get("$sanitize"));var g=e(),h={};h[ja.HTML]=e(g);h[ja.CSS]=e(g);h[ja.URL]=e(g);h[ja.JS]=e(g);h[ja.RESOURCE_URL]=e(h[ja.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Ca("icontext",a,b);if(null===b||b===t||""===b)return b;if("string"!==typeof b)throw Ca("itype",a);return new c(b)},getTrusted:function(c,e){if(null===e||e===t||""===e)return e;var g=h.hasOwnProperty(c)?h[c]:null;if(g&&e instanceof
g)return e.$$unwrapTrustedValue();if(c===ja.RESOURCE_URL){var g=Ba(e.toString()),p,q,n=!1;p=0;for(q=b.length;p<q;p++)if(d(b[p],g)){n=!0;break}if(n)for(p=0,q=a.length;p<q;p++)if(d(a[p],g)){n=!1;break}if(n)return e;throw Ca("insecurl",e.toString());}if(c===ja.HTML)return f(e);throw Ca("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function Pe(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sceDelegate",function(a,c){if(b&&
8>Ia)throw Ca("iequirks");var d=ta(ja);d.isEnabled=function(){return b};d.trustAs=c.trustAs;d.getTrusted=c.getTrusted;d.valueOf=c.valueOf;b||(d.trustAs=d.getTrusted=function(a,b){return b},d.valueOf=la);d.parseAs=function(b,c){var e=a(c);return e.literal&&e.constant?e:a(c,function(a){return d.getTrusted(b,a)})};var e=d.parseAs,f=d.getTrusted,g=d.trustAs;r(ja,function(a,b){var c=R(b);d[ab("parse_as_"+c)]=function(b){return e(a,b)};d[ab("get_trusted_"+c)]=function(b){return f(a,b)};d[ab("trust_as_"+
c)]=function(b){return g(a,b)}});return d}]}function Re(){this.$get=["$window","$document",function(b,a){var c={},d=aa((/android (\d+)/.exec(R((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),f=a[0]||{},g,h=/^(Moz|webkit|ms)(?=[A-Z])/,k=f.body&&f.body.style,l=!1,m=!1;if(k){for(var p in k)if(l=h.exec(p)){g=l[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in k&&"webkit");l=!!("transition"in k||g+"Transition"in k);m=!!("animation"in k||g+"Animation"in
k);!d||l&&m||(l=G(f.body.style.webkitTransition),m=G(f.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hasEvent:function(a){if("input"==a&&9==Ia)return!1;if(w(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:Za(),vendorPrefix:g,transitions:l,animations:m,android:d}}]}function Te(){this.$get=["$templateCache","$http","$q",function(b,a,c){function d(e,f){d.totalPendingRequests++;var g=a.defaults&&a.defaults.transformResponse;if(H(g))for(var h=
g,g=[],k=0;k<h.length;++k){var l=h[k];l!==Xb&&g.push(l)}else g===Xb&&(g=null);return a.get(e,{cache:b,transformResponse:g}).then(function(a){a=a.data;d.totalPendingRequests--;b.put(e,a);return a},function(){d.totalPendingRequests--;if(!f)throw ia("tpload",e);return c.reject()})}d.totalPendingRequests=0;return d}]}function Ue(){this.$get=["$rootScope","$browser","$location",function(b,a,c){return{findBindings:function(a,b,c){a=a.getElementsByClassName("ng-binding");var g=[];r(a,function(a){var d=wa.element(a).data("$binding");
d&&r(d,function(d){c?(new RegExp("(^|\\s)"+dd(b)+"(\\s|\\||$)")).test(d)&&g.push(a):-1!=d.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,c){for(var g=["ng-","data-ng-","ng\\:"],h=0;h<g.length;++h){var k=a.querySelectorAll("["+g[h]+"model"+(c?"=":"*=")+'"'+b+'"]');if(k.length)return k}},getLocation:function(){return c.url()},setLocation:function(a){a!==c.url()&&(c.url(a),b.$digest())},whenStable:function(b){a.notifyWhenNoOutstandingRequests(b)}}}]}function Ve(){this.$get=["$rootScope",
"$browser","$q","$$q","$exceptionHandler",function(b,a,c,d,e){function f(f,k,l){var m=y(l)&&!l,p=(m?d:c).defer(),q=p.promise;k=a.defer(function(){try{p.resolve(f())}catch(a){p.reject(a),e(a)}finally{delete g[q.$$timeoutId]}m||b.$apply()},k);q.$$timeoutId=k;g[k]=p;return q}var g={};f.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return f}]}function Ba(b,a){var c=b;Ia&&(Z.setAttribute("href",c),c=Z.href);
Z.setAttribute("href",c);return{href:Z.href,protocol:Z.protocol?Z.protocol.replace(/:$/,""):"",host:Z.host,search:Z.search?Z.search.replace(/^\?/,""):"",hash:Z.hash?Z.hash.replace(/^#/,""):"",hostname:Z.hostname,port:Z.port,pathname:"/"===Z.pathname.charAt(0)?Z.pathname:"/"+Z.pathname}}function Wc(b){b=G(b)?Ba(b):b;return b.protocol===fd.protocol&&b.host===fd.host}function We(){this.$get=da(T)}function Cc(b){function a(c,d){if(M(c)){var e={};r(c,function(b,c){e[c]=a(c,b)});return e}return b.factory(c+
"Filter",d)}this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];a("currency",gd);a("date",hd);a("filter",Bf);a("json",Cf);a("limitTo",Df);a("lowercase",Ef);a("number",id);a("orderBy",jd);a("uppercase",Ff)}function Bf(){return function(b,a,c){if(!H(b))return b;var d=typeof c,e=[];e.check=function(a,b){for(var c=0;c<e.length;c++)if(!e[c](a,b))return!1;return!0};"function"!==d&&(c="boolean"===d&&c?function(a,b){return wa.equals(a,b)}:function(a,b){if(a&&
b&&"object"===typeof a&&"object"===typeof b){for(var d in a)if("$"!==d.charAt(0)&&Ib.call(a,d)&&c(a[d],b[d]))return!0;return!1}b=(""+b).toLowerCase();return-1<(""+a).toLowerCase().indexOf(b)});var f=function(a,b){if("string"===typeof b&&"!"===b.charAt(0))return!f(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return c(a,b);case "object":switch(typeof b){case "object":return c(a,b);default:for(var d in a)if("$"!==d.charAt(0)&&f(a[d],b))return!0}return!1;case "array":for(d=
0;d<a.length;d++)if(f(a[d],b))return!0;return!1;default:return!1}};switch(typeof a){case "boolean":case "number":case "string":a={$:a};case "object":for(var g in a)(function(b){"undefined"!==typeof a[b]&&e.push(function(c){return f("$"==b?c:c&&c[b],a[b])})})(g);break;case "function":e.push(a);break;default:return b}d=[];for(g=0;g<b.length;g++){var h=b[g];e.check(h,g)&&d.push(h)}return d}}function gd(b){var a=b.NUMBER_FORMATS;return function(b,d,e){w(d)&&(d=a.CURRENCY_SYM);w(e)&&(e=2);return null==
b?b:kd(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,e).replace(/\u00A4/g,d)}}function id(b){var a=b.NUMBER_FORMATS;return function(b,d){return null==b?b:kd(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function kd(b,a,c,d,e){if(!isFinite(b)||M(b))return"";var f=0>b;b=Math.abs(b);var g=b+"",h="",k=[],l=!1;if(-1!==g.indexOf("e")){var m=g.match(/([\d\.]+)e(-?)(\d+)/);m&&"-"==m[2]&&m[3]>e+1?(g="0",b=0):(h=g,l=!0)}if(l)0<e&&-1<b&&1>b&&(h=b.toFixed(e));else{g=(g.split(ld)[1]||"").length;w(e)&&(e=Math.min(Math.max(a.minFrac,
g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);0===b&&(f=!1);b=(""+b).split(ld);g=b[0];b=b[1]||"";var m=0,p=a.lgSize,q=a.gSize;if(g.length>=p+q)for(m=g.length-p,l=0;l<m;l++)0===(m-l)%q&&0!==l&&(h+=c),h+=g.charAt(l);for(l=m;l<g.length;l++)0===(g.length-l)%p&&0!==l&&(h+=c),h+=g.charAt(l);for(;b.length<e;)b+="0";e&&"0"!==e&&(h+=d+b.substr(0,e))}k.push(f?a.negPre:a.posPre);k.push(h);k.push(f?a.negSuf:a.posSuf);return k.join("")}function Bb(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=
""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function $(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Bb(e,a,d)}}function Cb(b,a){return function(c,d){var e=c["get"+b](),f=qb(a?"SHORT"+b:b);return d[f][e]}}function md(b){var a=(new Date(b,0,1)).getDay();return new Date(b,0,(4>=a?5:12)-a)}function nd(b){return function(a){var c=md(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+(4-a.getDay()))-+c;a=1+Math.round(a/
6048E5);return Bb(a,b)}}function hd(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,h=b[8]?a.setUTCFullYear:a.setFullYear,k=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=aa(b[9]+b[10]),g=aa(b[9]+b[11]));h.call(a,aa(b[1]),aa(b[2])-1,aa(b[3]));f=aa(b[4]||0)-f;g=aa(b[5]||0)-g;h=aa(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));k.call(a,f,g,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e,f){var g=
"",h=[],k,l;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;G(c)&&(c=Gf.test(c)?aa(c):a(c));V(c)&&(c=new Date(c));if(!ea(c))return c;for(;e;)(l=Hf.exec(e))?(h=kb(h,l,1),e=h.pop()):(h.push(e),e=null);f&&"UTC"===f&&(c=new Date(c.getTime()),c.setMinutes(c.getMinutes()+c.getTimezoneOffset()));r(h,function(a){k=If[a];g+=k?k(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Cf(){return function(b){return ua(b,!0)}}function Df(){return function(b,a){V(b)&&(b=b.toString());
if(!H(b)&&!G(b))return b;a=Infinity===Math.abs(Number(a))?Number(a):aa(a);if(G(b))return a?0<=a?b.slice(0,a):b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=b.length+a,e=b.length);for(;d<e;d++)c.push(b[d]);return c}}function jd(b){return function(a,c,d){function e(a,b){return b?function(b,c){return a(c,b)}:a}function f(a,b){var c=typeof a,d=typeof b;return c==d?(ea(a)&&ea(b)&&(a=a.valueOf(),b=b.valueOf()),"string"==c&&(a=a.toLowerCase(),b=b.toLowerCase()),
a===b?0:a<b?-1:1):c<d?-1:1}if(!Sa(a))return a;c=H(c)?c:[c];0===c.length&&(c=["+"]);c=c.map(function(a){var c=!1,d=a||la;if(G(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);if(""===a)return e(function(a,b){return f(a,b)},c);d=b(a);if(d.constant){var g=d();return e(function(a,b){return f(a[g],b[g])},c)}}return e(function(a,b){return f(d(a),d(b))},c)});for(var g=[],h=0;h<a.length;h++)g.push(a[h]);return g.sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);
if(0!==e)return e}return 0},d))}}function Ja(b){u(b)&&(b={link:b});b.restrict=b.restrict||"AC";return da(b)}function od(b,a,c,d,e){var f=this,g=[],h=f.$$parentForm=b.parent().controller("form")||Db;f.$error={};f.$$success={};f.$pending=t;f.$name=e(a.name||a.ngForm||"")(c);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;h.$addControl(f);f.$rollbackViewValue=function(){r(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){r(g,function(a){a.$commitViewValue()})};
f.$addControl=function(a){Ma(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a)};f.$$renameControl=function(a,b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];r(f.$pending,function(b,c){f.$setValidity(c,null,a)});r(f.$error,function(b,c){f.$setValidity(c,null,a)});Wa(g,a)};pd({ctrl:this,$element:b,set:function(a,b,c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(Wa(d,c),0===d.length&&
delete a[b])},parentForm:h,$animate:d});f.$setDirty=function(){d.removeClass(b,Ra);d.addClass(b,Eb);f.$dirty=!0;f.$pristine=!1;h.$setDirty()};f.$setPristine=function(){d.setClass(b,Ra,Eb+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;r(g,function(a){a.$setPristine()})};f.$setUntouched=function(){r(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){d.addClass(b,"ng-submitted");f.$submitted=!0;h.$setSubmitted()}}function gc(b){b.$formatters.push(function(a){return b.$isEmpty(a)?
a:a.toString()})}function fb(b,a,c,d,e,f){var g=a[0].placeholder,h={},k=R(a[0].type);if(!e.android){var l=!1;a.on("compositionstart",function(a){l=!0});a.on("compositionend",function(){l=!1;m()})}var m=function(b){if(!l){var e=a.val(),f=b&&b.type;Ia&&"input"===(b||h).type&&a[0].placeholder!==g?g=a[0].placeholder:("password"===k||c.ngTrim&&"false"===c.ngTrim||(e=P(e)),(d.$viewValue!==e||""===e&&d.$$hasNativeValidators)&&d.$setViewValue(e,f))}};if(e.hasEvent("input"))a.on("input",m);else{var p,q=function(a){p||
(p=f.defer(function(){m(a);p=null}))};a.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||q(a)});if(e.hasEvent("paste"))a.on("paste cut",q)}a.on("change",m);d.$render=function(){a.val(d.$isEmpty(d.$modelValue)?"":d.$viewValue)}}function Fb(b,a){return function(c,d){var e,f;if(ea(c))return c;if(G(c)){'"'==c.charAt(0)&&'"'==c.charAt(c.length-1)&&(c=c.substring(1,c.length-1));if(Jf.test(c))return new Date(c);b.lastIndex=0;if(e=b.exec(c))return e.shift(),f=d?{yyyy:d.getFullYear(),
MM:d.getMonth()+1,dd:d.getDate(),HH:d.getHours(),mm:d.getMinutes(),ss:d.getSeconds(),sss:d.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},r(e,function(b,c){c<a.length&&(f[a[c]]=+b)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function gb(b,a,c,d){return function(e,f,g,h,k,l,m){function p(a){return y(a)?ea(a)?a:c(a):t}qd(e,f,g,h);fb(e,f,g,h,k,l);var q=h&&h.$options&&h.$options.timezone,n;h.$$parserName=b;h.$parsers.push(function(b){return h.$isEmpty(b)?
null:a.test(b)?(b=c(b,n),"UTC"===q&&b.setMinutes(b.getMinutes()-b.getTimezoneOffset()),b):t});h.$formatters.push(function(a){if(h.$isEmpty(a))n=null;else{if(!ea(a))throw Gb("datefmt",a);if((n=a)&&"UTC"===q){var b=6E4*n.getTimezoneOffset();n=new Date(n.getTime()+b)}return m("date")(a,d,q)}return""});if(y(g.min)||g.ngMin){var s;h.$validators.min=function(a){return h.$isEmpty(a)||w(s)||c(a)>=s};g.$observe("min",function(a){s=p(a);h.$validate()})}if(y(g.max)||g.ngMax){var r;h.$validators.max=function(a){return h.$isEmpty(a)||
w(r)||c(a)<=r};g.$observe("max",function(a){r=p(a);h.$validate()})}h.$isEmpty=function(a){return!a||a.getTime&&a.getTime()!==a.getTime()}}}function qd(b,a,c,d){(d.$$hasNativeValidators=M(a[0].validity))&&d.$parsers.push(function(b){var c=a.prop("validity")||{};return c.badInput&&!c.typeMismatch?t:b})}function rd(b,a,c,d,e){if(y(d)){b=b(d);if(!b.constant)throw v("ngModel")("constexpr",c,d);return b(a)}return e}function pd(b){function a(a,b){b&&!f[a]?(l.addClass(e,a),f[a]=!0):!b&&f[a]&&(l.removeClass(e,
a),f[a]=!1)}function c(b,c){b=b?"-"+Lb(b,"-"):"";a(hb+b,!0===c);a(sd+b,!1===c)}var d=b.ctrl,e=b.$element,f={},g=b.set,h=b.unset,k=b.parentForm,l=b.$animate;f[sd]=!(f[hb]=e.hasClass(hb));d.$setValidity=function(b,e,f){e===t?(d.$pending||(d.$pending={}),g(d.$pending,b,f)):(d.$pending&&h(d.$pending,b,f),td(d.$pending)&&(d.$pending=t));Va(e)?e?(h(d.$error,b,f),g(d.$$success,b,f)):(g(d.$error,b,f),h(d.$$success,b,f)):(h(d.$error,b,f),h(d.$$success,b,f));d.$pending?(a(ud,!0),d.$valid=d.$invalid=t,c("",
null)):(a(ud,!1),d.$valid=td(d.$error),d.$invalid=!d.$valid,c("",d.$valid));e=d.$pending&&d.$pending[b]?t:d.$error[b]?!1:d.$$success[b]?!0:null;c(b,e);k.$setValidity(b,e,d)}}function td(b){if(b)for(var a in b)return!1;return!0}function hc(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){if(!H(a)){if(G(a))return a.split(" ");if(M(a)){var b=[];r(a,function(a,c){a&&
(b=b.concat(c.split(" ")))});return b}}return a}return{restrict:"AC",link:function(f,g,h){function k(a,b){var c=g.data("$classCounts")||{},d=[];r(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function l(b){if(!0===a||f.$index%2===a){var l=e(b||[]);if(!m){var n=k(l,1);h.$addClass(n)}else if(!ma(b,m)){var s=e(m),n=d(l,s),l=d(s,l),n=k(n,1),l=k(l,-1);n&&n.length&&c.addClass(g,n);l&&l.length&&c.removeClass(g,l)}}m=ta(b)}var m;f.$watch(h[b],
l,!0);h.$observe("class",function(a){l(f.$eval(h[b]))});"ngClass"!==b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var l=e(f.$eval(h[b]));g===a?(g=k(l,1),h.$addClass(g)):(g=k(l,-1),h.$removeClass(g))}})}}}]}var Kf=/^\/(.+)\/([a-z]*)$/,R=function(b){return G(b)?b.toLowerCase():b},Ib=Object.prototype.hasOwnProperty,qb=function(b){return G(b)?b.toUpperCase():b},Ia,z,na,Ya=[].slice,pf=[].splice,Lf=[].push,Ka=Object.prototype.toString,Xa=v("ng"),wa=T.angular||(T.angular={}),$a,ib=0;Ia=U.documentMode;
A.$inject=[];la.$inject=[];var H=Array.isArray,P=function(b){return G(b)?b.trim():b},dd=function(b){return b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},Za=function(){if(y(Za.isActive_))return Za.isActive_;var b=!(!U.querySelector("[ng-csp]")&&!U.querySelector("[data-ng-csp]"));if(!b)try{new Function("")}catch(a){b=!0}return Za.isActive_=b},nb=["ng-","data-ng-","ng:","x-ng-"],Jd=/[A-Z]/g,tc=!1,Mb,ka=1,lb=3,Nd={full:"1.3.2",major:1,minor:3,dot:2,codeName:"cardiovasculatory-magnification"};
S.expando="ng339";var vb=S.cache={},df=1;S._data=function(b){return this.cache[b[this.expando]]||{}};var Ze=/([\:\-\_]+(.))/g,$e=/^moz([A-Z])/,Mf={mouseleave:"mouseout",mouseenter:"mouseover"},Pb=v("jqLite"),cf=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Ob=/<|&#?\w+;/,af=/<([\w:]+)/,bf=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ha={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>",
"</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ha.optgroup=ha.option;ha.tbody=ha.tfoot=ha.colgroup=ha.caption=ha.thead;ha.th=ha.td;var La=S.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===U.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),S(T).on("load",a))},toString:function(){var b=[];r(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?z(this[b]):z(this[this.length+b])},length:0,
push:Lf,sort:[].sort,splice:[].splice},xb={};r("multiple selected checked disabled readOnly required open".split(" "),function(b){xb[R(b)]=b});var Lc={};r("input select option textarea button form details".split(" "),function(b){Lc[b]=!0});var Mc={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};r({data:Rb,removeData:tb},function(b,a){S[a]=b});r({data:Rb,inheritedData:wb,scope:function(b){return z.data(b,"$scope")||wb(b.parentNode||b,["$isolateScope","$scope"])},
isolateScope:function(b){return z.data(b,"$isolateScope")||z.data(b,"$isolateScopeNoTemplate")},controller:Hc,injector:function(b){return wb(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Sb,css:function(b,a,c){a=ab(a);if(y(c))b.style[a]=c;else return b.style[a]},attr:function(b,a,c){var d=R(a);if(xb[d])if(y(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||A).specified?d:t;else if(y(c))b.setAttribute(a,c);else if(b.getAttribute)return b=
b.getAttribute(a,2),null===b?t:b},prop:function(b,a,c){if(y(c))b[a]=c;else return b[a]},text:function(){function b(a,b){if(w(b)){var d=a.nodeType;return d===ka||d===lb?a.textContent:""}a.textContent=b}b.$dv="";return b}(),val:function(b,a){if(w(a)){if(b.multiple&&"select"===sa(b)){var c=[];r(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(w(a))return b.innerHTML;sb(b,!0);b.innerHTML=a},empty:Ic},function(b,a){S.prototype[a]=
function(a,d){var e,f,g=this.length;if(b!==Ic&&(2==b.length&&b!==Sb&&b!==Hc?a:d)===t){if(M(a)){for(e=0;e<g;e++)if(b===Rb)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;g=e===t?Math.min(g,1):g;for(f=0;f<g;f++){var h=b(this[f],a,d);e=e?e+h:h}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});r({removeData:tb,on:function a(c,d,e,f){if(y(f))throw Pb("onargs");if(Dc(c)){var g=ub(c,!0);f=g.events;var h=g.handle;h||(h=g.handle=gf(c,f));for(var g=0<=d.indexOf(" ")?d.split(" "):[d],
k=g.length;k--;){d=g[k];var l=f[d];l||(f[d]=[],"mouseenter"===d||"mouseleave"===d?a(c,Mf[d],function(a){var c=a.relatedTarget;c&&(c===this||this.contains(c))||h(a,d)}):"$destroy"!==d&&c.addEventListener(d,h,!1),l=f[d]);l.push(e)}}},off:Gc,one:function(a,c,d){a=z(a);a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;sb(a);r(new S(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];r(a.childNodes,
function(a){a.nodeType===ka&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){var d=a.nodeType;if(d===ka||11===d){c=new S(c);for(var d=0,e=c.length;d<e;d++)a.appendChild(c[d])}},prepend:function(a,c){if(a.nodeType===ka){var d=a.firstChild;r(new S(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=z(c).eq(0).clone()[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:Jc,detach:function(a){Jc(a,!0)},after:function(a,
c){var d=a,e=a.parentNode;c=new S(c);for(var f=0,g=c.length;f<g;f++){var h=c[f];e.insertBefore(h,d.nextSibling);d=h}},addClass:Ub,removeClass:Tb,toggleClass:function(a,c,d){c&&r(c.split(" "),function(c){var f=d;w(f)&&(f=!Sb(a,c));(f?Ub:Tb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Qb,triggerHandler:function(a,c,d){var e,f,g=c.type||c,h=
ub(a);if(h=(h=h&&h.events)&&h[g])e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:A,type:g,target:a},c.type&&(e=F(e,c)),c=ta(h),f=d?[e].concat(d):[e],r(c,function(c){e.isImmediatePropagationStopped()||c.apply(a,f)})}},function(a,c){S.prototype[c]=function(c,
e,f){for(var g,h=0,k=this.length;h<k;h++)w(g)?(g=a(this[h],c,e,f),y(g)&&(g=z(g))):Fc(g,a(this[h],c,e,f));return y(g)?g:this};S.prototype.bind=S.prototype.on;S.prototype.unbind=S.prototype.off});bb.prototype={put:function(a,c){this[Na(a,this.nextUid)]=c},get:function(a){return this[Na(a,this.nextUid)]},remove:function(a){var c=this[a=Na(a,this.nextUid)];delete this[a];return c}};var Oc=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,jf=/,/,kf=/^\s*(_?)(\S+?)\1\s*$/,Nc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Fa=v("$injector");
Kb.$$annotate=Vb;var Nf=v("$animate"),ze=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Nf("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null);return this.$$classNameFilter};this.$get=["$$q","$$asyncCallback","$rootScope",function(a,d,e){function f(d){var f,g=a.defer();g.promise.$$cancelFn=function(){f&&f()};
e.$$postDigest(function(){f=d(function(){g.resolve()})});return g.promise}function g(a,c){var d=[],e=[],f=oa();r((a.attr("class")||"").split(/\s+/),function(a){f[a]=!0});r(c,function(a,c){var g=f[c];!1===a&&g?e.push(c):!0!==a||g||d.push(c)});return 0<d.length+e.length&&[d.length?d:null,e.length?e:null]}function h(a,c,d){for(var e=0,f=c.length;e<f;++e)a[c[e]]=d}function k(){m||(m=a.defer(),d(function(){m.resolve();m=null}));return m.promise}function l(a,c){if(wa.isObject(c)){var d=F(c.from||{},c.to||
{});a.css(d)}}var m;return{animate:function(a,c,d){l(a,{from:c,to:d});return k()},enter:function(a,c,d,e){l(a,e);d?d.after(a):c.prepend(a);return k()},leave:function(a,c){a.remove();return k()},move:function(a,c,d,e){return this.enter(a,c,d,e)},addClass:function(a,c,d){return this.setClass(a,c,[],d)},$$addClassImmediately:function(a,c,d){a=z(a);c=G(c)?c:H(c)?c.join(" "):"";r(a,function(a){Ub(a,c)});l(a,d);return k()},removeClass:function(a,c,d){return this.setClass(a,[],c,d)},$$removeClassImmediately:function(a,
c,d){a=z(a);c=G(c)?c:H(c)?c.join(" "):"";r(a,function(a){Tb(a,c)});l(a,d);return k()},setClass:function(a,c,d,e){var k=this,l=!1;a=z(a);var m=a.data("$$animateClasses");m?e&&m.options&&(m.options=wa.extend(m.options||{},e)):(m={classes:{},options:e},l=!0);e=m.classes;c=H(c)?c:c.split(" ");d=H(d)?d:d.split(" ");h(e,c,!0);h(e,d,!1);l&&(m.promise=f(function(c){var d=a.data("$$animateClasses");a.removeData("$$animateClasses");if(d){var e=g(a,d.classes);e&&k.$$setClassImmediately(a,e[0],e[1],d.options)}c()}),
a.data("$$animateClasses",m));return m.promise},$$setClassImmediately:function(a,c,d,e){c&&this.$$addClassImmediately(a,c);d&&this.$$removeClassImmediately(a,d);l(a,e);return k()},enabled:A,cancel:A}}]}],ia=v("$compile");vc.$inject=["$provide","$$sanitizeUriProvider"];var of=/^((?:x|data)[\:\-_])/i,Sc="application/json",Yb={"Content-Type":Sc+";charset=utf-8"},rf=/^\s*(\[|\{[^\{])/,sf=/[\}\]]\s*$/,qf=/^\)\]\}',?\n/,Zb=v("$interpolate"),Of=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,vf={http:80,https:443,ftp:21},
db=v("$location"),Pf={$$html5:!1,$$replace:!1,absUrl:Ab("$$absUrl"),url:function(a){if(w(a))return this.$$url;a=Of.exec(a);a[1]&&this.path(decodeURIComponent(a[1]));(a[2]||a[1])&&this.search(a[3]||"");this.hash(a[5]||"");return this},protocol:Ab("$$protocol"),host:Ab("$$host"),port:Ab("$$port"),path:$c("$$path",function(a){a=null!==a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(G(a)||V(a))a=a.toString(),this.$$search=
rc(a);else if(M(a))a=Da(a,{}),r(a,function(c,e){null==c&&delete a[e]}),this.$$search=a;else throw db("isrcharg");break;default:w(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:$c("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};r([Zc,cc,bc],function(a){a.prototype=Object.create(Pf);a.prototype.state=function(c){if(!arguments.length)return this.$$state;if(a!==bc||!this.$$html5)throw db("nostate");this.$$state=
w(c)?null:c;return this}});var qa=v("$parse"),Qf=Function.prototype.call,Rf=Function.prototype.apply,Sf=Function.prototype.bind,Hb=oa();r({"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:function(){}},function(a,c){a.constant=a.literal=a.sharedGetter=!0;Hb[c]=a});Hb["this"]=function(a){return a};Hb["this"].sharedGetter=!0;var ic=F(oa(),{"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return y(d)?y(e)?d+e:d:y(e)?e:t},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);
return(y(d)?d:0)-(y(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,
d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"!":function(a,c,d){return!d(a,c)},"=":!0,"|":!0}),Tf={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},fc=function(a){this.options=a};fc.prototype={constructor:fc,lex:function(a){this.text=a;this.index=0;this.ch=t;for(this.tokens=[];this.index<this.text.length;)if(this.ch=this.text.charAt(this.index),this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&
this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent();else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch}),this.index++;else if(this.isWhitespace(this.ch))this.index++;else{a=this.ch+this.peek();var c=a+this.peek(2),d=ic[this.ch],e=ic[a],f=ic[c];f?(this.tokens.push({index:this.index,text:c,fn:f}),this.index+=3):e?(this.tokens.push({index:this.index,text:a,fn:e}),this.index+=2):d?(this.tokens.push({index:this.index,text:this.ch,fn:d}),
this.index+=1):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a){return-1!==a.indexOf(this.ch)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||
"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=y(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw qa("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=R(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&
this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}a*=1;this.tokens.push({index:c,text:a,constant:!0,fn:function(){return a}})},readIdent:function(){for(var a=this.text,c="",d=this.index,e,f,g,h;this.index<this.text.length;){h=this.text.charAt(this.index);if("."===h||this.isIdent(h)||this.isNumber(h))"."===h&&(e=this.index),c+=h;else break;this.index++}e&&"."===c[c.length-1]&&(this.index--,c=c.slice(0,-1),e=c.lastIndexOf("."),-1===e&&(e=t));if(e)for(f=
this.index;f<this.text.length;){h=this.text.charAt(f);if("("===h){g=c.substr(e-d+1);c=c.substr(0,e-d);this.index=f;break}if(this.isWhitespace(h))f++;else break}this.tokens.push({index:d,text:c,fn:Hb[c]||bd(c,this.options,a)});g&&(this.tokens.push({index:e,text:"."}),this.tokens.push({index:e+1,text:g}))},readString:function(a){var c=this.index;this.index++;for(var d="",e=a,f=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+1,
this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d+=Tf[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,string:d,constant:!0,fn:function(){return d}});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};var eb=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};eb.ZERO=F(function(){return 0},{sharedGetter:!0,constant:!0});eb.prototype=
{constructor:eb,parse:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);a.literal=!!a.literal;a.constant=!!a.constant;return a},primary:function(){var a;if(this.expect("("))a=this.filterChain(),this.consume(")");else if(this.expect("["))a=this.arrayDeclaration();else if(this.expect("{"))a=this.object();else{var c=this.expect();(a=c.fn)||this.throwError("not a primary expression",c);c.constant&&
(a.constant=!0,a.literal=!0)}for(var d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw qa("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw qa("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){if(0<this.tokens.length){var f=this.tokens[0],
g=f.text;if(g===a||g===c||g===d||g===e||!(a||c||d||e))return f}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},consume:function(a){this.expect(a)||this.throwError("is unexpected, expecting ["+a+"]",this.peek())},unaryFn:function(a,c){return F(function(d,e){return a(d,e,c)},{constant:c.constant,inputs:[c]})},binaryFn:function(a,c,d,e){return F(function(e,g){return c(e,g,a,d)},{constant:a.constant&&d.constant,inputs:!e&&[a,d]})},statements:function(){for(var a=
[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,f=0,g=a.length;f<g;f++)e=a[f](c,d);return e}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},filter:function(a){var c=this.expect(),d=this.$filter(c.text),e,f;if(this.peek(":"))for(e=[],f=[];this.expect(":");)e.push(this.expression());c=[a].concat(e||[]);return F(function(c,h){var k=a(c,h);if(f){f[0]=
k;for(k=e.length;k--;)f[k+1]=e[k](c,h);return d.apply(t,f)}return d(k)},{constant:!d.$stateful&&c.every(dc),inputs:!d.$stateful&&c})},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),F(function(d,f){return a.assign(d,c(d,f),f)},{inputs:[a,c]})):a},ternary:function(){var a=this.logicalOR(),c,d;if(d=
this.expect("?")){c=this.assignment();if(d=this.expect(":")){var e=this.assignment();return F(function(d,g){return a(d,g)?c(d,g):e(d,g)},{constant:a.constant&&c.constant&&e.constant})}this.throwError("expected :",d)}return a},logicalOR:function(){for(var a=this.logicalAND(),c;c=this.expect("||");)a=this.binaryFn(a,c.fn,this.logicalAND(),!0);return a},logicalAND:function(){var a=this.equality(),c;if(c=this.expect("&&"))a=this.binaryFn(a,c.fn,this.logicalAND(),!0);return a},equality:function(){var a=
this.relational(),c;if(c=this.expect("==","!=","===","!=="))a=this.binaryFn(a,c.fn,this.equality());return a},relational:function(){var a=this.additive(),c;if(c=this.expect("<",">","<=",">="))a=this.binaryFn(a,c.fn,this.relational());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.fn,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.fn,this.unary());return a},
unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(eb.ZERO,a.fn,this.unary()):(a=this.expect("!"))?this.unaryFn(a.fn,this.unary()):this.primary()},fieldAccess:function(a){var c=this.text,d=this.expect().text,e=bd(d,this.options,c);return F(function(c,d,h){return e(h||a(c,d))},{assign:function(e,g,h){(h=a(e,h))||a.assign(e,h={});return Pa(h,d,g,c)}})},objectIndex:function(a){var c=this.text,d=this.expression();this.consume("]");return F(function(e,f){var g=
a(e,f),h=d(e,f);pa(h,c);return g?ra(g[h],c):t},{assign:function(e,f,g){var h=pa(d(e,g),c);(g=ra(a(e,g),c))||a.assign(e,g={});return g[h]=f}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());while(this.expect(","))}this.consume(")");var e=this.text,f=d.length?[]:null;return function(g,h){var k=c?c(g,h):g,l=a(g,h,k)||A;if(f)for(var m=d.length;m--;)f[m]=ra(d[m](g,h),e);ra(k,e);if(l){if(l.constructor===l)throw qa("isecfn",e);if(l===Qf||l===Rf||l===Sf)throw qa("isecff",
e);}k=l.apply?l.apply(k,f):l(f[0],f[1],f[2],f[3],f[4]);return ra(k,e)}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;var c=this.expression();a.push(c)}while(this.expect(","))}this.consume("]");return F(function(c,e){for(var f=[],g=0,h=a.length;g<h;g++)f.push(a[g](c,e));return f},{literal:!0,constant:a.every(dc),inputs:a})},object:function(){var a=[],c=[];if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.expect();a.push(d.string||
d.text);this.consume(":");d=this.expression();c.push(d)}while(this.expect(","))}this.consume("}");return F(function(d,f){for(var g={},h=0,k=c.length;h<k;h++)g[a[h]]=c[h](d,f);return g},{literal:!0,constant:c.every(dc),inputs:c})}};var yf=oa(),xf=oa(),zf=Object.prototype.valueOf,Ca=v("$sce"),ja={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},ia=v("$compile"),Z=U.createElement("a"),fd=Ba(T.location.href,!0);Cc.$inject=["$provide"];gd.$inject=["$locale"];id.$inject=["$locale"];var ld=
".",If={yyyy:$("FullYear",4),yy:$("FullYear",2,0,!0),y:$("FullYear",1),MMMM:Cb("Month"),MMM:Cb("Month",!0),MM:$("Month",2,1),M:$("Month",1,1),dd:$("Date",2),d:$("Date",1),HH:$("Hours",2),H:$("Hours",1),hh:$("Hours",2,-12),h:$("Hours",1,-12),mm:$("Minutes",2),m:$("Minutes",1),ss:$("Seconds",2),s:$("Seconds",1),sss:$("Milliseconds",3),EEEE:Cb("Day"),EEE:Cb("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Bb(Math[0<
a?"floor":"ceil"](a/60),2)+Bb(Math.abs(a%60),2))},ww:nd(2),w:nd(1)},Hf=/((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,Gf=/^\-?\d+$/;hd.$inject=["$locale"];var Ef=da(R),Ff=da(qb);jd.$inject=["$parse"];var Qd=da({restrict:"E",compile:function(a,c){if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){var f="[object SVGAnimatedString]"===Ka.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||a.preventDefault()})}}}),rb={};r(xb,function(a,
c){if("multiple"!=a){var d=xa("ng-"+c);rb[d]=function(){return{restrict:"A",priority:100,link:function(a,f,g){a.$watch(g[d],function(a){g.$set(c,!!a)})}}}}});r(Mc,function(a,c){rb[c]=function(){return{priority:100,link:function(a,e,f){if("ngPattern"===c&&"/"==f.ngPattern.charAt(0)&&(e=f.ngPattern.match(Kf))){f.$set("ngPattern",new RegExp(e[1],e[2]));return}a.$watch(f[c],function(a){f.$set(c,a)})}}}});r(["src","srcset","href"],function(a){var c=xa("ng-"+a);rb[c]=function(){return{priority:99,link:function(d,
e,f){var g=a,h=a;"href"===a&&"[object SVGAnimatedString]"===Ka.call(e.prop("href"))&&(h="xlinkHref",f.$attr[h]="xlink:href",g=null);f.$observe(c,function(c){c?(f.$set(h,c),Ia&&g&&e.prop(g,f[h])):"href"===a&&f.$set(h,null)})}}}});var Db={$addControl:A,$$renameControl:function(a,c){a.$name=c},$removeControl:A,$setValidity:A,$setDirty:A,$setPristine:A,$setSubmitted:A};od.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var vd=function(a){return["$timeout",function(c){return{name:"form",
restrict:a?"EAC":"E",controller:od,compile:function(a){a.addClass(Ra).addClass(hb);return{pre:function(a,d,g,h){if(!("action"in g)){var k=function(c){a.$apply(function(){h.$commitViewValue();h.$setSubmitted()});c.preventDefault?c.preventDefault():c.returnValue=!1};d[0].addEventListener("submit",k,!1);d.on("$destroy",function(){c(function(){d[0].removeEventListener("submit",k,!1)},0,!1)})}var l=h.$$parentForm,m=h.$name;m&&(Pa(a,m,h,m),g.$observe(g.name?"name":"ngForm",function(c){m!==c&&(Pa(a,m,t,
m),m=c,Pa(a,m,h,m),l.$$renameControl(h,m))}));d.on("$destroy",function(){l.$removeControl(h);m&&Pa(a,m,t,m);F(h,Db)})}}}}}]},Rd=vd(),de=vd(!0),Jf=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,Uf=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,Vf=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,Wf=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,wd=/^(\d{4})-(\d{2})-(\d{2})$/,xd=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
jc=/^(\d{4})-W(\d\d)$/,yd=/^(\d{4})-(\d\d)$/,zd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Xf=/(\s+|^)default(\s+|$)/,Gb=new v("ngModel"),Ad={text:function(a,c,d,e,f,g){fb(a,c,d,e,f,g);gc(e)},date:gb("date",wd,Fb(wd,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":gb("datetimelocal",xd,Fb(xd,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:gb("time",zd,Fb(zd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:gb("week",jc,function(a,c){if(ea(a))return a;if(G(a)){jc.lastIndex=0;var d=
jc.exec(a);if(d){var e=+d[1],f=+d[2],g=d=0,h=0,k=0,l=md(e),f=7*(f-1);c&&(d=c.getHours(),g=c.getMinutes(),h=c.getSeconds(),k=c.getMilliseconds());return new Date(e,0,l.getDate()+f,d,g,h,k)}}return NaN},"yyyy-Www"),month:gb("month",yd,Fb(yd,["yyyy","MM"]),"yyyy-MM"),number:function(a,c,d,e,f,g){qd(a,c,d,e);fb(a,c,d,e,f,g);e.$$parserName="number";e.$parsers.push(function(a){return e.$isEmpty(a)?null:Wf.test(a)?parseFloat(a):t});e.$formatters.push(function(a){if(!e.$isEmpty(a)){if(!V(a))throw Gb("numfmt",
a);a=a.toString()}return a});if(d.min||d.ngMin){var h;e.$validators.min=function(a){return e.$isEmpty(a)||w(h)||a>=h};d.$observe("min",function(a){y(a)&&!V(a)&&(a=parseFloat(a,10));h=V(a)&&!isNaN(a)?a:t;e.$validate()})}if(d.max||d.ngMax){var k;e.$validators.max=function(a){return e.$isEmpty(a)||w(k)||a<=k};d.$observe("max",function(a){y(a)&&!V(a)&&(a=parseFloat(a,10));k=V(a)&&!isNaN(a)?a:t;e.$validate()})}},url:function(a,c,d,e,f,g){fb(a,c,d,e,f,g);gc(e);e.$$parserName="url";e.$validators.url=function(a){return e.$isEmpty(a)||
Uf.test(a)}},email:function(a,c,d,e,f,g){fb(a,c,d,e,f,g);gc(e);e.$$parserName="email";e.$validators.email=function(a){return e.$isEmpty(a)||Vf.test(a)}},radio:function(a,c,d,e){w(d.name)&&c.attr("name",++ib);c.on("click",function(a){c[0].checked&&e.$setViewValue(d.value,a&&a.type)});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e,f,g,h,k){var l=rd(k,a,"ngTrueValue",d.ngTrueValue,!0),m=rd(k,a,"ngFalseValue",d.ngFalseValue,!1);c.on("click",
function(a){e.$setViewValue(c[0].checked,a&&a.type)});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return a!==l};e.$formatters.push(function(a){return ma(a,l)});e.$parsers.push(function(a){return a?l:m})},hidden:A,button:A,submit:A,reset:A,file:A},wc=["$browser","$sniffer","$filter","$parse",function(a,c,d,e){return{restrict:"E",require:["?ngModel"],link:{pre:function(f,g,h,k){k[0]&&(Ad[R(h.type)]||Ad.text)(f,g,h,k[0],c,a,d,e)}}}}],hb="ng-valid",sd="ng-invalid",Ra="ng-pristine",
Eb="ng-dirty",ud="ng-pending",Yf=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,c,d,e,f,g,h,k,l,m){this.$modelValue=this.$viewValue=Number.NaN;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=t;this.$name=m(d.name||
"",!1)(a);var p=f(d.ngModel),q=null,n=this,s=function(){var c=p(a);n.$options&&n.$options.getterSetter&&u(c)&&(c=c());return c},O=function(c){var d;n.$options&&n.$options.getterSetter&&u(d=p(a))?d(n.$modelValue):p.assign(a,n.$modelValue)};this.$$setOptions=function(a){n.$options=a;if(!(p.assign||a&&a.getterSetter))throw Gb("nonassign",d.ngModel,va(e));};this.$render=A;this.$isEmpty=function(a){return w(a)||""===a||null===a||a!==a};var D=e.inheritedData("$formController")||Db,x=0;pd({ctrl:this,$element:e,
set:function(a,c){a[c]=!0},unset:function(a,c){delete a[c]},parentForm:D,$animate:g});this.$setPristine=function(){n.$dirty=!1;n.$pristine=!0;g.removeClass(e,Eb);g.addClass(e,Ra)};this.$setUntouched=function(){n.$touched=!1;n.$untouched=!0;g.setClass(e,"ng-untouched","ng-touched")};this.$setTouched=function(){n.$touched=!0;n.$untouched=!1;g.setClass(e,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){h.cancel(q);n.$viewValue=n.$$lastCommittedViewValue;n.$render()};this.$validate=function(){V(n.$modelValue)&&
isNaN(n.$modelValue)||this.$$parseAndValidate()};this.$$runValidators=function(a,c,d,e){function f(){var a=!0;r(n.$validators,function(e,f){var g=e(c,d);a=a&&g;h(f,g)});return a?!0:(r(n.$asyncValidators,function(a,c){h(c,null)}),!1)}function g(){var a=[],e=!0;r(n.$asyncValidators,function(f,g){var k=f(c,d);if(!k||!u(k.then))throw Gb("$asyncValidators",k);h(g,t);a.push(k.then(function(){h(g,!0)},function(a){e=!1;h(g,!1)}))});a.length?l.all(a).then(function(){k(e)},A):k(!0)}function h(a,c){m===x&&n.$setValidity(a,
c)}function k(a){m===x&&e(a)}x++;var m=x;(function(a){var c=n.$$parserName||"parse";if(a===t)h(c,null);else if(h(c,a),!a)return r(n.$validators,function(a,c){h(c,null)}),r(n.$asyncValidators,function(a,c){h(c,null)}),!1;return!0})(a)?f()?g():k(!1):k(!1)};this.$commitViewValue=function(){var a=n.$viewValue;h.cancel(q);if(n.$$lastCommittedViewValue!==a||""===a&&n.$$hasNativeValidators)n.$$lastCommittedViewValue=a,n.$pristine&&(n.$dirty=!0,n.$pristine=!1,g.removeClass(e,Ra),g.addClass(e,Eb),D.$setDirty()),
this.$$parseAndValidate()};this.$$parseAndValidate=function(){var a=n.$$lastCommittedViewValue,c=a,d=w(c)?t:!0;if(d)for(var e=0;e<n.$parsers.length;e++)if(c=n.$parsers[e](c),w(c)){d=!1;break}V(n.$modelValue)&&isNaN(n.$modelValue)&&(n.$modelValue=s());var f=n.$modelValue,g=n.$options&&n.$options.allowInvalid;g&&(n.$modelValue=c,n.$modelValue!==f&&n.$$writeModelToScope());n.$$runValidators(d,c,a,function(a){g||(n.$modelValue=a?c:t,n.$modelValue!==f&&n.$$writeModelToScope())})};this.$$writeModelToScope=
function(){O(n.$modelValue);r(n.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}})};this.$setViewValue=function(a,c){n.$viewValue=a;n.$options&&!n.$options.updateOnDefault||n.$$debounceViewValueCommit(c)};this.$$debounceViewValueCommit=function(c){var d=0,e=n.$options;e&&y(e.debounce)&&(e=e.debounce,V(e)?d=e:V(e[c])?d=e[c]:V(e["default"])&&(d=e["default"]));h.cancel(q);d?q=h(function(){n.$commitViewValue()},d):k.$$phase?n.$commitViewValue():a.$apply(function(){n.$commitViewValue()})};a.$watch(function(){var a=
s();if(a!==n.$modelValue){n.$modelValue=a;for(var c=n.$formatters,d=c.length,e=a;d--;)e=c[d](e);n.$viewValue!==e&&(n.$viewValue=n.$$lastCommittedViewValue=e,n.$render(),n.$$runValidators(t,a,e,A))}return a})}],se=function(){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:Yf,priority:1,compile:function(a){a.addClass(Ra).addClass("ng-untouched").addClass(hb);return{pre:function(a,d,e,f){var g=f[0],h=f[1]||Db;g.$$setOptions(f[2]&&f[2].$options);h.$addControl(g);e.$observe("name",
function(a){g.$name!==a&&h.$$renameControl(g,a)});a.$on("$destroy",function(){h.$removeControl(g)})},post:function(a,d,e,f){var g=f[0];if(g.$options&&g.$options.updateOn)d.on(g.$options.updateOn,function(a){g.$$debounceViewValueCommit(a&&a.type)});d.on("blur",function(d){g.$touched||a.$apply(function(){g.$setTouched()})})}}}}},ue=da({restrict:"A",require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),yc=function(){return{restrict:"A",require:"?ngModel",
link:function(a,c,d,e){e&&(d.required=!0,e.$validators.required=function(a){return!d.required||!e.$isEmpty(a)},d.$observe("required",function(){e.$validate()}))}}},xc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f,g=d.ngPattern||d.pattern;d.$observe("pattern",function(a){G(a)&&0<a.length&&(a=new RegExp(a));if(a&&!a.test)throw v("ngPattern")("noregexp",g,a,va(c));f=a||t;e.$validate()});e.$validators.pattern=function(a){return e.$isEmpty(a)||w(f)||f.test(a)}}}}},
Ac=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("maxlength",function(a){f=aa(a)||0;e.$validate()});e.$validators.maxlength=function(a,c){return e.$isEmpty(a)||c.length<=f}}}}},zc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("minlength",function(a){f=aa(a)||0;e.$validate()});e.$validators.minlength=function(a,c){return e.$isEmpty(a)||c.length>=f}}}}},te=function(){return{restrict:"A",priority:100,
require:"ngModel",link:function(a,c,d,e){var f=c.attr(d.$attr.ngList)||", ",g="false"!==d.ngTrim,h=g?P(f):f;e.$parsers.push(function(a){if(!w(a)){var c=[];a&&r(a.split(h),function(a){a&&c.push(g?P(a):a)});return c}});e.$formatters.push(function(a){return H(a)?a.join(f):t});e.$isEmpty=function(a){return!a||!a.length}}}},Zf=/^(true|false|\d+)$/,ve=function(){return{restrict:"A",priority:100,compile:function(a,c){return Zf.test(c.ngValue)?function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,
c,f){a.$watch(f.ngValue,function(a){f.$set("value",a)})}}}},we=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,c){var d=this;this.$options=a.$eval(c.ngModelOptions);this.$options.updateOn!==t?(this.$options.updateOnDefault=!1,this.$options.updateOn=P(this.$options.updateOn.replace(Xf,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},Wd=["$compile",function(a){return{restrict:"AC",compile:function(c){a.$$addBindingClass(c);return function(c,
e,f){a.$$addBindingInfo(e,f.ngBind);e=e[0];c.$watch(f.ngBind,function(a){e.textContent=a===t?"":a})}}}}],Yd=["$interpolate","$compile",function(a,c){return{compile:function(d){c.$$addBindingClass(d);return function(d,f,g){d=a(f.attr(g.$attr.ngBindTemplate));c.$$addBindingInfo(f,d.expressions);f=f[0];g.$observe("ngBindTemplate",function(a){f.textContent=a===t?"":a})}}}}],Xd=["$sce","$parse","$compile",function(a,c,d){return{restrict:"A",compile:function(e,f){var g=c(f.ngBindHtml),h=c(f.ngBindHtml,
function(a){return(a||"").toString()});d.$$addBindingClass(e);return function(c,e,f){d.$$addBindingInfo(e,f.ngBindHtml);c.$watch(h,function(){e.html(a.getTrustedHtml(g(c))||"")})}}}}],Zd=hc("",!0),ae=hc("Odd",0),$d=hc("Even",1),be=Ja({compile:function(a,c){c.$set("ngCloak",t);a.removeClass("ng-cloak")}}),ce=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Bc={},$f={blur:!0,focus:!0};r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),
function(a){var c=xa("ng-"+a);Bc[c]=["$parse","$rootScope",function(d,e){return{restrict:"A",compile:function(f,g){var h=d(g[c],null,!0);return function(c,d){d.on(a,function(d){var f=function(){h(c,{$event:d})};$f[a]&&e.$$phase?c.$evalAsync(f):c.$apply(f)})}}}}]});var fe=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var h,k,l;c.$watch(e.ngIf,function(c){c?k||g(function(c,f){k=f;c[c.length++]=U.createComment(" end ngIf: "+
e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)}):(l&&(l.remove(),l=null),k&&(k.$destroy(),k=null),h&&(l=pb(h.clone),a.leave(l).then(function(){l=null}),h=null))})}}}],ge=["$templateRequest","$anchorScroll","$animate","$sce",function(a,c,d,e){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:wa.noop,compile:function(f,g){var h=g.ngInclude||g.src,k=g.onload||"",l=g.autoscroll;return function(f,g,q,n,r){var t=0,D,x,B,v=function(){x&&(x.remove(),x=null);D&&(D.$destroy(),
D=null);B&&(d.leave(B).then(function(){x=null}),x=B,B=null)};f.$watch(e.parseAsResourceUrl(h),function(e){var h=function(){!y(l)||l&&!f.$eval(l)||c()},q=++t;e?(a(e,!0).then(function(a){if(q===t){var c=f.$new();n.template=a;a=r(c,function(a){v();d.enter(a,null,g).then(h)});D=c;B=a;D.$emit("$includeContentLoaded",e);f.$eval(k)}},function(){q===t&&(v(),f.$emit("$includeContentError",e))}),f.$emit("$includeContentRequested",e)):(v(),n.template=null)})}}}}],xe=["$compile",function(a){return{restrict:"ECA",
priority:-400,require:"ngInclude",link:function(c,d,e,f){/SVG/.test(d[0].toString())?(d.empty(),a(Ec(f.template,U).childNodes)(c,function(a){d.append(a)},{futureParentElement:d})):(d.html(f.template),a(d.contents())(c))}}}],he=Ja({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),ie=Ja({terminal:!0,priority:1E3}),je=["$locale","$interpolate",function(a,c){var d=/{}/g;return{restrict:"EA",link:function(e,f,g){var h=g.count,k=g.$attr.when&&f.attr(g.$attr.when),l=g.offset||
0,m=e.$eval(k)||{},p={},q=c.startSymbol(),n=c.endSymbol(),s=/^when(Minus)?(.+)$/;r(g,function(a,c){s.test(c)&&(m[R(c.replace("when","").replace("Minus","-"))]=f.attr(g.$attr[c]))});r(m,function(a,e){p[e]=c(a.replace(d,q+h+"-"+l+n))});e.$watch(function(){var c=parseFloat(e.$eval(h));if(isNaN(c))return"";c in m||(c=a.pluralCat(c-l));return p[c](e)},function(a){f.text(a)})}}}],ke=["$parse","$animate",function(a,c){var d=v("ngRepeat"),e=function(a,c,d,e,l,m,p){a[d]=e;l&&(a[l]=m);a.$index=c;a.$first=0===
c;a.$last=c===p-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(c&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var h=g.ngRepeat,k=U.createComment(" end ngRepeat: "+h+" "),l=h.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!l)throw d("iexp",h);var m=l[1],p=l[2],q=l[3],n=l[4],l=m.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!l)throw d("iidexp",m);var s=
l[3]||l[1],y=l[2];if(q&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(q)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent)$/.test(q)))throw d("badident",q);var v,x,B,K,E={$id:Na};n?v=a(n):(B=function(a,c){return Na(c)},K=function(a){return a});return function(a,f,g,l,n){v&&(x=function(c,d,e){y&&(E[y]=c);E[s]=d;E.$index=e;return v(a,E)});var m=oa();a.$watchCollection(p,function(g){var l,p,C=f[0],v,E=oa(),A,D,w,F,H,u,G;q&&(a[q]=g);if(Sa(g))H=g,p=x||B;else{p=x||K;H=[];for(G in g)g.hasOwnProperty(G)&&
"$"!=G.charAt(0)&&H.push(G);H.sort()}A=H.length;G=Array(A);for(l=0;l<A;l++)if(D=g===H?l:H[l],w=g[D],F=p(D,w,l),m[F])u=m[F],delete m[F],E[F]=u,G[l]=u;else{if(E[F])throw r(G,function(a){a&&a.scope&&(m[a.id]=a)}),d("dupes",h,F,ua(w));G[l]={id:F,scope:t,clone:t};E[F]=!0}for(v in m){u=m[v];F=pb(u.clone);c.leave(F);if(F[0].parentNode)for(l=0,p=F.length;l<p;l++)F[l].$$NG_REMOVED=!0;u.scope.$destroy()}for(l=0;l<A;l++)if(D=g===H?l:H[l],w=g[D],u=G[l],u.scope){v=C;do v=v.nextSibling;while(v&&v.$$NG_REMOVED);
u.clone[0]!=v&&c.move(pb(u.clone),null,z(C));C=u.clone[u.clone.length-1];e(u.scope,l,s,w,y,D,A)}else n(function(a,d){u.scope=d;var f=k.cloneNode(!1);a[a.length++]=f;c.enter(a,null,z(C));C=f;u.clone=a;E[u.id]=u;e(u.scope,l,s,w,y,D,A)});m=E})}}}}],le=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngShow,function(c){a[c?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],ee=["$animate",function(a){return{restrict:"A",multiElement:!0,
link:function(c,d,e){c.$watch(e.ngHide,function(c){a[c?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],me=Ja(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&r(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),ne=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],h=[],k=[],l=[],m=function(a,c){return function(){a.splice(c,1)}};c.$watch(e.ngSwitch||e.on,function(c){var d,
e;d=0;for(e=k.length;d<e;++d)a.cancel(k[d]);d=k.length=0;for(e=l.length;d<e;++d){var s=pb(h[d].clone);l[d].$destroy();(k[d]=a.leave(s)).then(m(k,d))}h.length=0;l.length=0;(g=f.cases["!"+c]||f.cases["?"])&&r(g,function(c){c.transclude(function(d,e){l.push(e);var f=c.element;d[d.length++]=U.createComment(" end ngSwitchWhen: ");h.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],oe=Ja({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["!"+d.ngSwitchWhen]=
e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),pe=Ja({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:f,element:c})}}),re=Ja({restrict:"EAC",link:function(a,c,d,e,f){if(!f)throw v("ngTransclude")("orphan",va(c));f(function(a){c.empty();c.append(a)})}}),Sd=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==
d.type&&a.put(d.id,c[0].text)}}}],ag=v("ngOptions"),qe=da({restrict:"A",terminal:!0}),Td=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,e={$setViewValue:A};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var k=this,l={},m=e,p;k.databound=d.ngModel;
k.init=function(a,c,d){m=a;p=d};k.addOption=function(c,d){Ma(c,'"option value"');l[c]=!0;m.$viewValue==c&&(a.val(c),p.parent()&&p.remove());d&&d[0].hasAttribute("selected")&&(d[0].selected=!0)};k.removeOption=function(a){this.hasOption(a)&&(delete l[a],m.$viewValue==a&&this.renderUnknownOption(a))};k.renderUnknownOption=function(c){c="? "+Na(c)+" ?";p.val(c);a.prepend(p);a.val(c);p.prop("selected",!0)};k.hasOption=function(a){return l.hasOwnProperty(a)};c.$on("$destroy",function(){k.renderUnknownOption=
A})}],link:function(e,g,h,k){function l(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(E.parent()&&E.remove(),c.val(a),""===a&&u.prop("selected",!0)):w(a)&&u?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){E.parent()&&E.remove();d.$setViewValue(c.val())})})}function m(a,c,d){var e;d.$render=function(){var a=new bb(d.$viewValue);r(c.find("option"),function(c){c.selected=y(a.get(c.value))})};a.$watch(function(){ma(e,d.$viewValue)||(e=ta(d.$viewValue),
d.$render())});c.on("change",function(){a.$apply(function(){var a=[];r(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function p(e,f,g){function h(a,c,d){T[A]=d;G&&(T[G]=c);return a(e,T)}function k(a){var c;if(n)if(M&&H(a)){c=new bb([]);for(var d=0;d<a.length;d++)c.put(h(M,null,a[d]),!0)}else c=new bb(a);else M&&(a=h(M,null,a));return function(d,e){var f;f=M?M:w?w:D;return n?y(c.remove(h(f,d,e))):a===h(f,d,e)}}function l(){x||(e.$$postDigest(p),x=!0)}function m(a,
c,d){a[c]=a[c]||0;a[c]+=d?1:-1}function p(){x=!1;var a={"":[]},c=[""],d,l,s,t,u;s=g.$viewValue;t=J(e)||[];var A=G?Object.keys(t).sort():t,w,z,H,D,Q={};u=k(s);var P=!1,U,V;S={};for(D=0;H=A.length,D<H;D++){w=D;if(G&&(w=A[D],"$"===w.charAt(0)))continue;z=t[w];d=h(I,w,z)||"";(l=a[d])||(l=a[d]=[],c.push(d));d=u(w,z);P=P||d;z=h(E,w,z);z=y(z)?z:"";V=M?M(e,T):G?A[D]:D;M&&(S[V]=w);l.push({id:V,label:z,selected:d})}n||(v||null===s?a[""].unshift({id:"",label:"",selected:!P}):P||a[""].unshift({id:"?",label:"",
selected:!0}));w=0;for(A=c.length;w<A;w++){d=c[w];l=a[d];R.length<=w?(s={element:F.clone().attr("label",d),label:l.label},t=[s],R.push(t),f.append(s.element)):(t=R[w],s=t[0],s.label!=d&&s.element.attr("label",s.label=d));P=null;D=0;for(H=l.length;D<H;D++)d=l[D],(u=t[D+1])?(P=u.element,u.label!==d.label&&(m(Q,u.label,!1),m(Q,d.label,!0),P.text(u.label=d.label)),u.id!==d.id&&P.val(u.id=d.id),P[0].selected!==d.selected&&(P.prop("selected",u.selected=d.selected),Ia&&P.prop("selected",u.selected))):(""===
d.id&&v?U=v:(U=B.clone()).val(d.id).prop("selected",d.selected).attr("selected",d.selected).text(d.label),t.push(u={element:U,label:d.label,id:d.id,selected:d.selected}),m(Q,d.label,!0),P?P.after(U):s.element.append(U),P=U);for(D++;t.length>D;)d=t.pop(),m(Q,d.label,!1),d.element.remove();r(Q,function(a,c){0<a?q.addOption(c):0>a&&q.removeOption(c)})}for(;R.length>w;)R.pop()[0].element.remove()}var u;if(!(u=s.match(d)))throw ag("iexp",s,va(f));var E=c(u[2]||u[1]),A=u[4]||u[6],z=/ as /.test(u[0])&&u[1],
w=z?c(z):null,G=u[5],I=c(u[3]||""),D=c(u[2]?u[1]:A),J=c(u[7]),M=u[8]?c(u[8]):null,S={},R=[[{element:f,label:""}]],T={};v&&(a(v)(e),v.removeClass("ng-scope"),v.remove());f.empty();f.on("change",function(){e.$apply(function(){var a=J(e)||[],c;if(n)c=[],r(f.val(),function(d){d=M?S[d]:d;c.push("?"===d?t:""===d?null:h(w?w:D,d,a[d]))});else{var d=M?S[f.val()]:f.val();c="?"===d?t:""===d?null:h(w?w:D,d,a[d])}g.$setViewValue(c);p()})});g.$render=p;e.$watchCollection(J,l);e.$watchCollection(function(){var a=
J(e),c;if(a&&H(a)){c=Array(a.length);for(var d=0,f=a.length;d<f;d++)c[d]=h(E,d,a[d])}else if(a)for(d in c={},a)a.hasOwnProperty(d)&&(c[d]=h(E,d,a[d]));return c},l);n&&e.$watchCollection(function(){return g.$modelValue},l)}if(k[1]){var q=k[0];k=k[1];var n=h.multiple,s=h.ngOptions,v=!1,u,x=!1,B=z(U.createElement("option")),F=z(U.createElement("optgroup")),E=B.clone();h=0;for(var A=g.children(),G=A.length;h<G;h++)if(""===A[h].value){u=v=A.eq(h);break}q.init(k,v,E);n&&(k.$isEmpty=function(a){return!a||
0===a.length});s?p(e,g,k):n?m(e,g,k):l(e,g,k,q)}}}}],Vd=["$interpolate",function(a){var c={addOption:A,removeOption:A};return{restrict:"E",priority:100,compile:function(d,e){if(w(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var l=d.parent(),m=l.data("$selectController")||l.parent().data("$selectController");m&&m.databound||(m=c);f?a.$watch(f,function(a,c){e.$set("value",a);c!==a&&m.removeOption(c);m.addOption(a,d)}):m.addOption(e.value,d);d.on("$destroy",function(){m.removeOption(e.value)})}}}}],
Ud=da({restrict:"E",terminal:!1});T.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):(Kd(),Md(wa),z(U).ready(function(){Gd(U,sc)}))})(window,document);!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>');
//# sourceMappingURL=angular.min.js.map

/*
 AngularJS v1.3.2
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(M,f,S){'use strict';f.module("ngAnimate",["ng"]).directive("ngAnimateChildren",function(){return function(T,B,k){k=k.ngAnimateChildren;f.isString(k)&&0===k.length?B.data("$$ngAnimateChildren",!0):T.$watch(k,function(f){B.data("$$ngAnimateChildren",!!f)})}}).factory("$$animateReflow",["$$rAF","$document",function(f,B){return function(k){return f(function(){k()})}}]).config(["$provide","$animateProvider",function(T,B){function k(f){for(var g=0;g<f.length;g++){var k=f[g];if(1==k.nodeType)return k}}
function N(f,g){return k(f)==k(g)}var s=f.noop,g=f.forEach,ba=B.$$selectors,$=f.isArray,ca=f.isString,da=f.isObject,t={running:!0};T.decorator("$animate",["$delegate","$$q","$injector","$sniffer","$rootElement","$$asyncCallback","$rootScope","$document","$templateRequest",function(O,M,I,U,x,C,P,S,V){function A(a,c){var b=a.data("$$ngAnimateState")||{};c&&(b.running=!0,b.structural=!0,a.data("$$ngAnimateState",b));return b.disabled||b.running&&b.structural}function z(a){var c,b=M.defer();b.promise.$$cancelFn=
function(){c&&c()};P.$$postDigest(function(){c=a(function(){b.resolve()})});return b.promise}function J(a){if(da(a))return a.tempClasses&&ca(a.tempClasses)&&(a.tempClasses=a.tempClasses.split(/\s+/)),a}function W(a,c,b){b=b||{};var e={};g(b,function(a,d){g(d.split(" "),function(d){e[d]=a})});var m=Object.create(null);g((a.attr("class")||"").split(/\s+/),function(a){m[a]=!0});var f=[],k=[];g(c&&c.classes||[],function(a,d){var b=m[d],c=e[d]||{};!1===a?(b||"addClass"==c.event)&&k.push(d):!0===a&&(b&&
"removeClass"!=c.event||f.push(d))});return 0<f.length+k.length&&[f.join(" "),k.join(" ")]}function Q(a){if(a){var c=[],b={};a=a.substr(1).split(".");(U.transitions||U.animations)&&c.push(I.get(ba[""]));for(var e=0;e<a.length;e++){var f=a[e],k=ba[f];k&&!b[f]&&(c.push(I.get(k)),b[f]=!0)}return c}}function R(a,c,b,e){function m(a,d){var b=a[d],c=a["before"+d.charAt(0).toUpperCase()+d.substr(1)];if(b||c)return"leave"==d&&(c=b,b=null),l.push({event:d,fn:b}),H.push({event:d,fn:c}),!0}function k(c,h,G){var w=
[];g(c,function(a){a.fn&&w.push(a)});var f=0;g(w,function(c,n){var u=function(){a:{if(h){(h[n]||s)();if(++f<w.length)break a;h=null}G()}};switch(c.event){case "setClass":h.push(c.fn(a,F,d,u,e));break;case "animate":h.push(c.fn(a,b,e.from,e.to,u));break;case "addClass":h.push(c.fn(a,F||b,u,e));break;case "removeClass":h.push(c.fn(a,d||b,u,e));break;default:h.push(c.fn(a,u,e))}});h&&0===h.length&&G()}var p=a[0];if(p){e&&(e.to=e.to||{},e.from=e.from||{});var F,d;$(b)&&(F=b[0],d=b[1],F?d?b=F+" "+d:(b=
F,c="addClass"):(b=d,c="removeClass"));var h="setClass"==c,G=h||"addClass"==c||"removeClass"==c||"animate"==c,w=a.attr("class")+" "+b;if(X(w)){var u=s,n=[],H=[],q=s,r=[],l=[],w=(" "+w).replace(/\s+/g,".");g(Q(w),function(a){!m(a,c)&&h&&(m(a,"addClass"),m(a,"removeClass"))});return{node:p,event:c,className:b,isClassBased:G,isSetClassOperation:h,applyStyles:function(){e&&a.css(f.extend(e.from||{},e.to||{}))},before:function(a){u=a;k(H,n,function(){u=s;a()})},after:function(a){q=a;k(l,r,function(){q=
s;a()})},cancel:function(){n&&(g(n,function(a){(a||s)(!0)}),u(!0));r&&(g(r,function(a){(a||s)(!0)}),q(!0))}}}}}function y(a,c,b,e,m,k,p,F){function d(d){var h="$animate:"+d;H&&H[h]&&0<H[h].length&&C(function(){b.triggerHandler(h,{event:a,className:c})})}function h(){d("before")}function G(){d("after")}function w(){w.hasBeenRun||(w.hasBeenRun=!0,k())}function u(){if(!u.hasBeenRun){n&&n.applyStyles();u.hasBeenRun=!0;p&&p.tempClasses&&g(p.tempClasses,function(a){b.removeClass(a)});var h=b.data("$$ngAnimateState");
h&&(n&&n.isClassBased?l(b,c):(C(function(){var d=b.data("$$ngAnimateState")||{};v==d.index&&l(b,c,a)}),b.data("$$ngAnimateState",h)));d("close");F()}}var n=R(b,a,c,p);if(!n)return w(),h(),G(),u(),s;a=n.event;c=n.className;var H=f.element._data(n.node),H=H&&H.events;e||(e=m?m.parent():b.parent());if(Y(b,e))return w(),h(),G(),u(),s;e=b.data("$$ngAnimateState")||{};var q=e.active||{},r=e.totalActive||0,t=e.last;m=!1;if(0<r){r=[];if(n.isClassBased)"setClass"==t.event?(r.push(t),l(b,c)):q[c]&&(aa=q[c],
aa.event==a?m=!0:(r.push(aa),l(b,c)));else if("leave"==a&&q["ng-leave"])m=!0;else{for(var aa in q)r.push(q[aa]);e={};l(b,!0)}0<r.length&&g(r,function(a){a.cancel()})}!n.isClassBased||n.isSetClassOperation||"animate"==a||m||(m="addClass"==a==b.hasClass(c));if(m)return w(),h(),G(),d("close"),F(),s;q=e.active||{};r=e.totalActive||0;if("leave"==a)b.one("$destroy",function(a){a=f.element(this);var d=a.data("$$ngAnimateState");d&&(d=d.active["ng-leave"])&&(d.cancel(),l(a,"ng-leave"))});b.addClass("ng-animate");
p&&p.tempClasses&&g(p.tempClasses,function(a){b.addClass(a)});var v=Z++;r++;q[c]=n;b.data("$$ngAnimateState",{last:n,active:q,index:v,totalActive:r});h();n.before(function(d){var h=b.data("$$ngAnimateState");d=d||!h||!h.active[c]||n.isClassBased&&h.active[c].event!=a;w();!0===d?u():(G(),n.after(u))});return n.cancel}function K(a){if(a=k(a))a=f.isFunction(a.getElementsByClassName)?a.getElementsByClassName("ng-animate"):a.querySelectorAll(".ng-animate"),g(a,function(a){a=f.element(a);(a=a.data("$$ngAnimateState"))&&
a.active&&g(a.active,function(a){a.cancel()})})}function l(a,c){if(N(a,x))t.disabled||(t.running=!1,t.structural=!1);else if(c){var b=a.data("$$ngAnimateState")||{},e=!0===c;!e&&b.active&&b.active[c]&&(b.totalActive--,delete b.active[c]);if(e||!b.totalActive)a.removeClass("ng-animate"),a.removeData("$$ngAnimateState")}}function Y(a,c){if(t.disabled)return!0;if(N(a,x))return t.running;var b,e,k;do{if(0===c.length)break;var g=N(c,x),p=g?t:c.data("$$ngAnimateState")||{};if(p.disabled)return!0;g&&(k=
!0);!1!==b&&(g=c.data("$$ngAnimateChildren"),f.isDefined(g)&&(b=g));e=e||p.running||p.last&&!p.last.isClassBased}while(c=c.parent());return!k||!b&&e}x.data("$$ngAnimateState",t);var L=P.$watch(function(){return V.totalPendingRequests},function(a,c){0===a&&(L(),P.$$postDigest(function(){P.$$postDigest(function(){t.running=!1})}))}),Z=0,E=B.classNameFilter(),X=E?function(a){return E.test(a)}:function(){return!0};return{animate:function(a,c,b,e,g){e=e||"ng-inline-animate";g=J(g)||{};g.from=b?c:null;
g.to=b?b:c;return z(function(b){return y("animate",e,f.element(k(a)),null,null,s,g,b)})},enter:function(a,c,b,e){e=J(e);a=f.element(a);c=c&&f.element(c);b=b&&f.element(b);A(a,!0);O.enter(a,c,b);return z(function(g){return y("enter","ng-enter",f.element(k(a)),c,b,s,e,g)})},leave:function(a,c){c=J(c);a=f.element(a);K(a);A(a,!0);return z(function(b){return y("leave","ng-leave",f.element(k(a)),null,null,function(){O.leave(a)},c,b)})},move:function(a,c,b,e){e=J(e);a=f.element(a);c=c&&f.element(c);b=b&&
f.element(b);K(a);A(a,!0);O.move(a,c,b);return z(function(g){return y("move","ng-move",f.element(k(a)),c,b,s,e,g)})},addClass:function(a,c,b){return this.setClass(a,c,[],b)},removeClass:function(a,c,b){return this.setClass(a,[],c,b)},setClass:function(a,c,b,e){e=J(e);a=f.element(a);a=f.element(k(a));if(A(a))return O.$$setClassImmediately(a,c,b,e);var m,l=a.data("$$animateClasses"),p=!!l;l||(l={classes:{}});m=l.classes;c=$(c)?c:c.split(" ");g(c,function(a){a&&a.length&&(m[a]=!0)});b=$(b)?b:b.split(" ");
g(b,function(a){a&&a.length&&(m[a]=!1)});if(p)return e&&l.options&&(l.options=f.extend(l.options||{},e)),l.promise;a.data("$$animateClasses",l={classes:m,options:e});return l.promise=z(function(b){var d=a.parent(),h=k(a),c=h.parentNode;if(!c||c.$$NG_REMOVED||h.$$NG_REMOVED)b();else{h=a.data("$$animateClasses");a.removeData("$$animateClasses");var c=a.data("$$ngAnimateState")||{},e=W(a,h,c.active);return e?y("setClass",e,a,d,null,function(){e[0]&&O.$$addClassImmediately(a,e[0]);e[1]&&O.$$removeClassImmediately(a,
e[1])},h.options,b):b()}})},cancel:function(a){a.$$cancelFn()},enabled:function(a,c){switch(arguments.length){case 2:if(a)l(c);else{var b=c.data("$$ngAnimateState")||{};b.disabled=!0;c.data("$$ngAnimateState",b)}break;case 1:t.disabled=!a;break;default:a=!t.disabled}return!!a}}}]);B.register("",["$window","$sniffer","$timeout","$$animateReflow",function(t,B,I,U){function x(){e||(e=U(function(){b=[];e=null;a={}}))}function C(c,d){e&&e();b.push(d);e=U(function(){g(b,function(a){a()});b=[];e=null;a=
{}})}function P(a,d){var h=k(a);a=f.element(h);p.push(a);h=Date.now()+d;h<=N||(I.cancel(m),N=h,m=I(function(){T(p);p=[]},d,!1))}function T(a){g(a,function(a){(a=a.data("$$ngAnimateCSS3Data"))&&g(a.closeAnimationFns,function(a){a()})})}function V(b,d){var h=d?a[d]:null;if(!h){var c=0,e=0,f=0,k=0;g(b,function(a){if(1==a.nodeType){a=t.getComputedStyle(a)||{};c=Math.max(A(a[L+"Duration"]),c);e=Math.max(A(a[L+"Delay"]),e);k=Math.max(A(a[E+"Delay"]),k);var d=A(a[E+"Duration"]);0<d&&(d*=parseInt(a[E+"IterationCount"],
10)||1);f=Math.max(d,f)}});h={total:0,transitionDelay:e,transitionDuration:c,animationDelay:k,animationDuration:f};d&&(a[d]=h)}return h}function A(a){var d=0;a=ca(a)?a.split(/\s*,\s*/):[];g(a,function(a){d=Math.max(parseFloat(a)||0,d)});return d}function z(b,d,h,e){b=0<=["ng-enter","ng-leave","ng-move"].indexOf(h);var f,g=d.parent(),n=g.data("$$ngAnimateKey");n||(g.data("$$ngAnimateKey",++c),n=c);f=n+"-"+k(d).getAttribute("class");var g=f+" "+h,n=a[g]?++a[g].total:0,l={};if(0<n){var q=h+"-stagger",
l=f+" "+q;(f=!a[l])&&d.addClass(q);l=V(d,l);f&&d.removeClass(q)}d.addClass(h);var q=d.data("$$ngAnimateCSS3Data")||{},r=V(d,g);f=r.transitionDuration;r=r.animationDuration;if(b&&0===f&&0===r)return d.removeClass(h),!1;h=e||b&&0<f;b=0<r&&0<l.animationDelay&&0===l.animationDuration;d.data("$$ngAnimateCSS3Data",{stagger:l,cacheKey:g,running:q.running||0,itemIndex:n,blockTransition:h,closeAnimationFns:q.closeAnimationFns||[]});g=k(d);h&&(W(g,!0),e&&d.css(e));b&&(g.style[E+"PlayState"]="paused");return!0}
function J(a,d,b,c,e){function f(){d.off(C,l);d.removeClass(q);d.removeClass(r);z&&I.cancel(z);K(d,b);var a=k(d),c;for(c in p)a.style.removeProperty(p[c])}function l(a){a.stopPropagation();var d=a.originalEvent||a;a=d.$manualTimeStamp||d.timeStamp||Date.now();d=parseFloat(d.elapsedTime.toFixed(3));Math.max(a-B,0)>=A&&d>=x&&c()}var m=k(d);a=d.data("$$ngAnimateCSS3Data");if(-1!=m.getAttribute("class").indexOf(b)&&a){var q="",r="";g(b.split(" "),function(a,d){var b=(0<d?" ":"")+a;q+=b+"-active";r+=b+
"-pending"});var p=[],t=a.itemIndex,v=a.stagger,s=0;if(0<t){s=0;0<v.transitionDelay&&0===v.transitionDuration&&(s=v.transitionDelay*t);var y=0;0<v.animationDelay&&0===v.animationDuration&&(y=v.animationDelay*t,p.push(Y+"animation-play-state"));s=Math.round(100*Math.max(s,y))/100}s||(d.addClass(q),a.blockTransition&&W(m,!1));var D=V(d,a.cacheKey+" "+q),x=Math.max(D.transitionDuration,D.animationDuration);if(0===x)d.removeClass(q),K(d,b),c();else{!s&&e&&(D.transitionDuration||(d.css("transition",D.animationDuration+
"s linear all"),p.push("transition")),d.css(e));var t=Math.max(D.transitionDelay,D.animationDelay),A=1E3*t;0<p.length&&(v=m.getAttribute("style")||"",";"!==v.charAt(v.length-1)&&(v+=";"),m.setAttribute("style",v+" "));var B=Date.now(),C=X+" "+Z,t=1E3*(s+1.5*(t+x)),z;0<s&&(d.addClass(r),z=I(function(){z=null;0<D.transitionDuration&&W(m,!1);0<D.animationDuration&&(m.style[E+"PlayState"]="");d.addClass(q);d.removeClass(r);e&&(0===D.transitionDuration&&d.css("transition",D.animationDuration+"s linear all"),
d.css(e),p.push("transition"))},1E3*s,!1));d.on(C,l);a.closeAnimationFns.push(function(){f();c()});a.running++;P(d,t);return f}}else c()}function W(a,d){a.style[L+"Property"]=d?"none":""}function Q(a,d,b,c){if(z(a,d,b,c))return function(a){a&&K(d,b)}}function R(a,d,b,c,e){if(d.data("$$ngAnimateCSS3Data"))return J(a,d,b,c,e);K(d,b);c()}function y(a,d,b,c,e){var f=Q(a,d,b,e.from);if(f){var g=f;C(d,function(){g=R(a,d,b,c,e.to)});return function(a){(g||s)(a)}}x();c()}function K(a,d){a.removeClass(d);
var b=a.data("$$ngAnimateCSS3Data");b&&(b.running&&b.running--,b.running&&0!==b.running||a.removeData("$$ngAnimateCSS3Data"))}function l(a,d){var b="";a=$(a)?a:a.split(/\s+/);g(a,function(a,c){a&&0<a.length&&(b+=(0<c?" ":"")+a+d)});return b}var Y="",L,Z,E,X;M.ontransitionend===S&&M.onwebkittransitionend!==S?(Y="-webkit-",L="WebkitTransition",Z="webkitTransitionEnd transitionend"):(L="transition",Z="transitionend");M.onanimationend===S&&M.onwebkitanimationend!==S?(Y="-webkit-",E="WebkitAnimation",
X="webkitAnimationEnd animationend"):(E="animation",X="animationend");var a={},c=0,b=[],e,m=null,N=0,p=[];return{animate:function(a,d,b,c,e,f){f=f||{};f.from=b;f.to=c;return y("animate",a,d,e,f)},enter:function(a,b,c){c=c||{};return y("enter",a,"ng-enter",b,c)},leave:function(a,b,c){c=c||{};return y("leave",a,"ng-leave",b,c)},move:function(a,b,c){c=c||{};return y("move",a,"ng-move",b,c)},beforeSetClass:function(a,b,c,e,f){f=f||{};b=l(c,"-remove")+" "+l(b,"-add");if(f=Q("setClass",a,b,f.from))return C(a,
e),f;x();e()},beforeAddClass:function(a,b,c,e){e=e||{};if(b=Q("addClass",a,l(b,"-add"),e.from))return C(a,c),b;x();c()},beforeRemoveClass:function(a,b,c,e){e=e||{};if(b=Q("removeClass",a,l(b,"-remove"),e.from))return C(a,c),b;x();c()},setClass:function(a,b,c,e,f){f=f||{};c=l(c,"-remove");b=l(b,"-add");return R("setClass",a,c+" "+b,e,f.to)},addClass:function(a,b,c,e){e=e||{};return R("addClass",a,l(b,"-add"),c,e.to)},removeClass:function(a,b,c,e){e=e||{};return R("removeClass",a,l(b,"-remove"),c,e.to)}}}])}])})(window,
window.angular);
//# sourceMappingURL=angular-animate.min.js.map

/*
 AngularJS v1.3.2
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,d,B){'use strict';function u(q,h,f){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,c,b,g,x){function y(){k&&(f.cancel(k),k=null);l&&(l.$destroy(),l=null);m&&(k=f.leave(m),k.then(function(){k=null}),m=null)}function w(){var b=q.current&&q.current.locals;if(d.isDefined(b&&b.$template)){var b=a.$new(),g=q.current;m=x(b,function(b){f.enter(b,null,m||c).then(function(){!d.isDefined(s)||s&&!a.$eval(s)||h()});y()});l=g.scope=b;l.$emit("$viewContentLoaded");
l.$eval(v)}else y()}var l,m,k,s=b.autoscroll,v=b.onload||"";a.$on("$routeChangeSuccess",w);w()}}}function z(d,h,f){return{restrict:"ECA",priority:-400,link:function(a,c){var b=f.current,g=b.locals;c.html(g.$template);var x=d(c.contents());b.controller&&(g.$scope=a,g=h(b.controller,g),b.controllerAs&&(a[b.controllerAs]=g),c.data("$ngControllerController",g),c.children().data("$ngControllerController",g));x(a)}}}p=d.module("ngRoute",["ng"]).provider("$route",function(){function q(a,c){return d.extend(new (d.extend(function(){},
{prototype:a})),c)}function h(a,d){var b=d.caseInsensitiveMatch,g={originalPath:a,regexp:a},f=g.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,d,b,c){a="?"===c?c:null;c="*"===c?c:null;f.push({name:b,optional:!!a});d=d||"";return""+(a?"":d)+"(?:"+(a?d:"")+(c&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");g.regexp=new RegExp("^"+a+"$",b?"i":"");return g}var f={};this.when=function(a,c){var b=d.copy(c);d.isUndefined(b.reloadOnSearch)&&(b.reloadOnSearch=
!0);f[a]=d.extend(b,a&&h(a,b));if(a){var g="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";f[g]=d.extend({redirectTo:a},h(g,b))}return this};this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(a,c,b,g,h,p,w){function l(b){var e=r.current;(u=(n=k())&&e&&n.$$route===e.$$route&&d.equals(n.pathParams,e.pathParams)&&!n.reloadOnSearch&&!v)||!e&&!n||a.$broadcast("$routeChangeStart",
n,e).defaultPrevented&&b&&b.preventDefault()}function m(){var t=r.current,e=n;if(u)t.params=e.params,d.copy(t.params,b),a.$broadcast("$routeUpdate",t);else if(e||t)v=!1,(r.current=e)&&e.redirectTo&&(d.isString(e.redirectTo)?c.path(s(e.redirectTo,e.params)).search(e.params).replace():c.url(e.redirectTo(e.pathParams,c.path(),c.search())).replace()),g.when(e).then(function(){if(e){var a=d.extend({},e.resolve),b,c;d.forEach(a,function(e,b){a[b]=d.isString(e)?h.get(e):h.invoke(e,null,null,b)});d.isDefined(b=
e.template)?d.isFunction(b)&&(b=b(e.params)):d.isDefined(c=e.templateUrl)&&(d.isFunction(c)&&(c=c(e.params)),c=w.getTrustedResourceUrl(c),d.isDefined(c)&&(e.loadedTemplateUrl=c,b=p(c)));d.isDefined(b)&&(a.$template=b);return g.all(a)}}).then(function(c){e==r.current&&(e&&(e.locals=c,d.copy(e.params,b)),a.$broadcast("$routeChangeSuccess",e,t))},function(b){e==r.current&&a.$broadcast("$routeChangeError",e,t,b)})}function k(){var a,e;d.forEach(f,function(b,g){var f;if(f=!e){var h=c.path();f=b.keys;var l=
{};if(b.regexp)if(h=b.regexp.exec(h)){for(var k=1,m=h.length;k<m;++k){var n=f[k-1],p=h[k];n&&p&&(l[n.name]=p)}f=l}else f=null;else f=null;f=a=f}f&&(e=q(b,{params:d.extend({},c.search(),a),pathParams:a}),e.$$route=b)});return e||f[null]&&q(f[null],{params:{},pathParams:{}})}function s(a,b){var c=[];d.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var f=a.match(/(\w+)(.*)/),g=f[1];c.push(b[g]);c.push(f[2]||"");delete b[g]}});return c.join("")}var v=!1,n,u,r={routes:f,reload:function(){v=
!0;a.$evalAsync(function(){l();m()})},updateParams:function(a){if(this.current&&this.current.$$route){var b={},f=this;d.forEach(Object.keys(a),function(c){f.current.pathParams[c]||(b[c]=a[c])});a=d.extend({},this.current.params,a);c.path(s(this.current.$$route.originalPath,a));c.search(d.extend({},c.search(),b))}else throw A("norout");}};a.$on("$locationChangeStart",l);a.$on("$locationChangeSuccess",m);return r}]});var A=d.$$minErr("ngRoute");p.provider("$routeParams",function(){this.$get=function(){return{}}});
p.directive("ngView",u);p.directive("ngView",z);u.$inject=["$route","$anchorScroll","$animate"];z.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map

/*
 AngularJS v1.3.2
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,g,q){'use strict';function F(a){var d=[];t(d,g.noop).chars(a);return d.join("")}function k(a){var d={};a=a.split(",");var c;for(c=0;c<a.length;c++)d[a[c]]=!0;return d}function G(a,d){function c(a,b,c,h){b=g.lowercase(b);if(u[b])for(;f.last()&&v[f.last()];)e("",f.last());w[b]&&f.last()==b&&e("",b);(h=x[b]||!!h)||f.push(b);var n={};c.replace(H,function(a,b,d,c,e){n[b]=s(d||c||e||"")});d.start&&d.start(b,n,h)}function e(a,b){var c=0,e;if(b=g.lowercase(b))for(c=f.length-1;0<=c&&f[c]!=b;c--);
if(0<=c){for(e=f.length-1;e>=c;e--)d.end&&d.end(f[e]);f.length=c}}"string"!==typeof a&&(a=null===a||"undefined"===typeof a?"":""+a);var b,m,f=[],n=a,h;for(f.last=function(){return f[f.length-1]};a;){h="";m=!0;if(f.last()&&y[f.last()])a=a.replace(new RegExp("(.*)<\\s*\\/\\s*"+f.last()+"[^>]*>","i"),function(a,b){b=b.replace(I,"$1").replace(J,"$1");d.chars&&d.chars(s(b));return""}),e("",f.last());else{if(0===a.indexOf("\x3c!--"))b=a.indexOf("--",4),0<=b&&a.lastIndexOf("--\x3e",b)===b&&(d.comment&&d.comment(a.substring(4,
b)),a=a.substring(b+3),m=!1);else if(z.test(a)){if(b=a.match(z))a=a.replace(b[0],""),m=!1}else if(K.test(a)){if(b=a.match(A))a=a.substring(b[0].length),b[0].replace(A,e),m=!1}else L.test(a)&&((b=a.match(B))?(b[4]&&(a=a.substring(b[0].length),b[0].replace(B,c)),m=!1):(h+="<",a=a.substring(1)));m&&(b=a.indexOf("<"),h+=0>b?a:a.substring(0,b),a=0>b?"":a.substring(b),d.chars&&d.chars(s(h)))}if(a==n)throw M("badparse",a);n=a}e()}function s(a){if(!a)return"";var d=N.exec(a);a=d[1];var c=d[3];if(d=d[2])r.innerHTML=
d.replace(/</g,"&lt;"),d="textContent"in r?r.textContent:r.innerText;return a+d+c}function C(a){return a.replace(/&/g,"&amp;").replace(O,function(a){var c=a.charCodeAt(0);a=a.charCodeAt(1);return"&#"+(1024*(c-55296)+(a-56320)+65536)+";"}).replace(P,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function t(a,d){var c=!1,e=g.bind(a,a.push);return{start:function(a,m,f){a=g.lowercase(a);!c&&y[a]&&(c=a);c||!0!==D[a]||(e("<"),e(a),g.forEach(m,function(c,f){var l=
g.lowercase(f),m="img"===a&&"src"===l||"background"===l;!0!==Q[l]||!0===E[l]&&!d(c,m)||(e(" "),e(f),e('="'),e(C(c)),e('"'))}),e(f?"/>":">"))},end:function(a){a=g.lowercase(a);c||!0!==D[a]||(e("</"),e(a),e(">"));a==c&&(c=!1)},chars:function(a){c||e(C(a))}}}var M=g.$$minErr("$sanitize"),B=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,A=/^<\/\s*([\w:-]+)[^>]*>/,H=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,L=/^</,
K=/^<\//,I=/\x3c!--(.*?)--\x3e/g,z=/<!DOCTYPE([^>]*?)>/i,J=/<!\[CDATA\[(.*?)]]\x3e/g,O=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,P=/([^\#-~| |!])/g,x=k("area,br,col,hr,img,wbr");p=k("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr");q=k("rp,rt");var w=g.extend({},q,p),u=g.extend({},p,k("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),v=g.extend({},q,k("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
p=k("animate,animateColor,animateMotion,animateTransform,circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set,stop,svg,switch,text,title,tspan,use");var y=k("script,style"),D=g.extend({},x,u,v,w,p),E=k("background,cite,href,longdesc,src,usemap,xlink:href");p=k("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width");
q=k("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan");
var Q=g.extend({},E,q,p),r=document.createElement("pre"),N=/^(\s*)([\s\S]*?)(\s*)$/;g.module("ngSanitize",[]).provider("$sanitize",function(){this.$get=["$$sanitizeUri",function(a){return function(d){var c=[];G(d,t(c,function(c,b){return!/^unsafe/.test(a(c,b))}));return c.join("")}}]});g.module("ngSanitize").filter("linky",["$sanitize",function(a){var d=/((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"]/,c=/^mailto:/;return function(e,b){function m(a){a&&l.push(F(a))}function f(a,
c){l.push("<a ");g.isDefined(b)&&(l.push('target="'),l.push(b),l.push('" '));l.push('href="');l.push(a);l.push('">');m(c);l.push("</a>")}if(!e)return e;for(var n,h=e,l=[],k,p;n=h.match(d);)k=n[0],n[2]==n[3]&&(k="mailto:"+k),p=n.index,m(h.substr(0,p)),f(k,n[0].replace(c,"")),h=h.substring(p+n[0].length);m(h);return a(l.join(""))}}])})(window,window.angular);
//# sourceMappingURL=angular-sanitize.min.js.map

/**
 * angular-strap
 * @version v2.3.6 - 2015-11-14
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
!function(e,t,n){'use strict';function a(e,n,a,o,i,r){function s(e,n){return angular.element((n||t).querySelectorAll(e))}function l(e){return u[e]?u[e]:u[e]=n.get(e,{cache:r}).then(function(e){return e.data})}this.compile=function(t){t.template&&/\.html$/.test(t.template)&&(console.warn('Deprecated use of `template` option to pass a file. Please use the `templateUrl` option instead.'),t.templateUrl=t.template,t.template='');var n=t.templateUrl,r=t.template||'',u=t.controller,c=t.controllerAs,d=angular.copy(t.resolve||{}),f=angular.copy(t.locals||{}),p=t.transformTemplate||angular.identity,g=t.bindToController;if(angular.forEach(d,function(e,t){angular.isString(e)?d[t]=a.get(e):d[t]=a.invoke(e)}),angular.extend(d,f),r)d.$template=e.when(r);else{if(!n)throw new Error('Missing `template` / `templateUrl` option.');d.$template=l(n)}return t.contentTemplate&&(d.$template=e.all([d.$template,l(t.contentTemplate)]).then(function(e){var n=angular.element(e[0]),a=s('[ng-bind="content"]',n[0]).removeAttr('ng-bind').html(e[1]);return t.templateUrl||a.next().remove(),n[0].outerHTML})),e.all(d).then(function(e){var n=p(e.$template);t.html&&(n=n.replace(/ng-bind="/gi,'ng-bind-html="'));var a=angular.element('<div>').html(n.trim()).contents(),r=o(a);return{locals:e,element:a,link:function(t){if(e.$scope=t,u){var n=i(u,e,!0);g&&angular.extend(n.instance,e);var o=angular.isObject(n)?n:n();a.data('$ngControllerController',o),a.children().data('$ngControllerController',o),c&&(t[c]=o)}return r.apply(null,arguments)}}})};var u={}}angular.module('mgcrea.ngStrap.tooltip',['mgcrea.ngStrap.core','mgcrea.ngStrap.helpers.dimensions']).provider('$tooltip',function(){var e=this.defaults={animation:'am-fade',customClass:'',prefixClass:'tooltip',prefixEvent:'tooltip',container:!1,target:!1,placement:'top',templateUrl:'tooltip/tooltip.tpl.html',template:'',contentTemplate:!1,trigger:'hover focus',keyboard:!1,html:!1,show:!1,title:'',type:'',delay:0,autoClose:!1,bsEnabled:!0,viewport:{selector:'body',padding:0}};this.$get=['$window','$rootScope','$bsCompiler','$q','$templateCache','$http','$animate','$sce','dimensions','$$rAF','$timeout',function(n,a,o,i,r,s,l,u,c,d,f){function p(i,r){function s(){I.$emit(V.prefixEvent+'.show',F)}function p(){if(I.$emit(V.prefixEvent+'.hide',F),R===j){if(z&&'focus'===V.trigger)return i[0].blur();A()}}function v(){var e=V.trigger.split(' ');angular.forEach(e,function(e){'click'===e?i.on('click',F.toggle):'manual'!==e&&(i.on('hover'===e?'mouseenter':'focus',F.enter),i.on('hover'===e?'mouseleave':'blur',F.leave),'button'===N&&'hover'!==e&&i.on($?'touchstart':'mousedown',F.$onFocusElementMouseDown))})}function w(){for(var e=V.trigger.split(' '),t=e.length;t--;){var n=e[t];'click'===n?i.off('click',F.toggle):'manual'!==n&&(i.off('hover'===n?'mouseenter':'focus',F.enter),i.off('hover'===n?'mouseleave':'blur',F.leave),'button'===N&&'hover'!==n&&i.off($?'touchstart':'mousedown',F.$onFocusElementMouseDown))}}function y(){'focus'!==V.trigger?R.on('keyup',F.$onKeyUp):i.on('keyup',F.$onFocusKeyUp)}function b(){'focus'!==V.trigger?R.off('keyup',F.$onKeyUp):i.off('keyup',F.$onFocusKeyUp)}function D(){f(function(){R.on('click',S),h.on('click',F.hide),K=!0},0,!1)}function k(){K&&(R.off('click',S),h.off('click',F.hide),K=!1)}function S(e){e.stopPropagation()}function x(e){e=e||V.target||i;var a=e[0],o='BODY'===a.tagName,r=a.getBoundingClientRect(),s={};for(var l in r)s[l]=r[l];null===s.width&&(s=angular.extend({},s,{width:r.right-r.left,height:r.bottom-r.top}));var u=o?{top:0,left:0}:c.offset(a),d={scroll:o?t.documentElement.scrollTop||t.body.scrollTop:e.prop('scrollTop')||0},f=o?{width:t.documentElement.clientWidth,height:n.innerHeight}:null;return angular.extend({},s,d,f,u)}function T(e,t,n,a){var o,i=e.split('-');switch(i[0]){case'right':o={top:t.top+t.height/2-a/2,left:t.left+t.width};break;case'bottom':o={top:t.top+t.height,left:t.left+t.width/2-n/2};break;case'left':o={top:t.top+t.height/2-a/2,left:t.left-n};break;default:o={top:t.top-a,left:t.left+t.width/2-n/2}}if(!i[1])return o;if('top'===i[0]||'bottom'===i[0])switch(i[1]){case'left':o.left=t.left;break;case'right':o.left=t.left+t.width-n}else if('left'===i[0]||'right'===i[0])switch(i[1]){case'top':o.top=t.top-a+t.height;break;case'bottom':o.top=t.top}return o}function C(e,t){var n=R[0],a=n.offsetWidth,o=n.offsetHeight,i=parseInt(c.css(n,'margin-top'),10),r=parseInt(c.css(n,'margin-left'),10);isNaN(i)&&(i=0),isNaN(r)&&(r=0),e.top=e.top+i,e.left=e.left+r,c.setOffset(n,angular.extend({using:function(e){R.css({top:Math.round(e.top)+'px',left:Math.round(e.left)+'px',right:''})}},e),0);var s=n.offsetWidth,l=n.offsetHeight;if('top'===t&&l!==o&&(e.top=e.top+o-l),!/top-left|top-right|bottom-left|bottom-right/.test(t)){var u=E(t,e,s,l);if(u.left?e.left+=u.left:e.top+=u.top,c.setOffset(n,e),/top|right|bottom|left/.test(t)){var d=/top|bottom/.test(t),f=d?2*u.left-a+s:2*u.top-o+l,p=d?'offsetWidth':'offsetHeight';M(f,n[p],d)}}}function E(e,t,n,a){var o={top:0,left:0};if(!F.$viewport)return o;var i=V.viewport&&V.viewport.padding||0,r=x(F.$viewport);if(/right|left/.test(e)){var s=t.top-i-r.scroll,l=t.top+i-r.scroll+a;s<r.top?o.top=r.top-s:l>r.top+r.height&&(o.top=r.top+r.height-l)}else{var u=t.left-i,c=t.left+i+n;u<r.left?o.left=r.left-u:c>r.right&&(o.left=r.left+r.width-c)}return o}function M(e,t,n){var a=m('.tooltip-arrow, .arrow',R[0]);a.css(n?'left':'top',50*(1-e/t)+'%').css(n?'top':'left','')}function A(){clearTimeout(H),F.$isShown&&null!==R&&(V.autoClose&&k(),V.keyboard&&b()),q&&(q.$destroy(),q=null),R&&(R.remove(),R=F.$element=null)}var F={},V=F.$options=angular.extend({},e,r),O=F.$promise=o.compile(V),I=F.$scope=V.scope&&V.scope.$new()||a.$new(),N=i[0].nodeName.toLowerCase();if(V.delay&&angular.isString(V.delay)){var P=V.delay.split(',').map(parseFloat);V.delay=P.length>1?{show:P[0],hide:P[1]}:P[0]}F.$id=V.id||i.attr('id')||'',V.title&&(I.title=u.trustAsHtml(V.title)),I.$setEnabled=function(e){I.$$postDigest(function(){F.setEnabled(e)})},I.$hide=function(){I.$$postDigest(function(){F.hide()})},I.$show=function(){I.$$postDigest(function(){F.show()})},I.$toggle=function(){I.$$postDigest(function(){F.toggle()})},F.$isShown=I.$isShown=!1;var H,L,U,R,Y,q;O.then(function(e){U=e,F.init()}),F.init=function(){V.delay&&angular.isNumber(V.delay)&&(V.delay={show:V.delay,hide:V.delay}),'self'===V.container?Y=i:angular.isElement(V.container)?Y=V.container:V.container&&(Y=m(V.container)),v(),V.target&&(V.target=angular.isElement(V.target)?V.target:m(V.target)),V.show&&I.$$postDigest(function(){'focus'===V.trigger?i[0].focus():F.show()})},F.destroy=function(){w(),A(),I.$destroy()},F.enter=function(){return clearTimeout(H),L='in',V.delay&&V.delay.show?void(H=setTimeout(function(){'in'===L&&F.show()},V.delay.show)):F.show()},F.show=function(){if(V.bsEnabled&&!F.$isShown){I.$emit(V.prefixEvent+'.show.before',F);var e,t;V.container?(e=Y,t=Y[0].lastChild?angular.element(Y[0].lastChild):null):(e=null,t=i),R&&A(),q=F.$scope.$new(),R=F.$element=U.link(q,function(e,t){}),R.css({top:'-9999px',left:'-9999px',right:'auto',display:'block',visibility:'hidden'}),V.animation&&R.addClass(V.animation),V.type&&R.addClass(V.prefixClass+'-'+V.type),V.customClass&&R.addClass(V.customClass),t?t.after(R):e.prepend(R),F.$isShown=I.$isShown=!0,g(I),F.$applyPlacement(),angular.version.minor<=2?l.enter(R,e,t,s):l.enter(R,e,t).then(s),g(I),d(function(){R&&R.css({visibility:'visible'}),V.keyboard&&('focus'!==V.trigger&&F.focus(),y())}),V.autoClose&&D()}},F.leave=function(){return clearTimeout(H),L='out',V.delay&&V.delay.hide?void(H=setTimeout(function(){'out'===L&&F.hide()},V.delay.hide)):F.hide()};var z,j;F.hide=function(e){F.$isShown&&(I.$emit(V.prefixEvent+'.hide.before',F),z=e,j=R,angular.version.minor<=2?l.leave(R,p):l.leave(R).then(p),F.$isShown=I.$isShown=!1,g(I),V.keyboard&&null!==R&&b(),V.autoClose&&null!==R&&k())},F.toggle=function(){F.$isShown?F.leave():F.enter()},F.focus=function(){R[0].focus()},F.setEnabled=function(e){V.bsEnabled=e},F.setViewport=function(e){V.viewport=e},F.$applyPlacement=function(){if(R){var t=V.placement,n=/\s?auto?\s?/i,a=n.test(t);a&&(t=t.replace(n,'')||e.placement),R.addClass(V.placement);var o=x(),i=R.prop('offsetWidth'),r=R.prop('offsetHeight');if(F.$viewport=V.viewport&&m(V.viewport.selector||V.viewport),a){var s=t,l=x(F.$viewport);/top/.test(s)&&o.bottom+r>l.bottom?t=s.replace('top','bottom'):/bottom/.test(s)&&o.top-r<l.top&&(t=s.replace('bottom','top')),/left/.test(s)&&o.left-i<l.left?t=t.replace('left','right'):/right/.test(s)&&o.right+i>l.width&&(t=t.replace('right','left')),R.removeClass(s).addClass(t)}var u=T(t,o,i,r);C(u,t)}},F.$onKeyUp=function(e){27===e.which&&F.$isShown&&(F.hide(),e.stopPropagation())},F.$onFocusKeyUp=function(e){27===e.which&&(i[0].blur(),e.stopPropagation())},F.$onFocusElementMouseDown=function(e){e.preventDefault(),e.stopPropagation(),F.$isShown?i[0].blur():i[0].focus()};var K=!1;return F}function g(e){e.$$phase||e.$root&&e.$root.$$phase||e.$digest()}function m(e,n){return angular.element((n||t).querySelectorAll(e))}var $=(String.prototype.trim,'createTouch'in n.document),h=angular.element(n.document);return p}]}).directive('bsTooltip',['$window','$location','$sce','$tooltip','$$rAF',function(e,t,n,a,o){return{restrict:'EAC',scope:!0,link:function(e,t,i,r){var s={scope:e};angular.forEach(['template','templateUrl','controller','controllerAs','contentTemplate','placement','container','delay','trigger','html','animation','backdropAnimation','type','customClass','id'],function(e){angular.isDefined(i[e])&&(s[e]=i[e])});var l=/^(false|0|)$/i;angular.forEach(['html','container'],function(e){angular.isDefined(i[e])&&l.test(i[e])&&(s[e]=!1)});var u=t.attr('data-target');angular.isDefined(u)&&(l.test(u)?s.target=!1:s.target=u),e.hasOwnProperty('title')||(e.title=''),i.$observe('title',function(t){if(angular.isDefined(t)||!e.hasOwnProperty('title')){var a=e.title;e.title=n.trustAsHtml(t),angular.isDefined(a)&&o(function(){c&&c.$applyPlacement()})}}),i.bsTooltip&&e.$watch(i.bsTooltip,function(t,n){angular.isObject(t)?angular.extend(e,t):e.title=t,angular.isDefined(n)&&o(function(){c&&c.$applyPlacement()})},!0),i.bsShow&&e.$watch(i.bsShow,function(e,t){c&&angular.isDefined(e)&&(angular.isString(e)&&(e=!!e.match(/true|,?(tooltip),?/i)),e===!0?c.show():c.hide())}),i.bsEnabled&&e.$watch(i.bsEnabled,function(e,t){c&&angular.isDefined(e)&&(angular.isString(e)&&(e=!!e.match(/true|1|,?(tooltip),?/i)),e===!1?c.setEnabled(!1):c.setEnabled(!0))}),i.viewport&&e.$watch(i.viewport,function(e){c&&angular.isDefined(e)&&c.setViewport(e)});var c=a(t,s);e.$on('$destroy',function(){c&&c.destroy(),s=null,c=null})}}}]),angular.module('mgcrea.ngStrap.typeahead',['mgcrea.ngStrap.tooltip','mgcrea.ngStrap.helpers.parseOptions']).provider('$typeahead',function(){var e=this.defaults={animation:'am-fade',prefixClass:'typeahead',prefixEvent:'$typeahead',placement:'bottom-left',templateUrl:'typeahead/typeahead.tpl.html',trigger:'focus',container:!1,keyboard:!0,html:!1,delay:0,minLength:1,filter:'bsAsyncFilter',limit:6,autoSelect:!1,comparator:'',trimValue:!0};this.$get=['$window','$rootScope','$tooltip','$$rAF','$timeout',function(t,n,a,o,i){function r(t,n,r){var l={},u=angular.extend({},e,r);l=a(t,u);var c=r.scope,d=l.$scope;d.$resetMatches=function(){d.$matches=[],d.$activeIndex=u.autoSelect?0:-1},d.$resetMatches(),d.$activate=function(e){d.$$postDigest(function(){l.activate(e)})},d.$select=function(e,t){d.$$postDigest(function(){l.select(e)})},d.$isVisible=function(){return l.$isVisible()},l.update=function(e){d.$matches=e,d.$activeIndex>=e.length&&(d.$activeIndex=u.autoSelect?0:-1),s(d),o(l.$applyPlacement)},l.activate=function(e){d.$activeIndex=e},l.select=function(e){if(-1!==e){var t=d.$matches[e].value;n.$setViewValue(t),n.$render(),d.$resetMatches(),c&&c.$digest(),d.$emit(u.prefixEvent+'.select',t,e,l)}},l.$isVisible=function(){return u.minLength&&n?d.$matches.length&&angular.isString(n.$viewValue)&&n.$viewValue.length>=u.minLength:!!d.$matches.length},l.$getIndex=function(e){var t=d.$matches.length,n=t;if(t){for(n=t;n--&&d.$matches[n].value!==e;);if(!(0>n))return n}},l.$onMouseDown=function(e){e.preventDefault(),e.stopPropagation()},l.$onKeyDown=function(e){/(38|40|13)/.test(e.keyCode)&&(!l.$isVisible()||13===e.keyCode&&-1===d.$activeIndex||(e.preventDefault(),e.stopPropagation()),13===e.keyCode&&d.$matches.length?l.select(d.$activeIndex):38===e.keyCode&&d.$activeIndex>0?d.$activeIndex--:40===e.keyCode&&d.$activeIndex<d.$matches.length-1?d.$activeIndex++:angular.isUndefined(d.$activeIndex)&&(d.$activeIndex=0),d.$digest())};var f=l.show;l.show=function(){f(),i(function(){l.$element&&l.$element.on('mousedown',l.$onMouseDown),u.keyboard&&t&&t.on('keydown',l.$onKeyDown)},0,!1)};var p=l.hide;return l.hide=function(){l.$element&&l.$element.off('mousedown',l.$onMouseDown),u.keyboard&&t&&t.off('keydown',l.$onKeyDown),u.autoSelect||l.activate(-1),p()},l}function s(e){e.$$phase||e.$root&&e.$root.$$phase||e.$digest()}angular.element(t.document.body);return r.defaults=e,r}]}).filter('bsAsyncFilter',['$filter',function(e){return function(t,n,a){return t&&angular.isFunction(t.then)?t.then(function(t){return e('filter')(t,n,a)}):e('filter')(t,n,a)}}]).directive('bsTypeahead',['$window','$parse','$q','$typeahead','$parseOptions',function(e,t,n,a,o){var i=a.defaults;return{restrict:'EAC',require:'ngModel',link:function(e,t,n,r){var s={scope:e};angular.forEach(['template','templateUrl','controller','controllerAs','placement','container','delay','trigger','keyboard','html','animation','filter','limit','minLength','watchOptions','selectMode','autoSelect','comparator','id','prefixEvent','prefixClass'],function(e){angular.isDefined(n[e])&&(s[e]=n[e])});var l=/^(false|0|)$/i;angular.forEach(['html','container','trimValue'],function(e){angular.isDefined(n[e])&&l.test(n[e])&&(s[e]=!1)}),t.attr('autocomplete')||t.attr('autocomplete','off');var u=s.filter||i.filter,c=s.limit||i.limit,d=s.comparator||i.comparator,f=n.bsOptions;u&&(f+=' | '+u+':$viewValue'),d&&(f+=':'+d),c&&(f+=' | limitTo:'+c);var p=o(f),g=a(t,r,s);if(s.watchOptions){var m=p.$match[7].replace(/\|.+/,'').replace(/\(.*\)/g,'').trim();e.$watchCollection(m,function(t,n){p.valuesFn(e,r).then(function(e){g.update(e),r.$render()})})}e.$watch(n.ngModel,function(t,n){e.$modelValue=t,p.valuesFn(e,r).then(function(e){return s.selectMode&&!e.length&&t.length>0?void r.$setViewValue(r.$viewValue.substring(0,r.$viewValue.length-1)):(e.length>c&&(e=e.slice(0,c)),g.update(e),void r.$render())})}),r.$formatters.push(function(e){var t=p.displayValue(e);return t?t:e&&'object'!=typeof e?e:''}),r.$render=function(){if(r.$isEmpty(r.$viewValue))return t.val('');var e=g.$getIndex(r.$modelValue),n=angular.isDefined(e)?g.$scope.$matches[e].label:r.$viewValue;n=angular.isObject(n)?p.displayValue(n):n;var a=n?n.toString().replace(/<(?:.|\n)*?>/gm,''):'';t.val(s.trimValue===!1?a:a.trim())},e.$on('$destroy',function(){g&&g.destroy(),s=null,g=null})}}}]),angular.module('mgcrea.ngStrap.tab',[]).provider('$tab',function(){var e=this.defaults={animation:'am-fade',template:'tab/tab.tpl.html',navClass:'nav-tabs',activeClass:'active'},t=this.controller=function(t,n,a){var o=this;o.$options=angular.copy(e),angular.forEach(['animation','navClass','activeClass'],function(e){angular.isDefined(a[e])&&(o.$options[e]=a[e])}),t.$navClass=o.$options.navClass,t.$activeClass=o.$options.activeClass,o.$panes=t.$panes=[],o.$activePaneChangeListeners=o.$viewChangeListeners=[],o.$push=function(e){angular.isUndefined(o.$panes.$active)&&t.$setActive(e.name||0),o.$panes.push(e)},o.$remove=function(e){var t,n=o.$panes.indexOf(e),a=o.$panes.$active;t=angular.isString(a)?o.$panes.map(function(e){return e.name}).indexOf(a):o.$panes.$active,o.$panes.splice(n,1),t>n?t--:n===t&&t===o.$panes.length&&t--,t>=0&&t<o.$panes.length?o.$setActive(o.$panes[t].name||t):o.$setActive()},o.$setActive=t.$setActive=function(e){o.$panes.$active=e,o.$activePaneChangeListeners.forEach(function(e){e()})},o.$isActive=t.$isActive=function(e,t){return o.$panes.$active===e.name||o.$panes.$active===t}};this.$get=function(){var n={};return n.defaults=e,n.controller=t,n}}).directive('bsTabs',['$window','$animate','$tab','$parse',function(e,t,n,a){var o=n.defaults;return{require:['?ngModel','bsTabs'],transclude:!0,scope:!0,controller:['$scope','$element','$attrs',n.controller],templateUrl:function(e,t){return t.template||o.template},link:function(e,t,n,o){var i=o[0],r=o[1];if(i&&(r.$activePaneChangeListeners.push(function(){i.$setViewValue(r.$panes.$active)}),i.$formatters.push(function(e){return r.$setActive(e),e})),n.bsActivePane){var s=a(n.bsActivePane);r.$activePaneChangeListeners.push(function(){s.assign(e,r.$panes.$active)}),e.$watch(n.bsActivePane,function(e,t){r.$setActive(e)},!0)}}}}]).directive('bsPane',['$window','$animate','$sce',function(e,t,n){return{require:['^?ngModel','^bsTabs'],scope:!0,link:function(e,a,o,i){function r(){var n=s.$panes.indexOf(e);t[s.$isActive(e,n)?'addClass':'removeClass'](a,s.$options.activeClass)}var s=(i[0],i[1]);a.addClass('tab-pane'),o.$observe('title',function(t,a){e.title=n.trustAsHtml(t)}),e.name=o.name,s.$options.animation&&a.addClass(s.$options.animation),o.$observe('disabled',function(t,n){e.disabled=e.$eval(t)}),s.$push(e),e.$on('$destroy',function(){s.$remove(e)}),s.$activePaneChangeListeners.push(function(){r()}),r()}}}]),angular.module('mgcrea.ngStrap.timepicker',['mgcrea.ngStrap.helpers.dateParser','mgcrea.ngStrap.helpers.dateFormatter','mgcrea.ngStrap.tooltip']).provider('$timepicker',function(){var e=this.defaults={animation:'am-fade',prefixClass:'timepicker',placement:'bottom-left',templateUrl:'timepicker/timepicker.tpl.html',trigger:'focus',container:!1,keyboard:!0,html:!1,delay:0,useNative:!0,timeType:'date',timeFormat:'shortTime',timezone:null,modelTimeFormat:null,autoclose:!1,minTime:-(1/0),maxTime:+(1/0),length:5,hourStep:1,minuteStep:5,secondStep:5,roundDisplay:!1,iconUp:'glyphicon glyphicon-chevron-up',iconDown:'glyphicon glyphicon-chevron-down',arrowBehavior:'pager'};this.$get=['$window','$document','$rootScope','$sce','$dateFormatter','$tooltip','$timeout',function(t,n,a,o,i,r,s){function l(t,n,a){function o(e){var t=6e4*g.minuteStep;return new Date(Math.floor(e.getTime()/t)*t)}function l(e,n){var a=e+n;if(t[0].createTextRange){var o=t[0].createTextRange();o.collapse(!0),o.moveStart('character',e),o.moveEnd('character',a),o.select()}else t[0].setSelectionRange?t[0].setSelectionRange(e,a):angular.isUndefined(t[0].selectionStart)&&(t[0].selectionStart=e,t[0].selectionEnd=a)}function d(){t[0].focus()}var f=r(t,angular.extend({},e,a)),p=a.scope,g=f.$options,m=f.$scope,$=g.lang,h=function(e,t,n){return i.formatDate(e,t,$,n)},v=0,w=g.roundDisplay?o(new Date):new Date,y=n.$dateValue||w,b={hour:y.getHours(),meridian:y.getHours()<12,minute:y.getMinutes(),second:y.getSeconds(),millisecond:y.getMilliseconds()},D=i.getDatetimeFormat(g.timeFormat,$),k=i.hoursFormat(D),S=i.timeSeparator(D),x=i.minutesFormat(D),T=i.secondsFormat(D),C=i.showSeconds(D),E=i.showAM(D);m.$iconUp=g.iconUp,m.$iconDown=g.iconDown,m.$select=function(e,t){f.select(e,t)},m.$moveIndex=function(e,t){f.$moveIndex(e,t)},m.$switchMeridian=function(e){f.switchMeridian(e)},f.update=function(e){angular.isDate(e)&&!isNaN(e.getTime())?(f.$date=e,angular.extend(b,{hour:e.getHours(),minute:e.getMinutes(),second:e.getSeconds(),millisecond:e.getMilliseconds()}),f.$build()):f.$isBuilt||f.$build()},f.select=function(e,t,a){(!n.$dateValue||isNaN(n.$dateValue.getTime()))&&(n.$dateValue=new Date(1970,0,1)),angular.isDate(e)||(e=new Date(e)),0===t?n.$dateValue.setHours(e.getHours()):1===t?n.$dateValue.setMinutes(e.getMinutes()):2===t&&n.$dateValue.setSeconds(e.getSeconds()),n.$setViewValue(angular.copy(n.$dateValue)),n.$render(),g.autoclose&&!a&&s(function(){f.hide(!0)})},f.switchMeridian=function(e){if(n.$dateValue&&!isNaN(n.$dateValue.getTime())){var t=(e||n.$dateValue).getHours();n.$dateValue.setHours(12>t?t+12:t-12),n.$setViewValue(angular.copy(n.$dateValue)),n.$render()}},f.$build=function(){var e,t,n=m.midIndex=parseInt(g.length/2,10),a=[];for(e=0;e<g.length;e++)t=new Date(1970,0,1,b.hour-(n-e)*g.hourStep),a.push({date:t,label:h(t,k),selected:f.$date&&f.$isSelected(t,0),disabled:f.$isDisabled(t,0)});var o,i=[];for(e=0;e<g.length;e++)o=new Date(1970,0,1,0,b.minute-(n-e)*g.minuteStep),i.push({date:o,label:h(o,x),selected:f.$date&&f.$isSelected(o,1),disabled:f.$isDisabled(o,1)});var r,s=[];for(e=0;e<g.length;e++)r=new Date(1970,0,1,0,0,b.second-(n-e)*g.secondStep),s.push({date:r,label:h(r,T),selected:f.$date&&f.$isSelected(r,2),disabled:f.$isDisabled(r,2)});var l=[];for(e=0;e<g.length;e++)C?l.push([a[e],i[e],s[e]]):l.push([a[e],i[e]]);m.rows=l,m.showSeconds=C,m.showAM=E,m.isAM=(f.$date||a[n].date).getHours()<12,m.timeSeparator=S,f.$isBuilt=!0},f.$isSelected=function(e,t){return f.$date?0===t?e.getHours()===f.$date.getHours():1===t?e.getMinutes()===f.$date.getMinutes():2===t?e.getSeconds()===f.$date.getSeconds():void 0:!1},f.$isDisabled=function(e,t){var n;return 0===t?n=e.getTime()+6e4*b.minute+1e3*b.second:1===t?n=e.getTime()+36e5*b.hour+1e3*b.second:2===t&&(n=e.getTime()+36e5*b.hour+6e4*b.minute),n<1*g.minTime||n>1*g.maxTime},m.$arrowAction=function(e,t){'picker'===g.arrowBehavior?f.$setTimeByStep(e,t):f.$moveIndex(e,t)},f.$setTimeByStep=function(e,t){var n=new Date(f.$date||y),a=n.getHours(),o=n.getMinutes(),i=n.getSeconds();0===t?n.setHours(a-parseInt(g.hourStep,10)*e):1===t?n.setMinutes(o-parseInt(g.minuteStep,10)*e):2===t&&n.setSeconds(i-parseInt(g.secondStep,10)*e),f.select(n,t,!0)},f.$moveIndex=function(e,t){var n;0===t?(n=new Date(1970,0,1,b.hour+e*g.length,b.minute,b.second),angular.extend(b,{hour:n.getHours()})):1===t?(n=new Date(1970,0,1,b.hour,b.minute+e*g.length*g.minuteStep,b.second),angular.extend(b,{minute:n.getMinutes()})):2===t&&(n=new Date(1970,0,1,b.hour,b.minute,b.second+e*g.length*g.secondStep),angular.extend(b,{second:n.getSeconds()})),f.$build()},f.$onMouseDown=function(e){if('input'!==e.target.nodeName.toLowerCase()&&e.preventDefault(),e.stopPropagation(),c){var t=angular.element(e.target);'button'!==t[0].nodeName.toLowerCase()&&(t=t.parent()),t.triggerHandler('click')}},f.$onKeyDown=function(e){if(/(38|37|39|40|13)/.test(e.keyCode)&&!e.shiftKey&&!e.altKey){if(e.preventDefault(),e.stopPropagation(),13===e.keyCode)return void f.hide(!0);var t=new Date(f.$date),n=t.getHours(),a=h(t,k).length,o=t.getMinutes(),i=h(t,x).length,r=t.getSeconds(),s=h(t,T).length,u=1,c=/(37|39)/.test(e.keyCode),d=2+1*C+1*E;c&&(37===e.keyCode?v=1>v?d-1:v-1:39===e.keyCode&&(v=d-1>v?v+1:0));var m=[0,a],$=0;38===e.keyCode&&($=-1),40===e.keyCode&&($=1);var w=2===v&&C,y=2===v&&!C||3===v&&C;0===v?(t.setHours(n+$*parseInt(g.hourStep,10)),a=h(t,k).length,m=[0,a]):1===v?(t.setMinutes(o+$*parseInt(g.minuteStep,10)),i=h(t,x).length,m=[a+u,i]):w?(t.setSeconds(r+$*parseInt(g.secondStep,10)),s=h(t,T).length,m=[a+u+i+u,s]):y&&(c||f.switchMeridian(),m=[a+u+i+u+(s+u)*C,2]),f.select(t,v,!0),l(m[0],m[1]),p.$digest()}};var M=f.init;f.init=function(){return u&&g.useNative?(t.prop('type','time'),void t.css('-webkit-appearance','textfield')):(c&&(t.prop('type','text'),t.attr('readonly','true'),t.on('click',d)),void M())};var A=f.destroy;f.destroy=function(){u&&g.useNative&&t.off('click',d),A()};var F=f.show;f.show=function(){!c&&t.attr('readonly')||t.attr('disabled')||(F(),s(function(){f.$element&&f.$element.on(c?'touchstart':'mousedown',f.$onMouseDown),g.keyboard&&t&&t.on('keydown',f.$onKeyDown)},0,!1))};var V=f.hide;return f.hide=function(e){f.$isShown&&(f.$element&&f.$element.off(c?'touchstart':'mousedown',f.$onMouseDown),g.keyboard&&t&&t.off('keydown',f.$onKeyDown),V(e))},f}var u=/(ip(a|o)d|iphone|android)/gi.test(t.navigator.userAgent),c='createTouch'in t.document&&u;return e.lang||(e.lang=i.getDefaultLocale()),l.defaults=e,l}]}).directive('bsTimepicker',['$window','$parse','$q','$dateFormatter','$dateParser','$timepicker',function(e,t,a,o,i,r){var s=r.defaults,l=/(ip(a|o)d|iphone|android)/gi.test(e.navigator.userAgent);return{restrict:'EAC',require:'ngModel',link:function(e,t,a,u){function c(e){if(angular.isDate(e)){var t=isNaN(f.minTime)||new Date(e.getTime()).setFullYear(1970,0,1)>=f.minTime,n=isNaN(f.maxTime)||new Date(e.getTime()).setFullYear(1970,0,1)<=f.maxTime,a=t&&n;u.$setValidity('date',a),u.$setValidity('min',t),u.$setValidity('max',n),a&&(u.$dateValue=e)}}function d(){return!u.$dateValue||isNaN(u.$dateValue.getTime())?'':$(u.$dateValue,f.timeFormat)}var f={scope:e};angular.forEach(['template','templateUrl','controller','controllerAs','placement','container','delay','trigger','keyboard','html','animation','autoclose','timeType','timeFormat','timezone','modelTimeFormat','useNative','hourStep','minuteStep','secondStep','length','arrowBehavior','iconUp','iconDown','roundDisplay','id','prefixClass','prefixEvent'],function(e){angular.isDefined(a[e])&&(f[e]=a[e])});var p=/^(false|0|)$/i;angular.forEach(['html','container','autoclose','useNative','roundDisplay'],function(e){angular.isDefined(a[e])&&p.test(a[e])&&(f[e]=!1)}),a.bsShow&&e.$watch(a.bsShow,function(e,t){g&&angular.isDefined(e)&&(angular.isString(e)&&(e=!!e.match(/true|,?(timepicker),?/i)),e===!0?g.show():g.hide())}),l&&(f.useNative||s.useNative)&&(f.timeFormat='HH:mm');var g=r(t,u,f);f=g.$options;var m=f.lang,$=function(e,t,n){return o.formatDate(e,t,m,n)},h=i({format:f.timeFormat,lang:m});angular.forEach(['minTime','maxTime'],function(e){angular.isDefined(a[e])&&a.$observe(e,function(t){g.$options[e]=h.getTimeForAttribute(e,t),!isNaN(g.$options[e])&&g.$build(),c(u.$dateValue)})}),e.$watch(a.ngModel,function(e,t){g.update(u.$dateValue)},!0),u.$parsers.unshift(function(e){var t;if(!e)return u.$setValidity('date',!0),null;var a=angular.isDate(e)?e:h.parse(e,u.$dateValue);return!a||isNaN(a.getTime())?(u.$setValidity('date',!1),n):(c(a),'string'===f.timeType?(t=h.timezoneOffsetAdjust(a,f.timezone,!0),$(t,f.modelTimeFormat||f.timeFormat)):(t=h.timezoneOffsetAdjust(u.$dateValue,f.timezone,!0),'number'===f.timeType?t.getTime():'unix'===f.timeType?t.getTime()/1e3:'iso'===f.timeType?t.toISOString():new Date(t)))}),u.$formatters.push(function(e){var t;return t=angular.isUndefined(e)||null===e?NaN:angular.isDate(e)?e:'string'===f.timeType?h.parse(e,null,f.modelTimeFormat):'unix'===f.timeType?new Date(1e3*e):new Date(e),u.$dateValue=h.timezoneOffsetAdjust(t,f.timezone),d()}),u.$render=function(){t.val(d())},e.$on('$destroy',function(){g&&g.destroy(),f=null,g=null})}}}]),angular.module('mgcrea.ngStrap.scrollspy',['mgcrea.ngStrap.helpers.debounce','mgcrea.ngStrap.helpers.dimensions']).provider('$scrollspy',function(){var e=this.$$spies={},n=this.defaults={debounce:150,throttle:100,offset:100};this.$get=['$window','$document','$rootScope','dimensions','debounce','throttle',function(a,o,i,r,s,l){function u(e,t){return e[0].nodeName&&e[0].nodeName.toLowerCase()===t.toLowerCase()}function c(o){var c=angular.extend({},n,o);c.element||(c.element=p);var g=u(c.element,'body'),m=g?d:c.element,$=g?'window':c.id;if(e[$])return e[$].$$count++,e[$];var h,v,w,y,b,D,k,S,x={},T=x.$trackedElements=[],C=[];return x.init=function(){this.$$count=1,y=s(this.checkPosition,c.debounce),b=l(this.checkPosition,c.throttle),m.on('click',this.checkPositionWithEventLoop),d.on('resize',y),m.on('scroll',b),D=s(this.checkOffsets,c.debounce),h=i.$on('$viewContentLoaded',D),v=i.$on('$includeContentLoaded',D),D(),$&&(e[$]=x)},x.destroy=function(){this.$$count--,this.$$count>0||(m.off('click',this.checkPositionWithEventLoop),d.off('resize',y),m.off('scroll',b),h(),v(),$&&delete e[$])},x.checkPosition=function(){if(C.length){if(S=(g?a.pageYOffset:m.prop('scrollTop'))||0,k=Math.max(a.innerHeight,f.prop('clientHeight')),S<C[0].offsetTop&&w!==C[0].target)return x.$activateElement(C[0]);for(var e=C.length;e--;)if(!angular.isUndefined(C[e].offsetTop)&&null!==C[e].offsetTop&&w!==C[e].target&&!(S<C[e].offsetTop||C[e+1]&&S>C[e+1].offsetTop))return x.$activateElement(C[e])}},x.checkPositionWithEventLoop=function(){setTimeout(x.checkPosition,1)},x.$activateElement=function(e){if(w){var t=x.$getTrackedElement(w);t&&(t.source.removeClass('active'),u(t.source,'li')&&u(t.source.parent().parent(),'li')&&t.source.parent().parent().removeClass('active'))}w=e.target,e.source.addClass('active'),u(e.source,'li')&&u(e.source.parent().parent(),'li')&&e.source.parent().parent().addClass('active')},x.$getTrackedElement=function(e){return T.filter(function(t){return t.target===e})[0]},x.checkOffsets=function(){angular.forEach(T,function(e){var n=t.querySelector(e.target);e.offsetTop=n?r.offset(n).top:null,c.offset&&null!==e.offsetTop&&(e.offsetTop-=1*c.offset)}),C=T.filter(function(e){return null!==e.offsetTop}).sort(function(e,t){return e.offsetTop-t.offsetTop}),y()},x.trackElement=function(e,t){T.push({target:e,source:t})},x.untrackElement=function(e,t){for(var n,a=T.length;a--;)if(T[a].target===e&&T[a].source===t){n=a;break}T=T.splice(n,1)},x.activate=function(e){T[e].addClass('active')},x.init(),x}var d=angular.element(a),f=angular.element(o.prop('documentElement')),p=angular.element(a.document.body);return c}]}).directive('bsScrollspy',['$rootScope','debounce','dimensions','$scrollspy',function(e,t,n,a){return{restrict:'EAC',link:function(e,t,n){var o={scope:e};angular.forEach(['offset','target'],function(e){angular.isDefined(n[e])&&(o[e]=n[e])});var i=a(o);i.trackElement(o.target,t),e.$on('$destroy',function(){i&&(i.untrackElement(o.target,t),i.destroy()),o=null,i=null})}}}]).directive('bsScrollspyList',['$rootScope','debounce','dimensions','$scrollspy',function(e,t,n,a){return{restrict:'A',compile:function(e,t){var n=e[0].querySelectorAll('li > a[href]');angular.forEach(n,function(e){var t=angular.element(e);t.parent().attr('bs-scrollspy','').attr('data-target',t.attr('href'))})}}}]),angular.module('mgcrea.ngStrap.select',['mgcrea.ngStrap.tooltip','mgcrea.ngStrap.helpers.parseOptions']).provider('$select',function(){var e=this.defaults={animation:'am-fade',prefixClass:'select',prefixEvent:'$select',placement:'bottom-left',templateUrl:'select/select.tpl.html',trigger:'focus',container:!1,keyboard:!0,html:!1,delay:0,multiple:!1,allNoneButtons:!1,sort:!0,caretHtml:'&nbsp;<span class="caret"></span>',placeholder:'Choose among the following...',allText:'All',noneText:'None',maxLength:3,maxLengthHtml:'selected',iconCheckmark:'glyphicon glyphicon-ok'};this.$get=['$window','$document','$rootScope','$tooltip','$timeout',function(t,n,a,o,i){function r(a,r,s){var u={},c=angular.extend({},e,s);u=o(a,c);var d=u.$scope;d.$matches=[],c.multiple?d.$activeIndex=[]:d.$activeIndex=-1,d.$isMultiple=c.multiple,d.$showAllNoneButtons=c.allNoneButtons&&c.multiple,d.$iconCheckmark=c.iconCheckmark,d.$allText=c.allText,d.$noneText=c.noneText,d.$activate=function(e){d.$$postDigest(function(){u.activate(e)})},d.$select=function(e,t){d.$$postDigest(function(){u.select(e)})},d.$isVisible=function(){return u.$isVisible()},d.$isActive=function(e){return u.$isActive(e)},d.$selectAll=function(){for(var e=0;e<d.$matches.length;e++)d.$isActive(e)||d.$select(e)},d.$selectNone=function(){for(var e=0;e<d.$matches.length;e++)d.$isActive(e)&&d.$select(e)},u.update=function(e){d.$matches=e,u.$updateActiveIndex()},u.activate=function(e){return c.multiple?(u.$isActive(e)?d.$activeIndex.splice(d.$activeIndex.indexOf(e),1):d.$activeIndex.push(e),c.sort&&d.$activeIndex.sort(function(e,t){return e-t})):d.$activeIndex=e,d.$activeIndex},u.select=function(e){var t=d.$matches[e].value;d.$apply(function(){u.activate(e),c.multiple?r.$setViewValue(d.$activeIndex.map(function(e){return angular.isUndefined(d.$matches[e])?null:d.$matches[e].value})):(r.$setViewValue(t),u.hide())}),d.$emit(c.prefixEvent+'.select',t,e,u)},u.$updateActiveIndex=function(){c.multiple?angular.isArray(r.$modelValue)?d.$activeIndex=r.$modelValue.map(function(e){return u.$getIndex(e)}):d.$activeIndex=[]:angular.isDefined(r.$modelValue)&&d.$matches.length?d.$activeIndex=u.$getIndex(r.$modelValue):d.$activeIndex=-1;
},u.$isVisible=function(){return c.minLength&&r?d.$matches.length&&r.$viewValue.length>=c.minLength:d.$matches.length},u.$isActive=function(e){return c.multiple?-1!==d.$activeIndex.indexOf(e):d.$activeIndex===e},u.$getIndex=function(e){var t=d.$matches.length,n=t;if(t){for(n=t;n--&&d.$matches[n].value!==e;);if(!(0>n))return n}},u.$onMouseDown=function(e){if(e.preventDefault(),e.stopPropagation(),l){var t=angular.element(e.target);t.triggerHandler('click')}},u.$onKeyDown=function(e){return/(9|13|38|40)/.test(e.keyCode)?(9!==e.keyCode&&(e.preventDefault(),e.stopPropagation()),c.multiple&&9===e.keyCode?u.hide():c.multiple||13!==e.keyCode&&9!==e.keyCode?void(c.multiple||(38===e.keyCode&&d.$activeIndex>0?d.$activeIndex--:38===e.keyCode&&d.$activeIndex<0?d.$activeIndex=d.$matches.length-1:40===e.keyCode&&d.$activeIndex<d.$matches.length-1?d.$activeIndex++:angular.isUndefined(d.$activeIndex)&&(d.$activeIndex=0),d.$digest())):u.select(d.$activeIndex)):void 0},u.$isIE=function(){var e=t.navigator.userAgent;return e.indexOf('MSIE ')>0||e.indexOf('Trident/')>0||e.indexOf('Edge/')>0},u.$selectScrollFix=function(e){'UL'===n[0].activeElement.tagName&&(e.preventDefault(),e.stopImmediatePropagation(),e.target.focus())};var f=u.show;u.show=function(){f(),c.multiple&&u.$element.addClass('select-multiple'),i(function(){u.$element.on(l?'touchstart':'mousedown',u.$onMouseDown),c.keyboard&&a.on('keydown',u.$onKeyDown)},0,!1)};var p=u.hide;return u.hide=function(){!c.multiple&&angular.isUndefined(r.$modelValue)&&(d.$activeIndex=-1),u.$element.off(l?'touchstart':'mousedown',u.$onMouseDown),c.keyboard&&a.off('keydown',u.$onKeyDown),p(!0)},u}var s=(angular.element(t.document.body),/(ip(a|o)d|iphone|android)/gi.test(t.navigator.userAgent)),l='createTouch'in t.document&&s;return r.defaults=e,r}]}).directive('bsSelect',['$window','$parse','$q','$select','$parseOptions',function(e,t,n,a,o){var i=a.defaults;return{restrict:'EAC',require:'ngModel',link:function(e,t,n,r){var s={scope:e,placeholder:i.placeholder};angular.forEach(['template','templateUrl','controller','controllerAs','placement','container','delay','trigger','keyboard','html','animation','placeholder','allNoneButtons','maxLength','maxLengthHtml','allText','noneText','iconCheckmark','autoClose','id','sort','caretHtml','prefixClass','prefixEvent'],function(e){angular.isDefined(n[e])&&(s[e]=n[e])});var l=/^(false|0|)$/i;angular.forEach(['html','container','allNoneButtons','sort'],function(e){angular.isDefined(n[e])&&l.test(n[e])&&(s[e]=!1)});var u=t.attr('data-multiple');if(angular.isDefined(u)&&(l.test(u)?s.multiple=!1:s.multiple=u),'select'===t[0].nodeName.toLowerCase()){var c=t;c.css('display','none'),t=angular.element('<button type="button" class="btn btn-default"></button>'),c.after(t)}var d=o(n.bsOptions),f=a(t,r,s);f.$isIE()&&t[0].addEventListener('blur',f.$selectScrollFix);var p=d.$match[7].replace(/\|.+/,'').trim();e.$watch(p,function(t,n){d.valuesFn(e,r).then(function(e){f.update(e),r.$render()})},!0),e.$watch(n.ngModel,function(e,t){f.$updateActiveIndex(),r.$render()},!0),r.$render=function(){var e,n;s.multiple&&angular.isArray(r.$modelValue)?(e=r.$modelValue.map(function(e){return n=f.$getIndex(e),angular.isDefined(n)?f.$scope.$matches[n].label:!1}).filter(angular.isDefined),e=e.length>(s.maxLength||i.maxLength)?e.length+' '+(s.maxLengthHtml||i.maxLengthHtml):e.join(', ')):(n=f.$getIndex(r.$modelValue),e=angular.isDefined(n)?f.$scope.$matches[n].label:!1),t.html((e?e:s.placeholder)+(s.caretHtml?s.caretHtml:i.caretHtml))},s.multiple&&(r.$isEmpty=function(e){return!e||0===e.length}),e.$on('$destroy',function(){f&&f.destroy(),s=null,f=null})}}}]),angular.module('mgcrea.ngStrap.popover',['mgcrea.ngStrap.tooltip']).provider('$popover',function(){var e=this.defaults={animation:'am-fade',customClass:'',container:!1,target:!1,placement:'right',templateUrl:'popover/popover.tpl.html',contentTemplate:!1,trigger:'click',keyboard:!0,html:!1,title:'',content:'',delay:0,autoClose:!1};this.$get=['$tooltip',function(t){function n(n,a){var o=angular.extend({},e,a),i=t(n,o);return o.content&&(i.$scope.content=o.content),i}return n}]}).directive('bsPopover',['$window','$sce','$popover',function(e,t,n){var a=e.requestAnimationFrame||e.setTimeout;return{restrict:'EAC',scope:!0,link:function(e,o,i){var r={scope:e};angular.forEach(['template','templateUrl','controller','controllerAs','contentTemplate','placement','container','delay','trigger','html','animation','customClass','autoClose','id','prefixClass','prefixEvent'],function(e){angular.isDefined(i[e])&&(r[e]=i[e])});var s=/^(false|0|)$/i;angular.forEach(['html','container','autoClose'],function(e){angular.isDefined(i[e])&&s.test(i[e])&&(r[e]=!1)});var l=o.attr('data-target');angular.isDefined(l)&&(s.test(l)?r.target=!1:r.target=l),angular.forEach(['title','content'],function(n){i[n]&&i.$observe(n,function(o,i){e[n]=t.trustAsHtml(o),angular.isDefined(i)&&a(function(){u&&u.$applyPlacement()})})}),i.bsPopover&&e.$watch(i.bsPopover,function(t,n){angular.isObject(t)?angular.extend(e,t):e.content=t,angular.isDefined(n)&&a(function(){u&&u.$applyPlacement()})},!0),i.bsShow&&e.$watch(i.bsShow,function(e,t){u&&angular.isDefined(e)&&(angular.isString(e)&&(e=!!e.match(/true|,?(popover),?/i)),e===!0?u.show():u.hide())}),i.viewport&&e.$watch(i.viewport,function(e){u&&angular.isDefined(e)&&u.setViewport(e)});var u=n(o,r);e.$on('$destroy',function(){u&&u.destroy(),r=null,u=null})}}}]),angular.version.minor<3&&angular.version.dot<14&&angular.module('ng').factory('$$rAF',['$window','$timeout',function(e,t){var n=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame,a=e.cancelAnimationFrame||e.webkitCancelAnimationFrame||e.mozCancelAnimationFrame||e.webkitCancelRequestAnimationFrame,o=!!n,i=o?function(e){var t=n(e);return function(){a(t)}}:function(e){var n=t(e,16.66,!1);return function(){t.cancel(n)}};return i.supported=o,i}]),angular.module('mgcrea.ngStrap.helpers.parseOptions',[]).provider('$parseOptions',function(){var e=this.defaults={regexp:/^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/};this.$get=['$parse','$q',function(t,n){function a(a,o){function i(e,t){return e.map(function(e,n){var a,o,i={};return i[c]=e,a=u(t,i),o=p(t,i),{label:a,value:o,index:n}})}var r={},s=angular.extend({},e,o);r.$values=[];var l,u,c,d,f,p,g;return r.init=function(){r.$match=l=a.match(s.regexp),u=t(l[2]||l[1]),c=l[4]||l[6],d=l[5],f=t(l[3]||''),p=t(l[2]?l[1]:c),g=t(l[7])},r.valuesFn=function(e,t){return n.when(g(e,t)).then(function(t){return angular.isArray(t)||(t=[]),r.$values=t.length?i(t,e):[],r.$values})},r.displayValue=function(e){var t={};return t[c]=e,u(t)},r.init(),r}return a}]}),angular.module('mgcrea.ngStrap.helpers.dimensions',[]).factory('dimensions',['$document','$window',function(t,n){var a=(angular.element,{}),o=a.nodeName=function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()};a.css=function(t,n,a){var o;return o=t.currentStyle?t.currentStyle[n]:e.getComputedStyle?e.getComputedStyle(t)[n]:t.style[n],a===!0?parseFloat(o)||0:o},a.offset=function(t){var n=t.getBoundingClientRect(),a=t.ownerDocument;return{width:n.width||t.offsetWidth,height:n.height||t.offsetHeight,top:n.top+(e.pageYOffset||a.documentElement.scrollTop)-(a.documentElement.clientTop||0),left:n.left+(e.pageXOffset||a.documentElement.scrollLeft)-(a.documentElement.clientLeft||0)}},a.setOffset=function(e,t,n){var o,i,r,s,l,u,c,d=a.css(e,'position'),f=angular.element(e),p={};'static'===d&&(e.style.position='relative'),l=a.offset(e),r=a.css(e,'top'),u=a.css(e,'left'),c=('absolute'===d||'fixed'===d)&&(r+u).indexOf('auto')>-1,c?(o=a.position(e),s=o.top,i=o.left):(s=parseFloat(r)||0,i=parseFloat(u)||0),angular.isFunction(t)&&(t=t.call(e,n,l)),null!==t.top&&(p.top=t.top-l.top+s),null!==t.left&&(p.left=t.left-l.left+i),'using'in t?t.using.call(f,p):f.css({top:p.top+'px',left:p.left+'px'})},a.position=function(e){var t,n,r={top:0,left:0};return'fixed'===a.css(e,'position')?n=e.getBoundingClientRect():(t=i(e),n=a.offset(e),o(t,'html')||(r=a.offset(t)),r.top+=a.css(t,'borderTopWidth',!0),r.left+=a.css(t,'borderLeftWidth',!0)),{width:e.offsetWidth,height:e.offsetHeight,top:n.top-r.top-a.css(e,'marginTop',!0),left:n.left-r.left-a.css(e,'marginLeft',!0)}};var i=function(e){var t=e.ownerDocument,n=e.offsetParent||t;if(o(n,'#document'))return t.documentElement;for(;n&&!o(n,'html')&&'static'===a.css(n,'position');)n=n.offsetParent;return n||t.documentElement};return a.height=function(e,t){var n=e.offsetHeight;return t?n+=a.css(e,'marginTop',!0)+a.css(e,'marginBottom',!0):n-=a.css(e,'paddingTop',!0)+a.css(e,'paddingBottom',!0)+a.css(e,'borderTopWidth',!0)+a.css(e,'borderBottomWidth',!0),n},a.width=function(e,t){var n=e.offsetWidth;return t?n+=a.css(e,'marginLeft',!0)+a.css(e,'marginRight',!0):n-=a.css(e,'paddingLeft',!0)+a.css(e,'paddingRight',!0)+a.css(e,'borderLeftWidth',!0)+a.css(e,'borderRightWidth',!0),n},a}]),angular.module('mgcrea.ngStrap.helpers.debounce',[]).factory('debounce',['$timeout',function(e){return function(t,n,a){var o=null;return function(){var i=this,r=arguments,s=a&&!o;return o&&e.cancel(o),o=e(function(){o=null,a||t.apply(i,r)},n,!1),s&&t.apply(i,r),o}}}]).factory('throttle',['$timeout',function(e){return function(t,n,a){var o=null;return a||(a={}),function(){var i=this,r=arguments;o||(a.leading!==!1&&t.apply(i,r),o=e(function(){o=null,a.trailing!==!1&&t.apply(i,r)},n,!1))}}}]),angular.module('mgcrea.ngStrap.helpers.dateParser',[]).provider('$dateParser',['$localeProvider',function(e){function t(){this.year=1970,this.month=0,this.day=1,this.hours=0,this.minutes=0,this.seconds=0,this.milliseconds=0}function n(){}function a(e){return!isNaN(parseFloat(e))&&isFinite(e)}function o(e,t){for(var n=e.length,a=t.toString().toLowerCase(),o=0;n>o;o++)if(e[o].toLowerCase()===a)return o;return-1}t.prototype.setMilliseconds=function(e){this.milliseconds=e},t.prototype.setSeconds=function(e){this.seconds=e},t.prototype.setMinutes=function(e){this.minutes=e},t.prototype.setHours=function(e){this.hours=e},t.prototype.getHours=function(){return this.hours},t.prototype.setDate=function(e){this.day=e},t.prototype.setMonth=function(e){this.month=e},t.prototype.setFullYear=function(e){this.year=e},t.prototype.fromDate=function(e){return this.year=e.getFullYear(),this.month=e.getMonth(),this.day=e.getDate(),this.hours=e.getHours(),this.minutes=e.getMinutes(),this.seconds=e.getSeconds(),this.milliseconds=e.getMilliseconds(),this},t.prototype.toDate=function(){return new Date(this.year,this.month,this.day,this.hours,this.minutes,this.seconds,this.milliseconds)};var i=t.prototype,r=this.defaults={format:'shortDate',strict:!1};this.$get=['$locale','dateFilter',function(e,s){var l=function(l){function u(e){var t=c(e);return g(t)}function c(e){var t=d(e),n=t.replace(/''/g,'\\\''),a=/('(?:\\'|.)*?')/,o=n.split(a),i=Object.keys(b),r=[];return angular.forEach(o,function(e){if(f(e))e=p(e);else for(var t=0;t<i.length;t++)e=e.split(i[t]).join('${'+t+'}');r.push(e)}),r.join('')}function d(e){return e.replace(/\\/g,'[\\\\]').replace(/-/g,'[-]').replace(/\./g,'[.]').replace(/\*/g,'[*]').replace(/\+/g,'[+]').replace(/\?/g,'[?]').replace(/\$/g,'[$]').replace(/\^/g,'[^]').replace(/\//g,'[/]').replace(/\\s/g,'[\\s]')}function f(e){return/^'.*'$/.test(e)}function p(e){return e.replace(/^'(.*)'$/,'$1')}function g(e){for(var t=Object.keys(b),n=e,a=0;a<t.length;a++)n=n.split('${'+a+'}').join('('+b[t[a]]+')');return new RegExp('^'+n+'$',['i'])}function m(e){var t=c(e);return $(t)}function $(e){for(var t,n,a,o,i=Object.keys(b),r=new RegExp('\\${(\\d+)}','g'),s=[];null!==(t=r.exec(e));)n=t[1],a=i[n],o=D[a],s.push(o);return s}var h,v,w=angular.extend({},r,l),y={},b={sss:'[0-9]{3}',ss:'[0-5][0-9]',s:w.strict?'[1-5]?[0-9]':'[0-9]|[0-5][0-9]',mm:'[0-5][0-9]',m:w.strict?'[1-5]?[0-9]':'[0-9]|[0-5][0-9]',HH:'[01][0-9]|2[0-3]',H:w.strict?'1?[0-9]|2[0-3]':'[01]?[0-9]|2[0-3]',hh:'[0][1-9]|[1][012]',h:w.strict?'[1-9]|1[012]':'0?[1-9]|1[012]',a:'AM|PM',EEEE:e.DATETIME_FORMATS.DAY.join('|'),EEE:e.DATETIME_FORMATS.SHORTDAY.join('|'),dd:'0[1-9]|[12][0-9]|3[01]',d:w.strict?'[1-9]|[1-2][0-9]|3[01]':'0?[1-9]|[1-2][0-9]|3[01]',MMMM:e.DATETIME_FORMATS.MONTH.join('|'),MMM:e.DATETIME_FORMATS.SHORTMONTH.join('|'),MM:'0[1-9]|1[012]',M:w.strict?'[1-9]|1[012]':'0?[1-9]|1[012]',yyyy:'[1]{1}[0-9]{3}|[2]{1}[0-9]{3}',yy:'[0-9]{2}',y:w.strict?'-?(0|[1-9][0-9]{0,3})':'-?0*[0-9]{1,4}'},D={sss:i.setMilliseconds,ss:i.setSeconds,s:i.setSeconds,mm:i.setMinutes,m:i.setMinutes,HH:i.setHours,H:i.setHours,hh:i.setHours,h:i.setHours,EEEE:n,EEE:n,dd:i.setDate,d:i.setDate,a:function(e){var t=this.getHours()%12;return this.setHours(e.match(/pm/i)?t+12:t)},MMMM:function(t){return this.setMonth(o(e.DATETIME_FORMATS.MONTH,t))},MMM:function(t){return this.setMonth(o(e.DATETIME_FORMATS.SHORTMONTH,t))},MM:function(e){return this.setMonth(1*e-1)},M:function(e){return this.setMonth(1*e-1)},yyyy:i.setFullYear,yy:function(e){return this.setFullYear(2e3+1*e)},y:function(e){return 50>=1*e&&2===e.length?this.setFullYear(2e3+1*e):this.setFullYear(1*e)}};return y.init=function(){y.$format=e.DATETIME_FORMATS[w.format]||w.format,h=u(y.$format),v=m(y.$format)},y.isValid=function(e){return angular.isDate(e)?!isNaN(e.getTime()):h.test(e)},y.parse=function(n,a,o,i){o&&(o=e.DATETIME_FORMATS[o]||o),angular.isDate(n)&&(n=s(n,o||y.$format,i));var r=o?u(o):h,l=o?m(o):v,c=r.exec(n);if(!c)return!1;for(var d=a&&!isNaN(a.getTime())?(new t).fromDate(a):(new t).fromDate(new Date(1970,0,1,0)),f=0;f<c.length-1;f++)l[f]&&l[f].call(d,c[f+1]);var p=d.toDate();return parseInt(d.day,10)!==p.getDate()?!1:p},y.getDateForAttribute=function(e,t){var n;if('today'===t){var o=new Date;n=new Date(o.getFullYear(),o.getMonth(),o.getDate()+('maxDate'===e?1:0),0,0,0,'minDate'===e?0:-1)}else n=angular.isString(t)&&t.match(/^".+"$/)?new Date(t.substr(1,t.length-2)):a(t)?new Date(parseInt(t,10)):angular.isString(t)&&0===t.length?'minDate'===e?-(1/0):+(1/0):new Date(t);return n},y.getTimeForAttribute=function(e,t){var n;return n='now'===t?(new Date).setFullYear(1970,0,1):angular.isString(t)&&t.match(/^".+"$/)?new Date(t.substr(1,t.length-2)).setFullYear(1970,0,1):a(t)?new Date(parseInt(t,10)).setFullYear(1970,0,1):angular.isString(t)&&0===t.length?'minTime'===e?-(1/0):+(1/0):y.parse(t,new Date(1970,0,1,0))},y.daylightSavingAdjust=function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},y.timezoneOffsetAdjust=function(e,t,n){return e?(t&&'UTC'===t&&(e=new Date(e.getTime()),e.setMinutes(e.getMinutes()+(n?-1:1)*e.getTimezoneOffset())),e):null},y.init(),y};return l}]}]),angular.module('mgcrea.ngStrap.helpers.dateFormatter',[]).service('$dateFormatter',['$locale','dateFilter',function(e,t){function n(e){return/(h+)([:\.])?(m+)([:\.])?(s*)[ ]?(a?)/i.exec(e).slice(1)}this.getDefaultLocale=function(){return e.id},this.getDatetimeFormat=function(t,n){return e.DATETIME_FORMATS[t]||t},this.weekdaysShort=function(t){return e.DATETIME_FORMATS.SHORTDAY},this.hoursFormat=function(e){return n(e)[0]},this.minutesFormat=function(e){return n(e)[2]},this.secondsFormat=function(e){return n(e)[4]},this.timeSeparator=function(e){return n(e)[1]},this.showSeconds=function(e){return!!n(e)[4]},this.showAM=function(e){return!!n(e)[5]},this.formatDate=function(e,n,a,o){return t(e,n,o)}}]),angular.module('mgcrea.ngStrap.core',[]).service('$bsCompiler',a),a.$inject=['$q','$http','$injector','$compile','$controller','$templateCache'],angular.module('mgcrea.ngStrap.navbar',[]).provider('$navbar',function(){var e=this.defaults={activeClass:'active',routeAttr:'data-match-route',strict:!1};this.$get=function(){return{defaults:e}}}).directive('bsNavbar',['$window','$location','$navbar',function(e,t,n){var a=n.defaults;return{restrict:'A',link:function(e,n,o,i){var r=angular.copy(a);angular.forEach(Object.keys(a),function(e){angular.isDefined(o[e])&&(r[e]=o[e])}),e.$watch(function(){return t.path()},function(e,t){var a=n[0].querySelectorAll('li['+r.routeAttr+']');angular.forEach(a,function(t){var n=angular.element(t),a=n.attr(r.routeAttr).replace('/','\\/');r.strict&&(a='^'+a+'$');var o=new RegExp(a,'i');o.test(e)?n.addClass(r.activeClass):n.removeClass(r.activeClass)})})}}}]),angular.module('mgcrea.ngStrap.modal',['mgcrea.ngStrap.core','mgcrea.ngStrap.helpers.dimensions']).provider('$modal',function(){var e=this.defaults={animation:'am-fade',backdropAnimation:'am-fade',prefixClass:'modal',prefixEvent:'modal',placement:'top',templateUrl:'modal/modal.tpl.html',template:'',contentTemplate:!1,container:!1,element:null,backdrop:!0,keyboard:!0,html:!1,show:!0};this.$get=['$window','$rootScope','$bsCompiler','$animate','$timeout','$sce','dimensions',function(n,a,o,i,r,s,l){function u(t){function n(){T.$emit(S.prefixEvent+'.show',k)}function r(){T.$emit(S.prefixEvent+'.hide',k),g.removeClass(S.prefixClass+'-open'),S.animation&&g.removeClass(S.prefixClass+'-with-'+S.animation)}function l(){S.backdrop&&(E.on('click',y),A.on('click',y),A.on('wheel',b))}function u(){S.backdrop&&(E.off('click',y),A.off('click',y),A.off('wheel',b))}function v(){S.keyboard&&E.on('keyup',k.$onKeyUp)}function w(){S.keyboard&&E.off('keyup',k.$onKeyUp)}function y(e){e.target===e.currentTarget&&('static'===S.backdrop?k.focus():k.hide())}function b(e){e.preventDefault()}function D(){k.$isShown&&null!==E&&(u(),w()),M&&(M.$destroy(),M=null),E&&(E.remove(),E=k.$element=null)}var k={},S=k.$options=angular.extend({},e,t),x=k.$promise=o.compile(S),T=k.$scope=S.scope&&S.scope.$new()||a.$new();S.element||S.container||(S.container='body'),k.$id=S.id||S.element&&S.element.attr('id')||'',f(['title','content'],function(e){S[e]&&(T[e]=s.trustAsHtml(S[e]))}),T.$hide=function(){T.$$postDigest(function(){k.hide()})},T.$show=function(){T.$$postDigest(function(){k.show()})},T.$toggle=function(){T.$$postDigest(function(){k.toggle()})},k.$isShown=T.$isShown=!1;var C,E,M,A=angular.element('<div class="'+S.prefixClass+'-backdrop"/>');return A.css({position:'fixed',top:'0px',left:'0px',bottom:'0px',right:'0px'}),x.then(function(e){C=e,k.init()}),k.init=function(){S.show&&T.$$postDigest(function(){k.show()})},k.destroy=function(){D(),A&&(A.remove(),A=null),T.$destroy()},k.show=function(){if(!k.$isShown){var e,t;if(angular.isElement(S.container)?(e=S.container,t=S.container[0].lastChild?angular.element(S.container[0].lastChild):null):S.container?(e=d(S.container),t=e[0]&&e[0].lastChild?angular.element(e[0].lastChild):null):(e=null,t=S.element),E&&D(),M=k.$scope.$new(),E=k.$element=C.link(M,function(e,t){}),S.backdrop&&(E.css({'z-index':$+20*m}),A.css({'z-index':h+20*m}),m++),!T.$emit(S.prefixEvent+'.show.before',k).defaultPrevented){E.css({display:'block'}).addClass(S.placement),S.animation&&(S.backdrop&&A.addClass(S.backdropAnimation),E.addClass(S.animation)),S.backdrop&&i.enter(A,g,null),angular.version.minor<=2?i.enter(E,e,t,n):i.enter(E,e,t).then(n),k.$isShown=T.$isShown=!0,c(T);var a=E[0];p(function(){a.focus()}),g.addClass(S.prefixClass+'-open'),S.animation&&g.addClass(S.prefixClass+'-with-'+S.animation),l(),v()}}},k.hide=function(){k.$isShown&&(S.backdrop&&m--,T.$emit(S.prefixEvent+'.hide.before',k).defaultPrevented||(angular.version.minor<=2?i.leave(E,r):i.leave(E).then(r),S.backdrop&&i.leave(A),k.$isShown=T.$isShown=!1,c(T),u(),w()))},k.toggle=function(){k.$isShown?k.hide():k.show()},k.focus=function(){E[0].focus()},k.$onKeyUp=function(e){27===e.which&&k.$isShown&&(k.hide(),e.stopPropagation())},k}function c(e){e.$$phase||e.$root&&e.$root.$$phase||e.$digest()}function d(e,n){return angular.element((n||t).querySelectorAll(e))}var f=angular.forEach,p=(String.prototype.trim,n.requestAnimationFrame||n.setTimeout),g=angular.element(n.document.body),m=0,$=1050,h=1040;return u}]}).directive('bsModal',['$window','$sce','$modal',function(e,t,n){return{restrict:'EAC',scope:!0,link:function(e,a,o,i){var r={scope:e,element:a,show:!1};angular.forEach(['template','templateUrl','controller','controllerAs','contentTemplate','placement','backdrop','keyboard','html','container','animation','backdropAnimation','id','prefixEvent','prefixClass'],function(e){angular.isDefined(o[e])&&(r[e]=o[e])});var s=/^(false|0|)$/i;angular.forEach(['backdrop','keyboard','html','container'],function(e){angular.isDefined(o[e])&&s.test(o[e])&&(r[e]=!1)}),angular.forEach(['title','content'],function(n){o[n]&&o.$observe(n,function(a,o){e[n]=t.trustAsHtml(a)})}),o.bsModal&&e.$watch(o.bsModal,function(t,n){angular.isObject(t)?angular.extend(e,t):e.content=t},!0);var l=n(r);a.on(o.trigger||'click',l.toggle),e.$on('$destroy',function(){l&&l.destroy(),r=null,l=null})}}}]),angular.module('mgcrea.ngStrap.dropdown',['mgcrea.ngStrap.tooltip']).provider('$dropdown',function(){var e=this.defaults={animation:'am-fade',prefixClass:'dropdown',prefixEvent:'dropdown',placement:'bottom-left',templateUrl:'dropdown/dropdown.tpl.html',trigger:'click',container:!1,keyboard:!0,html:!1,delay:0};this.$get=['$window','$rootScope','$tooltip','$timeout',function(t,n,a,o){function i(t,i){function l(e){return e.target!==t[0]?e.target!==t[0]&&u.hide():void 0}var u={},c=angular.extend({},e,i);u.$scope=c.scope&&c.scope.$new()||n.$new();u=a(t,c);var d=t.parent();u.$onKeyDown=function(e){if(/(38|40)/.test(e.keyCode)){e.preventDefault(),e.stopPropagation();var t=angular.element(u.$element[0].querySelectorAll('li:not(.divider) a'));if(t.length){var n;angular.forEach(t,function(e,t){s&&s.call(e,':focus')&&(n=t)}),38===e.keyCode&&n>0?n--:40===e.keyCode&&n<t.length-1?n++:angular.isUndefined(n)&&(n=0),t.eq(n)[0].focus()}}};var f=u.show;u.show=function(){f(),o(function(){c.keyboard&&u.$element&&u.$element.on('keydown',u.$onKeyDown),r.on('click',l)},0,!1),d.hasClass('dropdown')&&d.addClass('open')};var p=u.hide;u.hide=function(){u.$isShown&&(c.keyboard&&u.$element&&u.$element.off('keydown',u.$onKeyDown),r.off('click',l),d.hasClass('dropdown')&&d.removeClass('open'),p())};var g=u.destroy;return u.destroy=function(){r.off('click',l),g()},u}var r=angular.element(t.document.body),s=Element.prototype.matchesSelector||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector;return i}]}).directive('bsDropdown',['$window','$sce','$dropdown',function(e,t,a){return{restrict:'EAC',scope:!0,compile:function(e,t){if(!t.bsDropdown){for(var o=e[0].nextSibling;o&&1!==o.nodeType;)o=o.nextSibling;o.classList.contains('dropdown-menu')&&(t.template=o.outerHTML,t.templateUrl=n,o.parentNode.removeChild(o))}return function(e,n,o){var i={scope:e};angular.forEach(['template','templateUrl','controller','controllerAs','placement','container','delay','trigger','keyboard','html','animation','id','autoClose'],function(e){angular.isDefined(t[e])&&(i[e]=t[e])});var r=/^(false|0|)$/i;angular.forEach(['html','container'],function(e){angular.isDefined(o[e])&&r.test(o[e])&&(i[e]=!1)}),o.bsDropdown&&e.$watch(o.bsDropdown,function(t,n){e.content=t},!0),o.bsShow&&e.$watch(o.bsShow,function(e,t){s&&angular.isDefined(e)&&(angular.isString(e)&&(e=!!e.match(/true|,?(dropdown),?/i)),e===!0?s.show():s.hide())});var s=a(n,i);e.$on('$destroy',function(){s&&s.destroy(),i=null,s=null})}}}}]),angular.module('mgcrea.ngStrap.aside',['mgcrea.ngStrap.modal']).provider('$aside',function(){var e=this.defaults={animation:'am-fade-and-slide-right',prefixClass:'aside',prefixEvent:'aside',placement:'right',templateUrl:'aside/aside.tpl.html',contentTemplate:!1,container:!1,element:null,backdrop:!0,keyboard:!0,html:!1,show:!0};this.$get=['$modal',function(t){function n(n){var a={},o=angular.extend({},e,n);return a=t(o)}return n}]}).directive('bsAside',['$window','$sce','$aside',function(e,t,n){e.requestAnimationFrame||e.setTimeout;return{restrict:'EAC',scope:!0,link:function(e,a,o,i){var r={scope:e,element:a,show:!1};angular.forEach(['template','templateUrl','controller','controllerAs','contentTemplate','placement','backdrop','keyboard','html','container','animation'],function(e){angular.isDefined(o[e])&&(r[e]=o[e])});var s=/^(false|0|)$/i;angular.forEach(['backdrop','keyboard','html','container'],function(e){angular.isDefined(o[e])&&s.test(o[e])&&(r[e]=!1)}),angular.forEach(['title','content'],function(n){o[n]&&o.$observe(n,function(a,o){e[n]=t.trustAsHtml(a)})}),o.bsAside&&e.$watch(o.bsAside,function(t,n){angular.isObject(t)?angular.extend(e,t):e.content=t},!0);var l=n(r);a.on(o.trigger||'click',l.toggle),e.$on('$destroy',function(){l&&l.destroy(),r=null,l=null})}}}]),angular.module('mgcrea.ngStrap.datepicker',['mgcrea.ngStrap.helpers.dateParser','mgcrea.ngStrap.helpers.dateFormatter','mgcrea.ngStrap.tooltip']).provider('$datepicker',function(){var e=this.defaults={animation:'am-fade',prefixClass:'datepicker',placement:'bottom-left',templateUrl:'datepicker/datepicker.tpl.html',trigger:'focus',container:!1,keyboard:!0,html:!1,delay:0,useNative:!1,dateType:'date',dateFormat:'shortDate',timezone:null,modelDateFormat:null,dayFormat:'dd',monthFormat:'MMM',yearFormat:'yyyy',monthTitleFormat:'MMMM yyyy',yearTitleFormat:'yyyy',strictFormat:!1,autoclose:!1,minDate:-(1/0),maxDate:+(1/0),startView:0,minView:0,startWeek:0,daysOfWeekDisabled:'',iconLeft:'glyphicon glyphicon-chevron-left',iconRight:'glyphicon glyphicon-chevron-right'};this.$get=['$window','$document','$rootScope','$sce','$dateFormatter','datepickerViews','$tooltip','$timeout',function(t,n,a,o,i,r,s,l){function u(t,n,a){function o(e){e.selected=u.$isSelected(e.date)}function i(){t[0].focus()}var u=s(t,angular.extend({},e,a)),f=a.scope,p=u.$options,g=u.$scope;p.startView&&(p.startView-=p.minView);var m=r(u);u.$views=m.views;var $=m.viewDate;g.$mode=p.startView,g.$iconLeft=p.iconLeft,g.$iconRight=p.iconRight;var h=u.$views[g.$mode];g.$select=function(e){u.select(e)},g.$selectPane=function(e){u.$selectPane(e)},g.$toggleMode=function(){u.setMode((g.$mode+1)%u.$views.length)},u.update=function(e){angular.isDate(e)&&!isNaN(e.getTime())&&(u.$date=e,h.update.call(h,e)),u.$build(!0)},u.updateDisabledDates=function(e){p.disabledDateRanges=e;for(var t=0,n=g.rows.length;n>t;t++)angular.forEach(g.rows[t],u.$setDisabledEl)},u.select=function(e,t){angular.isDate(n.$dateValue)||(n.$dateValue=new Date(e)),!g.$mode||t?(n.$setViewValue(angular.copy(e)),n.$render(),p.autoclose&&!t&&l(function(){u.hide(!0)})):(angular.extend($,{year:e.getFullYear(),month:e.getMonth(),date:e.getDate()}),u.setMode(g.$mode-1),u.$build())},u.setMode=function(e){g.$mode=e,h=u.$views[g.$mode],u.$build()},u.$build=function(e){e===!0&&h.built||(e!==!1||h.built)&&h.build.call(h)},u.$updateSelected=function(){for(var e=0,t=g.rows.length;t>e;e++)angular.forEach(g.rows[e],o)},u.$isSelected=function(e){return h.isSelected(e)},u.$setDisabledEl=function(e){e.disabled=h.isDisabled(e.date)},u.$selectPane=function(e){var t=h.steps,n=new Date(Date.UTC($.year+(t.year||0)*e,$.month+(t.month||0)*e,1));angular.extend($,{year:n.getUTCFullYear(),month:n.getUTCMonth(),date:n.getUTCDate()}),u.$build()},u.$onMouseDown=function(e){if(e.preventDefault(),e.stopPropagation(),d){var t=angular.element(e.target);'button'!==t[0].nodeName.toLowerCase()&&(t=t.parent()),t.triggerHandler('click')}},u.$onKeyDown=function(e){if(/(38|37|39|40|13)/.test(e.keyCode)&&!e.shiftKey&&!e.altKey){if(e.preventDefault(),e.stopPropagation(),13===e.keyCode)return void(g.$mode?g.$apply(function(){u.setMode(g.$mode-1)}):u.hide(!0));h.onKeyDown(e),f.$digest()}};var v=u.init;u.init=function(){return c&&p.useNative?(t.prop('type','date'),void t.css('-webkit-appearance','textfield')):(d&&(t.prop('type','text'),t.attr('readonly','true'),t.on('click',i)),void v())};var w=u.destroy;u.destroy=function(){c&&p.useNative&&t.off('click',i),w()};var y=u.show;u.show=function(){!d&&t.attr('readonly')||t.attr('disabled')||(y(),l(function(){u.$isShown&&(u.$element.on(d?'touchstart':'mousedown',u.$onMouseDown),p.keyboard&&t.on('keydown',u.$onKeyDown))},0,!1))};var b=u.hide;return u.hide=function(e){u.$isShown&&(u.$element.off(d?'touchstart':'mousedown',u.$onMouseDown),p.keyboard&&t.off('keydown',u.$onKeyDown),b(e))},u}var c=/(ip(a|o)d|iphone|android)/gi.test(t.navigator.userAgent),d='createTouch'in t.document&&c;return e.lang||(e.lang=i.getDefaultLocale()),u.defaults=e,u}]}).directive('bsDatepicker',['$window','$parse','$q','$dateFormatter','$dateParser','$datepicker',function(e,t,n,a,o,i){var r=(i.defaults,/(ip(a|o)d|iphone|android)/gi.test(e.navigator.userAgent));return{restrict:'EAC',require:'ngModel',link:function(e,t,n,s){function l(e){return e&&e.length?e:null}function u(e){if(angular.isDate(e)){var t=isNaN(p.$options.minDate)||e.getTime()>=p.$options.minDate,n=isNaN(p.$options.maxDate)||e.getTime()<=p.$options.maxDate,a=t&&n;s.$setValidity('date',a),s.$setValidity('min',t),s.$setValidity('max',n),a&&(s.$dateValue=e)}}function c(){return!s.$dateValue||isNaN(s.$dateValue.getTime())?'':m(s.$dateValue,d.dateFormat)}var d={scope:e};angular.forEach(['template','templateUrl','controller','controllerAs','placement','container','delay','trigger','html','animation','autoclose','dateType','dateFormat','timezone','modelDateFormat','dayFormat','strictFormat','startWeek','startDate','useNative','lang','startView','minView','iconLeft','iconRight','daysOfWeekDisabled','id','prefixClass','prefixEvent'],function(e){angular.isDefined(n[e])&&(d[e]=n[e])});var f=/^(false|0|)$/i;angular.forEach(['html','container','autoclose','useNative'],function(e){angular.isDefined(n[e])&&f.test(n[e])&&(d[e]=!1)});var p=i(t,s,d);d=p.$options,r&&d.useNative&&(d.dateFormat='yyyy-MM-dd');var g=d.lang,m=function(e,t){return a.formatDate(e,t,g)},$=o({format:d.dateFormat,lang:g,strict:d.strictFormat});n.bsShow&&e.$watch(n.bsShow,function(e,t){p&&angular.isDefined(e)&&(angular.isString(e)&&(e=!!e.match(/true|,?(datepicker),?/i)),e===!0?p.show():p.hide())}),angular.forEach(['minDate','maxDate'],function(e){angular.isDefined(n[e])&&n.$observe(e,function(t){p.$options[e]=$.getDateForAttribute(e,t),!isNaN(p.$options[e])&&p.$build(!1),u(s.$dateValue)})}),angular.isDefined(n.dateFormat)&&n.$observe('dateFormat',function(e){p.$options.dateFormat=e}),e.$watch(n.ngModel,function(e,t){p.update(s.$dateValue)},!0),angular.isDefined(n.disabledDates)&&e.$watch(n.disabledDates,function(e,t){e=l(e),t=l(t),e&&p.updateDisabledDates(e)}),s.$parsers.unshift(function(e){var t;if(!e)return s.$setValidity('date',!0),null;var n=$.parse(e,s.$dateValue);return!n||isNaN(n.getTime())?void s.$setValidity('date',!1):(u(n),'string'===d.dateType?(t=$.timezoneOffsetAdjust(n,d.timezone,!0),m(t,d.modelDateFormat||d.dateFormat)):(t=$.timezoneOffsetAdjust(s.$dateValue,d.timezone,!0),'number'===d.dateType?t.getTime():'unix'===d.dateType?t.getTime()/1e3:'iso'===d.dateType?t.toISOString():new Date(t)))}),s.$formatters.push(function(e){var t;return t=angular.isUndefined(e)||null===e?NaN:angular.isDate(e)?e:'string'===d.dateType?$.parse(e,null,d.modelDateFormat):'unix'===d.dateType?new Date(1e3*e):new Date(e),s.$dateValue=$.timezoneOffsetAdjust(t,d.timezone),c()}),s.$render=function(){t.val(c())},e.$on('$destroy',function(){p&&p.destroy(),d=null,p=null})}}}]).provider('datepickerViews',function(){function e(e,t){for(var n=[];e.length>0;)n.push(e.splice(0,t));return n}function t(e,t){return(e%t+t)%t}this.defaults={dayFormat:'dd',daySplit:7};this.$get=['$dateFormatter','$dateParser','$sce',function(n,a,o){return function(i){var r=i.$scope,s=i.$options,l=s.lang,u=function(e,t){return n.formatDate(e,t,l)},c=a({format:s.dateFormat,lang:l,strict:s.strictFormat}),d=n.weekdaysShort(l),f=d.slice(s.startWeek).concat(d.slice(0,s.startWeek)),p=o.trustAsHtml('<th class="dow text-center">'+f.join('</th><th class="dow text-center">')+'</th>'),g=i.$date||(s.startDate?c.getDateForAttribute('startDate',s.startDate):new Date),m={year:g.getFullYear(),month:g.getMonth(),date:g.getDate()},$=[{format:s.dayFormat,split:7,steps:{month:1},update:function(e,t){!this.built||t||e.getFullYear()!==m.year||e.getMonth()!==m.month?(angular.extend(m,{
year:i.$date.getFullYear(),month:i.$date.getMonth(),date:i.$date.getDate()}),i.$build()):(e.getDate()!==m.date||1===e.getDate())&&(m.date=i.$date.getDate(),i.$updateSelected())},build:function(){var n=new Date(m.year,m.month,1),a=n.getTimezoneOffset(),o=new Date(+n-864e5*t(n.getDay()-s.startWeek,7)),l=o.getTimezoneOffset(),d=c.timezoneOffsetAdjust(new Date,s.timezone).toDateString();l!==a&&(o=new Date(+o+6e4*(l-a)));for(var f,g=[],$=0;42>$;$++)f=c.daylightSavingAdjust(new Date(o.getFullYear(),o.getMonth(),o.getDate()+$)),g.push({date:f,isToday:f.toDateString()===d,label:u(f,this.format),selected:i.$date&&this.isSelected(f),muted:f.getMonth()!==m.month,disabled:this.isDisabled(f)});r.title=u(n,s.monthTitleFormat),r.showLabels=!0,r.labels=p,r.rows=e(g,this.split),this.built=!0},isSelected:function(e){return i.$date&&e.getFullYear()===i.$date.getFullYear()&&e.getMonth()===i.$date.getMonth()&&e.getDate()===i.$date.getDate()},isDisabled:function(e){var t=e.getTime();if(t<s.minDate||t>s.maxDate)return!0;if(-1!==s.daysOfWeekDisabled.indexOf(e.getDay()))return!0;if(s.disabledDateRanges)for(var n=0;n<s.disabledDateRanges.length;n++)if(t>=s.disabledDateRanges[n].start&&t<=s.disabledDateRanges[n].end)return!0;return!1},onKeyDown:function(e){if(i.$date){var t,n=i.$date.getTime();37===e.keyCode?t=new Date(n-864e5):38===e.keyCode?t=new Date(n-6048e5):39===e.keyCode?t=new Date(n+864e5):40===e.keyCode&&(t=new Date(n+6048e5)),this.isDisabled(t)||i.select(t,!0)}}},{name:'month',format:s.monthFormat,split:4,steps:{year:1},update:function(e,t){this.built&&e.getFullYear()===m.year?e.getMonth()!==m.month&&(angular.extend(m,{month:i.$date.getMonth(),date:i.$date.getDate()}),i.$updateSelected()):(angular.extend(m,{year:i.$date.getFullYear(),month:i.$date.getMonth(),date:i.$date.getDate()}),i.$build())},build:function(){for(var t,n=(new Date(m.year,0,1),[]),a=0;12>a;a++)t=new Date(m.year,a,1),n.push({date:t,label:u(t,this.format),selected:i.$isSelected(t),disabled:this.isDisabled(t)});r.title=u(t,s.yearTitleFormat),r.showLabels=!1,r.rows=e(n,this.split),this.built=!0},isSelected:function(e){return i.$date&&e.getFullYear()===i.$date.getFullYear()&&e.getMonth()===i.$date.getMonth()},isDisabled:function(e){var t=+new Date(e.getFullYear(),e.getMonth()+1,0);return t<s.minDate||e.getTime()>s.maxDate},onKeyDown:function(e){if(i.$date){var t=i.$date.getMonth(),n=new Date(i.$date);37===e.keyCode?n.setMonth(t-1):38===e.keyCode?n.setMonth(t-4):39===e.keyCode?n.setMonth(t+1):40===e.keyCode&&n.setMonth(t+4),this.isDisabled(n)||i.select(n,!0)}}},{name:'year',format:s.yearFormat,split:4,steps:{year:12},update:function(e,t){!this.built||t||parseInt(e.getFullYear()/20,10)!==parseInt(m.year/20,10)?(angular.extend(m,{year:i.$date.getFullYear(),month:i.$date.getMonth(),date:i.$date.getDate()}),i.$build()):e.getFullYear()!==m.year&&(angular.extend(m,{year:i.$date.getFullYear(),month:i.$date.getMonth(),date:i.$date.getDate()}),i.$updateSelected())},build:function(){for(var t,n=m.year-m.year%(3*this.split),a=[],o=0;12>o;o++)t=new Date(n+o,0,1),a.push({date:t,label:u(t,this.format),selected:i.$isSelected(t),disabled:this.isDisabled(t)});r.title=a[0].label+'-'+a[a.length-1].label,r.showLabels=!1,r.rows=e(a,this.split),this.built=!0},isSelected:function(e){return i.$date&&e.getFullYear()===i.$date.getFullYear()},isDisabled:function(e){var t=+new Date(e.getFullYear()+1,0,0);return t<s.minDate||e.getTime()>s.maxDate},onKeyDown:function(e){if(i.$date){var t=i.$date.getFullYear(),n=new Date(i.$date);37===e.keyCode?n.setYear(t-1):38===e.keyCode?n.setYear(t-4):39===e.keyCode?n.setYear(t+1):40===e.keyCode&&n.setYear(t+4),this.isDisabled(n)||i.select(n,!0)}}}];return{views:s.minView?Array.prototype.slice.call($,s.minView):$,viewDate:m}}}]}),angular.module('mgcrea.ngStrap.collapse',[]).provider('$collapse',function(){var e=this.defaults={animation:'am-collapse',disallowToggle:!1,activeClass:'in',startCollapsed:!1,allowMultiple:!1},t=this.controller=function(t,n,a){function o(e){for(var t=l.$targets.$active,n=0;n<t.length;n++)e<t[n]&&(t[n]=t[n]-1),t[n]===l.$targets.length&&(t[n]=l.$targets.length-1)}function i(e){var t=l.$targets.$active;return-1===t.indexOf(e)?!1:!0}function r(e){var t=l.$targets.$active.indexOf(e);-1!==t&&l.$targets.$active.splice(t,1)}function s(e){l.$options.allowMultiple||l.$targets.$active.splice(0,1),-1===l.$targets.$active.indexOf(e)&&l.$targets.$active.push(e)}var l=this;l.$options=angular.copy(e),angular.forEach(['animation','disallowToggle','activeClass','startCollapsed','allowMultiple'],function(e){angular.isDefined(a[e])&&(l.$options[e]=a[e])});var u=/^(false|0|)$/i;angular.forEach(['disallowToggle','startCollapsed','allowMultiple'],function(e){angular.isDefined(a[e])&&u.test(a[e])&&(l.$options[e]=!1)}),l.$toggles=[],l.$targets=[],l.$viewChangeListeners=[],l.$registerToggle=function(e){l.$toggles.push(e)},l.$registerTarget=function(e){l.$targets.push(e)},l.$unregisterToggle=function(e){var t=l.$toggles.indexOf(e);l.$toggles.splice(t,1)},l.$unregisterTarget=function(e){var t=l.$targets.indexOf(e);l.$targets.splice(t,1),l.$options.allowMultiple&&r(e),o(t),l.$viewChangeListeners.forEach(function(e){e()})},l.$targets.$active=l.$options.startCollapsed?[]:[0],l.$setActive=t.$setActive=function(e){angular.isArray(e)?l.$targets.$active=e:l.$options.disallowToggle?s(e):i(e)?r(e):s(e),l.$viewChangeListeners.forEach(function(e){e()})},l.$activeIndexes=function(){return l.$options.allowMultiple?l.$targets.$active:1===l.$targets.$active.length?l.$targets.$active[0]:-1}};this.$get=function(){var n={};return n.defaults=e,n.controller=t,n}}).directive('bsCollapse',['$window','$animate','$collapse',function(e,t,n){n.defaults;return{require:['?ngModel','bsCollapse'],controller:['$scope','$element','$attrs',n.controller],link:function(e,t,n,a){var o=a[0],i=a[1];o&&(i.$viewChangeListeners.push(function(){o.$setViewValue(i.$activeIndexes())}),o.$formatters.push(function(e){if(angular.isArray(e))i.$setActive(e);else{var t=i.$activeIndexes();angular.isArray(t)?-1===t.indexOf(1*e)&&i.$setActive(1*e):t!==1*e&&i.$setActive(1*e)}return e}))}}}]).directive('bsCollapseToggle',function(){return{require:['^?ngModel','^bsCollapse'],link:function(e,t,n,a){var o=(a[0],a[1]);t.attr('data-toggle','collapse'),o.$registerToggle(t),e.$on('$destroy',function(){o.$unregisterToggle(t)}),t.on('click',function(){var a=n.bsCollapseToggle&&'bs-collapse-toggle'!==n.bsCollapseToggle?n.bsCollapseToggle:o.$toggles.indexOf(t);o.$setActive(1*a),e.$apply()})}}}).directive('bsCollapseTarget',['$animate',function(e){return{require:['^?ngModel','^bsCollapse'],link:function(t,n,a,o){function i(){var t=r.$targets.indexOf(n),a=r.$activeIndexes(),o='removeClass';angular.isArray(a)?-1!==a.indexOf(t)&&(o='addClass'):t===a&&(o='addClass'),e[o](n,r.$options.activeClass)}var r=(o[0],o[1]);n.addClass('collapse'),r.$options.animation&&n.addClass(r.$options.animation),r.$registerTarget(n),t.$on('$destroy',function(){r.$unregisterTarget(n)}),r.$viewChangeListeners.push(function(){i()}),i()}}}]),angular.module('mgcrea.ngStrap.button',[]).provider('$button',function(){var e=this.defaults={activeClass:'active',toggleEvent:'click'};this.$get=function(){return{defaults:e}}}).directive('bsCheckboxGroup',function(){return{restrict:'A',require:'ngModel',compile:function(e,t){e.attr('data-toggle','buttons'),e.removeAttr('ng-model');var n=e[0].querySelectorAll('input[type="checkbox"]');angular.forEach(n,function(e){var n=angular.element(e);n.attr('bs-checkbox',''),n.attr('ng-model',t.ngModel+'.'+n.attr('value'))})}}}).directive('bsCheckbox',['$button','$$rAF',function(e,t){var n=e.defaults,a=/^(true|false|\d+)$/;return{restrict:'A',require:'ngModel',link:function(e,o,i,r){var s=n,l='INPUT'===o[0].nodeName,u=l?o.parent():o,c=angular.isDefined(i.trueValue)?i.trueValue:!0;a.test(i.trueValue)&&(c=e.$eval(i.trueValue));var d=angular.isDefined(i.falseValue)?i.falseValue:!1;a.test(i.falseValue)&&(d=e.$eval(i.falseValue));var f='boolean'!=typeof c||'boolean'!=typeof d;f&&(r.$parsers.push(function(e){return e?c:d}),r.$formatters.push(function(e){return angular.equals(e,c)}),e.$watch(i.ngModel,function(e,t){r.$render()})),r.$render=function(){var e=angular.equals(r.$modelValue,c);t(function(){l&&(o[0].checked=e),u.toggleClass(s.activeClass,e)})},o.bind(s.toggleEvent,function(){e.$apply(function(){l||r.$setViewValue(!u.hasClass('active')),f||r.$render()})})}}}]).directive('bsRadioGroup',function(){return{restrict:'A',require:'ngModel',compile:function(e,t){e.attr('data-toggle','buttons'),e.removeAttr('ng-model');var n=e[0].querySelectorAll('input[type="radio"]');angular.forEach(n,function(e){angular.element(e).attr('bs-radio',''),angular.element(e).attr('ng-model',t.ngModel)})}}}).directive('bsRadio',['$button','$$rAF',function(e,t){var n=e.defaults,a=/^(true|false|\d+)$/;return{restrict:'A',require:'ngModel',link:function(e,o,i,r){var s,l=n,u='INPUT'===o[0].nodeName,c=u?o.parent():o;i.$observe('value',function(t){s=a.test(t)?e.$eval(t):t,r.$render()}),r.$render=function(){var e=angular.equals(r.$modelValue,s);t(function(){u&&(o[0].checked=e),c.toggleClass(l.activeClass,e)})},o.bind(l.toggleEvent,function(){e.$apply(function(){r.$setViewValue(s),r.$render()})})}}}]),angular.module('mgcrea.ngStrap.alert',['mgcrea.ngStrap.modal']).provider('$alert',function(){var e=this.defaults={animation:'am-fade',prefixClass:'alert',prefixEvent:'alert',placement:null,templateUrl:'alert/alert.tpl.html',container:!1,element:null,backdrop:!1,keyboard:!0,show:!0,duration:!1,type:!1,dismissable:!0};this.$get=['$modal','$timeout',function(t,n){function a(a){var o={},i=angular.extend({},e,a);o=t(i),o.$scope.dismissable=!!i.dismissable,i.type&&(o.$scope.type=i.type);var r=o.show;return i.duration&&(o.show=function(){r(),n(function(){o.hide()},1e3*i.duration)}),o}return a}]}).directive('bsAlert',['$window','$sce','$alert',function(e,t,n){e.requestAnimationFrame||e.setTimeout;return{restrict:'EAC',scope:!0,link:function(e,a,o,i){var r={scope:e,element:a,show:!1};angular.forEach(['template','templateUrl','controller','controllerAs','placement','keyboard','html','container','animation','duration','dismissable'],function(e){angular.isDefined(o[e])&&(r[e]=o[e])});var s=/^(false|0|)$/i;angular.forEach(['keyboard','html','container','dismissable'],function(e){angular.isDefined(o[e])&&s.test(o[e])&&(r[e]=!1)}),e.hasOwnProperty('title')||(e.title=''),angular.forEach(['title','content','type'],function(n){o[n]&&o.$observe(n,function(a,o){e[n]=t.trustAsHtml(a)})}),o.bsAlert&&e.$watch(o.bsAlert,function(t,n){angular.isObject(t)?angular.extend(e,t):e.content=t},!0);var l=n(r);a.on(o.trigger||'click',l.toggle),e.$on('$destroy',function(){l&&l.destroy(),r=null,l=null})}}}]),angular.module('mgcrea.ngStrap.affix',['mgcrea.ngStrap.helpers.dimensions','mgcrea.ngStrap.helpers.debounce']).provider('$affix',function(){var e=this.defaults={offsetTop:'auto',inlineStyles:!0};this.$get=['$window','debounce','dimensions',function(t,n,a){function o(o,s){function l(e,t,n){var a=u(),o=c();return v>=a?'top':null!==e&&a+e<=t.top?'middle':null!==w&&t.top+n+$>=o-w?'bottom':'middle'}function u(){return p[0]===t?t.pageYOffset:p[0].scrollTop}function c(){return p[0]===t?t.document.body.scrollHeight:p[0].scrollHeight}var d={},f=angular.extend({},e,s),p=f.target,g='affix affix-top affix-bottom',m=!1,$=0,h=0,v=0,w=0,y=null,b=null,D=o.parent();if(f.offsetParent)if(f.offsetParent.match(/^\d+$/))for(var k=0;k<1*f.offsetParent-1;k++)D=D.parent();else D=angular.element(f.offsetParent);return d.init=function(){this.$parseOffsets(),h=a.offset(o[0]).top+$,m=!o[0].style.width,p.on('scroll',this.checkPosition),p.on('click',this.checkPositionWithEventLoop),r.on('resize',this.$debouncedOnResize),this.checkPosition(),this.checkPositionWithEventLoop()},d.destroy=function(){p.off('scroll',this.checkPosition),p.off('click',this.checkPositionWithEventLoop),r.off('resize',this.$debouncedOnResize)},d.checkPositionWithEventLoop=function(){setTimeout(d.checkPosition,1)},d.checkPosition=function(){var e=u(),t=a.offset(o[0]),n=a.height(o[0]),r=l(b,t,n);y!==r&&(y=r,'top'===r?(b=null,m&&o.css('width',''),f.inlineStyles&&(o.css('position',f.offsetParent?'':'relative'),o.css('top',''))):'bottom'===r?(b=f.offsetUnpin?-(1*f.offsetUnpin):t.top-e,m&&o.css('width',''),f.inlineStyles&&(o.css('position',f.offsetParent?'':'relative'),o.css('top',f.offsetParent?'':i[0].offsetHeight-w-n-h+'px'))):(b=null,m&&o.css('width',o[0].offsetWidth+'px'),f.inlineStyles&&(o.css('position','fixed'),o.css('top',$+'px'))),o.removeClass(g).addClass('affix'+('middle'!==r?'-'+r:'')))},d.$onResize=function(){d.$parseOffsets(),d.checkPosition()},d.$debouncedOnResize=n(d.$onResize,50),d.$parseOffsets=function(){var e=o.css('position');f.inlineStyles&&o.css('position',f.offsetParent?'':'relative'),f.offsetTop&&('auto'===f.offsetTop&&(f.offsetTop='+0'),f.offsetTop.match(/^[-+]\d+$/)?($=1*-f.offsetTop,v=f.offsetParent?a.offset(D[0]).top+1*f.offsetTop:a.offset(o[0]).top-a.css(o[0],'marginTop',!0)+1*f.offsetTop):v=1*f.offsetTop),f.offsetBottom&&(w=f.offsetParent&&f.offsetBottom.match(/^[-+]\d+$/)?c()-(a.offset(D[0]).top+a.height(D[0]))+1*f.offsetBottom+1:1*f.offsetBottom),f.inlineStyles&&o.css('position',e)},d.init(),d}var i=angular.element(t.document.body),r=angular.element(t);return o}]}).directive('bsAffix',['$affix','$window',function(e,t){return{restrict:'EAC',require:'^?bsAffixTarget',link:function(n,a,o,i){var r={scope:n,target:i?i.$element:angular.element(t)};angular.forEach(['offsetTop','offsetBottom','offsetParent','offsetUnpin','inlineStyles'],function(e){if(angular.isDefined(o[e])){var t=o[e];/true/i.test(t)&&(t=!0),/false/i.test(t)&&(t=!1),r[e]=t}});var s=e(a,r);n.$on('$destroy',function(){s&&s.destroy(),r=null,s=null})}}}]).directive('bsAffixTarget',function(){return{controller:['$element',function(e){this.$element=e}]}}),angular.module('mgcrea.ngStrap',['mgcrea.ngStrap.modal','mgcrea.ngStrap.aside','mgcrea.ngStrap.alert','mgcrea.ngStrap.button','mgcrea.ngStrap.select','mgcrea.ngStrap.datepicker','mgcrea.ngStrap.timepicker','mgcrea.ngStrap.navbar','mgcrea.ngStrap.tooltip','mgcrea.ngStrap.popover','mgcrea.ngStrap.dropdown','mgcrea.ngStrap.typeahead','mgcrea.ngStrap.scrollspy','mgcrea.ngStrap.affix','mgcrea.ngStrap.tab','mgcrea.ngStrap.collapse'])}(window,document);
//# sourceMappingURL=angular-strap.min.js.map

/**
 * angular-strap
 * @version v2.3.6 - 2015-11-14
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
!function(t,e,n){'use strict';angular.module('mgcrea.ngStrap.alert').run(['$templateCache',function(t){t.put('alert/alert.tpl.html','<div class="alert" ng-class="[type ? \'alert-\' + type : null]"><button type="button" class="close" ng-if="dismissable" ng-click="$hide()">&times;</button> <strong ng-bind="title"></strong>&nbsp;<span ng-bind-html="content"></span></div>')}]),angular.module('mgcrea.ngStrap.datepicker').run(['$templateCache',function(t){t.put('datepicker/datepicker.tpl.html','<div class="dropdown-menu datepicker" ng-class="\'datepicker-mode-\' + $mode" style="max-width: 320px"><table style="table-layout: fixed; height: 100%; width: 100%"><thead><tr class="text-center"><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$selectPane(-1)"><i class="{{$iconLeft}}"></i></button></th><th colspan="{{ rows[0].length - 2 }}"><button tabindex="-1" type="button" class="btn btn-default btn-block text-strong" ng-click="$toggleMode()"><strong style="text-transform: capitalize" ng-bind="title"></strong></button></th><th><button tabindex="-1" type="button" class="btn btn-default pull-right" ng-click="$selectPane(+1)"><i class="{{$iconRight}}"></i></button></th></tr><tr ng-if="showLabels" ng-bind-html="labels"></tr></thead><tbody><tr ng-repeat="(i, row) in rows" height="{{ 100 / rows.length }}%"><td class="text-center" ng-repeat="(j, el) in row"><button tabindex="-1" type="button" class="btn btn-default" style="width: 100%" ng-class="{\'btn-primary\': el.selected, \'btn-info btn-today\': el.isToday && !el.selected}" ng-click="$select(el.date)" ng-disabled="el.disabled"><span ng-class="{\'text-muted\': el.muted}" ng-bind="el.label"></span></button></td></tr></tbody></table></div>')}]),angular.module('mgcrea.ngStrap.aside').run(['$templateCache',function(t){t.put('aside/aside.tpl.html','<div class="aside" tabindex="-1" role="dialog"><div class="aside-dialog"><div class="aside-content"><div class="aside-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="aside-title" ng-bind="title"></h4></div><div class="aside-body" ng-bind="content"></div><div class="aside-footer"><button type="button" class="btn btn-default" ng-click="$hide()">Close</button></div></div></div></div>')}]),angular.module('mgcrea.ngStrap.dropdown').run(['$templateCache',function(t){t.put('dropdown/dropdown.tpl.html','<ul tabindex="-1" class="dropdown-menu" role="menu" ng-show="content && content.length"><li role="presentation" ng-class="{divider: item.divider, active: item.active}" ng-repeat="item in content"><a role="menuitem" tabindex="-1" ng-href="{{item.href}}" ng-if="!item.divider && item.href" target="{{item.target || \'\'}}" ng-bind="item.text"></a> <a role="menuitem" tabindex="-1" href="javascript:void(0)" ng-if="!item.divider && item.click" ng-click="$eval(item.click);$hide()" ng-bind="item.text"></a></li></ul>')}]),angular.module('mgcrea.ngStrap.modal').run(['$templateCache',function(t){t.put('modal/modal.tpl.html','<div class="modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header" ng-show="title"><button type="button" class="close" aria-label="Close" ng-click="$hide()"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" ng-bind="title"></h4></div><div class="modal-body" ng-bind="content"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="$hide()">Close</button></div></div></div></div>')}]),angular.module('mgcrea.ngStrap.popover').run(['$templateCache',function(t){t.put('popover/popover.tpl.html','<div class="popover" tabindex="-1"><div class="arrow"></div><h3 class="popover-title" ng-bind="title" ng-show="title"></h3><div class="popover-content" ng-bind="content"></div></div>')}]),angular.module('mgcrea.ngStrap.select').run(['$templateCache',function(t){t.put('select/select.tpl.html','<ul tabindex="-1" class="select dropdown-menu" ng-show="$isVisible()" role="select"><li ng-if="$showAllNoneButtons"><div class="btn-group" style="margin-bottom: 5px; margin-left: 5px"><button type="button" class="btn btn-default btn-xs" ng-click="$selectAll()">{{$allText}}</button> <button type="button" class="btn btn-default btn-xs" ng-click="$selectNone()">{{$noneText}}</button></div></li><li role="presentation" ng-repeat="match in $matches" ng-class="{active: $isActive($index)}"><a style="cursor: default" role="menuitem" tabindex="-1" ng-click="$select($index, $event)"><i class="{{$iconCheckmark}} pull-right" ng-if="$isMultiple && $isActive($index)"></i> <span ng-bind="match.label"></span></a></li></ul>')}]),angular.module('mgcrea.ngStrap.timepicker').run(['$templateCache',function(t){t.put('timepicker/timepicker.tpl.html','<div class="dropdown-menu timepicker" style="min-width: 0px;width: auto"><table height="100%"><thead><tr class="text-center"><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(-1, 0)"><i class="{{ $iconUp }}"></i></button></th><th>&nbsp;</th><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(-1, 1)"><i class="{{ $iconUp }}"></i></button></th><th>&nbsp;</th><th><button ng-if="showSeconds" tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(-1, 2)"><i class="{{ $iconUp }}"></i></button></th></tr></thead><tbody><tr ng-repeat="(i, row) in rows"><td class="text-center"><button tabindex="-1" style="width: 100%" type="button" class="btn btn-default" ng-class="{\'btn-primary\': row[0].selected}" ng-click="$select(row[0].date, 0)" ng-disabled="row[0].disabled"><span ng-class="{\'text-muted\': row[0].muted}" ng-bind="row[0].label"></span></button></td><td><span ng-bind="i == midIndex ? timeSeparator : \' \'"></span></td><td class="text-center"><button tabindex="-1" ng-if="row[1].date" style="width: 100%" type="button" class="btn btn-default" ng-class="{\'btn-primary\': row[1].selected}" ng-click="$select(row[1].date, 1)" ng-disabled="row[1].disabled"><span ng-class="{\'text-muted\': row[1].muted}" ng-bind="row[1].label"></span></button></td><td><span ng-bind="i == midIndex ? timeSeparator : \' \'"></span></td><td class="text-center"><button tabindex="-1" ng-if="showSeconds && row[2].date" style="width: 100%" type="button" class="btn btn-default" ng-class="{\'btn-primary\': row[2].selected}" ng-click="$select(row[2].date, 2)" ng-disabled="row[2].disabled"><span ng-class="{\'text-muted\': row[2].muted}" ng-bind="row[2].label"></span></button></td><td ng-if="showAM">&nbsp;</td><td ng-if="showAM"><button tabindex="-1" ng-show="i == midIndex - !isAM * 1" style="width: 100%" type="button" ng-class="{\'btn-primary\': !!isAM}" class="btn btn-default" ng-click="$switchMeridian()" ng-disabled="el.disabled">AM</button> <button tabindex="-1" ng-show="i == midIndex + 1 - !isAM * 1" style="width: 100%" type="button" ng-class="{\'btn-primary\': !isAM}" class="btn btn-default" ng-click="$switchMeridian()" ng-disabled="el.disabled">PM</button></td></tr></tbody><tfoot><tr class="text-center"><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(1, 0)"><i class="{{ $iconDown }}"></i></button></th><th>&nbsp;</th><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(1, 1)"><i class="{{ $iconDown }}"></i></button></th><th>&nbsp;</th><th><button ng-if="showSeconds" tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(1, 2)"><i class="{{ $iconDown }}"></i></button></th></tr></tfoot></table></div>')}]),angular.module('mgcrea.ngStrap.tab').run(['$templateCache',function(t){t.put('tab/tab.tpl.html','<ul class="nav" ng-class="$navClass" role="tablist"><li role="presentation" ng-repeat="$pane in $panes track by $index" ng-class="[ $isActive($pane, $index) ? $activeClass : \'\', $pane.disabled ? \'disabled\' : \'\' ]"><a role="tab" data-toggle="tab" ng-click="!$pane.disabled && $setActive($pane.name || $index)" data-index="{{ $index }}" ng-bind-html="$pane.title" aria-controls="$pane.title"></a></li></ul><div ng-transclude class="tab-content"></div>')}]),angular.module('mgcrea.ngStrap.typeahead').run(['$templateCache',function(t){t.put('typeahead/typeahead.tpl.html','<ul tabindex="-1" class="typeahead dropdown-menu" ng-show="$isVisible()" role="select"><li role="presentation" ng-repeat="match in $matches" ng-class="{active: $index == $activeIndex}"><a role="menuitem" tabindex="-1" ng-click="$select($index, $event)" ng-bind="match.label"></a></li></ul>')}]),angular.module('mgcrea.ngStrap.tooltip').run(['$templateCache',function(t){t.put('tooltip/tooltip.tpl.html','<div class="tooltip in" ng-show="title"><div class="tooltip-arrow"></div><div class="tooltip-inner" ng-bind="title"></div></div>')}])}(window,document);
/*
 *	jQuery elevateZoom 3.0.8
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 *

/*
 *	jQuery elevateZoom 3.0.3
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}

(function( $, window, document, undefined ) {
	var ElevateZoom = {
			init: function( options, elem ) {
				var self = this;

				self.elem = elem;
				self.$elem = $( elem );

			    self.imageSrc = self.$elem.data("zoom-image") ? self.$elem.data("zoom-image") : self.$elem.attr("src");				 

				self.options = $.extend( {}, $.fn.elevateZoom.options, options );

				//TINT OVERRIDE SETTINGS
				if(self.options.tint) {
					self.options.lensColour = "none", //colour of the lens background
					self.options.lensOpacity =  "1" //opacity of the lens
				}
				//INNER OVERRIDE SETTINGS
				if(self.options.zoomType == "inner") {self.options.showLens = false;}


				//Remove alt on hover

				self.$elem.parent().removeAttr('title').removeAttr('alt');

				self.zoomImage = self.imageSrc;

				self.refresh( 1 );



				//Create the image swap from the gallery 
				$('#'+self.options.gallery + ' a').click( function(e) { 

					//Set a class on the currently active gallery image
					if(self.options.galleryActiveClass){
						$('#'+self.options.gallery + ' a').removeClass(self.options.galleryActiveClass);
						$(this).addClass(self.options.galleryActiveClass);
					}
					//stop any link on the a tag from working
					e.preventDefault();

					//call the swap image function            
					if($(this).data("zoom-image")){self.zoomImagePre = $(this).data("zoom-image")}
					else{self.zoomImagePre = $(this).data("image");}
					self.swaptheimage($(this).data("image"), self.zoomImagePre);
					return false;
				});

			},

			refresh: function( length ) {
				var self = this;

				setTimeout(function() {
					self.fetch(self.imageSrc);

				}, length || self.options.refresh );
			},

			fetch: function(imgsrc) {
				//get the image
				var self = this;
				var newImg = new Image();
				newImg.onload = function() {
					//set the large image dimensions - used to calculte ratio's
					self.largeWidth = newImg.width;
					self.largeHeight = newImg.height;
					//once image is loaded start the calls
					self.startZoom();
					self.currentImage = self.imageSrc;
					//let caller know image has been loaded
					self.options.onZoomedImageLoaded(self.$elem);
				}
				newImg.src = imgsrc; // this must be done AFTER setting onload

				return;

			},

			startZoom: function( ) {
			    var self = this;
			    
				//get dimensions of the non zoomed image
				self.nzWidth = self.$elem.width();
				self.nzHeight = self.$elem.height();

				//activated elements
				self.isWindowActive = false;
				self.isLensActive = false;
				self.isTintActive = false;
				self.overWindow = false;    

				//CrossFade Wrappe
				if(self.options.imageCrossfade){
					self.zoomWrap = self.$elem.wrap('<div style="height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;" class="zoomWrapper" />');        
					self.$elem.css('position', 'absolute'); 
				}

				self.zoomLock = 1;
				self.scrollingLock = false;
				self.changeBgSize = false;
				self.currentZoomLevel = self.options.zoomLevel;


				//get offset of the non zoomed image
				self.nzOffset = self.$elem.offset();
				//calculate the width ratio of the large/small image
				self.widthRatio = (self.largeWidth/self.currentZoomLevel) / self.nzWidth;
				self.heightRatio = (self.largeHeight/self.currentZoomLevel) / self.nzHeight; 


				//if window zoom        
				if(self.options.zoomType == "window") {
					self.zoomWindowStyle = "overflow: hidden;"
						+ "background-position: 0px 0px;text-align:center;"  
						+ "background-color: " + String(self.options.zoomWindowBgColour)            
						+ ";width: " + String(self.options.zoomWindowWidth) + "px;"
						+ "height: " + String(self.options.zoomWindowHeight)
						+ "px;float: left;"
						+ "background-size: "+ self.largeWidth/self.currentZoomLevel+ "px " +self.largeHeight/self.currentZoomLevel + "px;"
						+ "display: none;z-index:100;"
						+ "border: " + String(self.options.borderSize) 
						+ "px solid " + self.options.borderColour 
						+ ";background-repeat: no-repeat;"
						+ "position: absolute;";
				}    


				//if inner  zoom    
				if(self.options.zoomType == "inner") {
					//has a border been put on the image? Lets cater for this

					var borderWidth = self.$elem.css("border-left-width");

					self.zoomWindowStyle = "overflow: hidden;"
						+ "margin-left: " + String(borderWidth) + ";" 
						+ "margin-top: " + String(borderWidth) + ";"         
						+ "background-position: 0px 0px;"
						+ "width: " + String(self.nzWidth) + "px;"
						+ "height: " + String(self.nzHeight)
						+ "px;float: left;"
						+ "display: none;"
						+ "cursor:"+(self.options.cursor)+";"
						+ "px solid " + self.options.borderColour 
						+ ";background-repeat: no-repeat;"
						+ "position: absolute;";
				}    



				//lens style for window zoom
				if(self.options.zoomType == "window") {


					// adjust images less than the window height

					if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
						lensHeight = self.nzHeight;              
					}
					else{
						lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
					}
					if (self.nzWidth < self.options.zoomWindowWidth) {
						lensWidth = self.nzWidth;
					}       
					else{
						lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
					}

				    //width: " + String((self.options.zoomWindowWidth)/self.widthRatio) + "px;height: " + String((self.options.zoomWindowHeight)/self.heightRatio)
					self.lensStyle = "background-position: 0px 0px;left: 0"
					+ "px;float: right;display: none;"
					+ "overflow: hidden;"
					+ "z-index: 999;"   
					+ "-webkit-transform: translateZ(0);"               
					+ "opacity:"+(self.options.lensOpacity)+";filter: alpha(opacity = "+(self.options.lensOpacity*100)+"); zoom:1;"
					+ "width:"+lensWidth+"px;"
					+ "height:"+lensHeight+"px;"
					+ "background-color:"+(self.options.lensColour)+";"					
					+ "cursor:"+(self.options.cursor)+";"
					+ "border: "+(self.options.lensBorderSize)+"px" +
					" solid "+(self.options.lensBorderColour)+";background-repeat: no-repeat;position: absolute;";
				} 


				//tint style
				self.tintStyle = "display: block;"
					+ "position: absolute;"
					+ "background-color: "+self.options.tintColour+";"	
					+ "filter:alpha(opacity=0);"		
					+ "opacity: 0;"	
					+ "width: " + self.nzWidth + "px;"
					+ "height: " + self.nzHeight + "px;"

					;

				//lens style for lens zoom with optional round for modern browsers
				self.lensRound = '';

				if(self.options.zoomType == "lens") {

					self.lensStyle = "background-position: 0px 0px;"
						+ "float: left;display: none;"
						+ "border: " + String(self.options.borderSize) + "px solid " + self.options.borderColour+";"
						+ "width:"+ String(self.options.lensSize) +"px;"
						+ "height:"+ String(self.options.lensSize)+"px;"
						+ "background-repeat: no-repeat;position: absolute;";


				}


				//does not round in all browsers
				if(self.options.lensShape == "round") {
					self.lensRound = "border-top-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-top-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-bottom-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-bottom-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;";

				}

				//create the div's                                                + ""
				//self.zoomContainer = $('<div/>').addClass('zoomContainer').css({"position":"relative", "height":self.nzHeight, "width":self.nzWidth});

				self.zoomContainer = $('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' + self.nzOffset.left + 'px;top:' + self.nzOffset.top + 'px;height:' + self.nzHeight + 'px;width:' + self.nzWidth + 'px;"></div>');
				$(".zoomContainer").remove();
				$('#wrapperImage').append(self.zoomContainer);


				//this will add overflow hidden and contrain the lens on lens mode       
				if(self.options.containLensZoom && self.options.zoomType == "lens"){
					self.zoomContainer.css("overflow", "hidden");
				}
				if(self.options.zoomType != "inner") {
					self.zoomLens = $("<div class='zoomLens' style='" + self.lensStyle + self.lensRound +"'>&nbsp;</div>")
					.appendTo(self.zoomContainer)
					.click(function () {
						self.$elem.trigger('click');
					});


					if(self.options.tint) {
						self.tintContainer = $('<div/>').addClass('tintContainer');	
						self.zoomTint = $("<div class='zoomTint' style='"+self.tintStyle+"'></div>");


						self.zoomLens.wrap(self.tintContainer);


						self.zoomTintcss = self.zoomLens.after(self.zoomTint);	

						//if tint enabled - set an image to show over the tint

						self.zoomTintImage = $('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: '+self.nzWidth+'px; height: '+self.nzHeight+'px;" src="'+self.imageSrc+'">')
						.appendTo(self.zoomLens)
						.click(function () {

							self.$elem.trigger('click');
						});

					}          

				}







				//create zoom window 
				if(isNaN(self.options.zoomWindowPosition)){
					self.zoomWindow = $("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
					.appendTo('body')
					.click(function () {
						self.$elem.trigger('click');
					});
				}else{
					self.zoomWindow = $("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
					.appendTo(self.zoomContainer)
					.click(function () {
						self.$elem.trigger('click');
					});
				}              
				self.zoomWindowContainer = $('<div/>').addClass('zoomWindowContainer').css("width",self.options.zoomWindowWidth);
				self.zoomWindow.wrap(self.zoomWindowContainer);


				//  self.captionStyle = "text-align: left;background-color: black;color: white;font-weight: bold;padding: 10px;font-family: sans-serif;font-size: 11px";                                                                                                                                                                                                                                          
				// self.zoomCaption = $('<div class="elevatezoom-caption" style="'+self.captionStyle+'display: block; width: 280px;">INSERT ALT TAG</div>').appendTo(self.zoomWindow.parent());

				if(self.options.zoomType == "lens") {
					self.zoomLens.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				if(self.options.zoomType == "window") {
					self.zoomWindow.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				/*-------------------END THE ZOOM WINDOW AND LENS----------------------------------*/
				//touch events
				self.$elem.bind('touchmove', function(e){    
					e.preventDefault();
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
					self.setPosition(touch);

				});  
				self.zoomContainer.bind('touchmove', function(e){ 
					if(self.options.zoomType == "inner") {
						self.showHideWindow("show");

					}
					e.preventDefault();
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
					self.setPosition(touch); 

				});  	
				self.zoomContainer.bind('touchend', function(e){ 
					self.showHideWindow("hide");
					if(self.options.showLens) {self.showHideLens("hide");}
					if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
				});  	

				self.$elem.bind('touchend', function(e){ 
					self.showHideWindow("hide");
					if(self.options.showLens) {self.showHideLens("hide");}
					if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
				});  	
				if(self.options.showLens) {
					self.zoomLens.bind('touchmove', function(e){ 

						e.preventDefault();
						var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
						self.setPosition(touch); 
					});    


					self.zoomLens.bind('touchend', function(e){ 
						self.showHideWindow("hide");
						if(self.options.showLens) {self.showHideLens("hide");}
						if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
					});  
				}
				//Needed to work in IE
				self.$elem.bind('mousemove', function(e){   
					if(self.overWindow == false){self.setElements("show");}
					//make sure on orientation change the setposition is not fired
					if(self.lastX !== e.clientX || self.lastY !== e.clientY){
						self.setPosition(e);
						self.currentLoc = e;
					}   
					self.lastX = e.clientX;
					self.lastY = e.clientY;    

				});  	

				self.zoomContainer.bind('mousemove', function(e){ 

					if(self.overWindow == false){self.setElements("show");} 

					//make sure on orientation change the setposition is not fired 
					if(self.lastX !== e.clientX || self.lastY !== e.clientY){
						self.setPosition(e);
						self.currentLoc = e;
					}   
					self.lastX = e.clientX;
					self.lastY = e.clientY;    
				});  	
				if(self.options.zoomType != "inner") {
					self.zoomLens.bind('mousemove', function(e){      
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});
				}
				if(self.options.tint && self.options.zoomType != "inner") {
					self.zoomTint.bind('mousemove', function(e){ 
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});

				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.bind('mousemove', function(e) {
						//self.overWindow = true;
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});

				}


				//  lensFadeOut: 500,  zoomTintFadeIn
				self.zoomContainer.add(self.$elem).mouseenter(function(){

					if(self.overWindow == false){self.setElements("show");} 


				}).mouseleave(function(){
					if(!self.scrollLock){
						self.setElements("hide");
					}
				});
				//end ove image





				if(self.options.zoomType != "inner") {
					self.zoomWindow.mouseenter(function(){
						self.overWindow = true;   
						self.setElements("hide");                  
					}).mouseleave(function(){

						self.overWindow = false;
					});
				}
				//end ove image



//				var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);

				//      $(this).empty();    
				//    return false;

				//fix for initial zoom setting
				if (self.options.zoomLevel != 1){
					//	self.changeZoomLevel(self.currentZoomLevel);
				}
				//set the min zoomlevel
				if(self.options.minZoomLevel){
					self.minZoomLevel = self.options.minZoomLevel;
				}
				else{
					self.minZoomLevel = self.options.scrollZoomIncrement * 2;
				}


				if(self.options.scrollZoom){


					self.zoomContainer.add(self.$elem).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(e){


//						in IE there is issue with firing of mouseleave - So check whether still scrolling
//						and on mouseleave check if scrolllock          
						self.scrollLock = true;
						clearTimeout($.data(this, 'timer'));
						$.data(this, 'timer', setTimeout(function() {
							self.scrollLock = false;
							//do something
						}, 250));

						var theEvent = e.originalEvent.wheelDelta || e.originalEvent.detail*-1


						//this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
						//   e.preventDefault();


						e.stopImmediatePropagation();
						e.stopPropagation();
						e.preventDefault();


						if(theEvent /120 > 0) {
							//scrolling up
							if(self.currentZoomLevel >= self.minZoomLevel){ 
								self.changeZoomLevel(self.currentZoomLevel-self.options.scrollZoomIncrement);        
							}

						}
						else{
							//scrolling down


							if(self.options.maxZoomLevel){
								if(self.currentZoomLevel <= self.options.maxZoomLevel){           
									self.changeZoomLevel(parseFloat(self.currentZoomLevel)+self.options.scrollZoomIncrement);
								}
							}
							else{
								//andy 

								self.changeZoomLevel(parseFloat(self.currentZoomLevel)+self.options.scrollZoomIncrement);
							}

						}
						return false;
					});
				}


			},
			setElements: function(type) {
				var self = this;
        if(!self.options.zoomEnabled){return false;}
				if(type=="show"){
					if(self.isWindowSet){
						if(self.options.zoomType == "inner") {self.showHideWindow("show");}
						if(self.options.zoomType == "window") {self.showHideWindow("show");}
						if(self.options.showLens) {self.showHideLens("show");}
						if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("show");
						}
					}
				}

				if(type=="hide"){
					if(self.options.zoomType == "window") {self.showHideWindow("hide");}
					if(!self.options.tint) {self.showHideWindow("hide");}
					if(self.options.showLens) {self.showHideLens("hide");}
					if(self.options.tint) {	self.showHideTint("hide");}
				}   
			},
			setPosition: function(e) {
      
				var self = this;
        
        if(!self.options.zoomEnabled){return false;}

				//recaclc offset each time in case the image moves
				//this can be caused by other on page elements
				self.nzHeight = self.$elem.height();
				self.nzWidth = self.$elem.width();
				self.nzOffset = self.$elem.offset();

				if(self.options.tint && self.options.zoomType != "inner") {
					self.zoomTint.css({ top: 0});
					self.zoomTint.css({ left: 0});
				}
				//set responsive       
				//will checking if the image needs changing before running this code work faster?
				if(self.options.responsive && !self.options.scrollZoom){
					if(self.options.showLens){ 
						if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
							lensHeight = self.nzHeight;              
						}
						else{
							lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
						}
						if(self.largeWidth < self.options.zoomWindowWidth){
							lensWidth = self.nzWidth;
						}       
						else{
							lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
						}
						self.widthRatio = self.largeWidth / self.nzWidth;
						self.heightRatio = self.largeHeight / self.nzHeight;        
						if(self.options.zoomType != "lens") {


							//possibly dont need to keep recalcalculating
							//if the lens is heigher than the image, then set lens size to image size
						    if (self.nzHeight < self.options.zoomWindowHeight / self.heightRatio) {
								lensHeight = self.nzHeight;  

							}
							else{
								lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
							}

							if (self.nzWidth < self.options.zoomWindowWidth / self.widthRatio) {
								lensWidth = self.nzWidth;
							}       
							else{
								lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
							}            

							self.zoomLens.css('width', lensWidth);    
							self.zoomLens.css('height', lensHeight); 

							if(self.options.tint){    
								self.zoomTintImage.css('width', self.nzWidth);    
								self.zoomTintImage.css('height', self.nzHeight); 
							}

						}                     
						if(self.options.zoomType == "lens") {  

							self.zoomLens.css({ width: String(self.options.lensSize) + 'px', height: String(self.options.lensSize) + 'px' })      


						}        
						//end responsive image change
					}
				}

				//container fix
				self.zoomContainer.css({ top: self.nzOffset.top});
				self.zoomContainer.css({ left: self.nzOffset.left});
				self.mouseLeft = parseInt(e.pageX - self.nzOffset.left);
				self.mouseTop = parseInt(e.pageY - self.nzOffset.top);
				//calculate the Location of the Lens

				//calculate the bound regions - but only if zoom window
				if(self.options.zoomType == "window") {
					self.Etoppos = (self.mouseTop < (self.zoomLens.height()/2));
					self.Eboppos = (self.mouseTop > self.nzHeight - (self.zoomLens.height()/2)-(self.options.lensBorderSize*2));
					self.Eloppos = (self.mouseLeft < 0+((self.zoomLens.width()/2))); 
					self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.zoomLens.width()/2)-(self.options.lensBorderSize*2)));  
				}
				//calculate the bound regions - but only for inner zoom
				if(self.options.zoomType == "inner"){ 
					self.Etoppos = (self.mouseTop < ((self.nzHeight/2)/self.heightRatio) );
					self.Eboppos = (self.mouseTop > (self.nzHeight - ((self.nzHeight/2)/self.heightRatio)));
					self.Eloppos = (self.mouseLeft < 0+(((self.nzWidth/2)/self.widthRatio)));
					self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.nzWidth/2)/self.widthRatio-(self.options.lensBorderSize*2)));  
				}

				// if the mouse position of the slider is one of the outerbounds, then hide  window and lens
				if (self.mouseLeft <= 0 || self.mouseTop < 0 || self.mouseLeft > self.nzWidth || self.mouseTop > self.nzHeight ) {				          
					self.setElements("hide");
					return;
				}
				//else continue with operations
				else {


					//lens options
					if(self.options.showLens) {
						//		self.showHideLens("show");
						//set background position of lens
						self.lensLeftPos = String(self.mouseLeft - self.zoomLens.width() / 2);
						self.lensTopPos = String(self.mouseTop - self.zoomLens.height() / 2);


					}
					//adjust the background position if the mouse is in one of the outer regions 

					//Top region
					if(self.Etoppos){
						self.lensTopPos = 0;
					}
					//Left Region
					if(self.Eloppos){
						self.windowLeftPos = 0;
						self.lensLeftPos = 0;
						self.tintpos=0;
					}     
					//Set bottom and right region for window mode
					if(self.options.zoomType == "window") {
						if(self.Eboppos){
							self.lensTopPos = Math.max( (self.nzHeight)-self.zoomLens.height()-(self.options.lensBorderSize*2), 0 );
						} 
						if(self.Eroppos){
							self.lensLeftPos = (self.nzWidth-(self.zoomLens.width())-(self.options.lensBorderSize*2));
						}  
					}  
					//Set bottom and right region for inner mode
					if(self.options.zoomType == "inner") {
						if(self.Eboppos){
							self.lensTopPos = Math.max( ((self.nzHeight)-(self.options.lensBorderSize*2)), 0 );
						} 
						if(self.Eroppos){
							self.lensLeftPos = (self.nzWidth-(self.nzWidth)-(self.options.lensBorderSize*2));
						}  

					}
					//if lens zoom
					if(self.options.zoomType == "lens") {  
						self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomLens.width() / 2) * (-1));   
						self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomLens.height() / 2) * (-1));

						self.zoomLens.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });

						if(self.changeBgSize){  

							if(self.nzHeight>self.nzWidth){  
								if(self.options.zoomType == "lens"){       
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
								}   

								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
							}
							else{     
								if(self.options.zoomType == "lens"){       
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
								}   
								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
							}
							self.changeBgSize = false;
						}    

						self.setWindowPostition(e);  
					}
					//if tint zoom   
					if(self.options.tint && self.options.zoomType != "inner") {
						self.setTintPosition(e);

					}
					//set the css background position 
					if(self.options.zoomType == "window") {
						self.setWindowPostition(e);   
					}
					if(self.options.zoomType == "inner") {
						self.setWindowPostition(e);   
					}
					if(self.options.showLens) {

						if(self.fullwidth && self.options.zoomType != "lens"){
							self.lensLeftPos = 0;

						}
						self.zoomLens.css({ left: self.lensLeftPos + 'px', top: self.lensTopPos + 'px' })  
					}

				} //end else



			},
			showHideWindow: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isWindowActive){
						if(self.options.zoomWindowFadeIn){
							self.zoomWindow.stop(true, true, false).fadeIn(self.options.zoomWindowFadeIn);
						}
						else{self.zoomWindow.show();}
						self.isWindowActive = true;
					}            
				}
				if(change == "hide"){
					if(self.isWindowActive){
						if(self.options.zoomWindowFadeOut){
							self.zoomWindow.stop(true, true).fadeOut(self.options.zoomWindowFadeOut);
						}
						else{self.zoomWindow.hide();}
						self.isWindowActive = false;        
					}      
				}
			},
			showHideLens: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isLensActive){
						if(self.options.lensFadeIn){
							self.zoomLens.stop(true, true, false).fadeIn(self.options.lensFadeIn);
						}
						else{self.zoomLens.show();}
						self.isLensActive = true;
					}            
				}
				if(change == "hide"){
					if(self.isLensActive){
						if(self.options.lensFadeOut){
							self.zoomLens.stop(true, true).fadeOut(self.options.lensFadeOut);
						}
						else{self.zoomLens.hide();}
						self.isLensActive = false;        
					}      
				}
			},
			showHideTint: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isTintActive){

						if(self.options.zoomTintFadeIn){
							self.zoomTint.css({opacity:self.options.tintOpacity}).animate().stop(true, true).fadeIn("slow");
						}
						else{
							self.zoomTint.css({opacity:self.options.tintOpacity}).animate();
							self.zoomTint.show();


						}
						self.isTintActive = true;
					}            
				}
				if(change == "hide"){      
					if(self.isTintActive){ 

						if(self.options.zoomTintFadeOut){
							self.zoomTint.stop(true, true).fadeOut(self.options.zoomTintFadeOut);
						}
						else{self.zoomTint.hide();}
						self.isTintActive = false;        
					}      
				}
			},
			setLensPostition: function( e ) {


			},
			setWindowPostition: function( e ) {
				//return obj.slice( 0, count );
				var self = this;

				if(!isNaN(self.options.zoomWindowPosition)){

					switch (self.options.zoomWindowPosition) { 
					case 1: //done         
						self.windowOffsetTop = (self.options.zoomWindowOffety);//DONE - 1
						self.windowOffsetLeft =(+self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;
					case 2:
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin

							self.windowOffsetTop = ((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);
							self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						}
						else{ //negative margin

						}
						break;
					case 3: //done        
						self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize*2)); //DONE 3,9
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;      
					case 4: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;
					case 5: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2)); //DONE - 5,15
						break;
					case 6: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin
							self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8

							self.windowOffsetLeft =((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);  
						}
						else{ //negative margin

						}


						break;
					case 7: //done  
						self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8
						self.windowOffsetLeft = 0; //DONE 7, 13
						break;
					case 8: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 9:  //done  
						self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize*2)); //DONE 3,9
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 10: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin

							self.windowOffsetTop = ((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);
							self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						}
						else{ //negative margin

						}
						break;
					case 11: 
						self.windowOffsetTop = (self.options.zoomWindowOffety);
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 12: //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 13: //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(0); //DONE 7, 13
						break;
					case 14: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin
							self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16

							self.windowOffsetLeft =((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);  
						}
						else{ //negative margin

						}

						break;
					case 15://done   
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2)); //DONE - 5,15
						break;
					case 16:  //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;            
					default: //done  
						self.windowOffsetTop = (self.options.zoomWindowOffety);//DONE - 1
					self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
					} 
				} //end isNAN
				else{
					//WE CAN POSITION IN A CLASS - ASSUME THAT ANY STRING PASSED IS
					self.externalContainer = $('#'+self.options.zoomWindowPosition);
					self.externalContainerWidth = self.externalContainer.width();
					self.externalContainerHeight = self.externalContainer.height();
					self.externalContainerOffset = self.externalContainer.offset();

					self.windowOffsetTop = self.externalContainerOffset.top;//DONE - 1
					self.windowOffsetLeft =self.externalContainerOffset.left; //DONE 1, 2, 3, 4, 16

				}
				self.isWindowSet = true;
				self.windowOffsetTop = self.windowOffsetTop + self.options.zoomWindowOffety;
				self.windowOffsetLeft = self.windowOffsetLeft + self.options.zoomWindowOffetx;

				self.zoomWindow.css({ top: self.windowOffsetTop});
				self.zoomWindow.css({ left: self.windowOffsetLeft});

				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ top: 0});
					self.zoomWindow.css({ left: 0});

				}   


				self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1));   
				self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));
				if(self.Etoppos){self.windowTopPos = 0;}
				if(self.Eloppos){self.windowLeftPos = 0;}     
				if(self.Eboppos){self.windowTopPos = (self.largeHeight/self.currentZoomLevel-self.zoomWindow.height())*(-1);  } 
				if(self.Eroppos){self.windowLeftPos = ((self.largeWidth/self.currentZoomLevel-self.zoomWindow.width())*(-1));}    

				//stops micro movements
				if(self.fullheight){
					self.windowTopPos = 0;

				}
				if(self.fullwidth){
					self.windowLeftPos = 0;

				}
				//set the css background position 


				if(self.options.zoomType == "window" || self.options.zoomType == "inner") {

					if(self.zoomLock == 1){
						//overrides for images not zoomable
						if(self.widthRatio <= 1){

							self.windowLeftPos = 0;
						}
						if(self.heightRatio <= 1){ 
							self.windowTopPos = 0;
						}
					}
					// adjust images less than the window height

					if(self.largeHeight < self.options.zoomWindowHeight){

						self.windowTopPos = 0;
					}
					if(self.largeWidth < self.options.zoomWindowWidth){
						self.windowLeftPos = 0;
					}       

					//set the zoomwindow background position
					if (self.options.easing){

						//     if(self.changeZoom){
						//           clearInterval(self.loop);
						//           self.changeZoom = false;
						//           self.loop = false;

						//            }
						//set the pos to 0 if not set
						if(!self.xp){self.xp = 0;}
						if(!self.yp){self.yp = 0;}  
						//if loop not already started, then run it 
						if (!self.loop){           
							self.loop = setInterval(function(){                
								//using zeno's paradox    

								self.xp += (self.windowLeftPos  - self.xp) / self.options.easingAmount; 
								self.yp += (self.windowTopPos  - self.yp) / self.options.easingAmount;
								if(self.scrollingLock){


									clearInterval(self.loop);
									self.xp = self.windowLeftPos;
									self.yp = self.windowTopPos            

									self.xp = ((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1);
									self.yp = (((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));                         

									if(self.changeBgSize){    
										if(self.nzHeight>self.nzWidth){  
											if(self.options.zoomType == "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}   
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
										}
										else{   
											if(self.options.zoomType != "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}            
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            

										}

										/*
             if(!self.bgxp){self.bgxp = self.largeWidth/self.newvalue;}
						if(!self.bgyp){self.bgyp = self.largeHeight/self.newvalue ;}  
                 if (!self.bgloop){   
                 	self.bgloop = setInterval(function(){   

                 self.bgxp += (self.largeWidth/self.newvalue  - self.bgxp) / self.options.easingAmount; 
								self.bgyp += (self.largeHeight/self.newvalue  - self.bgyp) / self.options.easingAmount;

           self.zoomWindow.css({ "background-size": self.bgxp + 'px ' + self.bgyp + 'px' });


                  }, 16);

                 }
										 */
										self.changeBgSize = false;
									}

									self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });
									self.scrollingLock = false;
									self.loop = false;

								}
								else{
									if(self.changeBgSize){    
										if(self.nzHeight>self.nzWidth){ 
											if(self.options.zoomType == "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}         
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
										}
										else{                 
											if(self.options.zoomType != "lens"){     
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
											}      
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
										}
										self.changeBgSize = false;
									}                   

									self.zoomWindow.css({ backgroundPosition: self.xp + 'px ' + self.yp + 'px' });
								}       
							}, 16);
						}
					}   
					else{    
						if(self.changeBgSize){  
							if(self.nzHeight>self.nzWidth){  
								if(self.options.zoomType == "lens"){      
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
								} 

								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
							}
							else{     
								if(self.options.zoomType == "lens"){      
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
								} 
								if((self.largeHeight/self.newvaluewidth) < self.options.zoomWindowHeight){ 

									self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
								}
								else{

									self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });   
								}

							}
							self.changeBgSize = false;
						}     

						self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });       
					}
				} 
			},
			setTintPosition: function(e){
				var self = this;
				self.nzOffset = self.$elem.offset();
				self.tintpos = String(((e.pageX - self.nzOffset.left)-(self.zoomLens.width() / 2)) * (-1)); 
				self.tintposy = String(((e.pageY - self.nzOffset.top) - self.zoomLens.height() / 2) * (-1));	
				if(self.Etoppos){
					self.tintposy = 0;
				}
				if(self.Eloppos){
					self.tintpos=0;
				}     
				if(self.Eboppos){
					self.tintposy = (self.nzHeight-self.zoomLens.height()-(self.options.lensBorderSize*2))*(-1);
				} 
				if(self.Eroppos){
					self.tintpos = ((self.nzWidth-self.zoomLens.width()-(self.options.lensBorderSize*2))*(-1));
				}    
				if(self.options.tint) {
					//stops micro movements
					if(self.fullheight){
						self.tintposy = 0;

					}
					if(self.fullwidth){ 
						self.tintpos = 0;

					}   
					self.zoomTintImage.css({'left': self.tintpos+'px'});
					self.zoomTintImage.css({'top': self.tintposy+'px'});
				}
			},

			swaptheimage: function(smallimage, largeimage){
				var self = this;
				var newImg = new Image(); 

				if(self.options.loadingIcon){
					self.spinner = $('<div style="background: url(\''+self.options.loadingIcon+'\') no-repeat center;height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;z-index: 2000;position: absolute; background-position: center center;"></div>');
					self.$elem.after(self.spinner);
				}

				self.options.onImageSwap(self.$elem);

				newImg.onload = function() {
					self.largeWidth = newImg.width;
					self.largeHeight = newImg.height;
					self.zoomImage = largeimage;
					self.zoomWindow.css({ "background-size": self.largeWidth + 'px ' + self.largeHeight + 'px' });
					self.zoomWindow.css({ "background-size": self.largeWidth + 'px ' + self.largeHeight + 'px' });


					self.swapAction(smallimage, largeimage);
					return;              
				}          
				newImg.src = largeimage; // this must be done AFTER setting onload

			},
			swapAction: function(smallimage, largeimage){


				var self = this;    

				var newImg2 = new Image(); 
				newImg2.onload = function() {
					//re-calculate values
					self.nzHeight = newImg2.height;
					self.nzWidth = newImg2.width;
					self.options.onImageSwapComplete(self.$elem);

					self.doneCallback();  
					return;      
				}          
				newImg2.src = smallimage; 

				//reset the zoomlevel to that initially set in options
				self.currentZoomLevel = self.options.zoomLevel;
				self.options.maxZoomLevel = false;

				//swaps the main image
				//self.$elem.attr("src",smallimage);
				//swaps the zoom image     
				if(self.options.zoomType == "lens") {
					self.zoomLens.css({ backgroundImage: "url('" + largeimage + "')" }); 
				}
				if(self.options.zoomType == "window") {
					self.zoomWindow.css({ backgroundImage: "url('" + largeimage + "')" }); 
				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ backgroundImage: "url('" + largeimage + "')" }); 
				} 



				self.currentImage = largeimage;

				if(self.options.imageCrossfade){
					var oldImg = self.$elem;
					var newImg = oldImg.clone();         
					self.$elem.attr("src",smallimage)
					self.$elem.after(newImg);
					newImg.stop(true).fadeOut(self.options.imageCrossfade, function() {
						$(this).remove();         
					});

					//       				if(self.options.zoomType == "inner"){
					//remove any attributes on the cloned image so we can resize later
					self.$elem.width("auto").removeAttr("width");
					self.$elem.height("auto").removeAttr("height");
					//   }

					oldImg.fadeIn(self.options.imageCrossfade);

					if(self.options.tint && self.options.zoomType != "inner") {

						var oldImgTint = self.zoomTintImage;
						var newImgTint = oldImgTint.clone();         
						self.zoomTintImage.attr("src",largeimage)
						self.zoomTintImage.after(newImgTint);
						newImgTint.stop(true).fadeOut(self.options.imageCrossfade, function() {
							$(this).remove();         
						});



						oldImgTint.fadeIn(self.options.imageCrossfade);


						//self.zoomTintImage.attr("width",elem.data("image"));

						//resize the tint window
						self.zoomTint.css({ height: self.$elem.height()});
						self.zoomTint.css({ width: self.$elem.width()});
					}    

					self.zoomContainer.css("height", self.$elem.height());
					self.zoomContainer.css("width", self.$elem.width());

					if(self.options.zoomType == "inner"){ 
						if(!self.options.constrainType){
							self.zoomWrap.parent().css("height", self.$elem.height());
							self.zoomWrap.parent().css("width", self.$elem.width());

							self.zoomWindow.css("height", self.$elem.height());
							self.zoomWindow.css("width", self.$elem.width());
						}
					} 

					if(self.options.imageCrossfade){  
						self.zoomWrap.css("height", self.$elem.height());
						self.zoomWrap.css("width", self.$elem.width());
					} 
				}
				else{
					self.$elem.attr("src",smallimage); 
					if(self.options.tint) {
						self.zoomTintImage.attr("src",largeimage);
						//self.zoomTintImage.attr("width",elem.data("image"));
						self.zoomTintImage.attr("height",self.$elem.height());
						//self.zoomTintImage.attr('src') = elem.data("image");
						self.zoomTintImage.css({ height: self.$elem.height()}); 
						self.zoomTint.css({ height: self.$elem.height()});

					}
					self.zoomContainer.css("height", self.$elem.height());
					self.zoomContainer.css("width", self.$elem.width());

					if(self.options.imageCrossfade){  
						self.zoomWrap.css("height", self.$elem.height());
						self.zoomWrap.css("width", self.$elem.width());
					} 
				}              
				if(self.options.constrainType){     

					//This will contrain the image proportions
					if(self.options.constrainType == "height"){ 

						self.zoomContainer.css("height", self.options.constrainSize);
						self.zoomContainer.css("width", "auto");

						if(self.options.imageCrossfade){  
							self.zoomWrap.css("height", self.options.constrainSize);
							self.zoomWrap.css("width", "auto"); 
							self.constwidth = self.zoomWrap.width();


						}
						else{                  
							self.$elem.css("height", self.options.constrainSize);
							self.$elem.css("width", "auto");
							self.constwidth = self.$elem.width();
						} 

						if(self.options.zoomType == "inner"){

							self.zoomWrap.parent().css("height", self.options.constrainSize);
							self.zoomWrap.parent().css("width", self.constwidth);   
							self.zoomWindow.css("height", self.options.constrainSize);
							self.zoomWindow.css("width", self.constwidth);    
						}        
						if(self.options.tint){
							self.tintContainer.css("height", self.options.constrainSize);
							self.tintContainer.css("width", self.constwidth);
							self.zoomTint.css("height", self.options.constrainSize);
							self.zoomTint.css("width", self.constwidth);
							self.zoomTintImage.css("height", self.options.constrainSize);
							self.zoomTintImage.css("width", self.constwidth); 
						} 

					}
					if(self.options.constrainType == "width"){       
						self.zoomContainer.css("height", "auto");
						self.zoomContainer.css("width", self.options.constrainSize);

						if(self.options.imageCrossfade){
							self.zoomWrap.css("height", "auto");
							self.zoomWrap.css("width", self.options.constrainSize);
							self.constheight = self.zoomWrap.height();
						}
						else{            
							self.$elem.css("height", "auto");
							self.$elem.css("width", self.options.constrainSize); 
							self.constheight = self.$elem.height();              
						} 
						if(self.options.zoomType == "inner"){
							self.zoomWrap.parent().css("height", self.constheight);
							self.zoomWrap.parent().css("width", self.options.constrainSize);   
							self.zoomWindow.css("height", self.constheight);
							self.zoomWindow.css("width", self.options.constrainSize);    
						} 
						if(self.options.tint){
							self.tintContainer.css("height", self.constheight);
							self.tintContainer.css("width", self.options.constrainSize);
							self.zoomTint.css("height", self.constheight);
							self.zoomTint.css("width", self.options.constrainSize);
							self.zoomTintImage.css("height", self.constheight);
							self.zoomTintImage.css("width", self.options.constrainSize); 
						}   

					}        


				}

			},
			doneCallback: function(){

				var self = this;
				if(self.options.loadingIcon){
					self.spinner.hide();     
				}   

				self.nzOffset = self.$elem.offset();
				self.nzWidth = self.$elem.width();
				self.nzHeight = self.$elem.height();

				// reset the zoomlevel back to default
				self.currentZoomLevel = self.options.zoomLevel;

				//ratio of the large to small image
				self.widthRatio = self.largeWidth / self.nzWidth;
				self.heightRatio = self.largeHeight / self.nzHeight; 

				//NEED TO ADD THE LENS SIZE FOR ROUND
				// adjust images less than the window height
				if(self.options.zoomType == "window") {

					if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
						lensHeight = self.nzHeight;  

					}
					else{
						lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
					}

					if(self.options.zoomWindowWidth < self.options.zoomWindowWidth){
						lensWidth = self.nzWidth;
					}       
					else{
						lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
					}


					if(self.zoomLens){

						self.zoomLens.css('width', lensWidth);    
						self.zoomLens.css('height', lensHeight); 


					}
				}
			},
			getCurrentImage: function(){
				var self = this;  
				return self.zoomImage; 
			}, 
			getGalleryList: function(){
				var self = this;   
				//loop through the gallery options and set them in list for fancybox
				self.gallerylist = [];
				if (self.options.gallery){ 


					$('#'+self.options.gallery + ' a').each(function() {

						var img_src = '';
						if($(this).data("zoom-image")){
							img_src = $(this).data("zoom-image");
						}
						else if($(this).data("image")){
							img_src = $(this).data("image");
						}			
						//put the current image at the start
						if(img_src == self.zoomImage){
							self.gallerylist.unshift({
								href: ''+img_src+'',
								title: $(this).find('img').attr("title")
							});	
						}
						else{
							self.gallerylist.push({
								href: ''+img_src+'',
								title: $(this).find('img').attr("title")
							});
						}


					});
				}                                                       
				//if no gallery - return current image
				else{
					self.gallerylist.push({
						href: ''+self.zoomImage+'',
						title: $(this).find('img').attr("title")
					}); 
				}
				return self.gallerylist;

			},
			changeZoomLevel: function(value){
				var self = this;   

				//flag a zoom, so can adjust the easing during setPosition     
				self.scrollingLock = true;   

				//round to two decimal places
				self.newvalue = parseFloat(value).toFixed(2);
				newvalue = parseFloat(value).toFixed(2);




				//maxwidth & Maxheight of the image
				maxheightnewvalue = self.largeHeight/((self.options.zoomWindowHeight / self.nzHeight) * self.nzHeight);     
				maxwidthtnewvalue = self.largeWidth/((self.options.zoomWindowWidth / self.nzWidth) * self.nzWidth);   	




				//calculate new heightratio
				if(self.options.zoomType != "inner")
				{
					if(maxheightnewvalue <= newvalue){
						self.heightRatio = (self.largeHeight/maxheightnewvalue) / self.nzHeight;
						self.newvalueheight = maxheightnewvalue;
						self.fullheight = true;

					}
					else{
						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 
						self.newvalueheight = newvalue;
						self.fullheight = false;

					}


//					calculate new width ratio

					if(maxwidthtnewvalue <= newvalue){
						self.widthRatio = (self.largeWidth/maxwidthtnewvalue) / self.nzWidth;
						self.newvaluewidth = maxwidthtnewvalue;
						self.fullwidth = true;

					}
					else{
						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						self.newvaluewidth = newvalue;
						self.fullwidth = false;

					}
					if(self.options.zoomType == "lens"){
						if(maxheightnewvalue <= newvalue){
							self.fullwidth = true;
							self.newvaluewidth = maxheightnewvalue;

						} else{
							self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
							self.newvaluewidth = newvalue;

							self.fullwidth = false;
						}}
				}



				if(self.options.zoomType == "inner")
				{
					maxheightnewvalue = parseFloat(self.largeHeight/self.nzHeight).toFixed(2);     
					maxwidthtnewvalue = parseFloat(self.largeWidth/self.nzWidth).toFixed(2);      
					if(newvalue > maxheightnewvalue){
						newvalue = maxheightnewvalue;
					}
					if(newvalue > maxwidthtnewvalue){
						newvalue = maxwidthtnewvalue;
					}      


					if(maxheightnewvalue <= newvalue){


						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 
						if(newvalue > maxheightnewvalue){
							self.newvalueheight = maxheightnewvalue;
						}else{
							self.newvalueheight = newvalue;
						}
						self.fullheight = true;


					}
					else{



						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 

						if(newvalue > maxheightnewvalue){

							self.newvalueheight = maxheightnewvalue;
						}else{
							self.newvalueheight = newvalue;
						}
						self.fullheight = false;
					}




					if(maxwidthtnewvalue <= newvalue){   

						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						if(newvalue > maxwidthtnewvalue){

							self.newvaluewidth = maxwidthtnewvalue;
						}else{
							self.newvaluewidth = newvalue;
						}

						self.fullwidth = true;


					}
					else{  

						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						self.newvaluewidth = newvalue;
						self.fullwidth = false;
					}        


				} //end inner
				scrcontinue = false;

				if(self.options.zoomType == "inner"){

					if(self.nzWidth >= self.nzHeight){
						if( self.newvaluewidth <= maxwidthtnewvalue){
							scrcontinue = true;
						}
						else{

							scrcontinue = false;
							self.fullheight = true;
							self.fullwidth = true;
						}
					}
					if(self.nzHeight > self.nzWidth){     
						if( self.newvaluewidth <= maxwidthtnewvalue){
							scrcontinue = true;
						}
						else{
							scrcontinue = false;  

							self.fullheight = true;
							self.fullwidth = true;
						}
					}
				}

				if(self.options.zoomType != "inner"){
					scrcontinue = true;
				}

				if(scrcontinue){



					self.zoomLock = 0;
					self.changeZoom = true;

					//if lens height is less than image height


					if(((self.options.zoomWindowHeight)/self.heightRatio) <= self.nzHeight){


						self.currentZoomLevel = self.newvalueheight; 
						if(self.options.zoomType != "lens" && self.options.zoomType != "inner") {
							self.changeBgSize = true;

							self.zoomLens.css({height: String((self.options.zoomWindowHeight)/self.heightRatio) + 'px' }) 
						}
						if(self.options.zoomType == "lens" || self.options.zoomType == "inner") {  
							self.changeBgSize = true;  
						}	


					} 




					if((self.options.zoomWindowWidth/self.widthRatio) <= self.nzWidth){



						if(self.options.zoomType != "inner"){
							if(self.newvaluewidth > self.newvalueheight)   {
								self.currentZoomLevel = self.newvaluewidth;                 

							}
						}

						if(self.options.zoomType != "lens" && self.options.zoomType != "inner") {
							self.changeBgSize = true;

							self.zoomLens.css({width: String((self.options.zoomWindowWidth)/self.widthRatio) + 'px' })
						}
						if(self.options.zoomType == "lens" || self.options.zoomType == "inner") {  
							self.changeBgSize = true;
						}	

					}
					if(self.options.zoomType == "inner"){
						self.changeBgSize = true;  

						if(self.nzWidth > self.nzHeight){
							self.currentZoomLevel = self.newvaluewidth;
						}
						if(self.nzHeight > self.nzWidth){
							self.currentZoomLevel = self.newvaluewidth;
						}
					}

				}      //under

				//sets the boundry change, called in setWindowPos
				self.setPosition(self.currentLoc);
				//
			},
			closeAll: function(){
				if(self.zoomWindow){self.zoomWindow.hide();}
				if(self.zoomLens){self.zoomLens.hide();}
				if(self.zoomTint){self.zoomTint.hide();}
			},
			changeState: function(value){
      	var self = this;
				if(value == 'enable'){self.options.zoomEnabled = true;}
				if(value == 'disable'){self.options.zoomEnabled = false;}

			}

	};




	$.fn.elevateZoom = function( options ) {
		return this.each(function() {
			var elevate = Object.create( ElevateZoom );

			elevate.init( options, this );

			$.data( this, 'elevateZoom', elevate );

		});
	};

	$.fn.elevateZoom.options = {
			zoomActivation: "hover", // Can also be click (PLACEHOLDER FOR NEXT VERSION)
      zoomEnabled: true, //false disables zoomwindow from showing
			preloading: 1, //by default, load all the images, if 0, then only load images after activated (PLACEHOLDER FOR NEXT VERSION)
			zoomLevel: 1, //default zoom level of image
			scrollZoom: false, //allow zoom on mousewheel, true to activate
			scrollZoomIncrement: 0.1,  //steps of the scrollzoom
			minZoomLevel: false,
			maxZoomLevel: false,
			easing: false,
			easingAmount: 12,
			lensSize: 200,
			zoomWindowWidth: 400,
			zoomWindowHeight: 400,
			zoomWindowOffetx: 0,
			zoomWindowOffety: 0,
			zoomWindowPosition: 1,
			zoomWindowBgColour: "#fff",
			lensFadeIn: false,
			lensFadeOut: false,
			debug: false,
			zoomWindowFadeIn: false,
			zoomWindowFadeOut: false,
			zoomWindowAlwaysShow: false,
			zoomTintFadeIn: false,
			zoomTintFadeOut: false,
			borderSize: 4,
			showLens: true,
			borderColour: "#888",
			lensBorderSize: 1,
			lensBorderColour: "#000",
			lensShape: "square", //can be "round"
			zoomType: "window", //window is default,  also "lens" available -
			containLensZoom: false,
			lensColour: "white", //colour of the lens background
			lensOpacity: 0.4, //opacity of the lens
			lenszoom: false,
			tint: false, //enable the tinting
			tintColour: "#333", //default tint color, can be anything, red, #ccc, rgb(0,0,0)
			tintOpacity: 0.4, //opacity of the tint
			gallery: false,
			galleryActiveClass: "zoomGalleryActive",
			imageCrossfade: false,
			constrainType: false,  //width or height
			constrainSize: false,  //in pixels the dimensions you want to constrain on
			loadingIcon: false, //http://www.example.com/spinner.gif
			cursor:"default", // user should set to what they want the cursor as, if they have set a click function
			responsive:true,
			onComplete: $.noop,
			onZoomedImageLoaded: function() {},
			onImageSwap: $.noop,
			onImageSwapComplete: $.noop
	};

})( jQuery, window, document );
/*! 
 * angular-loading-bar v0.6.0
 * https://chieffancypants.github.io/angular-loading-bar
 * Copyright (c) 2014 Wes Cruver
 * License: MIT
 */
/*
 * angular-loading-bar
 *
 * intercepts XHR requests and creates a loading bar.
 * Based on the excellent nprogress work by rstacruz (more info in readme)
 *
 * (c) 2013 Wes Cruver
 * License: MIT
 */


(function() {

'use strict';

// Alias the loading bar for various backwards compatibilities since the project has matured:
angular.module('angular-loading-bar', ['cfp.loadingBarInterceptor']);
angular.module('chieffancypants.loadingBar', ['cfp.loadingBarInterceptor']);


/**
 * loadingBarInterceptor service
 *
 * Registers itself as an Angular interceptor and listens for XHR requests.
 */
angular.module('cfp.loadingBarInterceptor', ['cfp.loadingBar'])
  .config(['$httpProvider', function ($httpProvider) {

    var interceptor = ['$q', '$cacheFactory', '$timeout', '$rootScope', 'cfpLoadingBar', function ($q, $cacheFactory, $timeout, $rootScope, cfpLoadingBar) {

      /**
       * The total number of requests made
       */
      var reqsTotal = 0;

      /**
       * The number of requests completed (either successfully or not)
       */
      var reqsCompleted = 0;

      /**
       * The amount of time spent fetching before showing the loading bar
       */
      var latencyThreshold = cfpLoadingBar.latencyThreshold;

      /**
       * $timeout handle for latencyThreshold
       */
      var startTimeout;


      /**
       * calls cfpLoadingBar.complete() which removes the
       * loading bar from the DOM.
       */
      function setComplete() {
        $timeout.cancel(startTimeout);
        cfpLoadingBar.complete();
        reqsCompleted = 0;
        reqsTotal = 0;
      }

      /**
       * Determine if the response has already been cached
       * @param  {Object}  config the config option from the request
       * @return {Boolean} retrns true if cached, otherwise false
       */
      function isCached(config) {
        var cache;
        var defaultCache = $cacheFactory.get('$http');
        var defaults = $httpProvider.defaults;

        // Choose the proper cache source. Borrowed from angular: $http service
        if ((config.cache || defaults.cache) && config.cache !== false &&
          (config.method === 'GET' || config.method === 'JSONP')) {
            cache = angular.isObject(config.cache) ? config.cache
              : angular.isObject(defaults.cache) ? defaults.cache
              : defaultCache;
        }

        var cached = cache !== undefined ?
          cache.get(config.url) !== undefined : false;

        if (config.cached !== undefined && cached !== config.cached) {
          return config.cached;
        }
        config.cached = cached;
        return cached;
      }


      return {
        'request': function(config) {
          // Check to make sure this request hasn't already been cached and that
          // the requester didn't explicitly ask us to ignore this request:
          if (!config.ignoreLoadingBar && !isCached(config)) {
            $rootScope.$broadcast('cfpLoadingBar:loading', {url: config.url});
            if (reqsTotal === 0) {
              startTimeout = $timeout(function() {
                cfpLoadingBar.start();
              }, latencyThreshold);
            }
            reqsTotal++;
            cfpLoadingBar.set(reqsCompleted / reqsTotal);
          }
          return config;
        },

        'response': function(response) {
          if (!response.config.ignoreLoadingBar && !isCached(response.config)) {
            reqsCompleted++;
            $rootScope.$broadcast('cfpLoadingBar:loaded', {url: response.config.url});
            if (reqsCompleted >= reqsTotal) {
              setComplete();
            } else {
              cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
          }
          return response;
        },

        'responseError': function(rejection) {
          if (!rejection.config.ignoreLoadingBar && !isCached(rejection.config)) {
            reqsCompleted++;
            $rootScope.$broadcast('cfpLoadingBar:loaded', {url: rejection.config.url});
            if (reqsCompleted >= reqsTotal) {
              setComplete();
            } else {
              cfpLoadingBar.set(reqsCompleted / reqsTotal);
            }
          }
          return $q.reject(rejection);
        }
      };
    }];

    $httpProvider.interceptors.push(interceptor);
  }]);


/**
 * Loading Bar
 *
 * This service handles adding and removing the actual element in the DOM.
 * Generally, best practices for DOM manipulation is to take place in a
 * directive, but because the element itself is injected in the DOM only upon
 * XHR requests, and it's likely needed on every view, the best option is to
 * use a service.
 */
angular.module('cfp.loadingBar', [])
  .provider('cfpLoadingBar', function() {

    this.includeSpinner = true;
    this.includeBar = true;
    this.latencyThreshold = 100;
    this.startSize = 0.02;
    this.parentSelector = 'body';
    this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>';
    this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';

    this.$get = ['$injector', '$document', '$timeout', '$rootScope', function ($injector, $document, $timeout, $rootScope) {
      var $animate;
      var $parentSelector = this.parentSelector,
        loadingBarContainer = angular.element(this.loadingBarTemplate),
        loadingBar = loadingBarContainer.find('div').eq(0),
        spinner = angular.element(this.spinnerTemplate);

      var incTimeout,
        completeTimeout,
        started = false,
        status = 0;

      var includeSpinner = this.includeSpinner;
      var includeBar = this.includeBar;
      var startSize = this.startSize;

      /**
       * Inserts the loading bar element into the dom, and sets it to 2%
       */
      function _start() {
        if (!$animate) {
          $animate = $injector.get('$animate');
        }

        var $parent = $document.find($parentSelector).eq(0);
        $timeout.cancel(completeTimeout);

        // do not continually broadcast the started event:
        if (started) {
          return;
        }

        $rootScope.$broadcast('cfpLoadingBar:started');
        started = true;

        if (includeBar) {
          $animate.enter(loadingBarContainer, $parent);
        }

        if (includeSpinner) {
          $animate.enter(spinner, $parent);
        }

        _set(startSize);
      }

      /**
       * Set the loading bar's width to a certain percent.
       *
       * @param n any value between 0 and 1
       */
      function _set(n) {
        if (!started) {
          return;
        }
        var pct = (n * 100) + '%';
        loadingBar.css('width', pct);
        status = n;

        // increment loadingbar to give the illusion that there is always
        // progress but make sure to cancel the previous timeouts so we don't
        // have multiple incs running at the same time.
        $timeout.cancel(incTimeout);
        incTimeout = $timeout(function() {
          _inc();
        }, 250);
      }

      /**
       * Increments the loading bar by a random amount
       * but slows down as it progresses
       */
      function _inc() {
        if (_status() >= 1) {
          return;
        }

        var rnd = 0;

        // TODO: do this mathmatically instead of through conditions

        var stat = _status();
        if (stat >= 0 && stat < 0.25) {
          // Start out between 3 - 6% increments
          rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
        } else if (stat >= 0.25 && stat < 0.65) {
          // increment between 0 - 3%
          rnd = (Math.random() * 3) / 100;
        } else if (stat >= 0.65 && stat < 0.9) {
          // increment between 0 - 2%
          rnd = (Math.random() * 2) / 100;
        } else if (stat >= 0.9 && stat < 0.99) {
          // finally, increment it .5 %
          rnd = 0.005;
        } else {
          // after 99%, don't increment:
          rnd = 0;
        }

        var pct = _status() + rnd;
        _set(pct);
      }

      function _status() {
        return status;
      }

      function _completeAnimation() {
        status = 0;
        started = false;
      }

      function _complete() {
        if (!$animate) {
          $animate = $injector.get('$animate');
        }

        $rootScope.$broadcast('cfpLoadingBar:completed');
        _set(1);

        $timeout.cancel(completeTimeout);

        // Attempt to aggregate any start/complete calls within 500ms:
        completeTimeout = $timeout(function() {
          var promise = $animate.leave(loadingBarContainer, _completeAnimation);
          if (promise && promise.then) {
            promise.then(_completeAnimation);
          }
          $animate.leave(spinner);
        }, 500);
      }

      return {
        start            : _start,
        set              : _set,
        status           : _status,
        inc              : _inc,
        complete         : _complete,
        includeSpinner   : this.includeSpinner,
        latencyThreshold : this.latencyThreshold,
        parentSelector   : this.parentSelector,
        startSize        : this.startSize
      };


    }];     //
  });       // wtf javascript. srsly
})();       //

/* =========================================================
 * bootstrap-slider.js v2.0.0
 * http://www.eyecon.ro/bootstrap-slider
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
 
!function( $ ) {

	var Slider = function(element, options) {
		this.element = $(element);
		this.picker = $('<div class="slider">'+
							'<div class="slider-track">'+
								'<div class="slider-selection"></div>'+
								'<div class="slider-handle"></div>'+
								'<div class="slider-handle"></div>'+
							'</div>'+
							'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'+
						'</div>')
							.insertBefore(this.element)
							.append(this.element);
		this.id = this.element.data('slider-id')||options.id;
		if (this.id) {
			this.picker[0].id = this.id;
		}

		if (typeof Modernizr !== 'undefined' && Modernizr.touch) {
			this.touchCapable = true;
		}

		var tooltip = this.element.data('slider-tooltip')||options.tooltip;

		this.tooltip = this.picker.find('.tooltip');
		this.tooltipInner = this.tooltip.find('div.tooltip-inner');

		this.orientation = this.element.data('slider-orientation')||options.orientation;
		switch(this.orientation) {
			case 'vertical':
				this.picker.addClass('slider-vertical');
				this.stylePos = 'top';
				this.mousePos = 'pageY';
				this.sizePos = 'offsetHeight';
				this.tooltip.addClass('right')[0].style.left = '100%';
				break;
			default:
				this.picker
					.addClass('slider-horizontal')
					.css('width', this.element.outerWidth());
				this.orientation = 'horizontal';
				this.stylePos = 'left';
				this.mousePos = 'pageX';
				this.sizePos = 'offsetWidth';
				this.tooltip.addClass('top')[0].style.top = -this.tooltip.outerHeight() - 14 + 'px';
				break;
		}

		this.min = this.element.data('slider-min')||options.min;
		this.max = this.element.data('slider-max')||options.max;
		this.step = this.element.data('slider-step')||options.step;
		this.value = this.element.data('slider-value')||options.value;
		if (this.value[1]) {
			this.range = true;
		}

		this.selection = this.element.data('slider-selection')||options.selection;
		this.selectionEl = this.picker.find('.slider-selection');
		if (this.selection === 'none') {
			this.selectionEl.addClass('hide');
		}
		this.selectionElStyle = this.selectionEl[0].style;


		this.handle1 = this.picker.find('.slider-handle:first');
		this.handle1Stype = this.handle1[0].style;
		this.handle2 = this.picker.find('.slider-handle:last');
		this.handle2Stype = this.handle2[0].style;

		var handle = this.element.data('slider-handle')||options.handle;
		switch(handle) {
			case 'round':
				this.handle1.addClass('round');
				this.handle2.addClass('round');
				break
			case 'triangle':
				this.handle1.addClass('triangle');
				this.handle2.addClass('triangle');
				break
		}

		if (this.range) {
			this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0]));
			this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]));
		} else {
			this.value = [ Math.max(this.min, Math.min(this.max, this.value))];
			this.handle2.addClass('hide');
			if (this.selection == 'after') {
				this.value[1] = this.max;
			} else {
				this.value[1] = this.min;
			}
		}
		this.diff = this.max - this.min;
		this.percentage = [
			(this.value[0]-this.min)*100/this.diff,
			(this.value[1]-this.min)*100/this.diff,
			this.step*100/this.diff
		];

		this.offset = this.picker.offset();
		this.size = this.picker[0][this.sizePos];

		this.formater = options.formater;

		this.layout();

		if (this.touchCapable) {
			// Touch: Bind touch events:
			this.picker.on({
				touchstart: $.proxy(this.mousedown, this)
			});
		} else {
			this.picker.on({
				mousedown: $.proxy(this.mousedown, this)
			});
		}

		if (tooltip === 'show') {
			this.picker.on({
				mouseenter: $.proxy(this.showTooltip, this),
				mouseleave: $.proxy(this.hideTooltip, this)
			});
		} else {
			this.tooltip.addClass('hide');
		}
	};

	Slider.prototype = {
		constructor: Slider,

		over: false,
		inDrag: false,
		
		showTooltip: function(){
			this.tooltip.addClass('in');
			//var left = Math.round(this.percent*this.width);
			//this.tooltip.css('left', left - this.tooltip.outerWidth()/2);
			this.over = true;
		},
		
		hideTooltip: function(){
			if (this.inDrag === false) {
				this.tooltip.removeClass('in');
			}
			this.over = false;
		},

		layout: function(){
			this.handle1Stype[this.stylePos] = this.percentage[0]+'%';
			this.handle2Stype[this.stylePos] = this.percentage[1]+'%';
			if (this.orientation == 'vertical') {
				this.selectionElStyle.top = Math.min(this.percentage[0], this.percentage[1]) +'%';
				this.selectionElStyle.height = Math.abs(this.percentage[0] - this.percentage[1]) +'%';
			} else {
				this.selectionElStyle.left = Math.min(this.percentage[0], this.percentage[1]) +'%';
				this.selectionElStyle.width = Math.abs(this.percentage[0] - this.percentage[1]) +'%';
			}
			if (this.range) {
				this.tooltipInner.text(
					this.formater(this.value[0]) + 
					' : ' + 
					this.formater(this.value[1])
				);
				this.tooltip[0].style[this.stylePos] = this.size * (this.percentage[0] + (this.percentage[1] - this.percentage[0])/2)/100 - (this.orientation === 'vertical' ? this.tooltip.outerHeight()/2 : this.tooltip.outerWidth()/2) +'px';
			} else {
				this.tooltipInner.text(
					this.formater(this.value[0])
				);
				this.tooltip[0].style[this.stylePos] = this.size * this.percentage[0]/100 - (this.orientation === 'vertical' ? this.tooltip.outerHeight()/2 : this.tooltip.outerWidth()/2) +'px';
			}
		},

		mousedown: function(ev) {

			// Touch: Get the original event:
			if (this.touchCapable && ev.type === 'touchstart') {
				ev = ev.originalEvent;
			}

			this.offset = this.picker.offset();
			this.size = this.picker[0][this.sizePos];

			var percentage = this.getPercentage(ev);

			if (this.range) {
				var diff1 = Math.abs(this.percentage[0] - percentage);
				var diff2 = Math.abs(this.percentage[1] - percentage);
				this.dragged = (diff1 < diff2) ? 0 : 1;
			} else {
				this.dragged = 0;
			}

			this.percentage[this.dragged] = percentage;
			this.layout();

			if (this.touchCapable) {
				// Touch: Bind touch events:
				$(document).on({
					touchmove: $.proxy(this.mousemove, this),
					touchend: $.proxy(this.mouseup, this)
				});
			} else {
				$(document).on({
					mousemove: $.proxy(this.mousemove, this),
					mouseup: $.proxy(this.mouseup, this)
				});
			}

			this.inDrag = true;
			var val = this.calculateValue();
			this.element.trigger({
					type: 'slideStart',
					value: val
				}).trigger({
					type: 'slide',
					value: val
				});
			return false;
		},

		mousemove: function(ev) {
			
			// Touch: Get the original event:
			if (this.touchCapable && ev.type === 'touchmove') {
				ev = ev.originalEvent;
			}

			var percentage = this.getPercentage(ev);
			if (this.range) {
				if (this.dragged === 0 && this.percentage[1] < percentage) {
					this.percentage[0] = this.percentage[1];
					this.dragged = 1;
				} else if (this.dragged === 1 && this.percentage[0] > percentage) {
					this.percentage[1] = this.percentage[0];
					this.dragged = 0;
				}
			}
			this.percentage[this.dragged] = percentage;
			this.layout();
			var val = this.calculateValue();
			this.element
				.trigger({
					type: 'slide',
					value: val
				})
				.data('value', val)
				.prop('value', val);
			return false;
		},

		mouseup: function(ev) {
			if (this.touchCapable) {
				// Touch: Bind touch events:
				$(document).off({
					touchmove: this.mousemove,
					touchend: this.mouseup
				});
			} else {
				$(document).off({
					mousemove: this.mousemove,
					mouseup: this.mouseup
				});
			}

			this.inDrag = false;
			if (this.over == false) {
				this.hideTooltip();
			}
			this.element;
			var val = this.calculateValue();
			this.element
				.trigger({
					type: 'slideStop',
					value: val
				})
				.data('value', val)
				.prop('value', val);
			return false;
		},

		calculateValue: function() {
			var val;
			if (this.range) {
				val = [
					(this.min + Math.round((this.diff * this.percentage[0]/100)/this.step)*this.step),
					(this.min + Math.round((this.diff * this.percentage[1]/100)/this.step)*this.step)
				];
				this.value = val;
			} else {
				val = (this.min + Math.round((this.diff * this.percentage[0]/100)/this.step)*this.step);
				this.value = [val, this.value[1]];
			}
			return val;
		},

		getPercentage: function(ev) {
			if (this.touchCapable) {
				ev = ev.touches[0];
			}
			var percentage = (ev[this.mousePos] - this.offset[this.stylePos])*100/this.size;
			percentage = Math.round(percentage/this.percentage[2])*this.percentage[2];
			return Math.max(0, Math.min(100, percentage));
		},

		getValue: function() {
			if (this.range) {
				return this.value;
			}
			return this.value[0];
		},

		setValue: function(val) {
			this.value = val;

			if (this.range) {
				this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0]));
				this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]));
			} else {
				this.value = [ Math.max(this.min, Math.min(this.max, this.value))];
				this.handle2.addClass('hide');
				if (this.selection == 'after') {
					this.value[1] = this.max;
				} else {
					this.value[1] = this.min;
				}
			}
			this.diff = this.max - this.min;
			this.percentage = [
				(this.value[0]-this.min)*100/this.diff,
				(this.value[1]-this.min)*100/this.diff,
				this.step*100/this.diff
			];
			this.layout();
		}
	};

	$.fn.slider = function ( option, val ) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('slider'),
				options = typeof option === 'object' && option;
			if (!data)  {
				$this.data('slider', (data = new Slider(this, $.extend({}, $.fn.slider.defaults,options))));
			}
			if (typeof option == 'string') {
				data[option](val);
			}
		})
	};

	$.fn.slider.defaults = {
		min: 0,
		max: 10,
		step: 1,
		orientation: 'horizontal',
		value: 5,
		selection: 'before',
		tooltip: 'show',
		handle: 'round',
		formater: function(value) {
			return value;
		}
	};

	$.fn.slider.Constructor = Slider;

}( window.jQuery );

(function (angular, document) {

     var mod = angular.module('viewhead', []);

     mod.directive(
         'viewTitle',
         ['$rootScope', function ($rootScope) {
             return {
                 restrict: 'EA',
                 link: function (scope, iElement, iAttrs, controller, transcludeFn) {
                     // If we've been inserted as an element then we detach from the DOM because the caller
                     // doesn't want us to have any visual impact in the document.
                     // Otherwise, we're piggy-backing on an existing element so we'll just leave it alone.
                     var tagName = iElement[0].tagName.toLowerCase();
                     if (tagName === 'view-title' || tagName === 'viewtitle') {
                         iElement.remove();
                     }

                     scope.$watch(
                         function () {
                             return iElement.text();
                         },
                         function (newTitle) {
                             $rootScope.viewTitle = newTitle;
                         }
                     );
                     scope.$on(
                         '$destroy',
                         function () {
                             delete $rootScope.viewTitle;
                         }
                     );
                 }
             };
         }]
     );

     mod.directive(
         'viewHead',
         function () {
             var head = angular.element(document.head);
             return {
                 restrict: 'A',
                 link: function (scope, iElement, iAttrs, controller, transcludeFn) {
                     // Move the element into the head of the document.
                     // Although the physical location of the document changes, the element remains
                     // bound to the scope in which it was declared, so it can refer to variables from
                     // the view scope if necessary.
                     head.append(iElement);

                     // When the scope is destroyed, remove the element.
                     // This is on the assumption that we're being used in some sort of view scope.
                     // It doesn't make sense to use this directive outside of the view, and nor does it
                     // make sense to use it inside other scope-creating directives like ng-repeat.
                     scope.$on(
                         '$destroy',
                         function () {
                             iElement.remove();
                         }
                     );
                 }
             };
         }
     );

     mod.directive(
        'ogTitle',
        ['$rootScope', function ($rootScope) {
            return {
                restrict: 'EA',
                link: function (scope, iElement, iAttrs, controller, transcludeFn) {                  
                    var tagName = iElement[0].tagName.toLowerCase();
                    if (tagName === 'og-title' || tagName === 'ogtitle') {
                        iElement.remove();
                    }

                    scope.$watch(
                        function () {
                            return iElement.text();
                        },
                        function (newTitle) {
                            $rootScope.ogTitle = newTitle;
                        }
                    );
                    scope.$on(
                        '$destroy',
                        function () {
                            delete $rootScope.ogTitle;
                        }
                    );
                }
            };
        }]
    );

     mod.directive(
       'ogDescription',
       ['$rootScope', function ($rootScope) {
           return {
               restrict: 'EA',
               link: function (scope, iElement, iAttrs, controller, transcludeFn) {
                   var tagName = iElement[0].tagName.toLowerCase();
                   if (tagName === 'og-description' || tagName === 'ogDescription') {
                       iElement.remove();
                   }

                   scope.$watch(
                       function () {
                           return iElement.text();
                       },
                       function (newogDesc) {
                           $rootScope.ogDescription = newogDesc;
                       }
                   );
                   scope.$on(
                       '$destroy',
                       function () {
                           delete $rootScope.ogDescription;
                       }
                   );
               }
           };
       }]
   );

     mod.directive(
   'ogImage',
   ['$rootScope', function ($rootScope) {
       return {
           restrict: 'EA',
           link: function (scope, iElement, iAttrs, controller, transcludeFn) {
               var tagName = iElement[0].tagName.toLowerCase();
               if (tagName === 'og-image' || tagName === 'ogImage') {
                   iElement.remove();
               }

               scope.$watch(
                   function () {
                       return iElement.text();
                   },
                   function (newogImage) {
                       $rootScope.ogImage = newogImage;
                   }
               );
               scope.$on(
                   '$destroy',
                   function () {
                       delete $rootScope.ogImage;
                   }
               );
           }
       };
   }]
);



})(angular, document);

(function(window, angular, undefined) {
  'use strict';

  // Module global settings.
  var settings = {};

  // Module global flags.
  var flags = {
    sdk: false,
    ready: false
  };

  // Deferred Object which will be resolved when the Facebook SDK is ready
  // and the `fbAsyncInit` function is called.
  var loadDeferred;

  /**
   * @name facebook
   * @kind function
   * @description
   * An Angularjs module to take approach of Facebook javascript sdk.
   *
   * @author Luis Carlos Osorio Jayk <luiscarlosjayk@gmail.com>
   */
  angular.module('facebook', []).

    // Declare module settings value
    value('settings', settings).

    // Declare module flags value
    value('flags', flags).

    /**
     * Facebook provider
     */
    provider('Facebook', [
      function() {

        /**
         * Facebook appId
         * @type {Number}
         */
        settings.appId = null;

        this.setAppId = function(appId) {
          settings.appId = appId;
        };

        this.getAppId = function() {
          return settings.appId;
        };

        /**
         * Locale language, english by default
         * @type {String}
         */
        settings.locale = 'en_US';

        this.setLocale = function(locale) {
          settings.locale = locale;
        };

        this.getLocale = function() {
          return settings.locale;
        };

        /**
         * Set if you want to check the authentication status
         * at the start up of the app
         * @type {Boolean}
         */
        settings.status = true;

        this.setStatus = function(status) {
          settings.status = status;
        };

        this.getStatus = function() {
          return settings.status;
        };

        /**
         * Adding a Channel File improves the performance of the javascript SDK,
         * by addressing issues with cross-domain communication in certain browsers.
         * @type {String}
         */
        settings.channelUrl = null;

        this.setChannel = function(channel) {
          settings.channelUrl = channel;
        };

        this.getChannel = function() {
          return settings.channelUrl;
        };

        /**
         * Enable cookies to allow the server to access the session
         * @type {Boolean}
         */
        settings.cookie = true;

        this.setCookie = function(cookie) {
          settings.cookie = cookie;
        };

        this.getCookie = function() {
          return settings.cookie;
        };

        /**
         * Parse XFBML
         * @type {Boolean}
         */
        settings.xfbml = true;

        this.setXfbml = function(enable) {
          settings.xfbml = enable;
        };

        this.getXfbml = function() {
          return settings.xfbml;
        };

        /**
         * Auth Response
         * @type {Object}
         */

        this.setAuthResponse = function(obj) {
          settings.authResponse = obj || true;
        };

        this.getAuthResponse = function() {
          return settings.authResponse;
        };

        /**
         * Frictionless Requests
         * @type {Boolean}
         */
        settings.frictionlessRequests = false;

        this.setFrictionlessRequests = function(enable) {
          settings.frictionlessRequests = enable;
        };

        this.getFrictionlessRequests = function() {
          return settings.frictionlessRequests;
        };

        /**
         * HideFlashCallback
         * @type {Object}
         */
        settings.hideFlashCallback = null;

        this.setHideFlashCallback = function(obj) {
          settings.hideFlashCallback = obj || null;
        };

        this.getHideFlashCallback = function() {
          return settings.hideFlashCallback;
        };

        /**
         * Custom option setting
         * key @type {String}
         * value @type {*}
         * @return {*}
         */
        this.setInitCustomOption = function(key, value) {
          if (!angular.isString(key)) {
            return false;
          }

          settings[key] = value;
          return settings[key];
        };

        /**
         * get init option
         * @param  {String} key
         * @return {*}
         */
        this.getInitOption = function(key) {
          // If key is not String or If non existing key return null
          if (!angular.isString(key) || !settings.hasOwnProperty(key)) {
            return false;
          }

          return settings[key];
        };

        /**
         * load SDK
         */
        settings.loadSDK = true;

        this.setLoadSDK = function(a) {
          settings.loadSDK = !!a;
        };

        this.getLoadSDK = function() {
          return settings.loadSDK;
        };

        /**
         * SDK version
         */
        settings.version = 'v2.0';

        this.setSdkVersion = function(version) {
          settings.version = version;
        };

        this.getSdkVersion = function() {
          return settings.version;
        };

        /**
         * Init Facebook API required stuff
         * This will prepare the app earlier (on settingsuration)
         * @arg {Object/String} initSettings
         * @arg {Boolean} _loadSDK (optional, true by default)
         */
        this.init = function(initSettings, _loadSDK) {
          // If string is passed, set it as appId
          if (angular.isString(initSettings)) {
            settings.appId = initSettings;
          }

          if(angular.isNumber(initSettings)) {
            settings.appId = initSettings.toString();
          }

          // If object is passed, merge it with app settings
          if (angular.isObject(initSettings)) {
            angular.extend(settings, initSettings);
          }

          // Set if Facebook SDK should be loaded automatically or not.
          if (angular.isDefined(_loadSDK)) {
            settings.loadSDK = !!_loadSDK;
          }
        };

        /**
         * This defined the Facebook service
         */
        this.$get = [
          '$q',
          '$rootScope',
          '$timeout',
          '$window',
          function($q, $rootScope, $timeout, $window) {
            /**
             * This is the NgFacebook class to be retrieved on Facebook Service request.
             */
            function NgFacebook() {
              this.appId = settings.appId;
            }

            /**
             * Ready state method
             * @return {Boolean}
             */
            NgFacebook.prototype.isReady = function() {
              return flags.ready;
            };

            NgFacebook.prototype.login = function () {

              var d = $q.defer(),
                  args = Array.prototype.slice.call(arguments),
                  userFn,
                  userFnIndex; // Converts arguments passed into an array

                // Get user function and it's index in the arguments array,
                // to replace it with custom function, allowing the usage of promises
                angular.forEach(args, function(arg, index) {
                  if (angular.isFunction(arg)) {
                    userFn = arg;
                    userFnIndex = index;
                  }
                });

                // Replace user function intended to be passed to the Facebook API with a custom one
                // for being able to use promises.
                if (angular.isFunction(userFn) && angular.isNumber(userFnIndex)) {
                  args.splice(userFnIndex, 1, function(response) {
                    $timeout(function() {

                      if (response && angular.isUndefined(response.error)) {
                        d.resolve(response);
                      } else {
                        d.reject(response);
                      }

                      if (angular.isFunction(userFn)) {
                        userFn(response);
                      }
                    });
                  });
                }

                // review(mrzmyr): generalize behaviour of isReady check
                if (this.isReady()) {
                  $window.FB.login.apply($window.FB, args);
                } else {
                  $timeout(function() {
                    d.reject("Facebook.login() called before Facebook SDK has loaded.");
                  });
                }

                return d.promise;
            };

            /**
             * Map some asynchronous Facebook SDK methods to NgFacebook
             */
            angular.forEach([
              'logout',
              'api',
              'ui',
              'getLoginStatus'
            ], function(name) {
              NgFacebook.prototype[name] = function() {

                var d = $q.defer(),
                    args = Array.prototype.slice.call(arguments), // Converts arguments passed into an array
                    userFn,
                    userFnIndex;

                // Get user function and it's index in the arguments array,
                // to replace it with custom function, allowing the usage of promises
                angular.forEach(args, function(arg, index) {
                  if (angular.isFunction(arg)) {
                    userFn = arg;
                    userFnIndex = index;
                  }
                });

                // Replace user function intended to be passed to the Facebook API with a custom one
                // for being able to use promises.
                if (angular.isFunction(userFn) && angular.isNumber(userFnIndex)) {
                  args.splice(userFnIndex, 1, function(response) {
                    $timeout(function() {

                      if (response && angular.isUndefined(response.error)) {
                        d.resolve(response);
                      } else {
                        d.reject(response);
                      }

                      if (angular.isFunction(userFn)) {
                        userFn(response);
                      }
                    });
                  });
                }

                $timeout(function() {
                  // Call when loadDeferred be resolved, meaning Service is ready to be used.
                  loadDeferred.promise.then(function() {
                    $window.FB[name].apply(FB, args);
                  });
                });

                return d.promise;
              };
            });

            /**
             * Map Facebook sdk XFBML.parse() to NgFacebook.
             */
            NgFacebook.prototype.parseXFBML = function() {

              var d = $q.defer();

              $timeout(function() {
                // Call when loadDeferred be resolved, meaning Service is ready to be used
                loadDeferred.promise.then(function() {
                  $window.FB.XFBML.parse();
                  d.resolve();
                });
              });

              return d.promise;
            };

            /**
             * Map Facebook SDK subscribe/unsubscribe method to NgFacebook.
             * Use it as Facebook.subscribe / Facebook.unsubscribe in the service.
             */

            angular.forEach([
              'subscribe',
              'unsubscribe',
            ], function(name) {

              NgFacebook.prototype[name] = function() {

                var d = $q.defer(),
                    args = Array.prototype.slice.call(arguments), // Get arguments passed into an array
                    userFn,
                    userFnIndex;

                // Get user function and it's index in the arguments array,
                // to replace it with custom function, allowing the usage of promises
                angular.forEach(args, function(arg, index) {
                  if (angular.isFunction(arg)) {
                    userFn = arg;
                    userFnIndex = index;
                  }
                });

                // Replace user function intended to be passed to the Facebook API with a custom one
                // for being able to use promises.
                if (angular.isFunction(userFn) && angular.isNumber(userFnIndex)) {
                  args.splice(userFnIndex, 1, function(response) {

                    $timeout(function() {

                      if (response && angular.isUndefined(response.error)) {
                        d.resolve(response);
                      } else {
                        d.reject(response);
                      }

                      if (angular.isFunction(userFn)) {
                        userFn(response);
                      }
                    });
                  });
                }

                $timeout(function() {
                  // Call when loadDeferred be resolved, meaning Service is ready to be used
                  loadDeferred.promise.then(function() {
                    $window.FB.Event[name].apply(FB, args);
                  });
                });

                return d.promise;
              };
            });

            return new NgFacebook(); // Singleton
          }
        ];

      }
    ]).

    /**
     * Module initialization
     */
    run([
      '$rootScope',
      '$q',
      '$window',
      '$timeout',
      function($rootScope, $q, $window, $timeout) {
        // Define global loadDeffered to notify when Service callbacks are safe to use
        loadDeferred = $q.defer();

        var loadSDK = settings.loadSDK;
        delete(settings['loadSDK']); // Remove loadSDK from settings since this isn't part from Facebook API.

        /**
         * Define fbAsyncInit required by Facebook API
         */
        $window.fbAsyncInit = function() {
          // Initialize our Facebook app
          $timeout(function() {
            if (!settings.appId) {
              throw 'Missing appId setting.';
            }

            FB.init(settings);

            flags.ready = true;

            /**
             * Subscribe to Facebook API events and broadcast through app.
             */
            angular.forEach({
              'auth.login': 'login',
              'auth.logout': 'logout',
              'auth.prompt': 'prompt',
              'auth.sessionChange': 'sessionChange',
              'auth.statusChange': 'statusChange',
              'auth.authResponseChange': 'authResponseChange',
              'xfbml.render': 'xfbmlRender',
              'edge.create': 'like',
              'edge.remove': 'unlike',
              'comment.create': 'comment',
              'comment.remove': 'uncomment'
            }, function(mapped, name) {
              FB.Event.subscribe(name, function(response) {
                $timeout(function() {
                  $rootScope.$broadcast('Facebook:' + mapped, response);
                });
              });
            });

            // Broadcast Facebook:load event
            $rootScope.$broadcast('Facebook:load');

            loadDeferred.resolve(FB);
          });
        };

        /**
         * Inject Facebook root element in DOM
         */
        (function addFBRoot() {
          var fbroot = document.getElementById('fb-root');

          if (!fbroot) {
            fbroot = document.createElement('div');
            fbroot.id = 'fb-root';
            document.body.insertBefore(fbroot, document.body.childNodes[0]);
          }

          return fbroot;
        })();

        /**
         * SDK script injecting
         */
         if(loadSDK) {
          (function injectScript() {
            var src           = '//connect.facebook.net/' + settings.locale + '/sdk.js',
                script        = document.createElement('script');
                script.id     = 'facebook-jssdk';
                script.async  = true;

            // Prefix protocol
            // for sure we don't want to ignore things, but this tests exists,
            // but it isn't recognized by istanbul, so we give it a 'ignore if'
            /* istanbul ignore if */
            if ($window.location.protocol.indexOf('file:') !== -1) {
              src = 'https:' + src;
            }

            script.src = src;
            script.onload = function() {
              flags.sdk = true;
            };

            // Fix for IE < 9, and yet supported by latest browsers
            document.getElementsByTagName('head')[0].appendChild(script);
          })();
        }
      }
    ]);

})(window, angular);

'use strict';

/*
 * angular-google-plus-directive v0.0.1
 * ♡ CopyHeart 2013 by Jerad Bitner http://jeradbitner.com
 * Copying is an act of love. Please copy.
 */

angular.module('directive.g+signin', []).
  directive('googlePlusSignin', ['$window', function ($window) {
    var ending = /\.apps\.googleusercontent\.com$/;

    return {
      restrict: 'E',
      transclude: true,
      template: '<span></span>',
      replace: true,
      link: function (scope, element, attrs, ctrl, linker) {
        attrs.clientid += (ending.test(attrs.clientid) ? '' : '.apps.googleusercontent.com');

        attrs.$set('data-clientid', attrs.clientid);

        // Some default values, based on prior versions of this directive
        var defaults = {
          callback: 'signinCallback',
          cookiepolicy: 'single_host_origin',
          requestvisibleactions: 'http://schemas.google.com/AddActivity',
          scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
          width: 'wide',
        };

        defaults.clientid = attrs.clientid;

        // Overwrite default values if explicitly set
        angular.forEach(Object.getOwnPropertyNames(defaults), function(propName) {
          if (attrs.hasOwnProperty(propName)) {
            defaults[propName] = attrs[propName];
          }
        });

        // Default language
        // Supported languages: https://developers.google.com/+/web/api/supported-languages
        attrs.$observe('language', function(value){
          $window.___gcfg = {
            lang: value ? value : 'en'
          };
        });
        
        // Asynchronously load the G+ SDK.
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/client:plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);

        linker(function(el, tScope){
          po.onload = function() {
            if (el.length) {
              element.append(el);
            }
            gapi.signin.render(element[0], defaults);
          };
        });
      }
    }
}]).
  run(['$window','$rootScope',function($window, $rootScope) {
    $window.signinCallback = function (authResult) {
      if (authResult && authResult.access_token){
          $rootScope.$broadcast('event:google-plus-signin-success', authResult);
          gapi.auth.signOut();
      } else {
          $rootScope.$broadcast('event:google-plus-signin-failure', authResult);
          gapi.auth.signOut();
      }
    }; 
}]);

(function(){"use strict";var a=angular.module("LocalStorageModule",[]);a.provider("localStorageService",function(){this.prefix="ls",this.storageType="localStorage",this.cookie={expiry:30,path:"/"},this.notify={setItem:!0,removeItem:!1},this.setPrefix=function(a){this.prefix=a},this.setStorageType=function(a){this.storageType=a},this.setStorageCookie=function(a,b){this.cookie={expiry:a,path:b}},this.setStorageCookieDomain=function(a){this.cookie.domain=a},this.setNotify=function(a,b){this.notify={setItem:a,removeItem:b}},this.$get=["$rootScope","$window","$document",function(a,b,c){var d,e=this.prefix,f=this.cookie,g=this.notify,h=this.storageType;c||(c=document),"."!==e.substr(-1)&&(e=e?e+".":"");var i=function(a){return e+a},j=function(){try{var c=h in b&&null!==b[h],e=i("__"+Math.round(1e7*Math.random()));return c&&(d=b[h],d.setItem(e,""),d.removeItem(e)),c}catch(f){return h="cookie",a.$broadcast("LocalStorageModule.notification.error",f.message),!1}}(),k=function(b,c){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),g.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:"cookie"}),q(b,c);"undefined"==typeof c&&(c=null);try{(angular.isObject(c)||angular.isArray(c))&&(c=angular.toJson(c)),d&&d.setItem(i(b),c),g.setItem&&a.$broadcast("LocalStorageModule.notification.setitem",{key:b,newvalue:c,storageType:this.storageType})}catch(e){return a.$broadcast("LocalStorageModule.notification.error",e.message),q(b,c)}return!0},l=function(b){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),r(b);var c=d?d.getItem(i(b)):null;return c&&"null"!==c?"{"===c.charAt(0)||"["===c.charAt(0)?angular.fromJson(c):c:null},m=function(b){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),g.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:b,storageType:"cookie"}),s(b);try{d.removeItem(i(b)),g.removeItem&&a.$broadcast("LocalStorageModule.notification.removeitem",{key:b,storageType:this.storageType})}catch(c){return a.$broadcast("LocalStorageModule.notification.error",c.message),s(b)}return!0},n=function(){if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),!1;var b=e.length,c=[];for(var f in d)if(f.substr(0,b)===e)try{c.push(f.substr(b))}catch(g){return a.$broadcast("LocalStorageModule.notification.error",g.Description),[]}return c},o=function(b){b=b||"";var c=e.slice(0,-1),f=new RegExp(c+"."+b);if(!j)return a.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),t();var g=e.length;for(var h in d)if(f.test(h))try{m(h.substr(g))}catch(i){return a.$broadcast("LocalStorageModule.notification.error",i.message),t()}return!0},p=function(){try{return navigator.cookieEnabled||"cookie"in c&&(c.cookie.length>0||(c.cookie="test").indexOf.call(c.cookie,"test")>-1)}catch(b){return a.$broadcast("LocalStorageModule.notification.error",b.message),!1}},q=function(b,d){if("undefined"==typeof d)return!1;if(!p())return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var e="",g=new Date,h="";if(null===d?(g.setTime(g.getTime()+-864e5),e="; expires="+g.toGMTString(),d=""):0!==f.expiry&&(g.setTime(g.getTime()+24*f.expiry*60*60*1e3),e="; expires="+g.toGMTString()),b){var j="; path="+f.path;f.domain&&(h="; domain="+f.domain),c.cookie=i(b)+"="+encodeURIComponent(d)+e+j+h}}catch(k){return a.$broadcast("LocalStorageModule.notification.error",k.message),!1}return!0},r=function(b){if(!p())return a.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var d=c.cookie&&c.cookie.split(";")||[],f=0;f<d.length;f++){for(var g=d[f];" "===g.charAt(0);)g=g.substring(1,g.length);if(0===g.indexOf(i(b)+"="))return decodeURIComponent(g.substring(e.length+b.length+1,g.length))}return null},s=function(a){q(a,null)},t=function(){for(var a=null,b=e.length,d=c.cookie.split(";"),f=0;f<d.length;f++){for(a=d[f];" "===a.charAt(0);)a=a.substring(1,a.length);var g=a.substring(b,a.indexOf("="));s(g)}},u=function(){return h},v=function(a,b,c){var d=l(b);null===d&&angular.isDefined(c)?d=c:angular.isObject(d)&&angular.isObject(c)&&(d=angular.extend(c,d)),a[b]=d,a.$watchCollection(b,function(a){k(b,a)})};return{isSupported:j,getStorageType:u,set:k,add:k,get:l,keys:n,remove:m,clearAll:o,bind:v,deriveKey:i,cookie:{set:q,add:q,get:r,remove:s,clearAll:t}}}]})}).call(this);
/*
 AngularJS v1.3.9-build.7+sha.d4b60ad
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,f,n){'use strict';f.module("ngCookies",["ng"]).factory("$cookies",["$rootScope","$browser",function(e,b){var c={},g={},h,k=!1,l=f.copy,m=f.isUndefined;b.addPollFn(function(){var a=b.cookies();h!=a&&(h=a,l(a,g),l(a,c),k&&e.$apply())})();k=!0;e.$watch(function(){var a,d,e;for(a in g)m(c[a])&&b.cookies(a,n);for(a in c)d=c[a],f.isString(d)||(d=""+d,c[a]=d),d!==g[a]&&(b.cookies(a,d),e=!0);if(e)for(a in d=b.cookies(),c)c[a]!==d[a]&&(m(d[a])?delete c[a]:c[a]=d[a])});return c}]).factory("$cookieStore",
["$cookies",function(e){return{get:function(b){return(b=e[b])?f.fromJson(b):b},put:function(b,c){e[b]=f.toJson(c)},remove:function(b){delete e[b]}}}])})(window,window.angular);
//# sourceMappingURL=angular-cookies.min.js.map

function flyToElement(flyer, flyingTo, callBack /*callback is optional*/) {
    var $func = $(this);

    var divider = 3;

    var flyerClone = $(flyer).clone();
    $(flyerClone).css({
        position: 'absolute',
        top: $(flyer).offset().top + "px",
        left: $(flyer).offset().left + "px",
        opacity: 1,
        'z-index': 1000000
    });
    $('body').append($(flyerClone));

    var gotoX = $(flyingTo).offset().left + ($(flyingTo).width() / 2) - ($(flyer).width() / divider) / 2;
    var gotoY = $(flyingTo).offset().top + ($(flyingTo).height() / 2) - ($(flyer).height() / divider) / 2;

    $(flyerClone).animate({
        opacity: 0.4,
        left: gotoX,
        top: gotoY,
        width: $(flyer).width() / divider,
        height: $(flyer).height() / divider
    }, 700,
        function () {
            $(flyingTo).fadeOut('fast', function () {
                $(flyingTo).fadeIn('fast', function () {
                    $(flyerClone).fadeOut('fast', function () {
                        $(flyerClone).remove();
                        if (callBack != null) {
                            callBack.apply($func);
                        }
                    });
                });
            });
        });
}

function flyFromElement(flyer, flyingTo, callBack /*callback is optional*/) {
    var $func = $(this);

    var divider = 3;

    var beginAtX = $(flyingTo).offset().left + ($(flyingTo).width() / 2) - ($(flyer).width() / divider) / 2;
    var beginAtY = $(flyingTo).offset().top + ($(flyingTo).width() / 2) - ($(flyer).height() / divider) / 2;

    var gotoX = $(flyer).offset().left;
    var gotoY = $(flyer).offset().top;

    var flyerClone = $(flyer).clone();

    $(flyerClone).css({
        position: 'absolute',
        top: beginAtY + "px",
        left: beginAtX + "px",
        opacity: 0.4,
        'z-index': 1000,
        width: $(flyer).width() / divider,
        height: $(flyer).height() / divider
    });
    $('body').append($(flyerClone));

    $(flyerClone).animate({
        opacity: 1,
        left: gotoX,
        top: gotoY,
        width: $(flyer).width(),
        height: $(flyer).height()
    }, 700,
        function () {
            $(flyerClone).remove();
            $(flyer).fadeOut('fast', function () {
                $(flyer).fadeIn('fast', function () {
                    if (callBack != null) {
                        callBack.apply($func);
                    }
                });
            });
        });
}
/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./dist/lodash.js`
 */
; (function () {
    function n(n, t, e) { e = (e || 0) - 1; for (var r = n ? n.length : 0; ++e < r;) if (n[e] === t) return e; return -1 } function t(t, e) { var r = typeof e; if (t = t.l, "boolean" == r || null == e) return t[e] ? 0 : -1; "number" != r && "string" != r && (r = "object"); var u = "number" == r ? e : m + e; return t = (t = t[r]) && t[u], "object" == r ? t && -1 < n(t, e) ? 0 : -1 : t ? 0 : -1 } function e(n) {
        var t = this.l, e = typeof n; if ("boolean" == e || null == n) t[n] = true; else {
            "number" != e && "string" != e && (e = "object"); var r = "number" == e ? n : m + n, t = t[e] || (t[e] = {}); "object" == e ? (t[r] || (t[r] = [])).push(n) : t[r] = true
        }
    } function r(n) { return n.charCodeAt(0) } function u(n, t) { for (var e = n.m, r = t.m, u = -1, o = e.length; ++u < o;) { var i = e[u], a = r[u]; if (i !== a) { if (i > a || typeof i == "undefined") return 1; if (i < a || typeof a == "undefined") return -1 } } return n.n - t.n } function o(n) { var t = -1, r = n.length, u = n[0], o = n[r / 2 | 0], i = n[r - 1]; if (u && typeof u == "object" && o && typeof o == "object" && i && typeof i == "object") return false; for (u = f(), u["false"] = u["null"] = u["true"] = u.undefined = false, o = f(), o.k = n, o.l = u, o.push = e; ++t < r;) o.push(n[t]); return o } function i(n) {
        return "\\" + U[n]
    } function a() { return h.pop() || [] } function f() { return g.pop() || { k: null, l: null, m: null, "false": false, n: 0, "null": false, number: null, object: null, push: null, string: null, "true": false, undefined: false, o: null } } function l(n) { n.length = 0, h.length < _ && h.push(n) } function c(n) { var t = n.l; t && c(t), n.k = n.l = n.m = n.object = n.number = n.string = n.o = null, g.length < _ && g.push(n) } function p(n, t, e) { t || (t = 0), typeof e == "undefined" && (e = n ? n.length : 0); var r = -1; e = e - t || 0; for (var u = Array(0 > e ? 0 : e) ; ++r < e;) u[r] = n[t + r]; return u } function s(e) {
        function h(n, t, e) {
            if (!n || !V[typeof n]) return n;
            t = t && typeof e == "undefined" ? t : tt(t, e, 3); for (var r = -1, u = V[typeof n] && Fe(n), o = u ? u.length : 0; ++r < o && (e = u[r], false !== t(n[e], e, n)) ;); return n
        } function g(n, t, e) { var r; if (!n || !V[typeof n]) return n; t = t && typeof e == "undefined" ? t : tt(t, e, 3); for (r in n) if (false === t(n[r], r, n)) break; return n } function _(n, t, e) {
            var r, u = n, o = u; if (!u) return o; for (var i = arguments, a = 0, f = typeof e == "number" ? 2 : i.length; ++a < f;) if ((u = i[a]) && V[typeof u]) for (var l = -1, c = V[typeof u] && Fe(u), p = c ? c.length : 0; ++l < p;) r = c[l], "undefined" == typeof o[r] && (o[r] = u[r]);
            return o
        } function U(n, t, e) { var r, u = n, o = u; if (!u) return o; var i = arguments, a = 0, f = typeof e == "number" ? 2 : i.length; if (3 < f && "function" == typeof i[f - 2]) var l = tt(i[--f - 1], i[f--], 2); else 2 < f && "function" == typeof i[f - 1] && (l = i[--f]); for (; ++a < f;) if ((u = i[a]) && V[typeof u]) for (var c = -1, p = V[typeof u] && Fe(u), s = p ? p.length : 0; ++c < s;) r = p[c], o[r] = l ? l(o[r], u[r]) : u[r]; return o } function H(n) { var t, e = []; if (!n || !V[typeof n]) return e; for (t in n) me.call(n, t) && e.push(t); return e } function J(n) {
            return n && typeof n == "object" && !Te(n) && me.call(n, "__wrapped__") ? n : new Q(n)
        } function Q(n, t) { this.__chain__ = !!t, this.__wrapped__ = n } function X(n) { function t() { if (r) { var n = p(r); be.apply(n, arguments) } if (this instanceof t) { var o = nt(e.prototype), n = e.apply(o, n || arguments); return wt(n) ? n : o } return e.apply(u, n || arguments) } var e = n[0], r = n[2], u = n[4]; return $e(t, n), t } function Z(n, t, e, r, u) {
            if (e) { var o = e(n); if (typeof o != "undefined") return o } if (!wt(n)) return n; var i = ce.call(n); if (!K[i]) return n; var f = Ae[i]; switch (i) {
                case T: case F: return new f(+n); case W: case P: return new f(n); case z: return o = f(n.source, C.exec(n)), o.lastIndex = n.lastIndex, o
            } if (i = Te(n), t) { var c = !r; r || (r = a()), u || (u = a()); for (var s = r.length; s--;) if (r[s] == n) return u[s]; o = i ? f(n.length) : {} } else o = i ? p(n) : U({}, n); return i && (me.call(n, "index") && (o.index = n.index), me.call(n, "input") && (o.input = n.input)), t ? (r.push(n), u.push(o), (i ? St : h)(n, function (n, i) { o[i] = Z(n, t, e, r, u) }), c && (l(r), l(u)), o) : o
        } function nt(n) { return wt(n) ? ke(n) : {} } function tt(n, t, e) {
            if (typeof n != "function") return Ut; if (typeof t == "undefined" || !("prototype" in n)) return n; var r = n.__bindData__; if (typeof r == "undefined" && (De.funcNames && (r = !n.name), r = r || !De.funcDecomp, !r)) {
                var u = ge.call(n);
                De.funcNames || (r = !O.test(u)), r || (r = E.test(u), $e(n, r))
            } if (false === r || true !== r && 1 & r[1]) return n; switch (e) { case 1: return function (e) { return n.call(t, e) }; case 2: return function (e, r) { return n.call(t, e, r) }; case 3: return function (e, r, u) { return n.call(t, e, r, u) }; case 4: return function (e, r, u, o) { return n.call(t, e, r, u, o) } } return Mt(n, t)
        } function et(n) {
            function t() {
                var n = f ? i : this; if (u) { var h = p(u); be.apply(h, arguments) } return (o || c) && (h || (h = p(arguments)), o && be.apply(h, o), c && h.length < a) ? (r |= 16, et([e, s ? r : -4 & r, h, null, i, a])) : (h || (h = arguments), l && (e = n[v]), this instanceof t ? (n = nt(e.prototype), h = e.apply(n, h), wt(h) ? h : n) : e.apply(n, h))
            } var e = n[0], r = n[1], u = n[2], o = n[3], i = n[4], a = n[5], f = 1 & r, l = 2 & r, c = 4 & r, s = 8 & r, v = e; return $e(t, n), t
        } function rt(e, r) { var u = -1, i = st(), a = e ? e.length : 0, f = a >= b && i === n, l = []; if (f) { var p = o(r); p ? (i = t, r = p) : f = false } for (; ++u < a;) p = e[u], 0 > i(r, p) && l.push(p); return f && c(r), l } function ut(n, t, e, r) {
            r = (r || 0) - 1; for (var u = n ? n.length : 0, o = []; ++r < u;) { var i = n[r]; if (i && typeof i == "object" && typeof i.length == "number" && (Te(i) || yt(i))) { t || (i = ut(i, t, e)); var a = -1, f = i.length, l = o.length; for (o.length += f; ++a < f;) o[l++] = i[a] } else e || o.push(i) } return o
        } function ot(n, t, e, r, u, o) {
            if (e) { var i = e(n, t); if (typeof i != "undefined") return !!i } if (n === t) return 0 !== n || 1 / n == 1 / t; if (n === n && !(n && V[typeof n] || t && V[typeof t])) return false; if (null == n || null == t) return n === t; var f = ce.call(n), c = ce.call(t); if (f == D && (f = q), c == D && (c = q), f != c) return false; switch (f) { case T: case F: return +n == +t; case W: return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t; case z: case P: return n == oe(t) } if (c = f == $, !c) {
                var p = me.call(n, "__wrapped__"), s = me.call(t, "__wrapped__"); if (p || s) return ot(p ? n.__wrapped__ : n, s ? t.__wrapped__ : t, e, r, u, o);
                if (f != q) return false; if (f = n.constructor, p = t.constructor, f != p && !(dt(f) && f instanceof f && dt(p) && p instanceof p) && "constructor" in n && "constructor" in t) return false
            } for (f = !u, u || (u = a()), o || (o = a()), p = u.length; p--;) if (u[p] == n) return o[p] == t; var v = 0, i = true; if (u.push(n), o.push(t), c) { if (p = n.length, v = t.length, (i = v == p) || r) for (; v--;) if (c = p, s = t[v], r) for (; c-- && !(i = ot(n[c], s, e, r, u, o)) ;); else if (!(i = ot(n[v], s, e, r, u, o))) break } else g(t, function (t, a, f) { return me.call(f, a) ? (v++, i = me.call(n, a) && ot(n[a], t, e, r, u, o)) : void 0 }), i && !r && g(n, function (n, t, e) {
                return me.call(e, t) ? i = -1 < --v : void 0
            }); return u.pop(), o.pop(), f && (l(u), l(o)), i
        } function it(n, t, e, r, u) { (Te(t) ? St : h)(t, function (t, o) { var i, a, f = t, l = n[o]; if (t && ((a = Te(t)) || Pe(t))) { for (f = r.length; f--;) if (i = r[f] == t) { l = u[f]; break } if (!i) { var c; e && (f = e(l, t), c = typeof f != "undefined") && (l = f), c || (l = a ? Te(l) ? l : [] : Pe(l) ? l : {}), r.push(t), u.push(l), c || it(l, t, e, r, u) } } else e && (f = e(l, t), typeof f == "undefined" && (f = t)), typeof f != "undefined" && (l = f); n[o] = l }) } function at(n, t) { return n + he(Re() * (t - n + 1)) } function ft(e, r, u) {
            var i = -1, f = st(), p = e ? e.length : 0, s = [], v = !r && p >= b && f === n, h = u || v ? a() : s;
            for (v && (h = o(h), f = t) ; ++i < p;) { var g = e[i], y = u ? u(g, i, e) : g; (r ? !i || h[h.length - 1] !== y : 0 > f(h, y)) && ((u || v) && h.push(y), s.push(g)) } return v ? (l(h.k), c(h)) : u && l(h), s
        } function lt(n) { return function (t, e, r) { var u = {}; e = J.createCallback(e, r, 3), r = -1; var o = t ? t.length : 0; if (typeof o == "number") for (; ++r < o;) { var i = t[r]; n(u, i, e(i, r, t), t) } else h(t, function (t, r, o) { n(u, t, e(t, r, o), o) }); return u } } function ct(n, t, e, r, u, o) {
            var i = 1 & t, a = 4 & t, f = 16 & t, l = 32 & t; if (!(2 & t || dt(n))) throw new ie; f && !e.length && (t &= -17, f = e = false), l && !r.length && (t &= -33, l = r = false);
            var c = n && n.__bindData__; return c && true !== c ? (c = p(c), c[2] && (c[2] = p(c[2])), c[3] && (c[3] = p(c[3])), !i || 1 & c[1] || (c[4] = u), !i && 1 & c[1] && (t |= 8), !a || 4 & c[1] || (c[5] = o), f && be.apply(c[2] || (c[2] = []), e), l && we.apply(c[3] || (c[3] = []), r), c[1] |= t, ct.apply(null, c)) : (1 == t || 17 === t ? X : et)([n, t, e, r, u, o])
        } function pt(n) { return Be[n] } function st() { var t = (t = J.indexOf) === Wt ? n : t; return t } function vt(n) { return typeof n == "function" && pe.test(n) } function ht(n) {
            var t, e; return n && ce.call(n) == q && (t = n.constructor, !dt(t) || t instanceof t) ? (g(n, function (n, t) {
                e = t
            }), typeof e == "undefined" || me.call(n, e)) : false
        } function gt(n) { return We[n] } function yt(n) { return n && typeof n == "object" && typeof n.length == "number" && ce.call(n) == D || false } function mt(n, t, e) { var r = Fe(n), u = r.length; for (t = tt(t, e, 3) ; u-- && (e = r[u], false !== t(n[e], e, n)) ;); return n } function bt(n) { var t = []; return g(n, function (n, e) { dt(n) && t.push(e) }), t.sort() } function _t(n) { for (var t = -1, e = Fe(n), r = e.length, u = {}; ++t < r;) { var o = e[t]; u[n[o]] = o } return u } function dt(n) { return typeof n == "function" } function wt(n) {
            return !(!n || !V[typeof n])
        } function jt(n) { return typeof n == "number" || n && typeof n == "object" && ce.call(n) == W || false } function kt(n) { return typeof n == "string" || n && typeof n == "object" && ce.call(n) == P || false } function xt(n) { for (var t = -1, e = Fe(n), r = e.length, u = Xt(r) ; ++t < r;) u[t] = n[e[t]]; return u } function Ct(n, t, e) { var r = -1, u = st(), o = n ? n.length : 0, i = false; return e = (0 > e ? Ie(0, o + e) : e) || 0, Te(n) ? i = -1 < u(n, t, e) : typeof o == "number" ? i = -1 < (kt(n) ? n.indexOf(t, e) : u(n, t, e)) : h(n, function (n) { return ++r < e ? void 0 : !(i = n === t) }), i } function Ot(n, t, e) {
            var r = true; t = J.createCallback(t, e, 3), e = -1;
            var u = n ? n.length : 0; if (typeof u == "number") for (; ++e < u && (r = !!t(n[e], e, n)) ;); else h(n, function (n, e, u) { return r = !!t(n, e, u) }); return r
        } function Nt(n, t, e) { var r = []; t = J.createCallback(t, e, 3), e = -1; var u = n ? n.length : 0; if (typeof u == "number") for (; ++e < u;) { var o = n[e]; t(o, e, n) && r.push(o) } else h(n, function (n, e, u) { t(n, e, u) && r.push(n) }); return r } function It(n, t, e) {
            t = J.createCallback(t, e, 3), e = -1; var r = n ? n.length : 0; if (typeof r != "number") { var u; return h(n, function (n, e, r) { return t(n, e, r) ? (u = n, false) : void 0 }), u } for (; ++e < r;) {
                var o = n[e];
                if (t(o, e, n)) return o
            }
        } function St(n, t, e) { var r = -1, u = n ? n.length : 0; if (t = t && typeof e == "undefined" ? t : tt(t, e, 3), typeof u == "number") for (; ++r < u && false !== t(n[r], r, n) ;); else h(n, t); return n } function Et(n, t, e) { var r = n ? n.length : 0; if (t = t && typeof e == "undefined" ? t : tt(t, e, 3), typeof r == "number") for (; r-- && false !== t(n[r], r, n) ;); else { var u = Fe(n), r = u.length; h(n, function (n, e, o) { return e = u ? u[--r] : --r, t(o[e], e, o) }) } return n } function Rt(n, t, e) {
            var r = -1, u = n ? n.length : 0; if (t = J.createCallback(t, e, 3), typeof u == "number") for (var o = Xt(u) ; ++r < u;) o[r] = t(n[r], r, n);
            else o = [], h(n, function (n, e, u) { o[++r] = t(n, e, u) }); return o
        } function At(n, t, e) { var u = -1 / 0, o = u; if (typeof t != "function" && e && e[t] === n && (t = null), null == t && Te(n)) { e = -1; for (var i = n.length; ++e < i;) { var a = n[e]; a > o && (o = a) } } else t = null == t && kt(n) ? r : J.createCallback(t, e, 3), St(n, function (n, e, r) { e = t(n, e, r), e > u && (u = e, o = n) }); return o } function Dt(n, t, e, r) {
            if (!n) return e; var u = 3 > arguments.length; t = J.createCallback(t, r, 4); var o = -1, i = n.length; if (typeof i == "number") for (u && (e = n[++o]) ; ++o < i;) e = t(e, n[o], o, n); else h(n, function (n, r, o) {
                e = u ? (u = false, n) : t(e, n, r, o)
            }); return e
        } function $t(n, t, e, r) { var u = 3 > arguments.length; return t = J.createCallback(t, r, 4), Et(n, function (n, r, o) { e = u ? (u = false, n) : t(e, n, r, o) }), e } function Tt(n) { var t = -1, e = n ? n.length : 0, r = Xt(typeof e == "number" ? e : 0); return St(n, function (n) { var e = at(0, ++t); r[t] = r[e], r[e] = n }), r } function Ft(n, t, e) { var r; t = J.createCallback(t, e, 3), e = -1; var u = n ? n.length : 0; if (typeof u == "number") for (; ++e < u && !(r = t(n[e], e, n)) ;); else h(n, function (n, e, u) { return !(r = t(n, e, u)) }); return !!r } function Bt(n, t, e) {
            var r = 0, u = n ? n.length : 0; if (typeof t != "number" && null != t) {
                var o = -1;
                for (t = J.createCallback(t, e, 3) ; ++o < u && t(n[o], o, n) ;) r++
            } else if (r = t, null == r || e) return n ? n[0] : v; return p(n, 0, Se(Ie(0, r), u))
        } function Wt(t, e, r) { if (typeof r == "number") { var u = t ? t.length : 0; r = 0 > r ? Ie(0, u + r) : r || 0 } else if (r) return r = zt(t, e), t[r] === e ? r : -1; return n(t, e, r) } function qt(n, t, e) { if (typeof t != "number" && null != t) { var r = 0, u = -1, o = n ? n.length : 0; for (t = J.createCallback(t, e, 3) ; ++u < o && t(n[u], u, n) ;) r++ } else r = null == t || e ? 1 : Ie(0, t); return p(n, r) } function zt(n, t, e, r) {
            var u = 0, o = n ? n.length : u; for (e = e ? J.createCallback(e, r, 1) : Ut, t = e(t) ; u < o;) r = u + o >>> 1, e(n[r]) < t ? u = r + 1 : o = r;
            return u
        } function Pt(n, t, e, r) { return typeof t != "boolean" && null != t && (r = e, e = typeof t != "function" && r && r[t] === n ? null : t, t = false), null != e && (e = J.createCallback(e, r, 3)), ft(n, t, e) } function Kt() { for (var n = 1 < arguments.length ? arguments : arguments[0], t = -1, e = n ? At(Ve(n, "length")) : 0, r = Xt(0 > e ? 0 : e) ; ++t < e;) r[t] = Ve(n, t); return r } function Lt(n, t) { var e = -1, r = n ? n.length : 0, u = {}; for (t || !r || Te(n[0]) || (t = []) ; ++e < r;) { var o = n[e]; t ? u[o] = t[e] : o && (u[o[0]] = o[1]) } return u } function Mt(n, t) {
            return 2 < arguments.length ? ct(n, 17, p(arguments, 2), null, t) : ct(n, 1, null, null, t)
        } function Vt(n, t, e) {
            function r() { c && ve(c), i = c = p = v, (g || h !== t) && (s = Ue(), a = n.apply(l, o), c || i || (o = l = null)) } function u() { var e = t - (Ue() - f); 0 < e ? c = _e(u, e) : (i && ve(i), e = p, i = c = p = v, e && (s = Ue(), a = n.apply(l, o), c || i || (o = l = null))) } var o, i, a, f, l, c, p, s = 0, h = false, g = true; if (!dt(n)) throw new ie; if (t = Ie(0, t) || 0, true === e) var y = true, g = false; else wt(e) && (y = e.leading, h = "maxWait" in e && (Ie(t, e.maxWait) || 0), g = "trailing" in e ? e.trailing : g); return function () {
                if (o = arguments, f = Ue(), l = this, p = g && (c || !y), false === h) var e = y && !c; else {
                    i || y || (s = f); var v = h - (f - s), m = 0 >= v;
                    m ? (i && (i = ve(i)), s = f, a = n.apply(l, o)) : i || (i = _e(r, v))
                } return m && c ? c = ve(c) : c || t === h || (c = _e(u, t)), e && (m = true, a = n.apply(l, o)), !m || c || i || (o = l = null), a
            }
        } function Ut(n) { return n } function Gt(n, t, e) {
            var r = true, u = t && bt(t); t && (e || u.length) || (null == e && (e = t), o = Q, t = n, n = J, u = bt(t)), false === e ? r = false : wt(e) && "chain" in e && (r = e.chain); var o = n, i = dt(o); St(u, function (e) {
                var u = n[e] = t[e]; i && (o.prototype[e] = function () {
                    var t = this.__chain__, e = this.__wrapped__, i = [e]; if (be.apply(i, arguments), i = u.apply(n, i), r || t) {
                        if (e === i && wt(i)) return this;
                        i = new o(i), i.__chain__ = t
                    } return i
                })
            })
        } function Ht() { } function Jt(n) { return function (t) { return t[n] } } function Qt() { return this.__wrapped__ } e = e ? Y.defaults(G.Object(), e, Y.pick(G, A)) : G; var Xt = e.Array, Yt = e.Boolean, Zt = e.Date, ne = e.Function, te = e.Math, ee = e.Number, re = e.Object, ue = e.RegExp, oe = e.String, ie = e.TypeError, ae = [], fe = re.prototype, le = e._, ce = fe.toString, pe = ue("^" + oe(ce).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"), se = te.ceil, ve = e.clearTimeout, he = te.floor, ge = ne.prototype.toString, ye = vt(ye = re.getPrototypeOf) && ye, me = fe.hasOwnProperty, be = ae.push, _e = e.setTimeout, de = ae.splice, we = ae.unshift, je = function () {
            try {
                var n = {}, t = vt(t = re.defineProperty) && t, e = t(n, n, n) && t
            } catch (r) { } return e
        }(), ke = vt(ke = re.create) && ke, xe = vt(xe = Xt.isArray) && xe, Ce = e.isFinite, Oe = e.isNaN, Ne = vt(Ne = re.keys) && Ne, Ie = te.max, Se = te.min, Ee = e.parseInt, Re = te.random, Ae = {}; Ae[$] = Xt, Ae[T] = Yt, Ae[F] = Zt, Ae[B] = ne, Ae[q] = re, Ae[W] = ee, Ae[z] = ue, Ae[P] = oe, Q.prototype = J.prototype; var De = J.support = {}; De.funcDecomp = !vt(e.a) && E.test(s), De.funcNames = typeof ne.name == "string", J.templateSettings = { escape: /<%-([\s\S]+?)%>/g, evaluate: /<%([\s\S]+?)%>/g, interpolate: N, variable: "", imports: { _: J } }, ke || (nt = function () {
            function n() { } return function (t) {
                if (wt(t)) {
                    n.prototype = t;
                    var r = new n; n.prototype = null
                } return r || e.Object()
            }
        }()); var $e = je ? function (n, t) { M.value = t, je(n, "__bindData__", M) } : Ht, Te = xe || function (n) { return n && typeof n == "object" && typeof n.length == "number" && ce.call(n) == $ || false }, Fe = Ne ? function (n) { return wt(n) ? Ne(n) : [] } : H, Be = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, We = _t(Be), qe = ue("(" + Fe(We).join("|") + ")", "g"), ze = ue("[" + Fe(Be).join("") + "]", "g"), Pe = ye ? function (n) {
            if (!n || ce.call(n) != q) return false; var t = n.valueOf, e = vt(t) && (e = ye(t)) && ye(e); return e ? n == e || ye(n) == e : ht(n)
        } : ht, Ke = lt(function (n, t, e) { me.call(n, e) ? n[e]++ : n[e] = 1 }), Le = lt(function (n, t, e) { (me.call(n, e) ? n[e] : n[e] = []).push(t) }), Me = lt(function (n, t, e) { n[e] = t }), Ve = Rt, Ue = vt(Ue = Zt.now) && Ue || function () { return (new Zt).getTime() }, Ge = 8 == Ee(d + "08") ? Ee : function (n, t) { return Ee(kt(n) ? n.replace(I, "") : n, t || 0) }; return J.after = function (n, t) { if (!dt(t)) throw new ie; return function () { return 1 > --n ? t.apply(this, arguments) : void 0 } }, J.assign = U, J.at = function (n) {
            for (var t = arguments, e = -1, r = ut(t, true, false, 1), t = t[2] && t[2][t[1]] === n ? 1 : r.length, u = Xt(t) ; ++e < t;) u[e] = n[r[e]];
            return u
        }, J.bind = Mt, J.bindAll = function (n) { for (var t = 1 < arguments.length ? ut(arguments, true, false, 1) : bt(n), e = -1, r = t.length; ++e < r;) { var u = t[e]; n[u] = ct(n[u], 1, null, null, n) } return n }, J.bindKey = function (n, t) { return 2 < arguments.length ? ct(t, 19, p(arguments, 2), null, n) : ct(t, 3, null, null, n) }, J.chain = function (n) { return n = new Q(n), n.__chain__ = true, n }, J.compact = function (n) { for (var t = -1, e = n ? n.length : 0, r = []; ++t < e;) { var u = n[t]; u && r.push(u) } return r }, J.compose = function () {
            for (var n = arguments, t = n.length; t--;) if (!dt(n[t])) throw new ie;
            return function () { for (var t = arguments, e = n.length; e--;) t = [n[e].apply(this, t)]; return t[0] }
        }, J.constant = function (n) { return function () { return n } }, J.countBy = Ke, J.create = function (n, t) { var e = nt(n); return t ? U(e, t) : e }, J.createCallback = function (n, t, e) {
            var r = typeof n; if (null == n || "function" == r) return tt(n, t, e); if ("object" != r) return Jt(n); var u = Fe(n), o = u[0], i = n[o]; return 1 != u.length || i !== i || wt(i) ? function (t) { for (var e = u.length, r = false; e-- && (r = ot(t[u[e]], n[u[e]], null, true)) ;); return r } : function (n) {
                return n = n[o], i === n && (0 !== i || 1 / i == 1 / n)
            }
        }, J.curry = function (n, t) { return t = typeof t == "number" ? t : +t || n.length, ct(n, 4, null, null, null, t) }, J.debounce = Vt, J.defaults = _, J.defer = function (n) { if (!dt(n)) throw new ie; var t = p(arguments, 1); return _e(function () { n.apply(v, t) }, 1) }, J.delay = function (n, t) { if (!dt(n)) throw new ie; var e = p(arguments, 2); return _e(function () { n.apply(v, e) }, t) }, J.difference = function (n) { return rt(n, ut(arguments, true, true, 1)) }, J.filter = Nt, J.flatten = function (n, t, e, r) {
            return typeof t != "boolean" && null != t && (r = e, e = typeof t != "function" && r && r[t] === n ? null : t, t = false), null != e && (n = Rt(n, e, r)), ut(n, t)
        }, J.forEach = St, J.forEachRight = Et, J.forIn = g, J.forInRight = function (n, t, e) { var r = []; g(n, function (n, t) { r.push(t, n) }); var u = r.length; for (t = tt(t, e, 3) ; u-- && false !== t(r[u--], r[u], n) ;); return n }, J.forOwn = h, J.forOwnRight = mt, J.functions = bt, J.groupBy = Le, J.indexBy = Me, J.initial = function (n, t, e) { var r = 0, u = n ? n.length : 0; if (typeof t != "number" && null != t) { var o = u; for (t = J.createCallback(t, e, 3) ; o-- && t(n[o], o, n) ;) r++ } else r = null == t || e ? 1 : t || r; return p(n, 0, Se(Ie(0, u - r), u)) }, J.intersection = function () {
            for (var e = [], r = -1, u = arguments.length, i = a(), f = st(), p = f === n, s = a() ; ++r < u;) {
                var v = arguments[r];
                (Te(v) || yt(v)) && (e.push(v), i.push(p && v.length >= b && o(r ? e[r] : s)))
            } var p = e[0], h = -1, g = p ? p.length : 0, y = []; n: for (; ++h < g;) { var m = i[0], v = p[h]; if (0 > (m ? t(m, v) : f(s, v))) { for (r = u, (m || s).push(v) ; --r;) if (m = i[r], 0 > (m ? t(m, v) : f(e[r], v))) continue n; y.push(v) } } for (; u--;) (m = i[u]) && c(m); return l(i), l(s), y
        }, J.invert = _t, J.invoke = function (n, t) { var e = p(arguments, 2), r = -1, u = typeof t == "function", o = n ? n.length : 0, i = Xt(typeof o == "number" ? o : 0); return St(n, function (n) { i[++r] = (u ? t : n[t]).apply(n, e) }), i }, J.keys = Fe, J.map = Rt, J.mapValues = function (n, t, e) {
            var r = {};
            return t = J.createCallback(t, e, 3), h(n, function (n, e, u) { r[e] = t(n, e, u) }), r
        }, J.max = At, J.memoize = function (n, t) { function e() { var r = e.cache, u = t ? t.apply(this, arguments) : m + arguments[0]; return me.call(r, u) ? r[u] : r[u] = n.apply(this, arguments) } if (!dt(n)) throw new ie; return e.cache = {}, e }, J.merge = function (n) {
            var t = arguments, e = 2; if (!wt(n)) return n; if ("number" != typeof t[2] && (e = t.length), 3 < e && "function" == typeof t[e - 2]) var r = tt(t[--e - 1], t[e--], 2); else 2 < e && "function" == typeof t[e - 1] && (r = t[--e]); for (var t = p(arguments, 1, e), u = -1, o = a(), i = a() ; ++u < e;) it(n, t[u], r, o, i);
            return l(o), l(i), n
        }, J.min = function (n, t, e) { var u = 1 / 0, o = u; if (typeof t != "function" && e && e[t] === n && (t = null), null == t && Te(n)) { e = -1; for (var i = n.length; ++e < i;) { var a = n[e]; a < o && (o = a) } } else t = null == t && kt(n) ? r : J.createCallback(t, e, 3), St(n, function (n, e, r) { e = t(n, e, r), e < u && (u = e, o = n) }); return o }, J.omit = function (n, t, e) {
            var r = {}; if (typeof t != "function") { var u = []; g(n, function (n, t) { u.push(t) }); for (var u = rt(u, ut(arguments, true, false, 1)), o = -1, i = u.length; ++o < i;) { var a = u[o]; r[a] = n[a] } } else t = J.createCallback(t, e, 3), g(n, function (n, e, u) {
                t(n, e, u) || (r[e] = n)
            }); return r
        }, J.once = function (n) { var t, e; if (!dt(n)) throw new ie; return function () { return t ? e : (t = true, e = n.apply(this, arguments), n = null, e) } }, J.pairs = function (n) { for (var t = -1, e = Fe(n), r = e.length, u = Xt(r) ; ++t < r;) { var o = e[t]; u[t] = [o, n[o]] } return u }, J.partial = function (n) { return ct(n, 16, p(arguments, 1)) }, J.partialRight = function (n) { return ct(n, 32, null, p(arguments, 1)) }, J.pick = function (n, t, e) {
            var r = {}; if (typeof t != "function") for (var u = -1, o = ut(arguments, true, false, 1), i = wt(n) ? o.length : 0; ++u < i;) {
                var a = o[u]; a in n && (r[a] = n[a])
            } else t = J.createCallback(t, e, 3), g(n, function (n, e, u) { t(n, e, u) && (r[e] = n) }); return r
        }, J.pluck = Ve, J.property = Jt, J.pull = function (n) { for (var t = arguments, e = 0, r = t.length, u = n ? n.length : 0; ++e < r;) for (var o = -1, i = t[e]; ++o < u;) n[o] === i && (de.call(n, o--, 1), u--); return n }, J.range = function (n, t, e) { n = +n || 0, e = typeof e == "number" ? e : +e || 1, null == t && (t = n, n = 0); var r = -1; t = Ie(0, se((t - n) / (e || 1))); for (var u = Xt(t) ; ++r < t;) u[r] = n, n += e; return u }, J.reject = function (n, t, e) {
            return t = J.createCallback(t, e, 3), Nt(n, function (n, e, r) {
                return !t(n, e, r)
            })
        }, J.remove = function (n, t, e) { var r = -1, u = n ? n.length : 0, o = []; for (t = J.createCallback(t, e, 3) ; ++r < u;) e = n[r], t(e, r, n) && (o.push(e), de.call(n, r--, 1), u--); return o }, J.rest = qt, J.shuffle = Tt, J.sortBy = function (n, t, e) { var r = -1, o = Te(t), i = n ? n.length : 0, p = Xt(typeof i == "number" ? i : 0); for (o || (t = J.createCallback(t, e, 3)), St(n, function (n, e, u) { var i = p[++r] = f(); o ? i.m = Rt(t, function (t) { return n[t] }) : (i.m = a())[0] = t(n, e, u), i.n = r, i.o = n }), i = p.length, p.sort(u) ; i--;) n = p[i], p[i] = n.o, o || l(n.m), c(n); return p }, J.tap = function (n, t) {
            return t(n), n
        }, J.throttle = function (n, t, e) { var r = true, u = true; if (!dt(n)) throw new ie; return false === e ? r = false : wt(e) && (r = "leading" in e ? e.leading : r, u = "trailing" in e ? e.trailing : u), L.leading = r, L.maxWait = t, L.trailing = u, Vt(n, t, L) }, J.times = function (n, t, e) { n = -1 < (n = +n) ? n : 0; var r = -1, u = Xt(n); for (t = tt(t, e, 1) ; ++r < n;) u[r] = t(r); return u }, J.toArray = function (n) { return n && typeof n.length == "number" ? p(n) : xt(n) }, J.transform = function (n, t, e, r) {
            var u = Te(n); if (null == e) if (u) e = []; else { var o = n && n.constructor; e = nt(o && o.prototype) } return t && (t = J.createCallback(t, r, 4), (u ? St : h)(n, function (n, r, u) {
                return t(e, n, r, u)
            })), e
        }, J.union = function () { return ft(ut(arguments, true, true)) }, J.uniq = Pt, J.values = xt, J.where = Nt, J.without = function (n) { return rt(n, p(arguments, 1)) }, J.wrap = function (n, t) { return ct(t, 16, [n]) }, J.xor = function () { for (var n = -1, t = arguments.length; ++n < t;) { var e = arguments[n]; if (Te(e) || yt(e)) var r = r ? ft(rt(r, e).concat(rt(e, r))) : e } return r || [] }, J.zip = Kt, J.zipObject = Lt, J.collect = Rt, J.drop = qt, J.each = St, J.eachRight = Et, J.extend = U, J.methods = bt, J.object = Lt, J.select = Nt, J.tail = qt, J.unique = Pt, J.unzip = Kt, Gt(J), J.clone = function (n, t, e, r) {
            return typeof t != "boolean" && null != t && (r = e, e = t, t = false), Z(n, t, typeof e == "function" && tt(e, r, 1))
        }, J.cloneDeep = function (n, t, e) { return Z(n, true, typeof t == "function" && tt(t, e, 1)) }, J.contains = Ct, J.escape = function (n) { return null == n ? "" : oe(n).replace(ze, pt) }, J.every = Ot, J.find = It, J.findIndex = function (n, t, e) { var r = -1, u = n ? n.length : 0; for (t = J.createCallback(t, e, 3) ; ++r < u;) if (t(n[r], r, n)) return r; return -1 }, J.findKey = function (n, t, e) { var r; return t = J.createCallback(t, e, 3), h(n, function (n, e, u) { return t(n, e, u) ? (r = e, false) : void 0 }), r }, J.findLast = function (n, t, e) {
            var r; return t = J.createCallback(t, e, 3), Et(n, function (n, e, u) {
                return t(n, e, u) ? (r = n, false) : void 0
            }), r
        }, J.findLastIndex = function (n, t, e) { var r = n ? n.length : 0; for (t = J.createCallback(t, e, 3) ; r--;) if (t(n[r], r, n)) return r; return -1 }, J.findLastKey = function (n, t, e) { var r; return t = J.createCallback(t, e, 3), mt(n, function (n, e, u) { return t(n, e, u) ? (r = e, false) : void 0 }), r }, J.has = function (n, t) { return n ? me.call(n, t) : false }, J.identity = Ut, J.indexOf = Wt, J.isArguments = yt, J.isArray = Te, J.isBoolean = function (n) { return true === n || false === n || n && typeof n == "object" && ce.call(n) == T || false }, J.isDate = function (n) {
            return n && typeof n == "object" && ce.call(n) == F || false
        }, J.isElement = function (n) { return n && 1 === n.nodeType || false }, J.isEmpty = function (n) { var t = true; if (!n) return t; var e = ce.call(n), r = n.length; return e == $ || e == P || e == D || e == q && typeof r == "number" && dt(n.splice) ? !r : (h(n, function () { return t = false }), t) }, J.isEqual = function (n, t, e, r) { return ot(n, t, typeof e == "function" && tt(e, r, 2)) }, J.isFinite = function (n) { return Ce(n) && !Oe(parseFloat(n)) }, J.isFunction = dt, J.isNaN = function (n) { return jt(n) && n != +n }, J.isNull = function (n) { return null === n }, J.isNumber = jt, J.isObject = wt, J.isPlainObject = Pe, J.isRegExp = function (n) {
            return n && typeof n == "object" && ce.call(n) == z || false
        }, J.isString = kt, J.isUndefined = function (n) { return typeof n == "undefined" }, J.lastIndexOf = function (n, t, e) { var r = n ? n.length : 0; for (typeof e == "number" && (r = (0 > e ? Ie(0, r + e) : Se(e, r - 1)) + 1) ; r--;) if (n[r] === t) return r; return -1 }, J.mixin = Gt, J.noConflict = function () { return e._ = le, this }, J.noop = Ht, J.now = Ue, J.parseInt = Ge, J.random = function (n, t, e) {
            var r = null == n, u = null == t; return null == e && (typeof n == "boolean" && u ? (e = n, n = 1) : u || typeof t != "boolean" || (e = t, u = true)), r && u && (t = 1), n = +n || 0, u ? (t = n, n = 0) : t = +t || 0, e || n % 1 || t % 1 ? (e = Re(), Se(n + e * (t - n + parseFloat("1e-" + ((e + "").length - 1))), t)) : at(n, t)
        }, J.reduce = Dt, J.reduceRight = $t, J.result = function (n, t) { if (n) { var e = n[t]; return dt(e) ? n[t]() : e } }, J.runInContext = s, J.size = function (n) { var t = n ? n.length : 0; return typeof t == "number" ? t : Fe(n).length }, J.some = Ft, J.sortedIndex = zt, J.template = function (n, t, e) {
            var r = J.templateSettings; n = oe(n || ""), e = _({}, e, r); var u, o = _({}, e.imports, r.imports), r = Fe(o), o = xt(o), a = 0, f = e.interpolate || S, l = "__p+='", f = ue((e.escape || S).source + "|" + f.source + "|" + (f === N ? x : S).source + "|" + (e.evaluate || S).source + "|$", "g"); n.replace(f, function (t, e, r, o, f, c) {
                return r || (r = o), l += n.slice(a, c).replace(R, i), e && (l += "'+__e(" + e + ")+'"), f && (u = true, l += "';" + f + ";\n__p+='"), r && (l += "'+((__t=(" + r + "))==null?'':__t)+'"), a = c + t.length, t
            }), l += "';", f = e = e.variable, f || (e = "obj", l = "with(" + e + "){" + l + "}"), l = (u ? l.replace(w, "") : l).replace(j, "$1").replace(k, "$1;"), l = "function(" + e + "){" + (f ? "" : e + "||(" + e + "={});") + "var __t,__p='',__e=_.escape" + (u ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + l + "return __p}"; try { var c = ne(r, "return " + l).apply(v, o) } catch (p) { throw p.source = l, p } return t ? c(t) : (c.source = l, c)
        }, J.unescape = function (n) { return null == n ? "" : oe(n).replace(qe, gt) }, J.uniqueId = function (n) {
            var t = ++y; return oe(null == n ? "" : n) + t
        }, J.all = Ot, J.any = Ft, J.detect = It, J.findWhere = It, J.foldl = Dt, J.foldr = $t, J.include = Ct, J.inject = Dt, Gt(function () { var n = {}; return h(J, function (t, e) { J.prototype[e] || (n[e] = t) }), n }(), false), J.first = Bt, J.last = function (n, t, e) { var r = 0, u = n ? n.length : 0; if (typeof t != "number" && null != t) { var o = u; for (t = J.createCallback(t, e, 3) ; o-- && t(n[o], o, n) ;) r++ } else if (r = t, null == r || e) return n ? n[u - 1] : v; return p(n, Ie(0, u - r)) }, J.sample = function (n, t, e) {
            return n && typeof n.length != "number" && (n = xt(n)), null == t || e ? n ? n[at(0, n.length - 1)] : v : (n = Tt(n), n.length = Se(Ie(0, t), n.length), n)
        }, J.take = Bt, J.head = Bt, h(J, function (n, t) { var e = "sample" !== t; J.prototype[t] || (J.prototype[t] = function (t, r) { var u = this.__chain__, o = n(this.__wrapped__, t, r); return u || null != t && (!r || e && typeof t == "function") ? new Q(o, u) : o }) }), J.VERSION = "2.4.1", J.prototype.chain = function () { return this.__chain__ = true, this }, J.prototype.toString = function () { return oe(this.__wrapped__) }, J.prototype.value = Qt, J.prototype.valueOf = Qt, St(["join", "pop", "shift"], function (n) {
            var t = ae[n]; J.prototype[n] = function () {
                var n = this.__chain__, e = t.apply(this.__wrapped__, arguments);
                return n ? new Q(e, n) : e
            }
        }), St(["push", "reverse", "sort", "unshift"], function (n) { var t = ae[n]; J.prototype[n] = function () { return t.apply(this.__wrapped__, arguments), this } }), St(["concat", "slice", "splice"], function (n) { var t = ae[n]; J.prototype[n] = function () { return new Q(t.apply(this.__wrapped__, arguments), this.__chain__) } }), J
    } var v, h = [], g = [], y = 0, m = +new Date + "", b = 75, _ = 40, d = " \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000", w = /\b__p\+='';/g, j = /\b(__p\+=)''\+/g, k = /(__e\(.*?\)|\b__t\))\+'';/g, x = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, C = /\w*$/, O = /^\s*function[ \n\r\t]+\w/, N = /<%=([\s\S]+?)%>/g, I = RegExp("^[" + d + "]*0+(?=.$)"), S = /($^)/, E = /\bthis\b/, R = /['\n\r\t\u2028\u2029\\]/g, A = "Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "), D = "[object Arguments]", $ = "[object Array]", T = "[object Boolean]", F = "[object Date]", B = "[object Function]", W = "[object Number]", q = "[object Object]", z = "[object RegExp]", P = "[object String]", K = {};
    K[B] = false, K[D] = K[$] = K[T] = K[F] = K[W] = K[q] = K[z] = K[P] = true; var L = { leading: false, maxWait: 0, trailing: false }, M = { configurable: false, enumerable: false, value: null, writable: false }, V = { "boolean": false, "function": true, object: true, number: false, string: false, undefined: false }, U = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\t": "t", "\u2028": "u2028", "\u2029": "u2029" }, G = V[typeof window] && window || this, H = V[typeof exports] && exports && !exports.nodeType && exports, J = V[typeof module] && module && !module.nodeType && module, Q = J && J.exports === H && H, X = V[typeof global] && global; !X || X.global !== X && X.window !== X || (G = X);
    var Y = s(); typeof define == "function" && typeof define.amd == "object" && define.amd ? (G._ = Y, define(function () { return Y })) : H && J ? Q ? (J.exports = Y)._ = Y : H._ = Y : G._ = Y
}).call(this);
'use strict';

var directiveModule = angular.module('angularjs-dropdown-multiselect', []);

directiveModule.directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', '$parse',
    function ($filter, $document, $compile, $parse) {

        return {
            restrict: 'AE',
            scope: {
                selectedModel: '=',
                options: '=',
                extraSettings: '=',
                events: '=',
                searchFilter: '=?',
                translationTexts: '=',
                groupBy: '@'
            },
            template: function (element, attrs) {
                var checkboxes = attrs.checkboxes ? true : false;
                var groups = attrs.groupBy ? true : false;

                var template = '<div class="multiselect-parent btn-group dropdown-multiselect">';
                template += '<button type="button" class="dropdown-toggle multiselectbuttonwidth" ng-class="settings.buttonClasses" ng-click="toggleDropdown()"><div class="multiselecttextwidth">{{getButtonText()}}</div><div class="fa fa-lg fa-angle-down multiselectarrow"></div></button>';
                template += '<ul class="dropdown-menu dropdown-menu-form multiselectscroll" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\' }">';
                template += '<li class="multiselectSelectAll" ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>';
                template += '<li class="multiselectSelectAll" ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>';
                template += '<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="multiselectdivider"></li>';
                template += '<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>';
                template += '<li ng-show="settings.enableSearch" class="multiselectdivider"></li>';

                if (groups) {
                    template += '<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>';
                    template += '<li ng-repeat-end role="presentation">';
                } else {
                    template += '<li role="presentation" ng-repeat="option in options | filter: searchFilter">';
                }

                template += '<a role="menuitem" class="multiselectnocheckbox" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">';

                if (checkboxes) {
                    template += '<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>';
                } else {
                    template += '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>';
                }

                template += '</li>';

                template += '<li class="divider" ng-show="settings.selectionLimit > 1"></li>';
                template += '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>';

                template += '</ul>';
                template += '</div>';

                element.html(template);
            },
            link: function ($scope, $element, $attrs) {
                var $dropdownTrigger = $element.children()[0];
                
                $scope.toggleDropdown = function () {
                    $scope.open = !$scope.open;
                };

                $scope.checkboxClick = function ($event, id) {
                    $scope.setSelectedItem(id);
                    $event.stopImmediatePropagation();
                };

                $scope.externalEvents = {
                    onItemSelect: angular.noop,
                    onItemDeselect: angular.noop,
                    onSelectAll: angular.noop,
                    onDeselectAll: angular.noop,
                    onInitDone: angular.noop,
                    onMaxSelectionReached: angular.noop
                };

                $scope.settings = {
                    dynamicTitle: true,
                    scrollable: false,
                    scrollableHeight: '300px',
                    closeOnBlur: true,
                    displayProp: 'label',
                    idProp: 'id',
                    externalIdProp: 'id',
                    enableSearch: false,
                    selectionLimit: 0,
                    showCheckAll: true,
                    showUncheckAll: true,
                    closeOnSelect: false,
                    buttonClasses: 'btn-filter filterborder',
                    closeOnDeselect: false,
                    groupBy: $attrs.groupBy || undefined,
                    groupByTextProvider: null,
                    smartButtonMaxItems: 0,
                    smartButtonTextConverter: angular.noop
                };

                $scope.texts = {
                    checkAll: 'Select All',
                    uncheckAll: 'Unselect All',
                    selectionCount: 'checked',
                    selectionOf: '/',
                    searchPlaceholder: 'Search...',
                    buttonDefaultText: 'Select',
                    dynamicButtonTextSuffix: 'checked'
                };

                $scope.searchFilter = $scope.searchFilter || '';

                if (angular.isDefined($scope.settings.groupBy)) {
                    $scope.$watch('options', function (newValue) {
                        if (angular.isDefined(newValue)) {
                            $scope.orderedItems = $filter('orderBy')(newValue, $scope.settings.groupBy);
                        }
                    });
                }

                angular.extend($scope.settings, $scope.extraSettings || []);
                angular.extend($scope.externalEvents, $scope.events || []);
                angular.extend($scope.texts, $scope.translationTexts);

                $scope.singleSelection = $scope.settings.selectionLimit === 1;

                function getFindObj(id) {
                    var findObj = {};

                    if ($scope.settings.externalIdProp === '') {
                        findObj[$scope.settings.idProp] = id;
                    } else {
                        findObj[$scope.settings.externalIdProp] = id;
                    }

                    return findObj;
                }

                function clearObject(object) {
                    for (var prop in object) {
                        delete object[prop];
                    }
                }

                if ($scope.singleSelection) {
                    if (angular.isArray($scope.selectedModel) && $scope.selectedModel.length === 0) {
                        clearObject($scope.selectedModel);
                    }
                }

                if ($scope.settings.closeOnBlur) {
                    $document.on('click', function (e) {
                        var target = e.target.parentElement;
                        var parentFound = false;

                        while (angular.isDefined(target) && target !== null && !parentFound) {
                            if (_.contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
                                if(target === $dropdownTrigger) {
                                    parentFound = true;
                                }
                            }
                            target = target.parentElement;
                        }

                        if (!parentFound) {
                            $scope.$apply(function () {
                                $scope.open = false;
                            });
                        }
                    });
                }

                $scope.getGroupTitle = function (groupValue) {
                    if ($scope.settings.groupByTextProvider !== null) {
                        return $scope.settings.groupByTextProvider(groupValue);
                    }

                    return groupValue;
                };

                $scope.getButtonText = function () {
                    if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && _.keys($scope.selectedModel).length > 0))) {
                        if ($scope.settings.smartButtonMaxItems > 0) {
                            var itemsText = [];

                            angular.forEach($scope.options, function (optionItem) {
                                if ($scope.isChecked($scope.getPropertyForObject(optionItem, $scope.settings.idProp))) {
                                    var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
                                    var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

                                    itemsText.push(converterResponse ? converterResponse : displayText);
                                }
                            });

                            if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
                                itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
                                itemsText.push('...');
                            }

                            return itemsText.join(', ');
                        } else {
                            var totalSelected;

                            if ($scope.singleSelection) {
                                totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
                            } else {
                                totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;
                            }

                            if (totalSelected === 0) {
                                return $scope.texts.buttonDefaultText;
                            } else {
                                return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
                            }
                        }
                    } else {
                        return $scope.texts.buttonDefaultText;
                    }
                };

                $scope.getPropertyForObject = function (object, property) {
                    if (angular.isDefined(object) && object.hasOwnProperty(property)) {
                        return object[property];
                    }

                    return '';
                };

                $scope.selectAll = function () {
                    $scope.deselectAll(false);
                    $scope.externalEvents.onSelectAll();

                    angular.forEach($scope.options, function (value) {
                        $scope.setSelectedItem(value[$scope.settings.idProp], true);
                    });
                };

                $scope.deselectAll = function (sendEvent) {
                    sendEvent = sendEvent || true;                   

                    if ($scope.singleSelection) {
                        clearObject($scope.selectedModel);
                    } else {
                        $scope.selectedModel.splice(0, $scope.selectedModel.length);
                    }

                    if (sendEvent) {
                        $scope.externalEvents.onDeselectAll();
                    }
                };

                $scope.setSelectedItem = function (id, dontRemove) {
                    var findObj = getFindObj(id);
                    var finalObj = null;

                    if ($scope.settings.externalIdProp === '') {
                        finalObj = _.find($scope.options, findObj);
                    } else {
                        finalObj = findObj;
                    }

                    if ($scope.singleSelection) {
                        clearObject($scope.selectedModel);
                        angular.extend($scope.selectedModel, finalObj);
                        $scope.externalEvents.onItemSelect(finalObj);
                        if ($scope.settings.closeOnSelect) $scope.open = false;

                        return;
                    }

                    dontRemove = dontRemove || false;

                    var exists = _.findIndex($scope.selectedModel, findObj) !== -1;

                    if (!dontRemove && exists) {
                        $scope.selectedModel.splice(_.findIndex($scope.selectedModel, findObj), 1);
                        $scope.externalEvents.onItemDeselect(findObj);
                    } else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
                        $scope.selectedModel.push(finalObj);
                        $scope.externalEvents.onItemSelect(finalObj);
                    }
                    if ($scope.settings.closeOnSelect) $scope.open = false;
                };

                $scope.isChecked = function (id) {
                    if ($scope.singleSelection) {
                        return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) && $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
                    }

                    return _.findIndex($scope.selectedModel, getFindObj(id)) !== -1;
                };

                $scope.externalEvents.onInitDone();
            }
        };
}]);

/**
 * ng-breadcrumb.js - v0.4.1 - A better AngularJS service to help with
 * breadcrumb-style navigation between views.
 *
 * @author Ian Kennington Walter (http://ianvonwalter.com)
 */
(function (angular) {
    'use strict';

    angular
      .module('ng-breadcrumbs', [])
      .factory('breadcrumbs', [
        '$rootScope',
        '$location',
        '$route',
        function ($rootScope, $location, $route) {
            var BreadcrumbService = {
                breadcrumbs: [],
                get: function (options) {
                    this.options = options || this.options;
                    if (this.options) {
                        for (var key in this.options) {
                            if (this.options.hasOwnProperty(key)) {
                                for (var index in this.breadcrumbs) {
                                    if (this.breadcrumbs.hasOwnProperty(index)) {
                                        var breadcrumb = this.breadcrumbs[index];
                                        if (breadcrumb.label === key) {
                                            breadcrumb.label = this.options[key];
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return this.breadcrumbs;
                },
                generateBreadcrumbs: function () {
                    var routes = $route.routes,
                        _this = this,
                        params,
                        pathElements,
                        pathObj = {},
                        path = '',
                        originalPath = '',
                        param;

                    if ($route && $route.current && $route.current.originalPath) {
                        if (!this.breadcrumbs) {
                            this.breadcrumbs = [];
                        }
                        if ($route.current.$$route.label && ($route.current.$$route.label == "Category"
                            || $route.current.$$route.label == "Offers" || $route.current.$$route.label == "Home"))
                        {
                            this.breadcrumbs = [];
                        }

                        if(this.breadcrumbs.length>4)
                        {
                            this.breadcrumbs.shift();
                        }

                        params = $route.current.params;
                        pathElements = $route.current.originalPath.trim().split('/');

                        // Necessary to get rid of of duplicate empty string on root path
                        if (pathElements[1] === '') {
                            pathElements.splice(1, 1);
                        }

                        angular.forEach(pathElements, function (pathElement, index) {
                            param = pathElement[0] === ':' &&
                                    typeof params[pathElement
                                      .slice(1, pathElement.length)] !== 'undefined' ?
                                    params[pathElement.slice(1, pathElement.length)] :
                                    false;

                            pathObj[index] = {
                                path: param || pathElement,
                                originalPath: pathElement
                            };

                            path = Object
                              .keys(pathObj)
                              .map(function (k) { return pathObj[k].path; })
                              .join('/') || '/';

                            originalPath = Object
                              .keys(pathObj)
                              .map(function (k) { return pathObj[k].originalPath; })
                              .join('/') || '/';

                            if ($route.current.$$route.label == "Search")
                            {
                                path = path + "?" + "productFilter=" + $route.current.params.productFilter;
                            }

                            if (_this.breadcrumbs.length > 0) {
                                if (routes[originalPath] &&
                                    (routes[originalPath].label || param) &&
                                    !routes[originalPath].excludeBreadcrumb && _this.breadcrumbs[_this.breadcrumbs.length - 1].path != path) {
                                    _this.breadcrumbs.push({
                                        path: path,
                                        originalPath: originalPath,
                                        label: routes[originalPath].label || param,
                                        param: param
                                    });
                                }
                            }
                            else
                            {
                                if (routes[originalPath] &&
                                      (routes[originalPath].label || param) &&
                                      !routes[originalPath].excludeBreadcrumb) {
                                    _this.breadcrumbs.push({
                                        path: path,
                                        originalPath: originalPath,
                                        label: routes[originalPath].label || param,
                                        param: param
                                    });
                                }

                            }
                        });
                    }
                }
            };

            // We want to update breadcrumbs only when a route is actually changed
            // as $location.path() will get updated immediately (even if route
            // change fails!)
            $rootScope.$on('$routeChangeSuccess', function () {
                BreadcrumbService.generateBreadcrumbs();
            });

            $rootScope.$watch(
              function () { return BreadcrumbService.options; },
              function () {
                  BreadcrumbService.generateBreadcrumbs();
              }
            );

            BreadcrumbService.generateBreadcrumbs();

            return BreadcrumbService;
        }
      ]);
})(angular);

/*!
 * Jasny Bootstrap v3.1.3 (http://jasny.github.io/bootstrap)
 * Copyright 2012-2014 Arnold Daniels
 * Licensed under Apache-2.0 (https://github.com/jasny/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Jasny Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}void 0===a.support.transition&&(a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()}))}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.state=null,this.placement=null,this.options.recalc&&(this.calcClone(),a(window).on("resize",a.proxy(this.recalc,this))),this.options.autohide&&a(document).on("click",a.proxy(this.autohide,this)),this.options.toggle&&this.toggle(),this.options.disablescrolling&&(this.options.disableScrolling=this.options.disablescrolling,delete this.options.disablescrolling)};b.DEFAULTS={toggle:!0,placement:"auto",autohide:!0,recalc:!0,disableScrolling:!0},b.prototype.offset=function(){switch(this.placement){case"left":case"right":return this.$element.outerWidth();case"top":case"bottom":return this.$element.outerHeight()}},b.prototype.calcPlacement=function(){function b(a,b){if("auto"===e.css(b))return a;if("auto"===e.css(a))return b;var c=parseInt(e.css(a),10),d=parseInt(e.css(b),10);return c>d?b:a}if("auto"!==this.options.placement)return void(this.placement=this.options.placement);this.$element.hasClass("in")||this.$element.css("visiblity","hidden !important").addClass("in");var c=a(window).width()/this.$element.width(),d=a(window).height()/this.$element.height(),e=this.$element;this.placement=c>=d?b("left","right"):b("top","bottom"),"hidden !important"===this.$element.css("visibility")&&this.$element.removeClass("in").css("visiblity","")},b.prototype.opposite=function(a){switch(a){case"top":return"bottom";case"left":return"right";case"bottom":return"top";case"right":return"left"}},b.prototype.getCanvasElements=function(){var b=this.options.canvas?a(this.options.canvas):this.$element,c=b.find("*").filter(function(){return"fixed"===a(this).css("position")}).not(this.options.exclude);return b.add(c)},b.prototype.slide=function(b,c,d){if(!a.support.transition){var e={};return e[this.placement]="+="+c,b.animate(e,350,d)}var f=this.placement,g=this.opposite(f);b.each(function(){"auto"!==a(this).css(f)&&a(this).css(f,(parseInt(a(this).css(f),10)||0)+c),"auto"!==a(this).css(g)&&a(this).css(g,(parseInt(a(this).css(g),10)||0)-c)}),this.$element.one(a.support.transition.end,d).emulateTransitionEnd(350)},b.prototype.disableScrolling=function(){var b=a("body").width(),c="padding-"+this.opposite(this.placement);if(void 0===a("body").data("offcanvas-style")&&a("body").data("offcanvas-style",a("body").attr("style")||""),a("body").css("overflow","hidden"),a("body").width()>b){var d=parseInt(a("body").css(c),10)+a("body").width()-b;setTimeout(function(){a("body").css(c,d)},1)}},b.prototype.show=function(){if(!this.state){var b=a.Event("show.bs.offcanvas");if(this.$element.trigger(b),!b.isDefaultPrevented()){this.state="slide-in",this.calcPlacement();var c=this.getCanvasElements(),d=this.placement,e=this.opposite(d),f=this.offset();-1!==c.index(this.$element)&&(a(this.$element).data("offcanvas-style",a(this.$element).attr("style")||""),this.$element.css(d,-1*f),this.$element.css(d)),c.addClass("canvas-sliding").each(function(){void 0===a(this).data("offcanvas-style")&&a(this).data("offcanvas-style",a(this).attr("style")||""),"static"===a(this).css("position")&&a(this).css("position","relative"),"auto"!==a(this).css(d)&&"0px"!==a(this).css(d)||"auto"!==a(this).css(e)&&"0px"!==a(this).css(e)||a(this).css(d,0)}),this.options.disableScrolling&&this.disableScrolling();var g=function(){"slide-in"==this.state&&(this.state="slid",c.removeClass("canvas-sliding").addClass("canvas-slid"),this.$element.trigger("shown.bs.offcanvas"))};setTimeout(a.proxy(function(){this.$element.addClass("in"),this.slide(c,f,a.proxy(g,this))},this),1)}}},b.prototype.hide=function(){if("slid"===this.state){var b=a.Event("hide.bs.offcanvas");if(this.$element.trigger(b),!b.isDefaultPrevented()){this.state="slide-out";var c=a(".canvas-slid"),d=(this.placement,-1*this.offset()),e=function(){"slide-out"==this.state&&(this.state=null,this.placement=null,this.$element.removeClass("in"),c.removeClass("canvas-sliding"),c.add(this.$element).add("body").each(function(){a(this).attr("style",a(this).data("offcanvas-style")).removeData("offcanvas-style")}),this.$element.trigger("hidden.bs.offcanvas"))};c.removeClass("canvas-slid").addClass("canvas-sliding"),setTimeout(a.proxy(function(){this.slide(c,d,a.proxy(e,this))},this),1)}}},b.prototype.toggle=function(){"slide-in"!==this.state&&"slide-out"!==this.state&&this["slid"===this.state?"hide":"show"]()},b.prototype.calcClone=function(){this.$calcClone=this.$element.clone().html("").addClass("offcanvas-clone").removeClass("in").appendTo(a("body"))},b.prototype.recalc=function(){if("none"!==this.$calcClone.css("display")&&("slid"===this.state||"slide-in"===this.state)){this.state=null,this.placement=null;var b=this.getCanvasElements();this.$element.removeClass("in"),b.removeClass("canvas-slid"),b.add(this.$element).add("body").each(function(){a(this).attr("style",a(this).data("offcanvas-style")).removeData("offcanvas-style")})}},b.prototype.autohide=function(b){0===a(b.target).closest(this.$element).length&&this.hide()};var c=a.fn.offcanvas;a.fn.offcanvas=function(c){return this.each(function(){var d=a(this),e=d.data("bs.offcanvas"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);e||d.data("bs.offcanvas",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.offcanvas.Constructor=b,a.fn.offcanvas.noConflict=function(){return a.fn.offcanvas=c,this},a(document).on("click.bs.offcanvas.data-api","[data-toggle=offcanvas]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.offcanvas"),h=g?"toggle":d.data();b.stopPropagation(),g?g.toggle():f.offcanvas(h)})}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.$element.on("click.bs.rowlink","td:not(.rowlink-skip)",a.proxy(this.click,this))};b.DEFAULTS={target:"a"},b.prototype.click=function(b){var c=a(b.currentTarget).closest("tr").find(this.options.target)[0];if(a(b.target)[0]!==c)if(b.preventDefault(),c.click)c.click();else if(document.createEvent){var d=document.createEvent("MouseEvents");d.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),c.dispatchEvent(d)}};var c=a.fn.rowlink;a.fn.rowlink=function(c){return this.each(function(){var d=a(this),e=d.data("bs.rowlink");e||d.data("bs.rowlink",e=new b(this,c))})},a.fn.rowlink.Constructor=b,a.fn.rowlink.noConflict=function(){return a.fn.rowlink=c,this},a(document).on("click.bs.rowlink.data-api",'[data-link="row"]',function(b){if(0===a(b.target).closest(".rowlink-skip").length){var c=a(this);c.data("bs.rowlink")||(c.rowlink(c.data()),a(b.target).trigger("click.bs.rowlink"))}})}(window.jQuery),+function(a){"use strict";var b=void 0!==window.orientation,c=navigator.userAgent.toLowerCase().indexOf("android")>-1,d="Microsoft Internet Explorer"==window.navigator.appName,e=function(b,d){c||(this.$element=a(b),this.options=a.extend({},e.DEFAULTS,d),this.mask=String(this.options.mask),this.init(),this.listen(),this.checkVal())};e.DEFAULTS={mask:"",placeholder:"_",definitions:{9:"[0-9]",a:"[A-Za-z]",w:"[A-Za-z0-9]","*":"."}},e.prototype.init=function(){var b=this.options.definitions,c=this.mask.length;this.tests=[],this.partialPosition=this.mask.length,this.firstNonMaskPos=null,a.each(this.mask.split(""),a.proxy(function(a,d){"?"==d?(c--,this.partialPosition=a):b[d]?(this.tests.push(new RegExp(b[d])),null===this.firstNonMaskPos&&(this.firstNonMaskPos=this.tests.length-1)):this.tests.push(null)},this)),this.buffer=a.map(this.mask.split(""),a.proxy(function(a){return"?"!=a?b[a]?this.options.placeholder:a:void 0},this)),this.focusText=this.$element.val(),this.$element.data("rawMaskFn",a.proxy(function(){return a.map(this.buffer,function(a,b){return this.tests[b]&&a!=this.options.placeholder?a:null}).join("")},this))},e.prototype.listen=function(){if(!this.$element.attr("readonly")){var b=(d?"paste":"input")+".mask";this.$element.on("unmask.bs.inputmask",a.proxy(this.unmask,this)).on("focus.bs.inputmask",a.proxy(this.focusEvent,this)).on("blur.bs.inputmask",a.proxy(this.blurEvent,this)).on("keydown.bs.inputmask",a.proxy(this.keydownEvent,this)).on("keypress.bs.inputmask",a.proxy(this.keypressEvent,this)).on(b,a.proxy(this.pasteEvent,this))}},e.prototype.caret=function(a,b){if(0!==this.$element.length){if("number"==typeof a)return b="number"==typeof b?b:a,this.$element.each(function(){if(this.setSelectionRange)this.setSelectionRange(a,b);else if(this.createTextRange){var c=this.createTextRange();c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select()}});if(this.$element[0].setSelectionRange)a=this.$element[0].selectionStart,b=this.$element[0].selectionEnd;else if(document.selection&&document.selection.createRange){var c=document.selection.createRange();a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length}return{begin:a,end:b}}},e.prototype.seekNext=function(a){for(var b=this.mask.length;++a<=b&&!this.tests[a];);return a},e.prototype.seekPrev=function(a){for(;--a>=0&&!this.tests[a];);return a},e.prototype.shiftL=function(a,b){var c=this.mask.length;if(!(0>a)){for(var d=a,e=this.seekNext(b);c>d;d++)if(this.tests[d]){if(!(c>e&&this.tests[d].test(this.buffer[e])))break;this.buffer[d]=this.buffer[e],this.buffer[e]=this.options.placeholder,e=this.seekNext(e)}this.writeBuffer(),this.caret(Math.max(this.firstNonMaskPos,a))}},e.prototype.shiftR=function(a){for(var b=this.mask.length,c=a,d=this.options.placeholder;b>c;c++)if(this.tests[c]){var e=this.seekNext(c),f=this.buffer[c];if(this.buffer[c]=d,!(b>e&&this.tests[e].test(f)))break;d=f}},e.prototype.unmask=function(){this.$element.unbind(".mask").removeData("inputmask")},e.prototype.focusEvent=function(){this.focusText=this.$element.val();var a=this.mask.length,b=this.checkVal();this.writeBuffer();var c=this,d=function(){b==a?c.caret(0,b):c.caret(b)};d(),setTimeout(d,50)},e.prototype.blurEvent=function(){this.checkVal(),this.$element.val()!==this.focusText&&this.$element.trigger("change")},e.prototype.keydownEvent=function(a){var c=a.which;if(8==c||46==c||b&&127==c){var d=this.caret(),e=d.begin,f=d.end;return f-e===0&&(e=46!=c?this.seekPrev(e):f=this.seekNext(e-1),f=46==c?this.seekNext(f):f),this.clearBuffer(e,f),this.shiftL(e,f-1),!1}return 27==c?(this.$element.val(this.focusText),this.caret(0,this.checkVal()),!1):void 0},e.prototype.keypressEvent=function(a){var b=this.mask.length,c=a.which,d=this.caret();if(a.ctrlKey||a.altKey||a.metaKey||32>c)return!0;if(c){d.end-d.begin!==0&&(this.clearBuffer(d.begin,d.end),this.shiftL(d.begin,d.end-1));var e=this.seekNext(d.begin-1);if(b>e){var f=String.fromCharCode(c);if(this.tests[e].test(f)){this.shiftR(e),this.buffer[e]=f,this.writeBuffer();var g=this.seekNext(e);this.caret(g)}}return!1}},e.prototype.pasteEvent=function(){var a=this;setTimeout(function(){a.caret(a.checkVal(!0))},0)},e.prototype.clearBuffer=function(a,b){for(var c=this.mask.length,d=a;b>d&&c>d;d++)this.tests[d]&&(this.buffer[d]=this.options.placeholder)},e.prototype.writeBuffer=function(){return this.$element.val(this.buffer.join("")).val()},e.prototype.checkVal=function(a){for(var b=this.mask.length,c=this.$element.val(),d=-1,e=0,f=0;b>e;e++)if(this.tests[e]){for(this.buffer[e]=this.options.placeholder;f++<c.length;){var g=c.charAt(f-1);if(this.tests[e].test(g)){this.buffer[e]=g,d=e;break}}if(f>c.length)break}else this.buffer[e]==c.charAt(f)&&e!=this.partialPosition&&(f++,d=e);return!a&&d+1<this.partialPosition?(this.$element.val(""),this.clearBuffer(0,b)):(a||d+1>=this.partialPosition)&&(this.writeBuffer(),a||this.$element.val(this.$element.val().substring(0,d+1))),this.partialPosition?e:this.firstNonMaskPos};var f=a.fn.inputmask;a.fn.inputmask=function(b){return this.each(function(){var c=a(this),d=c.data("bs.inputmask");d||c.data("bs.inputmask",d=new e(this,b))})},a.fn.inputmask.Constructor=e,a.fn.inputmask.noConflict=function(){return a.fn.inputmask=f,this},a(document).on("focus.bs.inputmask.data-api","[data-mask]",function(){var b=a(this);b.data("bs.inputmask")||b.inputmask(b.data())})}(window.jQuery),+function(a){"use strict";var b="Microsoft Internet Explorer"==window.navigator.appName,c=function(b,c){if(this.$element=a(b),this.$input=this.$element.find(":file"),0!==this.$input.length){this.name=this.$input.attr("name")||c.name,this.$hidden=this.$element.find('input[type=hidden][name="'+this.name+'"]'),0===this.$hidden.length&&(this.$hidden=a('<input type="hidden">').insertBefore(this.$input)),this.$preview=this.$element.find(".fileinput-preview");var d=this.$preview.css("height");"inline"!==this.$preview.css("display")&&"0px"!==d&&"none"!==d&&this.$preview.css("line-height",d),this.original={exists:this.$element.hasClass("fileinput-exists"),preview:this.$preview.html(),hiddenVal:this.$hidden.val()},this.listen()}};c.prototype.listen=function(){this.$input.on("change.bs.fileinput",a.proxy(this.change,this)),a(this.$input[0].form).on("reset.bs.fileinput",a.proxy(this.reset,this)),this.$element.find('[data-trigger="fileinput"]').on("click.bs.fileinput",a.proxy(this.trigger,this)),this.$element.find('[data-dismiss="fileinput"]').on("click.bs.fileinput",a.proxy(this.clear,this))},c.prototype.change=function(b){var c=void 0===b.target.files?b.target&&b.target.value?[{name:b.target.value.replace(/^.+\\/,"")}]:[]:b.target.files;if(b.stopPropagation(),0===c.length)return void this.clear();this.$hidden.val(""),this.$hidden.attr("name",""),this.$input.attr("name",this.name);var d=c[0];if(this.$preview.length>0&&("undefined"!=typeof d.type?d.type.match(/^image\/(gif|png|jpeg)$/):d.name.match(/\.(gif|png|jpe?g)$/i))&&"undefined"!=typeof FileReader){var e=new FileReader,f=this.$preview,g=this.$element;e.onload=function(b){var e=a("<img>");e[0].src=b.target.result,c[0].result=b.target.result,g.find(".fileinput-filename").text(d.name),"none"!=f.css("max-height")&&e.css("max-height",parseInt(f.css("max-height"),10)-parseInt(f.css("padding-top"),10)-parseInt(f.css("padding-bottom"),10)-parseInt(f.css("border-top"),10)-parseInt(f.css("border-bottom"),10)),f.html(e),g.addClass("fileinput-exists").removeClass("fileinput-new"),g.trigger("change.bs.fileinput",c)},e.readAsDataURL(d)}else this.$element.find(".fileinput-filename").text(d.name),this.$preview.text(d.name),this.$element.addClass("fileinput-exists").removeClass("fileinput-new"),this.$element.trigger("change.bs.fileinput")},c.prototype.clear=function(a){if(a&&a.preventDefault(),this.$hidden.val(""),this.$hidden.attr("name",this.name),this.$input.attr("name",""),b){var c=this.$input.clone(!0);this.$input.after(c),this.$input.remove(),this.$input=c}else this.$input.val("");this.$preview.html(""),this.$element.find(".fileinput-filename").text(""),this.$element.addClass("fileinput-new").removeClass("fileinput-exists"),void 0!==a&&(this.$input.trigger("change"),this.$element.trigger("clear.bs.fileinput"))},c.prototype.reset=function(){this.clear(),this.$hidden.val(this.original.hiddenVal),this.$preview.html(this.original.preview),this.$element.find(".fileinput-filename").text(""),this.original.exists?this.$element.addClass("fileinput-exists").removeClass("fileinput-new"):this.$element.addClass("fileinput-new").removeClass("fileinput-exists"),this.$element.trigger("reset.bs.fileinput")},c.prototype.trigger=function(a){this.$input.trigger("click"),a.preventDefault()};var d=a.fn.fileinput;a.fn.fileinput=function(b){return this.each(function(){var d=a(this),e=d.data("bs.fileinput");e||d.data("bs.fileinput",e=new c(this,b)),"string"==typeof b&&e[b]()})},a.fn.fileinput.Constructor=c,a.fn.fileinput.noConflict=function(){return a.fn.fileinput=d,this},a(document).on("click.fileinput.data-api",'[data-provides="fileinput"]',function(b){var c=a(this);if(!c.data("bs.fileinput")){c.fileinput(c.data());var d=a(b.target).closest('[data-dismiss="fileinput"],[data-trigger="fileinput"]');d.length>0&&(b.preventDefault(),d.trigger("click.bs.fileinput"))}})}(window.jQuery);