function slide(number) {
  return "./nazo07/スライド" + number + ".jpg";
}

const STAGES = [
  { id: "intro", label: "はじめに", imageNumber: 1 },
  { id: "1", label: "1", imageNumber: 2 },
  { id: "2", label: "2", imageNumber: 3 },
  { id: "3", label: "3", imageNumber: 4 },
  { id: "4", label: "4", imageNumber: 5 },
  { id: "5", label: "5", imageNumber: 6 },
  { id: "6", label: "6", imageNumber: 7 },
  { id: "7", label: "7", imageNumber: 8 },
  { id: "8", label: "8", imageNumber: 9 }
];

const ORIGINAL_DATE_TEXT = "公開：2026年06月03日";
const STAGE_8_DESCRIPTION = "正解は、“かねかせぎ”";
const TITLE_CORE = "mmの謎解き#7";

let currentStageIndex = 0;
let unlockedMaxIndex = 0;
let messageColor = "#ffffff";
let bracketPair = { open: "〈", close: "〉", type: "yama" };
let seikaiStreak = 0;
let cleared = false;

const app = document.getElementById("app");
const mainTitle = document.getElementById("mainTitle");
const clearTitle = document.getElementById("clearTitle");
const tabBar = document.getElementById("tabBar");
const stageTitle = document.getElementById("stageTitle");
const stageDescription = document.getElementById("stageDescription");
const nazoImage = document.getElementById("nazoImage");
const answerArea = document.getElementById("answerArea");
const answerInput = document.getElementById("answerInput");
const submitButton = document.getElementById("submitButton");
const nextArea = document.getElementById("nextArea");
const nextButton = document.getElementById("nextButton");
const message = document.getElementById("message");
const dateMeta = document.getElementById("dateMeta");
const clearOverlay = document.getElementById("clearOverlay");
const closeClear = document.getElementById("closeClear");
const postButton = document.getElementById("postButton");
const resetButton = document.getElementById("resetButton");
const resetConfirmOverlay = document.getElementById("resetConfirmOverlay");
const confirmResetYes = document.getElementById("confirmResetYes");
const confirmResetNo = document.getElementById("confirmResetNo");

