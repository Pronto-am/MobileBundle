/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"js/app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./Resources/assets/vue/app.js","vendors~js/app"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Resources/assets/vue/app.js":
/*!*************************************!*\
  !*** ./Resources/assets/vue/app.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.split */ "./node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bootstrap */ "./Resources/assets/vue/bootstrap.js");
/* harmony import */ var _bootstrap__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_bootstrap__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _plugins__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./plugins */ "./Resources/assets/vue/plugins.js");
/* harmony import */ var _interceptors_axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./interceptors/axios */ "./Resources/assets/vue/interceptors/axios.js");
/* harmony import */ var _views_App__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./views/App */ "./Resources/assets/vue/views/App.vue");
/* harmony import */ var _libraries_auth__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./libraries/auth */ "./Resources/assets/vue/libraries/auth.js");
/* harmony import */ var _libraries_draggable__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./libraries/draggable */ "./Resources/assets/vue/libraries/draggable.js");
/* harmony import */ var _libraries_element__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./libraries/element */ "./Resources/assets/vue/libraries/element.js");
/* harmony import */ var _libraries_fontawesome__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./libraries/fontawesome */ "./Resources/assets/vue/libraries/fontawesome.js");
/* harmony import */ var _libraries_form__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./libraries/form */ "./Resources/assets/vue/libraries/form.js");
/* harmony import */ var _libraries_moment__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./libraries/moment */ "./Resources/assets/vue/libraries/moment.js");
/* harmony import */ var _libraries_progressbar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./libraries/progressbar */ "./Resources/assets/vue/libraries/progressbar.js");
/* harmony import */ var _libraries_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./libraries/router */ "./Resources/assets/vue/libraries/router.js");
/* harmony import */ var _libraries_table__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./libraries/table */ "./Resources/assets/vue/libraries/table.js");
/* harmony import */ var _services_application_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./services/application.service */ "./Resources/assets/vue/services/application.service.js");





















window.Vue = vue__WEBPACK_IMPORTED_MODULE_7__["default"];
window.Events = new vue__WEBPACK_IMPORTED_MODULE_7__["default"](); // import * as Sentry from '@sentry/browser';
// import * as Integrations from '@sentry/integrations';
// if(process.env.NODE_ENV === 'production') {
// // Init Sentry
//     Sentry.init({
//         dsn: 'https://3a4cd544b8874acf8325aa7b266139c9@sentry.io/129314',
//         integrations: [new Integrations.Vue({Vue, attachProps: true})],
//     });
// }

vue__WEBPACK_IMPORTED_MODULE_7__["default"].prototype.$applicationService = new _services_application_service__WEBPACK_IMPORTED_MODULE_20__["default"]();
vue__WEBPACK_IMPORTED_MODULE_7__["default"].prototype.$auth.init().then(function () {
  /**
   * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
   */
  var files = __webpack_require__("./Resources/assets/vue/components sync recursive \\.vue$/");

  files.keys().map(function (key) {
    return vue__WEBPACK_IMPORTED_MODULE_7__["default"].component(key.split('/').pop().split('.')[0], files(key)["default"]);
  });
  new vue__WEBPACK_IMPORTED_MODULE_7__["default"]({
    el: '#app',
    components: {
      App: _views_App__WEBPACK_IMPORTED_MODULE_10__["default"]
    },
    router: _libraries_router__WEBPACK_IMPORTED_MODULE_18__["default"]
  });
});

/***/ }),

/***/ "./Resources/assets/vue/bootstrap.js":
/*!*******************************************!*\
  !*** ./Resources/assets/vue/bootstrap.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");

window._ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
window.Popper = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js")["default"];
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
  window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

  __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
} catch (e) {
  console.error(e);
}
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */


window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js"); // Helper methods

window.url = function (url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var keys = Object.keys(params);

  for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
    var key = _keys[_i];
    url = url.replace(":".concat(key), params[key]);
  }

  return "/api/vue/".concat(url.replace(/^\/+/g, ''));
};
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
// import Echo from 'laravel-echo'
// window.Pusher = require('pusher-js');
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });

/***/ }),

/***/ "./Resources/assets/vue/components sync recursive \\.vue$/":
/*!******************************************************!*\
  !*** ./Resources/assets/vue/components sync \.vue$/ ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./Resources/assets/vue/components sync recursive \\.vue$/";

/***/ }),

/***/ "./Resources/assets/vue/helpers.js":
/*!*****************************************!*\
  !*** ./Resources/assets/vue/helpers.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  commentNode: function commentNode(el, vnode) {
    var comment = document.createComment(' ');
    Object.defineProperty(comment, 'setAttribute', {
      value: function value() {
        return undefined;
      }
    });
    vnode.text = ' ';
    vnode.elm = comment;
    vnode.isComment = true;
    vnode.context = undefined;
    vnode.tag = undefined;
    vnode.data.directives = undefined;

    if (vnode.componentInstance) {
      vnode.componentInstance.$el = comment;
    }

    if (el.parentNode) {
      el.parentNode.replaceChild(comment, el);
    }
  }
});

/***/ }),

/***/ "./Resources/assets/vue/interceptors/axios.js":
/*!****************************************************!*\
  !*** ./Resources/assets/vue/interceptors/axios.js ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");





/**
 * Request interceptor
 */

window.axios.interceptors.request.use(function (config) {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'; // Add the authentication header when the user is logged in

  if (vue__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.$oauth.isAuthenticated()) {
    // Set the authorization header for each request
    config.headers['Authorization'] = vue__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.$oauth.getAuthHeader();
  } // Add application and version ID


  if (vue__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.$applicationService.applicationIsSet()) {
    config.headers['Application-Id'] = vue__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.$applicationService.getApplication().id;
  }

  if (vue__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.$applicationService.versionIsSet()) {
    config.headers['Application-Version-Id'] = vue__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.$applicationService.getVersion().id;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
/**
 * Response interceptor
 */

window.axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function _callee(error) {
  var originalRequest;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          originalRequest = error.config; // Refresh the access token

          if (!(error.response !== undefined && error.response.status === 401 && vue__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.$oauth.isAuthenticated() && !originalRequest._retry)) {
            _context.next = 13;
            break;
          }

          originalRequest._retry = true;
          _context.prev = 3;
          _context.next = 6;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.awrap(vue__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.$oauth.refreshToken());

        case 6:
          return _context.abrupt("return", axios(originalRequest));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](3);
          _context.next = 13;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.awrap(vue__WEBPACK_IMPORTED_MODULE_4__["default"].prototype.$oauth.logout());

        case 13:
          return _context.abrupt("return", Promise.reject(error));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 9]]);
});

/***/ }),

/***/ "./Resources/assets/vue/libraries/auth.js":
/*!************************************************!*\
  !*** ./Resources/assets/vue/libraries/auth.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _services_oauth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/oauth.service */ "./Resources/assets/vue/services/oauth.service.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "./Resources/assets/vue/services/auth.service.js");



vue__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.$oauth = new _services_oauth_service__WEBPACK_IMPORTED_MODULE_1__["default"]();
vue__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.$auth = new _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["default"]();

/***/ }),

/***/ "./Resources/assets/vue/libraries/draggable.js":
/*!*****************************************************!*\
  !*** ./Resources/assets/vue/libraries/draggable.js ***!
  \*****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.common.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_1__);


vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('draggable', vuedraggable__WEBPACK_IMPORTED_MODULE_1___default.a);

/***/ }),

/***/ "./Resources/assets/vue/libraries/element.js":
/*!***************************************************!*\
  !*** ./Resources/assets/vue/libraries/element.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! element-ui */ "./node_modules/element-ui/lib/element-ui.common.js");
/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(element_ui__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var element_ui_lib_locale_lang_nl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! element-ui/lib/locale/lang/nl */ "./node_modules/element-ui/lib/locale/lang/nl.js");
/* harmony import */ var element_ui_lib_locale_lang_nl__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(element_ui_lib_locale_lang_nl__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var element_ui_lib_locale__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! element-ui/lib/locale */ "./node_modules/element-ui/lib/locale/index.js");
/* harmony import */ var element_ui_lib_locale__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(element_ui_lib_locale__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var element_ui_lib_theme_chalk_index_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! element-ui/lib/theme-chalk/index.css */ "./node_modules/element-ui/lib/theme-chalk/index.css");
/* harmony import */ var element_ui_lib_theme_chalk_index_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(element_ui_lib_theme_chalk_index_css__WEBPACK_IMPORTED_MODULE_5__);






element_ui_lib_locale__WEBPACK_IMPORTED_MODULE_4___default.a.use(element_ui_lib_locale_lang_nl__WEBPACK_IMPORTED_MODULE_3___default.a);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Alert"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Alert"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Collapse"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Collapse"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["CollapseItem"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["CollapseItem"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Input"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Input"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["InputNumber"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["InputNumber"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Radio"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Radio"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Checkbox"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Checkbox"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Tag"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Tag"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Button"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Button"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Select"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Select"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Option"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Option"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["OptionGroup"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["OptionGroup"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Tooltip"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Tooltip"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Dropdown"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Dropdown"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["DropdownMenu"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["DropdownMenu"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["DropdownItem"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["DropdownItem"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Upload"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Upload"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["TabPane"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["TabPane"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Tabs"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Tabs"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["DatePicker"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["DatePicker"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Transfer"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Transfer"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["Dialog"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["Dialog"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["TimeSelect"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["TimeSelect"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(element_ui__WEBPACK_IMPORTED_MODULE_2__["ColorPicker"].name, element_ui__WEBPACK_IMPORTED_MODULE_2__["ColorPicker"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].use(element_ui__WEBPACK_IMPORTED_MODULE_2__["Loading"].directive);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.$message = element_ui__WEBPACK_IMPORTED_MODULE_2__["Message"];
vue__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.$msgbox = element_ui__WEBPACK_IMPORTED_MODULE_2__["MessageBox"];
vue__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.$alert = element_ui__WEBPACK_IMPORTED_MODULE_2__["MessageBox"].alert;
vue__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.$confirm = element_ui__WEBPACK_IMPORTED_MODULE_2__["MessageBox"].confirm;
vue__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.$prompt = element_ui__WEBPACK_IMPORTED_MODULE_2__["MessageBox"].prompt;

/***/ }),

/***/ "./Resources/assets/vue/libraries/fontawesome.js":
/*!*******************************************************!*\
  !*** ./Resources/assets/vue/libraries/fontawesome.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _fortawesome_vue_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/vue-fontawesome */ "./node_modules/@fortawesome/vue-fontawesome/index.es.js");



 // Watch <i> tags and transform them to SVG for font awesome icons

_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_1__["dom"].watch();
_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_1__["library"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["fas"]);
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('font-awesome-icon', _fortawesome_vue_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"]);

/***/ }),

/***/ "./Resources/assets/vue/libraries/form.js":
/*!************************************************!*\
  !*** ./Resources/assets/vue/libraries/form.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bit/e-sites.vue.global.form */ "./node_modules/@bit/e-sites.vue.global.form/index.js");



vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["VueForm"].name, _bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["VueForm"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputRadio"].name, _bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputRadio"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputCheckbox"].name, _bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputCheckbox"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputText"].name, _bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputText"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputNumber"].name, _bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputNumber"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputPassword"].name, _bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputPassword"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputEditor"].name, _bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputEditor"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputSelect"].name, _bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputSelect"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputUpload"].name, _bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputUpload"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputDateTime"].name, _bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputDateTime"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputCode"].name, _bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputCode"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputTime"].name, _bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputTime"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputColorPicker"].name, _bit_e_sites_vue_global_form__WEBPACK_IMPORTED_MODULE_2__["InputColorPicker"]);

/***/ }),

/***/ "./Resources/assets/vue/libraries/moment.js":
/*!**************************************************!*\
  !*** ./Resources/assets/vue/libraries/moment.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);


vue__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.$moment = moment__WEBPACK_IMPORTED_MODULE_1___default.a;
vue__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.$moment.locale('nl');

/***/ }),

/***/ "./Resources/assets/vue/libraries/progressbar.js":
/*!*******************************************************!*\
  !*** ./Resources/assets/vue/libraries/progressbar.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_progressbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-progressbar */ "./node_modules/vue-progressbar/dist/vue-progressbar.js");
/* harmony import */ var vue_progressbar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_progressbar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_progress_path_dist_vue_progress_path_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-progress-path/dist/vue-progress-path.css */ "./node_modules/vue-progress-path/dist/vue-progress-path.css");
/* harmony import */ var vue_progress_path_dist_vue_progress_path_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_progress_path_dist_vue_progress_path_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vue_progress_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-progress-path */ "./node_modules/vue-progress-path/dist/vue-progress-path.esm.js");




vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_progress_path__WEBPACK_IMPORTED_MODULE_3__["default"]);
vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_progressbar__WEBPACK_IMPORTED_MODULE_1___default.a, {
  color: '#ffd600',
  failedColor: '#f5365c',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  }
});

/***/ }),

/***/ "./Resources/assets/vue/libraries/router.js":
/*!**************************************************!*\
  !*** ./Resources/assets/vue/libraries/router.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../routes */ "./Resources/assets/vue/routes/index.js");
/* harmony import */ var _services_oauth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../services/oauth.service */ "./Resources/assets/vue/services/oauth.service.js");





var router = new vue_router__WEBPACK_IMPORTED_MODULE_2__["default"]({
  mode: 'history',
  base: '/beta/',
  routes: _routes__WEBPACK_IMPORTED_MODULE_3__["default"]
});
vue__WEBPACK_IMPORTED_MODULE_1__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_2__["default"]);
var oAuth = new _services_oauth_service__WEBPACK_IMPORTED_MODULE_4__["default"]();
router.beforeEach(function (to, from, next) {
  //If visiting login view but you already have logged in, you should not be able to see this view
  if (!to.meta.auth && oAuth.isAuthenticated()) {
    return next({
      path: '/'
    });
  } //If you are visiting '/' and you are a guest then, you must be redirected to login


  if (to.meta.auth && oAuth.guest()) {
    return next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    });
  } // Logged in and visiting a protected route


  if (to.meta.auth && oAuth.isAuthenticated()) {
    // Check if the user has selected an application version
    if (!vue__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.$applicationService.versionIsSet() && to.name !== 'applications.select') {
      return next({
        name: 'applications.select'
      });
    }

    if (!vue__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.$auth.userHasRole(to.meta.role)) {
      return next({
        name: 'dashboard'
      });
    }
  }

  return next();
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./Resources/assets/vue/libraries/table.js":
/*!*************************************************!*\
  !*** ./Resources/assets/vue/libraries/table.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _bit_e_sites_vue_global_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bit/e-sites.vue.global.table */ "./node_modules/@bit/e-sites.vue.global.table/index.js");



vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_table__WEBPACK_IMPORTED_MODULE_2__["VueTable"].name, _bit_e_sites_vue_global_table__WEBPACK_IMPORTED_MODULE_2__["VueTable"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_table__WEBPACK_IMPORTED_MODULE_2__["VueTableColumn"].name, _bit_e_sites_vue_global_table__WEBPACK_IMPORTED_MODULE_2__["VueTableColumn"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_table__WEBPACK_IMPORTED_MODULE_2__["VueTableHeader"].name, _bit_e_sites_vue_global_table__WEBPACK_IMPORTED_MODULE_2__["VueTableHeader"]);

/***/ }),

/***/ "./Resources/assets/vue/plugins.js":
/*!*****************************************!*\
  !*** ./Resources/assets/vue/plugins.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ "./node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.slice */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.number.to-fixed */ "./node_modules/core-js/modules/es.number.to-fixed.js");
/* harmony import */ var core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/web.url */ "./node_modules/core-js/modules/web.url.js");
/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./helpers */ "./Resources/assets/vue/helpers.js");
















vue__WEBPACK_IMPORTED_MODULE_14__["default"].mixin({
  filters: {
    capitalize: function capitalize(value) {
      if (!value) {
        return '';
      }

      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods: {
    submitSuccess: function submitSuccess() {
      this.$message({
        type: 'success',
        message: 'De gegevens zijn opgeslagen'
      });
    },
    submitError: function submitError() {
      this.$message({
        type: 'error',
        message: 'Er is iets mis gegaan, probeer het nogmaals'
      });
    },
    confirm: function confirm(text, title) {
      var confirmButtonText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Verwijderen';
      return this.$confirm(text, title, {
        confirmButtonText: confirmButtonText,
        cancelButtonText: 'Annuleren',
        type: 'warning',
        dangerouslyUseHTMLString: true
      });
    },
    isEmpty: function isEmpty(value) {
      return value === '' || value === null || value === undefined;
    },
    formatPrice: function formatPrice(value) {
      var val = (value / 1).toFixed(2).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    downloadFile: function downloadFile(url) {
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      axios({
        url: url,
        method: method,
        data: data,
        responseType: 'blob'
      }).then(function (response) {
        var fileName = '';
        var disposition = response.headers['content-disposition'];

        if (disposition && disposition.indexOf('attachment') !== -1) {
          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(disposition);

          if (matches[1]) {
            fileName = matches[1].replace(/['"]/g, '');
          }
        }

        var url = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); //or any other extension

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  }
});
vue__WEBPACK_IMPORTED_MODULE_14__["default"].filter('capitalize', function (value) {
  if (!value) {
    return '';
  }

  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});
vue__WEBPACK_IMPORTED_MODULE_14__["default"].directive('user-has-role', function (el, bindings, vnode) {
  var behaviour = bindings.modifiers.disable ? 'disable' : 'hide';
  console.log(vue__WEBPACK_IMPORTED_MODULE_14__["default"].prototype.$auth.userHasRole(bindings.value));

  if (!vue__WEBPACK_IMPORTED_MODULE_14__["default"].prototype.$auth.userHasRole(bindings.value)) {
    if (behaviour === 'hide') {
      _helpers__WEBPACK_IMPORTED_MODULE_15__["default"].commentNode(el, vnode);
    } else if (behaviour === 'disable') {
      el.disabled = true;
    }
  }
});
/**
 * PROTOTYPES
 */

/**
 * Prototype to create a url
 * @param url
 * @param params
 * @returns {string}
 */

vue__WEBPACK_IMPORTED_MODULE_14__["default"].prototype.$url = function (url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var keys = Object.keys(params);

  for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
    var key = _keys[_i];
    url = url.replace(":".concat(key), params[key]);
  }

  return "/api/vue/".concat(url.replace(/^\/+/g, ''));
};

/***/ }),

/***/ "./Resources/assets/vue/routes/index.js":
/*!**********************************************!*\
  !*** ./Resources/assets/vue/routes/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_authentication__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/authentication */ "./Resources/assets/vue/routes/modules/authentication.js");
/* harmony import */ var _modules_applications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/applications */ "./Resources/assets/vue/routes/modules/applications.js");
/* harmony import */ var _modules_plugins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/plugins */ "./Resources/assets/vue/routes/modules/plugins.js");
/* harmony import */ var _modules_users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/users */ "./Resources/assets/vue/routes/modules/users.js");
/* harmony import */ var _modules_notifications__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/notifications */ "./Resources/assets/vue/routes/modules/notifications.js");
/* harmony import */ var _modules_app_versions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/app_versions */ "./Resources/assets/vue/routes/modules/app_versions.js");
/* harmony import */ var _modules_devices__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/devices */ "./Resources/assets/vue/routes/modules/devices.js");
/* harmony import */ var _modules_remote_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/remote_config */ "./Resources/assets/vue/routes/modules/remote_config.js");









var routes = [{
  path: '/',
  name: 'dashboard',
  component: __webpack_require__(/*! ../views/Dashboard */ "./Resources/assets/vue/views/Dashboard.vue")["default"],
  meta: {
    auth: true
  }
}, {
  path: '*',
  name: '404',
  component: __webpack_require__(/*! ../views/errors/NotFound */ "./Resources/assets/vue/views/errors/NotFound.vue")["default"],
  meta: {
    auth: false
  }
}].concat(_modules_authentication__WEBPACK_IMPORTED_MODULE_1__["default"], _modules_plugins__WEBPACK_IMPORTED_MODULE_3__["default"], _modules_applications__WEBPACK_IMPORTED_MODULE_2__["default"], _modules_app_versions__WEBPACK_IMPORTED_MODULE_6__["default"], _modules_users__WEBPACK_IMPORTED_MODULE_4__["default"], _modules_notifications__WEBPACK_IMPORTED_MODULE_5__["default"], _modules_devices__WEBPACK_IMPORTED_MODULE_7__["default"], _modules_remote_config__WEBPACK_IMPORTED_MODULE_8__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (routes);

/***/ }),

/***/ "./Resources/assets/vue/routes/modules/app_versions.js":
/*!*************************************************************!*\
  !*** ./Resources/assets/vue/routes/modules/app_versions.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/auth.service */ "./Resources/assets/vue/services/auth.service.js");

/* harmony default export */ __webpack_exports__["default"] = ([{
  path: '/versions',
  name: 'app_versions',
  component: __webpack_require__(/*! ../../views/versions/Index */ "./Resources/assets/vue/views/versions/Index.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/versions/edit',
  name: 'app_versions.add',
  component: __webpack_require__(/*! ../../views/versions/Edit */ "./Resources/assets/vue/views/versions/Edit.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/versions/edit/:id',
  name: 'app_versions.edit',
  props: true,
  component: __webpack_require__(/*! ../../views/versions/Edit */ "./Resources/assets/vue/views/versions/Edit.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}]);

/***/ }),

/***/ "./Resources/assets/vue/routes/modules/applications.js":
/*!*************************************************************!*\
  !*** ./Resources/assets/vue/routes/modules/applications.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/auth.service */ "./Resources/assets/vue/services/auth.service.js");

/* harmony default export */ __webpack_exports__["default"] = ([{
  path: '/applications',
  name: 'applications',
  component: __webpack_require__(/*! ../../views/applications/Index */ "./Resources/assets/vue/views/applications/Index.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/applications/select',
  name: 'applications.select',
  component: __webpack_require__(/*! ../../views/applications/Select */ "./Resources/assets/vue/views/applications/Select.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/applications/edit',
  name: 'applications.add',
  component: __webpack_require__(/*! ../../views/applications/Edit */ "./Resources/assets/vue/views/applications/Edit.vue")["default"],
  props: true,
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/applications/edit/:id',
  name: 'applications.edit',
  component: __webpack_require__(/*! ../../views/applications/Edit */ "./Resources/assets/vue/views/applications/Edit.vue")["default"],
  props: true,
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}]);

/***/ }),

/***/ "./Resources/assets/vue/routes/modules/authentication.js":
/*!***************************************************************!*\
  !*** ./Resources/assets/vue/routes/modules/authentication.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  path: '/login',
  name: 'login',
  component: __webpack_require__(/*! ../../views/authentication/Login */ "./Resources/assets/vue/views/authentication/Login.vue")["default"],
  meta: {
    auth: false
  }
}, {
  path: '/password/forgot',
  name: 'password.forgot',
  component: __webpack_require__(/*! ../../views/authentication/ForgotPassword */ "./Resources/assets/vue/views/authentication/ForgotPassword.vue")["default"],
  meta: {
    auth: false
  }
}, {
  path: '/password/reset/:token',
  name: 'password.reset',
  props: true,
  component: __webpack_require__(/*! ../../views/authentication/ResetPassword */ "./Resources/assets/vue/views/authentication/ResetPassword.vue")["default"],
  meta: {
    auth: false
  }
}]);

/***/ }),

/***/ "./Resources/assets/vue/routes/modules/devices.js":
/*!********************************************************!*\
  !*** ./Resources/assets/vue/routes/modules/devices.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/auth.service */ "./Resources/assets/vue/services/auth.service.js");

/* harmony default export */ __webpack_exports__["default"] = ([{
  path: '/devices',
  name: 'devices',
  component: __webpack_require__(/*! ../../views/devices/Index */ "./Resources/assets/vue/views/devices/Index.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/devices/edit',
  name: 'devices.add',
  component: __webpack_require__(/*! ../../views/devices/Edit */ "./Resources/assets/vue/views/devices/Edit.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}]);

/***/ }),

/***/ "./Resources/assets/vue/routes/modules/notifications.js":
/*!**************************************************************!*\
  !*** ./Resources/assets/vue/routes/modules/notifications.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/auth.service */ "./Resources/assets/vue/services/auth.service.js");

/* harmony default export */ __webpack_exports__["default"] = ([{
  path: '/notifications',
  name: 'push_notifications',
  component: __webpack_require__(/*! ../../views/notifications/Index */ "./Resources/assets/vue/views/notifications/Index.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/notifications/edit',
  name: 'push_notifications.add',
  component: __webpack_require__(/*! ../../views/notifications/Edit */ "./Resources/assets/vue/views/notifications/Edit.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/notifications/edit/:id',
  name: 'push_notifications.edit',
  props: true,
  component: __webpack_require__(/*! ../../views/notifications/Edit */ "./Resources/assets/vue/views/notifications/Edit.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/notifications/segments',
  name: 'push_notifications.segments',
  component: __webpack_require__(/*! ../../views/notifications/segments/Index */ "./Resources/assets/vue/views/notifications/segments/Index.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/notifications/segments/edit',
  name: 'push_notifications.segments.add',
  component: __webpack_require__(/*! ../../views/notifications/segments/Edit */ "./Resources/assets/vue/views/notifications/segments/Edit.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/notifications/segments/edit/:id',
  name: 'push_notifications.segments.edit',
  props: true,
  component: __webpack_require__(/*! ../../views/notifications/segments/Edit */ "./Resources/assets/vue/views/notifications/segments/Edit.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}]);

/***/ }),

/***/ "./Resources/assets/vue/routes/modules/plugins.js":
/*!********************************************************!*\
  !*** ./Resources/assets/vue/routes/modules/plugins.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/auth.service */ "./Resources/assets/vue/services/auth.service.js");

/* harmony default export */ __webpack_exports__["default"] = ([{
  path: '/plugins',
  name: 'plugins',
  component: __webpack_require__(/*! ../../views/plugins/Index */ "./Resources/assets/vue/views/plugins/Index.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/plugins/edit/:id',
  name: 'plugins.edit',
  component: __webpack_require__(/*! ../../views/plugins/Edit */ "./Resources/assets/vue/views/plugins/Edit.vue")["default"],
  props: true,
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}]);

/***/ }),

/***/ "./Resources/assets/vue/routes/modules/remote_config.js":
/*!**************************************************************!*\
  !*** ./Resources/assets/vue/routes/modules/remote_config.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/auth.service */ "./Resources/assets/vue/services/auth.service.js");

/* harmony default export */ __webpack_exports__["default"] = ([{
  path: '/config',
  name: 'remote_config',
  component: __webpack_require__(/*! ../../views/config/Index */ "./Resources/assets/vue/views/config/Index.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/config/edit',
  name: 'remote_config.add',
  component: __webpack_require__(/*! ../../views/config/Edit */ "./Resources/assets/vue/views/config/Edit.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/config/edit/:id',
  name: 'remote_config.edit',
  props: true,
  component: __webpack_require__(/*! ../../views/config/Edit */ "./Resources/assets/vue/views/config/Edit.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}]);

/***/ }),

/***/ "./Resources/assets/vue/routes/modules/users.js":
/*!******************************************************!*\
  !*** ./Resources/assets/vue/routes/modules/users.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/auth.service */ "./Resources/assets/vue/services/auth.service.js");

/* harmony default export */ __webpack_exports__["default"] = ([{
  path: '/users',
  name: 'users',
  component: __webpack_require__(/*! ../../views/users/Index */ "./Resources/assets/vue/views/users/Index.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/users/edit',
  name: 'users.add',
  component: __webpack_require__(/*! ../../views/users/Edit */ "./Resources/assets/vue/views/users/Edit.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}, {
  path: '/users/edit/:id',
  name: 'users.edit',
  props: true,
  component: __webpack_require__(/*! ../../views/users/Edit */ "./Resources/assets/vue/views/users/Edit.vue")["default"],
  meta: {
    auth: true,
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
  }
}]);

/***/ }),

/***/ "./Resources/assets/vue/routes/sidebar.js":
/*!************************************************!*\
  !*** ./Resources/assets/vue/routes/sidebar.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/auth.service */ "./Resources/assets/vue/services/auth.service.js");

/* harmony default export */ __webpack_exports__["default"] = ([{
  name: 'applications',
  icon: 'list-alt',
  text: 'Applicaties',
  role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_SUPER_ADMIN"]
}, {
  name: 'collections',
  icon: 'file-alt',
  text: 'Collecties',
  submenuOpen: false,
  role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"],
  children: []
}, {
  name: 'push_notifications',
  icon: 'bell',
  text: 'Push notificaties',
  submenuOpen: false,
  role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"],
  children: [{
    name: 'push_notifications.segments',
    text: 'Segmenten',
    role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_SUPER_ADMIN"]
  }]
}, {
  name: 'devices',
  icon: 'mobile-alt',
  text: 'Apparaten',
  role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
}, {
  name: 'app_versions',
  icon: 'code-branch',
  text: 'App versies',
  role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_SUPER_ADMIN"]
}, {
  name: 'remote_config',
  icon: 'list',
  text: 'Remote config',
  role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
}, {
  name: 'users',
  icon: 'list',
  text: 'Gebruikers',
  role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_USER"]
}, {
  name: 'plugins',
  icon: 'plug',
  text: 'Plugins',
  role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_SUPER_ADMIN"]
}, {
  name: 'customer',
  icon: 'cogs',
  text: 'Klantinformatie',
  role: _services_auth_service__WEBPACK_IMPORTED_MODULE_0__["ROLE_SUPER_ADMIN"]
}]);

/***/ }),

/***/ "./Resources/assets/vue/services/application.service.js":
/*!**************************************************************!*\
  !*** ./Resources/assets/vue/services/application.service.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ApplicationService; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



var ApplicationService =
/*#__PURE__*/
function () {
  function ApplicationService() {// TODO: Retrieve an updated instance of the application from the api, to update properties

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ApplicationService);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ApplicationService, [{
    key: "applicationIsSet",
    value: function applicationIsSet() {
      return this.getApplication() !== null;
    }
  }, {
    key: "setApplication",
    value: function setApplication(application) {
      localStorage.setItem('application', JSON.stringify(application));
    }
  }, {
    key: "getApplication",
    value: function getApplication() {
      return JSON.parse(localStorage.getItem('application'));
    }
  }, {
    key: "clearApplication",
    value: function clearApplication() {
      localStorage.removeItem('application');
    }
  }, {
    key: "versionIsSet",
    value: function versionIsSet() {
      return this.getVersion() !== null;
    }
  }, {
    key: "setVersion",
    value: function setVersion(version) {
      localStorage.setItem('applicationVersion', JSON.stringify(version));
    }
  }, {
    key: "getVersion",
    value: function getVersion() {
      return JSON.parse(localStorage.getItem('applicationVersion'));
    }
  }, {
    key: "clearVersion",
    value: function clearVersion() {
      localStorage.removeItem('version');
    }
  }, {
    key: "clear",
    value: function clear() {
      this.clearApplication();
      this.clearVersion();
    }
  }]);

  return ApplicationService;
}();



/***/ }),

/***/ "./Resources/assets/vue/services/auth.service.js":
/*!*******************************************************!*\
  !*** ./Resources/assets/vue/services/auth.service.js ***!
  \*******************************************************/
/*! exports provided: ROLE_USER, ROLE_ADMIN, ROLE_SUPER_ADMIN, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROLE_USER", function() { return ROLE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROLE_ADMIN", function() { return ROLE_ADMIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROLE_SUPER_ADMIN", function() { return ROLE_SUPER_ADMIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AuthService; });
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ "./node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");








var ROLE_USER = 'ROLE_USER';
var ROLE_ADMIN = 'ROLE_ADMIN';
var ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';
/**
 * ACL class to provide helper functions for the user and it's roles
 */

var AuthService =
/*#__PURE__*/
function () {
  function AuthService() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default()(this, AuthService);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(AuthService, [{
    key: "init",

    /**
     * Initialize the ACL plugin
     */
    value: function init() {
      var response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.async(function init$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default.a.awrap(axios.all([axios.get(vue__WEBPACK_IMPORTED_MODULE_7__["default"].prototype.$url('auth/user'))]));

            case 3:
              response = _context.sent;
              this.user = response[0].data.data;
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              this.user = {};

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 7]]);
    }
    /**
     * Check if a user has the provided role
     * @returns {boolean}
     * @param role
     */

  }, {
    key: "userHasRole",
    value: function userHasRole(role) {
      if (this.isAdmin()) {
        return true;
      }

      if (role === undefined) {
        return true;
      }

      console.log(this.user);

      try {
        return this.user.roles.indexOf(role) !== -1;
      } catch (error) {
        return false;
      }
    }
    /**
     * Check if a user is an administrator
     * @returns {boolean}
     */

  }, {
    key: "isAdmin",
    value: function isAdmin() {
      try {
        return this.user.roles.indexOf('ROLE_SUPER_ADMIN') !== -1;
      } catch (error) {
        return false;
      }
    }
  }]);

  return AuthService;
}();



/***/ }),

