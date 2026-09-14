/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,p=globalThis,m=p.trustedTypes,_=m?m.emptyScript:"",g=p.reactiveElementPolyfillSupport,$=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[$("elementProperties")]=new Map,b[$("finalized")]=new Map,g?.({ReactiveElement:b}),(p.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,x=t=>t,w=A.trustedTypes,S=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,P=`<${k}>`,T=document,H=()=>T.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,O="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,D=/>/g,z=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),K=new WeakMap,W=T.createTreeWalker(T,129);function F(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===N?"!--"===c[1]?r=R:void 0!==c[1]?r=D:void 0!==c[2]?(B.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=z):void 0!==c[3]&&(r=z):r===z?">"===c[0]?(r=n??N,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?z:'"'===c[3]?j:q):r===j||r===q?r=z:r===R||r===D?r=N:(r=z,n=void 0);const d=r===z&&t[e+1].startsWith("/>")?" ":"";o+=r===N?i+P:l>=0?(s.push(a),i.slice(0,l)+E+i.slice(l)+C+d):i+C+(-2===l?e:d)}return[F(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=Z.createElement(c,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[o++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:X}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],H()),W.nextNode(),a.push({type:2,index:++n});s.append(t[e],H())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===I)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=M(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Y(t,n._$AS(t,e.values),n,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);W.currentNode=s;let n=W.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=W.nextNode(),o++)}return W.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),M(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(H()),this.O(H()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=Y(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==I,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Y(this,s[i+r],e,r),a===I&&(a=this._$AH[r]),o||=!M(a)||a!==this._$AH[r],a===V?t=V:t!==V&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends X{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??V)===I)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(Z,Q),(A.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(H(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}rt._$litElement$=!0,rt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:rt});const at=ot.litElementPolyfillSupport;at?.({LitElement:rt}),(ot.litElementVersions??=[]).push("4.2.2");const ct="hk37xx";function lt(t){const e=t?.identifiers||[];return Array.from(e).some(t=>Array.isArray(t)&&t[0]===ct)}class ht extends rt{static properties={hass:{},_config:{}};constructor(){super(),this._config={}}setConfig(t){this._config={...t}}_configChanged(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_deviceChanged(t){this._configChanged({...this._config,device:t.detail.value})}_titleChanged(t){const e=t.target.value,i={...this._config};e?i.title=e:delete i.title,this._configChanged(i)}_fallbackDevices(){return Object.values(this.hass?.devices||{}).filter(lt).sort((t,e)=>(t.name||"").localeCompare(e.name||""))}render(){if(!this.hass)return L``;const t=this._fallbackDevices();return L`
      <div class="editor">
        <div class="field">
          <label>Receiver device</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{device:{integration:ct}}}
            .value=${this._config.device||""}
            @value-changed=${this._deviceChanged}
          ></ha-selector>
          ${0===t.length?L`
            <p class="help">No HK 3700/3770 device is registered. Add the Harman Kardon integration first.</p>
          `:L``}
        </div>
        <div class="field">
          <label for="title">Card title (optional)</label>
          <input
            id="title"
            type="text"
            .value=${this._config.title||""}
            placeholder="Harman Kardon"
            @change=${this._titleChanged}
          />
        </div>
        <p class="help">The card controls every entity belonging to the selected receiver device. It does not require an entity ID.</p>
      </div>
    `}static styles=o`
    :host { display: block; }
    .editor { display: grid; gap: 20px; padding: 8px 0; }
    .field { display: grid; gap: 8px; }
    label { color: var(--primary-text-color); font-weight: 500; }
    input { box-sizing: border-box; width: 100%; padding: 10px 12px; border: 1px solid var(--divider-color); border-radius: 4px; background: var(--card-background-color); color: var(--primary-text-color); font: inherit; }
    .help { margin: 0; color: var(--secondary-text-color); font-size: 0.9em; line-height: 1.45; }
  `}customElements.define("hk37xx-remote-card-editor",ht);const dt="hk37xx-remote-card",ut=["volume_up","volume_down","assign_analog","assign_digital","nav_up","nav_down","nav_exit","tune_up","tune_down","tuner_direct","tuner_mem","dim_display","menu","rds","speaker_a","speaker_b","harman_volume","auto_preset","tone"];function pt(t){return Array.from(t?.identifiers||[]).some(t=>Array.isArray(t)&&"hk37xx"===t[0])}function mt(t){const e=t?.unique_id||"",i=t?.entity_id||"",s=t?.translation_key||"";for(const t of["tuner_frequency",...ut,"player","source"])if(s===t||e.endsWith(`_${t}`)||i.endsWith(`_${t}`))return t}class _t extends rt{static properties={hass:{},config:{}};static getStubConfig(t){const e=Object.values(t?.devices||{}).find(pt);return e?{type:`custom:${dt}`,device:e.id}:{}}static getConfigElement(){return document.createElement("hk37xx-remote-card-editor")}setConfig(t){this.config={...t}}get _entities(){return this.hass&&this.config?.device?function(t,e){const i={};for(const[s,n]of Object.entries(t.entities||{})){if(n.device_id!==e)continue;const t=mt({...n,entity_id:s});t&&!i[t]&&(i[t]=s)}return i}(this.hass,this.config.device):{}}_call(t,e,i){this.hass&&this.hass.callService(t,e,i)}_press(t){const e=this._entities[t];e&&this._call("button","press",{entity_id:e})}_media(t,e={}){const i=this._entities.player;i&&this._call("media_player",t,{entity_id:i,...e})}_selectSource(t){const e=this._entities.source;e&&this._call("select","select_option",{entity_id:e,option:t.target.value})}_setFrequency(t){const e=Number(t.target.value),i=this._entities.tuner_frequency;i&&Number.isFinite(e)&&this._call("number","set_value",{entity_id:i,value:e})}_toggleMute(){const t=this.hass?.states?.[this._entities.player];this._media("volume_mute",{is_volume_muted:!t?.attributes?.is_volume_muted})}_sources(){const t=this.hass?.states?.[this._entities.source];return t?.attributes?.options||["FM","AM","Analog","Digital","USB","CD","Phono","Bluetooth","vTuner","Home Network","Cable Sat","STB","TV"]}_button(t,e,i=e,s){const n=this._entities[t];if(!n)return L``;const o=this.hass?.states?.[n]?.attributes?.icon||s;return L`<button class="control icon-button" title=${i} @click=${()=>this._press(t)}>
      ${o?L`<ha-icon icon=${o}></ha-icon>`:L``}<span>${e}</span>
    </button>`}render(){if(!this.hass||!this.config?.device)return L`<ha-card header="Harman Kardon Remote"><div class="message">Select a receiver device in the card configuration.</div></ha-card>`;const t=this._entities,e=this.hass.states[t.player],i=this.hass.states[t.source],s=this.hass.states[t.tuner_frequency],n=this.hass.devices?.[this.config.device],o=this.config.title||n?.name||"Harman Kardon",r=this._sources(),a=i?.state||r[0]||"",c=Boolean(e)&&!["off","unavailable","unknown"].includes(e.state);return L`
      <ha-card>
        <div class="card">
          <header>
            <div>
              <h2>${o}</h2>
              <p class="status">${c?"On":e?"Standby / unavailable":"Device entity unavailable"}</p>
            </div>
            <button class="power" ?disabled=${!c} title="Turn receiver off" @click=${()=>this._media("turn_off")}>⏻</button>
          </header>

          <section>
            <h3>Source</h3>
            <select .value=${a} @change=${this._selectSource} aria-label="Receiver source">
              ${r.map(t=>L`<option value=${t}>${t}</option>`)}
            </select>
            ${t.assign_analog||t.assign_digital?L`
              <div class="grid two">
                ${this._button("assign_analog","Analog","Cycle the analog RCA input assignment","mdi:audio-input-rca")}
                ${this._button("assign_digital","Digital","Cycle the digital coaxial or TOSLINK input assignment","mdi:toslink")}
              </div>
            `:L``}
          </section>

          <section>
            <h3>Volume</h3>
            <div class="grid three">
              <button class="control large icon-button" aria-label="Volume down" @click=${()=>this._media("volume_down")}>
                <ha-icon icon="mdi:volume-minus"></ha-icon><span>Volume down</span>
              </button>
              <button class="control large icon-button" aria-label=${e?.attributes?.is_volume_muted?"Unmute":"Mute"} @click=${()=>this._toggleMute()}>
                <ha-icon icon=${e?.attributes?.is_volume_muted?"mdi:volume-off":"mdi:volume-mute"}></ha-icon><span>${e?.attributes?.is_volume_muted?"Unmute":"Mute"}</span>
              </button>
              <button class="control large icon-button" aria-label="Volume up" @click=${()=>this._media("volume_up")}>
                <ha-icon icon="mdi:volume-plus"></ha-icon><span>Volume up</span>
              </button>
            </div>
          </section>

          ${t.tune_down||t.tune_up?L`
            <section>
              <h3>Channel / Tuner</h3>
              <div class="grid two">
                ${this._button("tune_down","Channel / tuner −","Tune down","mdi:access-point-minus")}
                ${this._button("tune_up","Channel / tuner +","Tune up","mdi:access-point-plus")}
              </div>
            </section>
          `:L``}

          <section>
            <h3>Tuner</h3>
            <div class="frequency">
              <input type="number" min="87.5" max="108" step="0.1" .value=${"unknown"!==s?.state&&s?.state||""} placeholder="87.5–108.0" aria-label="FM frequency in MHz" @change=${this._setFrequency} />
              <span>MHz</span>
            </div>
            <div class="grid three">
              ${this._button("tuner_direct","Direct","Tune to a frequency","mdi:tune")}
              ${this._button("tuner_mem","Memory","Tuner memory","mdi:content-save")}
              ${this._button("rds","RDS","Radio data system","mdi:radio-tower")}
            </div>
            <div class="grid two compact">
              ${this._button("auto_preset","Auto preset","Scan and save presets","mdi:auto-fix")}
              ${this._button("dim_display","Dim display","Dim receiver display","mdi:brightness-6")}
            </div>
          </section>

          <section>
            <h3>Menu</h3>
            <div class="grid four">
              ${this._button("nav_up","Up","Menu up","mdi:menu-up")}
              ${this._button("menu","Menu","Open menu","mdi:menu")}
              ${this._button("nav_down","Down","Menu down","mdi:menu-down")}
              ${this._button("nav_exit","Exit","Exit menu","mdi:arrow-left")}
            </div>
          </section>

          <section>
            <h3>Receiver</h3>
            <div class="grid four">
              ${this._button("speaker_a","Speaker A","Toggle speaker A","mdi:speaker")}
              ${this._button("speaker_b","Speaker B","Toggle speaker B","mdi:speaker-multiple")}
              ${this._button("harman_volume","Harman Volume","Toggle Harman volume mode","mdi:volume-equal")}
              ${this._button("tone","Tone Control","Open tone controls","mdi:equalizer")}
            </div>
          </section>

          ${t.player?L`
            <section>
              <h3>Playback</h3>
              <div class="grid four">
                <button class="control icon-button" aria-label="Previous track" title="Previous track" @click=${()=>this._media("previous_track")}><ha-icon icon="mdi:skip-previous"></ha-icon><span>Previous</span></button>
                <button class="control icon-button" aria-label="Stop" title="Stop" @click=${()=>this._media("stop")}><ha-icon icon="mdi:stop"></ha-icon><span>Stop</span></button>
                <button class="control icon-button" aria-label=${"playing"===e.state?"Pause":"Play"} title=${"playing"===e.state?"Pause":"Play"} @click=${()=>this._media("playing"===e.state?"pause":"play")}><ha-icon icon=${"playing"===e.state?"mdi:pause":"mdi:play"}></ha-icon><span>${"playing"===e.state?"Pause":"Play"}</span></button>
                <button class="control icon-button" aria-label="Next track" title="Next track" @click=${()=>this._media("next_track")}><ha-icon icon="mdi:skip-next"></ha-icon><span>Next</span></button>
              </div>
            </section>
          `:L``}
        </div>
      </ha-card>
    `}static styles=o`
    :host { display: block; }
    ha-card { overflow: hidden; }
    .card { display: grid; gap: 18px; padding: 18px; color: var(--primary-text-color, #f5f5f5); }
    header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .icon-button { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; }
    .icon-button ha-icon { --mdc-icon-size: 24px; }
    .icon-button span { line-height: 1.15; text-align: center; }
    h3 { margin-bottom: 9px; color: var(--secondary-text-color, #aeb4bd); font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    .status { margin-top: 4px; color: var(--secondary-text-color, #aeb4bd); font-size: .85rem; }
    .power { width: 52px; height: 52px; border: 0; border-radius: 50%; background: var(--primary-color, #03a9f4); color: var(--text-primary-color, #fff); font-size: 24px; cursor: pointer; }
    .power:disabled { background: var(--disabled-color, #777); opacity: .45; cursor: not-allowed; }
    .grid { display: grid; gap: 10px; }
    .grid.two { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 10px; }
    .grid.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .grid.four { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .grid.five { grid-template-columns: repeat(5, minmax(0, 1fr)); }
    .compact { margin-top: 10px; }
    .control, select, input { box-sizing: border-box; min-height: 52px; width: 100%; border: 1px solid var(--divider-color, #59616b); border-radius: 12px; background: var(--secondary-background-color, #30343a); color: var(--primary-text-color, #f5f5f5); font: inherit; }
    .control:hover { border-color: var(--primary-color, #03a9f4); }
    .control:active { transform: translateY(1px); }
    .large { min-height: 60px; }
    select, input { padding: 0 13px; }
    .frequency { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 9px; margin-bottom: 10px; }
    .frequency span { color: var(--secondary-text-color); font-size: .9rem; }
    .message { padding: 18px; color: var(--secondary-text-color); }
    @media (max-width: 420px) {
      .card { padding: 14px; }
      .grid.four { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .grid.five { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
  `}customElements.define(dt,_t),window.customCards=window.customCards||[],window.customCards.push({type:dt,name:"Harman Kardon HK 3700/3770 Remote",description:"A simple, touch-friendly receiver control card configured by device.",preview:!1,documentationUrl:"https://github.com/wongy123/harman-kardon-stereo-receiver-remote-card"});
