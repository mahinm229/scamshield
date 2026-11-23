const me=()=>{};var z={};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const ee=function(t){const e=[];let r=0;for(let n=0;n<t.length;n++){let a=t.charCodeAt(n);a<128?e[r++]=a:a<2048?(e[r++]=a>>6|192,e[r++]=a&63|128):(a&64512)===55296&&n+1<t.length&&(t.charCodeAt(n+1)&64512)===56320?(a=65536+((a&1023)<<10)+(t.charCodeAt(++n)&1023),e[r++]=a>>18|240,e[r++]=a>>12&63|128,e[r++]=a>>6&63|128,e[r++]=a&63|128):(e[r++]=a>>12|224,e[r++]=a>>6&63|128,e[r++]=a&63|128)}return e},be=function(t){const e=[];let r=0,n=0;for(;r<t.length;){const a=t[r++];if(a<128)e[n++]=String.fromCharCode(a);else if(a>191&&a<224){const i=t[r++];e[n++]=String.fromCharCode((a&31)<<6|i&63)}else if(a>239&&a<365){const i=t[r++],s=t[r++],c=t[r++],o=((a&7)<<18|(i&63)<<12|(s&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(o>>10)),e[n++]=String.fromCharCode(56320+(o&1023))}else{const i=t[r++],s=t[r++];e[n++]=String.fromCharCode((a&15)<<12|(i&63)<<6|s&63)}}return e.join("")},te={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const r=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let a=0;a<t.length;a+=3){const i=t[a],s=a+1<t.length,c=s?t[a+1]:0,o=a+2<t.length,h=o?t[a+2]:0,p=i>>2,b=(i&3)<<4|c>>4;let E=(c&15)<<2|h>>6,x=h&63;o||(x=64,s||(E=64)),n.push(r[p],r[b],r[E],r[x])}return n.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ee(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):be(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const r=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let a=0;a<t.length;){const i=r[t.charAt(a++)],s=a<t.length?r[t.charAt(a)]:0;++a;const c=a<t.length?r[t.charAt(a)]:64;++a;const o=a<t.length?r[t.charAt(a)]:64;if(++a,i==null||s==null||c==null||o==null)throw new ye;const h=i<<2|s>>4;if(n.push(h),c!==64){const p=s<<4&240|c>>2;if(n.push(p),o!==64){const b=c<<6&192|o;n.push(b)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class ye extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const we=function(t){const e=ee(t);return te.encodeByteArray(e,!0)},re=function(t){return we(t).replace(/\./g,"")},S=function(t){try{return te.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Xt(t){return ne(void 0,t)}function ne(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const r=e;return new Date(r.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const r in e)!e.hasOwnProperty(r)||!_e(r)||(t[r]=ne(t[r],e[r]));return t}function _e(t){return t!=="__proto__"}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function ve(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const Ee=()=>ve().__FIREBASE_DEFAULTS__,Ce=()=>{if(typeof process>"u"||typeof z>"u")return;const t=z.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},De=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&S(t[1]);return e&&JSON.parse(e)},Se=()=>{try{return me()||Ee()||Ce()||De()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},F=()=>Se()?.config;/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Ie{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,r)=>{this.resolve=e,this.reject=r})}wrapCallback(e){return(r,n)=>{r?this.reject(r):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(r):e(r,n))}}}function Oe(){return typeof window<"u"||ae()}function ae(){return typeof WorkerGlobalScope<"u"&&typeof self<"u"&&self instanceof WorkerGlobalScope}function Ae(){try{return typeof indexedDB=="object"}catch{return!1}}function Le(){return new Promise((t,e)=>{try{let r=!0;const n="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(n);a.onsuccess=()=>{a.result.close(),r||self.indexedDB.deleteDatabase(n),t(!0)},a.onupgradeneeded=()=>{r=!1},a.onerror=()=>{e(a.error?.message||"")}}catch(r){e(r)}})}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const Be="FirebaseError";class v extends Error{constructor(e,r,n){super(r),this.code=e,this.customData=n,this.name=Be,Object.setPrototypeOf(this,v.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ie.prototype.create)}}class ie{constructor(e,r,n){this.service=e,this.serviceName=r,this.errors=n}create(e,...r){const n=r[0]||{},a=`${this.service}/${e}`,i=this.errors[e],s=i?Te(i,n):"Error",c=`${this.serviceName}: ${s} (${a}).`;return new v(a,c,n)}}function Te(t,e){try{let r=0,n="";for(;r<t.length;){const a=t.indexOf("{$",r);if(a===-1){n+=t.substring(r);break}const i=t.indexOf("}",a+2);if(i===-1){n+=t.substring(r);break}const s=t.substring(a+2,i),c=e[s];n+=t.substring(r,a)+(c!=null?String(c):`<${s}?>`),r=i+1}return n}catch{return t}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function U(t){return JSON.parse(t)}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const Ne=function(t){let e={},r={},n={},a="";try{const i=t.split(".");e=U(S(i[0])||""),r=U(S(i[1])||""),a=i[2],n=r.d||{},delete r.d}catch{}return{header:e,claims:r,data:n,signature:a}},Qt=function(t){const e=Ne(t).claims;return typeof e=="object"&&e.hasOwnProperty("iat")?e.iat:null};function R(t,e){if(t===e)return!0;const r=Object.keys(t),n=Object.keys(e);for(const a of r){if(!n.includes(a))return!1;const i=t[a],s=e[a];if(W(i)&&W(s)){if(!R(i,s))return!1}else if(i!==s)return!1}for(const a of n)if(!r.includes(a))return!1;return!0}function W(t){return t!==null&&typeof t=="object"}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const Re=1e3,ke=2,Me=14400*1e3,$e=.5;function er(t,e=Re,r=ke){const n=e*Math.pow(r,t),a=Math.round($e*n*(Math.random()-.5)*2);return Math.min(Me,n+a)}/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function tr(t){return t&&t._delegate?t._delegate:t}class I{constructor(e,r,n){this.name=e,this.instanceFactory=r,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const g="[DEFAULT]";/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class Pe{constructor(e,r){this.name=e,this.container=r,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const r=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(r)){const n=new Ie;if(this.instancesDeferred.set(r,n),this.isInitialized(r)||this.shouldAutoInitialize())try{const a=this.getOrInitializeService({instanceIdentifier:r});a&&n.resolve(a)}catch{}}return this.instancesDeferred.get(r).promise}getImmediate(e){const r=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(a){if(n)return null;throw a}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Fe(e))try{this.getOrInitializeService({instanceIdentifier:g})}catch{}for(const[r,n]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);try{const i=this.getOrInitializeService({instanceIdentifier:a});n.resolve(i)}catch{}}}}clearInstance(e=g){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(r=>"INTERNAL"in r).map(r=>r.INTERNAL.delete()),...e.filter(r=>"_delete"in r).map(r=>r._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=g){return this.instances.has(e)}getOptions(e=g){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:r={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const a=this.getOrInitializeService({instanceIdentifier:n,options:r});for(const[i,s]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);n===c&&s.resolve(a)}return a}onInit(e,r){const n=this.normalizeInstanceIdentifier(r),a=this.onInitCallbacks.get(n)??new Set;a.add(e),this.onInitCallbacks.set(n,a);const i=this.instances.get(n);return i&&e(i,n),()=>{a.delete(e)}}invokeOnInitCallbacks(e,r){const n=this.onInitCallbacks.get(r);if(n)for(const a of n)try{a(e,r)}catch{}}getOrInitializeService({instanceIdentifier:e,options:r={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:He(e),options:r}),this.instances.set(e,n),this.instancesOptions.set(e,r),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=g){return this.component?this.component.multipleInstances?e:g:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function He(t){return t===g?void 0:t}function Fe(t){return t.instantiationMode==="EAGER"}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class se{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const r=this.getProvider(e.name);if(r.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);r.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const r=new Pe(e,this);return this.providers.set(e,r),r}getProviders(){return Array.from(this.providers.values())}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const j=[];var l;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(l||(l={}));const oe={debug:l.DEBUG,verbose:l.VERBOSE,info:l.INFO,warn:l.WARN,error:l.ERROR,silent:l.SILENT},je=l.INFO,Ve={[l.DEBUG]:"log",[l.VERBOSE]:"log",[l.INFO]:"info",[l.WARN]:"warn",[l.ERROR]:"error"},xe=(t,e,...r)=>{if(e<t.logLevel)return;const n=new Date().toISOString(),a=Ve[e];if(a)console[a](`[${n}]  ${t.name}:`,...r);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ze{constructor(e){this.name=e,this._logLevel=je,this._logHandler=xe,this._userLogHandler=null,j.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in l))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?oe[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,l.DEBUG,...e),this._logHandler(this,l.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,l.VERBOSE,...e),this._logHandler(this,l.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,l.INFO,...e),this._logHandler(this,l.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,l.WARN,...e),this._logHandler(this,l.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,l.ERROR,...e),this._logHandler(this,l.ERROR,...e)}}function Ue(t){j.forEach(e=>{e.setLogLevel(t)})}function We(t,e){for(const r of j){let n=null;e&&e.level&&(n=oe[e.level]),t===null?r.userLogHandler=null:r.userLogHandler=(a,i,...s)=>{const c=s.map(o=>{if(o==null)return null;if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return o.toString();if(o instanceof Error)return o.message;try{return JSON.stringify(o)}catch{return null}}).filter(o=>o).join(" ");i>=(n??a.logLevel)&&t({level:l[i].toLowerCase(),message:c,args:s,type:a.name})}}}const Je=(t,e)=>e.some(r=>t instanceof r);let J,G;function Ge(){return J||(J=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ke(){return G||(G=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ce=new WeakMap,k=new WeakMap,le=new WeakMap,L=new WeakMap,V=new WeakMap;function qe(t){const e=new Promise((r,n)=>{const a=()=>{t.removeEventListener("success",i),t.removeEventListener("error",s)},i=()=>{r(d(t.result)),a()},s=()=>{n(t.error),a()};t.addEventListener("success",i),t.addEventListener("error",s)});return e.then(r=>{r instanceof IDBCursor&&ce.set(r,t)}).catch(()=>{}),V.set(e,t),e}function Ye(t){if(k.has(t))return;const e=new Promise((r,n)=>{const a=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",s),t.removeEventListener("abort",s)},i=()=>{r(),a()},s=()=>{n(t.error||new DOMException("AbortError","AbortError")),a()};t.addEventListener("complete",i),t.addEventListener("error",s),t.addEventListener("abort",s)});k.set(t,e)}let M={get(t,e,r){if(t instanceof IDBTransaction){if(e==="done")return k.get(t);if(e==="objectStoreNames")return t.objectStoreNames||le.get(t);if(e==="store")return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return d(t[e])},set(t,e,r){return t[e]=r,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Ze(t){M=t(M)}function Xe(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...r){const n=t.call(B(this),e,...r);return le.set(n,e.sort?e.sort():[e]),d(n)}:Ke().includes(t)?function(...e){return t.apply(B(this),e),d(ce.get(this))}:function(...e){return d(t.apply(B(this),e))}}function Qe(t){return typeof t=="function"?Xe(t):(t instanceof IDBTransaction&&Ye(t),Je(t,Ge())?new Proxy(t,M):t)}function d(t){if(t instanceof IDBRequest)return qe(t);if(L.has(t))return L.get(t);const e=Qe(t);return e!==t&&(L.set(t,e),V.set(e,t)),e}const B=t=>V.get(t);function et(t,e,{blocked:r,upgrade:n,blocking:a,terminated:i}={}){const s=indexedDB.open(t,e),c=d(s);return n&&s.addEventListener("upgradeneeded",o=>{n(d(s.result),o.oldVersion,o.newVersion,d(s.transaction),o)}),r&&s.addEventListener("blocked",o=>r(o.oldVersion,o.newVersion,o)),c.then(o=>{i&&o.addEventListener("close",()=>i()),a&&o.addEventListener("versionchange",h=>a(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const tt=["get","getKey","getAll","getAllKeys","count"],rt=["put","add","delete","clear"],T=new Map;function K(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(T.get(e))return T.get(e);const r=e.replace(/FromIndex$/,""),n=e!==r,a=rt.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!(a||tt.includes(r)))return;const i=async function(s,...c){const o=this.transaction(s,a?"readwrite":"readonly");let h=o.store;return n&&(h=h.index(c.shift())),(await Promise.all([h[r](...c),a&&o.done]))[0]};return T.set(e,i),i}Ze(t=>({...t,get:(e,r,n)=>K(e,r)||t.get(e,r,n),has:(e,r)=>!!K(e,r)||t.has(e,r)}));/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class nt{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(at(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function at(t){return t.getComponent()?.type==="VERSION"}const O="@firebase/app",$="0.16.7";/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const f=new ze("@firebase/app"),it="@firebase/app-compat",st="@firebase/analytics-compat",ot="@firebase/analytics",ct="@firebase/app-check-compat",lt="@firebase/app-check",ht="@firebase/auth",ut="@firebase/auth-compat",ft="@firebase/crashlytics",dt="@firebase/database",pt="@firebase/data-connect",gt="@firebase/database-compat",mt="@firebase/functions",bt="@firebase/functions-compat",yt="@firebase/installations",wt="@firebase/installations-compat",_t="@firebase/messaging",vt="@firebase/messaging-compat",Et="@firebase/performance",Ct="@firebase/performance-compat",Dt="@firebase/remote-config",St="@firebase/remote-config-compat",It="@firebase/storage",Ot="@firebase/storage-compat",At="@firebase/firestore",Lt="@firebase/ai",Bt="@firebase/firestore-compat",Tt="firebase",Nt="13.4.0";/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const A="[DEFAULT]",Rt={[O]:"fire-core",[it]:"fire-core-compat",[ot]:"fire-analytics",[st]:"fire-analytics-compat",[lt]:"fire-app-check",[ct]:"fire-app-check-compat",[ht]:"fire-auth",[ut]:"fire-auth-compat",[ft]:"fire-cls",[dt]:"fire-rtdb",[pt]:"fire-data-connect",[gt]:"fire-rtdb-compat",[mt]:"fire-fn",[bt]:"fire-fn-compat",[yt]:"fire-iid",[wt]:"fire-iid-compat",[_t]:"fire-fcm",[vt]:"fire-fcm-compat",[Et]:"fire-perf",[Ct]:"fire-perf-compat",[Dt]:"fire-rc",[St]:"fire-rc-compat",[It]:"fire-gcs",[Ot]:"fire-gcs-compat",[At]:"fire-fst",[Bt]:"fire-fst-compat",[Lt]:"fire-vertex","fire-js":"fire-js",[Tt]:"fire-js-all"};/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const m=new Map,y=new Map,w=new Map;function q(t,e){try{t.container.addComponent(e)}catch(r){f.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,r)}}function rr(t,e){t.container.addOrOverwriteComponent(e)}function P(t){const e=t.name;if(w.has(e))return f.debug(`There were multiple attempts to register component ${e}.`),!1;w.set(e,t);for(const r of m.values())q(r,t);for(const r of y.values())q(r,t);return!0}function kt(t,e){const r=t.container.getProvider("heartbeat").getImmediate({optional:!0});return r&&r.triggerHeartbeat(),t.container.getProvider(e)}function nr(t,e,r=A){kt(t,e).clearInstance(r)}function he(t){return t.options!==void 0}function Mt(t){return he(t)?!1:"authIdToken"in t||"appCheckToken"in t||"releaseOnDeref"in t||"automaticDataCollectionEnabled"in t}function ar(t){return t==null?!1:t.settings!==void 0}function ir(){w.clear()}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const $t={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},u=new ie("app","Firebase",$t);/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/class ue{constructor(e,r,n){this._isDeleted=!1,this._options={...e},this._config={...r},this._name=r.name,this._automaticDataCollectionEnabled=r.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new I("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw u.create("app-deleted",{appName:this._name})}}/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Y(t,e){const r=S(t.split(".")[1]);if(r===null){console.error(`FirebaseServerApp ${e} is invalid: second part could not be parsed.`);return}if(JSON.parse(r).exp===void 0){console.error(`FirebaseServerApp ${e} is invalid: expiration claim could not be parsed`);return}const n=JSON.parse(r).exp*1e3,a=new Date().getTime();n-a<=0&&console.error(`FirebaseServerApp ${e} is invalid: the token has expired.`)}class Pt extends ue{constructor(e,r,n,a){const i=r.automaticDataCollectionEnabled!==void 0?r.automaticDataCollectionEnabled:!0,s={name:n,automaticDataCollectionEnabled:i};if(e.apiKey!==void 0)super(e,s,a);else{const c=e;super(c.options,s,a)}this._serverConfig={automaticDataCollectionEnabled:i,...r},this._serverConfig.authIdToken&&Y(this._serverConfig.authIdToken,"authIdToken"),this._serverConfig.appCheckToken&&Y(this._serverConfig.appCheckToken,"appCheckToken"),this._finalizationRegistry=null,typeof FinalizationRegistry<"u"&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,r.releaseOnDeref=void 0,D(O,$,"serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,e!==void 0&&this._finalizationRegistry!==null&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){this.isDeleted||Ft(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw u.create("server-app-deleted")}}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const sr=Nt;function Ht(t,e={}){let r=t;typeof e!="object"&&(e={name:e});const n={name:A,automaticDataCollectionEnabled:!0,...e},a=n.name;if(typeof a!="string"||!a)throw u.create("bad-app-name",{appName:String(a)});if(r||(r=F()),!r)throw u.create("no-options");const i=m.get(a);if(i)if(R(r,i.options)){if(R(n,i.config))return i;throw u.create("duplicate-app",{appName:a,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(n)})}else throw u.create("duplicate-app",{appName:a,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(r)});const s=new se(a);for(const o of w.values())s.addComponent(o);const c=new ue(r,n,s);return m.set(a,c),c}function or(t,e={}){if(Oe()&&!ae())throw u.create("invalid-server-app-environment");let r,n=e||{};if(t&&(he(t)?r=t.options:Mt(t)?n=t:r=t),n.automaticDataCollectionEnabled===void 0&&(n.automaticDataCollectionEnabled=!0),r||(r=F()),!r)throw u.create("no-options");const a={...n,...r};a.releaseOnDeref!==void 0&&delete a.releaseOnDeref;const i=p=>[...p].reduce((b,E)=>Math.imul(31,b)+E.charCodeAt(0)|0,0);if(n.releaseOnDeref!==void 0&&typeof FinalizationRegistry>"u")throw u.create("finalization-registry-not-supported",{});const s=""+i(JSON.stringify(a)),c=y.get(s);if(c)return c.incRefCount(n.releaseOnDeref),c;const o=new se(s);for(const p of w.values())o.addComponent(p);const h=new Pt(r,n,s,o);return y.set(s,h),h}function cr(t=A){const e=m.get(t);if(!e&&t===A&&F())return Ht();if(!e)throw u.create("no-app",{appName:t});return e}function lr(){return Array.from(m.values())}async function Ft(t){let e=!1;const r=t.name;m.has(r)?(e=!0,m.delete(r)):y.has(r)&&t.decRefCount()<=0&&(y.delete(r),e=!0),e&&(await Promise.all(t.container.getProviders().map(n=>n.delete())),t.isDeleted=!0)}function D(t,e,r){let n=Rt[t]??t;r&&(n+=`-${r}`);const a=n.match(/\s|\//),i=e.match(/\s|\//);if(a||i){const s=[`Unable to register library "${n}" with version "${e}":`];a&&s.push(`library name "${n}" contains illegal characters (whitespace or "/")`),a&&i&&s.push("and"),i&&s.push(`version name "${e}" contains illegal characters (whitespace or "/")`),f.warn(s.join(" "));return}P(new I(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}function hr(t,e){if(t!==null&&typeof t!="function")throw u.create("invalid-log-argument");We(t,e)}function ur(t){Ue(t)}/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const jt="firebase-heartbeat-database",Vt=1,_="firebase-heartbeat-store";let N=null;function fe(){return N||(N=et(jt,Vt,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(_)}catch(r){console.warn(r)}}}}).catch(t=>{throw u.create("idb-open",{originalErrorMessage:t.message})})),N}async function xt(t){try{const e=(await fe()).transaction(_),r=await e.objectStore(_).get(de(t));return await e.done,r}catch(e){if(e instanceof v)f.warn(e.message);else{const r=u.create("idb-get",{originalErrorMessage:e?.message});f.warn(r.message)}}}async function Z(t,e){try{const r=(await fe()).transaction(_,"readwrite");await r.objectStore(_).put(e,de(t)),await r.done}catch(r){if(r instanceof v)f.warn(r.message);else{const n=u.create("idb-set",{originalErrorMessage:r?.message});f.warn(n.message)}}}function de(t){return`${t.name}!${t.options.appId}`}/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const zt=1024,Ut=30;class Wt{constructor(e){this.container=e,this._heartbeatsCache=null;const r=this.container.getProvider("app").getImmediate();this._storage=new Gt(r),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=X();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(n=>n.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:e}),this._heartbeatsCache.heartbeats.length>Ut){const n=Kt(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(n,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){f.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=X(),{heartbeatsToSend:r,unsentEntries:n}=Jt(this._heartbeatsCache.heartbeats),a=re(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(e){return f.warn(e),""}}}function X(){return new Date().toISOString().substring(0,10)}function Jt(t,e=zt){const r=[];let n=t.slice();for(const a of t){const i=r.find(s=>s.agent===a.agent);if(i){if(i.dates.push(a.date),Q(r)>e){i.dates.pop();break}}else if(r.push({agent:a.agent,dates:[a.date]}),Q(r)>e){r.pop();break}n=n.slice(1)}return{heartbeatsToSend:r,unsentEntries:n}}class Gt{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ae()?Le().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await xt(this.app);return e?.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Z(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Z(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Q(t){return re(JSON.stringify({version:2,heartbeats:t})).length}function Kt(t){if(t.length===0)return-1;let e=0,r=t[0].date;for(let n=1;n<t.length;n++)t[n].date<r&&(r=t[n].date,e=n);return e}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function qt(t){P(new I("platform-logger",e=>new nt(e),"PRIVATE")),P(new I("heartbeat",e=>new Wt(e),"PRIVATE")),D(O,$,t),D(O,$,"esm2020"),D("fire-js","")}/**
* @license
* Copyright 2026 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const H="firebase-js-sdk-policy",Yt=["https://www.googletagmanager.com/gtag/js","https://apis.google.com/js/api.js","https://www.google.com/recaptcha/api.js","https://www.google.com/recaptcha/enterprise.js"];let C,pe=!1;function ge(t){if(!Yt.some(e=>t.startsWith(e)&&(t.length===e.length||t.charAt(e.length)==="?")))throw new TypeError(`Firebase: Refusing to load untrusted script URL: ${t}`);return t}function Zt(){if(C===void 0){C=null;const t=typeof window<"u"?window.trustedTypes:void 0;if(t?.createPolicy)try{C=t.createPolicy(H,{createScriptURL:ge})}catch{pe=!0}}return C}function fr(t,e){ge(e);const r=Zt();if(r){t.src=r.createScriptURL(e);return}try{t.src=e}catch(n){throw pe&&f.error(`Unable to load ${e} because this page requires Trusted Types for scripts but does not allow the "${H}" Trusted Types policy. To fix this, add "${H}" to the trusted-types directive of the page's Content-Security-Policy.`),n}}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/qt("");export{A,D,Ft as F,Ht as H,Ie as I,Mt as M,P,kt as R,Xt as Y,Qt as Z,ar as a,hr as b,cr as c,ie as d,ve as e,fr as f,er as g,he as h,sr as i,Ae as j,te as k,lr as l,m,nr as n,or as o,I as p,q,rr as r,ir as s,tr as t,ur as u,v,w,y,ze as z};
