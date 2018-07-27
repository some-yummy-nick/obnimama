var globalPopup;

$(document).ready(function () {
	globalPopup = new Popup();
	addVoidForLinks($("a"));
	scrollLinks($(".js-scroll"));
	setEqualHeight($(".row>.col"));
	hamburger('js-hamburger', "js-menu");
	addPhoneMask('.js-phone');// https://unmanner.github.io/imaskjs/guide.html

	$('.js-modal-link').click(function () {
		$.post("ajax/modal.html", function (response) {
			globalPopup.html(response, function () {

			}).show();
		});
		return false;
	})
});