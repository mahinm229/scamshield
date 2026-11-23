import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createScamShieldHybridEngine,
  HYBRID_MODES,
  DEFAULT_CLOUD_MODEL,
} from '../src/firebase-hybrid.mjs';

function makeMockFirebaseSdk(overrides = {}) {
  const calls = {
    initializeApp: [],
    initializeAppCheck: [],
    getAI: [],
    getGenerativeModel: [],
    initializeDeviceModel: 0,
    generateContent: [],
  };

  class MockGoogleAIBackend {}
  class MockReCaptchaEnterpriseProvider {
    constructor(key) {
      this.siteKey = key;
    }
  }

  const Schema = {
    object: (cfg) => ({ kind: 'object', ...cfg }),
    string: () => ({ kind: 'string' }),
    integer: () => ({ kind: 'integer' }),
    array: (cfg) => ({ kind: 'array', ...cfg }),
    enumString: (cfg) => ({ kind: 'enum', ...cfg }),
  };

  const sdkModules = {
    getApps: () => [],
    initializeApp: (cfg) => {
      calls.initializeApp.push(cfg);
      return { name: '[DEFAULT]', options: cfg };
    },
    ReCaptchaEnterpriseProvider: MockReCaptchaEnterpriseProvider,
    initializeAppCheck: (app, opts) => {
      calls.initializeAppCheck.push({ app, opts });
      return { app };
    },
    GoogleAIBackend: MockGoogleAIBackend,
    InferenceMode: {
      PREFER_ON_DEVICE: 'PREFER_ON_DEVICE',
      PREFER_IN_CLOUD: 'PREFER_IN_CLOUD',
      ONLY_ON_DEVICE: 'ONLY_ON_DEVICE',
      ONLY_IN_CLOUD: 'ONLY_IN_CLOUD',
    },
    Schema,
    getAI: (app, opts) => {
      calls.getAI.push({ app, opts });
      return { app, opts };
    },
    getGenerativeModel: (ai, params) => {
      calls.getGenerativeModel.push(params);
      return {
        initializeDeviceModel: async (progressCb) => {
          calls.initializeDeviceModel++;
          if (typeof progressCb === 'function') {
            progressCb(0.5);
            progressCb(1.0);
          }
        },
        generateContent: async (input) => {
          calls.generateContent.push(input);
          const source = overrides.inferenceSource || 'ON_DEVICE';
          return {
            response: {
              inferenceSource: source,
              text: () =>
                JSON.stringify({
                  riskLevel: overrides.riskLevel || 'HIGH_RISK_SCAM',
                  confidenceScore: overrides.confidenceScore ?? 92,
                  scamCategory: 'bKash Credential Smishing',
                  psychologicalTactics: ['Artificial Urgency', 'Account Freeze Threat'],
                  visualIndicators: Array.isArray(input) ? ['Altered receipt font detected'] : [],
                  plainLanguageSummary: 'Impersonates bKash to steal PIN/OTP.',
                  recommendedAction: 'Block sender immediately.',
                }),
            },
          };
        },
      };
    },
  };

  return { sdkModules, calls };
}

test('1. Unconfigured engine is 100% honest: reports LOCAL_DETERMINISTIC_ONLY & 0 cloud bytes', async () => {
  const engine = createScamShieldHybridEngine();
  const res = await engine.analyze({ text: 'Urgent! Share your OTP 482913 now.' });
  assert.equal(res.executionMode, 'LOCAL_DETERMINISTIC_ONLY');
  assert.equal(res.inferenceSource, 'LOCAL_RULES_ONLY');
  assert.equal(res.cloudBytesTransmitted, 0);
  assert.equal(res.aiForensics, null);
});

