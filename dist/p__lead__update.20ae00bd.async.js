(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[17],{"0/TA":function(e,a,t){"use strict";t.r(a);var l=t("wx14"),n=(t("DZo9"),t("8z0m")),c=(t("+L6B"),t("2/Rp")),r=(t("T2oS"),t("W9HT")),o=(t("miYZ"),t("tsqr")),i=(t("y8nQ"),t("Vl3Y")),d=t("ODXe"),s=t("VTBJ"),m=(t("5NDa"),t("5rEg")),p=(t("OaEy"),t("2fM7")),u=t("q1tI"),h=t.n(u),y=t("9kvl"),f=t("sEfC"),C=t.n(f),E=t("9XV7"),g=t("34ay"),b=t("Dn2Q"),v=t.n(b),k=p["a"].Option,S=m["a"].TextArea,w={labelCol:{span:8},wrappercol:{span:16}},I=function(e){return{required:"".concat(e," is required!")}},O=Object(y["a"])((function(e){var a=e.lead,t=e.tag,l=e.loading;return{lead:a,tag:t,submitting:l.effects["lead/update"],querying:l.effects["lead/loading"],fetchingCompany:l.effects["lead/searchCompanyByName"],fetchingContact:l.effects["lead/searchContactByName"]}}))((function(e){Object(E["c"])((function(){e.dispatch({type:"lead/loading",payload:{id:e.match.params.id}})})),Object(E["d"])((function(){e.dispatch({type:"tag/getTag"}),e.dispatch({type:"lead/cleanData"})}));var a=function(a){console.table(e.lead.listFile),e.dispatch({type:"lead/update",payload:Object(s["a"])({},a,{listFile:e.lead.listFile})})},t=i["a"].useForm(),u=Object(d["a"])(t,1),y=u[0],f=function(a){e.dispatch({type:"lead/handleSearchChange",payload:{value:e.lead.searchValue,listCompany:[]}}),e.dispatch({type:"lead/searchCompanyByName",payload:{value:a}})},b=function(a){e.dispatch({type:"lead/handleSearchContactChange",payload:{value:e.lead.searchContactValue,listContact:[]}}),e.dispatch({type:"lead/searchContactByName",payload:{value:a}})},O={name:"file",action:"http://api-harmonia.geekup.io/file",headers:{Authorization:"Bearer ".concat(Object(g["b"])())},props:e,onChange:function(e){"done"===e.file.status?(o["a"].success("".concat(e.file.name," file uploaded successfully")),console.table(this.props),this.props.dispatch({type:"lead/saveListFile",payload:e.fileList})):"error"===e.file.status&&o["a"].error("".concat(e.file.name," file upload failed."))}};f=C()(f,1e3),b=C()(b,1e3);var V=function(a){e.dispatch({type:"lead/handleSearchChange",payload:{value:a,listCompany:[]}})},q=function(a){e.dispatch({type:"lead/handleSearchContactChange",payload:{value:a,listContact:[]}})},N=function(a){e.dispatch({type:"lead/handleSearchContactChange",payload:{value:a,listContact:[]}})};return void 0===e.lead.data?h.a.createElement(r["a"],null):h.a.createElement("div",{className:v.a.main},h.a.createElement("div",{className:v.a.header},h.a.createElement("h2",{className:v.a.title}," Update lead ")),h.a.createElement(i["a"],Object(l["a"])({},w,{form:y,name:"nest-messages",onFinish:a,initialValues:{lead:{name:e.lead.data.name,rank:e.lead.data.rank,company:e.lead.data.company,contact:e.lead.data.contact,relation:e.lead.data.relation,tag:e.lead.data.tag,brief:e.lead.data.brief,description:e.lead.data.description}},validateMessages:I}),h.a.createElement(i["a"].Item,{name:["lead","name"],label:"Name",rules:[{required:!0}]},h.a.createElement(m["a"],null)),h.a.createElement(i["a"].Item,{name:["lead","rank"],label:"Rank",rules:[{required:!0}]},h.a.createElement(p["a"],null,h.a.createElement(k,{value:"0"},"A"),h.a.createElement(k,{value:"1"},"B"),h.a.createElement(k,{value:"2"},"C"))),h.a.createElement(i["a"].Item,{name:["lead","company"],label:"Company",rules:[{required:!0}]},h.a.createElement(p["a"],{showSearch:!0,labelInValue:!0,tokenSeparators:[","],value:e.lead.searchValue,placeholder:"Select company",notFoundContent:e.fetchingCompany?h.a.createElement(r["a"],{size:"small"}):h.a.createElement("p",null,h.a.createElement(c["a"],{type:"text"},"Create Company")),filterOption:!1,onSearch:f,onChange:V},e.lead.listCompany.map((function(e){return h.a.createElement(k,{key:e.key},e.label)})))),h.a.createElement(i["a"].Item,{name:["lead","contact"],label:"Contact",rules:[{required:!0}]},h.a.createElement(p["a"],{mode:"multiple",labelInValue:!0,tokenSeparators:[","],value:e.lead.searchContactValue,placeholder:"Select contact",notFoundContent:e.fetchingContact?h.a.createElement(r["a"],{size:"small"}):h.a.createElement("p",null,h.a.createElement(c["a"],{type:"text"},"New")),filterOption:!1,onSearch:b,onChange:q},e.lead.listContact.map((function(e){return h.a.createElement(k,{key:e.key},e.label)})))),h.a.createElement(i["a"].Item,{name:["lead","relation"],label:"Related To",rules:[{required:!0}]},h.a.createElement(p["a"],{mode:"multiple",labelInValue:!0,tokenSeparators:[","],value:e.lead.searchContactValue,notFoundContent:e.fetchingContact?h.a.createElement(r["a"],{size:"small"}):h.a.createElement("p",null,h.a.createElement(c["a"],{type:"text"},"New")),filterOption:!1,onSearch:b,onChange:N},e.lead.listContact.map((function(e){return h.a.createElement(k,{key:e.key},e.label)})))),h.a.createElement(i["a"].Item,{name:["lead","tag"],label:"Tag"},h.a.createElement(p["a"],{mode:"tags",style:{width:"100%"},labelInValue:!0,tokenSeparators:[","]},h.a.createElement(k,{key:"1"},"String"),h.a.createElement(k,{key:"6"},"tesst"))),h.a.createElement(i["a"].Item,{name:["lead","brief"],label:"Brief"},h.a.createElement(n["a"],{onUpload:O},h.a.createElement(c["a"],null,"Click to Upload"))),h.a.createElement(i["a"].Item,{name:["lead","description"],label:"Description",rules:[{required:!0}]},h.a.createElement(S,{rows:4})),h.a.createElement(i["a"].Item,{wrapperCol:Object(s["a"])({},w.wrappercol,{offset:8})},h.a.createElement(c["a"],{type:"primary",htmlType:"submit",loading:e.submitting},"Submit"))))}));a["default"]=O},Dn2Q:function(e,a,t){e.exports={main:"harmonia_-pages-lead-update-style_main",header:"harmonia_-pages-lead-update-style_header",title:"harmonia_-pages-lead-update-style_title"}}}]);