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
/******/ 			if(installedChunks[chunkId]) {
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
/******/ 		"app": 0
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
/******/ 	deferredModules.push(["./Resources/assets/vue/app.js","vendors~app"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Resources/assets/vue/acl.js":
/*!*************************************!*\
  !*** ./Resources/assets/vue/acl.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ACL; });
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);







/**
 * ACL class to provide helper functions for the user and it's roles
 */
var ACL =
/*#__PURE__*/
function () {
  function ACL() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, ACL);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(ACL, null, [{
    key: "init",

    /**
       * Initialize the ACL plugin
       */
    value: function init() {
      var response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.async(function init$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.awrap(axios.all([axios.get('/api/vue/users/profile')]));

            case 3:
              response = _context.sent;
              window.roles = response[0].data.data;
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              window.user = {};

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }]);

  return ACL;
}();



/***/ }),

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
/* harmony import */ var _libraries_element__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./libraries/element */ "./Resources/assets/vue/libraries/element.js");
/* harmony import */ var _libraries_form__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./libraries/form */ "./Resources/assets/vue/libraries/form.js");
/* harmony import */ var _libraries_moment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./libraries/moment */ "./Resources/assets/vue/libraries/moment.js");
/* harmony import */ var _libraries_progressbar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./libraries/progressbar */ "./Resources/assets/vue/libraries/progressbar.js");
/* harmony import */ var _libraries_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./libraries/router */ "./Resources/assets/vue/libraries/router.js");
/* harmony import */ var _libraries_table__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./libraries/table */ "./Resources/assets/vue/libraries/table.js");










 // import './libraries/auth';
// import './libraries/draggable';

 // import './libraries/fontawesome';

 // import './libraries/masonry';





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

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

var files = __webpack_require__("./Resources/assets/vue/components sync recursive \\.vue$/");

files.keys().map(function (key) {
  return vue__WEBPACK_IMPORTED_MODULE_7__["default"].component(key.split('/').pop().split('.')[0], files(key));
});
var app = new vue__WEBPACK_IMPORTED_MODULE_7__["default"]({
  el: '#app',
  components: {
    App: _views_App__WEBPACK_IMPORTED_MODULE_10__["default"]
  },
  router: _libraries_router__WEBPACK_IMPORTED_MODULE_15__["default"],
  mounted: function mounted() {}
});

/***/ }),

/***/ "./Resources/assets/vue/bootstrap.js":
/*!*******************************************!*\
  !*** ./Resources/assets/vue/bootstrap.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window._ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
window.Popper = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js")["default"];
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
  window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

  __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'bootstrap'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
} catch (e) {}
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */


window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
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
/* harmony import */ var _oauth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../oauth */ "./Resources/assets/vue/oauth.js");



var oAuth = new _oauth__WEBPACK_IMPORTED_MODULE_2__["default"]();
/**
 * Request interceptor
 */

window.axios.interceptors.request.use(function (config) {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'; // Add the authentication header when the user is logged in

  if (oAuth.isAuthenticated()) {
    // Set the authorization header for each request
    config.headers['Authorization'] = oAuth.getAuthHeader();
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
}, function (error) {
  // Refresh the access token
  if (error.response !== undefined && error.response.status === 401 && oAuth.isAuthenticated()) {
    oAuth.logout();
  } // Do something with response error


  return Promise.reject(error);
});

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
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../routes */ "./Resources/assets/vue/routes/index.js");
/* harmony import */ var _oauth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../oauth */ "./Resources/assets/vue/oauth.js");
/* harmony import */ var _acl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../acl */ "./Resources/assets/vue/acl.js");





var router = new vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]({
  mode: 'history',
  base: '/beta/',
  routes: _routes__WEBPACK_IMPORTED_MODULE_2__["default"]
});
vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]);
var oAuth = new _oauth__WEBPACK_IMPORTED_MODULE_3__["default"]();
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
  }

  if (to.meta.auth) {
    // Customers' license is insufficient
    if (to.meta.license !== undefined && window.customer.license !== undefined && window.customer.license.license_type < to.meta.license) {
      return next({
        path: '/'
      });
    } // User has no rights visiting this page


    if (to.meta.permission !== undefined && window.roles !== undefined && !_acl__WEBPACK_IMPORTED_MODULE_4__["default"].userCan(to.meta.permission)) {
      return next({
        path: '/'
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



vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_table__WEBPACK_IMPORTED_MODULE_2__["CardTableHeader"].name, _bit_e_sites_vue_global_table__WEBPACK_IMPORTED_MODULE_2__["CardTableHeader"]);
vue__WEBPACK_IMPORTED_MODULE_1__["default"].component(_bit_e_sites_vue_global_table__WEBPACK_IMPORTED_MODULE_2__["VueTable"].name, _bit_e_sites_vue_global_table__WEBPACK_IMPORTED_MODULE_2__["VueTable"]);

/***/ }),

/***/ "./Resources/assets/vue/oauth.js":
/*!***************************************!*\
  !*** ./Resources/assets/vue/oauth.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _oauth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./oauth.service */ "./Resources/assets/vue/oauth.service.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_5__);







var _default =
/*#__PURE__*/
function () {
  /**
     * Constructor
     */
  function _default() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, _default);

    this.session = js_cookie__WEBPACK_IMPORTED_MODULE_5___default.a;
  }
  /**
     * Logout
     */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(_default, [{
    key: "logout",
    value: function logout() {
      _oauth_service__WEBPACK_IMPORTED_MODULE_4__["default"].destroySession();
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
       * Login using username and password
       * @param username
       * @param password
       * @returns {Promise<any>}
       */

  }, {
    key: "login",
    value: function login(username, password) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _oauth_service__WEBPACK_IMPORTED_MODULE_4__["default"].attemptLogin({
          username: username,
          password: password
        }).then(function (response) {
          _this.storeSession(response.data);

          _this.addAuthHeaders();

          resolve(response);
        })["catch"](function (error) {
          reject(error);
        });
      });
    }
    /**
       * Refresh the access token of the user
       * @returns {Promise<any>}
       */

  }, {
    key: "refreshToken",
    value: function refreshToken() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _oauth_service__WEBPACK_IMPORTED_MODULE_4__["default"].attemptLogin({
          refresh_token: _this2.session.get('refresh_token')
        }).then(function (response) {
          _this2.storeSession(response.data);

          _this2.addAuthHeaders();

          resolve(response);
        })["catch"](function (error) {
          reject(error);
        });
      });
    }
    /**
       * Get the user from the API
       * @returns {Promise<any>}
       */

  }, {
    key: "getUser",
    value: function getUser() {
      if (this.isAuthenticated()) {
        return new Promise(function (resolve, reject) {
          _oauth_service__WEBPACK_IMPORTED_MODULE_4__["default"].currentUser().then(function (response) {
            resolve(response);
          })["catch"](function (error) {
            reject(error);
          });
        });
      }

      return new Promise(function (resolve) {
        return resolve(null);
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
       * Add auth headers to the requests
       */

  }, {
    key: "addAuthHeaders",
    value: function addAuthHeaders() {
      var header = this.getAuthHeader();
      _oauth_service__WEBPACK_IMPORTED_MODULE_4__["default"].addAuthorizationHeader(header);
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

  return _default;
}();



/***/ }),

/***/ "./Resources/assets/vue/oauth.service.js":
/*!***********************************************!*\
  !*** ./Resources/assets/vue/oauth.service.js ***!
  \***********************************************/
/*! exports provided: default */
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




/* harmony default export */ __webpack_exports__["default"] = ({
  user: null,
  destroySession: function destroySession() {
    this.user = null;
  },
  currentUser: function currentUser() {
    var user;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.async(function currentUser$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!this.user) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", this.user);

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.awrap(window.axios.get('/api/vue/users/profile'));

          case 5:
            user = _context.sent;
            this.user = user;
            return _context.abrupt("return", new Promise(function (resolve) {
              return resolve(user);
            }));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", new Promise(function (reject) {
              return reject(_context.t0);
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, this, [[2, 10]]);
  },
  attemptLogin: function attemptLogin(credentials) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.async(function attemptLogin$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.awrap(window.axios.post('/api/vue/users/login', credentials));

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", new Promise(function (resolve) {
              return resolve(response);
            }));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", new Promise(function (reject) {
              return reject(_context2.t0);
            }));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  refreshToken: function refreshToken(params) {
    var response;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.async(function refreshToken$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.awrap(window.axios.post('/api/vue/users/refresh', params));

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", new Promise(function (resolve) {
              return resolve(response);
            }));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", new Promise(function (reject) {
              return reject(_context3.t0);
            }));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  addAuthorizationHeader: function addAuthorizationHeader(header) {
    window.axios.defaults.headers.common['Authorization'] = header;
  }
});

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
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/web.url */ "./node_modules/core-js/modules/web.url.js");
/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _acl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./acl */ "./Resources/assets/vue/acl.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./helpers */ "./Resources/assets/vue/helpers.js");
















vue__WEBPACK_IMPORTED_MODULE_13__["default"].mixin({
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
    route: route,
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
vue__WEBPACK_IMPORTED_MODULE_13__["default"].filter('capitalize', function (value) {
  if (!value) {
    return '';
  }

  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});
vue__WEBPACK_IMPORTED_MODULE_13__["default"].directive('user-can', function (el, bindings, vnode) {
  var behaviour = bindings.modifiers.disable ? 'disable' : 'hide';

  if (!_acl__WEBPACK_IMPORTED_MODULE_14__["default"].userCan(bindings.value)) {
    if (behaviour === 'hide') {
      _helpers__WEBPACK_IMPORTED_MODULE_15__["default"].commentNode(el, vnode);
    } else if (behaviour === 'disable') {
      el.disabled = true;
    }
  }
});

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
}].concat(_modules_authentication__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (routes);

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
}, {
  path: '/register/:token',
  name: 'register',
  props: true,
  component: __webpack_require__(/*! ../../views/authentication/Register */ "./Resources/assets/vue/views/authentication/Register.vue")["default"],
  meta: {
    auth: false
  }
}]);

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

/***/ "./Resources/assets/vue/views/authentication/Register.vue":
/*!****************************************************************!*\
  !*** ./Resources/assets/vue/views/authentication/Register.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Register_vue_vue_type_template_id_7f4fd95c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Register.vue?vue&type=template&id=7f4fd95c& */ "./Resources/assets/vue/views/authentication/Register.vue?vue&type=template&id=7f4fd95c&");
