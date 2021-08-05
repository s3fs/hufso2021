(this["webpackJsonppart2-notes"]=this["webpackJsonppart2-notes"]||[]).push([[0],{39:function(t,e,n){},40:function(t,e,n){"use strict";n.r(e);var c=n(0),r=n(15),o=n.n(r),a=n(6),i=n(3),u=n(2),s=function(t){var e=t.note,n=t.toggleImportance,r=e.important?"make not important":"make important";return Object(c.jsxs)("li",{className:"note",children:[e.content,Object(c.jsx)("button",{onClick:n,children:r})]})},l=function(t){var e=t.message;return null===e?null:Object(c.jsx)("div",{className:"error",children:e})},j=function(){return Object(c.jsxs)("div",{style:{color:"lightgray",fontSize:16},children:[Object(c.jsx)("br",{}),Object(c.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2021"})]})},b=n(4),f=n.n(b),d="http://localhost:3001/api/notes",p={getAll:function(){return f.a.get(d).then((function(t){return t.data}))},create:function(t){return f.a.post(d,t).then((function(t){return t.data}))},update:function(t,e){return f.a.put("".concat(d,"/").concat(t),e).then((function(t){return t.data}))}},m=function(){var t=Object(u.useState)([]),e=Object(i.a)(t,2),n=e[0],r=e[1],o=Object(u.useState)(""),b=Object(i.a)(o,2),f=b[0],d=b[1],m=Object(u.useState)(!1),O=Object(i.a)(m,2),h=O[0],v=O[1],x=Object(u.useState)(null),g=Object(i.a)(x,2),S=g[0],k=g[1];Object(u.useEffect)((function(){p.getAll().then((function(t){r(t)}))}),[]);var y=h?n:n.filter((function(t){return t.important}));return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"Notes"}),Object(c.jsx)(l,{message:S}),Object(c.jsx)("div",{children:Object(c.jsxs)("button",{onClick:function(){return v(!h)},children:["show ",h?"important":"all"]})}),Object(c.jsx)("ul",{children:y.map((function(t){return Object(c.jsx)(s,{note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),c=Object(a.a)(Object(a.a)({},e),{},{important:!e.important});p.update(t,c).then((function(e){r(n.map((function(n){return n.id!==t?n:e})))})).catch((function(t){k("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){k(null)}),5e3)}))}(t.id)}},t.id)}))}),Object(c.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e={content:f,date:(new Date).toISOString(),important:Math.random()>.5};p.create(e).then((function(t){r(n.concat(t)),d("")}))},children:[Object(c.jsx)("input",{value:f,onChange:function(t){console.log(t.target.value),d(t.target.value)}}),Object(c.jsx)("button",{type:"submit",children:"save"})]}),Object(c.jsx)(j,{})]})};n(39);o.a.render(Object(c.jsx)(m,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.fb2c7e82.chunk.js.map