(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"+BdI":function(e,a,t){e.exports={main:"harmonia_-pages-company-create-style_main",header:"harmonia_-pages-company-create-style_header",title:"harmonia_-pages-company-create-style_title",one:"harmonia_-pages-company-create-style_one",two:"harmonia_-pages-company-create-style_two",deletebutton:"harmonia_-pages-company-create-style_deletebutton",doubleInput:"harmonia_-pages-company-create-style_doubleInput",optionCreate:"harmonia_-pages-company-create-style_optionCreate",customRow:"harmonia_-pages-company-create-style_customRow",childrenRow:"harmonia_-pages-company-create-style_childrenRow"}},N0Ll:function(e,a,t){"use strict";t.r(a);t("T2oS");var n=t("W9HT"),l=(t("14J3"),t("BMrR")),c=t("wx14"),r=(t("jCWc"),t("kPKH")),m=(t("+L6B"),t("2/Rp")),o=(t("y8nQ"),t("Vl3Y")),s=(t("5NDa"),t("5rEg")),i=t("VTBJ"),p=t("1OyB"),u=t("vuIU"),d=t("Ji7U"),y=t("LK+K"),h=(t("OaEy"),t("2fM7")),E=t("q1tI"),f=t.n(E),g=t("9kvl"),b=t("sEfC"),C=t.n(b),v=t("xvlK"),w=t("wlus"),k=t("+BdI"),I=t.n(k),N=h["a"].Option,x={labelCol:{xs:{span:24},sm:{span:8}},wrappercol:{xs:{span:24},sm:{span:20}}},O={wrappercol:{xs:{span:24,offset:0},sm:{span:20,offset:4}}},R={labelCol:{span:8},wrappercol:{span:16}},_=function(e){return{required:"".concat(e," is required!")}},j=function(e){Object(d["a"])(t,e);var a=Object(y["a"])(t);function t(e){var n;return Object(p["a"])(this,t),n=a.call(this,e),n.onFinish=function(e){n.props.dispatch({type:"company/fullCreate",payload:Object(i["a"])({},e)})},n.fetchContact=function(e){n.props.dispatch({type:"company/handleSearchContactChange",payload:{value:n.props.company.searchValueContact,contactInfo:[]}}),n.props.dispatch({type:"company/searchContactByName",payload:{page:1,searchValue:e}})},n.createContact=function(){g["b"].push({pathname:"/contact/create"})},n.handleChange=function(e){n.props.dispatch({type:"company/handleSearchContactChange",payload:{value:e,contactInfo:[]}})},n.fetchContact=C()(n.fetchContact,1e3),n}return Object(u["a"])(t,[{key:"componentDidMount",value:function(){this.props.dispatch({type:"company/cleanData"}),this.props.dispatch({type:"tag/getTag"})}},{key:"render",value:function(){var e=this.props.company,a=e.searchValueContact,t=e.contactInfo,p=this.props.tag.tag;return f.a.createElement("div",{className:I.a.main},f.a.createElement("div",{className:I.a.header},f.a.createElement("h2",{className:I.a.title}," CREATE COMPANY")),f.a.createElement(o["a"],Object(c["a"])({},R,{name:"nest-messages",onFinish:this.onFinish,validateMessages:_}),f.a.createElement(o["a"].Item,{name:["company","name"],label:"Name",rules:[{required:!0}]},f.a.createElement(s["a"],null)),f.a.createElement(o["a"].Item,{name:["company","url"],label:"URL"},f.a.createElement(s["a"],null)),f.a.createElement(o["a"].Item,{name:["company","tag"],label:"Tag"},f.a.createElement(h["a"],{mode:"tags",style:{width:"100%"},labelInValue:!0,tokenSeparators:[","]},p.map((function(e){return f.a.createElement(N,{key:e.key},e.label)})))),f.a.createElement("div",O,f.a.createElement(o["a"].List,{name:["company","phone"]},(function(e,a){var t=a.add,n=a.remove;return f.a.createElement("div",null,f.a.createElement(o["a"].Item,{label:"Phone",className:0===e.length?"":I.a.customRow},f.a.createElement(m["a"],{type:"dashed",onClick:function(){return t()}},f.a.createElement(v["a"],null)," Add Phone")),e.map((function(e,a,t){return f.a.createElement(l["a"],{key:e.key},f.a.createElement(r["a"],{span:8}),f.a.createElement(r["a"],{span:16},f.a.createElement(l["a"],null,f.a.createElement(r["a"],{flex:"2"},f.a.createElement(o["a"].Item,Object(c["a"])({},e,{className:a+1===t.length?"":I.a.childrenRow,name:[e.name,"number"],fieldKey:[e.fieldKey,"number"],rules:[{required:!0}]}),f.a.createElement(s["a"],{placeholder:"Your Phone",pattern:"^[0-9]{10}$"}))),f.a.createElement(r["a"],{flex:"2"},f.a.createElement(o["a"].Item,Object(c["a"])({},e,{className:a+1===t.length?"":I.a.childrenRow,name:[e.name,"type"],fieldKey:[e.fieldKey,"type"],rules:[{required:!0}]}),f.a.createElement(h["a"],{placeholder:"Select Phone"},f.a.createElement(N,{value:"Primary"},"Primary"),f.a.createElement(N,{value:"Company"},"Company"),f.a.createElement(N,{value:"Personal"},"Personal")))),f.a.createElement(r["a"],{flex:"none"},f.a.createElement(w["a"],{className:"dynamic-delete-button",style:{margin:"8px 8px"},onClick:function(){n(e.name)}})))))})))}))),f.a.createElement("div",O,f.a.createElement(o["a"].List,{name:["company","email"]},(function(e,a){var t=a.add,n=a.remove;return f.a.createElement("div",null,f.a.createElement(o["a"].Item,{label:"Email",className:0===e.length?"":I.a.customRow},f.a.createElement(m["a"],{type:"dashed",onClick:function(){t()}},f.a.createElement(v["a"],null)," Add Emails")),e.map((function(e,a,t){return f.a.createElement(l["a"],{key:[e.key,"@gmail.com","@geekup.vn"]},f.a.createElement(r["a"],{span:8}),f.a.createElement(r["a"],{span:16},f.a.createElement(l["a"],null,f.a.createElement(r["a"],{flex:"2"},f.a.createElement(o["a"].Item,Object(c["a"])({},e,{className:a+1===t.length?"":I.a.childrenRow,name:[e.name,"url"],fieldKey:[e.fieldKey,"url"],placeholder:"Your Email",rules:[{type:"email",message:"The input is wrong"},{required:!0,messages:"Please input your email"}]}),f.a.createElement(s["a"],null))),f.a.createElement(r["a"],{flex:"2"},f.a.createElement(o["a"].Item,Object(c["a"])({},e,{className:a+1===t.length?"":I.a.childrenRow,name:[e.name,"type"],fieldKey:[e.fieldKey,"type"],rules:[{required:!0}]}),f.a.createElement(h["a"],{placeholder:"Select Email"},f.a.createElement(N,{value:"Primary"},"Primary"),f.a.createElement(N,{value:"Company"},"Company"),f.a.createElement(N,{value:"Personal"},"Personal")))),f.a.createElement(r["a"],{flex:"none"},f.a.createElement(w["a"],{className:"dynamic-delete-button",style:{margin:"8px 8px"},onClick:function(){n(e.name)}})))))})))}))),f.a.createElement("div",O,f.a.createElement(o["a"].List,{name:["company","website"]},(function(e,a){var t=a.add,n=a.remove;return f.a.createElement("div",null,f.a.createElement(o["a"].Item,{label:"Website",className:0===e.length?"":I.a.customRow},f.a.createElement(m["a"],{type:"dashed",onClick:function(){t()}},f.a.createElement(v["a"],null)," Add Website")),e.map((function(e,a,t){return f.a.createElement(l["a"],{key:[e.key,".com",".vn"]},f.a.createElement(r["a"],{span:8}),f.a.createElement(r["a"],{span:16},f.a.createElement(l["a"],null,f.a.createElement(r["a"],{flex:"2"},f.a.createElement(o["a"].Item,Object(c["a"])({},e,{className:a+1===t.length?"":I.a.childrenRow,name:[e.name,"url"],fieldKey:[e.fieldKey,"url"],rules:[{required:!0}]}),f.a.createElement(s["a"],{placeholder:"URL Website"}))),f.a.createElement(r["a"],{flex:"2"},f.a.createElement(o["a"].Item,Object(c["a"])({},e,{className:a+1===t.length?"":I.a.childrenRow,name:[e.name,"type"],fieldKey:[e.fieldKey,"type"],rules:[{required:!0}]}),f.a.createElement(h["a"],{placeholder:"Select website"},f.a.createElement(N,{value:"Facebook"},"Facebook"),f.a.createElement(N,{value:"Skype"},"Skype"),f.a.createElement(N,{value:"Zalo"},"Zalo"),f.a.createElement(N,{value:"Youtube"},"Youtube"),f.a.createElement(N,{value:"Linkedin"},"Linkedin"),f.a.createElement(N,{value:"Instagram"},"Instagram")))),f.a.createElement(r["a"],{flex:"none"},f.a.createElement(w["a"],{className:"dynamic-delete-button",style:{margin:"8px 8px"},onClick:function(){n(e.name)}})))))})))}))),f.a.createElement("div",O,f.a.createElement(o["a"].List,{name:["company","address"]},(function(e,a){var t=a.add,n=a.remove;return f.a.createElement("div",null,f.a.createElement(o["a"].Item,{label:"Address",className:0===e.length?"":I.a.customRow},f.a.createElement(m["a"],{type:"dashed",onClick:function(){t()}},f.a.createElement(v["a"],null)," Add Address")),e.map((function(a,t,l){return f.a.createElement(o["a"].Item,Object(c["a"])({},x,{label:"Address ".concat(t+1),required:!1,key:a.key}),f.a.createElement(o["a"].Item,Object(c["a"])({},a,{className:t+1===l.length?"":I.a.childrenRow,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"Please input passenger's name or delete this field."}],noStyle:!0}),f.a.createElement(s["a"],{placeholder:"Address",style:{width:"90%"}})),e.length>1?f.a.createElement(w["a"],{className:"dynamic-delete-button",style:{margin:"0 8px"},onClick:function(){n(a.name)}}):null)})))}))),f.a.createElement(o["a"].Item,{name:["company","contact"],label:"Contact"},f.a.createElement(h["a"],{mode:"multiple",labelInValue:!0,value:a,placeholder:"Select contact",notFoundContent:this.props.fetchingContact?f.a.createElement(n["a"],{size:"small"}):f.a.createElement("p",null,f.a.createElement(m["a"],{type:"text",onClick:this.createContact},"Create contact")),filterOption:!1,onSearch:this.fetchContact,onChange:this.handleChange},t.map((function(e){return f.a.createElement(N,{key:e.key},e.label)})))),f.a.createElement(o["a"].Item,{wrapperCol:Object(i["a"])({},R.wrappercol,{offset:8})},f.a.createElement(m["a"],{type:"primary",htmlType:"submit",loading:this.props.submitting},"Submit"))))}}]),t}(f.a.Component);a["default"]=Object(g["a"])((function(e){var a=e.company,t=e.tag,n=e.loading;return{company:a,tag:t,submitting:n.effects["company/fullCreate"],fetchingContact:n.effects["company/searchContactByName"]}}))(j)}}]);