// Miga & Azúcar (marca ficticia) — estructura compartida e interacciones (sin dependencias).
(function () {
  'use strict';

  // PRUEBA: aparición suave de productos al hacer scroll. Pon false para desactivarla.
  var FADE_IN = true;

  var B = window.SITE;
  var page = document.body.getAttribute('data-page') || 'inicio';
  var CART_KEY = 'miga-azucar-carrito';
  var WORDMARK = '<span class="wordmark">Miga <em>&amp;</em> Azúcar</span>';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function money(n) {
    return '$ ' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  function byHandle(h) {
    return B.products.filter(function (p) { return p.handle === h; })[0];
  }
  function showWhatsApp(text, trigger) {
    var pre = document.querySelector('[data-wa-text]');
    if (pre) pre.textContent = text;
    openDrawer('vista-whatsapp', trigger);
  }

  var ICON_MENU = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  var ICON_CLOSE = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICON_CART = '<svg class="icon-cart" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2"/><circle cx="9.5" cy="20" r="1.2"/><circle cx="17.5" cy="20" r="1.2"/></svg>';

  var NAV = [
    ['inicio', 'Inicio', 'index.html'],
    ['productos', 'Productos', 'productos.html'],
    ['personaliza', 'Personaliza', 'personaliza.html'],
    ['eventos', 'Eventos', 'eventos.html'],
    ['nosotros', 'Sobre Nosotros', 'nosotros.html'],
    ['talleres', 'Talleres', 'talleres.html'],
    ['contacto', 'Contacto', 'contacto.html']
  ];
  function navLinks() {
    return NAV.map(function (n) {
      return '<a href="' + n[2] + '"' + (n[0] === page ? ' aria-current="page"' : '') + '>' + n[1] + '</a>';
    }).join('');
  }

  // ---------- Estructura común ----------
  var headerSlot = document.querySelector('[data-site-header]');
  if (headerSlot) {
    headerSlot.outerHTML =
      '<a class="skip-link" href="#contenido">Saltar al contenido</a>' +
      '<header class="site-header">' +
        '<a class="site-header__logo" href="index.html" aria-label="Miga & Azúcar, inicio">' + WORDMARK + '</a>' +
        '<nav class="site-header__nav" aria-label="Principal">' + navLinks() + '</nav>' +
        '<button class="site-header__cart" type="button" data-cart-open aria-label="Abrir carrito">' + ICON_CART + '<span>Carrito</span><span class="cart-count" data-cart-count hidden></span></button>' +
        '<button class="site-header__menu" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="menu-movil" data-menu-open>' + ICON_MENU + '</button>' +
      '</header>' +
      '<div class="drawer drawer--left" id="menu-movil" hidden>' +
        '<div class="drawer__backdrop" data-drawer-close></div>' +
        '<nav class="drawer__panel drawer__panel--menu" aria-label="Menú">' +
          '<button class="drawer__close" type="button" aria-label="Cerrar menú" data-drawer-close>' + ICON_CLOSE + '</button>' +
          navLinks() +
        '</nav>' +
      '</div>' +
      '<div class="drawer" id="carrito" hidden>' +
        '<div class="drawer__backdrop" data-drawer-close></div>' +
        '<section class="drawer__panel drawer__panel--cart" aria-labelledby="carrito-titulo">' +
          '<div class="cart__head"><h2 class="h3" id="carrito-titulo">Tu carrito</h2><button class="drawer__close" type="button" aria-label="Cerrar carrito" data-drawer-close>' + ICON_CLOSE + '</button></div>' +
          '<div class="cart__body" data-cart-body></div>' +
        '</section>' +
      '</div>';
  }

  var footerSlot = document.querySelector('[data-site-footer]');
  if (footerSlot) {
    footerSlot.outerHTML =
      '<footer class="site-footer">' +
        '<div class="site-footer__top">' +
          '<div class="site-footer__brand">' + WORDMARK.replace('wordmark', 'wordmark wordmark--lg') + '<p class="site-footer__quote">Cada postre empieza con una receta de familia.</p></div>' +
          '<div><h2 class="site-footer__title">Visítanos</h2><address><ul>' +
            '<li>Calle Ejemplo 123, Centro<br>Puebla, Pue.</li>' +
            '<li>Mar–sáb 10:00 – 19:00</li><li>Dom 11:00 – 16:00</li></ul></address></div>' +
          '<div><h2 class="site-footer__title">Contacto</h2><ul>' +
            '<li><a href="#" data-wa-demo="Hola Miga & Azúcar.">WhatsApp 222 000 0000</a></li>' +
            '<li>Tel. 222 000 0000</li>' +
            '<li>Instagram @migayazucar</li></ul></div>' +
          '<div><h2 class="site-footer__title">Explora</h2><ul>' +
            '<li><a href="productos.html">Productos</a></li><li><a href="personaliza.html">Personaliza</a></li>' +
            '<li><a href="eventos.html">Eventos</a></li><li><a href="talleres.html">Talleres</a></li>' +
            '<li><a href="preguntas-frecuentes.html">Preguntas frecuentes</a></li></ul></div>' +
        '</div>' +
        '<div class="site-footer__bottom"><span>© 2026 Miga &amp; Azúcar · Proyecto concepto con marca ficticia</span><span><a href="privacidad.html">Política de privacidad</a></span></div>' +
      '</footer>' +
      '<div class="drawer" id="vista-whatsapp" hidden>' +
        '<div class="drawer__backdrop" data-drawer-close></div>' +
        '<section class="drawer__panel drawer__panel--cart" aria-labelledby="wa-titulo">' +
          '<div class="cart__head"><h2 class="h3" id="wa-titulo">Vista previa del mensaje</h2><button class="drawer__close" type="button" aria-label="Cerrar" data-drawer-close>' + ICON_CLOSE + '</button></div>' +
          '<div class="cart__body"><p class="lead" style="margin-top:1.25rem">En un sitio real, aquí se abriría WhatsApp con este mensaje listo para enviar:</p><pre class="wa-preview" data-wa-text></pre>' +
          '<p class="caption muted">Este es un proyecto concepto: no se envía nada.</p></div>' +
        '</section>' +
      '</div>' +
      '<div class="toast" role="status" aria-live="polite" data-toast hidden></div>';
  }

  // ---------- Aviso ----------
  var toastTimer;
  function notify(text) {
    var toast = document.querySelector('[data-toast]');
    if (!toast) return;
    toast.textContent = text;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 2600);
  }

  // ---------- Paneles (menú y carrito) ----------
  var lastTrigger = null;
  var DRAWER_MS = 380; // igual a la duración de salida en styles.css
  function openDrawer(id, trigger) {
    var d = document.getElementById(id);
    if (!d) return;
    lastTrigger = trigger || null;
    clearTimeout(d._hideTimer);
    d.hidden = false;
    d.offsetWidth; // fuerza el estado inicial antes de animar
    d.classList.add('is-open');
    document.body.classList.add('no-scroll');
    if (trigger && trigger.hasAttribute('aria-expanded')) trigger.setAttribute('aria-expanded', 'true');
    var c = d.querySelector('.drawer__close');
    if (c) c.focus({ preventScroll: true });
  }
  function closeDrawers() {
    document.querySelectorAll('.drawer.is-open').forEach(function (d) {
      d.classList.remove('is-open');
      d._hideTimer = setTimeout(function () { d.hidden = true; }, DRAWER_MS);
    });
    document.body.classList.remove('no-scroll');
    document.querySelectorAll('[aria-expanded="true"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
  }
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.closest('[data-menu-open]')) { openDrawer('menu-movil', t.closest('[data-menu-open]')); return; }
    if (t.closest('[data-cart-open]')) { renderCart(); openDrawer('carrito', t.closest('[data-cart-open]')); return; }
    var demo = t.closest('[data-wa-demo]');
    if (demo) { e.preventDefault(); showWhatsApp(demo.getAttribute('data-wa-demo'), demo); return; }
    if (t.closest('[data-drawer-close]') || (t.closest('.drawer__panel--menu') && t.closest('a'))) closeDrawers();
  });
  document.addEventListener('keydown', function (e) {
    var open = document.querySelector('.drawer.is-open');
    if (!open) return;
    if (e.key === 'Escape') { closeDrawers(); return; }
    if (e.key !== 'Tab') return;
    var items = open.querySelectorAll('button:not([disabled]), a, input, select');
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // ---------- Carrito (se guarda en este navegador) ----------
  function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
  }
  function writeCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) { /* sin almacenamiento: el carrito vive solo en esta página */ }
    memoryCart = items;
    updateCount();
  }
  var memoryCart = readCart();
  function cart() { return memoryCart; }
  function updateCount() {
    var n = cart().reduce(function (s, i) { return s + i.qty; }, 0);
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.hidden = n === 0;
      el.textContent = '(' + n + ')';
    });
  }
  function addToCart(handle, variant, qty) {
    var items = cart().slice();
    var found = items.filter(function (i) { return i.handle === handle && i.variant === (variant || ''); })[0];
    if (found) found.qty += qty || 1;
    else items.push({ handle: handle, variant: variant || '', qty: qty || 1 });
    writeCart(items);
    var p = byHandle(handle);
    notify(p.name + (variant ? ' (' + variant + ')' : '') + ' se agregó al carrito');
  }
  function renderCart() {
    var body = document.querySelector('[data-cart-body]');
    if (!body) return;
    var items = cart().filter(function (i) { return byHandle(i.handle); });
    if (!items.length) {
      body.innerHTML = '<div class="cart__empty"><p class="lead">Tu carrito está vacío.</p><a class="btn btn--primary" href="productos.html">Seguir comprando</a></div>';
      return;
    }
    var total = 0;
    var rows = items.map(function (i, idx) {
      var p = byHandle(i.handle);
      total += p.price * i.qty;
      return '<li class="cart__item">' +
        '<img src="' + p.image + '" alt="" width="72" height="96">' +
        '<div class="cart__info"><a class="cart__name" href="producto.html?p=' + p.handle + '">' + esc(p.name) + '</a>' +
        (i.variant ? '<span class="caption muted">' + esc(i.variant) + '</span>' : '') +
        '<span class="cart__price">' + money(p.price) + '</span>' +
        '<div class="qty"><button type="button" data-qty="' + idx + '" data-d="-1" aria-label="Quitar uno">−</button><span aria-live="polite">' + i.qty + '</span><button type="button" data-qty="' + idx + '" data-d="1" aria-label="Agregar uno">+</button></div>' +
        '</div><button class="cart__remove" type="button" data-remove="' + idx + '">Quitar</button></li>';
    }).join('');
    body.innerHTML = '<ul class="cart__list">' + rows + '</ul>' +
      '<div class="cart__foot"><div class="cart__total"><span>Subtotal</span><strong>' + money(total) + '</strong></div>' +
      '<p class="caption muted">Pide con anticipación: los pedidos se confirman con 50% de anticipo.</p>' +
      '<button class="btn btn--primary btn--block" type="button" data-checkout>Continuar al pago</button>' +
      '<p class="cart__note" data-checkout-note hidden>Este prototipo no procesa pagos. En la tienda real, aquí se abre el pago seguro de Shopify.</p>' +
      '<a class="link" href="productos.html">Seguir comprando</a></div>';
    body.querySelectorAll('[data-qty]').forEach(function (b) {
      b.addEventListener('click', function () {
        var list = items.slice(), it = list[+b.getAttribute('data-qty')];
        it.qty += +b.getAttribute('data-d');
        writeCart(list.filter(function (x) { return x.qty > 0; }));
        renderCart();
      });
    });
    body.querySelectorAll('[data-remove]').forEach(function (b) {
      b.addEventListener('click', function () {
        var list = items.slice(); list.splice(+b.getAttribute('data-remove'), 1);
        writeCart(list); renderCart();
        var c = document.querySelector('#carrito .drawer__close'); if (c) c.focus();
      });
    });
    body.querySelector('[data-checkout]').addEventListener('click', function () {
      body.querySelector('[data-checkout-note]').hidden = false;
    });
  }
  updateCount();

  // ---------- Tarjetas de producto ----------
  function cardHTML(p) {
    var url = 'producto.html?p=' + p.handle;
    var action = p.price != null
      ? (p.options
          ? '<a class="btn btn--secondary" href="' + url + '">Elegir sabor</a>'
          : '<button class="btn btn--secondary" type="button" data-add="' + p.handle + '">Añadir</button>')
      : '<a class="btn btn--primary" href="personaliza.html?producto=' + encodeURIComponent(p.name) + '#cotizar">Cotiza este producto</a>';
    return '<li class="card" data-category="' + p.category + '">' +
      '<a class="card__media" href="' + url + '"><img src="' + p.image + '" alt="' + esc(p.name) + '" width="800" height="1067" loading="lazy">' +
      (p.badge ? '<span class="badge badge--cream">' + esc(p.badge) + '</span>' : '') + '</a>' +
      '<div class="card__body"><h3 class="card__name"><a href="' + url + '">' + esc(p.name) + '</a></h3>' +
      (p.price != null ? '<p class="card__price">' + money(p.price) + '</p>' : '') + action + '</div></li>';
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]');
    if (!b) return;
    addToCart(b.getAttribute('data-add'));
    b.textContent = 'Agregada';
    b.classList.add('is-added');
  });

  function renderGrid(grid, list) {
    grid.innerHTML = list.map(cardHTML).join('');
    reveal(grid.querySelectorAll('.card'));
  }

  // PRUEBA de aparición
  var observer = null;
  if (FADE_IN && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('fade-in-on');
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); observer.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  }
  function reveal(nodes) {
    if (!observer) return;
    Array.prototype.forEach.call(nodes, function (n, i) {
      n.classList.add('reveal');
      n.style.transitionDelay = (i % 3) * 90 + 'ms';
      observer.observe(n);
    });
  }

  // Cuadrícula de la home
  var homeGrid = document.querySelector('[data-home-grid]');
  if (homeGrid) renderGrid(homeGrid, B.products.slice(0, 6));

  // Catálogo con filtros
  var catalog = document.querySelector('[data-catalog]');
  if (catalog) {
    var chipsRow = document.querySelector('[data-chips]');
    var empty = document.querySelector('[data-empty]');
    var title = document.querySelector('[data-catalog-title]');
    var params = new URLSearchParams(location.search);
    var current = params.get('categoria') || 'todos';
    chipsRow.innerHTML = B.categories.map(function (c) {
      return '<button class="chip" type="button" data-filter="' + c.id + '" aria-pressed="false">' + c.name + '</button>';
    }).join('');
    function apply(cat) {
      current = cat;
      var info = B.categories.filter(function (c) { return c.id === cat; })[0] || B.categories[0];
      chipsRow.querySelectorAll('.chip').forEach(function (c) {
        var on = c.getAttribute('data-filter') === cat;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      var list = B.products.filter(function (p) { return cat === 'todos' || p.category === cat; });
      renderGrid(catalog, list);
      empty.hidden = list.length > 0;
      if (title) title.textContent = cat === 'todos' ? 'Todos los productos' : info.name;
      var url = cat === 'todos' ? 'productos.html' : 'productos.html?categoria=' + cat;
      history.replaceState(null, '', url);
    }
    chipsRow.addEventListener('click', function (e) {
      var c = e.target.closest('[data-filter]');
      if (c) apply(c.getAttribute('data-filter'));
    });
    apply(current);
  }

  // Ficha de producto
  var detail = document.querySelector('[data-product]');
  if (detail) {
    var p = byHandle(new URLSearchParams(location.search).get('p')) || B.products[0];
    document.title = p.name + ' · Miga & Azúcar';
    var opts = p.options
      ? '<fieldset class="options"><legend>' + esc(p.options.name) + '</legend>' + p.options.values.map(function (v, i) {
          return '<label class="option"><input type="radio" name="variante" value="' + esc(v) + '"' + (i === 0 ? ' checked' : '') + '><span>' + esc(v) + '</span></label>';
        }).join('') + '</fieldset>'
      : '';
    var buy = p.price != null
      ? opts + '<div class="buy"><div class="qty qty--lg"><button type="button" data-step="-1" aria-label="Quitar uno">−</button><span data-qty-value aria-live="polite">1</span><button type="button" data-step="1" aria-label="Agregar uno">+</button></div>' +
        '<button class="btn btn--primary" type="button" data-buy>Añadir al carrito</button></div>'
      : '<a class="btn btn--primary" href="personaliza.html?producto=' + encodeURIComponent(p.name) + '#cotizar">Cotiza este producto</a>' +
        '<p class="caption muted">Pedidos especiales con mínimo 3 días de anticipación.</p>';
    detail.innerHTML =
      '<nav class="crumbs" aria-label="Ruta"><a href="productos.html">Productos</a> / <span>' + esc(p.name) + '</span></nav>' +
      '<div class="product">' +
        '<div class="product__media"><img src="' + p.image + '" alt="' + esc(p.name) + '" width="800" height="1067">' + (p.badge ? '<span class="badge badge--cream">' + esc(p.badge) + '</span>' : '') + '</div>' +
        '<div class="product__info stack-md">' +
          '<h1 class="h1">' + esc(p.name) + '</h1>' +
          (p.price != null ? '<p class="product__price">' + money(p.price) + '</p>' : '<p class="product__price muted">Precio por cotización</p>') +
          '<p class="lead">' + esc(p.description) + '</p>' + buy +
        '</div>' +
      '</div>';
    var q = 1, qv = detail.querySelector('[data-qty-value]');
    detail.querySelectorAll('[data-step]').forEach(function (b) {
      b.addEventListener('click', function () { q = Math.max(1, q + +b.getAttribute('data-step')); qv.textContent = q; });
    });
    var buyBtn = detail.querySelector('[data-buy]');
    if (buyBtn) buyBtn.addEventListener('click', function () {
      var v = detail.querySelector('input[name="variante"]:checked');
      addToCart(p.handle, v ? v.value : '', q);
    });
    var related = document.querySelector('[data-related]');
    if (related) renderGrid(related, B.products.filter(function (x) { return x.handle !== p.handle; }).slice(0, 3));
  }

  // ---------- Formularios → WhatsApp ----------
  var prefill = new URLSearchParams(location.search).get('producto');
  document.querySelectorAll('[data-wa-form]').forEach(function (form) {
    var intro = form.getAttribute('data-wa-intro') || 'Hola Miga & Azúcar.';
    var msg = form.querySelector('textarea');
    if (prefill && msg && !msg.value) msg.value = 'Me interesa cotizar: ' + prefill + '. ';
    var email = form.querySelector('input[type="email"]');
    var err = email && document.getElementById(email.getAttribute('aria-describedby'));
    function checkEmail() {
      var ok = email.value.trim() !== '' && email.checkValidity();
      email.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (err) err.hidden = ok;
      return ok;
    }
    if (email) email.addEventListener('blur', function () { if (email.value) checkEmail(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (email && !checkEmail()) { email.focus(); return; }
      var d = new FormData(form), lines = [intro];
      if (d.get('nombre')) lines.push('Nombre: ' + d.get('nombre'));
      if (d.get('telefono')) lines.push('Teléfono: ' + d.get('telefono'));
      if (d.get('correo')) lines.push('Correo: ' + d.get('correo'));
      if (d.get('mensaje')) lines.push('', d.get('mensaje'));
      showWhatsApp(lines.join('\n'), form.querySelector('[type="submit"]'));
    });
  });
})();
