/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Resources/assets/bundles/color-picker/jscolor.min.js":
/*!******************************************************************!*\
  !*** ./src/Resources/assets/bundles/color-picker/jscolor.min.js ***!
  \******************************************************************/
/***/ (() => {

"use strict";
/**
 * jscolor - JavaScript Color Picker
 *
 * @link    http://jscolor.com
 * @license For open source use: GPLv3
 *          For commercial use: JSColor Commercial License
 * @author  Jan Odvarko
 *
 * See usage examples at http://jscolor.com/examples/
 */

window.jscolor || (window.jscolor = function () {
  var e = {
    register: function register() {
      e.attachDOMReadyEvent(e.init), e.attachEvent(document, "mousedown", e.onDocumentMouseDown), e.attachEvent(document, "touchstart", e.onDocumentTouchStart), e.attachEvent(window, "resize", e.onWindowResize);
    },
    init: function init() {
      e.jscolor.lookupClass && e.jscolor.installByClassName(e.jscolor.lookupClass);
    },
    tryInstallOnElements: function tryInstallOnElements(t, n) {
      var r = new RegExp("(^|\\s)(" + n + ")(\\s*(\\{[^}]*\\})|\\s|$)", "i");
      for (var i = 0; i < t.length; i += 1) {
        if (t[i].type !== undefined && t[i].type.toLowerCase() == "color" && e.isColorAttrSupported) continue;
        var s;
        if (!t[i].jscolor && t[i].className && (s = t[i].className.match(r))) {
          var o = t[i],
            u = null,
            a = e.getDataAttr(o, "jscolor");
          a !== null ? u = a : s[4] && (u = s[4]);
          var f = {};
          if (u) try {
            f = new Function("return (" + u + ")")();
          } catch (l) {
            e.warn("Error parsing jscolor options: " + l + ":\n" + u);
          }
          o.jscolor = new e.jscolor(o, f);
        }
      }
    },
    isColorAttrSupported: function () {
      var e = document.createElement("input");
      if (e.setAttribute) {
        e.setAttribute("type", "color");
        if (e.type.toLowerCase() == "color") return !0;
      }
      return !1;
    }(),
    isCanvasSupported: function () {
      var e = document.createElement("canvas");
      return !!e.getContext && !!e.getContext("2d");
    }(),
    fetchElement: function fetchElement(e) {
      return typeof e == "string" ? document.getElementById(e) : e;
    },
    isElementType: function isElementType(e, t) {
      return e.nodeName.toLowerCase() === t.toLowerCase();
    },
    getDataAttr: function getDataAttr(e, t) {
      var n = "data-" + t,
        r = e.getAttribute(n);
      return r !== null ? r : null;
    },
    attachEvent: function attachEvent(e, t, n) {
      e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n);
    },
    detachEvent: function detachEvent(e, t, n) {
      e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n);
    },
    _attachedGroupEvents: {},
    attachGroupEvent: function attachGroupEvent(t, n, r, i) {
      e._attachedGroupEvents.hasOwnProperty(t) || (e._attachedGroupEvents[t] = []), e._attachedGroupEvents[t].push([n, r, i]), e.attachEvent(n, r, i);
    },
    detachGroupEvents: function detachGroupEvents(t) {
      if (e._attachedGroupEvents.hasOwnProperty(t)) {
        for (var n = 0; n < e._attachedGroupEvents[t].length; n += 1) {
          var r = e._attachedGroupEvents[t][n];
          e.detachEvent(r[0], r[1], r[2]);
        }
        delete e._attachedGroupEvents[t];
      }
    },
    attachDOMReadyEvent: function attachDOMReadyEvent(e) {
      var t = !1,
        n = function n() {
          t || (t = !0, e());
        };
      if (document.readyState === "complete") {
        setTimeout(n, 1);
        return;
      }
      if (document.addEventListener) document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", n, !1);else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", function () {
          document.readyState === "complete" && (document.detachEvent("onreadystatechange", arguments.callee), n());
        }), window.attachEvent("onload", n);
        if (document.documentElement.doScroll && window == window.top) {
          var r = function r() {
            if (!document.body) return;
            try {
              document.documentElement.doScroll("left"), n();
            } catch (e) {
              setTimeout(r, 1);
            }
          };
          r();
        }
      }
    },
    warn: function warn(e) {
      window.console && window.console.warn && window.console.warn(e);
    },
    preventDefault: function preventDefault(e) {
      e.preventDefault && e.preventDefault(), e.returnValue = !1;
    },
    captureTarget: function captureTarget(t) {
      t.setCapture && (e._capturedTarget = t, e._capturedTarget.setCapture());
    },
    releaseTarget: function releaseTarget() {
      e._capturedTarget && (e._capturedTarget.releaseCapture(), e._capturedTarget = null);
    },
    fireEvent: function fireEvent(e, t) {
      if (!e) return;
      if (document.createEvent) {
        var n = document.createEvent("HTMLEvents");
        n.initEvent(t, !0, !0), e.dispatchEvent(n);
      } else if (document.createEventObject) {
        var n = document.createEventObject();
        e.fireEvent("on" + t, n);
      } else e["on" + t] && e["on" + t]();
    },
    classNameToList: function classNameToList(e) {
      return e.replace(/^\s+|\s+$/g, "").split(/\s+/);
    },
    hasClass: function hasClass(e, t) {
      return t ? -1 != (" " + e.className.replace(/\s+/g, " ") + " ").indexOf(" " + t + " ") : !1;
    },
    setClass: function setClass(t, n) {
      var r = e.classNameToList(n);
      for (var i = 0; i < r.length; i += 1) e.hasClass(t, r[i]) || (t.className += (t.className ? " " : "") + r[i]);
    },
    unsetClass: function unsetClass(t, n) {
      var r = e.classNameToList(n);
      for (var i = 0; i < r.length; i += 1) {
        var s = new RegExp("^\\s*" + r[i] + "\\s*|" + "\\s*" + r[i] + "\\s*$|" + "\\s+" + r[i] + "(\\s+)", "g");
        t.className = t.className.replace(s, "$1");
      }
    },
    getStyle: function getStyle(e) {
      return window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
    },
    setStyle: function () {
      var e = document.createElement("div"),
        t = function t(_t) {
          for (var n = 0; n < _t.length; n += 1) if (_t[n] in e.style) return _t[n];
        },
        n = {
          borderRadius: t(["borderRadius", "MozBorderRadius", "webkitBorderRadius"]),
          boxShadow: t(["boxShadow", "MozBoxShadow", "webkitBoxShadow"])
        };
      return function (e, t, r) {
        switch (t.toLowerCase()) {
          case "opacity":
            var i = Math.round(parseFloat(r) * 100);
            e.style.opacity = r, e.style.filter = "alpha(opacity=" + i + ")";
            break;
          default:
            e.style[n[t]] = r;
        }
      };
    }(),
    setBorderRadius: function setBorderRadius(t, n) {
      e.setStyle(t, "borderRadius", n || "0");
    },
    setBoxShadow: function setBoxShadow(t, n) {
      e.setStyle(t, "boxShadow", n || "none");
    },
    getElementPos: function getElementPos(t, n) {
      var r = 0,
        i = 0,
        s = t.getBoundingClientRect();
      r = s.left, i = s.top;
      if (!n) {
        var o = e.getViewPos();
        r += o[0], i += o[1];
      }
      return [r, i];
    },
    getElementSize: function getElementSize(e) {
      return [e.offsetWidth, e.offsetHeight];
    },
    getAbsPointerPos: function getAbsPointerPos(e) {
      e || (e = window.event);
      var t = 0,
        n = 0;
      return typeof e.changedTouches != "undefined" && e.changedTouches.length ? (t = e.changedTouches[0].clientX, n = e.changedTouches[0].clientY) : typeof e.clientX == "number" && (t = e.clientX, n = e.clientY), {
        x: t,
        y: n
      };
    },
    getRelPointerPos: function getRelPointerPos(e) {
      e || (e = window.event);
      var t = e.target || e.srcElement,
        n = t.getBoundingClientRect(),
        r = 0,
        i = 0,
        s = 0,
        o = 0;
      return typeof e.changedTouches != "undefined" && e.changedTouches.length ? (s = e.changedTouches[0].clientX, o = e.changedTouches[0].clientY) : typeof e.clientX == "number" && (s = e.clientX, o = e.clientY), r = s - n.left, i = o - n.top, {
        x: r,
        y: i
      };
    },
    getViewPos: function getViewPos() {
      var e = document.documentElement;
      return [(window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0), (window.pageYOffset || e.scrollTop) - (e.clientTop || 0)];
    },
    getViewSize: function getViewSize() {
      var e = document.documentElement;
      return [window.innerWidth || e.clientWidth, window.innerHeight || e.clientHeight];
    },
    redrawPosition: function redrawPosition() {
      if (e.picker && e.picker.owner) {
        var t = e.picker.owner,
          n,
          r;
        t.fixed ? (n = e.getElementPos(t.targetElement, !0), r = [0, 0]) : (n = e.getElementPos(t.targetElement), r = e.getViewPos());
        var i = e.getElementSize(t.targetElement),
          s = e.getViewSize(),
          o = e.getPickerOuterDims(t),
          u,
          a,
          f;
        switch (t.position.toLowerCase()) {
          case "left":
            u = 1, a = 0, f = -1;
            break;
          case "right":
            u = 1, a = 0, f = 1;
            break;
          case "top":
            u = 0, a = 1, f = -1;
            break;
          default:
            u = 0, a = 1, f = 1;
        }
        var l = (i[a] + o[a]) / 2;
        if (!t.smartPosition) var c = [n[u], n[a] + i[a] - l + l * f];else var c = [-r[u] + n[u] + o[u] > s[u] ? -r[u] + n[u] + i[u] / 2 > s[u] / 2 && n[u] + i[u] - o[u] >= 0 ? n[u] + i[u] - o[u] : n[u] : n[u], -r[a] + n[a] + i[a] + o[a] - l + l * f > s[a] ? -r[a] + n[a] + i[a] / 2 > s[a] / 2 && n[a] + i[a] - l - l * f >= 0 ? n[a] + i[a] - l - l * f : n[a] + i[a] - l + l * f : n[a] + i[a] - l + l * f >= 0 ? n[a] + i[a] - l + l * f : n[a] + i[a] - l - l * f];
        var h = c[u],
          p = c[a],
          d = t.fixed ? "fixed" : "absolute",
          v = (c[0] + o[0] > n[0] || c[0] < n[0] + i[0]) && c[1] + o[1] < n[1] + i[1];
        e._drawPosition(t, h, p, d, v);
      }
    },
    _drawPosition: function _drawPosition(t, n, r, i, s) {
      var o = s ? 0 : t.shadowBlur;
      e.picker.wrap.style.position = i, e.picker.wrap.style.left = n + "px", e.picker.wrap.style.top = r + "px", e.setBoxShadow(e.picker.boxS, t.shadow ? new e.BoxShadow(0, o, t.shadowBlur, 0, t.shadowColor) : null);
    },
    getPickerDims: function getPickerDims(t) {
      var n = !!e.getSliderComponent(t),
        r = [2 * t.insetWidth + 2 * t.padding + t.width + (n ? 2 * t.insetWidth + e.getPadToSliderPadding(t) + t.sliderSize : 0), 2 * t.insetWidth + 2 * t.padding + t.height + (t.closable ? 2 * t.insetWidth + t.padding + t.buttonHeight : 0)];
      return r;
    },
    getPickerOuterDims: function getPickerOuterDims(t) {
      var n = e.getPickerDims(t);
      return [n[0] + 2 * t.borderWidth, n[1] + 2 * t.borderWidth];
    },
    getPadToSliderPadding: function getPadToSliderPadding(e) {
      return Math.max(e.padding, 1.5 * (2 * e.pointerBorderWidth + e.pointerThickness));
    },
    getPadYComponent: function getPadYComponent(e) {
      switch (e.mode.charAt(1).toLowerCase()) {
        case "v":
          return "v";
      }
      return "s";
    },
    getSliderComponent: function getSliderComponent(e) {
      if (e.mode.length > 2) switch (e.mode.charAt(2).toLowerCase()) {
        case "s":
          return "s";
        case "v":
          return "v";
      }
      return null;
    },
    onDocumentMouseDown: function onDocumentMouseDown(t) {
      t || (t = window.event);
      var n = t.target || t.srcElement;
      n._jscLinkedInstance ? n._jscLinkedInstance.showOnClick && n._jscLinkedInstance.show() : n._jscControlName ? e.onControlPointerStart(t, n, n._jscControlName, "mouse") : e.picker && e.picker.owner && e.picker.owner.hide();
    },
    onDocumentTouchStart: function onDocumentTouchStart(t) {
      t || (t = window.event);
      var n = t.target || t.srcElement;
      n._jscLinkedInstance ? n._jscLinkedInstance.showOnClick && n._jscLinkedInstance.show() : n._jscControlName ? e.onControlPointerStart(t, n, n._jscControlName, "touch") : e.picker && e.picker.owner && e.picker.owner.hide();
    },
    onWindowResize: function onWindowResize(t) {
      e.redrawPosition();
    },
    onParentScroll: function onParentScroll(t) {
      e.picker && e.picker.owner && e.picker.owner.hide();
    },
    _pointerMoveEvent: {
      mouse: "mousemove",
      touch: "touchmove"
    },
    _pointerEndEvent: {
      mouse: "mouseup",
      touch: "touchend"
    },
    _pointerOrigin: null,
    _capturedTarget: null,
    onControlPointerStart: function onControlPointerStart(t, n, r, i) {
      var s = n._jscInstance;
      e.preventDefault(t), e.captureTarget(n);
      var o = function o(s, _o) {
        e.attachGroupEvent("drag", s, e._pointerMoveEvent[i], e.onDocumentPointerMove(t, n, r, i, _o)), e.attachGroupEvent("drag", s, e._pointerEndEvent[i], e.onDocumentPointerEnd(t, n, r, i));
      };
      o(document, [0, 0]);
      if (window.parent && window.frameElement) {
        var u = window.frameElement.getBoundingClientRect(),
          a = [-u.left, -u.top];
        o(window.parent.window.document, a);
      }
      var f = e.getAbsPointerPos(t),
        l = e.getRelPointerPos(t);
      e._pointerOrigin = {
        x: f.x - l.x,
        y: f.y - l.y
      };
      switch (r) {
        case "pad":
          switch (e.getSliderComponent(s)) {
            case "s":
              s.hsv[1] === 0 && s.fromHSV(null, 100, null);
              break;
            case "v":
              s.hsv[2] === 0 && s.fromHSV(null, null, 100);
          }
          e.setPad(s, t, 0, 0);
          break;
        case "sld":
          e.setSld(s, t, 0);
      }
      e.dispatchFineChange(s);
    },
    onDocumentPointerMove: function onDocumentPointerMove(t, n, r, i, s) {
      return function (t) {
        var i = n._jscInstance;
        switch (r) {
          case "pad":
            t || (t = window.event), e.setPad(i, t, s[0], s[1]), e.dispatchFineChange(i);
            break;
          case "sld":
            t || (t = window.event), e.setSld(i, t, s[1]), e.dispatchFineChange(i);
        }
      };
    },
    onDocumentPointerEnd: function onDocumentPointerEnd(t, n, r, i) {
      return function (t) {
        var r = n._jscInstance;
        e.detachGroupEvents("drag"), e.releaseTarget(), e.dispatchChange(r);
      };
    },
    dispatchChange: function dispatchChange(t) {
      t.valueElement && e.isElementType(t.valueElement, "input") && e.fireEvent(t.valueElement, "change");
    },
    dispatchFineChange: function dispatchFineChange(e) {
      if (e.onFineChange) {
        var t;
        typeof e.onFineChange == "string" ? t = new Function(e.onFineChange) : t = e.onFineChange, t.call(e);
      }
    },
    setPad: function setPad(t, n, r, i) {
      var s = e.getAbsPointerPos(n),
        o = r + s.x - e._pointerOrigin.x - t.padding - t.insetWidth,
        u = i + s.y - e._pointerOrigin.y - t.padding - t.insetWidth,
        a = o * (360 / (t.width - 1)),
        f = 100 - u * (100 / (t.height - 1));
      switch (e.getPadYComponent(t)) {
        case "s":
          t.fromHSV(a, f, null, e.leaveSld);
          break;
        case "v":
          t.fromHSV(a, null, f, e.leaveSld);
      }
    },
    setSld: function setSld(t, n, r) {
      var i = e.getAbsPointerPos(n),
        s = r + i.y - e._pointerOrigin.y - t.padding - t.insetWidth,
        o = 100 - s * (100 / (t.height - 1));
      switch (e.getSliderComponent(t)) {
        case "s":
          t.fromHSV(null, o, null, e.leavePad);
          break;
        case "v":
          t.fromHSV(null, null, o, e.leavePad);
      }
    },
    _vmlNS: "jsc_vml_",
    _vmlCSS: "jsc_vml_css_",
    _vmlReady: !1,
    initVML: function initVML() {
      if (!e._vmlReady) {
        var t = document;
        t.namespaces[e._vmlNS] || t.namespaces.add(e._vmlNS, "urn:schemas-microsoft-com:vml");
        if (!t.styleSheets[e._vmlCSS]) {
          var n = ["shape", "shapetype", "group", "background", "path", "formulas", "handles", "fill", "stroke", "shadow", "textbox", "textpath", "imagedata", "line", "polyline", "curve", "rect", "roundrect", "oval", "arc", "image"],
            r = t.createStyleSheet();
          r.owningElement.id = e._vmlCSS;
          for (var i = 0; i < n.length; i += 1) r.addRule(e._vmlNS + "\\:" + n[i], "behavior:url(#default#VML);");
        }
        e._vmlReady = !0;
      }
    },
    createPalette: function createPalette() {
      var t = {
        elm: null,
        draw: null
      };
      if (e.isCanvasSupported) {
        var n = document.createElement("canvas"),
          r = n.getContext("2d"),
          i = function i(e, t, _i) {
            n.width = e, n.height = t, r.clearRect(0, 0, n.width, n.height);
            var s = r.createLinearGradient(0, 0, n.width, 0);
            s.addColorStop(0, "#F00"), s.addColorStop(1 / 6, "#FF0"), s.addColorStop(2 / 6, "#0F0"), s.addColorStop(.5, "#0FF"), s.addColorStop(4 / 6, "#00F"), s.addColorStop(5 / 6, "#F0F"), s.addColorStop(1, "#F00"), r.fillStyle = s, r.fillRect(0, 0, n.width, n.height);
            var o = r.createLinearGradient(0, 0, 0, n.height);
            switch (_i.toLowerCase()) {
              case "s":
                o.addColorStop(0, "rgba(255,255,255,0)"), o.addColorStop(1, "rgba(255,255,255,1)");
                break;
              case "v":
                o.addColorStop(0, "rgba(0,0,0,0)"), o.addColorStop(1, "rgba(0,0,0,1)");
            }
            r.fillStyle = o, r.fillRect(0, 0, n.width, n.height);
          };
        t.elm = n, t.draw = i;
      } else {
        e.initVML();
        var s = document.createElement("div");
        s.style.position = "relative", s.style.overflow = "hidden";
        var o = document.createElement(e._vmlNS + ":fill");
        o.type = "gradient", o.method = "linear", o.angle = "90", o.colors = "16.67% #F0F, 33.33% #00F, 50% #0FF, 66.67% #0F0, 83.33% #FF0";
        var u = document.createElement(e._vmlNS + ":rect");
        u.style.position = "absolute", u.style.left = "-1px", u.style.top = "-1px", u.stroked = !1, u.appendChild(o), s.appendChild(u);
        var a = document.createElement(e._vmlNS + ":fill");
        a.type = "gradient", a.method = "linear", a.angle = "180", a.opacity = "0";
        var f = document.createElement(e._vmlNS + ":rect");
        f.style.position = "absolute", f.style.left = "-1px", f.style.top = "-1px", f.stroked = !1, f.appendChild(a), s.appendChild(f);
        var i = function i(e, t, n) {
          s.style.width = e + "px", s.style.height = t + "px", u.style.width = f.style.width = e + 1 + "px", u.style.height = f.style.height = t + 1 + "px", o.color = "#F00", o.color2 = "#F00";
          switch (n.toLowerCase()) {
            case "s":
              a.color = a.color2 = "#FFF";
              break;
            case "v":
              a.color = a.color2 = "#000";
          }
        };
        t.elm = s, t.draw = i;
      }
      return t;
    },
    createSliderGradient: function createSliderGradient() {
      var t = {
        elm: null,
        draw: null
      };
      if (e.isCanvasSupported) {
        var n = document.createElement("canvas"),
          r = n.getContext("2d"),
          i = function i(e, t, _i2, s) {
            n.width = e, n.height = t, r.clearRect(0, 0, n.width, n.height);
            var o = r.createLinearGradient(0, 0, 0, n.height);
            o.addColorStop(0, _i2), o.addColorStop(1, s), r.fillStyle = o, r.fillRect(0, 0, n.width, n.height);
          };
        t.elm = n, t.draw = i;
      } else {
        e.initVML();
        var s = document.createElement("div");
        s.style.position = "relative", s.style.overflow = "hidden";
        var o = document.createElement(e._vmlNS + ":fill");
        o.type = "gradient", o.method = "linear", o.angle = "180";
        var u = document.createElement(e._vmlNS + ":rect");
        u.style.position = "absolute", u.style.left = "-1px", u.style.top = "-1px", u.stroked = !1, u.appendChild(o), s.appendChild(u);
        var i = function i(e, t, n, r) {
          s.style.width = e + "px", s.style.height = t + "px", u.style.width = e + 1 + "px", u.style.height = t + 1 + "px", o.color = n, o.color2 = r;
        };
        t.elm = s, t.draw = i;
      }
      return t;
    },
    leaveValue: 1,
    leaveStyle: 2,
    leavePad: 4,
    leaveSld: 8,
    BoxShadow: function () {
      var e = function e(_e, t, n, r, i, s) {
        this.hShadow = _e, this.vShadow = t, this.blur = n, this.spread = r, this.color = i, this.inset = !!s;
      };
      return e.prototype.toString = function () {
        var e = [Math.round(this.hShadow) + "px", Math.round(this.vShadow) + "px", Math.round(this.blur) + "px", Math.round(this.spread) + "px", this.color];
        return this.inset && e.push("inset"), e.join(" ");
      }, e;
    }(),
    jscolor: function jscolor(t, n) {
      function i(e, t, n) {
        e /= 255, t /= 255, n /= 255;
        var r = Math.min(Math.min(e, t), n),
          i = Math.max(Math.max(e, t), n),
          s = i - r;
        if (s === 0) return [null, 0, 100 * i];
        var o = e === r ? 3 + (n - t) / s : t === r ? 5 + (e - n) / s : 1 + (t - e) / s;
        return [60 * (o === 6 ? 0 : o), 100 * (s / i), 100 * i];
      }
      function s(e, t, n) {
        var r = 255 * (n / 100);
        if (e === null) return [r, r, r];
        e /= 60, t /= 100;
        var i = Math.floor(e),
          s = i % 2 ? e - i : 1 - (e - i),
          o = r * (1 - t),
          u = r * (1 - t * s);
        switch (i) {
          case 6:
          case 0:
            return [r, u, o];
          case 1:
            return [u, r, o];
          case 2:
            return [o, r, u];
          case 3:
            return [o, u, r];
          case 4:
            return [u, o, r];
          case 5:
            return [r, o, u];
        }
      }
      function o() {
        e.unsetClass(d.targetElement, d.activeClass), e.picker.wrap.parentNode.removeChild(e.picker.wrap), delete e.picker.owner;
      }
      function u() {
        function l() {
          var e = d.insetColor.split(/\s+/),
            n = e.length < 2 ? e[0] : e[1] + " " + e[0] + " " + e[0] + " " + e[1];
          t.btn.style.borderColor = n;
        }
        d._processParentElementsInDOM(), e.picker || (e.picker = {
          owner: null,
          wrap: document.createElement("div"),
          box: document.createElement("div"),
          boxS: document.createElement("div"),
          boxB: document.createElement("div"),
          pad: document.createElement("div"),
          padB: document.createElement("div"),
          padM: document.createElement("div"),
          padPal: e.createPalette(),
          cross: document.createElement("div"),
          crossBY: document.createElement("div"),
          crossBX: document.createElement("div"),
          crossLY: document.createElement("div"),
          crossLX: document.createElement("div"),
          sld: document.createElement("div"),
          sldB: document.createElement("div"),
          sldM: document.createElement("div"),
          sldGrad: e.createSliderGradient(),
          sldPtrS: document.createElement("div"),
          sldPtrIB: document.createElement("div"),
          sldPtrMB: document.createElement("div"),
          sldPtrOB: document.createElement("div"),
          btn: document.createElement("div"),
          btnT: document.createElement("span")
        }, e.picker.pad.appendChild(e.picker.padPal.elm), e.picker.padB.appendChild(e.picker.pad), e.picker.cross.appendChild(e.picker.crossBY), e.picker.cross.appendChild(e.picker.crossBX), e.picker.cross.appendChild(e.picker.crossLY), e.picker.cross.appendChild(e.picker.crossLX), e.picker.padB.appendChild(e.picker.cross), e.picker.box.appendChild(e.picker.padB), e.picker.box.appendChild(e.picker.padM), e.picker.sld.appendChild(e.picker.sldGrad.elm), e.picker.sldB.appendChild(e.picker.sld), e.picker.sldB.appendChild(e.picker.sldPtrOB), e.picker.sldPtrOB.appendChild(e.picker.sldPtrMB), e.picker.sldPtrMB.appendChild(e.picker.sldPtrIB), e.picker.sldPtrIB.appendChild(e.picker.sldPtrS), e.picker.box.appendChild(e.picker.sldB), e.picker.box.appendChild(e.picker.sldM), e.picker.btn.appendChild(e.picker.btnT), e.picker.box.appendChild(e.picker.btn), e.picker.boxB.appendChild(e.picker.box), e.picker.wrap.appendChild(e.picker.boxS), e.picker.wrap.appendChild(e.picker.boxB));
        var t = e.picker,
          n = !!e.getSliderComponent(d),
          r = e.getPickerDims(d),
          i = 2 * d.pointerBorderWidth + d.pointerThickness + 2 * d.crossSize,
          s = e.getPadToSliderPadding(d),
          o = Math.min(d.borderRadius, Math.round(d.padding * Math.PI)),
          u = "crosshair";
        t.wrap.style.clear = "both", t.wrap.style.width = r[0] + 2 * d.borderWidth + "px", t.wrap.style.height = r[1] + 2 * d.borderWidth + "px", t.wrap.style.zIndex = d.zIndex, t.box.style.width = r[0] + "px", t.box.style.height = r[1] + "px", t.boxS.style.position = "absolute", t.boxS.style.left = "0", t.boxS.style.top = "0", t.boxS.style.width = "100%", t.boxS.style.height = "100%", e.setBorderRadius(t.boxS, o + "px"), t.boxB.style.position = "relative", t.boxB.style.border = d.borderWidth + "px solid", t.boxB.style.borderColor = d.borderColor, t.boxB.style.background = d.backgroundColor, e.setBorderRadius(t.boxB, o + "px"), t.padM.style.background = t.sldM.style.background = "#FFF", e.setStyle(t.padM, "opacity", "0"), e.setStyle(t.sldM, "opacity", "0"), t.pad.style.position = "relative", t.pad.style.width = d.width + "px", t.pad.style.height = d.height + "px", t.padPal.draw(d.width, d.height, e.getPadYComponent(d)), t.padB.style.position = "absolute", t.padB.style.left = d.padding + "px", t.padB.style.top = d.padding + "px", t.padB.style.border = d.insetWidth + "px solid", t.padB.style.borderColor = d.insetColor, t.padM._jscInstance = d, t.padM._jscControlName = "pad", t.padM.style.position = "absolute", t.padM.style.left = "0", t.padM.style.top = "0", t.padM.style.width = d.padding + 2 * d.insetWidth + d.width + s / 2 + "px", t.padM.style.height = r[1] + "px", t.padM.style.cursor = u, t.cross.style.position = "absolute", t.cross.style.left = t.cross.style.top = "0", t.cross.style.width = t.cross.style.height = i + "px", t.crossBY.style.position = t.crossBX.style.position = "absolute", t.crossBY.style.background = t.crossBX.style.background = d.pointerBorderColor, t.crossBY.style.width = t.crossBX.style.height = 2 * d.pointerBorderWidth + d.pointerThickness + "px", t.crossBY.style.height = t.crossBX.style.width = i + "px", t.crossBY.style.left = t.crossBX.style.top = Math.floor(i / 2) - Math.floor(d.pointerThickness / 2) - d.pointerBorderWidth + "px", t.crossBY.style.top = t.crossBX.style.left = "0", t.crossLY.style.position = t.crossLX.style.position = "absolute", t.crossLY.style.background = t.crossLX.style.background = d.pointerColor, t.crossLY.style.height = t.crossLX.style.width = i - 2 * d.pointerBorderWidth + "px", t.crossLY.style.width = t.crossLX.style.height = d.pointerThickness + "px", t.crossLY.style.left = t.crossLX.style.top = Math.floor(i / 2) - Math.floor(d.pointerThickness / 2) + "px", t.crossLY.style.top = t.crossLX.style.left = d.pointerBorderWidth + "px", t.sld.style.overflow = "hidden", t.sld.style.width = d.sliderSize + "px", t.sld.style.height = d.height + "px", t.sldGrad.draw(d.sliderSize, d.height, "#000", "#000"), t.sldB.style.display = n ? "block" : "none", t.sldB.style.position = "absolute", t.sldB.style.right = d.padding + "px", t.sldB.style.top = d.padding + "px", t.sldB.style.border = d.insetWidth + "px solid", t.sldB.style.borderColor = d.insetColor, t.sldM._jscInstance = d, t.sldM._jscControlName = "sld", t.sldM.style.display = n ? "block" : "none", t.sldM.style.position = "absolute", t.sldM.style.right = "0", t.sldM.style.top = "0", t.sldM.style.width = d.sliderSize + s / 2 + d.padding + 2 * d.insetWidth + "px", t.sldM.style.height = r[1] + "px", t.sldM.style.cursor = "default", t.sldPtrIB.style.border = t.sldPtrOB.style.border = d.pointerBorderWidth + "px solid " + d.pointerBorderColor, t.sldPtrOB.style.position = "absolute", t.sldPtrOB.style.left = -(2 * d.pointerBorderWidth + d.pointerThickness) + "px", t.sldPtrOB.style.top = "0", t.sldPtrMB.style.border = d.pointerThickness + "px solid " + d.pointerColor, t.sldPtrS.style.width = d.sliderSize + "px", t.sldPtrS.style.height = m + "px", t.btn.style.display = d.closable ? "block" : "none", t.btn.style.position = "absolute", t.btn.style.left = d.padding + "px", t.btn.style.bottom = d.padding + "px", t.btn.style.padding = "0 15px", t.btn.style.height = d.buttonHeight + "px", t.btn.style.border = d.insetWidth + "px solid", l(), t.btn.style.color = d.buttonColor, t.btn.style.font = "12px sans-serif", t.btn.style.textAlign = "center";
        try {
          t.btn.style.cursor = "pointer";
        } catch (c) {
          t.btn.style.cursor = "hand";
        }
        t.btn.onmousedown = function () {
          d.hide();
        }, t.btnT.style.lineHeight = d.buttonHeight + "px", t.btnT.innerHTML = "", t.btnT.appendChild(document.createTextNode(d.closeText)), a(), f(), e.picker.owner && e.picker.owner !== d && e.unsetClass(e.picker.owner.targetElement, d.activeClass), e.picker.owner = d, e.isElementType(v, "body") ? e.redrawPosition() : e._drawPosition(d, 0, 0, "relative", !1), t.wrap.parentNode != v && v.appendChild(t.wrap), e.setClass(d.targetElement, d.activeClass);
      }
      function a() {
        switch (e.getPadYComponent(d)) {
          case "s":
            var t = 1;
            break;
          case "v":
            var t = 2;
        }
        var n = Math.round(d.hsv[0] / 360 * (d.width - 1)),
          r = Math.round((1 - d.hsv[t] / 100) * (d.height - 1)),
          i = 2 * d.pointerBorderWidth + d.pointerThickness + 2 * d.crossSize,
          o = -Math.floor(i / 2);
        e.picker.cross.style.left = n + o + "px", e.picker.cross.style.top = r + o + "px";
        switch (e.getSliderComponent(d)) {
          case "s":
            var u = s(d.hsv[0], 100, d.hsv[2]),
              a = s(d.hsv[0], 0, d.hsv[2]),
              f = "rgb(" + Math.round(u[0]) + "," + Math.round(u[1]) + "," + Math.round(u[2]) + ")",
              l = "rgb(" + Math.round(a[0]) + "," + Math.round(a[1]) + "," + Math.round(a[2]) + ")";
            e.picker.sldGrad.draw(d.sliderSize, d.height, f, l);
            break;
          case "v":
            var c = s(d.hsv[0], d.hsv[1], 100),
              f = "rgb(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + ")",
              l = "#000";
            e.picker.sldGrad.draw(d.sliderSize, d.height, f, l);
        }
      }
      function f() {
        var t = e.getSliderComponent(d);
        if (t) {
          switch (t) {
            case "s":
              var n = 1;
              break;
            case "v":
              var n = 2;
          }
          var r = Math.round((1 - d.hsv[n] / 100) * (d.height - 1));
          e.picker.sldPtrOB.style.top = r - (2 * d.pointerBorderWidth + d.pointerThickness) - Math.floor(m / 2) + "px";
        }
      }
      function l() {
        return e.picker && e.picker.owner === d;
      }
      function c() {
        d.importColor();
      }
      this.value = null, this.valueElement = t, this.styleElement = t, this.required = !0, this.refine = !0, this.hash = !1, this.uppercase = !0, this.onFineChange = null, this.activeClass = "jscolor-active", this.minS = 0, this.maxS = 100, this.minV = 0, this.maxV = 100, this.hsv = [0, 0, 100], this.rgb = [255, 255, 255], this.width = 181, this.height = 101, this.showOnClick = !0, this.mode = "HSV", this.position = "bottom", this.smartPosition = !0, this.sliderSize = 16, this.crossSize = 8, this.closable = !1, this.closeText = "Close", this.buttonColor = "#000000", this.buttonHeight = 18, this.padding = 12, this.backgroundColor = "#FFFFFF", this.borderWidth = 1, this.borderColor = "#BBBBBB", this.borderRadius = 8, this.insetWidth = 1, this.insetColor = "#BBBBBB", this.shadow = !0, this.shadowBlur = 15, this.shadowColor = "rgba(0,0,0,0.2)", this.pointerColor = "#4C4C4C", this.pointerBorderColor = "#FFFFFF", this.pointerBorderWidth = 1, this.pointerThickness = 2, this.zIndex = 1e3, this.container = null;
      for (var r in n) n.hasOwnProperty(r) && (this[r] = n[r]);
      this.hide = function () {
        l() && o();
      }, this.show = function () {
        u();
      }, this.redraw = function () {
        l() && u();
      }, this.importColor = function () {
        this.valueElement ? e.isElementType(this.valueElement, "input") ? this.refine ? !this.required && /^\s*$/.test(this.valueElement.value) ? (this.valueElement.value = "", this.styleElement && (this.styleElement.style.backgroundImage = this.styleElement._jscOrigStyle.backgroundImage, this.styleElement.style.backgroundColor = this.styleElement._jscOrigStyle.backgroundColor, this.styleElement.style.color = this.styleElement._jscOrigStyle.color), this.exportColor(e.leaveValue | e.leaveStyle)) : this.fromString(this.valueElement.value) || this.exportColor() : this.fromString(this.valueElement.value, e.leaveValue) || (this.styleElement && (this.styleElement.style.backgroundImage = this.styleElement._jscOrigStyle.backgroundImage, this.styleElement.style.backgroundColor = this.styleElement._jscOrigStyle.backgroundColor, this.styleElement.style.color = this.styleElement._jscOrigStyle.color), this.exportColor(e.leaveValue | e.leaveStyle)) : this.exportColor() : this.exportColor();
      }, this.exportColor = function (t) {
        if (!(t & e.leaveValue) && this.valueElement) {
          var n = this.toString();
          this.uppercase && (n = n.toUpperCase()), this.hash && (n = "#" + n), e.isElementType(this.valueElement, "input") ? this.valueElement.value = n : this.valueElement.innerHTML = n;
        }
        t & e.leaveStyle || this.styleElement && (this.styleElement.style.backgroundImage = "none", this.styleElement.style.backgroundColor = "#" + this.toString(), this.styleElement.style.color = this.isLight() ? "#000" : "#FFF"), !(t & e.leavePad) && l() && a(), !(t & e.leaveSld) && l() && f();
      }, this.fromHSV = function (e, t, n, r) {
        if (e !== null) {
          if (isNaN(e)) return !1;
          e = Math.max(0, Math.min(360, e));
        }
        if (t !== null) {
          if (isNaN(t)) return !1;
          t = Math.max(0, Math.min(100, this.maxS, t), this.minS);
        }
        if (n !== null) {
          if (isNaN(n)) return !1;
          n = Math.max(0, Math.min(100, this.maxV, n), this.minV);
        }
        this.rgb = s(e === null ? this.hsv[0] : this.hsv[0] = e, t === null ? this.hsv[1] : this.hsv[1] = t, n === null ? this.hsv[2] : this.hsv[2] = n), this.exportColor(r);
      }, this.fromRGB = function (e, t, n, r) {
        if (e !== null) {
          if (isNaN(e)) return !1;
          e = Math.max(0, Math.min(255, e));
        }
        if (t !== null) {
          if (isNaN(t)) return !1;
          t = Math.max(0, Math.min(255, t));
        }
        if (n !== null) {
          if (isNaN(n)) return !1;
          n = Math.max(0, Math.min(255, n));
        }
        var o = i(e === null ? this.rgb[0] : e, t === null ? this.rgb[1] : t, n === null ? this.rgb[2] : n);
        o[0] !== null && (this.hsv[0] = Math.max(0, Math.min(360, o[0]))), o[2] !== 0 && (this.hsv[1] = o[1] === null ? null : Math.max(0, this.minS, Math.min(100, this.maxS, o[1]))), this.hsv[2] = o[2] === null ? null : Math.max(0, this.minV, Math.min(100, this.maxV, o[2]));
        var u = s(this.hsv[0], this.hsv[1], this.hsv[2]);
        this.rgb[0] = u[0], this.rgb[1] = u[1], this.rgb[2] = u[2], this.exportColor(r);
      }, this.fromString = function (e, t) {
        var n;
        if (n = e.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i)) return n[1].length === 6 ? this.fromRGB(parseInt(n[1].substr(0, 2), 16), parseInt(n[1].substr(2, 2), 16), parseInt(n[1].substr(4, 2), 16), t) : this.fromRGB(parseInt(n[1].charAt(0) + n[1].charAt(0), 16), parseInt(n[1].charAt(1) + n[1].charAt(1), 16), parseInt(n[1].charAt(2) + n[1].charAt(2), 16), t), !0;
        if (n = e.match(/^\W*rgba?\(([^)]*)\)\W*$/i)) {
          var r = n[1].split(","),
            i = /^\s*(\d*)(\.\d+)?\s*$/,
            s,
            o,
            u;
          if (r.length >= 3 && (s = r[0].match(i)) && (o = r[1].match(i)) && (u = r[2].match(i))) {
            var a = parseFloat((s[1] || "0") + (s[2] || "")),
              f = parseFloat((o[1] || "0") + (o[2] || "")),
              l = parseFloat((u[1] || "0") + (u[2] || ""));
            return this.fromRGB(a, f, l, t), !0;
          }
        }
        return !1;
      }, this.toString = function () {
        return (256 | Math.round(this.rgb[0])).toString(16).substr(1) + (256 | Math.round(this.rgb[1])).toString(16).substr(1) + (256 | Math.round(this.rgb[2])).toString(16).substr(1);
      }, this.toHEXString = function () {
        return "#" + this.toString().toUpperCase();
      }, this.toRGBString = function () {
        return "rgb(" + Math.round(this.rgb[0]) + "," + Math.round(this.rgb[1]) + "," + Math.round(this.rgb[2]) + ")";
      }, this.isLight = function () {
        return .213 * this.rgb[0] + .715 * this.rgb[1] + .072 * this.rgb[2] > 127.5;
      }, this._processParentElementsInDOM = function () {
        if (this._linkedElementsProcessed) return;
        this._linkedElementsProcessed = !0;
        var t = this.targetElement;
        do {
          var n = e.getStyle(t);
          n && n.position.toLowerCase() === "fixed" && (this.fixed = !0), t !== this.targetElement && (t._jscEventsAttached || (e.attachEvent(t, "scroll", e.onParentScroll), t._jscEventsAttached = !0));
        } while ((t = t.parentNode) && !e.isElementType(t, "body"));
      };
      if (typeof t == "string") {
        var h = t,
          p = document.getElementById(h);
        p ? this.targetElement = p : e.warn("Could not find target element with ID '" + h + "'");
      } else t ? this.targetElement = t : e.warn("Invalid target element: '" + t + "'");
      if (this.targetElement._jscLinkedInstance) {
        e.warn("Cannot link jscolor twice to the same element. Skipping.");
        return;
      }
      this.targetElement._jscLinkedInstance = this, this.valueElement = e.fetchElement(this.valueElement), this.styleElement = e.fetchElement(this.styleElement);
      var d = this,
        v = this.container ? e.fetchElement(this.container) : document.getElementsByTagName("body")[0],
        m = 3;
      if (e.isElementType(this.targetElement, "button")) if (this.targetElement.onclick) {
        var g = this.targetElement.onclick;
        this.targetElement.onclick = function (e) {
          return g.call(this, e), !1;
        };
      } else this.targetElement.onclick = function () {
        return !1;
      };
      if (this.valueElement && e.isElementType(this.valueElement, "input")) {
        var y = function y() {
          d.fromString(d.valueElement.value, e.leaveValue), e.dispatchFineChange(d);
        };
        e.attachEvent(this.valueElement, "keyup", y), e.attachEvent(this.valueElement, "input", y), e.attachEvent(this.valueElement, "blur", c), this.valueElement.setAttribute("autocomplete", "off");
      }
      this.styleElement && (this.styleElement._jscOrigStyle = {
        backgroundImage: this.styleElement.style.backgroundImage,
        backgroundColor: this.styleElement.style.backgroundColor,
        color: this.styleElement.style.color
      }), this.value ? this.fromString(this.value) || this.exportColor() : this.importColor();
    }
  };
  return e.jscolor.lookupClass = "jscolor", e.jscolor.installByClassName = function (t) {
    var n = document.getElementsByTagName("input"),
      r = document.getElementsByTagName("button");
    e.tryInstallOnElements(n, t), e.tryInstallOnElements(r, t);
  }, e.register(), e.jscolor;
}());

/***/ }),

/***/ "./src/Resources/assets/js/jscolor.js":
/*!********************************************!*\
  !*** ./src/Resources/assets/js/jscolor.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ../bundles/color-picker/jscolor.min */ "./src/Resources/assets/bundles/color-picker/jscolor.min.js");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************************************!*\
  !*** ./src/Resources/assets/js/applications/applications.js ***!
  \**************************************************************/
__webpack_require__(/*! ../jscolor */ "./src/Resources/assets/js/jscolor.js");
$(document).ready(function () {
  $('.select2').select2({
    width: '100%',
    allowHtml: true
  });
  $('div.circle').each(function () {
    $(this).colourBrightness();
  });

  // Adjust the color of the label to the background color
  $('.label').each(function () {
    $(this).colourBrightness();
  });
});
})();

/******/ })()
;