(function () {
  var header = document.querySelector(".site-header");
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");
  var navLinks = nav.querySelectorAll("a");

  // footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // header border once the page is scrolled
  function onScroll() {
    if (window.scrollY > 8) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // mobile menu
  function closeMenu() {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "Menu";
  }

  function openMenu() {
    nav.classList.add("open");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.textContent = "Close";
  }

  menuBtn.addEventListener("click", function () {
    if (nav.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
      menuBtn.focus();
    }
  });

  document.addEventListener("click", function (e) {
    if (!nav.classList.contains("open")) return;
    if (!header.contains(e.target)) {
      closeMenu();
    }
  });

  // if the window grows past the mobile breakpoint, reset the menu
  var desktopQuery = window.matchMedia("(min-width: 721px)");
  function onBreakpoint(e) {
    if (e.matches) closeMenu();
  }
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", onBreakpoint);
  } else if (desktopQuery.addListener) {
    desktopQuery.addListener(onBreakpoint);
  }

  // highlight the nav link for the section in view
  if (!("IntersectionObserver" in window)) return;

  var linkById = {};
  for (var j = 0; j < navLinks.length; j++) {
    var id = navLinks[j].getAttribute("href").slice(1);
    linkById[id] = navLinks[j];
  }

  function setActive(id) {
    for (var key in linkById) {
      if (key === id) {
        linkById[key].classList.add("active");
      } else {
        linkById[key].classList.remove("active");
      }
    }
  }

  var observer = new IntersectionObserver(
    function (entries) {
      for (var k = 0; k < entries.length; k++) {
        if (entries[k].isIntersecting) {
          setActive(entries[k].target.id);
        }
      }
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  for (var sectionId in linkById) {
    var section = document.getElementById(sectionId);
    if (section) observer.observe(section);
  }

  // clear highlight when back in the intro
  var intro = document.getElementById("top");
  if (intro) {
    var introObserver = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) setActive(null);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    introObserver.observe(intro);
  }
})();
