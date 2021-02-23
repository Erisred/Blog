---
layout: post_comm
title: "Jekyll tags"
subtitle: "Using the tags on your Jekyll site"
date: 2021-02-15 21:33:04 -0500
preview-img: '/img/posts/default.jpg'
published: true
categories: 
tags: jekyll
---
I decided to write this because I found relatively few directions on this when I initially searched for it. That, and I might want to reference them later.

## Add tags to the posts
Add tags to the post(s) by including them in the post's frontmatter. One tag can be added using `tag:` or multiple using `tags:`^[I use 'tags' all the time, since it works for singular and plural tags both. If I never use the singular, I don't have to remember to change it] . Separate each tag with a single space. It is recommended to use lowercase letters in tag names only, and a single word only. If a two-word tag is necessary, be sure to put the tags in quotations.
- `tags: single tag new` - three tags named, "single" and "tag" and "new"
- `tags: ["single tag", new]` - two tags named, "single tag" and "new" - anything non-standard (single words separated by a single space) needs to be shown as an array: in square brackets, and comma-separated.

```html
---
layout: post
title: The best blog post title
subtitle: An even better subtitle
date: 2021-02-15 08:24:38 -0500
tags: [tag1, tag2, tag3]
categories: [cat1, cat2, cat3]
---
```

## Build the list of tags
Now we need to create the list of tags on the site:
Add a file to the `_includes` folder called `collecttags.html` with the following:

```html
{% raw %}
{% assign rawtags = "" %}
{% for post in site.posts %}
  {% assign ttags = post.tags | join:'|' | append:'|' %}
  {% assign rawtags = rawtags | append:ttags %}
{% endfor %}
{% assign rawtags = rawtags | split:'|' | sort %}

{% assign site.tags = "" %}
{% for tag in rawtags %}
  {% if tag != "" %}
    {% if tags == "" %}
      {% assign tags = tag | split:'|' %}
    {% endif %}
    {% unless tags contains tag %}
      {% assign tags = tags | join:'|' | append:'|' | append:tag | split:'|' %}
    {% endunless %}
  {% endif %}
{% endfor %}
{% endraw %}
```

This creates a list called `site.tags`

Now we need to 'execute' the building of the list. Since it needs to happen *before* we can use the list, include it in the head.html file (inside the head section).^[This insures the list will be built when the page is loaded]

```html
{% raw %}
{% if site.tags != "" %}
  {% include collecttags.html %}
{% endif %}
{% endraw %}
```

## Displaying tags on the post
In the \_includes folder, make a file named `tagline.html` with the following content:

```js
{% raw %}
<span\>Tags:
	{% for tag in page.tags %}
		{% capture tag\_name %}{{ tag }}{% endcapture %}
	<a href\="{{ site.baseurl }}/tag/{{ tag\_name }}"class\="postTags"\><nobr\>
		{{ tag\_name }}</nobr\></a\>&nbsp;
	{% endfor %}
</span\>
{% endraw %}
```
Note that this also makes each displayed tag into a link, at `/tag/tag_name`

Also note the use of `site.baseurl` here. Most tutorials for tags/categories assume the site is located in the user's base repository. Mine is not, so I cannot use the simple `site.url`. The base url needs to be set up in the `config.yml` file. See Jekyll documentation for details.

Put the following in the post template, in the location you wish the tags to be displayed:
{% raw %}`{% include tagline.html %}`{% endraw %}

Note: the links will be displayed identical to the rest of the links on the site. The class `postTags` can be altered to style these links as desired.

## Make the pages for tag posts
We need to create the pages these links point to. These need to be done manually each time a tag is added. There are automatic scripts for this, but they require a little bit of programming skill.^[I don't have that skill, but [here](https://github.com/qian256/qian256.github.io/blob/master/tag_generator.py) is one example - there are many online]

First, create the layout for each tag page. In the \_layouts folder, create tagpage.html with the following content:

```js
{% raw %}
---
layout: default
---

<header class="postHeader">
	<div class="container">
		<div class="row">
			<div class="col-lg-8 col-md-10 mx-auto">
				<h1>Tag: {{ page.tag }}</h1>
				{{ content }}
				<hr>
			</div>
		</div>
	<div>
</header>

<div class="container">
	<div class="row">
		<div class="col-lg-8 col-md-10 mx-auto">
			<ul>
				{% for post in site.tags[page.tag] %}
					<li><a href="{{ post.url | prepend:site.baseurl }}">{{ post.title }}</a>{{ post.date | date_to_string }})<br>
						{{ post.description }}
					</li>
				{% endfor %}
			</ul>
		</div>
	</div>
</div>
{% endraw %}
```

This layout can now be used on each 'tag page' - that is, each tag needs a page to display its contents. Use like so:

```
{% raw %}
---
layout: tagpage
title: "Tag page for TAGNAME"
tag: TAGNAME
---

These are posts that are tagged with the **{{ page.tag }}** tag.

<!--
$$ Remove (or do not copy) this and everything below it.
$$ Replace TAGNAME with the name of the new tag in both places of the frontmatter. No other changes are necessary.
$$ New file name should match the tagname.md
-->
{% endraw %}
```
Change the TAGNAME in both places to the tag. Each tag needs its own file, placed in a folder (in the root) named `tag`. Feel free to change the content as desired.

## One page that lists all tags with a list of their posts
In the root folder, create a page called `tags.html` with the following content:

```
{% raw %}
---
layout: page
title: Site tags
---

<h1>Tags used on this site</h1>
<hr/>
{% for tag in site.tags %}
	<h3><a href="{{ site.url }}/Blog/tag/{{ tag[0] }}" style="color:#bbbbbb;">{{ tag[0] }}</a></h3>
	<ul>
		{% for post in tag[1] %}
				<li><a href="{{ post.url | prepend:site.baseurl }}">{{ post.title }}
			</a></li>
		{% endfor %}
	</ul>
{% endfor %}
{% endraw %}
```

## Create a list of all tags on the site
Create a list of tags used on the site (without the list of associated posts). Each tag will link to its tag page.

Add a file to the \_includes folder called `tagArchive.html` with the following:

```
{% raw %}
<h2\>Archive</h2\>
{% capture temptags %}
	{% for tag in site.tags %}
		{{ tag\[1\].size | plus: 1000 }}#{{ tag\[0\] }}#{{ tag\[1\].size }}
	{% endfor %}
{% endcapture %}
{% assign sortedtemptags = temptags | split:' ' | sort | reverse %}
{% for temptag in sortedtemptags %}
	{% assign tagitems = temptag | split: '#' %}
	{% capture tagname %}{{ tagitems\[1\] }}{% endcapture %}
	<a href\="{{ siteurl | prepend:site.baseurl }}/tag/{{ tagname }}" class\="postTags"\><nobr\>{{ tagname }}</nobr\></a\>&nbsp;
{% endfor %}
{% endraw %}
```

Place it in a page or post^[I put this at the top or bottom of my tags.html page from the previous section]

{% raw %}`{% include tagArchive.html %}`{% endraw %}