var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function r(e){e.forEach(t)}function o(e){return"function"==typeof e}function s(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let a,i;function l(e,t){return a||(a=document.createElement("a")),a.href=t,e===a.href}function u(e,t){e.appendChild(t)}function c(e,t,n){e.insertBefore(t,n||null)}function p(e){e.parentNode&&e.parentNode.removeChild(e)}function d(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function f(e){return document.createElement(e)}function h(e){return document.createTextNode(e)}function g(){return h(" ")}function m(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function v(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function y(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function b(e,t){e.value=null==t?"":t}function w(e,t,n,r){null===n?e.style.removeProperty(t):e.style.setProperty(t,n,r?"important":"")}function $(e){i=e}function E(e){(function(){if(!i)throw new Error("Function called outside component initialization");return i})().$$.on_mount.push(e)}const _=[],T=[],k=[],A=[],x=Promise.resolve();let N=!1;function S(e){k.push(e)}function C(e){A.push(e)}const L=new Set;let O=0;function j(){if(0!==O)return;const e=i;do{try{for(;O<_.length;){const e=_[O];O++,$(e),M(e.$$)}}catch(e){throw _.length=0,O=0,e}for($(null),_.length=0,O=0;T.length;)T.pop()();for(let e=0;e<k.length;e+=1){const t=k[e];L.has(t)||(L.add(t),t())}k.length=0}while(_.length);for(;A.length;)A.pop()();N=!1,L.clear(),$(e)}function M(e){if(null!==e.fragment){e.update(),r(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(S)}}const z=new Set;let P;function D(e,t){e&&e.i&&(z.delete(e),e.i(t))}function R(e,t,n,r){if(e&&e.o){if(z.has(e))return;z.add(e),P.c.push((()=>{z.delete(e),r&&(n&&e.d(1),r())})),e.o(t)}else r&&r()}function F(e,t,n){const r=e.$$.props[t];void 0!==r&&(e.$$.bound[r]=n,n(e.$$.ctx[r]))}function H(e){e&&e.c()}function I(e,n,s,a){const{fragment:i,after_update:l}=e.$$;i&&i.m(n,s),a||S((()=>{const n=e.$$.on_mount.map(t).filter(o);e.$$.on_destroy?e.$$.on_destroy.push(...n):r(n),e.$$.on_mount=[]})),l.forEach(S)}function Q(e,t){const n=e.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function U(e,t){-1===e.$$.dirty[0]&&(_.push(e),N||(N=!0,x.then(j)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function q(t,o,s,a,l,u,c,d=[-1]){const f=i;$(t);const h=t.$$={fragment:null,ctx:[],props:u,update:e,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(f?f.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:o.target||f.$$.root};c&&c(h.root);let g=!1;if(h.ctx=s?s(t,o.props||{},((e,n,...r)=>{const o=r.length?r[0]:n;return h.ctx&&l(h.ctx[e],h.ctx[e]=o)&&(!h.skip_bound&&h.bound[e]&&h.bound[e](o),g&&U(t,e)),n})):[],h.update(),g=!0,r(h.before_update),h.fragment=!!a&&a(h.ctx),o.target){if(o.hydrate){const e=function(e){return Array.from(e.childNodes)}(o.target);h.fragment&&h.fragment.l(e),e.forEach(p)}else h.fragment&&h.fragment.c();o.intro&&D(t.$$.fragment),I(t,o.target,o.anchor,o.customElement),j()}$(f)}class G{$destroy(){Q(this,1),this.$destroy=e}$on(t,n){if(!o(n))return e;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const e=r.indexOf(n);-1!==e&&r.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function Y(e,t,n){const r=e.slice();return r[2]=t[n],r}function W(e){let t;return{c(){t=f("div"),w(t,"background-color",e[1][e[2].intensity]),v(t,"class","contribution svelte-1m2xmwa")},m(e,n){c(e,t,n)},p(e,n){1&n&&w(t,"background-color",e[1][e[2].intensity])},d(e){e&&p(t)}}}function B(t){let n,r=t[0],o=[];for(let e=0;e<r.length;e+=1)o[e]=W(Y(t,r,e));return{c(){n=f("div");for(let e=0;e<o.length;e+=1)o[e].c();v(n,"class","contributions svelte-1m2xmwa")},m(e,t){c(e,n,t);for(let e=0;e<o.length;e+=1)o[e].m(n,null)},p(e,[t]){if(3&t){let s;for(r=e[0],s=0;s<r.length;s+=1){const a=Y(e,r,s);o[s]?o[s].p(a,t):(o[s]=W(a),o[s].c(),o[s].m(n,null))}for(;s<o.length;s+=1)o[s].d(1);o.length=r.length}},i:e,o:e,d(e){e&&p(n),d(o,e)}}}function V(e,t,n){let{contribution_list:r}=t;return e.$$set=e=>{"contribution_list"in e&&n(0,r=e.contribution_list)},[r,["#f1eef4","#c5bbd4","#9a87b4","#6e5494","#584376"]]}class J extends G{constructor(e){super(),q(this,e,V,B,s,{contribution_list:0})}}function X(t){let n,r;return{c(){n=f("div"),v(n,"class","stars svelte-tpw5ek"),w(n,"--rating",t[0]||0),v(n,"aria-label",r="Rating of this product is "+(t[0]||0)+" out of 5.")},m(e,t){c(e,n,t)},p(e,[t]){1&t&&w(n,"--rating",e[0]||0),1&t&&r!==(r="Rating of this product is "+(e[0]||0)+" out of 5.")&&v(n,"aria-label",r)},i:e,o:e,d(e){e&&p(n)}}}function Z(e,t,n){let{rating:r}=t;return e.$$set=e=>{"rating"in e&&n(0,r=e.rating)},[r]}class K extends G{constructor(e){super(),q(this,e,Z,X,s,{rating:0})}}function ee(e,t,n){const r=e.slice();return r[1]=t[n],r}function te(e){let t,n,r,o,s,a,i,l=e[1].name+"",d=e[1].stargazers_count+"";return a=new K({props:{rating:e[1].stargazers_count/(e[0][0].stargazers_count/5)}}),{c(){t=f("div"),n=h(l),r=h("-"),o=h(d),s=g(),H(a.$$.fragment),v(t,"class","repo")},m(e,l){c(e,t,l),u(t,n),u(t,r),u(t,o),c(e,s,l),I(a,e,l),i=!0},p(e,t){(!i||1&t)&&l!==(l=e[1].name+"")&&y(n,l),(!i||1&t)&&d!==(d=e[1].stargazers_count+"")&&y(o,d);const r={};1&t&&(r.rating=e[1].stargazers_count/(e[0][0].stargazers_count/5)),a.$set(r)},i(e){i||(D(a.$$.fragment,e),i=!0)},o(e){R(a.$$.fragment,e),i=!1},d(e){e&&p(t),e&&p(s),Q(a,e)}}}function ne(e){let t,n,o,s,a,i=(0==e[0].length?1:e[0][0].stargazers_count/5)+"",l=e[0],g=[];for(let t=0;t<l.length;t+=1)g[t]=te(ee(e,l,t));const m=e=>R(g[e],1,1,(()=>{g[e]=null}));return{c(){t=f("div"),n=h("Repo stars ("),o=h(i),s=h(" stars by real)\n    ");for(let e=0;e<g.length;e+=1)g[e].c();v(t,"class","repos")},m(e,r){c(e,t,r),u(t,n),u(t,o),u(t,s);for(let e=0;e<g.length;e+=1)g[e].m(t,null);a=!0},p(e,[n]){if((!a||1&n)&&i!==(i=(0==e[0].length?1:e[0][0].stargazers_count/5)+"")&&y(o,i),1&n){let o;for(l=e[0],o=0;o<l.length;o+=1){const r=ee(e,l,o);g[o]?(g[o].p(r,n),D(g[o],1)):(g[o]=te(r),g[o].c(),D(g[o],1),g[o].m(t,null))}for(P={r:0,c:[],p:P},o=l.length;o<g.length;o+=1)m(o);P.r||r(P.c),P=P.p}},i(e){if(!a){for(let e=0;e<l.length;e+=1)D(g[e]);a=!0}},o(e){g=g.filter(Boolean);for(let e=0;e<g.length;e+=1)R(g[e]);a=!1},d(e){e&&p(t),d(g,e)}}}function re(e,t,n){let{repos_list:r}=t;return e.$$set=e=>{"repos_list"in e&&n(0,r=e.repos_list)},[r]}class oe extends G{constructor(e){super(),q(this,e,re,ne,s,{repos_list:0})}}function se(e,t,n){const r=e.slice();return r[1]=t[n],r}function ae(e){let t,n,r,o=e[1][0]+": "+e[1][1];return{c(){t=f("div"),n=h(o),r=g(),v(t,"class","language")},m(e,o){c(e,t,o),u(t,n),u(t,r)},p(e,t){1&t&&o!==(o=e[1][0]+": "+e[1][1])&&y(n,o)},d(e){e&&p(t)}}}function ie(t){let n,r=t[0],o=[];for(let e=0;e<r.length;e+=1)o[e]=ae(se(t,r,e));return{c(){n=f("div");for(let e=0;e<o.length;e+=1)o[e].c();v(n,"class","languages svelte-nyf7da")},m(e,t){c(e,n,t);for(let e=0;e<o.length;e+=1)o[e].m(n,null)},p(e,[t]){if(1&t){let s;for(r=e[0],s=0;s<r.length;s+=1){const a=se(e,r,s);o[s]?o[s].p(a,t):(o[s]=ae(a),o[s].c(),o[s].m(n,null))}for(;s<o.length;s+=1)o[s].d(1);o.length=r.length}},i:e,o:e,d(e){e&&p(n),d(o,e)}}}function le(e,t,n){let{languages:r}=t;return e.$$set=e=>{"languages"in e&&n(0,r=e.languages)},[r]}class ue extends G{constructor(e){super(),q(this,e,le,ie,s,{languages:0})}}function ce(t){let n,s,a,i,l,d,h,y;return{c(){n=f("div"),s=f("div"),a=f("input"),i=g(),l=f("div"),d=f("button"),d.innerHTML='Check urself\n            <i class="icon svelte-13f0zz6"><svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 3.76172H10.6172L7.94531 1.05469L9 0L13.5 4.5L9 9L7.94531 7.94531L10.6172 5.23828H0V3.76172Z" fill="white"></path></svg></i>',v(a,"class","searchInpt svelte-13f0zz6"),v(a,"type","text"),v(a,"placeholder","Github Username"),v(s,"class","item svelte-13f0zz6"),v(d,"class","btnSearch svelte-13f0zz6"),v(l,"class","item svelte-13f0zz6"),v(n,"class","inputWithButton svelte-13f0zz6")},m(e,r){c(e,n,r),u(n,s),u(s,a),b(a,t[0]),u(n,i),u(n,l),u(l,d),h||(y=[m(a,"input",t[2]),m(d,"click",(function(){o(t[1]())&&t[1]().apply(this,arguments)}))],h=!0)},p(e,[n]){t=e,1&n&&a.value!==t[0]&&b(a,t[0])},i:e,o:e,d(e){e&&p(n),h=!1,r(y)}}}function pe(e,t,n){let{name:r=""}=t,{create:o}=t;return e.$$set=e=>{"name"in e&&n(0,r=e.name),"create"in e&&n(1,o=e.create)},[r,o,function(){r=this.value,n(0,r)}]}class de extends G{constructor(e){super(),q(this,e,pe,ce,s,{name:0,create:1})}}function fe(e){let t,n,r,o,s,a,i,l,d,m,b,w,$,E,_,k,A=(e[0]||"stranger")+"";function x(t){e[3](t)}let N={create:e[1]};return void 0!==e[0]&&(N.name=e[0]),$=new de({props:N}),T.push((()=>F($,"name",x))),{c(){t=f("div"),n=f("div"),n.innerHTML='<img alt="github-icon" src="./github.png" class="svelte-1bz84ab"/> \n        <div><h1 class="svelte-1bz84ab">How Bad Is Your GitHub Profile?</h1> \n            <h4 class="svelte-1bz84ab">Check urself before you wreck urself in those FAANG interviews</h4></div>',r=g(),o=f("div"),s=f("p"),a=h("Hello "),i=f("span"),l=h('"'),d=h(A),m=h('"'),b=h(" !"),w=g(),H($.$$.fragment),v(i,"class","i svelte-1bz84ab"),v(s,"class","svelte-1bz84ab"),v(t,"class",_="entry "+e[2]+" svelte-1bz84ab")},m(e,p){c(e,t,p),u(t,n),u(t,r),u(t,o),u(o,s),u(s,a),u(s,i),u(i,l),u(i,d),u(i,m),u(s,b),u(o,w),I($,o,null),k=!0},p(e,[n]){(!k||1&n)&&A!==(A=(e[0]||"stranger")+"")&&y(d,A);const r={};2&n&&(r.create=e[1]),!E&&1&n&&(E=!0,r.name=e[0],C((()=>E=!1))),$.$set(r),(!k||4&n&&_!==(_="entry "+e[2]+" svelte-1bz84ab"))&&v(t,"class",_)},i(e){k||(D($.$$.fragment,e),k=!0)},o(e){R($.$$.fragment,e),k=!1},d(e){e&&p(t),Q($)}}}function he(e,t,n){let{name:r}=t,{create:o}=t,{className:s}=t;return e.$$set=e=>{"name"in e&&n(0,r=e.name),"create"in e&&n(1,o=e.create),"className"in e&&n(2,s=e.className)},[r,o,s,function(e){r=e,n(0,r)}]}class ge extends G{constructor(e){super(),q(this,e,he,fe,s,{name:0,create:1,className:2})}}"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function me(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ve,ye,be=(ve=function(e,t){var n;"undefined"!=typeof self&&self,n=()=>(()=>{var e={75:function(e){(function(){var t,n,r,o,s,a;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(e.exports=function(){return(t()-s)/1e6},n=process.hrtime,o=(t=function(){var e;return 1e9*(e=n())[0]+e[1]})(),a=1e9*process.uptime(),s=o-a):Date.now?(e.exports=function(){return Date.now()-r},r=Date.now()):(e.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)},4087:(e,t,n)=>{for(var r=n(75),o="undefined"==typeof window?n.g:window,s=["moz","webkit"],a="AnimationFrame",i=o["request"+a],l=o["cancel"+a]||o["cancelRequest"+a],u=0;!i&&u<s.length;u++)i=o[s[u]+"Request"+a],l=o[s[u]+"Cancel"+a]||o[s[u]+"CancelRequest"+a];if(!i||!l){var c=0,p=0,d=[];i=function(e){if(0===d.length){var t=r(),n=Math.max(0,16.666666666666668-(t-c));c=n+t,setTimeout((function(){var e=d.slice(0);d.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(c)}catch(e){setTimeout((function(){throw e}),0)}}),Math.round(n))}return d.push({handle:++p,callback:e,cancelled:!1}),p},l=function(e){for(var t=0;t<d.length;t++)d[t].handle===e&&(d[t].cancelled=!0)}}e.exports=function(e){return i.call(o,e)},e.exports.cancel=function(){l.apply(o,arguments)},e.exports.polyfill=function(e){e||(e=o),e.requestAnimationFrame=i,e.cancelAnimationFrame=l}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={exports:{}};return e[r].call(s.exports,s,s.exports,n),s.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};return(()=>{n.d(r,{default:()=>T});var e=n(4087),t=n.n(e);const o=function(e){return new RegExp(/<[a-z][\s\S]*>/i).test(e)},s=function(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes},a=function(e,t){return Math.floor(Math.random()*(t-e+1))+e};var i="TYPE_CHARACTER",l="REMOVE_CHARACTER",u="REMOVE_ALL",c="REMOVE_LAST_VISIBLE_NODE",p="PAUSE_FOR",d="CALL_FUNCTION",f="ADD_HTML_TAG_ELEMENT",h="CHANGE_DELETE_SPEED",g="CHANGE_DELAY",m="CHANGE_CURSOR",v="PASTE_STRING",y="HTML_TAG";function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){_(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function $(e){return function(e){if(Array.isArray(e))return E(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return E(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?E(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const T=function(){function n(r,b){var E=this;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),_(this,"state",{cursorAnimation:null,lastFrameTime:null,pauseUntil:null,eventQueue:[],eventLoop:null,eventLoopPaused:!1,reverseCalledEvents:[],calledEvents:[],visibleNodes:[],initialOptions:null,elements:{container:null,wrapper:document.createElement("span"),cursor:document.createElement("span")}}),_(this,"options",{strings:null,cursor:"|",delay:"natural",pauseFor:1500,deleteSpeed:"natural",loop:!1,autoStart:!1,devMode:!1,skipAddStyles:!1,wrapperClassName:"Typewriter__wrapper",cursorClassName:"Typewriter__cursor",stringSplitter:null,onCreateTextNode:null,onRemoveNode:null}),_(this,"setupWrapperElement",(function(){E.state.elements.container&&(E.state.elements.wrapper.className=E.options.wrapperClassName,E.state.elements.cursor.className=E.options.cursorClassName,E.state.elements.cursor.innerHTML=E.options.cursor,E.state.elements.container.innerHTML="",E.state.elements.container.appendChild(E.state.elements.wrapper),E.state.elements.container.appendChild(E.state.elements.cursor))})),_(this,"start",(function(){return E.state.eventLoopPaused=!1,E.runEventLoop(),E})),_(this,"pause",(function(){return E.state.eventLoopPaused=!0,E})),_(this,"stop",(function(){return E.state.eventLoop&&((0,e.cancel)(E.state.eventLoop),E.state.eventLoop=null),E})),_(this,"pauseFor",(function(e){return E.addEventToQueue(p,{ms:e}),E})),_(this,"typeOutAllStrings",(function(){return"string"==typeof E.options.strings?(E.typeString(E.options.strings).pauseFor(E.options.pauseFor),E):(E.options.strings.forEach((function(e){E.typeString(e).pauseFor(E.options.pauseFor).deleteAll(E.options.deleteSpeed)})),E)})),_(this,"typeString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(o(e))return E.typeOutHTMLString(e,t);if(e){var n=E.options||{},r=n.stringSplitter,s="function"==typeof r?r(e):e.split("");E.typeCharacters(s,t)}return E})),_(this,"pasteString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return o(e)?E.typeOutHTMLString(e,t,!0):(e&&E.addEventToQueue(v,{character:e,node:t}),E)})),_(this,"typeOutHTMLString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2?arguments[2]:void 0,r=s(e);if(r.length>0)for(var o=0;o<r.length;o++){var a=r[o],i=a.innerHTML;a&&3!==a.nodeType?(a.innerHTML="",E.addEventToQueue(f,{node:a,parentNode:t}),n?E.pasteString(i,a):E.typeString(i,a)):a.textContent&&(n?E.pasteString(a.textContent,t):E.typeString(a.textContent,t))}return E})),_(this,"deleteAll",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"natural";return E.addEventToQueue(u,{speed:e}),E})),_(this,"changeDeleteSpeed",(function(e){if(!e)throw new Error("Must provide new delete speed");return E.addEventToQueue(h,{speed:e}),E})),_(this,"changeDelay",(function(e){if(!e)throw new Error("Must provide new delay");return E.addEventToQueue(g,{delay:e}),E})),_(this,"changeCursor",(function(e){if(!e)throw new Error("Must provide new cursor");return E.addEventToQueue(m,{cursor:e}),E})),_(this,"deleteChars",(function(e){if(!e)throw new Error("Must provide amount of characters to delete");for(var t=0;t<e;t++)E.addEventToQueue(l);return E})),_(this,"callFunction",(function(e,t){if(!e||"function"!=typeof e)throw new Error("Callbak must be a function");return E.addEventToQueue(d,{cb:e,thisArg:t}),E})),_(this,"typeCharacters",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!e||!Array.isArray(e))throw new Error("Characters must be an array");return e.forEach((function(e){E.addEventToQueue(i,{character:e,node:t})})),E})),_(this,"removeCharacters",(function(e){if(!e||!Array.isArray(e))throw new Error("Characters must be an array");return e.forEach((function(){E.addEventToQueue(l)})),E})),_(this,"addEventToQueue",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return E.addEventToStateProperty(e,t,n,"eventQueue")})),_(this,"addReverseCalledEvent",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=E.options.loop;return r?E.addEventToStateProperty(e,t,n,"reverseCalledEvents"):E})),_(this,"addEventToStateProperty",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3?arguments[3]:void 0,o={eventName:e,eventArgs:t||{}};return E.state[r]=n?[o].concat($(E.state[r])):[].concat($(E.state[r]),[o]),E})),_(this,"runEventLoop",(function(){E.state.lastFrameTime||(E.state.lastFrameTime=Date.now());var e=Date.now(),n=e-E.state.lastFrameTime;if(!E.state.eventQueue.length){if(!E.options.loop)return;E.state.eventQueue=$(E.state.calledEvents),E.state.calledEvents=[],E.options=w({},E.state.initialOptions)}if(E.state.eventLoop=t()(E.runEventLoop),!E.state.eventLoopPaused){if(E.state.pauseUntil){if(e<E.state.pauseUntil)return;E.state.pauseUntil=null}var r,o=$(E.state.eventQueue),s=o.shift();if(!(n<=(r=s.eventName===c||s.eventName===l?"natural"===E.options.deleteSpeed?a(40,80):E.options.deleteSpeed:"natural"===E.options.delay?a(120,160):E.options.delay))){var b=s.eventName,_=s.eventArgs;switch(E.logInDevMode({currentEvent:s,state:E.state,delay:r}),b){case v:case i:var T=_.character,k=_.node,A=document.createTextNode(T),x=A;E.options.onCreateTextNode&&"function"==typeof E.options.onCreateTextNode&&(x=E.options.onCreateTextNode(T,A)),x&&(k?k.appendChild(x):E.state.elements.wrapper.appendChild(x)),E.state.visibleNodes=[].concat($(E.state.visibleNodes),[{type:"TEXT_NODE",character:T,node:x}]);break;case l:o.unshift({eventName:c,eventArgs:{removingCharacterNode:!0}});break;case p:var N=s.eventArgs.ms;E.state.pauseUntil=Date.now()+parseInt(N);break;case d:var S=s.eventArgs,C=S.cb,L=S.thisArg;C.call(L,{elements:E.state.elements});break;case f:var O=s.eventArgs,j=O.node,M=O.parentNode;M?M.appendChild(j):E.state.elements.wrapper.appendChild(j),E.state.visibleNodes=[].concat($(E.state.visibleNodes),[{type:y,node:j,parentNode:M||E.state.elements.wrapper}]);break;case u:var z=E.state.visibleNodes,P=_.speed,D=[];P&&D.push({eventName:h,eventArgs:{speed:P,temp:!0}});for(var R=0,F=z.length;R<F;R++)D.push({eventName:c,eventArgs:{removingCharacterNode:!1}});P&&D.push({eventName:h,eventArgs:{speed:E.options.deleteSpeed,temp:!0}}),o.unshift.apply(o,D);break;case c:var H=s.eventArgs.removingCharacterNode;if(E.state.visibleNodes.length){var I=E.state.visibleNodes.pop(),Q=I.type,U=I.node,q=I.character;E.options.onRemoveNode&&"function"==typeof E.options.onRemoveNode&&E.options.onRemoveNode({node:U,character:q}),U&&U.parentNode.removeChild(U),Q===y&&H&&o.unshift({eventName:c,eventArgs:{}})}break;case h:E.options.deleteSpeed=s.eventArgs.speed;break;case g:E.options.delay=s.eventArgs.delay;break;case m:E.options.cursor=s.eventArgs.cursor,E.state.elements.cursor.innerHTML=s.eventArgs.cursor}E.options.loop&&(s.eventName===c||s.eventArgs&&s.eventArgs.temp||(E.state.calledEvents=[].concat($(E.state.calledEvents),[s]))),E.state.eventQueue=o,E.state.lastFrameTime=e}}})),r)if("string"==typeof r){var T=document.querySelector(r);if(!T)throw new Error("Could not find container element");this.state.elements.container=T}else this.state.elements.container=r;b&&(this.options=w(w({},this.options),b)),this.state.initialOptions=w({},this.options),this.init()}var r,b;return r=n,(b=[{key:"init",value:function(){var e;this.setupWrapperElement(),this.addEventToQueue(m,{cursor:this.options.cursor},!0),this.addEventToQueue(u,null,!0),!window||window.___TYPEWRITER_JS_STYLES_ADDED___||this.options.skipAddStyles||((e=document.createElement("style")).appendChild(document.createTextNode(".Typewriter__cursor{-webkit-animation:Typewriter-cursor 1s infinite;animation:Typewriter-cursor 1s infinite;margin-left:1px}@-webkit-keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}@keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}")),document.head.appendChild(e),window.___TYPEWRITER_JS_STYLES_ADDED___=!0),!0===this.options.autoStart&&this.options.strings&&this.typeOutAllStrings().start()}},{key:"logInDevMode",value:function(e){this.options.devMode&&console.log(e)}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(r.prototype,b),Object.defineProperty(r,"prototype",{writable:!1}),n}()})(),r.default})(),e.exports=n()},ve(ye={exports:{}},ye.exports),ye.exports),we=me(be);function $e(e){let t,n,r,o,s,a,i,d,m,b,w,$,E,_,k,A,x,N,S,L,O,j,M,z,P,U;function q(t){e[9](t)}let G={className:e[1],create:e[8]};return void 0!==e[0]&&(G.name=e[0]),n=new ge({props:G}),T.push((()=>F(n,"name",q))),L=new J({props:{contribution_list:e[4]}}),j=new oe({props:{repos_list:e[5]}}),z=new ue({props:{languages:e[6]}}),{c(){t=f("main"),H(n.$$.fragment),o=g(),s=f("div"),a=f("div"),i=g(),d=f("img"),b=g(),w=f("div"),$=f("div"),E=f("img"),k=g(),A=f("div"),x=f("h2"),N=h(e[3]),S=g(),H(L.$$.fragment),O=g(),H(j.$$.fragment),M=g(),H(z.$$.fragment),l(d.src,m="./icons.png")||v(d,"src","./icons.png"),v(d,"class","icons svelte-x2lk4l"),v(d,"alt","Icons"),v(d,"width","35"),l(E.src,_=e[2])||v(E,"src",_),v(E,"alt","profile"),v(E,"class","profile svelte-x2lk4l"),v(x,"class","svelte-x2lk4l"),v(A,"class","contributions_container svelte-x2lk4l"),v($,"class","profile_container svelte-x2lk4l"),v(w,"class","export svelte-x2lk4l"),v(s,"class",P="container "+e[1]+" svelte-x2lk4l"),v(t,"class","svelte-x2lk4l")},m(r,l){c(r,t,l),I(n,t,null),u(t,o),u(t,s),u(s,a),e[10](a),u(s,i),u(s,d),u(s,b),u(s,w),u(w,$),u($,E),u($,k),u($,A),u(A,x),u(x,N),u(A,S),I(L,A,null),u(w,O),I(j,w,null),u(w,M),I(z,w,null),U=!0},p(e,[t]){const o={};2&t&&(o.className=e[1]),!r&&1&t&&(r=!0,o.name=e[0],C((()=>r=!1))),n.$set(o),(!U||4&t&&!l(E.src,_=e[2]))&&v(E,"src",_),(!U||8&t)&&y(N,e[3]);const a={};16&t&&(a.contribution_list=e[4]),L.$set(a);const i={};32&t&&(i.repos_list=e[5]),j.$set(i);const u={};64&t&&(u.languages=e[6]),z.$set(u),(!U||2&t&&P!==(P="container "+e[1]+" svelte-x2lk4l"))&&v(s,"class",P)},i(e){U||(D(n.$$.fragment,e),D(L.$$.fragment,e),D(j.$$.fragment,e),D(z.$$.fragment,e),U=!0)},o(e){R(n.$$.fragment,e),R(L.$$.fragment,e),R(j.$$.fragment,e),R(z.$$.fragment,e),U=!1},d(r){r&&p(t),Q(n),e[10](null),Q(L),Q(j),Q(z)}}}let Ee="a699bc";function _e(e,t,n){let r,o,s,a="",i="",l="favicon.png",u="John Doe",c=[],p=[];E((async()=>{s=new we(o,{delay:75}),console.log(s,"test")}));const d=(e,t)=>new Promise(((n,r)=>{fetch(e.replace("$name$",t)).then((e=>e.json())).then((e=>{n(e)})).catch((e=>{r(e)}))})),f=async()=>{r=await d("https://api.github.com/users/$name$/repos?per_page=100",a),n(5,p=r.sort((function(e,t){return t.stargazers_count-e.stargazers_count})).slice(0,3)),0!=r.length&&(n(2,l=r[0].owner.avatar_url),n(3,u=r[0].owner.login)),h()},h=async()=>{n(1,i="fade-out");let e=await m(),t="<br><br>Let's check out now your fucking dumb open source projects that shouldn't even see the light of day <br><br>"+g();s.pauseFor(1500).typeString("Hello fuckface").pauseFor(100).deleteAll().typeString(`I mean hello <b style='color: #${Ee};'>${a}</b>, let's see if you actualy #code haha.`).pauseFor(500).typeString(t).pauseFor(500).typeString(e).pauseFor(1e3).start()},g=()=>{switch(!0){case 0==r.length:return`wow you have <b style='color: #${Ee};'> 0 public repos </b> you either hate open source or ur my mom checking out this project I shared (hi mom)`;case r.length>0&&r.length<10:return`cool you have <b style='color: #${Ee};'> ${r.length} repositories </b> really that's all? bump that up to atleast second digits. disgraceful`;case r.length>9&&r.length<50:return`Wow in the second digits impressive, you have <b style='color: #${Ee};'> ${r.length} public repositories. </b> Though I wonder what kind of person needs that many projects to hide their insecurities and inadequacies.`;case r.length>49&&r.length<100:return`It's clear that you've put in some work with over 50 public repos, it's quite a number huh <b style='color: #${Ee};'> (to be exact ${r.length})</b>, but this is not enough, you need to keep pushing, don't be satisfied with mediocrity.`;case r.length>99:return`You have an impressive number of <b style='color: #${Ee};'>${r.length} public repositories </b> in the hundreds, but I can't help but wonder if it's a way to compensate for something deeper and more profound that's missing in your life.`}},m=async()=>{let e="<br><br> Let's review your contributions for the last month. <br><br>",t=await d("https://github-contributions-gold.vercel.app/api/contributions?username=$name$",a),n=0;t.every((e=>0==e.count&&(n++,!0)));let r=0;return t.forEach((e=>{r+=e.count})),0==n&&(e+="Wow you pushed code today, okay you fucking nerd"),1==n&&(e+="Wow you pushed code yesterday, okay you fucking nerd"),2==n&&(e+="Hmm you didn't push code yesterday or the day before that, fucking fraud"),n>2&&n<10&&(e+=`${n} is the number of days you didn't push code, how are you able to look into your mother's eyes like this?`),n>9&&n<25&&(e+=`It's been weeks since you didn't push code, fucking weeks (to be precise: ${n} days), get back into it you dumbfuck.`),n>24&&n!=t.length&&(e+=`Almost a fucking month without contributions, a whole ${n} days without pushing anything, why are you even on this app? just close it right now.`),n==t.length&&(e+=`A whole month doing jack shit, I'm just dissapointed in you. You had ${t.length} days to push anything but yet you chose to do fuckall`),console.log(t.length),e+=`<br><br> But besides that good job ${r} contributions last month, amazing really.`,e},v=async()=>{fetch("http://localhost:3000/"+a).then((e=>e.json())).then((e=>{n(4,c=e)})).catch((e=>{console.log(e)}))};return[a,i,l,u,c,p,[],o,async()=>{f(),v()},function(e){a=e,n(0,a)},function(e){T[e?"unshift":"push"]((()=>{o=e,n(7,o)}))}]}return new class extends G{constructor(e){super(),q(this,e,_e,$e,s,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
