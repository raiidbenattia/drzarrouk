(self.webpackChunk = self.webpackChunk || []).push([
  ["661"],
  {
    1655: function (e, t, a) {
      "use strict";
      var n = a(3949),
        i = a(5134);
      let o = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
      n.define(
        "navbar",
        (e.exports = function (e, t) {
          var a,
            d,
            c,
            l,
            s = {},
            r = e.tram,
            f = e(window),
            u = e(document),
            p = t.debounce,
            E = n.env(),
            I = ".w-nav",
            T = "w--open",
            y = "w--nav-dropdown-open",
            m = "w--nav-dropdown-toggle-open",
            g = "w--nav-dropdown-list-open",
            O = "w--nav-link-open",
            b = i.triggers,
            L = e();
          function v() {
            n.resize.off(_);
          }
          function _() {
            d.each(V);
          }
          function R(a, n) {
            var i,
              d,
              s,
              r,
              p,
              E = e(n),
              T = e.data(n, I);
            (T ||
              (T = e.data(n, I, {
                open: !1,
                el: E,
                config: {},
                selectedIdx: -1,
              })),
              (T.menu = E.find(".w-nav-menu")),
              (T.links = T.menu.find(".w-nav-link")),
              (T.dropdowns = T.menu.find(".w-dropdown")),
              (T.dropdownToggle = T.menu.find(".w-dropdown-toggle")),
              (T.dropdownList = T.menu.find(".w-dropdown-list")),
              (T.button = E.find(".w-nav-button")),
              (T.container = E.find(".w-container")),
              (T.overlayContainerId = "w-nav-overlay-" + a),
              (T.outside =
                ((i = T).outside && u.off("click" + I, i.outside),
                function (t) {
                  var a = e(t.target);
                  (l && a.closest(".w-editor-bem-EditorOverlay").length) ||
                    F(i, a);
                })));
            var y = E.find(".w-nav-brand");
            (y &&
              "/" === y.attr("href") &&
              null == y.attr("aria-label") &&
              y.attr("aria-label", "home"),
              T.button.attr("style", "-webkit-user-select: text;"),
              null == T.button.attr("aria-label") &&
                T.button.attr("aria-label", "menu"),
              T.button.attr("role", "button"),
              T.button.attr("tabindex", "0"),
              T.button.attr("aria-controls", T.overlayContainerId),
              T.button.attr("aria-haspopup", "menu"),
              T.button.attr("aria-expanded", "false"),
              T.el.off(I),
              T.button.off(I),
              T.menu.off(I),
              h(T),
              c
                ? (S(T),
                  T.el.on(
                    "setting" + I,
                    ((d = T),
                    function (e, a) {
                      a = a || {};
                      var n = f.width();
                      (h(d),
                        !0 === a.open && U(d, !0),
                        !1 === a.open && D(d, !0),
                        d.open &&
                          t.defer(function () {
                            n !== f.width() && A(d);
                          }));
                    }),
                  ))
                : ((s = T).overlay ||
                    ((s.overlay = e(
                      '<div class="w-nav-overlay" data-wf-ignore />',
                    ).appendTo(s.el)),
                    s.overlay.attr("id", s.overlayContainerId),
                    (s.parent = s.menu.parent()),
                    D(s, !0)),
                  T.button.on("click" + I, C(T)),
                  T.menu.on("click" + I, "a", B(T)),
                  T.button.on(
                    "keydown" + I,
                    ((r = T),
                    function (e) {
                      switch (e.keyCode) {
                        case o.SPACE:
                        case o.ENTER:
                          return (
                            C(r)(),
                            e.preventDefault(),
                            e.stopPropagation()
                          );
                        case o.ESCAPE:
                          return (
                            D(r),
                            e.preventDefault(),
                            e.stopPropagation()
                          );
                        case o.ARROW_RIGHT:
                        case o.ARROW_DOWN:
                        case o.HOME:
                        case o.END:
                          if (!r.open)
                            return (e.preventDefault(), e.stopPropagation());
                          return (
                            e.keyCode === o.END
                              ? (r.selectedIdx = r.links.length - 1)
                              : (r.selectedIdx = 0),
                            M(r),
                            e.preventDefault(),
                            e.stopPropagation()
                          );
                      }
                    }),
                  ),
                  T.el.on(
                    "keydown" + I,
                    ((p = T),
                    function (e) {
                      if (p.open)
                        switch (
                          ((p.selectedIdx = p.links.index(
                            document.activeElement,
                          )),
                          e.keyCode)
                        ) {
                          case o.HOME:
                          case o.END:
                            return (
                              e.keyCode === o.END
                                ? (p.selectedIdx = p.links.length - 1)
                                : (p.selectedIdx = 0),
                              M(p),
                              e.preventDefault(),
                              e.stopPropagation()
                            );
                          case o.ESCAPE:
                            return (
                              D(p),
                              p.button.focus(),
                              e.preventDefault(),
                              e.stopPropagation()
                            );
                          case o.ARROW_LEFT:
                          case o.ARROW_UP:
                            return (
                              (p.selectedIdx = Math.max(-1, p.selectedIdx - 1)),
                              M(p),
                              e.preventDefault(),
                              e.stopPropagation()
                            );
                          case o.ARROW_RIGHT:
                          case o.ARROW_DOWN:
                            return (
                              (p.selectedIdx = Math.min(
                                p.links.length - 1,
                                p.selectedIdx + 1,
                              )),
                              M(p),
                              e.preventDefault(),
                              e.stopPropagation()
                            );
                        }
                    }),
                  )),
              V(a, n));
          }
          function N(t, a) {
            var n = e.data(a, I);
            n && (S(n), e.removeData(a, I));
          }
          function S(e) {
            e.overlay && (D(e, !0), e.overlay.remove(), (e.overlay = null));
          }
          function h(e) {
            var a = {},
              n = e.config || {},
              i = (a.animation = e.el.attr("data-animation") || "default");
            ((a.animOver = /^over/.test(i)),
              (a.animDirect = /left$/.test(i) ? -1 : 1),
              n.animation !== i && e.open && t.defer(A, e),
              (a.easing = e.el.attr("data-easing") || "ease"),
              (a.easing2 = e.el.attr("data-easing2") || "ease"));
            var o = e.el.attr("data-duration");
            ((a.duration = null != o ? Number(o) : 400),
              (a.docHeight = e.el.attr("data-doc-height")),
              (e.config = a));
          }
          function M(e) {
            if (e.links[e.selectedIdx]) {
              var t = e.links[e.selectedIdx];
              (t.focus(), B(t));
            }
          }
          function A(e) {
            e.open && (D(e, !0), U(e, !0));
          }
          function C(e) {
            return p(function () {
              e.open ? D(e) : U(e);
            });
          }
          function B(t) {
            return function (a) {
              var i = e(this).attr("href");
              if (!n.validClick(a.currentTarget))
                return void a.preventDefault();
              i && 0 === i.indexOf("#") && t.open && D(t);
            };
          }
          ((s.ready =
            s.design =
            s.preview =
              function () {
                ((c = E && n.env("design")),
                  (l = n.env("editor")),
                  (a = e(document.body)),
                  (d = u.find(I)).length && (d.each(R), v(), n.resize.on(_)));
              }),
            (s.destroy = function () {
              ((L = e()), v(), d && d.length && d.each(N));
            }));
          var F = p(function (e, t) {
            if (e.open) {
              var a = t.closest(".w-nav-menu");
              e.menu.is(a) || D(e);
            }
          });
          function V(t, a) {
            var n = e.data(a, I),
              i = (n.collapsed = "none" !== n.button.css("display"));
            if ((!n.open || i || c || D(n, !0), n.container.length)) {
              var o,
                d =
                  ("none" === (o = n.container.css(k)) && (o = ""),
                  function (t, a) {
                    ((a = e(a)).css(k, ""), "none" === a.css(k) && a.css(k, o));
                  });
              (n.links.each(d), n.dropdowns.each(d));
            }
            n.open && P(n);
          }
          var k = "max-width";
          function x(e, t) {
            t.setAttribute("data-nav-menu-open", "");
          }
          function w(e, t) {
            t.removeAttribute("data-nav-menu-open");
          }
          function U(e, t) {
            if (!e.open) {
              ((e.open = !0),
                e.menu.each(x),
                e.links.addClass(O),
                e.dropdowns.addClass(y),
                e.dropdownToggle.addClass(m),
                e.dropdownList.addClass(g),
                e.button.addClass(T));
              var a = e.config;
              ("none" === a.animation ||
                !r.support.transform ||
                a.duration <= 0) &&
                (t = !0);
              var i = P(e),
                o = e.menu.outerHeight(!0),
                d = e.menu.outerWidth(!0),
                l = e.el.height(),
                s = e.el[0];
              if (
                (V(0, s),
                b.intro(0, s),
                n.redraw.up(),
                c || u.on("click" + I, e.outside),
                t)
              )
                return void p();
              var f = "transform " + a.duration + "ms " + a.easing;
              if (
                (e.overlay &&
                  ((L = e.menu.prev()), e.overlay.show().append(e.menu)),
                a.animOver)
              ) {
                (r(e.menu)
                  .add(f)
                  .set({ x: a.animDirect * d, height: i })
                  .start({ x: 0 })
                  .then(p),
                  e.overlay && e.overlay.width(d));
                return;
              }
              r(e.menu)
                .add(f)
                .set({ y: -(l + o) })
                .start({ y: 0 })
                .then(p);
            }
            function p() {
              e.button.attr("aria-expanded", "true");
            }
          }
          function P(e) {
            var t = e.config,
              n = t.docHeight ? u.height() : a.height();
            return (
              t.animOver
                ? e.menu.height(n)
                : "fixed" !== e.el.css("position") &&
                  (n -= e.el.outerHeight(!0)),
              e.overlay && e.overlay.height(n),
              n
            );
          }
          function D(e, t) {
            if (e.open) {
              ((e.open = !1), e.button.removeClass(T));
              var a = e.config;
              if (
                (("none" === a.animation ||
                  !r.support.transform ||
                  a.duration <= 0) &&
                  (t = !0),
                b.outro(0, e.el[0]),
                u.off("click" + I, e.outside),
                t)
              ) {
                (r(e.menu).stop(), c());
                return;
              }
              var n = "transform " + a.duration + "ms " + a.easing2,
                i = e.menu.outerHeight(!0),
                o = e.menu.outerWidth(!0),
                d = e.el.height();
              if (a.animOver)
                return void r(e.menu)
                  .add(n)
                  .start({ x: o * a.animDirect })
                  .then(c);
              r(e.menu)
                .add(n)
                .start({ y: -(d + i) })
                .then(c);
            }
            function c() {
              (e.menu.height(""),
                r(e.menu).set({ x: 0, y: 0 }),
                e.menu.each(w),
                e.links.removeClass(O),
                e.dropdowns.removeClass(y),
                e.dropdownToggle.removeClass(m),
                e.dropdownList.removeClass(g),
                e.overlay &&
                  e.overlay.children().length &&
                  (L.length
                    ? e.menu.insertAfter(L)
                    : e.menu.prependTo(e.parent),
                  e.overlay.attr("style", "").hide()),
                e.el.triggerHandler("w-close"),
                e.button.attr("aria-expanded", "false"));
            }
          }
          return s;
        }),
      );
    },
  },
]);
