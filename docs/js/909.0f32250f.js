"use strict";(self["webpackChunkconstructor_portfolio"]=self["webpackChunkconstructor_portfolio"]||[]).push([[909],{4909:function(e,t,i){i.r(t),i.d(t,{default:function(){return x}});var s=i(6768),r=i(4232);const o={class:"sites"},n={class:"sites-wrapper"},c={class:"sites-wrapper__col"};function a(e,t,i,a,l,u){const d=(0,s.g2)("keyword-sort"),k=(0,s.g2)("site-item");return(0,s.uX)(),(0,s.CE)("section",o,[(0,s.bF)(d,{class:"keywords-wrapper"}),(0,s.Lk)("div",n,[(0,s.Lk)("div",c,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(u.sitesCol1,((e,t)=>((0,s.uX)(),(0,s.Wv)(k,{class:"site-animation site-animation--active",key:t,site:e},null,8,["site"])))),128))]),e.getMobile?(0,s.Q3)("",!0):((0,s.uX)(),(0,s.CE)("div",{key:0,style:(0,r.Tr)("margin-top: "+l.mt),class:"sites-wrapper__col"},[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(u.sitesCol2,((e,t)=>((0,s.uX)(),(0,s.Wv)(k,{class:"site-animation site-animation--active",key:t,site:e},null,8,["site"])))),128))],4))])])}i(4114);var l=i(782);const u={class:"site-item"},d={class:"site-item__img"},k=["data-back"],m={class:"site-item__content"},p={class:"site-name"},y={class:"site-keywords"};function g(e,t,i,o,n,c){const a=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.Wv)(a,{to:"/site/"+i.site.path},{default:(0,s.k6)((()=>[(0,s.Lk)("div",u,[(0,s.Lk)("div",d,[(0,s.Lk)("div",{class:"img-wrap","data-back":c.background,style:{}},null,8,k)]),(0,s.Lk)("div",m,[(0,s.Lk)("p",p,(0,r.v_)(i.site.name),1),(0,s.Lk)("p",y,(0,r.v_)(c.keywords),1)])])])),_:1},8,["to"])}var h={props:{site:Object},computed:{keywords(){return this.site.keywords.join(", ")},background(){return this.site.img.src?"url("+this.site.img.src+") center/cover no-repeat, #fff":"#fff"}}},f=i(1241);const w=(0,f.A)(h,[["render",g]]);var v=w,_=i(940);const C={class:"keyword-filter"},b=["onClick"],L=(0,s.Lk)("path",{d:"M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z",fill:"#959595"},null,-1),S=(0,s.Lk)("path",{d:"M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z",fill:"#959595"},null,-1),E=[L,S];function K(e,t,i,o,n,c){return(0,s.uX)(),(0,s.CE)("div",C,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(c.keys,((i,o)=>((0,s.uX)(),(0,s.CE)("div",{key:o},[(0,s.Lk)("div",{class:(0,r.C4)(["keyword-filter__item",e.getKeyFilter==i?"keyword-filter__item--active":""]),onClick:e=>c.clickKey(i)},(0,r.v_)(i),11,b),o==c.keys.length-1?((0,s.uX)(),(0,s.CE)("svg",{key:0,class:(0,r.C4)(["key-close",e.getKeyFilter?"":"key-close--hide"]),onClick:t[0]||(t[0]=e=>c.close()),width:"20px",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32","aria-hidden":"true"},E,2)):(0,s.Q3)("",!0)])))),128))])}var X={methods:{...(0,l.PY)(["setKeyFilter"]),clickKey(e){this.gsap.fromTo("section.sites .sites-wrapper",{opacity:0},{delay:.4,opacity:1,duration:.4}),this.setKeyFilter(e)},close(){document.querySelector(".keyword-filter .keyword-filter__item--active").click()}},computed:{...(0,l.L8)(["getSites","getKeyFilter"]),keys(){let e=this.getSites.reduce((function(e,t,i,s){return t.keywords.forEach((t=>{e.push(t)})),e}),[]);const t={};for(const i of e)t[i]=t[i]?t[i]+1:1;return Object.keys(t).filter((e=>t[e]>1)).sort(((e,t)=>t-e))}}};const M=(0,f.A)(X,[["render",K]]);var F=M,q={components:{SiteItem:v,KeywordSort:F},data(){return{mt:"0"}},computed:{...(0,l.L8)(["getSitesView","isProd","getMobile"]),sitesCol1(){return this.getMobile?this.getSitesView:this.getSitesView.reduce((function(e,t,i){return i%2==0&&e.push(t),e}),[])},sitesCol2(){return this.getSitesView.reduce((function(e,t,i){return i%2!=0&&e.push(t),e}),[])}},methods:{getMt(){let e=document.querySelector("section.sites .site-animation");("landing"==this.$route.name||this.isProd)&&e&&(this.mt="calc("+e.clientHeight+"px / 2)")}},mounted(){addEventListener("resize",(()=>{!this.getMobile&&this.getMt()})),!this.getMobile&&this.getMt(),this.$nextTick((function(){let e=document.querySelectorAll("section.sites .site-animation");e&&e.forEach(((e,t)=>{_.A.create({trigger:e,start:"top 75%",animation:this.gsap.from(e,{autoAlpha:0,y:150,delay:.75,duration:1.25,ease:"power1.out",onStart:()=>{e.querySelector(".site-item__img .img-wrap").style.background=e.querySelector(".site-item__img .img-wrap").dataset.back,e.querySelector(".site-item__img .img-wrap").dataset.back=""},onComplete:()=>{e.classList.remove("site-animation--active")}})})}))}))}};const A=(0,f.A)(q,[["render",a]]);var x=A}}]);
//# sourceMappingURL=909.0f32250f.js.map