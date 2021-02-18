---
layout: post
title: "Jekyll categories"
subtitle: "Using the categories on your Jekyll site"
date: 2021-02-15 21:34:07 -0500
preview-img: '/img/posts/default.jpg'
published: true
categories:
tags: test
---
## Add categories to the posts
Categories and tags are basically the same thing, just by different names. They are gathered, handled, and called using the same methods. The below (tested) code was adapted from the [Jekyll tag page](2021-02-15-Jekyll-tags) - in fact, the only real change here is that I changed `tag` for `category` and `tags` for `categories`. It otherwise remains virtually untouched.

Add categories to the post(s) by including them in the post's frontmatter. One category can be added using `category:` or multiple using `categories:`[^1] . Separate each category with a single space. It is recommended to use lowercase letters in category names only, and a single word only. If a two-word category is necessary, be sure to put the categories in quotations.
- `categories: single category new` - three categories named, "single" and "category" and "new"
- `categories: ["single category", new]` - two categories named, "single category" and "new" - anything non-standard (single words separated by a single space) needs to be shown as an array: in square brackets, and comma-separated.

[^1]:I use 'tags' all the time, since it works for singular and plural categories both. If I never use the singular, I don't have to remember to change it

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

## Build the list of categories
Now we need to create the list of categories on the site:
Add a file to the `_includes` folder called `collectcategories.html` with the following:

```html
{% raw %}
{% assign rawcategories = "" %}
{% for post in site.posts %}
  {% assign tcategories = post.categories | join:'|' | append:'|' %}
  {% assign rawcategories = rawcategories | append:tcategories %}
{% endfor %}
{% assign rawcategories = rawcategories | split:'|' | sort %}

{% assign site.categories = "" %}
{% for tag in rawcategories %}
  {% if category != "" %}
    {% if categories == "" %}
      {% assign categories = category | split:'|' %}
    {% endif %}
    {% unless categories contains category %}
      {% assign categories = categories | join:'|' | append:'|' | append:category | split:'|' %}
    {% endunless %}
  {% endif %}
{% endfor %}
{% endraw %}
```

This creates a list called `site.categories`

Now we need to 'execute' the building of the list. Since it needs to happen *before* we can use the list, include it in the head.html file (inside the head section).[^2]

[^2]:This insures the list will be built when the page is loaded

```html
{% raw %}
{% if site.categories != "" %}
  {% include collectcategories.html %}
{% endif %}
{% endraw %}
```

## Displaying categories on the post
In the \_includes folder, make a file named `categoryline.html` with the following content:

```js
{% raw %}
<span>Categories:
	{% for category in page.categories %}
		{% capture category_name %}{{ category }}{% endcapture %}
	<a href="{{ site.baseurl }}/category/{{ category\_name }}"class="postCategories"><nobr>
		{{ category_name }}</nobr></a>&nbsp;
	{% endfor %}
</span>
{% endraw %}
```
Note that this also makes each displayed category into a link, at `/category/category_name`

Also note the use of `site.baseurl` here. Most tutorials for tags/categories assume the site is located in the user's base repository. Mine is not, so I cannot use the simple `site.url`. The base url needs to be set up in the `config.yml` file. See Jekyll documentation for details.

Put the following in the post template, in the location you wish the categories to be displayed:
{% raw %}`{% include categoryline.html %}`{% endraw %}

Note: the links will be displayed identical to the rest of the links on the site. The class `postCategories` can be altered to style these links as desired.

## Make the pages for category posts
We need to create the pages these links point to. These need to be done manually each time a category is added. There are automatic scripts for this, but they require a little bit of programming skill.[^3]

[^3]:I don't have that skill, but [here](https://github.com/qian256/qian256.github.io/blob/master/tag_generator.py) is one example - there are many online

First, create the layout for each category page. In the \_layouts folder, create categorypage.html with the following content:

```js
{% raw %}
---
layout: default
---

<header class="postHeader">
	<div class="container">
		<div class="row">
			<div class="col-lg-8 col-md-10 mx-auto">
				<h1>Tag: {{ page.category }}</h1>
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
				{% for post in site.categories[page.category] %}
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

This layout can now be used on each 'category page' - that is, each category needs a page to display its contents. Use like so:

```
{% raw %}
---
layout: categorypage
title: "Tag page for CATEGORYNAME"
tag: CATEGORYNAME
---

These are posts that are tagged with the **{{ page.category }}** tag.

<!--
$$ Remove (or do not copy) this and everything below it.
$$ Replace CATEGORYNAME with the name of the new category in both places of the frontmatter. No other changes are necessary.
$$ New file name should match the categoryname.md
\-->
{% endraw %}
```
Change the CATEGORYNAME in both places to the tag. Each tag needs its own file, placed in a folder (in the root) named `category`. Feel free to change the content as desired.

## One page that lists all categories with a list of their posts
In the root folder, create a page called `categories.html` with the following content:

```
{% raw %}
---
layout: page
title: Site categories
---

<h1>Categories used on this site</h1>
<hr/>
{% for category in site.categories %}
	<h3><a href="{{ site.url }}/Blog/category/{{ category[0] }}" style="color:#bbbbbb;">{{ category[0] }}</a></h3>
	<ul>
		{% for post in category[1] %}
				<li><a href="{{ post.url | prepend:site.baseurl }}">{{ post.title }}
			</a></li>
		{% endfor %}
	</ul>
{% endfor %}
{% endraw %}
```

## Create a list of all categories on the site
Create a list of categories used on the site (without the list of associated posts). Each category will link to its categories page.

Add a file to the \_includes folder called `categoryArchive.html` with the following:

```
{% raw %}
{% capture tempcategories %}
	{% for category in site.categories %}
		{{ category\[1\].size | plus: 1000 }}#{{ category\[0\] }}#{{ category\[1\].size }}
	{% endfor %}
{% endcapture %}
{% assign sortedtempcategories = tempcategories | split:' ' | sort | reverse %}
{% for tempcategory in sortedtempcategories %}
	{% assign categoryitems = tempcategory | split: '#' %}
	{% capture categoryname %}{{ categoryitems\[1\] }}{% endcapture %}
	<a href\="{{ siteurl | prepend:site.baseurl }}/category/{{ categoryname }}" class\="postCategories"\><nobr\>{{ categoryname }}</nobr\></a\>&nbsp;
{% endfor %}
{% endraw %}
```

Place it in a page or post[^4]

[^4]:I put this at the top or bottom of my categories.html page from the previous section

{% raw %}`{% include categoryArchive.html %}`{% endraw %}
