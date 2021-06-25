---
layout: post
title: "RGBA to RGB conversion calculator"
subtitle: "Calculator to convert rgba to simle rgb"
date: 2021-06-11 11:53:25 -0500
preview-img: '/img/posts/sunhide.jpg'
published: true
categories: ["web-design"]
tags: css
---
# Convert rgba to rgb

Enter the rgba values for the color you want to match:<br>
<input class="input" id="rValMatch"> <input class="input" id="gValMatch"> <input class="input" id="bValMatch"> <input class="input" id="oValMatch"><br>
Enter the rgba values for the background:<br>
<input class="input" id="rValBg"> <input class="input" id="gValBg"> <input class="input" id="bValBg"> <input class="input" id="oValBg">

<input type="button" class="btn btn-dark" onclick="newColorVal()" value="Run the calculator">

The new value is: rgb(<span id="newR"></span>, <span id="newG"></span>, <span id="newB"></span>);

Here's the [explanation](/Blog/web-design/2021/06/10/Convert-RGBA-to-RGB.html) for this calculator.