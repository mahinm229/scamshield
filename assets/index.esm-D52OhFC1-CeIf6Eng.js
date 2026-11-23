import{w as Ie,j as Te,n as we,N as Ce,b as Ne,a as be,Q as A,A as Le,H as Pe,y as ve,I as j,m as De}from"./index.esm-DrkuvDc4-BiWR1poC.js";var J="@firebase/ai",V="3.1.0";/**
* @license
* Copyright 2024 Google LLC
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
*/const L="AI",Me="global",ne="firebasevertexai.googleapis.com",k="v1beta",K=V,ke="gl-js",Ue="hybrid",xe=180*1e3,Ge="gemini-3.5-flash-lite";/**
* @license
* Copyright 2024 Google LLC
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
*/class c extends Ie{constructor(e,t,n){const o=L,i=`${o}/${e}`,a=`${o}: ${t} (${i})`;super(e,a),this.code=e,this.customErrorData=n,Error.captureStackTrace&&Error.captureStackTrace(this,c),Object.setPrototypeOf(this,c.prototype),this.toString=()=>a}}/**
* @license
* Copyright 2024 Google LLC
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
*/const Q=["user","model","function","system"],xt={HARM_CATEGORY_HATE_SPEECH:"HARM_CATEGORY_HATE_SPEECH",HARM_CATEGORY_SEXUALLY_EXPLICIT:"HARM_CATEGORY_SEXUALLY_EXPLICIT",HARM_CATEGORY_HARASSMENT:"HARM_CATEGORY_HARASSMENT",HARM_CATEGORY_DANGEROUS_CONTENT:"HARM_CATEGORY_DANGEROUS_CONTENT"},Gt={BLOCK_LOW_AND_ABOVE:"BLOCK_LOW_AND_ABOVE",BLOCK_MEDIUM_AND_ABOVE:"BLOCK_MEDIUM_AND_ABOVE",BLOCK_ONLY_HIGH:"BLOCK_ONLY_HIGH",BLOCK_NONE:"BLOCK_NONE",OFF:"OFF"},$t={SEVERITY:"SEVERITY",PROBABILITY:"PROBABILITY"},Ft={NEGLIGIBLE:"NEGLIGIBLE",LOW:"LOW",MEDIUM:"MEDIUM",HIGH:"HIGH"},oe={HARM_SEVERITY_NEGLIGIBLE:"HARM_SEVERITY_NEGLIGIBLE",HARM_SEVERITY_LOW:"HARM_SEVERITY_LOW",HARM_SEVERITY_MEDIUM:"HARM_SEVERITY_MEDIUM",HARM_SEVERITY_HIGH:"HARM_SEVERITY_HIGH",HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"},Ht={SAFETY:"SAFETY",OTHER:"OTHER",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT"},m={STOP:"STOP",MAX_TOKENS:"MAX_TOKENS",SAFETY:"SAFETY",RECITATION:"RECITATION",OTHER:"OTHER",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT",SPII:"SPII",MALFORMED_FUNCTION_CALL:"MALFORMED_FUNCTION_CALL",IMAGE_SAFETY:"IMAGE_SAFETY",IMAGE_PROHIBITED_CONTENT:"IMAGE_PROHIBITED_CONTENT",IMAGE_OTHER:"IMAGE_OTHER",NO_IMAGE:"NO_IMAGE",IMAGE_RECITATION:"IMAGE_RECITATION",LANGUAGE:"LANGUAGE",UNEXPECTED_TOOL_CALL:"UNEXPECTED_TOOL_CALL",TOO_MANY_TOOL_CALLS:"TOO_MANY_TOOL_CALLS",MISSING_THOUGHT_SIGNATURE:"MISSING_THOUGHT_SIGNATURE",MALFORMED_RESPONSE:"MALFORMED_RESPONSE"},Vt={SQUARE_1x1:"1:1",PORTRAIT_9x16:"9:16",LANDSCAPE_16x9:"16:9",PORTRAIT_3x4:"3:4",LANDSCAPE_4x3:"4:3",PORTRAIT_2x3:"2:3",LANDSCAPE_3x2:"3:2",PORTRAIT_4x5:"4:5",LANDSCAPE_5x4:"5:4",PORTRAIT_1x4:"1:4",LANDSCAPE_4x1:"4:1",PORTRAIT_1x8:"1:8",LANDSCAPE_8x1:"8:1",ULTRAWIDE_21x9:"21:9"},Bt={SIZE_512:"512",SIZE_1K:"1K",SIZE_2K:"2K",SIZE_4K:"4K"},Yt={AUTO:"AUTO",ANY:"ANY",NONE:"NONE"},qt={MODALITY_UNSPECIFIED:"MODALITY_UNSPECIFIED",TEXT:"TEXT",IMAGE:"IMAGE",VIDEO:"VIDEO",AUDIO:"AUDIO",DOCUMENT:"DOCUMENT"},Wt={TEXT:"TEXT",IMAGE:"IMAGE",AUDIO:"AUDIO"},g={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"},y={ON_DEVICE:"on_device",IN_CLOUD:"in_cloud"},jt={UNSPECIFIED:"OUTCOME_UNSPECIFIED",OK:"OUTCOME_OK",FAILED:"OUTCOME_FAILED",DEADLINE_EXCEEDED:"OUTCOME_DEADLINE_EXCEEDED"},Jt={UNSPECIFIED:"LANGUAGE_UNSPECIFIED",PYTHON:"PYTHON"},Kt={MINIMAL:"MINIMAL",LOW:"LOW",MEDIUM:"MEDIUM",HIGH:"HIGH"};/**
* @license
* Copyright 2024 Google LLC
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
*/const Qt={URL_RETRIEVAL_STATUS_UNSPECIFIED:"URL_RETRIEVAL_STATUS_UNSPECIFIED",URL_RETRIEVAL_STATUS_SUCCESS:"URL_RETRIEVAL_STATUS_SUCCESS",URL_RETRIEVAL_STATUS_ERROR:"URL_RETRIEVAL_STATUS_ERROR",URL_RETRIEVAL_STATUS_PAYWALL:"URL_RETRIEVAL_STATUS_PAYWALL",URL_RETRIEVAL_STATUS_UNSAFE:"URL_RETRIEVAL_STATUS_UNSAFE"},C={SERVER_CONTENT:"serverContent",TOOL_CALL:"toolCall",TOOL_CALL_CANCELLATION:"toolCallCancellation",GOING_AWAY_NOTICE:"goingAwayNotice",SESSION_RESUMPTION_UPDATE:"sessionResumptionUpdate"};/**
* @license
* Copyright 2024 Google LLC
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
*/const l={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",ALREADY_INITIALIZED:"already-initialized",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};/**
* @license
* Copyright 2024 Google LLC
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
*/const T={STRING:"string",NUMBER:"number",INTEGER:"integer",BOOLEAN:"boolean",ARRAY:"array",OBJECT:"object"};/**
* @license
* Copyright 2024 Google LLC
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
*/const R={AGENT_PLATFORM:"AGENT_PLATFORM",GOOGLE_AI:"GOOGLE_AI"};/**
* @license
* Copyright 2025 Google LLC
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
*/class ie{constructor(e){this.backendType=e}}class B extends ie{constructor(){super(R.GOOGLE_AI)}_getModelPath(e,t){return`/${k}/projects/${e}/${t}`}_getTemplatePath(e,t){return`/${k}/projects/${e}/templates/${t}`}}class U extends ie{constructor(e){super(R.AGENT_PLATFORM),this.location=Me,e&&(this.location=e)}_getModelPath(e,t){return`/${k}/projects/${e}/locations/${this.location}/${t}`}_getTemplatePath(e,t){return`/${k}/projects/${e}/locations/${this.location}/templates/${t}`}}/**
* @license
* Copyright 2025 Google LLC
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
*/function $e(s){if(s instanceof B)return`${L}/googleai`;if(s instanceof U)return`${L}/agentplatform/${s.location}`;throw new c(l.ERROR,`Invalid backend: ${JSON.stringify(s.backendType)}`)}function Fe(s){const e=s.split("/");if(e[0]!==L)throw new c(l.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"agentplatform":const t=e[2];if(!t)throw new c(l.ERROR,`Invalid instance identifier, unknown location '${s}'`);return new U(t);case"googleai":return new B;default:throw new c(l.ERROR,`Invalid instance identifier string: '${s}'`)}}/**
* @license
* Copyright 2024 Google LLC
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
*/const h=new Te("@firebase/ai");var O;(function(s){s.UNAVAILABLE="unavailable",s.DOWNLOADABLE="downloadable",s.DOWNLOADING="downloading",s.AVAILABLE="available"})(O||(O={}));/**
* @license
* Copyright 2025 Google LLC
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
*/const ae={type:"text",languages:["en"]},G=[ae,{type:"image"}],$=[ae];class E{constructor(e,t,n){this.languageModelProvider=e,this.mode=t,this.downloadPromise=null,this.onDeviceParams={createOptions:{expectedInputs:G,expectedOutputs:$}},n&&(this.onDeviceParams=n,this.onDeviceParams.createOptions?(this.onDeviceParams.createOptions.expectedInputs||(this.onDeviceParams.createOptions.expectedInputs=G),this.onDeviceParams.createOptions.expectedOutputs||(this.onDeviceParams.createOptions.expectedOutputs=$)):this.onDeviceParams.createOptions={expectedInputs:G,expectedOutputs:$})}async isAvailable(e){if(!this.mode)return h.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===g.ONLY_IN_CLOUD)return h.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;const t=await this.languageModelProvider?.availability(this.onDeviceParams.createOptions);if(this.mode===g.ONLY_ON_DEVICE){if(t===O.UNAVAILABLE)throw new c(l.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(t===O.DOWNLOADABLE||t===O.DOWNLOADING){h.debug("Waiting for download of LanguageModel to complete.");try{await this.downloadPromise}catch(n){throw new c(l.ERROR,n.message)}return!0}return!0}return t!==O.AVAILABLE?(h.debug(`On-device inference unavailable because availability is "${t}".`),!1):E.isOnDeviceRequest(e)?!0:(h.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){const t=await this.createSession(),n=await Promise.all(e.contents.map(E.toLanguageModelMessage)),o=await t.prompt(n,this.onDeviceParams.promptOptions);return E.toResponse(o)}async generateContentStream(e){const t=await this.createSession(),n=await Promise.all(e.contents.map(E.toLanguageModelMessage)),o=t.promptStreaming(n,this.onDeviceParams.promptOptions);return E.toStreamResponse(o)}async countTokens(e){throw new c(l.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return h.debug("Empty prompt rejected for on-device inference."),!1;for(const t of e.contents){if(t.parts.some(n=>"functionResponse"in n))return h.debug("Content with a function response part rejected for on-device inference."),!1;for(const n of t.parts)if("inlineData"in n&&n.inlineData&&E.SUPPORTED_MIME_TYPES.indexOf(n.inlineData.mimeType)===-1)return h.debug(`Unsupported mime type "${n.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(e){const t=await this.languageModelProvider?.availability(this.onDeviceParams.createOptions);return(t===O.DOWNLOADABLE||t===O.DOWNLOADING)&&this.download(e),t}download(e){if(this.downloadPromise)return;const t={...this.onDeviceParams.createOptions};t&&!t.monitor&&e&&(t.monitor=n=>{n.addEventListener("downloadprogress",o=>{e(o.loaded)})}),this.downloadPromise=this.languageModelProvider?.create(t).finally(()=>{this.downloadPromise=null})}static async toLanguageModelMessage(e){const t=await Promise.all(e.parts.map(E.toLanguageModelMessageContent));return{role:E.toLanguageModelMessageRole(e.role),content:t}}static async toLanguageModelMessageContent(e){if("text"in e&&typeof e.text=="string")return{type:"text",value:e.text};if("inlineData"in e&&e.inlineData){const t=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(t)}}throw new c(l.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new c(l.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");const e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){const t=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(n,o){const i=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:n}]}}]});o.enqueue(t.encode(`data: ${i}

`))}}))}}}E.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function He(s,e,t){const n=(e||De()).LanguageModel;if(n&&s)return new E(n,s,t)}/**
* @license
* Copyright 2024 Google LLC
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
*/class Ve{constructor(e,t,n,o,i){this.app=e,this.backend=t,this.chromeAdapterFactory=i;const a=o?.getImmediate({optional:!0}),r=n?.getImmediate({optional:!0});this.auth=r||null,this.appCheck=a||null}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}}/**
* @license
* Copyright 2025 Google LLC
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
*/function Be(s,{instanceIdentifier:e}){if(!e)throw new c(l.ERROR,"AIService instance identifier is undefined.");const t=Fe(e),n=s.getProvider("app").getImmediate(),o=s.getProvider("auth-internal"),i=s.getProvider("app-check-internal");return new Ve(n,t,o,i,He)}/**
* @license
* Copyright 2025 Google LLC
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
*/function re(s){if(s.app?.options?.apiKey)if(s.app?.options?.projectId){if(!s.app?.options?.appId)throw new c(l.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.')}else throw new c(l.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new c(l.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.');const e={apiKey:s.app.options.apiKey,project:s.app.options.projectId,appId:s.app.options.appId,automaticDataCollectionEnabled:s.app.automaticDataCollectionEnabled,backend:s.backend};if(be(s.app)&&s.app.settings.appCheckToken){const t=s.app.settings.appCheckToken;e.getAppCheckToken=()=>Promise.resolve({token:t})}else s.appCheck&&(s.options?.useLimitedUseAppCheckTokens?e.getAppCheckToken=()=>s.appCheck.getLimitedUseToken():e.getAppCheckToken=()=>s.appCheck.getToken());return s.auth&&(e.getAuthToken=()=>s.auth.getToken()),e}/**
* @license
* Copyright 2025 Google LLC
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
*/class b{constructor(e,t){this._apiSettings=re(e),this.model=b.normalizeModelName(t,this._apiSettings.backend.backendType)}static normalizeModelName(e,t){return t===R.GOOGLE_AI?b.normalizeGoogleAIModelName(e):b.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let t;return e.includes("/")?e.startsWith("models/")?t=`publishers/google/${e}`:t=e:t=`publishers/google/models/${e}`,t}}/**
* @license
* Copyright 2025 Google LLC
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
*/const Ye="Timeout has expired.",F="AbortError";class qe{constructor(e){this.params=e}toString(){const e=new URL(this.baseUrl);return e.pathname=this.pathname,e.search=this.queryParams.toString(),e.toString()}get pathname(){return this.params.templateId?`${this.params.apiSettings.backend._getTemplatePath(this.params.apiSettings.project,this.params.templateId)}:${this.params.task}`:`${this.params.apiSettings.backend._getModelPath(this.params.apiSettings.project,this.params.model)}:${this.params.task}`}get baseUrl(){return this.params.singleRequestOptions?.baseUrl??`https://${ne}`}get queryParams(){const e=new URLSearchParams;return this.params.stream&&e.set("alt","sse"),e}}class We{constructor(e){this.apiSettings=e}toString(){const e=new URL(`wss://${ne}`);e.pathname=this.pathname;const t=new URLSearchParams;return t.set("key",this.apiSettings.apiKey),e.search=t.toString(),e.toString()}get pathname(){return this.apiSettings.backend instanceof U?`ws/google.firebase.vertexai.v1beta.LlmBidiService/BidiGenerateContent/locations/${this.apiSettings.backend.location}`:"ws/google.firebase.vertexai.v1beta.GenerativeService/BidiGenerateContent"}}function je(s){const e=[];return e.push(`${ke}/${K}`),e.push(`fire/${K}`),(s.params.apiSettings.inferenceMode===g.PREFER_ON_DEVICE||s.params.apiSettings.inferenceMode===g.PREFER_IN_CLOUD)&&e.push(Ue),e.join(" ")}async function Je(s){const e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",je(s)),e.append("x-goog-api-key",s.params.apiSettings.apiKey),s.params.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",s.params.apiSettings.appId),s.params.apiSettings.getAppCheckToken){const t=await s.params.apiSettings.getAppCheckToken();t&&(e.append("X-Firebase-AppCheck",t.token),t.error&&h.warn(`Unable to obtain a valid App Check token: ${t.error.message}`))}if(s.params.apiSettings.getAuthToken){const t=await s.params.apiSettings.getAuthToken();t&&e.append("Authorization",`Firebase ${t.accessToken}`)}return e}async function v(s,e){const t=new qe(s);let n;const o=s.singleRequestOptions?.signal,i=s.singleRequestOptions?.timeout!=null&&s.singleRequestOptions.timeout>=0?s.singleRequestOptions.timeout:xe,a=new AbortController,r=setTimeout(()=>{a.abort(new DOMException(Ye,F)),h.debug(`Aborting request to ${t} due to timeout (${i}ms)`)},i),p=AbortSignal.any(o?[o,a.signal]:[a.signal]);if(o&&o.aborted)throw clearTimeout(r),new DOMException(o.reason??"Aborted externally before fetch",F);try{const d={method:"POST",headers:await Je(t),signal:p,body:e};if(n=await fetch(t.toString(),d),!n.ok){let u="",f;try{const _=await n.json();u=_.error.message,_.error.details&&(u+=` ${JSON.stringify(_.error.details)}`,f=_.error.details)}catch{}throw n.status===403&&f&&f.some(_=>_.reason==="SERVICE_DISABLED")&&f.some(_=>_.links?.[0]?.description.includes("Google developers console API activation"))?new c(l.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${t.params.apiSettings.project}/ailogic/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:n.status,statusText:n.statusText,errorDetails:f}):new c(l.FETCH_ERROR,`Error fetching from ${t}: [${n.status} ${n.statusText}] ${u}`,{status:n.status,statusText:n.statusText,errorDetails:f})}}catch(d){let u=d;throw d.code!==l.FETCH_ERROR&&d.code!==l.API_NOT_ENABLED&&d instanceof Error&&d.name!==F&&(u=new c(l.ERROR,`Error fetching from ${t.toString()}: ${d.message}`),u.stack=d.stack),u}finally{clearTimeout(r)}return n}/**
* @license
* Copyright 2024 Google LLC
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
*/function M(s){if(s.candidates&&s.candidates.length>0){if(s.candidates.length>1&&h.warn(`This response had ${s.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),le(s.candidates[0]))throw new c(l.RESPONSE_ERROR,`Response error: ${I(s)}. Response body stored in error.response`,{response:s});return!0}else return!1}function S(s){return"type"in s&&s.type?s:s.text!==void 0?{...s,type:"text"}:s.inlineData!==void 0?{...s,type:"inlineData"}:s.functionCall!==void 0?{...s,type:"functionCall"}:s.functionResponse!==void 0?{...s,type:"functionResponse"}:s.fileData!==void 0?{...s,type:"fileData"}:s.executableCode!==void 0?{...s,type:"executableCode"}:s.codeExecutionResult!==void 0?{...s,type:"codeExecutionResult"}:s}function P(s,e=y.IN_CLOUD){if(s.candidates?.[0]&&!s.candidates[0].hasOwnProperty("index")&&(s.candidates[0].index=0),s.candidates)for(const n of s.candidates)n.content?.parts&&(n.content.parts=n.content.parts.map(S));const t=Ke(s);return t.inferenceSource=e,t}function Ke(s){return s.text=()=>{if(M(s))return X(s,e=>!("thought"in e&&e.thought));if(s.promptFeedback)throw new c(l.RESPONSE_ERROR,`Text not available. ${I(s)}`,{response:s});return""},s.thoughtSummary=()=>{if(M(s)){const e=X(s,t=>!!("thought"in t&&t.thought));return e===""?void 0:e}else if(s.promptFeedback)throw new c(l.RESPONSE_ERROR,`Thought summary not available. ${I(s)}`,{response:s})},s.inlineDataParts=()=>{if(M(s))return Qe(s);if(s.promptFeedback)throw new c(l.RESPONSE_ERROR,`Data not available. ${I(s)}`,{response:s})},s.functionCalls=()=>{if(M(s))return ce(s);if(s.promptFeedback)throw new c(l.RESPONSE_ERROR,`Function call not available. ${I(s)}`,{response:s})},s}function X(s,e){const t=[];if(s.candidates?.[0].content?.parts)for(const n of s.candidates?.[0].content?.parts){const o=S(n);o.type==="text"&&e(o)&&t.push(o.text)}return t.length>0?t.join(""):""}function ce(s){if(!s)return;const e=[];if(s.candidates?.[0].content?.parts)for(const t of s.candidates?.[0].content?.parts){const n=S(t);n.type==="functionCall"&&e.push(n.functionCall)}if(e.length>0)return e}function Qe(s){const e=[];if(s.candidates?.[0].content?.parts)for(const t of s.candidates?.[0].content?.parts){const n=S(t);n.type==="inlineData"&&e.push(n)}if(e.length>0)return e}const Xe=[m.RECITATION,m.SAFETY,m.BLOCKLIST,m.PROHIBITED_CONTENT,m.SPII,m.MALFORMED_FUNCTION_CALL,m.IMAGE_SAFETY,m.IMAGE_PROHIBITED_CONTENT,m.IMAGE_OTHER,m.NO_IMAGE,m.IMAGE_RECITATION,m.LANGUAGE,m.UNEXPECTED_TOOL_CALL,m.TOO_MANY_TOOL_CALLS,m.MISSING_THOUGHT_SIGNATURE,m.MALFORMED_RESPONSE];function le(s){return!!s.finishReason&&Xe.some(e=>e===s.finishReason)}function I(s){let e="";if((!s.candidates||s.candidates.length===0)&&s.promptFeedback)e+="Response was blocked",s.promptFeedback?.blockReason&&(e+=` due to ${s.promptFeedback.blockReason}`),s.promptFeedback?.blockReasonMessage&&(e+=`: ${s.promptFeedback.blockReasonMessage}`);else if(s.candidates?.[0]){const t=s.candidates[0];le(t)&&(e+=`Candidate was blocked due to ${t.finishReason}`,t.finishMessage&&(e+=`: ${t.finishMessage}`))}return e}/**
* @license
* Copyright 2024 Google LLC
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
*/function x(s){if(s!=null){if(typeof s=="string")return{role:"system",parts:[{type:"text",text:s}]};if(s.type==="text"||"text"in s&&typeof s.text=="string")return{role:"system",parts:[A(S(s))]};if(s.parts){const e=s.parts.map(t=>A(S(t)));return s.role?{...s,parts:e}:{role:"system",parts:e}}}}function N(s){let e=[];if(typeof s=="string")e=[{type:"text",text:s}];else for(const t of s)typeof t=="string"?e.push({type:"text",text:t}):e.push(A(S(t)));return ze(e)}function ze(s){const e={role:"user",parts:[]};let t=!1,n=!1;for(const o of s)o.type==="functionResponse"||"functionResponse"in o?n=!0:t=!0,e.parts.push(o);if(t&&n)throw new c(l.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!t&&!n)throw new c(l.INVALID_CONTENT,"No Content is provided for sending chat message.");return e}function H(s){let e;if(s.contents){const t=s;e={...t,contents:t.contents.map(n=>({...n,parts:n.parts?n.parts.map(S):[]}))}}else e={contents:[N(s)]};return s.systemInstruction&&(e.systemInstruction=x(s.systemInstruction)),e}function pe(s){return s.parts&&Array.isArray(s.parts)?{...s,parts:s.parts.map(Y)}:s}function Y(s){let e;if("type"in s){const{type:t,...n}=s;e=n}else e=s;return e.functionResponse&&(e={...e,functionResponse:pe(e.functionResponse)}),e}function D(s){return s.parts?{...s,parts:s.parts.map(Y)}:s}function q(s){return s==null||typeof s=="string"?s:"parts"in s&&Array.isArray(s.parts)?D(s):Y(s)}function de(s){const e={...s};return e.contents&&(e.contents=e.contents.map(D)),e.systemInstruction&&(e.systemInstruction=q(e.systemInstruction)),e}function Ze(s){const e={...s};return e.contents&&(e.contents=e.contents.map(D)),e.systemInstruction&&(e.systemInstruction=q(e.systemInstruction)),e}function ue(s){const e={...s};return e.history&&Array.isArray(e.history)&&(e.history=e.history.map(D)),e}/**
* @license
* Copyright 2025 Google LLC
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
*/function he(s){if(s.safetySettings?.forEach(e=>{if(e.method)throw new c(l.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),s.generationConfig?.topK){const e=Math.round(s.generationConfig.topK);e!==s.generationConfig.topK&&(h.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),s.generationConfig.topK=e)}return s}function W(s){return{candidates:s.candidates?tt(s.candidates):void 0,promptFeedback:s.promptFeedback?st(s.promptFeedback):void 0,usageMetadata:s.usageMetadata}}function et(s,e){return{generateContentRequest:{model:e,...s}}}function tt(s){const e=[];let t;return e&&s.forEach(n=>{let o;if(n.citationMetadata&&(o={citations:n.citationMetadata.citationSources}),n.safetyRatings&&(t=n.safetyRatings.map(a=>({...a,severity:a.severity??oe.HARM_SEVERITY_UNSUPPORTED,probabilityScore:a.probabilityScore??0,severityScore:a.severityScore??0}))),n.content?.parts?.some(a=>"videoMetadata"in a&&a.videoMetadata))throw new c(l.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");const i={index:n.index,content:n.content,finishReason:n.finishReason,finishMessage:n.finishMessage,safetyRatings:t,citationMetadata:o,groundingMetadata:n.groundingMetadata,urlContextMetadata:n.urlContextMetadata};e.push(i)}),e}function st(s){const e=[];return(s.safetyRatings??[]).forEach(t=>{e.push({category:t.category,probability:t.probability,severity:t.severity??oe.HARM_SEVERITY_UNSUPPORTED,probabilityScore:t.probabilityScore??0,severityScore:t.severityScore??0,blocked:t.blocked})}),{blockReason:s.blockReason,safetyRatings:e,blockReasonMessage:s.blockReasonMessage}}/**
* @license
* Copyright 2024 Google LLC
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
*/const z=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function fe(s,e,t){const n=s.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),o=at(n),[i,a]=o.tee(),{response:r,firstValue:p}=await nt(a,e,t);return{stream:it(i,e,t),response:r,firstValue:p}}async function nt(s,e,t){const[n,o]=s.tee(),i=n.getReader(),{value:a}=await i.read();return{firstValue:a,response:ot(o,e,t)}}async function ot(s,e,t){const n=[],o=s.getReader();for(;;){const{done:i,value:a}=await o.read();if(i){let r=rt(n);return e.backend.backendType===R.GOOGLE_AI&&(r=W(r)),P(r,t)}n.push(a)}}async function*it(s,e,t){const n=s.getReader();for(;;){const{value:o,done:i}=await n.read();if(i)break;let a;e.backend.backendType===R.GOOGLE_AI?a=P(W(o),t):a=P(o,t);const r=a.candidates?.[0];!r?.content?.parts&&!r?.finishReason&&!r?.citationMetadata&&!r?.urlContextMetadata||(yield a)}}function at(s){const e=s.getReader();return new ReadableStream({start(t){let n="";return o();function o(){return e.read().then(({value:i,done:a})=>{if(a){if(n.trim()){t.error(new c(l.PARSE_FAILED,"Failed to parse stream"));return}t.close();return}n+=i;let r=n.match(z),p;for(;r;){try{p=JSON.parse(r[1])}catch{t.error(new c(l.PARSE_FAILED,`Error parsing JSON response: "${r[1]}`));return}t.enqueue(p),n=n.substring(r[0].length),r=n.match(z)}return o()})}}})}function rt(s){const e={promptFeedback:s[s.length-1]?.promptFeedback};for(const t of s)if(t.candidates)for(const n of t.candidates){const o=n.index||0;e.candidates||(e.candidates=[]),e.candidates[o]||(e.candidates[o]={index:n.index}),e.candidates[o].citationMetadata=n.citationMetadata,e.candidates[o].finishReason=n.finishReason,e.candidates[o].finishMessage=n.finishMessage,e.candidates[o].safetyRatings=n.safetyRatings,e.candidates[o].groundingMetadata=n.groundingMetadata;const i=n.urlContextMetadata;if(typeof i=="object"&&i!==null&&Object.keys(i).length>0&&(e.candidates[o].urlContextMetadata=i),n.content){if(!n.content.parts)continue;e.candidates[o].content||(e.candidates[o].content={role:n.content.role||"user",parts:[]});for(const a of n.content.parts){if("text"in a&&a.text==="")continue;if(Object.keys(a).length===0)throw new c(l.INVALID_CONTENT,"Part should have at least one property, but there are none. This is likely caused by a malformed response from the backend.");const r=S({...a});Object.keys(r).length>0&&e.candidates[o].content.parts.push(r)}}}return e}/**
* @license
* Copyright 2025 Google LLC
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
*/const ct=[l.FETCH_ERROR,l.ERROR,l.API_NOT_ENABLED];async function me(s,e,t,n){if(!e)return{response:await n(),inferenceSource:y.IN_CLOUD};switch(e.mode){case g.ONLY_ON_DEVICE:if(await e.isAvailable(s))return{response:await t(),inferenceSource:y.ON_DEVICE};throw new c(l.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case g.ONLY_IN_CLOUD:return{response:await n(),inferenceSource:y.IN_CLOUD};case g.PREFER_IN_CLOUD:try{return{response:await n(),inferenceSource:y.IN_CLOUD}}catch(o){if(o instanceof c&&ct.includes(o.code)&&await e.isAvailable(s))return{response:await t(),inferenceSource:y.ON_DEVICE};throw o}case g.PREFER_ON_DEVICE:return await e.isAvailable(s)?{response:await t(),inferenceSource:y.ON_DEVICE}:{response:await n(),inferenceSource:y.IN_CLOUD};default:throw new c(l.ERROR,`Unexpected infererence mode: ${e.mode}`)}}/**
* @license
* Copyright 2024 Google LLC
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
*/async function lt(s,e,t,n){return t=de(t),s.backend.backendType===R.GOOGLE_AI&&(t=he(t)),v({task:"streamGenerateContent",model:e,apiSettings:s,stream:!0,singleRequestOptions:n},JSON.stringify(t))}async function Ee(s,e,t,n,o){const i=await me(t,n,()=>n.generateContentStream(t),()=>lt(s,e,t,o));return fe(i.response,s,i.inferenceSource)}async function pt(s,e,t,n){return t=de(t),s.backend.backendType===R.GOOGLE_AI&&(t=he(t)),v({model:e,task:"generateContent",apiSettings:s,stream:!1,singleRequestOptions:n},JSON.stringify(t))}async function ge(s,e,t,n){const o=ue(t),i=await v({task:"templateGenerateContent",templateId:e,apiSettings:s,stream:!1,singleRequestOptions:n},JSON.stringify(o)),a=await Re(i,s);return{response:P(a)}}async function Se(s,e,t,n){const o=ue(t),i=await v({task:"templateStreamGenerateContent",templateId:e,apiSettings:s,stream:!0,singleRequestOptions:n},JSON.stringify(o));return fe(i,s)}async function Oe(s,e,t,n,o){const i=await me(t,n,()=>n.generateContent(t),()=>pt(s,e,t,o)),a=await Re(i.response,s);return{response:P(a,i.inferenceSource)}}async function Re(s,e){const t=await s.json();return e.backend.backendType===R.GOOGLE_AI?W(t):t}/**
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
*/const Z="SILENT_ERROR",ee=10;class _e{constructor(e,t,n){this.params=t,this.requestOptions=n,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e}async getHistory(){return await this._sendPromise,A(this._history).map(e=>({...e,parts:e.parts?e.parts.map(S):[]}))}async _sendMessage(e,t){let n={};await this._sendPromise;const o=[];return this._sendPromise=this._sendPromise.then(async()=>{let i,a=0;const r=this.requestOptions?.maxSequentialFunctionCalls??ee;do{let p;if(i){a++;const f=await this._callFunctionsAsNeeded(i);p=N(f)}else p=N(e);const d=this._formatRequest(p,[...o]);o.push(p);const u=await this._callGenerateContent(d,t);if(u)if(n=u,i=this._getCallableFunctionCalls(u.response),u.response.candidates&&u.response.candidates.length>0){const f={parts:u.response.candidates?.[0].content.parts||[],role:u.response.candidates?.[0].content.role||"model"};o.push(A(f))}else{const f=I(u.response);f&&h.warn(`sendMessage() was unsuccessful. ${f}. Inspect response object for details.`)}else i=void 0}while(i&&a<r);i&&a>=r&&h.warn(`Automatic function calling exceeded the limit of ${r} function calls. Returning last model response.`)}),await this._sendPromise,this._history=this._history.concat(o),n}async _sendMessageStream(e,t){await this._sendPromise;const n=[],o=(async()=>{let i,a=0;const r=this.requestOptions?.maxSequentialFunctionCalls??ee;let p;do{let d;if(i){a++;const f=await this._callFunctionsAsNeeded(i);d=N(f)}else d=N(e);const u=this._formatRequest(d,[...n]);if(n.push(d),p=await this._callGenerateContentStream(u,t),i=this._getCallableFunctionCalls(p.firstValue),i&&p.firstValue&&p.firstValue.candidates&&p.firstValue.candidates.length>0){const f={...p.firstValue.candidates[0].content};f.role||(f.role="model"),n.push(f)}}while(i&&a<r);return i&&a>=r&&h.warn(`Automatic function calling exceeded the limit of ${r} function calls. Returning last model response.`),{stream:p.stream,response:p.response}})();return this._sendPromise=this._sendPromise.then(async()=>o).catch(i=>{throw new Error(Z)}).then(i=>i.response).then(i=>{if(i.candidates&&i.candidates.length>0){this._history=this._history.concat(n);const a={...i.candidates[0].content};a.role||(a.role="model"),this._history.push(A(a))}else{const a=I(i);a&&h.warn(`sendMessageStream() was unsuccessful. ${a}. Inspect response object for details.`)}}).catch(i=>{i.message!==Z&&i.name!=="AbortError"&&h.error(i)}),o}_getCallableFunctionCalls(e){const t=this.params?.tools?.find(o=>o.functionDeclarations);if(!t?.functionDeclarations)return;const n=ce(e);if(n){for(const o of n)if(!t.functionDeclarations?.some(i=>i.name===o.name&&typeof i.functionReference=="function"))return;return n}}async _callFunctionsAsNeeded(e){const t=[],n=[],o=this.params?.tools?.find(i=>i.functionDeclarations);if(o&&o.functionDeclarations){for(const a of e){const r=o.functionDeclarations.find(p=>p.name===a.name);if(r?.functionReference){const p=Promise.resolve(r.functionReference(a.args)).catch(d=>{const u=new c(l.ERROR,`Error in user-defined function "${r.name}": ${d.message}`);throw u.stack=d.stack,u});t.push({name:a.name,id:a.id,results:p}),n.push(p)}}await Promise.all(n);const i=[];for(const{name:a,id:r,results:p}of t){const d={name:a,response:await p};r&&(d.id=r),i.push({type:"functionResponse",functionResponse:d})}return i}else throw new c(l.REQUEST_ERROR,'No function declarations were provided in "tools".')}}/**
* @license
* Copyright 2024 Google LLC
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
*/const dt=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],ut={user:["text","inlineData","functionResponse"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},te={user:["model"],function:["model"],model:["user","function"],system:[]};function ye(s){let e=null;for(const t of s){const{role:n,parts:o}=t;if(!e&&n!=="user")throw new c(l.INVALID_CONTENT,`First Content should be with role 'user', got ${n}`);if(!Q.includes(n))throw new c(l.INVALID_CONTENT,`Each item should include role field. Got ${n} but valid roles are: ${JSON.stringify(Q)}`);if(!Array.isArray(o))throw new c(l.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(o.length===0)throw new c(l.INVALID_CONTENT,"Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const r of o){if(r.type)i[r.type]+=1;else for(const p of["text","inlineData","functionCall","functionResponse","fileData","executableCode","codeExecutionResult"])p in r&&(i[p]+=1);"thought"in r&&r.thought&&(i.thought+=1),"thoughtSignature"in r&&r.thoughtSignature&&(i.thoughtSignature+=1)}const a=ut[n];for(const r of dt)if(!a.includes(r)&&i[r]>0)throw new c(l.INVALID_CONTENT,`Content with role '${n}' can't contain '${r}' part`);if(e&&!te[n].includes(e.role))throw new c(l.INVALID_CONTENT,`Content with role '${n}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(te)}`);e=t}}/**
* @license
* Copyright 2024 Google LLC
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
*/class ht extends _e{constructor(e,t,n,o,i){super(e,o,i),this.model=t,this.chromeAdapter=n,this.params=o,this.requestOptions=i,o?.history&&(ye(o.history),this._history=A(o.history)),this.params?.systemInstruction!=null&&(this.params={...this.params,systemInstruction:x(this.params.systemInstruction)})}_formatRequest(e,t){return{safetySettings:this.params?.safetySettings,generationConfig:this.params?.generationConfig,tools:this.params?.tools,toolConfig:this.params?.toolConfig,systemInstruction:this.params?.systemInstruction,contents:[...this._history,...t,e]}}_callGenerateContent(e,t){return Oe(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...t})}_callGenerateContentStream(e,t){return Ee(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...t})}async sendMessage(e,t){return this._sendMessage(e,t)}async sendMessageStream(e,t){return this._sendMessageStream(e,t)}}/**
* @license
* Copyright 2024 Google LLC
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
*/async function ft(s,e,t,n){t=Ze(t);let o="";if(s.backend.backendType===R.GOOGLE_AI){const i=et(t,e);o=JSON.stringify(i)}else o=JSON.stringify(t);return(await v({model:e,task:"countTokens",apiSettings:s,stream:!1,singleRequestOptions:n},o)).json()}async function mt(s,e,t,n,o){if(n?.mode===g.ONLY_ON_DEVICE)throw new c(l.UNSUPPORTED,"countTokens() is not supported for on-device models.");return ft(s,e,t,o)}/**
* @license
* Copyright 2024 Google LLC
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
*/class Et extends b{constructor(e,t,n,o){super(e,t.model),this.chromeAdapter=o,this.generationConfig=t.generationConfig||{},gt(this.generationConfig),this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=x(t.systemInstruction),this.requestOptions=n||{}}async initializeDeviceModel(e){if(!(!this.chromeAdapter||this.chromeAdapter.mode===g.ONLY_IN_CLOUD)){if(await this.chromeAdapter.downloadIfAvailable(e)===O.UNAVAILABLE){const t=new c(l.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(this.chromeAdapter.mode===g.ONLY_ON_DEVICE)throw t;h.debug(t.message)}await this.chromeAdapter.downloadPromise}}async generateContent(e,t){const n=H(e);return Oe(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...n},this.chromeAdapter,{...this.requestOptions,...t})}async generateContentStream(e,t){const n=H(e),{stream:o,response:i}=await Ee(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...n},this.chromeAdapter,{...this.requestOptions,...t});return{stream:o,response:i}}startChat(e){return new ht(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e,t){const n=H(e);return mt(this._apiSettings,this.model,n,this.chromeAdapter,{...this.requestOptions,...t})}}function gt(s){if(s.thinkingConfig?.thinkingBudget!=null&&s.thinkingConfig?.thinkingLevel)throw new c(l.UNSUPPORTED,"Cannot set both thinkingBudget and thinkingLevel in a config.");if(s.responseSchema!=null&&s.responseJsonSchema!=null)throw new c(l.UNSUPPORTED,"Cannot set both responseSchema and responseJsonSchema in a config.");if((s.responseSchema!=null||s.responseJsonSchema!=null)&&s.responseMimeType!=="application/json"&&s.responseMimeType!=="text/x.enum")throw new c(l.UNSUPPORTED,'responseMimeType must be set to "application/json" or "text/x.enum" if responseSchema or responseJsonSchema are set.')}/**
* @license
* Copyright 2025 Google LLC
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
*/class St{constructor(){if(typeof WebSocket>"u")throw new c(l.UNSUPPORTED,'The WebSocket API is not available in this environment. The "Live" feature is not supported here. It is supported in modern browser windows, Web Workers with WebSocket support, and Node >= 22.')}connect(e){return new Promise((t,n)=>{this.ws=new WebSocket(e),this.ws.binaryType="blob",this.ws.addEventListener("open",()=>t(),{once:!0}),this.ws.addEventListener("error",()=>n(new c(l.FETCH_ERROR,"Error event raised on WebSocket")),{once:!0}),this.ws.addEventListener("close",o=>{o.reason&&h.warn(`WebSocket connection closed by server. Reason: '${o.reason}'`)})})}send(e){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)throw new c(l.REQUEST_ERROR,"WebSocket is not open.");this.ws.send(e)}async*listen(){if(!this.ws)throw new c(l.REQUEST_ERROR,"WebSocket is not connected.");const e=[],t=[];let n=null,o=!1;const i=async p=>{let d;if(p.data instanceof Blob)d=await p.data.text();else if(typeof p.data=="string")d=p.data;else{t.push(new c(l.PARSE_FAILED,`Failed to parse WebSocket response. Expected data to be a Blob or string, but was ${typeof p.data}.`)),n&&(n(),n=null);return}try{const u=JSON.parse(d);e.push(u)}catch(u){const f=u;t.push(new c(l.PARSE_FAILED,`Error parsing WebSocket message to JSON: ${f.message}`))}n&&(n(),n=null)},a=()=>{t.push(new c(l.FETCH_ERROR,"WebSocket connection error.")),n&&(n(),n=null)},r=p=>{p.reason&&h.warn(`WebSocket connection closed by the server with reason: ${p.reason}`),o=!0,n&&(n(),n=null),this.ws?.removeEventListener("message",i),this.ws?.removeEventListener("close",r),this.ws?.removeEventListener("error",a)};for(this.ws.addEventListener("message",i),this.ws.addEventListener("close",r),this.ws.addEventListener("error",a);!o;){if(t.length>0)throw t.shift();e.length>0?yield e.shift():await new Promise(p=>{n=p})}if(t.length>0)throw t.shift()}close(e,t){return new Promise(n=>{if(!this.ws||(this.ws.addEventListener("close",()=>n(),{once:!0}),this.ws.readyState===WebSocket.CLOSED||this.ws.readyState===WebSocket.CONNECTING))return n();this.ws.readyState!==WebSocket.CLOSING&&this.ws.close(e,t)})}}/**
* @license
* Copyright 2025 Google LLC
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
*/class Ot{constructor(e,t,n,o){this._setupMessage=e,this._apiSettings=t,this._sessionResumption=n,this.isClosed=!1,this.inConversation=!1,this._serverMessages=null,this._webSocketHandler=o||new St,this.connectionPromise=this._connectSession(this._sessionResumption)}async _connectSession(e){const t=new We(this._apiSettings);await this._webSocketHandler.connect(t.toString());try{this._serverMessages=this._webSocketHandler.listen();const n={...this._setupMessage,setup:{...this._setupMessage.setup}};e&&(n.setup.sessionResumption=e),n.setup.systemInstruction&&(n.setup.systemInstruction=q(n.setup.systemInstruction)),this._webSocketHandler.send(JSON.stringify(n));const o=(await this._serverMessages.next()).value;if(!o||typeof o!="object"||!("setupComplete"in o))throw await this._webSocketHandler.close(1011,"Handshake failure"),new c(l.RESPONSE_ERROR,"Server connection handshake failed. The server did not respond with a setupComplete message.");this.isClosed=!1}catch(n){throw await this._webSocketHandler.close(),n}}async resumeSession(e){if(!this._sessionResumption)throw new c(l.UNSUPPORTED,"Cannot resume session: no sessionResumption config provided");await this.close(),await this._connectSession(e)}async send(e,t=!0){if(this.isClosed)throw new c(l.REQUEST_ERROR,"This LiveSession has been closed and cannot be used.");const n=N(e),o={clientContent:{turns:[D(n)],turnComplete:t}};this._webSocketHandler.send(JSON.stringify(o))}async sendTextRealtime(e){if(this.isClosed)throw new c(l.REQUEST_ERROR,"This LiveSession has been closed and cannot be used.");const t={realtimeInput:{text:e}};this._webSocketHandler.send(JSON.stringify(t))}async sendAudioRealtime(e){if(this.isClosed)throw new c(l.REQUEST_ERROR,"This LiveSession has been closed and cannot be used.");const t={realtimeInput:{audio:e}};this._webSocketHandler.send(JSON.stringify(t))}async sendVideoRealtime(e){if(this.isClosed)throw new c(l.REQUEST_ERROR,"This LiveSession has been closed and cannot be used.");const t={realtimeInput:{video:e}};this._webSocketHandler.send(JSON.stringify(t))}async sendFunctionResponses(e){if(this.isClosed)throw new c(l.REQUEST_ERROR,"This LiveSession has been closed and cannot be used.");const t={toolResponse:{functionResponses:e.map(pe)}};this._webSocketHandler.send(JSON.stringify(t))}async*receive(){if(this.isClosed)throw new c(l.SESSION_CLOSED,"Cannot read from a Live session that is closed. Try starting a new Live session.");if(this._serverMessages)for await(const e of this._serverMessages)if(e&&typeof e=="object")if(C.SERVER_CONTENT in e){const t=e.serverContent;t?.modelTurn?.parts&&(t.modelTurn.parts=t.modelTurn.parts.map(S)),yield{type:"serverContent",...t}}else if(C.TOOL_CALL in e)yield{type:"toolCall",...e.toolCall};else if(C.TOOL_CALL_CANCELLATION in e)yield{type:"toolCallCancellation",...e.toolCallCancellation};else if("goAway"in e){const t=e.goAway;yield{type:C.GOING_AWAY_NOTICE,timeLeft:Rt(t.timeLeft)}}else C.SESSION_RESUMPTION_UPDATE in e?yield{type:C.SESSION_RESUMPTION_UPDATE,...e.sessionResumptionUpdate}:h.warn(`Received an unknown message type from the server: ${JSON.stringify(e)}`);else h.warn(`Received an invalid message from the server: ${JSON.stringify(e)}`)}async close(){this.isClosed||(this.isClosed=!0,await this._webSocketHandler.close(1e3,"Client closed session."))}}function Rt(s){return!s||!s.endsWith("s")?0:Number(s.slice(0,-1))}/**
* @license
* Copyright 2025 Google LLC
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
*/class _t extends b{constructor(e,t,n){super(e,t.model),this._webSocketHandler=n,this.generationConfig=t.generationConfig||{},this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=x(t.systemInstruction)}async connect(e){let t;this._apiSettings.backend instanceof U?t=`projects/${this._apiSettings.project}/locations/${this._apiSettings.backend.location}/${this.model}`:t=`projects/${this._apiSettings.project}/${this.model}`;const{inputAudioTranscription:n,outputAudioTranscription:o,...i}=this.generationConfig,a=i.contextWindowCompression;delete i.contextWindowCompression;const r={setup:{model:t,generationConfig:i,contextWindowCompression:a,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,inputAudioTranscription:n,outputAudioTranscription:o,sessionResumption:e}},p=new Ot(r,this._apiSettings,e,this._webSocketHandler);return await p.connectionPromise,p}}/**
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
*/class yt extends _e{constructor(e,t,n){super(e,t,n),this.params=t,this.requestOptions=n,t.history&&(ye(t.history),this._history=A(t.history))}_formatRequest(e,t){const n={history:[...this._history,...t,e]};return this.params.templateVariables&&(n.inputs=this.params.templateVariables),this.params.tools&&(n.tools=this.params.tools?.map(o=>o.functionDeclarations?{templateFunctions:o.functionDeclarations.map(i=>{if(i.parameters){const a={...i};return delete a.parameters,a.inputSchema=i.parameters,a}return i})}:o)),this.params.toolConfig&&(n.toolConfig=this.params.toolConfig),n}_callGenerateContent(e,t){return ge(this._apiSettings,this.params.templateId,e,{...this.requestOptions,...t})}_callGenerateContentStream(e,t){return Se(this._apiSettings,this.params.templateId,e,{...this.requestOptions,...t})}async sendMessage(e,t){return this._sendMessage(e,t)}async sendMessageStream(e,t){return this._sendMessageStream(e,t)}}/**
* @license
* Copyright 2025 Google LLC
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
*/class At{constructor(e,t){this.requestOptions=t||{},this._apiSettings=re(e)}async generateContent(e,t){return ge(this._apiSettings,e.templateId,{inputs:e.templateVariables,...e.toolConfig!==void 0&&{toolConfig:e.toolConfig}},{...this.requestOptions,...t})}async generateContentStream(e,t){return Se(this._apiSettings,e.templateId,{inputs:e.templateVariables,...e.toolConfig!==void 0&&{toolConfig:e.toolConfig}},{...this.requestOptions,...t})}startChat(e){return new yt(this._apiSettings,e,this.requestOptions)}}/**
* @license
* Copyright 2024 Google LLC
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
*/class w{constructor(e){if(!e.type&&!e.anyOf)throw new c(l.INVALID_SCHEMA,"A schema must have either a 'type' or an 'anyOf' array of sub-schemas.");for(const t in e)this[t]=e[t];this.type=e.type,this.format=e.hasOwnProperty("format")?e.format:void 0,this.nullable=e.hasOwnProperty("nullable")?!!e.nullable:!1}toJSON(){const e={type:this.type};for(const t in this)this.hasOwnProperty(t)&&this[t]!==void 0&&(t!=="required"||this.type===T.OBJECT)&&(e[t]=this[t]);return e}static array(e){return new Ct(e,e.items)}static object(e){return new Nt(e,e.properties,e.optionalProperties)}static string(e){return new se(e)}static enumString(e){return new se(e,e.enum)}static integer(e){return new It(e)}static number(e){return new Tt(e)}static boolean(e){return new wt(e)}static anyOf(e){return new bt(e)}}class It extends w{constructor(e){super({type:T.INTEGER,...e})}}class Tt extends w{constructor(e){super({type:T.NUMBER,...e})}}class wt extends w{constructor(e){super({type:T.BOOLEAN,...e})}}class se extends w{constructor(e,t){super({type:T.STRING,...e}),this.enum=t}toJSON(){const e=super.toJSON();return this.enum&&(e.enum=this.enum),e}}class Ct extends w{constructor(e,t){super({type:T.ARRAY,...e}),this.items=t}toJSON(){const e=super.toJSON();return e.items=this.items.toJSON(),e}}class Nt extends w{constructor(e,t,n=[]){super({type:T.OBJECT,...e}),this.properties=t,this.optionalProperties=n}toJSON(){const e=super.toJSON();e.properties={...this.properties};const t=[];if(this.optionalProperties){for(const n of this.optionalProperties)if(!this.properties.hasOwnProperty(n))throw new c(l.INVALID_SCHEMA,`Property "${n}" specified in "optionalProperties" does not exist.`)}for(const n in this.properties)this.properties.hasOwnProperty(n)&&(e.properties[n]=this.properties[n].toJSON(),this.optionalProperties.includes(n)||t.push(n));return t.length>0&&(e.required=t),delete e.optionalProperties,e}}class bt extends w{constructor(e){if(e.anyOf.length===0)throw new c(l.INVALID_SCHEMA,"The 'anyOf' array must not be empty.");super({...e,type:void 0}),this.anyOf=e.anyOf}toJSON(){const e=super.toJSON();return this.anyOf&&Array.isArray(this.anyOf)&&(e.anyOf=this.anyOf.map(t=>t.toJSON())),e}}/**
* @license
* Copyright 2025 Google LLC
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
*/const Lt=16e3,Pt=24e3,Ae="audio-processor",vt=`
  class AudioProcessor extends AudioWorkletProcessor {
    constructor(options) {
      super();
      this.targetSampleRate = options.processorOptions.targetSampleRate;
      // 'sampleRate' is a global variable available inside the AudioWorkletGlobalScope,
      // representing the native sample rate of the AudioContext.
      this.inputSampleRate = sampleRate;
    }

    /**
     * This method is called by the browser's audio engine for each block of audio data.
     * Input is a single input, with a single channel (input[0][0]).
     */
    process(inputs) {
      const input = inputs[0];
      if (input && input.length > 0 && input[0].length > 0) {
        const pcmData = input[0]; // Float32Array of raw audio samples.
        
        // Simple linear interpolation for resampling.
        const resampled = new Float32Array(Math.round(pcmData.length * this.targetSampleRate / this.inputSampleRate));
        const ratio = pcmData.length / resampled.length;
        for (let i = 0; i < resampled.length; i++) {
          resampled[i] = pcmData[Math.floor(i * ratio)];
        }

        // Convert Float32 (-1, 1) samples to Int16 (-32768, 32767)
        const resampledInt16 = new Int16Array(resampled.length);
        for (let i = 0; i < resampled.length; i++) {
          const sample = Math.max(-1, Math.min(1, resampled[i]));
          if (sample < 0) {
            resampledInt16[i] = sample * 32768;
          } else {
            resampledInt16[i] = sample * 32767;
          }
        }
        
        this.port.postMessage(resampledInt16);
      }
      // Return true to keep the processor alive and processing the next audio block.
      return true;
    }
  }

  // Register the processor with a name that can be used to instantiate it from the main thread.
  registerProcessor('${Ae}', AudioProcessor);
`;class Dt{constructor(e,t,n){this.liveSession=e,this.options=t,this.deps=n,this.isStopped=!1,this.stopDeferred=new Le,this.playbackQueue=[],this.scheduledSources=[],this.nextStartTime=0,this.isPlaybackLoopRunning=!1,this.liveSession.inConversation=!0,this.receiveLoopPromise=this.runReceiveLoop().finally(()=>this.cleanup()),this.deps.workletNode.port.onmessage=o=>{if(this.isStopped)return;const i=o.data,a={mimeType:"audio/pcm",data:btoa(String.fromCharCode.apply(null,Array.from(new Uint8Array(i.buffer))))};this.liveSession.sendAudioRealtime(a)}}async stop(){this.isStopped||(this.isStopped=!0,this.stopDeferred.resolve(),await this.receiveLoopPromise)}cleanup(){this.interruptPlayback(),this.deps.workletNode.port.onmessage=null,this.deps.workletNode.disconnect(),this.deps.sourceNode.disconnect(),this.deps.mediaStream.getTracks().forEach(e=>e.stop()),this.deps.audioContext.state!=="closed"&&this.deps.audioContext.close(),this.liveSession.inConversation=!1}enqueueAndPlay(e){this.playbackQueue.push(e),this.processPlaybackQueue()}interruptPlayback(){[...this.scheduledSources].forEach(e=>e.stop(0)),this.playbackQueue.length=0,this.nextStartTime=this.deps.audioContext.currentTime}async processPlaybackQueue(){if(!this.isPlaybackLoopRunning){for(this.isPlaybackLoopRunning=!0;this.playbackQueue.length>0&&!this.isStopped;){const e=this.playbackQueue.shift();try{const t=new Int16Array(e),n=t.length,o=this.deps.audioContext.createBuffer(1,n,Pt),i=o.getChannelData(0);for(let r=0;r<n;r++)i[r]=t[r]/32768;const a=this.deps.audioContext.createBufferSource();a.buffer=o,a.connect(this.deps.audioContext.destination),this.scheduledSources.push(a),a.onended=()=>{this.scheduledSources=this.scheduledSources.filter(r=>r!==a)},this.nextStartTime=Math.max(this.deps.audioContext.currentTime,this.nextStartTime),a.start(this.nextStartTime),this.nextStartTime+=o.duration}catch(t){h.error("Error playing audio:",t)}}this.isPlaybackLoopRunning=!1}}async runReceiveLoop(){const e=this.liveSession.receive();for(;!this.isStopped;){const t=await Promise.race([e.next(),this.stopDeferred.promise]);if(this.isStopped||!t||t.done)break;const n=t.value;if(n.type==="serverContent"){const o=n;o.interrupted&&this.interruptPlayback();const i=o.modelTurn?.parts.find(a=>a?.type==="inlineData"&&a.inlineData?.mimeType?.startsWith("audio/"));if(i&&i.type==="inlineData"){const a=Uint8Array.from(atob(i.inlineData.data),r=>r.charCodeAt(0)).buffer;this.enqueueAndPlay(a)}}else if(n.type==="toolCall")if(!this.options.functionCallingHandler)h.warn("Received tool call message, but StartAudioConversationOptions.functionCallingHandler is undefined. Ignoring tool call.");else try{const o=await this.options.functionCallingHandler(n.functionCalls);this.isStopped||this.liveSession.sendFunctionResponses([o])}catch(o){throw new c(l.ERROR,`Function calling handler failed: ${o.message}`)}}}}async function Xt(s,e={}){if(s.isClosed)throw new c(l.SESSION_CLOSED,"Cannot start audio conversation on a closed LiveSession.");if(s.inConversation)throw new c(l.REQUEST_ERROR,"An audio conversation is already in progress for this session.");if(typeof AudioWorkletNode>"u"||typeof AudioContext>"u"||typeof navigator>"u"||!navigator.mediaDevices)throw new c(l.UNSUPPORTED,"Audio conversation is not supported in this environment. It requires the Web Audio API and AudioWorklet support.");let t;try{t=new AudioContext,t.state==="suspended"&&await t.resume();const n=await navigator.mediaDevices.getUserMedia({audio:!0}),o=new Blob([vt],{type:"application/javascript"}),i=URL.createObjectURL(o);await t.audioWorklet.addModule(i);const a=t.createMediaStreamSource(n),r=new AudioWorkletNode(t,Ae,{processorOptions:{targetSampleRate:Lt}});a.connect(r);const p=new Dt(s,e,{audioContext:t,mediaStream:n,sourceNode:a,workletNode:r});return{stop:()=>p.stop()}}catch(n){throw t&&t.state!=="closed"&&t.close(),n instanceof c||n instanceof DOMException?n:new c(l.ERROR,`Failed to initialize audio recording: ${n.message}`)}}/**
* @license
* Copyright 2024 Google LLC
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
*/function zt(s=Ne(),e){s=we(s);const t=Ce(s,L),n=e?.backend??new B,o=$e(n),i=t.getImmediate({identifier:o}),a=i.options;if(a){const r=e?.useLimitedUseAppCheckTokens,p=!!a.useLimitedUseAppCheckTokens;if(r!=null&&!!r!==p)throw new c(l.ALREADY_INITIALIZED,`getAI() has already been called for app "${s.name}" and this backend with useLimitedUseAppCheckTokens: ${p}. This option cannot be changed after the AI instance has been initialized. Pass the desired options to the first getAI() call for this app and backend, or omit useLimitedUseAppCheckTokens to reuse the existing instance.`);return i}return i.options={useLimitedUseAppCheckTokens:e?.useLimitedUseAppCheckTokens??!1},i}const Mt=["mode","onDeviceParams","inCloudParams"];function Zt(s,e,t){const n=e;let o;if(n.mode){for(const r of Object.keys(e))Mt.includes(r)||h.warn(`When a hybrid inference mode is specified (mode is currently set to ${n.mode}), "${r}" cannot be configured at the top level. Configuration for in-cloud and on-device must be done separately in inCloudParams and onDeviceParams. Configuration values set outside of inCloudParams and onDeviceParams will be ignored.`);o=n.inCloudParams||{model:Ge}}else o=e;if(!o.model)throw new c(l.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");const i=s.chromeAdapterFactory?.(n.mode,typeof window>"u"?void 0:window,n.onDeviceParams),a=new Et(s,o,t,i);return a._apiSettings.inferenceMode=n.mode,a}function es(s,e){if(!e.model)throw new c(l.NO_MODEL,"Must provide a model name for getLiveGenerativeModel. Example: getLiveGenerativeModel(ai, { model: 'my-model-name' })");return new _t(s,e)}function ts(s,e){return new At(s,e)}/**
* @license
* Copyright 2025 Google LLC
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
*/function kt(){Pe(new ve(L,Be,"PUBLIC").setMultipleInstances(!0)),j(J,V),j(J,V,"esm2020")}kt();export{c as AIError,l as AIErrorCode,b as AIModel,U as AgentPlatformBackend,bt as AnyOfSchema,Ct as ArraySchema,ie as Backend,R as BackendType,Ht as BlockReason,wt as BooleanSchema,m as FinishReason,Yt as FunctionCallingMode,Et as GenerativeModel,B as GoogleAIBackend,$t as HarmBlockMethod,Gt as HarmBlockThreshold,xt as HarmCategory,Ft as HarmProbability,oe as HarmSeverity,Vt as ImageConfigAspectRatio,Bt as ImageConfigImageSize,g as InferenceMode,y as InferenceSource,It as IntegerSchema,Jt as Language,_t as LiveGenerativeModel,C as LiveResponseType,Ot as LiveSession,qt as Modality,Tt as NumberSchema,Nt as ObjectSchema,jt as Outcome,Q as POSSIBLE_ROLES,Wt as ResponseModality,w as Schema,T as SchemaType,se as StringSchema,At as TemplateGenerativeModel,Kt as ThinkingLevel,Qt as URLRetrievalStatus,zt as getAI,Zt as getGenerativeModel,es as getLiveGenerativeModel,ts as getTemplateGenerativeModel,Xt as startAudioConversation};
