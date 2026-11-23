/**
 * ScamShield v3.0 — Zero-XSS Accessible UI Controller
 *
 * Adds v3.0 Masterpiece features:
 *  - OS-aware Light/Dark Theme toggle
 *  - 1-Click Official Complaint Templates (BTRC 1212 Bangladesh, BD Police Cyber Support, US FTC/IC3)
 *  - Cryptographic SHA-256 Evidence Fingerprint (Web Crypto API) + .txt Evidence Download
 *  - Live-Executable 20-Case Security & False-Positive Benchmark Table in UI
 *  - DevTools Styled Hybrid Lifecycle Console Logger (`[ScamShield Hybrid]`)
 */

import {
  createScamShieldHybridEngine,
  HYBRID_MODES,
  probeOnDeviceHardware,
} from './firebase-hybrid.mjs';
import { redactPII } from './pii-redactor.mjs';
import { runTwentyCaseBenchmark } from './benchmark-suite.mjs';
import { JUDGE_TOURS, SAMPLES } from './samples.mjs';

const SESSION_CONFIG_KEY = 'scamshield_firebase_runtime_cfg_v3';

export const AGENCY_HEADERS = {
  btrc_1212: 'TO: BTRC Shortcode 1212 / bKash & Nagad Fraud Response Desk (Bangladesh)',
  bd_cyber: 'TO: Bangladesh Police Cyber Support for Women / CTTC Cyber Crime Unit',
  ftc_ic3: 'TO: US Federal Trade Commission (ReportFraud.ftc.gov) / FBI IC3',
};

export function buildIncidentReportText(result, agencyKey = 'btrc_1212') {
  const agencyHeader = AGENCY_HEADERS[agencyKey] || AGENCY_HEADERS.btrc_1212;
  const lines = [
    '=== SCAMSHIELD v3.0 — PII-SAFE OFFICIAL INCIDENT COMPLAINT ===',
    agencyHeader,
    `Verdict: ${result.finalVerdict} (Risk Score: ${result.finalScore}/100)`,
    `Execution Mode: ${result.executionMode}`,
    `Verified SDK Inference Source: ${result.inferenceSource}`,
    `Cloud Bytes Transmitted: ${result.cloudBytesTransmitted} bytes`,
    `Local PII Scrubbed: ${result.privacyDiff.redactionCount} sensitive items removed`,
    '',
    '--- Sanitized Evidence Message (Zero Raw Victim PII) ---',
    result.privacyDiff.sanitized || '[No text provided]',
    '',
    '--- Detected Deterministic Signals ---',
    ...(result.deterministic.signals.length > 0
      ? result.deterministic.signals.map((s) => `- [${s.severity.toUpperCase()}] ${s.label}: ${s.reason}`)
      : ['- None detected']),
  ];

  if (result.deterministic.urls.length > 0) {
    lines.push('', '--- Extracted Malicious URLs (Defanged) ---');
    for (const u of result.deterministic.urls) {
      lines.push(`- ${u.replace(/\./g, '[.]')}`);
    }
  }

  if (result.aiForensics) {
    lines.push(
      '',
      '--- Firebase AI Logic Forensics ---',
      `Category: ${result.aiForensics.scamCategory || 'N/A'}`,
      `Summary: ${result.aiForensics.plainLanguageSummary || 'N/A'}`,
      `Recommended Action: ${result.aiForensics.recommendedAction || result.deterministic.recommendedAction}`
    );
  } else {
    lines.push('', `Recommended Action: ${result.deterministic.recommendedAction}`);
  }

  return lines.join('\n');
}

