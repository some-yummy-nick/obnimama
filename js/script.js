$(document).ready(function () {
	addVoidForLinks($("a"));
	addPhoneMask('.js-phone');// https://unmanner.github.io/imaskjs/guide.html
	$(".js-accordion").accordion();

	$('.js-modaal-question').modaal({
		type: 'ajax',
		custom_class: "callback-popup"
	});

	$('.js-product-modal').modaal({
		type: 'ajax',
		custom_class: "product-popup"
	});

	baron({
		root: '.js-baron',
		scroller: '.js-scroll',
		bar: '.js-scrollbar',
		scrollingCls: '_scrolling',
		draggingCls: '_dragging'
	});

	$('.js-select-basket').select2({
		theme: "basket",
		minimumResultsForSearch: -1
	});

	$('.js-select-hour').select2({
		theme: "hour",
		minimumResultsForSearch: -1
	});

	$('.js-select-minute').select2({
		theme: "minute",
		minimumResultsForSearch: -1
	});

	(function () {
		var doc = document,
			basketButtons = doc.querySelectorAll(".js-basket-button"),
			basketClose = doc.querySelector(".js-basket-close"),
			basketInitial = doc.querySelector(".js-basket-initial"),
			basketStuff = doc.querySelectorAll(".js-basket-stuff"),
			basketAdmire = doc.querySelector(".js-admire"),
			basketFields = doc.querySelectorAll(".js-field");

		basketAdmire.addEventListener("change", function () {
			var basketButton = $(basketAdmire).parents(".js-basket-block").find(".js-basket-button")[0];
			basketButton.disabled = !basketAdmire.checked;
		});

		Array.prototype.forEach.call(basketButtons, function (basketButton) {
			basketButton.addEventListener("click", function () {
				var basketBlock = $(basketButton).parents(".js-basket-block")[0];
				var basketFields = basketBlock.querySelectorAll(".js-field");
				if (basketFields.length) {
					Array.prototype.forEach.call(basketFields, function (basketField) {
						if (basketField.value.trim() !== "") {
							basketBlock.classList.add("hidden");
							basketBlock.nextElementSibling.classList.toggle("hidden");

						}
						else {
							if(!$(basketField).parent().find(".form__error").length){
								basketField.insertAdjacentHTML('afterend', '<p class="form__error">' + "Пожалуста заполните поле" + '</p>')
							}
						}
					});
				} else {
					basketBlock.classList.add("hidden");
					basketBlock.nextElementSibling.classList.toggle("hidden");
				}


			})
		});

		Array.prototype.forEach.call(basketFields, function (basketField) {
			basketField.addEventListener("input", function () {

				if (basketField.nextElementSibling) {
					basketField.nextElementSibling.classList.add("hidden");
				}
			})
		});

		basketClose.addEventListener("click", function () {
			basketInitial.classList.remove("hidden");
			var basketBlock = $(basketClose).parents(".js-basket-block")[0];
			basketBlock.classList.add("hidden");
			Array.prototype.forEach.call(basketStuff, function (child) {
				child.innerHTML = 0;
			});
		})
	})();

	(function () {
		var doc = document,
			products = doc.querySelectorAll(".js-product"),
			basketInitial = doc.querySelector(".js-basket-initial"),
			basketFirst = doc.querySelector(".js-basket-first"),
			basketItems = doc.querySelector(".js-basket-items"),
			basketCount = doc.querySelector(".js-basket-count");

		Array.prototype.forEach.call(products, function (product) {

			var amount = product.querySelector(".js-amount"),
				plus = product.querySelector(".js-basket-plus"),
				minus = product.querySelector(".js-basket-minus"),
				stuff = product.querySelector(".js-basket-stuff"),
				price = product.querySelector(".js-basket-price"),
				priceInitial = price.innerHTML,
				title = product.querySelector(".js-product-title"),
				listItem = doc.createElement("li"),
				listItemName = doc.createElement("div"),
				listItemAmount = doc.createElement("div");

			listItem.classList.add("basket__item");
			listItemName.classList.add("basket__name");
			listItemAmount.classList.add("basket__amount");

			listItem.appendChild(listItemName);
			listItem.appendChild(listItemAmount);


			plus.addEventListener("click", function () {
				stuff.innerHTML++;
				basketInitial.classList.add("hidden");
				basketFirst.classList.remove("hidden");
				listItemName.innerHTML = title.innerHTML;
				$(basketItems).parents(".basket__block").removeClass("hidden");
				basketItems.appendChild(listItem);
				basketCount.innerHTML = basketItems.children.length - 1;
				price.innerHTML = stuff.innerHTML * priceInitial;
				minus.classList.remove("disabled");
				minus.disabled = false;
				$(".js-scroll").scrollTop($(".js-scroll")[0].scrollHeight);

				if (stuff.innerHTML > 1) {
					listItemAmount.classList.remove("hidden");
					listItemAmount.innerHTML = "x" + stuff.innerHTML;
				}


			});

			minus.addEventListener("click", function () {
				stuff.innerHTML--;
				listItemAmount.innerHTML = "x" + stuff.innerHTML;
				price.innerHTML = stuff.innerHTML * priceInitial;

				if (stuff.innerHTML <= 0) {
					stuff.innerHTML = 0;
					price.innerHTML = priceInitial;
					minus.disabled = true;
					listItemAmount.classList.add("hidden");
					listItem.parentNode.removeChild(listItem);
					basketCount.innerHTML = basketItems.children.length - 1;
					if (basketItems.children.length <= 1) {
						$(basketItems).parents(".basket__block").addClass("hidden");
					}
				}
			})
		});

	})();
});