const COLOR_MAP = {
  "black": "#000000",
  "ブラック": "#000000",
  "ぶらっく": "#000000",
  "黒": "#000000",
  "くろ": "#000000",
  "クロ": "#000000",
  "く": "#000000",

  "white": "#ffffff",
  "ホワイト": "#ffffff",
  "ほわいと": "#ffffff",
  "白": "#ffffff",
  "しろ": "#ffffff",
  "シロ": "#ffffff",
  "し": "#ffffff",

  "red": "#ff0000",
  "レッド": "#ff0000",
  "れっど": "#ff0000",
  "赤": "#ff0000",
  "あか": "#ff0000",
  "アカ": "#ff0000",
  "あ": "#ff0000",

  "blue": "#0000ff",
  "ブルー": "#0000ff",
  "ぶるー": "#0000ff",
  "青": "#0000ff",
  "あお": "#0000ff",
  "アオ": "#0000ff",

  "yellow": "#ffff00",
  "イエロー": "#ffff00",
  "いえろー": "#ffff00",
  "黄色": "#ffff00",
  "きいろ": "#ffff00",
  "キイロ": "#ffff00",
  "黄": "#ffff00",
  "き": "#ffff00",

  "green": "#008000",
  "グリーン": "#008000",
  "ぐりーん": "#008000",
  "緑": "#008000",
  "みどり": "#008000",
  "ミドリ": "#008000",
  "み": "#008000",

  "purple": "#800080",
  "violet": "#800080",
  "パープル": "#800080",
  "ぱーぷる": "#800080",
  "バイオレット": "#800080",
  "ばいおれっと": "#800080",
  "紫": "#800080",
  "むらさき": "#800080",
  "ムラサキ": "#800080",
  "む": "#800080",

  "orange": "#ffa500",
  "オレンジ": "#ffa500",
  "おれんじ": "#ffa500",
  "橙": "#ffa500",
  "だいだい": "#ffa500",
  "橙色": "#ffa500",
  "だいだいいろ": "#ffa500",
  "お": "#ffa500",

  "pink": "#ffc0cb",
  "ピンク": "#ffc0cb",
  "ぴんく": "#ffc0cb",
  "桃": "#ffc0cb",
  "桃色": "#ffc0cb",
  "ももいろ": "#ffc0cb",
  "もも": "#ffc0cb",

  "brown": "#8b4513",
  "ブラウン": "#8b4513",
  "ぶらうん": "#8b4513",
  "茶": "#8b4513",
  "茶色": "#8b4513",
  "ちゃいろ": "#8b4513",
  "ちゃ": "#8b4513",

  "gray": "#808080",
  "grey": "#808080",
  "グレー": "#808080",
  "ぐれー": "#808080",
  "灰": "#808080",
  "灰色": "#808080",
  "はいいろ": "#808080",
  "はい": "#808080",

  "gold": "#d4af37",
  "ゴールド": "#d4af37",
  "ごーるど": "#d4af37",
  "金": "#d4af37",
  "金色": "#d4af37",
  "きんいろ": "#d4af37",
  "きん": "#d4af37",

  "silver": "#c0c0c0",
  "シルバー": "#c0c0c0",
  "しるばー": "#c0c0c0",
  "銀": "#c0c0c0",
  "銀色": "#c0c0c0",
  "ぎんいろ": "#c0c0c0",
  "ぎん": "#c0c0c0",

  "navy": "#000080",
  "ネイビー": "#000080",
  "ねいびー": "#000080",
  "紺": "#000080",
  "紺色": "#000080",
  "こんいろ": "#000080",
  "こん": "#000080",

  "skyblue": "#87ceeb",
  "sky blue": "#87ceeb",
  "スカイブルー": "#87ceeb",
  "すかいぶるー": "#87ceeb",
  "水色": "#87ceeb",
  "みずいろ": "#87ceeb",
  "みず": "#87ceeb",

  "lightblue": "#add8e6",
  "ライトブルー": "#add8e6",
  "らいとぶるー": "#add8e6",

  "lime": "#00ff00",
  "ライム": "#00ff00",
  "らいむ": "#00ff00",
  "黄緑": "#9acd32",
  "きみどり": "#9acd32",

  "beige": "#f5f5dc",
  "ベージュ": "#f5f5dc",
  "べーじゅ": "#f5f5dc",

  "cyan": "#00ffff",
  "シアン": "#00ffff",
  "しあん": "#00ffff",
  "青緑": "#00ffff",
  "あおみどり": "#00ffff",

  "magenta": "#ff00ff",
  "マゼンタ": "#ff00ff",
  "まぜんた": "#ff00ff",
  "赤紫": "#ff00ff",
  "あかむらさき": "#ff00ff",

  "indigo": "#4b0082",
  "インディゴ": "#4b0082",
  "いんでぃご": "#4b0082",
  "藍": "#4b0082",
  "藍色": "#4b0082",
  "あいいろ": "#4b0082",

  "ivory": "#fffff0",
  "アイボリー": "#fffff0",
  "あいぼりー": "#fffff0",
  "象牙色": "#fffff0",
  "ぞうげいろ": "#fffff0",

  "maroon": "#800000",
  "マルーン": "#800000",
  "まるーん": "#800000",
  "えんじ": "#800000",
  "臙脂": "#800000",

  "olive": "#808000",
  "オリーブ": "#808000",
  "おりーぶ": "#808000",
  "オリーブ色": "#808000",
  "おりーぶいろ": "#808000",

  "teal": "#008080",
  "ティール": "#008080",
  "てぃーる": "#008080",

  "turquoise": "#40e0d0",
  "ターコイズ": "#40e0d0",
  "たーこいず": "#40e0d0",
  "トルコ石": "#40e0d0",
  "とるこいし": "#40e0d0",

  "khaki": "#c3b091",
  "カーキ": "#c3b091",
  "かーき": "#c3b091",

  "coral": "#ff7f50",
  "コーラル": "#ff7f50",
  "こーらる": "#ff7f50",
  "珊瑚": "#ff7f50",
  "さんご": "#ff7f50"
};

