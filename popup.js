
const textArea = document.getElementById("inputText");
const statsDisplay = document.getElementById("stats");

textArea.addEventListener("input", updateStats);

document.getElementById("btnSentence").addEventListener("click", () => convertText("sentence"));
document.getElementById("btnLower").addEventListener("click", () => convertText("lower"));
document.getElementById("btnUpper").addEventListener("click", () => convertText("upper"));
document.getElementById("btnCapitalized").addEventListener("click", () => convertText("capitalized"));
document.getElementById("btnAlternating").addEventListener("click", () => convertText("alternating"));
document.getElementById("btnTitle").addEventListener("click", () => convertText("title"));
document.getElementById("btnInverse").addEventListener("click", () => convertText("inverse"));
document.getElementById("btnDownload").addEventListener("click", downloadText);
document.getElementById("btnCopy").addEventListener("click", copyText);
document.getElementById("btnClear").addEventListener("click", clearText);

function updateStats() {
  const text = textArea.value;
  const charCount = text.length;
  const wordCount = (text.match(/\b\w+\b/g) || []).length;
  const sentenceCount = (text.match(/[^\.\!\?]+[\.\!\?]+/g) || []).length;
  const lineCount = text.split(/\r\n|\r|\n/).length;

  statsDisplay.textContent =
    `Character Count: ${charCount} | Word Count: ${wordCount} | ` +
    `Sentence Count: ${sentenceCount} | Line Count: ${lineCount}`;
}

function convertText(type) {
  let text = textArea.value;
  switch (type) {
    case "sentence":
      text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      break;
    case "lower":
      text = text.toLowerCase();
      break;
    case "upper":
      text = text.toUpperCase();
      break;
    case "capitalized":
      text = text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
      break;
    case "alternating":
      text = text.split('').map((char, i) =>
        i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      ).join('');
      break;
    case "title":
      text = text.toLowerCase().split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      break;
    case "inverse":
      text = text.split('').map(char =>
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      ).join('');
      break;
  }
  textArea.value = text;
  updateStats();
}

function downloadText() {
  const blob = new Blob([textArea.value], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "converted-text.txt";
  link.click();
}

function copyText() {
  navigator.clipboard.writeText(textArea.value);
  updateStats();
}

function clearText() {
  textArea.value = "";
  updateStats();
}
