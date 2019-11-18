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
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.async(function init$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      });
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
  return vue__WEBPACK_IMPORTED_MODULE_7__["default"].component(key.split('/').pop().split('.')[0], files(key)["default"]);
});
var app = new vue__WEBPACK_IMPORTED_MODULE_7__["default"]({
  el: '#app',
  components: {
    App: _views_App__WEBPACK_IMPORTED_MODULE_10__["default"]
  },
  router: _libraries_router__WEBPACK_IMPORTED_MODULE_15__["default"]
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

  __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
} catch (e) {
  console.error(e);
}
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

  if (to.meta.auth) {//
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
/* harmony import */ var _acl__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./acl */ "./Resources/assets/vue/acl.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./helpers */ "./Resources/assets/vue/helpers.js");

















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
    route: function route(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var keys = Object.keys(params);

      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];
        url = url.replace(":".concat(key), params[key]);
      }

      return "/api/vue/".concat(url.replace(/^\/+/g, ''));
    },
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
vue__WEBPACK_IMPORTED_MODULE_14__["default"].directive('user-can', function (el, bindings, vnode) {
  var behaviour = bindings.modifiers.disable ? 'disable' : 'hide';

  if (!_acl__WEBPACK_IMPORTED_MODULE_15__["default"].userCan(bindings.value)) {
    if (behaviour === 'hide') {
      _helpers__WEBPACK_IMPORTED_MODULE_16__["default"].commentNode(el, vnode);
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
    auth: false
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    return {};
  },
  created: function created() {
    console.log('App.vue created');
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    authenticated: function authenticated(response) {// this.$oauth.storeSession(response);
      // this.$oauth.addAuthHeaders();
      // this.$router.replace({name: 'dashboard'});
    },
    error: function error(_error) {// this.loading = false;
      // this.user.password = null;
      //
      // let message = 'Er is iets mis gegaan, probeer het opnieuw';
      //
      // if (error.status === 422) {
      //   message = 'De ingevoerde gegevens zijn onjuist';
      // }
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
    axios.get("".concat(to.params.token)).then(function (_ref) {
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
  return _c(
    "div",
    [
      _vm.$route.meta.auth
        ? [
            _c("header"),
            _vm._v(" "),
            _c("main", [
              _c("aside"),
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
            attrs: { model: _vm.user, url: _vm.route("auth/login") },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvYWNsLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9ib290c3RyYXAuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvY29tcG9uZW50cyBzeW5jIFxcLnZ1ZSQvIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvaW50ZXJjZXB0b3JzL2F4aW9zLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2xpYnJhcmllcy9lbGVtZW50LmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2xpYnJhcmllcy9mb3JtLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2xpYnJhcmllcy9tb21lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvbGlicmFyaWVzL3Byb2dyZXNzYmFyLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2xpYnJhcmllcy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvbGlicmFyaWVzL3RhYmxlLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL29hdXRoLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL29hdXRoLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvcGx1Z2lucy5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9yb3V0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvcm91dGVzL21vZHVsZXMvYXV0aGVudGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvQXBwLnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9BcHAudnVlPzM1NDYiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvQXBwLnZ1ZT8wZTQ4Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0Rhc2hib2FyZC52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvRGFzaGJvYXJkLnZ1ZT84ZTkwIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0Rhc2hib2FyZC52dWU/ZDgxOSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Gb3Jnb3RQYXNzd29yZC52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vRm9yZ290UGFzc3dvcmQudnVlP2E5YjgiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vRm9yZ290UGFzc3dvcmQudnVlP2NhMmEiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vTG9naW4udnVlIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0xvZ2luLnZ1ZT9lZDdmIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0xvZ2luLnZ1ZT9kOGUzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL1JlZ2lzdGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZWdpc3Rlci52dWU/ZTJkNiIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZWdpc3Rlci52dWU/ZmExMiIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZXNldFBhc3N3b3JkLnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZXNldFBhc3N3b3JkLnZ1ZT82ZTY4Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL1Jlc2V0UGFzc3dvcmQudnVlPzUwOGMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvZXJyb3JzL05vdEZvdW5kLnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9lcnJvcnMvTm90Rm91bmQudnVlPzk4YjciLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvZXJyb3JzL05vdEZvdW5kLnZ1ZT80MzcxIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9BcHAudnVlIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9EYXNoYm9hcmQudnVlIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Gb3Jnb3RQYXNzd29yZC52dWUiLCJ3ZWJwYWNrOi8vL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0xvZ2luLnZ1ZSIsIndlYnBhY2s6Ly8vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVnaXN0ZXIudnVlIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZXNldFBhc3N3b3JkLnZ1ZSIsIndlYnBhY2s6Ly8vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvZXJyb3JzL05vdEZvdW5kLnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvQXBwLnZ1ZT8yNjQwIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0Rhc2hib2FyZC52dWU/NTRmOSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Gb3Jnb3RQYXNzd29yZC52dWU/NzQ1MCIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Mb2dpbi52dWU/MTdiYSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZWdpc3Rlci52dWU/ZGZhNiIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZXNldFBhc3N3b3JkLnZ1ZT9hZGI0Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2Vycm9ycy9Ob3RGb3VuZC52dWU/OWQyMCJdLCJuYW1lcyI6WyJBQ0wiLCJ3aW5kb3ciLCJWdWUiLCJFdmVudHMiLCJmaWxlcyIsInJlcXVpcmUiLCJrZXlzIiwibWFwIiwia2V5IiwiY29tcG9uZW50Iiwic3BsaXQiLCJwb3AiLCJhcHAiLCJlbCIsImNvbXBvbmVudHMiLCJBcHAiLCJyb3V0ZXIiLCJfIiwiUG9wcGVyIiwiJCIsImpRdWVyeSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJheGlvcyIsImNvbW1lbnROb2RlIiwidm5vZGUiLCJjb21tZW50IiwiZG9jdW1lbnQiLCJjcmVhdGVDb21tZW50IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsInRleHQiLCJlbG0iLCJpc0NvbW1lbnQiLCJjb250ZXh0IiwidGFnIiwiZGF0YSIsImRpcmVjdGl2ZXMiLCJjb21wb25lbnRJbnN0YW5jZSIsIiRlbCIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJvQXV0aCIsIk9BdXRoIiwiaW50ZXJjZXB0b3JzIiwicmVxdWVzdCIsInVzZSIsImNvbmZpZyIsImhlYWRlcnMiLCJpc0F1dGhlbnRpY2F0ZWQiLCJnZXRBdXRoSGVhZGVyIiwiUHJvbWlzZSIsInJlamVjdCIsInJlc3BvbnNlIiwic3RhdHVzIiwibG9nb3V0IiwibG9jYWxlIiwibGFuZyIsIkFsZXJ0IiwibmFtZSIsIkNvbGxhcHNlIiwiQ29sbGFwc2VJdGVtIiwiSW5wdXQiLCJJbnB1dERpZ2l0IiwiUmFkaW8iLCJDaGVja2JveCIsIlRhZyIsIkJ1dHRvbiIsIlNlbGVjdCIsIk9wdGlvbiIsIk9wdGlvbkdyb3VwIiwiVG9vbHRpcCIsIkRyb3Bkb3duIiwiRHJvcGRvd25NZW51IiwiRHJvcGRvd25JdGVtIiwiVXBsb2FkIiwiVGFiUGFuZSIsIlRhYnMiLCJEYXRlUGlja2VyIiwiVHJhbnNmZXIiLCJEaWFsb2ciLCJUaW1lU2VsZWN0IiwiQ29sb3JQaWNrZXIiLCJMb2FkaW5nIiwiZGlyZWN0aXZlIiwicHJvdG90eXBlIiwiJG1lc3NhZ2UiLCJNZXNzYWdlIiwiJG1zZ2JveCIsIk1lc3NhZ2VCb3giLCIkYWxlcnQiLCJhbGVydCIsIiRjb25maXJtIiwiY29uZmlybSIsIiRwcm9tcHQiLCJwcm9tcHQiLCJWdWVGb3JtIiwiSW5wdXRSYWRpbyIsIklucHV0Q2hlY2tib3giLCJJbnB1dFRleHQiLCJJbnB1dE51bWJlciIsIklucHV0UGFzc3dvcmQiLCJJbnB1dEVkaXRvciIsIklucHV0U2VsZWN0IiwiSW5wdXRVcGxvYWQiLCJJbnB1dERhdGVUaW1lIiwiSW5wdXRDb2RlIiwiSW5wdXRUaW1lIiwiSW5wdXRDb2xvclBpY2tlciIsIiRtb21lbnQiLCJtb21lbnQiLCJWdWVQcm9ncmVzcyIsIlZ1ZVByb2dyZXNzQmFyIiwiY29sb3IiLCJmYWlsZWRDb2xvciIsInRoaWNrbmVzcyIsInRyYW5zaXRpb24iLCJzcGVlZCIsIm9wYWNpdHkiLCJ0ZXJtaW5hdGlvbiIsIlZ1ZVJvdXRlciIsIm1vZGUiLCJiYXNlIiwicm91dGVzIiwiYmVmb3JlRWFjaCIsInRvIiwiZnJvbSIsIm5leHQiLCJtZXRhIiwiYXV0aCIsInBhdGgiLCJndWVzdCIsInF1ZXJ5IiwicmVkaXJlY3QiLCJmdWxsUGF0aCIsIkNhcmRUYWJsZUhlYWRlciIsIlZ1ZVRhYmxlIiwic2Vzc2lvbiIsIkNvb2tpZXMiLCJBdXRoU2VydmljZSIsImRlc3Ryb3lTZXNzaW9uIiwicmVtb3ZlIiwiZ2V0IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInJlc29sdmUiLCJhdHRlbXB0TG9naW4iLCJ0aGVuIiwic3RvcmVTZXNzaW9uIiwiYWRkQXV0aEhlYWRlcnMiLCJyZWZyZXNoX3Rva2VuIiwiY3VycmVudFVzZXIiLCJhY2Nlc3NfdG9rZW4iLCJnZXRJdGVtIiwiaGVhZGVyIiwiYWRkQXV0aG9yaXphdGlvbkhlYWRlciIsImhvdXJJbk1pbGxpU2Vjb25kcyIsInRpbWUiLCJleHBpcmVzX2luIiwic2V0IiwiZXhwaXJlcyIsInVzZXIiLCJjcmVkZW50aWFscyIsInBvc3QiLCJyZWZyZXNoVG9rZW4iLCJwYXJhbXMiLCJkZWZhdWx0cyIsImNvbW1vbiIsIm1peGluIiwiZmlsdGVycyIsImNhcGl0YWxpemUiLCJ0b1N0cmluZyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJtZXRob2RzIiwicm91dGUiLCJ1cmwiLCJyZXBsYWNlIiwic3VibWl0U3VjY2VzcyIsInR5cGUiLCJtZXNzYWdlIiwic3VibWl0RXJyb3IiLCJ0aXRsZSIsImNvbmZpcm1CdXR0b25UZXh0IiwiY2FuY2VsQnV0dG9uVGV4dCIsImRhbmdlcm91c2x5VXNlSFRNTFN0cmluZyIsImlzRW1wdHkiLCJmb3JtYXRQcmljZSIsInZhbCIsInRvRml4ZWQiLCJkb3dubG9hZEZpbGUiLCJtZXRob2QiLCJyZXNwb25zZVR5cGUiLCJmaWxlTmFtZSIsImRpc3Bvc2l0aW9uIiwiaW5kZXhPZiIsImZpbGVuYW1lUmVnZXgiLCJtYXRjaGVzIiwiZXhlYyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsIkJsb2IiLCJsaW5rIiwiY3JlYXRlRWxlbWVudCIsImhyZWYiLCJzZXRBdHRyaWJ1dGUiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjbGljayIsInJlbW92ZUNoaWxkIiwiZmlsdGVyIiwiYmluZGluZ3MiLCJiZWhhdmlvdXIiLCJtb2RpZmllcnMiLCJkaXNhYmxlIiwiYWNsIiwidXNlckNhbiIsImhlbHBlcnMiLCJkaXNhYmxlZCIsImNvbmNhdCIsImF1dGhlbnRpY2F0aW9uIiwicHJvcHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQTtBQUNBLDBCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RKQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImpzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwianMvYXBwXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvYXBwLmpzXCIsXCJ2ZW5kb3JzfmpzL2FwcFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8qKlxuICogQUNMIGNsYXNzIHRvIHByb3ZpZGUgaGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIHVzZXIgYW5kIGl0J3Mgcm9sZXNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQUNMIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIEFDTCBwbHVnaW5cbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgaW5pdCgpIHtcbiAgICAgICAgLy8gdHJ5IHtcbiAgICAgICAgLy8gICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuYWxsKFtcbiAgICAgICAgLy8gICAgICAgICBheGlvcy5nZXQoJy9hcGkvdnVlL3VzZXJzL3Byb2ZpbGUnKSxcbiAgICAgICAgLy8gICAgIF0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgd2luZG93LnVzZXIgPSByZXNwb25zZVswXS5kYXRhLmRhdGE7XG4gICAgICAgIC8vIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vICAgICB3aW5kb3cudXNlciA9IHt9O1xuICAgICAgICAvLyB9XG4gICAgfVxufVxuIiwiaW1wb3J0ICcuL2Jvb3RzdHJhcCc7XG5pbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5cbmltcG9ydCAnLi9wbHVnaW5zJztcbmltcG9ydCAnLi9pbnRlcmNlcHRvcnMvYXhpb3MnO1xuXG5pbXBvcnQgQXBwIGZyb20gJy4vdmlld3MvQXBwJztcblxuLy8gaW1wb3J0ICcuL2xpYnJhcmllcy9hdXRoJztcbi8vIGltcG9ydCAnLi9saWJyYXJpZXMvZHJhZ2dhYmxlJztcbmltcG9ydCAnLi9saWJyYXJpZXMvZWxlbWVudCc7XG4vLyBpbXBvcnQgJy4vbGlicmFyaWVzL2ZvbnRhd2Vzb21lJztcbmltcG9ydCAnLi9saWJyYXJpZXMvZm9ybSc7XG4vLyBpbXBvcnQgJy4vbGlicmFyaWVzL21hc29ucnknO1xuaW1wb3J0ICcuL2xpYnJhcmllcy9tb21lbnQnO1xuaW1wb3J0ICcuL2xpYnJhcmllcy9wcm9ncmVzc2Jhcic7XG5pbXBvcnQgcm91dGVyIGZyb20gJy4vbGlicmFyaWVzL3JvdXRlcic7XG5pbXBvcnQgJy4vbGlicmFyaWVzL3RhYmxlJztcblxud2luZG93LlZ1ZSA9IFZ1ZTtcbndpbmRvdy5FdmVudHMgPSBuZXcgVnVlKCk7XG5cbi8vIGltcG9ydCAqIGFzIFNlbnRyeSBmcm9tICdAc2VudHJ5L2Jyb3dzZXInO1xuLy8gaW1wb3J0ICogYXMgSW50ZWdyYXRpb25zIGZyb20gJ0BzZW50cnkvaW50ZWdyYXRpb25zJztcblxuLy8gaWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuLy8gLy8gSW5pdCBTZW50cnlcbi8vICAgICBTZW50cnkuaW5pdCh7XG4vLyAgICAgICAgIGRzbjogJ2h0dHBzOi8vM2E0Y2Q1NDRiODg3NGFjZjgzMjVhYTdiMjY2MTM5YzlAc2VudHJ5LmlvLzEyOTMxNCcsXG4vLyAgICAgICAgIGludGVncmF0aW9uczogW25ldyBJbnRlZ3JhdGlvbnMuVnVlKHtWdWUsIGF0dGFjaFByb3BzOiB0cnVlfSldLFxuLy8gICAgIH0pO1xuLy8gfVxuXG4vKipcbiAqIFRoZSBmb2xsb3dpbmcgYmxvY2sgb2YgY29kZSBtYXkgYmUgdXNlZCB0byBhdXRvbWF0aWNhbGx5IHJlZ2lzdGVyIHlvdXJcbiAqIFZ1ZSBjb21wb25lbnRzLiBJdCB3aWxsIHJlY3Vyc2l2ZWx5IHNjYW4gdGhpcyBkaXJlY3RvcnkgZm9yIHRoZSBWdWVcbiAqIGNvbXBvbmVudHMgYW5kIGF1dG9tYXRpY2FsbHkgcmVnaXN0ZXIgdGhlbSB3aXRoIHRoZWlyIFwiYmFzZW5hbWVcIi5cbiAqXG4gKiBFZy4gLi9jb21wb25lbnRzL0V4YW1wbGVDb21wb25lbnQudnVlIC0+IDxleGFtcGxlLWNvbXBvbmVudD48L2V4YW1wbGUtY29tcG9uZW50PlxuICovXG5cbmNvbnN0IGZpbGVzID0gcmVxdWlyZS5jb250ZXh0KCcuL2NvbXBvbmVudHMvJywgdHJ1ZSwgL1xcLnZ1ZSQvaSk7XG5maWxlcy5rZXlzKCkubWFwKGtleSA9PiBWdWUuY29tcG9uZW50KGtleS5zcGxpdCgnLycpLnBvcCgpLnNwbGl0KCcuJylbMF0sIGZpbGVzKGtleSkuZGVmYXVsdCkpO1xuXG5jb25zdCBhcHAgPSBuZXcgVnVlKHtcbiAgICBlbDogJyNhcHAnLFxuICAgIGNvbXBvbmVudHM6IHtBcHB9LFxuICAgIHJvdXRlcixcbn0pO1xuIiwiXG53aW5kb3cuXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xud2luZG93LlBvcHBlciA9IHJlcXVpcmUoJ3BvcHBlci5qcycpLmRlZmF1bHQ7XG5cbi8qKlxuICogV2UnbGwgbG9hZCBqUXVlcnkgYW5kIHRoZSBCb290c3RyYXAgalF1ZXJ5IHBsdWdpbiB3aGljaCBwcm92aWRlcyBzdXBwb3J0XG4gKiBmb3IgSmF2YVNjcmlwdCBiYXNlZCBCb290c3RyYXAgZmVhdHVyZXMgc3VjaCBhcyBtb2RhbHMgYW5kIHRhYnMuIFRoaXNcbiAqIGNvZGUgbWF5IGJlIG1vZGlmaWVkIHRvIGZpdCB0aGUgc3BlY2lmaWMgbmVlZHMgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAqL1xuXG50cnkge1xuICAgIHdpbmRvdy4kID0gd2luZG93LmpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG4gICAgcmVxdWlyZSgnYm9vdHN0cmFwJyk7XG59IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbn1cblxuXG4vKipcbiAqIFdlJ2xsIGxvYWQgdGhlIGF4aW9zIEhUVFAgbGlicmFyeSB3aGljaCBhbGxvd3MgdXMgdG8gZWFzaWx5IGlzc3VlIHJlcXVlc3RzXG4gKiB0byBvdXIgTGFyYXZlbCBiYWNrLWVuZC4gVGhpcyBsaWJyYXJ5IGF1dG9tYXRpY2FsbHkgaGFuZGxlcyBzZW5kaW5nIHRoZVxuICogQ1NSRiB0b2tlbiBhcyBhIGhlYWRlciBiYXNlZCBvbiB0aGUgdmFsdWUgb2YgdGhlIFwiWFNSRlwiIHRva2VuIGNvb2tpZS5cbiAqL1xuXG53aW5kb3cuYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuXG5cbi8qKlxuICogRWNobyBleHBvc2VzIGFuIGV4cHJlc3NpdmUgQVBJIGZvciBzdWJzY3JpYmluZyB0byBjaGFubmVscyBhbmQgbGlzdGVuaW5nXG4gKiBmb3IgZXZlbnRzIHRoYXQgYXJlIGJyb2FkY2FzdCBieSBMYXJhdmVsLiBFY2hvIGFuZCBldmVudCBicm9hZGNhc3RpbmdcbiAqIGFsbG93cyB5b3VyIHRlYW0gdG8gZWFzaWx5IGJ1aWxkIHJvYnVzdCByZWFsLXRpbWUgd2ViIGFwcGxpY2F0aW9ucy5cbiAqL1xuXG4vLyBpbXBvcnQgRWNobyBmcm9tICdsYXJhdmVsLWVjaG8nXG5cbi8vIHdpbmRvdy5QdXNoZXIgPSByZXF1aXJlKCdwdXNoZXItanMnKTtcblxuLy8gd2luZG93LkVjaG8gPSBuZXcgRWNobyh7XG4vLyAgICAgYnJvYWRjYXN0ZXI6ICdwdXNoZXInLFxuLy8gICAgIGtleTogcHJvY2Vzcy5lbnYuTUlYX1BVU0hFUl9BUFBfS0VZLFxuLy8gICAgIGNsdXN0ZXI6IHByb2Nlc3MuZW52Lk1JWF9QVVNIRVJfQVBQX0NMVVNURVIsXG4vLyAgICAgZW5jcnlwdGVkOiB0cnVlXG4vLyB9KTtcbiIsImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUNvbnRleHQocmVxKSB7XG5cdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHR0aHJvdyBlO1xufVxud2VicGFja0VtcHR5Q29udGV4dC5rZXlzID0gZnVuY3Rpb24oKSB7IHJldHVybiBbXTsgfTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gXCIuL1Jlc291cmNlcy9hc3NldHMvdnVlL2NvbXBvbmVudHMgc3luYyByZWN1cnNpdmUgXFxcXC52dWUkL1wiOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgY29tbWVudE5vZGUoZWwsIHZub2RlKSB7XG4gICAgY29uc3QgY29tbWVudCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJyAnKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21tZW50LCAnc2V0QXR0cmlidXRlJywge1xuICAgICAgdmFsdWU6ICgpID0+IHVuZGVmaW5lZFxuICAgIH0pO1xuXG4gICAgdm5vZGUudGV4dCA9ICcgJztcbiAgICB2bm9kZS5lbG0gPSBjb21tZW50O1xuICAgIHZub2RlLmlzQ29tbWVudCA9IHRydWU7XG4gICAgdm5vZGUuY29udGV4dCA9IHVuZGVmaW5lZDtcbiAgICB2bm9kZS50YWcgPSB1bmRlZmluZWQ7XG4gICAgdm5vZGUuZGF0YS5kaXJlY3RpdmVzID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHZub2RlLmNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICB2bm9kZS5jb21wb25lbnRJbnN0YW5jZS4kZWwgPSBjb21tZW50O1xuICAgIH1cblxuICAgIGlmIChlbC5wYXJlbnROb2RlKSB7XG4gICAgICBlbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjb21tZW50LCBlbCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgT0F1dGggZnJvbSAnLi8uLi9vYXV0aCc7XG5cbmxldCBvQXV0aCA9IG5ldyBPQXV0aCgpO1xuXG4vKipcbiAqIFJlcXVlc3QgaW50ZXJjZXB0b3JcbiAqL1xud2luZG93LmF4aW9zLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShmdW5jdGlvbiAoY29uZmlnKSB7XG5cbiAgICBjb25maWcuaGVhZGVyc1snWC1SZXF1ZXN0ZWQtV2l0aCddID0gJ1hNTEh0dHBSZXF1ZXN0JztcblxuICAgIC8vIEFkZCB0aGUgYXV0aGVudGljYXRpb24gaGVhZGVyIHdoZW4gdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gICAgaWYgKG9BdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgLy8gU2V0IHRoZSBhdXRob3JpemF0aW9uIGhlYWRlciBmb3IgZWFjaCByZXF1ZXN0XG4gICAgICAgIGNvbmZpZy5oZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBvQXV0aC5nZXRBdXRoSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZztcbn0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlcXVlc3QgZXJyb3JcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xufSk7XG5cblxuLyoqXG4gKiBSZXNwb25zZSBpbnRlcmNlcHRvclxuICovXG53aW5kb3cuYXhpb3MuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXNwb25zZSBkYXRhXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xufSwgZnVuY3Rpb24gKGVycm9yKSB7XG5cbiAgICAvLyBSZWZyZXNoIHRoZSBhY2Nlc3MgdG9rZW5cbiAgICBpZiAoZXJyb3IucmVzcG9uc2UgIT09IHVuZGVmaW5lZCAmJiBlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMSAmJiBvQXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICBvQXV0aC5sb2dvdXQoKTtcbiAgICB9XG5cbiAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXNwb25zZSBlcnJvclxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG59KTtcblxuXG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQge1xuICAgIEFsZXJ0LFxuICAgIEJ1dHRvbixcbiAgICBDaGVja2JveCxcbiAgICBDb2xsYXBzZSxcbiAgICBDb2xsYXBzZUl0ZW0sXG4gICAgQ29sb3JQaWNrZXIsXG4gICAgRGF0ZVBpY2tlcixcbiAgICBEaWFsb2csXG4gICAgRHJvcGRvd24sXG4gICAgRHJvcGRvd25JdGVtLFxuICAgIERyb3Bkb3duTWVudSxcbiAgICBJbnB1dCxcbiAgICBJbnB1dE51bWJlciBhcyBJbnB1dERpZ2l0LFxuICAgIExvYWRpbmcsXG4gICAgTWVzc2FnZSxcbiAgICBNZXNzYWdlQm94LFxuICAgIE9wdGlvbixcbiAgICBPcHRpb25Hcm91cCxcbiAgICBSYWRpbyxcbiAgICBTZWxlY3QsXG4gICAgVGFiUGFuZSxcbiAgICBUYWJzLFxuICAgIFRhZyxcbiAgICBUaW1lU2VsZWN0LFxuICAgIFRvb2x0aXAsXG4gICAgVHJhbnNmZXIsXG4gICAgVXBsb2FkXG59IGZyb20gJ2VsZW1lbnQtdWknO1xuaW1wb3J0IGxhbmcgZnJvbSAnZWxlbWVudC11aS9saWIvbG9jYWxlL2xhbmcvbmwnO1xuaW1wb3J0IGxvY2FsZSBmcm9tICdlbGVtZW50LXVpL2xpYi9sb2NhbGUnO1xuaW1wb3J0ICdlbGVtZW50LXVpL2xpYi90aGVtZS1jaGFsay9pbmRleC5jc3MnO1xuXG5sb2NhbGUudXNlKGxhbmcpO1xuVnVlLmNvbXBvbmVudChBbGVydC5uYW1lLCBBbGVydCk7XG5WdWUuY29tcG9uZW50KENvbGxhcHNlLm5hbWUsIENvbGxhcHNlKTtcblZ1ZS5jb21wb25lbnQoQ29sbGFwc2VJdGVtLm5hbWUsIENvbGxhcHNlSXRlbSk7XG5WdWUuY29tcG9uZW50KElucHV0Lm5hbWUsIElucHV0KTtcblZ1ZS5jb21wb25lbnQoSW5wdXREaWdpdC5uYW1lLCBJbnB1dERpZ2l0KTtcblZ1ZS5jb21wb25lbnQoUmFkaW8ubmFtZSwgUmFkaW8pO1xuVnVlLmNvbXBvbmVudChDaGVja2JveC5uYW1lLCBDaGVja2JveCk7XG5WdWUuY29tcG9uZW50KFRhZy5uYW1lLCBUYWcpO1xuVnVlLmNvbXBvbmVudChCdXR0b24ubmFtZSwgQnV0dG9uKTtcblZ1ZS5jb21wb25lbnQoU2VsZWN0Lm5hbWUsIFNlbGVjdCk7XG5WdWUuY29tcG9uZW50KE9wdGlvbi5uYW1lLCBPcHRpb24pO1xuVnVlLmNvbXBvbmVudChPcHRpb25Hcm91cC5uYW1lLCBPcHRpb25Hcm91cCk7XG5WdWUuY29tcG9uZW50KFRvb2x0aXAubmFtZSwgVG9vbHRpcCk7XG5WdWUuY29tcG9uZW50KERyb3Bkb3duLm5hbWUsIERyb3Bkb3duKTtcblZ1ZS5jb21wb25lbnQoRHJvcGRvd25NZW51Lm5hbWUsIERyb3Bkb3duTWVudSk7XG5WdWUuY29tcG9uZW50KERyb3Bkb3duSXRlbS5uYW1lLCBEcm9wZG93bkl0ZW0pO1xuVnVlLmNvbXBvbmVudChVcGxvYWQubmFtZSwgVXBsb2FkKTtcblZ1ZS5jb21wb25lbnQoVGFiUGFuZS5uYW1lLCBUYWJQYW5lKTtcblZ1ZS5jb21wb25lbnQoVGFicy5uYW1lLCBUYWJzKTtcblZ1ZS5jb21wb25lbnQoRGF0ZVBpY2tlci5uYW1lLCBEYXRlUGlja2VyKTtcblZ1ZS5jb21wb25lbnQoVHJhbnNmZXIubmFtZSwgVHJhbnNmZXIpO1xuVnVlLmNvbXBvbmVudChEaWFsb2cubmFtZSwgRGlhbG9nKTtcblZ1ZS5jb21wb25lbnQoVGltZVNlbGVjdC5uYW1lLCBUaW1lU2VsZWN0KTtcblZ1ZS5jb21wb25lbnQoQ29sb3JQaWNrZXIubmFtZSwgQ29sb3JQaWNrZXIpO1xuXG5WdWUudXNlKExvYWRpbmcuZGlyZWN0aXZlKTtcblZ1ZS5wcm90b3R5cGUuJG1lc3NhZ2UgPSBNZXNzYWdlO1xuVnVlLnByb3RvdHlwZS4kbXNnYm94ID0gTWVzc2FnZUJveDtcblZ1ZS5wcm90b3R5cGUuJGFsZXJ0ID0gTWVzc2FnZUJveC5hbGVydDtcblZ1ZS5wcm90b3R5cGUuJGNvbmZpcm0gPSBNZXNzYWdlQm94LmNvbmZpcm07XG5WdWUucHJvdG90eXBlLiRwcm9tcHQgPSBNZXNzYWdlQm94LnByb21wdDtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCB7SW5wdXRDaGVja2JveCwgSW5wdXRDb2RlLCBJbnB1dENvbG9yUGlja2VyLCBJbnB1dERhdGVUaW1lLCBJbnB1dEVkaXRvciwgSW5wdXROdW1iZXIsIElucHV0UGFzc3dvcmQsIElucHV0UmFkaW8sIElucHV0U2VsZWN0LCBJbnB1dFRleHQsIElucHV0VGltZSwgSW5wdXRVcGxvYWQsIFZ1ZUZvcm19IGZyb20gJ0BiaXQvZS1zaXRlcy52dWUuZ2xvYmFsLmZvcm0nO1xuXG5WdWUuY29tcG9uZW50KFZ1ZUZvcm0ubmFtZSwgVnVlRm9ybSk7XG5WdWUuY29tcG9uZW50KElucHV0UmFkaW8ubmFtZSwgSW5wdXRSYWRpbyk7XG5WdWUuY29tcG9uZW50KElucHV0Q2hlY2tib3gubmFtZSwgSW5wdXRDaGVja2JveCk7XG5WdWUuY29tcG9uZW50KElucHV0VGV4dC5uYW1lLCBJbnB1dFRleHQpO1xuVnVlLmNvbXBvbmVudChJbnB1dE51bWJlci5uYW1lLCBJbnB1dE51bWJlcik7XG5WdWUuY29tcG9uZW50KElucHV0UGFzc3dvcmQubmFtZSwgSW5wdXRQYXNzd29yZCk7XG5WdWUuY29tcG9uZW50KElucHV0RWRpdG9yLm5hbWUsIElucHV0RWRpdG9yKTtcblZ1ZS5jb21wb25lbnQoSW5wdXRTZWxlY3QubmFtZSwgSW5wdXRTZWxlY3QpO1xuVnVlLmNvbXBvbmVudChJbnB1dFVwbG9hZC5uYW1lLCBJbnB1dFVwbG9hZCk7XG5WdWUuY29tcG9uZW50KElucHV0RGF0ZVRpbWUubmFtZSwgSW5wdXREYXRlVGltZSk7XG5WdWUuY29tcG9uZW50KElucHV0Q29kZS5uYW1lLCBJbnB1dENvZGUpO1xuVnVlLmNvbXBvbmVudChJbnB1dFRpbWUubmFtZSwgSW5wdXRUaW1lKTtcblZ1ZS5jb21wb25lbnQoSW5wdXRDb2xvclBpY2tlci5uYW1lLCBJbnB1dENvbG9yUGlja2VyKTtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXG5cblZ1ZS5wcm90b3R5cGUuJG1vbWVudCA9IG1vbWVudDtcblZ1ZS5wcm90b3R5cGUuJG1vbWVudC5sb2NhbGUoJ25sJyk7XG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgVnVlUHJvZ3Jlc3NCYXIgZnJvbSAndnVlLXByb2dyZXNzYmFyJ1xuaW1wb3J0ICd2dWUtcHJvZ3Jlc3MtcGF0aC9kaXN0L3Z1ZS1wcm9ncmVzcy1wYXRoLmNzcydcbmltcG9ydCBWdWVQcm9ncmVzcyBmcm9tICd2dWUtcHJvZ3Jlc3MtcGF0aCdcblxuVnVlLnVzZShWdWVQcm9ncmVzcyk7XG5WdWUudXNlKFZ1ZVByb2dyZXNzQmFyLCB7XG4gICAgY29sb3I6ICcjZmZkNjAwJyxcbiAgICBmYWlsZWRDb2xvcjogJyNmNTM2NWMnLFxuICAgIHRoaWNrbmVzczogJzVweCcsXG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgICBzcGVlZDogJzAuMnMnLFxuICAgICAgICBvcGFjaXR5OiAnMC42cycsXG4gICAgICAgIHRlcm1pbmF0aW9uOiAzMDBcbiAgICB9XG59KTtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndnVlLXJvdXRlcic7XG5pbXBvcnQgcm91dGVzIGZyb20gJy4uL3JvdXRlcyc7XG5pbXBvcnQgT0F1dGggZnJvbSAnLi8uLi9vYXV0aCc7XG5cbmNvbnN0IHJvdXRlciA9IG5ldyBWdWVSb3V0ZXIoe1xuICAgIG1vZGU6ICdoaXN0b3J5JyxcbiAgICBiYXNlOiAnL2JldGEvJyxcbiAgICByb3V0ZXM6IHJvdXRlc1xufSk7XG5cblZ1ZS51c2UoVnVlUm91dGVyKTtcblxubGV0IG9BdXRoID0gbmV3IE9BdXRoKCk7XG5cbnJvdXRlci5iZWZvcmVFYWNoKCh0bywgZnJvbSwgbmV4dCkgPT4ge1xuICAgIC8vSWYgdmlzaXRpbmcgbG9naW4gdmlldyBidXQgeW91IGFscmVhZHkgaGF2ZSBsb2dnZWQgaW4sIHlvdSBzaG91bGQgbm90IGJlIGFibGUgdG8gc2VlIHRoaXMgdmlld1xuICAgIGlmICghdG8ubWV0YS5hdXRoICYmIG9BdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgICAgIHJldHVybiBuZXh0KHtcbiAgICAgICAgICAgIHBhdGg6ICcvJ1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vSWYgeW91IGFyZSB2aXNpdGluZyAnLycgYW5kIHlvdSBhcmUgYSBndWVzdCB0aGVuLCB5b3UgbXVzdCBiZSByZWRpcmVjdGVkIHRvIGxvZ2luXG4gICAgaWYgKHRvLm1ldGEuYXV0aCAmJiBvQXV0aC5ndWVzdCgpKSB7XG4gICAgICAgIHJldHVybiBuZXh0KHtcbiAgICAgICAgICAgIHBhdGg6ICcvbG9naW4nLFxuICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICByZWRpcmVjdDogdG8uZnVsbFBhdGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBpZih0by5tZXRhLmF1dGgpIHtcbiAgICAgICAgLy9cbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dCgpXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IHtDYXJkVGFibGVIZWFkZXIsIFZ1ZVRhYmxlfSBmcm9tICdAYml0L2Utc2l0ZXMudnVlLmdsb2JhbC50YWJsZSc7XG5cblZ1ZS5jb21wb25lbnQoQ2FyZFRhYmxlSGVhZGVyLm5hbWUsIENhcmRUYWJsZUhlYWRlcik7XG5WdWUuY29tcG9uZW50KFZ1ZVRhYmxlLm5hbWUsIFZ1ZVRhYmxlKTtcbiIsImltcG9ydCBBdXRoU2VydmljZSBmcm9tICcuL29hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IENvb2tpZXMgZnJvbSAnanMtY29va2llJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uID0gQ29va2llcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2dvdXRcbiAgICAgKi9cbiAgICBsb2dvdXQoKSB7XG4gICAgICAgIEF1dGhTZXJ2aWNlLmRlc3Ryb3lTZXNzaW9uKCk7XG5cbiAgICAgICAgdGhpcy5zZXNzaW9uLnJlbW92ZSgnYWNjZXNzX3Rva2VuJyk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbi5yZW1vdmUoJ3JlZnJlc2hfdG9rZW4nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHdWVzdCBjaGVja1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGd1ZXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXNzaW9uLmdldCgnYWNjZXNzX3Rva2VuJykgPT09IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB1c2VyIGlzIGxvZ2dlZCBpblxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzQXV0aGVudGljYXRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi5nZXQoJ2FjY2Vzc190b2tlbicpICE9PSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9naW4gdXNpbmcgdXNlcm5hbWUgYW5kIHBhc3N3b3JkXG4gICAgICogQHBhcmFtIHVzZXJuYW1lXG4gICAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBsb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIEF1dGhTZXJ2aWNlLmF0dGVtcHRMb2dpbih7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZVNlc3Npb24ocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRBdXRoSGVhZGVycygpO1xuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSlcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZnJlc2ggdGhlIGFjY2VzcyB0b2tlbiBvZiB0aGUgdXNlclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgcmVmcmVzaFRva2VuKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgQXV0aFNlcnZpY2UuYXR0ZW1wdExvZ2luKHtcbiAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiB0aGlzLnNlc3Npb24uZ2V0KCdyZWZyZXNoX3Rva2VuJylcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVTZXNzaW9uKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQXV0aEhlYWRlcnMoKTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHVzZXIgZnJvbSB0aGUgQVBJXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICAgKi9cbiAgICBnZXRVc2VyKCkge1xuICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBBdXRoU2VydmljZS5jdXJyZW50VXNlcigpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHJlc29sdmUobnVsbCkpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhdXRoZW50aWNhdGlvbiBoZWFkZXJcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBnZXRBdXRoSGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgbGV0IGFjY2Vzc190b2tlbiA9IHRoaXMuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJyk7XG5cbiAgICAgICAgICAgIHJldHVybiAnQmVhcmVyICcgKyBhY2Nlc3NfdG9rZW5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGl0ZW0gZnJvbSB0aGUgY29va2llc1xuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKi9cbiAgICBnZXRJdGVtKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXNzaW9uLmdldChrZXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhdXRoIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RzXG4gICAgICovXG4gICAgYWRkQXV0aEhlYWRlcnMoKSB7XG4gICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLmdldEF1dGhIZWFkZXIoKTtcblxuICAgICAgICBBdXRoU2VydmljZS5hZGRBdXRob3JpemF0aW9uSGVhZGVyKGhlYWRlcilcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSB0aGUgc2Vzc2lvbiBkYXRhXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgICBzdG9yZVNlc3Npb24oZGF0YSkge1xuICAgICAgICBsZXQgaG91ckluTWlsbGlTZWNvbmRzID0gODY0MDA7XG4gICAgICAgIGxldCB0aW1lID0gZGF0YS5leHBpcmVzX2luIC8gaG91ckluTWlsbGlTZWNvbmRzO1xuXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5zZXQoJ2FjY2Vzc190b2tlbicsIGRhdGEuYWNjZXNzX3Rva2VuLCB7XG4gICAgICAgICAgICBleHBpcmVzOiB0aW1lLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlc3Npb24uc2V0KCdyZWZyZXNoX3Rva2VuJywgZGF0YS5yZWZyZXNoX3Rva2VuLCB7XG4gICAgICAgICAgICBleHBpcmVzOiB0aW1lICogMixcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgdXNlcjogbnVsbCxcblxuICAgIGRlc3Ryb3lTZXNzaW9uKCkge1xuICAgICAgICB0aGlzLnVzZXIgPSBudWxsXG4gICAgfSxcblxuICAgIGFzeW5jIGN1cnJlbnRVc2VyKCkge1xuICAgICAgICBpZiAodGhpcy51c2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyXG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHVzZXIgPSBhd2FpdCB3aW5kb3cuYXhpb3MuZ2V0KCcvYXBpL3Z1ZS91c2Vycy9wcm9maWxlJyk7XG5cbiAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHJlc29sdmUodXNlcikpXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVqZWN0ID0+IHJlamVjdChlcnJvcikpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgYXR0ZW1wdExvZ2luKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCB3aW5kb3cuYXhpb3MucG9zdCgnL2FwaS92dWUvdXNlcnMvbG9naW4nLCBjcmVkZW50aWFscyk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiByZXNvbHZlKHJlc3BvbnNlKSlcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZWplY3QgPT4gcmVqZWN0KGVycm9yKSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhc3luYyByZWZyZXNoVG9rZW4ocGFyYW1zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCB3aW5kb3cuYXhpb3MucG9zdCgnL2FwaS92dWUvdXNlcnMvcmVmcmVzaCcsIHBhcmFtcyk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiByZXNvbHZlKHJlc3BvbnNlKSlcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZWplY3QgPT4gcmVqZWN0KGVycm9yKSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGRBdXRob3JpemF0aW9uSGVhZGVyKGhlYWRlcikge1xuICAgICAgICB3aW5kb3cuYXhpb3MuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ0F1dGhvcml6YXRpb24nXSA9IGhlYWRlclxuICAgIH1cbn1cbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCBhY2wgZnJvbSAnLi9hY2wnO1xuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcblxuVnVlLm1peGluKHtcbiAgZmlsdGVyczoge1xuICAgIGNhcGl0YWxpemU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG5cbiAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcblxuICAgICAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICByb3V0ZTogZnVuY3Rpb24odXJsLCBwYXJhbXMgPSB7fSkge1xuICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhwYXJhbXMpO1xuXG4gICAgICBmb3IobGV0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKGA6JHtrZXl9YCwgcGFyYW1zW2tleV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYC9hcGkvdnVlLyR7dXJsLnJlcGxhY2UoL15cXC8rL2csICcnKX1gO1xuICAgIH0sXG4gICAgc3VibWl0U3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kbWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgbWVzc2FnZTogJ0RlIGdlZ2V2ZW5zIHppam4gb3BnZXNsYWdlbidcbiAgICAgIH0pXG4gICAgfSxcbiAgICBzdWJtaXRFcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kbWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdFciBpcyBpZXRzIG1pcyBnZWdhYW4sIHByb2JlZXIgaGV0IG5vZ21hYWxzJ1xuICAgICAgfSlcbiAgICB9LFxuICAgIGNvbmZpcm06IGZ1bmN0aW9uICh0ZXh0LCB0aXRsZSwgY29uZmlybUJ1dHRvblRleHQgPSAnVmVyd2lqZGVyZW4nKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY29uZmlybSh0ZXh0LCB0aXRsZSwge1xuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogY29uZmlybUJ1dHRvblRleHQsXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdBbm51bGVyZW4nLFxuICAgICAgICB0eXBlOiAnd2FybmluZycsXG4gICAgICAgIGRhbmdlcm91c2x5VXNlSFRNTFN0cmluZzogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBpc0VtcHR5KHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBmb3JtYXRQcmljZSh2YWx1ZSkge1xuICAgICAgbGV0IHZhbCA9ICh2YWx1ZSAvIDEpLnRvRml4ZWQoMikucmVwbGFjZSgnLicsICcsJylcbiAgICAgIHJldHVybiB2YWwudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIilcbiAgICB9LFxuICAgIGRvd25sb2FkRmlsZSh1cmwsIG1ldGhvZCA9ICdnZXQnLCBkYXRhID0ge30pIHtcbiAgICAgIGF4aW9zKHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdibG9iJ1xuICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGxldCBmaWxlTmFtZSA9ICcnO1xuICAgICAgICBjb25zdCBkaXNwb3NpdGlvbiA9IHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtZGlzcG9zaXRpb24nXVxuXG4gICAgICAgIGlmIChkaXNwb3NpdGlvbiAmJiBkaXNwb3NpdGlvbi5pbmRleE9mKCdhdHRhY2htZW50JykgIT09IC0xKSB7XG4gICAgICAgICAgbGV0IGZpbGVuYW1lUmVnZXggPSAvZmlsZW5hbWVbXjs9XFxuXSo9KChbJ1wiXSkuKj9cXDJ8W147XFxuXSopLztcbiAgICAgICAgICBsZXQgbWF0Y2hlcyA9IGZpbGVuYW1lUmVnZXguZXhlYyhkaXNwb3NpdGlvbik7XG5cbiAgICAgICAgICBpZiAobWF0Y2hlc1sxXSkge1xuICAgICAgICAgICAgZmlsZU5hbWUgPSBtYXRjaGVzWzFdLnJlcGxhY2UoL1snXCJdL2csICcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbcmVzcG9uc2UuZGF0YV0pKTtcbiAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVOYW1lKTsgLy9vciBhbnkgb3RoZXIgZXh0ZW5zaW9uXG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgICAgbGluay5jbGljaygpO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pO1xuXG5WdWUuZmlsdGVyKCdjYXBpdGFsaXplJywgZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG5cbiAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG59KTtcblxuVnVlLmRpcmVjdGl2ZSgndXNlci1jYW4nLCBmdW5jdGlvbiAoZWwsIGJpbmRpbmdzLCB2bm9kZSkge1xuICBjb25zdCBiZWhhdmlvdXIgPSBiaW5kaW5ncy5tb2RpZmllcnMuZGlzYWJsZSA/ICdkaXNhYmxlJyA6ICdoaWRlJztcblxuICBpZiAoIWFjbC51c2VyQ2FuKGJpbmRpbmdzLnZhbHVlKSkge1xuICAgIGlmIChiZWhhdmlvdXIgPT09ICdoaWRlJykge1xuICAgICAgaGVscGVycy5jb21tZW50Tm9kZShlbCwgdm5vZGUpXG4gICAgfSBlbHNlIGlmIChiZWhhdmlvdXIgPT09ICdkaXNhYmxlJykge1xuICAgICAgZWwuZGlzYWJsZWQgPSB0cnVlXG4gICAgfVxuICB9XG59KTtcbiIsImltcG9ydCBhdXRoZW50aWNhdGlvbiBmcm9tICcuL21vZHVsZXMvYXV0aGVudGljYXRpb24nO1xuXG5jb25zdCByb3V0ZXMgPSBbe1xuICAgIHBhdGg6ICcvJyxcbiAgICBuYW1lOiAnZGFzaGJvYXJkJyxcbiAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uL3ZpZXdzL0Rhc2hib2FyZCcpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IGZhbHNlfSxcbn0sIHtcbiAgICBwYXRoOiAnKicsXG4gICAgbmFtZTogJzQwNCcsXG4gICAgY29tcG9uZW50OiByZXF1aXJlKCcuLi92aWV3cy9lcnJvcnMvTm90Rm91bmQnKS5kZWZhdWx0LFxuICAgIG1ldGE6IHthdXRoOiBmYWxzZX0sXG59XS5jb25jYXQoXG4gICAgYXV0aGVudGljYXRpb24sXG4pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXM7XG4iLCJleHBvcnQgZGVmYXVsdCBbe1xuICAgIHBhdGg6ICcvbG9naW4nLFxuICAgIG5hbWU6ICdsb2dpbicsXG4gICAgY29tcG9uZW50OiByZXF1aXJlKCcuLi8uLi92aWV3cy9hdXRoZW50aWNhdGlvbi9Mb2dpbicpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IGZhbHNlfVxufSwge1xuICAgIHBhdGg6ICcvcGFzc3dvcmQvZm9yZ290JyxcbiAgICBuYW1lOiAncGFzc3dvcmQuZm9yZ290JyxcbiAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4uLy4uL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0ZvcmdvdFBhc3N3b3JkJykuZGVmYXVsdCxcbiAgICBtZXRhOiB7YXV0aDogZmFsc2V9XG59LCB7XG4gICAgcGF0aDogJy9wYXNzd29yZC9yZXNldC86dG9rZW4nLFxuICAgIG5hbWU6ICdwYXNzd29yZC5yZXNldCcsXG4gICAgcHJvcHM6IHRydWUsXG4gICAgY29tcG9uZW50OiByZXF1aXJlKCcuLi8uLi92aWV3cy9hdXRoZW50aWNhdGlvbi9SZXNldFBhc3N3b3JkJykuZGVmYXVsdCxcbiAgICBtZXRhOiB7YXV0aDogZmFsc2V9XG59LCB7XG4gICAgcGF0aDogJy9yZWdpc3Rlci86dG9rZW4nLFxuICAgIG5hbWU6ICdyZWdpc3RlcicsXG4gICAgcHJvcHM6IHRydWUsXG4gICAgY29tcG9uZW50OiByZXF1aXJlKCcuLi8uLi92aWV3cy9hdXRoZW50aWNhdGlvbi9SZWdpc3RlcicpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IGZhbHNlfVxufV07XG4iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MGUwOTFmM2EmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0hvbWVzdGVhZC9Qcm9udG8vTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzBlMDkxZjNhJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzBlMDkxZjNhJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzBlMDkxZjNhJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTBlMDkxZjNhJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzBlMDkxZjNhJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJSZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9BcHAudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wZTA5MWYzYSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vRGFzaGJvYXJkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1jMWViYjA1NCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9EYXNoYm9hcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9EYXNoYm9hcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvdGhvbWFzcm9vdmVycy9EZXZlbG9wZXIvSG9tZXN0ZWFkL1Byb250by9Nb2JpbGVCdW5kbGUvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnYzFlYmIwNTQnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnYzFlYmIwNTQnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnYzFlYmIwNTQnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0Rhc2hib2FyZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YzFlYmIwNTQmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignYzFlYmIwNTQnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0Rhc2hib2FyZC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Rhc2hib2FyZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRGFzaGJvYXJkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9EYXNoYm9hcmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWMxZWJiMDU0JlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Gb3Jnb3RQYXNzd29yZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NTgwNWM3NTcmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vRm9yZ290UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Gb3Jnb3RQYXNzd29yZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9Ib21lc3RlYWQvUHJvbnRvL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc1ODA1Yzc1NycpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc1ODA1Yzc1NycsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc1ODA1Yzc1NycsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vRm9yZ290UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTU4MDVjNzU3JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzU4MDVjNzU3Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJSZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Gb3Jnb3RQYXNzd29yZC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZvcmdvdFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Gb3Jnb3RQYXNzd29yZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRm9yZ290UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTU4MDVjNzU3JlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9N2EyNWUxMDAmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vTG9naW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9Ib21lc3RlYWQvUHJvbnRvL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc3YTI1ZTEwMCcpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc3YTI1ZTEwMCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc3YTI1ZTEwMCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vTG9naW4udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdhMjVlMTAwJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzdhMjVlMTAwJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJSZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Mb2dpbi52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Mb2dpbi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTG9naW4udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdhMjVlMTAwJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9SZWdpc3Rlci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9N2Y0ZmQ5NWMmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUmVnaXN0ZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9SZWdpc3Rlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9Ib21lc3RlYWQvUHJvbnRvL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc3ZjRmZDk1YycpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc3ZjRmZDk1YycsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc3ZjRmZDk1YycsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vUmVnaXN0ZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdmNGZkOTVjJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzdmNGZkOTVjJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJSZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZWdpc3Rlci52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlZ2lzdGVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZWdpc3Rlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVnaXN0ZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdmNGZkOTVjJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9SZXNldFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wODcyNzVhMSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9SZXNldFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUmVzZXRQYXNzd29yZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9Ib21lc3RlYWQvUHJvbnRvL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcwODcyNzVhMScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcwODcyNzVhMScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcwODcyNzVhMScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vUmVzZXRQYXNzd29yZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MDg3Mjc1YTEmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMDg3Mjc1YTEnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL1Jlc2V0UGFzc3dvcmQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXNldFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXNldFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZXNldFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wODcyNzVhMSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vTm90Rm91bmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTMzY2UyNWQ2JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL05vdEZvdW5kLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vTm90Rm91bmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvdGhvbWFzcm9vdmVycy9EZXZlbG9wZXIvSG9tZXN0ZWFkL1Byb250by9Nb2JpbGVCdW5kbGUvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMzNjZTI1ZDYnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMzNjZTI1ZDYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMzNjZTI1ZDYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL05vdEZvdW5kLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zM2NlMjVkNiZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCczM2NlMjVkNicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvZXJyb3JzL05vdEZvdW5kLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTm90Rm91bmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL05vdEZvdW5kLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Ob3RGb3VuZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MzNjZTI1ZDYmXCIiLCI8dGVtcGxhdGU+XG4gICAgPGRpdj5cbiAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCIkcm91dGUubWV0YS5hdXRoXCI+XG4gICAgICAgICAgICA8aGVhZGVyLz5cblxuICAgICAgICAgICAgPG1haW4+XG4gICAgICAgICAgICAgICAgPGFzaWRlLz5cblxuICAgICAgICAgICAgICAgIDxtYWluPlxuICAgICAgICAgICAgICAgICAgICA8IS0tPGhlYWRlci8+LS0+XG5cbiAgICAgICAgICAgICAgICAgICAgPG1haW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLXZpZXcvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L21haW4+XG5cbiAgICAgICAgICAgICAgICAgICAgPGZvb3Rlci8+XG4gICAgICAgICAgICAgICAgPC9tYWluPlxuICAgICAgICAgICAgPC9tYWluPlxuICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICA8bWFpbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLXZpZXcvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9tYWluPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG5cbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7fVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQXBwLnZ1ZSBjcmVhdGVkJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYmVmb3JlUm91dGVFbnRlcih0bywgZnJvbSwgbmV4dCkge1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHt9LFxuXG4gICAgfVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICBDYXJkIHRpdGxlXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLy9cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBiZWZvcmVSb3V0ZUVudGVyKHRvLCBmcm9tLCBuZXh0KSB7XG4gICAgICAgIG5leHQoKTtcbiAgICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTIgY29sLW1kLTYgb2Zmc2V0LW1kLTMgY29sLWxnLTQgb2Zmc2V0LWxnLTRcIj5cbiAgICAgICAgPHZ1ZS1mb3JtXG4gICAgICAgICAgcmVmPVwiZm9ybVwiXG4gICAgICAgICAgOnVybD1cInJvdXRlKCd2dWUucGFzc3dvcmQuZm9yZ290JylcIlxuICAgICAgICAgIDptb2RlbD1cInVzZXJcIlxuICAgICAgICAgIEBzdWJtaXQ6c3VjY2Vzcz1cInN1Y2Nlc3NcIlxuICAgICAgICAgIEBzdWJtaXQ6ZXJyb3I9XCJzdWJtaXRFcnJvclwiXG4gICAgICAgID5cbiAgICAgICAgICA8dGVtcGxhdGUgc2xvdC1zY29wZT1cInsgZm9ybSwgbW9kZWwgfVwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICB2LWxvYWRpbmc9XCJmb3JtLnN1Ym1pdHRpbmdcIlxuICAgICAgICAgICAgICBjbGFzcz1cImNhcmRcIlxuICAgICAgICAgICAgICBlbGVtZW50LWxvYWRpbmctYmFja2dyb3VuZD1cInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIFdhY2h0d29vcmQgdmVyZ2V0ZW5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dC10ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFLW1haWxhZHJlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cImZvcm1cIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZvb3RlciBoYXMtYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxlbC1idXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIG5hdGl2ZS10eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBXYWNodHdvb3JkIHJlc2V0dGVuXG4gICAgICAgICAgICAgICAgPC9lbC1idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC92dWUtZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVzZXI6IHt9LFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgICB0aGlzLiRtZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVSBoZWVmdCBlZW4gZS1tYWlsIG9udHZhbmdlbiBvbSB1dyB3YWNodHdvb3JkIHRlIHJlc2V0dGVuJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRyZWZzLmZvcm0ucmVzZXQoKTtcbiAgICAgICAgfSxcbiAgICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTIgY29sLW1kLTYgb2Zmc2V0LW1kLTMgY29sLWxnLTQgb2Zmc2V0LWxnLTRcIj5cbiAgICAgICAgPHZ1ZS1mb3JtXG4gICAgICAgICAgOm1vZGVsPVwidXNlclwiXG4gICAgICAgICAgOnVybD1cInJvdXRlKCdhdXRoL2xvZ2luJylcIlxuICAgICAgICAgIEBzdWJtaXQ6c3VjY2Vzcz1cImF1dGhlbnRpY2F0ZWRcIlxuICAgICAgICAgIEBzdWJtaXQ6ZXJyb3I9XCJlcnJvclwiXG4gICAgICAgID5cbiAgICAgICAgICA8dGVtcGxhdGUgc2xvdC1zY29wZT1cInsgZm9ybSwgbW9kZWwgfVwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICB2LWxvYWRpbmc9XCJmb3JtLnN1Ym1pdHRpbmdcIlxuICAgICAgICAgICAgICBjbGFzcz1cImNhcmRcIlxuICAgICAgICAgICAgICBlbGVtZW50LWxvYWRpbmctYmFja2dyb3VuZD1cInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIElubG9nZ2VuXG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0LXRleHRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRS1tYWlsYWRyZXNcIlxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRS1tYWlsYWRyZXNcIlxuICAgICAgICAgICAgICAgICAgICAgIDptb2RlbD1cIm1vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cImZvcm1cIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0LXBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIldhY2h0d29vcmRcIlxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV2FjaHR3b29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwibW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZWwtYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZS10eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIElubG9nZ2VuXG4gICAgICAgICAgICAgICAgICAgIDwvZWwtYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZWwtYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cInJlc2V0UGFzc3dvcmQoKVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBXYWNodHdvb3JkIHZlcmdldGVuXG4gICAgICAgICAgICAgICAgICAgIDwvZWwtYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC92dWUtZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICBlbWFpbDogbnVsbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICBhdXRoZW50aWNhdGVkKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyB0aGlzLiRvYXV0aC5zdG9yZVNlc3Npb24ocmVzcG9uc2UpO1xuICAgICAgICAgICAgLy8gdGhpcy4kb2F1dGguYWRkQXV0aEhlYWRlcnMoKTtcblxuICAgICAgICAgICAgLy8gdGhpcy4kcm91dGVyLnJlcGxhY2Uoe25hbWU6ICdkYXNoYm9hcmQnfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZXJyb3IoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gdGhpcy51c2VyLnBhc3N3b3JkID0gbnVsbDtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBsZXQgbWVzc2FnZSA9ICdFciBpcyBpZXRzIG1pcyBnZWdhYW4sIHByb2JlZXIgaGV0IG9wbmlldXcnO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGlmIChlcnJvci5zdGF0dXMgPT09IDQyMikge1xuICAgICAgICAgICAgLy8gICBtZXNzYWdlID0gJ0RlIGluZ2V2b2VyZGUgZ2VnZXZlbnMgemlqbiBvbmp1aXN0JztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSxcblxuICAgICAgICByZXNldFBhc3N3b3JkKCkge1xuICAgICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goe25hbWU6ICdwYXNzd29yZC5mb3Jnb3QnfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgdi1pZj1cInVzZXJcIlxuICAgICAgICBjbGFzcz1cImNvbC1zbS0xMiBjb2wtbWQtNiBvZmZzZXQtbWQtMyBjb2wtbGctNCBvZmZzZXQtbGctNFwiXG4gICAgICA+XG4gICAgICAgIDx2dWUtZm9ybVxuICAgICAgICAgIDptb2RlbD1cInVzZXJcIlxuICAgICAgICAgIDp1cmw9XCJyb3V0ZSgndnVlLnJlZ2lzdGVyJylcIlxuICAgICAgICAgIEBzdWJtaXQ6c3VjY2Vzcz1cInJlZ2lzdHJhdGVkXCJcbiAgICAgICAgICBAc3VibWl0OmVycm9yPVwiZXJyb3JcIlxuICAgICAgICA+XG4gICAgICAgICAgPHRlbXBsYXRlIHNsb3Qtc2NvcGU9XCJ7IGZvcm0sIG1vZGVsIH1cIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgdi1sb2FkaW5nPVwiZm9ybS5zdWJtaXR0aW5nXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJjYXJkXCJcbiAgICAgICAgICAgICAgZWxlbWVudC1sb2FkaW5nLWJhY2tncm91bmQ9XCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICBSZWdpc3RyZXJlblxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBtYXJnaW4tYm90dG9tLXNtXCI+XG4gICAgICAgICAgICAgICAgICA8ZWwtYWxlcnRcbiAgICAgICAgICAgICAgICAgICAgdi1pZj1cImFjdGl2YXRlZFwiXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiVXcgYWNjb3VudCBpcyBnZWFjdGl2ZWVyZCwgdSBrdW50IG51IGlubG9nZ2VuIGluIGRlIGFwcFwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJzdWNjZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgOmNsb3NhYmxlPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0LXRleHRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwiZmlyc3RfbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJWb29ybmFhbVwiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJWb29ybmFhbVwiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwibW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0LXRleHRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwibGFzdF9uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkFjaHRlcm5hYW1cIlxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQWNodGVybmFhbVwiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwibW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0LXBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIldhY2h0d29vcmRcIlxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV2FjaHR3b29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwibW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0LXBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkX2NvbmZpcm1hdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJXYWNodHdvb3JkIGJldmVzdGlnZW5cIlxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV2FjaHR3b29yZCBiZXZlc3RpZ2VuXCJcbiAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1mb290ZXIgaGFzLWJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICA8ZWwtYnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICBuYXRpdmUtdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgUmVnaXN0cmVyZW5cbiAgICAgICAgICAgICAgICA8L2VsLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3Z1ZS1mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICBwcm9wczoge1xuICAgIHRva2VuOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9XG4gIH0sXG5cbiAgYmVmb3JlUm91dGVFbnRlcih0bywgZnJvbSwgbmV4dCkge1xuICAgIGF4aW9zLmdldChgJHt0by5wYXJhbXMudG9rZW59YCkudGhlbigoe2RhdGE6IHtkYXRhOiB1c2VyfX0pID0+IHtcbiAgICAgIG5leHQodm0gPT4ge1xuICAgICAgICB2bS51c2VyID0gdXNlcjtcbiAgICAgIH0pO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIG5leHQoKTtcbiAgICB9KVxuICB9LFxuXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXI6IG51bGwsXG4gICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRlZDogZmFsc2VcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuXG4gICAgcmVnaXN0cmF0ZWQocmVzcG9uc2UpIHtcbiAgICAgIGlmICghcmVzcG9uc2UuYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51c2VyID0ge307XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLiRvYXV0aC5zdG9yZVNlc3Npb24ocmVzcG9uc2UpO1xuICAgICAgdGhpcy4kb2F1dGguYWRkQXV0aEhlYWRlcnMoKTtcblxuICAgICAgdGhpcy4kcm91dGVyLnJlcGxhY2Uoe25hbWU6ICdkYXNoYm9hcmQnfSk7XG5cbiAgICAgIEV2ZW50cy4kZW1pdCgndXNlcnM6YXV0aGVudGljYXRlZCcpO1xuICAgIH0sXG5cbiAgICBlcnJvcihlcnJvcikge1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnVzZXIucGFzc3dvcmQgPSBudWxsO1xuICAgICAgdGhpcy51c2VyLnBhc3N3b3JkX2NvbmZpcm1hdGlvbiA9IG51bGw7XG5cbiAgICAgIHRoaXMuJG1lc3NhZ2Uoe1xuICAgICAgICBtZXNzYWdlOiAnRXIgaXMgaWV0cyBtaXMgZ2VnYWFuLCBwcm9iZWVyIGhldCBvcG5pZXV3JyxcbiAgICAgICAgdHlwZTogJ2Vycm9yJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgdi1pZj1cImFjdGlvblwiXG4gICAgICAgIGNsYXNzPVwiY29sLXNtLTEyIGNvbC1tZC02IG9mZnNldC1tZC0zIGNvbC1sZy00IG9mZnNldC1sZy00XCJcbiAgICAgID5cbiAgICAgICAgPHZ1ZS1mb3JtXG4gICAgICAgICAgcmVmPVwiZm9ybVwiXG4gICAgICAgICAgOnVybD1cInJvdXRlKCd2dWUucGFzc3dvcmQucmVzZXQnKVwiXG4gICAgICAgICAgOm1vZGVsPVwiYWN0aW9uXCJcbiAgICAgICAgICBAc3VibWl0OnN1Y2Nlc3M9XCJsb2dpblwiXG4gICAgICAgICAgQHN1Ym1pdDplcnJvcj1cInN1Ym1pdEVycm9yXCJcbiAgICAgICAgPlxuICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90LXNjb3BlPVwieyBmb3JtLCBtb2RlbCB9XCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHYtbG9hZGluZz1cImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FyZFwiXG4gICAgICAgICAgICAgIGVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kPVwicmdiYSgyNDgsMjUwLDI1MiwwLjYpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgV2FjaHR3b29yZCByZXNldHRlblxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGVsLWFsZXJ0XG4gICAgICAgICAgICAgICAgICB2LWlmPVwiYXBwUGFzc3dvcmRDaGFuZ2VkXCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiVXcgd2FjaHR3b29yZCBpcyBnZXdpanppZ2QsIHUga3VudCBudSBpbmxvZ2dlbiBpbiBkZSBhcHBcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Y2Nlc3NcIlxuICAgICAgICAgICAgICAgICAgc2hvdy1pY29uXG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV2FjaHR3b29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwibW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRfY29uZmlybWF0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIldhY2h0d29vcmQgYmV2ZXN0aWdlblwiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwibW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZm9vdGVyIGhhcy1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgPGVsLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgbmF0aXZlLXR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFdhY2h0d29vcmQgcmVzZXR0ZW5cbiAgICAgICAgICAgICAgICA8L2VsLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3Z1ZS1mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwcm9wczoge1xuICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWN0aW9uOiBudWxsLFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICBhcHBQYXNzd29yZENoYW5nZWQ6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYmVmb3JlUm91dGVFbnRlcih0bywgZnJvbSwgbmV4dCkge1xuICAgICAgICBheGlvcy5nZXQodGhpcy5yb3V0ZSgnL3VzZXJzL3Bhc3N3b3JkLzp0b2tlbicsIHt0b2tlbjogdG8ucGFyYW1zLnRva2VufSkpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgbmV4dCh2bSA9PiB7XG4gICAgICAgICAgICAgICAgdm0uYWN0aW9uID0gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIG5leHQodm0gPT4ge1xuICAgICAgICAgICAgICAgIHZtLiRyb3V0ZXIucmVwbGFjZSh7bmFtZTogJ2xvZ2luJ30pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy4kbWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLnJlc3BvbnNlLmRhdGEubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgbG9naW4ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRvYXV0aC5zdG9yZVNlc3Npb24ocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuJG9hdXRoLmFkZEF1dGhIZWFkZXJzKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCgnZGFzaGJvYXJkJyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRtZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ1V3IHdhY2h0d29vcmQgaXMgZ2V3aWp6aWdkJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBFdmVudHMuJGVtaXQoJ3VzZXJzOmF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBQYXNzd29yZENoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMuZm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGVycm9yKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy4kbWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIFdob29wcywgNDA0LlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbn1cbjwvc2NyaXB0PiIsInZhciBtYXAgPSB7XG5cdFwiLi9hZlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYWYuanNcIixcblx0XCIuL2FmLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hZi5qc1wiLFxuXHRcIi4vYXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLmpzXCIsXG5cdFwiLi9hci1kelwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItZHouanNcIixcblx0XCIuL2FyLWR6LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1kei5qc1wiLFxuXHRcIi4vYXIta3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWt3LmpzXCIsXG5cdFwiLi9hci1rdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIta3cuanNcIixcblx0XCIuL2FyLWx5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1seS5qc1wiLFxuXHRcIi4vYXItbHkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWx5LmpzXCIsXG5cdFwiLi9hci1tYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbWEuanNcIixcblx0XCIuL2FyLW1hLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1tYS5qc1wiLFxuXHRcIi4vYXItc2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXNhLmpzXCIsXG5cdFwiLi9hci1zYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItc2EuanNcIixcblx0XCIuL2FyLXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci10bi5qc1wiLFxuXHRcIi4vYXItdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXRuLmpzXCIsXG5cdFwiLi9hci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIuanNcIixcblx0XCIuL2F6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hei5qc1wiLFxuXHRcIi4vYXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2F6LmpzXCIsXG5cdFwiLi9iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmUuanNcIixcblx0XCIuL2JlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZS5qc1wiLFxuXHRcIi4vYmdcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JnLmpzXCIsXG5cdFwiLi9iZy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmcuanNcIixcblx0XCIuL2JtXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibS5qc1wiLFxuXHRcIi4vYm0uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JtLmpzXCIsXG5cdFwiLi9iblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm4uanNcIixcblx0XCIuL2JuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibi5qc1wiLFxuXHRcIi4vYm9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JvLmpzXCIsXG5cdFwiLi9iby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm8uanNcIixcblx0XCIuL2JyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ici5qc1wiLFxuXHRcIi4vYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JyLmpzXCIsXG5cdFwiLi9ic1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnMuanNcIixcblx0XCIuL2JzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9icy5qc1wiLFxuXHRcIi4vY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NhLmpzXCIsXG5cdFwiLi9jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY2EuanNcIixcblx0XCIuL2NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jcy5qc1wiLFxuXHRcIi4vY3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NzLmpzXCIsXG5cdFwiLi9jdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3YuanNcIixcblx0XCIuL2N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jdi5qc1wiLFxuXHRcIi4vY3lcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N5LmpzXCIsXG5cdFwiLi9jeS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3kuanNcIixcblx0XCIuL2RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kYS5qc1wiLFxuXHRcIi4vZGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RhLmpzXCIsXG5cdFwiLi9kZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUuanNcIixcblx0XCIuL2RlLWF0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1hdC5qc1wiLFxuXHRcIi4vZGUtYXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWF0LmpzXCIsXG5cdFwiLi9kZS1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtY2guanNcIixcblx0XCIuL2RlLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1jaC5qc1wiLFxuXHRcIi4vZGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLmpzXCIsXG5cdFwiLi9kdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZHYuanNcIixcblx0XCIuL2R2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kdi5qc1wiLFxuXHRcIi4vZWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VsLmpzXCIsXG5cdFwiLi9lbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZWwuanNcIixcblx0XCIuL2VuLVNHXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1TRy5qc1wiLFxuXHRcIi4vZW4tU0cuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLVNHLmpzXCIsXG5cdFwiLi9lbi1hdVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tYXUuanNcIixcblx0XCIuL2VuLWF1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWNhLmpzXCIsXG5cdFwiLi9lbi1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWdiXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1nYi5qc1wiLFxuXHRcIi4vZW4tZ2IuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1pZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWUuanNcIixcblx0XCIuL2VuLWllLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWlsLmpzXCIsXG5cdFwiLi9lbi1pbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLW56XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1uei5qc1wiLFxuXHRcIi4vZW4tbnouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW8uanNcIixcblx0XCIuL2VvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9lcy1kb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtZG8uanNcIixcblx0XCIuL2VzLWRvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtdXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLXVzLmpzXCIsXG5cdFwiLi9lcy11cy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy5qc1wiLFxuXHRcIi4vZXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V0LmpzXCIsXG5cdFwiLi9ldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldS5qc1wiLFxuXHRcIi4vZXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9mYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmEuanNcIixcblx0XCIuL2ZhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZpLmpzXCIsXG5cdFwiLi9maS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mby5qc1wiLFxuXHRcIi4vZm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2ZyLWNhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jYS5qc1wiLFxuXHRcIi4vZnItY2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2guanNcIixcblx0XCIuL2ZyLWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLmpzXCIsXG5cdFwiLi9meVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnkuanNcIixcblx0XCIuL2Z5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZ2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dhLmpzXCIsXG5cdFwiLi9nYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2EuanNcIixcblx0XCIuL2dkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nZC5qc1wiLFxuXHRcIi4vZ2QuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2wuanNcIixcblx0XCIuL2dsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ29tLWxhdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dvbS1sYXRuLmpzXCIsXG5cdFwiLi9nb20tbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2d1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ndS5qc1wiLFxuXHRcIi4vZ3UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9oZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGUuanNcIixcblx0XCIuL2hlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hpLmpzXCIsXG5cdFwiLi9oaS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oci5qc1wiLFxuXHRcIi4vaHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9odVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHUuanNcIixcblx0XCIuL2h1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHktYW1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h5LWFtLmpzXCIsXG5cdFwiLi9oeS1hbS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2lkXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pZC5qc1wiLFxuXHRcIi4vaWQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXMuanNcIixcblx0XCIuL2lzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2l0LmpzXCIsXG5cdFwiLi9pdC1jaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQtY2guanNcIixcblx0XCIuL2l0LWNoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC1jaC5qc1wiLFxuXHRcIi4vaXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2l0LmpzXCIsXG5cdFwiLi9qYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvamEuanNcIixcblx0XCIuL2phLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qYS5qc1wiLFxuXHRcIi4vanZcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2p2LmpzXCIsXG5cdFwiLi9qdi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvanYuanNcIixcblx0XCIuL2thXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rYS5qc1wiLFxuXHRcIi4va2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2thLmpzXCIsXG5cdFwiLi9ra1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2suanNcIixcblx0XCIuL2trLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ray5qc1wiLFxuXHRcIi4va21cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ttLmpzXCIsXG5cdFwiLi9rbS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva20uanNcIixcblx0XCIuL2tuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbi5qc1wiLFxuXHRcIi4va24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tuLmpzXCIsXG5cdFwiLi9rb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva28uanNcIixcblx0XCIuL2tvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rby5qc1wiLFxuXHRcIi4va3VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t1LmpzXCIsXG5cdFwiLi9rdS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva3UuanNcIixcblx0XCIuL2t5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9reS5qc1wiLFxuXHRcIi4va3kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9sYlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbGIuanNcIixcblx0XCIuL2xiLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xvLmpzXCIsXG5cdFwiLi9sby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2x0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdC5qc1wiLFxuXHRcIi4vbHQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHYuanNcIixcblx0XCIuL2x2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbWVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21lLmpzXCIsXG5cdFwiLi9tZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21pXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9taS5qc1wiLFxuXHRcIi4vbWkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9ta1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWsuanNcIixcblx0XCIuL21rLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21sLmpzXCIsXG5cdFwiLi9tbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbi5qc1wiLFxuXHRcIi4vbW4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXIuanNcIixcblx0XCIuL21yLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tcy1teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMtbXkuanNcIixcblx0XCIuL21zLW15LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLmpzXCIsXG5cdFwiLi9tdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXQuanNcIixcblx0XCIuL210LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL215LmpzXCIsXG5cdFwiLi9teS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL25iXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uYi5qc1wiLFxuXHRcIi4vbmIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmUuanNcIixcblx0XCIuL25lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ubC1iZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwtYmUuanNcIixcblx0XCIuL25sLWJlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLmpzXCIsXG5cdFwiLi9ublwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbm4uanNcIixcblx0XCIuL25uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vcGEtaW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BhLWluLmpzXCIsXG5cdFwiLi9wYS1pbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wbC5qc1wiLFxuXHRcIi4vcGwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3B0LWJyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC1ici5qc1wiLFxuXHRcIi4vcHQtYnIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQuanNcIixcblx0XCIuL3JvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9yby5qc1wiLFxuXHRcIi4vcm8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9ydVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcnUuanNcIixcblx0XCIuL3J1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vc2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NkLmpzXCIsXG5cdFwiLi9zZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZS5qc1wiLFxuXHRcIi4vc2UuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2kuanNcIixcblx0XCIuL3NpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2tcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NrLmpzXCIsXG5cdFwiLi9zay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zbC5qc1wiLFxuXHRcIi4vc2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zcVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3EuanNcIixcblx0XCIuL3NxLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLmpzXCIsXG5cdFwiLi9zci1jeXJsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci1jeXJsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci1jeXJsLmpzXCIsXG5cdFwiLi9zci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcy5qc1wiLFxuXHRcIi4vc3MuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3YuanNcIixcblx0XCIuL3N2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N3LmpzXCIsXG5cdFwiLi9zdy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3RhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90YS5qc1wiLFxuXHRcIi4vdGEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90ZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGUuanNcIixcblx0XCIuL3RlLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGV0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RldC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGV0LmpzXCIsXG5cdFwiLi90Z1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGcuanNcIixcblx0XCIuL3RnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RoLmpzXCIsXG5cdFwiLi90aC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RsLXBoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bC1waC5qc1wiLFxuXHRcIi4vdGwtcGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdGxoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90bGguanNcIixcblx0XCIuL3RyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ci5qc1wiLFxuXHRcIi4vdHIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90emxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHpsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90emwuanNcIixcblx0XCIuL3R6bVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLmpzXCIsXG5cdFwiLi90em0tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHptLWxhdG4uanNcIixcblx0XCIuL3R6bS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3VnLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91Zy1jbi5qc1wiLFxuXHRcIi4vdWctY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91a1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWsuanNcIixcblx0XCIuL3VrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdXJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VyLmpzXCIsXG5cdFwiLi91ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3V6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei5qc1wiLFxuXHRcIi4vdXotbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXotbGF0bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXotbGF0bi5qc1wiLFxuXHRcIi4vdXouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi92aVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdmkuanNcIixcblx0XCIuL3ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4veC1wc2V1ZG9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3gtcHNldWRvLmpzXCIsXG5cdFwiLi94LXBzZXVkby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3lvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS95by5qc1wiLFxuXHRcIi4veW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi96aC1jblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtY24uanNcIixcblx0XCIuL3poLWNuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtaGtcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWhrLmpzXCIsXG5cdFwiLi96aC1oay5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLXR3XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC10dy5qc1wiLFxuXHRcIi4vemgtdHcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUgc3luYyByZWN1cnNpdmUgXlxcXFwuXFxcXC8uKiRcIjsiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgW1xuICAgICAgX3ZtLiRyb3V0ZS5tZXRhLmF1dGhcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBfYyhcImhlYWRlclwiKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcIm1haW5cIiwgW1xuICAgICAgICAgICAgICBfYyhcImFzaWRlXCIpLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcIm1haW5cIiwgW1xuICAgICAgICAgICAgICAgIF9jKFwibWFpblwiLCBbXG4gICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbnRhaW5lci1mbHVpZFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW19jKFwicm91dGVyLXZpZXdcIildLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcImZvb3RlclwiKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdXG4gICAgICAgIDogW1xuICAgICAgICAgICAgX2MoXCJtYWluXCIsIFtcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250YWluZXItZmx1aWRcIiB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTJcIiB9LFxuICAgICAgICAgICAgICAgICAgICBbX2MoXCJyb3V0ZXItdmlld1wiKV0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdXG4gICAgXSxcbiAgICAyXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF92bS5fbSgwKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtcbiAgZnVuY3Rpb24oKSB7XG4gICAgdmFyIF92bSA9IHRoaXNcbiAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sIFtcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkXCIgfSwgW1xuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1oZWFkZXJcIiB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoXCJcXG4gICAgICAgIENhcmQgdGl0bGVcXG4gICAgICBcIilcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1ib2R5XCIgfSlcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgXSlcbiAgfVxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGFpbmVyLWZsdWlkXCIgfSwgW1xuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyIGNvbC1tZC02IG9mZnNldC1tZC0zIGNvbC1sZy00IG9mZnNldC1sZy00XCIgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwidnVlLWZvcm1cIiwge1xuICAgICAgICAgICAgcmVmOiBcImZvcm1cIixcbiAgICAgICAgICAgIGF0dHJzOiB7IHVybDogX3ZtLnJvdXRlKFwidnVlLnBhc3N3b3JkLmZvcmdvdFwiKSwgbW9kZWw6IF92bS51c2VyIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBcInN1Ym1pdDpzdWNjZXNzXCI6IF92bS5zdWNjZXNzLFxuICAgICAgICAgICAgICBcInN1Ym1pdDplcnJvclwiOiBfdm0uc3VibWl0RXJyb3JcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSByZWYuZm9ybVxuICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gcmVmLm1vZGVsXG4gICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1sb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZvcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kXCI6IFwicmdiYSgyNDgsMjUwLDI1MiwwLjYpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1oZWFkZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgV2FjaHR3b29yZCB2ZXJnZXRlblxcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1ib2R5XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tcm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1ncm91cFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0LXRleHRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbWFpbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJFLW1haWxhZHJlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmQtZm9vdGVyIGhhcy1idXR0b25zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hdGl2ZS10eXBlXCI6IFwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgIFdhY2h0d29vcmQgcmVzZXR0ZW5cXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbnRhaW5lci1mbHVpZFwiIH0sIFtcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMiBjb2wtbWQtNiBvZmZzZXQtbWQtMyBjb2wtbGctNCBvZmZzZXQtbGctNFwiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcInZ1ZS1mb3JtXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IG1vZGVsOiBfdm0udXNlciwgdXJsOiBfdm0ucm91dGUoXCJhdXRoL2xvZ2luXCIpIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBcInN1Ym1pdDpzdWNjZXNzXCI6IF92bS5hdXRoZW50aWNhdGVkLFxuICAgICAgICAgICAgICBcInN1Ym1pdDplcnJvclwiOiBfdm0uZXJyb3JcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSByZWYuZm9ybVxuICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gcmVmLm1vZGVsXG4gICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1sb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZvcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kXCI6IFwicmdiYSgyNDgsMjUwLDI1MiwwLjYpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1oZWFkZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIlxcbiAgICAgICAgICAgICAgSW5sb2dnZW5cXG4gICAgICAgICAgICBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1ib2R5XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tcm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dC10ZXh0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbWFpbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRS1tYWlsYWRyZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkUtbWFpbGFkcmVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tcm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dC1wYXNzd29yZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIldhY2h0d29vcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIldhY2h0d29vcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1mb290ZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYXRpdmUtdHlwZVwiOiBcInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICBJbmxvZ2dlblxcbiAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1hdXRvXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInRleHRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ucmVzZXRQYXNzd29yZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgICAgIFdhY2h0d29vcmQgdmVyZ2V0ZW5cXG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGFpbmVyLWZsdWlkXCIgfSwgW1xuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgX3ZtLnVzZXJcbiAgICAgICAgPyBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMiBjb2wtbWQtNiBvZmZzZXQtbWQtMyBjb2wtbGctNCBvZmZzZXQtbGctNFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInZ1ZS1mb3JtXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczogeyBtb2RlbDogX3ZtLnVzZXIsIHVybDogX3ZtLnJvdXRlKFwidnVlLnJlZ2lzdGVyXCIpIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIFwic3VibWl0OnN1Y2Nlc3NcIjogX3ZtLnJlZ2lzdHJhdGVkLFxuICAgICAgICAgICAgICAgICAgXCJzdWJtaXQ6ZXJyb3JcIjogX3ZtLmVycm9yXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IHJlZi5mb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSByZWYubW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LWxvYWRpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZm9ybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZm9ybS5zdWJtaXR0aW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNhcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudC1sb2FkaW5nLWJhY2tncm91bmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtaGVhZGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgIFJlZ2lzdHJlcmVuXFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWJvZHlcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJyb3cgbWFyZ2luLWJvdHRvbS1zbVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmFjdGl2YXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFwiZWwtYWxlcnRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVdyBhY2NvdW50IGlzIGdlYWN0aXZlZXJkLCB1IGt1bnQgbnUgaW5sb2dnZW4gaW4gZGUgYXBwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zYWJsZTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dC10ZXh0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmaXJzdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJWb29ybmFhbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiVm9vcm5hYW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dC10ZXh0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsYXN0X25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFjaHRlcm5hYW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkFjaHRlcm5hYW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dC1wYXNzd29yZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIldhY2h0d29vcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIldhY2h0d29vcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dC1wYXNzd29yZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGFzc3dvcmRfY29uZmlybWF0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJXYWNodHdvb3JkIGJldmVzdGlnZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIldhY2h0d29vcmQgYmV2ZXN0aWdlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1mb290ZXIgaGFzLWJ1dHRvbnNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmF0aXZlLXR5cGVcIjogXCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgUmVnaXN0cmVyZW5cXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAzODc3MDI1NzE4XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIDogX3ZtLl9lKClcbiAgICBdKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250YWluZXItZmx1aWRcIiB9LCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgICBfdm0uYWN0aW9uXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjb2wtc20tMTIgY29sLW1kLTYgb2Zmc2V0LW1kLTMgY29sLWxnLTQgb2Zmc2V0LWxnLTRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2dWUtZm9ybVwiLCB7XG4gICAgICAgICAgICAgICAgcmVmOiBcImZvcm1cIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgdXJsOiBfdm0ucm91dGUoXCJ2dWUucGFzc3dvcmQucmVzZXRcIiksXG4gICAgICAgICAgICAgICAgICBtb2RlbDogX3ZtLmFjdGlvblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgIFwic3VibWl0OnN1Y2Nlc3NcIjogX3ZtLmxvZ2luLFxuICAgICAgICAgICAgICAgICAgXCJzdWJtaXQ6ZXJyb3JcIjogX3ZtLnN1Ym1pdEVycm9yXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IHJlZi5mb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSByZWYubW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LWxvYWRpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZm9ybS5zdWJtaXR0aW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZm9ybS5zdWJtaXR0aW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNhcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudC1sb2FkaW5nLWJhY2tncm91bmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtaGVhZGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgIFdhY2h0d29vcmQgcmVzZXR0ZW5cXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjYXJkLWJvZHlcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmFwcFBhc3N3b3JkQ2hhbmdlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImVsLWFsZXJ0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXcgd2FjaHR3b29yZCBpcyBnZXdpanppZ2QsIHUga3VudCBudSBpbmxvZ2dlbiBpbiBkZSBhcHBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93LWljb25cIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tcm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtcGFzc3dvcmRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJXYWNodHdvb3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZm9ybS1yb3dcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dC1wYXNzd29yZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhc3N3b3JkX2NvbmZpcm1hdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIldhY2h0d29vcmQgYmV2ZXN0aWdlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjYXJkLWZvb3RlciBoYXMtYnV0dG9uc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYXRpdmUtdHlwZVwiOiBcInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICBXYWNodHdvb3JkIHJlc2V0dGVuXFxuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgMTcyODIwNjYwNVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpXG4gICAgXSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIFtfdm0uX3YoXCJcXG4gIFdob29wcywgNDA0LlxcblwiKV0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9Il0sInNvdXJjZVJvb3QiOiIifQ==