/***/ "./Resources/assets/vue/services/oauth.service.js":
/*!********************************************************!*\
  !*** ./Resources/assets/vue/services/oauth.service.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OAuthService; });
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");







var OAuthService =
/*#__PURE__*/
function () {
  /**
   * Constructor
   */
  function OAuthService() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, OAuthService);

    this.session = js_cookie__WEBPACK_IMPORTED_MODULE_4___default.a;
  }
  /**
   * Logout
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(OAuthService, [{
    key: "logout",
    value: function logout() {
      vue__WEBPACK_IMPORTED_MODULE_5__["default"].prototype.$applicationService.clear();
      this.session.remove('access_token');
      this.session.remove('refresh_token');
    }
    /**
     * Guest check
     * @returns {boolean}
     */

  }, {
    key: "guest",
    value: function guest() {
      return this.session.get('access_token') === undefined;
    }
    /**
     * Check if user is logged in
     * @returns {boolean}
     */

  }, {
    key: "isAuthenticated",
    value: function isAuthenticated() {
      return this.session.get('access_token') !== undefined;
    }
    /**
     * Refresh the access token of the user
     * @returns {Promise<any>}
     */

  }, {
    key: "refreshToken",
    value: function refreshToken() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        axios.post('/api/vue/auth/refresh', {
          refresh_token: _this.session.get('refresh_token')
        }).then(function (response) {
          _this.storeSession(response.data);

          resolve(response);
        })["catch"](function (error) {
          reject(error);
        });
      });
    }
    /**
     * Get the authentication header
     * @returns {*}
     */

  }, {
    key: "getAuthHeader",
    value: function getAuthHeader() {
      if (this.isAuthenticated()) {
        var access_token = this.getItem('access_token');
        return 'Bearer ' + access_token;
      }

      return null;
    }
    /**
     * Get an item from the cookies
     * @param key
     */

  }, {
    key: "getItem",
    value: function getItem(key) {
      return this.session.get(key);
    }
    /**
     * Store the session data
     * @param data
     */

  }, {
    key: "storeSession",
    value: function storeSession(data) {
      var hourInMilliSeconds = 86400;
      var time = data.expires_in / hourInMilliSeconds;
      this.session.set('access_token', data.access_token, {
        expires: time
      });
      this.session.set('refresh_token', data.refresh_token, {
        expires: time * 2
      });
    }
  }]);

  return OAuthService;
}();



/***/ }),

/***/ "./Resources/assets/vue/views/App.vue":
/*!********************************************!*\
  !*** ./Resources/assets/vue/views/App.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_0e091f3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=0e091f3a& */ "./Resources/assets/vue/views/App.vue?vue&type=template&id=0e091f3a&");
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _App_vue_vue_type_template_id_0e091f3a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _App_vue_vue_type_template_id_0e091f3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/App.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./Resources/assets/vue/views/App.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--0-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/App.vue?vue&type=template&id=0e091f3a&":
/*!***************************************************************************!*\
  !*** ./Resources/assets/vue/views/App.vue?vue&type=template&id=0e091f3a& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_0e091f3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=0e091f3a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/App.vue?vue&type=template&id=0e091f3a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_0e091f3a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_0e091f3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/Dashboard.vue":
/*!**************************************************!*\
  !*** ./Resources/assets/vue/views/Dashboard.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dashboard_vue_vue_type_template_id_c1ebb054___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=c1ebb054& */ "./Resources/assets/vue/views/Dashboard.vue?vue&type=template&id=c1ebb054&");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_c1ebb054___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dashboard_vue_vue_type_template_id_c1ebb054___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/Dashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/Dashboard.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./Resources/assets/vue/views/Dashboard.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--0-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/Dashboard.vue?vue&type=template&id=c1ebb054&":
/*!*********************************************************************************!*\
  !*** ./Resources/assets/vue/views/Dashboard.vue?vue&type=template&id=c1ebb054& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_c1ebb054___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=template&id=c1ebb054& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/Dashboard.vue?vue&type=template&id=c1ebb054&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_c1ebb054___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_c1ebb054___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/applications/Edit.vue":
/*!**********************************************************!*\
  !*** ./Resources/assets/vue/views/applications/Edit.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Edit_vue_vue_type_template_id_e8dac410___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=e8dac410& */ "./Resources/assets/vue/views/applications/Edit.vue?vue&type=template&id=e8dac410&");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/applications/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_e8dac410___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Edit_vue_vue_type_template_id_e8dac410___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/applications/Edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/applications/Edit.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./Resources/assets/vue/views/applications/Edit.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/applications/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/applications/Edit.vue?vue&type=template&id=e8dac410&":
/*!*****************************************************************************************!*\
  !*** ./Resources/assets/vue/views/applications/Edit.vue?vue&type=template&id=e8dac410& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_e8dac410___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=template&id=e8dac410& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/applications/Edit.vue?vue&type=template&id=e8dac410&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_e8dac410___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_e8dac410___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/applications/Index.vue":
/*!***********************************************************!*\
  !*** ./Resources/assets/vue/views/applications/Index.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_2878dad4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=2878dad4& */ "./Resources/assets/vue/views/applications/Index.vue?vue&type=template&id=2878dad4&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/applications/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_2878dad4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_2878dad4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/applications/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/applications/Index.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./Resources/assets/vue/views/applications/Index.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/applications/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/applications/Index.vue?vue&type=template&id=2878dad4&":
/*!******************************************************************************************!*\
  !*** ./Resources/assets/vue/views/applications/Index.vue?vue&type=template&id=2878dad4& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_2878dad4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=2878dad4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/applications/Index.vue?vue&type=template&id=2878dad4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_2878dad4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_2878dad4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/applications/Select.vue":
/*!************************************************************!*\
  !*** ./Resources/assets/vue/views/applications/Select.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Select_vue_vue_type_template_id_5a065e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Select.vue?vue&type=template&id=5a065e6a&scoped=true& */ "./Resources/assets/vue/views/applications/Select.vue?vue&type=template&id=5a065e6a&scoped=true&");
/* harmony import */ var _Select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Select.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/applications/Select.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Select_vue_vue_type_style_index_0_id_5a065e6a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Select.vue?vue&type=style&index=0&id=5a065e6a&scoped=true&lang=scss& */ "./Resources/assets/vue/views/applications/Select.vue?vue&type=style&index=0&id=5a065e6a&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Select_vue_vue_type_template_id_5a065e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Select_vue_vue_type_template_id_5a065e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5a065e6a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/applications/Select.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/applications/Select.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./Resources/assets/vue/views/applications/Select.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Select.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/applications/Select.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/applications/Select.vue?vue&type=style&index=0&id=5a065e6a&scoped=true&lang=scss&":
/*!**********************************************************************************************************************!*\
  !*** ./Resources/assets/vue/views/applications/Select.vue?vue&type=style&index=0&id=5a065e6a&scoped=true&lang=scss& ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Select_vue_vue_type_style_index_0_id_5a065e6a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-1-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader??ref--4-oneOf-1-2!../../../../../node_modules/sass-loader/lib/loader.js??ref--4-oneOf-1-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Select.vue?vue&type=style&index=0&id=5a065e6a&scoped=true&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/applications/Select.vue?vue&type=style&index=0&id=5a065e6a&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Select_vue_vue_type_style_index_0_id_5a065e6a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Select_vue_vue_type_style_index_0_id_5a065e6a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Select_vue_vue_type_style_index_0_id_5a065e6a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Select_vue_vue_type_style_index_0_id_5a065e6a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Select_vue_vue_type_style_index_0_id_5a065e6a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./Resources/assets/vue/views/applications/Select.vue?vue&type=template&id=5a065e6a&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./Resources/assets/vue/views/applications/Select.vue?vue&type=template&id=5a065e6a&scoped=true& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Select_vue_vue_type_template_id_5a065e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Select.vue?vue&type=template&id=5a065e6a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/applications/Select.vue?vue&type=template&id=5a065e6a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Select_vue_vue_type_template_id_5a065e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Select_vue_vue_type_template_id_5a065e6a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/authentication/ForgotPassword.vue":
/*!**********************************************************************!*\
  !*** ./Resources/assets/vue/views/authentication/ForgotPassword.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ForgotPassword_vue_vue_type_template_id_5805c757___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ForgotPassword.vue?vue&type=template&id=5805c757& */ "./Resources/assets/vue/views/authentication/ForgotPassword.vue?vue&type=template&id=5805c757&");
/* harmony import */ var _ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ForgotPassword.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/authentication/ForgotPassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ForgotPassword_vue_vue_type_template_id_5805c757___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ForgotPassword_vue_vue_type_template_id_5805c757___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/authentication/ForgotPassword.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/authentication/ForgotPassword.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./Resources/assets/vue/views/authentication/ForgotPassword.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ForgotPassword.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/ForgotPassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/authentication/ForgotPassword.vue?vue&type=template&id=5805c757&":
/*!*****************************************************************************************************!*\
  !*** ./Resources/assets/vue/views/authentication/ForgotPassword.vue?vue&type=template&id=5805c757& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_template_id_5805c757___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ForgotPassword.vue?vue&type=template&id=5805c757& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/ForgotPassword.vue?vue&type=template&id=5805c757&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_template_id_5805c757___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_template_id_5805c757___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/authentication/Login.vue":
/*!*************************************************************!*\
  !*** ./Resources/assets/vue/views/authentication/Login.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_7a25e100___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=7a25e100& */ "./Resources/assets/vue/views/authentication/Login.vue?vue&type=template&id=7a25e100&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/authentication/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_7a25e100___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_7a25e100___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/authentication/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/authentication/Login.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./Resources/assets/vue/views/authentication/Login.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/authentication/Login.vue?vue&type=template&id=7a25e100&":
/*!********************************************************************************************!*\
  !*** ./Resources/assets/vue/views/authentication/Login.vue?vue&type=template&id=7a25e100& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_7a25e100___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=template&id=7a25e100& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/Login.vue?vue&type=template&id=7a25e100&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_7a25e100___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_7a25e100___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/authentication/ResetPassword.vue":
/*!*********************************************************************!*\
  !*** ./Resources/assets/vue/views/authentication/ResetPassword.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ResetPassword_vue_vue_type_template_id_087275a1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResetPassword.vue?vue&type=template&id=087275a1& */ "./Resources/assets/vue/views/authentication/ResetPassword.vue?vue&type=template&id=087275a1&");
/* harmony import */ var _ResetPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResetPassword.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/authentication/ResetPassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ResetPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ResetPassword_vue_vue_type_template_id_087275a1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ResetPassword_vue_vue_type_template_id_087275a1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/authentication/ResetPassword.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/authentication/ResetPassword.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./Resources/assets/vue/views/authentication/ResetPassword.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ResetPassword.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/ResetPassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/authentication/ResetPassword.vue?vue&type=template&id=087275a1&":
/*!****************************************************************************************************!*\
  !*** ./Resources/assets/vue/views/authentication/ResetPassword.vue?vue&type=template&id=087275a1& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_template_id_087275a1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./ResetPassword.vue?vue&type=template&id=087275a1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/ResetPassword.vue?vue&type=template&id=087275a1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_template_id_087275a1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPassword_vue_vue_type_template_id_087275a1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/config/Edit.vue":
/*!****************************************************!*\
  !*** ./Resources/assets/vue/views/config/Edit.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Edit_vue_vue_type_template_id_25549239___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=25549239& */ "./Resources/assets/vue/views/config/Edit.vue?vue&type=template&id=25549239&");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/config/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_25549239___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Edit_vue_vue_type_template_id_25549239___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/config/Edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/config/Edit.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./Resources/assets/vue/views/config/Edit.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/config/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/config/Edit.vue?vue&type=template&id=25549239&":
/*!***********************************************************************************!*\
  !*** ./Resources/assets/vue/views/config/Edit.vue?vue&type=template&id=25549239& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_25549239___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=template&id=25549239& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/config/Edit.vue?vue&type=template&id=25549239&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_25549239___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_25549239___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/config/Index.vue":
/*!*****************************************************!*\
  !*** ./Resources/assets/vue/views/config/Index.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_7215229a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=7215229a& */ "./Resources/assets/vue/views/config/Index.vue?vue&type=template&id=7215229a&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/config/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_7215229a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_7215229a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/config/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/config/Index.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./Resources/assets/vue/views/config/Index.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/config/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/config/Index.vue?vue&type=template&id=7215229a&":
/*!************************************************************************************!*\
  !*** ./Resources/assets/vue/views/config/Index.vue?vue&type=template&id=7215229a& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_7215229a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=7215229a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/config/Index.vue?vue&type=template&id=7215229a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_7215229a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_7215229a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/devices/Edit.vue":
/*!*****************************************************!*\
  !*** ./Resources/assets/vue/views/devices/Edit.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Edit_vue_vue_type_template_id_3eda48ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=3eda48ac& */ "./Resources/assets/vue/views/devices/Edit.vue?vue&type=template&id=3eda48ac&");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/devices/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_3eda48ac___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Edit_vue_vue_type_template_id_3eda48ac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/devices/Edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/devices/Edit.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./Resources/assets/vue/views/devices/Edit.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/devices/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/devices/Edit.vue?vue&type=template&id=3eda48ac&":
/*!************************************************************************************!*\
  !*** ./Resources/assets/vue/views/devices/Edit.vue?vue&type=template&id=3eda48ac& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_3eda48ac___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=template&id=3eda48ac& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/devices/Edit.vue?vue&type=template&id=3eda48ac&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_3eda48ac___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_3eda48ac___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/devices/Index.vue":
/*!******************************************************!*\
  !*** ./Resources/assets/vue/views/devices/Index.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_73805362___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=73805362& */ "./Resources/assets/vue/views/devices/Index.vue?vue&type=template&id=73805362&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/devices/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_73805362___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_73805362___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/devices/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/devices/Index.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./Resources/assets/vue/views/devices/Index.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/devices/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/devices/Index.vue?vue&type=template&id=73805362&":
/*!*************************************************************************************!*\
  !*** ./Resources/assets/vue/views/devices/Index.vue?vue&type=template&id=73805362& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_73805362___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=73805362& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/devices/Index.vue?vue&type=template&id=73805362&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_73805362___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_73805362___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/errors/NotFound.vue":
/*!********************************************************!*\
  !*** ./Resources/assets/vue/views/errors/NotFound.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotFound_vue_vue_type_template_id_33ce25d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotFound.vue?vue&type=template&id=33ce25d6& */ "./Resources/assets/vue/views/errors/NotFound.vue?vue&type=template&id=33ce25d6&");
/* harmony import */ var _NotFound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotFound.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/errors/NotFound.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NotFound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotFound_vue_vue_type_template_id_33ce25d6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NotFound_vue_vue_type_template_id_33ce25d6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/errors/NotFound.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/errors/NotFound.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./Resources/assets/vue/views/errors/NotFound.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotFound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NotFound.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/errors/NotFound.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotFound_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/errors/NotFound.vue?vue&type=template&id=33ce25d6&":
/*!***************************************************************************************!*\
  !*** ./Resources/assets/vue/views/errors/NotFound.vue?vue&type=template&id=33ce25d6& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NotFound_vue_vue_type_template_id_33ce25d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./NotFound.vue?vue&type=template&id=33ce25d6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/errors/NotFound.vue?vue&type=template&id=33ce25d6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NotFound_vue_vue_type_template_id_33ce25d6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NotFound_vue_vue_type_template_id_33ce25d6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/notifications/Edit.vue":
/*!***********************************************************!*\
  !*** ./Resources/assets/vue/views/notifications/Edit.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Edit_vue_vue_type_template_id_491c3f7f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=491c3f7f& */ "./Resources/assets/vue/views/notifications/Edit.vue?vue&type=template&id=491c3f7f&");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/notifications/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_491c3f7f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Edit_vue_vue_type_template_id_491c3f7f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/notifications/Edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/notifications/Edit.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./Resources/assets/vue/views/notifications/Edit.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/notifications/Edit.vue?vue&type=template&id=491c3f7f&":
/*!******************************************************************************************!*\
  !*** ./Resources/assets/vue/views/notifications/Edit.vue?vue&type=template&id=491c3f7f& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_491c3f7f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=template&id=491c3f7f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/Edit.vue?vue&type=template&id=491c3f7f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_491c3f7f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_491c3f7f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/notifications/Index.vue":
/*!************************************************************!*\
  !*** ./Resources/assets/vue/views/notifications/Index.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_1c236a2d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=1c236a2d& */ "./Resources/assets/vue/views/notifications/Index.vue?vue&type=template&id=1c236a2d&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/notifications/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_1c236a2d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_1c236a2d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/notifications/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/notifications/Index.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./Resources/assets/vue/views/notifications/Index.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/notifications/Index.vue?vue&type=template&id=1c236a2d&":
/*!*******************************************************************************************!*\
  !*** ./Resources/assets/vue/views/notifications/Index.vue?vue&type=template&id=1c236a2d& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_1c236a2d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=1c236a2d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/Index.vue?vue&type=template&id=1c236a2d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_1c236a2d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_1c236a2d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/notifications/segments/Edit.vue":
/*!********************************************************************!*\
  !*** ./Resources/assets/vue/views/notifications/segments/Edit.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Edit_vue_vue_type_template_id_5c89b234___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=5c89b234& */ "./Resources/assets/vue/views/notifications/segments/Edit.vue?vue&type=template&id=5c89b234&");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/notifications/segments/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_5c89b234___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Edit_vue_vue_type_template_id_5c89b234___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/notifications/segments/Edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/notifications/segments/Edit.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./Resources/assets/vue/views/notifications/segments/Edit.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/segments/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/notifications/segments/Edit.vue?vue&type=template&id=5c89b234&":
/*!***************************************************************************************************!*\
  !*** ./Resources/assets/vue/views/notifications/segments/Edit.vue?vue&type=template&id=5c89b234& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_5c89b234___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=template&id=5c89b234& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/segments/Edit.vue?vue&type=template&id=5c89b234&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_5c89b234___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_5c89b234___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/notifications/segments/Index.vue":
/*!*********************************************************************!*\
  !*** ./Resources/assets/vue/views/notifications/segments/Index.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_76644e18___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=76644e18& */ "./Resources/assets/vue/views/notifications/segments/Index.vue?vue&type=template&id=76644e18&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/notifications/segments/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_76644e18___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_76644e18___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/notifications/segments/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/notifications/segments/Index.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./Resources/assets/vue/views/notifications/segments/Index.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/segments/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/notifications/segments/Index.vue?vue&type=template&id=76644e18&":
/*!****************************************************************************************************!*\
  !*** ./Resources/assets/vue/views/notifications/segments/Index.vue?vue&type=template&id=76644e18& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_76644e18___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=76644e18& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/segments/Index.vue?vue&type=template&id=76644e18&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_76644e18___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_76644e18___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/partials/SideBar.vue":
/*!*********************************************************!*\
  !*** ./Resources/assets/vue/views/partials/SideBar.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SideBar_vue_vue_type_template_id_1943cc2d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SideBar.vue?vue&type=template&id=1943cc2d&scoped=true& */ "./Resources/assets/vue/views/partials/SideBar.vue?vue&type=template&id=1943cc2d&scoped=true&");
/* harmony import */ var _SideBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SideBar.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/partials/SideBar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _SideBar_vue_vue_type_style_index_0_id_1943cc2d_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SideBar.vue?vue&type=style&index=0&id=1943cc2d&scoped=true&lang=scss& */ "./Resources/assets/vue/views/partials/SideBar.vue?vue&type=style&index=0&id=1943cc2d&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SideBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SideBar_vue_vue_type_template_id_1943cc2d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SideBar_vue_vue_type_template_id_1943cc2d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1943cc2d",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/partials/SideBar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/partials/SideBar.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./Resources/assets/vue/views/partials/SideBar.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SideBar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/partials/SideBar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/partials/SideBar.vue?vue&type=style&index=0&id=1943cc2d&scoped=true&lang=scss&":
/*!*******************************************************************************************************************!*\
  !*** ./Resources/assets/vue/views/partials/SideBar.vue?vue&type=style&index=0&id=1943cc2d&scoped=true&lang=scss& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_style_index_0_id_1943cc2d_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-1-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/resolve-url-loader??ref--4-oneOf-1-2!../../../../../node_modules/sass-loader/lib/loader.js??ref--4-oneOf-1-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SideBar.vue?vue&type=style&index=0&id=1943cc2d&scoped=true&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/partials/SideBar.vue?vue&type=style&index=0&id=1943cc2d&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_style_index_0_id_1943cc2d_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_style_index_0_id_1943cc2d_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_style_index_0_id_1943cc2d_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_style_index_0_id_1943cc2d_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_4_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_4_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_4_oneOf_1_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_style_index_0_id_1943cc2d_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./Resources/assets/vue/views/partials/SideBar.vue?vue&type=template&id=1943cc2d&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./Resources/assets/vue/views/partials/SideBar.vue?vue&type=template&id=1943cc2d&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_template_id_1943cc2d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SideBar.vue?vue&type=template&id=1943cc2d&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/partials/SideBar.vue?vue&type=template&id=1943cc2d&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_template_id_1943cc2d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_template_id_1943cc2d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/plugins/Edit.vue":
/*!*****************************************************!*\
  !*** ./Resources/assets/vue/views/plugins/Edit.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Edit_vue_vue_type_template_id_d88d0772___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=d88d0772& */ "./Resources/assets/vue/views/plugins/Edit.vue?vue&type=template&id=d88d0772&");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/plugins/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_d88d0772___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Edit_vue_vue_type_template_id_d88d0772___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/plugins/Edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/plugins/Edit.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./Resources/assets/vue/views/plugins/Edit.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/plugins/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/plugins/Edit.vue?vue&type=template&id=d88d0772&":
/*!************************************************************************************!*\
  !*** ./Resources/assets/vue/views/plugins/Edit.vue?vue&type=template&id=d88d0772& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_d88d0772___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=template&id=d88d0772& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/plugins/Edit.vue?vue&type=template&id=d88d0772&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_d88d0772___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_d88d0772___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/plugins/Index.vue":
/*!******************************************************!*\
  !*** ./Resources/assets/vue/views/plugins/Index.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_252dc665___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=252dc665& */ "./Resources/assets/vue/views/plugins/Index.vue?vue&type=template&id=252dc665&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/plugins/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_252dc665___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_252dc665___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/plugins/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/plugins/Index.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./Resources/assets/vue/views/plugins/Index.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/plugins/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/plugins/Index.vue?vue&type=template&id=252dc665&":
/*!*************************************************************************************!*\
  !*** ./Resources/assets/vue/views/plugins/Index.vue?vue&type=template&id=252dc665& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_252dc665___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=252dc665& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/plugins/Index.vue?vue&type=template&id=252dc665&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_252dc665___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_252dc665___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/users/Edit.vue":
/*!***************************************************!*\
  !*** ./Resources/assets/vue/views/users/Edit.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Edit_vue_vue_type_template_id_ca293f42___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=ca293f42& */ "./Resources/assets/vue/views/users/Edit.vue?vue&type=template&id=ca293f42&");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/users/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_ca293f42___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Edit_vue_vue_type_template_id_ca293f42___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/users/Edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/users/Edit.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./Resources/assets/vue/views/users/Edit.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/users/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/users/Edit.vue?vue&type=template&id=ca293f42&":
/*!**********************************************************************************!*\
  !*** ./Resources/assets/vue/views/users/Edit.vue?vue&type=template&id=ca293f42& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_ca293f42___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=template&id=ca293f42& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/users/Edit.vue?vue&type=template&id=ca293f42&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_ca293f42___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_ca293f42___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/users/Index.vue":
/*!****************************************************!*\
  !*** ./Resources/assets/vue/views/users/Index.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_0438654d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=0438654d& */ "./Resources/assets/vue/views/users/Index.vue?vue&type=template&id=0438654d&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/users/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_0438654d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_0438654d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/users/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/users/Index.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./Resources/assets/vue/views/users/Index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/users/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/users/Index.vue?vue&type=template&id=0438654d&":
/*!***********************************************************************************!*\
  !*** ./Resources/assets/vue/views/users/Index.vue?vue&type=template&id=0438654d& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_0438654d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=0438654d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/users/Index.vue?vue&type=template&id=0438654d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_0438654d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_0438654d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/versions/Edit.vue":
/*!******************************************************!*\
  !*** ./Resources/assets/vue/views/versions/Edit.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Edit_vue_vue_type_template_id_835a3f00___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=835a3f00& */ "./Resources/assets/vue/views/versions/Edit.vue?vue&type=template&id=835a3f00&");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/versions/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_835a3f00___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Edit_vue_vue_type_template_id_835a3f00___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/versions/Edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/versions/Edit.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./Resources/assets/vue/views/versions/Edit.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/versions/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/versions/Edit.vue?vue&type=template&id=835a3f00&":
/*!*************************************************************************************!*\
  !*** ./Resources/assets/vue/views/versions/Edit.vue?vue&type=template&id=835a3f00& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_835a3f00___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=template&id=835a3f00& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/versions/Edit.vue?vue&type=template&id=835a3f00&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_835a3f00___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_835a3f00___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./Resources/assets/vue/views/versions/Index.vue":
/*!*******************************************************!*\
  !*** ./Resources/assets/vue/views/versions/Index.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_4dc0e94c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=4dc0e94c& */ "./Resources/assets/vue/views/versions/Index.vue?vue&type=template&id=4dc0e94c&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/versions/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_4dc0e94c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_4dc0e94c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/versions/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/versions/Index.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./Resources/assets/vue/views/versions/Index.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/versions/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/versions/Index.vue?vue&type=template&id=4dc0e94c&":
