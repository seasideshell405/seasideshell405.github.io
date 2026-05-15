---
layout: layout.njk
title: 项目
---

# 项目

我做的一些小东西，解决实际遇到的问题。

{% if projects.length > 0 %}
<div class="card-grid">
{% for proj in projects %}
<div class="card" data-href="{{ proj.github }}">
<h3 class="card-title">{{ proj.title }}</h3>
{% if proj.description %}
<p class="card-desc">{{ proj.description }}</p>
{% endif %}
<a href="{{ proj.github }}" class="card-link" target="_blank" rel="noopener">前往项目 ↗</a>
</div>
{% endfor %}
</div>
{% else %}
<p>暂无项目。</p>
{% endif %}
