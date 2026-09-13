/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new o(i,t,s)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,g=_?_.emptyScript:"",m=u.reactiveElementPolyfillSupport,f=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},v=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);o?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),o=t.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const r=o.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const r=this.constructor;if(!1===i&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??v)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[f("elementProperties")]=new Map,y[f("finalized")]=new Map,m?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=t=>t,w=x.trustedTypes,E=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,N=`<${C}>`,T=document,U=()=>T.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,H="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,D=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,L=/"/g,I=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),K=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),q=new WeakMap,W=T.createTreeWalker(T,129);function F(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Y=(t,e)=>{const s=t.length-1,i=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=M;for(let e=0;e<s;e++){const s=t[e];let a,c,l=-1,d=0;for(;d<s.length&&(n.lastIndex=d,c=n.exec(s),null!==c);)d=n.lastIndex,n===M?"!--"===c[1]?n=R:void 0!==c[1]?n=z:void 0!==c[2]?(I.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=D):void 0!==c[3]&&(n=D):n===D?">"===c[0]?(n=o??M,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?D:'"'===c[3]?L:B):n===L||n===B?n=D:n===R||n===z?n=M:(n=D,o=void 0);const h=n===D&&t[e+1].startsWith("/>")?" ":"";r+=n===M?s+N:l>=0?(i.push(a),s.slice(0,l)+k+s.slice(l)+S+h):s+S+(-2===l?e:h)}return[F(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,l]=Y(t,e);if(this.el=J.createElement(c,s),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=W.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(k)){const e=l[r++],s=i.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:s,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?st:X}),i.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(I.test(i.tagName)){const t=i.textContent.split(S),e=t.length-1;if(e>0){i.textContent=w?w.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],U()),W.nextNode(),a.push({type:2,index:++o});i.append(t[e],U())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(S,t+1));)a.push({type:7,index:o}),t+=S.length-1}o++}}static createElement(t,e){const s=T.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===K)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const r=P(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,i)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??T).importNode(e,!0);W.currentNode=i;let o=W.nextNode(),r=0,n=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new it(o,this,t)),this._$AV.push(e),a=s[++n]}r!==a?.index&&(o=W.nextNode(),r++)}return W.currentNode=T,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),P(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=J.createElement(F(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new G(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new J(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new Q(this.O(U()),this.O(U()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(void 0===o)t=Z(this,t,e,0),r=!P(t)||t!==this._$AH&&t!==K,r&&(this._$AH=t);else{const i=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Z(this,i[s+n],e,n),a===K&&(a=this._$AH[n]),r||=!P(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends X{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??V)===K)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const ot=x.litHtmlPolyfillSupport;ot?.(J,Q),(x.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new Q(e.insertBefore(U(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const at=rt.litElementPolyfillSupport;at?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.2");const ct="hk37xx";function lt(t){const e=t?.identifiers||[];return Array.from(e).some(t=>Array.isArray(t)&&t[0]===ct)}class dt extends nt{static properties={hass:{},_config:{}};constructor(){super(),this._config={}}setConfig(t){this._config={...t}}_configChanged(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_deviceChanged(t){this._configChanged({...this._config,device:t.detail.value})}_titleChanged(t){const e=t.target.value,s={...this._config};e?s.title=e:delete s.title,this._configChanged(s)}_fallbackDevices(){return Object.values(this.hass?.devices||{}).filter(lt).sort((t,e)=>(t.name||"").localeCompare(e.name||""))}render(){if(!this.hass)return j``;const t=this._fallbackDevices();return j`
      <div class="editor">
        <div class="field">
          <label>Receiver device</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{device:{integration:ct}}}
            .value=${this._config.device||""}
            @value-changed=${this._deviceChanged}
          ></ha-selector>
          ${0===t.length?j`
            <p class="help">No HK 3700/3770 device is registered. Add the Harman Kardon integration first.</p>
          `:j``}
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
    `}static styles=r`
    :host { display: block; }
    .editor { display: grid; gap: 20px; padding: 8px 0; }
    .field { display: grid; gap: 8px; }
    label { color: var(--primary-text-color); font-weight: 500; }
    input { box-sizing: border-box; width: 100%; padding: 10px 12px; border: 1px solid var(--divider-color); border-radius: 4px; background: var(--card-background-color); color: var(--primary-text-color); font: inherit; }
    .help { margin: 0; color: var(--secondary-text-color); font-size: 0.9em; line-height: 1.45; }
  `}customElements.define("hk37xx-remote-card-editor",dt);const ht="hk37xx-remote-card",pt=["volume_up","volume_down","nav_up","nav_down","nav_exit","tune_up","tune_down","tuner_direct","tuner_mem","dim_display","menu","rds","speaker_a","speaker_b","harman_volume","auto_preset","tone","assign_analog","assign_digital"];function ut(t){const e=t?.unique_id||"",s=t?.entity_id||"";for(const t of["tuner_frequency","volume_up","volume_down",...pt,"player","source"])if(e.endsWith(`_${t}`)||s.endsWith(`_${t}`))return t}function _t(t){return Array.from(t?.identifiers||[]).some(t=>Array.isArray(t)&&"hk37xx"===t[0])}class gt extends nt{static properties={hass:{},config:{}};static getStubConfig(t){const e=Object.values(t?.devices||{}).find(_t);return e?{type:`custom:${ht}`,device:e.id}:{}}static getConfigElement(){return document.createElement("hk37xx-remote-card-editor")}setConfig(t){this.config={...t}}get _entities(){return this.hass&&this.config?.device?function(t,e){const s={};for(const[i,o]of Object.entries(t.entities||{})){if(o.device_id!==e)continue;const t=ut({...o,entity_id:i});t&&!s[t]&&(s[t]=i)}return s}(this.hass,this.config.device):{}}_call(t,e,s){this.hass&&this.hass.callService(t,e,s)}_press(t){const e=this._entities[t];e&&this._call("button","press",{entity_id:e})}_media(t,e={}){const s=this._entities.player;s&&this._call("media_player",t,{entity_id:s,...e})}_selectSource(t){const e=this._entities.source;e&&this._call("select","select_option",{entity_id:e,option:t.target.value})}_setFrequency(t){const e=Number(t.target.value),s=this._entities.tuner_frequency;s&&Number.isFinite(e)&&this._call("number","set_value",{entity_id:s,value:e})}_toggleMute(){const t=this.hass?.states?.[this._entities.player];this._media("volume_mute",{is_volume_muted:!t?.attributes?.is_volume_muted})}_sources(){const t=this.hass?.states?.[this._entities.source];return t?.attributes?.options||["FM","AM","Analog","Digital","USB","CD","Phono","Bluetooth","vTuner","Home Network","Cable Sat","STB","TV"]}render(){if(!this.hass||!this.config?.device)return j`<ha-card header="Harman Kardon Remote"><div class="message">Select a receiver device in the card configuration.</div></ha-card>`;const t=this._entities,e=this.hass.states[t.player],s=this.hass.states[t.source],i=this.hass.states[t.tuner_frequency],o=Boolean(e),r="on"===e?.state,n=s?.state||s?.attributes?.current_option||"FM",a=this._sources(),c=this.hass.devices?.[this.config.device],l=this.config.title||c?.name||"Harman Kardon";return j`
      <ha-card>
        <div class="remote" aria-label="${l} remote control">
          <div class="remote-top">
            <div class="brand">HARMAN<span>/</span>KARDON</div>
            <button class="power" title="Turn receiver off" aria-label="Turn receiver off" @click=${()=>this._media("turn_off")} ?disabled=${!r}>⏻</button>
          </div>

          <div class="lcd" aria-live="polite">
            <div class="lcd-source">${n}</div>
            <div class="lcd-value">${i?.state&&"unknown"!==i.state?`${i.state} MHz`:r?"ON":"STANDBY"}</div>
            <div class="lcd-status">${o?r?"NETWORK READY":"STANDBY":"DEVICE UNAVAILABLE"}</div>
          </div>

          <div class="source-row">
            ${["FM","AM","CD","USB","BT","TV"].map(t=>j`
              <button class="key source-key ${n===("BT"===t?"Bluetooth":t)?"selected":""}" @click=${()=>this._selectNamedSource(t)}>${t}</button>
            `)}
          </div>

          <div class="control-row">
            <button class="key wide" @click=${()=>this._media("volume_down")}>VOL −</button>
            <button class="key wide" @click=${()=>this._toggleMute()}>MUTE</button>
            <button class="key wide" @click=${()=>this._media("volume_up")}>VOL +</button>
          </div>

          <div class="source-select-row">
            <label for="hk-source">SOURCE</label>
            <select id="hk-source" .value=${n} @change=${t=>this._selectSource(t)}>
              ${a.map(t=>j`<option value=${t}>${t}</option>`)}
            </select>
          </div>

          <div class="section-label">TUNER</div>
          <div class="tuner-display">
            <input type="number" min="87.5" max="108" step="0.1" .value=${"unknown"!==i?.state&&i?.state||""} placeholder="87.5–108.0" @change=${t=>this._setFrequency(t)} />
            <span>MHz</span>
          </div>
          <div class="tuner-row">
            <button class="key" @click=${()=>this._press("tune_down")}>TUNE −</button>
            <button class="key accent" @click=${()=>this._press("tuner_direct")}>DIRECT</button>
            <button class="key" @click=${()=>this._press("tune_up")}>TUNE +</button>
          </div>
          <div class="tuner-row compact">
            <button class="key" @click=${()=>this._press("tuner_mem")}>MEM</button>
            <button class="key" @click=${()=>this._press("auto_preset")}>AUTO</button>
            <button class="key" @click=${()=>this._press("rds")}>RDS</button>
          </div>

          <div class="section-label">NAVIGATION</div>
          <div class="navigation">
            <button class="key nav-up" @click=${()=>this._press("nav_up")}>▲</button>
            <button class="key nav-left" @click=${()=>this._press("nav_exit")}>◀</button>
            <button class="nav-ok" @click=${()=>this._press("menu")}>MENU</button>
            <button class="key nav-right" @click=${()=>this._press("menu")}>▶</button>
            <button class="key nav-down" @click=${()=>this._press("nav_down")}>▼</button>
          </div>

          <div class="bottom-row">
            <button class="key" @click=${()=>this._press("speaker_a")}>SPEAKER A</button>
            <button class="key" @click=${()=>this._press("speaker_b")}>SPEAKER B</button>
            <button class="key" @click=${()=>this._press("harman_volume")}>VOL EQ</button>
            <button class="key" @click=${()=>this._press("tone")}>TONE</button>
            <button class="key" @click=${()=>this._press("dim_display")}>DIM</button>
          </div>
        </div>
      </ha-card>
    `}_selectNamedSource(t){const e={BT:"Bluetooth"}[t]||t,s=this._sources().find(t=>t.toLowerCase()===e.toLowerCase());s&&this._call("select","select_option",{entity_id:this._entities.source,option:s})}static styles=r`
    :host { display: block; }
    ha-card { overflow: hidden; background: transparent; box-shadow: none; }
    .remote { box-sizing: border-box; max-width: 360px; margin: 0 auto; padding: 18px 16px 22px; border: 1px solid #3f4248; border-radius: 32px; background: linear-gradient(155deg, #292c31 0%, #17191c 45%, #0c0d0f 100%); box-shadow: inset 0 1px 1px #62666d, inset 0 -3px 8px #050505, 0 8px 18px #0008; color: #d5d7da; }
    .remote-top { display: flex; align-items: center; justify-content: space-between; padding: 0 8px 14px; }
    .brand { color: #b9bdc1; font-family: Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .18em; }
    .brand span { color: #81868d; padding: 0 2px; }
    button { font: inherit; }
    .power { width: 34px; height: 34px; border: 1px solid #5d636b; border-radius: 50%; background: #202328; color: #d95b55; font-size: 20px; line-height: 1; cursor: pointer; box-shadow: inset 0 1px 2px #000, 0 1px 2px #000; }
    .power:disabled { color: #696d72; opacity: .55; cursor: default; }
    .lcd { margin: 0 8px 15px; padding: 10px 13px 8px; border: 2px solid #050606; border-radius: 5px; background: linear-gradient(#34413a, #202a25); box-shadow: inset 0 0 10px #050806; color: #a9d6a0; font-family: 'Courier New', monospace; text-align: right; text-shadow: 0 0 4px #9bd79a; }
    .lcd-source { min-height: 16px; font-size: 11px; letter-spacing: .14em; text-transform: uppercase; }
    .lcd-value { min-height: 28px; font-size: 21px; font-weight: 700; letter-spacing: .08em; }
    .lcd-status { color: #759a76; font-size: 8px; letter-spacing: .13em; }
    .source-row, .control-row, .tuner-row, .bottom-row { display: grid; gap: 7px; }
    .source-row { grid-template-columns: repeat(6, 1fr); }
    .control-row { grid-template-columns: repeat(3, 1fr); margin: 12px 0; }
    .key { min-height: 34px; padding: 6px 4px; border: 1px solid #484d54; border-radius: 6px; background: linear-gradient(#3c4046, #24272b); color: #d2d4d6; box-shadow: inset 0 1px 1px #74787d55, 0 2px 2px #0008; cursor: pointer; font-size: 10px; font-weight: 700; letter-spacing: .04em; text-shadow: 0 1px 1px #000; }
    .key:hover { background: linear-gradient(#50555c, #2e3237); }
    .key:active, .key.selected { border-color: #9caa8d; background: linear-gradient(#67725e, #414b3d); color: #f2f6e8; }
    .key:focus-visible, .power:focus-visible, .nav-ok:focus-visible { outline: 2px solid #a8c7ff; outline-offset: 2px; }
    .source-key { min-height: 29px; font-size: 9px; }
    .wide { min-height: 39px; }
    .source-select-row { display: grid; grid-template-columns: 55px 1fr; align-items: center; gap: 9px; margin: 4px 0 14px; color: #858b92; font-size: 9px; font-weight: 700; letter-spacing: .1em; }
    select, input { box-sizing: border-box; width: 100%; border: 1px solid #4e545b; border-radius: 5px; background: #17191b; color: #d7dbd5; padding: 7px 8px; font: 12px 'Courier New', monospace; }
    .section-label { margin: 11px 3px 6px; color: #747a81; font-size: 9px; font-weight: 700; letter-spacing: .2em; }
    .tuner-display { display: grid; grid-template-columns: 1fr 34px; align-items: center; gap: 7px; margin-bottom: 7px; }
    .tuner-display span { color: #8d949a; font: 10px 'Courier New', monospace; }
    .tuner-row { grid-template-columns: repeat(3, 1fr); }
    .tuner-row.compact { margin-top: 7px; }
    .accent { border-color: #a49b68; color: #e7d98a; }
    .navigation { display: grid; grid-template: repeat(3, 38px) / repeat(3, 1fr); gap: 5px; max-width: 170px; margin: 0 auto 12px; }
    .navigation .key { border-radius: 50%; min-height: 0; padding: 0; }
    .nav-up { grid-area: 1 / 2; }
    .nav-left { grid-area: 2 / 1; }
    .nav-ok { grid-area: 2 / 2; border: 1px solid #646970; border-radius: 50%; background: #131518; color: #d2d5d8; font-size: 9px; cursor: pointer; box-shadow: inset 0 1px 2px #000, 0 2px 2px #0008; }
    .nav-right { grid-area: 2 / 3; }
    .nav-down { grid-area: 3 / 2; }
    .bottom-row { grid-template-columns: repeat(5, 1fr); }
    .bottom-row .key { min-height: 31px; font-size: 8px; }
    .message { padding: 18px; color: var(--secondary-text-color); }
  `}customElements.define(ht,gt),window.customCards=window.customCards||[],window.customCards.push({type:ht,name:"Harman Kardon HK 3700/3770 Remote",description:"A remote-shaped control for a Harman Kardon HK 3700/3770 receiver.",preview:!1,documentationUrl:"https://github.com/wongy123/harman-kardon-stereo-receiver-remote-card"});