/*!**************************************************************************************!*\
  !*** ./Resources/assets/vue/views/versions/Index.vue?vue&type=template&id=4dc0e94c& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_4dc0e94c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=4dc0e94c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/versions/Index.vue?vue&type=template&id=4dc0e94c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_4dc0e94c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_4dc0e94c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/App.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/App.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _partials_SideBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./partials/SideBar */ "./Resources/assets/vue/views/partials/SideBar.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    SideBar: _partials_SideBar__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      authenticated: this.$oauth.isAuthenticated(),
      appMounted: false
    };
  },
  created: function created() {
    console.log('App.vue created');
  },
  mounted: function mounted() {
    var _this = this;

    Events.$on('users:authenticated', function (user) {
      _this.$auth.init().then(function () {
        _this.authenticated = true;
      });
    });
  },
  computed: {
    appReady: function appReady() {
      if (this.authenticated) {
        return this.$auth.user !== null;
      } else {
        return this.appMounted;
      }
    }
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    next();
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/Dashboard.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/Dashboard.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {//
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    next();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/applications/Edit.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/applications/Edit.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    id: {
      required: false,
      "default": null
    }
  },
  data: function data() {
    return {
      item: {}
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    if (!to.params.id) {
      next();
      return;
    }

    axios.get(url('applications/:id', {
      id: to.params.id
    })).then(function (application) {
      next(function (vm) {
        vm.item = application;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/applications/Index.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/applications/Index.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      items: null,
      sorting: {
        column: 'name',
        order: 'asc'
      }
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    axios.get(url('applications')).then(function (_ref) {
      var applications = _ref.data;
      next(function (vm) {
        vm.items = applications;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/applications/Select.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/applications/Select.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.reduce */ "./node_modules/core-js/modules/es.array.reduce.js");
/* harmony import */ var core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.assign */ "./node_modules/core-js/modules/es.object.assign.js");
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_2__);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {//
  },
  data: function data() {
    return {
      items: null
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    axios.get(url('applications')).then(function (_ref) {
      var applications = _ref.data.data;
      next(function (vm) {
        vm.items = applications.reduce(function (result, application) {
          var customer = result[application.customer.id];

          if (customer === undefined) {
            customer = Object.assign(application.customer, {
              applications: []
            });
          }

          customer.applications.push(application);
          result[application.customer.id] = customer;
          return result;
        }, []).filter(function (customer) {
          return customer !== undefined;
        });
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {
    select: function select(version) {
      this.$applicationService.setVersion(version);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/ForgotPassword.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/authentication/ForgotPassword.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      user: {},
      loading: false
    };
  },
  methods: {
    success: function success() {
      this.$message({
        message: 'U heeft een e-mail ontvangen om uw wachtwoord te resetten',
        type: 'success'
      });
      this.$refs.form.reset();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/Login.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/authentication/Login.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1__);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      user: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    authenticated: function authenticated(response) {
      this.$oauth.storeSession(response);
      this.$router.replace({
        name: 'dashboard'
      });
      Events.$emit('users:authenticated', response.user);
    },
    error: function error(_error) {
      this.user.password = null;
      var message = 'Er is iets mis gegaan, probeer het opnieuw';

      if (_error.status === 422) {
        message = 'De ingevoerde gegevens zijn onjuist';
      }
    },
    resetPassword: function resetPassword() {
      this.$router.push({
        name: 'password.forgot'
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/ResetPassword.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/authentication/ResetPassword.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1__);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    token: {
      type: String,
      required: false,
      "default": null
    }
  },
  data: function data() {
    return {
      action: null,
      loading: false,
      appPasswordChanged: false
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    var _this = this;

    axios.get(this.route('/users/password/:token', {
      token: to.params.token
    })).then(function (response) {
      next(function (vm) {
        vm.action = response.data.data;
      });
    })["catch"](function (error) {
      next(function (vm) {
        vm.$router.replace({
          name: 'login'
        });

        _this.$message({
          message: error.response.data.message,
          type: 'error'
        });
      });
    });
  },
  methods: {
    login: function login(response) {
      if (response.access_token) {
        this.$oauth.storeSession(response);
        this.$oauth.addAuthHeaders();
        this.$router.push('dashboard');
        this.$message({
          message: 'Uw wachtwoord is gewijzigd',
          type: 'success'
        });
        Events.$emit('users:authenticated');
      } else {
        this.appPasswordChanged = true;
        this.$refs.form.reset();
      }
    },
    error: function error(_error) {
      this.loading = false;
      this.$message({
        message: _error.message,
        type: 'error'
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/config/Edit.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/config/Edit.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    id: {
      required: false,
      "default": null
    }
  },
  data: function data() {
    return {
      item: {}
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    if (!to.params.id) {
      next();
      return;
    }

    axios.get(url('config/:id', {
      id: to.params.id
    })).then(function (item) {
      next(function (vm) {
        vm.item = item;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/config/Index.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/config/Index.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      items: null,
      sorting: {
        column: 'name',
        order: 'asc'
      }
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    axios.get(url('versions')).then(function (_ref) {
      var plugins = _ref.data.data;
      next(function (vm) {
        vm.items = plugins;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/devices/Edit.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/devices/Edit.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    id: {
      required: false,
      "default": null
    }
  },
  data: function data() {
    return {
      item: {}
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    if (!to.params.id) {
      next();
      return;
    }

    axios.get(url('users/:id', {
      id: to.params.id
    })).then(function (application) {
      next(function (vm) {
        vm.item = application;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/devices/Index.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/devices/Index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      items: null,
      sorting: {
        column: 'name',
        order: 'asc'
      }
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    axios.get(url('applications')).then(function (_ref) {
      var applications = _ref.data;
      next(function (vm) {
        vm.items = applications;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/errors/NotFound.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/errors/NotFound.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/Edit.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/notifications/Edit.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    id: {
      required: false,
      "default": null
    }
  },
  data: function data() {
    return {
      item: {}
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    if (!to.params.id) {
      next();
      return;
    }

    axios.get(url('notifications/:id', {
      id: to.params.id
    })).then(function (item) {
      next(function (vm) {
        vm.item = item;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/Index.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/notifications/Index.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      items: null,
      sorting: {
        column: 'name',
        order: 'asc'
      }
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    axios.get(url('versions')).then(function (_ref) {
      var plugins = _ref.data.data;
      next(function (vm) {
        vm.items = plugins;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/segments/Edit.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/notifications/segments/Edit.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    id: {
      required: false,
      "default": null
    }
  },
  data: function data() {
    return {
      item: {}
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    if (!to.params.id) {
      next();
      return;
    }

    axios.get(url('notifications/segments/:id', {
      id: to.params.id
    })).then(function (item) {
      next(function (vm) {
        vm.item = item;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/segments/Index.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/notifications/segments/Index.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      items: null,
      sorting: {
        column: 'name',
        order: 'asc'
      }
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    axios.get(url('versions')).then(function (_ref) {
      var plugins = _ref.data.data;
      next(function (vm) {
        vm.items = plugins;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/partials/SideBar.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/partials/SideBar.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.includes */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.sort */ "./node_modules/core-js/modules/es.array.sort.js");
/* harmony import */ var core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.includes */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _routes_sidebar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../routes/sidebar */ "./Resources/assets/vue/routes/sidebar.js");






//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {},
  data: function data() {
    return {
      routes: _routes_sidebar__WEBPACK_IMPORTED_MODULE_6__["default"]
    };
  },
  computed: {
    availableRoutes: function availableRoutes() {
      var _this = this;

      var routes = this.routes.filter(function (item) {
        return _this.$auth.userHasRole(item.role);
      }).map(function (item) {
        if (item.children !== undefined) {
          item.children = item.children.filter(function (subItem) {
            return _this.$auth.userHasRole(subItem.role);
          });
        }

        return item;
      });
      return routes.sort(function (first, second) {
        if (first.text < second.text) {
          return -1;
        }

        if (first.text > second.text) {
          return 1;
        }

        return 0;
      });
    }
  },
  methods: {
    /**
     * Determine whether the current route has an active subroute
     */
    routerLinkActive: function routerLinkActive(route) {
      if (this.$router.currentRoute.name === null) {
        return false;
      } // Also open the submenu


      if (this.$router.currentRoute.name.includes(route.name)) {
        if (route.children !== undefined && route.children.length > 0 && !route.submenuOpen) {
          route.submenuOpen = true;
        }

        return true;
      }

      return false;
    },

    /**
     * Determine whether the current route is active
     */
    routerLinkExactActive: function routerLinkExactActive(route) {
      if (this.$router.currentRoute.name === null) {
        return false;
      }

      return this.$router.currentRoute.name === route.name;
    },
    navigate: function navigate(route) {
      this.$router.push({
        name: route.name
      });

      if (route.children !== undefined && route.children.length > 0 && !route.submenuOpen) {
        route.submenuOpen = true;
      }

      this.sideBarOpen = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/plugins/Edit.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/plugins/Edit.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    id: {
      required: false,
      "default": null
    }
  },
  data: function data() {
    return {
      item: {}
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    axios.get(url('plugins/:id', {
      id: to.params.id
    })).then(function (item) {
      next(function (vm) {
        vm.item = item;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/plugins/Index.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/plugins/Index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      items: null,
      sorting: {
        column: 'name',
        order: 'asc'
      }
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    axios.get(url('plugins')).then(function (_ref) {
      var plugins = _ref.data.data;
      next(function (vm) {
        vm.items = plugins;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/users/Edit.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/users/Edit.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    id: {
      required: false,
      "default": null
    }
  },
  data: function data() {
    return {
      item: {}
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    if (!to.params.id) {
      next();
      return;
    }

    axios.get(url('users/:id', {
      id: to.params.id
    })).then(function (application) {
      next(function (vm) {
        vm.item = application;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/users/Index.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/users/Index.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      items: null,
      sorting: {
        column: 'name',
        order: 'asc'
      }
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    axios.get(url('applications')).then(function (_ref) {
      var applications = _ref.data;
      next(function (vm) {
        vm.items = applications;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/versions/Edit.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/versions/Edit.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    id: {
      required: false,
      "default": null
    }
  },
  data: function data() {
    return {
      item: {}
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    if (!to.params.id) {
      next();
      return;
    }

    axios.get(url('versions/:id', {
      id: to.params.id
    })).then(function (item) {
      next(function (vm) {
        vm.item = item;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/versions/Index.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/versions/Index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      items: null,
      sorting: {
        column: 'name',
        order: 'asc'
      }
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    axios.get(url('versions')).then(function (_ref) {
      var plugins = _ref.data.data;
      next(function (vm) {
        vm.items = plugins;
      });
    })["catch"](function (error) {
      next();
    });
  },
  methods: {}
});

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/applications/Select.vue?vue&type=style&index=0&id=5a065e6a&scoped=true&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader??ref--4-oneOf-1-2!./node_modules/sass-loader/lib/loader.js??ref--4-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/applications/Select.vue?vue&type=style&index=0&id=5a065e6a&scoped=true&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/partials/SideBar.vue?vue&type=style&index=0&id=1943cc2d&scoped=true&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader??ref--4-oneOf-1-2!./node_modules/sass-loader/lib/loader.js??ref--4-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/partials/SideBar.vue?vue&type=style&index=0&id=1943cc2d&scoped=true&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/App.vue?vue&type=template&id=0e091f3a&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/App.vue?vue&type=template&id=0e091f3a& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.authenticated
        ? [
            _c("header"),
            _vm._v(" "),
            _c("main", [
              _c("aside", [_c("side-bar")], 1),
              _vm._v(" "),
              _c("main", [
                _c("main", [
                  _c("div", { staticClass: "container-fluid" }, [
                    _c("div", { staticClass: "row" }, [
                      _c(
                        "div",
                        { staticClass: "col-sm-12" },
                        [_c("router-view")],
                        1
                      )
                    ])
                  ])
                ]),
                _vm._v(" "),
                _c("footer")
              ])
            ])
          ]
        : [
            _c("main", [
              _c("div", { staticClass: "container-fluid" }, [
                _c("div", { staticClass: "row" }, [
                  _c(
                    "div",
                    { staticClass: "col-sm-12" },
                    [_c("router-view")],
                    1
                  )
                ])
              ])
            ])
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/Dashboard.vue?vue&type=template&id=c1ebb054&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/Dashboard.vue?vue&type=template&id=c1ebb054& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-sm-12" }, [
        _c("div", { staticClass: "card" }, [
          _c("div", { staticClass: "card-header" }, [
            _vm._v("\n        Card title\n      ")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "card-body" })
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/applications/Edit.vue?vue&type=template&id=e8dac410&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/applications/Edit.vue?vue&type=template&id=e8dac410& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _c("vue-form", {
          attrs: { url: _vm.url("applications"), model: _vm.item },
          on: {
            "submit:success": _vm.submitSuccess,
            "submit:error": _vm.submitError
          },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(ref) {
                var form = ref.form
                var model = ref.model
                return [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "loading",
                          rawName: "v-loading",
                          value: form.submitting,
                          expression: "form.submitting"
                        }
                      ],
                      staticClass: "card",
                      attrs: {
                        "element-loading-background": "rgba(248,250,252,0.6)"
                      }
                    },
                    [
                      _c("div", { staticClass: "card-header" }, [
                        _vm._v(
                          "Applicatie " +
                            _vm._s(_vm.id ? "bewerken" : "toevoegen")
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "card-body" }, [
                        _c("div", { staticClass: "form-row" }, [
                          _c("div", { staticClass: "col-sm-12" })
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "card-footer has-buttons" },
                        [
                          _c(
                            "el-button",
                            {
                              attrs: {
                                type: "primary",
                                "native-type": "submit"
                              }
                            },
                            [_vm._v("Opslaan")]
                          )
                        ],
                        1
                      )
                    ]
                  )
                ]
              }
            }
          ])
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/applications/Index.vue?vue&type=template&id=2878dad4&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/applications/Index.vue?vue&type=template&id=2878dad4& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _vm.items
          ? [
              _c("div", { staticClass: "card" }, [
                _c(
                  "div",
                  { staticClass: "card-table" },
                  [
                    _c("vue-table", {
                      attrs: {
                        url: "vue.finances",
                        "can-delete": false,
                        sorting: _vm.sorting,
                        "initial-data": _vm.items
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "header",
                            fn: function(ref) {
                              var sorting = ref.sorting
                              var clickHandler = ref.clickHandler
                              return [
                                _c("vue-table-header", {
                                  attrs: {
                                    sorting: sorting,
                                    label: "Naam",
                                    identifier: "name"
                                  },
                                  on: { click: clickHandler }
                                })
                              ]
                            }
                          },
                          {
                            key: "row",
                            fn: function(ref) {
                              var row = ref.row
                              return [
                                _c("vue-table-column", {
                                  attrs: {
                                    row: row,
                                    property: "name",
                                    "router-link": "",
                                    to: {
                                      name: "applications.edit",
                                      params: { id: row.id }
                                    }
                                  }
                                })
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        2747209652
                      )
                    })
                  ],
                  1
                )
              ])
            ]
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/applications/Select.vue?vue&type=template&id=5a065e6a&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/applications/Select.vue?vue&type=template&id=5a065e6a&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _vm.items
      ? _c("div", { staticClass: "col-sm-12" }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _vm._v("Selecteer een applicatie")
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "card-body" },
              _vm._l(_vm.items, function(company) {
                return _c("div", { staticClass: "row" }, [
                  _c(
                    "div",
                    { staticClass: "col-sm-12" },
                    [
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "col-sm-12" }, [
                          _c("h1", {
                            domProps: {
                              innerHTML: _vm._s(company.company_name)
                            }
                          })
                        ])
                      ]),
                      _vm._v(" "),
                      _vm._l(company.applications, function(application) {
                        return _vm._l(
                          application.application_versions,
                          function(version) {
                            return _c(
                              "div",
                              {
                                staticClass: "row",
                                on: {
                                  click: function($event) {
                                    return _vm.select(version)
                                  }
                                }
                              },
                              [
                                _c("div", { staticClass: "col-auto" }, [
                                  _c("h2", {
                                    domProps: {
                                      innerHTML: _vm._s(application.name)
                                    }
                                  })
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "col" }, [
                                  _c("span", {
                                    domProps: {
                                      innerHTML: _vm._s(application.label)
                                    }
                                  })
                                ])
                              ]
                            )
                          }
                        )
                      })
                    ],
                    2
                  )
                ])
              }),
              0
            )
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/ForgotPassword.vue?vue&type=template&id=5805c757&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/authentication/ForgotPassword.vue?vue&type=template&id=5805c757& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container-fluid" }, [
    _c("div", { staticClass: "row" }, [
      _c(
        "div",
        { staticClass: "col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4" },
        [
          _c("vue-form", {
            ref: "form",
            attrs: { url: _vm.$url("auth/password"), model: _vm.user },
            on: {
              "submit:success": _vm.success,
              "submit:error": _vm.submitError
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var form = ref.form
                  var model = ref.model
                  return [
                    _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "loading",
                            rawName: "v-loading",
                            value: form.submitting,
                            expression: "form.submitting"
                          }
                        ],
                        staticClass: "card",
                        attrs: {
                          "element-loading-background": "rgba(248,250,252,0.6)"
                        }
                      },
                      [
                        _c("div", { staticClass: "card-header" }, [
                          _vm._v(
                            "\n                            Wachtwoord vergeten\n                        "
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "card-body" }, [
                          _c("div", { staticClass: "form-row" }, [
                            _c("div", { staticClass: "col-sm-12" }, [
                              _c(
                                "div",
                                { staticClass: "form-group" },
                                [
                                  _c("input-text", {
                                    attrs: {
                                      name: "email",
                                      placeholder: "E-mailadres",
                                      model: model,
                                      form: form
                                    }
                                  })
                                ],
                                1
                              )
                            ])
                          ])
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "card-footer has-buttons" },
                          [
                            _c(
                              "el-button",
                              {
                                attrs: {
                                  type: "primary",
                                  "native-type": "submit"
                                }
                              },
                              [
                                _vm._v(
                                  "\n                                Wachtwoord resetten\n                            "
                                )
                              ]
                            )
                          ],
                          1
                        )
                      ]
                    )
                  ]
                }
              }
            ])
          })
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/Login.vue?vue&type=template&id=7a25e100&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/authentication/Login.vue?vue&type=template&id=7a25e100& ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container-fluid" }, [
    _c("div", { staticClass: "row" }, [
      _c(
        "div",
        { staticClass: "col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4" },
        [
          _c("vue-form", {
            attrs: { model: _vm.user, url: _vm.$url("auth/login") },
            on: {
              "submit:success": _vm.authenticated,
              "submit:error": _vm.error
            },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(ref) {
                  var form = ref.form
                  var model = ref.model
                  return [
                    _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "loading",
                            rawName: "v-loading",
                            value: form.submitting,
                            expression: "form.submitting"
                          }
                        ],
                        staticClass: "card",
                        attrs: {
                          "element-loading-background": "rgba(248,250,252,0.6)"
                        }
                      },
                      [
                        _c("div", { staticClass: "card-header" }, [
                          _vm._v(
                            "\n                            Inloggen\n                        "
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "card-body" }, [
                          _c("div", { staticClass: "form-row" }, [
                            _c(
                              "div",
                              { staticClass: "col-sm-12" },
                              [
                                _c("input-text", {
                                  attrs: {
                                    name: "email",
                                    label: "E-mailadres",
                                    placeholder: "E-mailadres",
                                    model: model,
                                    form: form
                                  }
                                })
                              ],
                              1
                            )
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "form-row" }, [
                            _c(
                              "div",
                              { staticClass: "col-sm-12" },
                              [
                                _c("input-password", {
                                  attrs: {
                                    name: "password",
                                    label: "Wachtwoord",
                                    placeholder: "Wachtwoord",
                                    model: model,
                                    form: form
                                  }
                                })
                              ],
                              1
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "card-footer" }, [
                          _c("div", { staticClass: "row" }, [
                            _c(
                              "div",
                              { staticClass: "col" },
                              [
                                _c(
                                  "el-button",
                                  {
                                    attrs: {
                                      type: "primary",
                                      "native-type": "submit"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                        Inloggen\n                                    "
                                    )
                                  ]
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "col-auto" },
                              [
                                _c(
                                  "el-button",
                                  {
                                    attrs: { type: "text" },
                                    on: {
                                      click: function($event) {
                                        return _vm.resetPassword()
                                      }
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                        Wachtwoord vergeten\n                                    "
                                    )
                                  ]
                                )
                              ],
                              1
                            )
                          ])
                        ])
                      ]
                    )
                  ]
                }
              }
            ])
          })
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/ResetPassword.vue?vue&type=template&id=087275a1&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/authentication/ResetPassword.vue?vue&type=template&id=087275a1& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container-fluid" }, [
    _c("div", { staticClass: "row" }, [
      _vm.action
        ? _c(
            "div",
            {
              staticClass: "col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4"
            },
            [
              _c("vue-form", {
                ref: "form",
                attrs: {
                  url: _vm.$url("vue.password.reset"),
                  model: _vm.action
                },
                on: {
                  "submit:success": _vm.login,
                  "submit:error": _vm.submitError
                },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "default",
                      fn: function(ref) {
                        var form = ref.form
                        var model = ref.model
                        return [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "loading",
                                  rawName: "v-loading",
                                  value: form.submitting,
                                  expression: "form.submitting"
                                }
                              ],
                              staticClass: "card",
                              attrs: {
                                "element-loading-background":
                                  "rgba(248,250,252,0.6)"
                              }
                            },
                            [
                              _c("div", { staticClass: "card-header" }, [
                                _vm._v(
                                  "\n              Wachtwoord resetten\n            "
                                )
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "card-body" },
                                [
                                  _vm.appPasswordChanged
                                    ? _c("el-alert", {
                                        attrs: {
                                          title:
                                            "Uw wachtwoord is gewijzigd, u kunt nu inloggen in de app",
                                          type: "success",
                                          "show-icon": ""
                                        }
                                      })
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "form-row" }, [
                                    _c(
                                      "div",
                                      { staticClass: "col-sm-12" },
                                      [
                                        _c("input-password", {
                                          attrs: {
                                            name: "password",
                                            placeholder: "Wachtwoord",
                                            model: model,
                                            form: form
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "form-row" }, [
                                    _c(
                                      "div",
                                      { staticClass: "col-sm-12" },
                                      [
                                        _c("input-password", {
                                          attrs: {
                                            name: "password_confirmation",
                                            placeholder:
                                              "Wachtwoord bevestigen",
                                            model: model,
                                            form: form
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  ])
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "card-footer has-buttons" },
                                [
                                  _c(
                                    "el-button",
                                    {
                                      attrs: {
                                        type: "primary",
                                        "native-type": "submit"
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                Wachtwoord resetten\n              "
                                      )
                                    ]
                                  )
                                ],
                                1
                              )
                            ]
                          )
                        ]
                      }
                    }
                  ],
                  null,
                  false,
                  1728206605
                )
              })
            ],
            1
          )
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/config/Edit.vue?vue&type=template&id=25549239&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/config/Edit.vue?vue&type=template&id=25549239& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _c("vue-form", {
          attrs: { url: _vm.url("config"), model: _vm.item },
          on: {
            "submit:success": _vm.submitSuccess,
            "submit:error": _vm.submitError
          },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(ref) {
                var form = ref.form
                var model = ref.model
                return [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "loading",
                          rawName: "v-loading",
                          value: form.submitting,
                          expression: "form.submitting"
                        }
                      ],
                      staticClass: "card",
                      attrs: {
                        "element-loading-background": "rgba(248,250,252,0.6)"
                      }
                    },
                    [
                      _c("div", { staticClass: "card-header" }, [
                        _vm._v(
                          "Remote config " +
                            _vm._s(_vm.id ? "bewerken" : "toevoegen")
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "card-body" }, [
                        _c("div", { staticClass: "form-row" }, [
                          _c("div", { staticClass: "col-sm-12" })
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "card-footer has-buttons" },
                        [
                          _c(
                            "el-button",
                            {
                              attrs: {
                                type: "primary",
                                "native-type": "submit"
                              }
                            },
                            [_vm._v("Opslaan")]
                          )
                        ],
                        1
                      )
                    ]
                  )
                ]
              }
            }
          ])
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/config/Index.vue?vue&type=template&id=7215229a&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/config/Index.vue?vue&type=template&id=7215229a& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _vm.items
          ? [
              _c("div", { staticClass: "card" }, [
                _c(
                  "div",
                  { staticClass: "card-table" },
                  [
                    _c("vue-table", {
                      attrs: {
                        url: "vue.finances",
                        "can-delete": false,
                        sorting: _vm.sorting,
                        "initial-data": _vm.items
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "header",
                            fn: function(ref) {
                              var sorting = ref.sorting
                              var clickHandler = ref.clickHandler
                              return [
                                _c("vue-table-header", {
                                  attrs: {
                                    sorting: sorting,
                                    label: "Naam",
                                    identifier: "plugin.name"
                                  },
                                  on: { click: clickHandler }
                                }),
                                _vm._v(" "),
                                _c("vue-table-header", {
                                  attrs: {
                                    sorting: sorting,
                                    label: "Actief",
                                    identifier: "active"
                                  },
                                  on: { click: clickHandler }
                                })
                              ]
                            }
                          },
                          {
                            key: "row",
                            fn: function(ref) {
                              var row = ref.row
                              return [
                                _c("vue-table-column", {
                                  attrs: {
                                    row: row,
                                    property: "plugin.name",
                                    "router-link": "",
                                    to: {
                                      name: "versions.edit",
                                      params: { id: row.id }
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "vue-table-column",
                                  {
                                    attrs: {
                                      row: row,
                                      property: "active",
                                      type: "custom"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(row.active ? "Ja" : "Nee") +
                                        "\n                            "
                                    )
                                  ]
                                )
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        1525961468
                      )
                    })
                  ],
                  1
                )
              ])
            ]
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/devices/Edit.vue?vue&type=template&id=3eda48ac&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/devices/Edit.vue?vue&type=template&id=3eda48ac& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _c("vue-form", {
          attrs: { url: _vm.url("users"), model: _vm.item },
          on: {
            "submit:success": _vm.submitSuccess,
            "submit:error": _vm.submitError
          },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(ref) {
                var form = ref.form
                var model = ref.model
                return [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "loading",
                          rawName: "v-loading",
                          value: form.submitting,
                          expression: "form.submitting"
                        }
                      ],
                      staticClass: "card",
                      attrs: {
                        "element-loading-background": "rgba(248,250,252,0.6)"
                      }
                    },
                    [
                      _c("div", { staticClass: "card-header" }, [
                        _vm._v(
                          "Gebruiker " +
                            _vm._s(_vm.id ? "bewerken" : "toevoegen")
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "card-body" }, [
                        _c("div", { staticClass: "form-row" }, [
                          _c("div", { staticClass: "col-sm-12" })
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "card-footer has-buttons" },
                        [
                          _c(
                            "el-button",
                            {
                              attrs: {
                                type: "primary",
                                "native-type": "submit"
                              }
                            },
                            [_vm._v("Opslaan")]
                          )
                        ],
                        1
                      )
                    ]
                  )
                ]
              }
            }
          ])
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/devices/Index.vue?vue&type=template&id=73805362&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/devices/Index.vue?vue&type=template&id=73805362& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _vm.items
          ? [
              _c("div", { staticClass: "card" }, [
                _c(
                  "div",
                  { staticClass: "card-table" },
                  [
                    _c("vue-table", {
                      attrs: {
                        url: "vue.finances",
                        "can-delete": false,
                        sorting: _vm.sorting,
                        "initial-data": _vm.items
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "header",
                            fn: function(ref) {
                              var sorting = ref.sorting
                              var clickHandler = ref.clickHandler
                              return [
                                _c("vue-table-header", {
                                  attrs: {
                                    sorting: sorting,
                                    label: "Naam",
                                    identifier: "name"
                                  },
                                  on: { click: clickHandler }
                                })
                              ]
                            }
                          },
                          {
                            key: "row",
                            fn: function(ref) {
                              var row = ref.row
                              return [
                                _c("vue-table-column", {
                                  attrs: {
                                    row: row,
                                    property: "name",
                                    "router-link": "",
                                    to: {
                                      name: "applications.edit",
                                      params: { id: row.id }
                                    }
                                  }
                                })
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        2747209652
                      )
                    })
                  ],
                  1
                )
              ])
            ]
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/errors/NotFound.vue?vue&type=template&id=33ce25d6&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/errors/NotFound.vue?vue&type=template&id=33ce25d6& ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_vm._v("\n  Whoops, 404.\n")])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/Edit.vue?vue&type=template&id=491c3f7f&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/notifications/Edit.vue?vue&type=template&id=491c3f7f& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _c("vue-form", {
          attrs: { url: _vm.url("notifications"), model: _vm.item },
          on: {
            "submit:success": _vm.submitSuccess,
            "submit:error": _vm.submitError
          },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(ref) {
                var form = ref.form
                var model = ref.model
                return [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "loading",
                          rawName: "v-loading",
                          value: form.submitting,
                          expression: "form.submitting"
                        }
                      ],
                      staticClass: "card",
                      attrs: {
                        "element-loading-background": "rgba(248,250,252,0.6)"
                      }
                    },
                    [
                      _c("div", { staticClass: "card-header" }, [
                        _vm._v(
                          "Push notificaties " +
                            _vm._s(_vm.id ? "bewerken" : "toevoegen")
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "card-body" }, [
                        _c("div", { staticClass: "form-row" }, [
                          _c("div", { staticClass: "col-sm-12" })
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "card-footer has-buttons" },
                        [
                          _c(
                            "el-button",
                            {
                              attrs: {
                                type: "primary",
                                "native-type": "submit"
                              }
                            },
                            [_vm._v("Opslaan")]
                          )
                        ],
                        1
                      )
                    ]
                  )
                ]
              }
            }
          ])
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/Index.vue?vue&type=template&id=1c236a2d&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/notifications/Index.vue?vue&type=template&id=1c236a2d& ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _vm.items
          ? [
              _c("div", { staticClass: "card" }, [
                _c(
                  "div",
                  { staticClass: "card-table" },
                  [
                    _c("vue-table", {
                      attrs: {
                        url: "vue.finances",
                        "can-delete": false,
                        sorting: _vm.sorting,
                        "initial-data": _vm.items
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "header",
                            fn: function(ref) {
                              var sorting = ref.sorting
                              var clickHandler = ref.clickHandler
                              return [
                                _c("vue-table-header", {
                                  attrs: {
                                    sorting: sorting,
                                    label: "Naam",
                                    identifier: "plugin.name"
                                  },
                                  on: { click: clickHandler }
                                }),
                                _vm._v(" "),
                                _c("vue-table-header", {
                                  attrs: {
                                    sorting: sorting,
                                    label: "Actief",
                                    identifier: "active"
                                  },
                                  on: { click: clickHandler }
                                })
                              ]
                            }
                          },
                          {
                            key: "row",
                            fn: function(ref) {
                              var row = ref.row
                              return [
                                _c("vue-table-column", {
                                  attrs: {
                                    row: row,
                                    property: "plugin.name",
                                    "router-link": "",
                                    to: {
                                      name: "versions.edit",
                                      params: { id: row.id }
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "vue-table-column",
                                  {
                                    attrs: {
                                      row: row,
                                      property: "active",
                                      type: "custom"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(row.active ? "Ja" : "Nee") +
                                        "\n                            "
                                    )
                                  ]
                                )
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        1525961468
                      )
                    })
                  ],
                  1
                )
              ])
            ]
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/segments/Edit.vue?vue&type=template&id=5c89b234&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/notifications/segments/Edit.vue?vue&type=template&id=5c89b234& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _c("vue-form", {
          attrs: { url: _vm.url("notifications/segments"), model: _vm.item },
          on: {
            "submit:success": _vm.submitSuccess,
            "submit:error": _vm.submitError
          },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(ref) {
                var form = ref.form
                var model = ref.model
                return [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "loading",
                          rawName: "v-loading",
                          value: form.submitting,
                          expression: "form.submitting"
                        }
                      ],
                      staticClass: "card",
                      attrs: {
                        "element-loading-background": "rgba(248,250,252,0.6)"
                      }
                    },
                    [
                      _c("div", { staticClass: "card-header" }, [
                        _vm._v(
                          "Segment " + _vm._s(_vm.id ? "bewerken" : "toevoegen")
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "card-body" }, [
                        _c("div", { staticClass: "form-row" }, [
                          _c("div", { staticClass: "col-sm-12" })
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "card-footer has-buttons" },
                        [
                          _c(
                            "el-button",
                            {
                              attrs: {
                                type: "primary",
                                "native-type": "submit"
                              }
                            },
                            [_vm._v("Opslaan")]
                          )
                        ],
                        1
                      )
                    ]
                  )
                ]
              }
            }
          ])
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/notifications/segments/Index.vue?vue&type=template&id=76644e18&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/notifications/segments/Index.vue?vue&type=template&id=76644e18& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _vm.items
          ? [
              _c("div", { staticClass: "card" }, [
                _c(
                  "div",
                  { staticClass: "card-table" },
                  [
                    _c("vue-table", {
                      attrs: {
                        url: "vue.finances",
                        "can-delete": false,
                        sorting: _vm.sorting,
                        "initial-data": _vm.items
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "header",
                            fn: function(ref) {
                              var sorting = ref.sorting
                              var clickHandler = ref.clickHandler
                              return [
                                _c("vue-table-header", {
                                  attrs: {
                                    sorting: sorting,
                                    label: "Naam",
                                    identifier: "plugin.name"
                                  },
                                  on: { click: clickHandler }
                                }),
                                _vm._v(" "),
                                _c("vue-table-header", {
                                  attrs: {
                                    sorting: sorting,
                                    label: "Actief",
                                    identifier: "active"
                                  },
                                  on: { click: clickHandler }
                                })
                              ]
                            }
                          },
                          {
                            key: "row",
                            fn: function(ref) {
                              var row = ref.row
                              return [
                                _c("vue-table-column", {
                                  attrs: {
                                    row: row,
                                    property: "plugin.name",
                                    "router-link": "",
                                    to: {
                                      name: "versions.edit",
                                      params: { id: row.id }
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "vue-table-column",
                                  {
                                    attrs: {
                                      row: row,
                                      property: "active",
                                      type: "custom"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(row.active ? "Ja" : "Nee") +
                                        "\n                            "
                                    )
                                  ]
                                )
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        1525961468
                      )
                    })
                  ],
                  1
                )
              ])
            ]
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/partials/SideBar.vue?vue&type=template&id=1943cc2d&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/partials/SideBar.vue?vue&type=template&id=1943cc2d&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container-fluid" }, [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-sm-12" }, [
        _c(
          "ul",
          _vm._l(_vm.availableRoutes, function(route) {
            return _c(
              "li",
              {
                directives: [
                  {
                    name: "user-has-role",
                    rawName: "v-user-has-role",
                    value: route.role,
                    expression: "route.role"
                  }
                ],
                key: route.name
              },
              [
                _c(
                  "div",
                  {
                    class: {
                      "router-link-active": _vm.routerLinkActive(route),
                      "router-link-exact-active": _vm.routerLinkExactActive(
                        route
                      )
                    }
                  },
                  [
                    _c(
                      "span",
                      {
                        on: {
                          click: function($event) {
                            return _vm.navigate(route)
                          }
                        }
                      },
                      [
                        _c("font-awesome-icon", { attrs: { icon: route.icon } })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("span", {
                      domProps: { innerHTML: _vm._s(route.text) },
                      on: {
                        click: function($event) {
                          return _vm.navigate(route)
                        }
                      }
                    }),
                    _vm._v(" "),
                    route.children !== undefined && route.children.length > 0
                      ? _c(
                          "span",
                          {
                            on: {
                              click: function($event) {
                                route.submenuOpen = !route.submenuOpen
                              }
                            }
                          },
                          [
                            _c("font-awesome-icon", {
                              class: { rotate: route.submenuOpen },
                              attrs: { icon: "angle-left" }
                            })
                          ],
                          1
                        )
                      : _vm._e()
                  ]
                ),
                _vm._v(" "),
                route.children !== undefined &&
                route.children.length > 0 &&
                route.submenuOpen
                  ? _c(
                      "ul",
                      { class: { open: route.submenuOpen } },
                      _vm._l(route.children, function(child) {
                        return _c(
                          "li",
                          {
                            directives: [
                              {
                                name: "user-has-role",
                                rawName: "v-user-has-role",
                                value: child.role,
                                expression: "child.role"
                              }
                            ],
                            key: child.name
                          },
                          [
                            _c(
                              "div",
                              {
                                class: {
                                  "router-link-active": _vm.routerLinkActive(
                                    child
                                  ),
                                  "router-link-exact-active": _vm.routerLinkExactActive(
                                    child
                                  )
                                }
                              },
                              [
                                _c("span", {
                                  domProps: { innerHTML: _vm._s(child.text) },
                                  on: {
                                    click: function($event) {
                                      return _vm.navigate(child)
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                child.children !== undefined &&
                                child.children.length > 0
                                  ? _c(
                                      "span",
                                      {
                                        on: {
                                          click: function($event) {
                                            child.submenuOpen = !child.submenuOpen
                                          }
                                        }
                                      },
                                      [
                                        _c("font-awesome-icon", {
                                          class: { rotate: child.submenuOpen },
                                          attrs: { icon: "angle-left" }
                                        })
                                      ],
                                      1
                                    )
                                  : _vm._e()
                              ]
                            ),
                            _vm._v(" "),
                            child.children !== undefined &&
                            child.children.length > 0 &&
                            child.submenuOpen
                              ? _c(
                                  "ul",
                                  { class: { open: child.submenuOpen } },
                                  _vm._l(child.children, function(subChild) {
                                    return _c("router-link", {
                                      key: subChild.name,
                                      attrs: {
                                        to: { name: subChild.name },
                                        tag: "li"
                                      },
                                      domProps: {
                                        innerHTML: _vm._s(subChild.text)
                                      }
                                    })
                                  }),
                                  1
                                )
                              : _vm._e()
                          ]
                        )
                      }),
                      0
                    )
                  : _vm._e()
              ]
            )
          }),
          0
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/plugins/Edit.vue?vue&type=template&id=d88d0772&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/plugins/Edit.vue?vue&type=template&id=d88d0772& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _c("vue-form", {
          attrs: { url: _vm.url("plugins"), model: _vm.item },
          on: {
            "submit:success": _vm.submitSuccess,
            "submit:error": _vm.submitError
          },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(ref) {
                var form = ref.form
                var model = ref.model
                return [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "loading",
                          rawName: "v-loading",
                          value: form.submitting,
                          expression: "form.submitting"
                        }
                      ],
                      staticClass: "card",
                      attrs: {
                        "element-loading-background": "rgba(248,250,252,0.6)"
                      }
                    },
                    [
                      _c("div", { staticClass: "card-header" }, [
                        _vm._v(
                          "Plugin " + _vm._s(_vm.id ? "bewerken" : "toevoegen")
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "card-body" }, [
                        _c("div", { staticClass: "form-row" }, [
                          _c("div", { staticClass: "col-sm-12" })
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "card-footer has-buttons" },
                        [
                          _c(
                            "el-button",
                            {
                              attrs: {
                                type: "primary",
                                "native-type": "submit"
                              }
                            },
                            [_vm._v("Opslaan")]
                          )
                        ],
                        1
                      )
                    ]
                  )
                ]
              }
            }
          ])
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/plugins/Index.vue?vue&type=template&id=252dc665&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/plugins/Index.vue?vue&type=template&id=252dc665& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _vm.items
          ? [
              _c("div", { staticClass: "card" }, [
                _c(
                  "div",
                  { staticClass: "card-table" },
                  [
                    _c("vue-table", {
                      attrs: {
                        url: "vue.finances",
                        "can-delete": false,
                        sorting: _vm.sorting,
                        "initial-data": _vm.items
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "header",
                            fn: function(ref) {
                              var sorting = ref.sorting
                              var clickHandler = ref.clickHandler
                              return [
                                _c("vue-table-header", {
                                  attrs: {
                                    sorting: sorting,
                                    label: "Naam",
                                    identifier: "plugin.name"
                                  },
                                  on: { click: clickHandler }
                                }),
                                _vm._v(" "),
                                _c("vue-table-header", {
                                  attrs: {
                                    sorting: sorting,
                                    label: "Actief",
                                    identifier: "active"
                                  },
                                  on: { click: clickHandler }
                                })
                              ]
                            }
                          },
                          {
                            key: "row",
                            fn: function(ref) {
                              var row = ref.row
                              return [
                                _c("vue-table-column", {
                                  attrs: {
                                    row: row,
                                    property: "plugin.name",
                                    "router-link": "",
                                    to: {
                                      name: "plugins.edit",
                                      params: { id: row.id }
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "vue-table-column",
                                  {
                                    attrs: {
                                      row: row,
                                      property: "active",
                                      type: "custom"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(row.active ? "Ja" : "Nee") +
                                        "\n                            "
                                    )
                                  ]
                                )
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        899686607
                      )
                    })
                  ],
                  1
                )
              ])
            ]
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/users/Edit.vue?vue&type=template&id=ca293f42&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/users/Edit.vue?vue&type=template&id=ca293f42& ***!
  \****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _c("vue-form", {
          attrs: { url: _vm.url("users"), model: _vm.item },
          on: {
            "submit:success": _vm.submitSuccess,
            "submit:error": _vm.submitError
          },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(ref) {
                var form = ref.form
                var model = ref.model
                return [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "loading",
                          rawName: "v-loading",
                          value: form.submitting,
                          expression: "form.submitting"
                        }
                      ],
                      staticClass: "card",
                      attrs: {
                        "element-loading-background": "rgba(248,250,252,0.6)"
                      }
                    },
                    [
                      _c("div", { staticClass: "card-header" }, [
                        _vm._v(
                          "Gebruiker " +
                            _vm._s(_vm.id ? "bewerken" : "toevoegen")
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "card-body" }, [
                        _c("div", { staticClass: "form-row" }, [
                          _c("div", { staticClass: "col-sm-12" })
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "card-footer has-buttons" },
                        [
                          _c(
                            "el-button",
                            {
                              attrs: {
                                type: "primary",
                                "native-type": "submit"
                              }
                            },
                            [_vm._v("Opslaan")]
                          )
                        ],
                        1
                      )
                    ]
                  )
                ]
              }
            }
          ])
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/users/Index.vue?vue&type=template&id=0438654d&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/users/Index.vue?vue&type=template&id=0438654d& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _vm.items
          ? [
              _c("div", { staticClass: "card" }, [
                _c(
                  "div",
                  { staticClass: "card-table" },
                  [
                    _c("vue-table", {
                      attrs: {
                        url: "vue.finances",
                        "can-delete": false,
                        sorting: _vm.sorting,
                        "initial-data": _vm.items
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "header",
                            fn: function(ref) {
                              var sorting = ref.sorting
                              var clickHandler = ref.clickHandler
                              return [
                                _c("vue-table-header", {
                                  attrs: {
                                    sorting: sorting,
                                    label: "Naam",
                                    identifier: "name"
                                  },
                                  on: { click: clickHandler }
                                })
                              ]
                            }
                          },
                          {
                            key: "row",
                            fn: function(ref) {
                              var row = ref.row
                              return [
                                _c("vue-table-column", {
                                  attrs: {
                                    row: row,
                                    property: "name",
                                    "router-link": "",
                                    to: {
                                      name: "applications.edit",
                                      params: { id: row.id }
                                    }
                                  }
                                })
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        2747209652
                      )
                    })
                  ],
                  1
                )
              ])
            ]
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/versions/Edit.vue?vue&type=template&id=835a3f00&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/versions/Edit.vue?vue&type=template&id=835a3f00& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _c("vue-form", {
          attrs: { url: _vm.url("versions"), model: _vm.item },
          on: {
            "submit:success": _vm.submitSuccess,
            "submit:error": _vm.submitError
          },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(ref) {
                var form = ref.form
                var model = ref.model
                return [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "loading",
                          rawName: "v-loading",
                          value: form.submitting,
                          expression: "form.submitting"
                        }
                      ],
                      staticClass: "card",
                      attrs: {
                        "element-loading-background": "rgba(248,250,252,0.6)"
                      }
                    },
                    [
                      _c("div", { staticClass: "card-header" }, [
                        _vm._v(
                          "App versie " +
                            _vm._s(_vm.id ? "bewerken" : "toevoegen")
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "card-body" }, [
                        _c("div", { staticClass: "form-row" }, [
                          _c("div", { staticClass: "col-sm-12" })
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "card-footer has-buttons" },
                        [
                          _c(
                            "el-button",
                            {
                              attrs: {
                                type: "primary",
                                "native-type": "submit"
                              }
                            },
                            [_vm._v("Opslaan")]
                          )
                        ],
                        1
                      )
                    ]
                  )
                ]
              }
            }
          ])
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/versions/Index.vue?vue&type=template&id=4dc0e94c&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/versions/Index.vue?vue&type=template&id=4dc0e94c& ***!
  \********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      { staticClass: "col-sm-12" },
      [
        _vm.items
          ? [
              _c("div", { staticClass: "card" }, [
                _c(
                  "div",
                  { staticClass: "card-table" },
                  [
                    _c("vue-table", {
                      attrs: {
                        url: "vue.finances",
                        "can-delete": false,
                        sorting: _vm.sorting,
                        "initial-data": _vm.items
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "header",
                            fn: function(ref) {
                              var sorting = ref.sorting
                              var clickHandler = ref.clickHandler
                              return [
                                _c("vue-table-header", {
                                  attrs: {
                                    sorting: sorting,
                                    label: "Naam",
                                    identifier: "plugin.name"
                                  },
                                  on: { click: clickHandler }
                                }),
                                _vm._v(" "),
                                _c("vue-table-header", {
                                  attrs: {
                                    sorting: sorting,
                                    label: "Actief",
                                    identifier: "active"
                                  },
                                  on: { click: clickHandler }
                                })
                              ]
                            }
                          },
                          {
                            key: "row",
                            fn: function(ref) {
                              var row = ref.row
                              return [
                                _c("vue-table-column", {
                                  attrs: {
                                    row: row,
                                    property: "plugin.name",
                                    "router-link": "",
                                    to: {
                                      name: "versions.edit",
                                      params: { id: row.id }
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "vue-table-column",
                                  {
                                    attrs: {
                                      row: row,
                                      property: "active",
                                      type: "custom"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(row.active ? "Ja" : "Nee") +
                                        "\n                            "
                                    )
                                  ]
                                )
                              ]
                            }
                          }
                        ],
                        null,
                        false,
                        1525961468
                      )
                    })
                  ],
                  1
                )
              ])
            ]
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvYXBwLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2Jvb3RzdHJhcC5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9jb21wb25lbnRzIHN5bmMgXFwudnVlJC8iLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9pbnRlcmNlcHRvcnMvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvbGlicmFyaWVzL2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvbGlicmFyaWVzL2RyYWdnYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9saWJyYXJpZXMvZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9saWJyYXJpZXMvZm9udGF3ZXNvbWUuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvbGlicmFyaWVzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvbGlicmFyaWVzL21vbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9saWJyYXJpZXMvcHJvZ3Jlc3NiYXIuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvbGlicmFyaWVzL3JvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9saWJyYXJpZXMvdGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvcGx1Z2lucy5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9yb3V0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvcm91dGVzL21vZHVsZXMvYXBwX3ZlcnNpb25zLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3JvdXRlcy9tb2R1bGVzL2FwcGxpY2F0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9yb3V0ZXMvbW9kdWxlcy9hdXRoZW50aWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9yb3V0ZXMvbW9kdWxlcy9kZXZpY2VzLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3JvdXRlcy9tb2R1bGVzL25vdGlmaWNhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvcm91dGVzL21vZHVsZXMvcGx1Z2lucy5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9yb3V0ZXMvbW9kdWxlcy9yZW1vdGVfY29uZmlnLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3JvdXRlcy9tb2R1bGVzL3VzZXJzLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3JvdXRlcy9zaWRlYmFyLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3NlcnZpY2VzL2FwcGxpY2F0aW9uLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvc2VydmljZXMvYXV0aC5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3NlcnZpY2VzL29hdXRoLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvQXBwLnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9BcHAudnVlPzM1NDYiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvQXBwLnZ1ZT8wZTQ4Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0Rhc2hib2FyZC52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvRGFzaGJvYXJkLnZ1ZT84ZTkwIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0Rhc2hib2FyZC52dWU/ZDgxOSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hcHBsaWNhdGlvbnMvRWRpdC52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXBwbGljYXRpb25zL0VkaXQudnVlPzU5ZTYiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXBwbGljYXRpb25zL0VkaXQudnVlPzE0Y2EiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXBwbGljYXRpb25zL0luZGV4LnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hcHBsaWNhdGlvbnMvSW5kZXgudnVlPzk5OTIiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXBwbGljYXRpb25zL0luZGV4LnZ1ZT82ZDlkIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2FwcGxpY2F0aW9ucy9TZWxlY3QudnVlIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2FwcGxpY2F0aW9ucy9TZWxlY3QudnVlP2IwOGUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXBwbGljYXRpb25zL1NlbGVjdC52dWU/NGYyZCIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hcHBsaWNhdGlvbnMvU2VsZWN0LnZ1ZT80ZmE4Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0ZvcmdvdFBhc3N3b3JkLnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Gb3Jnb3RQYXNzd29yZC52dWU/YTliOCIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Gb3Jnb3RQYXNzd29yZC52dWU/Y2EyYSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Mb2dpbi52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vTG9naW4udnVlP2VkN2YiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vTG9naW4udnVlP2Q4ZTMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVzZXRQYXNzd29yZC52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVzZXRQYXNzd29yZC52dWU/NmU2OCIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZXNldFBhc3N3b3JkLnZ1ZT81MDhjIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2NvbmZpZy9FZGl0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9jb25maWcvRWRpdC52dWU/OTkwMSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9jb25maWcvRWRpdC52dWU/YTNjYiIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9jb25maWcvSW5kZXgudnVlIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2NvbmZpZy9JbmRleC52dWU/OTA4NyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9jb25maWcvSW5kZXgudnVlP2QxYTUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvZGV2aWNlcy9FZGl0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9kZXZpY2VzL0VkaXQudnVlP2QwYmQiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvZGV2aWNlcy9FZGl0LnZ1ZT9iZjdjIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2RldmljZXMvSW5kZXgudnVlIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2RldmljZXMvSW5kZXgudnVlPzE3ZjMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvZGV2aWNlcy9JbmRleC52dWU/OTVhMCIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9lcnJvcnMvTm90Rm91bmQudnVlIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2Vycm9ycy9Ob3RGb3VuZC52dWU/OThiNyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9lcnJvcnMvTm90Rm91bmQudnVlPzQzNzEiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3Mvbm90aWZpY2F0aW9ucy9FZGl0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9ub3RpZmljYXRpb25zL0VkaXQudnVlPzQ4OTQiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3Mvbm90aWZpY2F0aW9ucy9FZGl0LnZ1ZT9mMzRkIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL25vdGlmaWNhdGlvbnMvSW5kZXgudnVlIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL25vdGlmaWNhdGlvbnMvSW5kZXgudnVlP2M3NmEiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3Mvbm90aWZpY2F0aW9ucy9JbmRleC52dWU/OTA1NiIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9ub3RpZmljYXRpb25zL3NlZ21lbnRzL0VkaXQudnVlIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL25vdGlmaWNhdGlvbnMvc2VnbWVudHMvRWRpdC52dWU/NWY4ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9ub3RpZmljYXRpb25zL3NlZ21lbnRzL0VkaXQudnVlPzZkMGYiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3Mvbm90aWZpY2F0aW9ucy9zZWdtZW50cy9JbmRleC52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3Mvbm90aWZpY2F0aW9ucy9zZWdtZW50cy9JbmRleC52dWU/ZmQ3YyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9ub3RpZmljYXRpb25zL3NlZ21lbnRzL0luZGV4LnZ1ZT84MmY1Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3BhcnRpYWxzL1NpZGVCYXIudnVlIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3BhcnRpYWxzL1NpZGVCYXIudnVlPzc5ODAiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvcGFydGlhbHMvU2lkZUJhci52dWU/NTgwMyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9wYXJ0aWFscy9TaWRlQmFyLnZ1ZT80NDNjIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3BsdWdpbnMvRWRpdC52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvcGx1Z2lucy9FZGl0LnZ1ZT8wZDYwIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3BsdWdpbnMvRWRpdC52dWU/NTMzYiIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9wbHVnaW5zL0luZGV4LnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9wbHVnaW5zL0luZGV4LnZ1ZT9hZTFlIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3BsdWdpbnMvSW5kZXgudnVlPzJkMGYiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvdXNlcnMvRWRpdC52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvdXNlcnMvRWRpdC52dWU/OWUxOSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy91c2Vycy9FZGl0LnZ1ZT83MTc0Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3VzZXJzL0luZGV4LnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy91c2Vycy9JbmRleC52dWU/NDcwMyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy91c2Vycy9JbmRleC52dWU/ZTE5MiIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy92ZXJzaW9ucy9FZGl0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy92ZXJzaW9ucy9FZGl0LnZ1ZT9iMWI1Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3ZlcnNpb25zL0VkaXQudnVlP2ZlN2UiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvdmVyc2lvbnMvSW5kZXgudnVlIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3ZlcnNpb25zL0luZGV4LnZ1ZT9mZWNjIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3ZlcnNpb25zL0luZGV4LnZ1ZT9hYzQwIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9BcHAudnVlIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9EYXNoYm9hcmQudnVlIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hcHBsaWNhdGlvbnMvRWRpdC52dWUiLCJ3ZWJwYWNrOi8vL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2FwcGxpY2F0aW9ucy9JbmRleC52dWUiLCJ3ZWJwYWNrOi8vL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2FwcGxpY2F0aW9ucy9TZWxlY3QudnVlIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Gb3Jnb3RQYXNzd29yZC52dWUiLCJ3ZWJwYWNrOi8vL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0xvZ2luLnZ1ZSIsIndlYnBhY2s6Ly8vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVzZXRQYXNzd29yZC52dWUiLCJ3ZWJwYWNrOi8vL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2NvbmZpZy9FZGl0LnZ1ZSIsIndlYnBhY2s6Ly8vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3Mvbm90aWZpY2F0aW9ucy9JbmRleC52dWUiLCJ3ZWJwYWNrOi8vL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3VzZXJzL0VkaXQudnVlIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9lcnJvcnMvTm90Rm91bmQudnVlIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9ub3RpZmljYXRpb25zL0VkaXQudnVlIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9ub3RpZmljYXRpb25zL3NlZ21lbnRzL0VkaXQudnVlIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9wYXJ0aWFscy9TaWRlQmFyLnZ1ZSIsIndlYnBhY2s6Ly8vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvcGx1Z2lucy9FZGl0LnZ1ZSIsIndlYnBhY2s6Ly8vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvcGx1Z2lucy9JbmRleC52dWUiLCJ3ZWJwYWNrOi8vL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3ZlcnNpb25zL0VkaXQudnVlIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2FwcGxpY2F0aW9ucy9TZWxlY3QudnVlPzFiODQiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvcGFydGlhbHMvU2lkZUJhci52dWU/ZmE1YyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvQXBwLnZ1ZT8yNjQwIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0Rhc2hib2FyZC52dWU/NTRmOSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hcHBsaWNhdGlvbnMvRWRpdC52dWU/ZTY5ZCIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hcHBsaWNhdGlvbnMvSW5kZXgudnVlPzM5MDUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXBwbGljYXRpb25zL1NlbGVjdC52dWU/ODM2NSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Gb3Jnb3RQYXNzd29yZC52dWU/NzQ1MCIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Mb2dpbi52dWU/MTdiYSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZXNldFBhc3N3b3JkLnZ1ZT9hZGI0Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2NvbmZpZy9FZGl0LnZ1ZT8wZDBmIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2NvbmZpZy9JbmRleC52dWU/YjdhNCIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9kZXZpY2VzL0VkaXQudnVlP2FhODgiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvZGV2aWNlcy9JbmRleC52dWU/YzEwZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9lcnJvcnMvTm90Rm91bmQudnVlPzlkMjAiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3Mvbm90aWZpY2F0aW9ucy9FZGl0LnZ1ZT9mN2U0Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL25vdGlmaWNhdGlvbnMvSW5kZXgudnVlPzM1YTciLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3Mvbm90aWZpY2F0aW9ucy9zZWdtZW50cy9FZGl0LnZ1ZT80NDg4Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL25vdGlmaWNhdGlvbnMvc2VnbWVudHMvSW5kZXgudnVlPzVjOGIiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvcGFydGlhbHMvU2lkZUJhci52dWU/ZTZkMyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9wbHVnaW5zL0VkaXQudnVlPzU5NTciLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvcGx1Z2lucy9JbmRleC52dWU/ZDRkZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy91c2Vycy9FZGl0LnZ1ZT80YWJjIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3VzZXJzL0luZGV4LnZ1ZT8xMTM3Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3ZlcnNpb25zL0VkaXQudnVlPzdhNDAiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvdmVyc2lvbnMvSW5kZXgudnVlP2ZlY2EiXSwibmFtZXMiOlsid2luZG93IiwiVnVlIiwiRXZlbnRzIiwicHJvdG90eXBlIiwiJGFwcGxpY2F0aW9uU2VydmljZSIsIkFwcGxpY2F0aW9uU2VydmljZSIsIiRhdXRoIiwiaW5pdCIsInRoZW4iLCJmaWxlcyIsInJlcXVpcmUiLCJrZXlzIiwibWFwIiwia2V5IiwiY29tcG9uZW50Iiwic3BsaXQiLCJwb3AiLCJlbCIsImNvbXBvbmVudHMiLCJBcHAiLCJyb3V0ZXIiLCJfIiwiUG9wcGVyIiwiJCIsImpRdWVyeSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJheGlvcyIsInVybCIsInBhcmFtcyIsIk9iamVjdCIsInJlcGxhY2UiLCJjb21tZW50Tm9kZSIsInZub2RlIiwiY29tbWVudCIsImRvY3VtZW50IiwiY3JlYXRlQ29tbWVudCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJ0ZXh0IiwiZWxtIiwiaXNDb21tZW50IiwiY29udGV4dCIsInRhZyIsImRhdGEiLCJkaXJlY3RpdmVzIiwiY29tcG9uZW50SW5zdGFuY2UiLCIkZWwiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwiaW50ZXJjZXB0b3JzIiwicmVxdWVzdCIsInVzZSIsImNvbmZpZyIsImhlYWRlcnMiLCIkb2F1dGgiLCJpc0F1dGhlbnRpY2F0ZWQiLCJnZXRBdXRoSGVhZGVyIiwiYXBwbGljYXRpb25Jc1NldCIsImdldEFwcGxpY2F0aW9uIiwiaWQiLCJ2ZXJzaW9uSXNTZXQiLCJnZXRWZXJzaW9uIiwiUHJvbWlzZSIsInJlamVjdCIsInJlc3BvbnNlIiwib3JpZ2luYWxSZXF1ZXN0Iiwic3RhdHVzIiwiX3JldHJ5IiwicmVmcmVzaFRva2VuIiwibG9nb3V0IiwiT0F1dGhTZXJ2aWNlIiwiQXV0aFNlcnZpY2UiLCJEcmFnZ2FibGUiLCJsb2NhbGUiLCJsYW5nIiwiQWxlcnQiLCJuYW1lIiwiQ29sbGFwc2UiLCJDb2xsYXBzZUl0ZW0iLCJJbnB1dCIsIklucHV0RGlnaXQiLCJSYWRpbyIsIkNoZWNrYm94IiwiVGFnIiwiQnV0dG9uIiwiU2VsZWN0IiwiT3B0aW9uIiwiT3B0aW9uR3JvdXAiLCJUb29sdGlwIiwiRHJvcGRvd24iLCJEcm9wZG93bk1lbnUiLCJEcm9wZG93bkl0ZW0iLCJVcGxvYWQiLCJUYWJQYW5lIiwiVGFicyIsIkRhdGVQaWNrZXIiLCJUcmFuc2ZlciIsIkRpYWxvZyIsIlRpbWVTZWxlY3QiLCJDb2xvclBpY2tlciIsIkxvYWRpbmciLCJkaXJlY3RpdmUiLCIkbWVzc2FnZSIsIk1lc3NhZ2UiLCIkbXNnYm94IiwiTWVzc2FnZUJveCIsIiRhbGVydCIsImFsZXJ0IiwiJGNvbmZpcm0iLCJjb25maXJtIiwiJHByb21wdCIsInByb21wdCIsImRvbSIsIndhdGNoIiwibGlicmFyeSIsImFkZCIsImZhcyIsIkZvbnRBd2Vzb21lSWNvbiIsIlZ1ZUZvcm0iLCJJbnB1dFJhZGlvIiwiSW5wdXRDaGVja2JveCIsIklucHV0VGV4dCIsIklucHV0TnVtYmVyIiwiSW5wdXRQYXNzd29yZCIsIklucHV0RWRpdG9yIiwiSW5wdXRTZWxlY3QiLCJJbnB1dFVwbG9hZCIsIklucHV0RGF0ZVRpbWUiLCJJbnB1dENvZGUiLCJJbnB1dFRpbWUiLCJJbnB1dENvbG9yUGlja2VyIiwiJG1vbWVudCIsIm1vbWVudCIsIlZ1ZVByb2dyZXNzIiwiVnVlUHJvZ3Jlc3NCYXIiLCJjb2xvciIsImZhaWxlZENvbG9yIiwidGhpY2tuZXNzIiwidHJhbnNpdGlvbiIsInNwZWVkIiwib3BhY2l0eSIsInRlcm1pbmF0aW9uIiwiVnVlUm91dGVyIiwibW9kZSIsImJhc2UiLCJyb3V0ZXMiLCJvQXV0aCIsImJlZm9yZUVhY2giLCJ0byIsImZyb20iLCJuZXh0IiwibWV0YSIsImF1dGgiLCJwYXRoIiwiZ3Vlc3QiLCJxdWVyeSIsInJlZGlyZWN0IiwiZnVsbFBhdGgiLCJ1c2VySGFzUm9sZSIsInJvbGUiLCJWdWVUYWJsZSIsIlZ1ZVRhYmxlQ29sdW1uIiwiVnVlVGFibGVIZWFkZXIiLCJtaXhpbiIsImZpbHRlcnMiLCJjYXBpdGFsaXplIiwidG9TdHJpbmciLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwibWV0aG9kcyIsInN1Ym1pdFN1Y2Nlc3MiLCJ0eXBlIiwibWVzc2FnZSIsInN1Ym1pdEVycm9yIiwidGl0bGUiLCJjb25maXJtQnV0dG9uVGV4dCIsImNhbmNlbEJ1dHRvblRleHQiLCJkYW5nZXJvdXNseVVzZUhUTUxTdHJpbmciLCJpc0VtcHR5IiwiZm9ybWF0UHJpY2UiLCJ2YWwiLCJ0b0ZpeGVkIiwiZG93bmxvYWRGaWxlIiwibWV0aG9kIiwicmVzcG9uc2VUeXBlIiwiZmlsZU5hbWUiLCJkaXNwb3NpdGlvbiIsImluZGV4T2YiLCJmaWxlbmFtZVJlZ2V4IiwibWF0Y2hlcyIsImV4ZWMiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwibGluayIsImNyZWF0ZUVsZW1lbnQiLCJocmVmIiwic2V0QXR0cmlidXRlIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJyZW1vdmVDaGlsZCIsImZpbHRlciIsImJpbmRpbmdzIiwiYmVoYXZpb3VyIiwibW9kaWZpZXJzIiwiZGlzYWJsZSIsImxvZyIsImhlbHBlcnMiLCJkaXNhYmxlZCIsIiR1cmwiLCJjb25jYXQiLCJhdXRoZW50aWNhdGlvbiIsInBsdWdpbnMiLCJhcHBsaWNhdGlvbnMiLCJ2ZXJzaW9ucyIsInVzZXJzIiwibm90aWZpY2F0aW9ucyIsImRldmljZXMiLCJST0xFX1VTRVIiLCJwcm9wcyIsImljb24iLCJST0xFX1NVUEVSX0FETUlOIiwic3VibWVudU9wZW4iLCJjaGlsZHJlbiIsImFwcGxpY2F0aW9uIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXJzZSIsImdldEl0ZW0iLCJyZW1vdmVJdGVtIiwidmVyc2lvbiIsImNsZWFyQXBwbGljYXRpb24iLCJjbGVhclZlcnNpb24iLCJST0xFX0FETUlOIiwiYWxsIiwiZ2V0IiwidXNlciIsImlzQWRtaW4iLCJyb2xlcyIsInNlc3Npb24iLCJDb29raWVzIiwiY2xlYXIiLCJyZW1vdmUiLCJyZXNvbHZlIiwicG9zdCIsInJlZnJlc2hfdG9rZW4iLCJzdG9yZVNlc3Npb24iLCJhY2Nlc3NfdG9rZW4iLCJob3VySW5NaWxsaVNlY29uZHMiLCJ0aW1lIiwiZXhwaXJlc19pbiIsInNldCIsImV4cGlyZXMiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBLG1DQUFtQztBQUNuQyx1Q0FBdUM7QUFDdkMsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImpzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJqcy9hcHBcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9hcHAuanNcIixcInZlbmRvcnN+anMvYXBwXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0ICcuL2Jvb3RzdHJhcCc7XG5pbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgJy4vcGx1Z2lucyc7XG5pbXBvcnQgJy4vaW50ZXJjZXB0b3JzL2F4aW9zJztcbmltcG9ydCBBcHAgZnJvbSAnLi92aWV3cy9BcHAnO1xuXG5pbXBvcnQgJy4vbGlicmFyaWVzL2F1dGgnO1xuaW1wb3J0ICcuL2xpYnJhcmllcy9kcmFnZ2FibGUnO1xuaW1wb3J0ICcuL2xpYnJhcmllcy9lbGVtZW50JztcbmltcG9ydCAnLi9saWJyYXJpZXMvZm9udGF3ZXNvbWUnO1xuaW1wb3J0ICcuL2xpYnJhcmllcy9mb3JtJztcbmltcG9ydCAnLi9saWJyYXJpZXMvbW9tZW50JztcbmltcG9ydCAnLi9saWJyYXJpZXMvcHJvZ3Jlc3NiYXInO1xuaW1wb3J0IHJvdXRlciBmcm9tICcuL2xpYnJhcmllcy9yb3V0ZXInO1xuaW1wb3J0ICcuL2xpYnJhcmllcy90YWJsZSc7XG5pbXBvcnQgQXBwbGljYXRpb25TZXJ2aWNlIGZyb20gJy4vc2VydmljZXMvYXBwbGljYXRpb24uc2VydmljZSc7XG5cbndpbmRvdy5WdWUgPSBWdWU7XG53aW5kb3cuRXZlbnRzID0gbmV3IFZ1ZSgpO1xuXG4vLyBpbXBvcnQgKiBhcyBTZW50cnkgZnJvbSAnQHNlbnRyeS9icm93c2VyJztcbi8vIGltcG9ydCAqIGFzIEludGVncmF0aW9ucyBmcm9tICdAc2VudHJ5L2ludGVncmF0aW9ucyc7XG5cbi8vIGlmKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbi8vIC8vIEluaXQgU2VudHJ5XG4vLyAgICAgU2VudHJ5LmluaXQoe1xuLy8gICAgICAgICBkc246ICdodHRwczovLzNhNGNkNTQ0Yjg4NzRhY2Y4MzI1YWE3YjI2NjEzOWM5QHNlbnRyeS5pby8xMjkzMTQnLFxuLy8gICAgICAgICBpbnRlZ3JhdGlvbnM6IFtuZXcgSW50ZWdyYXRpb25zLlZ1ZSh7VnVlLCBhdHRhY2hQcm9wczogdHJ1ZX0pXSxcbi8vICAgICB9KTtcbi8vIH1cblxuVnVlLnByb3RvdHlwZS4kYXBwbGljYXRpb25TZXJ2aWNlID0gbmV3IEFwcGxpY2F0aW9uU2VydmljZSgpO1xuVnVlLnByb3RvdHlwZS4kYXV0aC5pbml0KCkudGhlbigoKSA9PiB7XG4gICAgLyoqXG4gICAgICogRWcuIC4vY29tcG9uZW50cy9FeGFtcGxlQ29tcG9uZW50LnZ1ZSAtPiA8ZXhhbXBsZS1jb21wb25lbnQ+PC9leGFtcGxlLWNvbXBvbmVudD5cbiAgICAgKi9cblxuICAgIGNvbnN0IGZpbGVzID0gcmVxdWlyZS5jb250ZXh0KCcuL2NvbXBvbmVudHMvJywgdHJ1ZSwgL1xcLnZ1ZSQvaSk7XG4gICAgZmlsZXMua2V5cygpLm1hcChrZXkgPT4gVnVlLmNvbXBvbmVudChrZXkuc3BsaXQoJy8nKS5wb3AoKS5zcGxpdCgnLicpWzBdLCBmaWxlcyhrZXkpLmRlZmF1bHQpKTtcblxuICAgIG5ldyBWdWUoe1xuICAgICAgICBlbDogJyNhcHAnLFxuICAgICAgICBjb21wb25lbnRzOiB7QXBwfSxcbiAgICAgICAgcm91dGVyLFxuICAgIH0pO1xufSk7XG4iLCJcbndpbmRvdy5fID0gcmVxdWlyZSgnbG9kYXNoJyk7XG53aW5kb3cuUG9wcGVyID0gcmVxdWlyZSgncG9wcGVyLmpzJykuZGVmYXVsdDtcblxuLyoqXG4gKiBXZSdsbCBsb2FkIGpRdWVyeSBhbmQgdGhlIEJvb3RzdHJhcCBqUXVlcnkgcGx1Z2luIHdoaWNoIHByb3ZpZGVzIHN1cHBvcnRcbiAqIGZvciBKYXZhU2NyaXB0IGJhc2VkIEJvb3RzdHJhcCBmZWF0dXJlcyBzdWNoIGFzIG1vZGFscyBhbmQgdGFicy4gVGhpc1xuICogY29kZSBtYXkgYmUgbW9kaWZpZWQgdG8gZml0IHRoZSBzcGVjaWZpYyBuZWVkcyBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICovXG5cbnRyeSB7XG4gICAgd2luZG93LiQgPSB3aW5kb3cualF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbiAgICByZXF1aXJlKCdib290c3RyYXAnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKGUpO1xufVxuXG5cbi8qKlxuICogV2UnbGwgbG9hZCB0aGUgYXhpb3MgSFRUUCBsaWJyYXJ5IHdoaWNoIGFsbG93cyB1cyB0byBlYXNpbHkgaXNzdWUgcmVxdWVzdHNcbiAqIHRvIG91ciBMYXJhdmVsIGJhY2stZW5kLiBUaGlzIGxpYnJhcnkgYXV0b21hdGljYWxseSBoYW5kbGVzIHNlbmRpbmcgdGhlXG4gKiBDU1JGIHRva2VuIGFzIGEgaGVhZGVyIGJhc2VkIG9uIHRoZSB2YWx1ZSBvZiB0aGUgXCJYU1JGXCIgdG9rZW4gY29va2llLlxuICovXG5cbndpbmRvdy5heGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XG5cbi8vIEhlbHBlciBtZXRob2RzXG53aW5kb3cudXJsID0gKHVybCwgcGFyYW1zID0ge30pID0+IHtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHBhcmFtcyk7XG5cbiAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShgOiR7a2V5fWAsIHBhcmFtc1trZXldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYC9hcGkvdnVlLyR7dXJsLnJlcGxhY2UoL15cXC8rL2csICcnKX1gO1xufTtcblxuLyoqXG4gKiBFY2hvIGV4cG9zZXMgYW4gZXhwcmVzc2l2ZSBBUEkgZm9yIHN1YnNjcmliaW5nIHRvIGNoYW5uZWxzIGFuZCBsaXN0ZW5pbmdcbiAqIGZvciBldmVudHMgdGhhdCBhcmUgYnJvYWRjYXN0IGJ5IExhcmF2ZWwuIEVjaG8gYW5kIGV2ZW50IGJyb2FkY2FzdGluZ1xuICogYWxsb3dzIHlvdXIgdGVhbSB0byBlYXNpbHkgYnVpbGQgcm9idXN0IHJlYWwtdGltZSB3ZWIgYXBwbGljYXRpb25zLlxuICovXG5cbi8vIGltcG9ydCBFY2hvIGZyb20gJ2xhcmF2ZWwtZWNobydcblxuLy8gd2luZG93LlB1c2hlciA9IHJlcXVpcmUoJ3B1c2hlci1qcycpO1xuXG4vLyB3aW5kb3cuRWNobyA9IG5ldyBFY2hvKHtcbi8vICAgICBicm9hZGNhc3RlcjogJ3B1c2hlcicsXG4vLyAgICAga2V5OiBwcm9jZXNzLmVudi5NSVhfUFVTSEVSX0FQUF9LRVksXG4vLyAgICAgY2x1c3RlcjogcHJvY2Vzcy5lbnYuTUlYX1BVU0hFUl9BUFBfQ0xVU1RFUixcbi8vICAgICBlbmNyeXB0ZWQ6IHRydWVcbi8vIH0pO1xuIiwiZnVuY3Rpb24gd2VicGFja0VtcHR5Q29udGV4dChyZXEpIHtcblx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdHRocm93IGU7XG59XG53ZWJwYWNrRW1wdHlDb250ZXh0LmtleXMgPSBmdW5jdGlvbigpIHsgcmV0dXJuIFtdOyB9O1xud2VicGFja0VtcHR5Q29udGV4dC5yZXNvbHZlID0gd2VicGFja0VtcHR5Q29udGV4dDtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0VtcHR5Q29udGV4dDtcbndlYnBhY2tFbXB0eUNvbnRleHQuaWQgPSBcIi4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvY29tcG9uZW50cyBzeW5jIHJlY3Vyc2l2ZSBcXFxcLnZ1ZSQvXCI7IiwiZXhwb3J0IGRlZmF1bHQge1xuICBjb21tZW50Tm9kZShlbCwgdm5vZGUpIHtcbiAgICBjb25zdCBjb21tZW50ID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnICcpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbW1lbnQsICdzZXRBdHRyaWJ1dGUnLCB7XG4gICAgICB2YWx1ZTogKCkgPT4gdW5kZWZpbmVkXG4gICAgfSk7XG5cbiAgICB2bm9kZS50ZXh0ID0gJyAnO1xuICAgIHZub2RlLmVsbSA9IGNvbW1lbnQ7XG4gICAgdm5vZGUuaXNDb21tZW50ID0gdHJ1ZTtcbiAgICB2bm9kZS5jb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgIHZub2RlLnRhZyA9IHVuZGVmaW5lZDtcbiAgICB2bm9kZS5kYXRhLmRpcmVjdGl2ZXMgPSB1bmRlZmluZWQ7XG5cbiAgICBpZiAodm5vZGUuY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgIHZub2RlLmNvbXBvbmVudEluc3RhbmNlLiRlbCA9IGNvbW1lbnQ7XG4gICAgfVxuXG4gICAgaWYgKGVsLnBhcmVudE5vZGUpIHtcbiAgICAgIGVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNvbW1lbnQsIGVsKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcblxuLyoqXG4gKiBSZXF1ZXN0IGludGVyY2VwdG9yXG4gKi9cbndpbmRvdy5heGlvcy5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoKGNvbmZpZykgPT4ge1xuXG4gICAgY29uZmlnLmhlYWRlcnNbJ1gtUmVxdWVzdGVkLVdpdGgnXSA9ICdYTUxIdHRwUmVxdWVzdCc7XG5cbiAgICAvLyBBZGQgdGhlIGF1dGhlbnRpY2F0aW9uIGhlYWRlciB3aGVuIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICAgIGlmIChWdWUucHJvdG90eXBlLiRvYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAvLyBTZXQgdGhlIGF1dGhvcml6YXRpb24gaGVhZGVyIGZvciBlYWNoIHJlcXVlc3RcbiAgICAgICAgY29uZmlnLmhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IFZ1ZS5wcm90b3R5cGUuJG9hdXRoLmdldEF1dGhIZWFkZXIoKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYXBwbGljYXRpb24gYW5kIHZlcnNpb24gSURcbiAgICBpZihWdWUucHJvdG90eXBlLiRhcHBsaWNhdGlvblNlcnZpY2UuYXBwbGljYXRpb25Jc1NldCgpKSB7XG4gICAgICAgIGNvbmZpZy5oZWFkZXJzWydBcHBsaWNhdGlvbi1JZCddID0gVnVlLnByb3RvdHlwZS4kYXBwbGljYXRpb25TZXJ2aWNlLmdldEFwcGxpY2F0aW9uKCkuaWQ7XG4gICAgfVxuICAgIGlmKFZ1ZS5wcm90b3R5cGUuJGFwcGxpY2F0aW9uU2VydmljZS52ZXJzaW9uSXNTZXQoKSkge1xuICAgICAgICBjb25maWcuaGVhZGVyc1snQXBwbGljYXRpb24tVmVyc2lvbi1JZCddID0gVnVlLnByb3RvdHlwZS4kYXBwbGljYXRpb25TZXJ2aWNlLmdldFZlcnNpb24oKS5pZDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uZmlnO1xufSwgKGVycm9yKSA9PiB7XG4gICAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmVxdWVzdCBlcnJvclxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG59KTtcblxuXG4vKipcbiAqIFJlc3BvbnNlIGludGVyY2VwdG9yXG4gKi9cbndpbmRvdy5heGlvcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKChyZXNwb25zZSkgPT4ge1xuICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlc3BvbnNlIGRhdGFcbiAgICByZXR1cm4gcmVzcG9uc2U7XG5cbn0sIGFzeW5jIChlcnJvcikgPT4ge1xuICAgIGxldCBvcmlnaW5hbFJlcXVlc3QgPSBlcnJvci5jb25maWc7XG5cbiAgICAvLyBSZWZyZXNoIHRoZSBhY2Nlc3MgdG9rZW5cbiAgICBpZiAoZXJyb3IucmVzcG9uc2UgIT09IHVuZGVmaW5lZCAmJiBlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMSAmJiBWdWUucHJvdG90eXBlLiRvYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSAmJiAhb3JpZ2luYWxSZXF1ZXN0Ll9yZXRyeSkge1xuICAgICAgICBvcmlnaW5hbFJlcXVlc3QuX3JldHJ5ID0gdHJ1ZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgVnVlLnByb3RvdHlwZS4kb2F1dGgucmVmcmVzaFRva2VuKCk7XG5cbiAgICAgICAgICAgIC8vIFJldHJ5IG9yaWdpbmFsIHJlcXVlc3RcbiAgICAgICAgICAgIHJldHVybiBheGlvcyhvcmlnaW5hbFJlcXVlc3QpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gTG9nb3V0XG4gICAgICAgICAgICBhd2FpdCBWdWUucHJvdG90eXBlLiRvYXV0aC5sb2dvdXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlc3BvbnNlIGVycm9yXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbn0pO1xuXG5cbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IE9BdXRoU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9vYXV0aC5zZXJ2aWNlJztcbmltcG9ydCBBdXRoU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuXG5WdWUucHJvdG90eXBlLiRvYXV0aCA9IG5ldyBPQXV0aFNlcnZpY2UoKTtcblZ1ZS5wcm90b3R5cGUuJGF1dGggPSBuZXcgQXV0aFNlcnZpY2UoKTtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCBEcmFnZ2FibGUgZnJvbSAndnVlZHJhZ2dhYmxlJztcblxuVnVlLmNvbXBvbmVudCgnZHJhZ2dhYmxlJywgRHJhZ2dhYmxlKTtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCB7XG4gICAgQWxlcnQsXG4gICAgQnV0dG9uLFxuICAgIENoZWNrYm94LFxuICAgIENvbGxhcHNlLFxuICAgIENvbGxhcHNlSXRlbSxcbiAgICBDb2xvclBpY2tlcixcbiAgICBEYXRlUGlja2VyLFxuICAgIERpYWxvZyxcbiAgICBEcm9wZG93bixcbiAgICBEcm9wZG93bkl0ZW0sXG4gICAgRHJvcGRvd25NZW51LFxuICAgIElucHV0LFxuICAgIElucHV0TnVtYmVyIGFzIElucHV0RGlnaXQsXG4gICAgTG9hZGluZyxcbiAgICBNZXNzYWdlLFxuICAgIE1lc3NhZ2VCb3gsXG4gICAgT3B0aW9uLFxuICAgIE9wdGlvbkdyb3VwLFxuICAgIFJhZGlvLFxuICAgIFNlbGVjdCxcbiAgICBUYWJQYW5lLFxuICAgIFRhYnMsXG4gICAgVGFnLFxuICAgIFRpbWVTZWxlY3QsXG4gICAgVG9vbHRpcCxcbiAgICBUcmFuc2ZlcixcbiAgICBVcGxvYWRcbn0gZnJvbSAnZWxlbWVudC11aSc7XG5pbXBvcnQgbGFuZyBmcm9tICdlbGVtZW50LXVpL2xpYi9sb2NhbGUvbGFuZy9ubCc7XG5pbXBvcnQgbG9jYWxlIGZyb20gJ2VsZW1lbnQtdWkvbGliL2xvY2FsZSc7XG5pbXBvcnQgJ2VsZW1lbnQtdWkvbGliL3RoZW1lLWNoYWxrL2luZGV4LmNzcyc7XG5cbmxvY2FsZS51c2UobGFuZyk7XG5WdWUuY29tcG9uZW50KEFsZXJ0Lm5hbWUsIEFsZXJ0KTtcblZ1ZS5jb21wb25lbnQoQ29sbGFwc2UubmFtZSwgQ29sbGFwc2UpO1xuVnVlLmNvbXBvbmVudChDb2xsYXBzZUl0ZW0ubmFtZSwgQ29sbGFwc2VJdGVtKTtcblZ1ZS5jb21wb25lbnQoSW5wdXQubmFtZSwgSW5wdXQpO1xuVnVlLmNvbXBvbmVudChJbnB1dERpZ2l0Lm5hbWUsIElucHV0RGlnaXQpO1xuVnVlLmNvbXBvbmVudChSYWRpby5uYW1lLCBSYWRpbyk7XG5WdWUuY29tcG9uZW50KENoZWNrYm94Lm5hbWUsIENoZWNrYm94KTtcblZ1ZS5jb21wb25lbnQoVGFnLm5hbWUsIFRhZyk7XG5WdWUuY29tcG9uZW50KEJ1dHRvbi5uYW1lLCBCdXR0b24pO1xuVnVlLmNvbXBvbmVudChTZWxlY3QubmFtZSwgU2VsZWN0KTtcblZ1ZS5jb21wb25lbnQoT3B0aW9uLm5hbWUsIE9wdGlvbik7XG5WdWUuY29tcG9uZW50KE9wdGlvbkdyb3VwLm5hbWUsIE9wdGlvbkdyb3VwKTtcblZ1ZS5jb21wb25lbnQoVG9vbHRpcC5uYW1lLCBUb29sdGlwKTtcblZ1ZS5jb21wb25lbnQoRHJvcGRvd24ubmFtZSwgRHJvcGRvd24pO1xuVnVlLmNvbXBvbmVudChEcm9wZG93bk1lbnUubmFtZSwgRHJvcGRvd25NZW51KTtcblZ1ZS5jb21wb25lbnQoRHJvcGRvd25JdGVtLm5hbWUsIERyb3Bkb3duSXRlbSk7XG5WdWUuY29tcG9uZW50KFVwbG9hZC5uYW1lLCBVcGxvYWQpO1xuVnVlLmNvbXBvbmVudChUYWJQYW5lLm5hbWUsIFRhYlBhbmUpO1xuVnVlLmNvbXBvbmVudChUYWJzLm5hbWUsIFRhYnMpO1xuVnVlLmNvbXBvbmVudChEYXRlUGlja2VyLm5hbWUsIERhdGVQaWNrZXIpO1xuVnVlLmNvbXBvbmVudChUcmFuc2Zlci5uYW1lLCBUcmFuc2Zlcik7XG5WdWUuY29tcG9uZW50KERpYWxvZy5uYW1lLCBEaWFsb2cpO1xuVnVlLmNvbXBvbmVudChUaW1lU2VsZWN0Lm5hbWUsIFRpbWVTZWxlY3QpO1xuVnVlLmNvbXBvbmVudChDb2xvclBpY2tlci5uYW1lLCBDb2xvclBpY2tlcik7XG5cblZ1ZS51c2UoTG9hZGluZy5kaXJlY3RpdmUpO1xuVnVlLnByb3RvdHlwZS4kbWVzc2FnZSA9IE1lc3NhZ2U7XG5WdWUucHJvdG90eXBlLiRtc2dib3ggPSBNZXNzYWdlQm94O1xuVnVlLnByb3RvdHlwZS4kYWxlcnQgPSBNZXNzYWdlQm94LmFsZXJ0O1xuVnVlLnByb3RvdHlwZS4kY29uZmlybSA9IE1lc3NhZ2VCb3guY29uZmlybTtcblZ1ZS5wcm90b3R5cGUuJHByb21wdCA9IE1lc3NhZ2VCb3gucHJvbXB0O1xuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IHtsaWJyYXJ5LCBkb219IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSdcbmltcG9ydCB7ZmFzfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnXG5pbXBvcnQge0ZvbnRBd2Vzb21lSWNvbn0gZnJvbSAnQGZvcnRhd2Vzb21lL3Z1ZS1mb250YXdlc29tZSdcblxuLy8gV2F0Y2ggPGk+IHRhZ3MgYW5kIHRyYW5zZm9ybSB0aGVtIHRvIFNWRyBmb3IgZm9udCBhd2Vzb21lIGljb25zXG5kb20ud2F0Y2goKTtcblxubGlicmFyeS5hZGQoZmFzKTtcblZ1ZS5jb21wb25lbnQoJ2ZvbnQtYXdlc29tZS1pY29uJywgRm9udEF3ZXNvbWVJY29uKTtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCB7SW5wdXRDaGVja2JveCwgSW5wdXRDb2RlLCBJbnB1dENvbG9yUGlja2VyLCBJbnB1dERhdGVUaW1lLCBJbnB1dEVkaXRvciwgSW5wdXROdW1iZXIsIElucHV0UGFzc3dvcmQsIElucHV0UmFkaW8sIElucHV0U2VsZWN0LCBJbnB1dFRleHQsIElucHV0VGltZSwgSW5wdXRVcGxvYWQsIFZ1ZUZvcm19IGZyb20gJ0BiaXQvZS1zaXRlcy52dWUuZ2xvYmFsLmZvcm0nO1xuXG5WdWUuY29tcG9uZW50KFZ1ZUZvcm0ubmFtZSwgVnVlRm9ybSk7XG5WdWUuY29tcG9uZW50KElucHV0UmFkaW8ubmFtZSwgSW5wdXRSYWRpbyk7XG5WdWUuY29tcG9uZW50KElucHV0Q2hlY2tib3gubmFtZSwgSW5wdXRDaGVja2JveCk7XG5WdWUuY29tcG9uZW50KElucHV0VGV4dC5uYW1lLCBJbnB1dFRleHQpO1xuVnVlLmNvbXBvbmVudChJbnB1dE51bWJlci5uYW1lLCBJbnB1dE51bWJlcik7XG5WdWUuY29tcG9uZW50KElucHV0UGFzc3dvcmQubmFtZSwgSW5wdXRQYXNzd29yZCk7XG5WdWUuY29tcG9uZW50KElucHV0RWRpdG9yLm5hbWUsIElucHV0RWRpdG9yKTtcblZ1ZS5jb21wb25lbnQoSW5wdXRTZWxlY3QubmFtZSwgSW5wdXRTZWxlY3QpO1xuVnVlLmNvbXBvbmVudChJbnB1dFVwbG9hZC5uYW1lLCBJbnB1dFVwbG9hZCk7XG5WdWUuY29tcG9uZW50KElucHV0RGF0ZVRpbWUubmFtZSwgSW5wdXREYXRlVGltZSk7XG5WdWUuY29tcG9uZW50KElucHV0Q29kZS5uYW1lLCBJbnB1dENvZGUpO1xuVnVlLmNvbXBvbmVudChJbnB1dFRpbWUubmFtZSwgSW5wdXRUaW1lKTtcblZ1ZS5jb21wb25lbnQoSW5wdXRDb2xvclBpY2tlci5uYW1lLCBJbnB1dENvbG9yUGlja2VyKTtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXG5cblZ1ZS5wcm90b3R5cGUuJG1vbWVudCA9IG1vbWVudDtcblZ1ZS5wcm90b3R5cGUuJG1vbWVudC5sb2NhbGUoJ25sJyk7XG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgVnVlUHJvZ3Jlc3NCYXIgZnJvbSAndnVlLXByb2dyZXNzYmFyJ1xuaW1wb3J0ICd2dWUtcHJvZ3Jlc3MtcGF0aC9kaXN0L3Z1ZS1wcm9ncmVzcy1wYXRoLmNzcydcbmltcG9ydCBWdWVQcm9ncmVzcyBmcm9tICd2dWUtcHJvZ3Jlc3MtcGF0aCdcblxuVnVlLnVzZShWdWVQcm9ncmVzcyk7XG5WdWUudXNlKFZ1ZVByb2dyZXNzQmFyLCB7XG4gICAgY29sb3I6ICcjZmZkNjAwJyxcbiAgICBmYWlsZWRDb2xvcjogJyNmNTM2NWMnLFxuICAgIHRoaWNrbmVzczogJzVweCcsXG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgICBzcGVlZDogJzAuMnMnLFxuICAgICAgICBvcGFjaXR5OiAnMC42cycsXG4gICAgICAgIHRlcm1pbmF0aW9uOiAzMDBcbiAgICB9XG59KTtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndnVlLXJvdXRlcic7XG5pbXBvcnQgcm91dGVzIGZyb20gJy4uL3JvdXRlcyc7XG5pbXBvcnQgT0F1dGhTZXJ2aWNlIGZyb20gJy4vLi4vc2VydmljZXMvb2F1dGguc2VydmljZSc7XG5cbmNvbnN0IHJvdXRlciA9IG5ldyBWdWVSb3V0ZXIoe1xuICAgIG1vZGU6ICdoaXN0b3J5JyxcbiAgICBiYXNlOiAnL2JldGEvJyxcbiAgICByb3V0ZXM6IHJvdXRlc1xufSk7XG5cblZ1ZS51c2UoVnVlUm91dGVyKTtcblxubGV0IG9BdXRoID0gbmV3IE9BdXRoU2VydmljZSgpO1xuXG5yb3V0ZXIuYmVmb3JlRWFjaCgodG8sIGZyb20sIG5leHQpID0+IHtcbiAgICAvL0lmIHZpc2l0aW5nIGxvZ2luIHZpZXcgYnV0IHlvdSBhbHJlYWR5IGhhdmUgbG9nZ2VkIGluLCB5b3Ugc2hvdWxkIG5vdCBiZSBhYmxlIHRvIHNlZSB0aGlzIHZpZXdcbiAgICBpZiAoIXRvLm1ldGEuYXV0aCAmJiBvQXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICByZXR1cm4gbmV4dCh7XG4gICAgICAgICAgICBwYXRoOiAnLydcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvL0lmIHlvdSBhcmUgdmlzaXRpbmcgJy8nIGFuZCB5b3UgYXJlIGEgZ3Vlc3QgdGhlbiwgeW91IG11c3QgYmUgcmVkaXJlY3RlZCB0byBsb2dpblxuICAgIGlmICh0by5tZXRhLmF1dGggJiYgb0F1dGguZ3Vlc3QoKSkge1xuICAgICAgICByZXR1cm4gbmV4dCh7XG4gICAgICAgICAgICBwYXRoOiAnL2xvZ2luJyxcbiAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3Q6IHRvLmZ1bGxQYXRoXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gTG9nZ2VkIGluIGFuZCB2aXNpdGluZyBhIHByb3RlY3RlZCByb3V0ZVxuICAgIGlmKHRvLm1ldGEuYXV0aCAmJiBvQXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdXNlciBoYXMgc2VsZWN0ZWQgYW4gYXBwbGljYXRpb24gdmVyc2lvblxuICAgICAgICBpZighVnVlLnByb3RvdHlwZS4kYXBwbGljYXRpb25TZXJ2aWNlLnZlcnNpb25Jc1NldCgpICYmIHRvLm5hbWUgIT09ICdhcHBsaWNhdGlvbnMuc2VsZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIG5leHQoe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdhcHBsaWNhdGlvbnMuc2VsZWN0J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighVnVlLnByb3RvdHlwZS4kYXV0aC51c2VySGFzUm9sZSh0by5tZXRhLnJvbGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV4dCh7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2Rhc2hib2FyZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQoKVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCB7VnVlVGFibGUsIFZ1ZVRhYmxlQ29sdW1uLCBWdWVUYWJsZUhlYWRlcn0gZnJvbSAnQGJpdC9lLXNpdGVzLnZ1ZS5nbG9iYWwudGFibGUnO1xuXG5WdWUuY29tcG9uZW50KFZ1ZVRhYmxlLm5hbWUsIFZ1ZVRhYmxlKTtcblZ1ZS5jb21wb25lbnQoVnVlVGFibGVDb2x1bW4ubmFtZSwgVnVlVGFibGVDb2x1bW4pO1xuVnVlLmNvbXBvbmVudChWdWVUYWJsZUhlYWRlci5uYW1lLCBWdWVUYWJsZUhlYWRlcik7XG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xuXG5WdWUubWl4aW4oe1xuICAgIGZpbHRlcnM6IHtcbiAgICAgICAgY2FwaXRhbGl6ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHZhbHVlLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgc3VibWl0U3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kbWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdEZSBnZWdldmVucyB6aWpuIG9wZ2VzbGFnZW4nXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBzdWJtaXRFcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kbWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnRXIgaXMgaWV0cyBtaXMgZ2VnYWFuLCBwcm9iZWVyIGhldCBub2dtYWFscydcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpcm06IGZ1bmN0aW9uICh0ZXh0LCB0aXRsZSwgY29uZmlybUJ1dHRvblRleHQgPSAnVmVyd2lqZGVyZW4nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kY29uZmlybSh0ZXh0LCB0aXRsZSwge1xuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBjb25maXJtQnV0dG9uVGV4dCxcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQW5udWxlcmVuJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXG4gICAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlVc2VIVE1MU3RyaW5nOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNFbXB0eSh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICB9LFxuICAgICAgICBmb3JtYXRQcmljZSh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IHZhbCA9ICh2YWx1ZSAvIDEpLnRvRml4ZWQoMikucmVwbGFjZSgnLicsICcsJylcbiAgICAgICAgICAgIHJldHVybiB2YWwudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIilcbiAgICAgICAgfSxcbiAgICAgICAgZG93bmxvYWRGaWxlKHVybCwgbWV0aG9kID0gJ2dldCcsIGRhdGEgPSB7fSkge1xuICAgICAgICAgICAgYXhpb3Moe1xuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnYmxvYidcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmaWxlTmFtZSA9ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3Bvc2l0aW9uID0gcmVzcG9uc2UuaGVhZGVyc1snY29udGVudC1kaXNwb3NpdGlvbiddXG5cbiAgICAgICAgICAgICAgICBpZiAoZGlzcG9zaXRpb24gJiYgZGlzcG9zaXRpb24uaW5kZXhPZignYXR0YWNobWVudCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZW5hbWVSZWdleCA9IC9maWxlbmFtZVteOz1cXG5dKj0oKFsnXCJdKS4qP1xcMnxbXjtcXG5dKikvO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWF0Y2hlcyA9IGZpbGVuYW1lUmVnZXguZXhlYyhkaXNwb3NpdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXNbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lID0gbWF0Y2hlc1sxXS5yZXBsYWNlKC9bJ1wiXS9nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbcmVzcG9uc2UuZGF0YV0pKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgICAgICAgICAgICAgbGluay5ocmVmID0gdXJsO1xuICAgICAgICAgICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVOYW1lKTsgLy9vciBhbnkgb3RoZXIgZXh0ZW5zaW9uXG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICAgICAgICAgIGxpbmsuY2xpY2soKTtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5WdWUuZmlsdGVyKCdjYXBpdGFsaXplJywgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG59KTtcblxuVnVlLmRpcmVjdGl2ZSgndXNlci1oYXMtcm9sZScsIGZ1bmN0aW9uIChlbCwgYmluZGluZ3MsIHZub2RlKSB7XG4gICAgY29uc3QgYmVoYXZpb3VyID0gYmluZGluZ3MubW9kaWZpZXJzLmRpc2FibGUgPyAnZGlzYWJsZScgOiAnaGlkZSc7XG5cbiAgICBjb25zb2xlLmxvZyhWdWUucHJvdG90eXBlLiRhdXRoLnVzZXJIYXNSb2xlKGJpbmRpbmdzLnZhbHVlKSk7XG5cbiAgICBpZiAoIVZ1ZS5wcm90b3R5cGUuJGF1dGgudXNlckhhc1JvbGUoYmluZGluZ3MudmFsdWUpKSB7XG4gICAgICAgIGlmIChiZWhhdmlvdXIgPT09ICdoaWRlJykge1xuICAgICAgICAgICAgaGVscGVycy5jb21tZW50Tm9kZShlbCwgdm5vZGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGJlaGF2aW91ciA9PT0gJ2Rpc2FibGUnKSB7XG4gICAgICAgICAgICBlbC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vKipcbiAqIFBST1RPVFlQRVNcbiAqL1xuXG5cbi8qKlxuICogUHJvdG90eXBlIHRvIGNyZWF0ZSBhIHVybFxuICogQHBhcmFtIHVybFxuICogQHBhcmFtIHBhcmFtc1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuVnVlLnByb3RvdHlwZS4kdXJsID0gKHVybCwgcGFyYW1zID0ge30pID0+IHtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHBhcmFtcyk7XG5cbiAgICBmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShgOiR7a2V5fWAsIHBhcmFtc1trZXldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYC9hcGkvdnVlLyR7dXJsLnJlcGxhY2UoL15cXC8rL2csICcnKX1gO1xufTtcbiIsImltcG9ydCBhdXRoZW50aWNhdGlvbiBmcm9tICcuL21vZHVsZXMvYXV0aGVudGljYXRpb24nO1xuaW1wb3J0IGFwcGxpY2F0aW9ucyBmcm9tICcuL21vZHVsZXMvYXBwbGljYXRpb25zJztcbmltcG9ydCBwbHVnaW5zIGZyb20gJy4vbW9kdWxlcy9wbHVnaW5zJztcbmltcG9ydCB1c2VycyBmcm9tICcuL21vZHVsZXMvdXNlcnMnO1xuaW1wb3J0IG5vdGlmaWNhdGlvbnMgZnJvbSAnLi9tb2R1bGVzL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0IHZlcnNpb25zIGZyb20gJy4vbW9kdWxlcy9hcHBfdmVyc2lvbnMnO1xuaW1wb3J0IGRldmljZXMgZnJvbSAnLi9tb2R1bGVzL2RldmljZXMnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL21vZHVsZXMvcmVtb3RlX2NvbmZpZyc7XG5cbmNvbnN0IHJvdXRlcyA9IFt7XG4gICAgcGF0aDogJy8nLFxuICAgIG5hbWU6ICdkYXNoYm9hcmQnLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vdmlld3MvRGFzaGJvYXJkJykuZGVmYXVsdCxcbiAgICBtZXRhOiB7YXV0aDogdHJ1ZX0sXG59LCB7XG4gICAgcGF0aDogJyonLFxuICAgIG5hbWU6ICc0MDQnLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vdmlld3MvZXJyb3JzL05vdEZvdW5kJykuZGVmYXVsdCxcbiAgICBtZXRhOiB7YXV0aDogZmFsc2V9LFxufV0uY29uY2F0KFxuICAgIGF1dGhlbnRpY2F0aW9uLCBwbHVnaW5zLCBhcHBsaWNhdGlvbnMsIHZlcnNpb25zLCB1c2Vycywgbm90aWZpY2F0aW9ucywgZGV2aWNlcywgY29uZmlnXG4pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXM7XG4iLCJpbXBvcnQge1JPTEVfVVNFUiwgUk9MRV9BRE1JTiwgUk9MRV9TVVBFUl9BRE1JTn0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcblxuZXhwb3J0IGRlZmF1bHQgW3tcbiAgICBwYXRoOiAnL3ZlcnNpb25zJyxcbiAgICBuYW1lOiAnYXBwX3ZlcnNpb25zJyxcbiAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL3ZlcnNpb25zL0luZGV4JykuZGVmYXVsdCxcbiAgICBtZXRhOiB7YXV0aDogdHJ1ZSwgcm9sZTogUk9MRV9VU0VSfVxufSwge1xuICAgIHBhdGg6ICcvdmVyc2lvbnMvZWRpdCcsXG4gICAgbmFtZTogJ2FwcF92ZXJzaW9ucy5hZGQnLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vLi4vdmlld3MvdmVyc2lvbnMvRWRpdCcpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IHRydWUsIHJvbGU6IFJPTEVfVVNFUn1cbn0sIHtcbiAgICBwYXRoOiAnL3ZlcnNpb25zL2VkaXQvOmlkJyxcbiAgICBuYW1lOiAnYXBwX3ZlcnNpb25zLmVkaXQnLFxuICAgIHByb3BzOiB0cnVlLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vLi4vdmlld3MvdmVyc2lvbnMvRWRpdCcpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IHRydWUsIHJvbGU6IFJPTEVfVVNFUn1cbn1dO1xuIiwiaW1wb3J0IHtST0xFX1VTRVIsIFJPTEVfQURNSU4sIFJPTEVfU1VQRVJfQURNSU59IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IFt7XG4gICAgcGF0aDogJy9hcHBsaWNhdGlvbnMnLFxuICAgIG5hbWU6ICdhcHBsaWNhdGlvbnMnLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vLi4vdmlld3MvYXBwbGljYXRpb25zL0luZGV4JykuZGVmYXVsdCxcbiAgICBtZXRhOiB7YXV0aDogdHJ1ZSwgcm9sZTogUk9MRV9VU0VSfVxufSwge1xuICAgIHBhdGg6ICcvYXBwbGljYXRpb25zL3NlbGVjdCcsXG4gICAgbmFtZTogJ2FwcGxpY2F0aW9ucy5zZWxlY3QnLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vLi4vdmlld3MvYXBwbGljYXRpb25zL1NlbGVjdCcpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IHRydWUsIHJvbGU6IFJPTEVfVVNFUn1cbn0sIHtcbiAgICBwYXRoOiAnL2FwcGxpY2F0aW9ucy9lZGl0JyxcbiAgICBuYW1lOiAnYXBwbGljYXRpb25zLmFkZCcsXG4gICAgY29tcG9uZW50OiByZXF1aXJlKCcuLi8uLi92aWV3cy9hcHBsaWNhdGlvbnMvRWRpdCcpLmRlZmF1bHQsXG4gICAgcHJvcHM6IHRydWUsXG4gICAgbWV0YToge2F1dGg6IHRydWUsIHJvbGU6IFJPTEVfVVNFUn1cbn0sIHtcbiAgICBwYXRoOiAnL2FwcGxpY2F0aW9ucy9lZGl0LzppZCcsXG4gICAgbmFtZTogJ2FwcGxpY2F0aW9ucy5lZGl0JyxcbiAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL2FwcGxpY2F0aW9ucy9FZGl0JykuZGVmYXVsdCxcbiAgICBwcm9wczogdHJ1ZSxcbiAgICBtZXRhOiB7YXV0aDogdHJ1ZSwgcm9sZTogUk9MRV9VU0VSfVxufV07XG4iLCJleHBvcnQgZGVmYXVsdCBbe1xuICAgIHBhdGg6ICcvbG9naW4nLFxuICAgIG5hbWU6ICdsb2dpbicsXG4gICAgY29tcG9uZW50OiByZXF1aXJlKCcuLi8uLi92aWV3cy9hdXRoZW50aWNhdGlvbi9Mb2dpbicpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IGZhbHNlfVxufSwge1xuICAgIHBhdGg6ICcvcGFzc3dvcmQvZm9yZ290JyxcbiAgICBuYW1lOiAncGFzc3dvcmQuZm9yZ290JyxcbiAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0ZvcmdvdFBhc3N3b3JkJykuZGVmYXVsdCxcbiAgICBtZXRhOiB7YXV0aDogZmFsc2V9XG59LCB7XG4gICAgcGF0aDogJy9wYXNzd29yZC9yZXNldC86dG9rZW4nLFxuICAgIG5hbWU6ICdwYXNzd29yZC5yZXNldCcsXG4gICAgcHJvcHM6IHRydWUsXG4gICAgY29tcG9uZW50OiByZXF1aXJlKCcuLi8uLi92aWV3cy9hdXRoZW50aWNhdGlvbi9SZXNldFBhc3N3b3JkJykuZGVmYXVsdCxcbiAgICBtZXRhOiB7YXV0aDogZmFsc2V9XG59XTtcbiIsImltcG9ydCB7Uk9MRV9VU0VSLCBST0xFX0FETUlOLCBST0xFX1NVUEVSX0FETUlOfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBbe1xuICAgIHBhdGg6ICcvZGV2aWNlcycsXG4gICAgbmFtZTogJ2RldmljZXMnLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vLi4vdmlld3MvZGV2aWNlcy9JbmRleCcpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IHRydWUsIHJvbGU6IFJPTEVfVVNFUn1cbn0sIHtcbiAgICBwYXRoOiAnL2RldmljZXMvZWRpdCcsXG4gICAgbmFtZTogJ2RldmljZXMuYWRkJyxcbiAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL2RldmljZXMvRWRpdCcpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IHRydWUsIHJvbGU6IFJPTEVfVVNFUn1cbn1dO1xuIiwiaW1wb3J0IHtST0xFX1VTRVIsIFJPTEVfQURNSU4sIFJPTEVfU1VQRVJfQURNSU59IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IFt7XG4gICAgcGF0aDogJy9ub3RpZmljYXRpb25zJyxcbiAgICBuYW1lOiAncHVzaF9ub3RpZmljYXRpb25zJyxcbiAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL25vdGlmaWNhdGlvbnMvSW5kZXgnKS5kZWZhdWx0LFxuICAgIG1ldGE6IHthdXRoOiB0cnVlLCByb2xlOiBST0xFX1VTRVJ9XG59LCB7XG4gICAgcGF0aDogJy9ub3RpZmljYXRpb25zL2VkaXQnLFxuICAgIG5hbWU6ICdwdXNoX25vdGlmaWNhdGlvbnMuYWRkJyxcbiAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL25vdGlmaWNhdGlvbnMvRWRpdCcpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IHRydWUsIHJvbGU6IFJPTEVfVVNFUn1cbn0sIHtcbiAgICBwYXRoOiAnL25vdGlmaWNhdGlvbnMvZWRpdC86aWQnLFxuICAgIG5hbWU6ICdwdXNoX25vdGlmaWNhdGlvbnMuZWRpdCcsXG4gICAgcHJvcHM6IHRydWUsXG4gICAgY29tcG9uZW50OiByZXF1aXJlKCcuLi8uLi92aWV3cy9ub3RpZmljYXRpb25zL0VkaXQnKS5kZWZhdWx0LFxuICAgIG1ldGE6IHthdXRoOiB0cnVlLCByb2xlOiBST0xFX1VTRVJ9XG59LCB7XG4gICAgcGF0aDogJy9ub3RpZmljYXRpb25zL3NlZ21lbnRzJyxcbiAgICBuYW1lOiAncHVzaF9ub3RpZmljYXRpb25zLnNlZ21lbnRzJyxcbiAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL25vdGlmaWNhdGlvbnMvc2VnbWVudHMvSW5kZXgnKS5kZWZhdWx0LFxuICAgIG1ldGE6IHthdXRoOiB0cnVlLCByb2xlOiBST0xFX1VTRVJ9XG59LCB7XG4gICAgcGF0aDogJy9ub3RpZmljYXRpb25zL3NlZ21lbnRzL2VkaXQnLFxuICAgIG5hbWU6ICdwdXNoX25vdGlmaWNhdGlvbnMuc2VnbWVudHMuYWRkJyxcbiAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL25vdGlmaWNhdGlvbnMvc2VnbWVudHMvRWRpdCcpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IHRydWUsIHJvbGU6IFJPTEVfVVNFUn1cbn0sIHtcbiAgICBwYXRoOiAnL25vdGlmaWNhdGlvbnMvc2VnbWVudHMvZWRpdC86aWQnLFxuICAgIG5hbWU6ICdwdXNoX25vdGlmaWNhdGlvbnMuc2VnbWVudHMuZWRpdCcsXG4gICAgcHJvcHM6IHRydWUsXG4gICAgY29tcG9uZW50OiByZXF1aXJlKCcuLi8uLi92aWV3cy9ub3RpZmljYXRpb25zL3NlZ21lbnRzL0VkaXQnKS5kZWZhdWx0LFxuICAgIG1ldGE6IHthdXRoOiB0cnVlLCByb2xlOiBST0xFX1VTRVJ9XG59XTtcbiIsImltcG9ydCB7Uk9MRV9VU0VSLCBST0xFX0FETUlOLCBST0xFX1NVUEVSX0FETUlOfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBbe1xuICAgIHBhdGg6ICcvcGx1Z2lucycsXG4gICAgbmFtZTogJ3BsdWdpbnMnLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vLi4vdmlld3MvcGx1Z2lucy9JbmRleCcpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IHRydWUsIHJvbGU6IFJPTEVfVVNFUn1cbn0sIHtcbiAgICBwYXRoOiAnL3BsdWdpbnMvZWRpdC86aWQnLFxuICAgIG5hbWU6ICdwbHVnaW5zLmVkaXQnLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vLi4vdmlld3MvcGx1Z2lucy9FZGl0JykuZGVmYXVsdCxcbiAgICBwcm9wczogdHJ1ZSxcbiAgICBtZXRhOiB7YXV0aDogdHJ1ZSwgcm9sZTogUk9MRV9VU0VSfVxufV07XG4iLCJpbXBvcnQge1JPTEVfVVNFUiwgUk9MRV9BRE1JTiwgUk9MRV9TVVBFUl9BRE1JTn0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlJztcblxuZXhwb3J0IGRlZmF1bHQgW3tcbiAgICBwYXRoOiAnL2NvbmZpZycsXG4gICAgbmFtZTogJ3JlbW90ZV9jb25maWcnLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vLi4vdmlld3MvY29uZmlnL0luZGV4JykuZGVmYXVsdCxcbiAgICBtZXRhOiB7YXV0aDogdHJ1ZSwgcm9sZTogUk9MRV9VU0VSfVxufSwge1xuICAgIHBhdGg6ICcvY29uZmlnL2VkaXQnLFxuICAgIG5hbWU6ICdyZW1vdGVfY29uZmlnLmFkZCcsXG4gICAgY29tcG9uZW50OiByZXF1aXJlKCcuLi8uLi92aWV3cy9jb25maWcvRWRpdCcpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IHRydWUsIHJvbGU6IFJPTEVfVVNFUn1cbn0sIHtcbiAgICBwYXRoOiAnL2NvbmZpZy9lZGl0LzppZCcsXG4gICAgbmFtZTogJ3JlbW90ZV9jb25maWcuZWRpdCcsXG4gICAgcHJvcHM6IHRydWUsXG4gICAgY29tcG9uZW50OiByZXF1aXJlKCcuLi8uLi92aWV3cy9jb25maWcvRWRpdCcpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IHRydWUsIHJvbGU6IFJPTEVfVVNFUn1cbn1dO1xuIiwiaW1wb3J0IHtST0xFX1VTRVIsIFJPTEVfQURNSU4sIFJPTEVfU1VQRVJfQURNSU59IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGguc2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IFt7XG4gICAgcGF0aDogJy91c2VycycsXG4gICAgbmFtZTogJ3VzZXJzJyxcbiAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL3VzZXJzL0luZGV4JykuZGVmYXVsdCxcbiAgICBtZXRhOiB7YXV0aDogdHJ1ZSwgcm9sZTogUk9MRV9VU0VSfVxufSwge1xuICAgIHBhdGg6ICcvdXNlcnMvZWRpdCcsXG4gICAgbmFtZTogJ3VzZXJzLmFkZCcsXG4gICAgY29tcG9uZW50OiByZXF1aXJlKCcuLi8uLi92aWV3cy91c2Vycy9FZGl0JykuZGVmYXVsdCxcbiAgICBtZXRhOiB7YXV0aDogdHJ1ZSwgcm9sZTogUk9MRV9VU0VSfVxufSwge1xuICAgIHBhdGg6ICcvdXNlcnMvZWRpdC86aWQnLFxuICAgIG5hbWU6ICd1c2Vycy5lZGl0JyxcbiAgICBwcm9wczogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL3VzZXJzL0VkaXQnKS5kZWZhdWx0LFxuICAgIG1ldGE6IHthdXRoOiB0cnVlLCByb2xlOiBST0xFX1VTRVJ9XG59XTtcbiIsImltcG9ydCB7Uk9MRV9VU0VSLCBST0xFX0FETUlOLCBST0xFX1NVUEVSX0FETUlOfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBbe1xuICAgIG5hbWU6ICdhcHBsaWNhdGlvbnMnLFxuICAgIGljb246ICdsaXN0LWFsdCcsXG4gICAgdGV4dDogJ0FwcGxpY2F0aWVzJyxcbiAgICByb2xlOiBST0xFX1NVUEVSX0FETUlOLFxufSwge1xuICAgIG5hbWU6ICdjb2xsZWN0aW9ucycsXG4gICAgaWNvbjogJ2ZpbGUtYWx0JyxcbiAgICB0ZXh0OiAnQ29sbGVjdGllcycsXG4gICAgc3VibWVudU9wZW46IGZhbHNlLFxuICAgIHJvbGU6IFJPTEVfVVNFUixcbiAgICBjaGlsZHJlbjogW10sXG59LCB7XG4gICAgbmFtZTogJ3B1c2hfbm90aWZpY2F0aW9ucycsXG4gICAgaWNvbjogJ2JlbGwnLFxuICAgIHRleHQ6ICdQdXNoIG5vdGlmaWNhdGllcycsXG4gICAgc3VibWVudU9wZW46IGZhbHNlLFxuICAgIHJvbGU6IFJPTEVfVVNFUixcbiAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgbmFtZTogJ3B1c2hfbm90aWZpY2F0aW9ucy5zZWdtZW50cycsXG4gICAgICAgIHRleHQ6ICdTZWdtZW50ZW4nLFxuICAgICAgICByb2xlOiBST0xFX1NVUEVSX0FETUlOLFxuICAgIH1dLFxufSwge1xuICAgIG5hbWU6ICdkZXZpY2VzJyxcbiAgICBpY29uOiAnbW9iaWxlLWFsdCcsXG4gICAgdGV4dDogJ0FwcGFyYXRlbicsXG4gICAgcm9sZTogUk9MRV9VU0VSLFxufSwge1xuICAgIG5hbWU6ICdhcHBfdmVyc2lvbnMnLFxuICAgIGljb246ICdjb2RlLWJyYW5jaCcsXG4gICAgdGV4dDogJ0FwcCB2ZXJzaWVzJyxcbiAgICByb2xlOiBST0xFX1NVUEVSX0FETUlOLFxufSwge1xuICAgIG5hbWU6ICdyZW1vdGVfY29uZmlnJyxcbiAgICBpY29uOiAnbGlzdCcsXG4gICAgdGV4dDogJ1JlbW90ZSBjb25maWcnLFxuICAgIHJvbGU6IFJPTEVfVVNFUixcbn0sIHtcbiAgICBuYW1lOiAndXNlcnMnLFxuICAgIGljb246ICdsaXN0JyxcbiAgICB0ZXh0OiAnR2VicnVpa2VycycsXG4gICAgcm9sZTogUk9MRV9VU0VSLFxufSwge1xuICAgIG5hbWU6ICdwbHVnaW5zJyxcbiAgICBpY29uOiAncGx1ZycsXG4gICAgdGV4dDogJ1BsdWdpbnMnLFxuICAgIHJvbGU6IFJPTEVfU1VQRVJfQURNSU4sXG59LCB7XG4gICAgbmFtZTogJ2N1c3RvbWVyJyxcbiAgICBpY29uOiAnY29ncycsXG4gICAgdGV4dDogJ0tsYW50aW5mb3JtYXRpZScsXG4gICAgcm9sZTogUk9MRV9TVVBFUl9BRE1JTixcbn1dO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb25TZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gVE9ETzogUmV0cmlldmUgYW4gdXBkYXRlZCBpbnN0YW5jZSBvZiB0aGUgYXBwbGljYXRpb24gZnJvbSB0aGUgYXBpLCB0byB1cGRhdGUgcHJvcGVydGllc1xuICAgIH1cblxuICAgIGFwcGxpY2F0aW9uSXNTZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFwcGxpY2F0aW9uKCkgIT09IG51bGw7XG4gICAgfVxuXG4gICAgc2V0QXBwbGljYXRpb24oYXBwbGljYXRpb24pIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcGxpY2F0aW9uJywgSlNPTi5zdHJpbmdpZnkoYXBwbGljYXRpb24pKTtcbiAgICB9XG5cbiAgICBnZXRBcHBsaWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwcGxpY2F0aW9uJykpO1xuICAgIH1cblxuICAgIGNsZWFyQXBwbGljYXRpb24oKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhcHBsaWNhdGlvbicpO1xuICAgIH1cblxuICAgIHZlcnNpb25Jc1NldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmVyc2lvbigpICE9PSBudWxsO1xuICAgIH1cblxuICAgIHNldFZlcnNpb24odmVyc2lvbikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXBwbGljYXRpb25WZXJzaW9uJywgSlNPTi5zdHJpbmdpZnkodmVyc2lvbikpO1xuICAgIH1cblxuICAgIGdldFZlcnNpb24oKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBsaWNhdGlvblZlcnNpb24nKSk7XG4gICAgfVxuXG4gICAgY2xlYXJWZXJzaW9uKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndmVyc2lvbicpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmNsZWFyQXBwbGljYXRpb24oKTtcbiAgICAgICAgdGhpcy5jbGVhclZlcnNpb24oKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5cbmV4cG9ydCBjb25zdCBST0xFX1VTRVIgPSAnUk9MRV9VU0VSJztcbmV4cG9ydCBjb25zdCBST0xFX0FETUlOID0gJ1JPTEVfQURNSU4nO1xuZXhwb3J0IGNvbnN0IFJPTEVfU1VQRVJfQURNSU4gPSAnUk9MRV9TVVBFUl9BRE1JTic7XG5cbi8qKlxuICogQUNMIGNsYXNzIHRvIHByb3ZpZGUgaGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIHVzZXIgYW5kIGl0J3Mgcm9sZXNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgQUNMIHBsdWdpblxuICAgICAqL1xuICAgIGFzeW5jIGluaXQoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmFsbChbXG4gICAgICAgICAgICAgICAgYXhpb3MuZ2V0KFZ1ZS5wcm90b3R5cGUuJHVybCgnYXV0aC91c2VyJykpLFxuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIHRoaXMudXNlciA9IHJlc3BvbnNlWzBdLmRhdGEuZGF0YTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMudXNlciA9IHt9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSB1c2VyIGhhcyB0aGUgcHJvdmlkZWQgcm9sZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqIEBwYXJhbSByb2xlXG4gICAgICovXG4gICAgdXNlckhhc1JvbGUocm9sZSkge1xuICAgICAgICBpZiAodGhpcy5pc0FkbWluKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYocm9sZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlcik7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVzZXIucm9sZXMuaW5kZXhPZihyb2xlKSAhPT0gLTE7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBhIHVzZXIgaXMgYW4gYWRtaW5pc3RyYXRvclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzQWRtaW4oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyLnJvbGVzLmluZGV4T2YoJ1JPTEVfU1VQRVJfQURNSU4nKSAhPT0gLTE7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQ29va2llcyBmcm9tICdqcy1jb29raWUnO1xuaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQXV0aFNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uID0gQ29va2llcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dvdXRcbiAgICAgKi9cbiAgICBsb2dvdXQoKSB7XG4gICAgICAgIFZ1ZS5wcm90b3R5cGUuJGFwcGxpY2F0aW9uU2VydmljZS5jbGVhcigpO1xuXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5yZW1vdmUoJ2FjY2Vzc190b2tlbicpO1xuICAgICAgICB0aGlzLnNlc3Npb24ucmVtb3ZlKCdyZWZyZXNoX3Rva2VuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR3Vlc3QgY2hlY2tcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBndWVzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi5nZXQoJ2FjY2Vzc190b2tlbicpID09PSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdXNlciBpcyBsb2dnZWQgaW5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0F1dGhlbnRpY2F0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb24uZ2V0KCdhY2Nlc3NfdG9rZW4nKSAhPT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZnJlc2ggdGhlIGFjY2VzcyB0b2tlbiBvZiB0aGUgdXNlclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgcmVmcmVzaFRva2VuKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgYXhpb3MucG9zdCgnL2FwaS92dWUvYXV0aC9yZWZyZXNoJywge1xuICAgICAgICAgICAgICAgIHJlZnJlc2hfdG9rZW46IHRoaXMuc2Vzc2lvbi5nZXQoJ3JlZnJlc2hfdG9rZW4nKVxuICAgICAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZVNlc3Npb24ocmVzcG9uc2UuZGF0YSk7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKVxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhdXRoZW50aWNhdGlvbiBoZWFkZXJcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBnZXRBdXRoSGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgbGV0IGFjY2Vzc190b2tlbiA9IHRoaXMuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJyk7XG5cbiAgICAgICAgICAgIHJldHVybiAnQmVhcmVyICcgKyBhY2Nlc3NfdG9rZW5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGl0ZW0gZnJvbSB0aGUgY29va2llc1xuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKi9cbiAgICBnZXRJdGVtKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXNzaW9uLmdldChrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3JlIHRoZSBzZXNzaW9uIGRhdGFcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqL1xuICAgIHN0b3JlU2Vzc2lvbihkYXRhKSB7XG4gICAgICAgIGxldCBob3VySW5NaWxsaVNlY29uZHMgPSA4NjQwMDtcbiAgICAgICAgbGV0IHRpbWUgPSBkYXRhLmV4cGlyZXNfaW4gLyBob3VySW5NaWxsaVNlY29uZHM7XG5cbiAgICAgICAgdGhpcy5zZXNzaW9uLnNldCgnYWNjZXNzX3Rva2VuJywgZGF0YS5hY2Nlc3NfdG9rZW4sIHtcbiAgICAgICAgICAgIGV4cGlyZXM6IHRpbWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5zZXQoJ3JlZnJlc2hfdG9rZW4nLCBkYXRhLnJlZnJlc2hfdG9rZW4sIHtcbiAgICAgICAgICAgIGV4cGlyZXM6IHRpbWUgKiAyLFxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wZTA5MWYzYSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvdGhvbWFzcm9vdmVycy9EZXZlbG9wZXIvQnVuZGxlcy9Nb2JpbGVCdW5kbGUvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMGUwOTFmM2EnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMGUwOTFmM2EnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMGUwOTFmM2EnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0FwcC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MGUwOTFmM2EmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMGUwOTFmM2EnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0FwcC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTBlMDkxZjNhJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9EYXNoYm9hcmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWMxZWJiMDU0JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0Rhc2hib2FyZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0Rhc2hib2FyZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9CdW5kbGVzL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCdjMWViYjA1NCcpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCdjMWViYjA1NCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCdjMWViYjA1NCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vRGFzaGJvYXJkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1jMWViYjA1NCZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCdjMWViYjA1NCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvRGFzaGJvYXJkLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRGFzaGJvYXJkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9EYXNoYm9hcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Rhc2hib2FyZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YzFlYmIwNTQmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0VkaXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWU4ZGFjNDEwJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0VkaXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9FZGl0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0J1bmRsZXMvTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJ2U4ZGFjNDEwJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJ2U4ZGFjNDEwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJ2U4ZGFjNDEwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9FZGl0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1lOGRhYzQxMCZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCdlOGRhYzQxMCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXBwbGljYXRpb25zL0VkaXQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9FZGl0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9FZGl0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9FZGl0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1lOGRhYzQxMCZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTI4NzhkYWQ0JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0luZGV4LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvdGhvbWFzcm9vdmVycy9EZXZlbG9wZXIvQnVuZGxlcy9Nb2JpbGVCdW5kbGUvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMjg3OGRhZDQnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMjg3OGRhZDQnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMjg3OGRhZDQnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0luZGV4LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yODc4ZGFkNCZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcyODc4ZGFkNCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXBwbGljYXRpb25zL0luZGV4LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0luZGV4LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9JbmRleC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9Mjg3OGRhZDQmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1NlbGVjdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NWEwNjVlNmEmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vU2VsZWN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vU2VsZWN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9TZWxlY3QudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NWEwNjVlNmEmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI1YTA2NWU2YVwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9CdW5kbGVzL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc1YTA2NWU2YScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc1YTA2NWU2YScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc1YTA2NWU2YScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vU2VsZWN0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01YTA2NWU2YSZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc1YTA2NWU2YScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXBwbGljYXRpb25zL1NlbGVjdC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1NlbGVjdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vU2VsZWN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTQtb25lT2YtMS0xIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTQtb25lT2YtMS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtb25lT2YtMS0zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vU2VsZWN0LnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTVhMDY1ZTZhJnNjb3BlZD10cnVlJmxhbmc9c2NzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNC1vbmVPZi0xLTEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZXNvbHZlLXVybC1sb2FkZXIvaW5kZXguanM/P3JlZi0tNC1vbmVPZi0xLTIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tNC1vbmVPZi0xLTMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9TZWxlY3QudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NWEwNjVlNmEmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1NlbGVjdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NWEwNjVlNmEmc2NvcGVkPXRydWUmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0ZvcmdvdFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01ODA1Yzc1NyZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Gb3Jnb3RQYXNzd29yZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0ZvcmdvdFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0J1bmRsZXMvTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzU4MDVjNzU3JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzU4MDVjNzU3JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzU4MDVjNzU3JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Gb3Jnb3RQYXNzd29yZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTgwNWM3NTcmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNTgwNWM3NTcnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0ZvcmdvdFBhc3N3b3JkLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRm9yZ290UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZvcmdvdFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Gb3Jnb3RQYXNzd29yZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTgwNWM3NTcmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0xvZ2luLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03YTI1ZTEwMCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0J1bmRsZXMvTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzdhMjVlMTAwJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzdhMjVlMTAwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzdhMjVlMTAwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9N2EyNWUxMDAmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignN2EyNWUxMDAnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0xvZ2luLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTG9naW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Mb2dpbi52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9N2EyNWUxMDAmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1Jlc2V0UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTA4NzI3NWExJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Jlc2V0UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9SZXNldFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0J1bmRsZXMvTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzA4NzI3NWExJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzA4NzI3NWExJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzA4NzI3NWExJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9SZXNldFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wODcyNzVhMSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcwODcyNzVhMScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVzZXRQYXNzd29yZC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jlc2V0UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jlc2V0UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jlc2V0UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTA4NzI3NWExJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9FZGl0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yNTU0OTIzOSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9FZGl0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vRWRpdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9CdW5kbGVzL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcyNTU0OTIzOScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcyNTU0OTIzOScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcyNTU0OTIzOScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vRWRpdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MjU1NDkyMzkmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMjU1NDkyMzknLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2NvbmZpZy9FZGl0LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MjU1NDkyMzkmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0luZGV4LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03MjE1MjI5YSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9JbmRleC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0luZGV4LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0J1bmRsZXMvTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzcyMTUyMjlhJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzcyMTUyMjlhJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzcyMTUyMjlhJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9JbmRleC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzIxNTIyOWEmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNzIxNTIyOWEnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2NvbmZpZy9JbmRleC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0luZGV4LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9JbmRleC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTcyMTUyMjlhJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9FZGl0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zZWRhNDhhYyZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9FZGl0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vRWRpdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9CdW5kbGVzL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCczZWRhNDhhYycpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCczZWRhNDhhYycsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCczZWRhNDhhYycsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vRWRpdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9M2VkYTQ4YWMmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignM2VkYTQ4YWMnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2RldmljZXMvRWRpdC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0VkaXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0VkaXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0VkaXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNlZGE0OGFjJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9JbmRleC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzM4MDUzNjImXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9JbmRleC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9CdW5kbGVzL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc3MzgwNTM2MicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc3MzgwNTM2MicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc3MzgwNTM2MicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTczODA1MzYyJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzczODA1MzYyJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJSZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9kZXZpY2VzL0luZGV4LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0luZGV4LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9JbmRleC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzM4MDUzNjImXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL05vdEZvdW5kLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zM2NlMjVkNiZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Ob3RGb3VuZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL05vdEZvdW5kLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0J1bmRsZXMvTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzMzY2UyNWQ2JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzMzY2UyNWQ2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzMzY2UyNWQ2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Ob3RGb3VuZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MzNjZTI1ZDYmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMzNjZTI1ZDYnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2Vycm9ycy9Ob3RGb3VuZC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL05vdEZvdW5kLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Ob3RGb3VuZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTm90Rm91bmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTMzY2UyNWQ2JlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9FZGl0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00OTFjM2Y3ZiZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9FZGl0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vRWRpdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9CdW5kbGVzL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc0OTFjM2Y3ZicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc0OTFjM2Y3ZicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc0OTFjM2Y3ZicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vRWRpdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDkxYzNmN2YmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNDkxYzNmN2YnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL25vdGlmaWNhdGlvbnMvRWRpdC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0VkaXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0VkaXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0VkaXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQ5MWMzZjdmJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9JbmRleC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MWMyMzZhMmQmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9JbmRleC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9CdW5kbGVzL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcxYzIzNmEyZCcpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcxYzIzNmEyZCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcxYzIzNmEyZCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTFjMjM2YTJkJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzFjMjM2YTJkJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJSZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9ub3RpZmljYXRpb25zL0luZGV4LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0luZGV4LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9JbmRleC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MWMyMzZhMmQmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0VkaXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTVjODliMjM0JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0VkaXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9FZGl0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0J1bmRsZXMvTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzVjODliMjM0JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzVjODliMjM0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzVjODliMjM0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9FZGl0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01Yzg5YjIzNCZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc1Yzg5YjIzNCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3Mvbm90aWZpY2F0aW9ucy9zZWdtZW50cy9FZGl0LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NWM4OWIyMzQmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0luZGV4LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03NjY0NGUxOCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9JbmRleC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0luZGV4LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0J1bmRsZXMvTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzc2NjQ0ZTE4JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzc2NjQ0ZTE4JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzc2NjQ0ZTE4JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9JbmRleC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzY2NDRlMTgmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNzY2NDRlMTgnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL25vdGlmaWNhdGlvbnMvc2VnbWVudHMvSW5kZXgudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9JbmRleC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0luZGV4LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03NjY0NGUxOCZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vU2lkZUJhci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTk0M2NjMmQmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vU2lkZUJhci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1NpZGVCYXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL1NpZGVCYXIudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9MTk0M2NjMmQmc2NvcGVkPXRydWUmbGFuZz1zY3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCIxOTQzY2MyZFwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9CdW5kbGVzL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcxOTQzY2MyZCcpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcxOTQzY2MyZCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcxOTQzY2MyZCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vU2lkZUJhci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTk0M2NjMmQmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMTk0M2NjMmQnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3BhcnRpYWxzL1NpZGVCYXIudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9TaWRlQmFyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9TaWRlQmFyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTQtb25lT2YtMS0xIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTQtb25lT2YtMS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtb25lT2YtMS0zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vU2lkZUJhci52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0xOTQzY2MyZCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTQtb25lT2YtMS0xIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVzb2x2ZS11cmwtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTQtb25lT2YtMS0yIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTQtb25lT2YtMS0zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vU2lkZUJhci52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD0xOTQzY2MyZCZzY29wZWQ9dHJ1ZSZsYW5nPXNjc3MmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vU2lkZUJhci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTk0M2NjMmQmc2NvcGVkPXRydWUmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0VkaXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWQ4OGQwNzcyJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0VkaXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9FZGl0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0J1bmRsZXMvTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJ2Q4OGQwNzcyJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJ2Q4OGQwNzcyJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJ2Q4OGQwNzcyJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9FZGl0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1kODhkMDc3MiZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCdkODhkMDc3MicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvcGx1Z2lucy9FZGl0LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZDg4ZDA3NzImXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0luZGV4LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yNTJkYzY2NSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9JbmRleC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0luZGV4LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0J1bmRsZXMvTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzI1MmRjNjY1JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzI1MmRjNjY1JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzI1MmRjNjY1JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9JbmRleC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MjUyZGM2NjUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMjUyZGM2NjUnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3BsdWdpbnMvSW5kZXgudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9JbmRleC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0luZGV4LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yNTJkYzY2NSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vRWRpdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9Y2EyOTNmNDImXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vRWRpdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0VkaXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvdGhvbWFzcm9vdmVycy9EZXZlbG9wZXIvQnVuZGxlcy9Nb2JpbGVCdW5kbGUvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnY2EyOTNmNDInKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnY2EyOTNmNDInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnY2EyOTNmNDInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0VkaXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWNhMjkzZjQyJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJ2NhMjkzZjQyJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJSZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy91c2Vycy9FZGl0LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRWRpdC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9Y2EyOTNmNDImXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0luZGV4LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wNDM4NjU0ZCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9JbmRleC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0luZGV4LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0J1bmRsZXMvTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzA0Mzg2NTRkJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzA0Mzg2NTRkJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzA0Mzg2NTRkJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9JbmRleC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MDQzODY1NGQmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMDQzODY1NGQnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL3VzZXJzL0luZGV4LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0luZGV4LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9JbmRleC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MDQzODY1NGQmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0VkaXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTgzNWEzZjAwJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0VkaXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9FZGl0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0J1bmRsZXMvTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzgzNWEzZjAwJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzgzNWEzZjAwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzgzNWEzZjAwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9FZGl0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD04MzVhM2YwMCZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc4MzVhM2YwMCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvdmVyc2lvbnMvRWRpdC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0VkaXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0VkaXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0VkaXQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTgzNWEzZjAwJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9JbmRleC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGRjMGU5NGMmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9JbmRleC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9CdW5kbGVzL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc0ZGMwZTk0YycpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc0ZGMwZTk0YycsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc0ZGMwZTk0YycsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRkYzBlOTRjJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzRkYzBlOTRjJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJSZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy92ZXJzaW9ucy9JbmRleC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0luZGV4LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9JbmRleC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSW5kZXgudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRkYzBlOTRjJlwiIiwiPHRlbXBsYXRlPlxuICAgIDxkaXY+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiYXV0aGVudGljYXRlZFwiPlxuICAgICAgICAgICAgPGhlYWRlci8+XG5cbiAgICAgICAgICAgIDxtYWluPlxuICAgICAgICAgICAgICAgIDxhc2lkZT5cbiAgICAgICAgICAgICAgICAgICAgPHNpZGUtYmFyPjwvc2lkZS1iYXI+XG4gICAgICAgICAgICAgICAgPC9hc2lkZT5cblxuICAgICAgICAgICAgICAgIDxtYWluPlxuICAgICAgICAgICAgICAgICAgICA8bWFpbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItdmlldy8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbWFpbj5cblxuICAgICAgICAgICAgICAgICAgICA8Zm9vdGVyLz5cbiAgICAgICAgICAgICAgICA8L21haW4+XG4gICAgICAgICAgICA8L21haW4+XG4gICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgIDxtYWluPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItdmlldy8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21haW4+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBTaWRlQmFyIGZyb20gJy4vcGFydGlhbHMvU2lkZUJhcic7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG5cbiAgICAgICAgY29tcG9uZW50czoge1NpZGVCYXJ9LFxuXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGF1dGhlbnRpY2F0ZWQ6IHRoaXMuJG9hdXRoLmlzQXV0aGVudGljYXRlZCgpLFxuICAgICAgICAgICAgICAgIGFwcE1vdW50ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQXBwLnZ1ZSBjcmVhdGVkJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgIEV2ZW50cy4kb24oJ3VzZXJzOmF1dGhlbnRpY2F0ZWQnLCAodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJGF1dGguaW5pdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIGFwcFJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0aGVudGljYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kYXV0aC51c2VyICE9PSBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcE1vdW50ZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGJlZm9yZVJvdXRlRW50ZXIodG8sIGZyb20sIG5leHQpIHtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7fSxcbiAgICB9XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgIENhcmQgdGl0bGVcbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLy9cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBiZWZvcmVSb3V0ZUVudGVyKHRvLCBmcm9tLCBuZXh0KSB7XG4gICAgICAgIG5leHQoKTtcbiAgICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgIDx2dWUtZm9ybSA6dXJsPVwidXJsKCdhcHBsaWNhdGlvbnMnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgQHN1Ym1pdDpzdWNjZXNzPVwic3VibWl0U3VjY2Vzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgQHN1Ym1pdDplcnJvcj1cInN1Ym1pdEVycm9yXCI+XG5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgc2xvdC1zY29wZT1cIntmb3JtLCBtb2RlbH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIiB2LWxvYWRpbmc9XCJmb3JtLnN1Ym1pdHRpbmdcIiBlbGVtZW50LWxvYWRpbmctYmFja2dyb3VuZD1cInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+QXBwbGljYXRpZSB7eyBpZCA/ICdiZXdlcmtlbicgOiAndG9ldm9lZ2VuJyB9fTwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZm9vdGVyIGhhcy1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGVsLWJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG5hdGl2ZS10eXBlPVwic3VibWl0XCI+T3BzbGFhbjwvZWwtYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3Z1ZS1mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGl0ZW06IHt9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGJlZm9yZVJvdXRlRW50ZXIodG8sIGZyb20sIG5leHQpIHtcbiAgICAgICAgICAgIGlmKCF0by5wYXJhbXMuaWQpIHtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBheGlvcy5nZXQodXJsKCdhcHBsaWNhdGlvbnMvOmlkJywge2lkOiB0by5wYXJhbXMuaWR9KSkudGhlbigoYXBwbGljYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBuZXh0KHZtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdm0uaXRlbSA9IGFwcGxpY2F0aW9uO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJpdGVtc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dnVlLXRhYmxlIHVybD1cInZ1ZS5maW5hbmNlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpjYW4tZGVsZXRlPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6c29ydGluZz1cInNvcnRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aW5pdGlhbC1kYXRhPVwiaXRlbXNcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVwiaGVhZGVyXCIgc2xvdC1zY29wZT1cIntzb3J0aW5nLCBjbGlja0hhbmRsZXJ9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2dWUtdGFibGUtaGVhZGVyIDpzb3J0aW5nPVwic29ydGluZ1wiIEBjbGljaz1cImNsaWNrSGFuZGxlclwiIGxhYmVsPVwiTmFhbVwiIGlkZW50aWZpZXI9XCJuYW1lXCI+PC92dWUtdGFibGUtaGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cInJvd1wiIHNsb3Qtc2NvcGU9XCJ7cm93fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dnVlLXRhYmxlLWNvbHVtbiA6cm93PVwicm93XCIgcHJvcGVydHk9XCJuYW1lXCIgcm91dGVyLWxpbmsgOnRvPVwie25hbWU6ICdhcHBsaWNhdGlvbnMuZWRpdCcsIHBhcmFtczoge2lkOiByb3cuaWR9fVwiPjwvdnVlLXRhYmxlLWNvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Z1ZS10YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpdGVtczogbnVsbCxcbiAgICAgICAgICAgICAgICBzb3J0aW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogJ25hbWUnLFxuICAgICAgICAgICAgICAgICAgICBvcmRlcjogJ2FzYydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYmVmb3JlUm91dGVFbnRlcih0bywgZnJvbSwgbmV4dCkge1xuICAgICAgICAgICAgYXhpb3MuZ2V0KHVybCgnYXBwbGljYXRpb25zJykpLnRoZW4oKHtkYXRhOiBhcHBsaWNhdGlvbnN9KSA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dCh2bSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZtLml0ZW1zID0gYXBwbGljYXRpb25zO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge30sXG4gICAgfVxuPC9zY3JpcHQ+XG4iLCI8c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XG4gICAgLmNhcmQge1xuICAgICAgICAuY2FyZC1ib2R5IHtcbiAgICAgICAgICAgIGgxIHtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNhNGE0YTQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG48L3N0eWxlPlxuXG48dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCIgdi1pZj1cIml0ZW1zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlNlbGVjdGVlciBlZW4gYXBwbGljYXRpZTwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCIgdi1mb3I9XCJjb21wYW55IG9mIGl0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgdi1odG1sPVwiY29tcGFueS5jb21wYW55X25hbWVcIj48L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cImFwcGxpY2F0aW9uIG9mIGNvbXBhbnkuYXBwbGljYXRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiB2LWZvcj1cInZlcnNpb24gb2YgYXBwbGljYXRpb24uYXBwbGljYXRpb25fdmVyc2lvbnNcIiBAY2xpY2s9XCJzZWxlY3QodmVyc2lvbilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiB2LWh0bWw9XCJhcHBsaWNhdGlvbi5uYW1lXCI+PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHYtaHRtbD1cImFwcGxpY2F0aW9uLmxhYmVsXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIC8vXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IG51bGwsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYmVmb3JlUm91dGVFbnRlcih0bywgZnJvbSwgbmV4dCkge1xuICAgICAgICAgICAgYXhpb3MuZ2V0KHVybCgnYXBwbGljYXRpb25zJykpLnRoZW4oKHtkYXRhOiB7ZGF0YTogYXBwbGljYXRpb25zfX0pID0+IHtcbiAgICAgICAgICAgICAgICBuZXh0KHZtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdm0uaXRlbXMgPSBhcHBsaWNhdGlvbnMucmVkdWNlKChyZXN1bHQsIGFwcGxpY2F0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VzdG9tZXIgPSByZXN1bHRbYXBwbGljYXRpb24uY3VzdG9tZXIuaWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1c3RvbWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21lciA9IE9iamVjdC5hc3NpZ24oYXBwbGljYXRpb24uY3VzdG9tZXIsIHthcHBsaWNhdGlvbnM6IFtdfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyLmFwcGxpY2F0aW9ucy5wdXNoKGFwcGxpY2F0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2FwcGxpY2F0aW9uLmN1c3RvbWVyLmlkXSA9IGN1c3RvbWVyO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9LCBbXSkuZmlsdGVyKChjdXN0b21lcikgPT4gY3VzdG9tZXIgIT09IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgc2VsZWN0KHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBsaWNhdGlvblNlcnZpY2Uuc2V0VmVyc2lvbih2ZXJzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMiBjb2wtbWQtNiBvZmZzZXQtbWQtMyBjb2wtbGctNCBvZmZzZXQtbGctNFwiPlxuICAgICAgICAgICAgICAgIDx2dWUtZm9ybSByZWY9XCJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOnVybD1cIiR1cmwoJ2F1dGgvcGFzc3dvcmQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDptb2RlbD1cInVzZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBAc3VibWl0OnN1Y2Nlc3M9XCJzdWNjZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgQHN1Ym1pdDplcnJvcj1cInN1Ym1pdEVycm9yXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90LXNjb3BlPVwieyBmb3JtLCBtb2RlbCB9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtbG9hZGluZz1cImZvcm0uc3VibWl0dGluZ1wiIGNsYXNzPVwiY2FyZFwiIGVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kPVwicmdiYSgyNDgsMjUwLDI1MiwwLjYpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdhY2h0d29vcmQgdmVyZ2V0ZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0LXRleHQgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFLW1haWxhZHJlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDptb2RlbD1cIm1vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmb3JtXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZm9vdGVyIGhhcy1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxlbC1idXR0b24gdHlwZT1cInByaW1hcnlcIiBuYXRpdmUtdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2FjaHR3b29yZCByZXNldHRlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2VsLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvdnVlLWZvcm0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdXNlcjoge30sXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVSBoZWVmdCBlZW4gZS1tYWlsIG9udHZhbmdlbiBvbSB1dyB3YWNodHdvb3JkIHRlIHJlc2V0dGVuJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLmZvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTIgY29sLW1kLTYgb2Zmc2V0LW1kLTMgY29sLWxnLTQgb2Zmc2V0LWxnLTRcIj5cbiAgICAgICAgICAgICAgICA8dnVlLWZvcm0gOm1vZGVsPVwidXNlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDp1cmw9XCIkdXJsKCdhdXRoL2xvZ2luJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBAc3VibWl0OnN1Y2Nlc3M9XCJhdXRoZW50aWNhdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgQHN1Ym1pdDplcnJvcj1cImVycm9yXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Qtc2NvcGU9XCJ7IGZvcm0sIG1vZGVsIH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgdi1sb2FkaW5nPVwiZm9ybS5zdWJtaXR0aW5nXCIgY2xhc3M9XCJjYXJkXCIgZWxlbWVudC1sb2FkaW5nLWJhY2tncm91bmQ9XCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbmxvZ2dlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQtdGV4dCBuYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRS1tYWlsYWRyZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRS1tYWlsYWRyZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDptb2RlbD1cIm1vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cImZvcm1cIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0LXBhc3N3b3JkIG5hbWU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiV2FjaHR3b29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV2FjaHR3b29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDptb2RlbD1cIm1vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmb3JtXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZWwtYnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgbmF0aXZlLXR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5sb2dnZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2VsLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZWwtYnV0dG9uIHR5cGU9XCJ0ZXh0XCIgQGNsaWNrPVwicmVzZXRQYXNzd29yZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdhY2h0d29vcmQgdmVyZ2V0ZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2VsLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvdnVlLWZvcm0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IG51bGwsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIGF1dGhlbnRpY2F0ZWQocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRvYXV0aC5zdG9yZVNlc3Npb24ocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5yZXBsYWNlKHtuYW1lOiAnZGFzaGJvYXJkJ30pO1xuXG4gICAgICAgICAgICAgICAgRXZlbnRzLiRlbWl0KCd1c2VyczphdXRoZW50aWNhdGVkJywgcmVzcG9uc2UudXNlcik7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBlcnJvcihlcnJvcikge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlci5wYXNzd29yZCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9ICdFciBpcyBpZXRzIG1pcyBnZWdhYW4sIHByb2JlZXIgaGV0IG9wbmlldXcnO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDIyKSB7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ0RlIGluZ2V2b2VyZGUgZ2VnZXZlbnMgemlqbiBvbmp1aXN0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZXNldFBhc3N3b3JkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHtuYW1lOiAncGFzc3dvcmQuZm9yZ290J30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8ZGl2XG4gICAgICAgIHYtaWY9XCJhY3Rpb25cIlxuICAgICAgICBjbGFzcz1cImNvbC1zbS0xMiBjb2wtbWQtNiBvZmZzZXQtbWQtMyBjb2wtbGctNCBvZmZzZXQtbGctNFwiXG4gICAgICA+XG4gICAgICAgIDx2dWUtZm9ybVxuICAgICAgICAgIHJlZj1cImZvcm1cIlxuICAgICAgICAgIDp1cmw9XCIkdXJsKCd2dWUucGFzc3dvcmQucmVzZXQnKVwiXG4gICAgICAgICAgOm1vZGVsPVwiYWN0aW9uXCJcbiAgICAgICAgICBAc3VibWl0OnN1Y2Nlc3M9XCJsb2dpblwiXG4gICAgICAgICAgQHN1Ym1pdDplcnJvcj1cInN1Ym1pdEVycm9yXCJcbiAgICAgICAgPlxuICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90LXNjb3BlPVwieyBmb3JtLCBtb2RlbCB9XCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHYtbG9hZGluZz1cImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FyZFwiXG4gICAgICAgICAgICAgIGVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kPVwicmdiYSgyNDgsMjUwLDI1MiwwLjYpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgV2FjaHR3b29yZCByZXNldHRlblxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGVsLWFsZXJ0XG4gICAgICAgICAgICAgICAgICB2LWlmPVwiYXBwUGFzc3dvcmRDaGFuZ2VkXCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiVXcgd2FjaHR3b29yZCBpcyBnZXdpanppZ2QsIHUga3VudCBudSBpbmxvZ2dlbiBpbiBkZSBhcHBcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Y2Nlc3NcIlxuICAgICAgICAgICAgICAgICAgc2hvdy1pY29uXG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV2FjaHR3b29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwibW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRfY29uZmlybWF0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIldhY2h0d29vcmQgYmV2ZXN0aWdlblwiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwibW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZm9vdGVyIGhhcy1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgPGVsLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgbmF0aXZlLXR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFdhY2h0d29vcmQgcmVzZXR0ZW5cbiAgICAgICAgICAgICAgICA8L2VsLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3Z1ZS1mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcm9wczoge1xuICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWN0aW9uOiBudWxsLFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICBhcHBQYXNzd29yZENoYW5nZWQ6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYmVmb3JlUm91dGVFbnRlcih0bywgZnJvbSwgbmV4dCkge1xuICAgICAgICBheGlvcy5nZXQodGhpcy5yb3V0ZSgnL3VzZXJzL3Bhc3N3b3JkLzp0b2tlbicsIHt0b2tlbjogdG8ucGFyYW1zLnRva2VufSkpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgbmV4dCh2bSA9PiB7XG4gICAgICAgICAgICAgICAgdm0uYWN0aW9uID0gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIG5leHQodm0gPT4ge1xuICAgICAgICAgICAgICAgIHZtLiRyb3V0ZXIucmVwbGFjZSh7bmFtZTogJ2xvZ2luJ30pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kbWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLnJlc3BvbnNlLmRhdGEubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgbG9naW4ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRvYXV0aC5zdG9yZVNlc3Npb24ocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuJG9hdXRoLmFkZEF1dGhIZWFkZXJzKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCgnZGFzaGJvYXJkJyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRtZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1V3IHdhY2h0d29vcmQgaXMgZ2V3aWp6aWdkJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBFdmVudHMuJGVtaXQoJ3VzZXJzOmF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBQYXNzd29yZENoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMuZm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGVycm9yKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy4kbWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgPHZ1ZS1mb3JtIDp1cmw9XCJ1cmwoJ2NvbmZpZycpXCJcbiAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICBAc3VibWl0OnN1Y2Nlc3M9XCJzdWJtaXRTdWNjZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICBAc3VibWl0OmVycm9yPVwic3VibWl0RXJyb3JcIj5cblxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90LXNjb3BlPVwie2Zvcm0sIG1vZGVsfVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiIHYtbG9hZGluZz1cImZvcm0uc3VibWl0dGluZ1wiIGVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kPVwicmdiYSgyNDgsMjUwLDI1MiwwLjYpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXJcIj5SZW1vdGUgY29uZmlnIHt7IGlkID8gJ2Jld2Vya2VuJyA6ICd0b2V2b2VnZW4nIH19PC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1mb290ZXIgaGFzLWJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZWwtYnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgbmF0aXZlLXR5cGU9XCJzdWJtaXRcIj5PcHNsYWFuPC9lbC1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvdnVlLWZvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBpZDoge1xuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaXRlbToge30sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgYmVmb3JlUm91dGVFbnRlcih0bywgZnJvbSwgbmV4dCkge1xuICAgICAgICAgICAgaWYoIXRvLnBhcmFtcy5pZCkge1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF4aW9zLmdldCh1cmwoJ2NvbmZpZy86aWQnLCB7aWQ6IHRvLnBhcmFtcy5pZH0pKS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dCh2bSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZtLml0ZW0gPSBpdGVtO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJpdGVtc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dnVlLXRhYmxlIHVybD1cInZ1ZS5maW5hbmNlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpjYW4tZGVsZXRlPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6c29ydGluZz1cInNvcnRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aW5pdGlhbC1kYXRhPVwiaXRlbXNcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVwiaGVhZGVyXCIgc2xvdC1zY29wZT1cIntzb3J0aW5nLCBjbGlja0hhbmRsZXJ9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2dWUtdGFibGUtaGVhZGVyIDpzb3J0aW5nPVwic29ydGluZ1wiIEBjbGljaz1cImNsaWNrSGFuZGxlclwiIGxhYmVsPVwiTmFhbVwiIGlkZW50aWZpZXI9XCJwbHVnaW4ubmFtZVwiPjwvdnVlLXRhYmxlLWhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHZ1ZS10YWJsZS1oZWFkZXIgOnNvcnRpbmc9XCJzb3J0aW5nXCIgQGNsaWNrPVwiY2xpY2tIYW5kbGVyXCIgbGFiZWw9XCJBY3RpZWZcIiBpZGVudGlmaWVyPVwiYWN0aXZlXCI+PC92dWUtdGFibGUtaGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgc2xvdD1cInJvd1wiIHNsb3Qtc2NvcGU9XCJ7cm93fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dnVlLXRhYmxlLWNvbHVtbiA6cm93PVwicm93XCIgcHJvcGVydHk9XCJwbHVnaW4ubmFtZVwiIHJvdXRlci1saW5rIDp0bz1cIntuYW1lOiAndmVyc2lvbnMuZWRpdCcsIHBhcmFtczoge2lkOiByb3cuaWR9fVwiPjwvdnVlLXRhYmxlLWNvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHZ1ZS10YWJsZS1jb2x1bW4gOnJvdz1cInJvd1wiIHByb3BlcnR5PVwiYWN0aXZlXCIgdHlwZT1cImN1c3RvbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgcm93LmFjdGl2ZSA/ICdKYScgOiAnTmVlJyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Z1ZS10YWJsZS1jb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC92dWUtdGFibGU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IG51bGwsXG4gICAgICAgICAgICAgICAgc29ydGluZzoge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW46ICduYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgb3JkZXI6ICdhc2MnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGJlZm9yZVJvdXRlRW50ZXIodG8sIGZyb20sIG5leHQpIHtcbiAgICAgICAgICAgIGF4aW9zLmdldCh1cmwoJ3ZlcnNpb25zJykpLnRoZW4oKHtkYXRhOiB7ZGF0YTogcGx1Z2luc319KSA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dCh2bSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZtLml0ZW1zID0gcGx1Z2lucztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHt9LFxuICAgIH1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgPHZ1ZS1mb3JtIDp1cmw9XCJ1cmwoJ3VzZXJzJylcIlxuICAgICAgICAgICAgICAgICAgICAgIDptb2RlbD1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIEBzdWJtaXQ6c3VjY2Vzcz1cInN1Ym1pdFN1Y2Nlc3NcIlxuICAgICAgICAgICAgICAgICAgICAgIEBzdWJtaXQ6ZXJyb3I9XCJzdWJtaXRFcnJvclwiPlxuXG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Qtc2NvcGU9XCJ7Zm9ybSwgbW9kZWx9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCIgdi1sb2FkaW5nPVwiZm9ybS5zdWJtaXR0aW5nXCIgZWxlbWVudC1sb2FkaW5nLWJhY2tncm91bmQ9XCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPkdlYnJ1aWtlciB7eyBpZCA/ICdiZXdlcmtlbicgOiAndG9ldm9lZ2VuJyB9fTwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZm9vdGVyIGhhcy1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGVsLWJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG5hdGl2ZS10eXBlPVwic3VibWl0XCI+T3BzbGFhbjwvZWwtYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3Z1ZS1mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGl0ZW06IHt9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGJlZm9yZVJvdXRlRW50ZXIodG8sIGZyb20sIG5leHQpIHtcbiAgICAgICAgICAgIGlmKCF0by5wYXJhbXMuaWQpIHtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBheGlvcy5nZXQodXJsKCd1c2Vycy86aWQnLCB7aWQ6IHRvLnBhcmFtcy5pZH0pKS50aGVuKChhcHBsaWNhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQodm0gPT4ge1xuICAgICAgICAgICAgICAgICAgICB2bS5pdGVtID0gYXBwbGljYXRpb247XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgV2hvb3BzLCA0MDQuXG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcblxufVxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgPHZ1ZS1mb3JtIDp1cmw9XCJ1cmwoJ25vdGlmaWNhdGlvbnMnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgQHN1Ym1pdDpzdWNjZXNzPVwic3VibWl0U3VjY2Vzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgQHN1Ym1pdDplcnJvcj1cInN1Ym1pdEVycm9yXCI+XG5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgc2xvdC1zY29wZT1cIntmb3JtLCBtb2RlbH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIiB2LWxvYWRpbmc9XCJmb3JtLnN1Ym1pdHRpbmdcIiBlbGVtZW50LWxvYWRpbmctYmFja2dyb3VuZD1cInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+UHVzaCBub3RpZmljYXRpZXMge3sgaWQgPyAnYmV3ZXJrZW4nIDogJ3RvZXZvZWdlbicgfX08L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZvb3RlciBoYXMtYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxlbC1idXR0b24gdHlwZT1cInByaW1hcnlcIiBuYXRpdmUtdHlwZT1cInN1Ym1pdFwiPk9wc2xhYW48L2VsLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC92dWUtZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGlkOiB7XG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpdGVtOiB7fSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBiZWZvcmVSb3V0ZUVudGVyKHRvLCBmcm9tLCBuZXh0KSB7XG4gICAgICAgICAgICBpZighdG8ucGFyYW1zLmlkKSB7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXhpb3MuZ2V0KHVybCgnbm90aWZpY2F0aW9ucy86aWQnLCB7aWQ6IHRvLnBhcmFtcy5pZH0pKS50aGVuKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dCh2bSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZtLml0ZW0gPSBpdGVtO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgPHZ1ZS1mb3JtIDp1cmw9XCJ1cmwoJ25vdGlmaWNhdGlvbnMvc2VnbWVudHMnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgQHN1Ym1pdDpzdWNjZXNzPVwic3VibWl0U3VjY2Vzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgQHN1Ym1pdDplcnJvcj1cInN1Ym1pdEVycm9yXCI+XG5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgc2xvdC1zY29wZT1cIntmb3JtLCBtb2RlbH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIiB2LWxvYWRpbmc9XCJmb3JtLnN1Ym1pdHRpbmdcIiBlbGVtZW50LWxvYWRpbmctYmFja2dyb3VuZD1cInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+U2VnbWVudCB7eyBpZCA/ICdiZXdlcmtlbicgOiAndG9ldm9lZ2VuJyB9fTwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZm9vdGVyIGhhcy1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGVsLWJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG5hdGl2ZS10eXBlPVwic3VibWl0XCI+T3BzbGFhbjwvZWwtYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3Z1ZS1mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGl0ZW06IHt9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGJlZm9yZVJvdXRlRW50ZXIodG8sIGZyb20sIG5leHQpIHtcbiAgICAgICAgICAgIGlmKCF0by5wYXJhbXMuaWQpIHtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBheGlvcy5nZXQodXJsKCdub3RpZmljYXRpb25zL3NlZ21lbnRzLzppZCcsIHtpZDogdG8ucGFyYW1zLmlkfSkpLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBuZXh0KHZtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdm0uaXRlbSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG4iLCI8c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XG4gICAgQGltcG9ydCAnLi4vLi4vLi4vc2Nzcy9sYXlvdXRzL3NpZGViYXInO1xuPC9zdHlsZT5cblxuPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgPGxpIHYtZm9yPVwicm91dGUgb2YgYXZhaWxhYmxlUm91dGVzXCIgOmtleT1cInJvdXRlLm5hbWVcIiB2LXVzZXItaGFzLXJvbGU9XCJyb3V0ZS5yb2xlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IDpjbGFzcz1cInsncm91dGVyLWxpbmstYWN0aXZlJzogcm91dGVyTGlua0FjdGl2ZShyb3V0ZSksICdyb3V0ZXItbGluay1leGFjdC1hY3RpdmUnOiByb3V0ZXJMaW5rRXhhY3RBY3RpdmUocm91dGUpfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIEBjbGljaz1cIm5hdmlnYXRlKHJvdXRlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9udC1hd2Vzb21lLWljb24gOmljb249XCJyb3V0ZS5pY29uXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIEBjbGljaz1cIm5hdmlnYXRlKHJvdXRlKVwiIHYtaHRtbD1cInJvdXRlLnRleHRcIj48L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBAY2xpY2s9XCJyb3V0ZS5zdWJtZW51T3BlbiA9ICFyb3V0ZS5zdWJtZW51T3BlblwiIHYtaWY9XCJyb3V0ZS5jaGlsZHJlbiAhPT0gdW5kZWZpbmVkICYmIHJvdXRlLmNoaWxkcmVuLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvbnQtYXdlc29tZS1pY29uIGljb249XCJhbmdsZS1sZWZ0XCIgOmNsYXNzPVwieydyb3RhdGUnOiByb3V0ZS5zdWJtZW51T3Blbn1cIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCB2LWlmPVwicm91dGUuY2hpbGRyZW4gIT09IHVuZGVmaW5lZCAmJiByb3V0ZS5jaGlsZHJlbi5sZW5ndGggPiAwICYmIHJvdXRlLnN1Ym1lbnVPcGVuXCIgOmNsYXNzPVwieydvcGVuJzogcm91dGUuc3VibWVudU9wZW59XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIHYtZm9yPVwiY2hpbGQgaW4gcm91dGUuY2hpbGRyZW5cIiA6a2V5PVwiY2hpbGQubmFtZVwiIHYtdXNlci1oYXMtcm9sZT1cImNoaWxkLnJvbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiA6Y2xhc3M9XCJ7J3JvdXRlci1saW5rLWFjdGl2ZSc6IHJvdXRlckxpbmtBY3RpdmUoY2hpbGQpLCAncm91dGVyLWxpbmstZXhhY3QtYWN0aXZlJzogcm91dGVyTGlua0V4YWN0QWN0aXZlKGNoaWxkKX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIEBjbGljaz1cIm5hdmlnYXRlKGNoaWxkKVwiIHYtaHRtbD1cImNoaWxkLnRleHRcIj48L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIEBjbGljaz1cImNoaWxkLnN1Ym1lbnVPcGVuID0gIWNoaWxkLnN1Ym1lbnVPcGVuXCIgdi1pZj1cImNoaWxkLmNoaWxkcmVuICE9PSB1bmRlZmluZWQgJiYgY2hpbGQuY2hpbGRyZW4ubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmb250LWF3ZXNvbWUtaWNvbiBpY29uPVwiYW5nbGUtbGVmdFwiIDpjbGFzcz1cInsncm90YXRlJzogY2hpbGQuc3VibWVudU9wZW59XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgdi1pZj1cImNoaWxkLmNoaWxkcmVuICE9PSB1bmRlZmluZWQgJiYgY2hpbGQuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiBjaGlsZC5zdWJtZW51T3BlblwiIDpjbGFzcz1cInsnb3Blbic6IGNoaWxkLnN1Ym1lbnVPcGVufVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJvdXRlci1saW5rIDp0bz1cIntuYW1lOiBzdWJDaGlsZC5uYW1lfVwiIHRhZz1cImxpXCIgdi1mb3I9XCJzdWJDaGlsZCBpbiBjaGlsZC5jaGlsZHJlblwiIDprZXk9XCJzdWJDaGlsZC5uYW1lXCIgdi1odG1sPVwic3ViQ2hpbGQudGV4dFwiPjwvcm91dGVyLWxpbms+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHJvdXRlcyBmcm9tICcuLi8uLi9yb3V0ZXMvc2lkZWJhcic7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG5cbiAgICAgICAgcHJvcHM6IHt9LFxuXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJvdXRlczogcm91dGVzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG4gICAgICAgICAgICBhdmFpbGFibGVSb3V0ZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcm91dGVzID0gdGhpcy5yb3V0ZXMuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kYXV0aC51c2VySGFzUm9sZShpdGVtLnJvbGUpO1xuXG4gICAgICAgICAgICAgICAgfSkubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbi5maWx0ZXIoc3ViSXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGF1dGgudXNlckhhc1JvbGUoc3ViSXRlbS5yb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcm91dGVzLnNvcnQoZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0LnRleHQgPCBzZWNvbmQudGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdC50ZXh0ID4gc2Vjb25kLnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgcm91dGUgaGFzIGFuIGFjdGl2ZSBzdWJyb3V0ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByb3V0ZXJMaW5rQWN0aXZlKHJvdXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJHJvdXRlci5jdXJyZW50Um91dGUubmFtZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQWxzbyBvcGVuIHRoZSBzdWJtZW51XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJHJvdXRlci5jdXJyZW50Um91dGUubmFtZS5pbmNsdWRlcyhyb3V0ZS5uYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm91dGUuY2hpbGRyZW4gIT09IHVuZGVmaW5lZCAmJiByb3V0ZS5jaGlsZHJlbi5sZW5ndGggPiAwICYmICFyb3V0ZS5zdWJtZW51T3Blbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUuc3VibWVudU9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCByb3V0ZSBpcyBhY3RpdmVcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcm91dGVyTGlua0V4YWN0QWN0aXZlKHJvdXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJHJvdXRlci5jdXJyZW50Um91dGUubmFtZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHJvdXRlci5jdXJyZW50Um91dGUubmFtZSA9PT0gcm91dGUubmFtZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG5hdmlnYXRlKHJvdXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe25hbWU6IHJvdXRlLm5hbWV9KTtcblxuICAgICAgICAgICAgICAgIGlmIChyb3V0ZS5jaGlsZHJlbiAhPT0gdW5kZWZpbmVkICYmIHJvdXRlLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgIXJvdXRlLnN1Ym1lbnVPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLnN1Ym1lbnVPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNpZGVCYXJPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICAgICA8dnVlLWZvcm0gOnVybD1cInVybCgncGx1Z2lucycpXCJcbiAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICBAc3VibWl0OnN1Y2Nlc3M9XCJzdWJtaXRTdWNjZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICBAc3VibWl0OmVycm9yPVwic3VibWl0RXJyb3JcIj5cblxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90LXNjb3BlPVwie2Zvcm0sIG1vZGVsfVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiIHYtbG9hZGluZz1cImZvcm0uc3VibWl0dGluZ1wiIGVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kPVwicmdiYSgyNDgsMjUwLDI1MiwwLjYpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXJcIj5QbHVnaW4ge3sgaWQgPyAnYmV3ZXJrZW4nIDogJ3RvZXZvZWdlbicgfX08L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZvb3RlciBoYXMtYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxlbC1idXR0b24gdHlwZT1cInByaW1hcnlcIiBuYXRpdmUtdHlwZT1cInN1Ym1pdFwiPk9wc2xhYW48L2VsLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC92dWUtZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGlkOiB7XG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpdGVtOiB7fSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBiZWZvcmVSb3V0ZUVudGVyKHRvLCBmcm9tLCBuZXh0KSB7XG4gICAgICAgICAgICBheGlvcy5nZXQodXJsKCdwbHVnaW5zLzppZCcsIHtpZDogdG8ucGFyYW1zLmlkfSkpLnRoZW4oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBuZXh0KHZtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdm0uaXRlbSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cIml0ZW1zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2dWUtdGFibGUgdXJsPVwidnVlLmZpbmFuY2VzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOmNhbi1kZWxldGU9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpzb3J0aW5nPVwic29ydGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppbml0aWFsLWRhdGE9XCJpdGVtc1wiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Q9XCJoZWFkZXJcIiBzbG90LXNjb3BlPVwie3NvcnRpbmcsIGNsaWNrSGFuZGxlcn1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHZ1ZS10YWJsZS1oZWFkZXIgOnNvcnRpbmc9XCJzb3J0aW5nXCIgQGNsaWNrPVwiY2xpY2tIYW5kbGVyXCIgbGFiZWw9XCJOYWFtXCIgaWRlbnRpZmllcj1cInBsdWdpbi5uYW1lXCI+PC92dWUtdGFibGUtaGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dnVlLXRhYmxlLWhlYWRlciA6c29ydGluZz1cInNvcnRpbmdcIiBAY2xpY2s9XCJjbGlja0hhbmRsZXJcIiBsYWJlbD1cIkFjdGllZlwiIGlkZW50aWZpZXI9XCJhY3RpdmVcIj48L3Z1ZS10YWJsZS1oZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90PVwicm93XCIgc2xvdC1zY29wZT1cIntyb3d9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2dWUtdGFibGUtY29sdW1uIDpyb3c9XCJyb3dcIiBwcm9wZXJ0eT1cInBsdWdpbi5uYW1lXCIgcm91dGVyLWxpbmsgOnRvPVwie25hbWU6ICdwbHVnaW5zLmVkaXQnLCBwYXJhbXM6IHtpZDogcm93LmlkfX1cIj48L3Z1ZS10YWJsZS1jb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx2dWUtdGFibGUtY29sdW1uIDpyb3c9XCJyb3dcIiBwcm9wZXJ0eT1cImFjdGl2ZVwiIHR5cGU9XCJjdXN0b21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHJvdy5hY3RpdmUgPyAnSmEnIDogJ05lZScgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC92dWUtdGFibGUtY29sdW1uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdnVlLXRhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBudWxsLFxuICAgICAgICAgICAgICAgIHNvcnRpbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiAnbmFtZScsXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyOiAnYXNjJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBiZWZvcmVSb3V0ZUVudGVyKHRvLCBmcm9tLCBuZXh0KSB7XG4gICAgICAgICAgICBheGlvcy5nZXQodXJsKCdwbHVnaW5zJykpLnRoZW4oKHtkYXRhOiB7ZGF0YTogcGx1Z2luc319KSA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dCh2bSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZtLml0ZW1zID0gcGx1Z2lucztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHt9LFxuICAgIH1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgPHZ1ZS1mb3JtIDp1cmw9XCJ1cmwoJ3ZlcnNpb25zJylcIlxuICAgICAgICAgICAgICAgICAgICAgIDptb2RlbD1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgIEBzdWJtaXQ6c3VjY2Vzcz1cInN1Ym1pdFN1Y2Nlc3NcIlxuICAgICAgICAgICAgICAgICAgICAgIEBzdWJtaXQ6ZXJyb3I9XCJzdWJtaXRFcnJvclwiPlxuXG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHNsb3Qtc2NvcGU9XCJ7Zm9ybSwgbW9kZWx9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCIgdi1sb2FkaW5nPVwiZm9ybS5zdWJtaXR0aW5nXCIgZWxlbWVudC1sb2FkaW5nLWJhY2tncm91bmQ9XCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPkFwcCB2ZXJzaWUge3sgaWQgPyAnYmV3ZXJrZW4nIDogJ3RvZXZvZWdlbicgfX08L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZvb3RlciBoYXMtYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxlbC1idXR0b24gdHlwZT1cInByaW1hcnlcIiBuYXRpdmUtdHlwZT1cInN1Ym1pdFwiPk9wc2xhYW48L2VsLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC92dWUtZm9ybT5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGlkOiB7XG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpdGVtOiB7fSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBiZWZvcmVSb3V0ZUVudGVyKHRvLCBmcm9tLCBuZXh0KSB7XG4gICAgICAgICAgICBpZighdG8ucGFyYW1zLmlkKSB7XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXhpb3MuZ2V0KHVybCgndmVyc2lvbnMvOmlkJywge2lkOiB0by5wYXJhbXMuaWR9KSkudGhlbigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIG5leHQodm0gPT4ge1xuICAgICAgICAgICAgICAgICAgICB2bS5pdGVtID0gaXRlbTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsInZhciBtYXAgPSB7XG5cdFwiLi9hZlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FmLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hZi5qc1wiLFxuXHRcIi4vYXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9hci1kelwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWR6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1kei5qc1wiLFxuXHRcIi4vYXIta3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1rdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIta3cuanNcIixcblx0XCIuL2FyLWx5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbHkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWx5LmpzXCIsXG5cdFwiLi9hci1tYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLW1hLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1tYS5qc1wiLFxuXHRcIi4vYXItc2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci1zYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItc2EuanNcIixcblx0XCIuL2FyLXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXItdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXRuLmpzXCIsXG5cdFwiLi9hci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIuanNcIixcblx0XCIuL2F6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2F6LmpzXCIsXG5cdFwiLi9iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZS5qc1wiLFxuXHRcIi4vYmdcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9iZy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmcuanNcIixcblx0XCIuL2JtXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm0uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JtLmpzXCIsXG5cdFwiLi9iblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibi5qc1wiLFxuXHRcIi4vYm9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm8uanNcIixcblx0XCIuL2JyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JyLmpzXCIsXG5cdFwiLi9ic1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2JzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9icy5qc1wiLFxuXHRcIi4vY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY2EuanNcIixcblx0XCIuL2NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NzLmpzXCIsXG5cdFwiLi9jdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jdi5qc1wiLFxuXHRcIi4vY3lcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9jeS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3kuanNcIixcblx0XCIuL2RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RhLmpzXCIsXG5cdFwiLi9kZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUuanNcIixcblx0XCIuL2RlLWF0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtYXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWF0LmpzXCIsXG5cdFwiLi9kZS1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1jaC5qc1wiLFxuXHRcIi4vZGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2R2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kdi5qc1wiLFxuXHRcIi4vZWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZWwuanNcIixcblx0XCIuL2VuLVNHXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1TRy5qc1wiLFxuXHRcIi4vZW4tU0cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLVNHLmpzXCIsXG5cdFwiLi9lbi1hdVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWF1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWdiXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4tZ2IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1pZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWllLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1pbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLW56XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW4tbnouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9lcy1kb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLWRvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtdXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy11cy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9mYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9maS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2ZyLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9meVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2Z5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZ2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dhLmpzXCIsXG5cdFwiLi9nYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2EuanNcIixcblx0XCIuL2dkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nZC5qc1wiLFxuXHRcIi4vZ2QuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2wuanNcIixcblx0XCIuL2dsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ29tLWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dvbS1sYXRuLmpzXCIsXG5cdFwiLi9nb20tbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2d1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ndS5qc1wiLFxuXHRcIi4vZ3UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9oZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGUuanNcIixcblx0XCIuL2hlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hpLmpzXCIsXG5cdFwiLi9oaS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oci5qc1wiLFxuXHRcIi4vaHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9odVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHUuanNcIixcblx0XCIuL2h1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHktYW1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h5LWFtLmpzXCIsXG5cdFwiLi9oeS1hbS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2lkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pZC5qc1wiLFxuXHRcIi4vaWQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXMuanNcIixcblx0XCIuL2lzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2l0LmpzXCIsXG5cdFwiLi9pdC1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQtY2guanNcIixcblx0XCIuL2l0LWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC1jaC5qc1wiLFxuXHRcIi4vaXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2l0LmpzXCIsXG5cdFwiLi9qYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2phLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qYS5qc1wiLFxuXHRcIi4vanZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9qdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvanYuanNcIixcblx0XCIuL2thXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2thLmpzXCIsXG5cdFwiLi9ra1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2trLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ray5qc1wiLFxuXHRcIi4va21cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rbS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva20uanNcIixcblx0XCIuL2tuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tuLmpzXCIsXG5cdFwiLi9rb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2tvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rby5qc1wiLFxuXHRcIi4va3VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t1LmpzXCIsXG5cdFwiLi9rdS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva3UuanNcIixcblx0XCIuL2t5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4va3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9sYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2x0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL2x2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9tZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21pXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9ta1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21rLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21yLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tcy1teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLW15LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL210LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL25iXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ubC1iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLWJlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ublwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL25uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vcGEtaW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wYS1pbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcGwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3B0LWJyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQtYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9ydVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3J1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vc2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zcVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NxLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zci1jeXJsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci1jeXJsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi9zdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90ZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGV0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90Z1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90aC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RsLXBoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGwtcGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdGxoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90emxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHpsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi90em0tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3VnLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWctY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91a1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3V6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdXotbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXotbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi92aVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4veC1wc2V1ZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi94LXBzZXVkby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3lvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4veW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi96aC1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtaGtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC1oay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLXR3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiLFxuXHRcIi4vemgtdHcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUgc3luYyByZWN1cnNpdmUgXlxcXFwuXFxcXC8uKiRcIjsiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgW1xuICAgICAgX3ZtLmF1dGhlbnRpY2F0ZWRcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBfYyhcImhlYWRlclwiKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcIm1haW5cIiwgW1xuICAgICAgICAgICAgICBfYyhcImFzaWRlXCIsIFtfYyhcInNpZGUtYmFyXCIpXSwgMSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwibWFpblwiLCBbXG4gICAgICAgICAgICAgICAgX2MoXCJtYWluXCIsIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGFpbmVyLWZsdWlkXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX2MoXCJyb3V0ZXItdmlld1wiKV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiZm9vdGVyXCIpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXG4gICAgICAgICAgICBfYyhcIm1haW5cIiwgW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbnRhaW5lci1mbHVpZFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFtfYyhcInJvdXRlci12aWV3XCIpXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF1cbiAgICBdLFxuICAgIDJcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX3ZtLl9tKDApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmRcIiB9LCBbXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWhlYWRlclwiIH0sIFtcbiAgICAgICAgICAgIF92bS5fdihcIlxcbiAgICAgICAgQ2FyZCB0aXRsZVxcbiAgICAgIFwiKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWJvZHlcIiB9KVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTJcIiB9LFxuICAgICAgW1xuICAgICAgICBfYyhcInZ1ZS1mb3JtXCIsIHtcbiAgICAgICAgICBhdHRyczogeyB1cmw6IF92bS51cmwoXCJhcHBsaWNhdGlvbnNcIiksIG1vZGVsOiBfdm0uaXRlbSB9LFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBcInN1Ym1pdDpzdWNjZXNzXCI6IF92bS5zdWJtaXRTdWNjZXNzLFxuICAgICAgICAgICAgXCJzdWJtaXQ6ZXJyb3JcIjogX3ZtLnN1Ym1pdEVycm9yXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBmb3JtID0gcmVmLmZvcm1cbiAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSByZWYubW9kZWxcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZm9ybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudC1sb2FkaW5nLWJhY2tncm91bmRcIjogXCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1oZWFkZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpZSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5pZCA/IFwiYmV3ZXJrZW5cIiA6IFwidG9ldm9lZ2VuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtYm9keVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1yb3dcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmQtZm9vdGVyIGhhcy1idXR0b25zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYXRpdmUtdHlwZVwiOiBcInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiT3BzbGFhblwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdKVxuICAgICAgICB9KVxuICAgICAgXSxcbiAgICAgIDFcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICBbXG4gICAgICAgIF92bS5pdGVtc1xuICAgICAgICAgID8gW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmRcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjYXJkLXRhYmxlXCIgfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJ2dWUtdGFibGVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwidnVlLmZpbmFuY2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNhbi1kZWxldGVcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0aW5nOiBfdm0uc29ydGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5pdGlhbC1kYXRhXCI6IF92bS5pdGVtc1xuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc29ydGluZyA9IHJlZi5zb3J0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xpY2tIYW5kbGVyID0gcmVmLmNsaWNrSGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2dWUtdGFibGUtaGVhZGVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydGluZzogc29ydGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5hYW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6IFwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyBjbGljazogY2xpY2tIYW5kbGVyIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwicm93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHJlZi5yb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidnVlLXRhYmxlLWNvbHVtblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogcm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhcHBsaWNhdGlvbnMuZWRpdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHsgaWQ6IHJvdy5pZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDI3NDcyMDk2NTJcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICBdLFxuICAgICAgMlxuICAgIClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgIF92bS5pdGVtc1xuICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmRcIiB9LCBbXG4gICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtaGVhZGVyXCIgfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXCJTZWxlY3RlZXIgZWVuIGFwcGxpY2F0aWVcIilcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmQtYm9keVwiIH0sXG4gICAgICAgICAgICAgIF92bS5fbChfdm0uaXRlbXMsIGZ1bmN0aW9uKGNvbXBhbnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTJcIiB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJoMVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogX3ZtLl9zKGNvbXBhbnkuY29tcGFueV9uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX2woY29tcGFueS5hcHBsaWNhdGlvbnMsIGZ1bmN0aW9uKGFwcGxpY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLl9sKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbi5hcHBsaWNhdGlvbl92ZXJzaW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24odmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInJvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2VsZWN0KHZlcnNpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1hdXRvXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaDJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBfdm0uX3MoYXBwbGljYXRpb24ubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2xcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogX3ZtLl9zKGFwcGxpY2F0aW9uLmxhYmVsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIDogX3ZtLl9lKClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGFpbmVyLWZsdWlkXCIgfSwgW1xuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyIGNvbC1tZC02IG9mZnNldC1tZC0zIGNvbC1sZy00IG9mZnNldC1sZy00XCIgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwidnVlLWZvcm1cIiwge1xuICAgICAgICAgICAgcmVmOiBcImZvcm1cIixcbiAgICAgICAgICAgIGF0dHJzOiB7IHVybDogX3ZtLiR1cmwoXCJhdXRoL3Bhc3N3b3JkXCIpLCBtb2RlbDogX3ZtLnVzZXIgfSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIFwic3VibWl0OnN1Y2Nlc3NcIjogX3ZtLnN1Y2Nlc3MsXG4gICAgICAgICAgICAgIFwic3VibWl0OmVycm9yXCI6IF92bS5zdWJtaXRFcnJvclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IHJlZi5mb3JtXG4gICAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSByZWYubW9kZWxcbiAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LWxvYWRpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZm9ybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZm9ybS5zdWJtaXR0aW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNhcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudC1sb2FkaW5nLWJhY2tncm91bmRcIjogXCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWhlYWRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdhY2h0d29vcmQgdmVyZ2V0ZW5cXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtYm9keVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLXJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dC10ZXh0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW1haWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiRS1tYWlsYWRyZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjYXJkLWZvb3RlciBoYXMtYnV0dG9uc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYXRpdmUtdHlwZVwiOiBcInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2FjaHR3b29yZCByZXNldHRlblxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdKVxuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250YWluZXItZmx1aWRcIiB9LCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTIgY29sLW1kLTYgb2Zmc2V0LW1kLTMgY29sLWxnLTQgb2Zmc2V0LWxnLTRcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ2dWUtZm9ybVwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyBtb2RlbDogX3ZtLnVzZXIsIHVybDogX3ZtLiR1cmwoXCJhdXRoL2xvZ2luXCIpIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBcInN1Ym1pdDpzdWNjZXNzXCI6IF92bS5hdXRoZW50aWNhdGVkLFxuICAgICAgICAgICAgICBcInN1Ym1pdDplcnJvclwiOiBfdm0uZXJyb3JcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSByZWYuZm9ybVxuICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gcmVmLm1vZGVsXG4gICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1sb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZvcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kXCI6IFwicmdiYSgyNDgsMjUwLDI1MiwwLjYpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1oZWFkZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbmxvZ2dlblxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1ib2R5XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tcm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dC10ZXh0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbWFpbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRS1tYWlsYWRyZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkUtbWFpbGFkcmVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tcm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dC1wYXNzd29yZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIldhY2h0d29vcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIldhY2h0d29vcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1mb290ZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYXRpdmUtdHlwZVwiOiBcInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElubG9nZ2VuXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLWF1dG9cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGV4dFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5yZXNldFBhc3N3b3JkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXYWNodHdvb3JkIHZlcmdldGVuXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbnRhaW5lci1mbHVpZFwiIH0sIFtcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgIF92bS5hY3Rpb25cbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMiBjb2wtbWQtNiBvZmZzZXQtbWQtMyBjb2wtbGctNCBvZmZzZXQtbGctNFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInZ1ZS1mb3JtXCIsIHtcbiAgICAgICAgICAgICAgICByZWY6IFwiZm9ybVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICB1cmw6IF92bS4kdXJsKFwidnVlLnBhc3N3b3JkLnJlc2V0XCIpLFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IF92bS5hY3Rpb25cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBcInN1Ym1pdDpzdWNjZXNzXCI6IF92bS5sb2dpbixcbiAgICAgICAgICAgICAgICAgIFwic3VibWl0OmVycm9yXCI6IF92bS5zdWJtaXRFcnJvclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSByZWYuZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gcmVmLm1vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1sb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZvcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWhlYWRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICBXYWNodHdvb3JkIHJlc2V0dGVuXFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1ib2R5XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5hcHBQYXNzd29yZENoYW5nZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJlbC1hbGVydFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlV3IHdhY2h0d29vcmQgaXMgZ2V3aWp6aWdkLCB1IGt1bnQgbnUgaW5sb2dnZW4gaW4gZGUgYXBwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvdy1pY29uXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLXJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0LXBhc3N3b3JkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiV2FjaHR3b29yZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tcm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtcGFzc3dvcmRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwYXNzd29yZF9jb25maXJtYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJXYWNodHdvb3JkIGJldmVzdGlnZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1mb290ZXIgaGFzLWJ1dHRvbnNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmF0aXZlLXR5cGVcIjogXCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgV2FjaHR3b29yZCByZXNldHRlblxcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIDE3MjgyMDY2MDVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICBbXG4gICAgICAgIF9jKFwidnVlLWZvcm1cIiwge1xuICAgICAgICAgIGF0dHJzOiB7IHVybDogX3ZtLnVybChcImNvbmZpZ1wiKSwgbW9kZWw6IF92bS5pdGVtIH0sXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIFwic3VibWl0OnN1Y2Nlc3NcIjogX3ZtLnN1Ym1pdFN1Y2Nlc3MsXG4gICAgICAgICAgICBcInN1Ym1pdDplcnJvclwiOiBfdm0uc3VibWl0RXJyb3JcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm0gPSByZWYuZm9ybVxuICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHJlZi5tb2RlbFxuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1sb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmb3JtLnN1Ym1pdHRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZm9ybS5zdWJtaXR0aW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNhcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50LWxvYWRpbmctYmFja2dyb3VuZFwiOiBcInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWhlYWRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSZW1vdGUgY29uZmlnIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmlkID8gXCJiZXdlcmtlblwiIDogXCJ0b2V2b2VnZW5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1ib2R5XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLXJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTJcIiB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1mb290ZXIgaGFzLWJ1dHRvbnNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hdGl2ZS10eXBlXCI6IFwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJPcHNsYWFuXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0pXG4gICAgICAgIH0pXG4gICAgICBdLFxuICAgICAgMVxuICAgIClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgIFtcbiAgICAgICAgX3ZtLml0ZW1zXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmQtdGFibGVcIiB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcInZ1ZS10YWJsZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJ2dWUuZmluYW5jZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2FuLWRlbGV0ZVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRpbmc6IF92bS5zb3J0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbml0aWFsLWRhdGFcIjogX3ZtLml0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzb3J0aW5nID0gcmVmLnNvcnRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbGlja0hhbmRsZXIgPSByZWYuY2xpY2tIYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInZ1ZS10YWJsZS1oZWFkZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0aW5nOiBzb3J0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmFhbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpZmllcjogXCJwbHVnaW4ubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyBjbGljazogY2xpY2tIYW5kbGVyIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidnVlLXRhYmxlLWhlYWRlclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRpbmc6IHNvcnRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJBY3RpZWZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6IFwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBjbGlja0hhbmRsZXIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJyb3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gcmVmLnJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2dWUtdGFibGUtY29sdW1uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiByb3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogXCJwbHVnaW4ubmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZXJzaW9ucy5lZGl0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogeyBpZDogcm93LmlkIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZ1ZS10YWJsZS1jb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IHJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6IFwiYWN0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY3VzdG9tXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3Mocm93LmFjdGl2ZSA/IFwiSmFcIiA6IFwiTmVlXCIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDE1MjU5NjE0NjhcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICBdLFxuICAgICAgMlxuICAgIClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgIFtcbiAgICAgICAgX2MoXCJ2dWUtZm9ybVwiLCB7XG4gICAgICAgICAgYXR0cnM6IHsgdXJsOiBfdm0udXJsKFwidXNlcnNcIiksIG1vZGVsOiBfdm0uaXRlbSB9LFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBcInN1Ym1pdDpzdWNjZXNzXCI6IF92bS5zdWJtaXRTdWNjZXNzLFxuICAgICAgICAgICAgXCJzdWJtaXQ6ZXJyb3JcIjogX3ZtLnN1Ym1pdEVycm9yXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBmb3JtID0gcmVmLmZvcm1cbiAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSByZWYubW9kZWxcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZm9ybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudC1sb2FkaW5nLWJhY2tncm91bmRcIjogXCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1oZWFkZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiR2VicnVpa2VyIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmlkID8gXCJiZXdlcmtlblwiIDogXCJ0b2V2b2VnZW5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1ib2R5XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLXJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTJcIiB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1mb290ZXIgaGFzLWJ1dHRvbnNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hdGl2ZS10eXBlXCI6IFwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCJPcHNsYWFuXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0pXG4gICAgICAgIH0pXG4gICAgICBdLFxuICAgICAgMVxuICAgIClcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgIFtcbiAgICAgICAgX3ZtLml0ZW1zXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmQtdGFibGVcIiB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcInZ1ZS10YWJsZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogXCJ2dWUuZmluYW5jZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2FuLWRlbGV0ZVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRpbmc6IF92bS5zb3J0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbml0aWFsLWRhdGFcIjogX3ZtLml0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcImhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzb3J0aW5nID0gcmVmLnNvcnRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbGlja0hhbmRsZXIgPSByZWYuY2xpY2tIYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInZ1ZS10YWJsZS1oZWFkZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0aW5nOiBzb3J0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiTmFhbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpZmllcjogXCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBjbGlja0hhbmRsZXIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJyb3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gcmVmLnJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2dWUtdGFibGUtY29sdW1uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiByb3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFwcGxpY2F0aW9ucy5lZGl0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogeyBpZDogcm93LmlkIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgMjc0NzIwOTY1MlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgIF0sXG4gICAgICAyXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgW192bS5fdihcIlxcbiAgV2hvb3BzLCA0MDQuXFxuXCIpXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgIFtcbiAgICAgICAgX2MoXCJ2dWUtZm9ybVwiLCB7XG4gICAgICAgICAgYXR0cnM6IHsgdXJsOiBfdm0udXJsKFwibm90aWZpY2F0aW9uc1wiKSwgbW9kZWw6IF92bS5pdGVtIH0sXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIFwic3VibWl0OnN1Y2Nlc3NcIjogX3ZtLnN1Ym1pdFN1Y2Nlc3MsXG4gICAgICAgICAgICBcInN1Ym1pdDplcnJvclwiOiBfdm0uc3VibWl0RXJyb3JcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm0gPSByZWYuZm9ybVxuICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHJlZi5tb2RlbFxuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1sb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmb3JtLnN1Ym1pdHRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZm9ybS5zdWJtaXR0aW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNhcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50LWxvYWRpbmctYmFja2dyb3VuZFwiOiBcInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWhlYWRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQdXNoIG5vdGlmaWNhdGllcyBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5pZCA/IFwiYmV3ZXJrZW5cIiA6IFwidG9ldm9lZ2VuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtYm9keVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1yb3dcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmQtZm9vdGVyIGhhcy1idXR0b25zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYXRpdmUtdHlwZVwiOiBcInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiT3BzbGFhblwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdKVxuICAgICAgICB9KVxuICAgICAgXSxcbiAgICAgIDFcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICBbXG4gICAgICAgIF92bS5pdGVtc1xuICAgICAgICAgID8gW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmRcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjYXJkLXRhYmxlXCIgfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJ2dWUtdGFibGVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwidnVlLmZpbmFuY2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNhbi1kZWxldGVcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0aW5nOiBfdm0uc29ydGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5pdGlhbC1kYXRhXCI6IF92bS5pdGVtc1xuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc29ydGluZyA9IHJlZi5zb3J0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xpY2tIYW5kbGVyID0gcmVmLmNsaWNrSGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2dWUtdGFibGUtaGVhZGVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydGluZzogc29ydGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5hYW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6IFwicGx1Z2luLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgY2xpY2s6IGNsaWNrSGFuZGxlciB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInZ1ZS10YWJsZS1oZWFkZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0aW5nOiBzb3J0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQWN0aWVmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBcImFjdGl2ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyBjbGljazogY2xpY2tIYW5kbGVyIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwicm93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHJlZi5yb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidnVlLXRhYmxlLWNvbHVtblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogcm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6IFwicGx1Z2luLm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmVyc2lvbnMuZWRpdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHsgaWQ6IHJvdy5pZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2dWUtdGFibGUtY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiByb3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiBcImFjdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImN1c3RvbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9zKHJvdy5hY3RpdmUgPyBcIkphXCIgOiBcIk5lZVwiKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAxNTI1OTYxNDY4XG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgXSxcbiAgICAgIDJcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICBbXG4gICAgICAgIF9jKFwidnVlLWZvcm1cIiwge1xuICAgICAgICAgIGF0dHJzOiB7IHVybDogX3ZtLnVybChcIm5vdGlmaWNhdGlvbnMvc2VnbWVudHNcIiksIG1vZGVsOiBfdm0uaXRlbSB9LFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBcInN1Ym1pdDpzdWNjZXNzXCI6IF92bS5zdWJtaXRTdWNjZXNzLFxuICAgICAgICAgICAgXCJzdWJtaXQ6ZXJyb3JcIjogX3ZtLnN1Ym1pdEVycm9yXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBmb3JtID0gcmVmLmZvcm1cbiAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSByZWYubW9kZWxcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZm9ybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudC1sb2FkaW5nLWJhY2tncm91bmRcIjogXCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1oZWFkZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiU2VnbWVudCBcIiArIF92bS5fcyhfdm0uaWQgPyBcImJld2Vya2VuXCIgOiBcInRvZXZvZWdlblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWJvZHlcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tcm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjYXJkLWZvb3RlciBoYXMtYnV0dG9uc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmF0aXZlLXR5cGVcIjogXCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIk9wc2xhYW5cIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSlcbiAgICAgICAgfSlcbiAgICAgIF0sXG4gICAgICAxXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTJcIiB9LFxuICAgICAgW1xuICAgICAgICBfdm0uaXRlbXNcbiAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkXCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC10YWJsZVwiIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFwidnVlLXRhYmxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcInZ1ZS5maW5hbmNlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYW4tZGVsZXRlXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydGluZzogX3ZtLnNvcnRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluaXRpYWwtZGF0YVwiOiBfdm0uaXRlbXNcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNvcnRpbmcgPSByZWYuc29ydGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWNrSGFuZGxlciA9IHJlZi5jbGlja0hhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidnVlLXRhYmxlLWhlYWRlclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRpbmc6IHNvcnRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOYWFtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBcInBsdWdpbi5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBjbGlja0hhbmRsZXIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2dWUtdGFibGUtaGVhZGVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydGluZzogc29ydGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFjdGllZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpZmllcjogXCJhY3RpdmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgY2xpY2s6IGNsaWNrSGFuZGxlciB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcInJvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSByZWYucm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInZ1ZS10YWJsZS1jb2x1bW5cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IHJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiBcInBsdWdpbi5uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZlcnNpb25zLmVkaXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7IGlkOiByb3cuaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidnVlLXRhYmxlLWNvbHVtblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogcm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogXCJhY3RpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjdXN0b21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhyb3cuYWN0aXZlID8gXCJKYVwiIDogXCJOZWVcIikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgMTUyNTk2MTQ2OFxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgIF0sXG4gICAgICAyXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250YWluZXItZmx1aWRcIiB9LCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sIFtcbiAgICAgICAgX2MoXG4gICAgICAgICAgXCJ1bFwiLFxuICAgICAgICAgIF92bS5fbChfdm0uYXZhaWxhYmxlUm91dGVzLCBmdW5jdGlvbihyb3V0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICBcImxpXCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXNlci1oYXMtcm9sZVwiLFxuICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtdXNlci1oYXMtcm9sZVwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm91dGUucm9sZSxcbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJyb3V0ZS5yb2xlXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGtleTogcm91dGUubmFtZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmstYWN0aXZlXCI6IF92bS5yb3V0ZXJMaW5rQWN0aXZlKHJvdXRlKSxcbiAgICAgICAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rLWV4YWN0LWFjdGl2ZVwiOiBfdm0ucm91dGVyTGlua0V4YWN0QWN0aXZlKFxuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLm5hdmlnYXRlKHJvdXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImZvbnQtYXdlc29tZS1pY29uXCIsIHsgYXR0cnM6IHsgaWNvbjogcm91dGUuaWNvbiB9IH0pXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3Mocm91dGUudGV4dCkgfSxcbiAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLm5hdmlnYXRlKHJvdXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLmNoaWxkcmVuICE9PSB1bmRlZmluZWQgJiYgcm91dGUuY2hpbGRyZW4ubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUuc3VibWVudU9wZW4gPSAhcm91dGUuc3VibWVudU9wZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImZvbnQtYXdlc29tZS1pY29uXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7IHJvdGF0ZTogcm91dGUuc3VibWVudU9wZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGljb246IFwiYW5nbGUtbGVmdFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICByb3V0ZS5jaGlsZHJlbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgcm91dGUuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgIHJvdXRlLnN1Ym1lbnVPcGVuXG4gICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwidWxcIixcbiAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzOiB7IG9wZW46IHJvdXRlLnN1Ym1lbnVPcGVuIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX2wocm91dGUuY2hpbGRyZW4sIGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1c2VyLWhhcy1yb2xlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi11c2VyLWhhcy1yb2xlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjaGlsZC5yb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImNoaWxkLnJvbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBjaGlsZC5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3V0ZXItbGluay1hY3RpdmVcIjogX3ZtLnJvdXRlckxpbmtBY3RpdmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3V0ZXItbGluay1leGFjdC1hY3RpdmVcIjogX3ZtLnJvdXRlckxpbmtFeGFjdEFjdGl2ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IGlubmVySFRNTDogX3ZtLl9zKGNoaWxkLnRleHQpIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5uYXZpZ2F0ZShjaGlsZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5jaGlsZHJlbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmNoaWxkcmVuLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnN1Ym1lbnVPcGVuID0gIWNoaWxkLnN1Ym1lbnVPcGVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJmb250LWF3ZXNvbWUtaWNvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogeyByb3RhdGU6IGNoaWxkLnN1Ym1lbnVPcGVuIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBpY29uOiBcImFuZ2xlLWxlZnRcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQuY2hpbGRyZW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5zdWJtZW51T3BlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzczogeyBvcGVuOiBjaGlsZC5zdWJtZW51T3BlbiB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKGNoaWxkLmNoaWxkcmVuLCBmdW5jdGlvbihzdWJDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwicm91dGVyLWxpbmtcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHN1YkNoaWxkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86IHsgbmFtZTogc3ViQ2hpbGQubmFtZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogXCJsaVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBfdm0uX3Moc3ViQ2hpbGQudGV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSksXG4gICAgICAgICAgMFxuICAgICAgICApXG4gICAgICBdKVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICBbXG4gICAgICAgIF9jKFwidnVlLWZvcm1cIiwge1xuICAgICAgICAgIGF0dHJzOiB7IHVybDogX3ZtLnVybChcInBsdWdpbnNcIiksIG1vZGVsOiBfdm0uaXRlbSB9LFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBcInN1Ym1pdDpzdWNjZXNzXCI6IF92bS5zdWJtaXRTdWNjZXNzLFxuICAgICAgICAgICAgXCJzdWJtaXQ6ZXJyb3JcIjogX3ZtLnN1Ym1pdEVycm9yXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBmb3JtID0gcmVmLmZvcm1cbiAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSByZWYubW9kZWxcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZm9ybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudC1sb2FkaW5nLWJhY2tncm91bmRcIjogXCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1oZWFkZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiUGx1Z2luIFwiICsgX3ZtLl9zKF92bS5pZCA/IFwiYmV3ZXJrZW5cIiA6IFwidG9ldm9lZ2VuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtYm9keVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1yb3dcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmQtZm9vdGVyIGhhcy1idXR0b25zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYXRpdmUtdHlwZVwiOiBcInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiT3BzbGFhblwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdKVxuICAgICAgICB9KVxuICAgICAgXSxcbiAgICAgIDFcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICBbXG4gICAgICAgIF92bS5pdGVtc1xuICAgICAgICAgID8gW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmRcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjYXJkLXRhYmxlXCIgfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJ2dWUtdGFibGVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwidnVlLmZpbmFuY2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNhbi1kZWxldGVcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0aW5nOiBfdm0uc29ydGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5pdGlhbC1kYXRhXCI6IF92bS5pdGVtc1xuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc29ydGluZyA9IHJlZi5zb3J0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xpY2tIYW5kbGVyID0gcmVmLmNsaWNrSGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2dWUtdGFibGUtaGVhZGVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydGluZzogc29ydGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5hYW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aWZpZXI6IFwicGx1Z2luLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgY2xpY2s6IGNsaWNrSGFuZGxlciB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInZ1ZS10YWJsZS1oZWFkZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0aW5nOiBzb3J0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQWN0aWVmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBcImFjdGl2ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyBjbGljazogY2xpY2tIYW5kbGVyIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwicm93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHJlZi5yb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidnVlLXRhYmxlLWNvbHVtblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogcm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6IFwicGx1Z2luLm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGx1Z2lucy5lZGl0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogeyBpZDogcm93LmlkIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZ1ZS10YWJsZS1jb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IHJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk6IFwiYWN0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY3VzdG9tXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3Mocm93LmFjdGl2ZSA/IFwiSmFcIiA6IFwiTmVlXCIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDg5OTY4NjYwN1xuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgIF0sXG4gICAgICAyXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTJcIiB9LFxuICAgICAgW1xuICAgICAgICBfYyhcInZ1ZS1mb3JtXCIsIHtcbiAgICAgICAgICBhdHRyczogeyB1cmw6IF92bS51cmwoXCJ1c2Vyc1wiKSwgbW9kZWw6IF92bS5pdGVtIH0sXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIFwic3VibWl0OnN1Y2Nlc3NcIjogX3ZtLnN1Ym1pdFN1Y2Nlc3MsXG4gICAgICAgICAgICBcInN1Ym1pdDplcnJvclwiOiBfdm0uc3VibWl0RXJyb3JcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm0gPSByZWYuZm9ybVxuICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHJlZi5tb2RlbFxuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1sb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmb3JtLnN1Ym1pdHRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZm9ybS5zdWJtaXR0aW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNhcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50LWxvYWRpbmctYmFja2dyb3VuZFwiOiBcInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWhlYWRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHZWJydWlrZXIgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uaWQgPyBcImJld2Vya2VuXCIgOiBcInRvZXZvZWdlblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWJvZHlcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tcm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjYXJkLWZvb3RlciBoYXMtYnV0dG9uc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmF0aXZlLXR5cGVcIjogXCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIk9wc2xhYW5cIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSlcbiAgICAgICAgfSlcbiAgICAgIF0sXG4gICAgICAxXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTJcIiB9LFxuICAgICAgW1xuICAgICAgICBfdm0uaXRlbXNcbiAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkXCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC10YWJsZVwiIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFwidnVlLXRhYmxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcInZ1ZS5maW5hbmNlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYW4tZGVsZXRlXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydGluZzogX3ZtLnNvcnRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluaXRpYWwtZGF0YVwiOiBfdm0uaXRlbXNcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNvcnRpbmcgPSByZWYuc29ydGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWNrSGFuZGxlciA9IHJlZi5jbGlja0hhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidnVlLXRhYmxlLWhlYWRlclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRpbmc6IHNvcnRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOYWFtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBcIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgY2xpY2s6IGNsaWNrSGFuZGxlciB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcInJvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSByZWYucm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInZ1ZS10YWJsZS1jb2x1bW5cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IHJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYXBwbGljYXRpb25zLmVkaXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7IGlkOiByb3cuaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAyNzQ3MjA5NjUyXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgXSxcbiAgICAgIDJcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICBbXG4gICAgICAgIF9jKFwidnVlLWZvcm1cIiwge1xuICAgICAgICAgIGF0dHJzOiB7IHVybDogX3ZtLnVybChcInZlcnNpb25zXCIpLCBtb2RlbDogX3ZtLml0ZW0gfSxcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgXCJzdWJtaXQ6c3VjY2Vzc1wiOiBfdm0uc3VibWl0U3VjY2VzcyxcbiAgICAgICAgICAgIFwic3VibWl0OmVycm9yXCI6IF92bS5zdWJtaXRFcnJvclxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IHJlZi5mb3JtXG4gICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gcmVmLm1vZGVsXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxvYWRpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LWxvYWRpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZvcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJmb3JtLnN1Ym1pdHRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2FyZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kXCI6IFwicmdiYSgyNDgsMjUwLDI1MiwwLjYpXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtaGVhZGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcCB2ZXJzaWUgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uaWQgPyBcImJld2Vya2VuXCIgOiBcInRvZXZvZWdlblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWJvZHlcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tcm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjYXJkLWZvb3RlciBoYXMtYnV0dG9uc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmF0aXZlLXR5cGVcIjogXCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIk9wc2xhYW5cIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSlcbiAgICAgICAgfSlcbiAgICAgIF0sXG4gICAgICAxXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTJcIiB9LFxuICAgICAgW1xuICAgICAgICBfdm0uaXRlbXNcbiAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkXCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC10YWJsZVwiIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFwidnVlLXRhYmxlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcInZ1ZS5maW5hbmNlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYW4tZGVsZXRlXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydGluZzogX3ZtLnNvcnRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluaXRpYWwtZGF0YVwiOiBfdm0uaXRlbXNcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNvcnRpbmcgPSByZWYuc29ydGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWNrSGFuZGxlciA9IHJlZi5jbGlja0hhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwidnVlLXRhYmxlLWhlYWRlclwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRpbmc6IHNvcnRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOYWFtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBcInBsdWdpbi5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBjbGlja0hhbmRsZXIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJ2dWUtdGFibGUtaGVhZGVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydGluZzogc29ydGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFjdGllZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpZmllcjogXCJhY3RpdmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgY2xpY2s6IGNsaWNrSGFuZGxlciB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcInJvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSByZWYucm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInZ1ZS10YWJsZS1jb2x1bW5cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IHJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiBcInBsdWdpbi5uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZlcnNpb25zLmVkaXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7IGlkOiByb3cuaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidnVlLXRhYmxlLWNvbHVtblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogcm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogXCJhY3RpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjdXN0b21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhyb3cuYWN0aXZlID8gXCJKYVwiIDogXCJOZWVcIikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgMTUyNTk2MTQ2OFxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgIF0sXG4gICAgICAyXG4gICAgKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSJdLCJzb3VyY2VSb290IjoiIn0=