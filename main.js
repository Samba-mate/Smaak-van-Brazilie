/* Smaak van Brazilië – gedeelde scripts */
(function(){
  const S = window.SITE || {}, P = window.PRODUCTEN || [], C = window.CATEGORIEEN || [];
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

  /* ---- nav ---- */
  const burger = $(".burger"), menu = $(".menu");
  if (burger && menu) burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  const here = location.pathname.split("/").pop() || "index.html";
  $$(".menu a, footer a").forEach(a => { if ((a.getAttribute("href")||"").split("#")[0] === here) a.setAttribute("aria-current","page"); });

  /* ---- mededeling ---- */
  const notice = $(".notice");
  if (notice) { if (S.mededeling) { notice.textContent = S.mededeling; notice.hidden = false; } else notice.hidden = true; }

  /* ---- site-gegevens invullen: data-site="telefoon" ---- */
  $$("[data-site]").forEach(el => {
    const k = el.dataset.site; let v = S[k];
    if (k.includes(".")) v = k.split(".").reduce((o,p)=>o&&o[p], S);
    if (v != null) el.textContent = v;
  });
  $$("[data-href]").forEach(el => {
    const t = el.dataset.href;
    if (t === "whatsapp") el.href = "https://wa.me/" + (S.whatsapp||"");
    if (t === "email") el.href = "mailto:" + (S.email||"");
    if (t === "tel") el.href = "tel:" + (S.telefoon||"").replace(/\s/g,"");
    if (t === "instagram") el.href = "https://instagram.com/" + (S.instagram||"");
  });

  /* ---- productkaart ---- */
  function card(p){
    const cat = C.find(c => c.id === p.cat) || {};
    const badges = [];
    badges.push(p.beschikbaar ? '<span class="badge badge-ok">Nu bestelbaar</span>' : '<span class="badge badge-uit">Tijdelijk niet</span>');
    if (p.seizoen) badges.push('<span class="badge badge-seizoen">'+esc(p.seizoen)+'</span>');
    if (p.verzendbaar) badges.push('<span class="badge badge-post">Verzending</span>');
    if (p.populair) badges.push('<span class="badge badge-pop">Favoriet</span>');
    const ph = p.foto ? '<img src="'+esc(p.foto)+'" alt="'+esc(p.naam)+'" loading="lazy">' : '<span class="noimg">'+esc(cat.pt||"")+'</span>';
    return '<article class="card'+(p.beschikbaar?"":" uit")+'" id="p-'+esc(p.id)+'">'+
      '<div class="ph">'+ph+'</div>'+
      '<div class="body"><div class="badges">'+badges.join("")+'</div>'+
      '<h3>'+esc(p.naam)+'</h3><div class="pt">'+esc(p.pt||"")+'</div>'+
      '<p class="desc">'+esc(p.omschrijving)+'</p>'+
      '<div class="meta"><span class="price">'+esc(p.prijs)+'</span><span class="unit">'+esc(p.eenheid||"")+'</span></div>'+
      '</div></article>';
  }
  window.renderCard = card;

  /* ---- assortiment per categorie ---- */
  const ass = $("#assortiment");
  if (ass) {
    ass.innerHTML = C.map(c => {
      const items = P.filter(p => p.cat === c.id);
      if (!items.length) return "";
      return '<section id="'+esc(c.id)+'"><div class="cat-head"><h2>'+esc(c.naam)+'</h2><span class="script">'+esc(c.pt)+'</span><p>'+esc(c.intro)+'</p></div>'+
        '<div class="cards">'+items.map(card).join("")+'</div></section>';
    }).join("");
  }

  /* ---- "nu bestelbaar" strip op de homepage ---- */
  const now = $("#nu-bestelbaar");
  if (now) {
    const items = P.filter(p => p.beschikbaar && p.foto).sort((a,b)=>(b.populair?1:0)-(a.populair?1:0)).slice(0,4);
    now.innerHTML = items.map(card).join("");
  }
  const uitlijst = $("#tijdelijk-niet");
  if (uitlijst) {
    const items = P.filter(p => !p.beschikbaar);
    uitlijst.innerHTML = items.length ? items.map(p => '<li>'+esc(p.naam)+(p.seizoen?' <small>(seizoen: '+esc(p.seizoen)+')</small>':'')+'</li>').join("") : '<li>Alles is op dit moment bestelbaar.</li>';
  }

  /* ---- filter op taartenpagina / assortiment ---- */
  $$("[data-filter]").forEach(btn => btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    $$("[data-filter]").forEach(b => b.classList.toggle("on", b === btn));
    $$("#assortiment > section").forEach(sec => sec.hidden = (f !== "alle" && sec.id !== f));
  }));

  /* ---- bestelformulier: keuzelijst + berichttekst ---- */
  const form = $("form.order");
  if (form) {
    const sel = $("#product", form);
    if (sel) {
      sel.innerHTML = '<option value="">Kies een product (of beschrijf het hieronder)</option>' +
        C.map(c => '<optgroup label="'+esc(c.naam)+'">' + P.filter(p=>p.cat===c.id).map(p =>
          '<option value="'+esc(p.naam)+'"'+(p.beschikbaar?"":" disabled")+'>'+esc(p.naam)+(p.beschikbaar?"":" (tijdelijk niet)")+'</option>').join("") + '</optgroup>').join("");
    }
    const out = $("#bericht"), wa = $("#stuur-whatsapp"), ml = $("#stuur-mail"), cp = $("#kopieer");
    const compose = () => {
      const d = Object.fromEntries(new FormData(form).entries());
      const lines = [
        "Hoi Aina, ik wil graag bestellen bij Smaak van Brazilië.",
        d.product ? "Product: " + d.product : null,
        d.aantal ? "Aantal: " + d.aantal : null,
        d.datum ? "Gewenste datum: " + d.datum : null,
        d.levering ? "Afhalen of verzenden: " + d.levering : null,
        d.wensen ? "Wensen: " + d.wensen : null,
        d.naam ? "Naam: " + d.naam : null,
        d.telefoon ? "Telefoon: " + d.telefoon : null
      ].filter(Boolean);
      return lines.join("\n");
    };
    const update = () => {
      const t = compose();
      if (out) out.textContent = t;
      if (wa) wa.href = "https://wa.me/" + (S.whatsapp||"") + "?text=" + encodeURIComponent(t);
      if (ml) ml.href = "mailto:" + (S.email||"") + "?subject=" + encodeURIComponent("Bestelling Smaak van Brazilië") + "&body=" + encodeURIComponent(t);
    };
    form.addEventListener("input", update);
    form.addEventListener("submit", e => { e.preventDefault(); update(); });
    update();
    if (cp) cp.addEventListener("click", () => copyText(compose(), cp));
  }

  /* ---- kopieerknoppen ---- */
  function copyText(text, btn){
    const done = () => { const o = btn.textContent; btn.textContent = "Gekopieerd"; setTimeout(()=>btn.textContent=o, 1600); };
    const fallback = () => {
      const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch(e) {} document.body.removeChild(ta);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done).catch(fallback); else fallback();
  }
  window.copyText = copyText;
  $$("[data-copy]").forEach(b => b.addEventListener("click", () => {
    const k = b.dataset.copy; copyText(S[k] || k, b);
  }));

  /* ---- jaartal ---- */
  $$("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
})();

