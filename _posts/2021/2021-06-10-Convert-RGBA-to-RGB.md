---
layout: post
title: "Convert RGBA to RGB"
subtitle: "Formula to convert a color with opacity to a simulated color without opacity"
date: 2021-06-10 09:37:14 -0500
preview-img: '/img/posts/sunhide.jpg'
published: true
categories: ["web-design"]
tags: css
---

I recently wanted to create a chart in excel that used colors that had opacity. Unfortunately, Excel only allows hex or RGB colors with no opacity for a cell fill. After some searching, I found the formula to convert an image with a defined opacity into a new color without.

---
## The calculator
I know this is what you're after, so I'll put it at the top.

Enter the rgba values for the color you want to match:<br>
<input class="input" id="rValMatch"> <input class="input" id="gValMatch"> <input class="input" id="bValMatch"> <input class="input" id="oValMatch"><br>
Enter the rgba values for the background:<br>
<input class="input" id="rValBg"> <input class="input" id="gValBg"> <input class="input" id="bValBg"> <input class="input" id="oValBg">

<input type="button" class="btn btn-dark" onclick="newColorVal()" value="Run the calculator">

The new value is: rgb(<span id="newR"></span>, <span id="newG"></span>, <span id="newB"></span>);

---
## What you need to know in advance
1. The rgba values of the color to match
2. The rgba values of the background

## The formula
**cr = cf x af + cb x ab x (1 - af)**

Where:
- cr = the resulting color
- cf = foreground color (The original color value)
- af = foreground alpha factor (0.00 through 1.00 - what you want to apply to the color)
- cb = background color (usually white, or 255)
- ab = background alpha factor (usually 1.0)

## Explanation
Take the rgba value of your color to convert.
Example: `rgba(229,34,55,0.4)`

1. Take the first value, 229, and run it through the formula
	- 0 x 0.4 + 229 x 1.0 x (1 - 0.4) = 244.6 *can round to 245*
2. Do this for each of the other values:
	- 0 x 0.4 + 34 x 1.0 x (1 - 0.4) = 167
	- 0 x 0.4 + 55 x 1.0 x (1 - 0.4) = 175
3. Add these three to an rgb - `rgb(245,167,175)`

### Example using above colors

<table>
	<tr>
	<td style="height:150px; width:150px; background-color:rgba(229,34,55,0.4);text-align:center;border-right:2px solid #000;">Original, with opacity</td>
	<td style="height:150px; width:150px; background-color:rgb(122,44,53);text-align:center;">New, no opacity</td>
	</tr>
</table>

- *note - values changed in the actual site due to the dark (non-white) background*