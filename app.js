// ScamShield UI — plain classic script, no modules, no network.
// Uses window.ScamShieldDetector (detector.browser.js) and
// window.ScamShieldSamples (samples.browser.js). All user text is inserted
// with textContent, never innerHTML, so pasted messages cannot run code.
(function () {
  var detector = window.ScamShieldDetector;
  var samples = window.ScamShieldSamples || [];

  var textarea = document.getElementById("message");
  var analyzeBtn = document.getElementById("analyze");
  var clearBtn = document.getElementById("clear");
  var countEl = document.getElementById("count");
  var errorEl = document.getElementById("form-error");
  var resultEl = document.getElementById("result");
  var verdictEl = document.getElementById("verdict");
  var scoreEl = document.getElementById("score");
  var barEl = document.getElementById("bar");
  var barFill = document.getElementById("bar-fill");
  var echoEl = document.getElementById("echo");
  var signalsEl = document.getElementById("signals");
  var positivesEl = document.getElementById("positives");
  var nextEl = document.getElementById("next-steps");
  var samplesEl = document.getElementById("samples");

  var NEXT_STEPS = {
    "Likely scam": [
      "Do not tap any link in the message.",
      "Do not send money, and do not share your OTP or password.",
      "Do not reply to the message. Block the number.",
      "If it claims to be your bank or bKash/Nagad, open the official app yourself (do not use the link) or call the official number — bKash 16247.",
      "Report it: forward the SMS to 1212 (BTRC) or report it inside the app where you got it.",
      "If you already clicked or paid, call your bank or bKash at once and change your passwords."
    ],
    "Caution": [
      "Do not tap the link yet.",
      "Verify through the official app or by calling the official number — never through the link in the message.",
      "Check the sender: official messages come from a named sender, not a personal mobile number.",
      "If anything still feels off, treat it as a scam and do not act."
    ],
    "Safe": [
      "Nothing in this message matches a known scam pattern.",
      "Stay alert anyway: if the sender follows up asking for money, a code, or a link, check the message again.",
      "When in doubt about any message, verify through the official app."
    ]
  };

  function renderList(listEl, items, pointsSuffix) {
    listEl.textContent = "";
    if (items.length === 0) {
      var li = document.createElement("li");
      li.textContent = "Nothing here.";
      listEl.appendChild(li);
      return;
    }
    items.forEach(function (item) {
      var li = document.createElement("li");
      var head = document.createElement("div");
      head.className = "sig-head";
      var label = document.createElement("span");
      label.textContent = item.label;
      var pts = document.createElement("span");
      pts.className = "points";
      pts.textContent = (item.points > 0 ? "+" : "") + item.points + pointsSuffix;
      head.appendChild(label);
      head.appendChild(pts);
      var expl = document.createElement("p");
      expl.textContent = item.explanation;
      li.appendChild(head);
      li.appendChild(expl);
      listEl.appendChild(li);
    });
  }

  function analyze() {
    var text = textarea.value;
    if (!text.trim()) {
      // Invalid click, explained in plain sight (audit fix, Nov 10 2026):
      // previously this silently hid the result with no message at all.
      resultEl.hidden = true;
      errorEl.hidden = false;
      errorEl.textContent = "Paste a message first — there is nothing to check yet.";
      textarea.focus();
      return;
    }
    errorEl.hidden = true;
    errorEl.textContent = "";
    var r = detector.analyzeMessage(text);

    resultEl.hidden = false;
    resultEl.className = "result " + (r.verdict === "Likely scam" ? "scam" : r.verdict === "Caution" ? "caution" : "safe");
    verdictEl.textContent = r.verdict === "Likely scam" ? "⚠️ Likely scam" : r.verdict === "Caution" ? "⚠️ Caution" : "✅ Looks safe";
    scoreEl.textContent = "Risk score: " + r.score + " / 100";
    barFill.style.width = r.score + "%";
    barEl.setAttribute("aria-label", "Risk score " + r.score + " out of 100: " + r.verdict);
    echoEl.textContent = text;

    renderList(signalsEl, r.signals, " pts");
    renderList(positivesEl, r.positives, " pts");

    nextEl.textContent = "";
    NEXT_STEPS[r.verdict].forEach(function (step) {
      var li = document.createElement("li");
      li.textContent = step;
      nextEl.appendChild(li);
    });

    resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function updateCount() {
    countEl.textContent = textarea.value.length + " characters";
  }

  analyzeBtn.addEventListener("click", analyze);
  textarea.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") analyze();
  });
  textarea.addEventListener("input", function () {
    updateCount();
    if (textarea.value.trim()) { errorEl.hidden = true; errorEl.textContent = ""; }
  });
  clearBtn.addEventListener("click", function () {
    textarea.value = "";
    resultEl.hidden = true;
    errorEl.hidden = true;
    errorEl.textContent = "";
    updateCount();
    textarea.focus();
  });

  // Example buttons, built from samples.browser.js.
  samples.forEach(function (s) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sample-btn";
    var label = document.createElement("span");
    label.textContent = s.label;
    var tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = "synthetic example";
    btn.appendChild(label);
    btn.appendChild(tag);
    btn.addEventListener("click", function () {
      textarea.value = s.text;
      updateCount();
      analyze();
    });
    samplesEl.appendChild(btn);
  });

  updateCount();

  // Deep link: index.html?sample=lottery-en fills in that example and
  // analyzes it at once (handy for demos and screenshots).
  try {
    var wanted = new URLSearchParams(window.location.search).get("sample");
    if (wanted) {
      var found = null;
      samples.forEach(function (s) { if (s.id === wanted) found = s; });
      if (found) {
        textarea.value = found.text;
        updateCount();
        analyze();
      }
    }
  } catch (e) { /* deep link is optional; ignore failures */ }
})();
