---
layout: layout.njk
title: 随记
---

# 随记

随手记录，想到什么写什么。

{% if collections.posts.length > 0 %}
<div class="card-grid">
{% for post in collections.posts %}
  <div class="card">
    <h3 class="card-title"><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
    {% if post.data.description %}
    <p class="card-desc">{{ post.data.description }}</p>
    {% endif %}
    <span class="card-meta">{{ post.date | formatDate }}</span>
  </div>
{% endfor %}
</div>
{% else %}
<p>暂无文章，随缘更新。</p>
{% endif %}
