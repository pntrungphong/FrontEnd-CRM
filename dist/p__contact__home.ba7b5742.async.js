(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{ZIUg:function(e,t,a){e.exports={search:"harmonia_-pages-contact-home-style_search",customUl:"harmonia_-pages-contact-home-style_customUl",containerBox:"harmonia_-pages-contact-home-style_containerBox",top:"harmonia_-pages-contact-home-style_top"}},jqu9:function(e,t,a){"use strict";a.r(t);a("+L6B");var n=a("2/Rp"),c=(a("DjyN"),a("NUBc")),o=(a("g9YV"),a("wCAj")),r=a("1OyB"),l=a("vuIU"),i=a("Ji7U"),u=a("LK+K"),m=(a("14J3"),a("BMrR")),p=(a("+BJd"),a("mr32")),s=(a("5NDa"),a("5rEg")),d=a("q1tI"),h=a.n(d),y=a("9kvl"),f=a("9XV7"),E=a("ZIUg"),k=a.n(E),b=s["a"].Search,g=[{title:"Name",dataIndex:"name",key:"name"},{title:"Title",dataIndex:"title",key:"title"},{title:"Company",dataIndex:"company",key:"company",render:function(e){return h.a.createElement(h.a.Fragment,null,e.map((function(e){return void 0!==e.key?h.a.createElement(p["a"],{key:e.key},h.a.createElement("a",{onClick:function(){y["b"].push({pathname:"/company/detail/".concat(e.key)})}},e.label.toUpperCase())):""})))}},{title:"Phone",dataIndex:"phone",key:"phone",render:function(e){return h.a.createElement(h.a.Fragment,null,e.map((function(e){return e.type&&e.number?h.a.createElement("div",null,h.a.createElement(m["a"],null,h.a.createElement(p["a"],{key:e.type},e.type.toUpperCase()),h.a.createElement(p["a"],{key:e.number},e.number.toUpperCase()))):""})))}},{title:"Email",dataIndex:"email",key:"email",render:function(e){return h.a.createElement(h.a.Fragment,null,e.map((function(e){return e.type&&e.url?h.a.createElement("div",null,h.a.createElement(m["a"],null,h.a.createElement(p["a"],{key:e.type},e.type.toUpperCase()),h.a.createElement(p["a"],{key:e.url},e.url.toUpperCase()))):""})))}},{title:"Action",key:"action",render:function(e){return h.a.createElement("ul",{className:k.a.customUl},h.a.createElement("li",null,h.a.createElement("a",{onClick:function(){y["b"].push({pathname:"/contact/update/".concat(e.id)})}},"Update")),h.a.createElement("li",null,h.a.createElement("a",{onClick:function(){y["b"].push({pathname:"/contact/detail/".concat(e.id)})}},"Detail")))}}],C=function(e){Object(i["a"])(a,e);var t=Object(u["a"])(a);function a(e){var n;return Object(r["a"])(this,a),n=t.call(this,e),n.onSearch=function(e){n.props.dispatch({type:"contact/searchContactByName",payload:{page:1,searchValue:e}})},n.state={},n}return Object(l["a"])(a,[{key:"render",value:function(){return h.a.createElement("div",{className:k.a.containerBox},h.a.createElement("div",{className:k.a.top},h.a.createElement(U,null),h.a.createElement(b,{className:k.a.search,placeholder:"Search contact",enterButton:"Search",size:"large",onSearch:this.onSearch})),h.a.createElement(v,null))}}]),a}(h.a.Component),v=Object(y["a"])((function(e){var t=e.contact,a=e.loading;return{contact:t,loading:a.effects["contact/loadListContact"]}}))((function(e){Object(f["c"])((function(){e.dispatch({type:"contact/loadListContact"})})),Object(f["d"])((function(){e.dispatch({type:"contact/cleanData"})}));var t=function(t){e.dispatch({type:"contact/loadListContact",payload:{page:t,searchValue:e.contact.searchContactValue}})};return h.a.createElement("div",null,h.a.createElement(o["a"],{bordered:!0,loading:e.loading,pagination:!1,columns:g,rowKey:"id",dataSource:e.contact.contactInfo}),h.a.createElement(c["a"],{total:e.contact.itemCount,onChange:t}))})),U=Object(y["a"])((function(e){var t=e.contact;return{contact:t}}))((function(){var e=function(){y["b"].push({pathname:"/contact/create"})};return h.a.createElement(n["a"],{htmlType:"button",onClick:e},"Create")}));t["default"]=Object(y["a"])((function(e){var t=e.contact;return{contact:t}}))(C)}}]);