import{Z as ie,d as ae,R as I,t as se,c as ce,I as k,z as he,e as le,g as pe,f as B,j as H,k as ue,P as O,p as z,D as de}from"./index.esm-DrkuvDc4-BiWR1poC-Bf_BLzWg.js";/**
 * @license
 * Copyright 2020 Google LLC
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
 */const P=new Map,L={activated:!1,tokenObservers:[]},fe={initialized:!1,enabled:!1};function s(t){return P.get(t)||{...L}}function ge(t,e){return P.set(t,e),P.get(t)}function v(){return fe}/**
* @license
* Copyright 2020 Google LLC
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
*/const R="https://content-firebaseappcheck.googleapis.com/v1",ke="exchangeRecaptchaV3Token",we="exchangeRecaptchaEnterpriseToken",me="exchangeDebugToken",F={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},be=1440*60*1e3;/**
* @license
* Copyright 2020 Google LLC
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
*/class Te{constructor(e,r,n,o,i){if(this.operation=e,this.retryPolicy=r,this.getWaitDuration=n,this.lowerBound=o,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=o,o>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new k,this.pending.promise.catch(r=>{}),await Ee(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new k,this.pending.promise.catch(r=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(r){this.retryPolicy(r)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const r=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),r}}}function Ee(t){return new Promise(e=>{setTimeout(e,t)})}/**
* @license
* Copyright 2020 Google LLC
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
*/const ve={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},h=new ae("appCheck","AppCheck",ve);/**
* @license
* Copyright 2020 Google LLC
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
*/function b(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function $(t){if(!s(t).activated)throw h.create("use-before-activation",{appName:t.name})}function D(t){const e=Math.round(t/1e3),r=Math.floor(e/(3600*24)),n=Math.floor((e-r*3600*24)/3600),o=Math.floor((e-r*3600*24-n*3600)/60),i=e-r*3600*24-n*3600-o*60;let a="";return r&&(a+=m(r)+"d:"),n&&(a+=m(n)+"h:"),a+=m(o)+"m:"+m(i)+"s",a}function m(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
* @license
* Copyright 2020 Google LLC
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
*/async function y({url:t,body:e},r){const n={"Content-Type":"application/json"},o=r.getImmediate({optional:!0});if(o){const f=await o.getHeartbeatsHeader();f&&(n["X-Firebase-Client"]=f)}const i={method:"POST",body:JSON.stringify(e),headers:n};let a;try{a=await fetch(t,i)}catch(f){throw h.create("fetch-network-error",{originalErrorMessage:f?.message})}if(a.status!==200)throw h.create("fetch-status-error",{httpStatus:a.status});let p;try{p=await a.json()}catch(f){throw h.create("fetch-parse-error",{originalErrorMessage:f?.message})}const l=p.ttl.match(/^([\d.]+)(s)$/);if(!l||!l[2]||isNaN(Number(l[1])))throw h.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${p.ttl}`});const c=Number(l[1])*1e3,d=Date.now();return{token:p.token,expireTimeMillis:d+c,issuedAtTimeMillis:d}}function ye(t,e){const{projectId:r,appId:n,apiKey:o}=t.options;return{url:`${R}/projects/${r}/apps/${n}:${ke}?key=${o}`,body:{recaptcha_v3_token:e}}}function Ae(t,e){const{projectId:r,appId:n,apiKey:o}=t.options;return{url:`${R}/projects/${r}/apps/${n}:${we}?key=${o}`,body:{recaptcha_enterprise_token:e}}}function W(t,e){const{projectId:r,appId:n,apiKey:o}=t.options;return{url:`${R}/projects/${r}/apps/${n}:${me}?key=${o}`,body:{debug_token:e}}}/**
* @license
* Copyright 2020 Google LLC
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
*/const Ce="firebase-app-check-database",_e=1,w="firebase-app-check-store",q="debug-token";let A=null;function U(){return A||(A=new Promise((t,e)=>{try{const r=indexedDB.open(Ce,_e);r.onsuccess=n=>{t(n.target.result)},r.onerror=n=>{e(h.create("storage-open",{originalErrorMessage:n.target.error?.message}))},r.onupgradeneeded=n=>{const o=n.target.result;switch(n.oldVersion){case 0:o.createObjectStore(w,{keyPath:"compositeKey"})}}}catch(r){e(h.create("storage-open",{originalErrorMessage:r?.message}))}}),A)}function Pe(t){return G(V(t))}function Ie(t,e){return X(V(t),e)}function Re(t){return X(q,t)}function $e(){return G(q)}async function X(t,e){const r=(await U()).transaction(w,"readwrite"),n=r.objectStore(w).put({compositeKey:t,value:e});return new Promise((o,i)=>{n.onsuccess=a=>{o()},r.onerror=a=>{i(h.create("storage-set",{originalErrorMessage:a.target.error?.message}))}})}async function G(t){const e=(await U()).transaction(w,"readonly"),r=e.objectStore(w).get(t);return new Promise((n,o)=>{r.onsuccess=i=>{const a=i.target.result;n(a?a.value:void 0)},e.onerror=i=>{o(h.create("storage-get",{originalErrorMessage:i.target.error?.message}))}})}function V(t){return`${t.options.appId}-${t.name}`}/**
* @license
* Copyright 2020 Google LLC
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
*/const u=new he("@firebase/app-check");/**
* @license
* Copyright 2020 Google LLC
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
*/async function De(t){if(H()){let e;try{e=await Pe(t)}catch(r){u.warn(`Failed to read token from IndexedDB. Error: ${r}`)}return e}}function C(t,e){return H()?Ie(t,e).catch(r=>{u.warn(`Failed to write token to IndexedDB. Error: ${r}`)}):Promise.resolve()}async function Se(t){let e;try{e=await $e()}catch{}if(e)return e;{const r=crypto.randomUUID();let n=`To use this token for app debugging, register it with your project.

Firebase App Check debug token: ${r}

`;const o=t?.options.appId,i=t?.options.projectId;return i&&o?n+=`You can do so in the Firebase Console:
https://console.firebase.google.com/project/${i}/appcheck/apps?selectedAppId=${o}

Or using the Firebase CLI:
firebase appcheck:debugtokens:create ${r} --project ${i} --app ${o}

`:n+=`You will need to add it to your app's App Check settings in the Firebase Console for it to work.

`,n+=`Note: To keep your project secure, please revoke and delete this token using the
Firebase Console or the CLI (\`firebase appcheck:debugtokens:delete\`) when you finish debugging.

Warning: This debug token is a secret and should not be shared or uploaded to source code.

Debug Token Guide: https://firebase.google.com/docs/app-check/web/debug-provider
Firebase CLI install instructions: https://firebase.google.com/docs/cli
`,console.log(n),Re(r).catch(a=>u.warn(`Failed to persist debug token to IndexedDB. Error: ${a}`)),r}}/**
* @license
* Copyright 2020 Google LLC
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
*/function S(){return v().enabled}async function x(){const t=v();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function xe(t){const e=le(),r=v();if(r.initialized=!0,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&e.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;r.enabled=!0;const n=new k;r.token=n,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(e.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(Se(t))}/**
* @license
* Copyright 2020 Google LLC
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
*/const Me={error:"UNKNOWN_ERROR"};function Ne(t){return ue.encodeString(JSON.stringify(t),!1)}async function T(t,e=!1,r=!1){const n=t.app;$(n);const o=s(n);let i=o.token,a;if(i&&!g(i)&&(o.token=void 0,i=void 0),!i){const c=await o.cachedTokenPromise;c&&(g(c)?i=c:await C(n,void 0))}if(!e&&i&&g(i))return{token:i.token};let p=!1;if(S())try{const c=await x();o.exchangeTokenPromise||(o.exchangeTokenPromise=y(W(n,c),t.heartbeatServiceProvider).finally(()=>{o.exchangeTokenPromise=void 0}),p=!0);const d=await o.exchangeTokenPromise;return await C(n,d),o.token=d,{token:d.token}}catch(c){return c.code==="appCheck/throttled"||c.code==="appCheck/initial-throttle"?u.warn(c.message):r&&u.error(c),_(c)}try{o.exchangeTokenPromise||(o.exchangeTokenPromise=o.provider.getToken().finally(()=>{o.exchangeTokenPromise=void 0}),p=!0),i=await s(n).exchangeTokenPromise}catch(c){c.code==="appCheck/throttled"||c.code==="appCheck/initial-throttle"?u.warn(c.message):r&&u.error(c),a=c}let l;return i?a?g(i)?l={token:i.token,internalError:a}:l=_(a):(l={token:i.token},o.token=i,await C(n,i)):l=_(a),p&&J(n,l),l}async function Y(t){const e=t.app;$(e);const{provider:r}=s(e);if(S()){const n=await x(),o=W(e,n);o.body.limited_use=!0;const{token:i}=await y(o,t.heartbeatServiceProvider);return{token:i}}else{const{token:n}=await r.getToken(!0);return{token:n}}}function M(t,e,r,n){const{app:o}=t,i=s(o),a={next:r,error:n,type:e};if(i.tokenObservers=[...i.tokenObservers,a],i.token&&g(i.token)){const p=i.token;Promise.resolve().then(()=>{r({token:p.token}),K(t)}).catch(()=>{})}i.cachedTokenPromise.then(()=>K(t))}function N(t,e){const r=s(t),n=r.tokenObservers.filter(o=>o.next!==e);n.length===0&&r.tokenRefresher&&r.tokenRefresher.isRunning()&&r.tokenRefresher.stop(),r.tokenObservers=n}function K(t){const{app:e}=t,r=s(e);let n=r.tokenRefresher;n||(n=Oe(t),r.tokenRefresher=n),!n.isRunning()&&r.isTokenAutoRefreshEnabled&&n.start()}function Oe(t){const{app:e}=t;return new Te(async()=>{const r=s(e);let n;if(r.token?n=await T(t,!0):n=await T(t),n.error)throw n.error;if(n.internalError)throw n.internalError},()=>!0,()=>{const r=s(e);if(r.token){let n=r.token.issuedAtTimeMillis+(r.token.expireTimeMillis-r.token.issuedAtTimeMillis)*.5+3e5;const o=r.token.expireTimeMillis-300*1e3;return n=Math.min(n,o),Math.max(0,n-Date.now())}else return 0},F.RETRIAL_MIN_WAIT,F.RETRIAL_MAX_WAIT)}function J(t,e){const r=s(t).tokenObservers;for(const n of r)try{n.type==="EXTERNAL"&&e.error!=null?n.error(e.error):n.next(e)}catch{}}function g(t){return t.expireTimeMillis-Date.now()>0}function _(t){return{token:Ne(Me),error:t}}/**
* @license
* Copyright 2020 Google LLC
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
*/class ze{constructor(e,r){this.app=e,this.heartbeatServiceProvider=r}_delete(){const{tokenObservers:e}=s(this.app);for(const r of e)N(this.app,r.next);return Promise.resolve()}}function Fe(t,e){return new ze(t,e)}function Ke(t){return{getToken:e=>T(t,e),getLimitedUseToken:()=>Y(t),addTokenListener:e=>M(t,"INTERNAL",e),removeTokenListener:e=>N(t.app,e)}}const je="@firebase/app-check",Be="0.13.2";/**
* @license
* Copyright 2020 Google LLC
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
*/const He="https://www.google.com/recaptcha/api.js",Le="https://www.google.com/recaptcha/enterprise.js";function We(t,e){const r=new k,n=s(t);n.reCAPTCHAState={initialized:r};const o=Z(t),i=b(!1);return i?E(t,e,i,o,r):Xe(()=>{const a=b(!1);if(!a)throw new Error("no recaptcha");E(t,e,a,o,r)}),r.promise}function qe(t,e){const r=new k,n=s(t);n.reCAPTCHAState={initialized:r};const o=Z(t),i=b(!0);return i?E(t,e,i,o,r):Ge(()=>{const a=b(!0);if(!a)throw new Error("no recaptcha");E(t,e,a,o,r)}),r.promise}function E(t,e,r,n,o){r.ready(()=>{Ue(t,e,r,n),o.resolve(r)})}function Z(t){const e=`fire_app_check_${t.name}`,r=document.createElement("div");return r.id=e,r.style.display="none",document.body.appendChild(r),e}async function Q(t){$(t);const e=await s(t).reCAPTCHAState.initialized.promise;return new Promise((r,n)=>{const o=s(t).reCAPTCHAState;e.ready(()=>{r(e.execute(o.widgetId,{action:"fire_app_check"}))})})}function Ue(t,e,r,n){const o=r.render(n,{sitekey:e,size:"invisible",callback:()=>{s(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{s(t).reCAPTCHAState.succeeded=!1}}),i=s(t);i.reCAPTCHAState={...i.reCAPTCHAState,widgetId:o}}function Xe(t){const e=document.createElement("script");B(e,He),e.onload=t,document.head.appendChild(e)}function Ge(t){const e=document.createElement("script");B(e,Le+"?render=explicit"),e.onload=t,document.head.appendChild(e)}/**
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
*/class ee{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(e=!1){oe(this._throttleData);const r=await Q(this._app).catch(o=>{throw h.create("recaptcha-error")});if(!s(this._app).reCAPTCHAState?.succeeded)throw h.create("recaptcha-error");let n;try{const o=ye(this._app,r);e&&(o.body.limited_use=!0),n=await y(o,this._heartbeatServiceProvider)}catch(o){throw o.code?.includes("fetch-status-error")?(this._throttleData=ne(Number(o.customData?.httpStatus),this._throttleData),h.create("initial-throttle",{time:D(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=I(e,"heartbeat"),We(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof ee?this._siteKey===e._siteKey:!1}}class te{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(e=!1){oe(this._throttleData);const r=await Q(this._app).catch(o=>{throw h.create("recaptcha-error")});if(!s(this._app).reCAPTCHAState?.succeeded)throw h.create("recaptcha-error");let n;try{const o=Ae(this._app,r);e&&(o.body.limited_use=!0),n=await y(o,this._heartbeatServiceProvider)}catch(o){throw o.code?.includes("fetch-status-error")?(this._throttleData=ne(Number(o.customData?.httpStatus),this._throttleData),h.create("initial-throttle",{time:D(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):o}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=I(e,"heartbeat"),qe(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof te?this._siteKey===e._siteKey:!1}}class re{constructor(e){this._customProviderOptions=e}async getToken(){const e=await this._customProviderOptions.getToken(),r=ie(e.token),n=r!==null&&r<Date.now()&&r>0?r*1e3:Date.now();return{...e,issuedAtTimeMillis:n}}initialize(e){this._app=e}isEqual(e){return e instanceof re?this._customProviderOptions.getToken.toString()===e._customProviderOptions.getToken.toString():!1}}function ne(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+be,httpStatus:t};{const r=e?e.backoffCount:0,n=pe(r,1e3,2);return{backoffCount:r+1,allowRequestsAfter:Date.now()+n,httpStatus:t}}}function oe(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw h.create("throttled",{time:D(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
* @license
* Copyright 2020 Google LLC
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
*/function Qe(t=ce(),e){t=se(t);const r=I(t,"app-check");if(v().initialized||xe(t),S()&&x().then(o=>{console.log(`Firebase App Check debug token: ${o}`)}),r.isInitialized()){const o=r.getImmediate(),i=r.getOptions();if(i&&!!i.isTokenAutoRefreshEnabled==!!e.isTokenAutoRefreshEnabled&&i.provider?.isEqual(e.provider))return o;throw h.create("already-initialized",{appName:t.name})}const n=r.initialize({options:e});return Ve(t,e.provider,e.isTokenAutoRefreshEnabled),s(t).isTokenAutoRefreshEnabled&&M(n,"INTERNAL",()=>{}),n}function Ve(t,e,r=!1){const n=ge(t,{...L});n.activated=!0,n.provider=e,n.cachedTokenPromise=De(t).then(o=>(o&&g(o)&&(n.token=o,J(t,{token:o.token})),o)),n.isTokenAutoRefreshEnabled=r&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&r&&u.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),n.provider.initialize(t)}function et(t,e){const r=t.app,n=s(r);n.tokenRefresher&&(e===!0?n.tokenRefresher.start():n.tokenRefresher.stop()),n.isTokenAutoRefreshEnabled=e}async function tt(t,e){const r=await T(t,e);if(r.error)throw r.error;if(r.internalError)throw r.internalError;return{token:r.token}}function rt(t){return Y(t)}function nt(t,e,r,n){let o=()=>{},i=()=>{};return e.next!=null?o=e.next.bind(e):o=e,e.error!=null?i=e.error.bind(e):r&&(i=r),M(t,"EXTERNAL",o,i),()=>N(t.app,o)}/**
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
*/const Ye="app-check",j="app-check-internal";function Je(){O(new z(Ye,t=>{const e=t.getProvider("app").getImmediate(),r=t.getProvider("heartbeat");return Fe(e,r)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,r)=>{t.getProvider(j).initialize()})),O(new z(j,t=>{const e=t.getProvider("app-check").getImmediate();return Ke(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),de(je,Be)}Je();export{re as CustomProvider,te as ReCaptchaEnterpriseProvider,ee as ReCaptchaV3Provider,rt as getLimitedUseToken,tt as getToken,Qe as initializeAppCheck,nt as onTokenChanged,et as setTokenAutoRefreshEnabled};
