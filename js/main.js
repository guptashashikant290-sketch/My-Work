(function () {
  var root = document.documentElement;
  root.classList.add("js");

  var themeButton = document.querySelector(".theme-toggle");
  var themeLabel = themeButton.querySelector(".theme-toggle-label");
  var nav = document.querySelector("[data-nav]");
  var navToggle = nav.querySelector(".nav-toggle");
  var navLinks = nav.querySelector(".nav-links");
  var links = Array.prototype.slice.call(navLinks.querySelectorAll('a[href^="#"]'));
  var sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var isLight = theme === "light";
    themeButton.setAttribute("aria-pressed", isLight ? "true" : "false");
    themeLabel.textContent = isLight ? "Dark mode" : "Light mode";
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {}
  }

  function setMenu(open) {
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navLinks.classList.toggle("is-open", open);
    navToggle.querySelector(".nav-toggle-label").textContent = open ? "Close" : "Menu";
  }

  applyTheme(currentTheme());

  themeButton.addEventListener("click", function () {
    applyTheme(currentTheme() === "light" ? "dark" : "light");
  });

  navToggle.addEventListener("click", function () {
    setMenu(navToggle.getAttribute("aria-expanded") !== "true");
  });

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });

  document.querySelectorAll(".project").forEach(function (project, index) {
    project.classList.add("rise", index % 2 === 0 ? "from-left" : "from-right");
  });
  document.querySelectorAll(".role, .skill-group, .education, .contact-list li").forEach(function (item, index) {
    item.classList.add("rise");
    item.style.transitionDelay = (index % 4) * 70 + "ms";
  });

  function updateScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    root.style.setProperty("--scroll", String(progress));
    root.style.setProperty("--shift", window.scrollY.toFixed(1) + "px");

    var timeline = document.querySelector(".timeline");
    if (!timeline) {
      return;
    }
    var rect = timeline.getBoundingClientRect();
    var traveled = window.innerHeight * 0.72 - rect.top;
    var total = Math.max(rect.height, 1);
    var scale = Math.min(1, Math.max(0, traveled / total));
    timeline.style.setProperty("--line-scale", String(scale));

    document.querySelectorAll(".reveal, .rise").forEach(function (el) {
      if (el.classList.contains("is-visible")) {
        return;
      }
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.classList.add("is-visible");
      }
    });
  }

  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("resize", updateScroll);
  window.addEventListener("pointermove", function (event) {
    root.style.setProperty("--mx", event.clientX + "px");
    root.style.setProperty("--my", event.clientY + "px");
  }, { passive: true });

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    document.querySelectorAll(".reveal, .rise").forEach(function (section) {
      revealObserver.observe(section);
    });

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          links.forEach(function (link) {
            var active = link.getAttribute("href") === "#" + entry.target.id;
            if (active) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  } else {
    document.querySelectorAll(".reveal, .rise").forEach(function (section) {
      section.classList.add("is-visible");
    });
  }
})();