const BRACKET_MAP = {
  "やま": { open: "〈", close: "〉", titleOpen: "＜", titleClose: "＞", type: "yama" },
  "ヤマ": { open: "〈", close: "〉", titleOpen: "＜", titleClose: "＞", type: "yama" },
  "山": { open: "〈", close: "〉", titleOpen: "＜", titleClose: "＞", type: "yama" },
  "山括弧": { open: "〈", close: "〉", titleOpen: "＜", titleClose: "＞", type: "yama" },
  "やまかっこ": { open: "〈", close: "〉", titleOpen: "＜", titleClose: "＞", type: "yama" },
  "ヤマカッコ": { open: "〈", close: "〉", titleOpen: "＜", titleClose: "＞", type: "yama" },
  "山かっこ": { open: "〈", close: "〉", titleOpen: "＜", titleClose: "＞", type: "yama" },
  "山カッコ": { open: "〈", close: "〉", titleOpen: "＜", titleClose: "＞", type: "yama" },
  "山型括弧": { open: "〈", close: "〉", titleOpen: "＜", titleClose: "＞", type: "yama" },

  "まる": { open: "（", close: "）", type: "maru" },
  "マル": { open: "（", close: "）", type: "maru" },
  "丸": { open: "（", close: "）", type: "maru" },
  "丸括弧": { open: "（", close: "）", type: "maru" },
  "丸かっこ": { open: "（", close: "）", type: "maru" },
  "丸カッコ": { open: "（", close: "）", type: "maru" },
  "まるかっこ": { open: "（", close: "）", type: "maru" },
  "マルカッコ": { open: "（", close: "）", type: "maru" },
  "parentheses": { open: "（", close: "）", type: "maru" },
  "paren": { open: "（", close: "）", type: "maru" },

  "かぎ": { open: "「", close: "」", type: "kagi" },
  "カギ": { open: "「", close: "」", type: "kagi" },
  "鍵": { open: "「", close: "」", type: "kagi" },
  "鉤": { open: "「", close: "」", type: "kagi" },
  "鍵括弧": { open: "「", close: "」", type: "kagi" },
  "鉤括弧": { open: "「", close: "」", type: "kagi" },
  "かぎかっこ": { open: "「", close: "」", type: "kagi" },
  "カギカッコ": { open: "「", close: "」", type: "kagi" },
  "鍵かっこ": { open: "「", close: "」", type: "kagi" },
  "カギ括弧": { open: "「", close: "」", type: "kagi" },

  "にじゅうかぎ": { open: "『", close: "』", type: "doubleKagi" },
  "二重かぎ": { open: "『", close: "』", type: "doubleKagi" },
  "二重鍵": { open: "『", close: "』", type: "doubleKagi" },
  "二重鉤": { open: "『", close: "』", type: "doubleKagi" },
  "二重鉤括弧": { open: "『", close: "』", type: "doubleKagi" },
  "二重鍵括弧": { open: "『", close: "』", type: "doubleKagi" },
  "二重かぎかっこ": { open: "『", close: "』", type: "doubleKagi" },
  "二重カギカッコ": { open: "『", close: "』", type: "doubleKagi" },

  "かく": { open: "［", close: "］", type: "kaku" },
  "カク": { open: "［", close: "］", type: "kaku" },
  "角": { open: "［", close: "］", type: "kaku" },
  "角括弧": { open: "［", close: "］", type: "kaku" },
  "角かっこ": { open: "［", close: "］", type: "kaku" },
  "角カッコ": { open: "［", close: "］", type: "kaku" },
  "かくかっこ": { open: "［", close: "］", type: "kaku" },
  "square": { open: "［", close: "］", type: "kaku" },
  "squarebrackets": { open: "［", close: "］", type: "kaku" },
  "brackets": { open: "［", close: "］", type: "kaku" },

  "なみ": { open: "｛", close: "｝", type: "nami" },
  "ナミ": { open: "｛", close: "｝", type: "nami" },
  "波": { open: "｛", close: "｝", type: "nami" },
  "波括弧": { open: "｛", close: "｝", type: "nami" },
  "波かっこ": { open: "｛", close: "｝", type: "nami" },
  "波カッコ": { open: "｛", close: "｝", type: "nami" },
  "なみかっこ": { open: "｛", close: "｝", type: "nami" },
  "brace": { open: "｛", close: "｝", type: "nami" },
  "braces": { open: "｛", close: "｝", type: "nami" },
  "curly": { open: "｛", close: "｝", type: "nami" },
  "curlybrackets": { open: "｛", close: "｝", type: "nami" },

  "きっこう": { open: "〔", close: "〕", type: "kikko" },
  "キッコウ": { open: "〔", close: "〕", type: "kikko" },
  "亀甲": { open: "〔", close: "〕", type: "kikko" },
  "亀甲括弧": { open: "〔", close: "〕", type: "kikko" },
  "亀甲かっこ": { open: "〔", close: "〕", type: "kikko" },
  "亀甲カッコ": { open: "〔", close: "〕", type: "kikko" },
  "きっこうかっこ": { open: "〔", close: "〕", type: "kikko" },

  "すみつき": { open: "【", close: "】", type: "sumitsuki" },
  "スミツキ": { open: "【", close: "】", type: "sumitsuki" },
  "隅付き": { open: "【", close: "】", type: "sumitsuki" },
  "隅付き括弧": { open: "【", close: "】", type: "sumitsuki" },
  "隅付きかっこ": { open: "【", close: "】", type: "sumitsuki" },
  "隅付きカッコ": { open: "【", close: "】", type: "sumitsuki" },
  "すみつきかっこ": { open: "【", close: "】", type: "sumitsuki" },

  "にじゅうやま": { open: "《", close: "》", type: "doubleYama" },
  "二重山": { open: "《", close: "》", type: "doubleYama" },
  "二重山括弧": { open: "《", close: "》", type: "doubleYama" },
  "二重山かっこ": { open: "《", close: "》", type: "doubleYama" },
  "二重山カッコ": { open: "《", close: "》", type: "doubleYama" },
  "二重山型括弧": { open: "《", close: "》", type: "doubleYama" },

  "にじゅうきっこう": { open: "〖", close: "〗", type: "doubleKikko" },
  "二重亀甲": { open: "〖", close: "〗", type: "doubleKikko" },
  "二重亀甲括弧": { open: "〖", close: "〗", type: "doubleKikko" },
  "二重亀甲かっこ": { open: "〖", close: "〗", type: "doubleKikko" }
};

