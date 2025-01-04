"use strict";

var _excluded = ["className"],
  _excluded2 = ["className", "children"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
(function (window) {
  'use strict';

  // Base UI Components
  var Input = function Input(_ref) {
    var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      props = _objectWithoutProperties(_ref, _excluded);
    return /*#__PURE__*/React.createElement("input", _extends({
      className: "agent-input w-full p-2 rounded ".concat(className)
    }, props));
  };
  var Button = function Button(_ref2) {
    var _ref2$className = _ref2.className,
      className = _ref2$className === void 0 ? '' : _ref2$className,
      children = _ref2.children,
      props = _objectWithoutProperties(_ref2, _excluded2);
    return /*#__PURE__*/React.createElement("button", _extends({
      className: "agent-button p-2 rounded ".concat(className)
    }, props), children);
  };
  var Card = function Card(_ref3) {
    var children = _ref3.children,
      className = _ref3.className;
    return /*#__PURE__*/React.createElement("div", {
      className: "agent-card shadow-lg rounded-lg p-4 ".concat(className)
    }, children);
  };
  var CardHeader = function CardHeader(_ref4) {
    var children = _ref4.children;
    return /*#__PURE__*/React.createElement("div", {
      className: "mb-4 agent-card flex items-center justify-between",
      style: {
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '1rem'
      }
    }, children);
  };
  var CardContent = function CardContent(_ref5) {
    var children = _ref5.children;
    return /*#__PURE__*/React.createElement("div", {
      className: "p-4 agent-card"
    }, children);
  };

  // Icons (simple SVG components)
  var Plus = function Plus(_ref6) {
    var className = _ref6.className;
    return /*#__PURE__*/React.createElement("svg", {
      className: className,
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "5",
      x2: "12",
      y2: "19"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    }));
  };
  var RefreshCw = function RefreshCw(_ref7) {
    var className = _ref7.className;
    return /*#__PURE__*/React.createElement("svg", {
      className: className,
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M21 2v6h-6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 12a9 9 0 0 1 15-6.7L21 8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 22v-6h6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 12a9 9 0 0 1-15 6.7L3 16"
    }));
  };

  // Composant pour visualiser l'exécution
  var ExecutionViewer = function ExecutionViewer(_ref8) {
    var agents = _ref8.agents,
      tasks = _ref8.tasks,
      onExecute = _ref8.onExecute;
    var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      executionResults = _React$useState2[0],
      setExecutionResults = _React$useState2[1];
    var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isExecuting = _React$useState4[0],
      setIsExecuting = _React$useState4[1];
    var _React$useState5 = React.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      currentStep = _React$useState6[0],
      setCurrentStep = _React$useState6[1];
    var handleExecute = /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var results;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              setIsExecuting(true);
              setExecutionResults([]);
              _context.prev = 2;
              _context.next = 5;
              return onExecute();
            case 5:
              results = _context.sent;
              setExecutionResults(function (prev) {
                return [].concat(_toConsumableArray(prev), [results]);
              });
              _context.next = 12;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);
              setExecutionResults(function (prev) {
                return [].concat(_toConsumableArray(prev), [{
                  error: _context.t0.message
                }]);
              });
            case 12:
              setIsExecuting(false);
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[2, 9]]);
      }));
      return function handleExecute() {
        return _ref9.apply(this, arguments);
      };
    }();
    var renderExecutionStatus = function renderExecutionStatus() {
      return /*#__PURE__*/React.createElement("div", {
        className: "space-y-4"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-between"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "text-lg font-semibold"
      }, "Execution Status"), isExecuting && /*#__PURE__*/React.createElement(RefreshCw, {
        className: "animate-spin"
      })), currentStep && /*#__PURE__*/React.createElement("div", {
        className: "p-4 bg-gray-100 rounded"
      }, /*#__PURE__*/React.createElement("p", null, "Current step: ", currentStep)));
    };
    var renderResults = function renderResults() {
      return /*#__PURE__*/React.createElement("div", {
        className: "space-y-4"
      }, executionResults.map(function (result, index) {
        return /*#__PURE__*/React.createElement(Card, {
          key: index,
          className: "p-4"
        }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("h4", {
          className: "font-semibold"
        }, "Result #", index + 1)), /*#__PURE__*/React.createElement(CardContent, null, result.error ? /*#__PURE__*/React.createElement("div", {
          className: "text-red-500"
        }, "Error: ", result.error) : /*#__PURE__*/React.createElement("div", {
          className: "space-y-2"
        }, Object.entries(result).map(function (_ref10) {
          var _ref11 = _slicedToArray(_ref10, 2),
            key = _ref11[0],
            value = _ref11[1];
          return /*#__PURE__*/React.createElement("div", {
            key: key,
            className: "border-b pb-2"
          }, /*#__PURE__*/React.createElement("span", {
            className: "font-medium"
          }, key, ": "), /*#__PURE__*/React.createElement("span", null, _typeof(value) === 'object' ? JSON.stringify(value, null, 2) : value));
        }))));
      }));
    };
    return /*#__PURE__*/React.createElement(Card, {
      className: "w-full"
    }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between w-full"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "agent-heading text-xl font-bold"
    }, "System Execution"), /*#__PURE__*/React.createElement("button", {
      onClick: handleExecute,
      disabled: isExecuting || !agents.length || !tasks.length,
      className: "agent-button p-2 rounded ml-auto"
    }, isExecuting ? 'Executing...' : 'Execute'))), /*#__PURE__*/React.createElement(CardContent, null, renderExecutionStatus(), executionResults.length > 0 && renderResults()));
  };
  window.AgentUI = function AgentUI() {
    console.log('Rendering AgentUI component');
    var _React$useState7 = React.useState([]),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      agents = _React$useState8[0],
      setAgents = _React$useState8[1];
    var _React$useState9 = React.useState([]),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      tasks = _React$useState10[0],
      setTasks = _React$useState10[1];
    var _React$useState11 = React.useState('agents'),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      currentView = _React$useState12[0],
      setCurrentView = _React$useState12[1];
    var _React$useState13 = React.useState({
        id: '',
        role: '',
        goal: '',
        backstory: '',
        model: 'llama3.2:3b',
        temperature: 0.7,
        allowDelegation: false
      }),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      newAgent = _React$useState14[0],
      setNewAgent = _React$useState14[1];
    var _React$useState15 = React.useState({
        id: '',
        description: '',
        agentId: '',
        context: {}
      }),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      newTask = _React$useState16[0],
      setNewTask = _React$useState16[1];
    var _React$useState17 = React.useState({
        taskSequence: [],
        maxRetries: 3,
        timeout: 30000
      }),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      executionConfig = _React$useState18[0],
      setExecutionConfig = _React$useState18[1];
    var _React$useState19 = React.useState([]),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      llmModels = _React$useState20[0],
      setLlmModels = _React$useState20[1]; // Add state for LLM models

    React.useEffect(function () {
      var fetchLlmModels = /*#__PURE__*/function () {
        var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var response, data;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return fetch('/api/ollama/models');
              case 3:
                response = _context2.sent;
                if (response.ok) {
                  _context2.next = 6;
                  break;
                }
                throw new Error('Network response was not ok');
              case 6:
                _context2.next = 8;
                return response.json();
              case 8:
                data = _context2.sent;
                if (!data.error) {
                  _context2.next = 11;
                  break;
                }
                throw new Error(data.error);
              case 11:
                setLlmModels(Array.isArray(data.models) ? data.models : []);
                _context2.next = 17;
                break;
              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](0);
                console.error('Failed to fetch LLM models:', _context2.t0);
              case 17:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[0, 14]]);
        }));
        return function fetchLlmModels() {
          return _ref12.apply(this, arguments);
        };
      }();
      fetchLlmModels();
    }, []);

    // Fonctions de gestion des agents
    var addAgent = function addAgent() {
      if (newAgent.id && newAgent.role) {
        setAgents([].concat(_toConsumableArray(agents), [_objectSpread({}, newAgent)]));
        setNewAgent({
          id: '',
          role: '',
          goal: '',
          backstory: '',
          model: 'llama3.2:3b',
          temperature: 0.7,
          allowDelegation: false
        });
      }
    };
    var renderAgentForm = function renderAgentForm() {
      return /*#__PURE__*/React.createElement("div", {
        className: "space-y-4"
      }, /*#__PURE__*/React.createElement("input", {
        className: "agent-input w-full p-2 rounded",
        placeholder: "Agent ID",
        value: newAgent.id,
        onChange: function onChange(e) {
          return setNewAgent(_objectSpread(_objectSpread({}, newAgent), {}, {
            id: e.target.value
          }));
        }
      }), /*#__PURE__*/React.createElement("textarea", {
        className: "agent-input w-full p-2 rounded",
        rows: "3",
        placeholder: "Role",
        value: newAgent.role,
        onChange: function onChange(e) {
          return setNewAgent(_objectSpread(_objectSpread({}, newAgent), {}, {
            role: e.target.value
          }));
        }
      }), /*#__PURE__*/React.createElement("textarea", {
        className: "agent-input w-full p-2 rounded",
        rows: "3",
        placeholder: "Goal",
        value: newAgent.goal,
        onChange: function onChange(e) {
          return setNewAgent(_objectSpread(_objectSpread({}, newAgent), {}, {
            goal: e.target.value
          }));
        }
      }), /*#__PURE__*/React.createElement("textarea", {
        className: "agent-input w-full p-2 rounded",
        rows: "3",
        placeholder: "Backstory",
        value: newAgent.backstory,
        onChange: function onChange(e) {
          return setNewAgent(_objectSpread(_objectSpread({}, newAgent), {}, {
            backstory: e.target.value
          }));
        }
      }), /*#__PURE__*/React.createElement("select", {
        className: "agent-input w-full p-2 rounded",
        value: newAgent.model,
        onChange: function onChange(e) {
          return setNewAgent(_objectSpread(_objectSpread({}, newAgent), {}, {
            model: e.target.value
          }));
        }
      }, /*#__PURE__*/React.createElement("option", {
        value: ""
      }, "Select LLM Model"), Array.isArray(llmModels) && llmModels.map(function (model) {
        return /*#__PURE__*/React.createElement("option", {
          key: model,
          value: model
        }, model);
      })), /*#__PURE__*/React.createElement("button", {
        onClick: addAgent,
        className: "agent-button w-full p-2 rounded flex items-center justify-center"
      }, /*#__PURE__*/React.createElement(Plus, {
        className: "mr-2"
      }), "Add Agent"));
    };
    var renderAgentList = function renderAgentList() {
      return /*#__PURE__*/React.createElement("div", {
        className: "space-y-4"
      }, agents.map(function (agent) {
        return /*#__PURE__*/React.createElement(Card, {
          key: agent.id,
          className: "p-4"
        }, /*#__PURE__*/React.createElement("h3", {
          className: "font-bold"
        }, agent.role), /*#__PURE__*/React.createElement("p", null, "ID: ", agent.id), /*#__PURE__*/React.createElement("p", null, "Goal: ", agent.goal), /*#__PURE__*/React.createElement("p", null, "Model: ", agent.model));
      }));
    };

    // Fonctions de gestion des tâches
    var addTask = function addTask() {
      if (newTask.id && newTask.description) {
        setTasks([].concat(_toConsumableArray(tasks), [_objectSpread({}, newTask)]));
        setNewTask({
          id: '',
          description: '',
          agentId: '',
          context: {}
        });
      }
    };
    var renderTaskForm = function renderTaskForm() {
      return /*#__PURE__*/React.createElement("div", {
        className: "space-y-4"
      }, /*#__PURE__*/React.createElement("input", {
        className: "agent-input w-full p-2 rounded",
        placeholder: "Task ID",
        value: newTask.id,
        onChange: function onChange(e) {
          return setNewTask(_objectSpread(_objectSpread({}, newTask), {}, {
            id: e.target.value
          }));
        }
      }), /*#__PURE__*/React.createElement("textarea", {
        className: "agent-input w-full p-2 rounded",
        rows: "3",
        placeholder: "Description",
        value: newTask.description,
        onChange: function onChange(e) {
          return setNewTask(_objectSpread(_objectSpread({}, newTask), {}, {
            description: e.target.value
          }));
        }
      }), /*#__PURE__*/React.createElement("select", {
        className: "agent-input w-full p-2 rounded",
        value: newTask.agentId,
        onChange: function onChange(e) {
          return setNewTask(_objectSpread(_objectSpread({}, newTask), {}, {
            agentId: e.target.value
          }));
        }
      }, /*#__PURE__*/React.createElement("option", {
        value: ""
      }, "Select an agent"), agents.map(function (agent) {
        return /*#__PURE__*/React.createElement("option", {
          key: agent.id,
          value: agent.id
        }, agent.role);
      })), /*#__PURE__*/React.createElement("button", {
        onClick: addTask,
        className: "agent-button w-full p-2 rounded flex items-center justify-center"
      }, /*#__PURE__*/React.createElement(Plus, {
        className: "mr-2"
      }), "Add Task"));
    };
    var renderTaskList = function renderTaskList() {
      return /*#__PURE__*/React.createElement("div", {
        className: "space-y-4"
      }, tasks.map(function (task) {
        return /*#__PURE__*/React.createElement(Card, {
          key: task.id,
          className: "p-4"
        }, /*#__PURE__*/React.createElement("h3", {
          className: "font-bold"
        }, "Task: ", task.id), /*#__PURE__*/React.createElement("p", null, task.description), /*#__PURE__*/React.createElement("p", null, "Assigned to: ", task.agentId));
      }));
    };

    // Gestion de l'exécution
    var handleExecute = /*#__PURE__*/function () {
      var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              return _context3.abrupt("return", {
                status: 'completed',
                executionTime: '2.5s',
                results: {
                  agentsUsed: agents.length,
                  tasksCompleted: tasks.length,
                  output: 'Simulation des résultats'
                }
              });
            case 4:
              _context3.prev = 4;
              _context3.t0 = _context3["catch"](0);
              console.error("Erreur d'exécution:", _context3.t0);
              throw _context3.t0;
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 4]]);
      }));
      return function handleExecute() {
        return _ref13.apply(this, arguments);
      };
    }();
    return /*#__PURE__*/React.createElement(Card, {
      className: "w-full max-w-6xl mx-auto my-6 space-y-6"
    }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between w-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, ['agents', 'tasks', 'process', 'execution'].map(function (view) {
      return /*#__PURE__*/React.createElement("button", {
        key: view,
        className: "px-4 py-2 rounded ".concat(currentView === view ? 'agent-button' : 'agent-button-outline'),
        onClick: function onClick() {
          return setCurrentView(view);
        }
      }, view.charAt(0).toUpperCase() + view.slice(1));
    })))), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
      className: "space-y-6 agent-text w-full"
    }, currentView === 'agents' && /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-8"
    }, /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-bold"
    }, "Add New Agent"), renderAgentForm()), /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-bold"
    }, "Agent List"), renderAgentList())), currentView === 'tasks' && /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-bold"
    }, "Add New Task"), renderTaskForm()), /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-bold"
    }, "Task List"), renderTaskList())), currentView === 'process' && /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-bold"
    }, "Process Configuration"), /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("label", {
      className: "block"
    }, "Task Sequence"), /*#__PURE__*/React.createElement("select", {
      multiple: true,
      className: "w-full p-2 border rounded",
      value: executionConfig.taskSequence,
      onChange: function onChange(e) {
        return setExecutionConfig(_objectSpread(_objectSpread({}, executionConfig), {}, {
          taskSequence: Array.from(e.target.selectedOptions, function (option) {
            return option.value;
          })
        }));
      }
    }, tasks.map(function (task) {
      return /*#__PURE__*/React.createElement("option", {
        key: task.id,
        value: task.id
      }, task.description);
    })))), currentView === 'execution' && /*#__PURE__*/React.createElement(ExecutionViewer, {
      agents: agents,
      tasks: tasks,
      onExecute: handleExecute
    }))));
  };

  // Export the updateAgentUI function to be used in agent.js
  window.updateAgentUI = function updateAgentUI(agent, tasks) {
    console.log('Updating Agent UI with agent:', agent, 'and tasks:', tasks);
    // Implement the logic to update the UI based on the agent and tasks
  };
})(window);