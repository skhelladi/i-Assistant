"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["className"],
  _excluded2 = ["className", "children"];
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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

  // Composant pour la saisie des requêtes
  var QueryInput = function QueryInput(_ref8) {
    var onSubmit = _ref8.onSubmit;
    var _React$useState = React.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      query = _React$useState2[0],
      setQuery = _React$useState2[1];
    var handleSubmit = function handleSubmit(e) {
      e.preventDefault();
      if (query.trim()) {
        onSubmit(query);
        setQuery('');
      }
    };
    return /*#__PURE__*/React.createElement("form", {
      onSubmit: handleSubmit,
      className: "space-y-4"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "agent-input w-full p-2 rounded",
      rows: "4",
      placeholder: "Enter your query for the agent crew...",
      value: query,
      onChange: function onChange(e) {
        return setQuery(e.target.value);
      }
    }), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "agent-button w-full p-2 rounded"
    }, "Submit Query"));
  };

  // Composant pour afficher les résultats
  var ResultsViewer = function ResultsViewer(_ref9) {
    var results = _ref9.results;
    if (!results.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, results.map(function (result, index) {
      return /*#__PURE__*/React.createElement(Card, {
        key: index,
        className: "p-4 ".concat(result.error ? 'border-red-500' : '')
      }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
        className: "flex justify-between items-center"
      }, /*#__PURE__*/React.createElement("h4", {
        className: "font-semibold"
      }, "T\xE2che: ", result.taskId), /*#__PURE__*/React.createElement("span", {
        className: "text-sm ".concat(result.error ? 'text-red-500' : 'text-gray-500')
      }, "Agent: ", result.agentId))), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
        className: "whitespace-pre-wrap ".concat(result.error ? 'text-red-500' : '')
      }, result.output)));
    }));
  };

  // Ajout d'un nouveau composant pour la configuration des agents
  var AgentConfigPanel = function AgentConfigPanel(_ref10) {
    var agent = _ref10.agent,
      onUpdate = _ref10.onUpdate;
    return /*#__PURE__*/React.createElement("div", {
      className: "space-y-4 border rounded p-4"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "font-bold"
    }, agent.name || 'Nouvel Agent'), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Configuration LLM"), /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("select", {
      className: "agent-input w-full",
      value: agent.model,
      onChange: function onChange(e) {
        return onUpdate(_objectSpread(_objectSpread({}, agent), {}, {
          model: e.target.value
        }));
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "S\xE9lectionner un mod\xE8le"), llmModels.map(function (model) {
      return /*#__PURE__*/React.createElement("option", {
        key: model,
        value: model
      }, model);
    })), /*#__PURE__*/React.createElement("input", {
      type: "range",
      min: "0",
      max: "1",
      step: "0.1",
      value: agent.temperature,
      onChange: function onChange(e) {
        return onUpdate(_objectSpread(_objectSpread({}, agent), {}, {
          temperature: parseFloat(e.target.value)
        }));
      },
      className: "w-full"
    }), /*#__PURE__*/React.createElement("span", null, "Temp\xE9rature: ", agent.temperature))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Configuration de la m\xE9moire"), /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, /*#__PURE__*/React.createElement("select", {
      className: "agent-input w-full",
      value: agent.memory.type,
      onChange: function onChange(e) {
        return onUpdate(_objectSpread(_objectSpread({}, agent), {}, {
          memory: _objectSpread(_objectSpread({}, agent.memory), {}, {
            type: e.target.value
          })
        }));
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: "buffer"
    }, "Buffer Memory"), /*#__PURE__*/React.createElement("option", {
      value: "summary"
    }, "Summary Memory"), /*#__PURE__*/React.createElement("option", {
      value: "conversation"
    }, "Conversation Memory")), /*#__PURE__*/React.createElement("input", {
      type: "number",
      className: "agent-input w-full",
      value: agent.memory.maxSize,
      onChange: function onChange(e) {
        return onUpdate(_objectSpread(_objectSpread({}, agent), {}, {
          memory: _objectSpread(_objectSpread({}, agent.memory), {}, {
            maxSize: parseInt(e.target.value)
          })
        }));
      },
      placeholder: "Taille maximale de la m\xE9moire"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", null, "Outils disponibles"), /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, ['web_search', 'code_analysis', 'data_processing', 'file_operations'].map(function (tool) {
      return /*#__PURE__*/React.createElement("label", {
        key: tool,
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        checked: agent.tools.includes(tool),
        onChange: function onChange(e) {
          var tools = e.target.checked ? [].concat(_toConsumableArray(agent.tools), [tool]) : agent.tools.filter(function (t) {
            return t !== tool;
          });
          onUpdate(_objectSpread(_objectSpread({}, agent), {}, {
            tools: tools
          }));
        }
      }), tool.split('_').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' '));
    }))));
  };

  // Composant ExecutionViewer mis à jour
  var ExecutionViewer = function ExecutionViewer(_ref11) {
    var agents = _ref11.agents,
      tasks = _ref11.tasks,
      onExecute = _ref11.onExecute;
    var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      executionResults = _React$useState4[0],
      setExecutionResults = _React$useState4[1];
    var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      isExecuting = _React$useState6[0],
      setIsExecuting = _React$useState6[1];
    var _React$useState7 = React.useState(null),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      currentStep = _React$useState8[0],
      setCurrentStep = _React$useState8[1];
    var _React$useState9 = React.useState(null),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      crewId = _React$useState10[0],
      setCrewId = _React$useState10[1];
    var _React$useState11 = React.useState(null),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      error = _React$useState12[0],
      setError = _React$useState12[1];
    var _React$useState13 = React.useState({}),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      progress = _React$useState14[0],
      setProgress = _React$useState14[1];
    var updateProgress = function updateProgress(agentId, status) {
      setProgress(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, agentId, status));
      });
    };
    var handleQuerySubmit = /*#__PURE__*/function () {
      var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(query) {
        var _agents$, createResponse, _yield$createResponse, id, executeResponse, _yield$executeRespons, results;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              setIsExecuting(true);
              setError(null);
              _context.prev = 2;
              if (crewId) {
                _context.next = 15;
                break;
              }
              updateProgress('system', 'Création de l\'équipage...');
              _context.next = 7;
              return fetch('/api/crew/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  agents: agents,
                  tasks: [].concat(_toConsumableArray(tasks), [{
                    id: "task-".concat(Date.now()),
                    description: query,
                    agentId: (_agents$ = agents[0]) === null || _agents$ === void 0 ? void 0 : _agents$.id,
                    expectedOutput: 'Réponse textuelle',
                    context: {},
                    priority: 1
                  }])
                })
              });
            case 7:
              createResponse = _context.sent;
              if (createResponse.ok) {
                _context.next = 10;
                break;
              }
              throw new Error('Échec de la création de l\'équipage');
            case 10:
              _context.next = 12;
              return createResponse.json();
            case 12:
              _yield$createResponse = _context.sent;
              id = _yield$createResponse.id;
              setCrewId(id);
            case 15:
              // Exécuter la requête
              updateProgress('system', 'Exécution de la requête...');
              _context.next = 18;
              return fetch('/api/crew/execute', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  crewId: crewId,
                  query: query
                })
              });
            case 18:
              executeResponse = _context.sent;
              if (executeResponse.ok) {
                _context.next = 21;
                break;
              }
              throw new Error('Échec de l\'exécution');
            case 21:
              _context.next = 23;
              return executeResponse.json();
            case 23:
              _yield$executeRespons = _context.sent;
              results = _yield$executeRespons.results;
              // Mettre à jour les résultats et le progrès
              results.forEach(function (result) {
                updateProgress(result.agentId, 'Terminé');
              });
              setExecutionResults(function (prev) {
                return [].concat(_toConsumableArray(prev), _toConsumableArray(results));
              });
              _context.next = 34;
              break;
            case 29:
              _context.prev = 29;
              _context.t0 = _context["catch"](2);
              setError(_context.t0.message);
              updateProgress('system', 'Erreur');
              console.error('Erreur d\'exécution:', _context.t0);
            case 34:
              _context.prev = 34;
              setIsExecuting(false);
              return _context.finish(34);
            case 37:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[2, 29, 34, 37]]);
      }));
      return function handleQuerySubmit(_x) {
        return _ref12.apply(this, arguments);
      };
    }();
    var handleCancel = /*#__PURE__*/function () {
      var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!crewId) {
                _context2.next = 11;
                break;
              }
              _context2.prev = 1;
              _context2.next = 4;
              return fetch("/api/crew/cancel/".concat(crewId), {
                method: 'POST'
              });
            case 4:
              setCrewId(null);
              setCurrentStep(null);
              _context2.next = 11;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              console.error('Erreur lors de l\'annulation:', _context2.t0);
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 8]]);
      }));
      return function handleCancel() {
        return _ref13.apply(this, arguments);
      };
    }();
    return /*#__PURE__*/React.createElement(Card, {
      className: "w-full"
    }, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between w-full"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "text-xl font-bold"
    }, "Execute Crew"), isExecuting && /*#__PURE__*/React.createElement("button", {
      onClick: handleCancel,
      className: "agent-button bg-red-500 hover:bg-red-600"
    }, "Annuler"))), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
      className: "space-y-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-gray-100 dark:bg-gray-800 rounded p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-semibold"
    }, "Statut"), isExecuting && /*#__PURE__*/React.createElement(RefreshCw, {
      className: "animate-spin"
    })), currentStep && /*#__PURE__*/React.createElement("p", {
      className: "mt-2"
    }, "Current Step: ", currentStep), error && /*#__PURE__*/React.createElement("p", {
      className: "text-red-500 mt-2"
    }, "Error : ", error)), /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-semibold"
    }, "New Query"), /*#__PURE__*/React.createElement(QueryInput, {
      onSubmit: handleQuerySubmit
    })), executionResults.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-semibold"
    }, "Results"), /*#__PURE__*/React.createElement(ResultsViewer, {
      results: executionResults
    })), /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, Object.entries(progress).map(function (_ref14) {
      var _agents$find;
      var _ref15 = _slicedToArray(_ref14, 2),
        agentId = _ref15[0],
        status = _ref15[1];
      return /*#__PURE__*/React.createElement("div", {
        key: agentId,
        className: "flex items-center justify-between"
      }, /*#__PURE__*/React.createElement("span", null, agentId === 'system' ? 'Système' : ((_agents$find = agents.find(function (a) {
        return a.id === agentId;
      })) === null || _agents$find === void 0 ? void 0 : _agents$find.name) || agentId), /*#__PURE__*/React.createElement("span", {
        className: "px-2 py-1 rounded ".concat(status === 'Finished' ? 'bg-green-500' : status === 'Error' ? 'bg-red-500' : 'bg-blue-500', " text-white")
      }, status));
    })))));
  };
  window.AgentUI = function AgentUI() {
    console.log('Rendering AgentUI component');
    var _React$useState15 = React.useState([]),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      agents = _React$useState16[0],
      setAgents = _React$useState16[1];
    var _React$useState17 = React.useState([]),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      tasks = _React$useState18[0],
      setTasks = _React$useState18[1];
    var _React$useState19 = React.useState('agents'),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      currentView = _React$useState20[0],
      setCurrentView = _React$useState20[1];
    var _React$useState21 = React.useState({
        id: '',
        name: '',
        role: '',
        goal: '',
        backstory: '',
        tools: [],
        model: 'llama3.2:3b',
        temperature: 0.7,
        verbose: true,
        allowDelegation: false,
        memory: {
          type: 'buffer',
          maxSize: 10
        }
      }),
      _React$useState22 = _slicedToArray(_React$useState21, 2),
      newAgent = _React$useState22[0],
      setNewAgent = _React$useState22[1];
    var _React$useState23 = React.useState({
        id: '',
        description: '',
        agentId: '',
        expectedOutput: '',
        context: {},
        dependencies: [],
        priority: 1,
        deadline: null
      }),
      _React$useState24 = _slicedToArray(_React$useState23, 2),
      newTask = _React$useState24[0],
      setNewTask = _React$useState24[1];
    var _React$useState25 = React.useState({
        taskSequence: [],
        maxRetries: 3,
        timeout: 30000
      }),
      _React$useState26 = _slicedToArray(_React$useState25, 2),
      executionConfig = _React$useState26[0],
      setExecutionConfig = _React$useState26[1];
    var _React$useState27 = React.useState([]),
      _React$useState28 = _slicedToArray(_React$useState27, 2),
      llmModels = _React$useState28[0],
      setLlmModels = _React$useState28[1]; // Add state for LLM models

    React.useEffect(function () {
      var fetchLlmModels = /*#__PURE__*/function () {
        var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var response, data;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return fetch('/api/ollama/models');
              case 3:
                response = _context3.sent;
                if (response.ok) {
                  _context3.next = 6;
                  break;
                }
                throw new Error("HTTP error! status: ".concat(response.status));
              case 6:
                _context3.next = 8;
                return response.json();
              case 8:
                data = _context3.sent;
                if (Array.isArray(data.models)) {
                  setLlmModels(data.models);
                  // Si des modèles sont disponibles, mettre à jour le modèle par défaut
                  if (data.models.length > 0) {
                    setNewAgent(function (prev) {
                      return _objectSpread(_objectSpread({}, prev), {}, {
                        model: data.models[0]
                      });
                    });
                  }
                } else {
                  console.error('Models data is not an array:', data);
                  setLlmModels([]);
                }
                _context3.next = 16;
                break;
              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](0);
                console.error('Failed to fetch LLM models:', _context3.t0);
                setLlmModels([]);
              case 16:
              case "end":
                return _context3.stop();
            }
          }, _callee3, null, [[0, 12]]);
        }));
        return function fetchLlmModels() {
          return _ref16.apply(this, arguments);
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
          name: '',
          role: '',
          goal: '',
          backstory: '',
          tools: [],
          model: 'llama3.2:3b',
          temperature: 0.7,
          verbose: true,
          allowDelegation: false,
          memory: {
            type: 'buffer',
            maxSize: 10
          }
        });
      }
    };
    var renderAgentForm = function renderAgentForm() {
      return /*#__PURE__*/React.createElement("div", {
        className: "space-y-4"
      }, /*#__PURE__*/React.createElement("input", {
        className: "agent-input w-full p-2 rounded",
        placeholder: "Agent Name",
        value: newAgent.name,
        onChange: function onChange(e) {
          return setNewAgent(_objectSpread(_objectSpread({}, newAgent), {}, {
            name: e.target.value
          }));
        }
      }), /*#__PURE__*/React.createElement("input", {
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
        placeholder: "Role (e.g., Senior Python Developer, Data Analyst...)",
        value: newAgent.role,
        onChange: function onChange(e) {
          return setNewAgent(_objectSpread(_objectSpread({}, newAgent), {}, {
            role: e.target.value
          }));
        }
      }), /*#__PURE__*/React.createElement("textarea", {
        className: "agent-input w-full p-2 rounded",
        rows: "3",
        placeholder: "Goal (What should this agent achieve?)",
        value: newAgent.goal,
        onChange: function onChange(e) {
          return setNewAgent(_objectSpread(_objectSpread({}, newAgent), {}, {
            goal: e.target.value
          }));
        }
      }), /*#__PURE__*/React.createElement("textarea", {
        className: "agent-input w-full p-2 rounded",
        rows: "3",
        placeholder: "Backstory (Agent's experience and context)",
        value: newAgent.backstory,
        onChange: function onChange(e) {
          return setNewAgent(_objectSpread(_objectSpread({}, newAgent), {}, {
            backstory: e.target.value
          }));
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", null, "Tools"), /*#__PURE__*/React.createElement("select", {
        multiple: true,
        className: "agent-input w-full p-2 rounded",
        value: newAgent.tools,
        onChange: function onChange(e) {
          return setNewAgent(_objectSpread(_objectSpread({}, newAgent), {}, {
            tools: Array.from(e.target.selectedOptions, function (option) {
              return option.value;
            })
          }));
        }
      }, /*#__PURE__*/React.createElement("option", {
        value: "web_search"
      }, "Web Search"), /*#__PURE__*/React.createElement("option", {
        value: "code_analysis"
      }, "Code Analysis"), /*#__PURE__*/React.createElement("option", {
        value: "data_processing"
      }, "Data Processing"), /*#__PURE__*/React.createElement("option", {
        value: "file_operations"
      }, "File Operations"))), /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", null, "LLM Model"), /*#__PURE__*/React.createElement("select", {
        className: "agent-input w-full p-2 rounded",
        value: newAgent.model,
        onChange: function onChange(e) {
          return setNewAgent(_objectSpread(_objectSpread({}, newAgent), {}, {
            model: e.target.value
          }));
        }
      }, /*#__PURE__*/React.createElement("option", {
        value: ""
      }, "Select LLM Model"), llmModels.length > 0 ? llmModels.map(function (model) {
        return /*#__PURE__*/React.createElement("option", {
          key: model,
          value: model
        }, model);
      }) : /*#__PURE__*/React.createElement("option", {
        value: "",
        disabled: true
      }, "Loading models..."))), /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", null, "Temperature (Creativity)"), /*#__PURE__*/React.createElement("input", {
        type: "range",
        min: "0",
        max: "1",
        step: "0.1",
        value: newAgent.temperature,
        onChange: function onChange(e) {
          return setNewAgent(_objectSpread(_objectSpread({}, newAgent), {}, {
            temperature: parseFloat(e.target.value)
          }));
        },
        className: "w-full"
      }), /*#__PURE__*/React.createElement("span", null, newAgent.temperature)), /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        checked: newAgent.allowDelegation,
        onChange: function onChange(e) {
          return setNewAgent(_objectSpread(_objectSpread({}, newAgent), {}, {
            allowDelegation: e.target.checked
          }));
        }
      }), "Allow Task Delegation")), /*#__PURE__*/React.createElement("button", {
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
          expectedOutput: '',
          context: {},
          dependencies: [],
          priority: 1,
          deadline: null
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
        placeholder: "Task Description",
        value: newTask.description,
        onChange: function onChange(e) {
          return setNewTask(_objectSpread(_objectSpread({}, newTask), {}, {
            description: e.target.value
          }));
        }
      }), /*#__PURE__*/React.createElement("textarea", {
        className: "agent-input w-full p-2 rounded",
        rows: "2",
        placeholder: "Expected Output Format",
        value: newTask.expectedOutput,
        onChange: function onChange(e) {
          return setNewTask(_objectSpread(_objectSpread({}, newTask), {}, {
            expectedOutput: e.target.value
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
        }, agent.name, " - ", agent.role);
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", null, "Priority"), /*#__PURE__*/React.createElement("select", {
        className: "agent-input w-full p-2 rounded",
        value: newTask.priority,
        onChange: function onChange(e) {
          return setNewTask(_objectSpread(_objectSpread({}, newTask), {}, {
            priority: parseInt(e.target.value)
          }));
        }
      }, [1, 2, 3, 4, 5].map(function (p) {
        return /*#__PURE__*/React.createElement("option", {
          key: p,
          value: p
        }, "Priority ", p);
      }))), /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", null, "Dependencies"), /*#__PURE__*/React.createElement("select", {
        multiple: true,
        className: "agent-input w-full p-2 rounded",
        value: newTask.dependencies,
        onChange: function onChange(e) {
          return setNewTask(_objectSpread(_objectSpread({}, newTask), {}, {
            dependencies: Array.from(e.target.selectedOptions, function (option) {
              return option.value;
            })
          }));
        }
      }, tasks.map(function (task) {
        return /*#__PURE__*/React.createElement("option", {
          key: task.id,
          value: task.id
        }, task.id, " - ", task.description);
      }))), /*#__PURE__*/React.createElement("button", {
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
      var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              return _context4.abrupt("return", {
                status: 'completed',
                executionTime: '2.5s',
                results: {
                  agentsUsed: agents.length,
                  tasksCompleted: tasks.length,
                  output: 'Simulation des résultats'
                }
              });
            case 4:
              _context4.prev = 4;
              _context4.t0 = _context4["catch"](0);
              console.error("Erreur d'exécution:", _context4.t0);
              throw _context4.t0;
            case 8:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 4]]);
      }));
      return function handleExecute() {
        return _ref17.apply(this, arguments);
      };
    }();

    // Fonction pour créer un équipage CrewAI
    var createCrew = /*#__PURE__*/function () {
      var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var response;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return fetch('/api/crew/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  agents: agents,
                  tasks: tasks,
                  executionConfig: executionConfig
                })
              });
            case 3:
              response = _context5.sent;
              if (response.ok) {
                _context5.next = 6;
                break;
              }
              throw new Error('Failed to create crew');
            case 6:
              _context5.next = 8;
              return response.json();
            case 8:
              return _context5.abrupt("return", _context5.sent);
            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](0);
              console.error('Error creating crew:', _context5.t0);
              throw _context5.t0;
            case 15:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 11]]);
      }));
      return function createCrew() {
        return _ref18.apply(this, arguments);
      };
    }();

    // Fonction pour exécuter les tâches
    var executeTasks = /*#__PURE__*/function () {
      var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var crew, response;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return createCrew();
            case 3:
              crew = _context6.sent;
              _context6.next = 6;
              return fetch('/api/crew/execute', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  crewId: crew.id,
                  taskSequence: executionConfig.taskSequence,
                  maxRetries: executionConfig.maxRetries,
                  timeout: executionConfig.timeout
                })
              });
            case 6:
              response = _context6.sent;
              if (response.ok) {
                _context6.next = 9;
                break;
              }
              throw new Error('Task execution failed');
            case 9:
              _context6.next = 11;
              return response.json();
            case 11:
              return _context6.abrupt("return", _context6.sent);
            case 14:
              _context6.prev = 14;
              _context6.t0 = _context6["catch"](0);
              console.error('Error executing tasks:', _context6.t0);
              throw _context6.t0;
            case 18:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 14]]);
      }));
      return function executeTasks() {
        return _ref19.apply(this, arguments);
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