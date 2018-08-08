function setEqualHeight(columns) {
  var tallestcolumn = 0;
  columns.each(function () {
    var currentHeight = $(this).height();
    console.log(currentHeight);
    if (currentHeight > tallestcolumn) {
      tallestcolumn = currentHeight;
    }
  });
  columns.height(tallestcolumn);
}

function addPhoneMask(elements) {
	var phones = document.querySelectorAll(elements);
	Array.prototype.forEach.call(phones, function(child) {
		var mask = new IMask(child,{
			mask: '{8}(000)000-00-00'
		});
	});
}

function addVoidForLinks(links) {
  $.each(links, function () {
    if ($(this).attr("href") == "" || $(this).attr("href") == "#") {
      $(this).attr("href", "javascript:void(0)");
    }
  });
}

//a11y hamburger https://foxland.fi/simple-accessible-svg-menu-hamburger-animation
function hamburger(element, menu) {
  var button = document.getElementById(element),
    menu = document.getElementById(menu);
  button.onclick = function () {
    // Toggle class "opened". Set also aria-expanded to true or false.
    if (-1 !== button.className.indexOf('opened')) {
      button.className = button.className.replace(' opened', '');
      button.setAttribute('aria-expanded', 'false');
      menu.className = menu.className.replace(' active', '');
      menu.setAttribute('aria-expanded', 'false');
    } else {
      button.className += ' opened';
      button.setAttribute('aria-expanded', 'true');
      menu.className += ' active';
      menu.setAttribute('aria-expanded', 'true');
    }
  };
}