(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{Ez2h:function(e,a,t){e.exports={title:"harmonia_-pages-lead-detail-style_title",customContent:"harmonia_-pages-lead-detail-style_customContent",customTitle:"harmonia_-pages-lead-detail-style_customTitle",rowCol:"harmonia_-pages-lead-detail-style_rowCol",ta:"harmonia_-pages-lead-detail-style_ta",customContentLayout:"harmonia_-pages-lead-detail-style_customContentLayout",customAvatar:"harmonia_-pages-lead-detail-style_customAvatar",customCard:"harmonia_-pages-lead-detail-style_customCard",fileSpan:"harmonia_-pages-lead-detail-style_fileSpan",fileSpanHover:"harmonia_-pages-lead-detail-style_fileSpanHover",fileSpanHoverIcon:"harmonia_-pages-lead-detail-style_fileSpanHoverIcon"}},"w+G5":function(e,a,t){"use strict";t.r(a);t("IzEo");var l=t("bx4M"),n=(t("+BJd"),t("mr32")),c=(t("Telt"),t("Tckk")),o=(t("14J3"),t("BMrR")),m=(t("jCWc"),t("kPKH")),r=(t("T2oS"),t("W9HT")),s=t("1OyB"),i=t("vuIU"),u=t("Ji7U"),d=t("LK+K"),p=(t("B9cy"),t("Ol7k")),E=t("q1tI"),f=t.n(E),h=t("Hx5s"),y=t("cJ7L"),C=t("9kvl"),N=t("IP2g"),x=t("wHSu"),v=t("34ay"),k=t("Ez2h"),g=t.n(k),b=p["a"].Sider,w=p["a"].Content,_={0:"A",1:"B",2:"C",3:"D"},T=function(e){var a=e.fileinfo,t=function(){var e=new Headers;e.append("Content-Type","application/json"),e.append("Authorization","Bearer ".concat(Object(v["b"])())),fetch("http://api-harmonia.geekup.io/file/".concat(a.id),{method:"GET",headers:e}).then((function(e){e.blob().then((function(e){var t=window.URL.createObjectURL(e),l=document.createElement("a");l.href=t,l.download=a.originalname,l.click()}))}))};return f.a.createElement("div",{className:g.a.fileSpan},f.a.createElement("h4",null,a.originalname),f.a.createElement("div",{className:g.a.fileSpanHover},f.a.createElement(N["a"],{icon:x["c"],size:"3x",className:g.a.fileSpanHoverIcon,onClick:t})))},S=function(e){Object(u["a"])(t,e);var a=Object(d["a"])(t);function t(){return Object(s["a"])(this,t),a.apply(this,arguments)}return Object(i["a"])(t,[{key:"componentDidMount",value:function(){var e=this.props.dispatch;e({type:"lead/loading",payload:{id:this.props.match.params.id}})}},{key:"render",value:function(){var e=this.props.lead;return void 0===e.data?f.a.createElement(r["a"],null):f.a.createElement(h["a"],{title:"Lead Details"},f.a.createElement(l["a"],{bordered:"true",className:g.a.customCard},f.a.createElement(p["a"],{className:g.a.customContentLayout},f.a.createElement(p["a"],{className:g.a.customContentLayout},f.a.createElement(w,null,f.a.createElement(o["a"],{className:g.a.rowCol},f.a.createElement(m["a"],{flex:"150px"},f.a.createElement("h3",{className:g.a.customTitle},"Name ")),f.a.createElement(m["a"],{flex:"auto"},f.a.createElement("div",{className:g.a.customContent},f.a.createElement("span",null,e.data.name)))),f.a.createElement(o["a"],{className:g.a.rowCol},f.a.createElement(m["a"],{flex:"150px"},f.a.createElement("h3",{className:g.a.customTitle},"Description ")),f.a.createElement(m["a"],{flex:"auto"},f.a.createElement("div",{className:g.a.customContent},f.a.createElement("span",{className:g.a.customDescription},e.data.description)))),f.a.createElement(o["a"],{className:g.a.rowCol},f.a.createElement(m["a"],{flex:"150px"},f.a.createElement("h3",{className:g.a.customTitle},"Rank ")),f.a.createElement(m["a"],{flex:"auto"},f.a.createElement("div",{className:g.a.customContent},f.a.createElement("span",null,_[e.data.rank])))),f.a.createElement(o["a"],{className:g.a.rowCol},f.a.createElement(m["a"],{flex:"150px"},f.a.createElement("h3",{className:g.a.customTitle},"Status ")),f.a.createElement(m["a"],{flex:"auto"},f.a.createElement("div",{className:g.a.customContent},f.a.createElement("span",null,e.data.status))))),f.a.createElement(b,{className:g.a.customContentLayout},f.a.createElement("div",{className:g.a.customAvatar},f.a.createElement(c["a"],{size:150,icon:f.a.createElement(y["a"],null)}))))),f.a.createElement(o["a"],{className:g.a.rowCol},f.a.createElement(m["a"],{flex:"150px"},f.a.createElement("h3",{className:g.a.customTitle},"Company")),f.a.createElement(m["a"],{flex:"auto"},f.a.createElement(n["a"],{key:e.data.company.key,className:g.a.ta},f.a.createElement("a",{onClick:function(){C["b"].push({pathname:"/company/detail/".concat(e.data.company.key)})}},e.data.company.label)))),f.a.createElement(o["a"],{className:g.a.rowCol},f.a.createElement(m["a"],{flex:"150px"},f.a.createElement("h3",{className:g.a.customTitle},"Tag")),f.a.createElement(m["a"],{flex:"auto"}," ",e.data.tag.map((function(e){return f.a.createElement(f.a.Fragment,null,f.a.createElement(n["a"],{key:e.key,className:g.a.customTitle},e.label))})))),f.a.createElement(o["a"],{className:g.a.rowCol},f.a.createElement(m["a"],{flex:"150px"},f.a.createElement("h3",{className:g.a.customTitle},f.a.createElement("span",null," "),"Contact")),f.a.createElement(m["a"],{flex:"auto"}," ",e.data.contact.map((function(e){return f.a.createElement(f.a.Fragment,null,f.a.createElement(n["a"],{key:e.label,className:g.a.customTitle},f.a.createElement("a",{onClick:function(){C["b"].push({pathname:"/contact/detail/".concat(e.key)})}},e.label)))})))),f.a.createElement(o["a"],{className:g.a.rowCol},f.a.createElement(m["a"],{flex:"150px"},f.a.createElement("h3",{className:g.a.customTitle},f.a.createElement("span",null," "),"Related to")),f.a.createElement(m["a"],{flex:"auto"},e.data.relation.map((function(e){return f.a.createElement(f.a.Fragment,null,f.a.createElement(n["a"],{key:e.label,className:g.a.customTitle},f.a.createElement("a",{onClick:function(){C["b"].push({pathname:"/contact/detail/".concat(e.key)})}},e.label)))})))),f.a.createElement(o["a"],{className:g.a.rowCol},f.a.createElement(m["a"],{flex:"150px"},f.a.createElement("h3",{className:g.a.customTitle},"File")),f.a.createElement(m["a"],{flex:"auto"},e.data.file.map((function(e){return f.a.createElement(f.a.Fragment,null,f.a.createElement(T,{key:e.id,fileinfo:e}))}))))))}}]),t}(E["Component"]);a["default"]=Object(C["a"])((function(e){var a=e.lead,t=e.loading;return{lead:a,querying:t.effects["lead/loading"]}}))(S)}}]);