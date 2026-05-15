---
layout: layout.njk
title: 教程
---

# 教程

一些技术教程和踩坑记录。

{% if collections.tutorials.length > 0 %}
<div class="card-grid">
{% for tutorial in collections.tutorials %}
<a class="card" href="{{ tutorial.url }}">
  <h3 class="card-title">{{ tutorial.data.title }}</h3>
  {% if tutorial.data.description %}
  <p class="card-desc">{{ tutorial.data.description }}</p>
  {% endif %}
  <div class="card-meta">{{ tutorial.date | formatDate }}</div>
</a>
{% endfor %}
</div>
{% else %}
<p>教程文章即将发布。</p>
{% endif %}
