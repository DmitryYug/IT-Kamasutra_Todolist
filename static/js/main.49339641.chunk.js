(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{83:function(e,t,n){e.exports=n(95)},88:function(e,t,n){},89:function(e,t,n){},95:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(28),r=n.n(c),l=(n(88),n(14)),o=n(22),u=n(3),d=n(13),m=(n(89),n(146)),s=n(153),f=n(73),b=n.n(f),E=function(e){var t=e.addItem,n=Object(a.useState)(""),c=Object(d.a)(n,2),r=c[0],l=c[1],o=Object(a.useState)(!1),u=Object(d.a)(o,2),f=u[0],E=u[1],v=function(e){E(!1),l(e.currentTarget.value)},p=function(e){if("Enter"===e.key){if(""===r.trim())return void E(!0);E(!1),t(r),l("")}},j=f?i.a.createElement(m.a,{error:!0,id:"outlined-error",label:"Empty input",defaultValue:"Hello World",value:r,onChange:v,onKeyPress:p}):i.a.createElement(m.a,{id:"outlined-helperText",label:"type...",value:r,onChange:v,onKeyPress:p});return i.a.createElement("div",{style:{margin:"10px 0 10px 0"}},j,i.a.createElement(s.a,{onClick:function(){""!==r.trim()?(E(!1),t(r),l("")):E(!0)},variant:"contained",style:{maxWidth:"26px",maxHeight:"26px",minWidth:"26px",minHeight:"26px"}},i.a.createElement(b.a,{fontSize:"small"})),i.a.createElement("div",null,f))},v=function(e){var t=e.title,n=e.onChange,c=Object(a.useState)(!1),r=Object(d.a)(c,2),l=r[0],o=r[1],u=Object(a.useState)(t),m=Object(d.a)(u,2),s=m[0],f=m[1],b=function(){o(!1),f(s),n(s)},E=l?i.a.createElement("input",{type:"text",value:s,onChange:function(e){f(e.currentTarget.value)},autoFocus:!0}):i.a.createElement("span",null," ",s," ");return i.a.createElement("span",{onDoubleClick:function(){o(!0)},onBlur:b,onKeyPress:function(e){"Enter"===e.key&&b()}},E)},p=n(148),j=n(154),O=n(155),h=n(63),g=n.n(h),k=function(e){var t=e.tdlId,n=e.tdlTitle,a=e.tasks,c=e.filter,r=e.removeTask,l=e.onFilter,o=e.addTasks,u=e.checkBoxChange,d=e.removeTDL,m=e.spanChange,f=e.tdlTitleSpanChange,b=function(e){l(t,e)},h=a.map((function(e){return i.a.createElement("div",{key:e.id},i.a.createElement(p.a,{checked:e.isDone,onChange:function(n){u(t,e.id,n.currentTarget.checked)},inputProps:{"aria-label":"controlled"}}),i.a.createElement(v,{onChange:function(n){!function(n){m(t,e.id,n)}(n)},title:e.title}),i.a.createElement(j.a,{onClick:function(){return function(e,t){r(e,t)}(t,e.id)}},i.a.createElement(g.a,{fontSize:"small"})))}));return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(v,{onChange:function(e){!function(e){f(t,e)}(e)},title:n}),i.a.createElement(j.a,{onClick:function(){d(t)}},i.a.createElement(g.a,{fontSize:"small"}))),i.a.createElement(E,{addItem:function(e){o(t,e)}}),i.a.createElement("div",null,h),i.a.createElement(O.a,{"aria-label":"medium secondary button group"},i.a.createElement(s.a,{variant:"all"===c?"contained":"outlined",onClick:function(){return b("all")}},"all"),i.a.createElement(s.a,{variant:"active"===c?"contained":"outlined",onClick:function(){return b("active")}},"active"),i.a.createElement(s.a,{variant:"completed"===c?"contained":"outlined",onClick:function(){return b("completed")}},"completed")))},x=n(149),C=n(152),y=n(157),D=n(156),T=n(158),S=n(159),w=n(74),B=n.n(w);function I(){return a.createElement(D.a,{sx:{flexGrow:1}},a.createElement(y.a,{position:"static"},a.createElement(T.a,null,a.createElement(j.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2}},a.createElement(B.a,null)),a.createElement(S.a,{variant:"h6",component:"div",sx:{flexGrow:1}},"Todolists"),a.createElement(s.a,{color:"inherit"},"Login"))))}var W=n(151),z=n(160);var P=function(){var e,t=Object(x.a)(),n=Object(x.a)(),c=Object(a.useState)([{id:t,title:"What to learn",filter:"all"},{id:n,title:"What to watch",filter:"completed"}]),r=Object(d.a)(c,2),m=r[0],s=r[1],f=Object(a.useState)((e={},Object(u.a)(e,t,[{id:Object(x.a)(),title:"CSS",isDone:!1},{id:Object(x.a)(),title:"JS",isDone:!0},{id:Object(x.a)(),title:"React",isDone:!1},{id:Object(x.a)(),title:"Redux",isDone:!1}]),Object(u.a)(e,n,[{id:Object(x.a)(),title:"Batman",isDone:!1},{id:Object(x.a)(),title:"NBA",isDone:!0},{id:Object(x.a)(),title:"It-kamasutra",isDone:!1}]),e)),b=Object(d.a)(f,2),v=b[0],p=b[1];function j(e,t){var n={id:Object(x.a)(),title:t,isDone:!1};p(Object(o.a)(Object(o.a)({},v),{},Object(u.a)({},e,[n].concat(Object(l.a)(v[e])))))}function O(e,t){p(Object(o.a)(Object(o.a)({},v),{},Object(u.a)({},e,v[e].filter((function(e){return e.id!==t})))))}function h(e){s(m.filter((function(t){return t.id!==e})))}function g(e,t){s(m.map((function(n){return n.id===e?Object(o.a)(Object(o.a)({},n),{},{filter:t}):n})))}function y(e,t,n){var a=v[e].find((function(e){return t===e.id}));a&&(a.isDone=n,p(Object(o.a)({},v)))}function D(e,t,n){var a=v[e].find((function(e){return e.id===t}));a&&(a.title=n,p(Object(o.a)({},v)))}function T(e,t){var n=m.find((function(t){return t.id===e}));n&&(n.title=t),s(Object(l.a)(m))}console.log(v);var S=m.map((function(e){var t=v[e.id];return"completed"===e.filter&&(t=t.filter((function(e){return e.isDone}))),"active"===e.filter&&(t=t.filter((function(e){return!e.isDone}))),i.a.createElement(W.a,{item:!0},i.a.createElement(C.a,{style:{padding:"10px"},elevation:10},i.a.createElement(k,{key:e.id,tdlId:e.id,tdlTitle:e.title,tasks:t,filter:e.filter,removeTask:O,addTasks:j,onFilter:g,checkBoxChange:y,spanChange:D,tdlTitleSpanChange:T,removeTDL:h})))}));return i.a.createElement("div",{className:"App"},i.a.createElement(I,null),i.a.createElement(z.a,{fixed:!0},i.a.createElement(W.a,{container:!0},i.a.createElement(E,{addItem:function(e){var t=Object(x.a)();s([{id:t,title:e,filter:"all"}].concat(Object(l.a)(m))),p(Object(o.a)(Object(o.a)({},v),{},Object(u.a)({},t,[])))}})),i.a.createElement(W.a,{container:!0,spacing:3},S)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[83,1,2]]]);
//# sourceMappingURL=main.49339641.chunk.js.map