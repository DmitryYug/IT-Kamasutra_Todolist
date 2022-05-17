(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{83:function(e,t,n){e.exports=n(95)},88:function(e,t,n){},89:function(e,t,n){},95:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(28),l=n.n(c),r=(n(88),n(14)),o=n(22),u=n(3),d=n(13),m=(n(89),n(146)),s=n(154),f=n(73),b=n.n(f),E=function(e){var t=e.addItem,n=Object(a.useState)(""),c=Object(d.a)(n,2),l=c[0],r=c[1],o=Object(a.useState)(!1),u=Object(d.a)(o,2),f=u[0],E=u[1],v=function(e){E(!1),r(e.currentTarget.value)},p=function(e){if("Enter"===e.key){if(""===l.trim())return void E(!0);E(!1),t(l),r("")}},j=f?i.a.createElement(m.a,{error:!0,id:"outlined-error",label:"Empty input",defaultValue:"Hello World",value:l,onChange:v,onKeyPress:p,size:"small"}):i.a.createElement(m.a,{id:"outlined-helperText",label:"type...",value:l,onChange:v,onKeyPress:p,size:"small"});return i.a.createElement("div",{style:{margin:"10px 0 10px 0"}},j,i.a.createElement(s.a,{onClick:function(){""!==l.trim()?(E(!1),t(l),r("")):E(!0)},variant:"contained",style:{maxWidth:"40px",maxHeight:"40px",minWidth:"40px",minHeight:"40px"}},i.a.createElement(b.a,{fontSize:"small"})),i.a.createElement("div",null,f))},v=function(e){var t=e.title,n=e.onChange,c=Object(a.useState)(!1),l=Object(d.a)(c,2),r=l[0],o=l[1],u=Object(a.useState)(t),m=Object(d.a)(u,2),s=m[0],f=m[1],b=function(){o(!1),f(s),n(s)},E=r?i.a.createElement("input",{type:"text",value:s,onChange:function(e){f(e.currentTarget.value)},autoFocus:!0}):i.a.createElement("span",null," ",s," ");return i.a.createElement("span",{onDoubleClick:function(){o(!0)},onBlur:b,onKeyPress:function(e){"Enter"===e.key&&b()}},E)},p=n(151),j=n(148),O=n(155),h=n(156),g=n(63),k=n.n(g),x=function(e){var t=e.tdlId,n=e.tdlTitle,a=e.tasks,c=e.filter,l=e.removeTask,r=e.onFilter,o=e.addTasks,u=e.checkBoxChange,d=e.removeTDL,m=e.spanChange,f=e.tdlTitleSpanChange,b=function(e){r(t,e)},g=a.map((function(e){return i.a.createElement(p.a,null,i.a.createElement("div",{key:e.id},i.a.createElement(j.a,{checked:e.isDone,onChange:function(n){u(t,e.id,n.currentTarget.checked)},inputProps:{"aria-label":"controlled"}}),i.a.createElement(v,{onChange:function(n){!function(n){m(t,e.id,n)}(n)},title:e.title}),i.a.createElement(O.a,{onClick:function(){return function(e,t){l(e,t)}(t,e.id)}},i.a.createElement(k.a,{fontSize:"small"}))))}));return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(v,{onChange:function(e){!function(e){f(t,e)}(e)},title:n}),i.a.createElement(O.a,{onClick:function(){d(t)}},i.a.createElement(k.a,{fontSize:"small"}))),i.a.createElement(E,{addItem:function(e){o(t,e)}}),i.a.createElement("div",null,g),i.a.createElement(h.a,{"aria-label":"medium secondary button group"},i.a.createElement(s.a,{variant:"all"===c?"contained":"outlined",onClick:function(){return b("all")}},"all"),i.a.createElement(s.a,{variant:"active"===c?"contained":"outlined",onClick:function(){return b("active")}},"active"),i.a.createElement(s.a,{variant:"completed"===c?"contained":"outlined",onClick:function(){return b("completed")}},"completed")))},C=n(149),y=n(153),D=n(158),T=n(157),S=n(159),w=n(160),B=n(74),I=n.n(B);function W(){return a.createElement(T.a,{sx:{flexGrow:1}},a.createElement(D.a,{position:"static"},a.createElement(S.a,null,a.createElement(O.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2}},a.createElement(I.a,null)),a.createElement(w.a,{variant:"h6",component:"div",sx:{flexGrow:1}},"Todolists"),a.createElement(s.a,{color:"inherit"},"Login"))))}var z=n(152),P=n(161);var F=function(){var e,t=Object(C.a)(),n=Object(C.a)(),c=Object(a.useState)([{id:t,title:"What to learn",filter:"all"},{id:n,title:"What to watch",filter:"completed"}]),l=Object(d.a)(c,2),m=l[0],s=l[1],f=Object(a.useState)((e={},Object(u.a)(e,t,[{id:Object(C.a)(),title:"CSS",isDone:!1},{id:Object(C.a)(),title:"JS",isDone:!0},{id:Object(C.a)(),title:"React",isDone:!1},{id:Object(C.a)(),title:"Redux",isDone:!1}]),Object(u.a)(e,n,[{id:Object(C.a)(),title:"Batman",isDone:!1},{id:Object(C.a)(),title:"NBA",isDone:!0},{id:Object(C.a)(),title:"It-kamasutra",isDone:!1}]),e)),b=Object(d.a)(f,2),v=b[0],p=b[1];function j(e,t){var n={id:Object(C.a)(),title:t,isDone:!1};p(Object(o.a)(Object(o.a)({},v),{},Object(u.a)({},e,[n].concat(Object(r.a)(v[e])))))}function O(e,t){p(Object(o.a)(Object(o.a)({},v),{},Object(u.a)({},e,v[e].filter((function(e){return e.id!==t})))))}function h(e){s(m.filter((function(t){return t.id!==e})))}function g(e,t){s(m.map((function(n){return n.id===e?Object(o.a)(Object(o.a)({},n),{},{filter:t}):n})))}function k(e,t,n){var a=v[e].find((function(e){return t===e.id}));a&&(a.isDone=n,p(Object(o.a)({},v)))}function D(e,t,n){var a=v[e].find((function(e){return e.id===t}));a&&(a.title=n,p(Object(o.a)({},v)))}function T(e,t){var n=m.find((function(t){return t.id===e}));n&&(n.title=t),s(Object(r.a)(m))}var S=m.map((function(e){var t=v[e.id];return"completed"===e.filter&&(t=t.filter((function(e){return e.isDone}))),"active"===e.filter&&(t=t.filter((function(e){return!e.isDone}))),i.a.createElement(z.a,{item:!0},i.a.createElement(y.a,{style:{padding:"10px"},elevation:10},i.a.createElement(x,{key:e.id,tdlId:e.id,tdlTitle:e.title,tasks:t,filter:e.filter,removeTask:O,addTasks:j,onFilter:g,checkBoxChange:k,spanChange:D,tdlTitleSpanChange:T,removeTDL:h})))}));return i.a.createElement("div",{className:"App"},i.a.createElement(W,null),i.a.createElement(P.a,{fixed:!0},i.a.createElement(z.a,{container:!0},i.a.createElement(E,{addItem:function(e){var t=Object(C.a)();s([{id:t,title:e,filter:"all"}].concat(Object(r.a)(m))),p(Object(o.a)(Object(o.a)({},v),{},Object(u.a)({},t,[])))}})),i.a.createElement(z.a,{container:!0,spacing:3},S)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[83,1,2]]]);
//# sourceMappingURL=main.7cefb93c.chunk.js.map