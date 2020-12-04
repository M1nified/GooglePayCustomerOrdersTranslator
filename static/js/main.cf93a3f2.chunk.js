(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{51:function(e,t,n){},52:function(e,t,n){},69:function(e,t){},71:function(e,t){},81:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(2),o=n.n(a),c=n(41),i=n.n(c),u=(n(51),n(8)),s=n.p+"static/media/logo.103b5fa1.svg",l=(n(52),function(e){var t=e.apiKey,n=e.onSetApiKey,o=Object(a.useState)(t),c=Object(u.a)(o,2),i=c[0],s=c[1];return Object(r.jsxs)("form",{onSubmit:function(e){e.preventDefault(),n(i)},children:[Object(r.jsx)("input",{type:"text",placeholder:"API KEY",name:"apiKey",value:i||"",onChange:function(e){return s(e.target.value)}}),Object(r.jsx)("input",{type:"submit"})]})});l.defaultProps={apiKey:null,onSetApiKey:function(){}};var p=n(1),d=n.n(p),f=n(3),v=n(25),h=n.n(v),b=n(42),m=n.n(b),j=n(43),x=n(44),g=(n(45),function(e){var t=e.withHeader,n=e.colMap;return function(e,r){return!(!t||0!==r)||"Charged"===e[n.idx("Financial Status")]}}),O=function(){var e=Object(f.a)(d.a.mark((function e(t,n){var r,a,o,c,i,u,s,l,p,f,v;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n.isHeader,a=n.colMap,o="PLN","yyyy-MM-dd HH:mm",c=/([\d,.]+)/,i=["Order Creation Date","Currency of Transaction\t","Order Amount","Amount Charged","Financial Status","Total Tax","Buyer State","Buyer Postal Code","Buyer Country","Item 1 Name","Item 1 Price","Item 1 Quantity"].map((function(e){return a.idx(e)})),u=t.filter((function(e,t){return i.includes(t)})),!r){e.next=13;break}u.push("Merchant Currency"),u.push("Currency Conversion"),u.push("Amount (Merchant Currency)"),e.next=24;break;case 13:return s=w(t[a.idx("Order Creation Date")]),u[0]=s.toISOString(),l=t[a.idx("Currency of Transaction")],p=Number.parseFloat(t[a.idx("Amount Charged")].match(c).pop()),u.push(o),e.next=20,C(l,o,s);case 20:f=e.sent,v=f*p,u.push(f),u.push(v);case 24:return e.abrupt("return",u);case 25:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),y=function(){function e(){Object(j.a)(this,e),this.header=[]}return Object(x.a)(e,[{key:"idx",value:function(e){return this.header.indexOf(e)}}],[{key:"mapColumns",value:function(t){var n=new e;return n.header=t,n}}]),e}(),w=function(e){var t=Date.parse(e);return new Date(t)},C=function(){var e=Object(f.a)(d.a.mark((function e(t,n,r){var a,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="http://data.fixer.io/api/".concat(r.toISOString().slice(0,10),"?access_key=").concat(window.localStorage.getItem("API_KEY"),"&symbols=").concat(t,",").concat(n),console.log(a),e.next=4,fetch(a);case 4:return e.next=6,e.sent.json();case 6:return o=e.sent,e.abrupt("return",o.rates[n]/o.rates[t]);case 8:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),S=function(){var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1],c=function(){var e=Object(f.a)(d.a.mark((function e(t){var n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(t),t.preventDefault(),t.stopPropagation(),console.log(t.dataTransfer.files),t.dataTransfer.files.length){e.next=7;break}return console.error("NO FILES DROPPED"),e.abrupt("return");case 7:return n=function(e){for(var t=[],n=0;n<e.length;n++)t.push(e[n].getAsFile());return t}(t.dataTransfer.items),console.log(n),e.next=11,Promise.all(n.map(function(){var e=Object(f.a)(d.a.mark((function e(t){var n,r,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,null===t||void 0===t?void 0:t.text();case 2:return n=e.sent,console.log(typeof h.a),e.next=6,new Promise((function(e,t){"string"===typeof n?h()(n,{},(function(n,r){if(n)return console.error(n),void t();e(r)})):t()}));case 6:return r=e.sent,a=Math.random().toString(),e.abrupt("return",{id:a,name:null===t||void 0===t?void 0:t.name,size:null===t||void 0===t?void 0:t.size,type:null===t||void 0===t?void 0:t.type,lastModified:null===t||void 0===t?void 0:t.lastModified,text:n,parsed:r});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 11:r=e.sent,console.log("READY FILES",r),o(r);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return function(t){t.preventDefault(),console.log("PREVENT",e,t)}},s=function(e){return function(){var t=Object(f.a)(d.a.mark((function t(r){var a,c,i,u;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r.preventDefault(),console.log("CONVERT",e),e.parsed&&0!==e.parsed.length){t.next=4;break}return t.abrupt("return");case 4:return a=y.mapColumns(e.parsed[0]),c=e.parsed.filter(g({withHeader:!0,colMap:a})),console.log(c),t.next=9,Promise.all(c.map((function(e,t){return O(e,{isHeader:0===t,colMap:a})})));case 9:i=t.sent,console.log(i),e.converted=i,u=n.map((function(t){return t.id===e.id?e:t})),o(u);case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},l=function(e){return function(){var t=Object(f.a)(d.a.mark((function t(n){var r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),e.converted){t.next=4;break}return console.error("File needs to be converted first"),t.abrupt("return");case 4:return t.next=6,new Promise((function(t,n){e.converted?m()(e.converted,(function(e,r){if(e)return console.error(e),void n();t(r)})):n()}));case 6:r=t.sent,console.log(r),p(e.name||"converted.csv",r);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},p=function(e,t){var n=document.createElement("a");n.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),n.setAttribute("download",e),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)};return Object(r.jsxs)("div",{onDrop:c,onDropCapture:i(1),onDragEnter:function(e){e.preventDefault(),e.stopPropagation(),console.log("ENTER",e)},onDragOver:i(2),children:[Object(r.jsx)("table",{children:Object(r.jsx)("tbody",{children:n.map((function(e,t){return Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{children:e.name}),Object(r.jsx)("td",{onClick:s(e),children:"Convert"}),Object(r.jsx)("td",{onClick:l(e),children:"Save"})]},t)}))})}),Object(r.jsx)("p",{children:"Drop files to convert."})]})};var k=function(){var e="API_KEY",t=Object(a.useState)(window.localStorage.getItem(e)),n=Object(u.a)(t,2),o=n[0],c=n[1];return Object(r.jsxs)("div",{className:"App",children:[o?"":Object(r.jsx)(l,{apiKey:o,onSetApiKey:function(t){t?window.localStorage.setItem(e,t):window.localStorage.removeItem(e),c(t)}}),Object(r.jsx)(S,{}),Object(r.jsxs)("header",{className:"App-header",children:[Object(r.jsx)("img",{src:s,className:"App-logo",alt:"logo"}),Object(r.jsxs)("p",{children:["Edit ",Object(r.jsx)("code",{children:"src/App.tsx"})," and save to reload."]}),Object(r.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})]})},A=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,82)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),o(e),c(e)}))};i.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(k,{})}),document.getElementById("root")),A()}},[[81,1,2]]]);
//# sourceMappingURL=main.cf93a3f2.chunk.js.map