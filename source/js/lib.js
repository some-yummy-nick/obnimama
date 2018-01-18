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

function scrollLinks(links) {
  links.click(function () {
    if ($(this).attr("href") == "" || $(this).attr("href") == "#" || $(this).attr("href") == "javascript:void(0)") {
      return false;
    }
    var elementClick = $(this).attr("href");
    $('html,body').stop().animate({scrollTop: $(elementClick).offset().top}, 1000);
    return false;
  });
}

function addVoidForLinks(links) {
  $.each(links, function () {
    if ($(this).attr("href") == "" || $(this).attr("href") == "#") {
      $(this).attr("href", "javascript:void(0)");
    }
  });
}

//Доступный hamburger https://foxland.fi/simple-accessible-svg-menu-hamburger-animation
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