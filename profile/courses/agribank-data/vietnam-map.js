// <vn-map> — Vietnam rendered from real Natural Earth geometry (world-atlas 110m)
// projected with d3.geoMercator().fitSize, so every province marker (lat/lon) lands
// at its true geographic position.
(function () {
  const ATLAS = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";
  let geoPromise = null;

  function libsReady() {
    return new Promise((res) => {
      const check = () => (window.d3 && window.topojson ? res() : setTimeout(check, 40));
      check();
    });
  }

  function loadGeo() {
    if (!geoPromise) {
      geoPromise = libsReady()
        .then(() => fetch(ATLAS))
        .then((r) => r.json())
        .then((topo) => {
          const feats = topojson.feature(topo, topo.objects.countries).features;
          return {
            vn: feats.find((f) => f.properties && f.properties.name === "Vietnam"),
            others: feats.filter((f) => {
              const b = d3.geoBounds(f);
              return (
                f.properties.name !== "Vietnam" &&
                b[0][0] < 116 && b[1][0] > 96 && b[0][1] < 28 && b[1][1] > 2
              );
            })
          };
        });
    }
    return geoPromise;
  }

  const parse = (el, attr, fallback) => {
    try { return JSON.parse(el.getAttribute(attr) || ""); } catch (e) { return fallback; }
  };

  class VnMap extends HTMLElement {
    connectedCallback() {
      this.style.display = "block";
      this.style.position = "relative";
      this.style.width = "100%";
      this.style.height = "100%";
      if (this._done) return;
      this._done = true;
      loadGeo().then((geo) => this.render(geo)).catch(() => {});
    }

    render(geo) {
      if (!geo || !geo.vn) return;
      this._geo = geo;
      this.style.overflow = "hidden";
      const paint = () => {
        const r = this.getBoundingClientRect();
        const W = Math.max(1, Math.round(r.width)), H = Math.max(1, Math.round(r.height));
        if (W < 60 || H < 60) return;
        if (this._w === W && this._h === H) return;
        this._w = W; this._h = H;
        this.innerHTML = "";

        const padY = H * 0.03, padX = W * 0.02;
        const proj = d3.geoMercator().fitExtent([[padX, padY], [W - padX, H - padY]], geo.vn);
        const path = d3.geoPath(proj);
        const locs = parse(this, "locations", []);
        const pct = (ll) => { const p = proj(ll); return [(p[0] / W) * 100, (p[1] / H) * 100]; };

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 " + W + " " + H);
        svg.setAttribute("preserveAspectRatio", "none");
        svg.setAttribute("aria-label", "Bản đồ Việt Nam với các địa điểm đào tạo");
        Object.assign(svg.style, { position: "absolute", inset: "0", width: "100%", height: "100%", overflow: "hidden" });

        svg.innerHTML =
          '<defs><linearGradient id="vnfill2" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#d4566d" stop-opacity=".5"/>' +
          '<stop offset="55%" stop-color="#8B1E2D" stop-opacity=".62"/>' +
          '<stop offset="100%" stop-color="#4d0e1a" stop-opacity=".78"/></linearGradient></defs>';

        const add = (tag, attrs, style) => {
          const n = document.createElementNS(svgNS, tag);
          for (const k in attrs) n.setAttribute(k, attrs[k]);
          if (style) Object.assign(n.style, style);
          svg.appendChild(n);
          return n;
        };

        add("path", {
          d: path(geo.vn), fill: "url(#vnfill2)", stroke: "#f0b6c0",
          "stroke-width": 1.6, "stroke-linejoin": "round",
          "stroke-dasharray": 6000, "stroke-dashoffset": 6000
        }, { animation: "drawPath 2.1s ease .25s forwards", filter: "drop-shadow(0 0 10px rgba(240,182,192,.5))" });

        const ordered = locs.slice().sort((a, b) => b.lat - a.lat);
        const line = ordered.map((l) => proj([l.lon, l.lat]).join(",")).join(" ");
        add("polyline", { points: line, fill: "none", stroke: "#D9B46D", "stroke-width": 1.4, "stroke-opacity": ".55", "stroke-dasharray": "9 12" },
          { animation: "dashFlow 6s linear infinite" });
        add("polyline", { points: line, fill: "none", stroke: "#7fd7e8", "stroke-width": 1, "stroke-opacity": ".32", "stroke-dasharray": "3 16" },
          { animation: "dashFlow 9s linear infinite" });

        this.appendChild(svg);

        const pts = {};
        locs.forEach((l) => { pts[l.city] = pct([l.lon, l.lat]); });
        window.__vnMapPoints = pts;
        window.dispatchEvent(new CustomEvent("vn-map-ready", { detail: pts }));

        locs.forEach((l, i) => {
          const [x, y] = pct([l.lon, l.lat]);
          const flip = x > 55;
          const m = document.createElement("div");
          m.setAttribute("data-city", l.city);
          Object.assign(m.style, {
            position: "absolute", left: x + "%", top: y + "%",
            transform: "translate(-50%,-50%)", zIndex: 7,
            animation: "fadeIn .5s ease " + (0.9 + i * 0.11) + "s both"
          });
          var dot = Math.min(9, Math.max(5, W * 0.019)), ring = dot * 3.4, fs = Math.min(14, Math.max(9.5, W * 0.03));
          m.dataset.flip = flip ? "1" : "0";
          m.dataset.off = (dot * 1.6).toFixed(1);
          m.innerHTML =
            '<div style="position:absolute;left:50%;top:50%;width:' + ring + 'px;height:' + ring + 'px;border-radius:50%;border:1px solid rgba(217,180,109,.75);' +
            'animation:pulseRing 3.4s ease-out ' + (i * 0.42).toFixed(2) + 's infinite"></div>' +
            '<div style="width:' + dot + 'px;height:' + dot + 'px;border-radius:50%;background:#D9B46D;box-shadow:0 0 ' + (dot * 1.3) + 'px rgba(217,180,109,.95)"></div>' +
            '<div class="vn-label" style="position:absolute;top:-' + (fs * 0.75) + 'px;' + (flip ? "right" : "left") + ':' + (dot * 1.6) + 'px;text-align:' + (flip ? "right" : "left") + ';' +
            'white-space:nowrap;font-size:' + fs + 'px;font-weight:500;letter-spacing:.03em;color:#fff;' +
            'background:rgba(20,5,7,.72);padding:1px 5px;border-radius:4px;border:1px solid rgba(217,180,109,.35)">' + l.city + '</div>';
          this.appendChild(m);
        });

        // keep city labels from overlapping each other
        requestAnimationFrame(() => {
          const labels = Array.from(this.querySelectorAll(".vn-label"));
          const host = this.getBoundingClientRect();
          const placed = [];
          labels
            .map((el) => ({ el, r: el.getBoundingClientRect() }))
            .sort((a, b) => a.r.top - b.r.top)
            .forEach(({ el, r }) => {
              let shift = 0;
              for (let guard = 0; guard < 24; guard++) {
                const top = r.top + shift, bottom = r.bottom + shift;
                const hit = placed.find((p) =>
                  bottom > p.top - 2 && top < p.bottom + 2 && r.right > p.left - 4 && r.left < p.right + 4);
                if (!hit) break;
                shift += (hit.bottom + 3) - top;
              }
              if (shift) el.style.transform = "translateY(" + Math.round(shift) + "px)";
              placed.push({ top: r.top + shift, bottom: r.bottom + shift, left: r.left, right: r.right });
            });
        });
      };
      paint();
      if (window.ResizeObserver) {
        this._ro = new ResizeObserver(() => paint());
        this._ro.observe(this);
      }
    }
  }

  // Keep city labels readable: flip / nudge / hide any label that would land on a
  // floating photo card or on another label. Called by the host after cards render.
  // `root` gioi han pham vi vao DUNG mot ban do. Truoc day ham nay quet
  // document.querySelectorAll("[data-city]") — tuc no sua ca nhan chu cua ban do
  // KIA. Tren dien thoai, vong lap chang cua desktop van chay va cu 5 giay lai bo
  // tri lai nhan cua ban do mobile, xoa sach viec an nhan ma the anh vua quyet dinh.
  window.vnLayoutLabels = function (cardEls, root) {
    var cards = (cardEls || []).map(function (el) { return el.getBoundingClientRect(); });
    var placed = [];
    var hit = function (r) {
      var all = cards.concat(placed);
      for (var i = 0; i < all.length; i++) {
        var o = all[i];
        if (r.left < o.right - 1 && r.right > o.left + 1 && r.top < o.bottom - 1 && r.bottom > o.top + 1) return true;
      }
      return false;
    };
    var markers = [].slice.call((root || document).querySelectorAll("[data-city]"))
      .filter(function (m) { var l = m.querySelector(".vn-label"); return l && l.style.display !== "none"; })
      .sort(function (a, b) { return a.getBoundingClientRect().top - b.getBoundingClientRect().top; });

    markers.forEach(function (m) {
      var el = m.querySelector(".vn-label");
      var off = m.dataset.off || "10";
      var flip = m.dataset.flip === "1";
      var baseTop = el.style.top;
      var tries = [
        { flip: flip, dy: 0 }, { flip: !flip, dy: 0 },
        { flip: flip, dy: -15 }, { flip: !flip, dy: -15 },
        { flip: flip, dy: 15 }, { flip: !flip, dy: 15 },
        { flip: flip, dy: -30 }, { flip: !flip, dy: 30 }
      ];
      for (var i = 0; i < tries.length; i++) {
        var t = tries[i];
        el.style.display = "block";
        el.style.left = t.flip ? "auto" : off + "px";
        el.style.right = t.flip ? off + "px" : "auto";
        el.style.textAlign = t.flip ? "right" : "left";
        el.style.top = "calc(" + baseTop + " + " + t.dy + "px)";
        var r = el.getBoundingClientRect();
        if (!hit(r)) { placed.push(r); return; }
      }
      el.style.display = "none";
    });
  };

  if (!customElements.get("vn-map")) customElements.define("vn-map", VnMap);
})();
