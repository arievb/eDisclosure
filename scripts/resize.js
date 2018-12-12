function ResizeContent() {
  var divContent = document.getElementById('divContent');
  var divMenu = document.getElementById('divMenu');
  var divHeader = document.getElementById('divHeader');
  var divFooter = document.getElementById('divFooter');
  outersize = divMenu.clientHeight + divHeader.clientHeight + divFooter.clientHeight + 3;
  divContent.style.setProperty('height', window.innerHeight - outersize - 16 + 'px');
}
 
window.onresize = function() {ResizeContent();};
//alert(window.innerHeight - window.outerHeight);

