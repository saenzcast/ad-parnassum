(function () {
  var LANG_KEY = "apr-lang";

  function applyLang(lang) {
    if (lang !== "en" && lang !== "es") lang = "es";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var sel = btn.getAttribute("data-set-lang") === lang;
      btn.classList.toggle("is-active", sel);
      btn.setAttribute("aria-pressed", sel ? "true" : "false");
    });

    document.title =
      lang === "es"
        ? "AD PARNASSUM — Producción Musical y Grabación · Barrio Escalante, San José"
        : "AD PARNASSUM — Music Production & Recording · Barrio Escalante, San José";
  }

  function initLang() {
    var saved = null;
    try {
      saved = localStorage.getItem(LANG_KEY);
    } catch (e) {}
    var lang = saved === "es" || saved === "en" ? saved : "es";
    applyLang(lang);
  }

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-set-lang"));
    });
  });

  // Mobile nav toggle
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelectorAll(".nav-list a");

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Contact form -> mailto
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var lang = document.documentElement.getAttribute("lang") === "en" ? "en" : "es";
      var studioEmail =
        form.getAttribute("data-studio-email") || "adparnassum.grabaciones@gmail.com";

      function val(id) {
        var el = form.querySelector("#" + id);
        return el && el.value ? el.value : "";
      }

      var pkgSel = form.querySelector("#pkg-select");
      var pkgLabel =
        pkgSel && pkgSel.selectedIndex >= 0
          ? pkgSel.options[pkgSel.selectedIndex].textContent.trim()
          : "";

      var L =
        lang === "es"
          ? {
              subject: "Consulta — ",
              none: "(sin especificar)",
              pkg: "Paquete",
              name: "Nombre",
              email: "Correo",
              phone: "Teléfono",
              empty: "(no indicado)",
              msg: "Mensaje",
            }
          : {
              subject: "Inquiry — ",
              none: "(not specified)",
              pkg: "Package",
              name: "Name",
              email: "Email",
              phone: "Phone",
              empty: "(not provided)",
              msg: "Message",
            };

      if (!pkgLabel || pkgLabel.indexOf("—") === 0 || pkgLabel.indexOf("Seleccionar") >= 0)
        pkgLabel = L.none;

      var subject = encodeURIComponent(L.subject + pkgLabel);
      var bodyLines = [
        L.pkg + ": " + pkgLabel,
        "",
        L.name + ": " + val("name"),
        L.email + ": " + val("email"),
        L.phone + ": " + (val("phone") || L.empty),
        "",
        L.msg + ":",
        val("message"),
      ];
      var body = encodeURIComponent(bodyLines.join("\n"));
      window.location.href =
        "mailto:" + studioEmail + "?subject=" + subject + "&body=" + body;
    });
  }

  var y = document.getElementById("y");
  if (y) y.textContent = String(new Date().getFullYear());

  initLang();
})();
