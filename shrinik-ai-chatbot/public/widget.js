(function () {
  var script =
    document.currentScript ||
    (function () {
      var all = document.getElementsByTagName('script');
      return all[all.length - 1];
    })();

  var ENDPOINT = (script && script.getAttribute('data-endpoint')) || '/api/chat';
  var TITLE = (script && script.getAttribute('data-title')) || 'Shrinik AI';
  var SUBTITLE = (script && script.getAttribute('data-subtitle')) || 'Where Ideas Become Innovation';

  var history = [];
  var busy = false;

  var css = [
    '.snk-launcher{position:fixed;bottom:22px;right:22px;width:60px;height:60px;border-radius:50%;',
    'background:linear-gradient(135deg,#6d28d9,#2563eb);border:none;cursor:pointer;z-index:99998;',
    'box-shadow:0 8px 24px rgba(37,99,235,.4);display:flex;align-items:center;justify-content:center;',
    'transition:transform .2s ease}.snk-launcher:hover{transform:scale(1.08)}',
    '.snk-launcher svg{width:28px;height:28px;fill:#fff}',
    '.snk-panel{position:fixed;bottom:94px;right:22px;width:min(370px,calc(100vw - 32px));height:min(540px,calc(100vh - 120px));',
    'background:#0f1222;border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,.45);z-index:99999;',
    'display:flex;flex-direction:column;overflow:hidden;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;',
    'opacity:0;transform:translateY(16px) scale(.97);pointer-events:none;transition:opacity .22s ease,transform .22s ease}',
    '.snk-panel.snk-open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}',
    '.snk-header{background:linear-gradient(135deg,#6d28d9,#2563eb);padding:14px 16px;display:flex;align-items:center;gap:10px}',
    '.snk-avatar{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.18);display:flex;',
    'align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:15px;flex-shrink:0}',
    '.snk-head-text{color:#fff;line-height:1.25}.snk-title{font-weight:700;font-size:15px}',
    '.snk-sub{font-size:11.5px;opacity:.85}',
    '.snk-close{margin-left:auto;background:none;border:none;color:#fff;font-size:20px;cursor:pointer;opacity:.85;padding:4px 6px}',
    '.snk-close:hover{opacity:1}',
    '.snk-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:#0f1222}',
    '.snk-msgs::-webkit-scrollbar{width:6px}.snk-msgs::-webkit-scrollbar-thumb{background:#2a2f45;border-radius:3px}',
    '.snk-bubble{max-width:82%;padding:9px 13px;border-radius:14px;font-size:13.5px;line-height:1.5;',
    'white-space:pre-wrap;word-wrap:break-word}',
    '.snk-bot{background:#1c2137;color:#e6e8f2;align-self:flex-start;border-bottom-left-radius:4px}',
    '.snk-user{background:linear-gradient(135deg,#6d28d9,#2563eb);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}',
    '.snk-error{background:#3a1d24;color:#ffb4bd;align-self:flex-start;border-bottom-left-radius:4px}',
    '.snk-typing{display:flex;gap:5px;padding:12px 14px;background:#1c2137;border-radius:14px;align-self:flex-start;',
    'border-bottom-left-radius:4px}.snk-dot{width:7px;height:7px;border-radius:50%;background:#8b93b8;',
    'animation:snk-bounce 1.2s infinite ease-in-out}.snk-dot:nth-child(2){animation-delay:.15s}',
    '.snk-dot:nth-child(3){animation-delay:.3s}@keyframes snk-bounce{0%,80%,100%{transform:translateY(0);opacity:.4}',
    '40%{transform:translateY(-5px);opacity:1}}',
    '.snk-inputbar{display:flex;gap:8px;padding:12px;border-top:1px solid #23283f;background:#141830}',
    '.snk-input{flex:1;background:#1c2137;border:1px solid #2a2f45;border-radius:12px;padding:10px 13px;',
    'color:#e6e8f2;font-size:13.5px;outline:none;font-family:inherit}.snk-input:focus{border-color:#6d28d9}',
    '.snk-send{background:linear-gradient(135deg,#6d28d9,#2563eb);border:none;border-radius:12px;width:42px;',
    'cursor:pointer;display:flex;align-items:center;justify-content:center;transition:filter .15s}.snk-send:hover{filter:brightness(1.15)}',
    '.snk-send svg{width:17px;height:17px;fill:#fff}'
  ].join('');

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function addBubble(text, type) {
    var b = el('div', 'snk-bubble snk-' + type);
    b.textContent = text;
    msgs.appendChild(b);
    msgs.scrollTop = msgs.scrollHeight;
    return b;
  }

  function showTyping() {
    var t = el('div', 'snk-typing');
    for (var i = 0; i < 3; i++) t.appendChild(el('span', 'snk-dot'));
    msgs.appendChild(t);
    msgs.scrollTop = msgs.scrollHeight;
    return t;
  }

  async function send(text) {
    if (busy || !text.trim()) return;
    busy = true;
    addBubble(text, 'user');
    input.value = '';
    var typing = showTyping();
    try {
      var res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.slice(0, 500), history: history.slice(-6) })
      });
      var data = await res.json().catch(function () { return {}; });
      typing.remove();
      if (!res.ok) {
        addBubble(data.error || 'Something went wrong. Please try again.', 'error');
      } else {
        addBubble(data.reply, 'bot');
        history.push({ role: 'user', text: text }, { role: 'model', text: data.reply });
        if (history.length > 12) history = history.slice(-12);
      }
    } catch (err) {
      typing.remove();
      addBubble('Network error. Please check your connection and try again.', 'error');
    }
    busy = false;
  }

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var launcher = el('button', 'snk-launcher');
  launcher.setAttribute('aria-label', 'Open chat');
  launcher.innerHTML =
    '<svg viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-7 11h-6v-2h6v2zm4-4H7V7h10v2z"/></svg>';

  var panel = el('div', 'snk-panel');

  var header = el('div', 'snk-header');
  var avatar = el('div', 'snk-avatar');
  avatar.textContent = 'S';
  var headText = el('div', 'snk-head-text');
  headText.innerHTML = '<div class="snk-title"></div><div class="snk-sub"></div>';
  headText.querySelector('.snk-title').textContent = TITLE + ' Assistant';
  headText.querySelector('.snk-sub').textContent = SUBTITLE;
  var closeBtn = el('button', 'snk-close');
  closeBtn.innerHTML = '&times;';
  header.appendChild(avatar);
  header.appendChild(headText);
  header.appendChild(closeBtn);

  var msgs = el('div', 'snk-msgs');

  var inputbar = el('div', 'snk-inputbar');
  var input = el('input', 'snk-input');
  input.placeholder = 'Ask about Shrinik...';
  input.maxLength = 500;
  var sendBtn = el('button', 'snk-send');
  sendBtn.setAttribute('aria-label', 'Send message');
  sendBtn.innerHTML =
    '<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';
  inputbar.appendChild(input);
  inputbar.appendChild(sendBtn);

  panel.appendChild(header);
  panel.appendChild(msgs);
  panel.appendChild(inputbar);

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  addBubble(
    "Hi! I'm the Shrinik Club assistant. Ask me about our teams, events like GLB Talks, how to join, or how to reach us.",
    'bot'
  );

  var open = false;
  function toggle(force) {
    open = typeof force === 'boolean' ? force : !open;
    panel.classList.toggle('snk-open', open);
    if (open) input.focus();
  }

  launcher.addEventListener('click', function () {
    toggle(true);
    launcher.style.display = 'none';
  });
  closeBtn.addEventListener('click', function () {
    toggle(false);
    launcher.style.display = 'flex';
  });

  function submit() {
    send(input.value);
  }
  sendBtn.addEventListener('click', submit);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') submit();
  });
})();
