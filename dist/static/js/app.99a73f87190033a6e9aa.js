webpackJsonp([1],{"1uuo":function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var n=a("VU/8")({name:"App"},r,!1,function(t){a("gsu9")},null,null).exports,i=a("/ocq"),o={name:"HelloWorld",data:()=>({msg:"Welcome to Your Vue.js App"})},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("h1",[t._v(t._s(t.msg))]),t._v(" "),a("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),a("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",[a("li",[a("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n        Core Docs\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("\n        Forum\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("\n        Community Chat\n      ")])]),t._v(" "),a("li",[a("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("\n        Twitter\n      ")])]),t._v(" "),a("br"),t._v(" "),a("li",[a("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("\n        Docs for This Template\n      ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};a("VU/8")(o,l,!1,function(t){a("1uuo")},"data-v-d8ec41bc",null).exports;var c={computed:{image(){return console.log("Computed Image:"),console.log(this.$store.state.current_image),"/static/images/"+this.$store.state.current_image.filename}},methods:{find_next_image(){console.log("Finding image..."),this.$store.dispatch("get_image")},classify_current_image(t){console.log("Classified image as:"),console.log(t),this.$store.dispatch("set_label",t),this.$store.dispatch("classify_image")}},mounted(){this.find_next_image()}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-container",{attrs:{xs12:"",fluid:""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs2:""}}),t._v(" "),a("v-flex",{attrs:{xs8:""}},[a("v-card",{staticClass:"primary"},[a("v-card-media",{attrs:{src:t.image,height:"720",width:"50"}}),t._v(" "),a("v-card-text",{staticClass:"black--text"},[t._v("\n                        Choose a species to classify this image as:\n                    ")]),t._v(" "),a("v-btn",{attrs:{flat:"",large:"",color:"primary"},nativeOn:{click:function(e){t.classify_current_image("Glossy Buckthorn")}}},[t._v("\n                        Glossy Buckthorn\n                    ")]),t._v(" "),a("v-btn",{attrs:{flat:"",large:"",color:"primary"},nativeOn:{click:function(e){t.classify_current_image("Purple Loosestrife")}}},[t._v("\n                        Purple Loosestrife\n                    ")]),t._v(" "),a("v-btn",{attrs:{flat:"",large:"",color:"primary"},nativeOn:{click:function(e){t.classify_current_image("Fragmiti")}}},[t._v("\n                        Phragmites\n                    ")]),t._v(" "),a("v-btn",{attrs:{flat:"",large:"",color:"primary"},nativeOn:{click:function(e){t.classify_current_image("Autumn Olive")}}},[t._v("\n                        Autumn Olive\n                    ")])],1)],1)],1)],1)],1)},staticRenderFns:[]},_=a("VU/8")(c,u,!1,null,null,null).exports;s.a.use(i.a);var m=new i.a({routes:[{path:"/",name:"Classify",component:_}]}),v=a("NYxO"),g=a("mtWM"),h=a.n(g);var f={get_next_image:()=>h.a.get("http://localhost:1492/images"),post_classification:t=>h.a.post("http://localhost:1492/images",t)};s.a.use(v.a);var p=new v.a.Store({state:{current_image:{}},mutations:{set_current_image(t,e){t.current_image=e},get_current_image:t=>t.current_image,update_label(t,e){t.current_image.label=e}},actions:{get_image(t){f.get_next_image().then(function(e){console.log("Response:"),console.log(e.data),t.commit("set_current_image",e.data)})},classify_image(t){console.log("Classification data:"),console.log(t.state.current_image),f.post_classification(t.state.current_image).then(function(e){console.log("Image succesfully classified!"),t.commit("set_current_image",e.data)})},set_label(t,e){t.commit("update_label",e)}}}),d=a("3EgV"),b=a.n(d);s.a.config.productionTip=!1,s.a.use(b.a),new s.a({el:"#app",store:p,router:m,components:{App:n},template:"<App/>"}),window.router=app.$router},gsu9:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.99a73f87190033a6e9aa.js.map