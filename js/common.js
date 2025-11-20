document.addEventListener('DOMContentLoaded', function () {
    // Load header
    fetch('includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            // Update active state in menu based on current page
            updateActiveMenuState();
        });

    // Load footer
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});

function updateActiveMenuState() {
    // Get current page URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Find all menu items
    const menuItems = document.querySelectorAll('#cssmenu li');

    // Remove any existing active classes
    menuItems.forEach(item => item.classList.remove('active'));

    // Set active class based on current page
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });


    // $("#cssmenu").menumaker({
    //     title: "Menu",
    //     format: "multitoggle"
    // });

    that = $("#cssmenu");
    var cssmenu = $(that), settings = $.extend({
      title: "Menu",
      format: "multitoggle",
      sticky: false
    }, {
        title: "Menu",
        format: "multitoggle"
    });

    that.each(function () {
      cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
      $(this).find("#menu-button").on('click', function () {
        $(this).toggleClass('menu-opened');
        var mainmenu = $(this).next('ul');
        if (mainmenu.hasClass('open')) {
          mainmenu.hide().removeClass('open');
        }
        else {
          mainmenu.show().addClass('open');
          if (settings.format === "dropdown") {
            mainmenu.children('ul').show();
          }
        }
      });

      cssmenu.find('li ul').parent().addClass('has-sub');

      multiTg = function () {
        cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
        cssmenu.find('.submenu-button').on('click', function () {
          $(this).toggleClass('submenu-opened');
          if ($(this).siblings('ul').hasClass('open')) {
            $(this).siblings('ul').removeClass('open').hide();
          }
          else {
            $(this).siblings('ul').addClass('open').show();
          }
        });
      };

      if (settings.format === 'multitoggle') multiTg();
      else cssmenu.addClass('dropdown');

      if (settings.sticky === true) cssmenu.css('position', 'fixed');

      resizeFix = function () {
        if ($(window).width() > 768) {
          cssmenu.find('ul').show();
        }

        if ($(window).width() <= 768) {
          cssmenu.find('ul').hide().removeClass('open');
        }
      };
      resizeFix();
      $(window).on('resize', resizeFix);

    });

    $("#cssmenu").prepend("<div id='menu-line'></div>");

    var foundActive = false, activeElement, linePosition = 0, menuLine = $("#cssmenu #menu-line"), lineWidth, defaultPosition, defaultWidth;

    $("#cssmenu > ul > li").each(function () {
        if ($(this).hasClass('active')) {
            activeElement = $(this);
            foundActive = true;
        }
    });

    if (foundActive === false) {
        activeElement = $("#cssmenu > ul > li").first();
    }

    defaultWidth = lineWidth = activeElement.width();

    defaultPosition = linePosition = activeElement.position().left;

    menuLine.css("width", lineWidth);
    menuLine.css("left", linePosition);

    $("#cssmenu > ul > li").hover(function () {
        activeElement = $(this);
        lineWidth = activeElement.width();
        linePosition = activeElement.position().left;
        menuLine.css("width", lineWidth);
        menuLine.css("left", linePosition);
    },
        function () {
            menuLine.css("left", defaultPosition);
            menuLine.css("width", defaultWidth);
        });
}