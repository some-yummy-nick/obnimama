$(document).ready(function () {

  addVoidForLinks($("a"));
  scrollLinks($(".scroll"));
  setEqualHeight($(".row>.col"));
  hamburger('js-hamburger', "js-menu");

});