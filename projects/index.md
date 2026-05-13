---
layout: layout.njk
title: 项目
---

# 项目

我做的一些小东西，解决实际遇到的问题。

{% if collections.projects.length > 0 %}
<div class="card-grid">
{% for proj in collections.projects %}
  <div class="card">
    <h3 class="card-title"><a href="{{ proj.url }}">{{ proj.data.title }}</a></h3>
    {% if proj.data.description %}
    <p class="card-desc">{{ proj.data.description }}</p>
    {% endif %}
    {% if proj.data.github %}
    <a href="{{ proj.data.github }}" class="card-link" target="_blank" rel="noopener">GitHub ↗</a>
    {% endif %}
  </div>
{% endfor %}
</div>
{% else %}
<p>暂无项目。</p>
{% endif %}
