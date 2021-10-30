var y=Object.defineProperty;var q=Reflect.get,I=Reflect.set;var v=(i,e,t)=>e in i?y(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var r=(i,e,t)=>(v(i,typeof e!="symbol"?e+"":e,t),t);import{G as S,a as k,C as L,A as M,S as x,P,W as b,b as O,c as A,d as H,e as K,O as W,t as z,M as C}from"./vendor.2e45f436.js";const E=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&s(m)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}};E();const w=new S;class F{constructor(e){r(this,"model",new k);r(this,"clock",new L);r(this,"mixer");r(this,"pressedKeys",{w:!0,d:!0});r(this,"rotationSpeed",.1);r(this,"movingSpeed",.6);r(this,"moving",!1);w.load("models/cat/scene.gltf",t=>{this.model=t.scene,this.model.scale.set(.1,.1,.1),this.mixer=new M(this.model),this.mixer.clipAction(t.animations[0]).play(),e(this.model)},void 0,t=>console.error(t)),window.addEventListener("keydown",t=>{this.pressedKeys[t.key]=!0,this.checkMoving(),["w","a","s","d"].includes(t.key)&&(this.rotationSpeed=.05,this.movingSpeed=1)}),window.addEventListener("keyup",t=>{this.pressedKeys[t.key]=!1,this.checkMoving()})}checkMoving(){const e=this.pressedKeys;this.moving=e.w||e.a||e.s||e.d,this.moving?this.clock.start():this.clock.stop()}animate(){var s;const e=this.model,t=this.pressedKeys;this.moving&&(t.a&&(e.rotation.y+=this.rotationSpeed),t.d&&(e.rotation.y-=this.rotationSpeed),t.w&&(e.position.z+=this.movingSpeed*Math.cos(e.rotation.y),e.position.x+=this.movingSpeed*Math.sin(e.rotation.y)),t.s&&(e.position.z-=this.movingSpeed*Math.cos(e.rotation.y),e.position.x-=this.movingSpeed*Math.sin(e.rotation.y)),(s=this.mixer)==null||s.update(this.clock.getDelta()))}}const a=new x,G=window.innerWidth/window.innerHeight,d=new P(75,G,.1,1e3);d.position.set(-70,70,-70);const c=new b({canvas:document.querySelector("#main")});c.setSize(window.innerWidth,window.innerHeight);const u={color:16777215};a.add(new O(16777215,.2));const l=[new A(u.color,.7)];l[0].position.set(0,100,0);a.add(...l);a.add(new H(200,50));a.add(...l.map(i=>new K(i)));const h=new W(d,c.domElement);h.enableDamping=!0;h.minDistance=70;h.maxDistance=240;const D=new z.exports.Pane,f=D.addFolder({title:"Light"});f.addInput(u,"color",{view:"color"}).on("change",i=>l[0].color.set(i.value));f.addInput(l[0],"intensity",{min:0,max:2});const p=new F(i=>{i.position.set(60,0,0),a.add(i)});p.rotationSpeed=.01;p.moving=!0;w.load("models/bowl/scene.gltf",i=>{const e=i.scene,t=new C({color:15606306});e.traverse(s=>{s.isMesh&&(s.material=t)}),e.scale.set(8,8,8),a.add(e)});window.addEventListener("resize",()=>{d.aspect=window.innerWidth/window.innerHeight,d.updateProjectionMatrix(),c.setSize(window.innerWidth,window.innerHeight),c.setPixelRatio(window.devicePixelRatio)});function g(){requestAnimationFrame(g),h.update(),p.animate(),c.render(a,d)}g();