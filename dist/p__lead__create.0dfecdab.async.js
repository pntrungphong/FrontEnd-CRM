(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{cmSx:function(e,a,t){"use strict";t.r(a);var n=t("wx14"),l=(t("DZo9"),t("8z0m")),c=(t("+L6B"),t("2/Rp")),r=(t("7Kak"),t("9yH6")),o=(t("/zsF"),t("PArb")),i=(t("T2oS"),t("W9HT")),s=(t("y8nQ"),t("Vl3Y")),u=t("o0o1"),m=t.n(u),p=t("HaE+"),h=t("KQm4"),d=t("VTBJ"),f=(t("miYZ"),t("tsqr")),C=t("1OyB"),y=t("vuIU"),E=t("Ji7U"),b=t("LK+K"),k=(t("5NDa"),t("5rEg")),g=(t("OaEy"),t("2fM7")),v=t("q1tI"),N=t.n(v),V=t("9kvl"),F=t("sEfC"),w=t.n(F),O=t("34ay"),q=t("xGkL"),I=t.n(q),S=g["a"].Option,j=k["a"].TextArea,R={labelCol:{span:8},wrappercol:{span:16}},T=function(e){return{required:"".concat(e," is required!")}},B=function(e,a,t){return e?a:t},L=function(e){Object(E["a"])(t,e);var a=Object(b["a"])(t);function t(e){var n;return Object(C["a"])(this,t),n=a.call(this,e),n.onUpload={name:"file",action:"http://api-harmonia.geekup.io/file",headers:{Authorization:"Bearer ".concat(Object(O["b"])())},props:n.props,onChange:function(e){"done"===e.file.status?(f["a"].success("".concat(e.file.name," file uploaded successfully")),this.props.dispatch({type:"lead/saveListFile",payload:e.fileList})):"error"===e.file.status&&f["a"].error("".concat(e.file.name," file upload failed."))}},n.onFinish=function(e){n.props.dispatch({type:"lead/fullCreate",payload:Object(d["a"])({},e,{listFile:n.props.lead.listFile})})},n.fetchCompany=function(e){n.props.dispatch({type:"lead/handleSearchChange",payload:{value:n.props.lead.searchValue,listCompany:[]}}),n.props.dispatch({type:"lead/searchCompanyByName",payload:{value:e}}),n.inputValue=e},n.fetchContact=function(e){n.props.dispatch({type:"lead/handleSearchContactChange",payload:{value:n.props.lead.searchValue,listContact:[]}}),n.props.dispatch({type:"lead/searchContactByName",payload:{value:e}}),n.inputValue=e},n.dispatchType={contact:"contact/quickCreateContact",relation:"contact/quickCreateContact",company:"company/quickCreateCompany"},n.formatFieldValue=function(e,a){return"contact"===e?{contact:Object(h["a"])(a)}:"relation"===e?{relation:Object(h["a"])(a)}:"company"===e?{company:Object(h["a"])(a)}:{bug:Object(h["a"])(a)}},n.quickCreate=function(){var e=Object(p["a"])(m.a.mark((function e(a){var t,l,c,r;return m.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=n.inputValue,n.inputValue="",e.next=4,n.props.dispatch({type:n.dispatchType[a],payload:{name:t}});case 4:l=e.sent,c=n.formRef.current.getFieldValue(a),c||(c=[]),c.push(l),r=n.formatFieldValue(a,c),n.formRef.current.setFieldsValue(r);case 10:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),n.handleChange=function(e){n.inputValue="",n.props.dispatch({type:"lead/handleSearchChange",payload:{value:e,listCompany:[]}})},n.handleContactChange=function(e){n.inputValue="",n.props.dispatch({type:"lead/handleSearchContactChange",payload:{value:e,listContact:[]}})},n.fetchCompany=w()(n.fetchCompany,1e3),n.fetchContact=w()(n.fetchContact,1e3),n.inputValue="",n.formRef=N.a.createRef(),n}return Object(y["a"])(t,[{key:"render",value:function(){var e=this,a=this.props.lead,t=a.searchValue,u=a.listCompany,m=a.listContact;return N.a.createElement("div",{className:I.a.main},N.a.createElement("div",{className:I.a.header},N.a.createElement("h2",{className:I.a.title}," CREATE LEAD")),N.a.createElement(s["a"],Object(n["a"])({},R,{ref:this.formRef,name:"nest-messages",onFinish:this.onFinish,validateMessages:T}),N.a.createElement(s["a"].Item,{name:"name",label:"Lead Name",rules:[{required:!0}]},N.a.createElement(k["a"],null)),N.a.createElement(s["a"].Item,{name:"company",label:"Company",rules:[{required:!0}]},N.a.createElement(g["a"],{labelInValue:!0,autoClearSearchValue:!0,mode:"multiple",value:t,notFoundContent:B(this.props.fetchingCompany,N.a.createElement(i["a"],{size:"small"}),""!==this.inputValue?N.a.createElement(N.a.Fragment,null,N.a.createElement("div",{className:I.a.resultNotFound},"No results found"),N.a.createElement(o["a"],{className:I.a.customDevider}),N.a.createElement("h3",{onClick:function(){return e.quickCreate("company")},className:I.a.createNewContact},'Create "',this.inputValue,'" as company')):""),filterOption:!1,onSearch:this.fetchCompany,onChange:this.handleChange},u.map((function(e){return N.a.createElement(S,{key:e.key},e.label)})))),N.a.createElement(s["a"].Item,{name:"contact",label:"Contact",rules:[{required:!0}]},N.a.createElement(g["a"],{labelInValue:!0,autoClearSearchValue:!0,mode:"multiple",value:t,notFoundContent:B(this.props.fetchingContact,N.a.createElement(i["a"],{size:"small"}),""!==this.inputValue?N.a.createElement(N.a.Fragment,null,N.a.createElement("div",{className:I.a.resultNotFound},"No results found"),N.a.createElement(o["a"],{className:I.a.customDevider}),N.a.createElement("h3",{onClick:function(){return e.quickCreate("contact")},className:I.a.createNewContact},'Create "',this.inputValue,'" as contact')):""),filterOption:!1,onSearch:this.fetchContact,onChange:this.handleContactChange},m.map((function(e){return N.a.createElement(S,{key:e.key},e.label)})))),N.a.createElement(s["a"].Item,{name:"relation",label:"Related To"},N.a.createElement(g["a"],{mode:"multiple",autoClearSearchValue:!0,labelInValue:!0,value:t,notFoundContent:B(this.props.fetchingContact,N.a.createElement(i["a"],{size:"small"}),""!==this.inputValue?N.a.createElement(N.a.Fragment,null,N.a.createElement("div",{className:I.a.resultNotFound},"No results found"),N.a.createElement(o["a"],{className:I.a.customDevider}),N.a.createElement("h3",{onClick:function(){return e.quickCreate("relation")},className:I.a.createNewContact},'Create "',this.inputValue,'" as contact')):""),filterOption:!1,onSearch:this.fetchContact,onChange:this.handleContactChange},m.map((function(e){return N.a.createElement(S,{key:e.key},e.label)})))),N.a.createElement(s["a"].Item,{name:"tag",label:"Tag"},N.a.createElement(g["a"],{mode:"tags",style:{width:"100%"},labelInValue:!0,tokenSeparators:[","]},N.a.createElement(S,{key:"Coffee shop"},"Coffee shop"),N.a.createElement(S,{key:"Loyalty"},"Loyalty"),N.a.createElement(S,{key:"Technical"},"Technical"),N.a.createElement(S,{key:"Financial"},"Financial"),N.a.createElement(S,{key:"Stock"},"Stock"),N.a.createElement(S,{key:"Mobile app"},"Mobile app"))),N.a.createElement(s["a"].Item,{name:"rank",label:"Rank",rules:[{required:!0}]},N.a.createElement(r["default"].Group,{className:I.a.customRadioRank},N.a.createElement(r["default"],{value:"0"},"A"),N.a.createElement(r["default"],{value:"1"},"B"),N.a.createElement(r["default"],{value:"2"},"C"),N.a.createElement(r["default"],{value:"3"},"D"))),N.a.createElement(s["a"].Item,{name:"reason",label:"Rank Explanation",rules:[{required:!0}]},N.a.createElement(j,{autoSize:{minRows:2,maxRows:6}})),N.a.createElement(s["a"].Item,{name:"description",label:"Description",rules:[{required:!0}]},N.a.createElement(j,{rows:4})),N.a.createElement(s["a"].Item,{name:"note",label:"Note",rules:[{required:!0}]},N.a.createElement(j,{rows:4})),N.a.createElement(s["a"].Item,{name:"brief",label:"Brief"},N.a.createElement(l["a"],this.onUpload,N.a.createElement(c["a"],null,"Click to Upload"))),N.a.createElement(s["a"].Item,{wrapperCol:Object(d["a"])({},R.wrappercol,{offset:8})},N.a.createElement(c["a"],{type:"primary",htmlType:"submit",loading:this.props.submitting},"Create"))))}}]),t}(N.a.Component);a["default"]=Object(V["a"])((function(e){var a=e.lead,t=e.loading,n=e.searchModel;return{lead:a,searchModel:n,submitting:t.effects["lead/fullCreate"],fetchingCompany:t.effects["lead/searchCompanyByName"],fetchingContact:t.effects["lead/searchContactByName"]}}))(L)}}]);