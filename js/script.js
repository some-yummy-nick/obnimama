$(document).ready(function () {
	addVoidForLinks($("a"));
	setEqualHeight($(".row>.col"));
	hamburger('js-hamburger', "js-menu");
	addPhoneMask('.js-phone');// https://unmanner.github.io/imaskjs/guide.html
	$('.modaal-ajax').modaal({
		type: 'ajax'
	});
});