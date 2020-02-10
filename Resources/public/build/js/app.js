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
/* harmony import */ var _libraries_fontawesome__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./libraries/fontawesome */ "./Resources/assets/vue/libraries/fontawesome.js");
/* harmony import */ var _libraries_form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./libraries/form */ "./Resources/assets/vue/libraries/form.js");
/* harmony import */ var _libraries_moment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./libraries/moment */ "./Resources/assets/vue/libraries/moment.js");
/* harmony import */ var _libraries_progressbar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./libraries/progressbar */ "./Resources/assets/vue/libraries/progressbar.js");
/* harmony import */ var _libraries_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./libraries/router */ "./Resources/assets/vue/libraries/router.js");
/* harmony import */ var _libraries_table__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./libraries/table */ "./Resources/assets/vue/libraries/table.js");










 // import './libraries/auth';
// import './libraries/draggable';



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
new vue__WEBPACK_IMPORTED_MODULE_7__["default"]({
  el: '#app',
  components: {
    App: _views_App__WEBPACK_IMPORTED_MODULE_10__["default"]
  },
  router: _libraries_router__WEBPACK_IMPORTED_MODULE_16__["default"]
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
    { staticClass: "container-fluid" },
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
                  _c("div", { staticClass: "row" }, [
                    _c(
                      "div",
                      { staticClass: "col-sm-12" },
                      [_c("router-view")],
                      1
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("footer")
              ])
            ])
          ]
        : [
            _c("main", [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-sm-12" }, [_c("router-view")], 1)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvYWNsLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9ib290c3RyYXAuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvY29tcG9uZW50cyBzeW5jIFxcLnZ1ZSQvIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvaW50ZXJjZXB0b3JzL2F4aW9zLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2xpYnJhcmllcy9lbGVtZW50LmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2xpYnJhcmllcy9mb250YXdlc29tZS5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9saWJyYXJpZXMvZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9saWJyYXJpZXMvbW9tZW50LmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2xpYnJhcmllcy9wcm9ncmVzc2Jhci5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9saWJyYXJpZXMvcm91dGVyLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL2xpYnJhcmllcy90YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9vYXV0aC5qcyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS9vYXV0aC5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3BsdWdpbnMuanMiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvcm91dGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3JvdXRlcy9tb2R1bGVzL2F1dGhlbnRpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0FwcC52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvQXBwLnZ1ZT8zNTQ2Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0FwcC52dWU/MGU0OCIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9EYXNoYm9hcmQudnVlIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0Rhc2hib2FyZC52dWU/OGU5MCIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9EYXNoYm9hcmQudnVlP2Q4MTkiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vRm9yZ290UGFzc3dvcmQudnVlIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0ZvcmdvdFBhc3N3b3JkLnZ1ZT9hOWI4Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0ZvcmdvdFBhc3N3b3JkLnZ1ZT9jYTJhIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL0xvZ2luLnZ1ZSIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Mb2dpbi52dWU/ZWQ3ZiIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Mb2dpbi52dWU/ZDhlMyIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZWdpc3Rlci52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVnaXN0ZXIudnVlP2UyZDYiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVnaXN0ZXIudnVlP2ZhMTIiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVzZXRQYXNzd29yZC52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVzZXRQYXNzd29yZC52dWU/NmU2OCIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZXNldFBhc3N3b3JkLnZ1ZT81MDhjIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2Vycm9ycy9Ob3RGb3VuZC52dWUiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvZXJyb3JzL05vdEZvdW5kLnZ1ZT85OGI3Iiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2Vycm9ycy9Ob3RGb3VuZC52dWU/NDM3MSIsIndlYnBhY2s6Ly8vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvQXBwLnZ1ZSIsIndlYnBhY2s6Ly8vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvRGFzaGJvYXJkLnZ1ZSIsIndlYnBhY2s6Ly8vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vRm9yZ290UGFzc3dvcmQudnVlIiwid2VicGFjazovLy9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9Mb2dpbi52dWUiLCJ3ZWJwYWNrOi8vL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2F1dGhlbnRpY2F0aW9uL1JlZ2lzdGVyLnZ1ZSIsIndlYnBhY2s6Ly8vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVzZXRQYXNzd29yZC52dWUiLCJ3ZWJwYWNrOi8vL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2Vycm9ycy9Ob3RGb3VuZC52dWUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUgc3luYyBeXFwuXFwvLiokIiwid2VicGFjazovLy8uL1Jlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL0FwcC52dWU/MjY0MCIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9EYXNoYm9hcmQudnVlPzU0ZjkiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vRm9yZ290UGFzc3dvcmQudnVlPzc0NTAiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vTG9naW4udnVlPzE3YmEiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVnaXN0ZXIudnVlP2RmYTYiLCJ3ZWJwYWNrOi8vLy4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVzZXRQYXNzd29yZC52dWU/YWRiNCIsIndlYnBhY2s6Ly8vLi9SZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9lcnJvcnMvTm90Rm91bmQudnVlPzlkMjAiXSwibmFtZXMiOlsiQUNMIiwid2luZG93IiwiVnVlIiwiRXZlbnRzIiwiZmlsZXMiLCJyZXF1aXJlIiwia2V5cyIsIm1hcCIsImtleSIsImNvbXBvbmVudCIsInNwbGl0IiwicG9wIiwiZWwiLCJjb21wb25lbnRzIiwiQXBwIiwicm91dGVyIiwiXyIsIlBvcHBlciIsIiQiLCJqUXVlcnkiLCJlIiwiY29uc29sZSIsImVycm9yIiwiYXhpb3MiLCJjb21tZW50Tm9kZSIsInZub2RlIiwiY29tbWVudCIsImRvY3VtZW50IiwiY3JlYXRlQ29tbWVudCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJ0ZXh0IiwiZWxtIiwiaXNDb21tZW50IiwiY29udGV4dCIsInRhZyIsImRhdGEiLCJkaXJlY3RpdmVzIiwiY29tcG9uZW50SW5zdGFuY2UiLCIkZWwiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwib0F1dGgiLCJPQXV0aCIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJ1c2UiLCJjb25maWciLCJoZWFkZXJzIiwiaXNBdXRoZW50aWNhdGVkIiwiZ2V0QXV0aEhlYWRlciIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNwb25zZSIsInN0YXR1cyIsImxvZ291dCIsImxvY2FsZSIsImxhbmciLCJBbGVydCIsIm5hbWUiLCJDb2xsYXBzZSIsIkNvbGxhcHNlSXRlbSIsIklucHV0IiwiSW5wdXREaWdpdCIsIlJhZGlvIiwiQ2hlY2tib3giLCJUYWciLCJCdXR0b24iLCJTZWxlY3QiLCJPcHRpb24iLCJPcHRpb25Hcm91cCIsIlRvb2x0aXAiLCJEcm9wZG93biIsIkRyb3Bkb3duTWVudSIsIkRyb3Bkb3duSXRlbSIsIlVwbG9hZCIsIlRhYlBhbmUiLCJUYWJzIiwiRGF0ZVBpY2tlciIsIlRyYW5zZmVyIiwiRGlhbG9nIiwiVGltZVNlbGVjdCIsIkNvbG9yUGlja2VyIiwiTG9hZGluZyIsImRpcmVjdGl2ZSIsInByb3RvdHlwZSIsIiRtZXNzYWdlIiwiTWVzc2FnZSIsIiRtc2dib3giLCJNZXNzYWdlQm94IiwiJGFsZXJ0IiwiYWxlcnQiLCIkY29uZmlybSIsImNvbmZpcm0iLCIkcHJvbXB0IiwicHJvbXB0IiwiZG9tIiwid2F0Y2giLCJsaWJyYXJ5IiwiYWRkIiwiZmFzIiwiRm9udEF3ZXNvbWVJY29uIiwiVnVlRm9ybSIsIklucHV0UmFkaW8iLCJJbnB1dENoZWNrYm94IiwiSW5wdXRUZXh0IiwiSW5wdXROdW1iZXIiLCJJbnB1dFBhc3N3b3JkIiwiSW5wdXRFZGl0b3IiLCJJbnB1dFNlbGVjdCIsIklucHV0VXBsb2FkIiwiSW5wdXREYXRlVGltZSIsIklucHV0Q29kZSIsIklucHV0VGltZSIsIklucHV0Q29sb3JQaWNrZXIiLCIkbW9tZW50IiwibW9tZW50IiwiVnVlUHJvZ3Jlc3MiLCJWdWVQcm9ncmVzc0JhciIsImNvbG9yIiwiZmFpbGVkQ29sb3IiLCJ0aGlja25lc3MiLCJ0cmFuc2l0aW9uIiwic3BlZWQiLCJvcGFjaXR5IiwidGVybWluYXRpb24iLCJWdWVSb3V0ZXIiLCJtb2RlIiwiYmFzZSIsInJvdXRlcyIsImJlZm9yZUVhY2giLCJ0byIsImZyb20iLCJuZXh0IiwibWV0YSIsImF1dGgiLCJwYXRoIiwiZ3Vlc3QiLCJxdWVyeSIsInJlZGlyZWN0IiwiZnVsbFBhdGgiLCJDYXJkVGFibGVIZWFkZXIiLCJWdWVUYWJsZSIsInNlc3Npb24iLCJDb29raWVzIiwiQXV0aFNlcnZpY2UiLCJkZXN0cm95U2Vzc2lvbiIsInJlbW92ZSIsImdldCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJyZXNvbHZlIiwiYXR0ZW1wdExvZ2luIiwidGhlbiIsInN0b3JlU2Vzc2lvbiIsImFkZEF1dGhIZWFkZXJzIiwicmVmcmVzaF90b2tlbiIsImN1cnJlbnRVc2VyIiwiYWNjZXNzX3Rva2VuIiwiZ2V0SXRlbSIsImhlYWRlciIsImFkZEF1dGhvcml6YXRpb25IZWFkZXIiLCJob3VySW5NaWxsaVNlY29uZHMiLCJ0aW1lIiwiZXhwaXJlc19pbiIsInNldCIsImV4cGlyZXMiLCJ1c2VyIiwiY3JlZGVudGlhbHMiLCJwb3N0IiwicmVmcmVzaFRva2VuIiwicGFyYW1zIiwiZGVmYXVsdHMiLCJjb21tb24iLCJtaXhpbiIsImZpbHRlcnMiLCJjYXBpdGFsaXplIiwidG9TdHJpbmciLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwibWV0aG9kcyIsInN1Ym1pdFN1Y2Nlc3MiLCJ0eXBlIiwibWVzc2FnZSIsInN1Ym1pdEVycm9yIiwidGl0bGUiLCJjb25maXJtQnV0dG9uVGV4dCIsImNhbmNlbEJ1dHRvblRleHQiLCJkYW5nZXJvdXNseVVzZUhUTUxTdHJpbmciLCJpc0VtcHR5IiwiZm9ybWF0UHJpY2UiLCJ2YWwiLCJ0b0ZpeGVkIiwicmVwbGFjZSIsImRvd25sb2FkRmlsZSIsInVybCIsIm1ldGhvZCIsInJlc3BvbnNlVHlwZSIsImZpbGVOYW1lIiwiZGlzcG9zaXRpb24iLCJpbmRleE9mIiwiZmlsZW5hbWVSZWdleCIsIm1hdGNoZXMiLCJleGVjIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiQmxvYiIsImxpbmsiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiLCJmaWx0ZXIiLCJiaW5kaW5ncyIsImJlaGF2aW91ciIsIm1vZGlmaWVycyIsImRpc2FibGUiLCJhY2wiLCJ1c2VyQ2FuIiwiaGVscGVycyIsImRpc2FibGVkIiwiJHVybCIsImNvbmNhdCIsImF1dGhlbnRpY2F0aW9uIiwicHJvcHMiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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eUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QywwQkFBMEI7QUFDdkU7QUFDQTtBQUNBLHVDQUF1QywyQkFBMkI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHlDQUF5QztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN0SkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwianMvYXBwXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vUmVzb3VyY2VzL2Fzc2V0cy92dWUvYXBwLmpzXCIsXCJ2ZW5kb3JzfmpzL2FwcFwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8qKlxuICogQUNMIGNsYXNzIHRvIHByb3ZpZGUgaGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIHVzZXIgYW5kIGl0J3Mgcm9sZXNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQUNMIHtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIEFDTCBwbHVnaW5cbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgaW5pdCgpIHtcbiAgICAgICAgLy8gdHJ5IHtcbiAgICAgICAgLy8gICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuYWxsKFtcbiAgICAgICAgLy8gICAgICAgICBheGlvcy5nZXQoJy9hcGkvdnVlL3VzZXJzL3Byb2ZpbGUnKSxcbiAgICAgICAgLy8gICAgIF0pO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgd2luZG93LnVzZXIgPSByZXNwb25zZVswXS5kYXRhLmRhdGE7XG4gICAgICAgIC8vIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vICAgICB3aW5kb3cudXNlciA9IHt9O1xuICAgICAgICAvLyB9XG4gICAgfVxufVxuIiwiaW1wb3J0ICcuL2Jvb3RzdHJhcCc7XG5pbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5cbmltcG9ydCAnLi9wbHVnaW5zJztcbmltcG9ydCAnLi9pbnRlcmNlcHRvcnMvYXhpb3MnO1xuXG5pbXBvcnQgQXBwIGZyb20gJy4vdmlld3MvQXBwJztcblxuLy8gaW1wb3J0ICcuL2xpYnJhcmllcy9hdXRoJztcbi8vIGltcG9ydCAnLi9saWJyYXJpZXMvZHJhZ2dhYmxlJztcbmltcG9ydCAnLi9saWJyYXJpZXMvZWxlbWVudCc7XG5pbXBvcnQgJy4vbGlicmFyaWVzL2ZvbnRhd2Vzb21lJztcbmltcG9ydCAnLi9saWJyYXJpZXMvZm9ybSc7XG4vLyBpbXBvcnQgJy4vbGlicmFyaWVzL21hc29ucnknO1xuaW1wb3J0ICcuL2xpYnJhcmllcy9tb21lbnQnO1xuaW1wb3J0ICcuL2xpYnJhcmllcy9wcm9ncmVzc2Jhcic7XG5pbXBvcnQgcm91dGVyIGZyb20gJy4vbGlicmFyaWVzL3JvdXRlcic7XG5pbXBvcnQgJy4vbGlicmFyaWVzL3RhYmxlJztcblxud2luZG93LlZ1ZSA9IFZ1ZTtcbndpbmRvdy5FdmVudHMgPSBuZXcgVnVlKCk7XG5cbi8vIGltcG9ydCAqIGFzIFNlbnRyeSBmcm9tICdAc2VudHJ5L2Jyb3dzZXInO1xuLy8gaW1wb3J0ICogYXMgSW50ZWdyYXRpb25zIGZyb20gJ0BzZW50cnkvaW50ZWdyYXRpb25zJztcblxuLy8gaWYocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuLy8gLy8gSW5pdCBTZW50cnlcbi8vICAgICBTZW50cnkuaW5pdCh7XG4vLyAgICAgICAgIGRzbjogJ2h0dHBzOi8vM2E0Y2Q1NDRiODg3NGFjZjgzMjVhYTdiMjY2MTM5YzlAc2VudHJ5LmlvLzEyOTMxNCcsXG4vLyAgICAgICAgIGludGVncmF0aW9uczogW25ldyBJbnRlZ3JhdGlvbnMuVnVlKHtWdWUsIGF0dGFjaFByb3BzOiB0cnVlfSldLFxuLy8gICAgIH0pO1xuLy8gfVxuXG4vKipcbiAqIFRoZSBmb2xsb3dpbmcgYmxvY2sgb2YgY29kZSBtYXkgYmUgdXNlZCB0byBhdXRvbWF0aWNhbGx5IHJlZ2lzdGVyIHlvdXJcbiAqIFZ1ZSBjb21wb25lbnRzLiBJdCB3aWxsIHJlY3Vyc2l2ZWx5IHNjYW4gdGhpcyBkaXJlY3RvcnkgZm9yIHRoZSBWdWVcbiAqIGNvbXBvbmVudHMgYW5kIGF1dG9tYXRpY2FsbHkgcmVnaXN0ZXIgdGhlbSB3aXRoIHRoZWlyIFwiYmFzZW5hbWVcIi5cbiAqXG4gKiBFZy4gLi9jb21wb25lbnRzL0V4YW1wbGVDb21wb25lbnQudnVlIC0+IDxleGFtcGxlLWNvbXBvbmVudD48L2V4YW1wbGUtY29tcG9uZW50PlxuICovXG5cbmNvbnN0IGZpbGVzID0gcmVxdWlyZS5jb250ZXh0KCcuL2NvbXBvbmVudHMvJywgdHJ1ZSwgL1xcLnZ1ZSQvaSk7XG5maWxlcy5rZXlzKCkubWFwKGtleSA9PiBWdWUuY29tcG9uZW50KGtleS5zcGxpdCgnLycpLnBvcCgpLnNwbGl0KCcuJylbMF0sIGZpbGVzKGtleSkuZGVmYXVsdCkpO1xuXG5uZXcgVnVlKHtcbiAgICBlbDogJyNhcHAnLFxuICAgIGNvbXBvbmVudHM6IHtBcHB9LFxuICAgIHJvdXRlcixcbn0pO1xuIiwiXG53aW5kb3cuXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xud2luZG93LlBvcHBlciA9IHJlcXVpcmUoJ3BvcHBlci5qcycpLmRlZmF1bHQ7XG5cbi8qKlxuICogV2UnbGwgbG9hZCBqUXVlcnkgYW5kIHRoZSBCb290c3RyYXAgalF1ZXJ5IHBsdWdpbiB3aGljaCBwcm92aWRlcyBzdXBwb3J0XG4gKiBmb3IgSmF2YVNjcmlwdCBiYXNlZCBCb290c3RyYXAgZmVhdHVyZXMgc3VjaCBhcyBtb2RhbHMgYW5kIHRhYnMuIFRoaXNcbiAqIGNvZGUgbWF5IGJlIG1vZGlmaWVkIHRvIGZpdCB0aGUgc3BlY2lmaWMgbmVlZHMgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAqL1xuXG50cnkge1xuICAgIHdpbmRvdy4kID0gd2luZG93LmpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG4gICAgcmVxdWlyZSgnYm9vdHN0cmFwJyk7XG59IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbn1cblxuXG4vKipcbiAqIFdlJ2xsIGxvYWQgdGhlIGF4aW9zIEhUVFAgbGlicmFyeSB3aGljaCBhbGxvd3MgdXMgdG8gZWFzaWx5IGlzc3VlIHJlcXVlc3RzXG4gKiB0byBvdXIgTGFyYXZlbCBiYWNrLWVuZC4gVGhpcyBsaWJyYXJ5IGF1dG9tYXRpY2FsbHkgaGFuZGxlcyBzZW5kaW5nIHRoZVxuICogQ1NSRiB0b2tlbiBhcyBhIGhlYWRlciBiYXNlZCBvbiB0aGUgdmFsdWUgb2YgdGhlIFwiWFNSRlwiIHRva2VuIGNvb2tpZS5cbiAqL1xuXG53aW5kb3cuYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuXG5cbi8qKlxuICogRWNobyBleHBvc2VzIGFuIGV4cHJlc3NpdmUgQVBJIGZvciBzdWJzY3JpYmluZyB0byBjaGFubmVscyBhbmQgbGlzdGVuaW5nXG4gKiBmb3IgZXZlbnRzIHRoYXQgYXJlIGJyb2FkY2FzdCBieSBMYXJhdmVsLiBFY2hvIGFuZCBldmVudCBicm9hZGNhc3RpbmdcbiAqIGFsbG93cyB5b3VyIHRlYW0gdG8gZWFzaWx5IGJ1aWxkIHJvYnVzdCByZWFsLXRpbWUgd2ViIGFwcGxpY2F0aW9ucy5cbiAqL1xuXG4vLyBpbXBvcnQgRWNobyBmcm9tICdsYXJhdmVsLWVjaG8nXG5cbi8vIHdpbmRvdy5QdXNoZXIgPSByZXF1aXJlKCdwdXNoZXItanMnKTtcblxuLy8gd2luZG93LkVjaG8gPSBuZXcgRWNobyh7XG4vLyAgICAgYnJvYWRjYXN0ZXI6ICdwdXNoZXInLFxuLy8gICAgIGtleTogcHJvY2Vzcy5lbnYuTUlYX1BVU0hFUl9BUFBfS0VZLFxuLy8gICAgIGNsdXN0ZXI6IHByb2Nlc3MuZW52Lk1JWF9QVVNIRVJfQVBQX0NMVVNURVIsXG4vLyAgICAgZW5jcnlwdGVkOiB0cnVlXG4vLyB9KTtcbiIsImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUNvbnRleHQocmVxKSB7XG5cdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHR0aHJvdyBlO1xufVxud2VicGFja0VtcHR5Q29udGV4dC5rZXlzID0gZnVuY3Rpb24oKSB7IHJldHVybiBbXTsgfTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gXCIuL1Jlc291cmNlcy9hc3NldHMvdnVlL2NvbXBvbmVudHMgc3luYyByZWN1cnNpdmUgXFxcXC52dWUkL1wiOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgY29tbWVudE5vZGUoZWwsIHZub2RlKSB7XG4gICAgY29uc3QgY29tbWVudCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJyAnKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21tZW50LCAnc2V0QXR0cmlidXRlJywge1xuICAgICAgdmFsdWU6ICgpID0+IHVuZGVmaW5lZFxuICAgIH0pO1xuXG4gICAgdm5vZGUudGV4dCA9ICcgJztcbiAgICB2bm9kZS5lbG0gPSBjb21tZW50O1xuICAgIHZub2RlLmlzQ29tbWVudCA9IHRydWU7XG4gICAgdm5vZGUuY29udGV4dCA9IHVuZGVmaW5lZDtcbiAgICB2bm9kZS50YWcgPSB1bmRlZmluZWQ7XG4gICAgdm5vZGUuZGF0YS5kaXJlY3RpdmVzID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHZub2RlLmNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICB2bm9kZS5jb21wb25lbnRJbnN0YW5jZS4kZWwgPSBjb21tZW50O1xuICAgIH1cblxuICAgIGlmIChlbC5wYXJlbnROb2RlKSB7XG4gICAgICBlbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjb21tZW50LCBlbCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgT0F1dGggZnJvbSAnLi8uLi9vYXV0aCc7XG5cbmxldCBvQXV0aCA9IG5ldyBPQXV0aCgpO1xuXG4vKipcbiAqIFJlcXVlc3QgaW50ZXJjZXB0b3JcbiAqL1xud2luZG93LmF4aW9zLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShmdW5jdGlvbiAoY29uZmlnKSB7XG5cbiAgICBjb25maWcuaGVhZGVyc1snWC1SZXF1ZXN0ZWQtV2l0aCddID0gJ1hNTEh0dHBSZXF1ZXN0JztcblxuICAgIC8vIEFkZCB0aGUgYXV0aGVudGljYXRpb24gaGVhZGVyIHdoZW4gdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gICAgaWYgKG9BdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgLy8gU2V0IHRoZSBhdXRob3JpemF0aW9uIGhlYWRlciBmb3IgZWFjaCByZXF1ZXN0XG4gICAgICAgIGNvbmZpZy5oZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBvQXV0aC5nZXRBdXRoSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZztcbn0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgIC8vIERvIHNvbWV0aGluZyB3aXRoIHJlcXVlc3QgZXJyb3JcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xufSk7XG5cblxuLyoqXG4gKiBSZXNwb25zZSBpbnRlcmNlcHRvclxuICovXG53aW5kb3cuYXhpb3MuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXNwb25zZSBkYXRhXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xufSwgZnVuY3Rpb24gKGVycm9yKSB7XG5cbiAgICAvLyBSZWZyZXNoIHRoZSBhY2Nlc3MgdG9rZW5cbiAgICBpZiAoZXJyb3IucmVzcG9uc2UgIT09IHVuZGVmaW5lZCAmJiBlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMSAmJiBvQXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICBvQXV0aC5sb2dvdXQoKTtcbiAgICB9XG5cbiAgICAvLyBEbyBzb21ldGhpbmcgd2l0aCByZXNwb25zZSBlcnJvclxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG59KTtcblxuXG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQge1xuICAgIEFsZXJ0LFxuICAgIEJ1dHRvbixcbiAgICBDaGVja2JveCxcbiAgICBDb2xsYXBzZSxcbiAgICBDb2xsYXBzZUl0ZW0sXG4gICAgQ29sb3JQaWNrZXIsXG4gICAgRGF0ZVBpY2tlcixcbiAgICBEaWFsb2csXG4gICAgRHJvcGRvd24sXG4gICAgRHJvcGRvd25JdGVtLFxuICAgIERyb3Bkb3duTWVudSxcbiAgICBJbnB1dCxcbiAgICBJbnB1dE51bWJlciBhcyBJbnB1dERpZ2l0LFxuICAgIExvYWRpbmcsXG4gICAgTWVzc2FnZSxcbiAgICBNZXNzYWdlQm94LFxuICAgIE9wdGlvbixcbiAgICBPcHRpb25Hcm91cCxcbiAgICBSYWRpbyxcbiAgICBTZWxlY3QsXG4gICAgVGFiUGFuZSxcbiAgICBUYWJzLFxuICAgIFRhZyxcbiAgICBUaW1lU2VsZWN0LFxuICAgIFRvb2x0aXAsXG4gICAgVHJhbnNmZXIsXG4gICAgVXBsb2FkXG59IGZyb20gJ2VsZW1lbnQtdWknO1xuaW1wb3J0IGxhbmcgZnJvbSAnZWxlbWVudC11aS9saWIvbG9jYWxlL2xhbmcvbmwnO1xuaW1wb3J0IGxvY2FsZSBmcm9tICdlbGVtZW50LXVpL2xpYi9sb2NhbGUnO1xuaW1wb3J0ICdlbGVtZW50LXVpL2xpYi90aGVtZS1jaGFsay9pbmRleC5jc3MnO1xuXG5sb2NhbGUudXNlKGxhbmcpO1xuVnVlLmNvbXBvbmVudChBbGVydC5uYW1lLCBBbGVydCk7XG5WdWUuY29tcG9uZW50KENvbGxhcHNlLm5hbWUsIENvbGxhcHNlKTtcblZ1ZS5jb21wb25lbnQoQ29sbGFwc2VJdGVtLm5hbWUsIENvbGxhcHNlSXRlbSk7XG5WdWUuY29tcG9uZW50KElucHV0Lm5hbWUsIElucHV0KTtcblZ1ZS5jb21wb25lbnQoSW5wdXREaWdpdC5uYW1lLCBJbnB1dERpZ2l0KTtcblZ1ZS5jb21wb25lbnQoUmFkaW8ubmFtZSwgUmFkaW8pO1xuVnVlLmNvbXBvbmVudChDaGVja2JveC5uYW1lLCBDaGVja2JveCk7XG5WdWUuY29tcG9uZW50KFRhZy5uYW1lLCBUYWcpO1xuVnVlLmNvbXBvbmVudChCdXR0b24ubmFtZSwgQnV0dG9uKTtcblZ1ZS5jb21wb25lbnQoU2VsZWN0Lm5hbWUsIFNlbGVjdCk7XG5WdWUuY29tcG9uZW50KE9wdGlvbi5uYW1lLCBPcHRpb24pO1xuVnVlLmNvbXBvbmVudChPcHRpb25Hcm91cC5uYW1lLCBPcHRpb25Hcm91cCk7XG5WdWUuY29tcG9uZW50KFRvb2x0aXAubmFtZSwgVG9vbHRpcCk7XG5WdWUuY29tcG9uZW50KERyb3Bkb3duLm5hbWUsIERyb3Bkb3duKTtcblZ1ZS5jb21wb25lbnQoRHJvcGRvd25NZW51Lm5hbWUsIERyb3Bkb3duTWVudSk7XG5WdWUuY29tcG9uZW50KERyb3Bkb3duSXRlbS5uYW1lLCBEcm9wZG93bkl0ZW0pO1xuVnVlLmNvbXBvbmVudChVcGxvYWQubmFtZSwgVXBsb2FkKTtcblZ1ZS5jb21wb25lbnQoVGFiUGFuZS5uYW1lLCBUYWJQYW5lKTtcblZ1ZS5jb21wb25lbnQoVGFicy5uYW1lLCBUYWJzKTtcblZ1ZS5jb21wb25lbnQoRGF0ZVBpY2tlci5uYW1lLCBEYXRlUGlja2VyKTtcblZ1ZS5jb21wb25lbnQoVHJhbnNmZXIubmFtZSwgVHJhbnNmZXIpO1xuVnVlLmNvbXBvbmVudChEaWFsb2cubmFtZSwgRGlhbG9nKTtcblZ1ZS5jb21wb25lbnQoVGltZVNlbGVjdC5uYW1lLCBUaW1lU2VsZWN0KTtcblZ1ZS5jb21wb25lbnQoQ29sb3JQaWNrZXIubmFtZSwgQ29sb3JQaWNrZXIpO1xuXG5WdWUudXNlKExvYWRpbmcuZGlyZWN0aXZlKTtcblZ1ZS5wcm90b3R5cGUuJG1lc3NhZ2UgPSBNZXNzYWdlO1xuVnVlLnByb3RvdHlwZS4kbXNnYm94ID0gTWVzc2FnZUJveDtcblZ1ZS5wcm90b3R5cGUuJGFsZXJ0ID0gTWVzc2FnZUJveC5hbGVydDtcblZ1ZS5wcm90b3R5cGUuJGNvbmZpcm0gPSBNZXNzYWdlQm94LmNvbmZpcm07XG5WdWUucHJvdG90eXBlLiRwcm9tcHQgPSBNZXNzYWdlQm94LnByb21wdDtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCB7bGlicmFyeSwgZG9tfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnXG5pbXBvcnQge2Zhc30gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJ1xuaW1wb3J0IHtGb250QXdlc29tZUljb259IGZyb20gJ0Bmb3J0YXdlc29tZS92dWUtZm9udGF3ZXNvbWUnXG5cbi8vIFdhdGNoIDxpPiB0YWdzIGFuZCB0cmFuc2Zvcm0gdGhlbSB0byBTVkcgZm9yIGZvbnQgYXdlc29tZSBpY29uc1xuZG9tLndhdGNoKCk7XG5cbmxpYnJhcnkuYWRkKGZhcyk7XG5WdWUuY29tcG9uZW50KCdmb250LWF3ZXNvbWUtaWNvbicsIEZvbnRBd2Vzb21lSWNvbik7XG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQge0lucHV0Q2hlY2tib3gsIElucHV0Q29kZSwgSW5wdXRDb2xvclBpY2tlciwgSW5wdXREYXRlVGltZSwgSW5wdXRFZGl0b3IsIElucHV0TnVtYmVyLCBJbnB1dFBhc3N3b3JkLCBJbnB1dFJhZGlvLCBJbnB1dFNlbGVjdCwgSW5wdXRUZXh0LCBJbnB1dFRpbWUsIElucHV0VXBsb2FkLCBWdWVGb3JtfSBmcm9tICdAYml0L2Utc2l0ZXMudnVlLmdsb2JhbC5mb3JtJztcblxuVnVlLmNvbXBvbmVudChWdWVGb3JtLm5hbWUsIFZ1ZUZvcm0pO1xuVnVlLmNvbXBvbmVudChJbnB1dFJhZGlvLm5hbWUsIElucHV0UmFkaW8pO1xuVnVlLmNvbXBvbmVudChJbnB1dENoZWNrYm94Lm5hbWUsIElucHV0Q2hlY2tib3gpO1xuVnVlLmNvbXBvbmVudChJbnB1dFRleHQubmFtZSwgSW5wdXRUZXh0KTtcblZ1ZS5jb21wb25lbnQoSW5wdXROdW1iZXIubmFtZSwgSW5wdXROdW1iZXIpO1xuVnVlLmNvbXBvbmVudChJbnB1dFBhc3N3b3JkLm5hbWUsIElucHV0UGFzc3dvcmQpO1xuVnVlLmNvbXBvbmVudChJbnB1dEVkaXRvci5uYW1lLCBJbnB1dEVkaXRvcik7XG5WdWUuY29tcG9uZW50KElucHV0U2VsZWN0Lm5hbWUsIElucHV0U2VsZWN0KTtcblZ1ZS5jb21wb25lbnQoSW5wdXRVcGxvYWQubmFtZSwgSW5wdXRVcGxvYWQpO1xuVnVlLmNvbXBvbmVudChJbnB1dERhdGVUaW1lLm5hbWUsIElucHV0RGF0ZVRpbWUpO1xuVnVlLmNvbXBvbmVudChJbnB1dENvZGUubmFtZSwgSW5wdXRDb2RlKTtcblZ1ZS5jb21wb25lbnQoSW5wdXRUaW1lLm5hbWUsIElucHV0VGltZSk7XG5WdWUuY29tcG9uZW50KElucHV0Q29sb3JQaWNrZXIubmFtZSwgSW5wdXRDb2xvclBpY2tlcik7XG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSdcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuXG5WdWUucHJvdG90eXBlLiRtb21lbnQgPSBtb21lbnQ7XG5WdWUucHJvdG90eXBlLiRtb21lbnQubG9jYWxlKCdubCcpO1xuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IFZ1ZVByb2dyZXNzQmFyIGZyb20gJ3Z1ZS1wcm9ncmVzc2JhcidcbmltcG9ydCAndnVlLXByb2dyZXNzLXBhdGgvZGlzdC92dWUtcHJvZ3Jlc3MtcGF0aC5jc3MnXG5pbXBvcnQgVnVlUHJvZ3Jlc3MgZnJvbSAndnVlLXByb2dyZXNzLXBhdGgnXG5cblZ1ZS51c2UoVnVlUHJvZ3Jlc3MpO1xuVnVlLnVzZShWdWVQcm9ncmVzc0Jhciwge1xuICAgIGNvbG9yOiAnI2ZmZDYwMCcsXG4gICAgZmFpbGVkQ29sb3I6ICcjZjUzNjVjJyxcbiAgICB0aGlja25lc3M6ICc1cHgnLFxuICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgc3BlZWQ6ICcwLjJzJyxcbiAgICAgICAgb3BhY2l0eTogJzAuNnMnLFxuICAgICAgICB0ZXJtaW5hdGlvbjogMzAwXG4gICAgfVxufSk7XG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3Z1ZS1yb3V0ZXInO1xuaW1wb3J0IHJvdXRlcyBmcm9tICcuLi9yb3V0ZXMnO1xuaW1wb3J0IE9BdXRoIGZyb20gJy4vLi4vb2F1dGgnO1xuXG5jb25zdCByb3V0ZXIgPSBuZXcgVnVlUm91dGVyKHtcbiAgICBtb2RlOiAnaGlzdG9yeScsXG4gICAgYmFzZTogJy9iZXRhLycsXG4gICAgcm91dGVzOiByb3V0ZXNcbn0pO1xuXG5WdWUudXNlKFZ1ZVJvdXRlcik7XG5cbmxldCBvQXV0aCA9IG5ldyBPQXV0aCgpO1xuXG5yb3V0ZXIuYmVmb3JlRWFjaCgodG8sIGZyb20sIG5leHQpID0+IHtcbiAgICAvL0lmIHZpc2l0aW5nIGxvZ2luIHZpZXcgYnV0IHlvdSBhbHJlYWR5IGhhdmUgbG9nZ2VkIGluLCB5b3Ugc2hvdWxkIG5vdCBiZSBhYmxlIHRvIHNlZSB0aGlzIHZpZXdcbiAgICBpZiAoIXRvLm1ldGEuYXV0aCAmJiBvQXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICByZXR1cm4gbmV4dCh7XG4gICAgICAgICAgICBwYXRoOiAnLydcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvL0lmIHlvdSBhcmUgdmlzaXRpbmcgJy8nIGFuZCB5b3UgYXJlIGEgZ3Vlc3QgdGhlbiwgeW91IG11c3QgYmUgcmVkaXJlY3RlZCB0byBsb2dpblxuICAgIGlmICh0by5tZXRhLmF1dGggJiYgb0F1dGguZ3Vlc3QoKSkge1xuICAgICAgICByZXR1cm4gbmV4dCh7XG4gICAgICAgICAgICBwYXRoOiAnL2xvZ2luJyxcbiAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3Q6IHRvLmZ1bGxQYXRoXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYodG8ubWV0YS5hdXRoKSB7XG4gICAgICAgIC8vXG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQoKVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCB7Q2FyZFRhYmxlSGVhZGVyLCBWdWVUYWJsZX0gZnJvbSAnQGJpdC9lLXNpdGVzLnZ1ZS5nbG9iYWwudGFibGUnO1xuXG5WdWUuY29tcG9uZW50KENhcmRUYWJsZUhlYWRlci5uYW1lLCBDYXJkVGFibGVIZWFkZXIpO1xuVnVlLmNvbXBvbmVudChWdWVUYWJsZS5uYW1lLCBWdWVUYWJsZSk7XG4iLCJpbXBvcnQgQXV0aFNlcnZpY2UgZnJvbSAnLi9vYXV0aC5zZXJ2aWNlJztcbmltcG9ydCBDb29raWVzIGZyb20gJ2pzLWNvb2tpZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IENvb2tpZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9nb3V0XG4gICAgICovXG4gICAgbG9nb3V0KCkge1xuICAgICAgICBBdXRoU2VydmljZS5kZXN0cm95U2Vzc2lvbigpO1xuXG4gICAgICAgIHRoaXMuc2Vzc2lvbi5yZW1vdmUoJ2FjY2Vzc190b2tlbicpO1xuICAgICAgICB0aGlzLnNlc3Npb24ucmVtb3ZlKCdyZWZyZXNoX3Rva2VuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR3Vlc3QgY2hlY2tcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBndWVzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi5nZXQoJ2FjY2Vzc190b2tlbicpID09PSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdXNlciBpcyBsb2dnZWQgaW5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0F1dGhlbnRpY2F0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb24uZ2V0KCdhY2Nlc3NfdG9rZW4nKSAhPT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvZ2luIHVzaW5nIHVzZXJuYW1lIGFuZCBwYXNzd29yZFxuICAgICAqIEBwYXJhbSB1c2VybmFtZVxuICAgICAqIEBwYXJhbSBwYXNzd29yZFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgbG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBBdXRoU2VydmljZS5hdHRlbXB0TG9naW4oe1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVTZXNzaW9uKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQXV0aEhlYWRlcnMoKTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWZyZXNoIHRoZSBhY2Nlc3MgdG9rZW4gb2YgdGhlIHVzZXJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICAgIHJlZnJlc2hUb2tlbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIEF1dGhTZXJ2aWNlLmF0dGVtcHRMb2dpbih7XG4gICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogdGhpcy5zZXNzaW9uLmdldCgncmVmcmVzaF90b2tlbicpXG4gICAgICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlU2Vzc2lvbihyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEF1dGhIZWFkZXJzKCk7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKVxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB1c2VyIGZyb20gdGhlIEFQSVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgZ2V0VXNlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgQXV0aFNlcnZpY2UuY3VycmVudFVzZXIoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiByZXNvbHZlKG51bGwpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYXV0aGVudGljYXRpb24gaGVhZGVyXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgZ2V0QXV0aEhlYWRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgIGxldCBhY2Nlc3NfdG9rZW4gPSB0aGlzLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpO1xuXG4gICAgICAgICAgICByZXR1cm4gJ0JlYXJlciAnICsgYWNjZXNzX3Rva2VuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBpdGVtIGZyb20gdGhlIGNvb2tpZXNcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICovXG4gICAgZ2V0SXRlbShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYXV0aCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0c1xuICAgICAqL1xuICAgIGFkZEF1dGhIZWFkZXJzKCkge1xuICAgICAgICBsZXQgaGVhZGVyID0gdGhpcy5nZXRBdXRoSGVhZGVyKCk7XG5cbiAgICAgICAgQXV0aFNlcnZpY2UuYWRkQXV0aG9yaXphdGlvbkhlYWRlcihoZWFkZXIpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcmUgdGhlIHNlc3Npb24gZGF0YVxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgc3RvcmVTZXNzaW9uKGRhdGEpIHtcbiAgICAgICAgbGV0IGhvdXJJbk1pbGxpU2Vjb25kcyA9IDg2NDAwO1xuICAgICAgICBsZXQgdGltZSA9IGRhdGEuZXhwaXJlc19pbiAvIGhvdXJJbk1pbGxpU2Vjb25kcztcblxuICAgICAgICB0aGlzLnNlc3Npb24uc2V0KCdhY2Nlc3NfdG9rZW4nLCBkYXRhLmFjY2Vzc190b2tlbiwge1xuICAgICAgICAgICAgZXhwaXJlczogdGltZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZXNzaW9uLnNldCgncmVmcmVzaF90b2tlbicsIGRhdGEucmVmcmVzaF90b2tlbiwge1xuICAgICAgICAgICAgZXhwaXJlczogdGltZSAqIDIsXG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIHVzZXI6IG51bGwsXG5cbiAgICBkZXN0cm95U2Vzc2lvbigpIHtcbiAgICAgICAgdGhpcy51c2VyID0gbnVsbFxuICAgIH0sXG5cbiAgICBhc3luYyBjdXJyZW50VXNlcigpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlclxuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCB1c2VyID0gYXdhaXQgd2luZG93LmF4aW9zLmdldCgnL2FwaS92dWUvdXNlcnMvcHJvZmlsZScpO1xuXG4gICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiByZXNvbHZlKHVzZXIpKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlamVjdCA9PiByZWplY3QoZXJyb3IpKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFzeW5jIGF0dGVtcHRMb2dpbihjcmVkZW50aWFscykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgd2luZG93LmF4aW9zLnBvc3QoJy9hcGkvdnVlL3VzZXJzL2xvZ2luJywgY3JlZGVudGlhbHMpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gcmVzb2x2ZShyZXNwb25zZSkpXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVqZWN0ID0+IHJlamVjdChlcnJvcikpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgcmVmcmVzaFRva2VuKHBhcmFtcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgd2luZG93LmF4aW9zLnBvc3QoJy9hcGkvdnVlL3VzZXJzL3JlZnJlc2gnLCBwYXJhbXMpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gcmVzb2x2ZShyZXNwb25zZSkpXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVqZWN0ID0+IHJlamVjdChlcnJvcikpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYWRkQXV0aG9yaXphdGlvbkhlYWRlcihoZWFkZXIpIHtcbiAgICAgICAgd2luZG93LmF4aW9zLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydBdXRob3JpemF0aW9uJ10gPSBoZWFkZXJcbiAgICB9XG59XG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgYWNsIGZyb20gJy4vYWNsJztcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XG5cblZ1ZS5taXhpbih7XG4gIGZpbHRlcnM6IHtcbiAgICBjYXBpdGFsaXplOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuXG4gICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG5cbiAgICAgIHJldHVybiB2YWx1ZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHZhbHVlLnNsaWNlKDEpO1xuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgc3VibWl0U3VjY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kbWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgbWVzc2FnZTogJ0RlIGdlZ2V2ZW5zIHppam4gb3BnZXNsYWdlbidcbiAgICAgIH0pXG4gICAgfSxcbiAgICBzdWJtaXRFcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kbWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdFciBpcyBpZXRzIG1pcyBnZWdhYW4sIHByb2JlZXIgaGV0IG5vZ21hYWxzJ1xuICAgICAgfSlcbiAgICB9LFxuICAgIGNvbmZpcm06IGZ1bmN0aW9uICh0ZXh0LCB0aXRsZSwgY29uZmlybUJ1dHRvblRleHQgPSAnVmVyd2lqZGVyZW4nKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY29uZmlybSh0ZXh0LCB0aXRsZSwge1xuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogY29uZmlybUJ1dHRvblRleHQsXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdBbm51bGVyZW4nLFxuICAgICAgICB0eXBlOiAnd2FybmluZycsXG4gICAgICAgIGRhbmdlcm91c2x5VXNlSFRNTFN0cmluZzogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBpc0VtcHR5KHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBmb3JtYXRQcmljZSh2YWx1ZSkge1xuICAgICAgbGV0IHZhbCA9ICh2YWx1ZSAvIDEpLnRvRml4ZWQoMikucmVwbGFjZSgnLicsICcsJylcbiAgICAgIHJldHVybiB2YWwudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIi5cIilcbiAgICB9LFxuICAgIGRvd25sb2FkRmlsZSh1cmwsIG1ldGhvZCA9ICdnZXQnLCBkYXRhID0ge30pIHtcbiAgICAgIGF4aW9zKHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdibG9iJ1xuICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGxldCBmaWxlTmFtZSA9ICcnO1xuICAgICAgICBjb25zdCBkaXNwb3NpdGlvbiA9IHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtZGlzcG9zaXRpb24nXVxuXG4gICAgICAgIGlmIChkaXNwb3NpdGlvbiAmJiBkaXNwb3NpdGlvbi5pbmRleE9mKCdhdHRhY2htZW50JykgIT09IC0xKSB7XG4gICAgICAgICAgbGV0IGZpbGVuYW1lUmVnZXggPSAvZmlsZW5hbWVbXjs9XFxuXSo9KChbJ1wiXSkuKj9cXDJ8W147XFxuXSopLztcbiAgICAgICAgICBsZXQgbWF0Y2hlcyA9IGZpbGVuYW1lUmVnZXguZXhlYyhkaXNwb3NpdGlvbik7XG5cbiAgICAgICAgICBpZiAobWF0Y2hlc1sxXSkge1xuICAgICAgICAgICAgZmlsZU5hbWUgPSBtYXRjaGVzWzFdLnJlcGxhY2UoL1snXCJdL2csICcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbcmVzcG9uc2UuZGF0YV0pKTtcbiAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGZpbGVOYW1lKTsgLy9vciBhbnkgb3RoZXIgZXh0ZW5zaW9uXG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgICAgbGluay5jbGljaygpO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pO1xuXG5WdWUuZmlsdGVyKCdjYXBpdGFsaXplJywgZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG5cbiAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG59KTtcblxuVnVlLmRpcmVjdGl2ZSgndXNlci1jYW4nLCBmdW5jdGlvbiAoZWwsIGJpbmRpbmdzLCB2bm9kZSkge1xuICBjb25zdCBiZWhhdmlvdXIgPSBiaW5kaW5ncy5tb2RpZmllcnMuZGlzYWJsZSA/ICdkaXNhYmxlJyA6ICdoaWRlJztcblxuICBpZiAoIWFjbC51c2VyQ2FuKGJpbmRpbmdzLnZhbHVlKSkge1xuICAgIGlmIChiZWhhdmlvdXIgPT09ICdoaWRlJykge1xuICAgICAgaGVscGVycy5jb21tZW50Tm9kZShlbCwgdm5vZGUpXG4gICAgfSBlbHNlIGlmIChiZWhhdmlvdXIgPT09ICdkaXNhYmxlJykge1xuICAgICAgZWwuZGlzYWJsZWQgPSB0cnVlXG4gICAgfVxuICB9XG59KTtcblxuXG4vKipcbiAqIFBST1RPVFlQRVNcbiAqL1xuXG5cbi8qKlxuICogUHJvdG90eXBlIHRvIGNyZWF0ZSBhIHVybFxuICogQHBhcmFtIHVybFxuICogQHBhcmFtIHBhcmFtc1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuVnVlLnByb3RvdHlwZS4kdXJsID0gZnVuY3Rpb24odXJsLCBwYXJhbXMgPSB7fSkge1xuICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHBhcmFtcyk7XG5cbiAgZm9yKGxldCBrZXkgb2Yga2V5cykge1xuICAgIHVybCA9IHVybC5yZXBsYWNlKGA6JHtrZXl9YCwgcGFyYW1zW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIGAvYXBpL3Z1ZS8ke3VybC5yZXBsYWNlKC9eXFwvKy9nLCAnJyl9YDtcbn07XG4iLCJpbXBvcnQgYXV0aGVudGljYXRpb24gZnJvbSAnLi9tb2R1bGVzL2F1dGhlbnRpY2F0aW9uJztcblxuY29uc3Qgcm91dGVzID0gW3tcbiAgICBwYXRoOiAnLycsXG4gICAgbmFtZTogJ2Rhc2hib2FyZCcsXG4gICAgY29tcG9uZW50OiByZXF1aXJlKCcuLi92aWV3cy9EYXNoYm9hcmQnKS5kZWZhdWx0LFxuICAgIG1ldGE6IHthdXRoOiBmYWxzZX0sXG59LCB7XG4gICAgcGF0aDogJyonLFxuICAgIG5hbWU6ICc0MDQnLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vdmlld3MvZXJyb3JzL05vdEZvdW5kJykuZGVmYXVsdCxcbiAgICBtZXRhOiB7YXV0aDogZmFsc2V9LFxufV0uY29uY2F0KFxuICAgIGF1dGhlbnRpY2F0aW9uLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVzO1xuIiwiZXhwb3J0IGRlZmF1bHQgW3tcbiAgICBwYXRoOiAnL2xvZ2luJyxcbiAgICBuYW1lOiAnbG9naW4nLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vLi4vdmlld3MvYXV0aGVudGljYXRpb24vTG9naW4nKS5kZWZhdWx0LFxuICAgIG1ldGE6IHthdXRoOiBmYWxzZX1cbn0sIHtcbiAgICBwYXRoOiAnL3Bhc3N3b3JkL2ZvcmdvdCcsXG4gICAgbmFtZTogJ3Bhc3N3b3JkLmZvcmdvdCcsXG4gICAgY29tcG9uZW50OiByZXF1aXJlKCcuLi8uLi92aWV3cy9hdXRoZW50aWNhdGlvbi9Gb3Jnb3RQYXNzd29yZCcpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IGZhbHNlfVxufSwge1xuICAgIHBhdGg6ICcvcGFzc3dvcmQvcmVzZXQvOnRva2VuJyxcbiAgICBuYW1lOiAncGFzc3dvcmQucmVzZXQnLFxuICAgIHByb3BzOiB0cnVlLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vLi4vdmlld3MvYXV0aGVudGljYXRpb24vUmVzZXRQYXNzd29yZCcpLmRlZmF1bHQsXG4gICAgbWV0YToge2F1dGg6IGZhbHNlfVxufSwge1xuICAgIHBhdGg6ICcvcmVnaXN0ZXIvOnRva2VuJyxcbiAgICBuYW1lOiAncmVnaXN0ZXInLFxuICAgIHByb3BzOiB0cnVlLFxuICAgIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vLi4vdmlld3MvYXV0aGVudGljYXRpb24vUmVnaXN0ZXInKS5kZWZhdWx0LFxuICAgIG1ldGE6IHthdXRoOiBmYWxzZX1cbn1dO1xuIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTBlMDkxZjNhJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy90aG9tYXNyb292ZXJzL0RldmVsb3Blci9CdW5kbGVzL01vYmlsZUJ1bmRsZS9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcwZTA5MWYzYScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcwZTA5MWYzYScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcwZTA5MWYzYScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vQXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0wZTA5MWYzYSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcwZTA5MWYzYScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvQXBwLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MGUwOTFmM2EmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0Rhc2hib2FyZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YzFlYmIwNTQmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vRGFzaGJvYXJkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vRGFzaGJvYXJkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0J1bmRsZXMvTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJ2MxZWJiMDU0JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJ2MxZWJiMDU0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJ2MxZWJiMDU0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9EYXNoYm9hcmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWMxZWJiMDU0JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJ2MxZWJiMDU0Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJSZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9EYXNoYm9hcmQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9EYXNoYm9hcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Rhc2hib2FyZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRGFzaGJvYXJkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1jMWViYjA1NCZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vRm9yZ290UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTU4MDVjNzU3JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0ZvcmdvdFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vRm9yZ290UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvdGhvbWFzcm9vdmVycy9EZXZlbG9wZXIvQnVuZGxlcy9Nb2JpbGVCdW5kbGUvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNTgwNWM3NTcnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNTgwNWM3NTcnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNTgwNWM3NTcnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0ZvcmdvdFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01ODA1Yzc1NyZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc1ODA1Yzc1NycsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vRm9yZ290UGFzc3dvcmQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Gb3Jnb3RQYXNzd29yZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vRm9yZ290UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0ZvcmdvdFBhc3N3b3JkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01ODA1Yzc1NyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vTG9naW4udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdhMjVlMTAwJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vTG9naW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvdGhvbWFzcm9vdmVycy9EZXZlbG9wZXIvQnVuZGxlcy9Nb2JpbGVCdW5kbGUvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnN2EyNWUxMDAnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnN2EyNWUxMDAnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnN2EyNWUxMDAnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0xvZ2luLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03YTI1ZTEwMCZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc3YTI1ZTEwMCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vTG9naW4udnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Mb2dpbi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTG9naW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xvZ2luLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03YTI1ZTEwMCZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUmVnaXN0ZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdmNGZkOTVjJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1JlZ2lzdGVyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUmVnaXN0ZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvdGhvbWFzcm9vdmVycy9EZXZlbG9wZXIvQnVuZGxlcy9Nb2JpbGVCdW5kbGUvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnN2Y0ZmQ5NWMnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnN2Y0ZmQ5NWMnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnN2Y0ZmQ5NWMnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1JlZ2lzdGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03ZjRmZDk1YyZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc3ZjRmZDk1YycsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiUmVzb3VyY2VzL2Fzc2V0cy92dWUvdmlld3MvYXV0aGVudGljYXRpb24vUmVnaXN0ZXIudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9SZWdpc3Rlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVnaXN0ZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1JlZ2lzdGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03ZjRmZDk1YyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUmVzZXRQYXNzd29yZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MDg3Mjc1YTEmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUmVzZXRQYXNzd29yZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL1Jlc2V0UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvdGhvbWFzcm9vdmVycy9EZXZlbG9wZXIvQnVuZGxlcy9Nb2JpbGVCdW5kbGUvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMDg3Mjc1YTEnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMDg3Mjc1YTEnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMDg3Mjc1YTEnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Jlc2V0UGFzc3dvcmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTA4NzI3NWExJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzA4NzI3NWExJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJSZXNvdXJjZXMvYXNzZXRzL3Z1ZS92aWV3cy9hdXRoZW50aWNhdGlvbi9SZXNldFBhc3N3b3JkLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVzZXRQYXNzd29yZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMC0wIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVzZXRQYXNzd29yZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUmVzZXRQYXNzd29yZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MDg3Mjc1YTEmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL05vdEZvdW5kLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zM2NlMjVkNiZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Ob3RGb3VuZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL05vdEZvdW5kLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL3Rob21hc3Jvb3ZlcnMvRGV2ZWxvcGVyL0J1bmRsZXMvTW9iaWxlQnVuZGxlL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzMzY2UyNWQ2JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzMzY2UyNWQ2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzMzY2UyNWQ2JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Ob3RGb3VuZC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MzNjZTI1ZDYmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMzNjZTI1ZDYnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIlJlc291cmNlcy9hc3NldHMvdnVlL3ZpZXdzL2Vycm9ycy9Ob3RGb3VuZC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTAtMCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL05vdEZvdW5kLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0wLTAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Ob3RGb3VuZC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTm90Rm91bmQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTMzY2UyNWQ2JlwiIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cbiAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCIkcm91dGUubWV0YS5hdXRoXCI+XG4gICAgICAgICAgICA8aGVhZGVyLz5cblxuICAgICAgICAgICAgPG1haW4+XG4gICAgICAgICAgICAgICAgPGFzaWRlPjwvYXNpZGU+XG5cbiAgICAgICAgICAgICAgICA8bWFpbj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLTxoZWFkZXIvPi0tPlxuXG4gICAgICAgICAgICAgICAgICAgIDxtYWluPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJvdXRlci12aWV3Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L21haW4+XG5cbiAgICAgICAgICAgICAgICAgICAgPGZvb3Rlci8+XG4gICAgICAgICAgICAgICAgPC9tYWluPlxuICAgICAgICAgICAgPC9tYWluPlxuICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICA8bWFpbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItdmlldy8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9tYWluPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG5cbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7fVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQXBwLnZ1ZSBjcmVhdGVkJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYmVmb3JlUm91dGVFbnRlcih0bywgZnJvbSwgbmV4dCkge1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHt9LFxuICAgIH1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgQ2FyZCB0aXRsZVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAvL1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJlZm9yZVJvdXRlRW50ZXIodG8sIGZyb20sIG5leHQpIHtcbiAgICAgICAgbmV4dCgpO1xuICAgIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMiBjb2wtbWQtNiBvZmZzZXQtbWQtMyBjb2wtbGctNCBvZmZzZXQtbGctNFwiPlxuICAgICAgICA8dnVlLWZvcm1cbiAgICAgICAgICByZWY9XCJmb3JtXCJcbiAgICAgICAgICA6dXJsPVwicm91dGUoJ3Z1ZS5wYXNzd29yZC5mb3Jnb3QnKVwiXG4gICAgICAgICAgOm1vZGVsPVwidXNlclwiXG4gICAgICAgICAgQHN1Ym1pdDpzdWNjZXNzPVwic3VjY2Vzc1wiXG4gICAgICAgICAgQHN1Ym1pdDplcnJvcj1cInN1Ym1pdEVycm9yXCJcbiAgICAgICAgPlxuICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90LXNjb3BlPVwieyBmb3JtLCBtb2RlbCB9XCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHYtbG9hZGluZz1cImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FyZFwiXG4gICAgICAgICAgICAgIGVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kPVwicmdiYSgyNDgsMjUwLDI1MiwwLjYpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgV2FjaHR3b29yZCB2ZXJnZXRlblxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0LXRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkUtbWFpbGFkcmVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDptb2RlbD1cIm1vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtZm9vdGVyIGhhcy1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgPGVsLWJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgbmF0aXZlLXR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFdhY2h0d29vcmQgcmVzZXR0ZW5cbiAgICAgICAgICAgICAgICA8L2VsLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3Z1ZS1mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXNlcjoge30sXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgIHRoaXMuJG1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdVIGhlZWZ0IGVlbiBlLW1haWwgb250dmFuZ2VuIG9tIHV3IHdhY2h0d29vcmQgdGUgcmVzZXR0ZW4nLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuJHJlZnMuZm9ybS5yZXNldCgpO1xuICAgICAgICB9LFxuICAgIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMiBjb2wtbWQtNiBvZmZzZXQtbWQtMyBjb2wtbGctNCBvZmZzZXQtbGctNFwiPlxuICAgICAgICA8dnVlLWZvcm1cbiAgICAgICAgICA6bW9kZWw9XCJ1c2VyXCJcbiAgICAgICAgICA6dXJsPVwicm91dGUoJ2F1dGgvbG9naW4nKVwiXG4gICAgICAgICAgQHN1Ym1pdDpzdWNjZXNzPVwiYXV0aGVudGljYXRlZFwiXG4gICAgICAgICAgQHN1Ym1pdDplcnJvcj1cImVycm9yXCJcbiAgICAgICAgPlxuICAgICAgICAgIDx0ZW1wbGF0ZSBzbG90LXNjb3BlPVwieyBmb3JtLCBtb2RlbCB9XCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHYtbG9hZGluZz1cImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FyZFwiXG4gICAgICAgICAgICAgIGVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kPVwicmdiYSgyNDgsMjUwLDI1MiwwLjYpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgSW5sb2dnZW5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtdGV4dFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJFLW1haWxhZHJlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFLW1haWxhZHJlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgOm1vZGVsPVwibW9kZWxcIlxuICAgICAgICAgICAgICAgICAgICAgIDpmb3JtPVwiZm9ybVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiV2FjaHR3b29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJXYWNodHdvb3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbC1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgbmF0aXZlLXR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgSW5sb2dnZW5cbiAgICAgICAgICAgICAgICAgICAgPC9lbC1idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxlbC1idXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwicmVzZXRQYXNzd29yZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIFdhY2h0d29vcmQgdmVyZ2V0ZW5cbiAgICAgICAgICAgICAgICAgICAgPC9lbC1idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3Z1ZS1mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXRhKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgIGVtYWlsOiBudWxsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIGF1dGhlbnRpY2F0ZWQocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIHRoaXMuJG9hdXRoLnN0b3JlU2Vzc2lvbihyZXNwb25zZSk7XG4gICAgICAgICAgICAvLyB0aGlzLiRvYXV0aC5hZGRBdXRoSGVhZGVycygpO1xuXG4gICAgICAgICAgICAvLyB0aGlzLiRyb3V0ZXIucmVwbGFjZSh7bmFtZTogJ2Rhc2hib2FyZCd9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBlcnJvcihlcnJvcikge1xuICAgICAgICAgICAgLy8gdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAvLyB0aGlzLnVzZXIucGFzc3dvcmQgPSBudWxsO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGxldCBtZXNzYWdlID0gJ0VyIGlzIGlldHMgbWlzIGdlZ2FhbiwgcHJvYmVlciBoZXQgb3BuaWV1dyc7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gaWYgKGVycm9yLnN0YXR1cyA9PT0gNDIyKSB7XG4gICAgICAgICAgICAvLyAgIG1lc3NhZ2UgPSAnRGUgaW5nZXZvZXJkZSBnZWdldmVucyB6aWpuIG9uanVpc3QnO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlc2V0UGFzc3dvcmQoKSB7XG4gICAgICAgICAgICB0aGlzLiRyb3V0ZXIucHVzaCh7bmFtZTogJ3Bhc3N3b3JkLmZvcmdvdCd9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdlxuICAgICAgICB2LWlmPVwidXNlclwiXG4gICAgICAgIGNsYXNzPVwiY29sLXNtLTEyIGNvbC1tZC02IG9mZnNldC1tZC0zIGNvbC1sZy00IG9mZnNldC1sZy00XCJcbiAgICAgID5cbiAgICAgICAgPHZ1ZS1mb3JtXG4gICAgICAgICAgOm1vZGVsPVwidXNlclwiXG4gICAgICAgICAgOnVybD1cInJvdXRlKCd2dWUucmVnaXN0ZXInKVwiXG4gICAgICAgICAgQHN1Ym1pdDpzdWNjZXNzPVwicmVnaXN0cmF0ZWRcIlxuICAgICAgICAgIEBzdWJtaXQ6ZXJyb3I9XCJlcnJvclwiXG4gICAgICAgID5cbiAgICAgICAgICA8dGVtcGxhdGUgc2xvdC1zY29wZT1cInsgZm9ybSwgbW9kZWwgfVwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICB2LWxvYWRpbmc9XCJmb3JtLnN1Ym1pdHRpbmdcIlxuICAgICAgICAgICAgICBjbGFzcz1cImNhcmRcIlxuICAgICAgICAgICAgICBlbGVtZW50LWxvYWRpbmctYmFja2dyb3VuZD1cInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIFJlZ2lzdHJlcmVuXG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG1hcmdpbi1ib3R0b20tc21cIj5cbiAgICAgICAgICAgICAgICAgIDxlbC1hbGVydFxuICAgICAgICAgICAgICAgICAgICB2LWlmPVwiYWN0aXZhdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJVdyBhY2NvdW50IGlzIGdlYWN0aXZlZXJkLCB1IGt1bnQgbnUgaW5sb2dnZW4gaW4gZGUgYXBwXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInN1Y2Nlc3NcIlxuICAgICAgICAgICAgICAgICAgICA6Y2xvc2FibGU9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtdGV4dFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJmaXJzdF9uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlZvb3JuYWFtXCJcbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlZvb3JuYWFtXCJcbiAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtdGV4dFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJsYXN0X25hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiQWNodGVybmFhbVwiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJBY2h0ZXJuYWFtXCJcbiAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiV2FjaHR3b29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJXYWNodHdvb3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQtcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRfY29uZmlybWF0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIldhY2h0d29vcmQgYmV2ZXN0aWdlblwiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJXYWNodHdvb3JkIGJldmVzdGlnZW5cIlxuICAgICAgICAgICAgICAgICAgICAgIDptb2RlbD1cIm1vZGVsXCJcbiAgICAgICAgICAgICAgICAgICAgICA6Zm9ybT1cImZvcm1cIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZvb3RlciBoYXMtYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxlbC1idXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIG5hdGl2ZS10eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBSZWdpc3RyZXJlblxuICAgICAgICAgICAgICAgIDwvZWwtYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvdnVlLWZvcm0+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXG4gIHByb3BzOiB7XG4gICAgdG9rZW46IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH1cbiAgfSxcblxuICBiZWZvcmVSb3V0ZUVudGVyKHRvLCBmcm9tLCBuZXh0KSB7XG4gICAgYXhpb3MuZ2V0KGAke3RvLnBhcmFtcy50b2tlbn1gKS50aGVuKCh7ZGF0YToge2RhdGE6IHVzZXJ9fSkgPT4ge1xuICAgICAgbmV4dCh2bSA9PiB7XG4gICAgICAgIHZtLnVzZXIgPSB1c2VyO1xuICAgICAgfSk7XG4gICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgbmV4dCgpO1xuICAgIH0pXG4gIH0sXG5cbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcjogbnVsbCxcbiAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgYWN0aXZhdGVkOiBmYWxzZVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG5cbiAgICByZWdpc3RyYXRlZChyZXNwb25zZSkge1xuICAgICAgaWYgKCFyZXNwb25zZS5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnVzZXIgPSB7fTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuJG9hdXRoLnN0b3JlU2Vzc2lvbihyZXNwb25zZSk7XG4gICAgICB0aGlzLiRvYXV0aC5hZGRBdXRoSGVhZGVycygpO1xuXG4gICAgICB0aGlzLiRyb3V0ZXIucmVwbGFjZSh7bmFtZTogJ2Rhc2hib2FyZCd9KTtcblxuICAgICAgRXZlbnRzLiRlbWl0KCd1c2VyczphdXRoZW50aWNhdGVkJyk7XG4gICAgfSxcblxuICAgIGVycm9yKGVycm9yKSB7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMudXNlci5wYXNzd29yZCA9IG51bGw7XG4gICAgICB0aGlzLnVzZXIucGFzc3dvcmRfY29uZmlybWF0aW9uID0gbnVsbDtcblxuICAgICAgdGhpcy4kbWVzc2FnZSh7XG4gICAgICAgIG1lc3NhZ2U6ICdFciBpcyBpZXRzIG1pcyBnZWdhYW4sIHByb2JlZXIgaGV0IG9wbmlldXcnLFxuICAgICAgICB0eXBlOiAnZXJyb3InXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdlxuICAgICAgICB2LWlmPVwiYWN0aW9uXCJcbiAgICAgICAgY2xhc3M9XCJjb2wtc20tMTIgY29sLW1kLTYgb2Zmc2V0LW1kLTMgY29sLWxnLTQgb2Zmc2V0LWxnLTRcIlxuICAgICAgPlxuICAgICAgICA8dnVlLWZvcm1cbiAgICAgICAgICByZWY9XCJmb3JtXCJcbiAgICAgICAgICA6dXJsPVwicm91dGUoJ3Z1ZS5wYXNzd29yZC5yZXNldCcpXCJcbiAgICAgICAgICA6bW9kZWw9XCJhY3Rpb25cIlxuICAgICAgICAgIEBzdWJtaXQ6c3VjY2Vzcz1cImxvZ2luXCJcbiAgICAgICAgICBAc3VibWl0OmVycm9yPVwic3VibWl0RXJyb3JcIlxuICAgICAgICA+XG4gICAgICAgICAgPHRlbXBsYXRlIHNsb3Qtc2NvcGU9XCJ7IGZvcm0sIG1vZGVsIH1cIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgdi1sb2FkaW5nPVwiZm9ybS5zdWJtaXR0aW5nXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJjYXJkXCJcbiAgICAgICAgICAgICAgZWxlbWVudC1sb2FkaW5nLWJhY2tncm91bmQ9XCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICBXYWNodHdvb3JkIHJlc2V0dGVuXG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZWwtYWxlcnRcbiAgICAgICAgICAgICAgICAgIHYtaWY9XCJhcHBQYXNzd29yZENoYW5nZWRcIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJVdyB3YWNodHdvb3JkIGlzIGdld2lqemlnZCwgdSBrdW50IG51IGlubG9nZ2VuIGluIGRlIGFwcFwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwic3VjY2Vzc1wiXG4gICAgICAgICAgICAgICAgICBzaG93LWljb25cbiAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dC1wYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJXYWNodHdvb3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dC1wYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJwYXNzd29yZF9jb25maXJtYXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV2FjaHR3b29yZCBiZXZlc3RpZ2VuXCJcbiAgICAgICAgICAgICAgICAgICAgICA6bW9kZWw9XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgOmZvcm09XCJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1mb290ZXIgaGFzLWJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICA8ZWwtYnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICBuYXRpdmUtdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgV2FjaHR3b29yZCByZXNldHRlblxuICAgICAgICAgICAgICAgIDwvZWwtYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvdnVlLWZvcm0+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHByb3BzOiB7XG4gICAgICAgIHRva2VuOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY3Rpb246IG51bGwsXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGFwcFBhc3N3b3JkQ2hhbmdlZDogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBiZWZvcmVSb3V0ZUVudGVyKHRvLCBmcm9tLCBuZXh0KSB7XG4gICAgICAgIGF4aW9zLmdldCh0aGlzLnJvdXRlKCcvdXNlcnMvcGFzc3dvcmQvOnRva2VuJywge3Rva2VuOiB0by5wYXJhbXMudG9rZW59KSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBuZXh0KHZtID0+IHtcbiAgICAgICAgICAgICAgICB2bS5hY3Rpb24gPSByZXNwb25zZS5kYXRhLmRhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgbmV4dCh2bSA9PiB7XG4gICAgICAgICAgICAgICAgdm0uJHJvdXRlci5yZXBsYWNlKHtuYW1lOiAnbG9naW4nfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRtZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuICAgICAgICBsb2dpbihyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmFjY2Vzc190b2tlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuJG9hdXRoLnN0b3JlU2Vzc2lvbihyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kb2F1dGguYWRkQXV0aEhlYWRlcnMoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKCdkYXNoYm9hcmQnKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJG1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnVXcgd2FjaHR3b29yZCBpcyBnZXdpanppZ2QnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcydcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIEV2ZW50cy4kZW1pdCgndXNlcnM6YXV0aGVudGljYXRlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcFBhc3N3b3JkQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5mb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZXJyb3IoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLiRtZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgV2hvb3BzLCA0MDQuXG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcblxufVxuPC9zY3JpcHQ+IiwidmFyIG1hcCA9IHtcblx0XCIuL2FmXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hZi5qc1wiLFxuXHRcIi4vYWYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FmLmpzXCIsXG5cdFwiLi9hclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIuanNcIixcblx0XCIuL2FyLWR6XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1kei5qc1wiLFxuXHRcIi4vYXItZHouanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWR6LmpzXCIsXG5cdFwiLi9hci1rd1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXIta3cuanNcIixcblx0XCIuL2FyLWt3LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1rdy5qc1wiLFxuXHRcIi4vYXItbHlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLWx5LmpzXCIsXG5cdFwiLi9hci1seS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItbHkuanNcIixcblx0XCIuL2FyLW1hXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1tYS5qc1wiLFxuXHRcIi4vYXItbWEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLW1hLmpzXCIsXG5cdFwiLi9hci1zYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItc2EuanNcIixcblx0XCIuL2FyLXNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci1zYS5qc1wiLFxuXHRcIi4vYXItdG5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2FyLXRuLmpzXCIsXG5cdFwiLi9hci10bi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXItdG4uanNcIixcblx0XCIuL2FyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9hci5qc1wiLFxuXHRcIi4vYXpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2F6LmpzXCIsXG5cdFwiLi9hei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYXouanNcIixcblx0XCIuL2JlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZS5qc1wiLFxuXHRcIi4vYmUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JlLmpzXCIsXG5cdFwiLi9iZ1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYmcuanNcIixcblx0XCIuL2JnLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iZy5qc1wiLFxuXHRcIi4vYm1cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JtLmpzXCIsXG5cdFwiLi9ibS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm0uanNcIixcblx0XCIuL2JuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ibi5qc1wiLFxuXHRcIi4vYm4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JuLmpzXCIsXG5cdFwiLi9ib1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYm8uanNcIixcblx0XCIuL2JvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9iby5qc1wiLFxuXHRcIi4vYnJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JyLmpzXCIsXG5cdFwiLi9ici5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvYnIuanNcIixcblx0XCIuL2JzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9icy5qc1wiLFxuXHRcIi4vYnMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2JzLmpzXCIsXG5cdFwiLi9jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY2EuanNcIixcblx0XCIuL2NhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jYS5qc1wiLFxuXHRcIi4vY3NcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2NzLmpzXCIsXG5cdFwiLi9jcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3MuanNcIixcblx0XCIuL2N2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jdi5qc1wiLFxuXHRcIi4vY3YuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2N2LmpzXCIsXG5cdFwiLi9jeVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvY3kuanNcIixcblx0XCIuL2N5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9jeS5qc1wiLFxuXHRcIi4vZGFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RhLmpzXCIsXG5cdFwiLi9kYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGEuanNcIixcblx0XCIuL2RlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS5qc1wiLFxuXHRcIi4vZGUtYXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWF0LmpzXCIsXG5cdFwiLi9kZS1hdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUtYXQuanNcIixcblx0XCIuL2RlLWNoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kZS1jaC5qc1wiLFxuXHRcIi4vZGUtY2guanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2RlLWNoLmpzXCIsXG5cdFwiLi9kZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZGUuanNcIixcblx0XCIuL2R2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9kdi5qc1wiLFxuXHRcIi4vZHYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2R2LmpzXCIsXG5cdFwiLi9lbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZWwuanNcIixcblx0XCIuL2VsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbC5qc1wiLFxuXHRcIi4vZW4tU0dcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLVNHLmpzXCIsXG5cdFwiLi9lbi1TRy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tU0cuanNcIixcblx0XCIuL2VuLWF1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1hdS5qc1wiLFxuXHRcIi4vZW4tYXUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWF1LmpzXCIsXG5cdFwiLi9lbi1jYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tY2EuanNcIixcblx0XCIuL2VuLWNhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1jYS5qc1wiLFxuXHRcIi4vZW4tZ2JcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWdiLmpzXCIsXG5cdFwiLi9lbi1nYi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tZ2IuanNcIixcblx0XCIuL2VuLWllXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pZS5qc1wiLFxuXHRcIi4vZW4taWUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLWllLmpzXCIsXG5cdFwiLi9lbi1pbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4taWwuanNcIixcblx0XCIuL2VuLWlsLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lbi1pbC5qc1wiLFxuXHRcIi4vZW4tbnpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VuLW56LmpzXCIsXG5cdFwiLi9lbi1uei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZW4tbnouanNcIixcblx0XCIuL2VvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lby5qc1wiLFxuXHRcIi4vZW8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VvLmpzXCIsXG5cdFwiLi9lc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMuanNcIixcblx0XCIuL2VzLWRvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy1kby5qc1wiLFxuXHRcIi4vZXMtZG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLWRvLmpzXCIsXG5cdFwiLi9lcy11c1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXMtdXMuanNcIixcblx0XCIuL2VzLXVzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9lcy11cy5qc1wiLFxuXHRcIi4vZXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2VzLmpzXCIsXG5cdFwiLi9ldFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXQuanNcIixcblx0XCIuL2V0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ldC5qc1wiLFxuXHRcIi4vZXVcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2V1LmpzXCIsXG5cdFwiLi9ldS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZXUuanNcIixcblx0XCIuL2ZhXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mYS5qc1wiLFxuXHRcIi4vZmEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZhLmpzXCIsXG5cdFwiLi9maVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZmkuanNcIixcblx0XCIuL2ZpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9maS5qc1wiLFxuXHRcIi4vZm9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZvLmpzXCIsXG5cdFwiLi9mby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZm8uanNcIixcblx0XCIuL2ZyXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci5qc1wiLFxuXHRcIi4vZnItY2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNhLmpzXCIsXG5cdFwiLi9mci1jYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnItY2EuanNcIixcblx0XCIuL2ZyLWNoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9mci1jaC5qc1wiLFxuXHRcIi4vZnItY2guanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2ZyLWNoLmpzXCIsXG5cdFwiLi9mci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZnIuanNcIixcblx0XCIuL2Z5XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9meS5qc1wiLFxuXHRcIi4vZnkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2Z5LmpzXCIsXG5cdFwiLi9nYVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2EuanNcIixcblx0XCIuL2dhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nYS5qc1wiLFxuXHRcIi4vZ2RcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dkLmpzXCIsXG5cdFwiLi9nZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ2QuanNcIixcblx0XCIuL2dsXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nbC5qc1wiLFxuXHRcIi4vZ2wuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2dsLmpzXCIsXG5cdFwiLi9nb20tbGF0blwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ29tLWxhdG4uanNcIixcblx0XCIuL2dvbS1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9nb20tbGF0bi5qc1wiLFxuXHRcIi4vZ3VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2d1LmpzXCIsXG5cdFwiLi9ndS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvZ3UuanNcIixcblx0XCIuL2hlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oZS5qc1wiLFxuXHRcIi4vaGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hlLmpzXCIsXG5cdFwiLi9oaVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaGkuanNcIixcblx0XCIuL2hpLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oaS5qc1wiLFxuXHRcIi4vaHJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2hyLmpzXCIsXG5cdFwiLi9oci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHIuanNcIixcblx0XCIuL2h1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9odS5qc1wiLFxuXHRcIi4vaHUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2h1LmpzXCIsXG5cdFwiLi9oeS1hbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaHktYW0uanNcIixcblx0XCIuL2h5LWFtLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9oeS1hbS5qc1wiLFxuXHRcIi4vaWRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lkLmpzXCIsXG5cdFwiLi9pZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaWQuanNcIixcblx0XCIuL2lzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pcy5qc1wiLFxuXHRcIi4vaXMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2lzLmpzXCIsXG5cdFwiLi9pdFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2l0LWNoXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9pdC1jaC5qc1wiLFxuXHRcIi4vaXQtY2guanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2l0LWNoLmpzXCIsXG5cdFwiLi9pdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvaXQuanNcIixcblx0XCIuL2phXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qYS5qc1wiLFxuXHRcIi4vamEuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2phLmpzXCIsXG5cdFwiLi9qdlwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvanYuanNcIixcblx0XCIuL2p2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9qdi5qc1wiLFxuXHRcIi4va2FcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2thLmpzXCIsXG5cdFwiLi9rYS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva2EuanNcIixcblx0XCIuL2trXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ray5qc1wiLFxuXHRcIi4va2suanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2trLmpzXCIsXG5cdFwiLi9rbVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva20uanNcIixcblx0XCIuL2ttLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rbS5qc1wiLFxuXHRcIi4va25cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tuLmpzXCIsXG5cdFwiLi9rbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva24uanNcIixcblx0XCIuL2tvXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rby5qc1wiLFxuXHRcIi4va28uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2tvLmpzXCIsXG5cdFwiLi9rdVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva3UuanNcIixcblx0XCIuL2t1LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9rdS5qc1wiLFxuXHRcIi4va3lcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2t5LmpzXCIsXG5cdFwiLi9reS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUva3kuanNcIixcblx0XCIuL2xiXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sYi5qc1wiLFxuXHRcIi4vbGIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2xiLmpzXCIsXG5cdFwiLi9sb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbG8uanNcIixcblx0XCIuL2xvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sby5qc1wiLFxuXHRcIi4vbHRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x0LmpzXCIsXG5cdFwiLi9sdC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbHQuanNcIixcblx0XCIuL2x2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9sdi5qc1wiLFxuXHRcIi4vbHYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL2x2LmpzXCIsXG5cdFwiLi9tZVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWUuanNcIixcblx0XCIuL21lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tZS5qc1wiLFxuXHRcIi4vbWlcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21pLmpzXCIsXG5cdFwiLi9taS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWkuanNcIixcblx0XCIuL21rXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tay5qc1wiLFxuXHRcIi4vbWsuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21rLmpzXCIsXG5cdFwiLi9tbFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbWwuanNcIixcblx0XCIuL21sLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tbC5qc1wiLFxuXHRcIi4vbW5cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21uLmpzXCIsXG5cdFwiLi9tbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbW4uanNcIixcblx0XCIuL21yXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tci5qc1wiLFxuXHRcIi4vbXIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21yLmpzXCIsXG5cdFwiLi9tc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMuanNcIixcblx0XCIuL21zLW15XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tcy1teS5qc1wiLFxuXHRcIi4vbXMtbXkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL21zLW15LmpzXCIsXG5cdFwiLi9tcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXMuanNcIixcblx0XCIuL210XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9tdC5qc1wiLFxuXHRcIi4vbXQuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL210LmpzXCIsXG5cdFwiLi9teVwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbXkuanNcIixcblx0XCIuL215LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9teS5qc1wiLFxuXHRcIi4vbmJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25iLmpzXCIsXG5cdFwiLi9uYi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmIuanNcIixcblx0XCIuL25lXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9uZS5qc1wiLFxuXHRcIi4vbmUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25lLmpzXCIsXG5cdFwiLi9ubFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwuanNcIixcblx0XCIuL25sLWJlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubC1iZS5qc1wiLFxuXHRcIi4vbmwtYmUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25sLWJlLmpzXCIsXG5cdFwiLi9ubC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvbmwuanNcIixcblx0XCIuL25uXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ubi5qc1wiLFxuXHRcIi4vbm4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL25uLmpzXCIsXG5cdFwiLi9wYS1pblwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGEtaW4uanNcIixcblx0XCIuL3BhLWluLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wYS1pbi5qc1wiLFxuXHRcIi4vcGxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3BsLmpzXCIsXG5cdFwiLi9wbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcGwuanNcIixcblx0XCIuL3B0XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC5qc1wiLFxuXHRcIi4vcHQtYnJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3B0LWJyLmpzXCIsXG5cdFwiLi9wdC1ici5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcHQtYnIuanNcIixcblx0XCIuL3B0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9wdC5qc1wiLFxuXHRcIi4vcm9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3JvLmpzXCIsXG5cdFwiLi9yby5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvcm8uanNcIixcblx0XCIuL3J1XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9ydS5qc1wiLFxuXHRcIi4vcnUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3J1LmpzXCIsXG5cdFwiLi9zZFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2QuanNcIixcblx0XCIuL3NkLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zZC5qc1wiLFxuXHRcIi4vc2VcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NlLmpzXCIsXG5cdFwiLi9zZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2UuanNcIixcblx0XCIuL3NpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zaS5qc1wiLFxuXHRcIi4vc2kuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NpLmpzXCIsXG5cdFwiLi9za1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2suanNcIixcblx0XCIuL3NrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zay5qc1wiLFxuXHRcIi4vc2xcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NsLmpzXCIsXG5cdFwiLi9zbC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc2wuanNcIixcblx0XCIuL3NxXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zcS5qc1wiLFxuXHRcIi4vc3EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NxLmpzXCIsXG5cdFwiLi9zclwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3IuanNcIixcblx0XCIuL3NyLWN5cmxcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLWN5cmwuanNcIixcblx0XCIuL3NyLWN5cmwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NyLWN5cmwuanNcIixcblx0XCIuL3NyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zci5qc1wiLFxuXHRcIi4vc3NcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3NzLmpzXCIsXG5cdFwiLi9zcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3MuanNcIixcblx0XCIuL3N2XCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdi5qc1wiLFxuXHRcIi4vc3YuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3N2LmpzXCIsXG5cdFwiLi9zd1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvc3cuanNcIixcblx0XCIuL3N3LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS9zdy5qc1wiLFxuXHRcIi4vdGFcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RhLmpzXCIsXG5cdFwiLi90YS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGEuanNcIixcblx0XCIuL3RlXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZS5qc1wiLFxuXHRcIi4vdGUuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RlLmpzXCIsXG5cdFwiLi90ZXRcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RldC5qc1wiLFxuXHRcIi4vdGV0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90ZXQuanNcIixcblx0XCIuL3RnXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90Zy5qc1wiLFxuXHRcIi4vdGcuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RnLmpzXCIsXG5cdFwiLi90aFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGguanNcIixcblx0XCIuL3RoLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90aC5qc1wiLFxuXHRcIi4vdGwtcGhcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsLXBoLmpzXCIsXG5cdFwiLi90bC1waC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGwtcGguanNcIixcblx0XCIuL3RsaFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdGxoLmpzXCIsXG5cdFwiLi90bGguanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RsaC5qc1wiLFxuXHRcIi4vdHJcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3RyLmpzXCIsXG5cdFwiLi90ci5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHIuanNcIixcblx0XCIuL3R6bFwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdHpsLmpzXCIsXG5cdFwiLi90emwuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bC5qc1wiLFxuXHRcIi4vdHptXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0uanNcIixcblx0XCIuL3R6bS1sYXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS90em0tbGF0bi5qc1wiLFxuXHRcIi4vdHptLWxhdG4uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS1sYXRuLmpzXCIsXG5cdFwiLi90em0uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3R6bS5qc1wiLFxuXHRcIi4vdWctY25cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VnLWNuLmpzXCIsXG5cdFwiLi91Zy1jbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdWctY24uanNcIixcblx0XCIuL3VrXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ay5qc1wiLFxuXHRcIi4vdWsuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3VrLmpzXCIsXG5cdFwiLi91clwiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXIuanNcIixcblx0XCIuL3VyLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ci5qc1wiLFxuXHRcIi4vdXpcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3V6LmpzXCIsXG5cdFwiLi91ei1sYXRuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei1sYXRuLmpzXCIsXG5cdFwiLi91ei1sYXRuLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS91ei1sYXRuLmpzXCIsXG5cdFwiLi91ei5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvdXouanNcIixcblx0XCIuL3ZpXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS92aS5qc1wiLFxuXHRcIi4vdmkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3ZpLmpzXCIsXG5cdFwiLi94LXBzZXVkb1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveC1wc2V1ZG8uanNcIixcblx0XCIuL3gtcHNldWRvLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS94LXBzZXVkby5qc1wiLFxuXHRcIi4veW9cIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3lvLmpzXCIsXG5cdFwiLi95by5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUveW8uanNcIixcblx0XCIuL3poLWNuXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1jbi5qc1wiLFxuXHRcIi4vemgtY24uanNcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLWNuLmpzXCIsXG5cdFwiLi96aC1oa1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtaGsuanNcIixcblx0XCIuL3poLWhrLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZS96aC1oay5qc1wiLFxuXHRcIi4vemgtdHdcIjogXCIuL25vZGVfbW9kdWxlcy9tb21lbnQvbG9jYWxlL3poLXR3LmpzXCIsXG5cdFwiLi96aC10dy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL21vbWVudC9sb2NhbGUvemgtdHcuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvbW9tZW50L2xvY2FsZSBzeW5jIHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qJFwiOyIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImNvbnRhaW5lci1mbHVpZFwiIH0sXG4gICAgW1xuICAgICAgX3ZtLiRyb3V0ZS5tZXRhLmF1dGhcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBfYyhcImhlYWRlclwiKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcIm1haW5cIiwgW1xuICAgICAgICAgICAgICBfYyhcImFzaWRlXCIpLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcIm1haW5cIiwgW1xuICAgICAgICAgICAgICAgIF9jKFwibWFpblwiLCBbXG4gICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgW19jKFwicm91dGVyLXZpZXdcIildLFxuICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiZm9vdGVyXCIpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXG4gICAgICAgICAgICBfYyhcIm1haW5cIiwgW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sIFtfYyhcInJvdXRlci12aWV3XCIpXSwgMSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgXVxuICAgIF0sXG4gICAgMlxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfdm0uX20oMClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXG4gIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdm0gPSB0aGlzXG4gICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTJcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZFwiIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtaGVhZGVyXCIgfSwgW1xuICAgICAgICAgICAgX3ZtLl92KFwiXFxuICAgICAgICBDYXJkIHRpdGxlXFxuICAgICAgXCIpXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtYm9keVwiIH0pXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF0pXG4gIH1cbl1cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbnRhaW5lci1mbHVpZFwiIH0sIFtcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMiBjb2wtbWQtNiBvZmZzZXQtbWQtMyBjb2wtbGctNCBvZmZzZXQtbGctNFwiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcInZ1ZS1mb3JtXCIsIHtcbiAgICAgICAgICAgIHJlZjogXCJmb3JtXCIsXG4gICAgICAgICAgICBhdHRyczogeyB1cmw6IF92bS5yb3V0ZShcInZ1ZS5wYXNzd29yZC5mb3Jnb3RcIiksIG1vZGVsOiBfdm0udXNlciB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgXCJzdWJtaXQ6c3VjY2Vzc1wiOiBfdm0uc3VjY2VzcyxcbiAgICAgICAgICAgICAgXCJzdWJtaXQ6ZXJyb3JcIjogX3ZtLnN1Ym1pdEVycm9yXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gcmVmLmZvcm1cbiAgICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHJlZi5tb2RlbFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxvYWRpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmb3JtLnN1Ym1pdHRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJmb3JtLnN1Ym1pdHRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2FyZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50LWxvYWRpbmctYmFja2dyb3VuZFwiOiBcInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtaGVhZGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgIFdhY2h0d29vcmQgdmVyZ2V0ZW5cXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtYm9keVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLXJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dC10ZXh0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW1haWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiRS1tYWlsYWRyZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjYXJkLWZvb3RlciBoYXMtYnV0dG9uc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYXRpdmUtdHlwZVwiOiBcInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICBXYWNodHdvb3JkIHJlc2V0dGVuXFxuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdKVxuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250YWluZXItZmx1aWRcIiB9LCBbXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyb3dcIiB9LCBbXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtc20tMTIgY29sLW1kLTYgb2Zmc2V0LW1kLTMgY29sLWxnLTQgb2Zmc2V0LWxnLTRcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ2dWUtZm9ybVwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyBtb2RlbDogX3ZtLnVzZXIsIHVybDogX3ZtLnJvdXRlKFwiYXV0aC9sb2dpblwiKSB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgXCJzdWJtaXQ6c3VjY2Vzc1wiOiBfdm0uYXV0aGVudGljYXRlZCxcbiAgICAgICAgICAgICAgXCJzdWJtaXQ6ZXJyb3JcIjogX3ZtLmVycm9yXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gcmVmLmZvcm1cbiAgICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHJlZi5tb2RlbFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxvYWRpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtbG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmb3JtLnN1Ym1pdHRpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJmb3JtLnN1Ym1pdHRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY2FyZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50LWxvYWRpbmctYmFja2dyb3VuZFwiOiBcInJnYmEoMjQ4LDI1MCwyNTIsMC42KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtaGVhZGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCJcXG4gICAgICAgICAgICAgIElubG9nZ2VuXFxuICAgICAgICAgICAgXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtYm9keVwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLXJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtdGV4dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZW1haWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkUtbWFpbGFkcmVzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJFLW1haWxhZHJlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLXJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtcGFzc3dvcmRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhc3N3b3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJXYWNodHdvb3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJXYWNodHdvb3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNhcmQtZm9vdGVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmF0aXZlLXR5cGVcIjogXCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgICAgICAgICAgSW5sb2dnZW5cXG4gICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJjb2wtYXV0b1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJ0ZXh0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnJlc2V0UGFzc3dvcmQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgICAgICBXYWNodHdvb3JkIHZlcmdldGVuXFxuICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbnRhaW5lci1mbHVpZFwiIH0sIFtcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgIF92bS51c2VyXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjb2wtc20tMTIgY29sLW1kLTYgb2Zmc2V0LW1kLTMgY29sLWxnLTQgb2Zmc2V0LWxnLTRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2dWUtZm9ybVwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgbW9kZWw6IF92bS51c2VyLCB1cmw6IF92bS5yb3V0ZShcInZ1ZS5yZWdpc3RlclwiKSB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBcInN1Ym1pdDpzdWNjZXNzXCI6IF92bS5yZWdpc3RyYXRlZCxcbiAgICAgICAgICAgICAgICAgIFwic3VibWl0OmVycm9yXCI6IF92bS5lcnJvclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSByZWYuZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gcmVmLm1vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1sb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZvcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWhlYWRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICBSZWdpc3RyZXJlblxcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1ib2R5XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicm93IG1hcmdpbi1ib3R0b20tc21cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5hY3RpdmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcImVsLWFsZXJ0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXcgYWNjb3VudCBpcyBnZWFjdGl2ZWVyZCwgdSBrdW50IG51IGlubG9nZ2VuIGluIGRlIGFwcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2FibGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtdGV4dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlyc3RfbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVm9vcm5hYW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlZvb3JuYWFtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtdGV4dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGFzdF9uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJBY2h0ZXJuYWFtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJBY2h0ZXJuYWFtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtcGFzc3dvcmRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhc3N3b3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJXYWNodHdvb3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJXYWNodHdvb3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtcGFzc3dvcmRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhc3N3b3JkX2NvbmZpcm1hdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiV2FjaHR3b29yZCBiZXZlc3RpZ2VuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJXYWNodHdvb3JkIGJldmVzdGlnZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBtb2RlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmQtZm9vdGVyIGhhcy1idXR0b25zXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbC1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hdGl2ZS10eXBlXCI6IFwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICAgIFJlZ2lzdHJlcmVuXFxuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgMzg3NzAyNTcxOFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICA6IF92bS5fZSgpXG4gICAgXSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiY29udGFpbmVyLWZsdWlkXCIgfSwgW1xuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgX3ZtLmFjdGlvblxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyIGNvbC1tZC02IG9mZnNldC1tZC0zIGNvbC1sZy00IG9mZnNldC1sZy00XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidnVlLWZvcm1cIiwge1xuICAgICAgICAgICAgICAgIHJlZjogXCJmb3JtXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIHVybDogX3ZtLnJvdXRlKFwidnVlLnBhc3N3b3JkLnJlc2V0XCIpLFxuICAgICAgICAgICAgICAgICAgbW9kZWw6IF92bS5hY3Rpb25cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICBcInN1Ym1pdDpzdWNjZXNzXCI6IF92bS5sb2dpbixcbiAgICAgICAgICAgICAgICAgIFwic3VibWl0OmVycm9yXCI6IF92bS5zdWJtaXRFcnJvclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSByZWYuZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gcmVmLm1vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibG9hZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1sb2FkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZvcm0uc3VibWl0dGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImZvcm0uc3VibWl0dGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjYXJkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnQtbG9hZGluZy1iYWNrZ3JvdW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZ2JhKDI0OCwyNTAsMjUyLDAuNilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWhlYWRlclwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuICAgICAgICAgICAgICBXYWNodHdvb3JkIHJlc2V0dGVuXFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1ib2R5XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5hcHBQYXNzd29yZENoYW5nZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXCJlbC1hbGVydFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlV3IHdhY2h0d29vcmQgaXMgZ2V3aWp6aWdkLCB1IGt1bnQgbnUgaW5sb2dnZW4gaW4gZGUgYXBwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvdy1pY29uXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmb3JtLXJvd1wiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNvbC1zbS0xMlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImlucHV0LXBhc3N3b3JkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiV2FjaHR3b29yZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tcm93XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY29sLXNtLTEyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiaW5wdXQtcGFzc3dvcmRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwYXNzd29yZF9jb25maXJtYXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJXYWNodHdvb3JkIGJldmVzdGlnZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1mb290ZXIgaGFzLWJ1dHRvbnNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVsLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmF0aXZlLXR5cGVcIjogXCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG4gICAgICAgICAgICAgICAgV2FjaHR3b29yZCByZXNldHRlblxcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIDE3MjgyMDY2MDVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgOiBfdm0uX2UoKVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCBbX3ZtLl92KFwiXFxuICBXaG9vcHMsIDQwNC5cXG5cIildKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSJdLCJzb3VyY2VSb290IjoiIn0=