export async function computeEvidenceSha256(text) {
  const str = String(text);
  if (typeof globalThis.crypto?.subtle?.digest === 'function') {
    const data = new TextEncoder().encode(str);
    const hashBuf = await globalThis.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  try {
    const { createHash } = await import('node:crypto');
    return createHash('sha256').update(str, 'utf8').digest('hex');
  } catch {
    return 'unavailable_in_non_secure_context';
  }
}

function logHybridTrace(stage, detail) {
  if (typeof console !== 'undefined' && typeof console.info === 'function') {
    console.info(
      `%c[ScamShield v3 Hybrid]%c ${stage}`,
      'background:#0EA5E9;color:#fff;font-weight:700;padding:2px 6px;border-radius:4px;',
      'color:#10B981;font-weight:600;',
      detail
    );
  }
}

function clearChildren(el) {
  while (el && el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

export function initScamShieldApp(doc = document, win = window, engineOverride = null) {
  const engine = engineOverride || createScamShieldHybridEngine();
  let selectedMode = HYBRID_MODES.PREFER_ON_DEVICE;
  let attachedImage = null;
  let activeRequestId = 0;
  let lastResult = null;
  let lastReportText = '';
  let copyResetTimer = null;

  const $ = (id) => doc.getElementById(id);

  const els = {
    networkPill: $('networkStatusPill'),
    hardwarePill: $('hardwareStatusPill'),
    btnThemeToggle: $('btnThemeToggle'),
    runtimeBadge: $('runtimeModeBadge'),
    telemetrySource: $('telemetrySource'),
    telemetryBytes: $('telemetryBytes'),
    telemetryLatency: $('telemetryLatency'),
    telemetryPiiCount: $('telemetryPiiCount'),
    nanoProgressWrap: $('nanoProgressWrap'),
    nanoProgressLabel: $('nanoProgressLabel'),
    nanoProgressPct: $('nanoProgressPct'),
    nanoProgressBar: $('nanoProgressBar'),
    toursContainer: $('judgeToursContainer'),
    tourBanner: $('tourBanner'),
    errorBanner: $('errorBanner'),
    messageInput: $('messageInput'),
    screenshotInput: $('screenshotInput'),
    screenshotPreviewWrap: $('screenshotPreviewWrap'),
    screenshotPreviewImg: $('screenshotPreviewImg'),
    screenshotMeta: $('screenshotMeta'),
    btnRemoveScreenshot: $('btnRemoveScreenshot'),
    sampleButtonsContainer: $('sampleButtonsContainer'),
    btnAnalyze: $('btnAnalyze'),
    btnClear: $('btnClear'),
    privacyDiffBadge: $('privacyDiffBadge'),
    privacyRawText: $('privacyRawText'),
    privacySanitizedText: $('privacySanitizedText'),
    redactionTagsContainer: $('redactionTagsContainer'),
    resultSection: $('resultSection'),
    verdictBadge: $('verdictBadge'),
    verdictHeading: $('verdictHeading'),
    telemetryNoticeText: $('telemetryNoticeText'),
    scoreNumber: $('scoreNumber'),
    recommendedActionBox: $('recommendedActionBox'),
    signalsList: $('signalsList'),
    urlsListWrap: $('urlsListWrap'),
    urlsList: $('urlsList'),
    aiForensicsContainer: $('aiForensicsContainer'),
    complaintAgencySelect: $('complaintAgencySelect'),
    reportShaBadge: $('reportShaBadge'),
    incidentReportPre: $('incidentReportPre'),
    btnCopyReport: $('btnCopyReport'),
    btnDownloadReport: $('btnDownloadReport'),
    btnRunBenchmark: $('btnRunBenchmark'),
    benchmarkSummaryBar: $('benchmarkSummaryBar'),
    benchmarkTableWrap: $('benchmarkTableWrap'),
    benchmarkTableBody: $('benchmarkTableBody'),
    btnConfigureFirebase: $('btnConfigureFirebase'),
    btnWarmUpNano: $('btnWarmUpNano'),
    firebaseModal: $('firebaseModal'),
    btnCloseModal: $('btnCloseModal'),
    firebaseConfigForm: $('firebaseConfigForm'),
    btnResetFirebaseConfig: $('btnResetFirebaseConfig'),
  };

  function showError(msg) {
    if (!els.errorBanner) return;
    if (!msg) {
      els.errorBanner.textContent = '';
      els.errorBanner.classList.add('hidden');
      return;
    }
    els.errorBanner.textContent = msg;
    els.errorBanner.classList.remove('hidden');
  }

  function applyTheme(theme) {
    doc.documentElement.setAttribute('data-theme', theme);
    if (els.btnThemeToggle) {
      els.btnThemeToggle.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    }
  }

  if (els.btnThemeToggle) {
    els.btnThemeToggle.addEventListener('click', () => {
      const cur = doc.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }

  function updateNetworkPill() {
    if (!els.networkPill) return;
    const online = typeof win.navigator !== 'undefined' ? win.navigator.onLine : true;
    els.networkPill.textContent = online ? 'Online' : 'Offline (On-Device Ready)';
    els.networkPill.className = `status-pill ${online ? 'status-ok' : 'status-warn'}`;
  }

  async function refreshHardwareProbe() {
    if (!els.hardwarePill) return;
    const hw = await probeOnDeviceHardware();
    if (hw.available) {
      els.hardwarePill.textContent = `Chrome AI: ${hw.status}`;
      els.hardwarePill.className = 'status-pill status-ok';
    } else {
      els.hardwarePill.textContent = 'Chrome Nano: Unavailable (Cloud Fallback)';
      els.hardwarePill.className = 'status-pill status-warn';
    }
  }

  function updateRuntimeBadge(isLive, cloudModel) {
    if (!els.runtimeBadge) return;
    if (isLive) {
      els.runtimeBadge.textContent = `MODE: LIVE FIREBASE AI LOGIC HYBRID (${cloudModel} + App Check)`;
      els.runtimeBadge.className = 'runtime-badge runtime-live';
    } else {
      els.runtimeBadge.textContent =
        'MODE: LOCAL DETERMINISTIC ENGINE (Configure Firebase for Live Hybrid AI)';
      els.runtimeBadge.className = 'runtime-badge runtime-local';
    }
  }

  function renderPrivacyDiff(rawText) {
    const diff = redactPII(rawText);
    if (els.privacyRawText) {
      els.privacyRawText.textContent = rawText || 'Paste or pick a sample to inspect live PII redaction…';
    }
    if (els.privacySanitizedText) {
      els.privacySanitizedText.textContent = diff.sanitized || 'Waiting for input…';
    }
    if (els.privacyDiffBadge) {
      els.privacyDiffBadge.textContent =
        diff.redactionCount > 0
          ? `${diff.redactionCount} Sensitive Items Scrubbed Locally`
          : '0 Raw Secrets Detected';
    }
    if (els.telemetryPiiCount) {
      els.telemetryPiiCount.textContent = String(diff.redactionCount);
    }
    if (els.redactionTagsContainer) {
      clearChildren(els.redactionTagsContainer);
      for (const item of diff.redactions) {
        const tag = doc.createElement('span');
        tag.className = 'redaction-tag';
        tag.textContent = `${item.type} → ${item.token} (${item.preview})`;
        els.redactionTagsContainer.appendChild(tag);
      }
    }
  }

  function selectMode(modeKey) {
    selectedMode = modeKey;
    for (const btn of doc.querySelectorAll('.mode-btn')) {
      const isMatch = btn.dataset.mode === modeKey;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-checked', isMatch ? 'true' : 'false');
    }
  }

  function selectTab(tabId) {
    const map = [
      { btn: 'tabBtnSignals', panel: 'panelSignals' },
      { btn: 'tabBtnForensics', panel: 'panelForensics' },
      { btn: 'tabBtnReport', panel: 'panelReport' },
    ];
    for (const pair of map) {
      const btnEl = $(pair.btn);
      const panelEl = $(pair.panel);
      const active = pair.btn === tabId;
      if (btnEl) {
        btnEl.classList.toggle('active', active);
        btnEl.setAttribute('aria-selected', active ? 'true' : 'false');
      }
      if (panelEl) panelEl.classList.toggle('hidden', !active);
    }
  }

  async function refreshComplaintDraft() {
    if (!lastResult) return;
    const agencyKey = els.complaintAgencySelect ? els.complaintAgencySelect.value : 'btrc_1212';
    lastReportText = buildIncidentReportText(lastResult, agencyKey);
    if (els.incidentReportPre) els.incidentReportPre.textContent = lastReportText;
    const sha = await computeEvidenceSha256(lastReportText);
    if (els.reportShaBadge) {
      els.reportShaBadge.textContent = `SHA-256: ${sha.slice(0, 16)}…`;
    }
  }

  function renderResult(res) {
    lastResult = res;
    logHybridTrace('Analysis Completed', {
      executionMode: res.executionMode,
      inferenceSource: res.inferenceSource,
      cloudBytesTransmitted: res.cloudBytesTransmitted,
      piiScrubbed: res.privacyDiff.redactionCount,
      finalScore: res.finalScore,
      finalVerdict: res.finalVerdict,
      latencyMs: res.latencyMs,
    });

    if (els.telemetrySource) els.telemetrySource.textContent = res.inferenceSource;
    if (els.telemetryBytes) els.telemetryBytes.textContent = `${res.cloudBytesTransmitted} B`;
    if (els.telemetryLatency) els.telemetryLatency.textContent = `${res.latencyMs} ms`;
    if (els.telemetryPiiCount) els.telemetryPiiCount.textContent = String(res.privacyDiff.redactionCount);

    if (els.scoreNumber) els.scoreNumber.textContent = String(res.finalScore);
    if (els.verdictBadge) {
      els.verdictBadge.textContent = res.finalVerdict;
      const cls =
        res.finalVerdict === 'HIGH_RISK_SCAM'
          ? 'verdict-scam'
          : res.finalVerdict === 'SUSPICIOUS'
            ? 'verdict-suspicious'
            : 'verdict-safe';
      els.verdictBadge.className = `verdict-badge ${cls}`;
    }
    if (els.verdictHeading) {
      els.verdictHeading.textContent =
        res.finalVerdict === 'HIGH_RISK_SCAM'
          ? 'High-Risk Scam Detected'
          : res.finalVerdict === 'SUSPICIOUS'
            ? 'Suspicious — Verify Independently'
            : 'Low Risk / Likely Safe';
    }
    if (els.telemetryNoticeText) els.telemetryNoticeText.textContent = res.telemetryNotice;
    if (els.recommendedActionBox) {
      els.recommendedActionBox.textContent =
        res.aiForensics?.recommendedAction || res.deterministic.recommendedAction;
    }

    if (els.signalsList) {
      clearChildren(els.signalsList);
      if (res.deterministic.signals.length === 0) {
        const li = doc.createElement('li');
        li.className = 'signal-item';
        const t = doc.createElement('div');
        t.className = 'signal-item-title';
        t.textContent = 'No deterministic scam signals triggered.';
        li.appendChild(t);
        els.signalsList.appendChild(li);
      } else {
        for (const sig of res.deterministic.signals) {
          const li = doc.createElement('li');
          li.className = 'signal-item';
          const title = doc.createElement('div');
          title.className = 'signal-item-title';
          title.textContent = `[${sig.severity.toUpperCase()}] ${sig.label} (+${sig.weight})`;
          const reason = doc.createElement('p');
          reason.className = 'signal-item-reason';
          reason.textContent = sig.reason;
          li.appendChild(title);
          li.appendChild(reason);
          els.signalsList.appendChild(li);
        }
      }
    }

    if (els.urlsListWrap && els.urlsList) {
      clearChildren(els.urlsList);
      if (res.deterministic.urls.length > 0) {
        els.urlsListWrap.classList.remove('hidden');
        for (const u of res.deterministic.urls) {
          const li = doc.createElement('li');
          li.className = 'signal-item';
          li.textContent = u.replace(/\./g, '[.]');
          els.urlsList.appendChild(li);
        }
      } else {
        els.urlsListWrap.classList.add('hidden');
      }
    }

    if (els.aiForensicsContainer) {
      clearChildren(els.aiForensicsContainer);
      const addCard = (heading, bodyText) => {
        const card = doc.createElement('div');
        card.className = 'forensic-card';
        const h4 = doc.createElement('h4');
        h4.textContent = heading;
        const p = doc.createElement('p');
        p.textContent = bodyText;
        card.appendChild(h4);
        card.appendChild(p);
        els.aiForensicsContainer.appendChild(card);
      };

      if (res.aiForensics) {
        addCard('Scam Category', res.aiForensics.scamCategory || 'General');
        addCard('Plain-Language Summary', res.aiForensics.plainLanguageSummary || '—');
        addCard('Psychological Tactics', (res.aiForensics.psychologicalTactics || []).join(' • ') || 'None identified');
        addCard(
          'Visual / Screenshot Indicators',
          (res.aiForensics.visualIndicators || []).join(' • ') ||
            (res.multimodalAttached ? 'No visual spoofing detected' : 'No screenshot attached')
        );
      } else {
        addCard(
          'Firebase AI Logic Hybrid Inference Status',
          'Live Firebase AI Logic is not yet configured in this session. Click "⚙️ Firebase Config" in the header to run live Gemini Nano on-device / Gemini 3.5 Flash Lite cloud forensics.'
        );
      }
    }

    refreshComplaintDraft();
    if (els.resultSection) els.resultSection.classList.remove('hidden');
  }

  async function runAnalysis() {
    showError('');
    const text = els.messageInput ? els.messageInput.value : '';
    if (!text.trim() && !attachedImage) {
      showError('Please paste a message or attach a JPEG/PNG screenshot before running analysis.');
      return;
    }

    renderPrivacyDiff(text);
    const reqId = ++activeRequestId;
    if (els.btnAnalyze) {
      els.btnAnalyze.disabled = true;
      els.btnAnalyze.textContent = 'Analyzing…';
    }

    try {
      const res = await engine.analyze({
        text,
        image: attachedImage,
        mode: selectedMode,
        onDeviceProgress: (pct) => {
          if (els.nanoProgressWrap) els.nanoProgressWrap.classList.remove('hidden');
          if (els.nanoProgressPct) els.nanoProgressPct.textContent = `${pct}%`;
          if (els.nanoProgressBar) els.nanoProgressBar.style.width = `${pct}%`;
        },
      });
      if (reqId !== activeRequestId) return;
      renderResult(res);
    } catch (err) {
      if (reqId !== activeRequestId) return;
      showError(`Analysis failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      if (reqId === activeRequestId && els.btnAnalyze) {
        els.btnAnalyze.disabled = false;
        els.btnAnalyze.textContent = '🔍 Run Hybrid Scam Analysis';
      }
    }
  }

  function clearAll() {
    activeRequestId++;
    lastResult = null;
    lastReportText = '';
    showError('');
    if (els.messageInput) els.messageInput.value = '';
    attachedImage = null;
    if (els.screenshotInput) els.screenshotInput.value = '';
    if (els.screenshotPreviewWrap) els.screenshotPreviewWrap.classList.add('hidden');
    if (els.resultSection) els.resultSection.classList.add('hidden');
    if (els.tourBanner) {
      els.tourBanner.textContent = '';
      els.tourBanner.classList.add('hidden');
    }
    if (els.telemetrySource) els.telemetrySource.textContent = 'IDLE';
    if (els.telemetryBytes) els.telemetryBytes.textContent = '0 B';
    if (els.telemetryLatency) els.telemetryLatency.textContent = '—';
    renderPrivacyDiff('');
    selectTab('tabBtnSignals');
    if (els.btnCopyReport) els.btnCopyReport.textContent = '📋 Copy Complaint Draft';
  }

  // Live 20-Case Benchmark Runner in UI
  if (els.btnRunBenchmark) {
    els.btnRunBenchmark.addEventListener('click', () => {
      const bench = runTwentyCaseBenchmark();
      if (els.benchmarkSummaryBar) {
        els.benchmarkSummaryBar.textContent = `Live Benchmark Result: ${bench.passed}/${bench.total} PASSED (${bench.accuracyPct}% Accuracy across Bangla smishing, legitimate OTP guards, subdomain spoofing & PII boundaries).`;
        els.benchmarkSummaryBar.classList.remove('hidden');
      }
      if (els.benchmarkTableBody && els.benchmarkTableWrap) {
        clearChildren(els.benchmarkTableBody);
        for (const r of bench.results) {
          const tr = doc.createElement('tr');
          for (const val of [
            r.id,
            r.category,
            r.expected,
            r.actual,
            `${r.score}/100`,
            String(r.piiScrubbed),
            r.passed ? 'PASS ✅' : 'FAIL ❌',
          ]) {
            const td = doc.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
          }
          els.benchmarkTableBody.appendChild(tr);
        }
        els.benchmarkTableWrap.classList.remove('hidden');
      }
    });
  }

  if (els.complaintAgencySelect) {
    els.complaintAgencySelect.addEventListener('change', () => refreshComplaintDraft());
  }

  if (els.btnDownloadReport) {
    els.btnDownloadReport.addEventListener('click', () => {
      if (!lastReportText) return;
      const blob = new win.Blob([lastReportText], { type: 'text/plain;charset=utf-8' });
      const url = win.URL.createObjectURL(blob);
      const a = doc.createElement('a');
      a.href = url;
      a.download = 'ScamShield_PII_Safe_Evidence_Report.txt';
      doc.body.appendChild(a);
      a.click();
      doc.body.removeChild(a);
      win.URL.revokeObjectURL(url);
    });
  }

  if (els.sampleButtonsContainer) {
    clearChildren(els.sampleButtonsContainer);
    for (const s of SAMPLES) {
      const btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'sample-chip';
      btn.textContent = s.title;
      btn.addEventListener('click', () => {
        if (els.messageInput) els.messageInput.value = s.text;
        selectMode(s.recommendedMode);
        renderPrivacyDiff(s.text);
        runAnalysis();
      });
      els.sampleButtonsContainer.appendChild(btn);
    }
  }

  if (els.toursContainer) {
    clearChildren(els.toursContainer);
    for (const tour of JUDGE_TOURS) {
      const btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'tour-btn';
      btn.textContent = tour.label;
      btn.addEventListener('click', () => {
        const sample = SAMPLES.find((s) => s.id === tour.sampleId);
        if (sample && els.messageInput) {
          els.messageInput.value = sample.text;
          selectMode(tour.mode);
          renderPrivacyDiff(sample.text);
          if (els.tourBanner) {
            els.tourBanner.textContent = tour.explanation;
            els.tourBanner.classList.remove('hidden');
          }
          runAnalysis();
        }
      });
      els.toursContainer.appendChild(btn);
    }
  }

  for (const btn of doc.querySelectorAll('.mode-btn')) {
    btn.addEventListener('click', () => selectMode(btn.dataset.mode));
  }
  for (const id of ['tabBtnSignals', 'tabBtnForensics', 'tabBtnReport']) {
    const tabEl = $(id);
    if (tabEl) tabEl.addEventListener('click', () => selectTab(id));
  }

  if (els.messageInput) {
    els.messageInput.addEventListener('input', () => renderPrivacyDiff(els.messageInput.value));
  }
  if (els.btnAnalyze) els.btnAnalyze.addEventListener('click', () => runAnalysis());
  if (els.btnClear) els.btnClear.addEventListener('click', () => clearAll());

  if (els.screenshotInput) {
    els.screenshotInput.addEventListener('change', (ev) => {
      const file = ev.target?.files?.[0];
      if (!file) return;
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        showError('Only JPEG and PNG screenshots are supported for multimodal hybrid inference.');
        return;
      }
      if (file.size > 7 * 1024 * 1024) {
        showError('Screenshot must be 7 MB or smaller.');
        return;
      }
      const reader = new win.FileReader();
      reader.onload = () => {
        const dataUrl = String(reader.result || '');
        const base64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
        attachedImage = { base64, mimeType: file.type, name: file.name, sizeBytes: file.size };
        if (els.screenshotPreviewImg) els.screenshotPreviewImg.src = dataUrl;
        if (els.screenshotMeta) els.screenshotMeta.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;
        if (els.screenshotPreviewWrap) els.screenshotPreviewWrap.classList.remove('hidden');
        showError('');
      };
      reader.readAsDataURL(file);
    });
  }

  if (els.btnRemoveScreenshot) {
    els.btnRemoveScreenshot.addEventListener('click', () => {
      attachedImage = null;
      if (els.screenshotInput) els.screenshotInput.value = '';
      if (els.screenshotPreviewWrap) els.screenshotPreviewWrap.classList.add('hidden');
    });
  }

  if (els.btnCopyReport) {
    els.btnCopyReport.addEventListener('click', async () => {
      if (!lastReportText) return;
      let copied = false;
      try {
        if (win.navigator?.clipboard?.writeText) {
          await win.navigator.clipboard.writeText(lastReportText);
          copied = true;
        }
      } catch {
        copied = false;
      }
      if (!copied && doc.execCommand) {
        const ta = doc.createElement('textarea');
        ta.value = lastReportText;
        doc.body.appendChild(ta);
        ta.select();
        copied = doc.execCommand('copy');
        doc.body.removeChild(ta);
      }
      els.btnCopyReport.textContent = copied ? 'Copied to Clipboard! ✅' : 'Copy Failed — Select Manually';
      if (copyResetTimer) win.clearTimeout(copyResetTimer);
      copyResetTimer = win.setTimeout(() => {
        if (els.btnCopyReport) els.btnCopyReport.textContent = '📋 Copy Complaint Draft';
      }, 2200);
    });
  }

  if (els.btnWarmUpNano) {
    els.btnWarmUpNano.addEventListener('click', async () => {
      showError('');
      if (!engine.getState().initialized) {
        showError('Configure your Firebase Web Config first via "⚙️ Firebase Config" to initialize Gemini Nano via Firebase AI Logic.');
        return;
      }
      if (els.nanoProgressWrap) els.nanoProgressWrap.classList.remove('hidden');
      try {
        await engine.warmUpOnDeviceModel((pct) => {
          if (els.nanoProgressPct) els.nanoProgressPct.textContent = `${pct}%`;
          if (els.nanoProgressBar) els.nanoProgressBar.style.width = `${pct}%`;
        }, selectedMode);
        if (els.nanoProgressLabel) els.nanoProgressLabel.textContent = 'Gemini Nano on-device model ready ✅';
        if (els.nanoProgressPct) els.nanoProgressPct.textContent = '100%';
        if (els.nanoProgressBar) els.nanoProgressBar.style.width = '100%';
      } catch (err) {
        showError(
          `On-device model warm-up unavailable (${err instanceof Error ? err.message : String(err)}). PREFER_ON_DEVICE will automatically fall back to Firebase Cloud.`
        );
      }
    });
  }

  if (els.btnConfigureFirebase && els.firebaseModal) {
    els.btnConfigureFirebase.addEventListener('click', () => els.firebaseModal.classList.remove('hidden'));
  }
  if (els.btnCloseModal && els.firebaseModal) {
    els.btnCloseModal.addEventListener('click', () => els.firebaseModal.classList.add('hidden'));
  }
  if (els.firebaseConfigForm) {
    els.firebaseConfigForm.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      showError('');
      const fd = new win.FormData(els.firebaseConfigForm);
      const runtimeCfg = {
        firebaseConfig: {
          apiKey: String(fd.get('apiKey') || '').trim(),
          authDomain: String(fd.get('authDomain') || '').trim(),
          projectId: String(fd.get('projectId') || '').trim(),
          appId: String(fd.get('appId') || '').trim(),
        },
        recaptchaSiteKey: String(fd.get('recaptchaSiteKey') || '').trim(),
        cloudModelName: String(fd.get('cloudModelName') || 'gemini-3.5-flash-lite'),
      };
      try {
        const res = await engine.initialize(runtimeCfg);
        if (res.ready) {
          if (win.sessionStorage) win.sessionStorage.setItem(SESSION_CONFIG_KEY, JSON.stringify(runtimeCfg));
          updateRuntimeBadge(true, res.cloudModel);
          if (els.firebaseModal) els.firebaseModal.classList.add('hidden');
        }
      } catch (err) {
        showError(`Firebase initialization error: ${err instanceof Error ? err.message : String(err)}`);
      }
    });
  }
  if (els.btnResetFirebaseConfig) {
    els.btnResetFirebaseConfig.addEventListener('click', () => {
      if (win.sessionStorage) win.sessionStorage.removeItem(SESSION_CONFIG_KEY);
      updateRuntimeBadge(false, '');
      if (els.firebaseModal) els.firebaseModal.classList.add('hidden');
    });
  }

  async function autoInitializeFirebase() {
    try {
      const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
      if (env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID && env.VITE_FIREBASE_APP_ID) {
        const res = await engine.initialize({
          firebaseConfig: {
            apiKey: env.VITE_FIREBASE_API_KEY,
            authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || '',
            projectId: env.VITE_FIREBASE_PROJECT_ID,
            appId: env.VITE_FIREBASE_APP_ID,
          },
          recaptchaSiteKey: env.VITE_RECAPTCHA_ENTERPRISE_SITE_KEY || '',
          isDev: Boolean(env.DEV),
        });
        updateRuntimeBadge(res.ready, res.cloudModel);
        return;
      }
      if (win.sessionStorage) {
        const saved = win.sessionStorage.getItem(SESSION_CONFIG_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          const res = await engine.initialize(parsed);
          updateRuntimeBadge(res.ready, res.cloudModel);
        }
      }
    } catch {
      updateRuntimeBadge(false, '');
    }
  }

  if (win.location && win.location.search) {
    const params = new URLSearchParams(win.location.search);
    const sharedText = [params.get('title'), params.get('text'), params.get('url')].filter(Boolean).join(' ');
    if (sharedText && els.messageInput) {
      els.messageInput.value = sharedText;
      renderPrivacyDiff(sharedText);
    }
  }

  if (win.navigator?.serviceWorker && typeof win.navigator.serviceWorker.register === 'function') {
    win.navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
  if (typeof win.addEventListener === 'function') {
    win.addEventListener('online', updateNetworkPill);
    win.addEventListener('offline', updateNetworkPill);
  }

  const prefersLight = win.matchMedia && win.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(prefersLight ? 'light' : 'dark');
  updateNetworkPill();
  refreshHardwareProbe();
  autoInitializeFirebase();

  return { runAnalysis, clearAll, selectMode, selectTab, renderPrivacyDiff };
}

if (typeof document !== 'undefined' && typeof window !== 'undefined' && !window.__SCAMSHIELD_TEST_ENV__) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initScamShieldApp(document, window));
  } else {
    initScamShieldApp(document, window);
  }
}