test('2. Initializes App Check (ReCaptchaEnterpriseProvider) and getAI with useLimitedUseAppCheckTokens: true', async () => {
  const { sdkModules, calls } = makeMockFirebaseSdk();
  const engine = createScamShieldHybridEngine({ sdkModules });
  const initRes = await engine.initialize({
    firebaseConfig: { apiKey: 'test-key', projectId: 'test-proj', appId: '1:1:web:abc' },
    recaptchaSiteKey: 'recaptcha-site-key-123',
  });

  assert.equal(initRes.ready, true);
  assert.equal(initRes.appCheckActive, true);
  assert.equal(calls.initializeAppCheck.length, 1);
  assert.equal(calls.initializeAppCheck[0].opts.isTokenAutoRefreshEnabled, true);
  assert.equal(calls.initializeAppCheck[0].opts.provider.siteKey, 'recaptcha-site-key-123');
  assert.equal(calls.getAI[0].opts.useLimitedUseAppCheckTokens, true);
});

test('3. Configures symmetric Schema for BOTH inCloudParams.responseSchema and onDeviceParams.responseConstraint', async () => {
  const { sdkModules, calls } = makeMockFirebaseSdk({ inferenceSource: 'ON_DEVICE' });
  const engine = createScamShieldHybridEngine({ sdkModules });
  await engine.initialize({
    firebaseConfig: { apiKey: 'k', projectId: 'p', appId: 'a' },
  });

  const progressValues = [];
  const res = await engine.analyze({
    text: 'জরুরি! বিকাশ নম্বর ০১৭১২৩৪৫৬৭৮ পিন 4829 পাঠান login.bkash-fake.xyz',
    mode: HYBRID_MODES.PREFER_ON_DEVICE,
    onDeviceProgress: (p) => progressValues.push(p),
  });

  assert.equal(calls.getGenerativeModel.length, 1);
  const modelParams = calls.getGenerativeModel[0];
  assert.equal(modelParams.mode, 'PREFER_ON_DEVICE');
  assert.equal(modelParams.inCloudParams.model, DEFAULT_CLOUD_MODEL);
  assert.ok(modelParams.inCloudParams.generationConfig.responseSchema);
  assert.ok(modelParams.onDeviceParams.promptOptions.responseConstraint);
  assert.equal(calls.initializeDeviceModel, 1);
  assert.deepEqual(progressValues, [50, 100]);

  // ON_DEVICE reports 0 cloud bytes transmitted!
  assert.equal(res.inferenceSource, 'ON_DEVICE');
  assert.equal(res.cloudBytesTransmitted, 0);

  // Raw PII must NEVER appear in the prompt sent to generateContent
  const sentPrompt = String(calls.generateContent[0]);
  assert.ok(!sentPrompt.includes('01712345678'), 'Raw BD phone leaked to AI prompt!');
  assert.ok(!sentPrompt.includes('4829'), 'Raw PIN leaked to AI prompt!');
});

test('4. Cloud fallback (IN_CLOUD) reports accurate sanitized bytes & multimodal v13 inlineData Part', async () => {
  const { sdkModules, calls } = makeMockFirebaseSdk({ inferenceSource: 'IN_CLOUD' });
  const engine = createScamShieldHybridEngine({ sdkModules });
  await engine.initialize({
    firebaseConfig: { apiKey: 'k', projectId: 'p', appId: 'a' },
  });

  const res = await engine.analyze({
    text: 'Check this bKash receipt screenshot for Account 1234567890123',
    image: { base64: 'iVBORw0KGgoAAAANSUhEUgAAAAUA', mimeType: 'image/png' },
    mode: HYBRID_MODES.PREFER_IN_CLOUD,
  });

  assert.equal(res.inferenceSource, 'IN_CLOUD');
  assert.ok(res.cloudBytesTransmitted > 0);
  assert.equal(res.multimodalAttached, true);

  // Verify v13 discriminated-union Part shape: { type: "inlineData", inlineData: { data, mimeType } }
  const sentInput = calls.generateContent[0];
  assert.ok(Array.isArray(sentInput));
  assert.equal(sentInput[1].type, 'inlineData');
  assert.equal(sentInput[1].inlineData.mimeType, 'image/png');
  assert.ok(!sentInput[0].includes('1234567890123'), 'Raw account number leaked!');
});
