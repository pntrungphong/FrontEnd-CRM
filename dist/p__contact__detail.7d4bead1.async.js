(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"97Tp":function(e,a,t){e.exports={title:"harmonia_-pages-contact-detail-style_title",one:"harmonia_-pages-contact-detail-style_one",two:"harmonia_-pages-contact-detail-style_two",three:"harmonia_-pages-contact-detail-style_three",five:"harmonia_-pages-contact-detail-style_five",four:"harmonia_-pages-contact-detail-style_four",clo:"harmonia_-pages-contact-detail-style_clo",cloOne:"harmonia_-pages-contact-detail-style_cloOne",cloTwo:"harmonia_-pages-contact-detail-style_cloTwo",rowCol:"harmonia_-pages-contact-detail-style_rowCol",cloFour:"harmonia_-pages-contact-detail-style_cloFour",ta:"harmonia_-pages-contact-detail-style_ta"}},Zufc:function(e,a,t){"use strict";t.r(a);t("IzEo");var l=t("bx4M"),c=(t("+BJd"),t("mr32")),n=(t("14J3"),t("BMrR")),r=(t("jCWc"),t("kPKH")),o=(t("/zsF"),t("PArb")),m=(t("Telt"),t("Tckk")),s=(t("T2oS"),t("W9HT")),i=t("1OyB"),E=t("vuIU"),u=t("Ji7U"),p=t("LK+K"),d=t("q1tI"),N=t.n(d),f=t("Hx5s"),h=t("cJ7L"),y=t("9kvl"),w=t("97Tp"),x=t.n(w),g=function(e){Object(u["a"])(t,e);var a=Object(p["a"])(t);function t(){return Object(i["a"])(this,t),a.apply(this,arguments)}return Object(E["a"])(t,[{key:"componentDidMount",value:function(){var e=this.props.dispatch;e({type:"contact/loading",payload:{id:this.props.match.params.id}})}},{key:"render",value:function(){var e=this.props.contact;return void 0===e.data?N.a.createElement(s["a"],null):N.a.createElement(f["a"],{title:"Contact Details"},N.a.createElement(l["a"],{bordered:"true"},N.a.createElement("div",{className:x.a.one},N.a.createElement(m["a"],{size:64,icon:N.a.createElement(h["a"],null)})),N.a.createElement(o["a"],{className:x.a.two}),N.a.createElement(n["a"],{className:x.a.rowCol},N.a.createElement(r["a"],{flex:"150px"},N.a.createElement("h3",{className:x.a.cloOne},N.a.createElement("span",null," "),"Name")),N.a.createElement(r["a"],{flex:"auto"},N.a.createElement("div",{className:x.a.clo},N.a.createElement("span",{className:x.a.cloTwo},e.data.name)))),N.a.createElement(n["a"],{className:x.a.rowCol},N.a.createElement(r["a"],{flex:"150px"},N.a.createElement("h3",{className:x.a.cloOne},"Title")),N.a.createElement(r["a"],{flex:"auto"},N.a.createElement("div",{className:x.a.clo},N.a.createElement("span",{className:x.a.cloTwo},e.data.title)))),N.a.createElement(n["a"],{className:x.a.rowCol},N.a.createElement(r["a"],{flex:"150px"},N.a.createElement("h3",{className:x.a.cloOne},"Email")),N.a.createElement(r["a"],{flex:"auto"},N.a.createElement("div",{className:x.a.cloFour},N.a.createElement("span",{className:x.a.cloTwo},e.data.email.map((function(e){return N.a.createElement(N.a.Fragment,null,N.a.createElement(c["a"],{key:e.url,className:x.a.ta},e.url))})))))),N.a.createElement(n["a"],{className:x.a.rowCol},N.a.createElement(r["a"],{flex:"150px"},N.a.createElement("h3",{className:x.a.cloOne},"Phone")),N.a.createElement(r["a"],{flex:"auto"},N.a.createElement("div",{className:x.a.cloFour},N.a.createElement("span",{className:x.a.cloTwo},e.data.phone.map((function(e){return N.a.createElement(N.a.Fragment,null,N.a.createElement(c["a"],{key:e.number,className:x.a.ta},e.number))})))))),N.a.createElement(n["a"],{className:x.a.rowCol},N.a.createElement(r["a"],{flex:"150px"},N.a.createElement("h3",{className:x.a.cloOne},"Tag")),N.a.createElement(r["a"],{flex:"auto"},N.a.createElement("div",{className:x.a.cloFour},N.a.createElement("span",{className:x.a.cloTwo},e.data.tag.map((function(e){return N.a.createElement(N.a.Fragment,null,N.a.createElement(c["a"],{key:e.key},e.label))})))))),N.a.createElement(n["a"],{className:x.a.rowCol},N.a.createElement(r["a"],{flex:"150px"},N.a.createElement("h3",{className:x.a.cloOne},"Referral")),N.a.createElement(r["a"],{flex:"auto"},N.a.createElement("div",{className:x.a.cloFour},N.a.createElement("span",{className:x.a.cloTwo},e.data.referral.map((function(e){return N.a.createElement(N.a.Fragment,null,N.a.createElement(c["a"],{key:e.key,className:x.a.ta},e.label))})))))),N.a.createElement(n["a"],{className:x.a.rowCol},N.a.createElement(r["a"],{flex:"150px"},N.a.createElement("h3",{className:x.a.cloOne},"Company")),N.a.createElement(r["a"],{flex:"auto"},N.a.createElement("div",{className:x.a.cloFour},N.a.createElement("span",{className:x.a.cloTwo},e.data.company.map((function(e){return N.a.createElement(N.a.Fragment,null,N.a.createElement(c["a"],{key:e.key,className:x.a.ta},N.a.createElement("a",{onClick:function(){y["b"].push({pathname:"/company/detail/".concat(e.key)})}},e.label)))})))))),N.a.createElement(n["a"],{className:x.a.rowCol},N.a.createElement(r["a"],{flex:"150px"},N.a.createElement("h3",{className:x.a.cloOne},"Website")),N.a.createElement(r["a"],{flex:"auto"},N.a.createElement("div",{className:x.a.cloFour},N.a.createElement("span",{className:x.a.cloTwo},e.data.website.map((function(e){return N.a.createElement(N.a.Fragment,null,N.a.createElement("a",{key:e.url},e.url))})))))),N.a.createElement(n["a"],{className:x.a.rowCol},N.a.createElement(r["a"],{flex:"150px"},N.a.createElement("h3",{className:x.a.cloOne},N.a.createElement("span",null," "),"Address")),N.a.createElement(r["a"],{flex:"auto"},N.a.createElement("div",{className:x.a.cloFour},N.a.createElement("span",{className:x.a.cloTwo},e.data.address.map((function(e){return N.a.createElement(N.a.Fragment,null,N.a.createElement("span",{key:e},e))})))))),N.a.createElement(o["a"],{className:x.a.three})))}}]),t}(d["Component"]);a["default"]=Object(y["a"])((function(e){var a=e.contact,t=e.loading;return{contact:a,querying:t.effects["contact/loading"]}}))(g)}}]);