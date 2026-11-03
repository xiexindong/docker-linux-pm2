(function ($) {
  'use strict';

  var state = {
    category: 'all',
    tag: null,
    keyword: ''
  };

  var DATA = null;
  var categoryMap = {};
  var toastTimer = null;
  var ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return ESC_MAP[ch];
    });
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function getTokens() {
    return $.trim(state.keyword).toLowerCase().split(/\s+/).filter(function (token) {
      return token.length > 0;
    });
  }

  function entryText(entry) {
    var commands = (entry.commands || []).map(function (item) {
      return item.cmd + ' ' + (item.desc || '');
    });
    return [
      entry.title,
      entry.summary,
      (entry.tags || []).join(' '),
      entry.content || '',
      commands.join(' ')
    ].join(' ').toLowerCase();
  }

  function matchesKeyword(entry, tokens) {
    var text = entryText(entry);
    return tokens.every(function (token) {
      return text.indexOf(token) !== -1;
    });
  }

  function highlight(text, tokens) {
    var safe = escapeHtml(text);
    tokens.forEach(function (token) {
      if (!token) {
        return;
      }
      var pattern = new RegExp(escapeRegExp(escapeHtml(token)), 'gi');
      safe = safe.replace(pattern, function (matched) {
        return '<mark>' + matched + '</mark>';
      });
    });
    return safe;
  }

  function categoryName(id) {
    return categoryMap[id] ? categoryMap[id].name : '未分类';
  }

  function entriesOfCategory(id) {
    if (id === 'all') {
      return DATA.entries;
    }
    return DATA.entries.filter(function (entry) {
      return entry.category === id;
    });
  }

  /* ---------------- 侧边栏 ---------------- */

  function renderNav() {
    var items = [{ id: 'all', name: '全部知识', desc: '所有分类', count: DATA.entries.length }];
    DATA.categories.forEach(function (category) {
      items.push({
        id: category.id,
        name: category.name,
        desc: category.desc,
        count: entriesOfCategory(category.id).length
      });
    });

    var html = items.map(function (item) {
      var active = state.category === item.id ? ' active' : '';
      return '<button type="button" class="nav-item' + active + '" data-category="' + item.id + '">' +
        '<span>' + escapeHtml(item.name) + '</span>' +
        '<span class="count">' + item.count + '</span>' +
      '</button>';
    }).join('');

    $('#navList').html(html);
  }

  function renderRecent() {
    var recent = DATA.entries.slice().sort(function (a, b) {
      return String(b.updatedAt).localeCompare(String(a.updatedAt));
    }).slice(0, 6);

    var html = recent.map(function (entry) {
      return '<li><button type="button" data-id="' + escapeHtml(entry.id) + '">' +
        escapeHtml(entry.title) +
      '</button></li>';
    }).join('');

    $('#recentList').html(html);
  }

  /* ---------------- 主区 ---------------- */

  function renderTags() {
    var counts = {};
    entriesOfCategory(state.category).forEach(function (entry) {
      (entry.tags || []).forEach(function (tag) {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    var tags = Object.keys(counts).sort(function (a, b) {
      if (counts[b] !== counts[a]) {
        return counts[b] - counts[a];
      }
      return a.localeCompare(b);
    }).slice(0, 14);

    var html = tags.map(function (tag) {
      var active = state.tag === tag ? ' active' : '';
      return '<button type="button" class="tag-chip' + active + '" data-tag="' + escapeHtml(tag) + '">' +
        '#' + escapeHtml(tag) +
      '</button>';
    }).join('');

    $('#tagRow').html(html);
  }

  function filteredEntries() {
    var tokens = getTokens();
    return entriesOfCategory(state.category).filter(function (entry) {
      if (state.tag && (entry.tags || []).indexOf(state.tag) === -1) {
        return false;
      }
      return matchesKeyword(entry, tokens);
    });
  }

  function renderCards() {
    var tokens = getTokens();
    var entries = filteredEntries();

    var html = entries.map(function (entry) {
      var commands = entry.commands || [];
      var preview = commands.length ? String(commands[0].cmd).split('\n')[0] : '';
      var tags = (entry.tags || []).slice(0, 3);

      return '<article class="card" data-id="' + escapeHtml(entry.id) + '">' +
        '<div class="card-top">' +
          '<span class="card-category">' + escapeHtml(categoryName(entry.category)) + '</span>' +
          '<span class="card-date">' + escapeHtml(entry.updatedAt) + '</span>' +
        '</div>' +
        '<h3>' + highlight(entry.title, tokens) + '</h3>' +
        '<p class="card-summary">' + highlight(entry.summary, tokens) + '</p>' +
        (preview
          ? '<div class="card-cmd"><span class="prompt">&gt;</span><span class="cmd-text">' + escapeHtml(preview) + '</span></div>'
          : '') +
        (tags.length
          ? '<div class="card-tags">' + tags.map(function (tag) {
              return '<span class="mini-tag">' + escapeHtml(tag) + '</span>';
            }).join('') + '</div>'
          : '') +
      '</article>';
    }).join('');

    $('#cardList').html(html);
    $('#emptyState').prop('hidden', entries.length > 0);
    if (DATA.entries.length === 0) {
      $('#emptyState p').text('还没有内容。把学习笔记贴进来，整理后会出现在这里');
      $('#resetFilter').hide();
    } else {
      $('#emptyState p').text('没有匹配的条目');
      $('#resetFilter').show();
    }
    $('#totalCount').text(entries.length);
  }

  function updateHead() {
    var category = state.category === 'all' ? null : categoryMap[state.category];
    var title = category ? category.name : '全部知识';
    var desc = category
      ? category.desc
      : (DATA.entries.length ? '按分类浏览，或者直接搜索你要用的命令。' : '把实践中用到的命令、输出和踩坑记录下来。');
    var tokens = getTokens();

    if (tokens.length) {
      desc += ' · 搜索 “' + $.trim(state.keyword) + '”';
    }
    if (state.tag) {
      desc += ' · 标签 #' + state.tag;
    }

    $('#pageTitle').text(title);
    $('#pageDesc').text(desc);
    $('#clearSearch').toggleClass('visible', $.trim(state.keyword).length > 0);
  }

  function render() {
    renderTags();
    renderCards();
    updateHead();
  }

  /* ---------------- 详情抽屉 ---------------- */

  function inlineMarkdown(text) {
    return escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function renderTextBlocks(text) {
    return String(text).split(/\n{2,}/).map(function (block) {
      var lines = block.split('\n').filter(function (line) {
        return $.trim(line).length > 0;
      });
      if (!lines.length) {
        return '';
      }
      var isList = lines.every(function (line) {
        return /^\s*-\s+/.test(line);
      });
      if (isList) {
        return '<ul>' + lines.map(function (line) {
          return '<li>' + inlineMarkdown(line.replace(/^\s*-\s+/, '')) + '</li>';
        }).join('') + '</ul>';
      }
      return '<p>' + inlineMarkdown(lines.join('\n')).replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  function renderMarkdown(text) {
    if (!text) {
      return '';
    }
    return String(text).split(/```/).map(function (part, index) {
      if (index % 2 === 1) {
        var code = part.replace(/^\n+/, '').replace(/^[a-zA-Z0-9_+-]*\n/, '').replace(/\n+$/, '');
        return '<pre class="md-code">' + escapeHtml(code) + '</pre>';
      }
      return renderTextBlocks(part);
    }).join('');
  }

  function relatedEntries(entry) {
    var ownTags = entry.tags || [];
    return DATA.entries.filter(function (item) {
      return item.category === entry.category && item.id !== entry.id;
    }).sort(function (a, b) {
      var sharedA = (a.tags || []).filter(function (tag) { return ownTags.indexOf(tag) !== -1; }).length;
      var sharedB = (b.tags || []).filter(function (tag) { return ownTags.indexOf(tag) !== -1; }).length;
      if (sharedA !== sharedB) {
        return sharedB - sharedA;
      }
      return String(b.updatedAt).localeCompare(String(a.updatedAt));
    }).slice(0, 4);
  }

  function openEntry(id) {
    var entry = DATA.entries.filter(function (item) {
      return item.id === id;
    })[0];
    if (!entry) {
      return;
    }

    $('#drawerCategory').text(categoryName(entry.category));
    $('#drawerTitle').text(entry.title);

    var metaParts = ['<span>更新于 ' + escapeHtml(entry.updatedAt) + '</span>'];
    (entry.tags || []).forEach(function (tag) {
      metaParts.push('<span class="mini-tag">' + escapeHtml(tag) + '</span>');
    });
    $('#drawerMeta').html(metaParts.join('<span class="dot"></span>'));

    var body = '';
    if (entry.content) {
      body += '<div class="md-content">' + renderMarkdown(entry.content) + '</div>';
    }

    if ((entry.commands || []).length) {
      body += '<div class="section-title">命令与逐词解释</div>';
      entry.commands.forEach(function (item) {
        var parts = item.parts || [];
        body += '<div class="cmd-block">' +
          '<div class="cmd-head">' +
            '<span class="cmd-desc">' + escapeHtml(item.desc || '命令') + '</span>' +
            '<button type="button" class="copy-btn">复制</button>' +
          '</div>' +
          '<pre><code>' + escapeHtml(item.cmd) + '</code></pre>' +
          (parts.length
            ? '<ul class="cmd-parts">' + parts.map(function (part) {
                return '<li><code>' + escapeHtml(part.token) + '</code><span>' + escapeHtml(part.desc) + '</span></li>';
              }).join('') + '</ul>'
            : '') +
        '</div>';
      });
    }

    if ((entry.tips || []).length) {
      body += '<div class="section-title">注意与踩坑</div>' +
        '<ul class="tips-list">' + entry.tips.map(function (tip) {
          return '<li>' + inlineMarkdown(tip) + '</li>';
        }).join('') + '</ul>';
    }

    var related = relatedEntries(entry);
    if (related.length) {
      body += '<div class="section-title">相关条目</div>' +
        '<div class="related-list">' + related.map(function (item) {
          return '<button type="button" class="related-item" data-id="' + escapeHtml(item.id) + '">' +
            escapeHtml(item.title) +
          '</button>';
        }).join('') + '</div>';
    }

    $('#drawerBody').html(body).scrollTop(0);
    $('#drawer, #drawerMask').addClass('open');
    $('#drawer').attr('aria-hidden', 'false');
    $('body').addClass('drawer-open');
  }

  function closeDrawer() {
    $('#drawer, #drawerMask').removeClass('open');
    $('#drawer').attr('aria-hidden', 'true');
    $('body').removeClass('drawer-open');
  }

  /* ---------------- 复制与提示 ---------------- */

  function toast(message) {
    clearTimeout(toastTimer);
    $('#toast').text(message).addClass('show');
    toastTimer = setTimeout(function () {
      $('#toast').removeClass('show');
    }, 1600);
  }

  function fallbackCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }

  function copyText(text, $button) {
    function done(ok) {
      toast(ok ? '已复制' : '复制失败，请手动选择');
      if (ok && $button) {
        $button.addClass('copied').text('已复制');
        setTimeout(function () {
          $button.removeClass('copied').text('复制');
        }, 1600);
      }
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () {
        done(true);
      }).catch(function () {
        done(fallbackCopy(text));
      });
    } else {
      done(fallbackCopy(text));
    }
  }

  /* ---------------- 事件绑定 ---------------- */

  function bindEvents() {
    $('#searchInput').on('input', function () {
      state.keyword = $(this).val();
      render();
    });

    $('#clearSearch').on('click', function () {
      state.keyword = '';
      $('#searchInput').val('').trigger('focus');
      render();
    });

    $('#navList').on('click', '.nav-item', function () {
      state.category = $(this).data('category');
      state.tag = null;
      renderNav();
      render();
    });

    $('#tagRow').on('click', '.tag-chip', function () {
      var tag = $(this).data('tag');
      state.tag = state.tag === tag ? null : tag;
      render();
    });

    $('#cardList').on('click', '.card', function () {
      openEntry($(this).data('id'));
    });

    $('#recentList').on('click', 'button', function () {
      openEntry($(this).data('id'));
    });

    $('#drawerBody').on('click', '.copy-btn', function () {
      copyText($(this).closest('.cmd-block').find('pre').text(), $(this));
    });

    $('#drawerBody').on('click', '.related-item', function () {
      openEntry($(this).data('id'));
    });

    $('#drawerClose, #drawerMask').on('click', closeDrawer);

    $('#resetFilter').on('click', function () {
      state.category = 'all';
      state.tag = null;
      state.keyword = '';
      $('#searchInput').val('');
      renderNav();
      render();
    });

    $(document).on('keydown', function (event) {
      var target = event.target;
      var typing = $(target).is('input, textarea, select') || target.isContentEditable;

      if (event.key === '/' && !typing) {
        event.preventDefault();
        $('#searchInput').trigger('focus');
        return;
      }

      if (event.key === 'Escape') {
        if ($('#drawer').hasClass('open')) {
          closeDrawer();
        } else if ($.trim(state.keyword)) {
          state.keyword = '';
          $('#searchInput').val('');
          render();
        }
      }
    });
  }

  /* ---------------- 详情抽屉宽度拖拽 ---------------- */

  var DRAWER_WIDTH_KEY = 'knowledge.drawerWidth';
  var DRAWER_MIN_WIDTH = 360;
  var DRAWER_MOBILE_BREAK = 720;

  function isMobileViewport() {
    return window.innerWidth <= DRAWER_MOBILE_BREAK;
  }

  function setDrawerWidth(width) {
    var $drawer = $('#drawer');
    if (!width || isMobileViewport()) {
      $drawer.css('width', '');
      return;
    }
    var maxWidth = Math.max(DRAWER_MIN_WIDTH, window.innerWidth - 56);
    $drawer.css('width', Math.round(Math.min(Math.max(width, DRAWER_MIN_WIDTH), maxWidth)) + 'px');
  }

  function initDrawerResizer() {
    var $drawer = $('#drawer');
    var $handle = $('#drawerResizer');
    if (!$handle.length || !$drawer.length) {
      return;
    }

    var stored = NaN;
    try {
      stored = parseFloat(window.localStorage.getItem(DRAWER_WIDTH_KEY));
    } catch (e) { /* 隐私模式下 localStorage 可能不可用 */ }
    if (!isNaN(stored)) {
      setDrawerWidth(stored);
    }

    var dragging = false;
    var startX = 0;
    var startWidth = 0;

    $handle.on('pointerdown', function (event) {
      if (isMobileViewport()) {
        return;
      }
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }
      dragging = true;
      startX = event.clientX;
      startWidth = $drawer.outerWidth();
      $('body').addClass('drawer-resizing');
      if ($handle[0].setPointerCapture) {
        $handle[0].setPointerCapture(event.pointerId);
      }
      event.preventDefault();
    });

    $(document).on('pointermove', function (event) {
      if (!dragging) {
        return;
      }
      setDrawerWidth(startWidth + (startX - event.clientX));
      event.preventDefault();
    });

    $(document).on('pointerup pointercancel', function () {
      if (!dragging) {
        return;
      }
      dragging = false;
      $('body').removeClass('drawer-resizing');
      try {
        window.localStorage.setItem(DRAWER_WIDTH_KEY, String($drawer.outerWidth()));
      } catch (e) { /* 存不下就算了，不影响使用 */ }
    });

    $handle.on('dblclick', function () {
      try {
        window.localStorage.removeItem(DRAWER_WIDTH_KEY);
      } catch (e) { /* 同上 */ }
      setDrawerWidth(0);
    });

    $(window).on('resize', function () {
      var inline = parseFloat($drawer[0].style.width);
      setDrawerWidth(isNaN(inline) ? 0 : inline);
    });
  }

  /* ---------------- 初始化 ---------------- */

  function init(data) {
    DATA = data;
    categoryMap = {};
    (DATA.categories || []).forEach(function (category) {
      categoryMap[category.id] = category;
    });

    $('#brandTitle').text(DATA.meta && DATA.meta.title ? DATA.meta.title : '后端学习手册');
    $('#searchInput').attr('placeholder', '搜索命令、关键词、标签，多个关键词用空格分隔');
    document.title = DATA.meta && DATA.meta.title ? DATA.meta.title : '后端学习手册';

    renderNav();
    renderRecent();
    render();
    initDrawerResizer();
  }

  function showLoadError() {
    $('#appMessage').prop('hidden', false).html(
      '知识数据 <code>data/knowledge.js</code> 没有加载成功。请确认该文件存在，并且 <code>index.html</code> 底部已经引入它。'
    );
    $('#cardList').empty();
    $('#totalCount').text('0');
    $('#emptyState').prop('hidden', true);
  }

  $(function () {
    bindEvents();
    if (!window.KNOWLEDGE_DATA) {
      showLoadError();
      return;
    }
    init(window.KNOWLEDGE_DATA);
  });
})(jQuery);