/* ---- Hero slider ---- */
(function(){
  const root = document.querySelector(".slider"); if (!root) return;
  const slides = Array.from(root.querySelectorAll(".slide")), dots = root.querySelector(".slider-dots");
  const DUR = 6000; let i = 0, timer = null, paused = false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.style.setProperty("--dur", DUR + "ms");
  slides.forEach((s, n) => {
    const b = document.createElement("button"); b.type = "button"; b.setAttribute("role","tab"); b.setAttribute("aria-label", "Foto " + (n+1) + " van " + slides.length);
    b.addEventListener("click", () => { go(n); restart(); }); dots.appendChild(b);
  });
  const dotEls = Array.from(dots.children);
  function go(n){
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
    dotEls.forEach((d, k) => { d.setAttribute("aria-selected", k === i ? "true" : "false"); if (k === i) { d.style.animation = "none"; void d.offsetWidth; d.style.animation = ""; } });
  }
  function restart(){ clearInterval(timer); if (!reduce && !paused) timer = setInterval(() => go(i+1), DUR); }
  root.querySelector(".prev").addEventListener("click", () => { go(i-1); restart(); });
  root.querySelector(".next").addEventListener("click", () => { go(i+1); restart(); });
  root.addEventListener("mouseenter", () => { paused = true; root.classList.add("paused"); clearInterval(timer); });
  root.addEventListener("mouseleave", () => { paused = false; root.classList.remove("paused"); restart(); });
  root.addEventListener("keydown", e => { if (e.key === "ArrowLeft") { go(i-1); restart(); } if (e.key === "ArrowRight") { go(i+1); restart(); } });
  let x0 = null;
  root.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, {passive:true});
  root.addEventListener("touchend", e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) { go(dx < 0 ? i+1 : i-1); restart(); } x0 = null; });
  document.addEventListener("visibilitychange", () => document.hidden ? clearInterval(timer) : restart());
  go(0); restart();
})();

/* ---- Datum-check paneel in de hero ---- */
(function(){
  const f = document.getElementById("datum-check"); if (!f) return;
  const S = window.SITE || {}, a = document.getElementById("dc-send");
  const upd = () => {
    const d = Object.fromEntries(new FormData(f).entries());
    const t = ["Hoi Aina, is deze datum vrij?", d.type ? "Gelegenheid: " + d.type : null, d.datum ? "Datum: " + d.datum : null, d.aantal ? "Aantal personen: " + d.aantal : null, d.naam ? "Naam: " + d.naam : null, d.telefoon ? "Telefoon: " + d.telefoon : null].filter(Boolean).join("\n");
    a.href = "https://wa.me/" + (S.whatsapp || "") + "?text=" + encodeURIComponent(t);
  };
  f.addEventListener("input", upd); f.addEventListener("submit", e => e.preventDefault()); upd();
})();

/* ---- Gescheurde papierrand (Peixou) via clip-path ---- */
(function(){
  const els = document.querySelectorAll(".torn"); if (!els.length) return;
  function tornPath(seed){
    let r = seed; const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
    const pts = [], J = 1.1, step = 2.5; // jitter in %, stap in %
    for (let x = 0; x <= 100; x += step) pts.push(x.toFixed(1) + "% " + (rnd() * J).toFixed(2) + "%");
    for (let y = step; y <= 100; y += step) pts.push((100 - rnd() * J).toFixed(2) + "% " + y.toFixed(1) + "%");
    for (let x = 100 - step; x >= 0; x -= step) pts.push(x.toFixed(1) + "% " + (100 - rnd() * J).toFixed(2) + "%");
    for (let y = 100 - step; y > 0; y -= step) pts.push((rnd() * J).toFixed(2) + "% " + y.toFixed(1) + "%");
    return "polygon(" + pts.join(",") + ")";
  }
  els.forEach((el, i) => el.style.setProperty("--torn", tornPath(17 + i * 31)));
})();
