(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"+BdI":function(e,a,t){e.exports={main:"harmonia_-pages-company-create-style_main",header:"harmonia_-pages-company-create-style_header",title:"harmonia_-pages-company-create-style_title",one:"harmonia_-pages-company-create-style_one",two:"harmonia_-pages-company-create-style_two",deletebutton:"harmonia_-pages-company-create-style_deletebutton",doubleInput:"harmonia_-pages-company-create-style_doubleInput",optionCreate:"harmonia_-pages-company-create-style_optionCreate",childrenRow:"harmonia_-pages-company-create-style_childrenRow",resultNotFound:"harmonia_-pages-company-create-style_resultNotFound",createNewContact:"harmonia_-pages-company-create-style_createNewContact",customDevider:"harmonia_-pages-company-create-style_customDevider",customDeleteButton:"harmonia_-pages-company-create-style_customDeleteButton",customDeleteAddressButton:"harmonia_-pages-company-create-style_customDeleteAddressButton",customButtomAdd:"harmonia_-pages-company-create-style_customButtomAdd",tag:"harmonia_-pages-company-create-style_tag",address:"harmonia_-pages-company-create-style_address"}},N0Ll:function(e,a,t){"use strict";t.r(a);t("/zsF");var n=t("PArb"),c=(t("T2oS"),t("W9HT")),l=(t("+L6B"),t("2/Rp")),r=(t("14J3"),t("BMrR")),m=t("wx14"),o=(t("jCWc"),t("kPKH")),s=(t("y8nQ"),t("Vl3Y")),u=(t("5NDa"),t("5rEg")),i=t("o0o1"),p=t.n(i),d=t("KQm4"),y=t("HaE+"),h=t("VTBJ"),E=t("1OyB"),f=t("vuIU"),g=t("Ji7U"),C=t("LK+K"),b=(t("OaEy"),t("2fM7")),v=t("q1tI"),N=t.n(v),w=t("9kvl"),k=t("sEfC"),_=t.n(k),I=t("wlus"),B=t("xvlK"),O=t("+BdI"),R=t.n(O),A=b["a"].Option,j={labelCol:{xs:{span:24},sm:{span:8}},wrappercol:{xs:{span:24},sm:{span:20}}},S={wrappercol:{xs:{span:24,offset:0},sm:{span:20,offset:4}}},q={labelCol:{span:8},wrappercol:{span:16}},K=function(e){return{required:"".concat(e," is required!")}},P=function(e,a,t){return e?a:t},D=function(e){Object(g["a"])(t,e);var a=Object(C["a"])(t);function t(e){var n;return Object(E["a"])(this,t),n=a.call(this,e),n.onFinish=function(e){n.props.dispatch({type:"company/fullCreate",payload:Object(h["a"])({},e)})},n.fetchContact=function(e){n.props.dispatch({type:"company/handleSearchContactChange",payload:{value:n.props.company.searchValueContact,contactInfo:[]}}),n.props.dispatch({type:"company/searchContactByName",payload:{page:1,searchValue:e}}),n.newContactName=e},n.quickCreateContact=Object(y["a"])(p.a.mark((function e(){var a,t;return p.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.props.dispatch({type:"contact/quickCreateContact",payload:{name:n.newContactName}});case 2:a=e.sent,t=n.formRef.current.getFieldValue("contact"),t||(t=[]),t.push(a),console.table(t),n.formRef.current.setFieldsValue({contact:Object(d["a"])(t)}),n.newContactName="";case 9:case"end":return e.stop()}}),e)}))),n.handleChange=function(e){n.newContactName="",n.props.dispatch({type:"company/handleSearchContactChange",payload:{value:e,contactInfo:[]}})},n.fetchContact=_()(n.fetchContact,1e3),n.newContactName="",n.formRef=N.a.createRef(),n}return Object(f["a"])(t,[{key:"componentDidMount",value:function(){this.props.dispatch({type:"company/cleanData"}),this.props.dispatch({type:"tag/getTag"})}},{key:"render",value:function(){var e=this.props.company,a=e.contactInfo,t=e.searchValueContact,i=this.props.tag.tag;return N.a.createElement("div",{className:R.a.main},N.a.createElement("div",{className:R.a.header},N.a.createElement("h2",{className:R.a.title}," CREATE COMPANY")),N.a.createElement(s["a"],Object(m["a"])({},q,{ref:this.formRef,name:"nest-messages",onFinish:this.onFinish,validateMessages:K}),N.a.createElement(s["a"].Item,{name:"name",label:"Name",rules:[{required:!0,message:"Please input name"}]},N.a.createElement(u["a"],null)),N.a.createElement(s["a"].Item,{name:"url",label:"Website"},N.a.createElement(u["a"],null)),N.a.createElement(s["a"].Item,{name:"tag",label:"Tag"},N.a.createElement(b["a"],{mode:"tags",className:R.a.tag,labelInValue:!0,tokenSeparators:[","]},i.map((function(e){return N.a.createElement(A,{key:e.key},e.label)})))),N.a.createElement("div",S,N.a.createElement(s["a"].List,{name:"phone"},(function(e,a){var t=a.add,n=a.remove;return N.a.createElement("div",null,e.map((function(e){return N.a.createElement(r["a"],{key:e.key},N.a.createElement(o["a"],{span:8}),N.a.createElement(o["a"],{span:16},N.a.createElement(r["a"],null,N.a.createElement(o["a"],{flex:"2"},N.a.createElement(s["a"].Item,Object(m["a"])({},e,{className:R.a.childrenRow,name:[e.name,"number"],fieldKey:[e.fieldKey,"number"],rules:[{required:!0,message:"Please input phone"}]}),N.a.createElement(u["a"],{placeholder:"Your Phone",pattern:"^[0-9]{10}$"}))),N.a.createElement(I["a"],{className:["dynamic-delete-button",R.a.customDeleteButton],onClick:function(){return n(e.name)}}))))})),N.a.createElement(s["a"].Item,{label:"Phone",className:0===e.length?"":R.a.customRow},N.a.createElement(l["a"],{className:R.a.customButtomAdd,onClick:function(){return t()}},N.a.createElement(B["a"],null)," Add")))}))),N.a.createElement("div",S,N.a.createElement(s["a"].List,{name:"email"},(function(e,a){var t=a.add,n=a.remove;return N.a.createElement("div",null,e.map((function(e){return N.a.createElement(r["a"],{key:[e.key,"@gmail.com","@geekup.vn"]},N.a.createElement(o["a"],{span:8}),N.a.createElement(o["a"],{span:16},N.a.createElement(r["a"],null,N.a.createElement(o["a"],{flex:"2"},N.a.createElement(s["a"].Item,Object(m["a"])({},e,{className:R.a.childrenRow,name:[e.name,"url"],fieldKey:[e.fieldKey,"url"],placeholder:"Your Email",rules:[{required:!0,message:"Please input your email"}]}),N.a.createElement(u["a"],null))),N.a.createElement(o["a"],{flex:"2"},N.a.createElement(s["a"].Item,Object(m["a"])({},e,{className:R.a.childrenRow,name:[e.name,"type"],fieldKey:[e.fieldKey,"type"],rules:[{required:!0,message:"Select type"}]}),N.a.createElement(b["a"],{placeholder:"Select Email"},N.a.createElement(A,{value:"Primary"},"Primary"),N.a.createElement(A,{value:"Company"},"Company"),N.a.createElement(A,{value:"Personal"},"Personal")))),N.a.createElement(I["a"],{className:["dynamic-delete-button",R.a.customDeleteButton],onClick:function(){n(e.name)}}))))})),N.a.createElement(s["a"].Item,{label:"Email",className:0===e.length?"":R.a.customRow},N.a.createElement(l["a"],{className:R.a.customButtomAdd,onClick:function(){return t()}},N.a.createElement(B["a"],null)," Add")))}))),N.a.createElement("div",S,N.a.createElement(s["a"].List,{name:"website"},(function(e,a){var t=a.add,n=a.remove;return N.a.createElement("div",null,e.map((function(e){return N.a.createElement(r["a"],{key:[e.key,".com",".vn"]},N.a.createElement(o["a"],{span:8}),N.a.createElement(o["a"],{span:16},N.a.createElement(r["a"],null,N.a.createElement(o["a"],{flex:"2"},N.a.createElement(s["a"].Item,Object(m["a"])({},e,{className:R.a.childrenRow,name:[e.name,"url"],fieldKey:[e.fieldKey,"url"],rules:[{required:!0,message:"Please input"}]}),N.a.createElement(u["a"],{placeholder:"Social Link"}))),N.a.createElement(o["a"],{flex:"2"},N.a.createElement(s["a"].Item,Object(m["a"])({},e,{className:R.a.childrenRow,name:[e.name,"type"],fieldKey:[e.fieldKey,"type"],rules:[{required:!0,message:"Select type"}],type:!0}),N.a.createElement(b["a"],{placeholder:"Social network"},N.a.createElement(A,{value:"Facebook"},"Facebook"),N.a.createElement(A,{value:"Skype"},"Skype"),N.a.createElement(A,{value:"Zalo"},"Zalo"),N.a.createElement(A,{value:"Youtube"},"Youtube"),N.a.createElement(A,{value:"Linkedin"},"Linkedin"),N.a.createElement(A,{value:"Instagram"},"Instagram")))),N.a.createElement(I["a"],{className:["dynamic-delete-button",R.a.customDeleteButton],onClick:function(){n(e.name)}}))))})),N.a.createElement(s["a"].Item,{label:"Social Link",className:0===e.length?"":R.a.customRow},N.a.createElement(l["a"],{className:R.a.customButtomAdd,onClick:function(){return t()}},N.a.createElement(B["a"],null)," Add")))}))),N.a.createElement("div",S,N.a.createElement(s["a"].List,{name:"address"},(function(e,a){var t=a.add,n=a.remove;return N.a.createElement("div",null,e.map((function(e,a){return N.a.createElement(s["a"].Item,Object(m["a"])({},j,{label:"Address ".concat(a+1),required:!1,key:e.key,className:R.a.childrenRow}),N.a.createElement(s["a"].Item,Object(m["a"])({},e,{className:R.a.childrenRow,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"Please input address"}],noStyle:!0}),N.a.createElement(u["a"],{placeholder:"Address",className:R.a.address})),N.a.createElement(I["a"],{className:["dynamic-delete-button",R.a.customDeleteAddressButton],onClick:function(){n(e.name)}}))})),N.a.createElement(s["a"].Item,{label:"Address",className:0===e.length?"":R.a.customRow},N.a.createElement(l["a"],{className:R.a.customButtomAdd,onClick:function(){return t()}},N.a.createElement(B["a"],null)," Add")))}))),N.a.createElement(s["a"].Item,{name:"contact",label:"Contact",rules:[{required:!0,message:"Please input contact"}]},N.a.createElement(b["a"],{labelInValue:!0,autoClearSearchValue:!0,value:t,mode:"multiple",notFoundContent:P(this.props.fetchingContact,N.a.createElement(c["a"],{size:"small"}),""!==this.newContactName?N.a.createElement(N.a.Fragment,null,N.a.createElement("div",{className:R.a.resultNotFound},"No results found"),N.a.createElement(n["a"],{className:R.a.customDevider}),N.a.createElement("h3",{onClick:this.quickCreateContact,className:R.a.createNewContact},'Create "',this.newContactName,'" as contact')):""),filterOption:!1,onSearch:this.fetchContact,onChange:this.handleChange},a.map((function(e){return N.a.createElement(A,{key:e.key},e.label)})))),N.a.createElement(s["a"].Item,{wrapperCol:Object(h["a"])({},q.wrappercol,{offset:8})},N.a.createElement(l["a"],{type:"primary",htmlType:"submit",loading:this.props.submitting},"Submit"))))}}]),t}(N.a.Component);a["default"]=Object(w["a"])((function(e){var a=e.company,t=e.tag,n=e.loading,c=e.contact;return{company:a,contact:c,tag:t,submitting:n.effects["company/fullCreate"],fetchingContact:n.effects["company/searchContactByName"]}}))(D)}}]);