/* harmony import */ var _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Register.vue?vue&type=script&lang=js& */ "./Resources/assets/vue/views/authentication/Register.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Register_vue_vue_type_template_id_7f4fd95c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Register_vue_vue_type_template_id_7f4fd95c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/assets/vue/views/authentication/Register.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./Resources/assets/vue/views/authentication/Register.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./Resources/assets/vue/views/authentication/Register.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--0-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Register.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/Register.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/assets/vue/views/authentication/Register.vue?vue&type=template&id=7f4fd95c&":
/*!***********************************************************************************************!*\
  !*** ./Resources/assets/vue/views/authentication/Register.vue?vue&type=template&id=7f4fd95c& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_7f4fd95c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Register.vue?vue&type=template&id=7f4fd95c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/Register.vue?vue&type=template&id=7f4fd95c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_7f4fd95c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_7f4fd95c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/App.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/App.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
/* harmony default export */ __webpack_exports__["default"] = ({});

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
//
//
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
//
//
//
//
//
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
      },
      loading: false
    };
  },
  methods: {
    authenticated: function authenticated(response) {
      // this.$oauth.storeSession(response);
      // this.$oauth.addAuthHeaders();
      this.$router.replace({
        name: 'dashboard'
      });
    },
    error: function error(_error) {
      this.loading = false;
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/Register.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/authentication/Register.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      required: true
    }
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    axios.get(route('vue.registration', {
      token: to.params.token
    })).then(function (_ref) {
      var user = _ref.data.data;
      next(function (vm) {
        vm.user = user;
      });
    })["catch"](function (error) {
      next();
    });
  },
  data: function data() {
    return {
      user: null,
      loading: false,
      activated: false
    };
  },
  methods: {
    registrated: function registrated(response) {
      if (!response.access_token) {
        this.activated = true;
        this.user = {};
        return;
      }

      this.$oauth.storeSession(response);
      this.$oauth.addAuthHeaders();
      this.$router.replace({
        name: 'dashboard'
      });
      Events.$emit('users:authenticated');
    },
    error: function error(_error) {
      this.loading = false;
      this.user.password = null;
      this.user.password_confirmation = null;
      this.$message({
        message: 'Er is iets mis gegaan, probeer het opnieuw',
        type: 'error'
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
      required: false
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

    axios.get(route('vue.password.token', {
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
  return _c("div")
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
            attrs: { url: _vm.route("vue.password.forgot"), model: _vm.user },
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
                            "\n              Wachtwoord vergeten\n            "
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
            attrs: { model: _vm.user, url: "/api/vue/login" },
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
                          _vm._v("\n              Inloggen\n            ")
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
                                      "\n                    Inloggen\n                  "
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
                                      "\n                    Wachtwoord vergeten\n                  "
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./Resources/assets/vue/views/authentication/Register.vue?vue&type=template&id=7f4fd95c&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./Resources/assets/vue/views/authentication/Register.vue?vue&type=template&id=7f4fd95c& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
      _vm.user
        ? _c(
            "div",
            {
              staticClass: "col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4"
            },
            [
              _c("vue-form", {
                attrs: { model: _vm.user, url: _vm.route("vue.register") },
                on: {
                  "submit:success": _vm.registrated,
                  "submit:error": _vm.error
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
                                  "\n              Registreren\n            "
                                )
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "card-body" }, [
                                _c(
                                  "div",
                                  { staticClass: "row margin-bottom-sm" },
                                  [
                                    _vm.activated
                                      ? _c("el-alert", {
                                          attrs: {
                                            title:
                                              "Uw account is geactiveerd, u kunt nu inloggen in de app",
                                            type: "success",
                                            closable: false
                                          }
                                        })
                                      : _vm._e()
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("div", { staticClass: "row" }, [
                                  _c(
                                    "div",
                                    { staticClass: "col-sm-12" },
                                    [
                                      _c("input-text", {
                                        attrs: {
                                          name: "first_name",
                                          label: "Voornaam",
                                          placeholder: "Voornaam",
                                          model: model,
                                          form: form
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "row" }, [
                                  _c(
                                    "div",
                                    { staticClass: "col-sm-12" },
                                    [
                                      _c("input-text", {
                                        attrs: {
                                          name: "last_name",
                                          label: "Achternaam",
                                          placeholder: "Achternaam",
                                          model: model,
                                          form: form
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "row" }, [
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
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "row" }, [
                                  _c(
                                    "div",
                                    { staticClass: "col-sm-12" },
                                    [
                                      _c("input-password", {
                                        attrs: {
                                          name: "password_confirmation",
                                          label: "Wachtwoord bevestigen",
                                          placeholder: "Wachtwoord bevestigen",
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
                                        "\n                Registreren\n              "
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
                  3877025718
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
                  url: _vm.route("vue.password.reset"),
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



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvYWNsLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9ib290c3RyYXAuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvY29tcG9uZW50cyBzeW5jIFxcLnZ1ZSQvIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvaW50ZXJjZXB0b3JzL2F4aW9zLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2xpYnJhcmllcy9lbGVtZW50LmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2xpYnJhcmllcy9mb3JtLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2xpYnJhcmllcy9tb21lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvbGlicmFyaWVzL3Byb2dyZXNzYmFyLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2xpYnJhcmllcy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvbGlicmFyaWVzL3RhYmxlLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL29hdXRoLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL29hdXRoLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvcGx1Z2lucy5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9yb3V0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvcm91dGVzL21vZHVsZXMvYXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvQXBwLnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9BcHAudnVlP2MxNzEiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvQXBwLnZ1ZT9iNTM3Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0Rhc2hib2FyZC52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvRGFzaGJvYXJkLnZ1ZT80ZWU4Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0Rhc2hib2FyZC52dWU/M2U0MiIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Gb3Jnb3RQYXNzd29yZC52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vRm9yZ290UGFzc3dvcmQudnVlPzg5NDIiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vRm9yZ290UGFzc3dvcmQudnVlPzQ5MDYiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vTG9naW4udnVlIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0xvZ2luLnZ1ZT9lZTFkIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0xvZ2luLnZ1ZT8xZTcyIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL1JlZ2lzdGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZWdpc3Rlci52dWU/MzMyZiIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZWdpc3Rlci52dWU/ZjdjZiIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZXNldFBhc3N3b3JkLnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZXNldFBhc3N3b3JkLnZ1ZT8yNzIyIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL1Jlc2V0UGFzc3dvcmQudnVlPzc4ZGUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvZXJyb3JzL05vdEZvdW5kLnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9lcnJvcnMvTm90Rm91bmQudnVlPzQ4MmQiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvZXJyb3JzL05vdEZvdW5kLnZ1ZT9hYzc4Iiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9BcHAudnVlIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9EYXNoYm9hcmQudnVlIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Gb3Jnb3RQYXNzd29yZC52dWUiLCJ3ZWJwYWNrOi8vL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0xvZ2luLnZ1ZSIsIndlYnBhY2s6Ly8vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVnaXN0ZXIudnVlIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZXNldFBhc3N3b3JkLnZ1ZSIsIndlYnBhY2s6Ly8vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvZXJyb3JzL05vdEZvdW5kLnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvQXBwLnZ1ZT8yNjQwIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0Rhc2hib2FyZC52dWU/NTRmOSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Gb3Jnb3RQYXNzd29yZC52dWU/NzQ1MCIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Mb2dpbi52dWU/MTdiYSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZWdpc3Rlci52dWU/ZGZhNiIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZXNldFBhc3N3b3JkLnZ1ZT9hZGI0Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2Vycm9ycy9Ob3RGb3VuZC52dWU/OWQyMCJdLCJuYW1lcyI6WyJBQ0wiLCJheGlvcyIsImFsbCIsImdldCIsInJlc3BvbnNlIiwid2luZG93Iiwicm9sZXMiLCJkYXRhIiwidXNlciIsIlZ1ZSIsIkV2ZW50cyIsImZpbGVzIiwicmVxdWlyZSIsImtleXMiLCJtYXAiLCJrZXkiLCJjb21wb25lbnQiLCJzcGxpdCIsInBvcCIsImFwcCIsImVsIiwiY29tcG9uZW50cyIsIkFwcCIsInJvdXRlciIsIm1vdW50ZWQiLCJfIiwiUG9wcGVyIiwiJCIsImpRdWVyeSIsImUiLCJjb21tZW50Tm9kZSIsInZub2RlIiwiY29tbWVudCIsImRvY3VtZW50IiwiY3JlYXRlQ29tbWVudCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJ0ZXh0IiwiZWxtIiwiaXNDb21tZW50IiwiY29udGV4dCIsInRhZyIsImRpcmVjdGl2ZXMiLCJjb21wb25lbnRJbnN0YW5jZSIsIiRlbCIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJvQXV0aCIsIk9BdXRoIiwiaW50ZXJjZXB0b3JzIiwicmVxdWVzdCIsInVzZSIsImNvbmZpZyIsImhlYWRlcnMiLCJpc0F1dGhlbnRpY2F0ZWQiLCJnZXRBdXRoSGVhZGVyIiwiZXJyb3IiLCJQcm9taXNlIiwicmVqZWN0Iiwic3RhdHVzIiwibG9nb3V0IiwibG9jYWxlIiwibGFuZyIsIkFsZXJ0IiwibmFtZSIsIkNvbGxhcHNlIiwiQ29sbGFwc2VJdGVtIiwiSW5wdXQiLCJJbnB1dERpZ2l0IiwiUmFkaW8iLCJDaGVja2JveCIsIlRhZyIsIkJ1dHRvbiIsIlNlbGVjdCIsIk9wdGlvbiIsIk9wdGlvbkdyb3VwIiwiVG9vbHRpcCIsIkRyb3Bkb3duIiwiRHJvcGRvd25NZW51IiwiRHJvcGRvd25JdGVtIiwiVXBsb2FkIiwiVGFiUGFuZSIsIlRhYnMiLCJEYXRlUGlja2VyIiwiVHJhbnNmZXIiLCJEaWFsb2ciLCJUaW1lU2VsZWN0IiwiQ29sb3JQaWNrZXIiLCJMb2FkaW5nIiwiZGlyZWN0aXZlIiwicHJvdG90eXBlIiwiJG1lc3NhZ2UiLCJNZXNzYWdlIiwiJG1zZ2JveCIsIk1lc3NhZ2VCb3giLCIkYWxlcnQiLCJhbGVydCIsIiRjb25maXJtIiwiY29uZmlybSIsIiRwcm9tcHQiLCJwcm9tcHQiLCJWdWVGb3JtIiwiSW5wdXRSYWRpbyIsIklucHV0Q2hlY2tib3giLCJJbnB1dFRleHQiLCJJbnB1dE51bWJlciIsIklucHV0UGFzc3dvcmQiLCJJbnB1dEVkaXRvciIsIklucHV0U2VsZWN0IiwiSW5wdXRVcGxvYWQiLCJJbnB1dERhdGVUaW1lIiwiSW5wdXRDb2RlIiwiSW5wdXRUaW1lIiwiSW5wdXRDb2xvclBpY2tlciIsIiRtb21lbnQiLCJtb21lbnQiLCJWdWVQcm9ncmVzcyIsIlZ1ZVByb2dyZXNzQmFyIiwiY29sb3IiLCJmYWlsZWRDb2xvciIsInRoaWNrbmVzcyIsInRyYW5zaXRpb24iLCJzcGVlZCIsIm9wYWNpdHkiLCJ0ZXJtaW5hdGlvbiIsIlZ1ZVJvdXRlciIsIm1vZGUiLCJiYXNlIiwicm91dGVzIiwiYmVmb3JlRWFjaCIsInRvIiwiZnJvbSIsIm5leHQiLCJtZXRhIiwiYXV0aCIsInBhdGgiLCJndWVzdCIsInF1ZXJ5IiwicmVkaXJlY3QiLCJmdWxsUGF0aCIsImxpY2Vuc2UiLCJjdXN0b21lciIsImxpY2Vuc2VfdHlwZSIsInBlcm1pc3Npb24iLCJhY2wiLCJ1c2VyQ2FuIiwiQ2FyZFRhYmxlSGVhZGVyIiwiVnVlVGFibGUiLCJzZXNzaW9uIiwiQ29va2llcyIsIkF1dGhTZXJ2aWNlIiwiZGVzdHJveVNlc3Npb24iLCJyZW1vdmUiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwicmVzb2x2ZSIsImF0dGVtcHRMb2dpbiIsInRoZW4iLCJzdG9yZVNlc3Npb24iLCJhZGRBdXRoSGVhZGVycyIsInJlZnJlc2hfdG9rZW4iLCJjdXJyZW50VXNlciIsImFjY2Vzc190b2tlbiIsImdldEl0ZW0iLCJoZWFkZXIiLCJhZGRBdXRob3JpemF0aW9uSGVhZGVyIiwiaG91ckluTWlsbGlTZWNvbmRzIiwidGltZSIsImV4cGlyZXNfaW4iLCJzZXQiLCJleHBpcmVzIiwiY3JlZGVudGlhbHMiLCJwb3N0IiwicmVmcmVzaFRva2VuIiwicGFyYW1zIiwiZGVmYXVsdHMiLCJjb21tb24iLCJtaXhpbiIsImZpbHRlcnMiLCJjYXBpdGFsaXplIiwidG9TdHJpbmciLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwibWV0aG9kcyIsInJvdXRlIiwic3VibWl0U3VjY2VzcyIsInR5cGUiLCJtZXNzYWdlIiwic3VibWl0RXJyb3IiLCJ0aXRsZSIsImNvbmZpcm1CdXR0b25UZXh0IiwiY2FuY2VsQnV0dG9uVGV4dCIsImRhbmdlcm91c2x5VXNlSFRNTFN0cmluZyIsImlzRW1wdHkiLCJmb3JtYXRQcmljZSIsInZhbCIsInRvRml4ZWQiLCJyZXBsYWNlIiwiZG93bmxvYWRGaWxlIiwidXJsIiwibWV0aG9kIiwicmVzcG9uc2VUeXBlIiwiZmlsZU5hbWUiLCJkaXNwb3NpdGlvbiIsImluZGV4T2YiLCJmaWxlbmFtZVJlZ2V4IiwibWF0Y2hlcyIsImV4ZWMiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwibGluayIsImNyZWF0ZUVsZW1lbnQiLCJocmVmIiwic2V0QXR0cmlidXRlIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJyZW1vdmVDaGlsZCIsImZpbHRlciIsImJpbmRpbmdzIiwiYmVoYXZpb3VyIiwibW9kaWZpZXJzIiwiZGlzYWJsZSIsImhlbHBlcnMiLCJkaXNhYmxlZCIsImNvbmNhdCIsImF1dGhlbnRpY2F0aW9uIiwicHJvcHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBLDBCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkU7Ozs7Ozs7Ozs7OztBQ25SQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscUJBQXFCO0FBQzNDLGlCQUFpQiwyQkFBMkI7QUFDNUMsbUJBQW1CLHNCQUFzQjtBQUN6QyxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpQ0FBaUM7QUFDckQsZUFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBLFNBQVMscUVBQXFFO0FBQzlFO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5REFBeUQ7QUFDN0U7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0EsbUNBQW1DLDZCQUE2QjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDJCQUEyQjtBQUM5RCxxQ0FBcUMsMEJBQTBCO0FBQy9ELHVDQUF1QywyQkFBMkI7QUFDbEU7QUFDQTtBQUNBLGlDQUFpQyw0QkFBNEI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIseUNBQXlDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDeEdBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlDQUFpQztBQUNyRCxlQUFlLHFCQUFxQjtBQUNwQztBQUNBO0FBQ0EsU0FBUyxxRUFBcUU7QUFDOUU7QUFDQTtBQUNBLG9CQUFvQix5Q0FBeUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0EsbUNBQW1DLDZCQUE2QjtBQUNoRTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsMkJBQTJCO0FBQzlELHFDQUFxQywwQkFBMEI7QUFDL0Q7QUFDQTtBQUNBLCtCQUErQiwyQkFBMkI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsMEJBQTBCO0FBQy9EO0FBQ0E7QUFDQSwrQkFBK0IsMkJBQTJCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsNkJBQTZCO0FBQ2hFLHFDQUFxQyxxQkFBcUI7QUFDMUQ7QUFDQTtBQUNBLCtCQUErQixxQkFBcUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsMEJBQTBCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGVBQWU7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkpBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlDQUFpQztBQUNyRCxlQUFlLHFCQUFxQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSx3QkFBd0Isa0RBQWtEO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsMkJBQTJCO0FBQ3BFO0FBQ0E7QUFDQSxtQ0FBbUMsc0NBQXNDO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHFCQUFxQjtBQUNoRTtBQUNBO0FBQ0EscUNBQXFDLDJCQUEyQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxxQkFBcUI7QUFDaEU7QUFDQTtBQUNBLHFDQUFxQywyQkFBMkI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMscUJBQXFCO0FBQ2hFO0FBQ0E7QUFDQSxxQ0FBcUMsMkJBQTJCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHFCQUFxQjtBQUNoRTtBQUNBO0FBQ0EscUNBQXFDLDJCQUEyQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyx5Q0FBeUM7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDM0xBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlDQUFpQztBQUNyRCxlQUFlLHFCQUFxQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EseUNBQXlDLDZCQUE2QjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQywyQkFBMkI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQSw2Q0FBNkMsMEJBQTBCO0FBQ3ZFO0FBQ0E7QUFDQSx1Q0FBdUMsMkJBQTJCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QywwQkFBMEI7QUFDdkU7QUFDQTtBQUNBLHVDQUF1QywyQkFBMkI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHlDQUF5QztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN0SkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImFwcFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL1Jlc291cmNlcy9hc3NldHMvdnVlL2FwcC5qc1wiLFwidmVuZG9yc35hcHBcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvKipcbiAqIEFDTCBjbGFzcyB0byBwcm92aWRlIGhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSB1c2VyIGFuZCBpdCdzIHJvbGVzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFDTCB7XG5cbiAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgQUNMIHBsdWdpblxuICAgICAqL1xuICBzdGF0aWMgYXN5bmMgaW5pdCgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5hbGwoW1xuICAgICAgICBheGlvcy5nZXQoJy9hcGkvdnVlL3VzZXJzL3Byb2ZpbGUnKSxcbiAgICAgIF0pO1xuXG4gICAgICB3aW5kb3cucm9sZXMgPSByZXNwb25zZVswXS5kYXRhLmRhdGE7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHdpbmRvdy51c2VyID0ge307XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgJy4vYm9vdHN0cmFwJztcbmltcG9ydCBWdWUgZnJvbSAndnVlJztcblxuaW1wb3J0ICcuL3BsdWdpbnMnO1xuaW1wb3J0ICcuL2ludGVyY2VwdG9ycy9heGlvcyc7XG5cbmltcG9ydCBBcHAgZnJvbSAnLi92aWV3cy9BcHAnO1xuXG4vLyBpbXBvcnQgJy4vbGlicmFyaWVzL2F1dGgnO1xuLy8gaW1wb3J0ICcuL2xpYnJhcmllcy9kcmFnZ2FibGUnO1xuaW1wb3J0ICcuL2xpYnJhcmllcy9lbGVtZW50Jztcbi8vIGltcG9ydCAnLi9saWJyYXJpZXMvZm9udGF3ZXNvbWUnO1xuaW1wb3J0ICcuL2xpYnJhcmllcy9mb3JtJztcbi8vIGltcG9ydCAnLi9saWJyYXJpZXMvbWFzb25yeSc7XG5pbXBvcnQgJy4vbGlicmFyaWVzL21vbWVudCc7XG5pbXBvcnQgJy4vbGlicmFyaWVzL3Byb2dyZXNzYmFyJztcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9saWJyYXJpZXMvcm91dGVyJztcbmltcG9ydCAnLi9saWJyYXJpZXMvdGFibGUnO1xuXG53aW5kb3cuVnVlID0gVnVlO1xud2luZG93LkV2ZW50cyA9IG5ldyBWdWUoKTtcblxuLy8gaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gJ0BzZW50cnkvYnJvd3Nlcic7XG4vLyBpbXBvcnQgKiBhcyBJbnRlZ3JhdGlvbnMgZnJvbSAnQHNlbnRyeS9pbnRlZ3JhdGlvbnMnO1xuXG4vLyBpZihwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4vLyAvLyBJbml0IFNlbnRyeVxuLy8gICAgIFNlbnRyeS5pbml0KHtcbi8vICAgICAgICAgZHNuOiAnaHR0cHM6Ly8zYTRjZDU0NGI4ODc0YWNmODMyNWFhN2IyNjYxMzljOUBzZW50cnkuaW8vMTI5MzE0Jyxcbi8vICAgICAgICAgaW50ZWdyYXRpb25zOiBbbmV3IEludGVncmF0aW9ucy5WdWUoe1Z1ZSwgYXR0YWNoUHJvcHM6IHRydWV9KV0sXG4vLyAgICAgfSk7XG4vLyB9XG5cbi8qKlxuICogVGhlIGZvbGxvd2luZyBibG9jayBvZiBjb2RlIG1heSBiZSB1c2VkIHRvIGF1dG9tYXRpY2FsbHkgcmVnaXN0ZXIgeW91clxuICogVnVlIGNvbXBvbmVudHMuIEl0IHdpbGwgcmVjdXJzaXZlbHkgc2NhbiB0aGlzIGRpcmVjdG9yeSBmb3IgdGhlIFZ1ZVxuICogY29tcG9uZW50cyBhbmQgYXV0b21hdGljYWxseSByZWdpc3RlciB0aGVtIHdpdGggdGhlaXIgXCJiYXNlbmFtZVwiLlxuICpcbiAqIEVnLiAuL2NvbXBvbmVudHMvRXhhbXBsZUNvbXBvbmVudC52dWUgLT4gPGV4YW1wbGUtY29tcG9uZW50PjwvZXhhbXBsZS1jb21wb25lbnQ+XG4gKi9cblxuY29uc3QgZmlsZXMgPSByZXF1aXJlLmNvbnRleHQoJy4vY29tcG9uZW50cy8nLCB0cnVlLCAvXFwudnVlJC9pKTtcbmZpbGVzLmtleXMoKS5tYXAoa2V5ID0+IFZ1ZS5jb21wb25lbnQoa2V5LnNwbGl0KCcvJykucG9wKCkuc3BsaXQoJy4nKVswXSwgZmlsZXMoa2V5KSkpO1xuXG5jb25zdCBhcHAgPSBuZXcgVnVlKHtcbiAgZWw6ICcjYXBwJyxcbiAgY29tcG9uZW50czoge0FwcH0sXG4gIHJvdXRlcixcblxuICBtb3VudGVkKCkge31cbn0pO1xuIiwiXG53aW5kb3cuXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xud2luZG93LlBvcHBlciA9IHJlcXVpcmUoJ3BvcHBlci5qcycpLmRlZmF1bHQ7XG5cbi8qKlxuICogV2UnbGwgbG9hZCBqUXVlcnkgYW5kIHRoZSBCb290c3RyYXAgalF1ZXJ5IHBsdWdpbiB3aGljaCBwcm92aWRlcyBzdXBwb3J0XG4gKiBmb3IgSmF2YVNjcmlwdCBiYXNlZCBCb290c3RyYXAgZmVhdHVyZXMgc3VjaCBhcyBtb2RhbHMgYW5kIHRhYnMuIFRoaXNcbiAqIGNvZGUgbWF5IGJlIG1vZGlmaWVkIHRvIGZpdCB0aGUgc3BlY2lmaWMgbmVlZHMgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAqL1xuXG50cnkge1xuICB3aW5kb3cuJCA9IHdpbmRvdy5qUXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuICByZXF1aXJlKCdib290c3RyYXAnKTtcbn0gY2F0Y2ggKGUpIHt9XG5cbi8qKlxuICogV2UnbGwgbG9hZCB0aGUgYXhpb3MgSFRUUCBsaWJyYXJ5IHdoaWNoIGFsbG93cyB1cyB0byBlYXNpbHkgaXNzdWUgcmVxdWVzdHNcbiAqIHRvIG91ciBMYXJhdmVsIGJhY2stZW5kLiBUaGlzIGxpYnJhcnkgYXV0b21hdGljYWxseSBoYW5kbGVzIHNlbmRpbmcgdGhlXG4gKiBDU1JGIHRva2VuIGFzIGEgaGVhZGVyIGJhc2VkIG9uIHRoZSB2YWx1ZSBvZiB0aGUgXCJYU1JGXCIgdG9rZW4gY29va2llLlxuICovXG5cbndpbmRvdy5heGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XG5cblxuLyoqXG4gKiBFY2hvIGV4cG9zZXMgYW4gZXhwcmVzc2l2ZSBBUEkgZm9yIHN1YnNjcmliaW5nIHRvIGNoYW5uZWxzIGFuZCBsaXN0ZW5pbmdcbiAqIGZvciBldmVudHMgdGhhdCBhcmUgYnJvYWRjYXN0IGJ5IExhcmF2ZWwuIEVjaG8gYW5kIGV2ZW50IGJyb2FkY2FzdGluZ1xuICogYWxsb3dzIHlvdXIgdGVhbSB0byBlYXNpbHkgYnVpbGQgcm9idXN0IHJlYWwtdGltZSB3ZWIgYXBwbGljYXRpb25zLlxuICovXG5cbi8vIGltcG9ydCBFY2hvIGZyb20gJ2xhcmF2ZWwtZWNobydcblxuLy8gd2luZG93LlB1c2hlciA9IHJlcXVpcmUoJ3B1c2hlci1qcycpO1xuXG4vLyB3aW5kb3cuRWNobyA9IG5ldyBFY2hvKHtcbi8vICAgICBicm9hZGNhc3RlcjogJ3B1c2hlcicsXG4vLyAgICAga2V5OiBwcm9jZXNzLmVudi5NSVhfUFVTSEVSX0FQUF9LRVksXG4vLyAgICAgY2x1c3RlcjogcHJvY2Vzcy5lbnYuTUlYX1BVU0hFUl9BUFBfQ0xVU1RFUixcbi8vICAgICBlbmNyeXB0ZWQ6IHRydWVcbi8vIH0pO1xuIiwiZnVuY3Rpb24gd2VicGFja0VtcHR5Q29udGV4dChyZXEpIHtcblx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdHRocm93IGU7XG59XG53ZWJwYWNrRW1wdHlDb250ZXh0LmtleXMgPSBmdW5jdGlvbigpIHsgcmV0dXJuIFtdOyB9O1xud2VicGFja0VtcHR5Q29udGV4dC5yZXNvbHZlID0gd2VicGFja0VtcHR5Q29udGV4dDtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0VtcHR5Q29udGV4dDtcbndlYnBhY2tFbXB0eUNvbnRleHQuaWQgPSBcIi4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvY29tcG9uZW50cyBzeW5jIHJlY3Vyc2l2ZSBcXFxcLnZ1ZSQvXCI7IiwiZXhwb3J0IGRlZmF1bHQge1xuICBjb21tZW50Tm9kZShlbCwgdm5vZGUpIHtcbiAgICBjb25zdCBjb21tZW50ID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnICcpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbW1lbnQsICdzZXRBdHRyaWJ1dGUnLCB7XG4gICAgICB2YWx1ZTogKCkgPT4gdW5kZWZpbmVkXG4gICAgfSk7XG5cbiAgICB2bm9kZS50ZXh0ID0gJyAnO1xuICAgIHZub2RlLmVsbSA9IGNvbW1lbnQ7XG4gICAgdm5vZGUuaXNDb21tZW50ID0gdHJ1ZTtcbiAgICB2bm9kZS5jb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgIHZub2RlLnRhZyA9IHVuZGVmaW5lZDtcbiAgICB2bm9kZS5kYXRhLmRpcmVjdGl2ZXMgPSB1bmRlZmluZWQ7XG5cbiAgICBpZiAodm5vZGUuY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgIHZub2RlLmNvbXBvbmVudEluc3RhbmNlLiRlbCA9IGNvbW1lbnQ7XG4gICAgfVxuXG4gICAgaWYgKGVsLnBhcmVudE5vZGUpIHtcbiAgICAgIGVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNvbW1lbnQsIGVsKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBPQXV0aCBmcm9tICcuLy4uL29hdXRoJztcblxubGV0IG9BdXRoID0gbmV3IE9BdXRoKCk7XG5cbi8qKlxuICogUmVxdWVzdCBpbnRlcmNlcHRvclxuICovXG53aW5kb3cuYXhpb3MuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKGZ1bmN0aW9uIChjb25maWcpIHtcblxuICBjb25maWcuaGVhZGVyc1snWC1SZXF1ZXN0ZWQtV2l0aCddID0gJ1hNTEh0dHBSZXF1ZXN0JztcblxuICAvLyBBZGQgdGhlIGF1dGhlbnRpY2F0aW9uIGhlYWRlciB3aGVuIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICBpZiAob0F1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAvLyBTZXQgdGhlIGF1dGhvcml6YXRpb24gaGVhZGVyIGZvciBlYWNoIHJlcXVlc3RcbiAgICBjb25maWcuaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gb0F1dGguZ2V0QXV0aEhlYWRlcigpO1xuICB9XG5cbiAgcmV0dXJuIGNvbmZpZztcbn0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXF1ZXN0IGVycm9yXG4gIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG59KTtcblxuXG4vKipcbiAqIFJlc3BvbnNlIGludGVyY2VwdG9yXG4gKi9cbndpbmRvdy5heGlvcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXNwb25zZSBkYXRhXG4gIHJldHVybiByZXNwb25zZTtcbn0sIGZ1bmN0aW9uIChlcnJvcikge1xuXG4gIC8vIFJlZnJlc2ggdGhlIGFjY2VzcyB0b2tlblxuICBpZiAoZXJyb3IucmVzcG9uc2UgIT09IHVuZGVmaW5lZCAmJiBlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMSAmJiBvQXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgIG9BdXRoLmxvZ291dCgpO1xuICB9XG5cbiAgLy8gRG8gc29tZXRoaW5nIHdpdGggcmVzcG9uc2UgZXJyb3JcbiAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbn0pO1xuXG5cbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCB7XG4gIEFsZXJ0LFxuICBCdXR0b24sXG4gIENoZWNrYm94LFxuICBDb2xsYXBzZSxcbiAgQ29sbGFwc2VJdGVtLFxuICBDb2xvclBpY2tlcixcbiAgRGF0ZVBpY2tlcixcbiAgRGlhbG9nLFxuICBEcm9wZG93bixcbiAgRHJvcGRvd25JdGVtLFxuICBEcm9wZG93bk1lbnUsXG4gIElucHV0LFxuICBJbnB1dE51bWJlciBhcyBJbnB1dERpZ2l0LFxuICBMb2FkaW5nLFxuICBNZXNzYWdlLFxuICBNZXNzYWdlQm94LFxuICBPcHRpb24sXG4gIE9wdGlvbkdyb3VwLFxuICBSYWRpbyxcbiAgU2VsZWN0LFxuICBUYWJQYW5lLFxuICBUYWJzLFxuICBUYWcsXG4gIFRpbWVTZWxlY3QsXG4gIFRvb2x0aXAsXG4gIFRyYW5zZmVyLFxuICBVcGxvYWRcbn0gZnJvbSAnZWxlbWVudC11aSc7XG5pbXBvcnQgbGFuZyBmcm9tICdlbGVtZW50LXVpL2xpYi9sb2NhbGUvbGFuZy9ubCc7XG5pbXBvcnQgbG9jYWxlIGZyb20gJ2VsZW1lbnQtdWkvbGliL2xvY2FsZSc7XG5pbXBvcnQgJ2VsZW1lbnQtdWkvbGliL3RoZW1lLWNoYWxrL2luZGV4LmNzcyc7XG5cbmxvY2FsZS51c2UobGFuZyk7XG5WdWUuY29tcG9uZW50KEFsZXJ0Lm5hbWUsIEFsZXJ0KTtcblZ1ZS5jb21wb25lbnQoQ29sbGFwc2UubmFtZSwgQ29sbGFwc2UpO1xuVnVlLmNvbXBvbmVudChDb2xsYXBzZUl0ZW0ubmFtZSwgQ29sbGFwc2VJdGVtKTtcblZ1ZS5jb21wb25lbnQoSW5wdXQubmFtZSwgSW5wdXQpO1xuVnVlLmNvbXBvbmVudChJbnB1dERpZ2l0Lm5hbWUsIElucHV0RGlnaXQpO1xuVnVlLmNvbXBvbmVudChSYWRpby5uYW1lLCBSYWRpbyk7XG5WdWUuY29tcG9uZW50KENoZWNrYm94Lm5hbWUsIENoZWNrYm94KTtcblZ1ZS5jb21wb25lbnQoVGFnLm5hbWUsIFRhZyk7XG5WdWUuY29tcG9uZW50KEJ1dHRvbi5uYW1lLCBCdXR0b24pO1xuVnVlLmNvbXBvbmVudChTZWxlY3QubmFtZSwgU2VsZWN0KTtcblZ1ZS5jb21wb25lbnQoT3B0aW9uLm5hbWUsIE9wdGlvbik7XG5WdWUuY29tcG9uZW50KE9wdGlvbkdyb3VwLm5hbWUsIE9wdGlvbkdyb3VwKTtcblZ1ZS5jb21wb25lbnQoVG9vbHRpcC5uYW1lLCBUb29sdGlwKTtcblZ1ZS5jb21wb25lbnQoRHJvcGRvd24ubmFtZSwgRHJvcGRvd24pO1xuVnVlLmNvbXBvbmVudChEcm9wZG93bk1lbnUubmFtZSwgRHJvcGRvd25NZW51KTtcblZ1ZS5jb21wb25lbnQoRHJvcGRvd25JdGVtLm5hbWUsIERyb3Bkb3duSXRlbSk7XG5WdWUuY29tcG9uZW50KFVwbG9hZC5uYW1lLCBVcGxvYWQpO1xuVnVlLmNvbXBvbmVudChUYWJQYW5lLm5hbWUsIFRhYlBhbmUpO1xuVnVlLmNvbXBvbmVudChUYWJzLm5hbWUsIFRhYnMpO1xuVnVlLmNvbXBvbmVudChEYXRlUGlja2VyLm5hbWUsIERhdGVQaWNrZXIpO1xuVnVlLmNvbXBvbmVudChUcmFuc2Zlci5uYW1lLCBUcmFuc2Zlcik7XG5WdWUuY29tcG9uZW50KERpYWxvZy5uYW1lLCBEaWFsb2cpO1xuVnVlLmNvbXBvbmVudChUaW1lU2VsZWN0Lm5hbWUsIFRpbWVTZWxlY3QpO1xuVnVlLmNvbXBvbmVudChDb2xvclBpY2tlci5uYW1lLCBDb2xvclBpY2tlcik7XG5cblZ1ZS51c2UoTG9hZGluZy5kaXJlY3RpdmUpO1xuVnVlLnByb3RvdHlwZS4kbWVzc2FnZSA9IE1lc3NhZ2U7XG5WdWUucHJvdG90eXBlLiRtc2dib3ggPSBNZXNzYWdlQm94O1xuVnVlLnByb3RvdHlwZS4kYWxlcnQgPSBNZXNzYWdlQm94LmFsZXJ0O1xuVnVlLnByb3RvdHlwZS4kY29uZmlybSA9IE1lc3NhZ2VCb3guY29uZmlybTtcblZ1ZS5wcm90b3R5cGUuJHByb21wdCA9IE1lc3NhZ2VCb3gucHJvbXB0O1xuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IHtJbnB1dENoZWNrYm94LCBJbnB1dENvZGUsIElucHV0Q29sb3JQaWNrZXIsIElucHV0RGF0ZVRpbWUsIElucHV0RWRpdG9yLCBJbnB1dE51bWJlciwgSW5wdXRQYXNzd29yZCwgSW5wdXRSYWRpbywgSW5wdXRTZWxlY3QsIElucHV0VGV4dCwgSW5wdXRUaW1lLCBJbnB1dFVwbG9hZCwgVnVlRm9ybX0gZnJvbSAnQGJpdC9lLXNpdGVzLnZ1ZS5nbG9iYWwuZm9ybSc7XG5cblZ1ZS5jb21wb25lbnQoVnVlRm9ybS5uYW1lLCBWdWVGb3JtKTtcblZ1ZS5jb21wb25lbnQoSW5wdXRSYWRpby5uYW1lLCBJbnB1dFJhZGlvKTtcblZ1ZS5jb21wb25lbnQoSW5wdXRDaGVja2JveC5uYW1lLCBJbnB1dENoZWNrYm94KTtcblZ1ZS5jb21wb25lbnQoSW5wdXRUZXh0Lm5hbWUsIElucHV0VGV4dCk7XG5WdWUuY29tcG9uZW50KElucHV0TnVtYmVyLm5hbWUsIElucHV0TnVtYmVyKTtcblZ1ZS5jb21wb25lbnQoSW5wdXRQYXNzd29yZC5uYW1lLCBJbnB1dFBhc3N3b3JkKTtcblZ1ZS5jb21wb25lbnQoSW5wdXRFZGl0b3IubmFtZSwgSW5wdXRFZGl0b3IpO1xuVnVlLmNvbXBvbmVudChJbnB1dFNlbGVjdC5uYW1lLCBJbnB1dFNlbGVjdCk7XG5WdWUuY29tcG9uZW50KElucHV0VXBsb2FkLm5hbWUsIElucHV0VXBsb2FkKTtcblZ1ZS5jb21wb25lbnQoSW5wdXREYXRlVGltZS5uYW1lLCBJbnB1dERhdGVUaW1lKTtcblZ1ZS5jb21wb25lbnQoSW5wdXRDb2RlLm5hbWUsIElucHV0Q29kZSk7XG5WdWUuY29tcG9uZW50KElucHV0VGltZS5uYW1lLCBJbnB1dFRpbWUpO1xuVnVlLmNvbXBvbmVudChJbnB1dENvbG9yUGlja2VyLm5hbWUsIElucHV0Q29sb3JQaWNrZXIpO1xuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCdcblxuVnVlLnByb3RvdHlwZS4kbW9tZW50ID0gbW9tZW50O1xuVnVlLnByb3RvdHlwZS4kbW9tZW50LmxvY2FsZSgnbmwnKTtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCBWdWVQcm9ncmVzc0JhciBmcm9tICd2dWUtcHJvZ3Jlc3NiYXInXG5pbXBvcnQgJ3Z1ZS1wcm9ncmVzcy1wYXRoL2Rpc3QvdnVlLXByb2dyZXNzLXBhdGguY3NzJ1xuaW1wb3J0IFZ1ZVByb2dyZXNzIGZyb20gJ3Z1ZS1wcm9ncmVzcy1wYXRoJ1xuXG5WdWUudXNlKFZ1ZVByb2dyZXNzKTtcblZ1ZS51c2UoVnVlUHJvZ3Jlc3NCYXIsIHtcbiAgY29sb3I6ICcjZmZkNjAwJyxcbiAgZmFpbGVkQ29sb3I6ICcjZjUzNjVjJyxcbiAgdGhpY2tuZXNzOiAnNXB4JyxcbiAgdHJhbnNpdGlvbjoge1xuICAgIHNwZWVkOiAnMC4ycycsXG4gICAgb3BhY2l0eTogJzAuNnMnLFxuICAgIHRlcm1pbmF0aW9uOiAzMDBcbiAgfVxufSk7XG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3Z1ZS1yb3V0ZXInO1xuaW1wb3J0IHJvdXRlcyBmcm9tICcuLi9yb3V0ZXMnO1xuaW1wb3J0IE9BdXRoIGZyb20gJy4vLi4vb2F1dGgnO1xuaW1wb3J0IGFjbCBmcm9tICcuLy4uL2FjbCc7XG5cbmNvbnN0IHJvdXRlciA9IG5ldyBWdWVSb3V0ZXIoe1xuICBtb2RlOiAnaGlzdG9yeScsXG4gIGJhc2U6ICcvYmV0YS8nLFxuICByb3V0ZXM6IHJvdXRlc1xufSk7XG5cblZ1ZS51c2UoVnVlUm91dGVyKTtcblxubGV0IG9BdXRoID0gbmV3IE9BdXRoKCk7XG5cbnJvdXRlci5iZWZvcmVFYWNoKCh0bywgZnJvbSwgbmV4dCkgPT4ge1xuICAvL0lmIHZpc2l0aW5nIGxvZ2luIHZpZXcgYnV0IHlvdSBhbHJlYWR5IGhhdmUgbG9nZ2VkIGluLCB5b3Ugc2hvdWxkIG5vdCBiZSBhYmxlIHRvIHNlZSB0aGlzIHZpZXdcbiAgaWYgKCF0by5tZXRhLmF1dGggJiYgb0F1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICByZXR1cm4gbmV4dCh7XG4gICAgICBwYXRoOiAnLydcbiAgICB9KVxuICB9XG5cbiAgLy9JZiB5b3UgYXJlIHZpc2l0aW5nICcvJyBhbmQgeW91IGFyZSBhIGd1ZXN0IHRoZW4sIHlvdSBtdXN0IGJlIHJlZGlyZWN0ZWQgdG8gbG9naW5cbiAgaWYgKHRvLm1ldGEuYXV0aCAmJiBvQXV0aC5ndWVzdCgpKSB7XG4gICAgcmV0dXJuIG5leHQoe1xuICAgICAgcGF0aDogJy9sb2dpbicsXG4gICAgICBxdWVyeToge1xuICAgICAgICByZWRpcmVjdDogdG8uZnVsbFBhdGhcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaWYodG8ubWV0YS5hdXRoKSB7XG4gICAgLy8gQ3VzdG9tZXJzJyBsaWNlbnNlIGlzIGluc3VmZmljaWVudFxuICAgIGlmICh0by5tZXRhLmxpY2Vuc2UgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgd2luZG93LmN1c3RvbWVyLmxpY2Vuc2UgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgd2luZG93LmN1c3RvbWVyLmxpY2Vuc2UubGljZW5zZV90eXBlIDwgdG8ubWV0YS5saWNlbnNlKSB7XG5cbiAgICAgIHJldHVybiBuZXh0KHtcbiAgICAgICAgcGF0aDogJy8nXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIFVzZXIgaGFzIG5vIHJpZ2h0cyB2aXNpdGluZyB0aGlzIHBhZ2VcbiAgICBpZiAodG8ubWV0YS5wZXJtaXNzaW9uICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHdpbmRvdy5yb2xlcyAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAhYWNsLnVzZXJDYW4odG8ubWV0YS5wZXJtaXNzaW9uKSkge1xuXG4gICAgICByZXR1cm4gbmV4dCh7XG4gICAgICAgIHBhdGg6ICcvJ1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV4dCgpXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IHtDYXJkVGFibGVIZWFkZXIsIFZ1ZVRhYmxlfSBmcm9tICdAYml0L2Utc2l0ZXMudnVlLmdsb2JhbC50YWJsZSc7XG5cblZ1ZS5jb21wb25lbnQoQ2FyZFRhYmxlSGVhZGVyLm5hbWUsIENhcmRUYWJsZUhlYWRlcik7XG5WdWUuY29tcG9uZW50KFZ1ZVRhYmxlLm5hbWUsIFZ1ZVRhYmxlKTtcbiIsImltcG9ydCBBdXRoU2VydmljZSBmcm9tICcuL29hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IENvb2tpZXMgZnJvbSAnanMtY29va2llJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2Vzc2lvbiA9IENvb2tpZXM7XG4gIH1cblxuICAvKipcbiAgICAgKiBMb2dvdXRcbiAgICAgKi9cbiAgbG9nb3V0KCkge1xuICAgIEF1dGhTZXJ2aWNlLmRlc3Ryb3lTZXNzaW9uKCk7XG5cbiAgICB0aGlzLnNlc3Npb24ucmVtb3ZlKCdhY2Nlc3NfdG9rZW4nKTtcbiAgICB0aGlzLnNlc3Npb24ucmVtb3ZlKCdyZWZyZXNoX3Rva2VuJyk7XG4gIH1cblxuICAvKipcbiAgICAgKiBHdWVzdCBjaGVja1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICBndWVzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uLmdldCgnYWNjZXNzX3Rva2VuJykgPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgICAqIENoZWNrIGlmIHVzZXIgaXMgbG9nZ2VkIGluXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gIGlzQXV0aGVudGljYXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uLmdldCgnYWNjZXNzX3Rva2VuJykgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgICAqIExvZ2luIHVzaW5nIHVzZXJuYW1lIGFuZCBwYXNzd29yZFxuICAgICAqIEBwYXJhbSB1c2VybmFtZVxuICAgICAqIEBwYXJhbSBwYXNzd29yZFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gIGxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBBdXRoU2VydmljZS5hdHRlbXB0TG9naW4oe1xuICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmVTZXNzaW9uKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICB0aGlzLmFkZEF1dGhIZWFkZXJzKCk7XG5cbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZSlcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAgICogUmVmcmVzaCB0aGUgYWNjZXNzIHRva2VuIG9mIHRoZSB1c2VyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgcmVmcmVzaFRva2VuKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBBdXRoU2VydmljZS5hdHRlbXB0TG9naW4oe1xuICAgICAgICByZWZyZXNoX3Rva2VuOiB0aGlzLnNlc3Npb24uZ2V0KCdyZWZyZXNoX3Rva2VuJylcbiAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICB0aGlzLnN0b3JlU2Vzc2lvbihyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgdGhpcy5hZGRBdXRoSGVhZGVycygpO1xuXG4gICAgICAgIHJlc29sdmUocmVzcG9uc2UpXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgICAqIEdldCB0aGUgdXNlciBmcm9tIHRoZSBBUElcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICBnZXRVc2VyKCkge1xuICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBBdXRoU2VydmljZS5jdXJyZW50VXNlcigpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiByZXNvbHZlKG51bGwpKVxuICB9XG5cbiAgLyoqXG4gICAgICogR2V0IHRoZSBhdXRoZW50aWNhdGlvbiBoZWFkZXJcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgZ2V0QXV0aEhlYWRlcigpIHtcbiAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgbGV0IGFjY2Vzc190b2tlbiA9IHRoaXMuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJyk7XG5cbiAgICAgIHJldHVybiAnQmVhcmVyICcgKyBhY2Nlc3NfdG9rZW5cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgLyoqXG4gICAgICogR2V0IGFuIGl0ZW0gZnJvbSB0aGUgY29va2llc1xuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKi9cbiAgZ2V0SXRlbShrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uLmdldChrZXkpO1xuICB9XG5cbiAgLyoqXG4gICAgICogQWRkIGF1dGggaGVhZGVycyB0byB0aGUgcmVxdWVzdHNcbiAgICAgKi9cbiAgYWRkQXV0aEhlYWRlcnMoKSB7XG4gICAgbGV0IGhlYWRlciA9IHRoaXMuZ2V0QXV0aEhlYWRlcigpO1xuXG4gICAgQXV0aFNlcnZpY2UuYWRkQXV0aG9yaXphdGlvbkhlYWRlcihoZWFkZXIpXG4gIH1cblxuICAvKipcbiAgICAgKiBTdG9yZSB0aGUgc2Vzc2lvbiBkYXRhXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgc3RvcmVTZXNzaW9uKGRhdGEpIHtcbiAgICBsZXQgaG91ckluTWlsbGlTZWNvbmRzID0gODY0MDA7XG4gICAgbGV0IHRpbWUgPSBkYXRhLmV4cGlyZXNfaW4gLyBob3VySW5NaWxsaVNlY29uZHM7XG5cbiAgICB0aGlzLnNlc3Npb24uc2V0KCdhY2Nlc3NfdG9rZW4nLCBkYXRhLmFjY2Vzc190b2tlbiwge1xuICAgICAgZXhwaXJlczogdGltZSxcbiAgICB9KTtcblxuICAgIHRoaXMuc2Vzc2lvbi5zZXQoJ3JlZnJlc2hfdG9rZW4nLCBkYXRhLnJlZnJlc2hfdG9rZW4sIHtcbiAgICAgIGV4cGlyZXM6IHRpbWUgKiAyLFxuICAgIH0pO1xuICB9XG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgdXNlcjogbnVsbCxcblxuICBkZXN0cm95U2Vzc2lvbigpIHtcbiAgICB0aGlzLnVzZXIgPSBudWxsXG4gIH0sXG5cbiAgYXN5bmMgY3VycmVudFVzZXIoKSB7XG4gICAgaWYgKHRoaXMudXNlcikge1xuICAgICAgcmV0dXJuIHRoaXMudXNlclxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBsZXQgdXNlciA9IGF3YWl0IHdpbmRvdy5heGlvcy5nZXQoJy9hcGkvdnVlL3VzZXJzL3Byb2ZpbGUnKTtcblxuICAgICAgdGhpcy51c2VyID0gdXNlcjtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gcmVzb2x2ZSh1c2VyKSlcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlamVjdCA9PiByZWplY3QoZXJyb3IpKVxuICAgIH1cbiAgfSxcblxuICBhc3luYyBhdHRlbXB0TG9naW4oY3JlZGVudGlhbHMpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgd2luZG93LmF4aW9zLnBvc3QoJy9hcGkvdnVlL3VzZXJzL2xvZ2luJywgY3JlZGVudGlhbHMpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gcmVzb2x2ZShyZXNwb25zZSkpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZWplY3QgPT4gcmVqZWN0KGVycm9yKSlcbiAgICB9XG4gIH0sXG5cbiAgYXN5bmMgcmVmcmVzaFRva2VuKHBhcmFtcykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCB3aW5kb3cuYXhpb3MucG9zdCgnL2FwaS92dWUvdXNlcnMvcmVmcmVzaCcsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiByZXNvbHZlKHJlc3BvbnNlKSlcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlamVjdCA9PiByZWplY3QoZXJyb3IpKVxuICAgIH1cbiAgfSxcblxuICBhZGRBdXRob3JpemF0aW9uSGVhZGVyKGhlYWRlcikge1xuICAgIHdpbmRvdy5heGlvcy5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gaGVhZGVyXG4gIH1cbn1cbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCBhY2wgZnJvbSAnLi9hY2wnO1xuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcblxuVnVlLm1peGluKHtcbiAgZmlsdGVyczoge1xuICAgIGNhcGl0YWxpemU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG5cbiAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcblxuICAgICAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICByb3V0ZTogcm91dGUsXG4gICAgc3VibWl0U3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kbWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgbWVzc2FnZTogJ0RlIGdlZ2V2ZW5zIHppam4gb3BnZXNsYWdlbidcbiAgICAgIH0pXG4gICAgfSxcbiAgICBzdWJtaXRFcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kbWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdFciBpcyBpZXRzIG1pcyBnZWdhYW4sIHByb2JlZXIgaGV0IG5vZ21hYWxzJ1xuICAgICAgfSlcbiAgICB9LFxuICAgIGNvbmZpcm06IGZ1bmN0aW9uICh0ZXh0LCB0aXRsZSwgY29uZmlybUJ1dHRvblRleHQgPSAnVmVyd2lqZGVyZW4nKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY29uZmlybSh0ZXh0LCB0aXRsZSwge1xuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogY29uZmlybUJ1dHRvblRleHQsXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdBbm51bGVyZW4nLFxuICAgICAgICB0eXBlOiAnd2FybmluZycsXG4gICAgICAgIGRhbmdlcm91c2x5VXNlSFRNTFN0cmluZzogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBpc0VtcHR5KHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBmb3JtYXRQcmljZSh2YWx1ZSkge1xuICAgICAgbGV0IHZhbCA9ICh2YWx1ZSAvIDEpLnRvRml4ZWQoMikucmVwbGFjZSgnLicsICcsJylcbiAgICAgIHJldHVybiB2YWwudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIilcbiAgICB9LFxuICAgIGRvd25sb2FkRmlsZSh1cmwsIG1ldGhvZCA9ICdnZXQnLCBkYXRhID0ge30pIHtcbiAgICAgIGF4aW9zKHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdibG9iJ1xuICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGxldCBmaWxlTmFtZSA9ICcnO1xuICAgICAgICBjb25zdCBkaXNwb3NpdGlvbiA9IHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtZGlzcG9zaXRpb24nXVxuXG4gICAgICAgIGlmIChkaXNwb3NpdGlvbiAmJiBkaXNwb3NpdGlvbi5pbmRleE9mKCdhdHRhY2htZW50JykgIT09IC0xKSB7XG4gICAgICAgICAgbGV0IGZpbGVuYW1lUmVnZXggPSAvZmlsZW5hbWVbXjs9XFxuXSo9KChbJ1wiXSkuKj9cXDJ8W147XFxuXSopLztcbiAgICAgICAgICBsZXQgbWF0Y2hlcyA9IGZpbGVuYW1lUmVnZXguZXhlYyhkaXNwb3NpdGlvbik7XG5cbiAgICAgICAgICBpZiAobWF0Y2hlc1sxXSkge1xuICAgICAgICAgICAgZmlsZU5hbWUgPSBtYXRjaGVzWzFdLnJlcGxhY2UoL1snXCJdL2csICcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbcmVzcG9uc2UuZGF0YV0pKTtcbiAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVOYW1lKTsgLy9vciBhbnkgb3RoZXIgZXh0ZW5zaW9uXG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgICAgbGluay5jbGljaygpO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pO1xuXG5WdWUuZmlsdGVyKCdjYXBpdGFsaXplJywgZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG5cbiAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG59KTtcblxuVnVlLmRpcmVjdGl2ZSgndXNlci1jYW4nLCBmdW5jdGlvbiAoZWwsIGJpbmRpbmdzLCB2bm9kZSkge1xuICBjb25zdCBiZWhhdmlvdXIgPSBiaW5kaW5ncy5tb2RpZmllcnMuZGlzYWJsZSA/ICdkaXNhYmxlJyA6ICdoaWRlJztcblxuICBpZiAoIWFjbC51c2VyQ2FuKGJpbmRpbmdzLnZhbHVlKSkge1xuICAgIGlmIChiZWhhdmlvdXIgPT09ICdoaWRlJykge1xuICAgICAgaGVscGVycy5jb21tZW50Tm9kZShlbCwgdm5vZGUpXG4gICAgfSBlbHNlIGlmIChiZWhhdmlvdXIgPT09ICdkaXNhYmxlJykge1xuICAgICAgZWwuZGlzYWJsZWQgPSB0cnVlXG4gICAgfVxuICB9XG59KTtcbiIsImltcG9ydCBhdXRoZW50aWNhdGlvbiBmcm9tICcuL21vZHVsZXMvYXV0aGVudGljYXRpb24nO1xuXG5jb25zdCByb3V0ZXMgPSBbe1xuICBwYXRoOiAnLycsXG4gIG5hbWU6ICdkYXNoYm9hcmQnLFxuICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uL3ZpZXdzL0Rhc2hib2FyZCcpLmRlZmF1bHQsXG4gIG1ldGE6IHthdXRoOiB0cnVlfSxcbn0sIHtcbiAgcGF0aDogJyonLFxuICBuYW1lOiAnNDA0JyxcbiAgY29tcG9uZW50OiByZXF1aXJlKCcuLi92aWV3cy9lcnJvcnMvTm90Rm91bmQnKS5kZWZhdWx0LFxuICBtZXRhOiB7YXV0aDogZmFsc2V9LFxufV0uY29uY2F0KFxuICBhdXRoZW50aWNhdGlvbixcbik7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcztcbiIsImV4cG9ydCBkZWZhdWx0IFt7XG4gIHBhdGg6ICcvbG9naW4nLFxuICBuYW1lOiAnbG9naW4nLFxuICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0xvZ2luJykuZGVmYXVsdCxcbiAgbWV0YToge2F1dGg6IGZhbHNlfVxufSwge1xuICBwYXRoOiAnL3Bhc3N3b3JkL2ZvcmdvdCcsXG4gIG5hbWU6ICdwYXNzd29yZC5mb3Jnb3QnLFxuICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0ZvcmdvdFBhc3N3b3JkJykuZGVmYXVsdCxcbiAgbWV0YToge2F1dGg6IGZhbHNlfVxufSwge1xuICBwYXRoOiAnL3Bhc3N3b3JkL3Jlc2V0Lzp0b2tlbicsXG4gIG5hbWU6ICdwYXNzd29yZC5yZXNldCcsXG4gIHByb3BzOiB0cnVlLFxuICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL1Jlc2V0UGFzc3dvcmQnKS5kZWZhdWx0LFxuICBtZXRhOiB7YXV0aDogZmFsc2V9XG59LCB7XG4gIHBhdGg6ICcvcmVnaXN0ZXIvOnRva2VuJyxcbiAgbmFtZTogJ3JlZ2lzdGVyJyxcbiAgcHJvcHM6IHRydWUsXG4gIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vLi4vdmlld3MvYXV0aGVudGljYXRpb24vUmVnaXN0ZXInKS5kZWZhdWx0LFxuICBtZXRhOiB7YXV0aDogZmFsc2V9XG59XTtcbiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wZTA5MWYzYSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvdGhvbWFzcm9vdmVycy9EZXZlbG9wZXIvSG9tZXN0ZWFkL1Byb250by9Nb2JpbGVCdW5kbGUvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMGUwOTFmM2EnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMGUwOTFmM2EnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMGUwOTFmM2EnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0FwcC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MGUwOTFmM2EmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMGUwOTFmM2EnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0FwcC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTBlMDkxZjNhJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9EYXNoYm9hcmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWMxZWJiMDU0JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0Rhc2hib2FyZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0Rhc2hib2FyZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9Ib21lc3RlYWQvUHJvbnRvL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCdjMWViYjA1NCcpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCdjMWViYjA1NCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCdjMWViYjA1NCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vRGFzaGJvYXJkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1jMWViYjA1NCZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCdjMWViYjA1NCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvRGFzaGJvYXJkLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRGFzaGJvYXJkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9EYXNoYm9hcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Rhc2hib2FyZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YzFlYmIwNTQmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0ZvcmdvdFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01ODA1Yzc1NyZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Gb3Jnb3RQYXNzd29yZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0ZvcmdvdFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0hvbWVzdGVhZC9Qcm9udG8vTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzU4MDVjNzU3JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzU4MDVjNzU3JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzU4MDVjNzU3JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Gb3Jnb3RQYXNzd29yZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTgwNWM3NTcmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNTgwNWM3NTcnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0ZvcmdvdFBhc3N3b3JkLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRm9yZ290UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZvcmdvdFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Gb3Jnb3RQYXNzd29yZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTgwNWM3NTcmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0xvZ2luLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03YTI1ZTEwMCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0hvbWVzdGVhZC9Qcm9udG8vTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzdhMjVlMTAwJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzdhMjVlMTAwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzdhMjVlMTAwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9N2EyNWUxMDAmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignN2EyNWUxMDAnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0xvZ2luLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTG9naW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Mb2dpbi52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9N2EyNWUxMDAmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1JlZ2lzdGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03ZjRmZDk1YyZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9SZWdpc3Rlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1JlZ2lzdGVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0hvbWVzdGVhZC9Qcm9udG8vTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzdmNGZkOTVjJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzdmNGZkOTVjJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzdmNGZkOTVjJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9SZWdpc3Rlci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9N2Y0ZmQ5NWMmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignN2Y0ZmQ5NWMnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL1JlZ2lzdGVyLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVnaXN0ZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlZ2lzdGVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZWdpc3Rlci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9N2Y0ZmQ5NWMmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL1Jlc2V0UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTA4NzI3NWExJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Jlc2V0UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9SZXNldFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0hvbWVzdGVhZC9Qcm9udG8vTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzA4NzI3NWExJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzA4NzI3NWExJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzA4NzI3NWExJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9SZXNldFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wODcyNzVhMSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcwODcyNzVhMScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVzZXRQYXNzd29yZC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jlc2V0UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jlc2V0UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Jlc2V0UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTA4NzI3NWExJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Ob3RGb3VuZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MzNjZTI1ZDYmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vTm90Rm91bmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Ob3RGb3VuZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9Ib21lc3RlYWQvUHJvbnRvL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCczM2NlMjVkNicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCczM2NlMjVkNicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCczM2NlMjVkNicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vTm90Rm91bmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTMzY2UyNWQ2JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzMzY2UyNWQ2Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJSZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9lcnJvcnMvTm90Rm91bmQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Ob3RGb3VuZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTm90Rm91bmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL05vdEZvdW5kLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zM2NlMjVkNiZcIiIsIjx0ZW1wbGF0ZSAvPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgIENhcmQgdGl0bGVcbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvL1xuICAgIH1cbiAgfSxcblxuICBiZWZvcmVSb3V0ZUVudGVyKHRvLCBmcm9tLCBuZXh0KSB7XG4gICAgbmV4dCgpO1xuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTIgY29sLW1kLTYgb2Zmc2V0LW1kLTMgY29sLWxnLTQgb2Zmc2V0LWxnLTRcIj5cbiAgICAgICAgPHZ1ZS1mb3JtXG4gICAgICAgICAgcmVmPVwiZm9ybVwiXG4gICAgICAgICAgOnVybD1cInJvdXRlKCd2dWUucGFzc3dvcmQuZm9yZ290JylcIlxuICAgICAgICAgIDptb2RlbD1cInVzZXJcIlxuICAgICAgICAgIEBzdWJtaXQ6c3VjY2Vzcz1cInN1Y2Nlc3NcIlxuICAgICAgICAgIEBzdWJtaXQ6ZXJyb3I9XCJzdWJtaXRFcnJvclwiXG4gICAgICAgID5cbiAgICAgICAgICA8dGVtcGxhdGUgc2xvdC1zY29wZT1cInsgZm9ybSwgbW9kZWwgfVwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICB2LWxvYWRpbmc9XCJmb3JtLnN1Ym1pdHRpbmdcIlxuICAgICAgICAgICAgICBjbGFzcz1cImNhcmRcIlxuICAgICAgICAgICAgICBlbGVtZW50LWxvYWRpbmctYmFja2dyb3VuZD1cInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIFdhY2h0d29vcmQgdmVyZ2V0ZW5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dC10ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFLW1haWxhZHJlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cImZvcm1cIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZvb3RlciBoYXMtYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxlbC1idXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIG5hdGl2ZS10eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBXYWNodHdvb3JkIHJlc2V0dGVuXG4gICAgICAgICAgICAgICAgPC9lbC1idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC92dWUtZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXI6IHt9LFxuICAgICAgbG9hZGluZzogZmFsc2VcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIHN1Y2Nlc3MoKSB7XG4gICAgICB0aGlzLiRtZXNzYWdlKHtcbiAgICAgICAgbWVzc2FnZTogJ1UgaGVlZnQgZWVuIGUtbWFpbCBvbnR2YW5nZW4gb20gdXcgd2FjaHR3b29yZCB0ZSByZXNldHRlbicsXG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuJHJlZnMuZm9ybS5yZXNldCgpO1xuICAgIH0sXG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMiBjb2wtbWQtNiBvZmZzZXQtbWQtMyBjb2wtbGctNCBvZmZzZXQtbGctNFwiPlxuICAgICAgICA8dnVlLWZvcm1cbiAgICAgICAgICA6bW9kZWw9XCJ1c2VyXCJcbiAgICAgICAgICB1cmw9XCIvYXBpL3Z1ZS9sb2dpblwiXG4gICAgICAgICAgQHN1Ym1pdDpzdWNjZXNzPVwiYXV0aGVudGljYXRlZFwiXG4gICAgICAgICAgQHN1Ym1pdDplcnJvcj1cImVycm9yXCJcbiAgICAgICAgPlxuICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90LXNjb3BlPVwieyBmb3JtLCBtb2RlbCB9XCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHYtbG9hZGluZz1cImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FyZFwiXG4gICAgICAgICAgICAgIGVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kPVwicmdiYSgyNDgsMjUwLDI1MiwwLjYpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgSW5sb2dnZW5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtdGV4dFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJFLW1haWxhZHJlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFLW1haWxhZHJlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwibW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiV2FjaHR3b29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJXYWNodHdvb3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbC1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgbmF0aXZlLXR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgSW5sb2dnZW5cbiAgICAgICAgICAgICAgICAgICAgPC9lbC1idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbC1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwicmVzZXRQYXNzd29yZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIFdhY2h0d29vcmQgdmVyZ2V0ZW5cbiAgICAgICAgICAgICAgICAgICAgPC9lbC1idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3Z1ZS1mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcjoge1xuICAgICAgICBlbWFpbDogbnVsbCxcbiAgICAgICAgcGFzc3dvcmQ6IG51bGwsXG4gICAgICB9LFxuICAgICAgbG9hZGluZzogZmFsc2VcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuXG4gICAgYXV0aGVudGljYXRlZChyZXNwb25zZSkge1xuICAgICAgLy8gdGhpcy4kb2F1dGguc3RvcmVTZXNzaW9uKHJlc3BvbnNlKTtcbiAgICAgIC8vIHRoaXMuJG9hdXRoLmFkZEF1dGhIZWFkZXJzKCk7XG5cbiAgICAgIHRoaXMuJHJvdXRlci5yZXBsYWNlKHtuYW1lOiAnZGFzaGJvYXJkJ30pO1xuICAgIH0sXG5cbiAgICBlcnJvcihlcnJvcikge1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnVzZXIucGFzc3dvcmQgPSBudWxsO1xuXG4gICAgICBsZXQgbWVzc2FnZSA9ICdFciBpcyBpZXRzIG1pcyBnZWdhYW4sIHByb2JlZXIgaGV0IG9wbmlldXcnO1xuXG4gICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MjIpIHtcbiAgICAgICAgbWVzc2FnZSA9ICdEZSBpbmdldm9lcmRlIGdlZ2V2ZW5zIHppam4gb25qdWlzdCc7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJlc2V0UGFzc3dvcmQoKSB7XG4gICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7bmFtZTogJ3Bhc3N3b3JkLmZvcmdvdCd9KTtcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdlxuICAgICAgICB2LWlmPVwidXNlclwiXG4gICAgICAgIGNsYXNzPVwiY29sLXNtLTEyIGNvbC1tZC02IG9mZnNldC1tZC0zIGNvbC1sZy00IG9mZnNldC1sZy00XCJcbiAgICAgID5cbiAgICAgICAgPHZ1ZS1mb3JtXG4gICAgICAgICAgOm1vZGVsPVwidXNlclwiXG4gICAgICAgICAgOnVybD1cInJvdXRlKCd2dWUucmVnaXN0ZXInKVwiXG4gICAgICAgICAgQHN1Ym1pdDpzdWNjZXNzPVwicmVnaXN0cmF0ZWRcIlxuICAgICAgICAgIEBzdWJtaXQ6ZXJyb3I9XCJlcnJvclwiXG4gICAgICAgID5cbiAgICAgICAgICA8dGVtcGxhdGUgc2xvdC1zY29wZT1cInsgZm9ybSwgbW9kZWwgfVwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICB2LWxvYWRpbmc9XCJmb3JtLnN1Ym1pdHRpbmdcIlxuICAgICAgICAgICAgICBjbGFzcz1cImNhcmRcIlxuICAgICAgICAgICAgICBlbGVtZW50LWxvYWRpbmctYmFja2dyb3VuZD1cInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIFJlZ2lzdHJlcmVuXG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG1hcmdpbi1ib3R0b20tc21cIj5cbiAgICAgICAgICAgICAgICAgIDxlbC1hbGVydFxuICAgICAgICAgICAgICAgICAgICB2LWlmPVwiYWN0aXZhdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJVdyBhY2NvdW50IGlzIGdlYWN0aXZlZXJkLCB1IGt1bnQgbnUgaW5sb2dnZW4gaW4gZGUgYXBwXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Y2Nlc3NcIlxuICAgICAgICAgICAgICAgICAgICA6Y2xvc2FibGU9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtdGV4dFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJmaXJzdF9uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlZvb3JuYWFtXCJcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlZvb3JuYWFtXCJcbiAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtdGV4dFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJsYXN0X25hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiQWNodGVybmFhbVwiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJBY2h0ZXJuYWFtXCJcbiAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiV2FjaHR3b29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJXYWNodHdvb3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRfY29uZmlybWF0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIldhY2h0d29vcmQgYmV2ZXN0aWdlblwiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJXYWNodHdvb3JkIGJldmVzdGlnZW5cIlxuICAgICAgICAgICAgICAgICAgICAgIDptb2RlbD1cIm1vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cImZvcm1cIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZvb3RlciBoYXMtYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxlbC1idXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIG5hdGl2ZS10eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBSZWdpc3RyZXJlblxuICAgICAgICAgICAgICAgIDwvZWwtYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvdnVlLWZvcm0+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXG4gIHByb3BzOiB7XG4gICAgdG9rZW46IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH1cbiAgfSxcblxuICBiZWZvcmVSb3V0ZUVudGVyKHRvLCBmcm9tLCBuZXh0KSB7XG4gICAgYXhpb3MuZ2V0KHJvdXRlKCd2dWUucmVnaXN0cmF0aW9uJywge3Rva2VuOiB0by5wYXJhbXMudG9rZW59KSkudGhlbigoe2RhdGE6IHtkYXRhOiB1c2VyfX0pID0+IHtcbiAgICAgIG5leHQodm0gPT4ge1xuICAgICAgICB2bS51c2VyID0gdXNlcjtcbiAgICAgIH0pO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIG5leHQoKTtcbiAgICB9KVxuICB9LFxuXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXI6IG51bGwsXG4gICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRlZDogZmFsc2VcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuXG4gICAgcmVnaXN0cmF0ZWQocmVzcG9uc2UpIHtcbiAgICAgIGlmICghcmVzcG9uc2UuYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51c2VyID0ge307XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiRvYXV0aC5zdG9yZVNlc3Npb24ocmVzcG9uc2UpO1xuICAgICAgdGhpcy4kb2F1dGguYWRkQXV0aEhlYWRlcnMoKTtcblxuICAgICAgdGhpcy4kcm91dGVyLnJlcGxhY2Uoe25hbWU6ICdkYXNoYm9hcmQnfSk7XG5cbiAgICAgIEV2ZW50cy4kZW1pdCgndXNlcnM6YXV0aGVudGljYXRlZCcpO1xuICAgIH0sXG5cbiAgICBlcnJvcihlcnJvcikge1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnVzZXIucGFzc3dvcmQgPSBudWxsO1xuICAgICAgdGhpcy51c2VyLnBhc3N3b3JkX2NvbmZpcm1hdGlvbiA9IG51bGw7XG5cbiAgICAgIHRoaXMuJG1lc3NhZ2Uoe1xuICAgICAgICBtZXNzYWdlOiAnRXIgaXMgaWV0cyBtaXMgZ2VnYWFuLCBwcm9iZWVyIGhldCBvcG5pZXV3JyxcbiAgICAgICAgdHlwZTogJ2Vycm9yJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgdi1pZj1cImFjdGlvblwiXG4gICAgICAgIGNsYXNzPVwiY29sLXNtLTEyIGNvbC1tZC02IG9mZnNldC1tZC0zIGNvbC1sZy00IG9mZnNldC1sZy00XCJcbiAgICAgID5cbiAgICAgICAgPHZ1ZS1mb3JtXG4gICAgICAgICAgcmVmPVwiZm9ybVwiXG4gICAgICAgICAgOnVybD1cInJvdXRlKCd2dWUucGFzc3dvcmQucmVzZXQnKVwiXG4gICAgICAgICAgOm1vZGVsPVwiYWN0aW9uXCJcbiAgICAgICAgICBAc3VibWl0OnN1Y2Nlc3M9XCJsb2dpblwiXG4gICAgICAgICAgQHN1Ym1pdDplcnJvcj1cInN1Ym1pdEVycm9yXCJcbiAgICAgICAgPlxuICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90LXNjb3BlPVwieyBmb3JtLCBtb2RlbCB9XCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHYtbG9hZGluZz1cImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FyZFwiXG4gICAgICAgICAgICAgIGVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kPVwicmdiYSgyNDgsMjUwLDI1MiwwLjYpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgV2FjaHR3b29yZCByZXNldHRlblxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGVsLWFsZXJ0XG4gICAgICAgICAgICAgICAgICB2LWlmPVwiYXBwUGFzc3dvcmRDaGFuZ2VkXCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiVXcgd2FjaHR3b29yZCBpcyBnZXdpanppZ2QsIHUga3VudCBudSBpbmxvZ2dlbiBpbiBkZSBhcHBcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Y2Nlc3NcIlxuICAgICAgICAgICAgICAgICAgc2hvdy1pY29uXG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV2FjaHR3b29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwibW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRfY29uZmlybWF0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIldhY2h0d29vcmQgYmV2ZXN0aWdlblwiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwibW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZm9vdGVyIGhhcy1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgPGVsLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgbmF0aXZlLXR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFdhY2h0d29vcmQgcmVzZXR0ZW5cbiAgICAgICAgICAgICAgICA8L2VsLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3Z1ZS1mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICB0b2tlbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlXG4gICAgfVxuICB9LFxuXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdGlvbjogbnVsbCxcbiAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgYXBwUGFzc3dvcmRDaGFuZ2VkOiBmYWxzZVxuICAgIH1cbiAgfSxcblxuICBiZWZvcmVSb3V0ZUVudGVyKHRvLCBmcm9tLCBuZXh0KSB7XG4gICAgYXhpb3MuZ2V0KHJvdXRlKCd2dWUucGFzc3dvcmQudG9rZW4nLCB7dG9rZW46IHRvLnBhcmFtcy50b2tlbn0pKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIG5leHQodm0gPT4ge1xuICAgICAgICB2bS5hY3Rpb24gPSByZXNwb25zZS5kYXRhLmRhdGE7XG4gICAgICB9KTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBuZXh0KHZtID0+IHtcbiAgICAgICAgdm0uJHJvdXRlci5yZXBsYWNlKHtuYW1lOiAnbG9naW4nfSk7XG5cbiAgICAgICAgdGhpcy4kbWVzc2FnZSh7XG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlLFxuICAgICAgICAgIHR5cGU6ICdlcnJvcidcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBsb2dpbihyZXNwb25zZSkge1xuICAgICAgaWYocmVzcG9uc2UuYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgIHRoaXMuJG9hdXRoLnN0b3JlU2Vzc2lvbihyZXNwb25zZSk7XG4gICAgICAgIHRoaXMuJG9hdXRoLmFkZEF1dGhIZWFkZXJzKCk7XG5cbiAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goJ2Rhc2hib2FyZCcpO1xuXG4gICAgICAgIHRoaXMuJG1lc3NhZ2Uoe1xuICAgICAgICAgIG1lc3NhZ2U6ICdVdyB3YWNodHdvb3JkIGlzIGdld2lqemlnZCcsXG4gICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIEV2ZW50cy4kZW1pdCgndXNlcnM6YXV0aGVudGljYXRlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hcHBQYXNzd29yZENoYW5nZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLiRyZWZzLmZvcm0ucmVzZXQoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZXJyb3IoZXJyb3IpIHtcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICB0aGlzLiRtZXNzYWdlKHtcbiAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgdHlwZTogJ2Vycm9yJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICBXaG9vcHMsIDQwNC5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXG59XG48L3NjcmlwdD4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hZi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXItZHpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1kei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWt3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXIta3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1seVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLWx5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbWFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1tYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLXNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItc2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci10blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9helwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2F6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JnXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYmcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9ibVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ibi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9icy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2NhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vY3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9kYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kZS1hdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWF0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9kdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2VsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbi1TR1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tU0cuanNcIixcblx0XCIuL2VuLVNHLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1TRy5qc1wiLFxuXHRcIi4vZW4tYXVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWF1LmpzXCIsXG5cdFwiLi9lbi1hdS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1jYS5qc1wiLFxuXHRcIi4vZW4tY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1nYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tZ2IuanNcIixcblx0XCIuL2VuLWdiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4taWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWllLmpzXCIsXG5cdFwiLi9lbi1pZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWlsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pbC5qc1wiLFxuXHRcIi4vZW4taWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1uelwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tbnouanNcIixcblx0XCIuL2VuLW56LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VvLmpzXCIsXG5cdFwiLi9lby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXMtZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLWRvLmpzXCIsXG5cdFwiLi9lcy1kby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLXVzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy11cy5qc1wiLFxuXHRcIi4vZXMtdXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMuanNcIixcblx0XCIuL2V0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldC5qc1wiLFxuXHRcIi4vZXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXUuanNcIixcblx0XCIuL2V1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZmFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZhLmpzXCIsXG5cdFwiLi9mYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9maS5qc1wiLFxuXHRcIi4vZmkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9mb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZm8uanNcIixcblx0XCIuL2ZvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZnJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9mci1jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2EuanNcIixcblx0XCIuL2ZyLWNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNoLmpzXCIsXG5cdFwiLi9mci1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci5qc1wiLFxuXHRcIi4vZnlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2Z5LmpzXCIsXG5cdFwiLi9meS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2dhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nYS5qc1wiLFxuXHRcIi4vZ2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dhLmpzXCIsXG5cdFwiLi9nZFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dkLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nZC5qc1wiLFxuXHRcIi4vZ2xcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2wuanNcIixcblx0XCIuL2dvbS1sYXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ29tLWxhdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dvbS1sYXRuLmpzXCIsXG5cdFwiLi9ndVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2d1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ndS5qc1wiLFxuXHRcIi4vaGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGUuanNcIixcblx0XCIuL2hpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaGkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hpLmpzXCIsXG5cdFwiLi9oclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2hyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oci5qc1wiLFxuXHRcIi4vaHVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9odS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHUuanNcIixcblx0XCIuL2h5LWFtXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaHktYW0uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h5LWFtLmpzXCIsXG5cdFwiLi9pZFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lkLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pZC5qc1wiLFxuXHRcIi4vaXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXMuanNcIixcblx0XCIuL2l0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vaXQtY2hcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2l0LWNoLmpzXCIsXG5cdFwiLi9pdC1jaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQtY2guanNcIixcblx0XCIuL2l0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC5qc1wiLFxuXHRcIi4vamFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2p2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4vanYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9rYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2thLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9ray5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2ttXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va20uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va29cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9rby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2t1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rdS5qc1wiLFxuXHRcIi4va3UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t1LmpzXCIsXG5cdFwiLi9reVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva3kuanNcIixcblx0XCIuL2t5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4vbGJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xiLmpzXCIsXG5cdFwiLi9sYi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sby5qc1wiLFxuXHRcIi4vbG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHQuanNcIixcblx0XCIuL2x0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x2LmpzXCIsXG5cdFwiLi9sdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL21lXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tZS5qc1wiLFxuXHRcIi4vbWUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9taVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWkuanNcIixcblx0XCIuL21pLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21rLmpzXCIsXG5cdFwiLi9tay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21sXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbC5qc1wiLFxuXHRcIi4vbWwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbW4uanNcIixcblx0XCIuL21uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21yLmpzXCIsXG5cdFwiLi9tci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21zXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy5qc1wiLFxuXHRcIi4vbXMtbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLW15LmpzXCIsXG5cdFwiLi9tcy1teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy5qc1wiLFxuXHRcIi4vbXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL210LmpzXCIsXG5cdFwiLi9tdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL215XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9teS5qc1wiLFxuXHRcIi4vbXkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9uYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmIuanNcIixcblx0XCIuL25iLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25lLmpzXCIsXG5cdFwiLi9uZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25sXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC5qc1wiLFxuXHRcIi4vbmwtYmVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLWJlLmpzXCIsXG5cdFwiLi9ubC1iZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC5qc1wiLFxuXHRcIi4vbm5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25uLmpzXCIsXG5cdFwiLi9ubi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL3BhLWluXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wYS1pbi5qc1wiLFxuXHRcIi4vcGEtaW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGwuanNcIixcblx0XCIuL3BsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcHRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LmpzXCIsXG5cdFwiLi9wdC1iclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQtYnIuanNcIixcblx0XCIuL3B0LWJyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LmpzXCIsXG5cdFwiLi9yb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcm8uanNcIixcblx0XCIuL3JvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcnVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3J1LmpzXCIsXG5cdFwiLi9ydS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3NkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZC5qc1wiLFxuXHRcIi4vc2QuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2UuanNcIixcblx0XCIuL3NlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2lcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NpLmpzXCIsXG5cdFwiLi9zaS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zay5qc1wiLFxuXHRcIi4vc2suanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2wuanNcIixcblx0XCIuL3NsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc3FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NxLmpzXCIsXG5cdFwiLi9zcS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci5qc1wiLFxuXHRcIi4vc3ItY3lybFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3ItY3lybC5qc1wiLFxuXHRcIi4vc3ItY3lybC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3ItY3lybC5qc1wiLFxuXHRcIi4vc3IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3MuanNcIixcblx0XCIuL3NzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3ZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N2LmpzXCIsXG5cdFwiLi9zdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdy5qc1wiLFxuXHRcIi4vc3cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi90YVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGEuanNcIixcblx0XCIuL3RhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RlLmpzXCIsXG5cdFwiLi90ZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RldFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90ZXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RldC5qc1wiLFxuXHRcIi4vdGdcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RnLmpzXCIsXG5cdFwiLi90Zy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90aC5qc1wiLFxuXHRcIi4vdGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90bC1waFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGwtcGguanNcIixcblx0XCIuL3RsLXBoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGxoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RsaC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGxoLmpzXCIsXG5cdFwiLi90clwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHIuanNcIixcblx0XCIuL3RyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHpsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHpsLmpzXCIsXG5cdFwiLi90em1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS5qc1wiLFxuXHRcIi4vdHptLWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS1sYXRuLmpzXCIsXG5cdFwiLi90em0tbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi91Zy1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWctY24uanNcIixcblx0XCIuL3VnLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VrLmpzXCIsXG5cdFwiLi91ay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ci5qc1wiLFxuXHRcIi4vdXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91elwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXouanNcIixcblx0XCIuL3V6LWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LWxhdG4uanNcIixcblx0XCIuL3V6LWxhdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LWxhdG4uanNcIixcblx0XCIuL3V6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3ZpLmpzXCIsXG5cdFwiLi92aS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3gtcHNldWRvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS94LXBzZXVkby5qc1wiLFxuXHRcIi4veC1wc2V1ZG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi95b1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveW8uanNcIixcblx0XCIuL3lvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4vemgtY25cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWNuLmpzXCIsXG5cdFwiLi96aC1jbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWhrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1oay5qc1wiLFxuXHRcIi4vemgtaGsuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC10d1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtdHcuanNcIixcblx0XCIuL3poLXR3LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlIHN5bmMgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLiokXCI7IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX3ZtLl9tKDApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSwgW1xuICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmRcIiB9LCBbXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWhlYWRlclwiIH0sIFtcbiAgICAgICAgICAgIF92bS5fdihcIlxcbiAgICAgICAgQ2FyZCB0aXRsZVxcbiAgICAgIFwiKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWJvZHlcIiB9KVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICBdKVxuICB9XG5dXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250YWluZXItZmx1aWRcIiB9LCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTIgY29sLW1kLTYgb2Zmc2V0LW1kLTMgY29sLWxnLTQgb2Zmc2V0LWxnLTRcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ2dWUtZm9ybVwiLCB7XG4gICAgICAgICAgICByZWY6IFwiZm9ybVwiLFxuICAgICAgICAgICAgYXR0cnM6IHsgdXJsOiBfdm0ucm91dGUoXCJ2dWUucGFzc3dvcmQuZm9yZ290XCIpLCBtb2RlbDogX3ZtLnVzZXIgfSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIFwic3VibWl0OnN1Y2Nlc3NcIjogX3ZtLnN1Y2Nlc3MsXG4gICAgICAgICAgICAgIFwic3VibWl0OmVycm9yXCI6IF92bS5zdWJtaXRFcnJvclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IHJlZi5mb3JtXG4gICAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSByZWYubW9kZWxcbiAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LWxvYWRpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZm9ybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZm9ybS5zdWJtaXR0aW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNhcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudC1sb2FkaW5nLWJhY2tncm91bmRcIjogXCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWhlYWRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICBXYWNodHdvb3JkIHZlcmdldGVuXFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWJvZHlcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1yb3dcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtdGV4dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVtYWlsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkUtbWFpbGFkcmVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1mb290ZXIgaGFzLWJ1dHRvbnNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmF0aXZlLXR5cGVcIjogXCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgV2FjaHR3b29yZCByZXNldHRlblxcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGFpbmVyLWZsdWlkXCIgfSwgW1xuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyIGNvbC1tZC02IG9mZnNldC1tZC0zIGNvbC1sZy00IG9mZnNldC1sZy00XCIgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwidnVlLWZvcm1cIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgbW9kZWw6IF92bS51c2VyLCB1cmw6IFwiL2FwaS92dWUvbG9naW5cIiB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgXCJzdWJtaXQ6c3VjY2Vzc1wiOiBfdm0uYXV0aGVudGljYXRlZCxcbiAgICAgICAgICAgICAgXCJzdWJtaXQ6ZXJyb3JcIjogX3ZtLmVycm9yXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gcmVmLmZvcm1cbiAgICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHJlZi5tb2RlbFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxvYWRpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmb3JtLnN1Ym1pdHRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJmb3JtLnN1Ym1pdHRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2FyZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50LWxvYWRpbmctYmFja2dyb3VuZFwiOiBcInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtaGVhZGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJcXG4gICAgICAgICAgICAgIElubG9nZ2VuXFxuICAgICAgICAgICAgXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtYm9keVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLXJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtdGV4dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW1haWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkUtbWFpbGFkcmVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJFLW1haWxhZHJlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLXJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtcGFzc3dvcmRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhc3N3b3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJXYWNodHdvb3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJXYWNodHdvb3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtZm9vdGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmF0aXZlLXR5cGVcIjogXCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgSW5sb2dnZW5cXG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtYXV0b1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJ0ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnJlc2V0UGFzc3dvcmQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICBXYWNodHdvb3JkIHZlcmdldGVuXFxuICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbnRhaW5lci1mbHVpZFwiIH0sIFtcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgIF92bS51c2VyXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjb2wtc20tMTIgY29sLW1kLTYgb2Zmc2V0LW1kLTMgY29sLWxnLTQgb2Zmc2V0LWxnLTRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2dWUtZm9ybVwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgbW9kZWw6IF92bS51c2VyLCB1cmw6IF92bS5yb3V0ZShcInZ1ZS5yZWdpc3RlclwiKSB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBcInN1Ym1pdDpzdWNjZXNzXCI6IF92bS5yZWdpc3RyYXRlZCxcbiAgICAgICAgICAgICAgICAgIFwic3VibWl0OmVycm9yXCI6IF92bS5lcnJvclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSByZWYuZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gcmVmLm1vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1sb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZvcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWhlYWRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICBSZWdpc3RyZXJlblxcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1ib2R5XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicm93IG1hcmdpbi1ib3R0b20tc21cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5hY3RpdmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImVsLWFsZXJ0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXcgYWNjb3VudCBpcyBnZWFjdGl2ZWVyZCwgdSBrdW50IG51IGlubG9nZ2VuIGluIGRlIGFwcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2FibGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtdGV4dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlyc3RfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVm9vcm5hYW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlZvb3JuYWFtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtdGV4dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGFzdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJBY2h0ZXJuYWFtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJBY2h0ZXJuYWFtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtcGFzc3dvcmRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhc3N3b3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJXYWNodHdvb3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJXYWNodHdvb3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtcGFzc3dvcmRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhc3N3b3JkX2NvbmZpcm1hdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiV2FjaHR3b29yZCBiZXZlc3RpZ2VuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJXYWNodHdvb3JkIGJldmVzdGlnZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmQtZm9vdGVyIGhhcy1idXR0b25zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hdGl2ZS10eXBlXCI6IFwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgIFJlZ2lzdHJlcmVuXFxuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgMzg3NzAyNTcxOFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpXG4gICAgXSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGFpbmVyLWZsdWlkXCIgfSwgW1xuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgX3ZtLmFjdGlvblxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyIGNvbC1tZC02IG9mZnNldC1tZC0zIGNvbC1sZy00IG9mZnNldC1sZy00XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidnVlLWZvcm1cIiwge1xuICAgICAgICAgICAgICAgIHJlZjogXCJmb3JtXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIHVybDogX3ZtLnJvdXRlKFwidnVlLnBhc3N3b3JkLnJlc2V0XCIpLFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IF92bS5hY3Rpb25cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBcInN1Ym1pdDpzdWNjZXNzXCI6IF92bS5sb2dpbixcbiAgICAgICAgICAgICAgICAgIFwic3VibWl0OmVycm9yXCI6IF92bS5zdWJtaXRFcnJvclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSByZWYuZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gcmVmLm1vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1sb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZvcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWhlYWRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICBXYWNodHdvb3JkIHJlc2V0dGVuXFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1ib2R5XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5hcHBQYXNzd29yZENoYW5nZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJlbC1hbGVydFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlV3IHdhY2h0d29vcmQgaXMgZ2V3aWp6aWdkLCB1IGt1bnQgbnUgaW5sb2dnZW4gaW4gZGUgYXBwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvdy1pY29uXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLXJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0LXBhc3N3b3JkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiV2FjaHR3b29yZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tcm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtcGFzc3dvcmRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwYXNzd29yZF9jb25maXJtYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJXYWNodHdvb3JkIGJldmVzdGlnZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1mb290ZXIgaGFzLWJ1dHRvbnNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmF0aXZlLXR5cGVcIjogXCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgV2FjaHR3b29yZCByZXNldHRlblxcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIDE3MjgyMDY2MDVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCBbX3ZtLl92KFwiXFxuICBXaG9vcHMsIDQwNC5cXG5cIildKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSJdLCJzb3VyY2VSb290IjoiIn0=