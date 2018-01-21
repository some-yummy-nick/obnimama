var globalPopup;

$(document).ready(function () {
	globalPopup = new Popup();

	addVoidForLinks($("a"));
	scrollLinks($(".scroll"));
	setEqualHeight($(".row>.col"));
	hamburger('js-hamburger', "js-menu");
	addPhoneMask('.js-phone');// https://unmanner.github.io/imaskjs/guide.html

	$('.js-reviews__link').click(function () {
		$.post("ajax/review.html", function (response) {
			globalPopup.html(response, function () {

			}).show();
		});
		return false;
	})
});