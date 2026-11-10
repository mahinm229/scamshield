// Built-in example messages for the ScamShield demo UI.
// All synthetic, invented for demonstration. URLs are assembled from parts
// so no sample text is ever a real link a reader could tap by accident.
const L1 = "bit" + ".ly/claim-prize-5000";
const L2 = "http" + "://192.168.1.1/bkash-offer";
const L3 = "nagad-pay" + ".xyz/customs";
const L4 = "http" + "://bkash-update.com/verify";
const L5 = "https" + "://tinyurl.com/abc123";

const SAMPLES = [
  {
    id: "lottery-en",
    label: "Lottery prize (English)",
    category: "scam",
    text: "Congratulations! You have won $5,000 in the International Lottery. To claim your prize, verify your account now at " + L1 + " and send your OTP within 2 hours. Act now or your prize will expire!",
  },
  {
    id: "bkash-bn",
    label: "bKash account threat (Bangla)",
    category: "scam",
    text: "অভিনন্দন! আপনি লটারি জিতেছেন ৫০,০০০ টাকা। আপনার বিকাশ অ্যাকাউন্ট বন্ধ হয়ে যাবে। এখনই আপনার ওটিপি পাঠান এই লিংকে: " + L2,
  },
  {
    id: "parcel-en",
    label: "Parcel held at customs (English)",
    category: "scam",
    text: "Your parcel is held at customs. Pay Tk 2,500 customs fee now via Nagad at " + L3 + " or it will be returned. Send money within 2 hours.",
  },
  {
    id: "verify-en",
    label: "Account verification (English)",
    category: "suspicious",
    text: "Dear customer, your account needs verification. Please click here to verify: " + L4,
  },
  {
    id: "verify-bn",
    label: "Account check (Bangla)",
    category: "suspicious",
    text: "আপনার অ্যাকাউন্ট যাচাই করুন। লিংকে ক্লিক করুন: " + L5,
  },
  {
    id: "safe-en",
    label: "Appointment reminder (English)",
    category: "safe",
    text: "Your appointment with Dr. Rahman is confirmed for tomorrow at 10:00 AM at Popular Diagnostics. Please arrive 15 minutes early. Thank you.",
  },
];

window.ScamShieldSamples = SAMPLES;
