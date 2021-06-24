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

**Screw the explanation, [take me to the calculator](/Blog/web-design/2021/06/10/Calculator-from-alpha.html)!**
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

## Example
Let's take this red color: `rgb(229,34,55)`
<div style="height:100px; width:100px; background-color:rgb(229,34,55);"></div>

Now, let's pretend we need to match that red color when it has an alpha factor of 0.4. `rgba(229,34,55,0.4)`
<div style="height:100px; width:100px; background-color:rgba(229,34,55,0.4);"></div>

When using transparency, the background color shows through. A color with alpha less then 1.0 will look different depending on the background. Because of this, we need to know the color of that background. Here, it's `#333333`, which translates to  `rgba(51,51,51,1.0)`

So, the values for the first `r` value are as follows:
- cf = 229
- af = 0.4
- cb = 51
- ab = 1.0

Plug it in to the formula (don't forget [PEMDAS](https://en.wikipedia.org/wiki/Order_of_operations#Mnemonics)!)

1. Take the first value, 229, and run it through the formula
	- 229 x 0.4 + 51 x 1.0 x (1 - 0.4) = 122.2 *round to 122*
2. Do this for each of the other values:
	- `g` values - 34 x 0.4 + 51 x 1.0 x (1 - 0.4) = 44
	- `b` values = 55 x 0.4 + 51 x 1.0 x (1 - 0.4) = 53
3. Add these three to an rgb - `rgb(122,44,53)`

### The result

<table>
	<tr>
	<td style="height:100px; width:250px; background-color:rgba(229,34,55,0.4);text-align:center;border-right:2px solid #000;">rgba(229,34,55,0.4)</td>
	<td style="height:100px; width:250px; background-color:rgb(122,44,53);text-align:center;">rgb(122,44,53)</td>
	</tr>
</table>
Can you tell the difference?