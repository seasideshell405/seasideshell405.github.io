(function () {
  var btn = document.getElementById("searchBtn");
  var overlay = document.getElementById("searchOverlay");
  var input = document.getElementById("searchInput");
  var results = document.getElementById("searchResults");
  var closeBtn = document.getElementById("searchClose");

  if (!btn || !overlay || !input || !results || !closeBtn) return;

  var index = null;

  function loadIndex() {
    if (index) return Promise.resolve(index);
    return fetch("/search.json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        index = data;
        return index;
      });
  }

  function openOverlay() {
    overlay.removeAttribute("hidden");
    document.body.classList.add("search-open");
    requestAnimationFrame(function () {
      input.focus();
    });
  }

  function closeOverlay() {
    overlay.setAttribute("hidden", "");
    document.body.classList.remove("search-open");
    input.value = "";
    results.innerHTML = '<p class="search-hint">输入关键词开始搜索</p>';
  }

  function search(query) {
    if (!query) return [];
    var q = query.toLowerCase();
    return index.filter(function (item) {
      return (
        item.title.toLowerCase().indexOf(q) !== -1 ||
        item.excerpt.toLowerCase().indexOf(q) !== -1 ||
        (item.content && item.content.toLowerCase().indexOf(q) !== -1)
      );
    });
  }

  function getSnippet(text, query) {
    if (!text) return "";
    var q = query.toLowerCase();
    var idx = text.toLowerCase().indexOf(q);
    if (idx === -1) {
      // 没匹配到内容就取前 160 字
      return text.length > 160 ? text.slice(0, 160) + "…" : text;
    }
    // 手机端取少一点，电脑端取多一点
    var contextLen = window.innerWidth < 640 ? 25 : 35;
    var start = Math.max(0, idx - contextLen);
    var end = Math.min(text.length, idx + q.length + contextLen);
    var snippet = (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
    return snippet;
  }

  function render(items, query) {
    if (items.length === 0) {
      results.innerHTML = '<p class="search-empty">没有找到相关内容</p>';
      return;
    }

    var html = '<p class="search-summary">找到 ' + items.length + ' 个结果</p>';

    items.forEach(function (item) {
      var isExternal = item.tags.indexOf("project") !== -1;
      var re = new RegExp("(" + query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
      var titleHl = item.title.replace(re, "<mark>$1</mark>");

      // 摘要命中了就用摘要做片段，否则从正文截取
      var q = query.toLowerCase();
      var snippet;
      if (item.excerpt && item.excerpt.toLowerCase().indexOf(q) !== -1) {
        snippet = getSnippet(item.excerpt, query);
      } else if (item.content) {
        snippet = getSnippet(item.content, query);
      } else {
        snippet = item.excerpt || "";
      }
      var snippetHl = snippet.replace(re, "<mark>$1</mark>");
      var tagLabel = { post: "随记", tutorial: "教程", project: "项目" }[item.tags[0]] || item.tags[0];

      html += '<a href="' + item.url + '" class="search-result-item"';
      if (isExternal) html += ' target="_blank" rel="noopener"';
      html += '>';
      html += '  <span class="search-result-title">' + titleHl + '</span>';
      html += '  <span class="search-result-excerpt">' + snippetHl + '</span>';
      html += '  <span class="search-result-tag">' + tagLabel + '</span>';
      html += '</a>';
    });

    results.innerHTML = html;
  }

  function doSearch(query) {
    loadIndex().then(function () {
      render(search(query), query);
    });
  }

  var debounceTimer = null;
  function handleInput() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      var q = input.value.trim();
      if (q) {
        doSearch(q);
      } else {
        results.innerHTML = '<p class="search-hint">输入关键词开始搜索</p>';
      }
    }, 250);
  }

  btn.addEventListener("click", openOverlay);
  closeBtn.addEventListener("click", closeOverlay);

  input.addEventListener("input", handleInput);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeOverlay();
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeOverlay();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hasAttribute("hidden")) {
      closeOverlay();
    }
  });

  overlay.addEventListener("submit", function (e) { e.preventDefault(); });

  document.addEventListener("swup:contentReplaced", function () {
    index = null;
    if (!overlay.hasAttribute("hidden")) {
      closeOverlay();
    }
  });
})();
