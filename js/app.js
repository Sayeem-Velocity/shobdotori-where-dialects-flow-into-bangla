// ✅ 100 Bangla sentences
const sentences = [
  "তুমি এখন কোথায় যাচ্ছো?", "আমি আজকে বাড়ি যাচ্ছি।", "এখন কয়টা বাজে বলো?", "দুপুর ইতিমধ্যেই হয়ে গেছে।",
  "দরজা তাড়াতাড়ি খুলো।", "আলোটা নিভিয়ে দাও।", "আমি কিছু খেতে চাই।", "ভাত একেবারে হয়ে গেছে।",
  "আমাকে একটু পানি দাও।", "আমি আজ খুব ক্লান্ত।", "চল আমরা বাইরে যাই।", "আমি এখনই আসছি।",
  "তুমি কি কাল আসবে?", "আজকে খুব গরম লাগছে।", "বাইরে বৃষ্টি পড়ছে।", "ছাতা নিয়ে যাও এখন।",
  "তুমি আজ কেমন আছো?", "আমি খুব ভালো আছি।", "এখানে এসে বসো।", "ওই বইটা আমাকে দাও।",
  "তোমার নামটা কী বলো?", "আমার নাম রফিক হাসান।", "তুমি কোথা থেকে আসছো?", "আমি চট্টগ্রাম শহর থেকে।",
  "তুমি কি পড়াশোনা করছো?", "আমি এখন বাংলা পড়ছি।", "দরজায় কে দাঁড়িয়েছে?", "আমি এখানেই ছিলাম।",
  "তুমি কি এখন ব্যস্ত?", "হ্যাঁ, আমি একটু ব্যস্ত।", "তুমি কি কিছু খাবে?", "আমি এক কাপ চা খাবো।",
  "ভাত খাওয়া শেষ হয়েছে?", "হ্যাঁ, এখনই শেষ হয়েছে।", "তুমি কি গান শুনছো?", "হ্যাঁ, আমি গান শুনছি।",
  "আমি মাঝে মাঝে গান গাই।", "টিভি এখনই চালাও।", "টিভি তাড়াতাড়ি বন্ধ করো।", "আমি বই পড়তে চাই।",
  "তোমার কলমটা কোথায়?", "কলমটা এখানেই আছে।", "আমাকে মোবাইলটা দাও তো।", "ফোনের চার্জ শেষ হয়ে গেছে।",
  "তোমার বাসা কোথায় বলো?", "আমার বাসা ঢাকার ভিতরে।", "আজ শুক্রবার সকাল।", "আগামীকাল ছুটির দিন।",
  "তুমি কি সত্যিই আসবে?", "হ্যাঁ, আমি অবশ্যই আসবো।", "তুমি আজ কেমন আছো?", "আমি মোটামুটি ভালো আছি।",
  "আজ আমি খুব খুশি।", "আমি অনেক দুঃখিত আছি।", "আমাকে ক্ষমা করে দাও।", "তোমাকে অনেক ধন্যবাদ।",
  "তুমি কি কফি খাবে?", "না, আমি শুধু চা খাবো।", "এখন আমার ঘুম পাচ্ছে।", "আমি ঘুমাতে যাচ্ছি।",
  "দরজাটা বন্ধ করে দাও।", "জানালাটা একটু খুলো।", "শীতল বাতাস আসছে।", "বৃষ্টি এখন থেমে গেছে।",
  "আমি কোথায় যাবো এখন?", "তুমি বাজারে চলে যাও।", "বাজার কতদূরে আছে?", "বাজারটা খুব কাছেই আছে।",
  "আমি হাঁটতে যাবো এখন।", "চল আমরা একসাথে হাঁটি।", "আমি নতুন বন্ধু চাই।", "তুমি আমার সেরা বন্ধু।",
  "তুমি কি এখন খুশি?", "হ্যাঁ, আমি সত্যিই খুশি।", "আজ স্কুল বন্ধ রয়েছে।", "আমি খেলতে যাচ্ছি।",
  "তুমি কি ফুটবল খেলবে?", "না, আমি ক্রিকেট খেলবো।", "আজ ম্যাচ শুরু হয়েছে।", "বাংলাদেশ আজ জিতেছে।",
  "আমি গান শুনছি এখন।", "তুমি কী পড়ছো বলো?", "হ্যাঁ, আমি বাংলা পড়ছি।", "আমি কবিতা লিখছি।",
  "তুমি কী কাজ করছো?", "আমি রান্না করছি এখন।", "খাওয়া তৈরি হয়েছে কি?", "হ্যাঁ, এখনই তৈরি হয়েছে।",
  "খেতে এসো সবাই।", "আমি তাড়াতাড়ি আসছি।", "আমাকে এখনই ডাকো।", "তুমি কই গিয়েছিলে বলো?",
  "আমি বাজারে গিয়েছিলাম।", "তুমি কী কিনেছো বলো?", "আমি ফলমূল কিনেছি।", "এই আমটা খুব মিষ্টি।",
  "আমি লিচু খেতে চাই।", "দুধটা এখন গরম আছে।", "চাল আনো ঘরের ভিতর।", "ডালটা আমাকে দাও।"
];

const sentenceBox = document.getElementById("sentences");
sentences.forEach((s, i) => {
  const p = document.createElement("p");
  p.textContent = (i+1) + ". " + s;
  sentenceBox.appendChild(p);
});

// Recording
let mediaRecorder;
let audioChunks = [];
let fileIndexMap = {};

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const status = document.getElementById("status");
const dialectSelect = document.getElementById("dialect");
const recordingBox = document.getElementById("recordingBox");

startBtn.onclick = async () => {
  const dialect = dialectSelect.value;
  if (!dialect) {
    alert("প্রথমে একটি ডায়ালেক্ট নির্বাচন করুন");
    return;
  }

  if (!(dialect in fileIndexMap)) fileIndexMap[dialect] = 0;

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();
  audioChunks = [];

  mediaRecorder.ondataavailable = e => audioChunks.push(e.data);

  mediaRecorder.onstop = () => {
    const blob = new Blob(audioChunks, { type: "audio/wav" });
    const url = URL.createObjectURL(blob);

    const fileName = `${dialect}_train (${fileIndexMap[dialect]++}).wav`;

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    status.textContent = `ফাইল সংরক্ষিত হয়েছে: ${fileName}`;
    recordingBox.classList.add("hidden");
  };

  status.textContent = "রেকর্ড চলছে... একটি মাত্র বাক্য পড়ুন।";
  startBtn.disabled = true;
  stopBtn.disabled = false;
  recordingBox.classList.remove("hidden");
};

stopBtn.onclick = () => {
  mediaRecorder.stop();
  status.textContent = "রেকর্ড শেষ হয়েছে। পরের বাক্যের জন্য আবার 'রেকর্ড শুরু' চাপুন।";
  startBtn.disabled = false;
  stopBtn.disabled = true;
};
