(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{Crj2:function(e,a,t){e.exports={search:"harmonia_-pages-archives-home-style_search",customUl:"harmonia_-pages-archives-home-style_customUl",containerBox:"harmonia_-pages-archives-home-style_containerBox",top:"harmonia_-pages-archives-home-style_top"}},hEHd:function(e,a,t){"use strict";t.r(a);t("+L6B");var n=t("2/Rp"),r=(t("DjyN"),t("NUBc")),c=(t("g9YV"),t("wCAj")),l=t("fWQN"),i=t("mtLc"),o=t("yKVA"),s=t("879j"),u=(t("14J3"),t("BMrR")),m=(t("jCWc"),t("kPKH")),h=(t("+BJd"),t("mr32")),p=(t("5NDa"),t("5rEg")),d=t("q1tI"),v=t.n(d),E=t("9kvl"),y=t("9XV7"),f=t("Crj2"),k=t.n(f),b=p["a"].Search,C=[{title:"Name",dataIndex:"name",key:"name"},{title:"Contact",dataIndex:"contact",key:"contact",render:function(e){return v.a.createElement(v.a.Fragment,null,e.map((function(e){return void 0!==e.key?v.a.createElement(u["a"],null,v.a.createElement(m["a"],{flex:"50%"},v.a.createElement(h["a"],{key:e.key},v.a.createElement("a",{onClick:function(){E["b"].push({pathname:"/contact/detail/".concat(e.key)})}},e.label.toUpperCase()))),v.a.createElement(m["a"],{flex:"50%"},v.a.createElement(h["a"],{key:e.key},v.a.createElement("a",{onClick:function(){E["b"].push({pathname:"/contact/detail/".concat(e.key)})}},e.label.toUpperCase())))):""})))}},{title:"Phone",dataIndex:"phone",key:"phone",render:function(e){return v.a.createElement(v.a.Fragment,null,e.map((function(e){return e.type&&e.number?v.a.createElement("div",null,v.a.createElement(u["a"],null,v.a.createElement(m["a"],{flex:"50%"},v.a.createElement(h["a"],{key:e.type},e.type.toUpperCase())),v.a.createElement(m["a"],{flex:"50%"},v.a.createElement(h["a"],{key:e.number},e.number.toUpperCase())))):""})))}},{title:"Email",dataIndex:"email",key:"email",render:function(e){return v.a.createElement(v.a.Fragment,null,e.map((function(e){return e.type&&e.url?v.a.createElement("div",null,v.a.createElement(u["a"],null,v.a.createElement(m["a"],{flex:"35%"},v.a.createElement(h["a"],{key:e.type},e.type.toUpperCase())),v.a.createElement(m["a"],{flex:"63%"},v.a.createElement(h["a"],{key:e.url},e.url.toUpperCase())))):""})))}},{title:"Action",key:"action",render:function(e){return v.a.createElement("ul",{className:k.a.customUl},v.a.createElement("li",null,v.a.createElement("a",{onClick:function(){E["b"].push({pathname:"/archives/update/".concat(e.id)})}},"Update")),v.a.createElement("li",null,v.a.createElement("a",{onClick:function(){E["b"].push({pathname:"/archives/detail/".concat(e.id)})}},"Detail")))}}],g=function(e){Object(o["a"])(t,e);var a=Object(s["a"])(t);function t(e){var n;return Object(l["a"])(this,t),n=a.call(this,e),n.onSearch=function(e){n.props.dispatch({type:"archives/searchArchivesByName",payload:{page:1,searchValue:e}})},n.state={},n}return Object(i["a"])(t,[{key:"render",value:function(){return v.a.createElement("div",{className:k.a.containerBox},v.a.createElement("div",{className:k.a.top},v.a.createElement(j,null),v.a.createElement(b,{className:k.a.search,placeholder:"input search text",enterButton:"Search",size:"large",onSearch:this.onSearch})),v.a.createElement(x,null))}}]),t}(v.a.Component),x=Object(E["a"])((function(e){var a=e.archives,t=e.loading;return{archives:a,loading:t.effects["archives/loadListArchives"]}}))((function(e){Object(y["c"])((function(){e.dispatch({type:"archives/loadListArchives"})}));var a=function(a){e.dispatch({type:"archives/loadListArchives",payload:{page:a,searchValue:e.archives.searchArchivesValue}})};return v.a.createElement("div",null,v.a.createElement(c["a"],{bordered:!0,loading:e.loading,pagination:!1,columns:C,rowKey:"id"}),v.a.createElement(r["a"],{onChange:a}))})),j=Object(E["a"])((function(e){var a=e.archives;return{archives:a}}))((function(){var e=function(){E["b"].push({pathname:"/archives/create"})};return v.a.createElement(n["a"],{htmlType:"button",onClick:e},"Create")}));a["default"]=Object(E["a"])((function(e){var a=e.archives;return{archives:a}}))(g)}}]);