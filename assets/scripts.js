$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function newColorVal() {
  var rValMatch = document.getElementById("rValMatch").value;
  var gValMatch = document.getElementById("gValMatch").value;
  var bValMatch = document.getElementById("bValMatch").value;
  var oValMatch = document.getElementById("oValMatch").value;
  var rValBg = document.getElementById("rValBg").value;
  var gValBg = document.getElementById("gValBg").value;
  var bValBg = document.getElementById("bValBg").value;
  var oValBg = document.getElementById("oValBg").value;
  var newR = Math.round(rValMatch * oValMatch + rValBg * oValBg * (1 - oValMatch));
  var newG = Math.round(gValMatch * oValMatch + gValBg * oValBg * (1 - oValMatch));
  var newB = Math.round(bValMatch * oValMatch + bValBg * oValBg * (1 - oValMatch));
  document.getElementById("newR").innerHTML = newR;
  document.getElementById("newG").innerHTML = newG;
  document.getElementById("newB").innerHTML = newB;
}