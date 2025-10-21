(function(){
  const DEFAULT_WORDS = [
    "focus","clarity","momentum","create","spark","flow","calm","brave",
    "learn","build","ship","craft","iterate","balance","energy","insight",
  ];

  /** @type {HTMLTextAreaElement} */
  const input = document.getElementById('word-input');
  /** @type {HTMLButtonElement} */
  const generateBtn = document.getElementById('generate-btn');
  /** @type {HTMLDivElement} */
  const grid = document.getElementById('words-grid');
  /** @type {HTMLButtonElement} */
  const copyBtn = document.getElementById('copy-btn');
  /** @type {HTMLButtonElement} */
  const clearBtn = document.getElementById('clear-btn');

  function sanitizeAndSplitWords(raw){
    if(!raw) return [];
    // Split by any whitespace or commas, keep hyphenated words as one token
    const tokens = raw
      .replace(/\r/g, '\n')
      .split(/[\n\t ,]+/)
      .map(w => w.trim())
      .filter(Boolean);
    // Deduplicate while preserving order
    const seen = new Set();
    const unique = [];
    for(const t of tokens){
      const key = t.toLowerCase();
      if(!seen.has(key)){
        seen.add(key);
        unique.push(t);
      }
    }
    return unique.slice(0, 2048);
  }

  function pickRandomUnique(words, count){
    // Fisher–Yates on a copy, but we only need first `count` after shuffle
    const arr = words.slice();
    for(let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, Math.min(count, arr.length));
  }

  function renderWords(words){
    grid.innerHTML = '';
    const fragment = document.createDocumentFragment();
    words.forEach((w, idx) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.animationDelay = `${idx * 20}ms`;
      card.textContent = w;
      fragment.appendChild(card);
    });
    grid.appendChild(fragment);
    copyBtn.disabled = words.length === 0;
  }

  async function copyWordsToClipboard(words){
    const text = words.join('\n');
    if(navigator.clipboard && navigator.clipboard.writeText){
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      const ok = document.execCommand('copy');
      return ok;
    } finally {
      document.body.removeChild(ta);
    }
  }

  function getCurrentInputWords(){
    const raw = input.value.trim();
    const words = sanitizeAndSplitWords(raw);
    return words.length ? words : DEFAULT_WORDS;
  }

  function generate(){
    const inputWords = getCurrentInputWords();
    const chosen = pickRandomUnique(inputWords, 12);
    renderWords(chosen);
  }

  generateBtn.addEventListener('click', generate);

  copyBtn.addEventListener('click', async () => {
    const cards = Array.from(grid.children).map(el => el.textContent || '').filter(Boolean);
    if(cards.length === 0) return;
    try{
      await copyWordsToClipboard(cards);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy Words'; }, 900);
    }catch{
      copyBtn.textContent = 'Copy failed';
      setTimeout(() => { copyBtn.textContent = 'Copy Words'; }, 1200);
    }
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    grid.innerHTML = '';
    copyBtn.disabled = true;
    input.focus();
  });

  // Generate once on load so the page has content
  document.addEventListener('DOMContentLoaded', generate);
})();


