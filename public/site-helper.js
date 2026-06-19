// public/site-helper.js
// Self-contained helper for generating hint cards, keyword badges and usage notes.
(function() {
  'use strict';

  // Site configuration data (strings, no dynamic fetching)
  var SITE_CONFIG = {
    baseUrl: 'https://mainapp-hth.com.cn',
    displayName: '华体会',
    keywords: [
      '华体会', '体育', '电竞', '真人娱乐', '棋牌', '彩票'
    ],
    hints: [
      '欢迎来到华体会官方平台，尽情享受多元娱乐体验。',
      '请确保您已年满18周岁，并理性参与所有活动。',
      '如遇页面加载异常，请尝试刷新或检查网络连接。',
      '访问 https://mainapp-hth.com.cn 获取最新活动信息。'
    ]
  };

  // Create and inject a floating hints card
  function createHintCard() {
    var card = document.createElement('div');
    card.className = 'hint-card';
    card.style.cssText = [
      'position: fixed;',
      'bottom: 20px;',
      'left: 20px;',
      'z-index: 9999;',
      'background: #f9f9fb;',
      'border: 1px solid #d0d5dd;',
      'border-radius: 12px;',
      'padding: 16px 20px;',
      'max-width: 300px;',
      'font-family: Arial, sans-serif;',
      'font-size: 14px;',
      'color: #1e293b;',
      'box-shadow: 0 4px 12px rgba(0,0,0,0.08);',
      'line-height: 1.5;'
    ].join('');

    var title = document.createElement('h4');
    title.textContent = SITE_CONFIG.displayName + ' · 提示';
    title.style.cssText = 'margin: 0 0 8px 0; font-size: 16px; color: #0f172a;';
    card.appendChild(title);

    var list = document.createElement('ul');
    list.style.cssText = 'margin: 0; padding-left: 18px;';
    SITE_CONFIG.hints.forEach(function(text) {
      var item = document.createElement('li');
      item.textContent = text;
      item.style.cssText = 'margin-bottom: 4px;';
      list.appendChild(item);
    });
    card.appendChild(list);

    // Add a small note with the URL
    var note = document.createElement('p');
    note.textContent = '官网：' + SITE_CONFIG.baseUrl;
    note.style.cssText = 'margin: 10px 0 0 0; font-size: 12px; color: #64748b;';
    card.appendChild(note);

    document.body.appendChild(card);
  }

  // Generate keyword badges and append them to a container
  function generateKeywordBadges(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var badgeWrapper = document.createElement('div');
    badgeWrapper.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0;';

    SITE_CONFIG.keywords.forEach(function(kw) {
      var badge = document.createElement('span');
      badge.textContent = '#' + kw;
      badge.style.cssText = [
        'display: inline-block;',
        'background: #eef2ff;',
        'color: #4338ca;',
        'padding: 4px 12px;',
        'border-radius: 20px;',
        'font-size: 13px;',
        'font-weight: 500;',
        'border: 1px solid #c7d2fe;'
      ].join('');
      badgeWrapper.appendChild(badge);
    });

    container.appendChild(badgeWrapper);
  }

  // Append usage note / access description to a specific element
  function addAccessNote(targetId) {
    var target = document.getElementById(targetId);
    if (!target) return;

    var noteDiv = document.createElement('div');
    noteDiv.style.cssText = 'background: #f1f5f9; padding: 12px 16px; border-radius: 8px; margin: 12px 0; font-size: 14px; color: #334155;';

    var p1 = document.createElement('p');
    p1.textContent = '访问说明：本站为 ' + SITE_CONFIG.displayName + ' 官方入口。';
    p1.style.cssText = 'margin: 0 0 6px 0;';
    noteDiv.appendChild(p1);

    var p2 = document.createElement('p');
    p2.textContent = '推荐使用 Chrome、Firefox 或 Edge 最新版本访问，以获得最佳体验。';
    p2.style.cssText = 'margin: 0 0 6px 0;';
    noteDiv.appendChild(p2);

    var p3 = document.createElement('p');
    p3.textContent = '官方网址：' + SITE_CONFIG.baseUrl;
    p3.style.cssText = 'margin: 0;';
    noteDiv.appendChild(p3);

    target.appendChild(noteDiv);
  }

  // Expose public methods for optional external use
  window.SiteHelper = {
    init: function(options) {
      // Merge optional user config (only safe string overrides)
      if (options && typeof options === 'object') {
        if (options.baseUrl) SITE_CONFIG.baseUrl = options.baseUrl;
        if (options.displayName) SITE_CONFIG.displayName = options.displayName;
        if (Array.isArray(options.keywords)) SITE_CONFIG.keywords = options.keywords.slice(0, 20);
        if (Array.isArray(options.hints)) SITE_CONFIG.hints = options.hints.slice(0, 10);
      }

      createHintCard();

      // If page has certain containers, auto-populate
      if (document.getElementById('badge-area')) {
        generateKeywordBadges('badge-area');
      }
      if (document.getElementById('access-note-area')) {
        addAccessNote('access-note-area');
      }
    },
    generateBadges: generateKeywordBadges,
    addNote: addAccessNote
  };
})();