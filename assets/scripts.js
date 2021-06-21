$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function colorVal() {
  var cf = document.getElementById("cf").value;
  var af = document.getElementById("af").value;
  var cb = document.getElementById("cb").value;
  var ab = document.getElementById("ab").value;
  var cr = cf * af + cb * ab * (1 - af);
  document.getElementById("colorValueAnswer").innerHTML = "The value is: " + cr;
}