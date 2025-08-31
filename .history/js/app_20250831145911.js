// Sentences
const sentences = [
  "তুমি এখন কোথায় যাচ্ছো?", "আমি আজকে বাড়ি যাচ্ছি।", "এখন কয়টা বাজে বলো?", "দুপুর ইতিমধ্যেই হয়ে গেছে।",
  // ... include all 100 sentences as before
];

const sentenceBox = document.getElementById("sentences");
sentences.forEach((s, i) => {
  const p = document.createElement("p");
  p.textContent = (i+1) + ". " + s;
  sentenceBox.appendChild(p);
});

// 🎤 Recording
let mediaRecorder;
let audioChunks = [];
let fileIndexMap = {}; // counters per dialect

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const status = document.getElementById("status");
const dialectSelect = document.getElementById("dialect");

startBtn.onclick = async () => {
  const dialect = dialectSelect.value;
  if (!dialect) {
    alert("প্রথমে একটি ডায়ালেক্ট নির্বাচন করুন");
    return;
  }

  // init counter
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

    // Trigger browser download (user must save into D:\BanglaSpeechUI\audio\<dialect>)
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    status.textContent = `ফাইল সংরক্ষিত হয়েছে: ${fileName}`;
  };

  status.textContent = "রেকর্ড চলছে... এখন একটি বাক্য পড়ুন।";
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

stopBtn.onclick = () => {
  mediaRecorder.stop();
  status.textContent = "রেকর্ড শেষ হয়েছে। নতুন রেকর্ড শুরু করতে উপরের বোতাম চাপুন।";
  startBtn.disabled = false;
  stopBtn.disabled = true;
};
// Sentences
const sentences = [
  "তুমি এখন কোথায় যাচ্ছো?", "আমি আজকে বাড়ি যাচ্ছি।", "এখন কয়টা বাজে বলো?", "দুপুর ইতিমধ্যেই হয়ে গেছে।",
  // ... include all 100 sentences as before
];

const sentenceBox = document.getElementById("sentences");
sentences.forEach((s, i) => {
  const p = document.createElement("p");
  p.textContent = (i+1) + ". " + s;
  sentenceBox.appendChild(p);
});

// 🎤 Recording
let mediaRecorder;
let audioChunks = [];
let fileIndexMap = {}; // counters per dialect

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const status = document.getElementById("status");
const dialectSelect = document.getElementById("dialect");

startBtn.onclick = async () => {
  const dialect = dialectSelect.value;
  if (!dialect) {
    alert("প্রথমে একটি ডায়ালেক্ট নির্বাচন করুন");
    return;
  }

  // init counter
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

    // Trigger browser download (user must save into D:\BanglaSpeechUI\audio\<dialect>)
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    status.textContent = `ফাইল সংরক্ষিত হয়েছে: ${fileName}`;
  };

  status.textContent = "রেকর্ড চলছে... এখন একটি বাক্য পড়ুন।";
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

stopBtn.onclick = () => {
  mediaRecorder.stop();
  status.textContent = "রেকর্ড শেষ হয়েছে। নতুন রেকর্ড শুরু করতে উপরের বোতাম চাপুন।";
  startBtn.disabled = false;
  stopBtn.disabled = true;
};
