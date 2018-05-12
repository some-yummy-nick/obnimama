document.addEventListener("DOMContentLoaded", function () {
	var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));


	let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
		Array.prototype.forEach.call(entries, function (entry) {
			if (entry.isIntersecting) {
				let lazyImage = entry.target;
				lazyImage.src = lazyImage.dataset.src;
				if(lazyImage.srcset){
					lazyImage.srcset = lazyImage.dataset.srcset;
				}
				lazyImage.classList.remove("lazy");
				lazyImageObserver.unobserve(lazyImage);
			}
		});

	});
	Array.prototype.forEach.call(lazyImages, function (lazyImage) {
		lazyImageObserver.observe(lazyImage);
	});


});