function normalizeText(value) {
  return value.trim().replace(/\s+/g, "");
}

function normalizeColorKey(value) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function toHalfWidthDigits(value) {
  return value.replace(/[０-９]/g, function(ch) {
    return String.fromCharCode(ch.charCodeAt(0) - 0xFEE0);
  });
}

function getTitleOpen() {
  return bracketPair.titleOpen || bracketPair.open;
}

function getTitleClose() {
  return bracketPair.titleClose || bracketPair.close;
}

function getCurrentTitleText() {
  return "Pleasure" + getTitleOpen() + TITLE_CORE + getTitleClose();
}

function updateTitleText() {
  const titleText = getCurrentTitleText();

  document.title = titleText;
  mainTitle.textContent = titleText;
  clearTitle.textContent = titleText;
}

function saveState() {
  const state = {
    currentStageIndex,
    unlockedMaxIndex,
    messageColor,
    bracketPair,
    seikaiStreak,
    cleared,
    dateText: dateMeta.textContent
  };

  localStorage.setItem("pleasure_state", JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem("pleasure_state");

  if (!raw) return;

  try {
    const state = JSON.parse(raw);

    currentStageIndex = state.currentStageIndex ?? 0;
    unlockedMaxIndex = state.unlockedMaxIndex ?? 0;
    messageColor = state.messageColor ?? "#ffffff";
    bracketPair = state.bracketPair ?? {
      open: "〈",
      close: "〉",
      titleOpen: "＜",
      titleClose: "＞",
      type: "yama"
    };
    seikaiStreak = state.seikaiStreak ?? 0;
    cleared = state.cleared ?? false;
    dateMeta.textContent = state.dateText ?? ORIGINAL_DATE_TEXT;
  } catch (e) {
    localStorage.removeItem("pleasure_state");
  }
}

function renderTabs() {
  tabBar.innerHTML = "";

  STAGES.forEach(function(stage, index) {
    if (index > unlockedMaxIndex) return;

    const button = document.createElement("button");

    button.className = "tab-button" + (index === currentStageIndex ? " active" : "");
    button.textContent = stage.label;
    button.type = "button";

    button.addEventListener("click", function() {
      currentStageIndex = index;
      answerInput.value = "";
      message.textContent = "";
      message.style.color = messageColor;

      render();
      saveState();
    });

    tabBar.appendChild(button);
  });
}

function render() {
  const stage = STAGES[currentStageIndex];

  renderTabs();
  updateTitleText();

  stageTitle.textContent = stage.label;
  nazoImage.src = slide(stage.imageNumber);
  nazoImage.alt = "謎画像 " + stage.label;

  stageDescription.textContent = STAGE_8_DESCRIPTION;
  stageDescription.style.color = messageColor;
  message.classList.remove("no-copy");

  if (stage.id === "intro") {
    answerArea.style.display = "none";
    nextArea.style.display = "block";
  } else {
    answerArea.style.display = "flex";
    nextArea.style.display = "none";
  }

  if (stage.id === "8") {
    app.classList.add("stage-black");
    stageDescription.style.display = "block";
    message.classList.add("no-copy");
  } else {
    app.classList.remove("stage-black");
    stageDescription.style.display = "none";
  }

  resetButton.style.display = "block";
}

function unlockNext() {
  if (currentStageIndex < STAGES.length - 1) {
    unlockedMaxIndex = Math.max(unlockedMaxIndex, currentStageIndex + 1);
  }
}

function formatMessage(input, isCorrect) {
  const resultText = isCorrect ? "正解" : "不正解";

  if (STAGES[currentStageIndex].id === "8") {
    return bracketPair.open + input + bracketPair.close + "は、" + resultText + "です。";
  }

  return "“" + input + "”は、" + resultText + "です。";
}

function showMessage(text, color) {
  message.textContent = text;
  message.style.color = color || messageColor;
  stageDescription.style.color = color || messageColor;
}

function setDateFromYYYYMMDD(value) {
  const y = value.slice(0, 4);
  const m = value.slice(4, 6);
  const d = value.slice(6, 8);

  dateMeta.textContent = "今日：" + y + "年" + m + "月" + d + "日";
}

function isValidDateYYYYMMDD(value) {
  if (!/^\d{8}$/.test(value)) return false;

  const y = Number(value.slice(0, 4));
  const m = Number(value.slice(4, 6));
  const d = Number(value.slice(6, 8));

  const date = new Date(y, m - 1, d);

  return (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
}

function currentDateIs20010910() {
  return dateMeta.textContent === "今日：2001年09月10日";
}

function showClear() {
  cleared = true;
  dateMeta.textContent = ORIGINAL_DATE_TEXT;
  updateTitleText();

  const siteUrl = location.href;
  const postText =
    getCurrentTitleText() + "をクリアしました！\n" +
    "#mmの謎解き #Pleasure_mm謎\n" +
    siteUrl;

  const xUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(postText);

  postButton.href = xUrl;
  clearOverlay.style.display = "flex";

  saveState();
}

function judgeStage1(input) {
  const raw = input.trim();
  const key = normalizeText(raw);
  const found = BRACKET_MAP[key];

  if (found) {
    bracketPair = found;
    unlockNext();
    updateTitleText();
    showMessage("OK", messageColor);
    return;
  }

  showMessage(formatMessage(raw, false), messageColor);
}

function judgeStage2(input) {
  const raw = input.trim();
  const colorKey = normalizeColorKey(raw);
  const color = COLOR_MAP[colorKey];

  if (color) {
    messageColor = color;
  }

  const isCorrect =
    colorKey === "black" ||
    raw === "ブラック" ||
    raw === "ぶらっく" ||
    raw === "黒" ||
    raw === "くろ" ||
    raw === "クロ";

  if (isCorrect) {
    unlockNext();
  }

  showMessage(formatMessage(raw, isCorrect), messageColor);
}

function judgeStage3(input) {
  const raw = input.trim();

  if (["韓国", "かんこく", "カンコク"].includes(raw)) {
    showMessage("5の答えは”かいらく”だ", messageColor);
    return;
  }

  const isCorrect = ["そうる", "ソウル"].includes(raw);

  if (isCorrect) {
    unlockNext();
  }

  showMessage(formatMessage(raw, isCorrect), messageColor);
}

function judgeStage4(input) {
  const raw = input.trim();

  if (raw === "せいかい") {
    seikaiStreak += 1;
  } else {
    seikaiStreak = 0;
  }

  const isCorrect = seikaiStreak >= 50;

  if (isCorrect) {
    unlockNext();
  }

  showMessage(formatMessage(raw, isCorrect), messageColor);
}

function judgeStage5(input) {
  const raw = input.trim();
  const digits = toHalfWidthDigits(raw);

  if (isValidDateYYYYMMDD(digits)) {
    setDateFromYYYYMMDD(digits);
  }

  const isCorrect = digits === "20250911";

  if (isCorrect) {
    unlockNext();
  }

  showMessage(formatMessage(raw, isCorrect), messageColor);
}

function judgeStage6(input) {
  const raw = input.trim();
  const isCorrect = raw === "かいらく";

  if (isCorrect) {
    unlockNext();
  }

  showMessage(formatMessage(raw, isCorrect), messageColor);
}

function judgeStage7(input) {
  const raw = input.trim();
  const isCorrect = currentDateIs20010910() && raw === "やめろ";

  if (isCorrect) {
    unlockNext();
  }

  showMessage(formatMessage(raw, isCorrect), messageColor);
}

function judgeStage8(input) {
  const raw = input.trim();
  const isCorrect = bracketPair.type === "kagi" && raw === "ねかせ";

  showMessage(formatMessage(raw, isCorrect), messageColor);

  if (isCorrect) {
    showClear();
  }
}

function judge() {
  const input = answerInput.value;
  const stageId = STAGES[currentStageIndex].id;

  if (input.trim() === "") return;

  if (stageId !== "4") {
    seikaiStreak = 0;
  }

  if (stageId === "1") judgeStage1(input);
  if (stageId === "2") judgeStage2(input);
  if (stageId === "3") judgeStage3(input);
  if (stageId === "4") judgeStage4(input);
  if (stageId === "5") judgeStage5(input);
  if (stageId === "6") judgeStage6(input);
  if (stageId === "7") judgeStage7(input);
  if (stageId === "8") judgeStage8(input);

  renderTabs();
  saveState();
}

function executeReset() {
  localStorage.removeItem("pleasure_state");

  currentStageIndex = 0;
  unlockedMaxIndex = 0;
  messageColor = "#ffffff";
  bracketPair = {
    open: "〈",
    close: "〉",
    titleOpen: "＜",
    titleClose: "＞",
    type: "yama"
  };
  seikaiStreak = 0;
  cleared = false;

  dateMeta.textContent = ORIGINAL_DATE_TEXT;
  message.textContent = "";
  message.style.color = "#ffffff";
  message.classList.remove("no-copy");
  stageDescription.style.color = "#ffffff";
  answerInput.value = "";
  clearOverlay.style.display = "none";
  resetConfirmOverlay.style.display = "none";

  render();
}

nextButton.addEventListener("click", function() {
  unlockedMaxIndex = Math.max(unlockedMaxIndex, 1);

  answerInput.value = "";
  message.textContent = "";

  render();
  saveState();
});

submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  judge();
});

answerInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    judge();
  }
});

closeClear.addEventListener("click", function() {
  clearOverlay.style.display = "none";
});

clearOverlay.addEventListener("click", function(event) {
  if (event.target === clearOverlay) {
    clearOverlay.style.display = "none";
  }
});

resetButton.addEventListener("click", function() {
  resetConfirmOverlay.style.display = "flex";
});

confirmResetYes.addEventListener("click", function() {
  executeReset();
});

confirmResetNo.addEventListener("click", function() {
  resetConfirmOverlay.style.display = "none";
});

resetConfirmOverlay.addEventListener("click", function(event) {
  if (event.target === resetConfirmOverlay) {
    resetConfirmOverlay.style.display = "none";
  }
});

loadState();
render();