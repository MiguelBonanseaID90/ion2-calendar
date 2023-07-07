(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ionic/angular'), require('moment'), require('@angular/common'), require('@angular/forms')) :
  typeof define === 'function' && define.amd ? define('ion2-calendar', ['exports', '@angular/core', '@ionic/angular', 'moment', '@angular/common', '@angular/forms'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ion2-calendar"] = {}, global.ng.core, global.i1, global.moment, global.ng.common, global.ng.forms));
})(this, (function (exports, i0, i1, moment, i1$1, i6) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
  var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
  var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
  var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
  var i6__namespace = /*#__PURE__*/_interopNamespace(i6);

  var CalendarMonth = /** @class */ (function () {
      function CalendarMonth() {
      }
      return CalendarMonth;
  }());
  var CalendarResult = /** @class */ (function () {
      function CalendarResult() {
      }
      return CalendarResult;
  }());
  var CalendarComponentMonthChange = /** @class */ (function () {
      function CalendarComponentMonthChange() {
      }
      return CalendarComponentMonthChange;
  }());

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise, SuppressedError, Symbol */
  var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b)
              if (Object.prototype.hasOwnProperty.call(b, p))
                  d[p] = b[p]; };
      return extendStatics(d, b);
  };
  function __extends(d, b) {
      if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  var __assign = function () {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s)
                  if (Object.prototype.hasOwnProperty.call(s, p))
                      t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  function __rest(s, e) {
      var t = {};
      for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  }
  function __decorate(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
      else
          for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                  r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  }
  function __param(paramIndex, decorator) {
      return function (target, key) { decorator(target, key, paramIndex); };
  }
  function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
      function accept(f) { if (f !== void 0 && typeof f !== "function")
          throw new TypeError("Function expected"); return f; }
      var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
      var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
      var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
      var _, done = false;
      for (var i = decorators.length - 1; i >= 0; i--) {
          var context = {};
          for (var p in contextIn)
              context[p] = p === "access" ? {} : contextIn[p];
          for (var p in contextIn.access)
              context.access[p] = contextIn.access[p];
          context.addInitializer = function (f) { if (done)
              throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
          var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
          if (kind === "accessor") {
              if (result === void 0)
                  continue;
              if (result === null || typeof result !== "object")
                  throw new TypeError("Object expected");
              if (_ = accept(result.get))
                  descriptor.get = _;
              if (_ = accept(result.set))
                  descriptor.set = _;
              if (_ = accept(result.init))
                  initializers.unshift(_);
          }
          else if (_ = accept(result)) {
              if (kind === "field")
                  initializers.unshift(_);
              else
                  descriptor[key] = _;
          }
      }
      if (target)
          Object.defineProperty(target, contextIn.name, descriptor);
      done = true;
  }
  ;
  function __runInitializers(thisArg, initializers, value) {
      var useValue = arguments.length > 2;
      for (var i = 0; i < initializers.length; i++) {
          value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
      }
      return useValue ? value : void 0;
  }
  ;
  function __propKey(x) {
      return typeof x === "symbol" ? x : "".concat(x);
  }
  ;
  function __setFunctionName(f, name, prefix) {
      if (typeof name === "symbol")
          name = name.description ? "[".concat(name.description, "]") : "";
      return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
  }
  ;
  function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
  }
  function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try {
              step(generator.next(value));
          }
          catch (e) {
              reject(e);
          } }
          function rejected(value) { try {
              step(generator["throw"](value));
          }
          catch (e) {
              reject(e);
          } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }
  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function () { if (t[0] & 1)
              throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f)
              throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
              try {
                  if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                      return t;
                  if (y = 0, t)
                      op = [op[0] & 2, t.value];
                  switch (op[0]) {
                      case 0:
                      case 1:
                          t = op;
                          break;
                      case 4:
                          _.label++;
                          return { value: op[1], done: false };
                      case 5:
                          _.label++;
                          y = op[1];
                          op = [0];
                          continue;
                      case 7:
                          op = _.ops.pop();
                          _.trys.pop();
                          continue;
                      default:
                          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                              _ = 0;
                              continue;
                          }
                          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                              _.label = op[1];
                              break;
                          }
                          if (op[0] === 6 && _.label < t[1]) {
                              _.label = t[1];
                              t = op;
                              break;
                          }
                          if (t && _.label < t[2]) {
                              _.label = t[2];
                              _.ops.push(op);
                              break;
                          }
                          if (t[2])
                              _.ops.pop();
                          _.trys.pop();
                          continue;
                  }
                  op = body.call(thisArg, _);
              }
              catch (e) {
                  op = [6, e];
                  y = 0;
              }
              finally {
                  f = t = 0;
              }
          if (op[0] & 5)
              throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
      }
  }
  var __createBinding = Object.create ? (function (o, m, k, k2) {
      if (k2 === undefined)
          k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function () { return m[k]; } };
      }
      Object.defineProperty(o, k2, desc);
  }) : (function (o, m, k, k2) {
      if (k2 === undefined)
          k2 = k;
      o[k2] = m[k];
  });
  function __exportStar(m, o) {
      for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
              __createBinding(o, m, p);
  }
  function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m)
          return m.call(o);
      if (o && typeof o.length === "number")
          return {
              next: function () {
                  if (o && i >= o.length)
                      o = void 0;
                  return { value: o && o[i++], done: !o };
              }
          };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
          return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
      }
      catch (error) {
          e = { error: error };
      }
      finally {
          try {
              if (r && !r.done && (m = i["return"]))
                  m.call(i);
          }
          finally {
              if (e)
                  throw e.error;
          }
      }
      return ar;
  }
  /** @deprecated */
  function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
      return ar;
  }
  /** @deprecated */
  function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
      return r;
  }
  function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
              if (ar || !(i in from)) {
                  if (!ar)
                      ar = Array.prototype.slice.call(from, 0, i);
                  ar[i] = from[i];
              }
          }
      return to.concat(ar || Array.prototype.slice.call(from));
  }
  function __await(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []), i, q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
      function verb(n) { if (g[n])
          i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
      function resume(n, v) { try {
          step(g[n](v));
      }
      catch (e) {
          settle(q[0][3], e);
      } }
      function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
      function fulfill(value) { resume("next", value); }
      function reject(value) { resume("throw", value); }
      function settle(f, v) { if (f(v), q.shift(), q.length)
          resume(q[0][0], q[0][1]); }
  }
  function __asyncDelegator(o) {
      var i, p;
      return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
      function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
  }
  function __asyncValues(o) {
      if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator], i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
      function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
      function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
  }
  function __makeTemplateObject(cooked, raw) {
      if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
      }
      else {
          cooked.raw = raw;
      }
      return cooked;
  }
  ;
  var __setModuleDefault = Object.create ? (function (o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function (o, v) {
      o["default"] = v;
  };
  function __importStar(mod) {
      if (mod && mod.__esModule)
          return mod;
      var result = {};
      if (mod != null)
          for (var k in mod)
              if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                  __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  }
  function __importDefault(mod) {
      return (mod && mod.__esModule) ? mod : { default: mod };
  }
  function __classPrivateFieldGet(receiver, state, kind, f) {
      if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }
  function __classPrivateFieldSet(receiver, state, value, kind, f) {
      if (kind === "m")
          throw new TypeError("Private method is not writable");
      if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
  }
  function __classPrivateFieldIn(state, receiver) {
      if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function"))
          throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof state === "function" ? receiver === state : state.has(receiver);
  }
  function __addDisposableResource(env, value, async) {
      if (value !== null && value !== void 0) {
          if (typeof value !== "object")
              throw new TypeError("Object expected.");
          var dispose;
          if (async) {
              if (!Symbol.asyncDispose)
                  throw new TypeError("Symbol.asyncDispose is not defined.");
              dispose = value[Symbol.asyncDispose];
          }
          if (dispose === void 0) {
              if (!Symbol.dispose)
                  throw new TypeError("Symbol.dispose is not defined.");
              dispose = value[Symbol.dispose];
          }
          if (typeof dispose !== "function")
              throw new TypeError("Object not disposable.");
          env.stack.push({ value: value, dispose: dispose, async: async });
      }
      else if (async) {
          env.stack.push({ async: true });
      }
      return value;
  }
  var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  function __disposeResources(env) {
      function fail(e) {
          env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
          env.hasError = true;
      }
      function next() {
          while (env.stack.length) {
              var rec = env.stack.pop();
              try {
                  var result = rec.dispose && rec.dispose.call(rec.value);
                  if (rec.async)
                      return Promise.resolve(result).then(next, function (e) { fail(e); return next(); });
              }
              catch (e) {
                  fail(e);
              }
          }
          if (env.hasError)
              throw env.error;
      }
      return next();
  }
  var tslib_es6 = {
      __extends: __extends,
      __assign: __assign,
      __rest: __rest,
      __decorate: __decorate,
      __param: __param,
      __metadata: __metadata,
      __awaiter: __awaiter,
      __generator: __generator,
      __createBinding: __createBinding,
      __exportStar: __exportStar,
      __values: __values,
      __read: __read,
      __spread: __spread,
      __spreadArrays: __spreadArrays,
      __spreadArray: __spreadArray,
      __await: __await,
      __asyncGenerator: __asyncGenerator,
      __asyncDelegator: __asyncDelegator,
      __asyncValues: __asyncValues,
      __makeTemplateObject: __makeTemplateObject,
      __importStar: __importStar,
      __importDefault: __importDefault,
      __classPrivateFieldGet: __classPrivateFieldGet,
      __classPrivateFieldSet: __classPrivateFieldSet,
      __classPrivateFieldIn: __classPrivateFieldIn,
      __addDisposableResource: __addDisposableResource,
      __disposeResources: __disposeResources,
  };

  var defaults = {
      DATE_FORMAT: 'YYYY-MM-DD',
      COLOR: 'primary',
      WEEKS_FORMAT: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      MONTH_FORMAT: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  };
  var pickModes = {
      SINGLE: 'single',
      RANGE: 'range',
      MULTI: 'multi'
  };

  var DEFAULT_CALENDAR_OPTIONS = new i0.InjectionToken('DEFAULT_CALENDAR_MODAL_OPTIONS');

  var isBoolean = function (input) { return input === true || input === false; };
  var CalendarService = /** @class */ (function () {
      function CalendarService(defaultOpts) {
          this.defaultOpts = defaultOpts;
      }
      Object.defineProperty(CalendarService.prototype, "DEFAULT_STEP", {
          get: function () {
              return 12;
          },
          enumerable: false,
          configurable: true
      });
      CalendarService.prototype.safeOpt = function (calendarOptions) {
          if (calendarOptions === void 0) { calendarOptions = {}; }
          var _disableWeeks = [];
          var _daysConfig = [];
          var _b = Object.assign(Object.assign({}, this.defaultOpts), calendarOptions), _c = _b.from, from = _c === void 0 ? new Date() : _c, _d = _b.to, to = _d === void 0 ? 0 : _d, _e = _b.weekStart, weekStart = _e === void 0 ? 0 : _e, _f = _b.step, step = _f === void 0 ? this.DEFAULT_STEP : _f, _g = _b.id, id = _g === void 0 ? '' : _g, _h = _b.cssClass, cssClass = _h === void 0 ? '' : _h, _j = _b.closeLabel, closeLabel = _j === void 0 ? 'CANCEL' : _j, _k = _b.doneLabel, doneLabel = _k === void 0 ? 'DONE' : _k, _l = _b.monthFormat, monthFormat = _l === void 0 ? 'MMM YYYY' : _l, _m = _b.title, title = _m === void 0 ? 'CALENDAR' : _m, _o = _b.defaultTitle, defaultTitle = _o === void 0 ? '' : _o, _p = _b.defaultSubtitle, defaultSubtitle = _p === void 0 ? '' : _p, _q = _b.autoDone, autoDone = _q === void 0 ? false : _q, _r = _b.canBackwardsSelected, canBackwardsSelected = _r === void 0 ? false : _r, _s = _b.closeIcon, closeIcon = _s === void 0 ? false : _s, _t = _b.doneIcon, doneIcon = _t === void 0 ? false : _t, _u = _b.showYearPicker, showYearPicker = _u === void 0 ? false : _u, _v = _b.isSaveHistory, isSaveHistory = _v === void 0 ? false : _v, _w = _b.pickMode, pickMode = _w === void 0 ? pickModes.SINGLE : _w, _x = _b.color, color = _x === void 0 ? defaults.COLOR : _x, _y = _b.weekdays, weekdays = _y === void 0 ? defaults.WEEKS_FORMAT : _y, _z = _b.daysConfig, daysConfig = _z === void 0 ? _daysConfig : _z, _0 = _b.disableWeeks, disableWeeks = _0 === void 0 ? _disableWeeks : _0, _1 = _b.showAdjacentMonthDay, showAdjacentMonthDay = _1 === void 0 ? true : _1, _2 = _b.defaultEndDateToStartDate, defaultEndDateToStartDate = _2 === void 0 ? false : _2, _3 = _b.clearLabel, clearLabel = _3 === void 0 ? null : _3, _4 = _b.maxMultiDates, maxMultiDates = _4 === void 0 ? null : _4;
          return {
              id: id,
              from: from,
              to: to,
              pickMode: pickMode,
              autoDone: autoDone,
              color: color,
              cssClass: cssClass,
              weekStart: weekStart,
              closeLabel: closeLabel,
              closeIcon: closeIcon,
              doneLabel: doneLabel,
              doneIcon: doneIcon,
              canBackwardsSelected: canBackwardsSelected,
              isSaveHistory: isSaveHistory,
              disableWeeks: disableWeeks,
              monthFormat: monthFormat,
              title: title,
              weekdays: weekdays,
              daysConfig: daysConfig,
              step: step,
              showYearPicker: showYearPicker,
              defaultTitle: defaultTitle,
              defaultSubtitle: defaultSubtitle,
              defaultScrollTo: calendarOptions.defaultScrollTo || from,
              defaultDate: calendarOptions.defaultDate || null,
              defaultDates: calendarOptions.defaultDates || null,
              defaultDateRange: calendarOptions.defaultDateRange || null,
              showAdjacentMonthDay: showAdjacentMonthDay,
              defaultEndDateToStartDate: defaultEndDateToStartDate,
              clearLabel: clearLabel,
              maxMultiDates: maxMultiDates
          };
      };
      CalendarService.prototype.createOriginalCalendar = function (time) {
          var date = new Date(time);
          var year = date.getFullYear();
          var month = date.getMonth();
          var firstWeek = new Date(year, month, 1).getDay();
          var howManyDays = moment__default["default"](time).daysInMonth();
          return {
              year: year,
              month: month,
              firstWeek: firstWeek,
              howManyDays: howManyDays,
              time: new Date(year, month, 1).getTime(),
              date: new Date(time),
          };
      };
      CalendarService.prototype.findDayConfig = function (day, opt) {
          if (!opt.daysConfig && opt.daysConfig.length <= 0)
              return null;
          return opt.daysConfig.find(function (n) { return day.isSame(n.date, 'day'); });
      };
      CalendarService.prototype.createCalendarDay = function (time, opt, month) {
          var _a;
          var _time = moment__default["default"](time);
          var date = moment__default["default"](time);
          var isToday = moment__default["default"]().isSame(_time, 'days');
          var dayConfig = this.findDayConfig(_time, opt);
          var _rangeBeg = moment__default["default"](opt.from).valueOf();
          var _rangeEnd = moment__default["default"](opt.to).valueOf();
          var isBetween = true;
          var disableWee = ((_a = opt === null || opt === void 0 ? void 0 : opt.disableWeeks) === null || _a === void 0 ? void 0 : _a.indexOf(_time.toDate().getDay())) !== -1;
          if (_rangeBeg > 0 && _rangeEnd > 0) {
              if (!opt.canBackwardsSelected) {
                  isBetween = !_time.isBetween(_rangeBeg, _rangeEnd, 'days', '[]');
              }
              else {
                  isBetween = moment__default["default"](_time).isBefore(_rangeBeg) ? false : isBetween;
              }
          }
          else if (_rangeBeg > 0 && _rangeEnd === 0) {
              if (!opt.canBackwardsSelected) {
                  var _addTime = _time.add(1, 'day');
                  isBetween = !_addTime.isAfter(_rangeBeg);
              }
              else {
                  isBetween = false;
              }
          }
          var _disable = false;
          if (dayConfig && isBoolean(dayConfig.disable)) {
              _disable = dayConfig.disable;
          }
          else {
              _disable = disableWee || isBetween;
          }
          var title = new Date(time).getDate().toString();
          if (dayConfig && dayConfig.title) {
              title = dayConfig.title;
          }
          else if (opt.defaultTitle) {
              title = opt.defaultTitle;
          }
          var subTitle = '';
          if (dayConfig && dayConfig.subTitle) {
              subTitle = dayConfig.subTitle;
          }
          else if (opt.defaultSubtitle) {
              subTitle = opt.defaultSubtitle;
          }
          return {
              time: time,
              isToday: isToday,
              title: title,
              subTitle: subTitle,
              selected: false,
              isLastMonth: date.month() < (month ? month : 0),
              isNextMonth: date.month() > (month ? month : 0),
              marked: dayConfig ? dayConfig.marked || false : false,
              cssClass: dayConfig ? dayConfig.cssClass || '' : '',
              disable: _disable,
              isFirst: date.date() === 1,
              isLast: date.date() === date.daysInMonth(),
          };
      };
      CalendarService.prototype.createCalendarMonth = function (original, opt) {
          var days = new Array(6).fill(null);
          var len = original.howManyDays;
          for (var i = original.firstWeek; i < len + original.firstWeek; i++) {
              var itemTime = new Date(original.year, original.month, i - original.firstWeek + 1).getTime();
              days[i] = this.createCalendarDay(itemTime, opt);
          }
          var weekStart = opt.weekStart;
          if (weekStart === 1) {
              if (days[0] === null) {
                  days.shift();
              }
              else {
                  days.unshift.apply(days, __spreadArray([], __read(new Array(6).fill(null))));
              }
          }
          if (opt.showAdjacentMonthDay) {
              var _booleanMap = days.map(function (e) { return !!e; });
              var thisMonth = moment__default["default"](original.time).month();
              var startOffsetIndex = _booleanMap.indexOf(true) - 1;
              var endOffsetIndex = _booleanMap.lastIndexOf(true) + 1;
              for (startOffsetIndex; startOffsetIndex >= 0; startOffsetIndex--) {
                  var dayBefore = moment__default["default"](days[startOffsetIndex + 1].time)
                      .clone()
                      .subtract(1, 'd');
                  days[startOffsetIndex] = this.createCalendarDay(dayBefore.valueOf(), opt, thisMonth);
              }
              if (!(_booleanMap.length % 7 === 0 && _booleanMap[_booleanMap.length - 1])) {
                  for (endOffsetIndex; endOffsetIndex < days.length + (endOffsetIndex % 7); endOffsetIndex++) {
                      var dayAfter = moment__default["default"](days[endOffsetIndex - 1].time)
                          .clone()
                          .add(1, 'd');
                      days[endOffsetIndex] = this.createCalendarDay(dayAfter.valueOf(), opt, thisMonth);
                  }
              }
          }
          return {
              days: days,
              original: original,
          };
      };
      CalendarService.prototype.createMonthsByPeriod = function (startTime, monthsNum, opt) {
          var _array = [];
          var _start = new Date(startTime);
          var _startMonth = new Date(_start.getFullYear(), _start.getMonth(), 1).getTime();
          for (var i = 0; i < monthsNum; i++) {
              var time = moment__default["default"](_startMonth)
                  .add(i, 'M')
                  .valueOf();
              var originalCalendar = this.createOriginalCalendar(time);
              _array.push(this.createCalendarMonth(originalCalendar, opt));
          }
          return _array;
      };
      CalendarService.prototype.wrapResult = function (original, pickMode) {
          var _this = this;
          var result;
          switch (pickMode) {
              case pickModes.SINGLE:
                  result = this.multiFormat(original[0].time);
                  break;
              case pickModes.RANGE:
                  result = {
                      from: this.multiFormat(original[0].time),
                      to: this.multiFormat((original[1] || original[0]).time),
                  };
                  break;
              case pickModes.MULTI:
                  result = original.map(function (e) { return _this.multiFormat(e.time); });
                  break;
              default:
                  result = original;
          }
          return result;
      };
      CalendarService.prototype.multiFormat = function (time) {
          var _moment = moment__default["default"](time);
          return {
              time: _moment.valueOf(),
              unix: _moment.unix(),
              dateObj: _moment.toDate(),
              string: _moment.format(defaults.DATE_FORMAT),
              years: _moment.year(),
              months: _moment.month() + 1,
              date: _moment.date(),
          };
      };
      return CalendarService;
  }());
  CalendarService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarService, deps: [{ token: DEFAULT_CALENDAR_OPTIONS, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
  CalendarService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarService });
  i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarService, decorators: [{
              type: i0.Injectable
          }], ctorParameters: function () {
          return [{ type: undefined, decorators: [{
                          type: i0.Optional
                      }, {
                          type: i0.Inject,
                          args: [DEFAULT_CALENDAR_OPTIONS]
                      }] }];
      } });

  var CalendarWeekComponent = /** @class */ (function () {
      function CalendarWeekComponent() {
          this._weekArray = defaults.WEEKS_FORMAT;
          this._displayWeekArray = this._weekArray;
          this._weekStart = 0;
          this.color = defaults.COLOR;
      }
      Object.defineProperty(CalendarWeekComponent.prototype, "weekArray", {
          set: function (value) {
              if (value && value.length === 7) {
                  this._weekArray = __spreadArray([], __read(value));
                  this.adjustSort();
              }
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(CalendarWeekComponent.prototype, "weekStart", {
          set: function (value) {
              if (value === 0 || value === 1) {
                  this._weekStart = value;
                  this.adjustSort();
              }
          },
          enumerable: false,
          configurable: true
      });
      CalendarWeekComponent.prototype.adjustSort = function () {
          if (this._weekStart === 1) {
              var cacheWeekArray = __spreadArray([], __read(this._weekArray));
              cacheWeekArray.push(cacheWeekArray.shift());
              this._displayWeekArray = __spreadArray([], __read(cacheWeekArray));
          }
          else if (this._weekStart === 0) {
              this._displayWeekArray = __spreadArray([], __read(this._weekArray));
          }
      };
      return CalendarWeekComponent;
  }());
  CalendarWeekComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarWeekComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
  CalendarWeekComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: CalendarWeekComponent, selector: "ion-calendar-week", inputs: { color: "color", weekArray: "weekArray", weekStart: "weekStart" }, ngImport: i0__namespace, template: "\n    <ion-toolbar [class]=\"'week-toolbar '\" no-border-top>\n      <ul [class]=\"'week-title ' + color\">\n        <li *ngFor=\"let w of _displayWeekArray\">{{ w }}</li>\n      </ul>\n    </ion-toolbar>\n  ", isInline: true, styles: [":host .toolbar-background-md,:host .toolbar-background-ios{background:transparent}:host .week-toolbar{--padding-start: 0;--padding-end: 0;--padding-bottom: 0;--padding-top: 0}:host .week-toolbar.primary{--background: var(--ion-color-primary)}:host .week-toolbar.secondary{--background: var(--ion-color-secondary)}:host .week-toolbar.danger{--background: var(--ion-color-danger)}:host .week-toolbar.dark{--background: var(--ion-color-dark)}:host .week-toolbar.light{--background: var(--ion-color-light)}:host .week-toolbar.transparent{--background: transparent}:host .week-toolbar.toolbar-md{min-height:44px}:host .week-title{margin:0;height:44px;width:100%;padding:15px 0;font-size:.9em}:host .week-title.light,:host .week-title.transparent{color:#9e9e9e}:host .week-title li{list-style-type:none;display:block;float:left;width:14%;text-align:center;font-weight:bold}:host .week-title li:nth-of-type(7n),:host .week-title li:nth-of-type(7n + 1){width:15%}\n"], components: [{ type: i1__namespace.IonToolbar, selector: "ion-toolbar", inputs: ["color", "mode"] }], directives: [{ type: i1__namespace$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
  i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarWeekComponent, decorators: [{
              type: i0.Component,
              args: [{
                      selector: 'ion-calendar-week',
                      styleUrls: ['./calendar-week.component.scss'],
                      template: "\n    <ion-toolbar [class]=\"'week-toolbar '\" no-border-top>\n      <ul [class]=\"'week-title ' + color\">\n        <li *ngFor=\"let w of _displayWeekArray\">{{ w }}</li>\n      </ul>\n    </ion-toolbar>\n  ",
                  }]
          }], ctorParameters: function () { return []; }, propDecorators: { color: [{
                  type: i0.Input
              }], weekArray: [{
                  type: i0.Input
              }], weekStart: [{
                  type: i0.Input
              }] } });

  var MONTH_VALUE_ACCESSOR = {
      provide: i6.NG_VALUE_ACCESSOR,
      useExisting: i0.forwardRef(function () { return MonthComponent; }),
      multi: true,
  };
  var MonthComponent = /** @class */ (function () {
      function MonthComponent(ref) {
          this.ref = ref;
          this.readonly = false;
          this.color = defaults.COLOR;
          this.change = new i0.EventEmitter();
          this.select = new i0.EventEmitter();
          this.selectStart = new i0.EventEmitter();
          this.selectEnd = new i0.EventEmitter();
          this._date = [null, null];
          this._isInit = false;
          this.DAY_DATE_FORMAT = 'MMMM dd, yyyy';
      }
      Object.defineProperty(MonthComponent.prototype, "_isRange", {
          get: function () {
              return this.pickMode === pickModes.RANGE;
          },
          enumerable: false,
          configurable: true
      });
      MonthComponent.prototype.ngAfterViewInit = function () {
          this._isInit = true;
      };
      Object.defineProperty(MonthComponent.prototype, "value", {
          get: function () {
              return this._date;
          },
          enumerable: false,
          configurable: true
      });
      MonthComponent.prototype.writeValue = function (obj) {
          if (Array.isArray(obj)) {
              this._date = obj;
          }
      };
      MonthComponent.prototype.registerOnChange = function (fn) {
          this._onChanged = fn;
      };
      MonthComponent.prototype.registerOnTouched = function (fn) {
          this._onTouched = fn;
      };
      MonthComponent.prototype.trackByTime = function (index, item) {
          return item ? item.time : index;
      };
      MonthComponent.prototype.isEndSelection = function (day) {
          if (!day)
              return false;
          if (this.pickMode !== pickModes.RANGE || !this._isInit || this._date[1] === null) {
              return false;
          }
          return this._date[1].time === day.time;
      };
      MonthComponent.prototype.getDayLabel = function (day) {
          return new Date(day.time);
      };
      MonthComponent.prototype.isBetween = function (day) {
          if (!day)
              return false;
          if (this.pickMode !== pickModes.RANGE || !this._isInit) {
              return false;
          }
          if (this._date[0] === null || this._date[1] === null) {
              return false;
          }
          var start = this._date[0].time;
          var end = this._date[1].time;
          return day.time < end && day.time > start;
      };
      MonthComponent.prototype.isStartSelection = function (day) {
          if (!day)
              return false;
          if (this.pickMode !== pickModes.RANGE || !this._isInit || this._date[0] === null) {
              return false;
          }
          return this._date[0].time === day.time && this._date[1] !== null;
      };
      MonthComponent.prototype.isSelected = function (time) {
          if (Array.isArray(this._date)) {
              if (this.pickMode !== pickModes.MULTI) {
                  if (this._date[0] !== null) {
                      return time === this._date[0].time;
                  }
                  if (this._date[1] !== null) {
                      return time === this._date[1].time;
                  }
              }
              else {
                  return this._date.findIndex(function (e) { return e !== null && e.time === time; }) !== -1;
              }
          }
          else {
              return false;
          }
      };
      MonthComponent.prototype.onSelected = function (item) {
          if (this.readonly)
              return;
          item.selected = true;
          this.select.emit(item);
          if (this.pickMode === pickModes.SINGLE) {
              this._date[0] = item;
              var emitValue = this._date;
              this.change.emit(emitValue);
              return;
          }
          if (this.pickMode === pickModes.RANGE) {
              if (this._date[0] === null) {
                  this._date[0] = item;
                  this.selectStart.emit(item);
              }
              else if (this._date[1] === null) {
                  if (this._date[0].time < item.time) {
                      this._date[1] = item;
                      this.selectEnd.emit(item);
                  }
                  else {
                      this._date[1] = this._date[0];
                      this.selectEnd.emit(this._date[0]);
                      this._date[0] = item;
                      this.selectStart.emit(item);
                  }
                  // Ensure if the user has selected a date range, when a user interacts with another date on the calendar the range will reset.
                  // } else if (this._date[0].time > item.time) {
                  //   this._date[0] = item;
                  //   this.selectStart.emit(item);
                  // } else if (this._date[1].time < item.time) {
                  //   this._date[1] = item;
                  //   this.selectEnd.emit(item);
              }
              else {
                  this._date[0] = item;
                  this.selectStart.emit(item);
                  this._date[1] = null;
              }
              var emitValue = this._date;
              this.change.emit(emitValue);
              return;
          }
          if (this.pickMode === pickModes.MULTI) {
              var index = this._date.findIndex(function (e) { return e !== null && e.time === item.time; });
              if (index === -1) {
                  if ((this.maxMultiDates && this._date.length < this.maxMultiDates) || !this.maxMultiDates) {
                      this._date.push(item);
                  }
              }
              else {
                  this._date.splice(index, 1);
              }
              var emitValue = this._date.filter(function (e) { return e !== null; });
              this.change.emit(emitValue);
          }
      };
      return MonthComponent;
  }());
  MonthComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MonthComponent, deps: [{ token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
  MonthComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: MonthComponent, selector: "ion-calendar-month", inputs: { month: "month", pickMode: "pickMode", isSaveHistory: "isSaveHistory", id: "id", readonly: "readonly", color: "color", maxMultiDates: "maxMultiDates" }, outputs: { change: "change", select: "select", selectStart: "selectStart", selectEnd: "selectEnd" }, providers: [MONTH_VALUE_ACCESSOR], ngImport: i0__namespace, template: "\n    <div [class]=\"color\">\n      <ng-template [ngIf]=\"!_isRange\" [ngIfElse]=\"rangeBox\">\n        <div class=\"days-box\">\n          <ng-template ngFor let-day [ngForOf]=\"month?.days\" [ngForTrackBy]=\"trackByTime\">\n            <div class=\"days\">\n              <ng-container *ngIf=\"day\">\n                <button type='button'\n                        [class]=\"'days-btn ' + day.cssClass\"\n                        [class.today]=\"day.isToday\"\n                        (click)=\"onSelected(day)\"\n                        [class.marked]=\"day.marked\"\n                        [class.last-month-day]=\"day.isLastMonth\"\n                        [class.next-month-day]=\"day.isNextMonth\"\n                        [class.on-selected]=\"isSelected(day.time)\"\n                        [disabled]=\"day.disable\"\n                        [attr.aria-label]=\"getDayLabel(day) | date:DAY_DATE_FORMAT\">\n                  <p>{{ day.title }}</p>\n                  <small *ngIf=\"day.subTitle\">{{ day?.subTitle }}</small>\n                </button>\n              </ng-container>\n            </div>\n          </ng-template>\n        </div>\n      </ng-template>\n\n      <ng-template #rangeBox>\n        <div class=\"days-box\">\n          <ng-template ngFor let-day [ngForOf]=\"month.days\" [ngForTrackBy]=\"trackByTime\">\n            <div class=\"days\"\n                 [class.startSelection]=\"isStartSelection(day)\"\n                 [class.endSelection]=\"isEndSelection(day)\"\n                 [class.is-first-wrap]=\"day?.isFirst\"\n                 [class.is-last-wrap]=\"day?.isLast\"\n                 [class.between]=\"isBetween(day)\">\n              <ng-container *ngIf=\"day\">\n                <button type='button'\n                        [class]=\"'days-btn ' + day.cssClass\"\n                        [class.today]=\"day.isToday\"\n                        (click)=\"onSelected(day)\"\n                        [class.marked]=\"day.marked\"\n                        [class.last-month-day]=\"day.isLastMonth\"\n                        [class.next-month-day]=\"day.isNextMonth\"\n                        [class.is-first]=\"day.isFirst\"\n                        [class.is-last]=\"day.isLast\"\n                        [class.on-selected]=\"isSelected(day.time)\"\n                        [disabled]=\"day.disable\">\n                  <p>{{ day.title }}</p>\n                  <small *ngIf=\"day.subTitle\">{{ day?.subTitle }}</small>\n                </button>\n              </ng-container>\n\n            </div>\n          </ng-template>\n        </div>\n      </ng-template>\n    </div>\n  ", isInline: true, styles: [":host{display:inline-block;width:100%}:host .days-box{padding:.5rem}:host .days:nth-of-type(7n),:host .days:nth-of-type(7n + 1){width:15%}:host .days{width:14%;float:left;text-align:center;height:36px;margin-bottom:5px}:host .days .marked p{font-weight:500}:host .days .on-selected{border:none}:host .days .on-selected p{font-size:1.3em}:host button.days-btn{border-radius:36px;width:36px;display:block;margin:0 auto;padding:0;height:36px;background-color:transparent;position:relative;z-index:2;outline:0}:host button.days-btn p{margin:0;font-size:1.2em;color:#333;text-align:center}:host button.days-btn[disabled] p{color:#333}:host button.days-btn.on-selected small{transition:bottom .3s;bottom:-14px}:host button.days-btn small{overflow:hidden;display:block;left:0;right:0;bottom:-5px;position:absolute;z-index:1;text-align:center;font-weight:200}:host .primary button.days-btn small,:host .primary .days .marked p,:host .primary .days .today p{color:var(--ion-color-primary)}:host .primary .days .today p{font-weight:700}:host .primary .days .last-month-day p,:host .primary .days .next-month-day p{color:#333}:host .primary .days .today.on-selected p,:host .primary .days .marked.on-selected p{color:#fff}:host .primary .days .on-selected,:host .primary .startSelection button.days-btn,:host .primary .endSelection button.days-btn{background-color:var(--ion-color-primary);color:#fff}:host .primary .startSelection{position:relative}:host .primary .startSelection:before,:host .primary .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .primary .startSelection:before{background-color:var(--ion-color-primary)}:host .primary .startSelection:after{background-color:#fff;opacity:.25}:host .primary .endSelection{position:relative}:host .primary .endSelection:before,:host .primary .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .primary .endSelection:before{background-color:var(--ion-color-primary)}:host .primary .endSelection:after{background-color:#fff;opacity:.25}:host .primary .startSelection.endSelection:after{background-color:transparent}:host .primary .startSelection button.days-btn{border-radius:50%}:host .primary .between button.days-btn{background-color:var(--ion-color-primary);width:100%;border-radius:0;position:relative}:host .primary .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .primary .between button.days-btn p{color:#fff}:host .primary .endSelection button.days-btn{border-radius:50%}:host .primary .endSelection button.days-btn p{color:#fff}:host .primary .days.startSelection:nth-child(7n):before,:host .primary .days.between:nth-child(7n) button.days-btn,:host .primary button.days-btn.is-last{border-radius:0 36px 36px 0}:host .primary .days.startSelection:nth-child(7n):before.on-selected,:host .primary .days.between:nth-child(7n) button.days-btn.on-selected,:host .primary button.days-btn.is-last.on-selected{border-radius:50%}:host .primary .days.endSelection:nth-child(7n+1):before,:host .primary .days.between:nth-child(7n+1) button.days-btn,:host .primary .days.between.is-first-wrap button.days-btn.is-first,:host .primary button.days-btn.is-first{border-radius:36px 0 0 36px}:host .primary .startSelection button.days-btn.is-first,:host .primary .endSelection button.days-btn.is-first,:host .primary button.days-btn.is-first.on-selected,:host .primary button.days-btn.is-last.on-selected,:host .primary .startSelection button.days-btn.is-last,:host .primary .endSelection button.days-btn.is-last{border-radius:50%}:host .primary .startSelection.is-last-wrap:before,:host .primary .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .primary .endSelection.is-first-wrap:before,:host .primary .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .primary .days .on-selected p{color:#fff}:host .primary .startSelection button.days-btn,:host .primary .endSelection button.days-btn,:host .primary .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .primary .startSelection.endSelection:before{--ion-color-primary: transparent}:host .secondary button.days-btn small,:host .secondary .days .marked p,:host .secondary .days .today p{color:var(--ion-color-secondary)}:host .secondary .days .today p{font-weight:700}:host .secondary .days .last-month-day p,:host .secondary .days .next-month-day p{color:#333}:host .secondary .days .today.on-selected p,:host .secondary .days .marked.on-selected p{color:#fff}:host .secondary .days .on-selected,:host .secondary .startSelection button.days-btn,:host .secondary .endSelection button.days-btn{background-color:var(--ion-color-secondary);color:#fff}:host .secondary .startSelection{position:relative}:host .secondary .startSelection:before,:host .secondary .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .secondary .startSelection:before{background-color:var(--ion-color-secondary)}:host .secondary .startSelection:after{background-color:#fff;opacity:.25}:host .secondary .endSelection{position:relative}:host .secondary .endSelection:before,:host .secondary .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .secondary .endSelection:before{background-color:var(--ion-color-secondary)}:host .secondary .endSelection:after{background-color:#fff;opacity:.25}:host .secondary .startSelection.endSelection:after{background-color:transparent}:host .secondary .startSelection button.days-btn{border-radius:50%}:host .secondary .between button.days-btn{background-color:var(--ion-color-secondary);width:100%;border-radius:0;position:relative}:host .secondary .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .secondary .between button.days-btn p{color:#fff}:host .secondary .endSelection button.days-btn{border-radius:50%}:host .secondary .endSelection button.days-btn p{color:#fff}:host .secondary .days.startSelection:nth-child(7n):before,:host .secondary .days.between:nth-child(7n) button.days-btn,:host .secondary button.days-btn.is-last{border-radius:0 36px 36px 0}:host .secondary .days.startSelection:nth-child(7n):before.on-selected,:host .secondary .days.between:nth-child(7n) button.days-btn.on-selected,:host .secondary button.days-btn.is-last.on-selected{border-radius:50%}:host .secondary .days.endSelection:nth-child(7n+1):before,:host .secondary .days.between:nth-child(7n+1) button.days-btn,:host .secondary .days.between.is-first-wrap button.days-btn.is-first,:host .secondary button.days-btn.is-first{border-radius:36px 0 0 36px}:host .secondary .startSelection button.days-btn.is-first,:host .secondary .endSelection button.days-btn.is-first,:host .secondary button.days-btn.is-first.on-selected,:host .secondary button.days-btn.is-last.on-selected,:host .secondary .startSelection button.days-btn.is-last,:host .secondary .endSelection button.days-btn.is-last{border-radius:50%}:host .secondary .startSelection.is-last-wrap:before,:host .secondary .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .secondary .endSelection.is-first-wrap:before,:host .secondary .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .secondary .days .on-selected p{color:#fff}:host .secondary .startSelection button.days-btn,:host .secondary .endSelection button.days-btn,:host .secondary .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .secondary .startSelection.endSelection:before{--ion-color-primary: transparent}:host .danger button.days-btn small,:host .danger .days .marked p,:host .danger .days .today p{color:var(--ion-color-danger)}:host .danger .days .today p{font-weight:700}:host .danger .days .last-month-day p,:host .danger .days .next-month-day p{color:#333}:host .danger .days .today.on-selected p,:host .danger .days .marked.on-selected p{color:#fff}:host .danger .days .on-selected,:host .danger .startSelection button.days-btn,:host .danger .endSelection button.days-btn{background-color:var(--ion-color-danger);color:#fff}:host .danger .startSelection{position:relative}:host .danger .startSelection:before,:host .danger .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .danger .startSelection:before{background-color:var(--ion-color-danger)}:host .danger .startSelection:after{background-color:#fff;opacity:.25}:host .danger .endSelection{position:relative}:host .danger .endSelection:before,:host .danger .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .danger .endSelection:before{background-color:var(--ion-color-danger)}:host .danger .endSelection:after{background-color:#fff;opacity:.25}:host .danger .startSelection.endSelection:after{background-color:transparent}:host .danger .startSelection button.days-btn{border-radius:50%}:host .danger .between button.days-btn{background-color:var(--ion-color-danger);width:100%;border-radius:0;position:relative}:host .danger .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .danger .between button.days-btn p{color:#fff}:host .danger .endSelection button.days-btn{border-radius:50%}:host .danger .endSelection button.days-btn p{color:#fff}:host .danger .days.startSelection:nth-child(7n):before,:host .danger .days.between:nth-child(7n) button.days-btn,:host .danger button.days-btn.is-last{border-radius:0 36px 36px 0}:host .danger .days.startSelection:nth-child(7n):before.on-selected,:host .danger .days.between:nth-child(7n) button.days-btn.on-selected,:host .danger button.days-btn.is-last.on-selected{border-radius:50%}:host .danger .days.endSelection:nth-child(7n+1):before,:host .danger .days.between:nth-child(7n+1) button.days-btn,:host .danger .days.between.is-first-wrap button.days-btn.is-first,:host .danger button.days-btn.is-first{border-radius:36px 0 0 36px}:host .danger .startSelection button.days-btn.is-first,:host .danger .endSelection button.days-btn.is-first,:host .danger button.days-btn.is-first.on-selected,:host .danger button.days-btn.is-last.on-selected,:host .danger .startSelection button.days-btn.is-last,:host .danger .endSelection button.days-btn.is-last{border-radius:50%}:host .danger .startSelection.is-last-wrap:before,:host .danger .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .danger .endSelection.is-first-wrap:before,:host .danger .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .danger .days .on-selected p{color:#fff}:host .danger .startSelection button.days-btn,:host .danger .endSelection button.days-btn,:host .danger .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .danger .startSelection.endSelection:before{--ion-color-primary: transparent}:host .dark button.days-btn small,:host .dark .days .marked p,:host .dark .days .today p{color:var(--ion-color-dark)}:host .dark .days .today p{font-weight:700}:host .dark .days .last-month-day p,:host .dark .days .next-month-day p{color:#333}:host .dark .days .today.on-selected p,:host .dark .days .marked.on-selected p{color:#fff}:host .dark .days .on-selected,:host .dark .startSelection button.days-btn,:host .dark .endSelection button.days-btn{background-color:var(--ion-color-dark);color:#fff}:host .dark .startSelection{position:relative}:host .dark .startSelection:before,:host .dark .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .dark .startSelection:before{background-color:var(--ion-color-dark)}:host .dark .startSelection:after{background-color:#fff;opacity:.25}:host .dark .endSelection{position:relative}:host .dark .endSelection:before,:host .dark .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .dark .endSelection:before{background-color:var(--ion-color-dark)}:host .dark .endSelection:after{background-color:#fff;opacity:.25}:host .dark .startSelection.endSelection:after{background-color:transparent}:host .dark .startSelection button.days-btn{border-radius:50%}:host .dark .between button.days-btn{background-color:var(--ion-color-dark);width:100%;border-radius:0;position:relative}:host .dark .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .dark .between button.days-btn p{color:#fff}:host .dark .endSelection button.days-btn{border-radius:50%}:host .dark .endSelection button.days-btn p{color:#fff}:host .dark .days.startSelection:nth-child(7n):before,:host .dark .days.between:nth-child(7n) button.days-btn,:host .dark button.days-btn.is-last{border-radius:0 36px 36px 0}:host .dark .days.startSelection:nth-child(7n):before.on-selected,:host .dark .days.between:nth-child(7n) button.days-btn.on-selected,:host .dark button.days-btn.is-last.on-selected{border-radius:50%}:host .dark .days.endSelection:nth-child(7n+1):before,:host .dark .days.between:nth-child(7n+1) button.days-btn,:host .dark .days.between.is-first-wrap button.days-btn.is-first,:host .dark button.days-btn.is-first{border-radius:36px 0 0 36px}:host .dark .startSelection button.days-btn.is-first,:host .dark .endSelection button.days-btn.is-first,:host .dark button.days-btn.is-first.on-selected,:host .dark button.days-btn.is-last.on-selected,:host .dark .startSelection button.days-btn.is-last,:host .dark .endSelection button.days-btn.is-last{border-radius:50%}:host .dark .startSelection.is-last-wrap:before,:host .dark .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .dark .endSelection.is-first-wrap:before,:host .dark .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .dark .days .on-selected p{color:#fff}:host .dark .startSelection button.days-btn,:host .dark .endSelection button.days-btn,:host .dark .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .dark .startSelection.endSelection:before{--ion-color-primary: transparent}:host .light button.days-btn small,:host .light .days .marked p,:host .light .days .today p{color:var(--ion-color-light)}:host .light .days .today p{font-weight:700}:host .light .days .last-month-day p,:host .light .days .next-month-day p{color:#333}:host .light .days .today.on-selected p,:host .light .days .marked.on-selected p{color:#a0a0a0}:host .light .days .on-selected,:host .light .startSelection button.days-btn,:host .light .endSelection button.days-btn{background-color:var(--ion-color-light);color:#a0a0a0}:host .light .startSelection{position:relative}:host .light .startSelection:before,:host .light .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .light .startSelection:before{background-color:var(--ion-color-light)}:host .light .startSelection:after{background-color:#fff;opacity:.25}:host .light .endSelection{position:relative}:host .light .endSelection:before,:host .light .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .light .endSelection:before{background-color:var(--ion-color-light)}:host .light .endSelection:after{background-color:#fff;opacity:.25}:host .light .startSelection.endSelection:after{background-color:transparent}:host .light .startSelection button.days-btn{border-radius:50%}:host .light .between button.days-btn{background-color:var(--ion-color-light);width:100%;border-radius:0;position:relative}:host .light .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .light .between button.days-btn p{color:#a0a0a0}:host .light .endSelection button.days-btn{border-radius:50%}:host .light .endSelection button.days-btn p{color:#a0a0a0}:host .light .days.startSelection:nth-child(7n):before,:host .light .days.between:nth-child(7n) button.days-btn,:host .light button.days-btn.is-last{border-radius:0 36px 36px 0}:host .light .days.startSelection:nth-child(7n):before.on-selected,:host .light .days.between:nth-child(7n) button.days-btn.on-selected,:host .light button.days-btn.is-last.on-selected{border-radius:50%}:host .light .days.endSelection:nth-child(7n+1):before,:host .light .days.between:nth-child(7n+1) button.days-btn,:host .light .days.between.is-first-wrap button.days-btn.is-first,:host .light button.days-btn.is-first{border-radius:36px 0 0 36px}:host .light .startSelection button.days-btn.is-first,:host .light .endSelection button.days-btn.is-first,:host .light button.days-btn.is-first.on-selected,:host .light button.days-btn.is-last.on-selected,:host .light .startSelection button.days-btn.is-last,:host .light .endSelection button.days-btn.is-last{border-radius:50%}:host .light .startSelection.is-last-wrap:before,:host .light .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .light .endSelection.is-first-wrap:before,:host .light .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .light .days .on-selected p{color:#a0a0a0}:host .light .startSelection button.days-btn,:host .light .endSelection button.days-btn,:host .light .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .light .startSelection.endSelection:before{--ion-color-primary: transparent}:host .light .days .today p{color:#565656}:host .cal-color .days .today p{font-weight:700}:host .cal-color .days .last-month-day p,:host .cal-color .days .next-month-day p{color:#333}:host .cal-color .days .today.on-selected p,:host .cal-color .days .marked.on-selected p{color:#fff}:host .cal-color .days .on-selected,:host .cal-color .startSelection button.days-btn,:host .cal-color .endSelection button.days-btn{color:#fff}:host .cal-color .startSelection{position:relative}:host .cal-color .startSelection:before,:host .cal-color .startSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;right:0;display:block}:host .cal-color .startSelection:after{background-color:#fff;opacity:.25}:host .cal-color .endSelection{position:relative}:host .cal-color .endSelection:before,:host .cal-color .endSelection:after{height:36px;width:50%;content:\"\";position:absolute;top:0;left:0;display:block}:host .cal-color .endSelection:after{background-color:#fff;opacity:.25}:host .cal-color .startSelection.endSelection:after{background-color:transparent}:host .cal-color .startSelection button.days-btn{border-radius:50%}:host .cal-color .between button.days-btn{width:100%;border-radius:0;position:relative}:host .cal-color .between button.days-btn:after{height:36px;width:100%;content:\"\";position:absolute;top:0;left:0;right:0;display:block;background-color:#fff;opacity:.25}:host .cal-color .between button.days-btn p{color:#fff}:host .cal-color .endSelection button.days-btn{border-radius:50%}:host .cal-color .endSelection button.days-btn p{color:#fff}:host .cal-color .days.startSelection:nth-child(7n):before,:host .cal-color .days.between:nth-child(7n) button.days-btn,:host .cal-color button.days-btn.is-last{border-radius:0 36px 36px 0}:host .cal-color .days.startSelection:nth-child(7n):before.on-selected,:host .cal-color .days.between:nth-child(7n) button.days-btn.on-selected,:host .cal-color button.days-btn.is-last.on-selected{border-radius:50%}:host .cal-color .days.endSelection:nth-child(7n+1):before,:host .cal-color .days.between:nth-child(7n+1) button.days-btn,:host .cal-color .days.between.is-first-wrap button.days-btn.is-first,:host .cal-color button.days-btn.is-first{border-radius:36px 0 0 36px}:host .cal-color .startSelection button.days-btn.is-first,:host .cal-color .endSelection button.days-btn.is-first,:host .cal-color button.days-btn.is-first.on-selected,:host .cal-color button.days-btn.is-last.on-selected,:host .cal-color .startSelection button.days-btn.is-last,:host .cal-color .endSelection button.days-btn.is-last{border-radius:50%}:host .cal-color .startSelection.is-last-wrap:before,:host .cal-color .startSelection.is-last-wrap:after{border-radius:0 36px 36px 0}:host .cal-color .endSelection.is-first-wrap:before,:host .cal-color .endSelection.is-first-wrap:after{border-radius:36px 0 0 36px}:host .cal-color .days .on-selected p{color:#fff}:host .cal-color .startSelection button.days-btn,:host .cal-color .endSelection button.days-btn,:host .cal-color .between button.days-btn{transition-property:background-color;transition-duration:.18s;transition-timing-function:ease-out}:host .cal-color .startSelection.endSelection:before{--ion-color-primary: transparent}body[data-dark-mode=true] :host button.days-btn p{color:#fff}body[data-dark-mode=true] :host button.days-btn[disabled] p{color:#ffffff80}\n"], directives: [{ type: i1__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "date": i1__namespace$1.DatePipe } });
  i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MonthComponent, decorators: [{
              type: i0.Component,
              args: [{
                      selector: 'ion-calendar-month',
                      providers: [MONTH_VALUE_ACCESSOR],
                      styleUrls: ['./month.component.scss'],
                      template: "\n    <div [class]=\"color\">\n      <ng-template [ngIf]=\"!_isRange\" [ngIfElse]=\"rangeBox\">\n        <div class=\"days-box\">\n          <ng-template ngFor let-day [ngForOf]=\"month?.days\" [ngForTrackBy]=\"trackByTime\">\n            <div class=\"days\">\n              <ng-container *ngIf=\"day\">\n                <button type='button'\n                        [class]=\"'days-btn ' + day.cssClass\"\n                        [class.today]=\"day.isToday\"\n                        (click)=\"onSelected(day)\"\n                        [class.marked]=\"day.marked\"\n                        [class.last-month-day]=\"day.isLastMonth\"\n                        [class.next-month-day]=\"day.isNextMonth\"\n                        [class.on-selected]=\"isSelected(day.time)\"\n                        [disabled]=\"day.disable\"\n                        [attr.aria-label]=\"getDayLabel(day) | date:DAY_DATE_FORMAT\">\n                  <p>{{ day.title }}</p>\n                  <small *ngIf=\"day.subTitle\">{{ day?.subTitle }}</small>\n                </button>\n              </ng-container>\n            </div>\n          </ng-template>\n        </div>\n      </ng-template>\n\n      <ng-template #rangeBox>\n        <div class=\"days-box\">\n          <ng-template ngFor let-day [ngForOf]=\"month.days\" [ngForTrackBy]=\"trackByTime\">\n            <div class=\"days\"\n                 [class.startSelection]=\"isStartSelection(day)\"\n                 [class.endSelection]=\"isEndSelection(day)\"\n                 [class.is-first-wrap]=\"day?.isFirst\"\n                 [class.is-last-wrap]=\"day?.isLast\"\n                 [class.between]=\"isBetween(day)\">\n              <ng-container *ngIf=\"day\">\n                <button type='button'\n                        [class]=\"'days-btn ' + day.cssClass\"\n                        [class.today]=\"day.isToday\"\n                        (click)=\"onSelected(day)\"\n                        [class.marked]=\"day.marked\"\n                        [class.last-month-day]=\"day.isLastMonth\"\n                        [class.next-month-day]=\"day.isNextMonth\"\n                        [class.is-first]=\"day.isFirst\"\n                        [class.is-last]=\"day.isLast\"\n                        [class.on-selected]=\"isSelected(day.time)\"\n                        [disabled]=\"day.disable\">\n                  <p>{{ day.title }}</p>\n                  <small *ngIf=\"day.subTitle\">{{ day?.subTitle }}</small>\n                </button>\n              </ng-container>\n\n            </div>\n          </ng-template>\n        </div>\n      </ng-template>\n    </div>\n  ",
                  }]
          }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { month: [{
                  type: i0.Input
              }], pickMode: [{
                  type: i0.Input
              }], isSaveHistory: [{
                  type: i0.Input
              }], id: [{
                  type: i0.Input
              }], readonly: [{
                  type: i0.Input
              }], color: [{
                  type: i0.Input
              }], maxMultiDates: [{
                  type: i0.Input
              }], change: [{
                  type: i0.Output
              }], select: [{
                  type: i0.Output
              }], selectStart: [{
                  type: i0.Output
              }], selectEnd: [{
                  type: i0.Output
              }] } });

  var NUM_OF_MONTHS_TO_CREATE = 3;
  var CalendarModal = /** @class */ (function () {
      function CalendarModal(_renderer, _elementRef, params, modalCtrl, ref, calSvc) {
          this._renderer = _renderer;
          this._elementRef = _elementRef;
          this.params = params;
          this.modalCtrl = modalCtrl;
          this.ref = ref;
          this.calSvc = calSvc;
          this.ionPage = true;
          this.datesTemp = [null, null];
          this._scrollLock = true;
      }
      CalendarModal.prototype.ngOnInit = function () {
          this.init();
          this.initDefaultDate();
      };
      CalendarModal.prototype.ngAfterViewInit = function () {
          this.findCssClass();
          if (this._d.canBackwardsSelected)
              this.backwardsMonth();
          this.scrollToDefaultDate();
      };
      CalendarModal.prototype.init = function () {
          this._d = this.calSvc.safeOpt(this.options);
          this._d.showAdjacentMonthDay = false;
          this.step = this._d.step;
          if (this.step < this.calSvc.DEFAULT_STEP) {
              this.step = this.calSvc.DEFAULT_STEP;
          }
          this.calendarMonths = this.calSvc.createMonthsByPeriod(moment__default["default"](this._d.from).valueOf(), this.findInitMonthNumber(this._d.defaultScrollTo) + this.step, this._d);
      };
      CalendarModal.prototype.initDefaultDate = function () {
          var _this = this;
          var _a = this._d, pickMode = _a.pickMode, defaultDate = _a.defaultDate, defaultDateRange = _a.defaultDateRange, defaultDates = _a.defaultDates;
          switch (pickMode) {
              case pickModes.SINGLE:
                  if (defaultDate) {
                      this.datesTemp[0] = this.calSvc.createCalendarDay(this._getDayTime(defaultDate), this._d);
                  }
                  break;
              case pickModes.RANGE:
                  if (defaultDateRange) {
                      if (defaultDateRange.from) {
                          this.datesTemp[0] = this.calSvc.createCalendarDay(this._getDayTime(defaultDateRange.from), this._d);
                      }
                      if (defaultDateRange.to) {
                          this.datesTemp[1] = this.calSvc.createCalendarDay(this._getDayTime(defaultDateRange.to), this._d);
                      }
                  }
                  break;
              case pickModes.MULTI:
                  if (defaultDates && defaultDates.length) {
                      this.datesTemp = defaultDates.map(function (e) { return _this.calSvc.createCalendarDay(_this._getDayTime(e), _this._d); });
                  }
                  break;
              default:
                  this.datesTemp = [null, null];
          }
      };
      CalendarModal.prototype.findCssClass = function () {
          var _this = this;
          var cssClass = this._d.cssClass;
          if (cssClass) {
              cssClass.split(' ').forEach(function (_class) {
                  if (_class.trim() !== '')
                      _this._renderer.addClass(_this._elementRef.nativeElement, _class);
              });
          }
      };
      CalendarModal.prototype.onChange = function (data) {
          var _a = this._d, pickMode = _a.pickMode, autoDone = _a.autoDone;
          this.datesTemp = data;
          this.ref.detectChanges();
          if (pickMode !== pickModes.MULTI && autoDone && this.canDone()) {
              this.done();
          }
          this.repaintDOM();
      };
      CalendarModal.prototype.onCancel = function () {
          this.modalCtrl.dismiss(null, 'cancel');
      };
      CalendarModal.prototype.done = function () {
          var pickMode = this._d.pickMode;
          this.modalCtrl.dismiss(this.calSvc.wrapResult(this.datesTemp, pickMode), 'done');
      };
      CalendarModal.prototype.canDone = function () {
          if (!Array.isArray(this.datesTemp)) {
              return false;
          }
          var _a = this._d, pickMode = _a.pickMode, defaultEndDateToStartDate = _a.defaultEndDateToStartDate;
          switch (pickMode) {
              case pickModes.SINGLE:
                  return !!(this.datesTemp[0] && this.datesTemp[0].time);
              case pickModes.RANGE:
                  if (defaultEndDateToStartDate) {
                      return !!(this.datesTemp[0] && this.datesTemp[0].time);
                  }
                  return !!(this.datesTemp[0] && this.datesTemp[1]) && !!(this.datesTemp[0].time && this.datesTemp[1].time);
              case pickModes.MULTI:
                  return this.datesTemp.length > 0 && this.datesTemp.every(function (e) { return !!e && !!e.time; });
              default:
                  return false;
          }
      };
      CalendarModal.prototype.clear = function () {
          this.datesTemp = [null, null];
      };
      CalendarModal.prototype.canClear = function () {
          return !!this.datesTemp[0];
      };
      CalendarModal.prototype.nextMonth = function (event) {
          var _a;
          var len = this.calendarMonths.length;
          var final = this.calendarMonths[len - 1];
          var nextTime = moment__default["default"](final.original.time)
              .add(1, 'M')
              .valueOf();
          var rangeEnd = this._d.to ? moment__default["default"](this._d.to).subtract(1, 'M') : 0;
          if (len <= 0 || (rangeEnd !== 0 && moment__default["default"](final.original.time).isAfter(rangeEnd))) {
              event.target.disabled = true;
              return;
          }
          (_a = this.calendarMonths).push.apply(_a, __spreadArray([], __read(this.calSvc.createMonthsByPeriod(nextTime, NUM_OF_MONTHS_TO_CREATE, this._d))));
          event.target.complete();
          this.repaintDOM();
      };
      CalendarModal.prototype.backwardsMonth = function () {
          var _a;
          var first = this.calendarMonths[0];
          if (first.original.time <= 0) {
              this._d.canBackwardsSelected = false;
              return;
          }
          var firstTime = (this.actualFirstTime = moment__default["default"](first.original.time)
              .subtract(NUM_OF_MONTHS_TO_CREATE, 'M')
              .valueOf());
          (_a = this.calendarMonths).unshift.apply(_a, __spreadArray([], __read(this.calSvc.createMonthsByPeriod(firstTime, NUM_OF_MONTHS_TO_CREATE, this._d))));
          this.ref.detectChanges();
          this.repaintDOM();
      };
      CalendarModal.prototype.scrollToDate = function (date) {
          var _this = this;
          var defaultDateIndex = this.findInitMonthNumber(date);
          var monthElement = this.monthsEle.nativeElement.children["month-" + defaultDateIndex];
          var domElemReadyWaitTime = 300;
          setTimeout(function () {
              var defaultDateMonth = monthElement ? monthElement.offsetTop : 0;
              if (defaultDateIndex !== -1 && defaultDateMonth !== 0) {
                  _this.content.scrollByPoint(0, defaultDateMonth, 128);
              }
          }, domElemReadyWaitTime);
      };
      CalendarModal.prototype.scrollToDefaultDate = function () {
          this.scrollToDate(this._d.defaultScrollTo);
      };
      CalendarModal.prototype.onScroll = function ($event) {
          var _this = this;
          if (!this._d.canBackwardsSelected)
              return;
          var detail = $event.detail;
          if (detail.scrollTop <= 200 && detail.velocityY < 0 && this._scrollLock) {
              this.content.getScrollElement().then(function (scrollElem) {
                  _this._scrollLock = !1;
                  var heightBeforeMonthPrepend = scrollElem.scrollHeight;
                  _this.backwardsMonth();
                  setTimeout(function () {
                      var heightAfterMonthPrepend = scrollElem.scrollHeight;
                      _this.content.scrollByPoint(0, heightAfterMonthPrepend - heightBeforeMonthPrepend, 0).then(function () {
                          _this._scrollLock = !0;
                      });
                  }, 180);
              });
          }
      };
      /**
       * In some older Safari versions (observed at Mac's Safari 10.0), there is an issue where style updates to
       * shadowRoot descendants don't cause a browser repaint.
       * See for more details: https://github.com/Polymer/polymer/issues/4701
       */
      CalendarModal.prototype.repaintDOM = function () {
          var _this = this;
          return this.content.getScrollElement().then(function (scrollElem) {
              // Update scrollElem to ensure that height of the container changes as Months are appended/prepended
              scrollElem.style.zIndex = '2';
              scrollElem.style.zIndex = 'initial';
              // Update monthsEle to ensure selected state is reflected when tapping on a day
              _this.monthsEle.nativeElement.style.zIndex = '2';
              _this.monthsEle.nativeElement.style.zIndex = 'initial';
          });
      };
      CalendarModal.prototype.findInitMonthNumber = function (date) {
          var startDate = this.actualFirstTime ? moment__default["default"](this.actualFirstTime) : moment__default["default"](this._d.from);
          var defaultScrollTo = moment__default["default"](date);
          var isAfter = defaultScrollTo.isAfter(startDate);
          if (!isAfter)
              return -1;
          if (this.showYearPicker) {
              startDate = moment__default["default"](new Date(this.year, 0, 1));
          }
          return defaultScrollTo.diff(startDate, 'month');
      };
      CalendarModal.prototype._getDayTime = function (date) {
          return moment__default["default"](moment__default["default"](date).format('YYYY-MM-DD')).valueOf();
      };
      CalendarModal.prototype._monthFormat = function (date) {
          return moment__default["default"](date).format(this._d.monthFormat.replace(/y/g, 'Y'));
      };
      CalendarModal.prototype._getDayFormatted = function (data) {
          if (!data) {
              return null;
          }
          return moment__default["default"](data.time).format('ddd, MMM Do');
      };
      CalendarModal.prototype.trackByIndex = function (index, momentDate) {
          return momentDate.original ? momentDate.original.time : index;
      };
      return CalendarModal;
  }());
  CalendarModal.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarModal, deps: [{ token: i0__namespace.Renderer2 }, { token: i0__namespace.ElementRef }, { token: i1__namespace.NavParams }, { token: i1__namespace.ModalController }, { token: i0__namespace.ChangeDetectorRef }, { token: CalendarService }], target: i0__namespace.ɵɵFactoryTarget.Component });
  CalendarModal.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: CalendarModal, selector: "ion-calendar-modal", inputs: { options: "options" }, host: { properties: { "class.ion-page": "this.ionPage" } }, viewQueries: [{ propertyName: "content", first: true, predicate: i1.IonContent, descendants: true, static: true }, { propertyName: "monthsEle", first: true, predicate: ["months"], descendants: true, static: true }], ngImport: i0__namespace, template: "\n    <ion-header>\n      <ion-toolbar>\n          <ion-buttons slot=\"secondary\">\n              <ion-button type='button' slot=\"icon-only\" fill=\"clear\" class=\"primary\" (click)=\"onCancel()\">\n              <span *ngIf=\"_d.closeLabel !== '' && !_d.closeIcon\">{{ _d.closeLabel }}</span>\n              <ion-icon *ngIf=\"_d.closeIcon\" name=\"close\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n\n          <ion-title>{{ _d.title }}</ion-title>\n      </ion-toolbar>\n\n      <ng-content select=\"[sub-header]\"></ng-content>\n\n      <ion-row *ngIf=\"_d.pickMode === 'range'\" lines=\"none\" [class]=\"'dates-toolbar'\" no-border>\n        <ion-col size=\"4\" class=\"start-date ion-text-nowrap\">\n          {{ _getDayFormatted(datesTemp[0]) || 'Start Date' }}\n        </ion-col>\n        <ion-col size=\"4\" class=\"ion-text-center\">\n          <ion-icon name=\"arrow-forward-outline\"></ion-icon>\n        </ion-col>\n        <ion-col size=\"4\" class=\"end-date ion-text-right ion-text-nowrap\">\n          {{ _getDayFormatted(datesTemp[1]) || 'End Date' }}\n        </ion-col>\n      </ion-row>\n\n      <ion-calendar-week\n        [color]=\"_d.color\"\n        [weekArray]=\"_d.weekdays\"\n        [weekStart]=\"_d.weekStart\">\n      </ion-calendar-week>\n\n    </ion-header>\n\n    <ion-content (ionScroll)=\"onScroll($event)\" class=\"calendar-page\" [scrollEvents]=\"true\"\n                 [ngClass]=\"{'multi-selection': _d.pickMode === 'multi'}\">\n\n      <div #months>\n        <ng-template ngFor let-month [ngForOf]=\"calendarMonths\" [ngForTrackBy]=\"trackByIndex\" let-i=\"index\">\n          <div class=\"month-box\" [attr.id]=\"'month-' + i\">\n            <h4 class=\"month-title\">{{ _monthFormat(month.original?.date) }}</h4>\n            <ion-calendar-month [month]=\"month\"\n                                [pickMode]=\"_d.pickMode\"\n                                [isSaveHistory]=\"_d.isSaveHistory\"\n                                [id]=\"_d.id\"\n                                [color]=\"_d.color\"\n                                [maxMultiDates]=\"_d.maxMultiDates\"\n                                (change)=\"onChange($event)\"\n                                [(ngModel)]=\"datesTemp\">\n            </ion-calendar-month>\n          </div>\n        </ng-template>\n\n      </div>\n\n      <ion-infinite-scroll threshold=\"25%\" (ionInfinite)=\"nextMonth($event)\">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n\n    </ion-content>\n\n    <ion-footer>\n\n        <ion-button expand=\"full\" *ngIf=\"!_d.autoDone\" [disabled]=\"!canDone()\" (click)=\"done()\">\n          <span *ngIf=\"_d.doneLabel !== '' && !_d.doneIcon\">{{ _d.doneLabel }}</span>\n          <ion-icon *ngIf=\"_d.doneIcon\" name=\"checkmark\"></ion-icon>\n        </ion-button>\n\n    </ion-footer>\n  ", isInline: true, styles: [":host ion-select{max-width:unset}:host ion-select .select-icon>.select-icon-inner,:host ion-select .select-text{color:#fff!important}:host ion-select.select-ios{max-width:unset}:host ion-toolbar ion-button.md{color:var(--ion-color-primary)}:host .dates-toolbar{--background: transparent;padding:0 1rem}:host .dates-toolbar.primary{--background: var(--ion-color-primary)}:host .dates-toolbar.secondary{--background: var(--ion-color-secondary)}:host .dates-toolbar.danger{--background: var(--ion-color-danger)}:host .dates-toolbar.dark{--background: var(--ion-color-dark)}:host .dates-toolbar.light{--background: var(--ion-color-light)}:host .dates-toolbar.transparent{--background: transparent}:host .dates-toolbar.toolbar-md{min-height:44px}:host .ios.dates-toolbar{padding-top:1rem}:host .start-date{padding-left:.5rem}:host .end-date{margin-right:-.5rem}:host .calendar-page{background-color:#fbfbfb}:host .month-box{display:inline-block;width:100%;padding-bottom:1em}:host #month-0{padding-top:1rem}:host .month-title{padding-left:1rem;text-align:left;color:#363749}:host h4{font-weight:400;font-size:1.1rem;display:block;text-align:center;margin:1rem 0 0;color:#929292}body[data-dark-mode=true] :host .month-title{color:#fff}body[data-dark-mode=true] :host .dates-toolbar{color:#fff}\n"], components: [{ type: i1__namespace.IonHeader, selector: "ion-header", inputs: ["collapse", "mode", "translucent"] }, { type: i1__namespace.IonToolbar, selector: "ion-toolbar", inputs: ["color", "mode"] }, { type: i1__namespace.IonButtons, selector: "ion-buttons", inputs: ["collapse"] }, { type: i1__namespace.IonButton, selector: "ion-button", inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"] }, { type: i1__namespace.IonIcon, selector: "ion-icon", inputs: ["color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "sanitize", "size", "src"] }, { type: i1__namespace.IonTitle, selector: "ion-title", inputs: ["color", "size"] }, { type: i1__namespace.IonRow, selector: "ion-row" }, { type: i1__namespace.IonCol, selector: "ion-col", inputs: ["offset", "offsetLg", "offsetMd", "offsetSm", "offsetXl", "offsetXs", "pull", "pullLg", "pullMd", "pullSm", "pullXl", "pullXs", "push", "pushLg", "pushMd", "pushSm", "pushXl", "pushXs", "size", "sizeLg", "sizeMd", "sizeSm", "sizeXl", "sizeXs"] }, { type: CalendarWeekComponent, selector: "ion-calendar-week", inputs: ["color", "weekArray", "weekStart"] }, { type: i1__namespace.IonContent, selector: "ion-content", inputs: ["color", "forceOverscroll", "fullscreen", "scrollEvents", "scrollX", "scrollY"] }, { type: MonthComponent, selector: "ion-calendar-month", inputs: ["month", "pickMode", "isSaveHistory", "id", "readonly", "color", "maxMultiDates"], outputs: ["change", "select", "selectStart", "selectEnd"] }, { type: i1__namespace.IonInfiniteScroll, selector: "ion-infinite-scroll", inputs: ["disabled", "position", "threshold"] }, { type: i1__namespace.IonInfiniteScrollContent, selector: "ion-infinite-scroll-content", inputs: ["loadingSpinner", "loadingText"] }, { type: i1__namespace.IonFooter, selector: "ion-footer", inputs: ["collapse", "mode", "translucent"] }], directives: [{ type: i1__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
  i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarModal, decorators: [{
              type: i0.Component,
              args: [{
                      selector: 'ion-calendar-modal',
                      styleUrls: ['./calendar.modal.scss'],
                      template: "\n    <ion-header>\n      <ion-toolbar>\n          <ion-buttons slot=\"secondary\">\n              <ion-button type='button' slot=\"icon-only\" fill=\"clear\" class=\"primary\" (click)=\"onCancel()\">\n              <span *ngIf=\"_d.closeLabel !== '' && !_d.closeIcon\">{{ _d.closeLabel }}</span>\n              <ion-icon *ngIf=\"_d.closeIcon\" name=\"close\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n\n          <ion-title>{{ _d.title }}</ion-title>\n      </ion-toolbar>\n\n      <ng-content select=\"[sub-header]\"></ng-content>\n\n      <ion-row *ngIf=\"_d.pickMode === 'range'\" lines=\"none\" [class]=\"'dates-toolbar'\" no-border>\n        <ion-col size=\"4\" class=\"start-date ion-text-nowrap\">\n          {{ _getDayFormatted(datesTemp[0]) || 'Start Date' }}\n        </ion-col>\n        <ion-col size=\"4\" class=\"ion-text-center\">\n          <ion-icon name=\"arrow-forward-outline\"></ion-icon>\n        </ion-col>\n        <ion-col size=\"4\" class=\"end-date ion-text-right ion-text-nowrap\">\n          {{ _getDayFormatted(datesTemp[1]) || 'End Date' }}\n        </ion-col>\n      </ion-row>\n\n      <ion-calendar-week\n        [color]=\"_d.color\"\n        [weekArray]=\"_d.weekdays\"\n        [weekStart]=\"_d.weekStart\">\n      </ion-calendar-week>\n\n    </ion-header>\n\n    <ion-content (ionScroll)=\"onScroll($event)\" class=\"calendar-page\" [scrollEvents]=\"true\"\n                 [ngClass]=\"{'multi-selection': _d.pickMode === 'multi'}\">\n\n      <div #months>\n        <ng-template ngFor let-month [ngForOf]=\"calendarMonths\" [ngForTrackBy]=\"trackByIndex\" let-i=\"index\">\n          <div class=\"month-box\" [attr.id]=\"'month-' + i\">\n            <h4 class=\"month-title\">{{ _monthFormat(month.original?.date) }}</h4>\n            <ion-calendar-month [month]=\"month\"\n                                [pickMode]=\"_d.pickMode\"\n                                [isSaveHistory]=\"_d.isSaveHistory\"\n                                [id]=\"_d.id\"\n                                [color]=\"_d.color\"\n                                [maxMultiDates]=\"_d.maxMultiDates\"\n                                (change)=\"onChange($event)\"\n                                [(ngModel)]=\"datesTemp\">\n            </ion-calendar-month>\n          </div>\n        </ng-template>\n\n      </div>\n\n      <ion-infinite-scroll threshold=\"25%\" (ionInfinite)=\"nextMonth($event)\">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n\n    </ion-content>\n\n    <ion-footer>\n\n        <ion-button expand=\"full\" *ngIf=\"!_d.autoDone\" [disabled]=\"!canDone()\" (click)=\"done()\">\n          <span *ngIf=\"_d.doneLabel !== '' && !_d.doneIcon\">{{ _d.doneLabel }}</span>\n          <ion-icon *ngIf=\"_d.doneIcon\" name=\"checkmark\"></ion-icon>\n        </ion-button>\n\n    </ion-footer>\n  ",
                  }]
          }], ctorParameters: function () { return [{ type: i0__namespace.Renderer2 }, { type: i0__namespace.ElementRef }, { type: i1__namespace.NavParams }, { type: i1__namespace.ModalController }, { type: i0__namespace.ChangeDetectorRef }, { type: CalendarService }]; }, propDecorators: { content: [{
                  type: i0.ViewChild,
                  args: [i1.IonContent, { static: true }]
              }], monthsEle: [{
                  type: i0.ViewChild,
                  args: ['months', { static: true }]
              }], ionPage: [{
                  type: i0.HostBinding,
                  args: ['class.ion-page']
              }], options: [{
                  type: i0.Input
              }] } });

  var MonthPickerComponent = /** @class */ (function () {
      function MonthPickerComponent() {
          this.color = defaults.COLOR;
          this.select = new i0.EventEmitter();
          this._thisMonth = new Date();
          this._monthFormat = defaults.MONTH_FORMAT;
          this.MONTH_FORMAT = 'MMMM';
      }
      Object.defineProperty(MonthPickerComponent.prototype, "monthFormat", {
          get: function () {
              return this._monthFormat;
          },
          set: function (value) {
              if (Array.isArray(value) && value.length === 12) {
                  this._monthFormat = value;
              }
          },
          enumerable: false,
          configurable: true
      });
      MonthPickerComponent.prototype._onSelect = function (month) {
          this.select.emit(month);
      };
      MonthPickerComponent.prototype.getDate = function (month) {
          return new Date(this._thisMonth.getFullYear(), month, 1);
      };
      return MonthPickerComponent;
  }());
  MonthPickerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MonthPickerComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
  MonthPickerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: MonthPickerComponent, selector: "ion-calendar-month-picker", inputs: { month: "month", color: "color", monthFormat: "monthFormat" }, outputs: { select: "select" }, ngImport: i0__namespace, template: "\n    <div [class]=\"'month-picker ' + color\">\n      <div class=\"month-packer-item\"\n           [class.this-month]=\" i === _thisMonth.getMonth() && month.original?.year === _thisMonth.getFullYear()\"\n           *ngFor=\"let item of _monthFormat; let i = index\">\n        <button type=\"button\" (click)=\"_onSelect(i)\" [attr.aria-label]=\"getDate(i) | date:MONTH_FORMAT\">{{ item }}</button>\n      </div>\n    </div>\n  ", isInline: true, styles: [":host .month-picker{margin:20px 0;display:inline-block;width:100%}:host .month-packer-item{width:25%;box-sizing:border-box;float:left;height:50px;padding:5px}:host .month-packer-item button{border-radius:32px;width:100%;height:100%;font-size:.9em;background-color:transparent}:host .month-picker.primary .month-packer-item.this-month button{border:1px solid var(--ion-color-primary)}:host .month-picker.primary .month-packer-item.active button{background-color:var(--ion-color-primary);color:#fff}:host .month-picker.secondary .month-packer-item.this-month button{border:1px solid var(--ion-color-secondary)}:host .month-picker.secondary .month-packer-item.active button{background-color:var(--ion-color-secondary);color:#fff}:host .month-picker.danger .month-packer-item.this-month button{border:1px solid var(--ion-color-danger)}:host .month-picker.danger .month-packer-item.active button{background-color:var(--ion-color-danger);color:#fff}:host .month-picker.dark .month-packer-item.this-month button{border:1px solid var(--ion-color-dark)}:host .month-picker.dark .month-packer-item.active button{background-color:var(--ion-color-dark);color:#fff}:host .month-picker.light .month-packer-item.this-month button{border:1px solid var(--ion-color-light)}:host .month-picker.light .month-packer-item.active button{background-color:var(--ion-color-light);color:#9e9e9e}:host .month-picker.transparent{background-color:transparent}:host .month-picker.transparent .month-packer-item.this-month button{border:1px solid var(--ion-color-light)}:host .month-picker.transparent .month-packer-item.active button{background-color:var(--ion-color-light);color:#9e9e9e}:host .month-picker.cal-color .month-packer-item.this-month button{border:1px solid}:host .month-picker.cal-color .month-packer-item.active button{color:#fff}\n"], directives: [{ type: i1__namespace$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "date": i1__namespace$1.DatePipe } });
  i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MonthPickerComponent, decorators: [{
              type: i0.Component,
              args: [{
                      selector: 'ion-calendar-month-picker',
                      styleUrls: ['./month-picker.component.scss'],
                      template: "\n    <div [class]=\"'month-picker ' + color\">\n      <div class=\"month-packer-item\"\n           [class.this-month]=\" i === _thisMonth.getMonth() && month.original?.year === _thisMonth.getFullYear()\"\n           *ngFor=\"let item of _monthFormat; let i = index\">\n        <button type=\"button\" (click)=\"_onSelect(i)\" [attr.aria-label]=\"getDate(i) | date:MONTH_FORMAT\">{{ item }}</button>\n      </div>\n    </div>\n  ",
                  }]
          }], ctorParameters: function () { return []; }, propDecorators: { month: [{
                  type: i0.Input
              }], color: [{
                  type: i0.Input
              }], select: [{
                  type: i0.Output
              }], monthFormat: [{
                  type: i0.Input
              }] } });

  var ION_CAL_VALUE_ACCESSOR = {
      provide: i6.NG_VALUE_ACCESSOR,
      useExisting: i0.forwardRef(function () { return CalendarComponent; }),
      multi: true,
  };
  var CalendarComponent = /** @class */ (function () {
      function CalendarComponent(calSvc) {
          this.calSvc = calSvc;
          this._view = 'days';
          this._calendarMonthValue = [null, null];
          this._showToggleButtons = true;
          this._showMonthPicker = true;
          this.format = defaults.DATE_FORMAT;
          this.type = 'string';
          this.readonly = false;
          this.change = new i0.EventEmitter();
          this.monthChange = new i0.EventEmitter();
          this.select = new i0.EventEmitter();
          this.selectStart = new i0.EventEmitter();
          this.selectEnd = new i0.EventEmitter();
          this.MONTH_DATE_FORMAT = 'MMMM yyyy';
          this._onChanged = function () { };
          this._onTouched = function () { };
      }
      Object.defineProperty(CalendarComponent.prototype, "showToggleButtons", {
          get: function () {
              return this._showToggleButtons;
          },
          set: function (value) {
              this._showToggleButtons = value;
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(CalendarComponent.prototype, "showMonthPicker", {
          get: function () {
              return this._showMonthPicker;
          },
          set: function (value) {
              this._showMonthPicker = value;
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(CalendarComponent.prototype, "options", {
          get: function () {
              return this._options;
          },
          set: function (value) {
              this._options = value;
              this.initOpt();
              if (this.monthOpt && this.monthOpt.original) {
                  this.monthOpt = this.createMonth(this.monthOpt.original.time);
              }
          },
          enumerable: false,
          configurable: true
      });
      CalendarComponent.prototype.ngOnInit = function () {
          this.initOpt();
          this.monthOpt = this.createMonth(new Date().getTime());
      };
      CalendarComponent.prototype.getViewDate = function () {
          return this._handleType(this.monthOpt.original.time);
      };
      CalendarComponent.prototype.getDate = function (date) {
          return new Date(date);
      };
      CalendarComponent.prototype.setViewDate = function (value) {
          this.monthOpt = this.createMonth(this._payloadToTimeNumber(value));
      };
      CalendarComponent.prototype.switchView = function () {
          this._view = this._view === 'days' ? 'month' : 'days';
      };
      CalendarComponent.prototype.prev = function () {
          if (this._view === 'days') {
              this.backMonth();
          }
          else {
              this.prevYear();
          }
      };
      CalendarComponent.prototype.next = function () {
          if (this._view === 'days') {
              this.nextMonth();
          }
          else {
              this.nextYear();
          }
      };
      CalendarComponent.prototype.prevYear = function () {
          if (moment__default["default"](this.monthOpt.original.time).year() === 1970)
              return;
          var backTime = moment__default["default"](this.monthOpt.original.time)
              .subtract(1, 'year')
              .valueOf();
          this.monthOpt = this.createMonth(backTime);
      };
      CalendarComponent.prototype.nextYear = function () {
          var nextTime = moment__default["default"](this.monthOpt.original.time)
              .add(1, 'year')
              .valueOf();
          this.monthOpt = this.createMonth(nextTime);
      };
      CalendarComponent.prototype.nextMonth = function () {
          var nextTime = moment__default["default"](this.monthOpt.original.time)
              .add(1, 'months')
              .valueOf();
          this.monthChange.emit({
              oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
              newMonth: this.calSvc.multiFormat(nextTime),
          });
          this.monthOpt = this.createMonth(nextTime);
      };
      CalendarComponent.prototype.canNext = function () {
          if (!this._d.to || this._view !== 'days')
              return true;
          return this.monthOpt.original.time < moment__default["default"](this._d.to).valueOf();
      };
      CalendarComponent.prototype.backMonth = function () {
          var backTime = moment__default["default"](this.monthOpt.original.time)
              .subtract(1, 'months')
              .valueOf();
          this.monthChange.emit({
              oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
              newMonth: this.calSvc.multiFormat(backTime),
          });
          this.monthOpt = this.createMonth(backTime);
      };
      CalendarComponent.prototype.canBack = function () {
          if (!this._d.from || this._view !== 'days')
              return true;
          return this.monthOpt.original.time > moment__default["default"](this._d.from).valueOf();
      };
      CalendarComponent.prototype.monthOnSelect = function (month) {
          this._view = 'days';
          var newMonth = moment__default["default"](this.monthOpt.original.time)
              .month(month)
              .valueOf();
          this.monthChange.emit({
              oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
              newMonth: this.calSvc.multiFormat(newMonth),
          });
          this.monthOpt = this.createMonth(newMonth);
      };
      CalendarComponent.prototype.onChanged = function ($event) {
          switch (this._d.pickMode) {
              case pickModes.SINGLE:
                  var date = this._handleType($event[0].time);
                  this._onChanged(date);
                  this.change.emit(date);
                  break;
              case pickModes.RANGE:
                  if ($event[0] && $event[1]) {
                      var rangeDate = {
                          from: this._handleType($event[0].time),
                          to: this._handleType($event[1].time),
                      };
                      this._onChanged(rangeDate);
                      this.change.emit(rangeDate);
                  }
                  break;
              case pickModes.MULTI:
                  var dates = [];
                  for (var i = 0; i < $event.length; i++) {
                      if ($event[i] && $event[i].time) {
                          var pushData = this._handleType($event[i].time);
                          dates.push(pushData);
                      }
                  }
                  this._onChanged(dates);
                  this.change.emit(dates);
                  break;
              default:
          }
      };
      CalendarComponent.prototype.swipeEvent = function ($event) {
          var isNext = $event.deltaX < 0;
          if (isNext && this.canNext()) {
              this.nextMonth();
          }
          else if (!isNext && this.canBack()) {
              this.backMonth();
          }
      };
      CalendarComponent.prototype._payloadToTimeNumber = function (value) {
          var date;
          if (this.type === 'string') {
              date = moment__default["default"](value, this.format);
          }
          else {
              date = moment__default["default"](value);
          }
          return date.valueOf();
      };
      CalendarComponent.prototype._monthFormat = function (date) {
          return moment__default["default"](date).format(this._d.monthFormat.replace(/y/g, 'Y'));
      };
      CalendarComponent.prototype.initOpt = function () {
          if (this._options && typeof this._options.showToggleButtons === 'boolean') {
              this.showToggleButtons = this._options.showToggleButtons;
          }
          if (this._options && typeof this._options.showMonthPicker === 'boolean') {
              this.showMonthPicker = this._options.showMonthPicker;
              if (this._view !== 'days' && !this.showMonthPicker) {
                  this._view = 'days';
              }
          }
          this._d = this.calSvc.safeOpt(this._options || {});
      };
      CalendarComponent.prototype.createMonth = function (date) {
          return this.calSvc.createMonthsByPeriod(date, 1, this._d)[0];
      };
      CalendarComponent.prototype._createCalendarDay = function (value) {
          return this.calSvc.createCalendarDay(this._payloadToTimeNumber(value), this._d);
      };
      CalendarComponent.prototype._handleType = function (value) {
          var date = moment__default["default"](value);
          switch (this.type) {
              case 'string':
                  return date.format(this.format);
              case 'js-date':
                  return date.toDate();
              case 'moment':
                  return date;
              case 'time':
                  return date.valueOf();
              case 'object':
                  return date.toObject();
              default:
                  return date;
          }
      };
      CalendarComponent.prototype.writeValue = function (obj) {
          this._writeValue(obj);
          if (obj) {
              if (this._calendarMonthValue[0]) {
                  this.monthOpt = this.createMonth(this._calendarMonthValue[0].time);
              }
              else {
                  this.monthOpt = this.createMonth(new Date().getTime());
              }
          }
      };
      CalendarComponent.prototype.registerOnChange = function (fn) {
          this._onChanged = fn;
      };
      CalendarComponent.prototype.registerOnTouched = function (fn) {
          this._onTouched = fn;
      };
      CalendarComponent.prototype._writeValue = function (value) {
          var _this = this;
          if (!value) {
              this._calendarMonthValue = [null, null];
              return;
          }
          switch (this._d.pickMode) {
              case 'single':
                  this._calendarMonthValue[0] = this._createCalendarDay(value);
                  break;
              case 'range':
                  if (value.from) {
                      this._calendarMonthValue[0] = value.from ? this._createCalendarDay(value.from) : null;
                  }
                  if (value.to) {
                      this._calendarMonthValue[1] = value.to ? this._createCalendarDay(value.to) : null;
                  }
                  break;
              case 'multi':
                  if (Array.isArray(value)) {
                      this._calendarMonthValue = value.map(function (e) {
                          return _this._createCalendarDay(e);
                      });
                  }
                  else {
                      this._calendarMonthValue = [null, null];
                  }
                  break;
              default:
          }
      };
      return CalendarComponent;
  }());
  CalendarComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarComponent, deps: [{ token: CalendarService }], target: i0__namespace.ɵɵFactoryTarget.Component });
  CalendarComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: CalendarComponent, selector: "ion-calendar", inputs: { format: "format", type: "type", readonly: "readonly", options: "options" }, outputs: { change: "change", monthChange: "monthChange", select: "select", selectStart: "selectStart", selectEnd: "selectEnd" }, providers: [ION_CAL_VALUE_ACCESSOR], ngImport: i0__namespace, template: "\n    <div class=\"title\">\n      <ng-template [ngIf]=\"_showMonthPicker\" [ngIfElse]=\"title\">\n        <ion-button type=\"button\"\n                    fill=\"clear\"\n                    class=\"switch-btn\"\n                    [attr.aria-label]=\"getDate(monthOpt?.original?.time) | date:MONTH_DATE_FORMAT\"\n                    (click)=\"switchView()\">\n          {{ _monthFormat(monthOpt.original.time) }}\n          <ion-icon class=\"arrow-dropdown\"\n                    [name]=\"_view === 'days' ? 'md-arrow-dropdown' : 'md-arrow-dropup'\"></ion-icon>\n        </ion-button>\n      </ng-template>\n      <ng-template #title>\n        <div class=\"switch-btn\"\n             [attr.aria-label]=\"getDate(monthOpt.original.time) | date:MONTH_DATE_FORMAT\">\n          {{ _monthFormat(monthOpt.original.time) }}\n        </div>\n      </ng-template>\n      <ng-template [ngIf]=\"_showToggleButtons\">\n        <ion-button type=\"button\" fill=\"clear\" class=\"back\" [disabled]=\"!canBack()\" (click)=\"prev()\">\n          <ion-icon slot=\"icon-only\" size=\"small\" name=\"ios-arrow-back\"></ion-icon>\n        </ion-button>\n        <ion-button type=\"button\" fill=\"clear\" class=\"forward\" [disabled]=\"!canNext()\" (click)=\"next()\">\n          <ion-icon slot=\"icon-only\" size=\"small\" name=\"ios-arrow-forward\"></ion-icon>\n        </ion-button>\n      </ng-template>\n    </div>\n    <ng-template [ngIf]=\"_view === 'days'\" [ngIfElse]=\"monthPicker\">\n      <ion-calendar-week color=\"transparent\"\n                         [weekArray]=\"_d.weekdays\"\n                         [weekStart]=\"_d.weekStart\">\n      </ion-calendar-week>\n\n      <ion-calendar-month class=\"component-mode\"\n                          [(ngModel)]=\"_calendarMonthValue\"\n                          [month]=\"monthOpt\"\n                          [readonly]=\"readonly\"\n                          (change)=\"onChanged($event)\"\n                          (swipe)=\"swipeEvent($event)\"\n                          (select)=\"select.emit($event)\"\n                          (selectStart)=\"selectStart.emit($event)\"\n                          (selectEnd)=\"selectEnd.emit($event)\"\n                          [pickMode]=\"_d.pickMode\"\n                          [color]=\"_d.color\">\n      </ion-calendar-month>\n    </ng-template>\n\n    <ng-template #monthPicker>\n      <ion-calendar-month-picker [color]=\"_d.color ? _d.color : ''\"\n                                 [monthFormat]=\"_options['monthPickerFormat'] && _options['monthPickerFormat'].length > 0 ? _options['monthPickerFormat'] : []  \"\n                                 (select)=\"monthOnSelect($event)\"\n                                 [month]=\"monthOpt\">\n      </ion-calendar-month-picker>\n    </ng-template>\n  ", isInline: true, styles: [":host{padding:10px 20px;box-sizing:border-box;display:inline-block;background-color:#fff;width:100%}:host .title{padding:0 40px;overflow:hidden}:host .title .back,:host .title .forward,:host .title .switch-btn{display:block;position:relative;float:left;min-height:32px;margin:0;padding:0;--padding-start: 0;--padding-end: 0;font-size:15px}:host .title .back,:host .title .forward{color:#757575}:host .title .back{margin-left:-100%;left:-40px;width:40px}:host .title .forward{margin-left:-40px;right:-40px;width:40px}:host .title .switch-btn{--margin-top: 0;--margin-bottom: 0;--margin-start: auto;--margin-end: auto;width:100%;text-align:center;line-height:32px;color:#757575}:host .title .switch-btn .arrow-dropdown{margin-left:5px}:host .days.between .days-btn.is-last,:host .days.between .days-btn.is-first{border-radius:0}:host .component-mode .days.startSelection.is-last-wrap:after{border-radius:0}:host .component-mode .days.endSelection.is-first-wrap:after{border-radius:0}\n"], components: [{ type: i1__namespace.IonButton, selector: "ion-button", inputs: ["buttonType", "color", "disabled", "download", "expand", "fill", "form", "href", "mode", "rel", "routerAnimation", "routerDirection", "shape", "size", "strong", "target", "type"] }, { type: i1__namespace.IonIcon, selector: "ion-icon", inputs: ["color", "flipRtl", "icon", "ios", "lazy", "md", "mode", "name", "sanitize", "size", "src"] }, { type: CalendarWeekComponent, selector: "ion-calendar-week", inputs: ["color", "weekArray", "weekStart"] }, { type: MonthComponent, selector: "ion-calendar-month", inputs: ["month", "pickMode", "isSaveHistory", "id", "readonly", "color", "maxMultiDates"], outputs: ["change", "select", "selectStart", "selectEnd"] }, { type: MonthPickerComponent, selector: "ion-calendar-month-picker", inputs: ["month", "color", "monthFormat"], outputs: ["select"] }], directives: [{ type: i1__namespace$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6__namespace.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "date": i1__namespace$1.DatePipe } });
  i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarComponent, decorators: [{
              type: i0.Component,
              args: [{
                      selector: 'ion-calendar',
                      providers: [ION_CAL_VALUE_ACCESSOR],
                      styleUrls: ['./calendar.component.scss'],
                      template: "\n    <div class=\"title\">\n      <ng-template [ngIf]=\"_showMonthPicker\" [ngIfElse]=\"title\">\n        <ion-button type=\"button\"\n                    fill=\"clear\"\n                    class=\"switch-btn\"\n                    [attr.aria-label]=\"getDate(monthOpt?.original?.time) | date:MONTH_DATE_FORMAT\"\n                    (click)=\"switchView()\">\n          {{ _monthFormat(monthOpt.original.time) }}\n          <ion-icon class=\"arrow-dropdown\"\n                    [name]=\"_view === 'days' ? 'md-arrow-dropdown' : 'md-arrow-dropup'\"></ion-icon>\n        </ion-button>\n      </ng-template>\n      <ng-template #title>\n        <div class=\"switch-btn\"\n             [attr.aria-label]=\"getDate(monthOpt.original.time) | date:MONTH_DATE_FORMAT\">\n          {{ _monthFormat(monthOpt.original.time) }}\n        </div>\n      </ng-template>\n      <ng-template [ngIf]=\"_showToggleButtons\">\n        <ion-button type=\"button\" fill=\"clear\" class=\"back\" [disabled]=\"!canBack()\" (click)=\"prev()\">\n          <ion-icon slot=\"icon-only\" size=\"small\" name=\"ios-arrow-back\"></ion-icon>\n        </ion-button>\n        <ion-button type=\"button\" fill=\"clear\" class=\"forward\" [disabled]=\"!canNext()\" (click)=\"next()\">\n          <ion-icon slot=\"icon-only\" size=\"small\" name=\"ios-arrow-forward\"></ion-icon>\n        </ion-button>\n      </ng-template>\n    </div>\n    <ng-template [ngIf]=\"_view === 'days'\" [ngIfElse]=\"monthPicker\">\n      <ion-calendar-week color=\"transparent\"\n                         [weekArray]=\"_d.weekdays\"\n                         [weekStart]=\"_d.weekStart\">\n      </ion-calendar-week>\n\n      <ion-calendar-month class=\"component-mode\"\n                          [(ngModel)]=\"_calendarMonthValue\"\n                          [month]=\"monthOpt\"\n                          [readonly]=\"readonly\"\n                          (change)=\"onChanged($event)\"\n                          (swipe)=\"swipeEvent($event)\"\n                          (select)=\"select.emit($event)\"\n                          (selectStart)=\"selectStart.emit($event)\"\n                          (selectEnd)=\"selectEnd.emit($event)\"\n                          [pickMode]=\"_d.pickMode\"\n                          [color]=\"_d.color\">\n      </ion-calendar-month>\n    </ng-template>\n\n    <ng-template #monthPicker>\n      <ion-calendar-month-picker [color]=\"_d.color ? _d.color : ''\"\n                                 [monthFormat]=\"_options['monthPickerFormat'] && _options['monthPickerFormat'].length > 0 ? _options['monthPickerFormat'] : []  \"\n                                 (select)=\"monthOnSelect($event)\"\n                                 [month]=\"monthOpt\">\n      </ion-calendar-month-picker>\n    </ng-template>\n  ",
                  }]
          }], ctorParameters: function () { return [{ type: CalendarService }]; }, propDecorators: { format: [{
                  type: i0.Input
              }], type: [{
                  type: i0.Input
              }], readonly: [{
                  type: i0.Input
              }], change: [{
                  type: i0.Output
              }], monthChange: [{
                  type: i0.Output
              }], select: [{
                  type: i0.Output
              }], selectStart: [{
                  type: i0.Output
              }], selectEnd: [{
                  type: i0.Output
              }], options: [{
                  type: i0.Input
              }] } });

  var CalendarController = /** @class */ (function () {
      function CalendarController(modalCtrl, calSvc) {
          this.modalCtrl = modalCtrl;
          this.calSvc = calSvc;
      }
      /**
       * @deprecated
       * @param {CalendarModalOptions} calendarOptions
       * @param {ModalOptions} modalOptions
       * @returns {any}
       */
      CalendarController.prototype.openCalendar = function (calendarOptions, modalOptions) {
          if (modalOptions === void 0) { modalOptions = {}; }
          var options = this.calSvc.safeOpt(calendarOptions);
          return this.modalCtrl
              .create(Object.assign({ component: CalendarModal, componentProps: {
                  options: options,
              } }, modalOptions))
              .then(function (calendarModal) {
              calendarModal.present();
              return calendarModal.onDidDismiss().then(function (event) {
                  return event.data ? Promise.resolve(event.data) : Promise.reject('cancelled');
              });
          });
      };
      return CalendarController;
  }());
  CalendarController.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarController, deps: [{ token: i1__namespace.ModalController }, { token: CalendarService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
  CalendarController.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarController });
  i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarController, decorators: [{
              type: i0.Injectable
          }], ctorParameters: function () { return [{ type: i1__namespace.ModalController }, { type: CalendarService }]; } });

  var CALENDAR_COMPONENTS = [
      CalendarModal,
      CalendarWeekComponent,
      MonthComponent,
      CalendarComponent,
      MonthPickerComponent
  ];

  function calendarController(modalCtrl, calSvc) {
      return new CalendarController(modalCtrl, calSvc);
  }
  var CalendarModule = /** @class */ (function () {
      function CalendarModule() {
      }
      CalendarModule.forRoot = function (defaultOptions) {
          if (defaultOptions === void 0) { defaultOptions = {}; }
          return {
              ngModule: CalendarModule,
              providers: [
                  { provide: DEFAULT_CALENDAR_OPTIONS, useValue: defaultOptions }
              ]
          };
      };
      return CalendarModule;
  }());
  CalendarModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
  CalendarModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarModule, declarations: [CalendarModal, CalendarWeekComponent, MonthComponent, CalendarComponent, MonthPickerComponent], imports: [i1$1.CommonModule, i1.IonicModule, i6.FormsModule], exports: [CalendarModal, CalendarWeekComponent, MonthComponent, CalendarComponent, MonthPickerComponent] });
  CalendarModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarModule, providers: [
          CalendarService,
          {
              provide: CalendarController,
              useFactory: calendarController,
              deps: [i1.ModalController, CalendarService],
          },
      ], imports: [[i1$1.CommonModule, i1.IonicModule, i6.FormsModule]] });
  i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: CalendarModule, decorators: [{
              type: i0.NgModule,
              args: [{
                      imports: [i1$1.CommonModule, i1.IonicModule, i6.FormsModule],
                      declarations: CALENDAR_COMPONENTS,
                      exports: CALENDAR_COMPONENTS,
                      entryComponents: CALENDAR_COMPONENTS,
                      providers: [
                          CalendarService,
                          {
                              provide: CalendarController,
                              useFactory: calendarController,
                              deps: [i1.ModalController, CalendarService],
                          },
                      ],
                      schemas: [i0.CUSTOM_ELEMENTS_SCHEMA],
                  }]
          }] });

  /*
   * Public API Surface of ion-calendar
   */

  /**
   * Generated bundle index. Do not edit.
   */

  exports.CalendarComponent = CalendarComponent;
  exports.CalendarComponentMonthChange = CalendarComponentMonthChange;
  exports.CalendarController = CalendarController;
  exports.CalendarModal = CalendarModal;
  exports.CalendarModule = CalendarModule;
  exports.CalendarMonth = CalendarMonth;
  exports.CalendarResult = CalendarResult;
  exports.CalendarWeekComponent = CalendarWeekComponent;
  exports.DEFAULT_CALENDAR_OPTIONS = DEFAULT_CALENDAR_OPTIONS;
  exports.MonthComponent = MonthComponent;
  exports.MonthPickerComponent = MonthPickerComponent;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ion2-calendar.umd.js.map
