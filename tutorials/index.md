---
layout: layout.njk
title: 教程
---

# 教程

一些技术教程和踩坑记录。

{% if collections.tutorials.length > 0 %}
<div class="card-grid">
{% for tutorial in collections.tutorials %}
  <div class="card">
    <h3 class="card-title"><a href="{{ tutorial.url }}">{{ tutorial.data.title }}</a></h3>
    {% if tutorial.data.description %}
    <p class="card-desc">{{ tutorial.data.description }}</p>
    {% endif %}
    <span class="card-meta">{{ tutorial.date | formatDate }}</span>
  </div>
{% endfor %}
</div>
{% else %}
<p>教程文章即将发布。</p>
{% endif %}
