---
layout: post
title: "Toggle visibility"
subtitle: "Toggle the visibility of a specified DIV using css and JS"
date: 2021-02-24 14:16:31 -0500
preview-img: '/img/posts/default.jpg'
published: false
categories: ["web-design"]
tags: css javascript
---

This is really for my own sake, since this can be found with even a cursory Google search...

### Creating a section that can be hidden/shown using a link/button
*This does require Javascript.*

First, put this code in your script file:
```js
    function toggle_visibility(id) {
    var e = document.getElementById(id);
    if(e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
    }
```

Then, create a link or button to call the function:\\
`<button>Click to toggle</button>`

Add the bit that starts the function when the button is clicked:\\
`<button onclick="toggle_visibility('sampleID');>Click to toggle</button>`\\
*The `sampleID` is the ID you will give the DIV that is to be toggled.*

Now, to create the toggle section:
`<div id="sampleID">Content to toggle.</div>`

If you want the content to be hidden at first, add `style="display=none"` to the DIV (or style it that way in the css)

The result:
```
<button class="btn btn-dark" onclick="toggle_visibility('sampleID');">View div by ID</button>

<div id="sampleID" style="display:none;">  
This is hidden by default, then shown (as a block) when the toggle link/button is pressed.
</div>
```
<button class="btn btn-dark" onclick="toggle_visibility('sampleID');">View div by ID</button>

<div id="sampleID" style="display:none;">  
This is hidden by default, then shown (as a block) when the toggle link/button is pressed.
</div>

That's it!