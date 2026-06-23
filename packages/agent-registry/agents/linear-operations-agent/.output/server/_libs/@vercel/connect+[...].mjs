import { fileURLToPath as __eveFileURLToPath } from "node:url";
import { dirname as __eveDirname } from "node:path";
__eveDirname(__eveFileURLToPath(import.meta.url));
import { i as __toESM, r as __require, t as __commonJSMin } from "../../_runtime.mjs";
import { t as require_dist$1 } from "./cli-exec+[...].mjs";
import { t as require_dist$2 } from "./cli-config+[...].mjs";
import { createRequire } from "node:module";
import "node:crypto";
import { inspect } from "node:util";
import "node:net";
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/shared/guards.js
function isObject(e) {
	return typeof e == `object` && !!e && !Array.isArray(e);
}
function isNonEmptyString(e) {
	return typeof e == `string` && e.length > 0;
}
function isThenable(e) {
	return isObject(e) && typeof e.then == `function`;
}
function isPlainRecord(e) {
	if (!isObject(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/compiled/@opentelemetry/api/index.js
const e$1 = `1.9.1`, t$5 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function n$5(e) {
	let n = /* @__PURE__ */ new Set([e]), r = /* @__PURE__ */ new Set(), i = e.match(t$5);
	if (!i) return () => !1;
	let a = {
		major: +i[1],
		minor: +i[2],
		patch: +i[3],
		prerelease: i[4]
	};
	if (a.prerelease != null) return function(t) {
		return t === e;
	};
	function o(e) {
		return r.add(e), !1;
	}
	function s(e) {
		return n.add(e), !0;
	}
	return function(e) {
		if (n.has(e)) return !0;
		if (r.has(e)) return !1;
		let i = e.match(t$5);
		if (!i) return o(e);
		let c = {
			major: +i[1],
			minor: +i[2],
			patch: +i[3],
			prerelease: i[4]
		};
		return c.prerelease != null || a.major !== c.major ? o(e) : a.major === 0 ? a.minor === c.minor && a.patch <= c.patch ? s(e) : o(e) : a.minor <= c.minor ? s(e) : o(e);
	};
}
const r$5 = n$5(e$1), i$5 = e$1.split(`.`)[0], a$3 = Symbol.for(`opentelemetry.js.api.${i$5}`), o$3 = typeof globalThis == `object` ? globalThis : typeof self == `object` ? self : typeof window == `object` ? window : typeof global == `object` ? global : {};
function s$3(t, n, r, i = !1) {
	let s = o$3[a$3] = o$3[a$3] ?? { version: e$1 };
	if (!i && s[t]) {
		let e = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${t}`);
		return r.error(e.stack || e.message), !1;
	}
	if (s.version !== `1.9.1`) {
		let n = Error(`@opentelemetry/api: Registration of version v${s.version} for ${t} does not match previously registered API v${e$1}`);
		return r.error(n.stack || n.message), !1;
	}
	return s[t] = n, r.debug(`@opentelemetry/api: Registered a global for ${t} v${e$1}.`), !0;
}
function c$4(e) {
	let t = o$3[a$3]?.version;
	if (!(!t || !r$5(t))) return o$3[a$3]?.[e];
}
function l$4(t, n) {
	n.debug(`@opentelemetry/api: Unregistering a global for ${t} v${e$1}.`);
	let r = o$3[a$3];
	r && delete r[t];
}
var ee$4 = class {
	constructor(e) {
		this._namespace = e.namespace || `DiagComponentLogger`;
	}
	debug(...e) {
		return u$4(`debug`, this._namespace, e);
	}
	error(...e) {
		return u$4(`error`, this._namespace, e);
	}
	info(...e) {
		return u$4(`info`, this._namespace, e);
	}
	warn(...e) {
		return u$4(`warn`, this._namespace, e);
	}
	verbose(...e) {
		return u$4(`verbose`, this._namespace, e);
	}
};
function u$4(e, t, n) {
	let r = c$4(`diag`);
	if (r) return r[e](t, ...n);
}
var d$5;
(function(e) {
	e[e.NONE = 0] = `NONE`, e[e.ERROR = 30] = `ERROR`, e[e.WARN = 50] = `WARN`, e[e.INFO = 60] = `INFO`, e[e.DEBUG = 70] = `DEBUG`, e[e.VERBOSE = 80] = `VERBOSE`, e[e.ALL = 9999] = `ALL`;
})(d$5 ||= {});
function te$3(e, t) {
	e < d$5.NONE ? e = d$5.NONE : e > d$5.ALL && (e = d$5.ALL), t ||= {};
	function n(n, r) {
		let i = t[n];
		return typeof i == `function` && e >= r ? i.bind(t) : function() {};
	}
	return {
		error: n(`error`, d$5.ERROR),
		warn: n(`warn`, d$5.WARN),
		info: n(`info`, d$5.INFO),
		debug: n(`debug`, d$5.DEBUG),
		verbose: n(`verbose`, d$5.VERBOSE)
	};
}
var f$5 = class e {
	static instance() {
		return this._instance ||= new e(), this._instance;
	}
	constructor() {
		function e(e) {
			return function(...t) {
				let n = c$4(`diag`);
				if (n) return n[e](...t);
			};
		}
		let t = this;
		t.setLogger = (e, n = { logLevel: d$5.INFO }) => {
			if (e === t) {
				let e = Error(`Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation`);
				return t.error(e.stack ?? e.message), !1;
			}
			typeof n == `number` && (n = { logLevel: n });
			let r = c$4(`diag`), i = te$3(n.logLevel ?? d$5.INFO, e);
			if (r && !n.suppressOverrideMessage) {
				let e = Error().stack ?? `<failed to generate stacktrace>`;
				r.warn(`Current logger will be overwritten from ${e}`), i.warn(`Current logger will overwrite one already registered from ${e}`);
			}
			return s$3(`diag`, i, t, !0);
		}, t.disable = () => {
			l$4(`diag`, t);
		}, t.createComponentLogger = (e) => new ee$4(e), t.verbose = e(`verbose`), t.debug = e(`debug`), t.info = e(`info`), t.warn = e(`warn`), t.error = e(`error`);
	}
}, ne$3 = class e {
	constructor(e) {
		this._entries = e ? new Map(e) : /* @__PURE__ */ new Map();
	}
	getEntry(e) {
		let t = this._entries.get(e);
		if (t) return Object.assign({}, t);
	}
	getAllEntries() {
		return Array.from(this._entries.entries());
	}
	setEntry(t, n) {
		let r = new e(this._entries);
		return r._entries.set(t, n), r;
	}
	removeEntry(t) {
		let n = new e(this._entries);
		return n._entries.delete(t), n;
	}
	removeEntries(...t) {
		let n = new e(this._entries);
		for (let e of t) n._entries.delete(e);
		return n;
	}
	clear() {
		return new e();
	}
};
f$5.instance();
function ae$3(e = {}) {
	return new ne$3(new Map(Object.entries(e)));
}
function p$4(e) {
	return Symbol.for(e);
}
const m$4 = new class e {
	constructor(t) {
		let n = this;
		n._currentContext = t ? new Map(t) : /* @__PURE__ */ new Map(), n.getValue = (e) => n._currentContext.get(e), n.setValue = (t, r) => {
			let i = new e(n._currentContext);
			return i._currentContext.set(t, r), i;
		}, n.deleteValue = (t) => {
			let r = new e(n._currentContext);
			return r._currentContext.delete(t), r;
		};
	}
}(), g$5 = {};
if (typeof console < `u`) for (let e of [
	`error`,
	`warn`,
	`info`,
	`debug`,
	`trace`,
	`log`
]) typeof console[e] == `function` && (g$5[e] = console[e]);
var ce$3 = class {
	constructor() {}
	createGauge(e, t) {
		return _e$2;
	}
	createHistogram(e, t) {
		return ve$2;
	}
	createCounter(e, t) {
		return ge$2;
	}
	createUpDownCounter(e, t) {
		return ye$2;
	}
	createObservableGauge(e, t) {
		return xe$2;
	}
	createObservableCounter(e, t) {
		return be$2;
	}
	createObservableUpDownCounter(e, t) {
		return Se$2;
	}
	addBatchObservableCallback(e, t) {}
	removeBatchObservableCallback(e) {}
}, _$4 = class {}, le$3 = class extends _$4 {
	add(e, t) {}
}, ue$3 = class extends _$4 {
	add(e, t) {}
}, de$3 = class extends _$4 {
	record(e, t) {}
}, fe$3 = class extends _$4 {
	record(e, t) {}
}, v$4 = class {
	addCallback(e) {}
	removeCallback(e) {}
}, pe$2 = class extends v$4 {}, me$2 = class extends v$4 {}, he$2 = class extends v$4 {};
const y$4 = new ce$3(), ge$2 = new le$3(), _e$2 = new de$3(), ve$2 = new fe$3(), ye$2 = new ue$3(), be$2 = new pe$2(), xe$2 = new me$2(), Se$2 = new he$2();
var we$2;
(function(e) {
	e[e.INT = 0] = `INT`, e[e.DOUBLE = 1] = `DOUBLE`;
})(we$2 ||= {});
const Te$2 = {
	get(e, t) {
		if (e != null) return e[t];
	},
	keys(e) {
		return e == null ? [] : Object.keys(e);
	}
}, b$3 = { set(e, t, n) {
	e != null && (e[t] = n);
} };
var Ee$2 = class {
	active() {
		return m$4;
	}
	with(e, t, n, ...r) {
		return t.call(n, ...r);
	}
	bind(e, t) {
		return t;
	}
	enable() {
		return this;
	}
	disable() {
		return this;
	}
};
const x$4 = `context`, De$2 = new Ee$2();
var S$4 = class e {
	constructor() {}
	static getInstance() {
		return this._instance ||= new e(), this._instance;
	}
	setGlobalContextManager(e) {
		return s$3(x$4, e, f$5.instance());
	}
	active() {
		return this._getContextManager().active();
	}
	with(e, t, n, ...r) {
		return this._getContextManager().with(e, t, n, ...r);
	}
	bind(e, t) {
		return this._getContextManager().bind(e, t);
	}
	_getContextManager() {
		return c$4(x$4) || De$2;
	}
	disable() {
		this._getContextManager().disable(), l$4(x$4, f$5.instance());
	}
}, C$4;
(function(e) {
	e[e.NONE = 0] = `NONE`, e[e.SAMPLED = 1] = `SAMPLED`;
})(C$4 ||= {});
const E$4 = {
	traceId: `00000000000000000000000000000000`,
	spanId: `0000000000000000`,
	traceFlags: C$4.NONE
};
var D$4 = class {
	constructor(e = E$4) {
		this._spanContext = e;
	}
	spanContext() {
		return this._spanContext;
	}
	setAttribute(e, t) {
		return this;
	}
	setAttributes(e) {
		return this;
	}
	addEvent(e, t) {
		return this;
	}
	addLink(e) {
		return this;
	}
	addLinks(e) {
		return this;
	}
	setStatus(e) {
		return this;
	}
	updateName(e) {
		return this;
	}
	end(e) {}
	isRecording() {
		return !1;
	}
	recordException(e, t) {}
};
const O$4 = p$4(`OpenTelemetry Context Key SPAN`);
function k$4(e) {
	return e.getValue(O$4) || void 0;
}
function Oe$2() {
	return k$4(S$4.getInstance().active());
}
function A$3(e, t) {
	return e.setValue(O$4, t);
}
function ke$2(e) {
	return e.deleteValue(O$4);
}
function Ae$3(e, t) {
	return A$3(e, new D$4(t));
}
function j$4(e) {
	return k$4(e)?.spanContext();
}
const M$3 = new Uint8Array([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	1,
	1,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	1,
	1
]);
function N$3(e, t) {
	if (typeof e != `string` || e.length !== t) return !1;
	let n = 0;
	for (let t = 0; t < e.length; t += 4) n += (M$3[e.charCodeAt(t)] | 0) + (M$3[e.charCodeAt(t + 1)] | 0) + (M$3[e.charCodeAt(t + 2)] | 0) + (M$3[e.charCodeAt(t + 3)] | 0);
	return n === t;
}
function P$4(e) {
	return N$3(e, 32) && e !== `00000000000000000000000000000000`;
}
function F$4(e) {
	return N$3(e, 16) && e !== `0000000000000000`;
}
function I$4(e) {
	return P$4(e.traceId) && F$4(e.spanId);
}
function je$3(e) {
	return new D$4(e);
}
const L$4 = S$4.getInstance();
var R$4 = class {
	startSpan(e, t, n = L$4.active()) {
		if (t?.root) return new D$4();
		let r = n && j$4(n);
		return Me$3(r) && I$4(r) ? new D$4(r) : new D$4();
	}
	startActiveSpan(e, t, n, r) {
		let i, a, o;
		if (arguments.length < 2) return;
		arguments.length === 2 ? o = t : arguments.length === 3 ? (i = t, o = n) : (i = t, a = n, o = r);
		let s = a ?? L$4.active(), c = this.startSpan(e, i, s), l = A$3(s, c);
		return L$4.with(l, o, void 0, c);
	}
};
function Me$3(e) {
	return typeof e == `object` && !!e && `spanId` in e && typeof e.spanId == `string` && `traceId` in e && typeof e.traceId == `string` && `traceFlags` in e && typeof e.traceFlags == `number`;
}
const Ne$3 = new R$4();
var z$4 = class {
	constructor(e, t, n, r) {
		this._provider = e, this.name = t, this.version = n, this.options = r;
	}
	startSpan(e, t, n) {
		return this._getTracer().startSpan(e, t, n);
	}
	startActiveSpan(e, t, n, r) {
		let i = this._getTracer();
		return Reflect.apply(i.startActiveSpan, i, arguments);
	}
	_getTracer() {
		if (this._delegate) return this._delegate;
		let e = this._provider.getDelegateTracer(this.name, this.version, this.options);
		return e ? (this._delegate = e, this._delegate) : Ne$3;
	}
};
const Pe$2 = new class {
	getTracer(e, t, n) {
		return new R$4();
	}
}();
var B$4 = class {
	getTracer(e, t, n) {
		return this.getDelegateTracer(e, t, n) ?? new z$4(this, e, t, n);
	}
	getDelegate() {
		return this._delegate ?? Pe$2;
	}
	setDelegate(e) {
		this._delegate = e;
	}
	getDelegateTracer(e, t, n) {
		return this._delegate?.getTracer(e, t, n);
	}
}, V$4;
(function(e) {
	e[e.NOT_RECORD = 0] = `NOT_RECORD`, e[e.RECORD = 1] = `RECORD`, e[e.RECORD_AND_SAMPLED = 2] = `RECORD_AND_SAMPLED`;
})(V$4 ||= {});
var H$4;
(function(e) {
	e[e.INTERNAL = 0] = `INTERNAL`, e[e.SERVER = 1] = `SERVER`, e[e.CLIENT = 2] = `CLIENT`, e[e.PRODUCER = 3] = `PRODUCER`, e[e.CONSUMER = 4] = `CONSUMER`;
})(H$4 ||= {});
var U$4;
(function(e) {
	e[e.UNSET = 0] = `UNSET`, e[e.OK = 1] = `OK`, e[e.ERROR = 2] = `ERROR`;
})(U$4 ||= {});
const W$3 = `[_0-9a-z-*/]`;
RegExp(`^(?:${`[a-z]${W$3}{0,255}`}|${`[a-z0-9]${W$3}{0,240}@[a-z]${W$3}{0,13}`})$`);
const G$3 = S$4.getInstance();
f$5.instance();
const He$1 = new class {
	getMeter(e, t, n) {
		return y$4;
	}
}(), q$4 = `metrics`;
(class e {
	constructor() {}
	static getInstance() {
		return this._instance ||= new e(), this._instance;
	}
	setGlobalMeterProvider(e) {
		return s$3(q$4, e, f$5.instance());
	}
	getMeterProvider() {
		return c$4(q$4) || He$1;
	}
	getMeter(e, t, n) {
		return this.getMeterProvider().getMeter(e, t, n);
	}
	disable() {
		l$4(q$4, f$5.instance());
	}
}).getInstance();
var Ue$1 = class {
	inject(e, t) {}
	extract(e, t) {
		return e;
	}
	fields() {
		return [];
	}
};
const Y$4 = p$4(`OpenTelemetry Baggage Key`);
function X$4(e) {
	return e.getValue(Y$4) || void 0;
}
function We$1() {
	return X$4(S$4.getInstance().active());
}
function Ge$1(e, t) {
	return e.setValue(Y$4, t);
}
function Ke$1(e) {
	return e.deleteValue(Y$4);
}
const Z$4 = `propagation`, qe$1 = new Ue$1();
(class e {
	constructor() {
		this.createBaggage = ae$3, this.getBaggage = X$4, this.getActiveBaggage = We$1, this.setBaggage = Ge$1, this.deleteBaggage = Ke$1;
	}
	static getInstance() {
		return this._instance ||= new e(), this._instance;
	}
	setGlobalPropagator(e) {
		return s$3(Z$4, e, f$5.instance());
	}
	inject(e, t, n = b$3) {
		return this._getGlobalPropagator().inject(e, t, n);
	}
	extract(e, t, n = Te$2) {
		return this._getGlobalPropagator().extract(e, t, n);
	}
	fields() {
		return this._getGlobalPropagator().fields();
	}
	disable() {
		l$4(Z$4, f$5.instance());
	}
	_getGlobalPropagator() {
		return c$4(Z$4) || qe$1;
	}
}).getInstance();
const Q$4 = `trace`, $$4 = class e {
	constructor() {
		this._proxyTracerProvider = new B$4(), this.wrapSpanContext = je$3, this.isSpanContextValid = I$4, this.deleteSpan = ke$2, this.getSpan = k$4, this.getActiveSpan = Oe$2, this.getSpanContext = j$4, this.setSpan = A$3, this.setSpanContext = Ae$3;
	}
	static getInstance() {
		return this._instance ||= new e(), this._instance;
	}
	setGlobalTracerProvider(e) {
		let t = s$3(Q$4, this._proxyTracerProvider, f$5.instance());
		return t && this._proxyTracerProvider.setDelegate(e), t;
	}
	getTracerProvider() {
		return c$4(Q$4) || this._proxyTracerProvider;
	}
	getTracer(e, t) {
		return this.getTracerProvider().getTracer(e, t);
	}
	disable() {
		l$4(Q$4, f$5.instance()), this._proxyTracerProvider = new B$4();
	}
}.getInstance();
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/compiled/@ai-sdk/provider/index.js
var e = `vercel.ai.error`, t$4 = Symbol.for(e), n$4, r$4, i$4 = class i extends (r$4 = Error, n$4 = t$4, r$4) {
	constructor({ name: e, message: t, cause: r }) {
		super(t), this[n$4] = !0, this.name = e, this.cause = r;
	}
	static isInstance(t) {
		return i.hasMarker(t, e);
	}
	static hasMarker(e, t) {
		let n = Symbol.for(t);
		return typeof e == `object` && !!e && n in e && typeof e[n] == `boolean` && e[n] === !0;
	}
}, ee$3 = `AI_APICallError`, a$2 = `vercel.ai.error.${ee$3}`, o$2 = Symbol.for(a$2), te$2, s$2, c$3 = class extends (s$2 = i$4, te$2 = o$2, s$2) {
	constructor({ message: e, url: t, requestBodyValues: n, statusCode: r, responseHeaders: i, responseBody: a, cause: o, isRetryable: s = r != null && (r === 408 || r === 409 || r === 429 || r >= 500), data: c }) {
		super({
			name: ee$3,
			message: e,
			cause: o
		}), this[te$2] = !0, this.url = t, this.requestBodyValues = n, this.statusCode = r, this.responseHeaders = i, this.responseBody = a, this.isRetryable = s, this.data = c;
	}
	static isInstance(e) {
		return i$4.hasMarker(e, a$2);
	}
}, l$3 = `AI_EmptyResponseBodyError`, u$3 = `vercel.ai.error.${l$3}`, ne$2 = Symbol.for(u$3), d$4, f$4, re$2 = class extends (f$4 = i$4, d$4 = ne$2, f$4) {
	constructor({ message: e = `Empty response body` } = {}) {
		super({
			name: l$3,
			message: e
		}), this[d$4] = !0;
	}
	static isInstance(e) {
		return i$4.hasMarker(e, u$3);
	}
};
function p$3(e) {
	return e == null ? `unknown error` : typeof e == `string` ? e : e instanceof Error ? e.toString() : JSON.stringify(e);
}
var m$3 = `AI_InvalidArgumentError`, h$3 = `vercel.ai.error.${m$3}`, ie$2 = Symbol.for(h$3), g$4, _$3, ae$2 = class extends (_$3 = i$4, g$4 = ie$2, _$3) {
	constructor({ message: e, cause: t, argument: n }) {
		super({
			name: m$3,
			message: e,
			cause: t
		}), this[g$4] = !0, this.argument = n;
	}
	static isInstance(e) {
		return i$4.hasMarker(e, h$3);
	}
}, v$3 = `AI_InvalidPromptError`, y$3 = `vercel.ai.error.${v$3}`, oe$2 = Symbol.for(y$3), b$2, x$3, se$2 = class extends (x$3 = i$4, b$2 = oe$2, x$3) {
	constructor({ prompt: e, message: t, cause: n }) {
		super({
			name: v$3,
			message: `Invalid prompt: ${t}`,
			cause: n
		}), this[b$2] = !0, this.prompt = e;
	}
	static isInstance(e) {
		return i$4.hasMarker(e, y$3);
	}
}, S$3 = `AI_InvalidResponseDataError`, C$3 = `vercel.ai.error.${S$3}`, ce$2 = Symbol.for(C$3), w$3, T$3, le$2 = class extends (T$3 = i$4, w$3 = ce$2, T$3) {
	constructor({ data: e, message: t = `Invalid response data: ${JSON.stringify(e)}.` }) {
		super({
			name: S$3,
			message: t
		}), this[w$3] = !0, this.data = e;
	}
	static isInstance(e) {
		return i$4.hasMarker(e, C$3);
	}
}, E$3 = `AI_JSONParseError`, D$3 = `vercel.ai.error.${E$3}`, ue$2 = Symbol.for(D$3), O$3, k$3, de$2 = class extends (k$3 = i$4, O$3 = ue$2, k$3) {
	constructor({ text: e, cause: t }) {
		super({
			name: E$3,
			message: `JSON parsing failed: Text: ${e}.
Error message: ${p$3(t)}`,
			cause: t
		}), this[O$3] = !0, this.text = e;
	}
	static isInstance(e) {
		return i$4.hasMarker(e, D$3);
	}
}, A$2 = `AI_LoadAPIKeyError`, j$3 = `vercel.ai.error.${A$2}`, fe$2 = Symbol.for(j$3), M$2, N$2, pe$1 = class extends (N$2 = i$4, M$2 = fe$2, N$2) {
	constructor({ message: e }) {
		super({
			name: A$2,
			message: e
		}), this[M$2] = !0;
	}
	static isInstance(e) {
		return i$4.hasMarker(e, j$3);
	}
};
var V$3 = `AI_NoSuchModelError`, H$3 = `vercel.ai.error.${V$3}`, ye$1 = Symbol.for(H$3), U$3, W$2, be$1 = class extends (W$2 = i$4, U$3 = ye$1, W$2) {
	constructor({ errorName: e = V$3, modelId: t, modelType: n, message: r = `No such ${n}: ${t}` }) {
		super({
			name: e,
			message: r
		}), this[U$3] = !0, this.modelId = t, this.modelType = n;
	}
	static isInstance(e) {
		return i$4.hasMarker(e, H$3);
	}
}, G$2 = `AI_NoSuchProviderReferenceError`, K$2 = `vercel.ai.error.${G$2}`, xe$1 = Symbol.for(K$2), q$3, J$3, Se$1 = class extends (J$3 = i$4, q$3 = xe$1, J$3) {
	constructor({ provider: e, reference: t, message: n = `No provider reference found for provider '${e}'. Available providers: ${Object.keys(t).join(`, `)}` }) {
		super({
			name: G$2,
			message: n
		}), this[q$3] = !0, this.provider = e, this.reference = t;
	}
	static isInstance(e) {
		return i$4.hasMarker(e, K$2);
	}
}, Y$3 = `AI_TooManyEmbeddingValuesForCallError`, X$3 = `vercel.ai.error.${Y$3}`, Ce$1 = Symbol.for(X$3), Z$3, we$1, Te$1 = class extends (we$1 = i$4, Z$3 = Ce$1, we$1) {
	constructor(e) {
		super({
			name: Y$3,
			message: `Too many values for a single embedding call. The ${e.provider} model "${e.modelId}" can only embed up to ${e.maxEmbeddingsPerCall} values per call, but ${e.values.length} values were provided.`
		}), this[Z$3] = !0, this.provider = e.provider, this.modelId = e.modelId, this.maxEmbeddingsPerCall = e.maxEmbeddingsPerCall, this.values = e.values;
	}
	static isInstance(e) {
		return i$4.hasMarker(e, X$3);
	}
}, Ee$1 = `AI_TypeValidationError`, De$1 = `vercel.ai.error.${Ee$1}`, Oe$1 = Symbol.for(De$1), Q$3, ke$1, Ae$2 = class e extends (ke$1 = i$4, Q$3 = Oe$1, ke$1) {
	constructor({ value: e, cause: t, context: n }) {
		let r = `Type validation failed`;
		if (n?.field && (r += ` for ${n.field}`), n?.entityName || n?.entityId) {
			r += ` (`;
			let e = [];
			n.entityName && e.push(n.entityName), n.entityId && e.push(`id: "${n.entityId}"`), r += e.join(`, `), r += `)`;
		}
		super({
			name: Ee$1,
			message: `${r}: Value: ${JSON.stringify(e)}.
Error message: ${p$3(t)}`,
			cause: t
		}), this[Q$3] = !0, this.value = e, this.context = n;
	}
	static isInstance(e) {
		return i$4.hasMarker(e, De$1);
	}
	static wrap({ value: t, cause: n, context: r }) {
		return e.isInstance(n) && n.value === t && n.context?.field === r?.field && n.context?.entityName === r?.entityName && n.context?.entityId === r?.entityId ? n : new e({
			value: t,
			cause: n,
			context: r
		});
	}
}, je$2 = `AI_UnsupportedFunctionalityError`, Me$2 = `vercel.ai.error.${je$2}`, Ne$2 = Symbol.for(Me$2), Pe$1, Fe$1, Ie$1 = class extends (Fe$1 = i$4, Pe$1 = Ne$2, Fe$1) {
	constructor({ functionality: e, message: t = `'${e}' functionality not supported.` }) {
		super({
			name: je$2,
			message: t
		}), this[Pe$1] = !0, this.functionality = e;
	}
	static isInstance(e) {
		return i$4.hasMarker(e, Me$2);
	}
};
function $$3(e) {
	return e === null || typeof e == `string` || typeof e == `number` || typeof e == `boolean` ? !0 : Array.isArray(e) ? e.every($$3) : typeof e == `object` ? Object.entries(e).every(([e, t]) => typeof e == `string` && (t === void 0 || $$3(t))) : !1;
}
function Re$1(e) {
	return typeof e == `object` && !!e && Object.entries(e).every(([e, t]) => typeof e == `string` && (t === void 0 || $$3(t)));
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/internal/logging.js
const LEVEL_SEVERITY = {
	debug: 10,
	info: 20,
	warn: 30,
	error: 40
};
function createLogger(e) {
	return {
		debug(t, n) {
			write(`debug`, e, t, n);
		},
		info(t, n) {
			write(`info`, e, t, n);
		},
		warn(t, n) {
			write(`warn`, e, t, n);
		},
		error(t, n) {
			write(`error`, e, t, n), recordOnActiveSpan(t, n);
		}
	};
}
function logError(e, t, n, r) {
	let i = formatError(n);
	return e.error(t, {
		...r,
		error: i
	}), typeof i.errorId == `string` ? i.errorId : createErrorId();
}
function createErrorId() {
	return crypto.randomUUID();
}
function formatError(e, t) {
	let n = {
		errorId: t ?? createErrorId(),
		message: extractErrorMessage(e)
	}, r = extractErrorName(e);
	return r !== void 0 && (n.name = r), n.detail = inspectError(e), n;
}
function extractErrorName(e) {
	if (e instanceof Error) return e.name === `Error` ? void 0 : e.name;
	if (isObject(e) && isNonEmptyString(e.name) && e.name !== `Error`) return e.name;
}
function extractErrorMessage(e) {
	return isObject(e) && !(e instanceof Error) && typeof e.message == `string` ? e.message : p$3(e);
}
function extractErrorId(e) {
	if (isObject(e)) return isNonEmptyString(e.errorId) ? e.errorId : void 0;
}
function formatErrorHint(e) {
	let r = isObject(e.details) ? e.details.name : void 0, i = isNonEmptyString(r) ? r : void 0, a = typeof e.message == `string` ? e.message.trim() : ``;
	return i && a.length > 0 ? ` (${i}: ${truncateForDisplay(a)})` : i ? ` (${i})` : a.length > 0 ? ` (${truncateForDisplay(a)})` : ``;
}
function truncateForDisplay(e, t = 160) {
	return e.length <= t ? e : `${e.slice(0, t - 1).trimEnd()}…`;
}
function recordErrorOnSpan(e, t) {
	let n = t instanceof Error ? t.message : p$3(t), i = t instanceof Error ? t.name : `Error`;
	e.setStatus({
		code: U$4.ERROR,
		message: n
	}), e.recordException({
		message: n,
		name: i,
		stack: inspectError(t)
	});
}
function resolveThreshold() {
	let e = process.env.EVE_LOG_LEVEL?.toLowerCase();
	return e === `debug` || e === `info` || e === `warn` || e === `error` ? LEVEL_SEVERITY[e] : LEVEL_SEVERITY.info;
}
function write(e, t, n, r) {
	if (LEVEL_SEVERITY[e] < resolveThreshold()) return;
	let i = e === `error` ? console.error : e === `warn` ? console.warn : console.log, a = `[eve:${t}] ${n}`;
	if (r === void 0) {
		i(a);
		return;
	}
	i(a, renderFields(r));
}
function renderFields(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) if (r !== void 0) {
		if (r instanceof Error) {
			t[n] = formatError(r);
			continue;
		}
		t[n] = r;
	}
	return t;
}
function recordOnActiveSpan(e, t) {
	let n = $$4.getActiveSpan();
	if (n === void 0) return;
	let a = t?.error;
	if (a instanceof Error) {
		recordErrorOnSpan(n, a);
		return;
	}
	if (isFormattedError(a)) {
		n.setStatus({
			code: U$4.ERROR,
			message: a.message
		}), n.recordException({
			message: a.message,
			name: typeof a.name == `string` ? a.name : `Error`,
			stack: typeof a.detail == `string` ? a.detail : void 0
		});
		return;
	}
	n.addEvent(e, t ? renderFields(t) : void 0);
}
function isFormattedError(e) {
	return isObject(e) && typeof e.errorId == `string` && typeof e.message == `string`;
}
function inspectError(t) {
	return truncate(inspect(t, {
		breakLength: Infinity,
		compact: !1,
		depth: 10,
		maxStringLength: 8192
	}), 16384);
}
function truncate(e, t) {
	if (Buffer.byteLength(e, `utf8`) <= t) return e;
	let n = e.slice(0, t);
	for (; Buffer.byteLength(n, `utf8`) > t && n.length > 0;) n = n.slice(0, -1);
	return `${n}<…truncated>`;
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/compiled/_chunks/workflow/chunk-BHKSVoKr.js
var t$3 = Object.create, n$3 = Object.defineProperty, r$3 = Object.getOwnPropertyDescriptor, i$3 = Object.getOwnPropertyNames, a$1 = Object.getPrototypeOf, o$1 = Object.prototype.hasOwnProperty, s$1 = (e, t) => () => (e && (t = e(e = 0)), t), c$2 = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), l$2 = (e, t) => {
	let r = {};
	for (var i in e) n$3(r, i, {
		get: e[i],
		enumerable: !0
	});
	return t || n$3(r, Symbol.toStringTag, { value: `Module` }), r;
}, u$2 = (e, t, a, s) => {
	if (t && typeof t == `object` || typeof t == `function`) for (var c = i$3(t), l = 0, u = c.length, d; l < u; l++) d = c[l], !o$1.call(e, d) && d !== a && n$3(e, d, {
		get: ((e) => t[e]).bind(null, d),
		enumerable: !(s = r$3(t, d)) || s.enumerable
	});
	return e;
}, d$3 = (e, r, i) => (i = e == null ? {} : t$3(a$1(e)), u$2(r || !e || !e.__esModule ? n$3(i, `default`, {
	value: e,
	enumerable: !0
}) : i, e)), f$3 = createRequire(import.meta.url);
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/compiled/_chunks/workflow/core-CXJbIkCL.js
var t$2;
const n$2 = Object.freeze({ status: `aborted` });
function r$2(e, t, n) {
	function r(n, r) {
		if (n._zod || Object.defineProperty(n, "_zod", {
			value: {
				def: r,
				constr: o,
				traits: /* @__PURE__ */ new Set()
			},
			enumerable: !1
		}), n._zod.traits.has(e)) return;
		n._zod.traits.add(e), t(n, r);
		let i = o.prototype, a = Object.keys(i);
		for (let e = 0; e < a.length; e++) {
			let t = a[e];
			t in n || (n[t] = i[t].bind(n));
		}
	}
	let i = n?.Parent ?? Object;
	class a extends i {}
	Object.defineProperty(a, "name", { value: e });
	function o(e) {
		var t;
		let i = n?.Parent ? new a() : this;
		r(i, e), (t = i._zod).deferred ?? (t.deferred = []);
		for (let e of i._zod.deferred) e();
		return i;
	}
	return Object.defineProperty(o, "init", { value: r }), Object.defineProperty(o, Symbol.hasInstance, { value: (t) => n?.Parent && t instanceof n.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(o, "name", { value: e }), o;
}
const i$2 = Symbol(`zod_brand`);
var a = class extends Error {
	constructor() {
		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	}
}, o = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = `ZodEncodeError`;
	}
};
(t$2 = globalThis).__zod_globalConfig ?? (t$2.__zod_globalConfig = {});
const s = globalThis.__zod_globalConfig;
function c$1(e) {
	return e && Object.assign(s, e), s;
}
var l$1 = l$2({
	BIGINT_FORMAT_RANGES: () => Ce,
	Class: () => Ve,
	NUMBER_FORMAT_RANGES: () => Se,
	aborted: () => E$2,
	allowsEval: () => me,
	assert: () => ee$2,
	assertEqual: () => u$1,
	assertIs: () => f$2,
	assertNever: () => p$2,
	assertNotEqual: () => d$2,
	assignProp: () => v$2,
	base64ToUint8Array: () => Fe,
	base64urlToUint8Array: () => Le,
	cached: () => h$2,
	captureStackTrace: () => pe,
	cleanEnum: () => Pe,
	cleanRegex: () => re$1,
	clone: () => C$2,
	cloneDef: () => se$1,
	createTransparentProxy: () => be,
	defineLazy: () => _$2,
	esc: () => de$1,
	escapeRegex: () => S$2,
	explicitlyAborted: () => je$1,
	extend: () => Ee,
	finalizeIssue: () => k$2,
	floatSafeRemainder: () => ie$1,
	getElementAtPath: () => ce$1,
	getEnumValues: () => te$1,
	getLengthableOrigin: () => Ne$1,
	getParsedType: () => _e,
	getSizableOrigin: () => Me$1,
	hexToUint8Array: () => ze,
	isObject: () => b$1,
	isPlainObject: () => x$2,
	issue: () => j$2,
	joinValues: () => m$2,
	jsonStringifyReplacer: () => ne$1,
	merge: () => Oe,
	mergeDefs: () => y$2,
	normalizeParams: () => w$2,
	nullish: () => g$3,
	numKeys: () => ge,
	objectClone: () => oe$1,
	omit: () => Te,
	optionalKeys: () => xe,
	parsedType: () => A$1,
	partial: () => ke,
	pick: () => we,
	prefixIssues: () => D$2,
	primitiveTypes: () => ye,
	promiseAllObject: () => le$1,
	propertyKeyTypes: () => ve,
	randomString: () => ue$1,
	required: () => Ae$1,
	safeExtend: () => De,
	shallowClone: () => he,
	slugify: () => fe$1,
	stringifyPrimitive: () => T$2,
	uint8ArrayToBase64: () => Ie,
	uint8ArrayToBase64url: () => Re,
	uint8ArrayToHex: () => Be,
	unwrapMessage: () => O$2
});
function u$1(e) {
	return e;
}
function d$2(e) {
	return e;
}
function f$2(e) {}
function p$2(e) {
	throw Error(`Unexpected value in exhaustive check`);
}
function ee$2(e) {}
function te$1(e) {
	let t = Object.values(e).filter((e) => typeof e == `number`);
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function m$2(e, t = `|`) {
	return e.map((e) => T$2(e)).join(t);
}
function ne$1(e, t) {
	return typeof t == `bigint` ? t.toString() : t;
}
function h$2(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
		throw Error(`cached value already set`);
	} };
}
function g$3(e) {
	return e == null;
}
function re$1(e) {
	let t = +!!e.startsWith(`^`), n = e.endsWith(`$`) ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function ie$1(e, t) {
	let n = e / t, r = Math.round(n), i = 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
const ae$1 = Symbol(`evaluating`);
function _$2(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== ae$1) return r === void 0 && (r = ae$1, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function oe$1(e) {
	return Object.create(Object.getPrototypeOf(e), Object.getOwnPropertyDescriptors(e));
}
function v$2(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function y$2(...e) {
	let t = {};
	for (let n of e) Object.assign(t, Object.getOwnPropertyDescriptors(n));
	return Object.defineProperties({}, t);
}
function se$1(e) {
	return y$2(e._zod.def);
}
function ce$1(e, t) {
	return t ? t.reduce((e, t) => e?.[t], e) : e;
}
function le$1(e) {
	let t = Object.keys(e), n = t.map((t) => e[t]);
	return Promise.all(n).then((e) => {
		let n = {};
		for (let r = 0; r < t.length; r++) n[t[r]] = e[r];
		return n;
	});
}
function ue$1(e = 10) {
	let t = ``;
	for (let n = 0; n < e; n++) t += `abcdefghijklmnopqrstuvwxyz`[Math.floor(Math.random() * 26)];
	return t;
}
function de$1(e) {
	return JSON.stringify(e);
}
function fe$1(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, ``).replace(/[\s_-]+/g, `-`).replace(/^-+|-+$/g, ``);
}
const pe = `captureStackTrace` in Error ? Error.captureStackTrace : (...e) => {};
function b$1(e) {
	return typeof e == `object` && !!e && !Array.isArray(e);
}
const me = h$2(() => {
	if (s.jitless || typeof navigator < `u` && navigator?.userAgent?.includes(`Cloudflare`)) return !1;
	try {
		return Function(``), !0;
	} catch {
		return !1;
	}
});
function x$2(e) {
	if (b$1(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != `function`) return !0;
	let n = t.prototype;
	return !(b$1(n) === !1 || Object.prototype.hasOwnProperty.call(n, `isPrototypeOf`) === !1);
}
function he(e) {
	return x$2(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
function ge(e) {
	let t = 0;
	for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && t++;
	return t;
}
const _e = (e) => {
	let t = typeof e;
	switch (t) {
		case `undefined`: return `undefined`;
		case `string`: return `string`;
		case `number`: return Number.isNaN(e) ? `nan` : `number`;
		case `boolean`: return `boolean`;
		case `function`: return `function`;
		case `bigint`: return `bigint`;
		case `symbol`: return `symbol`;
		case `object`: return Array.isArray(e) ? `array` : e === null ? `null` : e.then && typeof e.then == `function` && e.catch && typeof e.catch == `function` ? `promise` : typeof Map < `u` && e instanceof Map ? `map` : typeof Set < `u` && e instanceof Set ? `set` : typeof Date < `u` && e instanceof Date ? `date` : typeof File < `u` && e instanceof File ? `file` : `object`;
		default: throw Error(`Unknown data type: ${t}`);
	}
}, ve = /* @__PURE__ */ new Set([
	`string`,
	`number`,
	`symbol`
]), ye = /* @__PURE__ */ new Set([
	`string`,
	`number`,
	`bigint`,
	`boolean`,
	`symbol`,
	`undefined`
]);
function S$2(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
function C$2(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function w$2(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == `string`) return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == `string` ? {
		...t,
		error: () => t.error
	} : t;
}
function be(e) {
	let t;
	return new Proxy({}, {
		get(n, r, i) {
			return t ??= e(), Reflect.get(t, r, i);
		},
		set(n, r, i, a) {
			return t ??= e(), Reflect.set(t, r, i, a);
		},
		has(n, r) {
			return t ??= e(), Reflect.has(t, r);
		},
		deleteProperty(n, r) {
			return t ??= e(), Reflect.deleteProperty(t, r);
		},
		ownKeys(n) {
			return t ??= e(), Reflect.ownKeys(t);
		},
		getOwnPropertyDescriptor(n, r) {
			return t ??= e(), Reflect.getOwnPropertyDescriptor(t, r);
		},
		defineProperty(n, r, i) {
			return t ??= e(), Reflect.defineProperty(t, r, i);
		}
	});
}
function T$2(e) {
	return typeof e == `bigint` ? e.toString() + `n` : typeof e == `string` ? `"${e}"` : `${e}`;
}
function xe(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === `optional` && e[t]._zod.optout === `optional`);
}
const Se = {
	safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
}, Ce = {
	int64: [BigInt(`-9223372036854775808`), BigInt(`9223372036854775807`)],
	uint64: [BigInt(0), BigInt(`18446744073709551615`)]
};
function we(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(`.pick() cannot be used on object schemas containing refinements`);
	return C$2(e, y$2(e._zod.def, {
		get shape() {
			let e = {};
			for (let r in t) {
				if (!(r in n.shape)) throw Error(`Unrecognized key: "${r}"`);
				t[r] && (e[r] = n.shape[r]);
			}
			return v$2(this, `shape`, e), e;
		},
		checks: []
	}));
}
function Te(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(`.omit() cannot be used on object schemas containing refinements`);
	return C$2(e, y$2(e._zod.def, {
		get shape() {
			let r = { ...e._zod.def.shape };
			for (let e in t) {
				if (!(e in n.shape)) throw Error(`Unrecognized key: "${e}"`);
				t[e] && delete r[e];
			}
			return v$2(this, `shape`, r), r;
		},
		checks: []
	}));
}
function Ee(e, t) {
	if (!x$2(t)) throw Error(`Invalid input to extend: expected a plain object`);
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = e._zod.def.shape;
		for (let e in t) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return C$2(e, y$2(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return v$2(this, `shape`, n), n;
	} }));
}
function De(e, t) {
	if (!x$2(t)) throw Error(`Invalid input to safeExtend: expected a plain object`);
	return C$2(e, y$2(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return v$2(this, `shape`, n), n;
	} }));
}
function Oe(e, t) {
	if (e._zod.def.checks?.length) throw Error(`.merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.`);
	return C$2(e, y$2(e._zod.def, {
		get shape() {
			let n = {
				...e._zod.def.shape,
				...t._zod.def.shape
			};
			return v$2(this, `shape`, n), n;
		},
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function ke(e, t, n) {
	let r = t._zod.def.checks;
	if (r && r.length > 0) throw Error(`.partial() cannot be used on object schemas containing refinements`);
	return C$2(t, y$2(t._zod.def, {
		get shape() {
			let r = t._zod.def.shape, i = { ...r };
			if (n) for (let t in n) {
				if (!(t in r)) throw Error(`Unrecognized key: "${t}"`);
				n[t] && (i[t] = e ? new e({
					type: `optional`,
					innerType: r[t]
				}) : r[t]);
			}
			else for (let t in r) i[t] = e ? new e({
				type: `optional`,
				innerType: r[t]
			}) : r[t];
			return v$2(this, `shape`, i), i;
		},
		checks: []
	}));
}
function Ae$1(e, t, n) {
	return C$2(t, y$2(t._zod.def, { get shape() {
		let r = t._zod.def.shape, i = { ...r };
		if (n) for (let t in n) {
			if (!(t in i)) throw Error(`Unrecognized key: "${t}"`);
			n[t] && (i[t] = new e({
				type: `nonoptional`,
				innerType: r[t]
			}));
		}
		else for (let t in r) i[t] = new e({
			type: `nonoptional`,
			innerType: r[t]
		});
		return v$2(this, `shape`, i), i;
	} }));
}
function E$2(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function je$1(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function D$2(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function O$2(e) {
	return typeof e == `string` ? e : e?.message;
}
function k$2(e, t, n) {
	let r = e.message ? e.message : O$2(e.inst?._zod.def?.error?.(e)) ?? O$2(t?.error?.(e)) ?? O$2(n.customError?.(e)) ?? O$2(n.localeError?.(e)) ?? `Invalid input`, { inst: i, continue: a, input: o, ...s } = e;
	return s.path ??= [], s.message = r, t?.reportInput && (s.input = o), s;
}
function Me$1(e) {
	return e instanceof Set ? `set` : e instanceof Map ? `map` : e instanceof File ? `file` : `unknown`;
}
function Ne$1(e) {
	return Array.isArray(e) ? `array` : typeof e == `string` ? `string` : `unknown`;
}
function A$1(e) {
	let t = typeof e;
	switch (t) {
		case `number`: return Number.isNaN(e) ? `nan` : `number`;
		case `object`: {
			if (e === null) return `null`;
			if (Array.isArray(e)) return `array`;
			let t = e;
			if (t && Object.getPrototypeOf(t) !== Object.prototype && `constructor` in t && t.constructor) return t.constructor.name;
		}
	}
	return t;
}
function j$2(...e) {
	let [t, n, r] = e;
	return typeof t == `string` ? {
		message: t,
		code: `custom`,
		input: n,
		inst: r
	} : { ...t };
}
function Pe(e) {
	return Object.entries(e).filter(([e, t]) => Number.isNaN(Number.parseInt(e, 10))).map((e) => e[1]);
}
function Fe(e) {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	return n;
}
function Ie(e) {
	let t = ``;
	for (let n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
	return btoa(t);
}
function Le(e) {
	let t = e.replace(/-/g, `+`).replace(/_/g, `/`);
	return Fe(t + `=`.repeat((4 - t.length % 4) % 4));
}
function Re(e) {
	return Ie(e).replace(/\+/g, `-`).replace(/\//g, `_`).replace(/=/g, ``);
}
function ze(e) {
	let t = e.replace(/^0x/, ``);
	if (t.length % 2 != 0) throw Error(`Invalid hex string length`);
	let n = new Uint8Array(t.length / 2);
	for (let e = 0; e < t.length; e += 2) n[e / 2] = Number.parseInt(t.slice(e, e + 2), 16);
	return n;
}
function Be(e) {
	return Array.from(e).map((e) => e.toString(16).padStart(2, `0`)).join(``);
}
var Ve = class {
	constructor(...e) {}
};
const He = (e, t) => {
	e.name = `$ZodError`, Object.defineProperty(e, "_zod", {
		value: e._zod,
		enumerable: !1
	}), Object.defineProperty(e, "issues", {
		value: t,
		enumerable: !1
	}), e.message = JSON.stringify(t, ne$1, 2), Object.defineProperty(e, "toString", {
		value: () => e.message,
		enumerable: !1
	});
}, Ue = r$2(`$ZodError`, He), M$1 = r$2(`$ZodError`, He, { Parent: Error });
function We(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? (n[i.path[0]] = n[i.path[0]] || [], n[i.path[0]].push(t(i))) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function Ge(e, t = (e) => e.message) {
	let n = { _errors: [] }, r = (e, i = []) => {
		for (let a of e.issues) if (a.code === `invalid_union` && a.errors.length) a.errors.map((e) => r({ issues: e }, [...i, ...a.path]));
		else if (a.code === `invalid_key`) r({ issues: a.issues }, [...i, ...a.path]);
		else if (a.code === `invalid_element`) r({ issues: a.issues }, [...i, ...a.path]);
		else {
			let e = [...i, ...a.path];
			if (e.length === 0) n._errors.push(t(a));
			else {
				let r = n, i = 0;
				for (; i < e.length;) {
					let n = e[i];
					i === e.length - 1 ? (r[n] = r[n] || { _errors: [] }, r[n]._errors.push(t(a))) : r[n] = r[n] || { _errors: [] }, r = r[n], i++;
				}
			}
		}
	};
	return r(e), n;
}
function Ke(e, t = (e) => e.message) {
	let n = { errors: [] }, r = (e, i = []) => {
		var a, o;
		for (let s of e.issues) if (s.code === `invalid_union` && s.errors.length) s.errors.map((e) => r({ issues: e }, [...i, ...s.path]));
		else if (s.code === `invalid_key`) r({ issues: s.issues }, [...i, ...s.path]);
		else if (s.code === `invalid_element`) r({ issues: s.issues }, [...i, ...s.path]);
		else {
			let e = [...i, ...s.path];
			if (e.length === 0) {
				n.errors.push(t(s));
				continue;
			}
			let r = n, c = 0;
			for (; c < e.length;) {
				let n = e[c], i = c === e.length - 1;
				typeof n == `string` ? (r.properties ??= {}, (a = r.properties)[n] ?? (a[n] = { errors: [] }), r = r.properties[n]) : (r.items ??= [], (o = r.items)[n] ?? (o[n] = { errors: [] }), r = r.items[n]), i && r.errors.push(t(s)), c++;
			}
		}
	};
	return r(e), n;
}
function qe(e) {
	let t = [], n = e.map((e) => typeof e == `object` ? e.key : e);
	for (let e of n) typeof e == `number` ? t.push(`[${e}]`) : typeof e == `symbol` ? t.push(`[${JSON.stringify(String(e))}]`) : /[^\w$]/.test(e) ? t.push(`[${JSON.stringify(e)}]`) : (t.length && t.push(`.`), t.push(e));
	return t.join(``);
}
function Je$1(e) {
	let t = [], n = [...e.issues].sort((e, t) => (e.path ?? []).length - (t.path ?? []).length);
	for (let e of n) t.push(`✖ ${e.message}`), e.path?.length && t.push(`  → at ${qe(e.path)}`);
	return t.join(`
`);
}
const N$1 = (e) => (t, n, r, i) => {
	let o = r ? {
		...r,
		async: !1
	} : { async: !1 }, s = t._zod.run({
		value: n,
		issues: []
	}, o);
	if (s instanceof Promise) throw new a();
	if (s.issues.length) {
		let t = new ((i?.Err) ?? e)(s.issues.map((e) => k$2(e, o, c$1())));
		throw pe(t, i?.callee), t;
	}
	return s.value;
}, Ye$1 = N$1(M$1), P$2 = (e) => async (t, n, r, i) => {
	let a = r ? {
		...r,
		async: !0
	} : { async: !0 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise && (o = await o), o.issues.length) {
		let t = new ((i?.Err) ?? e)(o.issues.map((e) => k$2(e, a, c$1())));
		throw pe(t, i?.callee), t;
	}
	return o.value;
}, Xe = P$2(M$1), F$2 = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, o = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (o instanceof Promise) throw new a();
	return o.issues.length ? {
		success: !1,
		error: new (e ?? Ue)(o.issues.map((e) => k$2(e, i, c$1())))
	} : {
		success: !0,
		data: o.value
	};
}, Ze$1 = F$2(M$1), I$2 = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		async: !0
	} : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? {
		success: !1,
		error: new e(a.issues.map((e) => k$2(e, i, c$1())))
	} : {
		success: !0,
		data: a.value
	};
}, Qe = I$2(M$1), $e = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: `backward`
	} : { direction: `backward` };
	return N$1(e)(t, n, i);
}, et = $e(M$1), tt$1 = (e) => (t, n, r) => N$1(e)(t, n, r), nt$1 = tt$1(M$1), rt$1 = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: `backward`
	} : { direction: `backward` };
	return P$2(e)(t, n, i);
}, it = rt$1(M$1), at = (e) => async (t, n, r) => P$2(e)(t, n, r), ot = at(M$1), st = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		direction: `backward`
	} : { direction: `backward` };
	return F$2(e)(t, n, i);
}, ct = st(M$1), lt = (e) => (t, n, r) => F$2(e)(t, n, r), ut = lt(M$1), dt = (e) => async (t, n, r) => {
	let i = r ? {
		...r,
		direction: `backward`
	} : { direction: `backward` };
	return I$2(e)(t, n, i);
}, ft = dt(M$1), pt = (e) => async (t, n, r) => I$2(e)(t, n, r), mt = pt(M$1);
var ht = l$2({
	base64: () => Bt,
	base64url: () => Vt,
	bigint: () => Qt$1,
	boolean: () => tn$1,
	browserEmail: () => Nt,
	cidrv4: () => Rt$1,
	cidrv6: () => zt$1,
	cuid: () => gt,
	cuid2: () => _t,
	date: () => qt,
	datetime: () => Xt$1,
	domain: () => Ut,
	duration: () => St,
	e164: () => Gt,
	email: () => Ot,
	emoji: () => Pt,
	extendedDuration: () => Ct,
	guid: () => wt,
	hex: () => sn,
	hostname: () => Ht,
	html5Email: () => kt,
	httpProtocol: () => Wt,
	idnEmail: () => Mt,
	integer: () => $t$1,
	ipv4: () => Ft,
	ipv6: () => It$1,
	ksuid: () => bt,
	lowercase: () => an,
	mac: () => Lt$1,
	md5_base64: () => ln,
	md5_base64url: () => un,
	md5_hex: () => cn,
	nanoid: () => xt,
	null: () => nn,
	number: () => en$1,
	rfc5322Email: () => At,
	sha1_base64: () => fn,
	sha1_base64url: () => pn,
	sha1_hex: () => dn,
	sha256_base64: () => hn,
	sha256_base64url: () => gn$1,
	sha256_hex: () => mn,
	sha384_base64: () => vn$1,
	sha384_base64url: () => yn$1,
	sha384_hex: () => _n$1,
	sha512_base64: () => xn$1,
	sha512_base64url: () => Sn$1,
	sha512_hex: () => bn$1,
	string: () => Zt,
	time: () => Yt$1,
	ulid: () => vt,
	undefined: () => rn$1,
	unicodeEmail: () => jt,
	uppercase: () => on,
	uuid: () => L$2,
	uuid4: () => Tt,
	uuid6: () => Et$1,
	uuid7: () => Dt,
	xid: () => yt
});
const gt = /^[cC][0-9a-z]{6,}$/, _t = /^[0-9a-z]+$/, vt = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, yt = /^[0-9a-vA-V]{20}$/, bt = /^[A-Za-z0-9]{27}$/, xt = /^[a-zA-Z0-9_-]{21}$/, St = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Ct = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, wt = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, L$2 = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Tt = L$2(4), Et$1 = L$2(6), Dt = L$2(7), Ot = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, kt = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, At = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, jt = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u, Mt = jt, Nt = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
function Pt() {
	return RegExp(`^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`, `u`);
}
const Ft = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, It$1 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Lt$1 = (e) => {
	let t = S$2(e ?? `:`);
	return RegExp(`^(?:[0-9A-F]{2}${t}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${t}){5}[0-9a-f]{2}$`);
}, Rt$1 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, zt$1 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Bt = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, Vt = /^[A-Za-z0-9_-]*$/, Ht = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/, Ut = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/, Wt = /^https?$/, Gt = /^\+[1-9]\d{6,14}$/, Kt = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`, qt = RegExp(`^${Kt}$`);
function Jt(e) {
	let t = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
	return typeof e.precision == `number` ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Yt$1(e) {
	return RegExp(`^${Jt(e)}$`);
}
function Xt$1(e) {
	let t = Jt({ precision: e.precision }), n = [`Z`];
	e.local && n.push(``), e.offset && n.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
	let r = `${t}(?:${n.join(`|`)})`;
	return RegExp(`^${Kt}T(?:${r})$`);
}
const Zt = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ``}}` : `[\\s\\S]*`;
	return RegExp(`^${t}$`);
}, Qt$1 = /^-?\d+n?$/, $t$1 = /^-?\d+$/, en$1 = /^-?\d+(?:\.\d+)?$/, tn$1 = /^(?:true|false)$/i, nn = /^null$/i, rn$1 = /^undefined$/i, an = /^[^A-Z]*$/, on = /^[^a-z]*$/, sn = /^[0-9a-fA-F]*$/;
function R$2(e, t) {
	return RegExp(`^[A-Za-z0-9+/]{${e}}${t}$`);
}
function z$2(e) {
	return RegExp(`^[A-Za-z0-9_-]{${e}}$`);
}
const cn = /^[0-9a-fA-F]{32}$/, ln = R$2(22, `==`), un = z$2(22), dn = /^[0-9a-fA-F]{40}$/, fn = R$2(27, `=`), pn = z$2(27), mn = /^[0-9a-fA-F]{64}$/, hn = R$2(43, `=`), gn$1 = z$2(43), _n$1 = /^[0-9a-fA-F]{96}$/, vn$1 = R$2(64, ``), yn$1 = z$2(64), bn$1 = /^[0-9a-fA-F]{128}$/, xn$1 = R$2(86, `==`), Sn$1 = z$2(86), B$2 = r$2(`$ZodCheck`, (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Cn$1 = {
	number: `number`,
	bigint: `bigint`,
	object: `date`
}, wn$1 = r$2(`$ZodCheckLessThan`, (e, t) => {
	B$2.init(e, t);
	let n = Cn$1[typeof t.value];
	e._zod.onattach.push((e) => {
		let n = e._zod.bag, r = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? Infinity;
		t.value < r && (t.inclusive ? n.maximum = t.value : n.exclusiveMaximum = t.value);
	}), e._zod.check = (r) => {
		(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
			origin: n,
			code: `too_big`,
			maximum: typeof t.value == `object` ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), Tn$1 = r$2(`$ZodCheckGreaterThan`, (e, t) => {
	B$2.init(e, t);
	let n = Cn$1[typeof t.value];
	e._zod.onattach.push((e) => {
		let n = e._zod.bag, r = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? -Infinity;
		t.value > r && (t.inclusive ? n.minimum = t.value : n.exclusiveMinimum = t.value);
	}), e._zod.check = (r) => {
		(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
			origin: n,
			code: `too_small`,
			minimum: typeof t.value == `object` ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), En$1 = r$2(`$ZodCheckMultipleOf`, (e, t) => {
	B$2.init(e, t), e._zod.onattach.push((e) => {
		var n;
		(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
	}), e._zod.check = (n) => {
		if (typeof n.value != typeof t.value) throw Error(`Cannot mix number and bigint in multiple_of check.`);
		(typeof n.value == `bigint` ? n.value % t.value === BigInt(0) : ie$1(n.value, t.value) === 0) || n.issues.push({
			origin: typeof n.value,
			code: `not_multiple_of`,
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Dn$1 = r$2(`$ZodCheckNumberFormat`, (e, t) => {
	B$2.init(e, t), t.format = t.format || `float64`;
	let n = t.format?.includes(`int`), r = n ? `int` : `number`, [i, a] = Se[t.format];
	e._zod.onattach.push((e) => {
		let r = e._zod.bag;
		r.format = t.format, r.minimum = i, r.maximum = a, n && (r.pattern = $t$1);
	}), e._zod.check = (o) => {
		let s = o.value;
		if (n) {
			if (!Number.isInteger(s)) {
				o.issues.push({
					expected: r,
					format: t.format,
					code: `invalid_type`,
					continue: !1,
					input: s,
					inst: e
				});
				return;
			}
			if (!Number.isSafeInteger(s)) {
				s > 0 ? o.issues.push({
					input: s,
					code: `too_big`,
					maximum: 2 ** 53 - 1,
					note: `Integers must be within the safe integer range.`,
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				}) : o.issues.push({
					input: s,
					code: `too_small`,
					minimum: -(2 ** 53 - 1),
					note: `Integers must be within the safe integer range.`,
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				});
				return;
			}
		}
		s < i && o.issues.push({
			origin: `number`,
			input: s,
			code: `too_small`,
			minimum: i,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		}), s > a && o.issues.push({
			origin: `number`,
			input: s,
			code: `too_big`,
			maximum: a,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		});
	};
}), On$1 = r$2(`$ZodCheckBigIntFormat`, (e, t) => {
	B$2.init(e, t);
	let [n, r] = Ce[t.format];
	e._zod.onattach.push((e) => {
		let i = e._zod.bag;
		i.format = t.format, i.minimum = n, i.maximum = r;
	}), e._zod.check = (i) => {
		let a = i.value;
		a < n && i.issues.push({
			origin: `bigint`,
			input: a,
			code: `too_small`,
			minimum: n,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		}), a > r && i.issues.push({
			origin: `bigint`,
			input: a,
			code: `too_big`,
			maximum: r,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		});
	};
}), kn$1 = r$2(`$ZodCheckMaxSize`, (e, t) => {
	var n;
	B$2.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !g$3(t) && t.size !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.maximum ?? Infinity;
		t.maximum < n && (e._zod.bag.maximum = t.maximum);
	}), e._zod.check = (n) => {
		let r = n.value;
		r.size <= t.maximum || n.issues.push({
			origin: Me$1(r),
			code: `too_big`,
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), An = r$2(`$ZodCheckMinSize`, (e, t) => {
	var n;
	B$2.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !g$3(t) && t.size !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.minimum ?? -Infinity;
		t.minimum > n && (e._zod.bag.minimum = t.minimum);
	}), e._zod.check = (n) => {
		let r = n.value;
		r.size >= t.minimum || n.issues.push({
			origin: Me$1(r),
			code: `too_small`,
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), jn = r$2(`$ZodCheckSizeEquals`, (e, t) => {
	var n;
	B$2.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !g$3(t) && t.size !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.minimum = t.size, n.maximum = t.size, n.size = t.size;
	}), e._zod.check = (n) => {
		let r = n.value, i = r.size;
		if (i === t.size) return;
		let a = i > t.size;
		n.issues.push({
			origin: Me$1(r),
			...a ? {
				code: `too_big`,
				maximum: t.size
			} : {
				code: `too_small`,
				minimum: t.size
			},
			inclusive: !0,
			exact: !0,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Mn$1 = r$2(`$ZodCheckMaxLength`, (e, t) => {
	var n;
	B$2.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !g$3(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.maximum ?? Infinity;
		t.maximum < n && (e._zod.bag.maximum = t.maximum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length <= t.maximum) return;
		let i = Ne$1(r);
		n.issues.push({
			origin: i,
			code: `too_big`,
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), Nn = r$2(`$ZodCheckMinLength`, (e, t) => {
	var n;
	B$2.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !g$3(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.minimum ?? -Infinity;
		t.minimum > n && (e._zod.bag.minimum = t.minimum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length >= t.minimum) return;
		let i = Ne$1(r);
		n.issues.push({
			origin: i,
			code: `too_small`,
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), Pn = r$2(`$ZodCheckLengthEquals`, (e, t) => {
	var n;
	B$2.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !g$3(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.minimum = t.length, n.maximum = t.length, n.length = t.length;
	}), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if (i === t.length) return;
		let a = Ne$1(r), o = i > t.length;
		n.issues.push({
			origin: a,
			...o ? {
				code: `too_big`,
				maximum: t.length
			} : {
				code: `too_small`,
				minimum: t.length
			},
			inclusive: !0,
			exact: !0,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), V$2 = r$2(`$ZodCheckStringFormat`, (e, t) => {
	var n, r;
	B$2.init(e, t), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.format = t.format, t.pattern && (n.patterns ??= /* @__PURE__ */ new Set(), n.patterns.add(t.pattern));
	}), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: `string`,
			code: `invalid_format`,
			format: t.format,
			input: n.value,
			...t.pattern ? { pattern: t.pattern.toString() } : {},
			inst: e,
			continue: !t.abort
		});
	}) : (r = e._zod).check ?? (r.check = () => {});
}), Fn = r$2(`$ZodCheckRegex`, (e, t) => {
	V$2.init(e, t), e._zod.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: `string`,
			code: `invalid_format`,
			format: `regex`,
			input: n.value,
			pattern: t.pattern.toString(),
			inst: e,
			continue: !t.abort
		});
	};
}), In = r$2(`$ZodCheckLowerCase`, (e, t) => {
	t.pattern ??= an, V$2.init(e, t);
}), Ln = r$2(`$ZodCheckUpperCase`, (e, t) => {
	t.pattern ??= on, V$2.init(e, t);
}), Rn = r$2(`$ZodCheckIncludes`, (e, t) => {
	B$2.init(e, t);
	let n = S$2(t.includes), r = new RegExp(typeof t.position == `number` ? `^.{${t.position}}${n}` : n);
	t.pattern = r, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(r);
	}), e._zod.check = (n) => {
		n.value.includes(t.includes, t.position) || n.issues.push({
			origin: `string`,
			code: `invalid_format`,
			format: `includes`,
			includes: t.includes,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), zn = r$2(`$ZodCheckStartsWith`, (e, t) => {
	B$2.init(e, t);
	let n = RegExp(`^${S$2(t.prefix)}.*`);
	t.pattern ??= n, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
	}), e._zod.check = (n) => {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: `string`,
			code: `invalid_format`,
			format: `starts_with`,
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Bn = r$2(`$ZodCheckEndsWith`, (e, t) => {
	B$2.init(e, t);
	let n = RegExp(`.*${S$2(t.suffix)}$`);
	t.pattern ??= n, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
	}), e._zod.check = (n) => {
		n.value.endsWith(t.suffix) || n.issues.push({
			origin: `string`,
			code: `invalid_format`,
			format: `ends_with`,
			suffix: t.suffix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function Vn(e, t, n) {
	e.issues.length && t.issues.push(...D$2(n, e.issues));
}
const Hn = r$2(`$ZodCheckProperty`, (e, t) => {
	B$2.init(e, t), e._zod.check = (e) => {
		let n = t.schema._zod.run({
			value: e.value[t.property],
			issues: []
		}, {});
		if (n instanceof Promise) return n.then((n) => Vn(n, e, t.property));
		Vn(n, e, t.property);
	};
}), Un = r$2(`$ZodCheckMimeType`, (e, t) => {
	B$2.init(e, t);
	let n = new Set(t.mime);
	e._zod.onattach.push((e) => {
		e._zod.bag.mime = t.mime;
	}), e._zod.check = (r) => {
		n.has(r.value.type) || r.issues.push({
			code: `invalid_value`,
			values: t.mime,
			input: r.value.type,
			inst: e,
			continue: !t.abort
		});
	};
}), Wn = r$2(`$ZodCheckOverwrite`, (e, t) => {
	B$2.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
});
var Gn = class {
	constructor(e = []) {
		this.content = [], this.indent = 0, this && (this.args = e);
	}
	indented(e) {
		this.indent += 1, e(this), --this.indent;
	}
	write(e) {
		if (typeof e == `function`) {
			e(this, { execution: `sync` }), e(this, { execution: `async` });
			return;
		}
		let t = e.split(`
`).filter((e) => e), n = Math.min(...t.map((e) => e.length - e.trimStart().length)), r = t.map((e) => e.slice(n)).map((e) => ` `.repeat(this.indent * 2) + e);
		for (let e of r) this.content.push(e);
	}
	compile() {
		let e = Function, t = this?.args, n = [...(this?.content ?? [``]).map((e) => `  ${e}`)];
		return new e(...t, n.join(`
`));
	}
};
const Kn = {
	major: 4,
	minor: 4,
	patch: 3
}, H$2 = r$2(`$ZodType`, (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Kn;
	let r = [...e._zod.def.checks ?? []];
	e._zod.traits.has(`$ZodCheck`) && r.unshift(e);
	for (let t of r) for (let n of t._zod.onattach) n(e);
	if (r.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (e, t, n) => {
			let r = E$2(e), i;
			for (let o of t) {
				if (o._zod.def.when) {
					if (je$1(e) || !o._zod.def.when(e)) continue;
				} else if (r) continue;
				let t = e.issues.length, s = o._zod.check(e);
				if (s instanceof Promise && n?.async === !1) throw new a();
				if (i || s instanceof Promise) i = (i ?? Promise.resolve()).then(async () => {
					await s, e.issues.length !== t && (r ||= E$2(e, t));
				});
				else {
					if (e.issues.length === t) continue;
					r ||= E$2(e, t);
				}
			}
			return i ? i.then(() => e) : e;
		}, n = (n, i, o) => {
			if (E$2(n)) return n.aborted = !0, n;
			let s = t(i, r, o);
			if (s instanceof Promise) {
				if (o.async === !1) throw new a();
				return s.then((t) => e._zod.parse(t, o));
			}
			return e._zod.parse(s, o);
		};
		e._zod.run = (i, o) => {
			if (o.skipChecks) return e._zod.parse(i, o);
			if (o.direction === `backward`) {
				let t = e._zod.parse({
					value: i.value,
					issues: []
				}, {
					...o,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => n(e, i, o)) : n(t, i, o);
			}
			let s = e._zod.parse(i, o);
			if (s instanceof Promise) {
				if (o.async === !1) throw new a();
				return s.then((e) => t(e, r, o));
			}
			return t(s, r, o);
		};
	}
	_$2(e, `~standard`, () => ({
		validate: (t) => {
			try {
				let n = Ze$1(e, t);
				return n.success ? { value: n.data } : { issues: n.error?.issues };
			} catch {
				return Qe(e, t).then((e) => e.success ? { value: e.data } : { issues: e.error?.issues });
			}
		},
		vendor: `zod`,
		version: 1
	}));
}), U$2 = r$2(`$ZodString`, (e, t) => {
	H$2.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? Zt(e._zod.bag), e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == `string` || n.issues.push({
			expected: `string`,
			code: `invalid_type`,
			input: n.value,
			inst: e
		}), n;
	};
}), W$1 = r$2(`$ZodStringFormat`, (e, t) => {
	V$2.init(e, t), U$2.init(e, t);
}), qn = r$2(`$ZodGUID`, (e, t) => {
	t.pattern ??= wt, W$1.init(e, t);
}), Jn = r$2(`$ZodUUID`, (e, t) => {
	if (t.version) {
		let e = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[t.version];
		if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
		t.pattern ??= L$2(e);
	} else t.pattern ??= L$2();
	W$1.init(e, t);
}), Yn = r$2(`$ZodEmail`, (e, t) => {
	t.pattern ??= Ot, W$1.init(e, t);
}), Xn = r$2(`$ZodURL`, (e, t) => {
	W$1.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim();
			if (!t.normalize && t.protocol?.source === Wt.source && !/^https?:\/\//i.test(r)) {
				n.issues.push({
					code: `invalid_format`,
					format: `url`,
					note: `Invalid URL format`,
					input: n.value,
					inst: e,
					continue: !t.abort
				});
				return;
			}
			let i = new URL(r);
			t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(i.hostname) || n.issues.push({
				code: `invalid_format`,
				format: `url`,
				note: `Invalid hostname`,
				pattern: t.hostname.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(i.protocol.endsWith(`:`) ? i.protocol.slice(0, -1) : i.protocol) || n.issues.push({
				code: `invalid_format`,
				format: `url`,
				note: `Invalid protocol`,
				pattern: t.protocol.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.normalize ? n.value = i.href : n.value = r;
			return;
		} catch {
			n.issues.push({
				code: `invalid_format`,
				format: `url`,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), Zn = r$2(`$ZodEmoji`, (e, t) => {
	t.pattern ??= Pt(), W$1.init(e, t);
}), Qn = r$2(`$ZodNanoID`, (e, t) => {
	t.pattern ??= xt, W$1.init(e, t);
}), $n = r$2(`$ZodCUID`, (e, t) => {
	t.pattern ??= gt, W$1.init(e, t);
}), er = r$2(`$ZodCUID2`, (e, t) => {
	t.pattern ??= _t, W$1.init(e, t);
}), tr = r$2(`$ZodULID`, (e, t) => {
	t.pattern ??= vt, W$1.init(e, t);
}), nr = r$2(`$ZodXID`, (e, t) => {
	t.pattern ??= yt, W$1.init(e, t);
}), rr = r$2(`$ZodKSUID`, (e, t) => {
	t.pattern ??= bt, W$1.init(e, t);
}), ir = r$2(`$ZodISODateTime`, (e, t) => {
	t.pattern ??= Xt$1(t), W$1.init(e, t);
}), ar = r$2(`$ZodISODate`, (e, t) => {
	t.pattern ??= qt, W$1.init(e, t);
}), or = r$2(`$ZodISOTime`, (e, t) => {
	t.pattern ??= Yt$1(t), W$1.init(e, t);
}), sr = r$2(`$ZodISODuration`, (e, t) => {
	t.pattern ??= St, W$1.init(e, t);
}), cr = r$2(`$ZodIPv4`, (e, t) => {
	t.pattern ??= Ft, W$1.init(e, t), e._zod.bag.format = `ipv4`;
}), lr = r$2(`$ZodIPv6`, (e, t) => {
	t.pattern ??= It$1, W$1.init(e, t), e._zod.bag.format = `ipv6`, e._zod.check = (n) => {
		try {
			new URL(`http://[${n.value}]`);
		} catch {
			n.issues.push({
				code: `invalid_format`,
				format: `ipv6`,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), ur = r$2(`$ZodMAC`, (e, t) => {
	t.pattern ??= Lt$1(t.delimiter), W$1.init(e, t), e._zod.bag.format = `mac`;
}), dr = r$2(`$ZodCIDRv4`, (e, t) => {
	t.pattern ??= Rt$1, W$1.init(e, t);
}), fr = r$2(`$ZodCIDRv6`, (e, t) => {
	t.pattern ??= zt$1, W$1.init(e, t), e._zod.check = (n) => {
		let r = n.value.split(`/`);
		try {
			if (r.length !== 2) throw Error();
			let [e, t] = r;
			if (!t) throw Error();
			let n = Number(t);
			if (`${n}` !== t || n < 0 || n > 128) throw Error();
			new URL(`http://[${e}]`);
		} catch {
			n.issues.push({
				code: `invalid_format`,
				format: `cidrv6`,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
});
function pr(e) {
	if (e === ``) return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
const mr = r$2(`$ZodBase64`, (e, t) => {
	t.pattern ??= Bt, W$1.init(e, t), e._zod.bag.contentEncoding = `base64`, e._zod.check = (n) => {
		pr(n.value) || n.issues.push({
			code: `invalid_format`,
			format: `base64`,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function hr(e) {
	if (!Vt.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === `-` ? `+` : `/`);
	return pr(t.padEnd(Math.ceil(t.length / 4) * 4, `=`));
}
const gr = r$2(`$ZodBase64URL`, (e, t) => {
	t.pattern ??= Vt, W$1.init(e, t), e._zod.bag.contentEncoding = `base64url`, e._zod.check = (n) => {
		hr(n.value) || n.issues.push({
			code: `invalid_format`,
			format: `base64url`,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), _r = r$2(`$ZodE164`, (e, t) => {
	t.pattern ??= Gt, W$1.init(e, t);
});
function vr(e, t = null) {
	try {
		let n = e.split(`.`);
		if (n.length !== 3) return !1;
		let [r] = n;
		if (!r) return !1;
		let i = JSON.parse(atob(r));
		return !(`typ` in i && i?.typ !== `JWT` || !i.alg || t && (!(`alg` in i) || i.alg !== t));
	} catch {
		return !1;
	}
}
const yr = r$2(`$ZodJWT`, (e, t) => {
	W$1.init(e, t), e._zod.check = (n) => {
		vr(n.value, t.alg) || n.issues.push({
			code: `invalid_format`,
			format: `jwt`,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), br = r$2(`$ZodCustomStringFormat`, (e, t) => {
	W$1.init(e, t), e._zod.check = (n) => {
		t.fn(n.value) || n.issues.push({
			code: `invalid_format`,
			format: t.format,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), xr = r$2(`$ZodNumber`, (e, t) => {
	H$2.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? en$1, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch {}
		let i = n.value;
		if (typeof i == `number` && !Number.isNaN(i) && Number.isFinite(i)) return n;
		let a = typeof i == `number` ? Number.isNaN(i) ? `NaN` : Number.isFinite(i) ? void 0 : `Infinity` : void 0;
		return n.issues.push({
			expected: `number`,
			code: `invalid_type`,
			input: i,
			inst: e,
			...a ? { received: a } : {}
		}), n;
	};
}), Sr = r$2(`$ZodNumberFormat`, (e, t) => {
	Dn$1.init(e, t), xr.init(e, t);
}), Cr = r$2(`$ZodBoolean`, (e, t) => {
	H$2.init(e, t), e._zod.pattern = tn$1, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = !!n.value;
		} catch {}
		let i = n.value;
		return typeof i == `boolean` || n.issues.push({
			expected: `boolean`,
			code: `invalid_type`,
			input: i,
			inst: e
		}), n;
	};
}), wr = r$2(`$ZodBigInt`, (e, t) => {
	H$2.init(e, t), e._zod.pattern = Qt$1, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = BigInt(n.value);
		} catch {}
		return typeof n.value == `bigint` || n.issues.push({
			expected: `bigint`,
			code: `invalid_type`,
			input: n.value,
			inst: e
		}), n;
	};
}), Tr = r$2(`$ZodBigIntFormat`, (e, t) => {
	On$1.init(e, t), wr.init(e, t);
}), Er = r$2(`$ZodSymbol`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (t, n) => {
		let r = t.value;
		return typeof r == `symbol` || t.issues.push({
			expected: `symbol`,
			code: `invalid_type`,
			input: r,
			inst: e
		}), t;
	};
}), Dr$1 = r$2(`$ZodUndefined`, (e, t) => {
	H$2.init(e, t), e._zod.pattern = rn$1, e._zod.values = /* @__PURE__ */ new Set([void 0]), e._zod.parse = (t, n) => {
		let r = t.value;
		return r === void 0 || t.issues.push({
			expected: `undefined`,
			code: `invalid_type`,
			input: r,
			inst: e
		}), t;
	};
}), Or$1 = r$2(`$ZodNull`, (e, t) => {
	H$2.init(e, t), e._zod.pattern = nn, e._zod.values = /* @__PURE__ */ new Set([null]), e._zod.parse = (t, n) => {
		let r = t.value;
		return r === null || t.issues.push({
			expected: `null`,
			code: `invalid_type`,
			input: r,
			inst: e
		}), t;
	};
}), kr$1 = r$2(`$ZodAny`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (e) => e;
}), Ar$1 = r$2(`$ZodUnknown`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (e) => e;
}), jr$1 = r$2(`$ZodNever`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: `never`,
		code: `invalid_type`,
		input: t.value,
		inst: e
	}), t);
}), Mr$1 = r$2(`$ZodVoid`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (t, n) => {
		let r = t.value;
		return r === void 0 || t.issues.push({
			expected: `void`,
			code: `invalid_type`,
			input: r,
			inst: e
		}), t;
	};
}), Nr = r$2(`$ZodDate`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = new Date(n.value);
		} catch {}
		let i = n.value, a = i instanceof Date;
		return a && !Number.isNaN(i.getTime()) || n.issues.push({
			expected: `date`,
			code: `invalid_type`,
			input: i,
			...a ? { received: `Invalid Date` } : {},
			inst: e
		}), n;
	};
});
function Pr(e, t, n) {
	e.issues.length && t.issues.push(...D$2(n, e.issues)), t.value[n] = e.value;
}
const Fr = r$2(`$ZodArray`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!Array.isArray(i)) return n.issues.push({
			expected: `array`,
			code: `invalid_type`,
			input: i,
			inst: e
		}), n;
		n.value = Array(i.length);
		let a = [];
		for (let e = 0; e < i.length; e++) {
			let o = i[e], s = t.element._zod.run({
				value: o,
				issues: []
			}, r);
			s instanceof Promise ? a.push(s.then((t) => Pr(t, n, e))) : Pr(s, n, e);
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
});
function Ir(e, t, n, r, i, a) {
	let o = n in r;
	if (e.issues.length) {
		if (i && a && !o) return;
		t.issues.push(...D$2(n, e.issues));
	}
	if (!o && !i) {
		e.issues.length || t.issues.push({
			code: `invalid_type`,
			expected: `nonoptional`,
			input: void 0,
			path: [n]
		});
		return;
	}
	e.value === void 0 ? o && (t.value[n] = void 0) : t.value[n] = e.value;
}
function Lr(e) {
	let t = Object.keys(e.shape);
	for (let n of t) if (!e.shape?.[n]?._zod?.traits?.has(`$ZodType`)) throw Error(`Invalid element at key "${n}": expected a Zod schema`);
	let n = xe(e.shape);
	return {
		...e,
		keys: t,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(n)
	};
}
function Rr(e, t, n, r, i, a) {
	let o = [], s = i.keySet, c = i.catchall._zod, l = c.def.type, u = c.optin === `optional`, d = c.optout === `optional`;
	for (let i in t) {
		if (i === `__proto__` || s.has(i)) continue;
		if (l === `never`) {
			o.push(i);
			continue;
		}
		let a = c.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => Ir(e, n, i, t, u, d))) : Ir(a, n, i, t, u, d);
	}
	return o.length && n.issues.push({
		code: `unrecognized_keys`,
		keys: o,
		input: t,
		inst: a
	}), e.length ? Promise.all(e).then(() => n) : n;
}
const zr = r$2(`$ZodObject`, (e, t) => {
	if (H$2.init(e, t), !Object.getOwnPropertyDescriptor(t, `shape`)?.get) {
		let e = t.shape;
		Object.defineProperty(t, "shape", { get: () => {
			let n = { ...e };
			return Object.defineProperty(t, "shape", { value: n }), n;
		} });
	}
	let n = h$2(() => Lr(t));
	_$2(e._zod, `propValues`, () => {
		let e = t.shape, n = {};
		for (let t in e) {
			let r = e[t]._zod;
			if (r.values) {
				n[t] ?? (n[t] = /* @__PURE__ */ new Set());
				for (let e of r.values) n[t].add(e);
			}
		}
		return n;
	});
	let r = b$1, i = t.catchall, a;
	e._zod.parse = (t, o) => {
		a ??= n.value;
		let s = t.value;
		if (!r(s)) return t.issues.push({
			expected: `object`,
			code: `invalid_type`,
			input: s,
			inst: e
		}), t;
		t.value = {};
		let c = [], l = a.shape;
		for (let e of a.keys) {
			let n = l[e], r = n._zod.optin === `optional`, i = n._zod.optout === `optional`, a = n._zod.run({
				value: s[e],
				issues: []
			}, o);
			a instanceof Promise ? c.push(a.then((n) => Ir(n, t, e, s, r, i))) : Ir(a, t, e, s, r, i);
		}
		return i ? Rr(c, s, t, o, n.value, e) : c.length ? Promise.all(c).then(() => t) : t;
	};
}), Br = r$2(`$ZodObjectJIT`, (e, t) => {
	zr.init(e, t);
	let n = e._zod.parse, r = h$2(() => Lr(t)), i = (e) => {
		let t = new Gn([
			`shape`,
			`payload`,
			`ctx`
		]), n = r.value, i = (e) => {
			let t = de$1(e);
			return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
		};
		t.write(`const input = payload.value;`);
		let a = Object.create(null), o = 0;
		for (let e of n.keys) a[e] = `key_${o++}`;
		t.write(`const newResult = {};`);
		for (let r of n.keys) {
			let n = a[r], o = de$1(r), s = e[r], c = s?._zod?.optin === `optional`, l = s?._zod?.optout === `optional`;
			t.write(`const ${n} = ${i(r)};`), c && l ? t.write(`
        if (${n}.issues.length) {
          if (${o} in input) {
            payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${o}, ...iss.path] : [${o}]
            })));
          }
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `) : c ? t.write(`
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `) : t.write(`
        const ${n}_present = ${o} in input;
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${o}]
          });
        }

        if (${n}_present) {
          if (${n}.value === undefined) {
            newResult[${o}] = undefined;
          } else {
            newResult[${o}] = ${n}.value;
          }
        }

      `);
		}
		t.write(`payload.value = newResult;`), t.write(`return payload;`);
		let s = t.compile();
		return (t, n) => s(e, t, n);
	}, a, o = b$1, c = !s.jitless, l = c && me.value, u = t.catchall, d;
	e._zod.parse = (s, f) => {
		d ??= r.value;
		let p = s.value;
		return o(p) ? c && l && f?.async === !1 && f.jitless !== !0 ? (a ||= i(t.shape), s = a(s, f), u ? Rr([], p, s, f, d, e) : s) : n(s, f) : (s.issues.push({
			expected: `object`,
			code: `invalid_type`,
			input: p,
			inst: e
		}), s);
	};
});
function Vr(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !E$2(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: `invalid_union`,
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => k$2(e, r, c$1())))
	}), t);
}
const Hr = r$2(`$ZodUnion`, (e, t) => {
	H$2.init(e, t), _$2(e._zod, `optin`, () => t.options.some((e) => e._zod.optin === `optional`) ? `optional` : void 0), _$2(e._zod, `optout`, () => t.options.some((e) => e._zod.optout === `optional`) ? `optional` : void 0), _$2(e._zod, `values`, () => {
		if (t.options.every((e) => e._zod.values)) return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
	}), _$2(e._zod, `pattern`, () => {
		if (t.options.every((e) => e._zod.pattern)) {
			let e = t.options.map((e) => e._zod.pattern);
			return RegExp(`^(${e.map((e) => re$1(e.source)).join(`|`)})$`);
		}
	});
	let n = t.options.length === 1 ? t.options[0]._zod.run : null;
	e._zod.parse = (r, i) => {
		if (n) return n(r, i);
		let a = !1, o = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: r.value,
				issues: []
			}, i);
			if (t instanceof Promise) o.push(t), a = !0;
			else {
				if (t.issues.length === 0) return t;
				o.push(t);
			}
		}
		return a ? Promise.all(o).then((t) => Vr(t, r, e, i)) : Vr(o, r, e, i);
	};
});
function Ur(e, t, n, r) {
	let i = e.filter((e) => e.issues.length === 0);
	return i.length === 1 ? (t.value = i[0].value, t) : (i.length === 0 ? t.issues.push({
		code: `invalid_union`,
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => k$2(e, r, c$1())))
	}) : t.issues.push({
		code: `invalid_union`,
		input: t.value,
		inst: n,
		errors: [],
		inclusive: !1
	}), t);
}
const Wr = r$2(`$ZodXor`, (e, t) => {
	Hr.init(e, t), t.inclusive = !1;
	let n = t.options.length === 1 ? t.options[0]._zod.run : null;
	e._zod.parse = (r, i) => {
		if (n) return n(r, i);
		let a = !1, o = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: r.value,
				issues: []
			}, i);
			t instanceof Promise ? (o.push(t), a = !0) : o.push(t);
		}
		return a ? Promise.all(o).then((t) => Ur(t, r, e, i)) : Ur(o, r, e, i);
	};
}), Gr = r$2(`$ZodDiscriminatedUnion`, (e, t) => {
	t.inclusive = !1, Hr.init(e, t);
	let n = e._zod.parse;
	_$2(e._zod, `propValues`, () => {
		let e = {};
		for (let n of t.options) {
			let r = n._zod.propValues;
			if (!r || Object.keys(r).length === 0) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
			for (let [t, n] of Object.entries(r)) {
				e[t] || (e[t] = /* @__PURE__ */ new Set());
				for (let r of n) e[t].add(r);
			}
		}
		return e;
	});
	let r = h$2(() => {
		let e = t.options, n = /* @__PURE__ */ new Map();
		for (let r of e) {
			let e = r._zod.propValues?.[t.discriminator];
			if (!e || e.size === 0) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
			for (let t of e) {
				if (n.has(t)) throw Error(`Duplicate discriminator value "${String(t)}"`);
				n.set(t, r);
			}
		}
		return n;
	});
	e._zod.parse = (i, a) => {
		let o = i.value;
		if (!b$1(o)) return i.issues.push({
			code: `invalid_type`,
			expected: `object`,
			input: o,
			inst: e
		}), i;
		let s = r.value.get(o?.[t.discriminator]);
		return s ? s._zod.run(i, a) : t.unionFallback || a.direction === `backward` ? n(i, a) : (i.issues.push({
			code: `invalid_union`,
			errors: [],
			note: `No matching discriminator`,
			discriminator: t.discriminator,
			options: Array.from(r.value.keys()),
			input: o,
			path: [t.discriminator],
			inst: e
		}), i);
	};
}), Kr = r$2(`$ZodIntersection`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => Jr(e, t, n)) : Jr(e, i, a);
	};
});
function qr(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (x$2(e) && x$2(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = qr(e[n], t[n]);
			if (!r.valid) return {
				valid: !1,
				mergeErrorPath: [n, ...r.mergeErrorPath]
			};
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = qr(i, a);
			if (!o.valid) return {
				valid: !1,
				mergeErrorPath: [r, ...o.mergeErrorPath]
			};
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function Jr(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i;
	for (let n of t.issues) if (n.code === `unrecognized_keys`) {
		i ??= n;
		for (let e of n.keys) r.has(e) || r.set(e, {}), r.get(e).l = !0;
	} else e.issues.push(n);
	for (let t of n.issues) if (t.code === `unrecognized_keys`) for (let e of t.keys) r.has(e) || r.set(e, {}), r.get(e).r = !0;
	else e.issues.push(t);
	let a = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if (a.length && i && e.issues.push({
		...i,
		keys: a
	}), E$2(e)) return e;
	let o = qr(t.value, n.value);
	if (!o.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
	return e.value = o.data, e;
}
const Yr = r$2(`$ZodTuple`, (e, t) => {
	H$2.init(e, t);
	let n = t.items;
	e._zod.parse = (r, i) => {
		let a = r.value;
		if (!Array.isArray(a)) return r.issues.push({
			input: a,
			inst: e,
			expected: `tuple`,
			code: `invalid_type`
		}), r;
		r.value = [];
		let o = [], s = Xr(n, `optin`), c = Xr(n, `optout`);
		if (!t.rest) {
			if (a.length < s) return r.issues.push({
				code: `too_small`,
				minimum: s,
				inclusive: !0,
				input: a,
				inst: e,
				origin: `array`
			}), r;
			a.length > n.length && r.issues.push({
				code: `too_big`,
				maximum: n.length,
				inclusive: !0,
				input: a,
				inst: e,
				origin: `array`
			});
		}
		let l = Array(n.length);
		for (let e = 0; e < n.length; e++) {
			let t = n[e]._zod.run({
				value: a[e],
				issues: []
			}, i);
			t instanceof Promise ? o.push(t.then((t) => {
				l[e] = t;
			})) : l[e] = t;
		}
		if (t.rest) {
			let e = n.length - 1, s = a.slice(n.length);
			for (let n of s) {
				e++;
				let a = t.rest._zod.run({
					value: n,
					issues: []
				}, i);
				a instanceof Promise ? o.push(a.then((t) => Zr(t, r, e))) : Zr(a, r, e);
			}
		}
		return o.length ? Promise.all(o).then(() => Qr(l, r, n, a, c)) : Qr(l, r, n, a, c);
	};
});
function Xr(e, t) {
	for (let n = e.length - 1; n >= 0; n--) if (e[n]._zod[t] !== `optional`) return n + 1;
	return 0;
}
function Zr(e, t, n) {
	e.issues.length && t.issues.push(...D$2(n, e.issues)), t.value[n] = e.value;
}
function Qr(e, t, n, r, i) {
	for (let a = 0; a < n.length; a++) {
		let n = e[a], o = a < r.length;
		if (n.issues.length) {
			if (!o && a >= i) {
				t.value.length = a;
				break;
			}
			t.issues.push(...D$2(a, n.issues));
		}
		t.value[a] = n.value;
	}
	for (let e = t.value.length - 1; e >= r.length && n[e]._zod.optout === `optional` && t.value[e] === void 0; e--) t.value.length = e;
	return t;
}
const $r = r$2(`$ZodRecord`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!x$2(i)) return n.issues.push({
			expected: `record`,
			code: `invalid_type`,
			input: i,
			inst: e
		}), n;
		let a = [], o = t.keyType._zod.values;
		if (o) {
			n.value = {};
			let s = /* @__PURE__ */ new Set();
			for (let l of o) if (typeof l == `string` || typeof l == `number` || typeof l == `symbol`) {
				s.add(typeof l == `number` ? l.toString() : l);
				let o = t.keyType._zod.run({
					value: l,
					issues: []
				}, r);
				if (o instanceof Promise) throw Error(`Async schemas not supported in object keys currently`);
				if (o.issues.length) {
					n.issues.push({
						code: `invalid_key`,
						origin: `record`,
						issues: o.issues.map((e) => k$2(e, r, c$1())),
						input: l,
						path: [l],
						inst: e
					});
					continue;
				}
				let u = o.value, d = t.valueType._zod.run({
					value: i[l],
					issues: []
				}, r);
				d instanceof Promise ? a.push(d.then((e) => {
					e.issues.length && n.issues.push(...D$2(l, e.issues)), n.value[u] = e.value;
				})) : (d.issues.length && n.issues.push(...D$2(l, d.issues)), n.value[u] = d.value);
			}
			let l;
			for (let e in i) s.has(e) || (l ??= [], l.push(e));
			l && l.length > 0 && n.issues.push({
				code: `unrecognized_keys`,
				input: i,
				inst: e,
				keys: l
			});
		} else {
			n.value = {};
			for (let o of Reflect.ownKeys(i)) {
				if (o === `__proto__` || !Object.prototype.propertyIsEnumerable.call(i, o)) continue;
				let s = t.keyType._zod.run({
					value: o,
					issues: []
				}, r);
				if (s instanceof Promise) throw Error(`Async schemas not supported in object keys currently`);
				if (typeof o == `string` && en$1.test(o) && s.issues.length) {
					let e = t.keyType._zod.run({
						value: Number(o),
						issues: []
					}, r);
					if (e instanceof Promise) throw Error(`Async schemas not supported in object keys currently`);
					e.issues.length === 0 && (s = e);
				}
				if (s.issues.length) {
					t.mode === `loose` ? n.value[o] = i[o] : n.issues.push({
						code: `invalid_key`,
						origin: `record`,
						issues: s.issues.map((e) => k$2(e, r, c$1())),
						input: o,
						path: [o],
						inst: e
					});
					continue;
				}
				let l = t.valueType._zod.run({
					value: i[o],
					issues: []
				}, r);
				l instanceof Promise ? a.push(l.then((e) => {
					e.issues.length && n.issues.push(...D$2(o, e.issues)), n.value[s.value] = e.value;
				})) : (l.issues.length && n.issues.push(...D$2(o, l.issues)), n.value[s.value] = l.value);
			}
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
}), ei = r$2(`$ZodMap`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!(i instanceof Map)) return n.issues.push({
			expected: `map`,
			code: `invalid_type`,
			input: i,
			inst: e
		}), n;
		let a = [];
		n.value = /* @__PURE__ */ new Map();
		for (let [o, s] of i) {
			let c = t.keyType._zod.run({
				value: o,
				issues: []
			}, r), l = t.valueType._zod.run({
				value: s,
				issues: []
			}, r);
			c instanceof Promise || l instanceof Promise ? a.push(Promise.all([c, l]).then(([t, a]) => {
				ti(t, a, n, o, i, e, r);
			})) : ti(c, l, n, o, i, e, r);
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
});
function ti(e, t, n, r, i, a, o) {
	e.issues.length && (ve.has(typeof r) ? n.issues.push(...D$2(r, e.issues)) : n.issues.push({
		code: `invalid_key`,
		origin: `map`,
		input: i,
		inst: a,
		issues: e.issues.map((e) => k$2(e, o, c$1()))
	})), t.issues.length && (ve.has(typeof r) ? n.issues.push(...D$2(r, t.issues)) : n.issues.push({
		origin: `map`,
		code: `invalid_element`,
		input: i,
		inst: a,
		key: r,
		issues: t.issues.map((e) => k$2(e, o, c$1()))
	})), n.value.set(e.value, t.value);
}
const ni = r$2(`$ZodSet`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!(i instanceof Set)) return n.issues.push({
			input: i,
			inst: e,
			expected: `set`,
			code: `invalid_type`
		}), n;
		let a = [];
		n.value = /* @__PURE__ */ new Set();
		for (let e of i) {
			let i = t.valueType._zod.run({
				value: e,
				issues: []
			}, r);
			i instanceof Promise ? a.push(i.then((e) => ri(e, n))) : ri(i, n);
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
});
function ri(e, t) {
	e.issues.length && t.issues.push(...e.issues), t.value.add(e.value);
}
const ii = r$2(`$ZodEnum`, (e, t) => {
	H$2.init(e, t);
	let n = te$1(t.entries), r = new Set(n);
	e._zod.values = r, e._zod.pattern = RegExp(`^(${n.filter((e) => ve.has(typeof e)).map((e) => typeof e == `string` ? S$2(e) : e.toString()).join(`|`)})$`), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: `invalid_value`,
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), ai = r$2(`$ZodLiteral`, (e, t) => {
	if (H$2.init(e, t), t.values.length === 0) throw Error(`Cannot create literal schema with no valid values`);
	let n = new Set(t.values);
	e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e) => typeof e == `string` ? S$2(e) : e ? S$2(e.toString()) : String(e)).join(`|`)})$`), e._zod.parse = (r, i) => {
		let a = r.value;
		return n.has(a) || r.issues.push({
			code: `invalid_value`,
			values: t.values,
			input: a,
			inst: e
		}), r;
	};
}), oi = r$2(`$ZodFile`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (t, n) => {
		let r = t.value;
		return r instanceof File || t.issues.push({
			expected: `file`,
			code: `invalid_type`,
			input: r,
			inst: e
		}), t;
	};
}), si$1 = r$2(`$ZodTransform`, (e, t) => {
	H$2.init(e, t), e._zod.optin = `optional`, e._zod.parse = (n, r) => {
		if (r.direction === `backward`) throw new o(e.constructor.name);
		let i = t.transform(n.value, n);
		if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n.fallback = !0, n));
		if (i instanceof Promise) throw new a();
		return n.value = i, n.fallback = !0, n;
	};
});
function ci$1(e, t) {
	return t === void 0 && (e.issues.length || e.fallback) ? {
		issues: [],
		value: void 0
	} : e;
}
const li$1 = r$2(`$ZodOptional`, (e, t) => {
	H$2.init(e, t), e._zod.optin = `optional`, e._zod.optout = `optional`, _$2(e._zod, `values`, () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), _$2(e._zod, `pattern`, () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${re$1(e.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (t.innerType._zod.optin === `optional`) {
			let r = e.value, i = t.innerType._zod.run(e, n);
			return i instanceof Promise ? i.then((e) => ci$1(e, r)) : ci$1(i, r);
		}
		return e.value === void 0 ? e : t.innerType._zod.run(e, n);
	};
}), ui$1 = r$2(`$ZodExactOptional`, (e, t) => {
	li$1.init(e, t), _$2(e._zod, `values`, () => t.innerType._zod.values), _$2(e._zod, `pattern`, () => t.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), di$1 = r$2(`$ZodNullable`, (e, t) => {
	H$2.init(e, t), _$2(e._zod, `optin`, () => t.innerType._zod.optin), _$2(e._zod, `optout`, () => t.innerType._zod.optout), _$2(e._zod, `pattern`, () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${re$1(e.source)}|null)$`) : void 0;
	}), _$2(e._zod, `values`, () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), fi$1 = r$2(`$ZodDefault`, (e, t) => {
	H$2.init(e, t), e._zod.optin = `optional`, _$2(e._zod, `values`, () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === `backward`) return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => pi$1(e, t)) : pi$1(r, t);
	};
});
function pi$1(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
const mi$1 = r$2(`$ZodPrefault`, (e, t) => {
	H$2.init(e, t), e._zod.optin = `optional`, _$2(e._zod, `values`, () => t.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === `backward` || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), hi$1 = r$2(`$ZodNonOptional`, (e, t) => {
	H$2.init(e, t), _$2(e._zod, `values`, () => {
		let e = t.innerType._zod.values;
		return e ? new Set([...e].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => gi$1(t, e)) : gi$1(i, e);
	};
});
function gi$1(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: `invalid_type`,
		expected: `nonoptional`,
		input: e.value,
		inst: t
	}), e;
}
const _i$1 = r$2(`$ZodSuccess`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (e, n) => {
		if (n.direction === `backward`) throw new o(`ZodSuccess`);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((t) => (e.value = t.issues.length === 0, e)) : (e.value = r.issues.length === 0, e);
	};
}), vi$1 = r$2(`$ZodCatch`, (e, t) => {
	H$2.init(e, t), e._zod.optin = `optional`, _$2(e._zod, `optout`, () => t.innerType._zod.optout), _$2(e._zod, `values`, () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === `backward`) return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((r) => (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => k$2(e, n, c$1())) },
			input: e.value
		}), e.issues = [], e.fallback = !0), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => k$2(e, n, c$1())) },
			input: e.value
		}), e.issues = [], e.fallback = !0), e);
	};
}), yi$1 = r$2(`$ZodNaN`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (t, n) => ((typeof t.value != `number` || !Number.isNaN(t.value)) && t.issues.push({
		input: t.value,
		inst: e,
		expected: `nan`,
		code: `invalid_type`
	}), t);
}), bi$1 = r$2(`$ZodPipe`, (e, t) => {
	H$2.init(e, t), _$2(e._zod, `values`, () => t.in._zod.values), _$2(e._zod, `optin`, () => t.in._zod.optin), _$2(e._zod, `optout`, () => t.out._zod.optout), _$2(e._zod, `propValues`, () => t.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === `backward`) {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => xi$1(e, t.in, n)) : xi$1(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => xi$1(e, t.out, n)) : xi$1(r, t.out, n);
	};
});
function xi$1(e, t, n) {
	return e.issues.length ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues,
		fallback: e.fallback
	}, n);
}
const Si$1 = r$2(`$ZodCodec`, (e, t) => {
	H$2.init(e, t), _$2(e._zod, `values`, () => t.in._zod.values), _$2(e._zod, `optin`, () => t.in._zod.optin), _$2(e._zod, `optout`, () => t.out._zod.optout), _$2(e._zod, `propValues`, () => t.in._zod.propValues), e._zod.parse = (e, n) => {
		if ((n.direction || `forward`) === `forward`) {
			let r = t.in._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Ci$1(e, t, n)) : Ci$1(r, t, n);
		} else {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Ci$1(e, t, n)) : Ci$1(r, t, n);
		}
	};
});
function Ci$1(e, t, n) {
	if (e.issues.length) return e.aborted = !0, e;
	if ((n.direction || `forward`) === `forward`) {
		let r = t.transform(e.value, e);
		return r instanceof Promise ? r.then((r) => wi$1(e, r, t.out, n)) : wi$1(e, r, t.out, n);
	} else {
		let r = t.reverseTransform(e.value, e);
		return r instanceof Promise ? r.then((r) => wi$1(e, r, t.in, n)) : wi$1(e, r, t.in, n);
	}
}
function wi$1(e, t, n, r) {
	return e.issues.length ? (e.aborted = !0, e) : n._zod.run({
		value: t,
		issues: e.issues
	}, r);
}
const Ti$1 = r$2(`$ZodPreprocess`, (e, t) => {
	bi$1.init(e, t);
}), Ei$1 = r$2(`$ZodReadonly`, (e, t) => {
	H$2.init(e, t), _$2(e._zod, `propValues`, () => t.innerType._zod.propValues), _$2(e._zod, `values`, () => t.innerType._zod.values), _$2(e._zod, `optin`, () => t.innerType?._zod?.optin), _$2(e._zod, `optout`, () => t.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === `backward`) return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(Di$1) : Di$1(r);
	};
});
function Di$1(e) {
	return e.value = Object.freeze(e.value), e;
}
const Oi$1 = r$2(`$ZodTemplateLiteral`, (e, t) => {
	H$2.init(e, t);
	let n = [];
	for (let e of t.parts) if (typeof e == `object` && e) {
		if (!e._zod.pattern) throw Error(`Invalid template literal part, no pattern found: ${[...e._zod.traits].shift()}`);
		let t = e._zod.pattern instanceof RegExp ? e._zod.pattern.source : e._zod.pattern;
		if (!t) throw Error(`Invalid template literal part: ${e._zod.traits}`);
		let r = +!!t.startsWith(`^`), i = t.endsWith(`$`) ? t.length - 1 : t.length;
		n.push(t.slice(r, i));
	} else if (e === null || ye.has(typeof e)) n.push(S$2(`${e}`));
	else throw Error(`Invalid template literal part: ${e}`);
	e._zod.pattern = RegExp(`^${n.join(``)}$`), e._zod.parse = (n, r) => typeof n.value == `string` ? (e._zod.pattern.lastIndex = 0, e._zod.pattern.test(n.value) || n.issues.push({
		input: n.value,
		inst: e,
		code: `invalid_format`,
		format: t.format ?? `template_literal`,
		pattern: e._zod.pattern.source
	}), n) : (n.issues.push({
		input: n.value,
		inst: e,
		expected: `string`,
		code: `invalid_type`
	}), n);
}), ki$1 = r$2(`$ZodFunction`, (e, t) => (H$2.init(e, t), e._def = t, e._zod.def = t, e.implement = (t) => {
	if (typeof t != `function`) throw Error(`implement() must be called with a function`);
	return function(...n) {
		let r = e._def.input ? Ye$1(e._def.input, n) : n, i = Reflect.apply(t, this, r);
		return e._def.output ? Ye$1(e._def.output, i) : i;
	};
}, e.implementAsync = (t) => {
	if (typeof t != `function`) throw Error(`implementAsync() must be called with a function`);
	return async function(...n) {
		let r = e._def.input ? await Xe(e._def.input, n) : n, i = await Reflect.apply(t, this, r);
		return e._def.output ? await Xe(e._def.output, i) : i;
	};
}, e._zod.parse = (t, n) => typeof t.value == `function` ? (e._def.output && e._def.output._zod.def.type === `promise` ? t.value = e.implementAsync(t.value) : t.value = e.implement(t.value), t) : (t.issues.push({
	code: `invalid_type`,
	expected: `function`,
	input: t.value,
	inst: e
}), t), e.input = (...t) => {
	let n = e.constructor;
	return Array.isArray(t[0]) ? new n({
		type: `function`,
		input: new Yr({
			type: `tuple`,
			items: t[0],
			rest: t[1]
		}),
		output: e._def.output
	}) : new n({
		type: `function`,
		input: t[0],
		output: e._def.output
	});
}, e.output = (t) => {
	let n = e.constructor;
	return new n({
		type: `function`,
		input: e._def.input,
		output: t
	});
}, e)), Ai$1 = r$2(`$ZodPromise`, (e, t) => {
	H$2.init(e, t), e._zod.parse = (e, n) => Promise.resolve(e.value).then((e) => t.innerType._zod.run({
		value: e,
		issues: []
	}, n));
}), ji$1 = r$2(`$ZodLazy`, (e, t) => {
	H$2.init(e, t), _$2(e._zod, `innerType`, () => {
		let e = t;
		return e._cachedInner ||= t.getter(), e._cachedInner;
	}), _$2(e._zod, `pattern`, () => e._zod.innerType?._zod?.pattern), _$2(e._zod, `propValues`, () => e._zod.innerType?._zod?.propValues), _$2(e._zod, `optin`, () => e._zod.innerType?._zod?.optin ?? void 0), _$2(e._zod, `optout`, () => e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n);
}), Mi$1 = r$2(`$ZodCustom`, (e, t) => {
	B$2.init(e, t), H$2.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => Ni$1(t, n, r, e));
		Ni$1(i, n, r, e);
	};
});
function Ni$1(e, t, n, r) {
	if (!e) {
		let e = {
			code: `custom`,
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(j$2(e));
	}
}
const Pi$1 = () => {
	let e = {
		string: {
			unit: `حرف`,
			verb: `أن يحوي`
		},
		file: {
			unit: `بايت`,
			verb: `أن يحوي`
		},
		array: {
			unit: `عنصر`,
			verb: `أن يحوي`
		},
		set: {
			unit: `عنصر`,
			verb: `أن يحوي`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `مدخل`,
		email: `بريد إلكتروني`,
		url: `رابط`,
		emoji: `إيموجي`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `تاريخ ووقت بمعيار ISO`,
		date: `تاريخ بمعيار ISO`,
		time: `وقت بمعيار ISO`,
		duration: `مدة بمعيار ISO`,
		ipv4: `عنوان IPv4`,
		ipv6: `عنوان IPv6`,
		cidrv4: `مدى عناوين بصيغة IPv4`,
		cidrv6: `مدى عناوين بصيغة IPv6`,
		base64: `نَص بترميز base64-encoded`,
		base64url: `نَص بترميز base64url-encoded`,
		json_string: `نَص على هيئة JSON`,
		e164: `رقم هاتف بمعيار E.164`,
		jwt: `JWT`,
		template_literal: `مدخل`
	}, r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `مدخلات غير مقبولة: يفترض إدخال instanceof ${e.expected}، ولكن تم إدخال ${i}` : `مدخلات غير مقبولة: يفترض إدخال ${t}، ولكن تم إدخال ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `مدخلات غير مقبولة: يفترض إدخال ${T$2(e.values[0])}` : `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? ` أكبر من اللازم: يفترض أن تكون ${e.origin ?? `القيمة`} ${n} ${e.maximum.toString()} ${r.unit ?? `عنصر`}` : `أكبر من اللازم: يفترض أن تكون ${e.origin ?? `القيمة`} ${n} ${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `أصغر من اللازم: يفترض لـ ${e.origin} أن يكون ${n} ${e.minimum.toString()} ${r.unit}` : `أصغر من اللازم: يفترض لـ ${e.origin} أن يكون ${n} ${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `نَص غير مقبول: يجب أن يبدأ بـ "${e.prefix}"` : t.format === `ends_with` ? `نَص غير مقبول: يجب أن ينتهي بـ "${t.suffix}"` : t.format === `includes` ? `نَص غير مقبول: يجب أن يتضمَّن "${t.includes}"` : t.format === `regex` ? `نَص غير مقبول: يجب أن يطابق النمط ${t.pattern}` : `${n[t.format] ?? e.format} غير مقبول`;
			}
			case `not_multiple_of`: return `رقم غير مقبول: يجب أن يكون من مضاعفات ${e.divisor}`;
			case `unrecognized_keys`: return `معرف${e.keys.length > 1 ? `ات` : ``} غريب${e.keys.length > 1 ? `ة` : ``}: ${m$2(e.keys, `، `)}`;
			case `invalid_key`: return `معرف غير مقبول في ${e.origin}`;
			case `invalid_union`: return `مدخل غير مقبول`;
			case `invalid_element`: return `مدخل غير مقبول في ${e.origin}`;
			default: return `مدخل غير مقبول`;
		}
	};
};
function Fi$1() {
	return { localeError: Pi$1() };
}
const Ii$1 = () => {
	let e = {
		string: {
			unit: `simvol`,
			verb: `olmalıdır`
		},
		file: {
			unit: `bayt`,
			verb: `olmalıdır`
		},
		array: {
			unit: `element`,
			verb: `olmalıdır`
		},
		set: {
			unit: `element`,
			verb: `olmalıdır`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `input`,
		email: `email address`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO datetime`,
		date: `ISO date`,
		time: `ISO time`,
		duration: `ISO duration`,
		ipv4: `IPv4 address`,
		ipv6: `IPv6 address`,
		cidrv4: `IPv4 range`,
		cidrv6: `IPv6 range`,
		base64: `base64-encoded string`,
		base64url: `base64url-encoded string`,
		json_string: `JSON string`,
		e164: `E.164 number`,
		jwt: `JWT`,
		template_literal: `input`
	}, r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Yanlış dəyər: gözlənilən instanceof ${e.expected}, daxil olan ${i}` : `Yanlış dəyər: gözlənilən ${t}, daxil olan ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Yanlış dəyər: gözlənilən ${T$2(e.values[0])}` : `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Çox böyük: gözlənilən ${e.origin ?? `dəyər`} ${n}${e.maximum.toString()} ${r.unit ?? `element`}` : `Çox böyük: gözlənilən ${e.origin ?? `dəyər`} ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Çox kiçik: gözlənilən ${e.origin} ${n}${e.minimum.toString()} ${r.unit}` : `Çox kiçik: gözlənilən ${e.origin} ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Yanlış mətn: "${t.prefix}" ilə başlamalıdır` : t.format === `ends_with` ? `Yanlış mətn: "${t.suffix}" ilə bitməlidir` : t.format === `includes` ? `Yanlış mətn: "${t.includes}" daxil olmalıdır` : t.format === `regex` ? `Yanlış mətn: ${t.pattern} şablonuna uyğun olmalıdır` : `Yanlış ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Yanlış ədəd: ${e.divisor} ilə bölünə bilən olmalıdır`;
			case `unrecognized_keys`: return `Tanınmayan açar${e.keys.length > 1 ? `lar` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `${e.origin} daxilində yanlış açar`;
			case `invalid_union`: return `Yanlış dəyər`;
			case `invalid_element`: return `${e.origin} daxilində yanlış dəyər`;
			default: return `Yanlış dəyər`;
		}
	};
};
function Li$1() {
	return { localeError: Ii$1() };
}
function Ri$1(e, t, n, r) {
	let i = Math.abs(e), a = i % 10, o = i % 100;
	return o >= 11 && o <= 19 ? r : a === 1 ? t : a >= 2 && a <= 4 ? n : r;
}
const zi$1 = () => {
	let e = {
		string: {
			unit: {
				one: `сімвал`,
				few: `сімвалы`,
				many: `сімвалаў`
			},
			verb: `мець`
		},
		array: {
			unit: {
				one: `элемент`,
				few: `элементы`,
				many: `элементаў`
			},
			verb: `мець`
		},
		set: {
			unit: {
				one: `элемент`,
				few: `элементы`,
				many: `элементаў`
			},
			verb: `мець`
		},
		file: {
			unit: {
				one: `байт`,
				few: `байты`,
				many: `байтаў`
			},
			verb: `мець`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `увод`,
		email: `email адрас`,
		url: `URL`,
		emoji: `эмодзі`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO дата і час`,
		date: `ISO дата`,
		time: `ISO час`,
		duration: `ISO працягласць`,
		ipv4: `IPv4 адрас`,
		ipv6: `IPv6 адрас`,
		cidrv4: `IPv4 дыяпазон`,
		cidrv6: `IPv6 дыяпазон`,
		base64: `радок у фармаце base64`,
		base64url: `радок у фармаце base64url`,
		json_string: `JSON радок`,
		e164: `нумар E.164`,
		jwt: `JWT`,
		template_literal: `увод`
	}, r = {
		nan: `NaN`,
		number: `лік`,
		array: `масіў`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Няправільны ўвод: чакаўся instanceof ${e.expected}, атрымана ${i}` : `Няправільны ўвод: чакаўся ${t}, атрымана ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Няправільны ўвод: чакалася ${T$2(e.values[0])}` : `Няправільны варыянт: чакаўся адзін з ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				if (r) {
					let t = Ri$1(Number(e.maximum), r.unit.one, r.unit.few, r.unit.many);
					return `Занадта вялікі: чакалася, што ${e.origin ?? `значэнне`} павінна ${r.verb} ${n}${e.maximum.toString()} ${t}`;
				}
				return `Занадта вялікі: чакалася, што ${e.origin ?? `значэнне`} павінна быць ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				if (r) {
					let t = Ri$1(Number(e.minimum), r.unit.one, r.unit.few, r.unit.many);
					return `Занадта малы: чакалася, што ${e.origin} павінна ${r.verb} ${n}${e.minimum.toString()} ${t}`;
				}
				return `Занадта малы: чакалася, што ${e.origin} павінна быць ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Няправільны радок: павінен пачынацца з "${t.prefix}"` : t.format === `ends_with` ? `Няправільны радок: павінен заканчвацца на "${t.suffix}"` : t.format === `includes` ? `Няправільны радок: павінен змяшчаць "${t.includes}"` : t.format === `regex` ? `Няправільны радок: павінен адпавядаць шаблону ${t.pattern}` : `Няправільны ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Няправільны лік: павінен быць кратным ${e.divisor}`;
			case `unrecognized_keys`: return `Нераспазнаны ${e.keys.length > 1 ? `ключы` : `ключ`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Няправільны ключ у ${e.origin}`;
			case `invalid_union`: return `Няправільны ўвод`;
			case `invalid_element`: return `Няправільнае значэнне ў ${e.origin}`;
			default: return `Няправільны ўвод`;
		}
	};
};
function Bi$1() {
	return { localeError: zi$1() };
}
const Vi$1 = () => {
	let e = {
		string: {
			unit: `символа`,
			verb: `да съдържа`
		},
		file: {
			unit: `байта`,
			verb: `да съдържа`
		},
		array: {
			unit: `елемента`,
			verb: `да съдържа`
		},
		set: {
			unit: `елемента`,
			verb: `да съдържа`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `вход`,
		email: `имейл адрес`,
		url: `URL`,
		emoji: `емоджи`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO време`,
		date: `ISO дата`,
		time: `ISO време`,
		duration: `ISO продължителност`,
		ipv4: `IPv4 адрес`,
		ipv6: `IPv6 адрес`,
		cidrv4: `IPv4 диапазон`,
		cidrv6: `IPv6 диапазон`,
		base64: `base64-кодиран низ`,
		base64url: `base64url-кодиран низ`,
		json_string: `JSON низ`,
		e164: `E.164 номер`,
		jwt: `JWT`,
		template_literal: `вход`
	}, r = {
		nan: `NaN`,
		number: `число`,
		array: `масив`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Невалиден вход: очакван instanceof ${e.expected}, получен ${i}` : `Невалиден вход: очакван ${t}, получен ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Невалиден вход: очакван ${T$2(e.values[0])}` : `Невалидна опция: очаквано едно от ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Твърде голямо: очаква се ${e.origin ?? `стойност`} да съдържа ${n}${e.maximum.toString()} ${r.unit ?? `елемента`}` : `Твърде голямо: очаква се ${e.origin ?? `стойност`} да бъде ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Твърде малко: очаква се ${e.origin} да съдържа ${n}${e.minimum.toString()} ${r.unit}` : `Твърде малко: очаква се ${e.origin} да бъде ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				if (t.format === `starts_with`) return `Невалиден низ: трябва да започва с "${t.prefix}"`;
				if (t.format === `ends_with`) return `Невалиден низ: трябва да завършва с "${t.suffix}"`;
				if (t.format === `includes`) return `Невалиден низ: трябва да включва "${t.includes}"`;
				if (t.format === `regex`) return `Невалиден низ: трябва да съвпада с ${t.pattern}`;
				let r = `Невалиден`;
				return t.format === `emoji` && (r = `Невалидно`), t.format === `datetime` && (r = `Невалидно`), t.format === `date` && (r = `Невалидна`), t.format === `time` && (r = `Невалидно`), t.format === `duration` && (r = `Невалидна`), `${r} ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Невалидно число: трябва да бъде кратно на ${e.divisor}`;
			case `unrecognized_keys`: return `Неразпознат${e.keys.length > 1 ? `и` : ``} ключ${e.keys.length > 1 ? `ове` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Невалиден ключ в ${e.origin}`;
			case `invalid_union`: return `Невалиден вход`;
			case `invalid_element`: return `Невалидна стойност в ${e.origin}`;
			default: return `Невалиден вход`;
		}
	};
};
function Hi$1() {
	return { localeError: Vi$1() };
}
const Ui$1 = () => {
	let e = {
		string: {
			unit: `caràcters`,
			verb: `contenir`
		},
		file: {
			unit: `bytes`,
			verb: `contenir`
		},
		array: {
			unit: `elements`,
			verb: `contenir`
		},
		set: {
			unit: `elements`,
			verb: `contenir`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `entrada`,
		email: `adreça electrònica`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `data i hora ISO`,
		date: `data ISO`,
		time: `hora ISO`,
		duration: `durada ISO`,
		ipv4: `adreça IPv4`,
		ipv6: `adreça IPv6`,
		cidrv4: `rang IPv4`,
		cidrv6: `rang IPv6`,
		base64: `cadena codificada en base64`,
		base64url: `cadena codificada en base64url`,
		json_string: `cadena JSON`,
		e164: `número E.164`,
		jwt: `JWT`,
		template_literal: `entrada`
	}, r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Tipus invàlid: s'esperava instanceof ${e.expected}, s'ha rebut ${i}` : `Tipus invàlid: s'esperava ${t}, s'ha rebut ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Valor invàlid: s'esperava ${T$2(e.values[0])}` : `Opció invàlida: s'esperava una de ${m$2(e.values, ` o `)}`;
			case `too_big`: {
				let n = e.inclusive ? `com a màxim` : `menys de`, r = t(e.origin);
				return r ? `Massa gran: s'esperava que ${e.origin ?? `el valor`} contingués ${n} ${e.maximum.toString()} ${r.unit ?? `elements`}` : `Massa gran: s'esperava que ${e.origin ?? `el valor`} fos ${n} ${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `com a mínim` : `més de`, r = t(e.origin);
				return r ? `Massa petit: s'esperava que ${e.origin} contingués ${n} ${e.minimum.toString()} ${r.unit}` : `Massa petit: s'esperava que ${e.origin} fos ${n} ${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Format invàlid: ha de començar amb "${t.prefix}"` : t.format === `ends_with` ? `Format invàlid: ha d'acabar amb "${t.suffix}"` : t.format === `includes` ? `Format invàlid: ha d'incloure "${t.includes}"` : t.format === `regex` ? `Format invàlid: ha de coincidir amb el patró ${t.pattern}` : `Format invàlid per a ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Número invàlid: ha de ser múltiple de ${e.divisor}`;
			case `unrecognized_keys`: return `Clau${e.keys.length > 1 ? `s` : ``} no reconeguda${e.keys.length > 1 ? `s` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Clau invàlida a ${e.origin}`;
			case `invalid_union`: return `Entrada invàlida`;
			case `invalid_element`: return `Element invàlid a ${e.origin}`;
			default: return `Entrada invàlida`;
		}
	};
};
function Wi$1() {
	return { localeError: Ui$1() };
}
const Gi$1 = () => {
	let e = {
		string: {
			unit: `znaků`,
			verb: `mít`
		},
		file: {
			unit: `bajtů`,
			verb: `mít`
		},
		array: {
			unit: `prvků`,
			verb: `mít`
		},
		set: {
			unit: `prvků`,
			verb: `mít`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `regulární výraz`,
		email: `e-mailová adresa`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `datum a čas ve formátu ISO`,
		date: `datum ve formátu ISO`,
		time: `čas ve formátu ISO`,
		duration: `doba trvání ISO`,
		ipv4: `IPv4 adresa`,
		ipv6: `IPv6 adresa`,
		cidrv4: `rozsah IPv4`,
		cidrv6: `rozsah IPv6`,
		base64: `řetězec zakódovaný ve formátu base64`,
		base64url: `řetězec zakódovaný ve formátu base64url`,
		json_string: `řetězec ve formátu JSON`,
		e164: `číslo E.164`,
		jwt: `JWT`,
		template_literal: `vstup`
	}, r = {
		nan: `NaN`,
		number: `číslo`,
		string: `řetězec`,
		function: `funkce`,
		array: `pole`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Neplatný vstup: očekáváno instanceof ${e.expected}, obdrženo ${i}` : `Neplatný vstup: očekáváno ${t}, obdrženo ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Neplatný vstup: očekáváno ${T$2(e.values[0])}` : `Neplatná možnost: očekávána jedna z hodnot ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Hodnota je příliš velká: ${e.origin ?? `hodnota`} musí mít ${n}${e.maximum.toString()} ${r.unit ?? `prvků`}` : `Hodnota je příliš velká: ${e.origin ?? `hodnota`} musí být ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Hodnota je příliš malá: ${e.origin ?? `hodnota`} musí mít ${n}${e.minimum.toString()} ${r.unit ?? `prvků`}` : `Hodnota je příliš malá: ${e.origin ?? `hodnota`} musí být ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Neplatný řetězec: musí začínat na "${t.prefix}"` : t.format === `ends_with` ? `Neplatný řetězec: musí končit na "${t.suffix}"` : t.format === `includes` ? `Neplatný řetězec: musí obsahovat "${t.includes}"` : t.format === `regex` ? `Neplatný řetězec: musí odpovídat vzoru ${t.pattern}` : `Neplatný formát ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Neplatné číslo: musí být násobkem ${e.divisor}`;
			case `unrecognized_keys`: return `Neznámé klíče: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Neplatný klíč v ${e.origin}`;
			case `invalid_union`: return `Neplatný vstup`;
			case `invalid_element`: return `Neplatná hodnota v ${e.origin}`;
			default: return `Neplatný vstup`;
		}
	};
};
function Ki$1() {
	return { localeError: Gi$1() };
}
const qi$1 = () => {
	let e = {
		string: {
			unit: `tegn`,
			verb: `havde`
		},
		file: {
			unit: `bytes`,
			verb: `havde`
		},
		array: {
			unit: `elementer`,
			verb: `indeholdt`
		},
		set: {
			unit: `elementer`,
			verb: `indeholdt`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `input`,
		email: `e-mailadresse`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO dato- og klokkeslæt`,
		date: `ISO-dato`,
		time: `ISO-klokkeslæt`,
		duration: `ISO-varighed`,
		ipv4: `IPv4-område`,
		ipv6: `IPv6-område`,
		cidrv4: `IPv4-spektrum`,
		cidrv6: `IPv6-spektrum`,
		base64: `base64-kodet streng`,
		base64url: `base64url-kodet streng`,
		json_string: `JSON-streng`,
		e164: `E.164-nummer`,
		jwt: `JWT`,
		template_literal: `input`
	}, r = {
		nan: `NaN`,
		string: `streng`,
		number: `tal`,
		boolean: `boolean`,
		array: `liste`,
		object: `objekt`,
		set: `sæt`,
		file: `fil`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Ugyldigt input: forventede instanceof ${e.expected}, fik ${i}` : `Ugyldigt input: forventede ${t}, fik ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Ugyldig værdi: forventede ${T$2(e.values[0])}` : `Ugyldigt valg: forventede en af følgende ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, i = t(e.origin), a = r[e.origin] ?? e.origin;
				return i ? `For stor: forventede ${a ?? `value`} ${i.verb} ${n} ${e.maximum.toString()} ${i.unit ?? `elementer`}` : `For stor: forventede ${a ?? `value`} havde ${n} ${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, i = t(e.origin), a = r[e.origin] ?? e.origin;
				return i ? `For lille: forventede ${a} ${i.verb} ${n} ${e.minimum.toString()} ${i.unit}` : `For lille: forventede ${a} havde ${n} ${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Ugyldig streng: skal starte med "${t.prefix}"` : t.format === `ends_with` ? `Ugyldig streng: skal ende med "${t.suffix}"` : t.format === `includes` ? `Ugyldig streng: skal indeholde "${t.includes}"` : t.format === `regex` ? `Ugyldig streng: skal matche mønsteret ${t.pattern}` : `Ugyldig ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Ugyldigt tal: skal være deleligt med ${e.divisor}`;
			case `unrecognized_keys`: return `${e.keys.length > 1 ? `Ukendte nøgler` : `Ukendt nøgle`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Ugyldig nøgle i ${e.origin}`;
			case `invalid_union`: return `Ugyldigt input: matcher ingen af de tilladte typer`;
			case `invalid_element`: return `Ugyldig værdi i ${e.origin}`;
			default: return `Ugyldigt input`;
		}
	};
};
function Ji$1() {
	return { localeError: qi$1() };
}
const Yi$1 = () => {
	let e = {
		string: {
			unit: `Zeichen`,
			verb: `zu haben`
		},
		file: {
			unit: `Bytes`,
			verb: `zu haben`
		},
		array: {
			unit: `Elemente`,
			verb: `zu haben`
		},
		set: {
			unit: `Elemente`,
			verb: `zu haben`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `Eingabe`,
		email: `E-Mail-Adresse`,
		url: `URL`,
		emoji: `Emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO-Datum und -Uhrzeit`,
		date: `ISO-Datum`,
		time: `ISO-Uhrzeit`,
		duration: `ISO-Dauer`,
		ipv4: `IPv4-Adresse`,
		ipv6: `IPv6-Adresse`,
		cidrv4: `IPv4-Bereich`,
		cidrv6: `IPv6-Bereich`,
		base64: `Base64-codierter String`,
		base64url: `Base64-URL-codierter String`,
		json_string: `JSON-String`,
		e164: `E.164-Nummer`,
		jwt: `JWT`,
		template_literal: `Eingabe`
	}, r = {
		nan: `NaN`,
		number: `Zahl`,
		array: `Array`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Ungültige Eingabe: erwartet instanceof ${e.expected}, erhalten ${i}` : `Ungültige Eingabe: erwartet ${t}, erhalten ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Ungültige Eingabe: erwartet ${T$2(e.values[0])}` : `Ungültige Option: erwartet eine von ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Zu groß: erwartet, dass ${e.origin ?? `Wert`} ${n}${e.maximum.toString()} ${r.unit ?? `Elemente`} hat` : `Zu groß: erwartet, dass ${e.origin ?? `Wert`} ${n}${e.maximum.toString()} ist`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Zu klein: erwartet, dass ${e.origin} ${n}${e.minimum.toString()} ${r.unit} hat` : `Zu klein: erwartet, dass ${e.origin} ${n}${e.minimum.toString()} ist`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Ungültiger String: muss mit "${t.prefix}" beginnen` : t.format === `ends_with` ? `Ungültiger String: muss mit "${t.suffix}" enden` : t.format === `includes` ? `Ungültiger String: muss "${t.includes}" enthalten` : t.format === `regex` ? `Ungültiger String: muss dem Muster ${t.pattern} entsprechen` : `Ungültig: ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Ungültige Zahl: muss ein Vielfaches von ${e.divisor} sein`;
			case `unrecognized_keys`: return `${e.keys.length > 1 ? `Unbekannte Schlüssel` : `Unbekannter Schlüssel`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Ungültiger Schlüssel in ${e.origin}`;
			case `invalid_union`: return `Ungültige Eingabe`;
			case `invalid_element`: return `Ungültiger Wert in ${e.origin}`;
			default: return `Ungültige Eingabe`;
		}
	};
};
function Xi$1() {
	return { localeError: Yi$1() };
}
const Zi$1 = () => {
	let e = {
		string: {
			unit: `χαρακτήρες`,
			verb: `να έχει`
		},
		file: {
			unit: `bytes`,
			verb: `να έχει`
		},
		array: {
			unit: `στοιχεία`,
			verb: `να έχει`
		},
		set: {
			unit: `στοιχεία`,
			verb: `να έχει`
		},
		map: {
			unit: `καταχωρήσεις`,
			verb: `να έχει`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `είσοδος`,
		email: `διεύθυνση email`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO ημερομηνία και ώρα`,
		date: `ISO ημερομηνία`,
		time: `ISO ώρα`,
		duration: `ISO διάρκεια`,
		ipv4: `διεύθυνση IPv4`,
		ipv6: `διεύθυνση IPv6`,
		mac: `διεύθυνση MAC`,
		cidrv4: `εύρος IPv4`,
		cidrv6: `εύρος IPv6`,
		base64: `συμβολοσειρά κωδικοποιημένη σε base64`,
		base64url: `συμβολοσειρά κωδικοποιημένη σε base64url`,
		json_string: `συμβολοσειρά JSON`,
		e164: `αριθμός E.164`,
		jwt: `JWT`,
		template_literal: `είσοδος`
	}, r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return typeof e.expected == `string` && /^[A-Z]/.test(e.expected) ? `Μη έγκυρη είσοδος: αναμενόταν instanceof ${e.expected}, λήφθηκε ${i}` : `Μη έγκυρη είσοδος: αναμενόταν ${t}, λήφθηκε ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Μη έγκυρη είσοδος: αναμενόταν ${T$2(e.values[0])}` : `Μη έγκυρη επιλογή: αναμενόταν ένα από ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Πολύ μεγάλο: αναμενόταν ${e.origin ?? `τιμή`} να έχει ${n}${e.maximum.toString()} ${r.unit ?? `στοιχεία`}` : `Πολύ μεγάλο: αναμενόταν ${e.origin ?? `τιμή`} να είναι ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Πολύ μικρό: αναμενόταν ${e.origin} να έχει ${n}${e.minimum.toString()} ${r.unit}` : `Πολύ μικρό: αναμενόταν ${e.origin} να είναι ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Μη έγκυρη συμβολοσειρά: πρέπει να ξεκινά με "${t.prefix}"` : t.format === `ends_with` ? `Μη έγκυρη συμβολοσειρά: πρέπει να τελειώνει με "${t.suffix}"` : t.format === `includes` ? `Μη έγκυρη συμβολοσειρά: πρέπει να περιέχει "${t.includes}"` : t.format === `regex` ? `Μη έγκυρη συμβολοσειρά: πρέπει να ταιριάζει με το μοτίβο ${t.pattern}` : `Μη έγκυρο: ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Μη έγκυρος αριθμός: πρέπει να είναι πολλαπλάσιο του ${e.divisor}`;
			case `unrecognized_keys`: return `Άγνωστ${e.keys.length > 1 ? `α` : `ο`} κλειδ${e.keys.length > 1 ? `ιά` : `ί`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Μη έγκυρο κλειδί στο ${e.origin}`;
			case `invalid_union`: return `Μη έγκυρη είσοδος`;
			case `invalid_element`: return `Μη έγκυρη τιμή στο ${e.origin}`;
			default: return `Μη έγκυρη είσοδος`;
		}
	};
};
function Qi$1() {
	return { localeError: Zi$1() };
}
const $i$1 = () => {
	let e = {
		string: {
			unit: `characters`,
			verb: `to have`
		},
		file: {
			unit: `bytes`,
			verb: `to have`
		},
		array: {
			unit: `items`,
			verb: `to have`
		},
		set: {
			unit: `items`,
			verb: `to have`
		},
		map: {
			unit: `entries`,
			verb: `to have`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `input`,
		email: `email address`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO datetime`,
		date: `ISO date`,
		time: `ISO time`,
		duration: `ISO duration`,
		ipv4: `IPv4 address`,
		ipv6: `IPv6 address`,
		mac: `MAC address`,
		cidrv4: `IPv4 range`,
		cidrv6: `IPv6 range`,
		base64: `base64-encoded string`,
		base64url: `base64url-encoded string`,
		json_string: `JSON string`,
		e164: `E.164 number`,
		jwt: `JWT`,
		template_literal: `input`
	}, r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input);
				return `Invalid input: expected ${t}, received ${r[n] ?? n}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Invalid input: expected ${T$2(e.values[0])}` : `Invalid option: expected one of ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Too big: expected ${e.origin ?? `value`} to have ${n}${e.maximum.toString()} ${r.unit ?? `elements`}` : `Too big: expected ${e.origin ?? `value`} to be ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}` : `Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Invalid string: must start with "${t.prefix}"` : t.format === `ends_with` ? `Invalid string: must end with "${t.suffix}"` : t.format === `includes` ? `Invalid string: must include "${t.includes}"` : t.format === `regex` ? `Invalid string: must match pattern ${t.pattern}` : `Invalid ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Invalid number: must be a multiple of ${e.divisor}`;
			case `unrecognized_keys`: return `Unrecognized key${e.keys.length > 1 ? `s` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Invalid key in ${e.origin}`;
			case `invalid_union`: return e.options && Array.isArray(e.options) && e.options.length > 0 ? `Invalid discriminator value. Expected ${e.options.map((e) => `'${e}'`).join(` | `)}` : `Invalid input`;
			case `invalid_element`: return `Invalid value in ${e.origin}`;
			default: return `Invalid input`;
		}
	};
};
function ea$1() {
	return { localeError: $i$1() };
}
const ta$1 = () => {
	let e = {
		string: {
			unit: `karaktrojn`,
			verb: `havi`
		},
		file: {
			unit: `bajtojn`,
			verb: `havi`
		},
		array: {
			unit: `elementojn`,
			verb: `havi`
		},
		set: {
			unit: `elementojn`,
			verb: `havi`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `enigo`,
		email: `retadreso`,
		url: `URL`,
		emoji: `emoĝio`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO-datotempo`,
		date: `ISO-dato`,
		time: `ISO-tempo`,
		duration: `ISO-daŭro`,
		ipv4: `IPv4-adreso`,
		ipv6: `IPv6-adreso`,
		cidrv4: `IPv4-rango`,
		cidrv6: `IPv6-rango`,
		base64: `64-ume kodita karaktraro`,
		base64url: `URL-64-ume kodita karaktraro`,
		json_string: `JSON-karaktraro`,
		e164: `E.164-nombro`,
		jwt: `JWT`,
		template_literal: `enigo`
	}, r = {
		nan: `NaN`,
		number: `nombro`,
		array: `tabelo`,
		null: `senvalora`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Nevalida enigo: atendiĝis instanceof ${e.expected}, riceviĝis ${i}` : `Nevalida enigo: atendiĝis ${t}, riceviĝis ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Nevalida enigo: atendiĝis ${T$2(e.values[0])}` : `Nevalida opcio: atendiĝis unu el ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Tro granda: atendiĝis ke ${e.origin ?? `valoro`} havu ${n}${e.maximum.toString()} ${r.unit ?? `elementojn`}` : `Tro granda: atendiĝis ke ${e.origin ?? `valoro`} havu ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Tro malgranda: atendiĝis ke ${e.origin} havu ${n}${e.minimum.toString()} ${r.unit}` : `Tro malgranda: atendiĝis ke ${e.origin} estu ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Nevalida karaktraro: devas komenciĝi per "${t.prefix}"` : t.format === `ends_with` ? `Nevalida karaktraro: devas finiĝi per "${t.suffix}"` : t.format === `includes` ? `Nevalida karaktraro: devas inkluzivi "${t.includes}"` : t.format === `regex` ? `Nevalida karaktraro: devas kongrui kun la modelo ${t.pattern}` : `Nevalida ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Nevalida nombro: devas esti oblo de ${e.divisor}`;
			case `unrecognized_keys`: return `Nekonata${e.keys.length > 1 ? `j` : ``} ŝlosilo${e.keys.length > 1 ? `j` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Nevalida ŝlosilo en ${e.origin}`;
			case `invalid_union`: return `Nevalida enigo`;
			case `invalid_element`: return `Nevalida valoro en ${e.origin}`;
			default: return `Nevalida enigo`;
		}
	};
};
function na$1() {
	return { localeError: ta$1() };
}
const ra$1 = () => {
	let e = {
		string: {
			unit: `caracteres`,
			verb: `tener`
		},
		file: {
			unit: `bytes`,
			verb: `tener`
		},
		array: {
			unit: `elementos`,
			verb: `tener`
		},
		set: {
			unit: `elementos`,
			verb: `tener`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `entrada`,
		email: `dirección de correo electrónico`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `fecha y hora ISO`,
		date: `fecha ISO`,
		time: `hora ISO`,
		duration: `duración ISO`,
		ipv4: `dirección IPv4`,
		ipv6: `dirección IPv6`,
		cidrv4: `rango IPv4`,
		cidrv6: `rango IPv6`,
		base64: `cadena codificada en base64`,
		base64url: `URL codificada en base64`,
		json_string: `cadena JSON`,
		e164: `número E.164`,
		jwt: `JWT`,
		template_literal: `entrada`
	}, r = {
		nan: `NaN`,
		string: `texto`,
		number: `número`,
		boolean: `booleano`,
		array: `arreglo`,
		object: `objeto`,
		set: `conjunto`,
		file: `archivo`,
		date: `fecha`,
		bigint: `número grande`,
		symbol: `símbolo`,
		undefined: `indefinido`,
		null: `nulo`,
		function: `función`,
		map: `mapa`,
		record: `registro`,
		tuple: `tupla`,
		enum: `enumeración`,
		union: `unión`,
		literal: `literal`,
		promise: `promesa`,
		void: `vacío`,
		never: `nunca`,
		unknown: `desconocido`,
		any: `cualquiera`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Entrada inválida: se esperaba instanceof ${e.expected}, recibido ${i}` : `Entrada inválida: se esperaba ${t}, recibido ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Entrada inválida: se esperaba ${T$2(e.values[0])}` : `Opción inválida: se esperaba una de ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, i = t(e.origin), a = r[e.origin] ?? e.origin;
				return i ? `Demasiado grande: se esperaba que ${a ?? `valor`} tuviera ${n}${e.maximum.toString()} ${i.unit ?? `elementos`}` : `Demasiado grande: se esperaba que ${a ?? `valor`} fuera ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, i = t(e.origin), a = r[e.origin] ?? e.origin;
				return i ? `Demasiado pequeño: se esperaba que ${a} tuviera ${n}${e.minimum.toString()} ${i.unit}` : `Demasiado pequeño: se esperaba que ${a} fuera ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Cadena inválida: debe comenzar con "${t.prefix}"` : t.format === `ends_with` ? `Cadena inválida: debe terminar en "${t.suffix}"` : t.format === `includes` ? `Cadena inválida: debe incluir "${t.includes}"` : t.format === `regex` ? `Cadena inválida: debe coincidir con el patrón ${t.pattern}` : `Inválido ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Número inválido: debe ser múltiplo de ${e.divisor}`;
			case `unrecognized_keys`: return `Llave${e.keys.length > 1 ? `s` : ``} desconocida${e.keys.length > 1 ? `s` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Llave inválida en ${r[e.origin] ?? e.origin}`;
			case `invalid_union`: return `Entrada inválida`;
			case `invalid_element`: return `Valor inválido en ${r[e.origin] ?? e.origin}`;
			default: return `Entrada inválida`;
		}
	};
};
function ia$1() {
	return { localeError: ra$1() };
}
const aa$1 = () => {
	let e = {
		string: {
			unit: `کاراکتر`,
			verb: `داشته باشد`
		},
		file: {
			unit: `بایت`,
			verb: `داشته باشد`
		},
		array: {
			unit: `آیتم`,
			verb: `داشته باشد`
		},
		set: {
			unit: `آیتم`,
			verb: `داشته باشد`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `ورودی`,
		email: `آدرس ایمیل`,
		url: `URL`,
		emoji: `ایموجی`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `تاریخ و زمان ایزو`,
		date: `تاریخ ایزو`,
		time: `زمان ایزو`,
		duration: `مدت زمان ایزو`,
		ipv4: `IPv4 آدرس`,
		ipv6: `IPv6 آدرس`,
		cidrv4: `IPv4 دامنه`,
		cidrv6: `IPv6 دامنه`,
		base64: `base64-encoded رشته`,
		base64url: `base64url-encoded رشته`,
		json_string: `JSON رشته`,
		e164: `E.164 عدد`,
		jwt: `JWT`,
		template_literal: `ورودی`
	}, r = {
		nan: `NaN`,
		number: `عدد`,
		array: `آرایه`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `ورودی نامعتبر: می‌بایست instanceof ${e.expected} می‌بود، ${i} دریافت شد` : `ورودی نامعتبر: می‌بایست ${t} می‌بود، ${i} دریافت شد`;
			}
			case `invalid_value`: return e.values.length === 1 ? `ورودی نامعتبر: می‌بایست ${T$2(e.values[0])} می‌بود` : `گزینه نامعتبر: می‌بایست یکی از ${m$2(e.values, `|`)} می‌بود`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `خیلی بزرگ: ${e.origin ?? `مقدار`} باید ${n}${e.maximum.toString()} ${r.unit ?? `عنصر`} باشد` : `خیلی بزرگ: ${e.origin ?? `مقدار`} باید ${n}${e.maximum.toString()} باشد`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `خیلی کوچک: ${e.origin} باید ${n}${e.minimum.toString()} ${r.unit} باشد` : `خیلی کوچک: ${e.origin} باید ${n}${e.minimum.toString()} باشد`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `رشته نامعتبر: باید با "${t.prefix}" شروع شود` : t.format === `ends_with` ? `رشته نامعتبر: باید با "${t.suffix}" تمام شود` : t.format === `includes` ? `رشته نامعتبر: باید شامل "${t.includes}" باشد` : t.format === `regex` ? `رشته نامعتبر: باید با الگوی ${t.pattern} مطابقت داشته باشد` : `${n[t.format] ?? e.format} نامعتبر`;
			}
			case `not_multiple_of`: return `عدد نامعتبر: باید مضرب ${e.divisor} باشد`;
			case `unrecognized_keys`: return `کلید${e.keys.length > 1 ? `های` : ``} ناشناس: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `کلید ناشناس در ${e.origin}`;
			case `invalid_union`: return `ورودی نامعتبر`;
			case `invalid_element`: return `مقدار نامعتبر در ${e.origin}`;
			default: return `ورودی نامعتبر`;
		}
	};
};
function oa$1() {
	return { localeError: aa$1() };
}
const sa$1 = () => {
	let e = {
		string: {
			unit: `merkkiä`,
			subject: `merkkijonon`
		},
		file: {
			unit: `tavua`,
			subject: `tiedoston`
		},
		array: {
			unit: `alkiota`,
			subject: `listan`
		},
		set: {
			unit: `alkiota`,
			subject: `joukon`
		},
		number: {
			unit: ``,
			subject: `luvun`
		},
		bigint: {
			unit: ``,
			subject: `suuren kokonaisluvun`
		},
		int: {
			unit: ``,
			subject: `kokonaisluvun`
		},
		date: {
			unit: ``,
			subject: `päivämäärän`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `säännöllinen lauseke`,
		email: `sähköpostiosoite`,
		url: `URL-osoite`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO-aikaleima`,
		date: `ISO-päivämäärä`,
		time: `ISO-aika`,
		duration: `ISO-kesto`,
		ipv4: `IPv4-osoite`,
		ipv6: `IPv6-osoite`,
		cidrv4: `IPv4-alue`,
		cidrv6: `IPv6-alue`,
		base64: `base64-koodattu merkkijono`,
		base64url: `base64url-koodattu merkkijono`,
		json_string: `JSON-merkkijono`,
		e164: `E.164-luku`,
		jwt: `JWT`,
		template_literal: `templaattimerkkijono`
	}, r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Virheellinen tyyppi: odotettiin instanceof ${e.expected}, oli ${i}` : `Virheellinen tyyppi: odotettiin ${t}, oli ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Virheellinen syöte: täytyy olla ${T$2(e.values[0])}` : `Virheellinen valinta: täytyy olla yksi seuraavista: ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Liian suuri: ${r.subject} täytyy olla ${n}${e.maximum.toString()} ${r.unit}`.trim() : `Liian suuri: arvon täytyy olla ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Liian pieni: ${r.subject} täytyy olla ${n}${e.minimum.toString()} ${r.unit}`.trim() : `Liian pieni: arvon täytyy olla ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Virheellinen syöte: täytyy alkaa "${t.prefix}"` : t.format === `ends_with` ? `Virheellinen syöte: täytyy loppua "${t.suffix}"` : t.format === `includes` ? `Virheellinen syöte: täytyy sisältää "${t.includes}"` : t.format === `regex` ? `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${t.pattern}` : `Virheellinen ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Virheellinen luku: täytyy olla luvun ${e.divisor} monikerta`;
			case `unrecognized_keys`: return `${e.keys.length > 1 ? `Tuntemattomat avaimet` : `Tuntematon avain`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Virheellinen avain tietueessa`;
			case `invalid_union`: return `Virheellinen unioni`;
			case `invalid_element`: return `Virheellinen arvo joukossa`;
			default: return `Virheellinen syöte`;
		}
	};
};
function ca$1() {
	return { localeError: sa$1() };
}
const la$1 = () => {
	let e = {
		string: {
			unit: `caractères`,
			verb: `avoir`
		},
		file: {
			unit: `octets`,
			verb: `avoir`
		},
		array: {
			unit: `éléments`,
			verb: `avoir`
		},
		set: {
			unit: `éléments`,
			verb: `avoir`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `entrée`,
		email: `adresse e-mail`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `date et heure ISO`,
		date: `date ISO`,
		time: `heure ISO`,
		duration: `durée ISO`,
		ipv4: `adresse IPv4`,
		ipv6: `adresse IPv6`,
		cidrv4: `plage IPv4`,
		cidrv6: `plage IPv6`,
		base64: `chaîne encodée en base64`,
		base64url: `chaîne encodée en base64url`,
		json_string: `chaîne JSON`,
		e164: `numéro E.164`,
		jwt: `JWT`,
		template_literal: `entrée`
	}, r = {
		string: `chaîne`,
		number: `nombre`,
		int: `entier`,
		boolean: `booléen`,
		bigint: `grand entier`,
		symbol: `symbole`,
		undefined: `indéfini`,
		null: `null`,
		never: `jamais`,
		void: `vide`,
		date: `date`,
		array: `tableau`,
		object: `objet`,
		tuple: `tuple`,
		record: `enregistrement`,
		map: `carte`,
		set: `ensemble`,
		file: `fichier`,
		nonoptional: `non-optionnel`,
		nan: `NaN`,
		function: `fonction`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Entrée invalide : instanceof ${e.expected} attendu, ${i} reçu` : `Entrée invalide : ${t} attendu, ${i} reçu`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Entrée invalide : ${T$2(e.values[0])} attendu` : `Option invalide : une valeur parmi ${m$2(e.values, `|`)} attendue`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, i = t(e.origin);
				return i ? `Trop grand : ${r[e.origin] ?? `valeur`} doit ${i.verb} ${n}${e.maximum.toString()} ${i.unit ?? `élément(s)`}` : `Trop grand : ${r[e.origin] ?? `valeur`} doit être ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, i = t(e.origin);
				return i ? `Trop petit : ${r[e.origin] ?? `valeur`} doit ${i.verb} ${n}${e.minimum.toString()} ${i.unit}` : `Trop petit : ${r[e.origin] ?? `valeur`} doit être ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Chaîne invalide : doit commencer par "${t.prefix}"` : t.format === `ends_with` ? `Chaîne invalide : doit se terminer par "${t.suffix}"` : t.format === `includes` ? `Chaîne invalide : doit inclure "${t.includes}"` : t.format === `regex` ? `Chaîne invalide : doit correspondre au modèle ${t.pattern}` : `${n[t.format] ?? e.format} invalide`;
			}
			case `not_multiple_of`: return `Nombre invalide : doit être un multiple de ${e.divisor}`;
			case `unrecognized_keys`: return `Clé${e.keys.length > 1 ? `s` : ``} non reconnue${e.keys.length > 1 ? `s` : ``} : ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Clé invalide dans ${e.origin}`;
			case `invalid_union`: return `Entrée invalide`;
			case `invalid_element`: return `Valeur invalide dans ${e.origin}`;
			default: return `Entrée invalide`;
		}
	};
};
function ua$1() {
	return { localeError: la$1() };
}
const da$1 = () => {
	let e = {
		string: {
			unit: `caractères`,
			verb: `avoir`
		},
		file: {
			unit: `octets`,
			verb: `avoir`
		},
		array: {
			unit: `éléments`,
			verb: `avoir`
		},
		set: {
			unit: `éléments`,
			verb: `avoir`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `entrée`,
		email: `adresse courriel`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `date-heure ISO`,
		date: `date ISO`,
		time: `heure ISO`,
		duration: `durée ISO`,
		ipv4: `adresse IPv4`,
		ipv6: `adresse IPv6`,
		cidrv4: `plage IPv4`,
		cidrv6: `plage IPv6`,
		base64: `chaîne encodée en base64`,
		base64url: `chaîne encodée en base64url`,
		json_string: `chaîne JSON`,
		e164: `numéro E.164`,
		jwt: `JWT`,
		template_literal: `entrée`
	}, r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Entrée invalide : attendu instanceof ${e.expected}, reçu ${i}` : `Entrée invalide : attendu ${t}, reçu ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Entrée invalide : attendu ${T$2(e.values[0])}` : `Option invalide : attendu l'une des valeurs suivantes ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `≤` : `<`, r = t(e.origin);
				return r ? `Trop grand : attendu que ${e.origin ?? `la valeur`} ait ${n}${e.maximum.toString()} ${r.unit}` : `Trop grand : attendu que ${e.origin ?? `la valeur`} soit ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `≥` : `>`, r = t(e.origin);
				return r ? `Trop petit : attendu que ${e.origin} ait ${n}${e.minimum.toString()} ${r.unit}` : `Trop petit : attendu que ${e.origin} soit ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Chaîne invalide : doit commencer par "${t.prefix}"` : t.format === `ends_with` ? `Chaîne invalide : doit se terminer par "${t.suffix}"` : t.format === `includes` ? `Chaîne invalide : doit inclure "${t.includes}"` : t.format === `regex` ? `Chaîne invalide : doit correspondre au motif ${t.pattern}` : `${n[t.format] ?? e.format} invalide`;
			}
			case `not_multiple_of`: return `Nombre invalide : doit être un multiple de ${e.divisor}`;
			case `unrecognized_keys`: return `Clé${e.keys.length > 1 ? `s` : ``} non reconnue${e.keys.length > 1 ? `s` : ``} : ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Clé invalide dans ${e.origin}`;
			case `invalid_union`: return `Entrée invalide`;
			case `invalid_element`: return `Valeur invalide dans ${e.origin}`;
			default: return `Entrée invalide`;
		}
	};
};
function fa$1() {
	return { localeError: da$1() };
}
const pa$1 = () => {
	let e = {
		string: {
			label: `מחרוזת`,
			gender: `f`
		},
		number: {
			label: `מספר`,
			gender: `m`
		},
		boolean: {
			label: `ערך בוליאני`,
			gender: `m`
		},
		bigint: {
			label: `BigInt`,
			gender: `m`
		},
		date: {
			label: `תאריך`,
			gender: `m`
		},
		array: {
			label: `מערך`,
			gender: `m`
		},
		object: {
			label: `אובייקט`,
			gender: `m`
		},
		null: {
			label: `ערך ריק (null)`,
			gender: `m`
		},
		undefined: {
			label: `ערך לא מוגדר (undefined)`,
			gender: `m`
		},
		symbol: {
			label: `סימבול (Symbol)`,
			gender: `m`
		},
		function: {
			label: `פונקציה`,
			gender: `f`
		},
		map: {
			label: `מפה (Map)`,
			gender: `f`
		},
		set: {
			label: `קבוצה (Set)`,
			gender: `f`
		},
		file: {
			label: `קובץ`,
			gender: `m`
		},
		promise: {
			label: `Promise`,
			gender: `m`
		},
		NaN: {
			label: `NaN`,
			gender: `m`
		},
		unknown: {
			label: `ערך לא ידוע`,
			gender: `m`
		},
		value: {
			label: `ערך`,
			gender: `m`
		}
	}, t = {
		string: {
			unit: `תווים`,
			shortLabel: `קצר`,
			longLabel: `ארוך`
		},
		file: {
			unit: `בייטים`,
			shortLabel: `קטן`,
			longLabel: `גדול`
		},
		array: {
			unit: `פריטים`,
			shortLabel: `קטן`,
			longLabel: `גדול`
		},
		set: {
			unit: `פריטים`,
			shortLabel: `קטן`,
			longLabel: `גדול`
		},
		number: {
			unit: ``,
			shortLabel: `קטן`,
			longLabel: `גדול`
		}
	}, n = (t) => t ? e[t] : void 0, r = (t) => {
		let r = n(t);
		return r ? r.label : t ?? e.unknown.label;
	}, i = (e) => `ה${r(e)}`, a = (e) => (n(e)?.gender ?? `m`) === `f` ? `צריכה להיות` : `צריך להיות`, o = (e) => e ? t[e] ?? null : null, s = {
		regex: {
			label: `קלט`,
			gender: `m`
		},
		email: {
			label: `כתובת אימייל`,
			gender: `f`
		},
		url: {
			label: `כתובת רשת`,
			gender: `f`
		},
		emoji: {
			label: `אימוג'י`,
			gender: `m`
		},
		uuid: {
			label: `UUID`,
			gender: `m`
		},
		nanoid: {
			label: `nanoid`,
			gender: `m`
		},
		guid: {
			label: `GUID`,
			gender: `m`
		},
		cuid: {
			label: `cuid`,
			gender: `m`
		},
		cuid2: {
			label: `cuid2`,
			gender: `m`
		},
		ulid: {
			label: `ULID`,
			gender: `m`
		},
		xid: {
			label: `XID`,
			gender: `m`
		},
		ksuid: {
			label: `KSUID`,
			gender: `m`
		},
		datetime: {
			label: `תאריך וזמן ISO`,
			gender: `m`
		},
		date: {
			label: `תאריך ISO`,
			gender: `m`
		},
		time: {
			label: `זמן ISO`,
			gender: `m`
		},
		duration: {
			label: `משך זמן ISO`,
			gender: `m`
		},
		ipv4: {
			label: `כתובת IPv4`,
			gender: `f`
		},
		ipv6: {
			label: `כתובת IPv6`,
			gender: `f`
		},
		cidrv4: {
			label: `טווח IPv4`,
			gender: `m`
		},
		cidrv6: {
			label: `טווח IPv6`,
			gender: `m`
		},
		base64: {
			label: `מחרוזת בבסיס 64`,
			gender: `f`
		},
		base64url: {
			label: `מחרוזת בבסיס 64 לכתובות רשת`,
			gender: `f`
		},
		json_string: {
			label: `מחרוזת JSON`,
			gender: `f`
		},
		e164: {
			label: `מספר E.164`,
			gender: `m`
		},
		jwt: {
			label: `JWT`,
			gender: `m`
		},
		ends_with: {
			label: `קלט`,
			gender: `m`
		},
		includes: {
			label: `קלט`,
			gender: `m`
		},
		lowercase: {
			label: `קלט`,
			gender: `m`
		},
		starts_with: {
			label: `קלט`,
			gender: `m`
		},
		uppercase: {
			label: `קלט`,
			gender: `m`
		}
	}, c = { nan: `NaN` };
	return (t) => {
		switch (t.code) {
			case `invalid_type`: {
				let n = t.expected, i = c[n ?? ``] ?? r(n), a = A$1(t.input), o = c[a] ?? e[a]?.label ?? a;
				return /^[A-Z]/.test(t.expected) ? `קלט לא תקין: צריך להיות instanceof ${t.expected}, התקבל ${o}` : `קלט לא תקין: צריך להיות ${i}, התקבל ${o}`;
			}
			case `invalid_value`: {
				if (t.values.length === 1) return `ערך לא תקין: הערך חייב להיות ${T$2(t.values[0])}`;
				let e = t.values.map((e) => T$2(e));
				if (t.values.length === 2) return `ערך לא תקין: האפשרויות המתאימות הן ${e[0]} או ${e[1]}`;
				let n = e[e.length - 1];
				return `ערך לא תקין: האפשרויות המתאימות הן ${e.slice(0, -1).join(`, `)} או ${n}`;
			}
			case `too_big`: {
				let e = o(t.origin), n = i(t.origin ?? `value`);
				if (t.origin === `string`) return `${e?.longLabel ?? `ארוך`} מדי: ${n} צריכה להכיל ${t.maximum.toString()} ${e?.unit ?? ``} ${t.inclusive ? `או פחות` : `לכל היותר`}`.trim();
				if (t.origin === `number`) return `גדול מדי: ${n} צריך להיות ${t.inclusive ? `קטן או שווה ל-${t.maximum}` : `קטן מ-${t.maximum}`}`;
				if (t.origin === `array` || t.origin === `set`) return `גדול מדי: ${n} ${t.origin === `set` ? `צריכה` : `צריך`} להכיל ${t.inclusive ? `${t.maximum} ${e?.unit ?? ``} או פחות` : `פחות מ-${t.maximum} ${e?.unit ?? ``}`}`.trim();
				let r = t.inclusive ? `<=` : `<`, s = a(t.origin ?? `value`);
				return e?.unit ? `${e.longLabel} מדי: ${n} ${s} ${r}${t.maximum.toString()} ${e.unit}` : `${e?.longLabel ?? `גדול`} מדי: ${n} ${s} ${r}${t.maximum.toString()}`;
			}
			case `too_small`: {
				let e = o(t.origin), n = i(t.origin ?? `value`);
				if (t.origin === `string`) return `${e?.shortLabel ?? `קצר`} מדי: ${n} צריכה להכיל ${t.minimum.toString()} ${e?.unit ?? ``} ${t.inclusive ? `או יותר` : `לפחות`}`.trim();
				if (t.origin === `number`) return `קטן מדי: ${n} צריך להיות ${t.inclusive ? `גדול או שווה ל-${t.minimum}` : `גדול מ-${t.minimum}`}`;
				if (t.origin === `array` || t.origin === `set`) {
					let r = t.origin === `set` ? `צריכה` : `צריך`;
					return t.minimum === 1 && t.inclusive ? `קטן מדי: ${n} ${r} להכיל ${t.origin, `לפחות פריט אחד`}` : `קטן מדי: ${n} ${r} להכיל ${t.inclusive ? `${t.minimum} ${e?.unit ?? ``} או יותר` : `יותר מ-${t.minimum} ${e?.unit ?? ``}`}`.trim();
				}
				let r = t.inclusive ? `>=` : `>`, s = a(t.origin ?? `value`);
				return e?.unit ? `${e.shortLabel} מדי: ${n} ${s} ${r}${t.minimum.toString()} ${e.unit}` : `${e?.shortLabel ?? `קטן`} מדי: ${n} ${s} ${r}${t.minimum.toString()}`;
			}
			case `invalid_format`: {
				let e = t;
				if (e.format === `starts_with`) return `המחרוזת חייבת להתחיל ב "${e.prefix}"`;
				if (e.format === `ends_with`) return `המחרוזת חייבת להסתיים ב "${e.suffix}"`;
				if (e.format === `includes`) return `המחרוזת חייבת לכלול "${e.includes}"`;
				if (e.format === `regex`) return `המחרוזת חייבת להתאים לתבנית ${e.pattern}`;
				let n = s[e.format];
				return `${n?.label ?? e.format} לא ${(n?.gender ?? `m`) === `f` ? `תקינה` : `תקין`}`;
			}
			case `not_multiple_of`: return `מספר לא תקין: חייב להיות מכפלה של ${t.divisor}`;
			case `unrecognized_keys`: return `מפתח${t.keys.length > 1 ? `ות` : ``} לא מזוה${t.keys.length > 1 ? `ים` : `ה`}: ${m$2(t.keys, `, `)}`;
			case `invalid_key`: return `שדה לא תקין באובייקט`;
			case `invalid_union`: return `קלט לא תקין`;
			case `invalid_element`: return `ערך לא תקין ב${i(t.origin ?? `array`)}`;
			default: return `קלט לא תקין`;
		}
	};
};
function ma$1() {
	return { localeError: pa$1() };
}
const ha$1 = () => {
	let e = {
		string: {
			unit: `znakova`,
			verb: `imati`
		},
		file: {
			unit: `bajtova`,
			verb: `imati`
		},
		array: {
			unit: `stavki`,
			verb: `imati`
		},
		set: {
			unit: `stavki`,
			verb: `imati`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `unos`,
		email: `email adresa`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO datum i vrijeme`,
		date: `ISO datum`,
		time: `ISO vrijeme`,
		duration: `ISO trajanje`,
		ipv4: `IPv4 adresa`,
		ipv6: `IPv6 adresa`,
		cidrv4: `IPv4 raspon`,
		cidrv6: `IPv6 raspon`,
		base64: `base64 kodirani tekst`,
		base64url: `base64url kodirani tekst`,
		json_string: `JSON tekst`,
		e164: `E.164 broj`,
		jwt: `JWT`,
		template_literal: `unos`
	}, r = {
		nan: `NaN`,
		string: `tekst`,
		number: `broj`,
		boolean: `boolean`,
		array: `niz`,
		object: `objekt`,
		set: `skup`,
		file: `datoteka`,
		date: `datum`,
		bigint: `bigint`,
		symbol: `simbol`,
		undefined: `undefined`,
		null: `null`,
		function: `funkcija`,
		map: `mapa`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Neispravan unos: očekuje se instanceof ${e.expected}, a primljeno je ${i}` : `Neispravan unos: očekuje se ${t}, a primljeno je ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Neispravna vrijednost: očekivano ${T$2(e.values[0])}` : `Neispravna opcija: očekivano jedno od ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, i = t(e.origin), a = r[e.origin] ?? e.origin;
				return i ? `Preveliko: očekivano da ${a ?? `vrijednost`} ima ${n}${e.maximum.toString()} ${i.unit ?? `elemenata`}` : `Preveliko: očekivano da ${a ?? `vrijednost`} bude ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, i = t(e.origin), a = r[e.origin] ?? e.origin;
				return i ? `Premalo: očekivano da ${a} ima ${n}${e.minimum.toString()} ${i.unit}` : `Premalo: očekivano da ${a} bude ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Neispravan tekst: mora započinjati s "${t.prefix}"` : t.format === `ends_with` ? `Neispravan tekst: mora završavati s "${t.suffix}"` : t.format === `includes` ? `Neispravan tekst: mora sadržavati "${t.includes}"` : t.format === `regex` ? `Neispravan tekst: mora odgovarati uzorku ${t.pattern}` : `Neispravna ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Neispravan broj: mora biti višekratnik od ${e.divisor}`;
			case `unrecognized_keys`: return `Neprepoznat${e.keys.length > 1 ? `i ključevi` : ` ključ`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Neispravan ključ u ${r[e.origin] ?? e.origin}`;
			case `invalid_union`: return `Neispravan unos`;
			case `invalid_element`: return `Neispravna vrijednost u ${r[e.origin] ?? e.origin}`;
			default: return `Neispravan unos`;
		}
	};
};
function ga$1() {
	return { localeError: ha$1() };
}
const _a$1 = () => {
	let e = {
		string: {
			unit: `karakter`,
			verb: `legyen`
		},
		file: {
			unit: `byte`,
			verb: `legyen`
		},
		array: {
			unit: `elem`,
			verb: `legyen`
		},
		set: {
			unit: `elem`,
			verb: `legyen`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `bemenet`,
		email: `email cím`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO időbélyeg`,
		date: `ISO dátum`,
		time: `ISO idő`,
		duration: `ISO időintervallum`,
		ipv4: `IPv4 cím`,
		ipv6: `IPv6 cím`,
		cidrv4: `IPv4 tartomány`,
		cidrv6: `IPv6 tartomány`,
		base64: `base64-kódolt string`,
		base64url: `base64url-kódolt string`,
		json_string: `JSON string`,
		e164: `E.164 szám`,
		jwt: `JWT`,
		template_literal: `bemenet`
	}, r = {
		nan: `NaN`,
		number: `szám`,
		array: `tömb`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Érvénytelen bemenet: a várt érték instanceof ${e.expected}, a kapott érték ${i}` : `Érvénytelen bemenet: a várt érték ${t}, a kapott érték ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Érvénytelen bemenet: a várt érték ${T$2(e.values[0])}` : `Érvénytelen opció: valamelyik érték várt ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Túl nagy: ${e.origin ?? `érték`} mérete túl nagy ${n}${e.maximum.toString()} ${r.unit ?? `elem`}` : `Túl nagy: a bemeneti érték ${e.origin ?? `érték`} túl nagy: ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Túl kicsi: a bemeneti érték ${e.origin} mérete túl kicsi ${n}${e.minimum.toString()} ${r.unit}` : `Túl kicsi: a bemeneti érték ${e.origin} túl kicsi ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Érvénytelen string: "${t.prefix}" értékkel kell kezdődnie` : t.format === `ends_with` ? `Érvénytelen string: "${t.suffix}" értékkel kell végződnie` : t.format === `includes` ? `Érvénytelen string: "${t.includes}" értéket kell tartalmaznia` : t.format === `regex` ? `Érvénytelen string: ${t.pattern} mintának kell megfelelnie` : `Érvénytelen ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Érvénytelen szám: ${e.divisor} többszörösének kell lennie`;
			case `unrecognized_keys`: return `Ismeretlen kulcs${e.keys.length > 1 ? `s` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Érvénytelen kulcs ${e.origin}`;
			case `invalid_union`: return `Érvénytelen bemenet`;
			case `invalid_element`: return `Érvénytelen érték: ${e.origin}`;
			default: return `Érvénytelen bemenet`;
		}
	};
};
function va$1() {
	return { localeError: _a$1() };
}
function ya$1(e, t, n) {
	return Math.abs(e) === 1 ? t : n;
}
function G$1(e) {
	if (!e) return ``;
	let t = [
		`ա`,
		`ե`,
		`ը`,
		`ի`,
		`ո`,
		`ու`,
		`օ`
	], n = e[e.length - 1];
	return e + (t.includes(n) ? `ն` : `ը`);
}
const ba$1 = () => {
	let e = {
		string: {
			unit: {
				one: `նշան`,
				many: `նշաններ`
			},
			verb: `ունենալ`
		},
		file: {
			unit: {
				one: `բայթ`,
				many: `բայթեր`
			},
			verb: `ունենալ`
		},
		array: {
			unit: {
				one: `տարր`,
				many: `տարրեր`
			},
			verb: `ունենալ`
		},
		set: {
			unit: {
				one: `տարր`,
				many: `տարրեր`
			},
			verb: `ունենալ`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `մուտք`,
		email: `էլ. հասցե`,
		url: `URL`,
		emoji: `էմոջի`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO ամսաթիվ և ժամ`,
		date: `ISO ամսաթիվ`,
		time: `ISO ժամ`,
		duration: `ISO տևողություն`,
		ipv4: `IPv4 հասցե`,
		ipv6: `IPv6 հասցե`,
		cidrv4: `IPv4 միջակայք`,
		cidrv6: `IPv6 միջակայք`,
		base64: `base64 ձևաչափով տող`,
		base64url: `base64url ձևաչափով տող`,
		json_string: `JSON տող`,
		e164: `E.164 համար`,
		jwt: `JWT`,
		template_literal: `մուտք`
	}, r = {
		nan: `NaN`,
		number: `թիվ`,
		array: `զանգված`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Սխալ մուտքագրում․ սպասվում էր instanceof ${e.expected}, ստացվել է ${i}` : `Սխալ մուտքագրում․ սպասվում էր ${t}, ստացվել է ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Սխալ մուտքագրում․ սպասվում էր ${T$2(e.values[1])}` : `Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				if (r) {
					let t = ya$1(Number(e.maximum), r.unit.one, r.unit.many);
					return `Չափազանց մեծ արժեք․ սպասվում է, որ ${G$1(e.origin ?? `արժեք`)} կունենա ${n}${e.maximum.toString()} ${t}`;
				}
				return `Չափազանց մեծ արժեք․ սպասվում է, որ ${G$1(e.origin ?? `արժեք`)} լինի ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				if (r) {
					let t = ya$1(Number(e.minimum), r.unit.one, r.unit.many);
					return `Չափազանց փոքր արժեք․ սպասվում է, որ ${G$1(e.origin)} կունենա ${n}${e.minimum.toString()} ${t}`;
				}
				return `Չափազանց փոքր արժեք․ սպասվում է, որ ${G$1(e.origin)} լինի ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Սխալ տող․ պետք է սկսվի "${t.prefix}"-ով` : t.format === `ends_with` ? `Սխալ տող․ պետք է ավարտվի "${t.suffix}"-ով` : t.format === `includes` ? `Սխալ տող․ պետք է պարունակի "${t.includes}"` : t.format === `regex` ? `Սխալ տող․ պետք է համապատասխանի ${t.pattern} ձևաչափին` : `Սխալ ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Սխալ թիվ․ պետք է բազմապատիկ լինի ${e.divisor}-ի`;
			case `unrecognized_keys`: return `Չճանաչված բանալի${e.keys.length > 1 ? `ներ` : ``}. ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Սխալ բանալի ${G$1(e.origin)}-ում`;
			case `invalid_union`: return `Սխալ մուտքագրում`;
			case `invalid_element`: return `Սխալ արժեք ${G$1(e.origin)}-ում`;
			default: return `Սխալ մուտքագրում`;
		}
	};
};
function xa$1() {
	return { localeError: ba$1() };
}
const Sa$1 = () => {
	let e = {
		string: {
			unit: `karakter`,
			verb: `memiliki`
		},
		file: {
			unit: `byte`,
			verb: `memiliki`
		},
		array: {
			unit: `item`,
			verb: `memiliki`
		},
		set: {
			unit: `item`,
			verb: `memiliki`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `input`,
		email: `alamat email`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `tanggal dan waktu format ISO`,
		date: `tanggal format ISO`,
		time: `jam format ISO`,
		duration: `durasi format ISO`,
		ipv4: `alamat IPv4`,
		ipv6: `alamat IPv6`,
		cidrv4: `rentang alamat IPv4`,
		cidrv6: `rentang alamat IPv6`,
		base64: `string dengan enkode base64`,
		base64url: `string dengan enkode base64url`,
		json_string: `string JSON`,
		e164: `angka E.164`,
		jwt: `JWT`,
		template_literal: `input`
	}, r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Input tidak valid: diharapkan instanceof ${e.expected}, diterima ${i}` : `Input tidak valid: diharapkan ${t}, diterima ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Input tidak valid: diharapkan ${T$2(e.values[0])}` : `Pilihan tidak valid: diharapkan salah satu dari ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Terlalu besar: diharapkan ${e.origin ?? `value`} memiliki ${n}${e.maximum.toString()} ${r.unit ?? `elemen`}` : `Terlalu besar: diharapkan ${e.origin ?? `value`} menjadi ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Terlalu kecil: diharapkan ${e.origin} memiliki ${n}${e.minimum.toString()} ${r.unit}` : `Terlalu kecil: diharapkan ${e.origin} menjadi ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `String tidak valid: harus dimulai dengan "${t.prefix}"` : t.format === `ends_with` ? `String tidak valid: harus berakhir dengan "${t.suffix}"` : t.format === `includes` ? `String tidak valid: harus menyertakan "${t.includes}"` : t.format === `regex` ? `String tidak valid: harus sesuai pola ${t.pattern}` : `${n[t.format] ?? e.format} tidak valid`;
			}
			case `not_multiple_of`: return `Angka tidak valid: harus kelipatan dari ${e.divisor}`;
			case `unrecognized_keys`: return `Kunci tidak dikenali ${e.keys.length > 1 ? `s` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Kunci tidak valid di ${e.origin}`;
			case `invalid_union`: return `Input tidak valid`;
			case `invalid_element`: return `Nilai tidak valid di ${e.origin}`;
			default: return `Input tidak valid`;
		}
	};
};
function Ca$1() {
	return { localeError: Sa$1() };
}
const wa$1 = () => {
	let e = {
		string: {
			unit: `stafi`,
			verb: `að hafa`
		},
		file: {
			unit: `bæti`,
			verb: `að hafa`
		},
		array: {
			unit: `hluti`,
			verb: `að hafa`
		},
		set: {
			unit: `hluti`,
			verb: `að hafa`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `gildi`,
		email: `netfang`,
		url: `vefslóð`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO dagsetning og tími`,
		date: `ISO dagsetning`,
		time: `ISO tími`,
		duration: `ISO tímalengd`,
		ipv4: `IPv4 address`,
		ipv6: `IPv6 address`,
		cidrv4: `IPv4 range`,
		cidrv6: `IPv6 range`,
		base64: `base64-encoded strengur`,
		base64url: `base64url-encoded strengur`,
		json_string: `JSON strengur`,
		e164: `E.164 tölugildi`,
		jwt: `JWT`,
		template_literal: `gildi`
	}, r = {
		nan: `NaN`,
		number: `númer`,
		array: `fylki`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Rangt gildi: Þú slóst inn ${i} þar sem á að vera instanceof ${e.expected}` : `Rangt gildi: Þú slóst inn ${i} þar sem á að vera ${t}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Rangt gildi: gert ráð fyrir ${T$2(e.values[0])}` : `Ógilt val: má vera eitt af eftirfarandi ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Of stórt: gert er ráð fyrir að ${e.origin ?? `gildi`} hafi ${n}${e.maximum.toString()} ${r.unit ?? `hluti`}` : `Of stórt: gert er ráð fyrir að ${e.origin ?? `gildi`} sé ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Of lítið: gert er ráð fyrir að ${e.origin} hafi ${n}${e.minimum.toString()} ${r.unit}` : `Of lítið: gert er ráð fyrir að ${e.origin} sé ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Ógildur strengur: verður að byrja á "${t.prefix}"` : t.format === `ends_with` ? `Ógildur strengur: verður að enda á "${t.suffix}"` : t.format === `includes` ? `Ógildur strengur: verður að innihalda "${t.includes}"` : t.format === `regex` ? `Ógildur strengur: verður að fylgja mynstri ${t.pattern}` : `Rangt ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Röng tala: verður að vera margfeldi af ${e.divisor}`;
			case `unrecognized_keys`: return `Óþekkt ${e.keys.length > 1 ? `ir lyklar` : `ur lykill`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Rangur lykill í ${e.origin}`;
			case `invalid_union`: return `Rangt gildi`;
			case `invalid_element`: return `Rangt gildi í ${e.origin}`;
			default: return `Rangt gildi`;
		}
	};
};
function Ta$1() {
	return { localeError: wa$1() };
}
const Ea$1 = () => {
	let e = {
		string: {
			unit: `caratteri`,
			verb: `avere`
		},
		file: {
			unit: `byte`,
			verb: `avere`
		},
		array: {
			unit: `elementi`,
			verb: `avere`
		},
		set: {
			unit: `elementi`,
			verb: `avere`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `input`,
		email: `indirizzo email`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `data e ora ISO`,
		date: `data ISO`,
		time: `ora ISO`,
		duration: `durata ISO`,
		ipv4: `indirizzo IPv4`,
		ipv6: `indirizzo IPv6`,
		cidrv4: `intervallo IPv4`,
		cidrv6: `intervallo IPv6`,
		base64: `stringa codificata in base64`,
		base64url: `URL codificata in base64`,
		json_string: `stringa JSON`,
		e164: `numero E.164`,
		jwt: `JWT`,
		template_literal: `input`
	}, r = {
		nan: `NaN`,
		number: `numero`,
		array: `vettore`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Input non valido: atteso instanceof ${e.expected}, ricevuto ${i}` : `Input non valido: atteso ${t}, ricevuto ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Input non valido: atteso ${T$2(e.values[0])}` : `Opzione non valida: atteso uno tra ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Troppo grande: ${e.origin ?? `valore`} deve avere ${n}${e.maximum.toString()} ${r.unit ?? `elementi`}` : `Troppo grande: ${e.origin ?? `valore`} deve essere ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Troppo piccolo: ${e.origin} deve avere ${n}${e.minimum.toString()} ${r.unit}` : `Troppo piccolo: ${e.origin} deve essere ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Stringa non valida: deve iniziare con "${t.prefix}"` : t.format === `ends_with` ? `Stringa non valida: deve terminare con "${t.suffix}"` : t.format === `includes` ? `Stringa non valida: deve includere "${t.includes}"` : t.format === `regex` ? `Stringa non valida: deve corrispondere al pattern ${t.pattern}` : `Input non valido: ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Numero non valido: deve essere un multiplo di ${e.divisor}`;
			case `unrecognized_keys`: return `Chiav${e.keys.length > 1 ? `i` : `e`} non riconosciut${e.keys.length > 1 ? `e` : `a`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Chiave non valida in ${e.origin}`;
			case `invalid_union`: return `Input non valido`;
			case `invalid_element`: return `Valore non valido in ${e.origin}`;
			default: return `Input non valido`;
		}
	};
};
function Da$1() {
	return { localeError: Ea$1() };
}
const Oa$1 = () => {
	let e = {
		string: {
			unit: `文字`,
			verb: `である`
		},
		file: {
			unit: `バイト`,
			verb: `である`
		},
		array: {
			unit: `要素`,
			verb: `である`
		},
		set: {
			unit: `要素`,
			verb: `である`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `入力値`,
		email: `メールアドレス`,
		url: `URL`,
		emoji: `絵文字`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO日時`,
		date: `ISO日付`,
		time: `ISO時刻`,
		duration: `ISO期間`,
		ipv4: `IPv4アドレス`,
		ipv6: `IPv6アドレス`,
		cidrv4: `IPv4範囲`,
		cidrv6: `IPv6範囲`,
		base64: `base64エンコード文字列`,
		base64url: `base64urlエンコード文字列`,
		json_string: `JSON文字列`,
		e164: `E.164番号`,
		jwt: `JWT`,
		template_literal: `入力値`
	}, r = {
		nan: `NaN`,
		number: `数値`,
		array: `配列`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `無効な入力: instanceof ${e.expected}が期待されましたが、${i}が入力されました` : `無効な入力: ${t}が期待されましたが、${i}が入力されました`;
			}
			case `invalid_value`: return e.values.length === 1 ? `無効な入力: ${T$2(e.values[0])}が期待されました` : `無効な選択: ${m$2(e.values, `、`)}のいずれかである必要があります`;
			case `too_big`: {
				let n = e.inclusive ? `以下である` : `より小さい`, r = t(e.origin);
				return r ? `大きすぎる値: ${e.origin ?? `値`}は${e.maximum.toString()}${r.unit ?? `要素`}${n}必要があります` : `大きすぎる値: ${e.origin ?? `値`}は${e.maximum.toString()}${n}必要があります`;
			}
			case `too_small`: {
				let n = e.inclusive ? `以上である` : `より大きい`, r = t(e.origin);
				return r ? `小さすぎる値: ${e.origin}は${e.minimum.toString()}${r.unit}${n}必要があります` : `小さすぎる値: ${e.origin}は${e.minimum.toString()}${n}必要があります`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `無効な文字列: "${t.prefix}"で始まる必要があります` : t.format === `ends_with` ? `無効な文字列: "${t.suffix}"で終わる必要があります` : t.format === `includes` ? `無効な文字列: "${t.includes}"を含む必要があります` : t.format === `regex` ? `無効な文字列: パターン${t.pattern}に一致する必要があります` : `無効な${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `無効な数値: ${e.divisor}の倍数である必要があります`;
			case `unrecognized_keys`: return `認識されていないキー${e.keys.length > 1 ? `群` : ``}: ${m$2(e.keys, `、`)}`;
			case `invalid_key`: return `${e.origin}内の無効なキー`;
			case `invalid_union`: return `無効な入力`;
			case `invalid_element`: return `${e.origin}内の無効な値`;
			default: return `無効な入力`;
		}
	};
};
function ka$1() {
	return { localeError: Oa$1() };
}
const Aa$1 = () => {
	let e = {
		string: {
			unit: `სიმბოლო`,
			verb: `უნდა შეიცავდეს`
		},
		file: {
			unit: `ბაიტი`,
			verb: `უნდა შეიცავდეს`
		},
		array: {
			unit: `ელემენტი`,
			verb: `უნდა შეიცავდეს`
		},
		set: {
			unit: `ელემენტი`,
			verb: `უნდა შეიცავდეს`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `შეყვანა`,
		email: `ელ-ფოსტის მისამართი`,
		url: `URL`,
		emoji: `ემოჯი`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `თარიღი-დრო`,
		date: `თარიღი`,
		time: `დრო`,
		duration: `ხანგრძლივობა`,
		ipv4: `IPv4 მისამართი`,
		ipv6: `IPv6 მისამართი`,
		cidrv4: `IPv4 დიაპაზონი`,
		cidrv6: `IPv6 დიაპაზონი`,
		base64: `base64-კოდირებული ველი`,
		base64url: `base64url-კოდირებული ველი`,
		json_string: `JSON ველი`,
		e164: `E.164 ნომერი`,
		jwt: `JWT`,
		template_literal: `შეყვანა`
	}, r = {
		nan: `NaN`,
		number: `რიცხვი`,
		string: `ველი`,
		boolean: `ბულეანი`,
		function: `ფუნქცია`,
		array: `მასივი`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `არასწორი შეყვანა: მოსალოდნელი instanceof ${e.expected}, მიღებული ${i}` : `არასწორი შეყვანა: მოსალოდნელი ${t}, მიღებული ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `არასწორი შეყვანა: მოსალოდნელი ${T$2(e.values[0])}` : `არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${m$2(e.values, `|`)}-დან`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `ზედმეტად დიდი: მოსალოდნელი ${e.origin ?? `მნიშვნელობა`} ${r.verb} ${n}${e.maximum.toString()} ${r.unit}` : `ზედმეტად დიდი: მოსალოდნელი ${e.origin ?? `მნიშვნელობა`} იყოს ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `ზედმეტად პატარა: მოსალოდნელი ${e.origin} ${r.verb} ${n}${e.minimum.toString()} ${r.unit}` : `ზედმეტად პატარა: მოსალოდნელი ${e.origin} იყოს ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `არასწორი ველი: უნდა იწყებოდეს "${t.prefix}"-ით` : t.format === `ends_with` ? `არასწორი ველი: უნდა მთავრდებოდეს "${t.suffix}"-ით` : t.format === `includes` ? `არასწორი ველი: უნდა შეიცავდეს "${t.includes}"-ს` : t.format === `regex` ? `არასწორი ველი: უნდა შეესაბამებოდეს შაბლონს ${t.pattern}` : `არასწორი ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `არასწორი რიცხვი: უნდა იყოს ${e.divisor}-ის ჯერადი`;
			case `unrecognized_keys`: return `უცნობი გასაღებ${e.keys.length > 1 ? `ები` : `ი`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `არასწორი გასაღები ${e.origin}-ში`;
			case `invalid_union`: return `არასწორი შეყვანა`;
			case `invalid_element`: return `არასწორი მნიშვნელობა ${e.origin}-ში`;
			default: return `არასწორი შეყვანა`;
		}
	};
};
function ja$1() {
	return { localeError: Aa$1() };
}
const Ma$1 = () => {
	let e = {
		string: {
			unit: `តួអក្សរ`,
			verb: `គួរមាន`
		},
		file: {
			unit: `បៃ`,
			verb: `គួរមាន`
		},
		array: {
			unit: `ធាតុ`,
			verb: `គួរមាន`
		},
		set: {
			unit: `ធាតុ`,
			verb: `គួរមាន`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `ទិន្នន័យបញ្ចូល`,
		email: `អាសយដ្ឋានអ៊ីមែល`,
		url: `URL`,
		emoji: `សញ្ញាអារម្មណ៍`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `កាលបរិច្ឆេទ និងម៉ោង ISO`,
		date: `កាលបរិច្ឆេទ ISO`,
		time: `ម៉ោង ISO`,
		duration: `រយៈពេល ISO`,
		ipv4: `អាសយដ្ឋាន IPv4`,
		ipv6: `អាសយដ្ឋាន IPv6`,
		cidrv4: `ដែនអាសយដ្ឋាន IPv4`,
		cidrv6: `ដែនអាសយដ្ឋាន IPv6`,
		base64: `ខ្សែអក្សរអ៊ិកូដ base64`,
		base64url: `ខ្សែអក្សរអ៊ិកូដ base64url`,
		json_string: `ខ្សែអក្សរ JSON`,
		e164: `លេខ E.164`,
		jwt: `JWT`,
		template_literal: `ទិន្នន័យបញ្ចូល`
	}, r = {
		nan: `NaN`,
		number: `លេខ`,
		array: `អារេ (Array)`,
		null: `គ្មានតម្លៃ (null)`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ instanceof ${e.expected} ប៉ុន្តែទទួលបាន ${i}` : `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${t} ប៉ុន្តែទទួលបាន ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${T$2(e.values[0])}` : `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `ធំពេក៖ ត្រូវការ ${e.origin ?? `តម្លៃ`} ${n} ${e.maximum.toString()} ${r.unit ?? `ធាតុ`}` : `ធំពេក៖ ត្រូវការ ${e.origin ?? `តម្លៃ`} ${n} ${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `តូចពេក៖ ត្រូវការ ${e.origin} ${n} ${e.minimum.toString()} ${r.unit}` : `តូចពេក៖ ត្រូវការ ${e.origin} ${n} ${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${t.prefix}"` : t.format === `ends_with` ? `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${t.suffix}"` : t.format === `includes` ? `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${t.includes}"` : t.format === `regex` ? `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${t.pattern}` : `មិនត្រឹមត្រូវ៖ ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${e.divisor}`;
			case `unrecognized_keys`: return `រកឃើញសោមិនស្គាល់៖ ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `សោមិនត្រឹមត្រូវនៅក្នុង ${e.origin}`;
			case `invalid_union`: return `ទិន្នន័យមិនត្រឹមត្រូវ`;
			case `invalid_element`: return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${e.origin}`;
			default: return `ទិន្នន័យមិនត្រឹមត្រូវ`;
		}
	};
};
function Na$1() {
	return { localeError: Ma$1() };
}
function Pa$1() {
	return Na$1();
}
const Fa$1 = () => {
	let e = {
		string: {
			unit: `문자`,
			verb: `to have`
		},
		file: {
			unit: `바이트`,
			verb: `to have`
		},
		array: {
			unit: `개`,
			verb: `to have`
		},
		set: {
			unit: `개`,
			verb: `to have`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `입력`,
		email: `이메일 주소`,
		url: `URL`,
		emoji: `이모지`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO 날짜시간`,
		date: `ISO 날짜`,
		time: `ISO 시간`,
		duration: `ISO 기간`,
		ipv4: `IPv4 주소`,
		ipv6: `IPv6 주소`,
		cidrv4: `IPv4 범위`,
		cidrv6: `IPv6 범위`,
		base64: `base64 인코딩 문자열`,
		base64url: `base64url 인코딩 문자열`,
		json_string: `JSON 문자열`,
		e164: `E.164 번호`,
		jwt: `JWT`,
		template_literal: `입력`
	}, r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `잘못된 입력: 예상 타입은 instanceof ${e.expected}, 받은 타입은 ${i}입니다` : `잘못된 입력: 예상 타입은 ${t}, 받은 타입은 ${i}입니다`;
			}
			case `invalid_value`: return e.values.length === 1 ? `잘못된 입력: 값은 ${T$2(e.values[0])} 이어야 합니다` : `잘못된 옵션: ${m$2(e.values, `또는 `)} 중 하나여야 합니다`;
			case `too_big`: {
				let n = e.inclusive ? `이하` : `미만`, r = n === `미만` ? `이어야 합니다` : `여야 합니다`, i = t(e.origin), a = i?.unit ?? `요소`;
				return i ? `${e.origin ?? `값`}이 너무 큽니다: ${e.maximum.toString()}${a} ${n}${r}` : `${e.origin ?? `값`}이 너무 큽니다: ${e.maximum.toString()} ${n}${r}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `이상` : `초과`, r = n === `이상` ? `이어야 합니다` : `여야 합니다`, i = t(e.origin), a = i?.unit ?? `요소`;
				return i ? `${e.origin ?? `값`}이 너무 작습니다: ${e.minimum.toString()}${a} ${n}${r}` : `${e.origin ?? `값`}이 너무 작습니다: ${e.minimum.toString()} ${n}${r}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `잘못된 문자열: "${t.prefix}"(으)로 시작해야 합니다` : t.format === `ends_with` ? `잘못된 문자열: "${t.suffix}"(으)로 끝나야 합니다` : t.format === `includes` ? `잘못된 문자열: "${t.includes}"을(를) 포함해야 합니다` : t.format === `regex` ? `잘못된 문자열: 정규식 ${t.pattern} 패턴과 일치해야 합니다` : `잘못된 ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `잘못된 숫자: ${e.divisor}의 배수여야 합니다`;
			case `unrecognized_keys`: return `인식할 수 없는 키: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `잘못된 키: ${e.origin}`;
			case `invalid_union`: return `잘못된 입력`;
			case `invalid_element`: return `잘못된 값: ${e.origin}`;
			default: return `잘못된 입력`;
		}
	};
};
function Ia$1() {
	return { localeError: Fa$1() };
}
const K$1 = (e) => e.charAt(0).toUpperCase() + e.slice(1);
function La$1(e) {
	let t = Math.abs(e), n = t % 10, r = t % 100;
	return r >= 11 && r <= 19 || n === 0 ? `many` : n === 1 ? `one` : `few`;
}
const Ra$1 = () => {
	let e = {
		string: {
			unit: {
				one: `simbolis`,
				few: `simboliai`,
				many: `simbolių`
			},
			verb: {
				smaller: {
					inclusive: `turi būti ne ilgesnė kaip`,
					notInclusive: `turi būti trumpesnė kaip`
				},
				bigger: {
					inclusive: `turi būti ne trumpesnė kaip`,
					notInclusive: `turi būti ilgesnė kaip`
				}
			}
		},
		file: {
			unit: {
				one: `baitas`,
				few: `baitai`,
				many: `baitų`
			},
			verb: {
				smaller: {
					inclusive: `turi būti ne didesnis kaip`,
					notInclusive: `turi būti mažesnis kaip`
				},
				bigger: {
					inclusive: `turi būti ne mažesnis kaip`,
					notInclusive: `turi būti didesnis kaip`
				}
			}
		},
		array: {
			unit: {
				one: `elementą`,
				few: `elementus`,
				many: `elementų`
			},
			verb: {
				smaller: {
					inclusive: `turi turėti ne daugiau kaip`,
					notInclusive: `turi turėti mažiau kaip`
				},
				bigger: {
					inclusive: `turi turėti ne mažiau kaip`,
					notInclusive: `turi turėti daugiau kaip`
				}
			}
		},
		set: {
			unit: {
				one: `elementą`,
				few: `elementus`,
				many: `elementų`
			},
			verb: {
				smaller: {
					inclusive: `turi turėti ne daugiau kaip`,
					notInclusive: `turi turėti mažiau kaip`
				},
				bigger: {
					inclusive: `turi turėti ne mažiau kaip`,
					notInclusive: `turi turėti daugiau kaip`
				}
			}
		}
	};
	function t(t, n, r, i) {
		let a = e[t] ?? null;
		return a === null ? a : {
			unit: a.unit[n],
			verb: a.verb[i][r ? `inclusive` : `notInclusive`]
		};
	}
	let n = {
		regex: `įvestis`,
		email: `el. pašto adresas`,
		url: `URL`,
		emoji: `jaustukas`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO data ir laikas`,
		date: `ISO data`,
		time: `ISO laikas`,
		duration: `ISO trukmė`,
		ipv4: `IPv4 adresas`,
		ipv6: `IPv6 adresas`,
		cidrv4: `IPv4 tinklo prefiksas (CIDR)`,
		cidrv6: `IPv6 tinklo prefiksas (CIDR)`,
		base64: `base64 užkoduota eilutė`,
		base64url: `base64url užkoduota eilutė`,
		json_string: `JSON eilutė`,
		e164: `E.164 numeris`,
		jwt: `JWT`,
		template_literal: `įvestis`
	}, r = {
		nan: `NaN`,
		number: `skaičius`,
		bigint: `sveikasis skaičius`,
		string: `eilutė`,
		boolean: `loginė reikšmė`,
		undefined: `neapibrėžta reikšmė`,
		function: `funkcija`,
		symbol: `simbolis`,
		array: `masyvas`,
		object: `objektas`,
		null: `nulinė reikšmė`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Gautas tipas ${i}, o tikėtasi - instanceof ${e.expected}` : `Gautas tipas ${i}, o tikėtasi - ${t}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Privalo būti ${T$2(e.values[0])}` : `Privalo būti vienas iš ${m$2(e.values, `|`)} pasirinkimų`;
			case `too_big`: {
				let n = r[e.origin] ?? e.origin, i = t(e.origin, La$1(Number(e.maximum)), e.inclusive ?? !1, `smaller`);
				if (i?.verb) return `${K$1(n ?? e.origin ?? `reikšmė`)} ${i.verb} ${e.maximum.toString()} ${i.unit ?? `elementų`}`;
				let a = e.inclusive ? `ne didesnis kaip` : `mažesnis kaip`;
				return `${K$1(n ?? e.origin ?? `reikšmė`)} turi būti ${a} ${e.maximum.toString()} ${i?.unit}`;
			}
			case `too_small`: {
				let n = r[e.origin] ?? e.origin, i = t(e.origin, La$1(Number(e.minimum)), e.inclusive ?? !1, `bigger`);
				if (i?.verb) return `${K$1(n ?? e.origin ?? `reikšmė`)} ${i.verb} ${e.minimum.toString()} ${i.unit ?? `elementų`}`;
				let a = e.inclusive ? `ne mažesnis kaip` : `didesnis kaip`;
				return `${K$1(n ?? e.origin ?? `reikšmė`)} turi būti ${a} ${e.minimum.toString()} ${i?.unit}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Eilutė privalo prasidėti "${t.prefix}"` : t.format === `ends_with` ? `Eilutė privalo pasibaigti "${t.suffix}"` : t.format === `includes` ? `Eilutė privalo įtraukti "${t.includes}"` : t.format === `regex` ? `Eilutė privalo atitikti ${t.pattern}` : `Neteisingas ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Skaičius privalo būti ${e.divisor} kartotinis.`;
			case `unrecognized_keys`: return `Neatpažint${e.keys.length > 1 ? `i` : `as`} rakt${e.keys.length > 1 ? `ai` : `as`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Rastas klaidingas raktas`;
			case `invalid_union`: return `Klaidinga įvestis`;
			case `invalid_element`: return `${K$1(r[e.origin] ?? e.origin ?? e.origin ?? `reikšmė`)} turi klaidingą įvestį`;
			default: return `Klaidinga įvestis`;
		}
	};
};
function za$1() {
	return { localeError: Ra$1() };
}
const Ba$1 = () => {
	let e = {
		string: {
			unit: `знаци`,
			verb: `да имаат`
		},
		file: {
			unit: `бајти`,
			verb: `да имаат`
		},
		array: {
			unit: `ставки`,
			verb: `да имаат`
		},
		set: {
			unit: `ставки`,
			verb: `да имаат`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `внес`,
		email: `адреса на е-пошта`,
		url: `URL`,
		emoji: `емоџи`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO датум и време`,
		date: `ISO датум`,
		time: `ISO време`,
		duration: `ISO времетраење`,
		ipv4: `IPv4 адреса`,
		ipv6: `IPv6 адреса`,
		cidrv4: `IPv4 опсег`,
		cidrv6: `IPv6 опсег`,
		base64: `base64-енкодирана низа`,
		base64url: `base64url-енкодирана низа`,
		json_string: `JSON низа`,
		e164: `E.164 број`,
		jwt: `JWT`,
		template_literal: `внес`
	}, r = {
		nan: `NaN`,
		number: `број`,
		array: `низа`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Грешен внес: се очекува instanceof ${e.expected}, примено ${i}` : `Грешен внес: се очекува ${t}, примено ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Invalid input: expected ${T$2(e.values[0])}` : `Грешана опција: се очекува една ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Премногу голем: се очекува ${e.origin ?? `вредноста`} да има ${n}${e.maximum.toString()} ${r.unit ?? `елементи`}` : `Премногу голем: се очекува ${e.origin ?? `вредноста`} да биде ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Премногу мал: се очекува ${e.origin} да има ${n}${e.minimum.toString()} ${r.unit}` : `Премногу мал: се очекува ${e.origin} да биде ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Неважечка низа: мора да започнува со "${t.prefix}"` : t.format === `ends_with` ? `Неважечка низа: мора да завршува со "${t.suffix}"` : t.format === `includes` ? `Неважечка низа: мора да вклучува "${t.includes}"` : t.format === `regex` ? `Неважечка низа: мора да одгоара на патернот ${t.pattern}` : `Invalid ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Грешен број: мора да биде делив со ${e.divisor}`;
			case `unrecognized_keys`: return `${e.keys.length > 1 ? `Непрепознаени клучеви` : `Непрепознаен клуч`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Грешен клуч во ${e.origin}`;
			case `invalid_union`: return `Грешен внес`;
			case `invalid_element`: return `Грешна вредност во ${e.origin}`;
			default: return `Грешен внес`;
		}
	};
};
function Va$1() {
	return { localeError: Ba$1() };
}
const Ha$1 = () => {
	let e = {
		string: {
			unit: `aksara`,
			verb: `mempunyai`
		},
		file: {
			unit: `bait`,
			verb: `mempunyai`
		},
		array: {
			unit: `elemen`,
			verb: `mempunyai`
		},
		set: {
			unit: `elemen`,
			verb: `mempunyai`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `input`,
		email: `alamat e-mel`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `tarikh masa ISO`,
		date: `tarikh ISO`,
		time: `masa ISO`,
		duration: `tempoh ISO`,
		ipv4: `alamat IPv4`,
		ipv6: `alamat IPv6`,
		cidrv4: `julat IPv4`,
		cidrv6: `julat IPv6`,
		base64: `string dikodkan base64`,
		base64url: `string dikodkan base64url`,
		json_string: `string JSON`,
		e164: `nombor E.164`,
		jwt: `JWT`,
		template_literal: `input`
	}, r = {
		nan: `NaN`,
		number: `nombor`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Input tidak sah: dijangka instanceof ${e.expected}, diterima ${i}` : `Input tidak sah: dijangka ${t}, diterima ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Input tidak sah: dijangka ${T$2(e.values[0])}` : `Pilihan tidak sah: dijangka salah satu daripada ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Terlalu besar: dijangka ${e.origin ?? `nilai`} ${r.verb} ${n}${e.maximum.toString()} ${r.unit ?? `elemen`}` : `Terlalu besar: dijangka ${e.origin ?? `nilai`} adalah ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Terlalu kecil: dijangka ${e.origin} ${r.verb} ${n}${e.minimum.toString()} ${r.unit}` : `Terlalu kecil: dijangka ${e.origin} adalah ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `String tidak sah: mesti bermula dengan "${t.prefix}"` : t.format === `ends_with` ? `String tidak sah: mesti berakhir dengan "${t.suffix}"` : t.format === `includes` ? `String tidak sah: mesti mengandungi "${t.includes}"` : t.format === `regex` ? `String tidak sah: mesti sepadan dengan corak ${t.pattern}` : `${n[t.format] ?? e.format} tidak sah`;
			}
			case `not_multiple_of`: return `Nombor tidak sah: perlu gandaan ${e.divisor}`;
			case `unrecognized_keys`: return `Kunci tidak dikenali: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Kunci tidak sah dalam ${e.origin}`;
			case `invalid_union`: return `Input tidak sah`;
			case `invalid_element`: return `Nilai tidak sah dalam ${e.origin}`;
			default: return `Input tidak sah`;
		}
	};
};
function Ua$1() {
	return { localeError: Ha$1() };
}
const Wa$1 = () => {
	let e = {
		string: {
			unit: `tekens`,
			verb: `heeft`
		},
		file: {
			unit: `bytes`,
			verb: `heeft`
		},
		array: {
			unit: `elementen`,
			verb: `heeft`
		},
		set: {
			unit: `elementen`,
			verb: `heeft`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `invoer`,
		email: `emailadres`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO datum en tijd`,
		date: `ISO datum`,
		time: `ISO tijd`,
		duration: `ISO duur`,
		ipv4: `IPv4-adres`,
		ipv6: `IPv6-adres`,
		cidrv4: `IPv4-bereik`,
		cidrv6: `IPv6-bereik`,
		base64: `base64-gecodeerde tekst`,
		base64url: `base64 URL-gecodeerde tekst`,
		json_string: `JSON string`,
		e164: `E.164-nummer`,
		jwt: `JWT`,
		template_literal: `invoer`
	}, r = {
		nan: `NaN`,
		number: `getal`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Ongeldige invoer: verwacht instanceof ${e.expected}, ontving ${i}` : `Ongeldige invoer: verwacht ${t}, ontving ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Ongeldige invoer: verwacht ${T$2(e.values[0])}` : `Ongeldige optie: verwacht één van ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin), i = e.origin === `date` ? `laat` : e.origin === `string` ? `lang` : `groot`;
				return r ? `Te ${i}: verwacht dat ${e.origin ?? `waarde`} ${n}${e.maximum.toString()} ${r.unit ?? `elementen`} ${r.verb}` : `Te ${i}: verwacht dat ${e.origin ?? `waarde`} ${n}${e.maximum.toString()} is`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin), i = e.origin === `date` ? `vroeg` : e.origin === `string` ? `kort` : `klein`;
				return r ? `Te ${i}: verwacht dat ${e.origin} ${n}${e.minimum.toString()} ${r.unit} ${r.verb}` : `Te ${i}: verwacht dat ${e.origin} ${n}${e.minimum.toString()} is`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Ongeldige tekst: moet met "${t.prefix}" beginnen` : t.format === `ends_with` ? `Ongeldige tekst: moet op "${t.suffix}" eindigen` : t.format === `includes` ? `Ongeldige tekst: moet "${t.includes}" bevatten` : t.format === `regex` ? `Ongeldige tekst: moet overeenkomen met patroon ${t.pattern}` : `Ongeldig: ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Ongeldig getal: moet een veelvoud van ${e.divisor} zijn`;
			case `unrecognized_keys`: return `Onbekende key${e.keys.length > 1 ? `s` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Ongeldige key in ${e.origin}`;
			case `invalid_union`: return `Ongeldige invoer`;
			case `invalid_element`: return `Ongeldige waarde in ${e.origin}`;
			default: return `Ongeldige invoer`;
		}
	};
};
function Ga$1() {
	return { localeError: Wa$1() };
}
const Ka$1 = () => {
	let e = {
		string: {
			unit: `tegn`,
			verb: `å ha`
		},
		file: {
			unit: `bytes`,
			verb: `å ha`
		},
		array: {
			unit: `elementer`,
			verb: `å inneholde`
		},
		set: {
			unit: `elementer`,
			verb: `å inneholde`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `input`,
		email: `e-postadresse`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO dato- og klokkeslett`,
		date: `ISO-dato`,
		time: `ISO-klokkeslett`,
		duration: `ISO-varighet`,
		ipv4: `IPv4-område`,
		ipv6: `IPv6-område`,
		cidrv4: `IPv4-spekter`,
		cidrv6: `IPv6-spekter`,
		base64: `base64-enkodet streng`,
		base64url: `base64url-enkodet streng`,
		json_string: `JSON-streng`,
		e164: `E.164-nummer`,
		jwt: `JWT`,
		template_literal: `input`
	}, r = {
		nan: `NaN`,
		number: `tall`,
		array: `liste`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Ugyldig input: forventet instanceof ${e.expected}, fikk ${i}` : `Ugyldig input: forventet ${t}, fikk ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Ugyldig verdi: forventet ${T$2(e.values[0])}` : `Ugyldig valg: forventet en av ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `For stor(t): forventet ${e.origin ?? `value`} til å ha ${n}${e.maximum.toString()} ${r.unit ?? `elementer`}` : `For stor(t): forventet ${e.origin ?? `value`} til å ha ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `For lite(n): forventet ${e.origin} til å ha ${n}${e.minimum.toString()} ${r.unit}` : `For lite(n): forventet ${e.origin} til å ha ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Ugyldig streng: må starte med "${t.prefix}"` : t.format === `ends_with` ? `Ugyldig streng: må ende med "${t.suffix}"` : t.format === `includes` ? `Ugyldig streng: må inneholde "${t.includes}"` : t.format === `regex` ? `Ugyldig streng: må matche mønsteret ${t.pattern}` : `Ugyldig ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Ugyldig tall: må være et multiplum av ${e.divisor}`;
			case `unrecognized_keys`: return `${e.keys.length > 1 ? `Ukjente nøkler` : `Ukjent nøkkel`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Ugyldig nøkkel i ${e.origin}`;
			case `invalid_union`: return `Ugyldig input`;
			case `invalid_element`: return `Ugyldig verdi i ${e.origin}`;
			default: return `Ugyldig input`;
		}
	};
};
function qa$1() {
	return { localeError: Ka$1() };
}
const Ja$1 = () => {
	let e = {
		string: {
			unit: `harf`,
			verb: `olmalıdır`
		},
		file: {
			unit: `bayt`,
			verb: `olmalıdır`
		},
		array: {
			unit: `unsur`,
			verb: `olmalıdır`
		},
		set: {
			unit: `unsur`,
			verb: `olmalıdır`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `giren`,
		email: `epostagâh`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO hengâmı`,
		date: `ISO tarihi`,
		time: `ISO zamanı`,
		duration: `ISO müddeti`,
		ipv4: `IPv4 nişânı`,
		ipv6: `IPv6 nişânı`,
		cidrv4: `IPv4 menzili`,
		cidrv6: `IPv6 menzili`,
		base64: `base64-şifreli metin`,
		base64url: `base64url-şifreli metin`,
		json_string: `JSON metin`,
		e164: `E.164 sayısı`,
		jwt: `JWT`,
		template_literal: `giren`
	}, r = {
		nan: `NaN`,
		number: `numara`,
		array: `saf`,
		null: `gayb`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Fâsit giren: umulan instanceof ${e.expected}, alınan ${i}` : `Fâsit giren: umulan ${t}, alınan ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Fâsit giren: umulan ${T$2(e.values[0])}` : `Fâsit tercih: mûteberler ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Fazla büyük: ${e.origin ?? `value`}, ${n}${e.maximum.toString()} ${r.unit ?? `elements`} sahip olmalıydı.` : `Fazla büyük: ${e.origin ?? `value`}, ${n}${e.maximum.toString()} olmalıydı.`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Fazla küçük: ${e.origin}, ${n}${e.minimum.toString()} ${r.unit} sahip olmalıydı.` : `Fazla küçük: ${e.origin}, ${n}${e.minimum.toString()} olmalıydı.`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Fâsit metin: "${t.prefix}" ile başlamalı.` : t.format === `ends_with` ? `Fâsit metin: "${t.suffix}" ile bitmeli.` : t.format === `includes` ? `Fâsit metin: "${t.includes}" ihtivâ etmeli.` : t.format === `regex` ? `Fâsit metin: ${t.pattern} nakşına uymalı.` : `Fâsit ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Fâsit sayı: ${e.divisor} katı olmalıydı.`;
			case `unrecognized_keys`: return `Tanınmayan anahtar ${e.keys.length > 1 ? `s` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `${e.origin} için tanınmayan anahtar var.`;
			case `invalid_union`: return `Giren tanınamadı.`;
			case `invalid_element`: return `${e.origin} için tanınmayan kıymet var.`;
			default: return `Kıymet tanınamadı.`;
		}
	};
};
function Ya$1() {
	return { localeError: Ja$1() };
}
const Xa$1 = () => {
	let e = {
		string: {
			unit: `توکي`,
			verb: `ولري`
		},
		file: {
			unit: `بایټس`,
			verb: `ولري`
		},
		array: {
			unit: `توکي`,
			verb: `ولري`
		},
		set: {
			unit: `توکي`,
			verb: `ولري`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `ورودي`,
		email: `بریښنالیک`,
		url: `یو آر ال`,
		emoji: `ایموجي`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `نیټه او وخت`,
		date: `نېټه`,
		time: `وخت`,
		duration: `موده`,
		ipv4: `د IPv4 پته`,
		ipv6: `د IPv6 پته`,
		cidrv4: `د IPv4 ساحه`,
		cidrv6: `د IPv6 ساحه`,
		base64: `base64-encoded متن`,
		base64url: `base64url-encoded متن`,
		json_string: `JSON متن`,
		e164: `د E.164 شمېره`,
		jwt: `JWT`,
		template_literal: `ورودي`
	}, r = {
		nan: `NaN`,
		number: `عدد`,
		array: `ارې`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `ناسم ورودي: باید instanceof ${e.expected} وای, مګر ${i} ترلاسه شو` : `ناسم ورودي: باید ${t} وای, مګر ${i} ترلاسه شو`;
			}
			case `invalid_value`: return e.values.length === 1 ? `ناسم ورودي: باید ${T$2(e.values[0])} وای` : `ناسم انتخاب: باید یو له ${m$2(e.values, `|`)} څخه وای`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `ډیر لوی: ${e.origin ?? `ارزښت`} باید ${n}${e.maximum.toString()} ${r.unit ?? `عنصرونه`} ولري` : `ډیر لوی: ${e.origin ?? `ارزښت`} باید ${n}${e.maximum.toString()} وي`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `ډیر کوچنی: ${e.origin} باید ${n}${e.minimum.toString()} ${r.unit} ولري` : `ډیر کوچنی: ${e.origin} باید ${n}${e.minimum.toString()} وي`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `ناسم متن: باید د "${t.prefix}" سره پیل شي` : t.format === `ends_with` ? `ناسم متن: باید د "${t.suffix}" سره پای ته ورسيږي` : t.format === `includes` ? `ناسم متن: باید "${t.includes}" ولري` : t.format === `regex` ? `ناسم متن: باید د ${t.pattern} سره مطابقت ولري` : `${n[t.format] ?? e.format} ناسم دی`;
			}
			case `not_multiple_of`: return `ناسم عدد: باید د ${e.divisor} مضرب وي`;
			case `unrecognized_keys`: return `ناسم ${e.keys.length > 1 ? `کلیډونه` : `کلیډ`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `ناسم کلیډ په ${e.origin} کې`;
			case `invalid_union`: return `ناسمه ورودي`;
			case `invalid_element`: return `ناسم عنصر په ${e.origin} کې`;
			default: return `ناسمه ورودي`;
		}
	};
};
function Za$1() {
	return { localeError: Xa$1() };
}
const Qa$1 = () => {
	let e = {
		string: {
			unit: `znaków`,
			verb: `mieć`
		},
		file: {
			unit: `bajtów`,
			verb: `mieć`
		},
		array: {
			unit: `elementów`,
			verb: `mieć`
		},
		set: {
			unit: `elementów`,
			verb: `mieć`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `wyrażenie`,
		email: `adres email`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `data i godzina w formacie ISO`,
		date: `data w formacie ISO`,
		time: `godzina w formacie ISO`,
		duration: `czas trwania ISO`,
		ipv4: `adres IPv4`,
		ipv6: `adres IPv6`,
		cidrv4: `zakres IPv4`,
		cidrv6: `zakres IPv6`,
		base64: `ciąg znaków zakodowany w formacie base64`,
		base64url: `ciąg znaków zakodowany w formacie base64url`,
		json_string: `ciąg znaków w formacie JSON`,
		e164: `liczba E.164`,
		jwt: `JWT`,
		template_literal: `wejście`
	}, r = {
		nan: `NaN`,
		number: `liczba`,
		array: `tablica`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Nieprawidłowe dane wejściowe: oczekiwano instanceof ${e.expected}, otrzymano ${i}` : `Nieprawidłowe dane wejściowe: oczekiwano ${t}, otrzymano ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Nieprawidłowe dane wejściowe: oczekiwano ${T$2(e.values[0])}` : `Nieprawidłowa opcja: oczekiwano jednej z wartości ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Za duża wartość: oczekiwano, że ${e.origin ?? `wartość`} będzie mieć ${n}${e.maximum.toString()} ${r.unit ?? `elementów`}` : `Zbyt duż(y/a/e): oczekiwano, że ${e.origin ?? `wartość`} będzie wynosić ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Za mała wartość: oczekiwano, że ${e.origin ?? `wartość`} będzie mieć ${n}${e.minimum.toString()} ${r.unit ?? `elementów`}` : `Zbyt mał(y/a/e): oczekiwano, że ${e.origin ?? `wartość`} będzie wynosić ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Nieprawidłowy ciąg znaków: musi zaczynać się od "${t.prefix}"` : t.format === `ends_with` ? `Nieprawidłowy ciąg znaków: musi kończyć się na "${t.suffix}"` : t.format === `includes` ? `Nieprawidłowy ciąg znaków: musi zawierać "${t.includes}"` : t.format === `regex` ? `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${t.pattern}` : `Nieprawidłow(y/a/e) ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Nieprawidłowa liczba: musi być wielokrotnością ${e.divisor}`;
			case `unrecognized_keys`: return `Nierozpoznane klucze${e.keys.length > 1 ? `s` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Nieprawidłowy klucz w ${e.origin}`;
			case `invalid_union`: return `Nieprawidłowe dane wejściowe`;
			case `invalid_element`: return `Nieprawidłowa wartość w ${e.origin}`;
			default: return `Nieprawidłowe dane wejściowe`;
		}
	};
};
function $a$1() {
	return { localeError: Qa$1() };
}
const eo$1 = () => {
	let e = {
		string: {
			unit: `caracteres`,
			verb: `ter`
		},
		file: {
			unit: `bytes`,
			verb: `ter`
		},
		array: {
			unit: `itens`,
			verb: `ter`
		},
		set: {
			unit: `itens`,
			verb: `ter`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `padrão`,
		email: `endereço de e-mail`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `data e hora ISO`,
		date: `data ISO`,
		time: `hora ISO`,
		duration: `duração ISO`,
		ipv4: `endereço IPv4`,
		ipv6: `endereço IPv6`,
		cidrv4: `faixa de IPv4`,
		cidrv6: `faixa de IPv6`,
		base64: `texto codificado em base64`,
		base64url: `URL codificada em base64`,
		json_string: `texto JSON`,
		e164: `número E.164`,
		jwt: `JWT`,
		template_literal: `entrada`
	}, r = {
		nan: `NaN`,
		number: `número`,
		null: `nulo`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Tipo inválido: esperado instanceof ${e.expected}, recebido ${i}` : `Tipo inválido: esperado ${t}, recebido ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Entrada inválida: esperado ${T$2(e.values[0])}` : `Opção inválida: esperada uma das ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Muito grande: esperado que ${e.origin ?? `valor`} tivesse ${n}${e.maximum.toString()} ${r.unit ?? `elementos`}` : `Muito grande: esperado que ${e.origin ?? `valor`} fosse ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Muito pequeno: esperado que ${e.origin} tivesse ${n}${e.minimum.toString()} ${r.unit}` : `Muito pequeno: esperado que ${e.origin} fosse ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Texto inválido: deve começar com "${t.prefix}"` : t.format === `ends_with` ? `Texto inválido: deve terminar com "${t.suffix}"` : t.format === `includes` ? `Texto inválido: deve incluir "${t.includes}"` : t.format === `regex` ? `Texto inválido: deve corresponder ao padrão ${t.pattern}` : `${n[t.format] ?? e.format} inválido`;
			}
			case `not_multiple_of`: return `Número inválido: deve ser múltiplo de ${e.divisor}`;
			case `unrecognized_keys`: return `Chave${e.keys.length > 1 ? `s` : ``} desconhecida${e.keys.length > 1 ? `s` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Chave inválida em ${e.origin}`;
			case `invalid_union`: return `Entrada inválida`;
			case `invalid_element`: return `Valor inválido em ${e.origin}`;
			default: return `Campo inválido`;
		}
	};
};
function to$1() {
	return { localeError: eo$1() };
}
const no$1 = () => {
	let e = {
		string: {
			unit: `caractere`,
			verb: `să aibă`
		},
		file: {
			unit: `octeți`,
			verb: `să aibă`
		},
		array: {
			unit: `elemente`,
			verb: `să aibă`
		},
		set: {
			unit: `elemente`,
			verb: `să aibă`
		},
		map: {
			unit: `intrări`,
			verb: `să aibă`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `intrare`,
		email: `adresă de email`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `dată și oră ISO`,
		date: `dată ISO`,
		time: `oră ISO`,
		duration: `durată ISO`,
		ipv4: `adresă IPv4`,
		ipv6: `adresă IPv6`,
		mac: `adresă MAC`,
		cidrv4: `interval IPv4`,
		cidrv6: `interval IPv6`,
		base64: `șir codat base64`,
		base64url: `șir codat base64url`,
		json_string: `șir JSON`,
		e164: `număr E.164`,
		jwt: `JWT`,
		template_literal: `intrare`
	}, r = {
		nan: `NaN`,
		string: `șir`,
		number: `număr`,
		boolean: `boolean`,
		function: `funcție`,
		array: `matrice`,
		object: `obiect`,
		undefined: `nedefinit`,
		symbol: `simbol`,
		bigint: `număr mare`,
		void: `void`,
		never: `never`,
		map: `hartă`,
		set: `set`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input);
				return `Intrare invalidă: așteptat ${t}, primit ${r[n] ?? n}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Intrare invalidă: așteptat ${T$2(e.values[0])}` : `Opțiune invalidă: așteptat una dintre ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Prea mare: așteptat ca ${e.origin ?? `valoarea`} ${r.verb} ${n}${e.maximum.toString()} ${r.unit ?? `elemente`}` : `Prea mare: așteptat ca ${e.origin ?? `valoarea`} să fie ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Prea mic: așteptat ca ${e.origin} ${r.verb} ${n}${e.minimum.toString()} ${r.unit}` : `Prea mic: așteptat ca ${e.origin} să fie ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Șir invalid: trebuie să înceapă cu "${t.prefix}"` : t.format === `ends_with` ? `Șir invalid: trebuie să se termine cu "${t.suffix}"` : t.format === `includes` ? `Șir invalid: trebuie să includă "${t.includes}"` : t.format === `regex` ? `Șir invalid: trebuie să se potrivească cu modelul ${t.pattern}` : `Format invalid: ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Număr invalid: trebuie să fie multiplu de ${e.divisor}`;
			case `unrecognized_keys`: return `Chei nerecunoscute: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Cheie invalidă în ${e.origin}`;
			case `invalid_union`: return `Intrare invalidă`;
			case `invalid_element`: return `Valoare invalidă în ${e.origin}`;
			default: return `Intrare invalidă`;
		}
	};
};
function ro$1() {
	return { localeError: no$1() };
}
function io$1(e, t, n, r) {
	let i = Math.abs(e), a = i % 10, o = i % 100;
	return o >= 11 && o <= 19 ? r : a === 1 ? t : a >= 2 && a <= 4 ? n : r;
}
const ao$1 = () => {
	let e = {
		string: {
			unit: {
				one: `символ`,
				few: `символа`,
				many: `символов`
			},
			verb: `иметь`
		},
		file: {
			unit: {
				one: `байт`,
				few: `байта`,
				many: `байт`
			},
			verb: `иметь`
		},
		array: {
			unit: {
				one: `элемент`,
				few: `элемента`,
				many: `элементов`
			},
			verb: `иметь`
		},
		set: {
			unit: {
				one: `элемент`,
				few: `элемента`,
				many: `элементов`
			},
			verb: `иметь`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `ввод`,
		email: `email адрес`,
		url: `URL`,
		emoji: `эмодзи`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO дата и время`,
		date: `ISO дата`,
		time: `ISO время`,
		duration: `ISO длительность`,
		ipv4: `IPv4 адрес`,
		ipv6: `IPv6 адрес`,
		cidrv4: `IPv4 диапазон`,
		cidrv6: `IPv6 диапазон`,
		base64: `строка в формате base64`,
		base64url: `строка в формате base64url`,
		json_string: `JSON строка`,
		e164: `номер E.164`,
		jwt: `JWT`,
		template_literal: `ввод`
	}, r = {
		nan: `NaN`,
		number: `число`,
		array: `массив`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Неверный ввод: ожидалось instanceof ${e.expected}, получено ${i}` : `Неверный ввод: ожидалось ${t}, получено ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Неверный ввод: ожидалось ${T$2(e.values[0])}` : `Неверный вариант: ожидалось одно из ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				if (r) {
					let t = io$1(Number(e.maximum), r.unit.one, r.unit.few, r.unit.many);
					return `Слишком большое значение: ожидалось, что ${e.origin ?? `значение`} будет иметь ${n}${e.maximum.toString()} ${t}`;
				}
				return `Слишком большое значение: ожидалось, что ${e.origin ?? `значение`} будет ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				if (r) {
					let t = io$1(Number(e.minimum), r.unit.one, r.unit.few, r.unit.many);
					return `Слишком маленькое значение: ожидалось, что ${e.origin} будет иметь ${n}${e.minimum.toString()} ${t}`;
				}
				return `Слишком маленькое значение: ожидалось, что ${e.origin} будет ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Неверная строка: должна начинаться с "${t.prefix}"` : t.format === `ends_with` ? `Неверная строка: должна заканчиваться на "${t.suffix}"` : t.format === `includes` ? `Неверная строка: должна содержать "${t.includes}"` : t.format === `regex` ? `Неверная строка: должна соответствовать шаблону ${t.pattern}` : `Неверный ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Неверное число: должно быть кратным ${e.divisor}`;
			case `unrecognized_keys`: return `Нераспознанн${e.keys.length > 1 ? `ые` : `ый`} ключ${e.keys.length > 1 ? `и` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Неверный ключ в ${e.origin}`;
			case `invalid_union`: return `Неверные входные данные`;
			case `invalid_element`: return `Неверное значение в ${e.origin}`;
			default: return `Неверные входные данные`;
		}
	};
};
function oo$1() {
	return { localeError: ao$1() };
}
const so$1 = () => {
	let e = {
		string: {
			unit: `znakov`,
			verb: `imeti`
		},
		file: {
			unit: `bajtov`,
			verb: `imeti`
		},
		array: {
			unit: `elementov`,
			verb: `imeti`
		},
		set: {
			unit: `elementov`,
			verb: `imeti`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `vnos`,
		email: `e-poštni naslov`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO datum in čas`,
		date: `ISO datum`,
		time: `ISO čas`,
		duration: `ISO trajanje`,
		ipv4: `IPv4 naslov`,
		ipv6: `IPv6 naslov`,
		cidrv4: `obseg IPv4`,
		cidrv6: `obseg IPv6`,
		base64: `base64 kodiran niz`,
		base64url: `base64url kodiran niz`,
		json_string: `JSON niz`,
		e164: `E.164 številka`,
		jwt: `JWT`,
		template_literal: `vnos`
	}, r = {
		nan: `NaN`,
		number: `število`,
		array: `tabela`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Neveljaven vnos: pričakovano instanceof ${e.expected}, prejeto ${i}` : `Neveljaven vnos: pričakovano ${t}, prejeto ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Neveljaven vnos: pričakovano ${T$2(e.values[0])}` : `Neveljavna možnost: pričakovano eno izmed ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Preveliko: pričakovano, da bo ${e.origin ?? `vrednost`} imelo ${n}${e.maximum.toString()} ${r.unit ?? `elementov`}` : `Preveliko: pričakovano, da bo ${e.origin ?? `vrednost`} ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Premajhno: pričakovano, da bo ${e.origin} imelo ${n}${e.minimum.toString()} ${r.unit}` : `Premajhno: pričakovano, da bo ${e.origin} ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Neveljaven niz: mora se začeti z "${t.prefix}"` : t.format === `ends_with` ? `Neveljaven niz: mora se končati z "${t.suffix}"` : t.format === `includes` ? `Neveljaven niz: mora vsebovati "${t.includes}"` : t.format === `regex` ? `Neveljaven niz: mora ustrezati vzorcu ${t.pattern}` : `Neveljaven ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Neveljavno število: mora biti večkratnik ${e.divisor}`;
			case `unrecognized_keys`: return `Neprepoznan${e.keys.length > 1 ? `i ključi` : ` ključ`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Neveljaven ključ v ${e.origin}`;
			case `invalid_union`: return `Neveljaven vnos`;
			case `invalid_element`: return `Neveljavna vrednost v ${e.origin}`;
			default: return `Neveljaven vnos`;
		}
	};
};
function co$1() {
	return { localeError: so$1() };
}
const lo$1 = () => {
	let e = {
		string: {
			unit: `tecken`,
			verb: `att ha`
		},
		file: {
			unit: `bytes`,
			verb: `att ha`
		},
		array: {
			unit: `objekt`,
			verb: `att innehålla`
		},
		set: {
			unit: `objekt`,
			verb: `att innehålla`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `reguljärt uttryck`,
		email: `e-postadress`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO-datum och tid`,
		date: `ISO-datum`,
		time: `ISO-tid`,
		duration: `ISO-varaktighet`,
		ipv4: `IPv4-intervall`,
		ipv6: `IPv6-intervall`,
		cidrv4: `IPv4-spektrum`,
		cidrv6: `IPv6-spektrum`,
		base64: `base64-kodad sträng`,
		base64url: `base64url-kodad sträng`,
		json_string: `JSON-sträng`,
		e164: `E.164-nummer`,
		jwt: `JWT`,
		template_literal: `mall-literal`
	}, r = {
		nan: `NaN`,
		number: `antal`,
		array: `lista`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Ogiltig inmatning: förväntat instanceof ${e.expected}, fick ${i}` : `Ogiltig inmatning: förväntat ${t}, fick ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Ogiltig inmatning: förväntat ${T$2(e.values[0])}` : `Ogiltigt val: förväntade en av ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `För stor(t): förväntade ${e.origin ?? `värdet`} att ha ${n}${e.maximum.toString()} ${r.unit ?? `element`}` : `För stor(t): förväntat ${e.origin ?? `värdet`} att ha ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `För lite(t): förväntade ${e.origin ?? `värdet`} att ha ${n}${e.minimum.toString()} ${r.unit}` : `För lite(t): förväntade ${e.origin ?? `värdet`} att ha ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Ogiltig sträng: måste börja med "${t.prefix}"` : t.format === `ends_with` ? `Ogiltig sträng: måste sluta med "${t.suffix}"` : t.format === `includes` ? `Ogiltig sträng: måste innehålla "${t.includes}"` : t.format === `regex` ? `Ogiltig sträng: måste matcha mönstret "${t.pattern}"` : `Ogiltig(t) ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Ogiltigt tal: måste vara en multipel av ${e.divisor}`;
			case `unrecognized_keys`: return `${e.keys.length > 1 ? `Okända nycklar` : `Okänd nyckel`}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Ogiltig nyckel i ${e.origin ?? `värdet`}`;
			case `invalid_union`: return `Ogiltig input`;
			case `invalid_element`: return `Ogiltigt värde i ${e.origin ?? `värdet`}`;
			default: return `Ogiltig input`;
		}
	};
};
function uo$1() {
	return { localeError: lo$1() };
}
const fo$1 = () => {
	let e = {
		string: {
			unit: `எழுத்துக்கள்`,
			verb: `கொண்டிருக்க வேண்டும்`
		},
		file: {
			unit: `பைட்டுகள்`,
			verb: `கொண்டிருக்க வேண்டும்`
		},
		array: {
			unit: `உறுப்புகள்`,
			verb: `கொண்டிருக்க வேண்டும்`
		},
		set: {
			unit: `உறுப்புகள்`,
			verb: `கொண்டிருக்க வேண்டும்`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `உள்ளீடு`,
		email: `மின்னஞ்சல் முகவரி`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO தேதி நேரம்`,
		date: `ISO தேதி`,
		time: `ISO நேரம்`,
		duration: `ISO கால அளவு`,
		ipv4: `IPv4 முகவரி`,
		ipv6: `IPv6 முகவரி`,
		cidrv4: `IPv4 வரம்பு`,
		cidrv6: `IPv6 வரம்பு`,
		base64: `base64-encoded சரம்`,
		base64url: `base64url-encoded சரம்`,
		json_string: `JSON சரம்`,
		e164: `E.164 எண்`,
		jwt: `JWT`,
		template_literal: `input`
	}, r = {
		nan: `NaN`,
		number: `எண்`,
		array: `அணி`,
		null: `வெறுமை`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது instanceof ${e.expected}, பெறப்பட்டது ${i}` : `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${t}, பெறப்பட்டது ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${T$2(e.values[0])}` : `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${m$2(e.values, `|`)} இல் ஒன்று`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${e.origin ?? `மதிப்பு`} ${n}${e.maximum.toString()} ${r.unit ?? `உறுப்புகள்`} ஆக இருக்க வேண்டும்` : `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${e.origin ?? `மதிப்பு`} ${n}${e.maximum.toString()} ஆக இருக்க வேண்டும்`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${e.origin} ${n}${e.minimum.toString()} ${r.unit} ஆக இருக்க வேண்டும்` : `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${e.origin} ${n}${e.minimum.toString()} ஆக இருக்க வேண்டும்`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `தவறான சரம்: "${t.prefix}" இல் தொடங்க வேண்டும்` : t.format === `ends_with` ? `தவறான சரம்: "${t.suffix}" இல் முடிவடைய வேண்டும்` : t.format === `includes` ? `தவறான சரம்: "${t.includes}" ஐ உள்ளடக்க வேண்டும்` : t.format === `regex` ? `தவறான சரம்: ${t.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்` : `தவறான ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `தவறான எண்: ${e.divisor} இன் பலமாக இருக்க வேண்டும்`;
			case `unrecognized_keys`: return `அடையாளம் தெரியாத விசை${e.keys.length > 1 ? `கள்` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `${e.origin} இல் தவறான விசை`;
			case `invalid_union`: return `தவறான உள்ளீடு`;
			case `invalid_element`: return `${e.origin} இல் தவறான மதிப்பு`;
			default: return `தவறான உள்ளீடு`;
		}
	};
};
function po$1() {
	return { localeError: fo$1() };
}
const mo$1 = () => {
	let e = {
		string: {
			unit: `ตัวอักษร`,
			verb: `ควรมี`
		},
		file: {
			unit: `ไบต์`,
			verb: `ควรมี`
		},
		array: {
			unit: `รายการ`,
			verb: `ควรมี`
		},
		set: {
			unit: `รายการ`,
			verb: `ควรมี`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `ข้อมูลที่ป้อน`,
		email: `ที่อยู่อีเมล`,
		url: `URL`,
		emoji: `อิโมจิ`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `วันที่เวลาแบบ ISO`,
		date: `วันที่แบบ ISO`,
		time: `เวลาแบบ ISO`,
		duration: `ช่วงเวลาแบบ ISO`,
		ipv4: `ที่อยู่ IPv4`,
		ipv6: `ที่อยู่ IPv6`,
		cidrv4: `ช่วง IP แบบ IPv4`,
		cidrv6: `ช่วง IP แบบ IPv6`,
		base64: `ข้อความแบบ Base64`,
		base64url: `ข้อความแบบ Base64 สำหรับ URL`,
		json_string: `ข้อความแบบ JSON`,
		e164: `เบอร์โทรศัพท์ระหว่างประเทศ (E.164)`,
		jwt: `โทเคน JWT`,
		template_literal: `ข้อมูลที่ป้อน`
	}, r = {
		nan: `NaN`,
		number: `ตัวเลข`,
		array: `อาร์เรย์ (Array)`,
		null: `ไม่มีค่า (null)`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น instanceof ${e.expected} แต่ได้รับ ${i}` : `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${t} แต่ได้รับ ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `ค่าไม่ถูกต้อง: ควรเป็น ${T$2(e.values[0])}` : `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `ไม่เกิน` : `น้อยกว่า`, r = t(e.origin);
				return r ? `เกินกำหนด: ${e.origin ?? `ค่า`} ควรมี${n} ${e.maximum.toString()} ${r.unit ?? `รายการ`}` : `เกินกำหนด: ${e.origin ?? `ค่า`} ควรมี${n} ${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `อย่างน้อย` : `มากกว่า`, r = t(e.origin);
				return r ? `น้อยกว่ากำหนด: ${e.origin} ควรมี${n} ${e.minimum.toString()} ${r.unit}` : `น้อยกว่ากำหนด: ${e.origin} ควรมี${n} ${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${t.prefix}"` : t.format === `ends_with` ? `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${t.suffix}"` : t.format === `includes` ? `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${t.includes}" อยู่ในข้อความ` : t.format === `regex` ? `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${t.pattern}` : `รูปแบบไม่ถูกต้อง: ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${e.divisor} ได้ลงตัว`;
			case `unrecognized_keys`: return `พบคีย์ที่ไม่รู้จัก: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `คีย์ไม่ถูกต้องใน ${e.origin}`;
			case `invalid_union`: return `ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้`;
			case `invalid_element`: return `ข้อมูลไม่ถูกต้องใน ${e.origin}`;
			default: return `ข้อมูลไม่ถูกต้อง`;
		}
	};
};
function ho$1() {
	return { localeError: mo$1() };
}
const go$1 = () => {
	let e = {
		string: {
			unit: `karakter`,
			verb: `olmalı`
		},
		file: {
			unit: `bayt`,
			verb: `olmalı`
		},
		array: {
			unit: `öğe`,
			verb: `olmalı`
		},
		set: {
			unit: `öğe`,
			verb: `olmalı`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `girdi`,
		email: `e-posta adresi`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO tarih ve saat`,
		date: `ISO tarih`,
		time: `ISO saat`,
		duration: `ISO süre`,
		ipv4: `IPv4 adresi`,
		ipv6: `IPv6 adresi`,
		cidrv4: `IPv4 aralığı`,
		cidrv6: `IPv6 aralığı`,
		base64: `base64 ile şifrelenmiş metin`,
		base64url: `base64url ile şifrelenmiş metin`,
		json_string: `JSON dizesi`,
		e164: `E.164 sayısı`,
		jwt: `JWT`,
		template_literal: `Şablon dizesi`
	}, r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Geçersiz değer: beklenen instanceof ${e.expected}, alınan ${i}` : `Geçersiz değer: beklenen ${t}, alınan ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Geçersiz değer: beklenen ${T$2(e.values[0])}` : `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Çok büyük: beklenen ${e.origin ?? `değer`} ${n}${e.maximum.toString()} ${r.unit ?? `öğe`}` : `Çok büyük: beklenen ${e.origin ?? `değer`} ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Çok küçük: beklenen ${e.origin} ${n}${e.minimum.toString()} ${r.unit}` : `Çok küçük: beklenen ${e.origin} ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Geçersiz metin: "${t.prefix}" ile başlamalı` : t.format === `ends_with` ? `Geçersiz metin: "${t.suffix}" ile bitmeli` : t.format === `includes` ? `Geçersiz metin: "${t.includes}" içermeli` : t.format === `regex` ? `Geçersiz metin: ${t.pattern} desenine uymalı` : `Geçersiz ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Geçersiz sayı: ${e.divisor} ile tam bölünebilmeli`;
			case `unrecognized_keys`: return `Tanınmayan anahtar${e.keys.length > 1 ? `lar` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `${e.origin} içinde geçersiz anahtar`;
			case `invalid_union`: return `Geçersiz değer`;
			case `invalid_element`: return `${e.origin} içinde geçersiz değer`;
			default: return `Geçersiz değer`;
		}
	};
};
function _o$1() {
	return { localeError: go$1() };
}
const vo$1 = () => {
	let e = {
		string: {
			unit: `символів`,
			verb: `матиме`
		},
		file: {
			unit: `байтів`,
			verb: `матиме`
		},
		array: {
			unit: `елементів`,
			verb: `матиме`
		},
		set: {
			unit: `елементів`,
			verb: `матиме`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `вхідні дані`,
		email: `адреса електронної пошти`,
		url: `URL`,
		emoji: `емодзі`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `дата та час ISO`,
		date: `дата ISO`,
		time: `час ISO`,
		duration: `тривалість ISO`,
		ipv4: `адреса IPv4`,
		ipv6: `адреса IPv6`,
		cidrv4: `діапазон IPv4`,
		cidrv6: `діапазон IPv6`,
		base64: `рядок у кодуванні base64`,
		base64url: `рядок у кодуванні base64url`,
		json_string: `рядок JSON`,
		e164: `номер E.164`,
		jwt: `JWT`,
		template_literal: `вхідні дані`
	}, r = {
		nan: `NaN`,
		number: `число`,
		array: `масив`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Неправильні вхідні дані: очікується instanceof ${e.expected}, отримано ${i}` : `Неправильні вхідні дані: очікується ${t}, отримано ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Неправильні вхідні дані: очікується ${T$2(e.values[0])}` : `Неправильна опція: очікується одне з ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Занадто велике: очікується, що ${e.origin ?? `значення`} ${r.verb} ${n}${e.maximum.toString()} ${r.unit ?? `елементів`}` : `Занадто велике: очікується, що ${e.origin ?? `значення`} буде ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Занадто мале: очікується, що ${e.origin} ${r.verb} ${n}${e.minimum.toString()} ${r.unit}` : `Занадто мале: очікується, що ${e.origin} буде ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Неправильний рядок: повинен починатися з "${t.prefix}"` : t.format === `ends_with` ? `Неправильний рядок: повинен закінчуватися на "${t.suffix}"` : t.format === `includes` ? `Неправильний рядок: повинен містити "${t.includes}"` : t.format === `regex` ? `Неправильний рядок: повинен відповідати шаблону ${t.pattern}` : `Неправильний ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Неправильне число: повинно бути кратним ${e.divisor}`;
			case `unrecognized_keys`: return `Нерозпізнаний ключ${e.keys.length > 1 ? `і` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Неправильний ключ у ${e.origin}`;
			case `invalid_union`: return `Неправильні вхідні дані`;
			case `invalid_element`: return `Неправильне значення у ${e.origin}`;
			default: return `Неправильні вхідні дані`;
		}
	};
};
function yo$1() {
	return { localeError: vo$1() };
}
function bo$1() {
	return yo$1();
}
const xo$1 = () => {
	let e = {
		string: {
			unit: `حروف`,
			verb: `ہونا`
		},
		file: {
			unit: `بائٹس`,
			verb: `ہونا`
		},
		array: {
			unit: `آئٹمز`,
			verb: `ہونا`
		},
		set: {
			unit: `آئٹمز`,
			verb: `ہونا`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `ان پٹ`,
		email: `ای میل ایڈریس`,
		url: `یو آر ایل`,
		emoji: `ایموجی`,
		uuid: `یو یو آئی ڈی`,
		uuidv4: `یو یو آئی ڈی وی 4`,
		uuidv6: `یو یو آئی ڈی وی 6`,
		nanoid: `نینو آئی ڈی`,
		guid: `جی یو آئی ڈی`,
		cuid: `سی یو آئی ڈی`,
		cuid2: `سی یو آئی ڈی 2`,
		ulid: `یو ایل آئی ڈی`,
		xid: `ایکس آئی ڈی`,
		ksuid: `کے ایس یو آئی ڈی`,
		datetime: `آئی ایس او ڈیٹ ٹائم`,
		date: `آئی ایس او تاریخ`,
		time: `آئی ایس او وقت`,
		duration: `آئی ایس او مدت`,
		ipv4: `آئی پی وی 4 ایڈریس`,
		ipv6: `آئی پی وی 6 ایڈریس`,
		cidrv4: `آئی پی وی 4 رینج`,
		cidrv6: `آئی پی وی 6 رینج`,
		base64: `بیس 64 ان کوڈڈ سٹرنگ`,
		base64url: `بیس 64 یو آر ایل ان کوڈڈ سٹرنگ`,
		json_string: `جے ایس او این سٹرنگ`,
		e164: `ای 164 نمبر`,
		jwt: `جے ڈبلیو ٹی`,
		template_literal: `ان پٹ`
	}, r = {
		nan: `NaN`,
		number: `نمبر`,
		array: `آرے`,
		null: `نل`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `غلط ان پٹ: instanceof ${e.expected} متوقع تھا، ${i} موصول ہوا` : `غلط ان پٹ: ${t} متوقع تھا، ${i} موصول ہوا`;
			}
			case `invalid_value`: return e.values.length === 1 ? `غلط ان پٹ: ${T$2(e.values[0])} متوقع تھا` : `غلط آپشن: ${m$2(e.values, `|`)} میں سے ایک متوقع تھا`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `بہت بڑا: ${e.origin ?? `ویلیو`} کے ${n}${e.maximum.toString()} ${r.unit ?? `عناصر`} ہونے متوقع تھے` : `بہت بڑا: ${e.origin ?? `ویلیو`} کا ${n}${e.maximum.toString()} ہونا متوقع تھا`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `بہت چھوٹا: ${e.origin} کے ${n}${e.minimum.toString()} ${r.unit} ہونے متوقع تھے` : `بہت چھوٹا: ${e.origin} کا ${n}${e.minimum.toString()} ہونا متوقع تھا`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `غلط سٹرنگ: "${t.prefix}" سے شروع ہونا چاہیے` : t.format === `ends_with` ? `غلط سٹرنگ: "${t.suffix}" پر ختم ہونا چاہیے` : t.format === `includes` ? `غلط سٹرنگ: "${t.includes}" شامل ہونا چاہیے` : t.format === `regex` ? `غلط سٹرنگ: پیٹرن ${t.pattern} سے میچ ہونا چاہیے` : `غلط ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `غلط نمبر: ${e.divisor} کا مضاعف ہونا چاہیے`;
			case `unrecognized_keys`: return `غیر تسلیم شدہ کی${e.keys.length > 1 ? `ز` : ``}: ${m$2(e.keys, `، `)}`;
			case `invalid_key`: return `${e.origin} میں غلط کی`;
			case `invalid_union`: return `غلط ان پٹ`;
			case `invalid_element`: return `${e.origin} میں غلط ویلیو`;
			default: return `غلط ان پٹ`;
		}
	};
};
function So$1() {
	return { localeError: xo$1() };
}
const Co$1 = () => {
	let e = {
		string: {
			unit: `belgi`,
			verb: `bo‘lishi kerak`
		},
		file: {
			unit: `bayt`,
			verb: `bo‘lishi kerak`
		},
		array: {
			unit: `element`,
			verb: `bo‘lishi kerak`
		},
		set: {
			unit: `element`,
			verb: `bo‘lishi kerak`
		},
		map: {
			unit: `yozuv`,
			verb: `bo‘lishi kerak`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `kirish`,
		email: `elektron pochta manzili`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO sana va vaqti`,
		date: `ISO sana`,
		time: `ISO vaqt`,
		duration: `ISO davomiylik`,
		ipv4: `IPv4 manzil`,
		ipv6: `IPv6 manzil`,
		mac: `MAC manzil`,
		cidrv4: `IPv4 diapazon`,
		cidrv6: `IPv6 diapazon`,
		base64: `base64 kodlangan satr`,
		base64url: `base64url kodlangan satr`,
		json_string: `JSON satr`,
		e164: `E.164 raqam`,
		jwt: `JWT`,
		template_literal: `kirish`
	}, r = {
		nan: `NaN`,
		number: `raqam`,
		array: `massiv`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Noto‘g‘ri kirish: kutilgan instanceof ${e.expected}, qabul qilingan ${i}` : `Noto‘g‘ri kirish: kutilgan ${t}, qabul qilingan ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Noto‘g‘ri kirish: kutilgan ${T$2(e.values[0])}` : `Noto‘g‘ri variant: quyidagilardan biri kutilgan ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Juda katta: kutilgan ${e.origin ?? `qiymat`} ${n}${e.maximum.toString()} ${r.unit} ${r.verb}` : `Juda katta: kutilgan ${e.origin ?? `qiymat`} ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Juda kichik: kutilgan ${e.origin} ${n}${e.minimum.toString()} ${r.unit} ${r.verb}` : `Juda kichik: kutilgan ${e.origin} ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Noto‘g‘ri satr: "${t.prefix}" bilan boshlanishi kerak` : t.format === `ends_with` ? `Noto‘g‘ri satr: "${t.suffix}" bilan tugashi kerak` : t.format === `includes` ? `Noto‘g‘ri satr: "${t.includes}" ni o‘z ichiga olishi kerak` : t.format === `regex` ? `Noto‘g‘ri satr: ${t.pattern} shabloniga mos kelishi kerak` : `Noto‘g‘ri ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Noto‘g‘ri raqam: ${e.divisor} ning karralisi bo‘lishi kerak`;
			case `unrecognized_keys`: return `Noma’lum kalit${e.keys.length > 1 ? `lar` : ``}: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `${e.origin} dagi kalit noto‘g‘ri`;
			case `invalid_union`: return `Noto‘g‘ri kirish`;
			case `invalid_element`: return `${e.origin} da noto‘g‘ri qiymat`;
			default: return `Noto‘g‘ri kirish`;
		}
	};
};
function wo$1() {
	return { localeError: Co$1() };
}
const To$1 = () => {
	let e = {
		string: {
			unit: `ký tự`,
			verb: `có`
		},
		file: {
			unit: `byte`,
			verb: `có`
		},
		array: {
			unit: `phần tử`,
			verb: `có`
		},
		set: {
			unit: `phần tử`,
			verb: `có`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `đầu vào`,
		email: `địa chỉ email`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ngày giờ ISO`,
		date: `ngày ISO`,
		time: `giờ ISO`,
		duration: `khoảng thời gian ISO`,
		ipv4: `địa chỉ IPv4`,
		ipv6: `địa chỉ IPv6`,
		cidrv4: `dải IPv4`,
		cidrv6: `dải IPv6`,
		base64: `chuỗi mã hóa base64`,
		base64url: `chuỗi mã hóa base64url`,
		json_string: `chuỗi JSON`,
		e164: `số E.164`,
		jwt: `JWT`,
		template_literal: `đầu vào`
	}, r = {
		nan: `NaN`,
		number: `số`,
		array: `mảng`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Đầu vào không hợp lệ: mong đợi instanceof ${e.expected}, nhận được ${i}` : `Đầu vào không hợp lệ: mong đợi ${t}, nhận được ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Đầu vào không hợp lệ: mong đợi ${T$2(e.values[0])}` : `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Quá lớn: mong đợi ${e.origin ?? `giá trị`} ${r.verb} ${n}${e.maximum.toString()} ${r.unit ?? `phần tử`}` : `Quá lớn: mong đợi ${e.origin ?? `giá trị`} ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Quá nhỏ: mong đợi ${e.origin} ${r.verb} ${n}${e.minimum.toString()} ${r.unit}` : `Quá nhỏ: mong đợi ${e.origin} ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Chuỗi không hợp lệ: phải bắt đầu bằng "${t.prefix}"` : t.format === `ends_with` ? `Chuỗi không hợp lệ: phải kết thúc bằng "${t.suffix}"` : t.format === `includes` ? `Chuỗi không hợp lệ: phải bao gồm "${t.includes}"` : t.format === `regex` ? `Chuỗi không hợp lệ: phải khớp với mẫu ${t.pattern}` : `${n[t.format] ?? e.format} không hợp lệ`;
			}
			case `not_multiple_of`: return `Số không hợp lệ: phải là bội số của ${e.divisor}`;
			case `unrecognized_keys`: return `Khóa không được nhận dạng: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Khóa không hợp lệ trong ${e.origin}`;
			case `invalid_union`: return `Đầu vào không hợp lệ`;
			case `invalid_element`: return `Giá trị không hợp lệ trong ${e.origin}`;
			default: return `Đầu vào không hợp lệ`;
		}
	};
};
function Eo$1() {
	return { localeError: To$1() };
}
const Do$1 = () => {
	let e = {
		string: {
			unit: `字符`,
			verb: `包含`
		},
		file: {
			unit: `字节`,
			verb: `包含`
		},
		array: {
			unit: `项`,
			verb: `包含`
		},
		set: {
			unit: `项`,
			verb: `包含`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `输入`,
		email: `电子邮件`,
		url: `URL`,
		emoji: `表情符号`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO日期时间`,
		date: `ISO日期`,
		time: `ISO时间`,
		duration: `ISO时长`,
		ipv4: `IPv4地址`,
		ipv6: `IPv6地址`,
		cidrv4: `IPv4网段`,
		cidrv6: `IPv6网段`,
		base64: `base64编码字符串`,
		base64url: `base64url编码字符串`,
		json_string: `JSON字符串`,
		e164: `E.164号码`,
		jwt: `JWT`,
		template_literal: `输入`
	}, r = {
		nan: `NaN`,
		number: `数字`,
		array: `数组`,
		null: `空值(null)`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `无效输入：期望 instanceof ${e.expected}，实际接收 ${i}` : `无效输入：期望 ${t}，实际接收 ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `无效输入：期望 ${T$2(e.values[0])}` : `无效选项：期望以下之一 ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `数值过大：期望 ${e.origin ?? `值`} ${n}${e.maximum.toString()} ${r.unit ?? `个元素`}` : `数值过大：期望 ${e.origin ?? `值`} ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `数值过小：期望 ${e.origin} ${n}${e.minimum.toString()} ${r.unit}` : `数值过小：期望 ${e.origin} ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `无效字符串：必须以 "${t.prefix}" 开头` : t.format === `ends_with` ? `无效字符串：必须以 "${t.suffix}" 结尾` : t.format === `includes` ? `无效字符串：必须包含 "${t.includes}"` : t.format === `regex` ? `无效字符串：必须满足正则表达式 ${t.pattern}` : `无效${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `无效数字：必须是 ${e.divisor} 的倍数`;
			case `unrecognized_keys`: return `出现未知的键(key): ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `${e.origin} 中的键(key)无效`;
			case `invalid_union`: return `无效输入`;
			case `invalid_element`: return `${e.origin} 中包含无效值(value)`;
			default: return `无效输入`;
		}
	};
};
function Oo$1() {
	return { localeError: Do$1() };
}
const ko$1 = () => {
	let e = {
		string: {
			unit: `字元`,
			verb: `擁有`
		},
		file: {
			unit: `位元組`,
			verb: `擁有`
		},
		array: {
			unit: `項目`,
			verb: `擁有`
		},
		set: {
			unit: `項目`,
			verb: `擁有`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `輸入`,
		email: `郵件地址`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `ISO 日期時間`,
		date: `ISO 日期`,
		time: `ISO 時間`,
		duration: `ISO 期間`,
		ipv4: `IPv4 位址`,
		ipv6: `IPv6 位址`,
		cidrv4: `IPv4 範圍`,
		cidrv6: `IPv6 範圍`,
		base64: `base64 編碼字串`,
		base64url: `base64url 編碼字串`,
		json_string: `JSON 字串`,
		e164: `E.164 數值`,
		jwt: `JWT`,
		template_literal: `輸入`
	}, r = { nan: `NaN` };
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `無效的輸入值：預期為 instanceof ${e.expected}，但收到 ${i}` : `無效的輸入值：預期為 ${t}，但收到 ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `無效的輸入值：預期為 ${T$2(e.values[0])}` : `無效的選項：預期為以下其中之一 ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `數值過大：預期 ${e.origin ?? `值`} 應為 ${n}${e.maximum.toString()} ${r.unit ?? `個元素`}` : `數值過大：預期 ${e.origin ?? `值`} 應為 ${n}${e.maximum.toString()}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `數值過小：預期 ${e.origin} 應為 ${n}${e.minimum.toString()} ${r.unit}` : `數值過小：預期 ${e.origin} 應為 ${n}${e.minimum.toString()}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `無效的字串：必須以 "${t.prefix}" 開頭` : t.format === `ends_with` ? `無效的字串：必須以 "${t.suffix}" 結尾` : t.format === `includes` ? `無效的字串：必須包含 "${t.includes}"` : t.format === `regex` ? `無效的字串：必須符合格式 ${t.pattern}` : `無效的 ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `無效的數字：必須為 ${e.divisor} 的倍數`;
			case `unrecognized_keys`: return `無法識別的鍵值${e.keys.length > 1 ? `們` : ``}：${m$2(e.keys, `、`)}`;
			case `invalid_key`: return `${e.origin} 中有無效的鍵值`;
			case `invalid_union`: return `無效的輸入值`;
			case `invalid_element`: return `${e.origin} 中有無效的值`;
			default: return `無效的輸入值`;
		}
	};
};
function Ao$1() {
	return { localeError: ko$1() };
}
const jo$1 = () => {
	let e = {
		string: {
			unit: `àmi`,
			verb: `ní`
		},
		file: {
			unit: `bytes`,
			verb: `ní`
		},
		array: {
			unit: `nkan`,
			verb: `ní`
		},
		set: {
			unit: `nkan`,
			verb: `ní`
		}
	};
	function t(t) {
		return e[t] ?? null;
	}
	let n = {
		regex: `ẹ̀rọ ìbáwọlé`,
		email: `àdírẹ́sì ìmẹ́lì`,
		url: `URL`,
		emoji: `emoji`,
		uuid: `UUID`,
		uuidv4: `UUIDv4`,
		uuidv6: `UUIDv6`,
		nanoid: `nanoid`,
		guid: `GUID`,
		cuid: `cuid`,
		cuid2: `cuid2`,
		ulid: `ULID`,
		xid: `XID`,
		ksuid: `KSUID`,
		datetime: `àkókò ISO`,
		date: `ọjọ́ ISO`,
		time: `àkókò ISO`,
		duration: `àkókò tó pé ISO`,
		ipv4: `àdírẹ́sì IPv4`,
		ipv6: `àdírẹ́sì IPv6`,
		cidrv4: `àgbègbè IPv4`,
		cidrv6: `àgbègbè IPv6`,
		base64: `ọ̀rọ̀ tí a kọ́ ní base64`,
		base64url: `ọ̀rọ̀ base64url`,
		json_string: `ọ̀rọ̀ JSON`,
		e164: `nọ́mbà E.164`,
		jwt: `JWT`,
		template_literal: `ẹ̀rọ ìbáwọlé`
	}, r = {
		nan: `NaN`,
		number: `nọ́mbà`,
		array: `akopọ`
	};
	return (e) => {
		switch (e.code) {
			case `invalid_type`: {
				let t = r[e.expected] ?? e.expected, n = A$1(e.input), i = r[n] ?? n;
				return /^[A-Z]/.test(e.expected) ? `Ìbáwọlé aṣìṣe: a ní láti fi instanceof ${e.expected}, àmọ̀ a rí ${i}` : `Ìbáwọlé aṣìṣe: a ní láti fi ${t}, àmọ̀ a rí ${i}`;
			}
			case `invalid_value`: return e.values.length === 1 ? `Ìbáwọlé aṣìṣe: a ní láti fi ${T$2(e.values[0])}` : `Àṣàyàn aṣìṣe: yan ọ̀kan lára ${m$2(e.values, `|`)}`;
			case `too_big`: {
				let n = e.inclusive ? `<=` : `<`, r = t(e.origin);
				return r ? `Tó pọ̀ jù: a ní láti jẹ́ pé ${e.origin ?? `iye`} ${r.verb} ${n}${e.maximum} ${r.unit}` : `Tó pọ̀ jù: a ní láti jẹ́ ${n}${e.maximum}`;
			}
			case `too_small`: {
				let n = e.inclusive ? `>=` : `>`, r = t(e.origin);
				return r ? `Kéré ju: a ní láti jẹ́ pé ${e.origin} ${r.verb} ${n}${e.minimum} ${r.unit}` : `Kéré ju: a ní láti jẹ́ ${n}${e.minimum}`;
			}
			case `invalid_format`: {
				let t = e;
				return t.format === `starts_with` ? `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú "${t.prefix}"` : t.format === `ends_with` ? `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ parí pẹ̀lú "${t.suffix}"` : t.format === `includes` ? `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ ní "${t.includes}"` : t.format === `regex` ? `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bá àpẹẹrẹ mu ${t.pattern}` : `Aṣìṣe: ${n[t.format] ?? e.format}`;
			}
			case `not_multiple_of`: return `Nọ́mbà aṣìṣe: gbọ́dọ̀ jẹ́ èyà pípín ti ${e.divisor}`;
			case `unrecognized_keys`: return `Bọtìnì àìmọ̀: ${m$2(e.keys, `, `)}`;
			case `invalid_key`: return `Bọtìnì aṣìṣe nínú ${e.origin}`;
			case `invalid_union`: return `Ìbáwọlé aṣìṣe`;
			case `invalid_element`: return `Iye aṣìṣe nínú ${e.origin}`;
			default: return `Ìbáwọlé aṣìṣe`;
		}
	};
};
function Mo$1() {
	return { localeError: jo$1() };
}
var No$1 = l$2({
	ar: () => Fi$1,
	az: () => Li$1,
	be: () => Bi$1,
	bg: () => Hi$1,
	ca: () => Wi$1,
	cs: () => Ki$1,
	da: () => Ji$1,
	de: () => Xi$1,
	el: () => Qi$1,
	en: () => ea$1,
	eo: () => na$1,
	es: () => ia$1,
	fa: () => oa$1,
	fi: () => ca$1,
	fr: () => ua$1,
	frCA: () => fa$1,
	he: () => ma$1,
	hr: () => ga$1,
	hu: () => va$1,
	hy: () => xa$1,
	id: () => Ca$1,
	is: () => Ta$1,
	it: () => Da$1,
	ja: () => ka$1,
	ka: () => ja$1,
	kh: () => Pa$1,
	km: () => Na$1,
	ko: () => Ia$1,
	lt: () => za$1,
	mk: () => Va$1,
	ms: () => Ua$1,
	nl: () => Ga$1,
	no: () => qa$1,
	ota: () => Ya$1,
	pl: () => $a$1,
	ps: () => Za$1,
	pt: () => to$1,
	ro: () => ro$1,
	ru: () => oo$1,
	sl: () => co$1,
	sv: () => uo$1,
	ta: () => po$1,
	th: () => ho$1,
	tr: () => _o$1,
	ua: () => bo$1,
	uk: () => yo$1,
	ur: () => So$1,
	uz: () => wo$1,
	vi: () => Eo$1,
	yo: () => Mo$1,
	zhCN: () => Oo$1,
	zhTW: () => Ao$1
}), Po$1;
const Fo$1 = Symbol(`ZodOutput`), Io$1 = Symbol(`ZodInput`);
var Lo$1 = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
	}
	add(e, ...t) {
		let n = t[0];
		return this._map.set(e, n), n && typeof n == `object` && `id` in n && this._idmap.set(n.id, e), this;
	}
	clear() {
		return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
	}
	remove(e) {
		let t = this._map.get(e);
		return t && typeof t == `object` && `id` in t && this._idmap.delete(t.id), this._map.delete(e), this;
	}
	get(e) {
		let t = e._zod.parent;
		if (t) {
			let n = { ...this.get(t) ?? {} };
			delete n.id;
			let r = {
				...n,
				...this._map.get(e)
			};
			return Object.keys(r).length ? r : void 0;
		}
		return this._map.get(e);
	}
	has(e) {
		return this._map.has(e);
	}
};
function Ro$1() {
	return new Lo$1();
}
(Po$1 = globalThis).__zod_globalRegistry ?? (Po$1.__zod_globalRegistry = Ro$1());
const q$2 = globalThis.__zod_globalRegistry;
function zo$1(e, t) {
	return new e({
		type: `string`,
		...w$2(t)
	});
}
function Bo$1(e, t) {
	return new e({
		type: `string`,
		coerce: !0,
		...w$2(t)
	});
}
function Vo$1(e, t) {
	return new e({
		type: `string`,
		format: `email`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function Ho$1(e, t) {
	return new e({
		type: `string`,
		format: `guid`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function Uo$1(e, t) {
	return new e({
		type: `string`,
		format: `uuid`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function Wo$1(e, t) {
	return new e({
		type: `string`,
		format: `uuid`,
		check: `string_format`,
		abort: !1,
		version: `v4`,
		...w$2(t)
	});
}
function Go$1(e, t) {
	return new e({
		type: `string`,
		format: `uuid`,
		check: `string_format`,
		abort: !1,
		version: `v6`,
		...w$2(t)
	});
}
function Ko$1(e, t) {
	return new e({
		type: `string`,
		format: `uuid`,
		check: `string_format`,
		abort: !1,
		version: `v7`,
		...w$2(t)
	});
}
function qo$1(e, t) {
	return new e({
		type: `string`,
		format: `url`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function Jo$1(e, t) {
	return new e({
		type: `string`,
		format: `emoji`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function Yo$1(e, t) {
	return new e({
		type: `string`,
		format: `nanoid`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function Xo$1(e, t) {
	return new e({
		type: `string`,
		format: `cuid`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function Zo$1(e, t) {
	return new e({
		type: `string`,
		format: `cuid2`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function Qo$1(e, t) {
	return new e({
		type: `string`,
		format: `ulid`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function $o$1(e, t) {
	return new e({
		type: `string`,
		format: `xid`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function es$1(e, t) {
	return new e({
		type: `string`,
		format: `ksuid`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function ts(e, t) {
	return new e({
		type: `string`,
		format: `ipv4`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function ns(e, t) {
	return new e({
		type: `string`,
		format: `ipv6`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function rs(e, t) {
	return new e({
		type: `string`,
		format: `mac`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function is(e, t) {
	return new e({
		type: `string`,
		format: `cidrv4`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function as(e, t) {
	return new e({
		type: `string`,
		format: `cidrv6`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function os(e, t) {
	return new e({
		type: `string`,
		format: `base64`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function ss(e, t) {
	return new e({
		type: `string`,
		format: `base64url`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function cs(e, t) {
	return new e({
		type: `string`,
		format: `e164`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
function ls(e, t) {
	return new e({
		type: `string`,
		format: `jwt`,
		check: `string_format`,
		abort: !1,
		...w$2(t)
	});
}
const us = {
	Any: null,
	Minute: -1,
	Second: 0,
	Millisecond: 3,
	Microsecond: 6
};
function ds(e, t) {
	return new e({
		type: `string`,
		format: `datetime`,
		check: `string_format`,
		offset: !1,
		local: !1,
		precision: null,
		...w$2(t)
	});
}
function fs$1(e, t) {
	return new e({
		type: `string`,
		format: `date`,
		check: `string_format`,
		...w$2(t)
	});
}
function ps(e, t) {
	return new e({
		type: `string`,
		format: `time`,
		check: `string_format`,
		precision: null,
		...w$2(t)
	});
}
function ms(e, t) {
	return new e({
		type: `string`,
		format: `duration`,
		check: `string_format`,
		...w$2(t)
	});
}
function hs(e, t) {
	return new e({
		type: `number`,
		checks: [],
		...w$2(t)
	});
}
function gs(e, t) {
	return new e({
		type: `number`,
		coerce: !0,
		checks: [],
		...w$2(t)
	});
}
function _s(e, t) {
	return new e({
		type: `number`,
		check: `number_format`,
		abort: !1,
		format: `safeint`,
		...w$2(t)
	});
}
function vs(e, t) {
	return new e({
		type: `number`,
		check: `number_format`,
		abort: !1,
		format: `float32`,
		...w$2(t)
	});
}
function ys(e, t) {
	return new e({
		type: `number`,
		check: `number_format`,
		abort: !1,
		format: `float64`,
		...w$2(t)
	});
}
function bs(e, t) {
	return new e({
		type: `number`,
		check: `number_format`,
		abort: !1,
		format: `int32`,
		...w$2(t)
	});
}
function xs(e, t) {
	return new e({
		type: `number`,
		check: `number_format`,
		abort: !1,
		format: `uint32`,
		...w$2(t)
	});
}
function Ss(e, t) {
	return new e({
		type: `boolean`,
		...w$2(t)
	});
}
function Cs(e, t) {
	return new e({
		type: `boolean`,
		coerce: !0,
		...w$2(t)
	});
}
function ws(e, t) {
	return new e({
		type: `bigint`,
		...w$2(t)
	});
}
function Ts(e, t) {
	return new e({
		type: `bigint`,
		coerce: !0,
		...w$2(t)
	});
}
function Es(e, t) {
	return new e({
		type: `bigint`,
		check: `bigint_format`,
		abort: !1,
		format: `int64`,
		...w$2(t)
	});
}
function Ds(e, t) {
	return new e({
		type: `bigint`,
		check: `bigint_format`,
		abort: !1,
		format: `uint64`,
		...w$2(t)
	});
}
function Os(e, t) {
	return new e({
		type: `symbol`,
		...w$2(t)
	});
}
function ks(e, t) {
	return new e({
		type: `undefined`,
		...w$2(t)
	});
}
function As(e, t) {
	return new e({
		type: `null`,
		...w$2(t)
	});
}
function js(e) {
	return new e({ type: `any` });
}
function Ms(e) {
	return new e({ type: `unknown` });
}
function Ns(e, t) {
	return new e({
		type: `never`,
		...w$2(t)
	});
}
function Ps(e, t) {
	return new e({
		type: `void`,
		...w$2(t)
	});
}
function Fs(e, t) {
	return new e({
		type: `date`,
		...w$2(t)
	});
}
function Is(e, t) {
	return new e({
		type: `date`,
		coerce: !0,
		...w$2(t)
	});
}
function Ls(e, t) {
	return new e({
		type: `nan`,
		...w$2(t)
	});
}
function Rs(e, t) {
	return new wn$1({
		check: `less_than`,
		...w$2(t),
		value: e,
		inclusive: !1
	});
}
function zs(e, t) {
	return new wn$1({
		check: `less_than`,
		...w$2(t),
		value: e,
		inclusive: !0
	});
}
function Bs(e, t) {
	return new Tn$1({
		check: `greater_than`,
		...w$2(t),
		value: e,
		inclusive: !1
	});
}
function Vs(e, t) {
	return new Tn$1({
		check: `greater_than`,
		...w$2(t),
		value: e,
		inclusive: !0
	});
}
function Hs(e) {
	return Bs(0, e);
}
function Us(e) {
	return Rs(0, e);
}
function Ws(e) {
	return zs(0, e);
}
function Gs(e) {
	return Vs(0, e);
}
function Ks(e, t) {
	return new En$1({
		check: `multiple_of`,
		...w$2(t),
		value: e
	});
}
function qs(e, t) {
	return new kn$1({
		check: `max_size`,
		...w$2(t),
		maximum: e
	});
}
function Js(e, t) {
	return new An({
		check: `min_size`,
		...w$2(t),
		minimum: e
	});
}
function Ys(e, t) {
	return new jn({
		check: `size_equals`,
		...w$2(t),
		size: e
	});
}
function Xs(e, t) {
	return new Mn$1({
		check: `max_length`,
		...w$2(t),
		maximum: e
	});
}
function Zs(e, t) {
	return new Nn({
		check: `min_length`,
		...w$2(t),
		minimum: e
	});
}
function Qs(e, t) {
	return new Pn({
		check: `length_equals`,
		...w$2(t),
		length: e
	});
}
function $s(e, t) {
	return new Fn({
		check: `string_format`,
		format: `regex`,
		...w$2(t),
		pattern: e
	});
}
function ec(e) {
	return new In({
		check: `string_format`,
		format: `lowercase`,
		...w$2(e)
	});
}
function tc(e) {
	return new Ln({
		check: `string_format`,
		format: `uppercase`,
		...w$2(e)
	});
}
function nc(e, t) {
	return new Rn({
		check: `string_format`,
		format: `includes`,
		...w$2(t),
		includes: e
	});
}
function rc(e, t) {
	return new zn({
		check: `string_format`,
		format: `starts_with`,
		...w$2(t),
		prefix: e
	});
}
function ic(e, t) {
	return new Bn({
		check: `string_format`,
		format: `ends_with`,
		...w$2(t),
		suffix: e
	});
}
function ac(e, t, n) {
	return new Hn({
		check: `property`,
		property: e,
		schema: t,
		...w$2(n)
	});
}
function oc(e, t) {
	return new Un({
		check: `mime_type`,
		mime: e,
		...w$2(t)
	});
}
function J$2(e) {
	return new Wn({
		check: `overwrite`,
		tx: e
	});
}
function sc(e) {
	return J$2((t) => t.normalize(e));
}
function cc() {
	return J$2((e) => e.trim());
}
function lc() {
	return J$2((e) => e.toLowerCase());
}
function uc() {
	return J$2((e) => e.toUpperCase());
}
function dc() {
	return J$2((e) => fe$1(e));
}
function fc(e, t, n) {
	return new e({
		type: `array`,
		element: t,
		...w$2(n)
	});
}
function pc(e, t, n) {
	return new e({
		type: `union`,
		options: t,
		...w$2(n)
	});
}
function mc(e, t, n) {
	return new e({
		type: `union`,
		options: t,
		inclusive: !1,
		...w$2(n)
	});
}
function hc(e, t, n, r) {
	return new e({
		type: `union`,
		options: n,
		discriminator: t,
		...w$2(r)
	});
}
function gc(e, t, n) {
	return new e({
		type: `intersection`,
		left: t,
		right: n
	});
}
function _c(e, t, n, r) {
	let i = n instanceof H$2;
	return new e({
		type: `tuple`,
		items: t,
		rest: i ? n : null,
		...w$2(i ? r : n)
	});
}
function vc(e, t, n, r) {
	return new e({
		type: `record`,
		keyType: t,
		valueType: n,
		...w$2(r)
	});
}
function yc(e, t, n, r) {
	return new e({
		type: `map`,
		keyType: t,
		valueType: n,
		...w$2(r)
	});
}
function bc(e, t, n) {
	return new e({
		type: `set`,
		valueType: t,
		...w$2(n)
	});
}
function xc(e, t, n) {
	return new e({
		type: `enum`,
		entries: Array.isArray(t) ? Object.fromEntries(t.map((e) => [e, e])) : t,
		...w$2(n)
	});
}
function Sc(e, t, n) {
	return new e({
		type: `enum`,
		entries: t,
		...w$2(n)
	});
}
function Cc(e, t, n) {
	return new e({
		type: `literal`,
		values: Array.isArray(t) ? t : [t],
		...w$2(n)
	});
}
function wc(e, t) {
	return new e({
		type: `file`,
		...w$2(t)
	});
}
function Tc(e, t) {
	return new e({
		type: `transform`,
		transform: t
	});
}
function Ec(e, t) {
	return new e({
		type: `optional`,
		innerType: t
	});
}
function Dc(e, t) {
	return new e({
		type: `nullable`,
		innerType: t
	});
}
function Oc(e, t, n) {
	return new e({
		type: `default`,
		innerType: t,
		get defaultValue() {
			return typeof n == `function` ? n() : he(n);
		}
	});
}
function kc(e, t, n) {
	return new e({
		type: `nonoptional`,
		innerType: t,
		...w$2(n)
	});
}
function Ac(e, t) {
	return new e({
		type: `success`,
		innerType: t
	});
}
function jc(e, t, n) {
	return new e({
		type: `catch`,
		innerType: t,
		catchValue: typeof n == `function` ? n : () => n
	});
}
function Mc(e, t, n) {
	return new e({
		type: `pipe`,
		in: t,
		out: n
	});
}
function Nc(e, t) {
	return new e({
		type: `readonly`,
		innerType: t
	});
}
function Pc(e, t, n) {
	return new e({
		type: `template_literal`,
		parts: t,
		...w$2(n)
	});
}
function Fc(e, t) {
	return new e({
		type: `lazy`,
		getter: t
	});
}
function Ic(e, t) {
	return new e({
		type: `promise`,
		innerType: t
	});
}
function Lc(e, t, n) {
	let r = w$2(n);
	return r.abort ??= !0, new e({
		type: `custom`,
		check: `custom`,
		fn: t,
		...r
	});
}
function Rc(e, t, n) {
	return new e({
		type: `custom`,
		check: `custom`,
		fn: t,
		...w$2(n)
	});
}
function zc(e, t) {
	let n = Bc((t) => (t.addIssue = (e) => {
		if (typeof e == `string`) t.issues.push(j$2(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= `custom`, r.input ??= t.value, r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(j$2(r));
		}
	}, e(t.value, t)), t);
	return n;
}
function Bc(e, t) {
	let n = new B$2({
		check: `custom`,
		...w$2(t)
	});
	return n._zod.check = e, n;
}
function Vc(e) {
	let t = new B$2({ check: `describe` });
	return t._zod.onattach = [(t) => {
		let n = q$2.get(t) ?? {};
		q$2.add(t, {
			...n,
			description: e
		});
	}], t._zod.check = () => {}, t;
}
function Hc(e) {
	let t = new B$2({ check: `meta` });
	return t._zod.onattach = [(t) => {
		let n = q$2.get(t) ?? {};
		q$2.add(t, {
			...n,
			...e
		});
	}], t._zod.check = () => {}, t;
}
function Uc(e, t) {
	let n = w$2(t), r = n.truthy ?? [
		`true`,
		`1`,
		`yes`,
		`on`,
		`y`,
		`enabled`
	], i = n.falsy ?? [
		`false`,
		`0`,
		`no`,
		`off`,
		`n`,
		`disabled`
	];
	n.case !== `sensitive` && (r = r.map((e) => typeof e == `string` ? e.toLowerCase() : e), i = i.map((e) => typeof e == `string` ? e.toLowerCase() : e));
	let a = new Set(r), o = new Set(i), s = e.Codec ?? Si$1, c = e.Boolean ?? Cr, l = new s({
		type: `pipe`,
		in: new (e.String ?? U$2)({
			type: `string`,
			error: n.error
		}),
		out: new c({
			type: `boolean`,
			error: n.error
		}),
		transform: ((e, t) => {
			let r = e;
			return n.case !== `sensitive` && (r = r.toLowerCase()), a.has(r) ? !0 : o.has(r) ? !1 : (t.issues.push({
				code: `invalid_value`,
				expected: `stringbool`,
				values: [...a, ...o],
				input: t.value,
				inst: l,
				continue: !1
			}), {});
		}),
		reverseTransform: ((e, t) => e === !0 ? r[0] || `true` : i[0] || `false`),
		error: n.error
	});
	return l;
}
function Wc(e, t, n, r = {}) {
	let i = w$2(r), a = {
		...w$2(r),
		check: `string_format`,
		type: `string`,
		format: t,
		fn: typeof n == `function` ? n : (e) => n.test(e),
		...i
	};
	return n instanceof RegExp && (a.pattern = n), new e(a);
}
function Y$2(e) {
	let t = e?.target ?? `draft-2020-12`;
	return t === `draft-4` && (t = `draft-04`), t === `draft-7` && (t = `draft-07`), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? q$2,
		target: t,
		unrepresentable: e?.unrepresentable ?? `throw`,
		override: e?.override ?? (() => {}),
		io: e?.io ?? `output`,
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		cycles: e?.cycles ?? `ref`,
		reused: e?.reused ?? `inline`,
		external: e?.external ?? void 0
	};
}
function X$2(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o);
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref ||= a, X$2(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Object.assign(o.schema, c), t.io === `input` && $$2(e) && (delete o.schema.examples, delete o.schema.default), t.io === `input` && `_prefault` in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function Z$2(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error(`Unprocessed schema. This is a bug in Zod.`);
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === `draft-2020-12` ? `$defs` : `definitions`;
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i(`__shared`)}#/${r}/${a}`
			};
		}
		if (t[1] === n) return { ref: `#` };
		let i = `#/${r}/`, a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + a
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === `throw`) for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join(`/`)}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) {
			a(n);
			continue;
		}
		if (e.external) {
			let r = e.external.registry.get(n[0])?.id;
			if (t !== n[0] && r) {
				a(n);
				continue;
			}
		}
		if (e.metadataRegistry.get(n[0])?.id) {
			a(n);
			continue;
		}
		if (r.cycle) {
			a(n);
			continue;
		}
		if (r.count > 1 && e.reused === `ref`) {
			a(n);
			continue;
		}
	}
}
function Q$2(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error(`Unprocessed schema. This is a bug in Zod.`);
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === `draft-07` || e.target === `draft-04` || e.target === `openapi-3.0`) ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : Object.assign(i, s), Object.assign(i, a), t._zod.parent === o) for (let e in i) e === `$ref` || e === `allOf` || e in a || delete i[e];
			if (s.$ref && n.def) for (let e in i) e === `$ref` || e === `allOf` || e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e === `$ref` || e === `allOf` || e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	for (let t of [...e.seen.entries()].reverse()) r(t[0]);
	let i = {};
	if (e.target === `draft-2020-12` ? i.$schema = `https://json-schema.org/draft/2020-12/schema` : e.target === `draft-07` ? i.$schema = `http://json-schema.org/draft-07/schema#` : e.target === `draft-04` ? i.$schema = `http://json-schema.org/draft-04/schema#` : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Object.assign(i, n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, o[e.defId] = e.def);
	}
	e.external || Object.keys(o).length > 0 && (e.target === `draft-2020-12` ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t[`~standard`],
				jsonSchema: {
					input: Kc(t, `input`, e.processors),
					output: Kc(t, `output`, e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error(`Error converting schema to JSON.`);
	}
}
function $$2(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === `transform`) return !0;
	if (r.type === `array`) return $$2(r.element, n);
	if (r.type === `set`) return $$2(r.valueType, n);
	if (r.type === `lazy`) return $$2(r.getter(), n);
	if (r.type === `promise` || r.type === `optional` || r.type === `nonoptional` || r.type === `nullable` || r.type === `readonly` || r.type === "default" || r.type === `prefault`) return $$2(r.innerType, n);
	if (r.type === `intersection`) return $$2(r.left, n) || $$2(r.right, n);
	if (r.type === `record` || r.type === `map`) return $$2(r.keyType, n) || $$2(r.valueType, n);
	if (r.type === `pipe`) return e._zod.traits.has(`$ZodCodec`) ? !0 : $$2(r.in, n) || $$2(r.out, n);
	if (r.type === `object`) {
		for (let e in r.shape) if ($$2(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === `union`) {
		for (let e of r.options) if ($$2(e, n)) return !0;
		return !1;
	}
	if (r.type === `tuple`) {
		for (let e of r.items) if ($$2(e, n)) return !0;
		return !!(r.rest && $$2(r.rest, n));
	}
	return !1;
}
const Gc = (e, t = {}) => (n) => {
	let r = Y$2({
		...n,
		processors: t
	});
	return X$2(e, r), Z$2(r, e), Q$2(r, e);
}, Kc = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = Y$2({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return X$2(e, o), Z$2(o, e), Q$2(o, e);
}, qc = {
	guid: `uuid`,
	url: `uri`,
	datetime: `date-time`,
	json_string: `json-string`,
	regex: ``
}, Jc = (e, t, n, r) => {
	let i = n;
	i.type = `string`;
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l } = e._zod.bag;
	if (typeof a == `number` && (i.minLength = a), typeof o == `number` && (i.maxLength = o), s && (i.format = qc[s] ?? s, i.format === `` && delete i.format, s === `time` && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c];
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === `draft-07` || t.target === `draft-04` || t.target === `openapi-3.0` ? { type: `string` } : {},
			pattern: e.source
		}))]);
	}
}, Yc = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
	typeof s == `string` && s.includes(`int`) ? i.type = `integer` : i.type = `number`;
	let d = typeof u == `number` && u >= (a ?? -Infinity), f = typeof l == `number` && l <= (o ?? Infinity), p = t.target === `draft-04` || t.target === `openapi-3.0`;
	d ? p ? (i.minimum = u, i.exclusiveMinimum = !0) : i.exclusiveMinimum = u : typeof a == `number` && (i.minimum = a), f ? p ? (i.maximum = l, i.exclusiveMaximum = !0) : i.exclusiveMaximum = l : typeof o == `number` && (i.maximum = o), typeof c == `number` && (i.multipleOf = c);
}, Xc = (e, t, n, r) => {
	n.type = `boolean`;
}, Zc = (e, t, n, r) => {
	if (t.unrepresentable === `throw`) throw Error(`BigInt cannot be represented in JSON Schema`);
}, Qc = (e, t, n, r) => {
	if (t.unrepresentable === `throw`) throw Error(`Symbols cannot be represented in JSON Schema`);
}, $c = (e, t, n, r) => {
	t.target === `openapi-3.0` ? (n.type = `string`, n.nullable = !0, n.enum = [null]) : n.type = `null`;
}, el = (e, t, n, r) => {
	if (t.unrepresentable === `throw`) throw Error(`Undefined cannot be represented in JSON Schema`);
}, tl = (e, t, n, r) => {
	if (t.unrepresentable === `throw`) throw Error(`Void cannot be represented in JSON Schema`);
}, nl = (e, t, n, r) => {
	n.not = {};
}, rl = (e, t, n, r) => {}, il = (e, t, n, r) => {}, al = (e, t, n, r) => {
	if (t.unrepresentable === `throw`) throw Error(`Date cannot be represented in JSON Schema`);
}, ol = (e, t, n, r) => {
	let i = e._zod.def, a = te$1(i.entries);
	a.every((e) => typeof e == `number`) && (n.type = `number`), a.every((e) => typeof e == `string`) && (n.type = `string`), n.enum = a;
}, sl = (e, t, n, r) => {
	let i = e._zod.def, a = [];
	for (let e of i.values) if (e === void 0) {
		if (t.unrepresentable === `throw`) throw Error("Literal `undefined` cannot be represented in JSON Schema");
	} else if (typeof e == `bigint`) {
		if (t.unrepresentable === `throw`) throw Error(`BigInt literals cannot be represented in JSON Schema`);
		a.push(Number(e));
	} else a.push(e);
	if (a.length !== 0) if (a.length === 1) {
		let e = a[0];
		n.type = e === null ? `null` : typeof e, t.target === `draft-04` || t.target === `openapi-3.0` ? n.enum = [e] : n.const = e;
	} else a.every((e) => typeof e == `number`) && (n.type = `number`), a.every((e) => typeof e == `string`) && (n.type = `string`), a.every((e) => typeof e == `boolean`) && (n.type = `boolean`), a.every((e) => e === null) && (n.type = `null`), n.enum = a;
}, cl = (e, t, n, r) => {
	if (t.unrepresentable === `throw`) throw Error(`NaN cannot be represented in JSON Schema`);
}, ll = (e, t, n, r) => {
	let i = n, a = e._zod.pattern;
	if (!a) throw Error(`Pattern not found in template literal`);
	i.type = `string`, i.pattern = a.source;
}, ul = (e, t, n, r) => {
	let i = n, a = {
		type: `string`,
		format: `binary`,
		contentEncoding: `binary`
	}, { minimum: o, maximum: s, mime: c } = e._zod.bag;
	o !== void 0 && (a.minLength = o), s !== void 0 && (a.maxLength = s), c ? c.length === 1 ? (a.contentMediaType = c[0], Object.assign(i, a)) : (Object.assign(i, a), i.anyOf = c.map((e) => ({ contentMediaType: e }))) : Object.assign(i, a);
}, dl = (e, t, n, r) => {
	n.type = `boolean`;
}, fl = (e, t, n, r) => {
	if (t.unrepresentable === `throw`) throw Error(`Custom types cannot be represented in JSON Schema`);
}, pl = (e, t, n, r) => {
	if (t.unrepresentable === `throw`) throw Error(`Function types cannot be represented in JSON Schema`);
}, ml = (e, t, n, r) => {
	if (t.unrepresentable === `throw`) throw Error(`Transforms cannot be represented in JSON Schema`);
}, hl = (e, t, n, r) => {
	if (t.unrepresentable === `throw`) throw Error(`Map cannot be represented in JSON Schema`);
}, gl = (e, t, n, r) => {
	if (t.unrepresentable === `throw`) throw Error(`Set cannot be represented in JSON Schema`);
}, _l = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = e._zod.bag;
	typeof o == `number` && (i.minItems = o), typeof s == `number` && (i.maxItems = s), i.type = `array`, i.items = X$2(a.element, t, {
		...r,
		path: [...r.path, `items`]
	});
}, vl = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = `object`, i.properties = {};
	let o = a.shape;
	for (let e in o) i.properties[e] = X$2(o[e], t, {
		...r,
		path: [
			...r.path,
			`properties`,
			e
		]
	});
	let s = new Set(Object.keys(o)), c = new Set([...s].filter((e) => {
		let n = a.shape[e]._zod;
		return t.io === `input` ? n.optin === void 0 : n.optout === void 0;
	}));
	c.size > 0 && (i.required = Array.from(c)), a.catchall?._zod.def.type === `never` ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = X$2(a.catchall, t, {
		...r,
		path: [...r.path, `additionalProperties`]
	})) : t.io === `output` && (i.additionalProperties = !1);
}, yl = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => X$2(e, t, {
		...r,
		path: [
			...r.path,
			a ? `oneOf` : `anyOf`,
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, bl = (e, t, n, r) => {
	let i = e._zod.def, a = X$2(i.left, t, {
		...r,
		path: [
			...r.path,
			`allOf`,
			0
		]
	}), o = X$2(i.right, t, {
		...r,
		path: [
			...r.path,
			`allOf`,
			1
		]
	}), s = (e) => `allOf` in e && Object.keys(e).length === 1;
	n.allOf = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
}, xl = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = `array`;
	let o = t.target === `draft-2020-12` ? `prefixItems` : `items`, s = t.target === `draft-2020-12` || t.target === `openapi-3.0` ? `items` : `additionalItems`, c = a.items.map((e, n) => X$2(e, t, {
		...r,
		path: [
			...r.path,
			o,
			n
		]
	})), l = a.rest ? X$2(a.rest, t, {
		...r,
		path: [
			...r.path,
			s,
			...t.target === `openapi-3.0` ? [a.items.length] : []
		]
	}) : null;
	t.target === `draft-2020-12` ? (i.prefixItems = c, l && (i.items = l)) : t.target === `openapi-3.0` ? (i.items = { anyOf: c }, l && i.items.anyOf.push(l), i.minItems = c.length, l || (i.maxItems = c.length)) : (i.items = c, l && (i.additionalItems = l));
	let { minimum: u, maximum: d } = e._zod.bag;
	typeof u == `number` && (i.minItems = u), typeof d == `number` && (i.maxItems = d);
}, Sl = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = `object`;
	let o = a.keyType, s = o._zod.bag?.patterns;
	if (a.mode === `loose` && s && s.size > 0) {
		let e = X$2(a.valueType, t, {
			...r,
			path: [
				...r.path,
				`patternProperties`,
				`*`
			]
		});
		i.patternProperties = {};
		for (let t of s) i.patternProperties[t.source] = e;
	} else (t.target === `draft-07` || t.target === `draft-2020-12`) && (i.propertyNames = X$2(a.keyType, t, {
		...r,
		path: [...r.path, `propertyNames`]
	})), i.additionalProperties = X$2(a.valueType, t, {
		...r,
		path: [...r.path, `additionalProperties`]
	});
	let c = o._zod.values;
	if (c) {
		let e = [...c].filter((e) => typeof e == `string` || typeof e == `number`);
		e.length > 0 && (i.required = e);
	}
}, Cl = (e, t, n, r) => {
	let i = e._zod.def, a = X$2(i.innerType, t, r), o = t.seen.get(e);
	t.target === `openapi-3.0` ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: `null` }];
}, wl = (e, t, n, r) => {
	let i = e._zod.def;
	X$2(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Tl = (e, t, n, r) => {
	let i = e._zod.def;
	X$2(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.default = JSON.parse(JSON.stringify(i.defaultValue));
}, El = (e, t, n, r) => {
	let i = e._zod.def;
	X$2(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, t.io === `input` && (n._prefault = JSON.parse(JSON.stringify(i.defaultValue)));
}, Dl = (e, t, n, r) => {
	let i = e._zod.def;
	X$2(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		throw Error(`Dynamic catch values are not supported in JSON Schema`);
	}
	n.default = o;
}, Ol = (e, t, n, r) => {
	let i = e._zod.def, a = i.in._zod.traits.has(`$ZodTransform`), o = t.io === `input` ? a ? i.out : i.in : i.out;
	X$2(o, t, r);
	let s = t.seen.get(e);
	s.ref = o;
}, kl = (e, t, n, r) => {
	let i = e._zod.def;
	X$2(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, Al = (e, t, n, r) => {
	let i = e._zod.def;
	X$2(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, jl = (e, t, n, r) => {
	let i = e._zod.def;
	X$2(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Ml = (e, t, n, r) => {
	let i = e._zod.innerType;
	X$2(i, t, r);
	let a = t.seen.get(e);
	a.ref = i;
}, Nl = {
	string: Jc,
	number: Yc,
	boolean: Xc,
	bigint: Zc,
	symbol: Qc,
	null: $c,
	undefined: el,
	void: tl,
	never: nl,
	any: rl,
	unknown: il,
	date: al,
	enum: ol,
	literal: sl,
	nan: cl,
	template_literal: ll,
	file: ul,
	success: dl,
	custom: fl,
	function: pl,
	transform: ml,
	map: hl,
	set: gl,
	array: _l,
	object: vl,
	union: yl,
	intersection: bl,
	tuple: xl,
	record: Sl,
	nullable: Cl,
	nonoptional: wl,
	default: Tl,
	prefault: El,
	catch: Dl,
	pipe: Ol,
	readonly: kl,
	promise: Al,
	optional: jl,
	lazy: Ml
};
function Pl(e, t) {
	if (`_idmap` in e) {
		let n = e, r = Y$2({
			...t,
			processors: Nl
		}), i = {};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			X$2(n, r);
		}
		let a = {};
		r.external = {
			registry: n,
			uri: t?.uri,
			defs: i
		};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			Z$2(r, n), a[t] = Q$2(r, n);
		}
		return Object.keys(i).length > 0 && (a.__shared = { [r.target === `draft-2020-12` ? `$defs` : `definitions`]: i }), { schemas: a };
	}
	let n = Y$2({
		...t,
		processors: Nl
	});
	return X$2(e, n), Z$2(n, e), Q$2(n, e);
}
var Fl = class {
	get metadataRegistry() {
		return this.ctx.metadataRegistry;
	}
	get target() {
		return this.ctx.target;
	}
	get unrepresentable() {
		return this.ctx.unrepresentable;
	}
	get override() {
		return this.ctx.override;
	}
	get io() {
		return this.ctx.io;
	}
	get counter() {
		return this.ctx.counter;
	}
	set counter(e) {
		this.ctx.counter = e;
	}
	get seen() {
		return this.ctx.seen;
	}
	constructor(e) {
		let t = e?.target ?? `draft-2020-12`;
		t === `draft-4` && (t = `draft-04`), t === `draft-7` && (t = `draft-07`), this.ctx = Y$2({
			processors: Nl,
			target: t,
			...e?.metadata && { metadata: e.metadata },
			...e?.unrepresentable && { unrepresentable: e.unrepresentable },
			...e?.override && { override: e.override },
			...e?.io && { io: e.io }
		});
	}
	process(e, t = {
		path: [],
		schemaPath: []
	}) {
		return X$2(e, this.ctx, t);
	}
	emit(e, t) {
		t && (t.cycles && (this.ctx.cycles = t.cycles), t.reused && (this.ctx.reused = t.reused), t.external && (this.ctx.external = t.external)), Z$2(this.ctx, e);
		let { "~standard": n, ...r } = Q$2(this.ctx, e);
		return r;
	}
}, Il = l$2({}), Ll = l$2({
	$ZodAny: () => kr$1,
	$ZodArray: () => Fr,
	$ZodAsyncError: () => a,
	$ZodBase64: () => mr,
	$ZodBase64URL: () => gr,
	$ZodBigInt: () => wr,
	$ZodBigIntFormat: () => Tr,
	$ZodBoolean: () => Cr,
	$ZodCIDRv4: () => dr,
	$ZodCIDRv6: () => fr,
	$ZodCUID: () => $n,
	$ZodCUID2: () => er,
	$ZodCatch: () => vi$1,
	$ZodCheck: () => B$2,
	$ZodCheckBigIntFormat: () => On$1,
	$ZodCheckEndsWith: () => Bn,
	$ZodCheckGreaterThan: () => Tn$1,
	$ZodCheckIncludes: () => Rn,
	$ZodCheckLengthEquals: () => Pn,
	$ZodCheckLessThan: () => wn$1,
	$ZodCheckLowerCase: () => In,
	$ZodCheckMaxLength: () => Mn$1,
	$ZodCheckMaxSize: () => kn$1,
	$ZodCheckMimeType: () => Un,
	$ZodCheckMinLength: () => Nn,
	$ZodCheckMinSize: () => An,
	$ZodCheckMultipleOf: () => En$1,
	$ZodCheckNumberFormat: () => Dn$1,
	$ZodCheckOverwrite: () => Wn,
	$ZodCheckProperty: () => Hn,
	$ZodCheckRegex: () => Fn,
	$ZodCheckSizeEquals: () => jn,
	$ZodCheckStartsWith: () => zn,
	$ZodCheckStringFormat: () => V$2,
	$ZodCheckUpperCase: () => Ln,
	$ZodCodec: () => Si$1,
	$ZodCustom: () => Mi$1,
	$ZodCustomStringFormat: () => br,
	$ZodDate: () => Nr,
	$ZodDefault: () => fi$1,
	$ZodDiscriminatedUnion: () => Gr,
	$ZodE164: () => _r,
	$ZodEmail: () => Yn,
	$ZodEmoji: () => Zn,
	$ZodEncodeError: () => o,
	$ZodEnum: () => ii,
	$ZodError: () => Ue,
	$ZodExactOptional: () => ui$1,
	$ZodFile: () => oi,
	$ZodFunction: () => ki$1,
	$ZodGUID: () => qn,
	$ZodIPv4: () => cr,
	$ZodIPv6: () => lr,
	$ZodISODate: () => ar,
	$ZodISODateTime: () => ir,
	$ZodISODuration: () => sr,
	$ZodISOTime: () => or,
	$ZodIntersection: () => Kr,
	$ZodJWT: () => yr,
	$ZodKSUID: () => rr,
	$ZodLazy: () => ji$1,
	$ZodLiteral: () => ai,
	$ZodMAC: () => ur,
	$ZodMap: () => ei,
	$ZodNaN: () => yi$1,
	$ZodNanoID: () => Qn,
	$ZodNever: () => jr$1,
	$ZodNonOptional: () => hi$1,
	$ZodNull: () => Or$1,
	$ZodNullable: () => di$1,
	$ZodNumber: () => xr,
	$ZodNumberFormat: () => Sr,
	$ZodObject: () => zr,
	$ZodObjectJIT: () => Br,
	$ZodOptional: () => li$1,
	$ZodPipe: () => bi$1,
	$ZodPrefault: () => mi$1,
	$ZodPreprocess: () => Ti$1,
	$ZodPromise: () => Ai$1,
	$ZodReadonly: () => Ei$1,
	$ZodRealError: () => M$1,
	$ZodRecord: () => $r,
	$ZodRegistry: () => Lo$1,
	$ZodSet: () => ni,
	$ZodString: () => U$2,
	$ZodStringFormat: () => W$1,
	$ZodSuccess: () => _i$1,
	$ZodSymbol: () => Er,
	$ZodTemplateLiteral: () => Oi$1,
	$ZodTransform: () => si$1,
	$ZodTuple: () => Yr,
	$ZodType: () => H$2,
	$ZodULID: () => tr,
	$ZodURL: () => Xn,
	$ZodUUID: () => Jn,
	$ZodUndefined: () => Dr$1,
	$ZodUnion: () => Hr,
	$ZodUnknown: () => Ar$1,
	$ZodVoid: () => Mr$1,
	$ZodXID: () => nr,
	$ZodXor: () => Wr,
	$brand: () => i$2,
	$constructor: () => r$2,
	$input: () => Io$1,
	$output: () => Fo$1,
	Doc: () => Gn,
	JSONSchema: () => Il,
	JSONSchemaGenerator: () => Fl,
	NEVER: () => n$2,
	TimePrecision: () => us,
	_any: () => js,
	_array: () => fc,
	_base64: () => os,
	_base64url: () => ss,
	_bigint: () => ws,
	_boolean: () => Ss,
	_catch: () => jc,
	_check: () => Bc,
	_cidrv4: () => is,
	_cidrv6: () => as,
	_coercedBigint: () => Ts,
	_coercedBoolean: () => Cs,
	_coercedDate: () => Is,
	_coercedNumber: () => gs,
	_coercedString: () => Bo$1,
	_cuid: () => Xo$1,
	_cuid2: () => Zo$1,
	_custom: () => Lc,
	_date: () => Fs,
	_decode: () => tt$1,
	_decodeAsync: () => at,
	_default: () => Oc,
	_discriminatedUnion: () => hc,
	_e164: () => cs,
	_email: () => Vo$1,
	_emoji: () => Jo$1,
	_encode: () => $e,
	_encodeAsync: () => rt$1,
	_endsWith: () => ic,
	_enum: () => xc,
	_file: () => wc,
	_float32: () => vs,
	_float64: () => ys,
	_gt: () => Bs,
	_gte: () => Vs,
	_guid: () => Ho$1,
	_includes: () => nc,
	_int: () => _s,
	_int32: () => bs,
	_int64: () => Es,
	_intersection: () => gc,
	_ipv4: () => ts,
	_ipv6: () => ns,
	_isoDate: () => fs$1,
	_isoDateTime: () => ds,
	_isoDuration: () => ms,
	_isoTime: () => ps,
	_jwt: () => ls,
	_ksuid: () => es$1,
	_lazy: () => Fc,
	_length: () => Qs,
	_literal: () => Cc,
	_lowercase: () => ec,
	_lt: () => Rs,
	_lte: () => zs,
	_mac: () => rs,
	_map: () => yc,
	_max: () => zs,
	_maxLength: () => Xs,
	_maxSize: () => qs,
	_mime: () => oc,
	_min: () => Vs,
	_minLength: () => Zs,
	_minSize: () => Js,
	_multipleOf: () => Ks,
	_nan: () => Ls,
	_nanoid: () => Yo$1,
	_nativeEnum: () => Sc,
	_negative: () => Us,
	_never: () => Ns,
	_nonnegative: () => Gs,
	_nonoptional: () => kc,
	_nonpositive: () => Ws,
	_normalize: () => sc,
	_null: () => As,
	_nullable: () => Dc,
	_number: () => hs,
	_optional: () => Ec,
	_overwrite: () => J$2,
	_parse: () => N$1,
	_parseAsync: () => P$2,
	_pipe: () => Mc,
	_positive: () => Hs,
	_promise: () => Ic,
	_property: () => ac,
	_readonly: () => Nc,
	_record: () => vc,
	_refine: () => Rc,
	_regex: () => $s,
	_safeDecode: () => lt,
	_safeDecodeAsync: () => pt,
	_safeEncode: () => st,
	_safeEncodeAsync: () => dt,
	_safeParse: () => F$2,
	_safeParseAsync: () => I$2,
	_set: () => bc,
	_size: () => Ys,
	_slugify: () => dc,
	_startsWith: () => rc,
	_string: () => zo$1,
	_stringFormat: () => Wc,
	_stringbool: () => Uc,
	_success: () => Ac,
	_superRefine: () => zc,
	_symbol: () => Os,
	_templateLiteral: () => Pc,
	_toLowerCase: () => lc,
	_toUpperCase: () => uc,
	_transform: () => Tc,
	_trim: () => cc,
	_tuple: () => _c,
	_uint32: () => xs,
	_uint64: () => Ds,
	_ulid: () => Qo$1,
	_undefined: () => ks,
	_union: () => pc,
	_unknown: () => Ms,
	_uppercase: () => tc,
	_url: () => qo$1,
	_uuid: () => Uo$1,
	_uuidv4: () => Wo$1,
	_uuidv6: () => Go$1,
	_uuidv7: () => Ko$1,
	_void: () => Ps,
	_xid: () => $o$1,
	_xor: () => mc,
	clone: () => C$2,
	config: () => c$1,
	createStandardJSONSchemaMethod: () => Kc,
	createToJSONSchemaMethod: () => Gc,
	decode: () => nt$1,
	decodeAsync: () => ot,
	describe: () => Vc,
	encode: () => et,
	encodeAsync: () => it,
	extractDefs: () => Z$2,
	finalize: () => Q$2,
	flattenError: () => We,
	formatError: () => Ge,
	globalConfig: () => s,
	globalRegistry: () => q$2,
	initializeContext: () => Y$2,
	isValidBase64: () => pr,
	isValidBase64URL: () => hr,
	isValidJWT: () => vr,
	locales: () => No$1,
	meta: () => Hc,
	parse: () => Ye$1,
	parseAsync: () => Xe,
	prettifyError: () => Je$1,
	process: () => X$2,
	regexes: () => ht,
	registry: () => Ro$1,
	safeDecode: () => ut,
	safeDecodeAsync: () => mt,
	safeEncode: () => ct,
	safeEncodeAsync: () => ft,
	safeParse: () => Ze$1,
	safeParseAsync: () => Qe,
	toDotPath: () => qe,
	toJSONSchema: () => Pl,
	treeifyError: () => Ke,
	util: () => l$1,
	version: () => Kn
});
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/compiled/_chunks/workflow/schemas-iG9Z4s4o.js
var si = l$2({
	endsWith: () => ic,
	gt: () => Bs,
	gte: () => Vs,
	includes: () => nc,
	length: () => Qs,
	lowercase: () => ec,
	lt: () => Rs,
	lte: () => zs,
	maxLength: () => Xs,
	maxSize: () => qs,
	mime: () => oc,
	minLength: () => Zs,
	minSize: () => Js,
	multipleOf: () => Ks,
	negative: () => Us,
	nonnegative: () => Gs,
	nonpositive: () => Ws,
	normalize: () => sc,
	overwrite: () => J$2,
	positive: () => Hs,
	property: () => ac,
	regex: () => $s,
	size: () => Ys,
	slugify: () => dc,
	startsWith: () => rc,
	toLowerCase: () => lc,
	toUpperCase: () => uc,
	trim: () => cc,
	uppercase: () => tc
}), ci = l$2({
	ZodISODate: () => di,
	ZodISODateTime: () => li,
	ZodISODuration: () => hi,
	ZodISOTime: () => pi,
	date: () => fi,
	datetime: () => ui,
	duration: () => gi,
	time: () => mi
});
const li = r$2(`ZodISODateTime`, (e, t) => {
	ir.init(e, t), x$1.init(e, t);
});
function ui(e) {
	return ds(li, e);
}
const di = r$2(`ZodISODate`, (e, t) => {
	ar.init(e, t), x$1.init(e, t);
});
function fi(e) {
	return fs$1(di, e);
}
const pi = r$2(`ZodISOTime`, (e, t) => {
	or.init(e, t), x$1.init(e, t);
});
function mi(e) {
	return ps(pi, e);
}
const hi = r$2(`ZodISODuration`, (e, t) => {
	sr.init(e, t), x$1.init(e, t);
});
function gi(e) {
	return ms(hi, e);
}
const _i = (e, t) => {
	Ue.init(e, t), e.name = `ZodError`, Object.defineProperties(e, {
		format: { value: (t) => Ge(e, t) },
		flatten: { value: (t) => We(e, t) },
		addIssue: { value: (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, ne$1, 2);
		} },
		addIssues: { value: (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, ne$1, 2);
		} },
		isEmpty: { get() {
			return e.issues.length === 0;
		} }
	});
}, vi = r$2(`ZodError`, _i), g$2 = r$2(`ZodError`, _i, { Parent: Error }), yi = N$1(g$2), bi = P$2(g$2), xi = F$2(g$2), Si = I$2(g$2), Ci = $e(g$2), wi = tt$1(g$2), Ti = rt$1(g$2), Ei = at(g$2), Di = st(g$2), Oi = lt(g$2), ki = dt(g$2), Ai = pt(g$2);
var ji = l$2({
	ZodAny: () => Ma,
	ZodArray: () => Ba,
	ZodBase64: () => k$1,
	ZodBase64URL: () => A,
	ZodBigInt: () => R$1,
	ZodBigIntFormat: () => z$1,
	ZodBoolean: () => L$1,
	ZodCIDRv4: () => D$1,
	ZodCIDRv6: () => O$1,
	ZodCUID: () => Ki,
	ZodCUID2: () => Ji,
	ZodCatch: () => Do,
	ZodCodec: () => Q$1,
	ZodCustom: () => $$1,
	ZodCustomStringFormat: () => N,
	ZodDate: () => Ra,
	ZodDefault: () => yo,
	ZodDiscriminatedUnion: () => qa,
	ZodE164: () => j$1,
	ZodEmail: () => S$1,
	ZodEmoji: () => Hi,
	ZodEnum: () => q$1,
	ZodExactOptional: () => ho,
	ZodFile: () => uo,
	ZodFunction: () => Uo,
	ZodGUID: () => C$1,
	ZodIPv4: () => na,
	ZodIPv6: () => E$1,
	ZodIntersection: () => Ya,
	ZodJWT: () => M,
	ZodKSUID: () => ea,
	ZodLazy: () => zo,
	ZodLiteral: () => co,
	ZodMAC: () => ia,
	ZodMap: () => no,
	ZodNaN: () => ko,
	ZodNanoID: () => Wi,
	ZodNever: () => Fa,
	ZodNonOptional: () => Co,
	ZodNull: () => Aa,
	ZodNullable: () => _o,
	ZodNumber: () => P$1,
	ZodNumberFormat: () => F$1,
	ZodObject: () => U$1,
	ZodOptional: () => mo,
	ZodPipe: () => Z$1,
	ZodPrefault: () => xo,
	ZodPreprocess: () => Po,
	ZodPromise: () => Vo,
	ZodReadonly: () => Fo,
	ZodRecord: () => K,
	ZodSet: () => io,
	ZodString: () => y$1,
	ZodStringFormat: () => x$1,
	ZodSuccess: () => To,
	ZodSymbol: () => Ea,
	ZodTemplateLiteral: () => Lo,
	ZodTransform: () => po,
	ZodTuple: () => Za,
	ZodType: () => v$1,
	ZodULID: () => Xi,
	ZodURL: () => T$1,
	ZodUUID: () => w$1,
	ZodUndefined: () => Oa,
	ZodUnion: () => W,
	ZodUnknown: () => Pa,
	ZodVoid: () => Ia,
	ZodXID: () => Qi,
	ZodXor: () => Ga,
	_ZodString: () => Ni,
	_default: () => bo,
	_function: () => Wo,
	any: () => Na,
	array: () => H$1,
	base64: () => la,
	base64url: () => ua,
	bigint: () => Ca,
	boolean: () => Sa,
	catch: () => Oo,
	check: () => Go,
	cidrv4: () => sa,
	cidrv6: () => ca,
	codec: () => Mo,
	cuid: () => qi,
	cuid2: () => Yi,
	custom: () => Ko,
	date: () => za,
	describe: () => Yo,
	discriminatedUnion: () => Ja,
	e164: () => da,
	email: () => Pi,
	emoji: () => Ui,
	enum: () => oo,
	exactOptional: () => go,
	file: () => fo,
	float32: () => va,
	float64: () => ya,
	function: () => Wo,
	guid: () => Fi,
	hash: () => ga,
	hex: () => ha,
	hostname: () => ma,
	httpUrl: () => Vi,
	instanceof: () => Zo,
	int: () => I$1,
	int32: () => ba,
	int64: () => wa,
	intersection: () => Xa,
	invertCodec: () => No,
	ipv4: () => ra,
	ipv6: () => oa,
	json: () => $o,
	jwt: () => fa,
	keyof: () => Va,
	ksuid: () => ta,
	lazy: () => Bo,
	literal: () => lo,
	looseObject: () => Wa,
	looseRecord: () => to,
	mac: () => aa,
	map: () => ro,
	meta: () => Xo,
	nan: () => Ao,
	nanoid: () => Gi,
	nativeEnum: () => so,
	never: () => V$1,
	nonoptional: () => wo,
	null: () => ja,
	nullable: () => X$1,
	nullish: () => vo,
	number: () => _a,
	object: () => Ha,
	optional: () => Y$1,
	partialRecord: () => eo,
	pipe: () => jo,
	prefault: () => So,
	preprocess: () => es,
	promise: () => Ho,
	readonly: () => Io,
	record: () => $a,
	refine: () => qo,
	set: () => ao,
	strictObject: () => Ua,
	string: () => b,
	stringFormat: () => pa,
	stringbool: () => Qo,
	success: () => Eo,
	superRefine: () => Jo,
	symbol: () => Da,
	templateLiteral: () => Ro,
	transform: () => J$1,
	tuple: () => Qa,
	uint32: () => xa,
	uint64: () => Ta,
	ulid: () => Zi,
	undefined: () => ka,
	union: () => G,
	unknown: () => B$1,
	url: () => Bi,
	uuid: () => Ii,
	uuidv4: () => Li,
	uuidv6: () => Ri,
	uuidv7: () => zi,
	void: () => La,
	xid: () => $i,
	xor: () => Ka
});
const Mi = /* @__PURE__ */ new WeakMap();
function _$1(e, t, n) {
	let r = Object.getPrototypeOf(e), i = Mi.get(r);
	if (i || (i = /* @__PURE__ */ new Set(), Mi.set(r, i)), !i.has(t)) {
		i.add(t);
		for (let e in n) {
			let t = n[e];
			Object.defineProperty(r, e, {
				configurable: !0,
				enumerable: !1,
				get() {
					let n = t.bind(this);
					return Object.defineProperty(this, e, {
						configurable: !0,
						writable: !0,
						enumerable: !0,
						value: n
					}), n;
				},
				set(t) {
					Object.defineProperty(this, e, {
						configurable: !0,
						writable: !0,
						enumerable: !0,
						value: t
					});
				}
			});
		}
	}
}
const v$1 = r$2(`ZodType`, (e, t) => (H$2.init(e, t), Object.assign(e[`~standard`], { jsonSchema: {
	input: Kc(e, `input`),
	output: Kc(e, `output`)
} }), e.toJSONSchema = Gc(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.parse = (t, n) => yi(e, t, n, { callee: e.parse }), e.safeParse = (t, n) => xi(e, t, n), e.parseAsync = async (t, n) => bi(e, t, n, { callee: e.parseAsync }), e.safeParseAsync = async (t, n) => Si(e, t, n), e.spa = e.safeParseAsync, e.encode = (t, n) => Ci(e, t, n), e.decode = (t, n) => wi(e, t, n), e.encodeAsync = async (t, n) => Ti(e, t, n), e.decodeAsync = async (t, n) => Ei(e, t, n), e.safeEncode = (t, n) => Di(e, t, n), e.safeDecode = (t, n) => Oi(e, t, n), e.safeEncodeAsync = async (t, n) => ki(e, t, n), e.safeDecodeAsync = async (t, n) => Ai(e, t, n), _$1(e, `ZodType`, {
	check(...e) {
		let t = this.def;
		return this.clone(y$2(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == `function` ? { _zod: {
			check: e,
			def: { check: `custom` },
			onattach: []
		} } : e)] }), { parent: !0 });
	},
	with(...e) {
		return this.check(...e);
	},
	clone(e, t) {
		return C$2(this, e, t);
	},
	brand() {
		return this;
	},
	register(e, t) {
		return e.add(this, t), this;
	},
	refine(e, t) {
		return this.check(qo(e, t));
	},
	superRefine(e, t) {
		return this.check(Jo(e, t));
	},
	overwrite(e) {
		return this.check(J$2(e));
	},
	optional() {
		return Y$1(this);
	},
	exactOptional() {
		return go(this);
	},
	nullable() {
		return X$1(this);
	},
	nullish() {
		return Y$1(X$1(this));
	},
	nonoptional(e) {
		return wo(this, e);
	},
	array() {
		return H$1(this);
	},
	or(e) {
		return G([this, e]);
	},
	and(e) {
		return Xa(this, e);
	},
	transform(e) {
		return jo(this, J$1(e));
	},
	default(e) {
		return bo(this, e);
	},
	prefault(e) {
		return So(this, e);
	},
	catch(e) {
		return Oo(this, e);
	},
	pipe(e) {
		return jo(this, e);
	},
	readonly() {
		return Io(this);
	},
	describe(e) {
		let t = this.clone();
		return q$2.add(t, { description: e }), t;
	},
	meta(...e) {
		if (e.length === 0) return q$2.get(this);
		let t = this.clone();
		return q$2.add(t, e[0]), t;
	},
	isOptional() {
		return this.safeParse(void 0).success;
	},
	isNullable() {
		return this.safeParse(null).success;
	},
	apply(e) {
		return e(this);
	}
}), Object.defineProperty(e, "description", {
	get() {
		return q$2.get(e)?.description;
	},
	configurable: !0
}), e)), Ni = r$2(`_ZodString`, (e, t) => {
	U$2.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => Jc(e, t, n, r);
	let n = e._zod.bag;
	e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, _$1(e, `_ZodString`, {
		regex(...e) {
			return this.check($s(...e));
		},
		includes(...e) {
			return this.check(nc(...e));
		},
		startsWith(...e) {
			return this.check(rc(...e));
		},
		endsWith(...e) {
			return this.check(ic(...e));
		},
		min(...e) {
			return this.check(Zs(...e));
		},
		max(...e) {
			return this.check(Xs(...e));
		},
		length(...e) {
			return this.check(Qs(...e));
		},
		nonempty(...e) {
			return this.check(Zs(1, ...e));
		},
		lowercase(e) {
			return this.check(ec(e));
		},
		uppercase(e) {
			return this.check(tc(e));
		},
		trim() {
			return this.check(cc());
		},
		normalize(...e) {
			return this.check(sc(...e));
		},
		toLowerCase() {
			return this.check(lc());
		},
		toUpperCase() {
			return this.check(uc());
		},
		slugify() {
			return this.check(dc());
		}
	});
}), y$1 = r$2(`ZodString`, (e, t) => {
	U$2.init(e, t), Ni.init(e, t), e.email = (t) => e.check(Vo$1(S$1, t)), e.url = (t) => e.check(qo$1(T$1, t)), e.jwt = (t) => e.check(ls(M, t)), e.emoji = (t) => e.check(Jo$1(Hi, t)), e.guid = (t) => e.check(Ho$1(C$1, t)), e.uuid = (t) => e.check(Uo$1(w$1, t)), e.uuidv4 = (t) => e.check(Wo$1(w$1, t)), e.uuidv6 = (t) => e.check(Go$1(w$1, t)), e.uuidv7 = (t) => e.check(Ko$1(w$1, t)), e.nanoid = (t) => e.check(Yo$1(Wi, t)), e.guid = (t) => e.check(Ho$1(C$1, t)), e.cuid = (t) => e.check(Xo$1(Ki, t)), e.cuid2 = (t) => e.check(Zo$1(Ji, t)), e.ulid = (t) => e.check(Qo$1(Xi, t)), e.base64 = (t) => e.check(os(k$1, t)), e.base64url = (t) => e.check(ss(A, t)), e.xid = (t) => e.check($o$1(Qi, t)), e.ksuid = (t) => e.check(es$1(ea, t)), e.ipv4 = (t) => e.check(ts(na, t)), e.ipv6 = (t) => e.check(ns(E$1, t)), e.cidrv4 = (t) => e.check(is(D$1, t)), e.cidrv6 = (t) => e.check(as(O$1, t)), e.e164 = (t) => e.check(cs(j$1, t)), e.datetime = (t) => e.check(ui(t)), e.date = (t) => e.check(fi(t)), e.time = (t) => e.check(mi(t)), e.duration = (t) => e.check(gi(t));
});
function b(e) {
	return zo$1(y$1, e);
}
const x$1 = r$2(`ZodStringFormat`, (e, t) => {
	W$1.init(e, t), Ni.init(e, t);
}), S$1 = r$2(`ZodEmail`, (e, t) => {
	Yn.init(e, t), x$1.init(e, t);
});
function Pi(e) {
	return Vo$1(S$1, e);
}
const C$1 = r$2(`ZodGUID`, (e, t) => {
	qn.init(e, t), x$1.init(e, t);
});
function Fi(e) {
	return Ho$1(C$1, e);
}
const w$1 = r$2(`ZodUUID`, (e, t) => {
	Jn.init(e, t), x$1.init(e, t);
});
function Ii(e) {
	return Uo$1(w$1, e);
}
function Li(e) {
	return Wo$1(w$1, e);
}
function Ri(e) {
	return Go$1(w$1, e);
}
function zi(e) {
	return Ko$1(w$1, e);
}
const T$1 = r$2(`ZodURL`, (e, t) => {
	Xn.init(e, t), x$1.init(e, t);
});
function Bi(e) {
	return qo$1(T$1, e);
}
function Vi(e) {
	return qo$1(T$1, {
		protocol: Wt,
		hostname: Ut,
		...w$2(e)
	});
}
const Hi = r$2(`ZodEmoji`, (e, n) => {
	Zn.init(e, n), x$1.init(e, n);
});
function Ui(e) {
	return Jo$1(Hi, e);
}
const Wi = r$2(`ZodNanoID`, (e, t) => {
	Qn.init(e, t), x$1.init(e, t);
});
function Gi(e) {
	return Yo$1(Wi, e);
}
const Ki = r$2(`ZodCUID`, (e, t) => {
	$n.init(e, t), x$1.init(e, t);
});
function qi(e) {
	return Xo$1(Ki, e);
}
const Ji = r$2(`ZodCUID2`, (e, t) => {
	er.init(e, t), x$1.init(e, t);
});
function Yi(e) {
	return Zo$1(Ji, e);
}
const Xi = r$2(`ZodULID`, (e, t) => {
	tr.init(e, t), x$1.init(e, t);
});
function Zi(e) {
	return Qo$1(Xi, e);
}
const Qi = r$2(`ZodXID`, (e, t) => {
	nr.init(e, t), x$1.init(e, t);
});
function $i(e) {
	return $o$1(Qi, e);
}
const ea = r$2(`ZodKSUID`, (e, t) => {
	rr.init(e, t), x$1.init(e, t);
});
function ta(e) {
	return es$1(ea, e);
}
const na = r$2(`ZodIPv4`, (e, t) => {
	cr.init(e, t), x$1.init(e, t);
});
function ra(e) {
	return ts(na, e);
}
const ia = r$2(`ZodMAC`, (e, t) => {
	ur.init(e, t), x$1.init(e, t);
});
function aa(e) {
	return rs(ia, e);
}
const E$1 = r$2(`ZodIPv6`, (e, t) => {
	lr.init(e, t), x$1.init(e, t);
});
function oa(e) {
	return ns(E$1, e);
}
const D$1 = r$2(`ZodCIDRv4`, (e, t) => {
	dr.init(e, t), x$1.init(e, t);
});
function sa(e) {
	return is(D$1, e);
}
const O$1 = r$2(`ZodCIDRv6`, (e, t) => {
	fr.init(e, t), x$1.init(e, t);
});
function ca(e) {
	return as(O$1, e);
}
const k$1 = r$2(`ZodBase64`, (e, t) => {
	mr.init(e, t), x$1.init(e, t);
});
function la(e) {
	return os(k$1, e);
}
const A = r$2(`ZodBase64URL`, (e, t) => {
	gr.init(e, t), x$1.init(e, t);
});
function ua(e) {
	return ss(A, e);
}
const j$1 = r$2(`ZodE164`, (e, t) => {
	_r.init(e, t), x$1.init(e, t);
});
function da(e) {
	return cs(j$1, e);
}
const M = r$2(`ZodJWT`, (e, t) => {
	yr.init(e, t), x$1.init(e, t);
});
function fa(e) {
	return ls(M, e);
}
const N = r$2(`ZodCustomStringFormat`, (e, t) => {
	br.init(e, t), x$1.init(e, t);
});
function pa(e, t, n = {}) {
	return Wc(N, e, t, n);
}
function ma(e) {
	return Wc(N, `hostname`, Ht, e);
}
function ha(e) {
	return Wc(N, `hex`, sn, e);
}
function ga(e, t) {
	let n = `${e}_${t?.enc ?? `hex`}`, r = ht[n];
	if (!r) throw Error(`Unrecognized hash format: ${n}`);
	return Wc(N, n, r, t);
}
const P$1 = r$2(`ZodNumber`, (e, t) => {
	xr.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => Yc(e, t, n, r), _$1(e, `ZodNumber`, {
		gt(e, t) {
			return this.check(Bs(e, t));
		},
		gte(e, t) {
			return this.check(Vs(e, t));
		},
		min(e, t) {
			return this.check(Vs(e, t));
		},
		lt(e, t) {
			return this.check(Rs(e, t));
		},
		lte(e, t) {
			return this.check(zs(e, t));
		},
		max(e, t) {
			return this.check(zs(e, t));
		},
		int(e) {
			return this.check(I$1(e));
		},
		safe(e) {
			return this.check(I$1(e));
		},
		positive(e) {
			return this.check(Bs(0, e));
		},
		nonnegative(e) {
			return this.check(Vs(0, e));
		},
		negative(e) {
			return this.check(Rs(0, e));
		},
		nonpositive(e) {
			return this.check(zs(0, e));
		},
		multipleOf(e, t) {
			return this.check(Ks(e, t));
		},
		step(e, t) {
			return this.check(Ks(e, t));
		},
		finite() {
			return this;
		}
	});
	let n = e._zod.bag;
	e.minValue = Math.max(n.minimum ?? -Infinity, n.exclusiveMinimum ?? -Infinity) ?? null, e.maxValue = Math.min(n.maximum ?? Infinity, n.exclusiveMaximum ?? Infinity) ?? null, e.isInt = (n.format ?? ``).includes(`int`) || Number.isSafeInteger(n.multipleOf ?? .5), e.isFinite = !0, e.format = n.format ?? null;
});
function _a(e) {
	return hs(P$1, e);
}
const F$1 = r$2(`ZodNumberFormat`, (e, t) => {
	Sr.init(e, t), P$1.init(e, t);
});
function I$1(e) {
	return _s(F$1, e);
}
function va(e) {
	return vs(F$1, e);
}
function ya(e) {
	return ys(F$1, e);
}
function ba(e) {
	return bs(F$1, e);
}
function xa(e) {
	return xs(F$1, e);
}
const L$1 = r$2(`ZodBoolean`, (e, t) => {
	Cr.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => Xc(e, t, n, r);
});
function Sa(e) {
	return Ss(L$1, e);
}
const R$1 = r$2(`ZodBigInt`, (e, t) => {
	wr.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => Zc(e, t, n, r), e.gte = (t, n) => e.check(Vs(t, n)), e.min = (t, n) => e.check(Vs(t, n)), e.gt = (t, n) => e.check(Bs(t, n)), e.gte = (t, n) => e.check(Vs(t, n)), e.min = (t, n) => e.check(Vs(t, n)), e.lt = (t, n) => e.check(Rs(t, n)), e.lte = (t, n) => e.check(zs(t, n)), e.max = (t, n) => e.check(zs(t, n)), e.positive = (t) => e.check(Bs(BigInt(0), t)), e.negative = (t) => e.check(Rs(BigInt(0), t)), e.nonpositive = (t) => e.check(zs(BigInt(0), t)), e.nonnegative = (t) => e.check(Vs(BigInt(0), t)), e.multipleOf = (t, n) => e.check(Ks(t, n));
	let n = e._zod.bag;
	e.minValue = n.minimum ?? null, e.maxValue = n.maximum ?? null, e.format = n.format ?? null;
});
function Ca(e) {
	return ws(R$1, e);
}
const z$1 = r$2(`ZodBigIntFormat`, (e, t) => {
	Tr.init(e, t), R$1.init(e, t);
});
function wa(e) {
	return Es(z$1, e);
}
function Ta(e) {
	return Ds(z$1, e);
}
const Ea = r$2(`ZodSymbol`, (e, t) => {
	Er.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => Qc(e, t, n, r);
});
function Da(e) {
	return Os(Ea, e);
}
const Oa = r$2(`ZodUndefined`, (e, t) => {
	Dr$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => el(e, t, n, r);
});
function ka(e) {
	return ks(Oa, e);
}
const Aa = r$2(`ZodNull`, (e, t) => {
	Or$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => $c(e, t, n, r);
});
function ja(e) {
	return As(Aa, e);
}
const Ma = r$2(`ZodAny`, (e, t) => {
	kr$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => void 0;
});
function Na() {
	return js(Ma);
}
const Pa = r$2(`ZodUnknown`, (e, t) => {
	Ar$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => void 0;
});
function B$1() {
	return Ms(Pa);
}
const Fa = r$2(`ZodNever`, (e, t) => {
	jr$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => nl(e, t, n, r);
});
function V$1(e) {
	return Ns(Fa, e);
}
const Ia = r$2(`ZodVoid`, (e, t) => {
	Mr$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => tl(e, t, n, r);
});
function La(e) {
	return Ps(Ia, e);
}
const Ra = r$2(`ZodDate`, (e, t) => {
	Nr.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => al(e, t, n, r), e.min = (t, n) => e.check(Vs(t, n)), e.max = (t, n) => e.check(zs(t, n));
	let n = e._zod.bag;
	e.minDate = n.minimum ? new Date(n.minimum) : null, e.maxDate = n.maximum ? new Date(n.maximum) : null;
});
function za(e) {
	return Fs(Ra, e);
}
const Ba = r$2(`ZodArray`, (e, t) => {
	Fr.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => _l(e, t, n, r), e.element = t.element, _$1(e, `ZodArray`, {
		min(e, t) {
			return this.check(Zs(e, t));
		},
		nonempty(e) {
			return this.check(Zs(1, e));
		},
		max(e, t) {
			return this.check(Xs(e, t));
		},
		length(e, t) {
			return this.check(Qs(e, t));
		},
		unwrap() {
			return this.element;
		}
	});
});
function H$1(e, t) {
	return fc(Ba, e, t);
}
function Va(e) {
	let t = e._zod.def.shape;
	return oo(Object.keys(t));
}
const U$1 = r$2(`ZodObject`, (e, t) => {
	Br.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => vl(e, t, n, r), _$2(e, `shape`, () => t.shape), _$1(e, `ZodObject`, {
		keyof() {
			return oo(Object.keys(this._zod.def.shape));
		},
		catchall(e) {
			return this.clone({
				...this._zod.def,
				catchall: e
			});
		},
		passthrough() {
			return this.clone({
				...this._zod.def,
				catchall: B$1()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: B$1()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: V$1()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(e) {
			return Ee(this, e);
		},
		safeExtend(e) {
			return De(this, e);
		},
		merge(e) {
			return Oe(this, e);
		},
		pick(e) {
			return we(this, e);
		},
		omit(e) {
			return Te(this, e);
		},
		partial(...e) {
			return ke(mo, this, e[0]);
		},
		required(...e) {
			return Ae$1(Co, this, e[0]);
		}
	});
});
function Ha(e, t) {
	return new U$1({
		type: `object`,
		shape: e ?? {},
		...w$2(t)
	});
}
function Ua(e, t) {
	return new U$1({
		type: `object`,
		shape: e,
		catchall: V$1(),
		...w$2(t)
	});
}
function Wa(e, t) {
	return new U$1({
		type: `object`,
		shape: e,
		catchall: B$1(),
		...w$2(t)
	});
}
const W = r$2(`ZodUnion`, (e, t) => {
	Hr.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => yl(e, t, n, r), e.options = t.options;
});
function G(e, t) {
	return new W({
		type: `union`,
		options: e,
		...w$2(t)
	});
}
const Ga = r$2(`ZodXor`, (e, t) => {
	W.init(e, t), Wr.init(e, t), e._zod.processJSONSchema = (t, n, r) => yl(e, t, n, r), e.options = t.options;
});
function Ka(e, t) {
	return new Ga({
		type: `union`,
		options: e,
		inclusive: !1,
		...w$2(t)
	});
}
const qa = r$2(`ZodDiscriminatedUnion`, (e, t) => {
	W.init(e, t), Gr.init(e, t);
});
function Ja(e, t, n) {
	return new qa({
		type: `union`,
		options: t,
		discriminator: e,
		...w$2(n)
	});
}
const Ya = r$2(`ZodIntersection`, (e, t) => {
	Kr.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => bl(e, t, n, r);
});
function Xa(e, t) {
	return new Ya({
		type: `intersection`,
		left: e,
		right: t
	});
}
const Za = r$2(`ZodTuple`, (e, t) => {
	Yr.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => xl(e, t, n, r), e.rest = (t) => e.clone({
		...e._zod.def,
		rest: t
	});
});
function Qa(e, t, n) {
	let r = t instanceof H$2;
	return new Za({
		type: `tuple`,
		items: e,
		rest: r ? t : null,
		...w$2(r ? n : t)
	});
}
const K = r$2(`ZodRecord`, (e, t) => {
	$r.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => Sl(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
});
function $a(e, t, n) {
	return !t || !t._zod ? new K({
		type: `record`,
		keyType: b(),
		valueType: e,
		...w$2(t)
	}) : new K({
		type: `record`,
		keyType: e,
		valueType: t,
		...w$2(n)
	});
}
function eo(e, t, n) {
	let r = C$2(e);
	return r._zod.values = void 0, new K({
		type: `record`,
		keyType: r,
		valueType: t,
		...w$2(n)
	});
}
function to(e, t, n) {
	return new K({
		type: `record`,
		keyType: e,
		valueType: t,
		mode: `loose`,
		...w$2(n)
	});
}
const no = r$2(`ZodMap`, (e, t) => {
	ei.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => hl(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType, e.min = (...t) => e.check(Js(...t)), e.nonempty = (t) => e.check(Js(1, t)), e.max = (...t) => e.check(qs(...t)), e.size = (...t) => e.check(Ys(...t));
});
function ro(e, t, n) {
	return new no({
		type: `map`,
		keyType: e,
		valueType: t,
		...w$2(n)
	});
}
const io = r$2(`ZodSet`, (e, t) => {
	ni.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => gl(e, t, n, r), e.min = (...t) => e.check(Js(...t)), e.nonempty = (t) => e.check(Js(1, t)), e.max = (...t) => e.check(qs(...t)), e.size = (...t) => e.check(Ys(...t));
});
function ao(e, t) {
	return new io({
		type: `set`,
		valueType: e,
		...w$2(t)
	});
}
const q$1 = r$2(`ZodEnum`, (e, t) => {
	ii.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => ol(e, t, n, r), e.enum = t.entries, e.options = Object.values(t.entries);
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new q$1({
			...t,
			checks: [],
			...w$2(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new q$1({
			...t,
			checks: [],
			...w$2(r),
			entries: i
		});
	};
});
function oo(e, t) {
	return new q$1({
		type: `enum`,
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...w$2(t)
	});
}
function so(e, t) {
	return new q$1({
		type: `enum`,
		entries: e,
		...w$2(t)
	});
}
const co = r$2(`ZodLiteral`, (e, t) => {
	ai.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => sl(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
		if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return t.values[0];
	} });
});
function lo(e, t) {
	return new co({
		type: `literal`,
		values: Array.isArray(e) ? e : [e],
		...w$2(t)
	});
}
const uo = r$2(`ZodFile`, (e, t) => {
	oi.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => ul(e, t, n, r), e.min = (t, n) => e.check(Js(t, n)), e.max = (t, n) => e.check(qs(t, n)), e.mime = (t, n) => e.check(oc(Array.isArray(t) ? t : [t], n));
});
function fo(e) {
	return wc(uo, e);
}
const po = r$2(`ZodTransform`, (e, t) => {
	si$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => ml(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === `backward`) throw new o(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == `string`) n.issues.push(j$2(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ??= `custom`, t.input ??= n.value, t.inst ??= e, n.issues.push(j$2(t));
			}
		};
		let i = t.transform(n.value, n);
		return i instanceof Promise ? i.then((e) => (n.value = e, n.fallback = !0, n)) : (n.value = i, n.fallback = !0, n);
	};
});
function J$1(e) {
	return new po({
		type: `transform`,
		transform: e
	});
}
const mo = r$2(`ZodOptional`, (e, t) => {
	li$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => jl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Y$1(e) {
	return new mo({
		type: `optional`,
		innerType: e
	});
}
const ho = r$2(`ZodExactOptional`, (e, t) => {
	ui$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => jl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function go(e) {
	return new ho({
		type: `optional`,
		innerType: e
	});
}
const _o = r$2(`ZodNullable`, (e, t) => {
	di$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => Cl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function X$1(e) {
	return new _o({
		type: `nullable`,
		innerType: e
	});
}
function vo(e) {
	return Y$1(X$1(e));
}
const yo = r$2(`ZodDefault`, (e, t) => {
	fi$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => Tl(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function bo(e, t) {
	return new yo({
		type: `default`,
		innerType: e,
		get defaultValue() {
			return typeof t == `function` ? t() : he(t);
		}
	});
}
const xo = r$2(`ZodPrefault`, (e, t) => {
	mi$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => El(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function So(e, t) {
	return new xo({
		type: `prefault`,
		innerType: e,
		get defaultValue() {
			return typeof t == `function` ? t() : he(t);
		}
	});
}
const Co = r$2(`ZodNonOptional`, (e, t) => {
	hi$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => wl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function wo(e, t) {
	return new Co({
		type: `nonoptional`,
		innerType: e,
		...w$2(t)
	});
}
const To = r$2(`ZodSuccess`, (e, t) => {
	_i$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => dl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Eo(e) {
	return new To({
		type: `success`,
		innerType: e
	});
}
const Do = r$2(`ZodCatch`, (e, t) => {
	vi$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => Dl(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function Oo(e, t) {
	return new Do({
		type: `catch`,
		innerType: e,
		catchValue: typeof t == `function` ? t : () => t
	});
}
const ko = r$2(`ZodNaN`, (e, t) => {
	yi$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => cl(e, t, n, r);
});
function Ao(e) {
	return Ls(ko, e);
}
const Z$1 = r$2(`ZodPipe`, (e, t) => {
	bi$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ol(e, t, n, r), e.in = t.in, e.out = t.out;
});
function jo(e, t) {
	return new Z$1({
		type: `pipe`,
		in: e,
		out: t
	});
}
const Q$1 = r$2(`ZodCodec`, (e, t) => {
	Z$1.init(e, t), Si$1.init(e, t);
});
function Mo(e, t, n) {
	return new Q$1({
		type: `pipe`,
		in: e,
		out: t,
		transform: n.decode,
		reverseTransform: n.encode
	});
}
function No(e) {
	let t = e._zod.def;
	return new Q$1({
		type: `pipe`,
		in: t.out,
		out: t.in,
		transform: t.reverseTransform,
		reverseTransform: t.transform
	});
}
const Po = r$2(`ZodPreprocess`, (e, t) => {
	Z$1.init(e, t), Ti$1.init(e, t);
}), Fo = r$2(`ZodReadonly`, (e, t) => {
	Ei$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => kl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Io(e) {
	return new Fo({
		type: `readonly`,
		innerType: e
	});
}
const Lo = r$2(`ZodTemplateLiteral`, (e, t) => {
	Oi$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => ll(e, t, n, r);
});
function Ro(e, t) {
	return new Lo({
		type: `template_literal`,
		parts: e,
		...w$2(t)
	});
}
const zo = r$2(`ZodLazy`, (e, t) => {
	ji$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ml(e, t, n, r), e.unwrap = () => e._zod.def.getter();
});
function Bo(e) {
	return new zo({
		type: `lazy`,
		getter: e
	});
}
const Vo = r$2(`ZodPromise`, (e, t) => {
	Ai$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => Al(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Ho(e) {
	return new Vo({
		type: `promise`,
		innerType: e
	});
}
const Uo = r$2(`ZodFunction`, (e, t) => {
	ki$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => pl(e, t, n, r);
});
function Wo(e) {
	return new Uo({
		type: `function`,
		input: Array.isArray(e?.input) ? Qa(e?.input) : e?.input ?? H$1(B$1()),
		output: e?.output ?? B$1()
	});
}
const $$1 = r$2(`ZodCustom`, (e, t) => {
	Mi$1.init(e, t), v$1.init(e, t), e._zod.processJSONSchema = (t, n, r) => fl(e, t, n, r);
});
function Go(e) {
	let t = new B$2({ check: `custom` });
	return t._zod.check = e, t;
}
function Ko(e, t) {
	return Lc($$1, e ?? (() => !0), t);
}
function qo(e, t = {}) {
	return Rc($$1, e, t);
}
function Jo(e, t) {
	return zc(e, t);
}
const Yo = Vc, Xo = Hc;
function Zo(e, t = {}) {
	let n = new $$1({
		type: `custom`,
		check: `custom`,
		fn: (t) => t instanceof e,
		abort: !0,
		...w$2(t)
	});
	return n._zod.bag.Class = e, n._zod.check = (t) => {
		t.value instanceof e || t.issues.push({
			code: `invalid_type`,
			expected: e.name,
			input: t.value,
			inst: n,
			path: [...n._zod.def.path ?? []]
		});
	}, n;
}
const Qo = (...e) => Uc({
	Codec: Q$1,
	Boolean: L$1,
	String: y$1
}, ...e);
function $o(e) {
	let t = Bo(() => G([
		b(e),
		_a(),
		Sa(),
		ja(),
		H$1(t),
		$a(b(), t)
	]));
	return t;
}
function es(e, t) {
	return new Po({
		type: `pipe`,
		in: J$1(e),
		out: t
	});
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/compiled/_chunks/workflow/compat-DLpWymPP.js
const t$1 = {
	invalid_type: `invalid_type`,
	too_big: `too_big`,
	too_small: `too_small`,
	invalid_format: `invalid_format`,
	not_multiple_of: `not_multiple_of`,
	unrecognized_keys: `unrecognized_keys`,
	invalid_union: `invalid_union`,
	invalid_key: `invalid_key`,
	invalid_element: `invalid_element`,
	invalid_value: `invalid_value`,
	custom: `custom`
};
function n$1(t) {
	c$1({ customError: t });
}
function r$1() {
	return c$1().customError;
}
var i$1;
i$1 ||= {};
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/compiled/_chunks/workflow/coerce-B-Ro4Nfe.js
var d$1 = l$2({
	bigint: () => h$1,
	boolean: () => m$1,
	date: () => g$1,
	number: () => p$1,
	string: () => f$1
});
function f$1(e) {
	return Bo$1(y$1, e);
}
function p$1(e) {
	return gs(P$1, e);
}
function m$1(e) {
	return Cs(L$1, e);
}
function h$1(e) {
	return Ts(R$1, e);
}
function g$1(e) {
	return Is(Ra, e);
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/compiled/zod/index.js
const Q = {
	...ji,
	...si,
	iso: ci
}, Dr = new Set(`$schema.$ref.$defs.definitions.$id.id.$comment.$anchor.$vocabulary.$dynamicRef.$dynamicAnchor.type.enum.const.anyOf.oneOf.allOf.not.properties.required.additionalProperties.patternProperties.propertyNames.minProperties.maxProperties.items.prefixItems.additionalItems.minItems.maxItems.uniqueItems.contains.minContains.maxContains.minLength.maxLength.pattern.format.minimum.maximum.exclusiveMinimum.exclusiveMaximum.multipleOf.description.default.contentEncoding.contentMediaType.contentSchema.unevaluatedItems.unevaluatedProperties.if.then.else.dependentSchemas.dependentRequired.nullable.readOnly`.split(`.`));
function Or(e, t) {
	let n = e.$schema;
	return n === `https://json-schema.org/draft/2020-12/schema` ? `draft-2020-12` : n === `http://json-schema.org/draft-07/schema#` ? `draft-7` : n === `http://json-schema.org/draft-04/schema#` ? `draft-4` : t ?? `draft-2020-12`;
}
function kr(e, t) {
	if (!e.startsWith(`#`)) throw Error(`External $ref is not supported, only local refs (#/...) are allowed`);
	let n = e.slice(1).split(`/`).filter(Boolean);
	if (n.length === 0) return t.rootSchema;
	let r = t.version === `draft-2020-12` ? `$defs` : `definitions`;
	if (n[0] === r) {
		let r = n[1];
		if (!r || !t.defs[r]) throw Error(`Reference not found: ${e}`);
		return t.defs[r];
	}
	throw Error(`Reference not found: ${e}`);
}
function Ar(e, t) {
	if (e.not !== void 0) {
		if (typeof e.not == `object` && Object.keys(e.not).length === 0) return Q.never();
		throw Error(`not is not supported in Zod (except { not: {} } for never)`);
	}
	if (e.unevaluatedItems !== void 0) throw Error(`unevaluatedItems is not supported`);
	if (e.unevaluatedProperties !== void 0) throw Error(`unevaluatedProperties is not supported`);
	if (e.if !== void 0 || e.then !== void 0 || e.else !== void 0) throw Error(`Conditional schemas (if/then/else) are not supported`);
	if (e.dependentSchemas !== void 0 || e.dependentRequired !== void 0) throw Error(`dependentSchemas and dependentRequired are not supported`);
	if (e.$ref) {
		let n = e.$ref;
		if (t.refs.has(n)) return t.refs.get(n);
		if (t.processing.has(n)) return Q.lazy(() => {
			if (!t.refs.has(n)) throw Error(`Circular reference not resolved: ${n}`);
			return t.refs.get(n);
		});
		t.processing.add(n);
		let r = $(kr(n, t), t);
		return t.refs.set(n, r), t.processing.delete(n), r;
	}
	if (e.enum !== void 0) {
		let n = e.enum;
		if (t.version === `openapi-3.0` && e.nullable === !0 && n.length === 1 && n[0] === null) return Q.null();
		if (n.length === 0) return Q.never();
		if (n.length === 1) return Q.literal(n[0]);
		if (n.every((e) => typeof e == `string`)) return Q.enum(n);
		let r = n.map((e) => Q.literal(e));
		return r.length < 2 ? r[0] : Q.union([
			r[0],
			r[1],
			...r.slice(2)
		]);
	}
	if (e.const !== void 0) return Q.literal(e.const);
	let n = e.type;
	if (Array.isArray(n)) {
		let r = n.map((n) => Ar({
			...e,
			type: n
		}, t));
		return r.length === 0 ? Q.never() : r.length === 1 ? r[0] : Q.union(r);
	}
	if (!n) return Q.any();
	let r;
	switch (n) {
		case `string`: {
			let t = Q.string();
			if (e.format) {
				let n = e.format;
				n === `email` ? t = t.check(Q.email()) : n === `uri` || n === `uri-reference` ? t = t.check(Q.url()) : n === `uuid` || n === `guid` ? t = t.check(Q.uuid()) : n === `date-time` ? t = t.check(Q.iso.datetime()) : n === `date` ? t = t.check(Q.iso.date()) : n === `time` ? t = t.check(Q.iso.time()) : n === `duration` ? t = t.check(Q.iso.duration()) : n === `ipv4` ? t = t.check(Q.ipv4()) : n === `ipv6` ? t = t.check(Q.ipv6()) : n === `mac` ? t = t.check(Q.mac()) : n === `cidr` ? t = t.check(Q.cidrv4()) : n === `cidr-v6` ? t = t.check(Q.cidrv6()) : n === `base64` ? t = t.check(Q.base64()) : n === `base64url` ? t = t.check(Q.base64url()) : n === `e164` ? t = t.check(Q.e164()) : n === `jwt` ? t = t.check(Q.jwt()) : n === `emoji` ? t = t.check(Q.emoji()) : n === `nanoid` ? t = t.check(Q.nanoid()) : n === `cuid` ? t = t.check(Q.cuid()) : n === `cuid2` ? t = t.check(Q.cuid2()) : n === `ulid` ? t = t.check(Q.ulid()) : n === `xid` ? t = t.check(Q.xid()) : n === `ksuid` && (t = t.check(Q.ksuid()));
			}
			typeof e.minLength == `number` && (t = t.min(e.minLength)), typeof e.maxLength == `number` && (t = t.max(e.maxLength)), e.pattern && (t = t.regex(new RegExp(e.pattern))), r = t;
			break;
		}
		case `number`:
		case `integer`: {
			let t = n === `integer` ? Q.number().int() : Q.number();
			typeof e.minimum == `number` && (t = t.min(e.minimum)), typeof e.maximum == `number` && (t = t.max(e.maximum)), typeof e.exclusiveMinimum == `number` ? t = t.gt(e.exclusiveMinimum) : e.exclusiveMinimum === !0 && typeof e.minimum == `number` && (t = t.gt(e.minimum)), typeof e.exclusiveMaximum == `number` ? t = t.lt(e.exclusiveMaximum) : e.exclusiveMaximum === !0 && typeof e.maximum == `number` && (t = t.lt(e.maximum)), typeof e.multipleOf == `number` && (t = t.multipleOf(e.multipleOf)), r = t;
			break;
		}
		case `boolean`:
			r = Q.boolean();
			break;
		case `null`:
			r = Q.null();
			break;
		case `object`: {
			let n = {}, i = e.properties || {}, a = new Set(e.required || []);
			for (let [e, r] of Object.entries(i)) {
				let i = $(r, t);
				n[e] = a.has(e) ? i : i.optional();
			}
			if (e.propertyNames) {
				let i = $(e.propertyNames, t), a = e.additionalProperties && typeof e.additionalProperties == `object` ? $(e.additionalProperties, t) : Q.any();
				if (Object.keys(n).length === 0) {
					r = Q.record(i, a);
					break;
				}
				let o = Q.object(n).passthrough(), s = Q.looseRecord(i, a);
				r = Q.intersection(o, s);
				break;
			}
			if (e.patternProperties) {
				let i = e.patternProperties, a = Object.keys(i), o = [];
				for (let e of a) {
					let n = $(i[e], t), r = Q.string().regex(new RegExp(e));
					o.push(Q.looseRecord(r, n));
				}
				let s = [];
				if (Object.keys(n).length > 0 && s.push(Q.object(n).passthrough()), s.push(...o), s.length === 0) r = Q.object({}).passthrough();
				else if (s.length === 1) r = s[0];
				else {
					let e = Q.intersection(s[0], s[1]);
					for (let t = 2; t < s.length; t++) e = Q.intersection(e, s[t]);
					r = e;
				}
				break;
			}
			let o = Q.object(n);
			r = e.additionalProperties === !1 ? o.strict() : typeof e.additionalProperties == `object` ? o.catchall($(e.additionalProperties, t)) : o.passthrough();
			break;
		}
		case `array`: {
			let n = e.prefixItems, i = e.items;
			if (n && Array.isArray(n)) {
				let a = n.map((e) => $(e, t)), o = i && typeof i == `object` && !Array.isArray(i) ? $(i, t) : void 0;
				r = o ? Q.tuple(a).rest(o) : Q.tuple(a), typeof e.minItems == `number` && (r = r.check(Q.minLength(e.minItems))), typeof e.maxItems == `number` && (r = r.check(Q.maxLength(e.maxItems)));
			} else if (Array.isArray(i)) {
				let n = i.map((e) => $(e, t)), a = e.additionalItems && typeof e.additionalItems == `object` ? $(e.additionalItems, t) : void 0;
				r = a ? Q.tuple(n).rest(a) : Q.tuple(n), typeof e.minItems == `number` && (r = r.check(Q.minLength(e.minItems))), typeof e.maxItems == `number` && (r = r.check(Q.maxLength(e.maxItems)));
			} else if (i !== void 0) {
				let n = $(i, t), a = Q.array(n);
				typeof e.minItems == `number` && (a = a.min(e.minItems)), typeof e.maxItems == `number` && (a = a.max(e.maxItems)), r = a;
			} else r = Q.array(Q.any());
			break;
		}
		default: throw Error(`Unsupported type: ${n}`);
	}
	return r;
}
function $(e, t) {
	if (typeof e == `boolean`) return e ? Q.any() : Q.never();
	let n = Ar(e, t), r = e.type || e.enum !== void 0 || e.const !== void 0;
	if (e.anyOf && Array.isArray(e.anyOf)) {
		let i = e.anyOf.map((e) => $(e, t)), a = Q.union(i);
		n = r ? Q.intersection(n, a) : a;
	}
	if (e.oneOf && Array.isArray(e.oneOf)) {
		let i = e.oneOf.map((e) => $(e, t)), a = Q.xor(i);
		n = r ? Q.intersection(n, a) : a;
	}
	if (e.allOf && Array.isArray(e.allOf)) if (e.allOf.length === 0) n = r ? n : Q.any();
	else {
		let i = r ? n : $(e.allOf[0], t), a = +!r;
		for (let n = a; n < e.allOf.length; n++) i = Q.intersection(i, $(e.allOf[n], t));
		n = i;
	}
	e.nullable === !0 && t.version === `openapi-3.0` && (n = Q.nullable(n)), e.readOnly === !0 && (n = Q.readonly(n)), e.default !== void 0 && (n = n.default(e.default));
	let i = {};
	for (let t of [
		`$id`,
		`id`,
		`$comment`,
		`$anchor`,
		`$vocabulary`,
		`$dynamicRef`,
		`$dynamicAnchor`
	]) t in e && (i[t] = e[t]);
	for (let t of [
		`contentEncoding`,
		`contentMediaType`,
		`contentSchema`
	]) t in e && (i[t] = e[t]);
	for (let t of Object.keys(e)) Dr.has(t) || (i[t] = e[t]);
	return Object.keys(i).length > 0 && t.registry.add(n, i), e.description && (n = n.describe(e.description)), n;
}
function jr(e, t) {
	if (typeof e == `boolean`) return e ? Q.any() : Q.never();
	let n;
	try {
		n = JSON.parse(JSON.stringify(e));
	} catch {
		throw Error(`fromJSONSchema input is not valid JSON (possibly cyclic); use $defs/$ref for recursive schemas`);
	}
	let r = {
		version: Or(n, t?.defaultTarget),
		defs: n.$defs || n.definitions || {},
		refs: /* @__PURE__ */ new Map(),
		processing: /* @__PURE__ */ new Set(),
		rootSchema: n,
		registry: t?.registry ?? q$2
	};
	return $(n, r);
}
var Mr = l$2({
	$brand: () => i$2,
	$input: () => Io$1,
	$output: () => Fo$1,
	NEVER: () => n$2,
	TimePrecision: () => us,
	ZodAny: () => Ma,
	ZodArray: () => Ba,
	ZodBase64: () => k$1,
	ZodBase64URL: () => A,
	ZodBigInt: () => R$1,
	ZodBigIntFormat: () => z$1,
	ZodBoolean: () => L$1,
	ZodCIDRv4: () => D$1,
	ZodCIDRv6: () => O$1,
	ZodCUID: () => Ki,
	ZodCUID2: () => Ji,
	ZodCatch: () => Do,
	ZodCodec: () => Q$1,
	ZodCustom: () => $$1,
	ZodCustomStringFormat: () => N,
	ZodDate: () => Ra,
	ZodDefault: () => yo,
	ZodDiscriminatedUnion: () => qa,
	ZodE164: () => j$1,
	ZodEmail: () => S$1,
	ZodEmoji: () => Hi,
	ZodEnum: () => q$1,
	ZodError: () => vi,
	ZodExactOptional: () => ho,
	ZodFile: () => uo,
	ZodFirstPartyTypeKind: () => i$1,
	ZodFunction: () => Uo,
	ZodGUID: () => C$1,
	ZodIPv4: () => na,
	ZodIPv6: () => E$1,
	ZodISODate: () => di,
	ZodISODateTime: () => li,
	ZodISODuration: () => hi,
	ZodISOTime: () => pi,
	ZodIntersection: () => Ya,
	ZodIssueCode: () => t$1,
	ZodJWT: () => M,
	ZodKSUID: () => ea,
	ZodLazy: () => zo,
	ZodLiteral: () => co,
	ZodMAC: () => ia,
	ZodMap: () => no,
	ZodNaN: () => ko,
	ZodNanoID: () => Wi,
	ZodNever: () => Fa,
	ZodNonOptional: () => Co,
	ZodNull: () => Aa,
	ZodNullable: () => _o,
	ZodNumber: () => P$1,
	ZodNumberFormat: () => F$1,
	ZodObject: () => U$1,
	ZodOptional: () => mo,
	ZodPipe: () => Z$1,
	ZodPrefault: () => xo,
	ZodPreprocess: () => Po,
	ZodPromise: () => Vo,
	ZodReadonly: () => Fo,
	ZodRealError: () => g$2,
	ZodRecord: () => K,
	ZodSet: () => io,
	ZodString: () => y$1,
	ZodStringFormat: () => x$1,
	ZodSuccess: () => To,
	ZodSymbol: () => Ea,
	ZodTemplateLiteral: () => Lo,
	ZodTransform: () => po,
	ZodTuple: () => Za,
	ZodType: () => v$1,
	ZodULID: () => Xi,
	ZodURL: () => T$1,
	ZodUUID: () => w$1,
	ZodUndefined: () => Oa,
	ZodUnion: () => W,
	ZodUnknown: () => Pa,
	ZodVoid: () => Ia,
	ZodXID: () => Qi,
	ZodXor: () => Ga,
	_ZodString: () => Ni,
	_default: () => bo,
	_function: () => Wo,
	any: () => Na,
	array: () => H$1,
	base64: () => la,
	base64url: () => ua,
	bigint: () => Ca,
	boolean: () => Sa,
	catch: () => Oo,
	check: () => Go,
	cidrv4: () => sa,
	cidrv6: () => ca,
	clone: () => C$2,
	codec: () => Mo,
	coerce: () => d$1,
	config: () => c$1,
	core: () => Ll,
	cuid: () => qi,
	cuid2: () => Yi,
	custom: () => Ko,
	date: () => za,
	decode: () => wi,
	decodeAsync: () => Ei,
	describe: () => Yo,
	discriminatedUnion: () => Ja,
	e164: () => da,
	email: () => Pi,
	emoji: () => Ui,
	encode: () => Ci,
	encodeAsync: () => Ti,
	endsWith: () => ic,
	enum: () => oo,
	exactOptional: () => go,
	file: () => fo,
	flattenError: () => We,
	float32: () => va,
	float64: () => ya,
	formatError: () => Ge,
	fromJSONSchema: () => jr,
	function: () => Wo,
	getErrorMap: () => r$1,
	globalRegistry: () => q$2,
	gt: () => Bs,
	gte: () => Vs,
	guid: () => Fi,
	hash: () => ga,
	hex: () => ha,
	hostname: () => ma,
	httpUrl: () => Vi,
	includes: () => nc,
	instanceof: () => Zo,
	int: () => I$1,
	int32: () => ba,
	int64: () => wa,
	intersection: () => Xa,
	invertCodec: () => No,
	ipv4: () => ra,
	ipv6: () => oa,
	iso: () => ci,
	json: () => $o,
	jwt: () => fa,
	keyof: () => Va,
	ksuid: () => ta,
	lazy: () => Bo,
	length: () => Qs,
	literal: () => lo,
	locales: () => No$1,
	looseObject: () => Wa,
	looseRecord: () => to,
	lowercase: () => ec,
	lt: () => Rs,
	lte: () => zs,
	mac: () => aa,
	map: () => ro,
	maxLength: () => Xs,
	maxSize: () => qs,
	meta: () => Xo,
	mime: () => oc,
	minLength: () => Zs,
	minSize: () => Js,
	multipleOf: () => Ks,
	nan: () => Ao,
	nanoid: () => Gi,
	nativeEnum: () => so,
	negative: () => Us,
	never: () => V$1,
	nonnegative: () => Gs,
	nonoptional: () => wo,
	nonpositive: () => Ws,
	normalize: () => sc,
	null: () => ja,
	nullable: () => X$1,
	nullish: () => vo,
	number: () => _a,
	object: () => Ha,
	optional: () => Y$1,
	overwrite: () => J$2,
	parse: () => yi,
	parseAsync: () => bi,
	partialRecord: () => eo,
	pipe: () => jo,
	positive: () => Hs,
	prefault: () => So,
	preprocess: () => es,
	prettifyError: () => Je$1,
	promise: () => Ho,
	property: () => ac,
	readonly: () => Io,
	record: () => $a,
	refine: () => qo,
	regex: () => $s,
	regexes: () => ht,
	registry: () => Ro$1,
	safeDecode: () => Oi,
	safeDecodeAsync: () => Ai,
	safeEncode: () => Di,
	safeEncodeAsync: () => ki,
	safeParse: () => xi,
	safeParseAsync: () => Si,
	set: () => ao,
	setErrorMap: () => n$1,
	size: () => Ys,
	slugify: () => dc,
	startsWith: () => rc,
	strictObject: () => Ua,
	string: () => b,
	stringFormat: () => pa,
	stringbool: () => Qo,
	success: () => Eo,
	superRefine: () => Jo,
	symbol: () => Da,
	templateLiteral: () => Ro,
	toJSONSchema: () => Pl,
	toLowerCase: () => lc,
	toUpperCase: () => uc,
	transform: () => J$1,
	treeifyError: () => Ke,
	trim: () => cc,
	tuple: () => Qa,
	uint32: () => xa,
	uint64: () => Ta,
	ulid: () => Zi,
	undefined: () => ka,
	union: () => G,
	unknown: () => B$1,
	uppercase: () => tc,
	url: () => Bi,
	util: () => l$1,
	uuid: () => Ii,
	uuidv4: () => Li,
	uuidv6: () => Ri,
	uuidv7: () => zi,
	void: () => La,
	xid: () => $i,
	xor: () => Ka
});
c$1(ea$1());
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/compiled/jose/index.js
const t = new TextEncoder(), n = new TextDecoder();
function i(...e) {
	let t = e.reduce((e, { length: t }) => e + t, 0), n = new Uint8Array(t), r = 0;
	for (let t of e) n.set(t, r), r += t.length;
	return n;
}
function c(e) {
	let t = new Uint8Array(e.length);
	for (let n = 0; n < e.length; n++) {
		let r = e.charCodeAt(n);
		if (r > 127) throw TypeError(`non-ASCII string encountered in encode()`);
		t[n] = r;
	}
	return t;
}
function l(e) {
	if (Uint8Array.prototype.toBase64) return e.toBase64();
	let t = 32768, n = [];
	for (let r = 0; r < e.length; r += t) n.push(String.fromCharCode.apply(null, e.subarray(r, r + t)));
	return btoa(n.join(``));
}
function u(e) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64(e);
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	return n;
}
l$2({
	decode: () => f,
	encode: () => p
});
function f(e) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64(typeof e == `string` ? e : n.decode(e), { alphabet: `base64url` });
	let t = e;
	t instanceof Uint8Array && (t = n.decode(t)), t = t.replace(/-/g, `+`).replace(/_/g, `/`);
	try {
		return u(t);
	} catch {
		throw TypeError(`The input to be decoded is not correctly encoded.`);
	}
}
function p(e) {
	let n = e;
	return typeof n == `string` && (n = t.encode(n)), Uint8Array.prototype.toBase64 ? n.toBase64({
		alphabet: `base64url`,
		omitPadding: !0
	}) : l(n).replace(/=/g, ``).replace(/\+/g, `-`).replace(/\//g, `_`);
}
const m = (e, t = `algorithm.name`) => TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`), h = (e, t) => e.name === t;
function g(e) {
	return parseInt(e.name.slice(4), 10);
}
function _(e, t) {
	if (g(e.hash) !== t) throw m(`SHA-${t}`, `algorithm.hash`);
}
function v(e) {
	switch (e) {
		case `ES256`: return `P-256`;
		case `ES384`: return `P-384`;
		case `ES512`: return `P-521`;
		default: throw Error(`unreachable`);
	}
}
function y(e, t) {
	if (t && !e.usages.includes(t)) throw TypeError(`CryptoKey does not support this operation, its usages must include ${t}.`);
}
function ee$1(e, t, n) {
	switch (t) {
		case `HS256`:
		case `HS384`:
		case `HS512`:
			if (!h(e.algorithm, `HMAC`)) throw m(`HMAC`);
			_(e.algorithm, parseInt(t.slice(2), 10));
			break;
		case `RS256`:
		case `RS384`:
		case `RS512`:
			if (!h(e.algorithm, `RSASSA-PKCS1-v1_5`)) throw m(`RSASSA-PKCS1-v1_5`);
			_(e.algorithm, parseInt(t.slice(2), 10));
			break;
		case `PS256`:
		case `PS384`:
		case `PS512`:
			if (!h(e.algorithm, `RSA-PSS`)) throw m(`RSA-PSS`);
			_(e.algorithm, parseInt(t.slice(2), 10));
			break;
		case `Ed25519`:
		case `EdDSA`:
			if (!h(e.algorithm, `Ed25519`)) throw m(`Ed25519`);
			break;
		case `ML-DSA-44`:
		case `ML-DSA-65`:
		case `ML-DSA-87`:
			if (!h(e.algorithm, t)) throw m(t);
			break;
		case `ES256`:
		case `ES384`:
		case `ES512`: {
			if (!h(e.algorithm, `ECDSA`)) throw m(`ECDSA`);
			let n = v(t);
			if (e.algorithm.namedCurve !== n) throw m(n, `algorithm.namedCurve`);
			break;
		}
		default: throw TypeError(`CryptoKey does not support this operation`);
	}
	y(e, n);
}
function x(e, t, ...n) {
	if (n = n.filter(Boolean), n.length > 2) {
		let t = n.pop();
		e += `one of type ${n.join(`, `)}, or ${t}.`;
	} else n.length === 2 ? e += `one of type ${n[0]} or ${n[1]}.` : e += `of type ${n[0]}.`;
	return t == null ? e += ` Received ${t}` : typeof t == `function` && t.name ? e += ` Received function ${t.name}` : typeof t == `object` && t && t.constructor?.name && (e += ` Received an instance of ${t.constructor.name}`), e;
}
const S = (e, ...t) => x(`Key must be `, e, ...t), te = (e, t, ...n) => x(`Key for the ${e} algorithm must be `, t, ...n);
l$2({
	JOSEAlgNotAllowed: () => ie,
	JOSEError: () => C,
	JOSENotSupported: () => T,
	JWEDecryptionFailed: () => E,
	JWEInvalid: () => D,
	JWKInvalid: () => ae,
	JWKSInvalid: () => oe,
	JWKSMultipleMatchingKeys: () => ce,
	JWKSNoMatchingKey: () => se,
	JWKSTimeout: () => le,
	JWSInvalid: () => O,
	JWSSignatureVerificationFailed: () => ue,
	JWTClaimValidationFailed: () => w,
	JWTExpired: () => re,
	JWTInvalid: () => k
});
var C = class extends Error {
	static code = `ERR_JOSE_GENERIC`;
	code = `ERR_JOSE_GENERIC`;
	constructor(e, t) {
		super(e, t), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
	}
}, w = class extends C {
	static code = `ERR_JWT_CLAIM_VALIDATION_FAILED`;
	code = `ERR_JWT_CLAIM_VALIDATION_FAILED`;
	claim;
	reason;
	payload;
	constructor(e, t, n = `unspecified`, r = `unspecified`) {
		super(e, { cause: {
			claim: n,
			reason: r,
			payload: t
		} }), this.claim = n, this.reason = r, this.payload = t;
	}
}, re = class extends C {
	static code = `ERR_JWT_EXPIRED`;
	code = `ERR_JWT_EXPIRED`;
	claim;
	reason;
	payload;
	constructor(e, t, n = `unspecified`, r = `unspecified`) {
		super(e, { cause: {
			claim: n,
			reason: r,
			payload: t
		} }), this.claim = n, this.reason = r, this.payload = t;
	}
}, ie = class extends C {
	static code = `ERR_JOSE_ALG_NOT_ALLOWED`;
	code = `ERR_JOSE_ALG_NOT_ALLOWED`;
}, T = class extends C {
	static code = `ERR_JOSE_NOT_SUPPORTED`;
	code = `ERR_JOSE_NOT_SUPPORTED`;
}, E = class extends C {
	static code = `ERR_JWE_DECRYPTION_FAILED`;
	code = `ERR_JWE_DECRYPTION_FAILED`;
	constructor(e = `decryption operation failed`, t) {
		super(e, t);
	}
}, D = class extends C {
	static code = `ERR_JWE_INVALID`;
	code = `ERR_JWE_INVALID`;
}, O = class extends C {
	static code = `ERR_JWS_INVALID`;
	code = `ERR_JWS_INVALID`;
}, k = class extends C {
	static code = `ERR_JWT_INVALID`;
	code = `ERR_JWT_INVALID`;
}, ae = class extends C {
	static code = `ERR_JWK_INVALID`;
	code = `ERR_JWK_INVALID`;
}, oe = class extends C {
	static code = `ERR_JWKS_INVALID`;
	code = `ERR_JWKS_INVALID`;
}, se = class extends C {
	static code = `ERR_JWKS_NO_MATCHING_KEY`;
	code = `ERR_JWKS_NO_MATCHING_KEY`;
	constructor(e = `no applicable key found in the JSON Web Key Set`, t) {
		super(e, t);
	}
}, ce = class extends C {
	[Symbol.asyncIterator];
	static code = `ERR_JWKS_MULTIPLE_MATCHING_KEYS`;
	code = `ERR_JWKS_MULTIPLE_MATCHING_KEYS`;
	constructor(e = `multiple matching keys found in the JSON Web Key Set`, t) {
		super(e, t);
	}
}, le = class extends C {
	static code = `ERR_JWKS_TIMEOUT`;
	code = `ERR_JWKS_TIMEOUT`;
	constructor(e = `request timed out`, t) {
		super(e, t);
	}
}, ue = class extends C {
	static code = `ERR_JWS_SIGNATURE_VERIFICATION_FAILED`;
	code = `ERR_JWS_SIGNATURE_VERIFICATION_FAILED`;
	constructor(e = `signature verification failed`, t) {
		super(e, t);
	}
};
const j = (e) => {
	if (e?.[Symbol.toStringTag] === `CryptoKey`) return !0;
	try {
		return e instanceof CryptoKey;
	} catch {
		return !1;
	}
}, de = (e) => e?.[Symbol.toStringTag] === `KeyObject`, fe = (e) => j(e) || de(e);
function P(e, t, n) {
	try {
		return f(e);
	} catch {
		throw new n(`Failed to base64url decode the ${t}`);
	}
}
const Ae = (e) => typeof e == `object` && !!e;
function F(e) {
	if (!Ae(e) || Object.prototype.toString.call(e) !== `[object Object]`) return !1;
	if (Object.getPrototypeOf(e) === null) return !0;
	let t = e;
	for (; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t);
	return Object.getPrototypeOf(e) === t;
}
function I(...e) {
	let t = e.filter(Boolean);
	if (t.length === 0 || t.length === 1) return !0;
	let n;
	for (let e of t) {
		let t = Object.keys(e);
		if (!n || n.size === 0) {
			n = new Set(t);
			continue;
		}
		for (let e of t) {
			if (n.has(e)) return !1;
			n.add(e);
		}
	}
	return !0;
}
const L = (e) => F(e) && typeof e.kty == `string`, je = (e) => e.kty !== `oct` && (e.kty === `AKP` && typeof e.priv == `string` || typeof e.d == `string`), Me = (e) => e.kty !== `oct` && e.d === void 0 && e.priv === void 0, Ne = (e) => e.kty === `oct` && typeof e.k == `string`;
function R(e, t) {
	if (e.startsWith(`RS`) || e.startsWith(`PS`)) {
		let { modulusLength: n } = t.algorithm;
		if (typeof n != `number` || n < 2048) throw TypeError(`${e} requires key modulusLength to be 2048 bits or larger`);
	}
}
function Je(e, t) {
	let n = `SHA-${e.slice(-3)}`;
	switch (e) {
		case `HS256`:
		case `HS384`:
		case `HS512`: return {
			hash: n,
			name: `HMAC`
		};
		case `PS256`:
		case `PS384`:
		case `PS512`: return {
			hash: n,
			name: `RSA-PSS`,
			saltLength: parseInt(e.slice(-3), 10) >> 3
		};
		case `RS256`:
		case `RS384`:
		case `RS512`: return {
			hash: n,
			name: `RSASSA-PKCS1-v1_5`
		};
		case `ES256`:
		case `ES384`:
		case `ES512`: return {
			hash: n,
			name: `ECDSA`,
			namedCurve: t.namedCurve
		};
		case `Ed25519`:
		case `EdDSA`: return { name: `Ed25519` };
		case `ML-DSA-44`:
		case `ML-DSA-65`:
		case `ML-DSA-87`: return { name: e };
		default: throw new T(`alg ${e} is not supported either by JOSE or your javascript runtime`);
	}
}
async function Ye(e, t, n) {
	if (t instanceof Uint8Array) {
		if (!e.startsWith(`HS`)) throw TypeError(S(t, `CryptoKey`, `KeyObject`, `JSON Web Key`));
		return crypto.subtle.importKey(`raw`, t, {
			hash: `SHA-${e.slice(-3)}`,
			name: `HMAC`
		}, !1, [n]);
	}
	return ee$1(t, e, n), t;
}
async function Ze(e, t, n, r) {
	let i = await Ye(e, t, `verify`);
	R(e, i);
	let a = Je(e, i.algorithm);
	try {
		return await crypto.subtle.verify(a, i, n, r);
	} catch {
		return !1;
	}
}
const z = `Invalid or unsupported JWK "alg" (Algorithm) Parameter value`;
function tt(e) {
	let t, n;
	switch (e.kty) {
		case `AKP`:
			switch (e.alg) {
				case `ML-DSA-44`:
				case `ML-DSA-65`:
				case `ML-DSA-87`:
					t = { name: e.alg }, n = e.priv ? [`sign`] : [`verify`];
					break;
				default: throw new T(z);
			}
			break;
		case `RSA`:
			switch (e.alg) {
				case `PS256`:
				case `PS384`:
				case `PS512`:
					t = {
						name: `RSA-PSS`,
						hash: `SHA-${e.alg.slice(-3)}`
					}, n = e.d ? [`sign`] : [`verify`];
					break;
				case `RS256`:
				case `RS384`:
				case `RS512`:
					t = {
						name: `RSASSA-PKCS1-v1_5`,
						hash: `SHA-${e.alg.slice(-3)}`
					}, n = e.d ? [`sign`] : [`verify`];
					break;
				case `RSA-OAEP`:
				case `RSA-OAEP-256`:
				case `RSA-OAEP-384`:
				case `RSA-OAEP-512`:
					t = {
						name: `RSA-OAEP`,
						hash: `SHA-${parseInt(e.alg.slice(-3), 10) || 1}`
					}, n = e.d ? [`decrypt`, `unwrapKey`] : [`encrypt`, `wrapKey`];
					break;
				default: throw new T(z);
			}
			break;
		case `EC`:
			switch (e.alg) {
				case `ES256`:
				case `ES384`:
				case `ES512`:
					t = {
						name: `ECDSA`,
						namedCurve: {
							ES256: `P-256`,
							ES384: `P-384`,
							ES512: `P-521`
						}[e.alg]
					}, n = e.d ? [`sign`] : [`verify`];
					break;
				case `ECDH-ES`:
				case `ECDH-ES+A128KW`:
				case `ECDH-ES+A192KW`:
				case `ECDH-ES+A256KW`:
					t = {
						name: `ECDH`,
						namedCurve: e.crv
					}, n = e.d ? [`deriveBits`] : [];
					break;
				default: throw new T(z);
			}
			break;
		case `OKP`:
			switch (e.alg) {
				case `Ed25519`:
				case `EdDSA`:
					t = { name: `Ed25519` }, n = e.d ? [`sign`] : [`verify`];
					break;
				case `ECDH-ES`:
				case `ECDH-ES+A128KW`:
				case `ECDH-ES+A192KW`:
				case `ECDH-ES+A256KW`:
					t = { name: e.crv }, n = e.d ? [`deriveBits`] : [];
					break;
				default: throw new T(z);
			}
			break;
		default: throw new T(`Invalid or unsupported JWK "kty" (Key Type) Parameter value`);
	}
	return {
		algorithm: t,
		keyUsages: n
	};
}
async function B(e) {
	if (!e.alg) throw TypeError(`"alg" argument is required when "jwk.alg" is not present`);
	let { algorithm: t, keyUsages: n } = tt(e), r = { ...e };
	return r.kty !== `AKP` && delete r.alg, delete r.use, crypto.subtle.importKey(`jwk`, r, t, e.ext ?? !(e.d || e.priv), e.key_ops ?? n);
}
const V = `given KeyObject instance cannot be used for this algorithm`;
let H;
const nt = async (e, t, n, r = !1) => {
	H ||= /* @__PURE__ */ new WeakMap();
	let i = H.get(e);
	if (i?.[n]) return i[n];
	let a = await B({
		...t,
		alg: n
	});
	return r && Object.freeze(e), i ? i[n] = a : H.set(e, { [n]: a }), a;
}, rt = (e, t) => {
	H ||= /* @__PURE__ */ new WeakMap();
	let n = H.get(e);
	if (n?.[t]) return n[t];
	let r = e.type === `public`, i = !!r, a;
	if (e.asymmetricKeyType === `x25519`) {
		switch (t) {
			case `ECDH-ES`:
			case `ECDH-ES+A128KW`:
			case `ECDH-ES+A192KW`:
			case `ECDH-ES+A256KW`: break;
			default: throw TypeError(V);
		}
		a = e.toCryptoKey(e.asymmetricKeyType, i, r ? [] : [`deriveBits`]);
	}
	if (e.asymmetricKeyType === `ed25519`) {
		if (t !== `EdDSA` && t !== `Ed25519`) throw TypeError(V);
		a = e.toCryptoKey(e.asymmetricKeyType, i, [r ? `verify` : `sign`]);
	}
	switch (e.asymmetricKeyType) {
		case `ml-dsa-44`:
		case `ml-dsa-65`:
		case `ml-dsa-87`:
			if (t !== e.asymmetricKeyType.toUpperCase()) throw TypeError(V);
			a = e.toCryptoKey(e.asymmetricKeyType, i, [r ? `verify` : `sign`]);
	}
	if (e.asymmetricKeyType === `rsa`) {
		let n;
		switch (t) {
			case `RSA-OAEP`:
				n = `SHA-1`;
				break;
			case `RS256`:
			case `PS256`:
			case `RSA-OAEP-256`:
				n = `SHA-256`;
				break;
			case `RS384`:
			case `PS384`:
			case `RSA-OAEP-384`:
				n = `SHA-384`;
				break;
			case `RS512`:
			case `PS512`:
			case `RSA-OAEP-512`:
				n = `SHA-512`;
				break;
			default: throw TypeError(V);
		}
		if (t.startsWith(`RSA-OAEP`)) return e.toCryptoKey({
			name: `RSA-OAEP`,
			hash: n
		}, i, r ? [`encrypt`] : [`decrypt`]);
		a = e.toCryptoKey({
			name: t.startsWith(`PS`) ? `RSA-PSS` : `RSASSA-PKCS1-v1_5`,
			hash: n
		}, i, [r ? `verify` : `sign`]);
	}
	if (e.asymmetricKeyType === `ec`) {
		let n = (/* @__PURE__ */ new Map([
			[`prime256v1`, `P-256`],
			[`secp384r1`, `P-384`],
			[`secp521r1`, `P-521`]
		])).get(e.asymmetricKeyDetails?.namedCurve);
		if (!n) throw TypeError(V);
		let o = {
			ES256: `P-256`,
			ES384: `P-384`,
			ES512: `P-521`
		};
		o[t] && n === o[t] && (a = e.toCryptoKey({
			name: `ECDSA`,
			namedCurve: n
		}, i, [r ? `verify` : `sign`])), t.startsWith(`ECDH-ES`) && (a = e.toCryptoKey({
			name: `ECDH`,
			namedCurve: n
		}, i, r ? [] : [`deriveBits`]));
	}
	if (!a) throw TypeError(V);
	return n ? n[t] = a : H.set(e, { [t]: a }), a;
};
async function U(e, t) {
	if (e instanceof Uint8Array || j(e)) return e;
	if (de(e)) {
		if (e.type === `secret`) return e.export();
		if (`toCryptoKey` in e && typeof e.toCryptoKey == `function`) try {
			return rt(e, t);
		} catch (e) {
			if (e instanceof TypeError) throw e;
		}
		return nt(e, e.export({ format: `jwk` }), t);
	}
	if (L(e)) return e.k ? f(e.k) : nt(e, e, t, !0);
	throw Error(`unreachable`);
}
async function Et(e, t, n) {
	if (!F(e)) throw TypeError(`JWK must be an object`);
	let r;
	switch (t ??= e.alg, r ??= n?.extractable ?? e.ext, e.kty) {
		case `oct`:
			if (typeof e.k != `string` || !e.k) throw TypeError(`missing "k" (Key Value) Parameter value`);
			return f(e.k);
		case `RSA`:
			if (`oth` in e && e.oth !== void 0) throw new T(`RSA JWK "oth" (Other Primes Info) Parameter value is not supported`);
			return B({
				...e,
				alg: t,
				ext: r
			});
		case `AKP`:
			if (typeof e.alg != `string` || !e.alg) throw TypeError(`missing "alg" (Algorithm) Parameter value`);
			if (t !== void 0 && t !== e.alg) throw TypeError(`JWK alg and alg option value mismatch`);
			return B({
				...e,
				ext: r
			});
		case `EC`:
		case `OKP`: return B({
			...e,
			alg: t,
			ext: r
		});
		default: throw new T(`Unsupported "kty" (Key Type) Parameter value`);
	}
}
function q(e, t, n, r, i) {
	if (i.crit !== void 0 && r?.crit === void 0) throw new e(`"crit" (Critical) Header Parameter MUST be integrity protected`);
	if (!r || r.crit === void 0) return /* @__PURE__ */ new Set();
	if (!Array.isArray(r.crit) || r.crit.length === 0 || r.crit.some((e) => typeof e != `string` || e.length === 0)) throw new e(`"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present`);
	let a;
	a = n === void 0 ? t : new Map([...Object.entries(n), ...t.entries()]);
	for (let t of r.crit) {
		if (!a.has(t)) throw new T(`Extension Header Parameter "${t}" is not recognized`);
		if (i[t] === void 0) throw new e(`Extension Header Parameter "${t}" is missing`);
		if (a.get(t) && r[t] === void 0) throw new e(`Extension Header Parameter "${t}" MUST be integrity protected`);
	}
	return new Set(r.crit);
}
function It(e, t) {
	if (t !== void 0 && (!Array.isArray(t) || t.some((e) => typeof e != `string`))) throw TypeError(`"${e}" option must be an array of strings`);
	if (t) return new Set(t);
}
const J = (e) => e?.[Symbol.toStringTag], Lt = (e, t, n) => {
	if (t.use !== void 0) {
		let e;
		switch (n) {
			case `sign`:
			case `verify`:
				e = `sig`;
				break;
			case `encrypt`:
			case `decrypt`:
				e = `enc`;
				break;
		}
		if (t.use !== e) throw TypeError(`Invalid key for this operation, its "use" must be "${e}" when present`);
	}
	if (t.alg !== void 0 && t.alg !== e) throw TypeError(`Invalid key for this operation, its "alg" must be "${e}" when present`);
	if (Array.isArray(t.key_ops)) {
		let r;
		switch (!0) {
			case n === `sign` || n === `verify`:
			case e === `dir`:
			case e.includes(`CBC-HS`):
				r = n;
				break;
			case e.startsWith(`PBES2`):
				r = `deriveBits`;
				break;
			case /^A\d{3}(?:GCM)?(?:KW)?$/.test(e):
				r = !e.includes(`GCM`) && e.endsWith(`KW`) ? n === `encrypt` ? `wrapKey` : `unwrapKey` : n;
				break;
			case n === `encrypt` && e.startsWith(`RSA`):
				r = `wrapKey`;
				break;
			case n === `decrypt`:
				r = e.startsWith(`RSA`) ? `unwrapKey` : `deriveBits`;
				break;
		}
		if (r && t.key_ops?.includes?.(r) === !1) throw TypeError(`Invalid key for this operation, its "key_ops" must include "${r}" when present`);
	}
	return !0;
}, Rt = (e, t, n) => {
	if (!(t instanceof Uint8Array)) {
		if (L(t)) {
			if (Ne(t) && Lt(e, t, n)) return;
			throw TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
		}
		if (!fe(t)) throw TypeError(te(e, t, `CryptoKey`, `KeyObject`, `JSON Web Key`, `Uint8Array`));
		if (t.type !== `secret`) throw TypeError(`${J(t)} instances for symmetric algorithms must be of type "secret"`);
	}
}, zt = (e, t, n) => {
	if (L(t)) switch (n) {
		case `decrypt`:
		case `sign`:
			if (je(t) && Lt(e, t, n)) return;
			throw TypeError(`JSON Web Key for this operation must be a private JWK`);
		case `encrypt`:
		case `verify`:
			if (Me(t) && Lt(e, t, n)) return;
			throw TypeError(`JSON Web Key for this operation must be a public JWK`);
	}
	if (!fe(t)) throw TypeError(te(e, t, `CryptoKey`, `KeyObject`, `JSON Web Key`));
	if (t.type === `secret`) throw TypeError(`${J(t)} instances for asymmetric algorithms must not be of type "secret"`);
	if (t.type === `public`) switch (n) {
		case `sign`: throw TypeError(`${J(t)} instances for asymmetric algorithm signing must be of type "private"`);
		case `decrypt`: throw TypeError(`${J(t)} instances for asymmetric algorithm decryption must be of type "private"`);
	}
	if (t.type === `private`) switch (n) {
		case `verify`: throw TypeError(`${J(t)} instances for asymmetric algorithm verifying must be of type "public"`);
		case `encrypt`: throw TypeError(`${J(t)} instances for asymmetric algorithm encryption must be of type "public"`);
	}
};
function Y(e, t, n) {
	switch (e.substring(0, 2)) {
		case `A1`:
		case `A2`:
		case `di`:
		case `HS`:
		case `PB`:
			Rt(e, t, n);
			break;
		default: zt(e, t, n);
	}
}
async function Yt(e, r, a) {
	if (!F(e)) throw new O(`Flattened JWS must be an object`);
	if (e.protected === void 0 && e.header === void 0) throw new O(`Flattened JWS must have either of the "protected" or "header" members`);
	if (e.protected !== void 0 && typeof e.protected != `string`) throw new O(`JWS Protected Header incorrect type`);
	if (e.payload === void 0) throw new O(`JWS Payload missing`);
	if (typeof e.signature != `string`) throw new O(`JWS Signature missing or incorrect type`);
	if (e.header !== void 0 && !F(e.header)) throw new O(`JWS Unprotected Header incorrect type`);
	let o = {};
	if (e.protected) try {
		let t = f(e.protected);
		o = JSON.parse(n.decode(t));
	} catch {
		throw new O(`JWS Protected Header is invalid`);
	}
	if (!I(o, e.header)) throw new O(`JWS Protected and JWS Unprotected Header Parameter names must be disjoint`);
	let s = {
		...o,
		...e.header
	}, l = q(O, /* @__PURE__ */ new Map([[`b64`, !0]]), a?.crit, o, s), u = !0;
	if (l.has(`b64`) && (u = o.b64, typeof u != `boolean`)) throw new O(`The "b64" (base64url-encode payload) Header Parameter must be a boolean`);
	let { alg: d } = s;
	if (typeof d != `string` || !d) throw new O(`JWS "alg" (Algorithm) Header Parameter missing or invalid`);
	let p = a && It(`algorithms`, a.algorithms);
	if (p && !p.has(d)) throw new ie(`"alg" (Algorithm) Header Parameter value not allowed`);
	if (u) {
		if (typeof e.payload != `string`) throw new O(`JWS Payload must be a string`);
	} else if (typeof e.payload != `string` && !(e.payload instanceof Uint8Array)) throw new O(`JWS Payload must be a string or an Uint8Array instance`);
	let m = !1;
	typeof r == `function` && (r = await r(o, e), m = !0), Y(d, r, `verify`);
	let h = i(e.protected === void 0 ? /* @__PURE__ */ new Uint8Array() : c(e.protected), c(`.`), typeof e.payload == `string` ? u ? c(e.payload) : t.encode(e.payload) : e.payload), g = P(e.signature, `signature`, O), _ = await U(r, d);
	if (!await Ze(d, _, g, h)) throw new ue();
	let v;
	v = u ? P(e.payload, `payload`, O) : typeof e.payload == `string` ? t.encode(e.payload) : e.payload;
	let y = { payload: v };
	return e.protected !== void 0 && (y.protectedHeader = o), e.header !== void 0 && (y.unprotectedHeader = e.header), m ? {
		...y,
		key: _
	} : y;
}
async function Xt(e, t, r) {
	if (e instanceof Uint8Array && (e = n.decode(e)), typeof e != `string`) throw new O(`Compact JWS must be a string or Uint8Array`);
	let { 0: i, 1: a, 2: o, length: s } = e.split(`.`);
	if (s !== 3) throw new O(`Invalid Compact JWS`);
	let c = await Yt({
		payload: a,
		protected: i,
		signature: o
	}, t, r), l = {
		payload: c.payload,
		protectedHeader: c.protectedHeader
	};
	return typeof t == `function` ? {
		...l,
		key: c.key
	} : l;
}
const X = (e) => Math.floor(e.getTime() / 1e3), Qt = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
function Z(e) {
	let t = Qt.exec(e);
	if (!t || t[4] && t[1]) throw TypeError(`Invalid time period format`);
	let n = parseFloat(t[2]), r = t[3].toLowerCase(), i;
	switch (r) {
		case `sec`:
		case `secs`:
		case `second`:
		case `seconds`:
		case `s`:
			i = Math.round(n);
			break;
		case `minute`:
		case `minutes`:
		case `min`:
		case `mins`:
		case `m`:
			i = Math.round(n * 60);
			break;
		case `hour`:
		case `hours`:
		case `hr`:
		case `hrs`:
		case `h`:
			i = Math.round(n * 3600);
			break;
		case `day`:
		case `days`:
		case `d`:
			i = Math.round(n * 86400);
			break;
		case `week`:
		case `weeks`:
		case `w`:
			i = Math.round(n * 604800);
			break;
		default:
			i = Math.round(n * 31557600);
			break;
	}
	return t[1] === `-` || t[4] === `ago` ? -i : i;
}
const $t = (e) => e.includes(`/`) ? e.toLowerCase() : `application/${e.toLowerCase()}`, en = (e, t) => typeof e == `string` ? t.includes(e) : Array.isArray(e) ? t.some(Set.prototype.has.bind(new Set(e))) : !1;
function tn(e, t, r = {}) {
	let i;
	try {
		i = JSON.parse(n.decode(t));
	} catch {}
	if (!F(i)) throw new k(`JWT Claims Set must be a top-level JSON object`);
	let { typ: a } = r;
	if (a && (typeof e.typ != `string` || $t(e.typ) !== $t(a))) throw new w(`unexpected "typ" JWT header value`, i, `typ`, `check_failed`);
	let { requiredClaims: o = [], issuer: s, subject: c, audience: l, maxTokenAge: u } = r, d = [...o];
	u !== void 0 && d.push(`iat`), l !== void 0 && d.push(`aud`), c !== void 0 && d.push(`sub`), s !== void 0 && d.push(`iss`);
	for (let e of new Set(d.reverse())) if (!(e in i)) throw new w(`missing required "${e}" claim`, i, e, `missing`);
	if (s && !(Array.isArray(s) ? s : [s]).includes(i.iss)) throw new w(`unexpected "iss" claim value`, i, `iss`, `check_failed`);
	if (c && i.sub !== c) throw new w(`unexpected "sub" claim value`, i, `sub`, `check_failed`);
	if (l && !en(i.aud, typeof l == `string` ? [l] : l)) throw new w(`unexpected "aud" claim value`, i, `aud`, `check_failed`);
	let f;
	switch (typeof r.clockTolerance) {
		case `string`:
			f = Z(r.clockTolerance);
			break;
		case `number`:
			f = r.clockTolerance;
			break;
		case `undefined`:
			f = 0;
			break;
		default: throw TypeError(`Invalid clockTolerance option type`);
	}
	let { currentDate: p } = r, m = X(p || /* @__PURE__ */ new Date());
	if ((i.iat !== void 0 || u) && typeof i.iat != `number`) throw new w(`"iat" claim must be a number`, i, `iat`, `invalid`);
	if (i.nbf !== void 0) {
		if (typeof i.nbf != `number`) throw new w(`"nbf" claim must be a number`, i, `nbf`, `invalid`);
		if (i.nbf > m + f) throw new w(`"nbf" claim timestamp check failed`, i, `nbf`, `check_failed`);
	}
	if (i.exp !== void 0) {
		if (typeof i.exp != `number`) throw new w(`"exp" claim must be a number`, i, `exp`, `invalid`);
		if (i.exp <= m - f) throw new re(`"exp" claim timestamp check failed`, i, `exp`, `check_failed`);
	}
	if (u) {
		let e = m - i.iat, t = typeof u == `number` ? u : Z(u);
		if (e - f > t) throw new re(`"iat" claim timestamp check failed (too far in the past)`, i, `iat`, `check_failed`);
		if (e < 0 - f) throw new w(`"iat" claim timestamp check failed (it should be in the past)`, i, `iat`, `check_failed`);
	}
	return i;
}
async function rn(e, t, n) {
	let r = await Xt(e, t, n);
	if (r.protectedHeader.crit?.includes(`b64`) && r.protectedHeader.b64 === !1) throw new k(`JWTs MUST NOT use unencoded payload`);
	let i = {
		payload: tn(r.protectedHeader, r.payload, n),
		protectedHeader: r.protectedHeader
	};
	return typeof t == `function` ? {
		...i,
		key: r.key
	} : i;
}
function gn(e) {
	switch (typeof e == `string` && e.slice(0, 2)) {
		case `RS`:
		case `PS`: return `RSA`;
		case `ES`: return `EC`;
		case `Ed`: return `OKP`;
		case `ML`: return `AKP`;
		default: throw new T(`Unsupported "alg" value for a JSON Web Key Set`);
	}
}
function _n(e) {
	return e && typeof e == `object` && Array.isArray(e.keys) && e.keys.every(vn);
}
function vn(e) {
	return F(e);
}
var yn = class {
	#e;
	#t = /* @__PURE__ */ new WeakMap();
	constructor(e) {
		if (!_n(e)) throw new oe(`JSON Web Key Set malformed`);
		this.#e = structuredClone(e);
	}
	jwks() {
		return this.#e;
	}
	async getKey(e, t) {
		let { alg: n, kid: r } = {
			...e,
			...t?.header
		}, i = gn(n), a = this.#e.keys.filter((e) => {
			let t = i === e.kty;
			if (t && typeof r == `string` && (t = r === e.kid), t && (typeof e.alg == `string` || i === `AKP`) && (t = n === e.alg), t && typeof e.use == `string` && (t = e.use === `sig`), t && Array.isArray(e.key_ops) && (t = e.key_ops.includes(`verify`)), t) switch (n) {
				case `ES256`:
					t = e.crv === `P-256`;
					break;
				case `ES384`:
					t = e.crv === `P-384`;
					break;
				case `ES512`:
					t = e.crv === `P-521`;
					break;
				case `Ed25519`:
				case `EdDSA`:
					t = e.crv === `Ed25519`;
					break;
			}
			return t;
		}), { 0: o, length: s } = a;
		if (s === 0) throw new se();
		if (s !== 1) {
			let e = new ce(), t = this.#t;
			throw e[Symbol.asyncIterator] = async function* () {
				for (let e of a) try {
					yield await bn(t, e, n);
				} catch {}
			}, e;
		}
		return bn(this.#t, o, n);
	}
};
async function bn(e, t, n) {
	let r = e.get(t) || e.set(t, {}).get(t);
	if (r[n] === void 0) {
		let e = await Et({
			...t,
			ext: !0
		}, n);
		if (e instanceof Uint8Array || e.type !== `public`) throw new oe(`JSON Web Key Set members must be public keys`);
		r[n] = e;
	}
	return r[n];
}
function xn(e) {
	let t = new yn(e), n = async (e, n) => t.getKey(e, n);
	return Object.defineProperties(n, { jwks: {
		value: () => structuredClone(t.jwks()),
		enumerable: !1,
		configurable: !1,
		writable: !1
	} }), n;
}
function Sn() {
	return typeof WebSocketPair < `u` || typeof navigator < `u` && navigator.userAgent === `Cloudflare-Workers` || typeof EdgeRuntime < `u` && EdgeRuntime === `vercel`;
}
let Cn;
(typeof navigator > `u` || !navigator.userAgent?.startsWith?.(`Mozilla/5.0 `)) && (Cn = `jose/v6.2.3`);
const wn = Symbol();
async function Tn(e, t, n, r = fetch) {
	let i = await r(e, {
		method: `GET`,
		signal: n,
		redirect: `manual`,
		headers: t
	}).catch((e) => {
		throw e.name === `TimeoutError` ? new le() : e;
	});
	if (i.status !== 200) throw new C(`Expected 200 OK from the JSON Web Key Set HTTP response`);
	try {
		return await i.json();
	} catch {
		throw new C(`Failed to parse the JSON Web Key Set HTTP response as JSON`);
	}
}
const En = Symbol();
function Dn(e, t) {
	return !(typeof e != `object` || !e || !(`uat` in e) || typeof e.uat != `number` || Date.now() - e.uat >= t || !(`jwks` in e) || !F(e.jwks) || !Array.isArray(e.jwks.keys) || !Array.prototype.every.call(e.jwks.keys, F));
}
var On = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c;
	#l;
	constructor(e, t) {
		if (!(e instanceof URL)) throw TypeError(`url must be an instance of URL`);
		this.#e = new URL(e.href), this.#t = typeof t?.timeoutDuration == `number` ? t?.timeoutDuration : 5e3, this.#n = typeof t?.cooldownDuration == `number` ? t?.cooldownDuration : 3e4, this.#r = typeof t?.cacheMaxAge == `number` ? t?.cacheMaxAge : 6e5, this.#o = new Headers(t?.headers), Cn && !this.#o.has(`User-Agent`) && this.#o.set(`User-Agent`, Cn), this.#o.has(`accept`) || (this.#o.set(`accept`, `application/json`), this.#o.append(`accept`, `application/jwk-set+json`)), this.#s = t?.[wn], t?.[En] !== void 0 && (this.#l = t?.[En], Dn(t?.[En], this.#r) && (this.#i = this.#l.uat, this.#c = xn(this.#l.jwks)));
	}
	pendingFetch() {
		return !!this.#a;
	}
	coolingDown() {
		return typeof this.#i == `number` ? Date.now() < this.#i + this.#n : !1;
	}
	fresh() {
		return typeof this.#i == `number` ? Date.now() < this.#i + this.#r : !1;
	}
	jwks() {
		return this.#c?.jwks();
	}
	async getKey(e, t) {
		(!this.#c || !this.fresh()) && await this.reload();
		try {
			return await this.#c(e, t);
		} catch (n) {
			if (n instanceof se && this.coolingDown() === !1) return await this.reload(), this.#c(e, t);
			throw n;
		}
	}
	async reload() {
		this.#a && Sn() && (this.#a = void 0), this.#a ||= Tn(this.#e.href, this.#o, AbortSignal.timeout(this.#t), this.#s).then((e) => {
			this.#c = xn(e), this.#l && (this.#l.uat = Date.now(), this.#l.jwks = e), this.#i = Date.now(), this.#a = void 0;
		}).catch((e) => {
			throw this.#a = void 0, e;
		}), await this.#a;
	}
};
function kn(e, t) {
	let n = new On(e, t), r = async (e, t) => n.getKey(e, t);
	return Object.defineProperties(r, {
		coolingDown: {
			get: () => n.coolingDown(),
			enumerable: !0,
			configurable: !1
		},
		fresh: {
			get: () => n.fresh(),
			enumerable: !0,
			configurable: !1
		},
		reload: {
			value: () => n.reload(),
			enumerable: !0,
			configurable: !1,
			writable: !1
		},
		reloading: {
			get: () => n.pendingFetch(),
			enumerable: !0,
			configurable: !1
		},
		jwks: {
			value: () => n.jwks(),
			enumerable: !0,
			configurable: !1,
			writable: !1
		}
	}), r;
}
function Mn(e) {
	if (typeof e != `string`) throw new k(`JWTs must use Compact JWS serialization, JWT must be a string`);
	let { 1: t, length: r } = e.split(`.`);
	if (r === 5) throw new k(`Only JWTs using Compact JWS serialization can be decoded`);
	if (r !== 3) throw new k(`Invalid JWT`);
	if (!t) throw new k(`JWTs must contain a payload`);
	let i;
	try {
		i = f(t);
	} catch {
		throw new k(`Failed to base64url decode the payload`);
	}
	let a;
	try {
		a = JSON.parse(n.decode(i));
	} catch {
		throw new k(`Failed to parse the decoded payload as JSON`);
	}
	if (!F(a)) throw new k(`Invalid JWT Claims Set`);
	return a;
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/runtime/governance/auth/token-claims.js
const STANDARD_PROJECTED_CLAIM_KEYS = /* @__PURE__ */ new Set([
	`aud`,
	`exp`,
	`iat`,
	`iss`,
	`jti`,
	`nbf`,
	`sub`
]);
function normalizeJwtClaims(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) {
		if (typeof r == `string`) {
			t[n] = r;
			continue;
		}
		Array.isArray(r) && r.every((e) => typeof e == `string`) && (t[n] = Object.freeze([...r]));
	}
	return Object.freeze(t);
}
function createJwtAttributeProjection(t) {
	let n = normalizeJwtClaims(t);
	return Object.freeze(Object.fromEntries(Object.entries(n).filter(([t]) => !STANDARD_PROJECTED_CLAIM_KEYS.has(t))));
}
function areTokenClaimMatchersSatisfied(e, t) {
	let n = normalizeJwtClaims(e);
	if (t.subjects !== void 0) {
		let n = typeof e.sub == `string` ? e.sub : null;
		if (n === null || !t.subjects.some((e) => matchesWildcardPattern(e, n))) return !1;
	}
	return t.claims === void 0 ? !0 : Object.entries(t.claims).every(([e, t]) => {
		let r = n[e];
		return r === void 0 ? !1 : typeof r == `string` ? t.includes(r) : r.some((e) => t.includes(e));
	});
}
function createJwtAuthenticatedCallerPrincipal(e) {
	let t = readFirstStringClaim(e.payload, [...e.issuerClaims ?? [], `iss`]), n = e.subjectClaim ?? `sub`, r = readFirstStringClaim(e.payload, [n]);
	if (t === void 0 || r === void 0) throw Error(`Expected verified JWT payloads to include string iss and ${n} claims.`);
	let i = normalizeJwtClaims(e.payload);
	return {
		attributes: createJwtAttributeProjection(e.payload),
		authenticator: e.authenticator,
		claims: i,
		issuer: t,
		principalId: `${t}:${r}`,
		principalType: e.principalType,
		subject: r
	};
}
function readFirstStringClaim(e, t) {
	for (let n of t) {
		let t = e[n];
		if (typeof t == `string` && t.length > 0) return t;
	}
}
function matchesWildcardPattern(e, t) {
	if (!e.includes(`*`)) return e === t;
	let n = e.replaceAll(/[.+?^${}()|[\]\\]/g, `\\$&`).replaceAll(`*`, `.*`);
	return RegExp(`^${n}$`).test(t);
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/runtime/governance/auth/oidc.js
const oidcDiscoveryDocumentSchema = Mr.object({
	issuer: Mr.string().optional(),
	jwks_uri: Mr.string().url()
}).passthrough(), oidcDiscoveryDocumentCache = /* @__PURE__ */ new Map(), oidcJwksCache = /* @__PURE__ */ new Map();
async function authenticateOidcStrategy(e) {
	let t;
	try {
		t = await getOidcRemoteJwks(e.strategy);
	} catch (e) {
		return {
			kind: `misconfigured`,
			message: `Failed to load OIDC discovery metadata. ${e instanceof Error ? e.message : `Unknown discovery failure.`}`
		};
	}
	try {
		let a = await rn(e.token, t, {
			audience: [...e.strategy.audiences],
			clockTolerance: e.strategy.clockSkewSeconds,
			issuer: e.strategy.issuer
		});
		if (e.strategy.acceptCurrentVercelProject && e.strategy.issuer.startsWith(`https://oidc.vercel.com/`) && a.payload.external_sub !== void 0) return typeof a.payload.external_sub != `string` || a.payload.external_sub.length === 0 || !currentVercelProjectMatches({ payload: a.payload }) || !currentVercelEnvironmentMatches({ payload: a.payload }) ? { kind: `caller-not-allowed` } : {
			kind: `authenticated`,
			principal: createJwtAuthenticatedCallerPrincipal({
				authenticator: `oidc`,
				issuerClaims: [`external_iss`, `connector_id`],
				payload: a.payload,
				principalType: `user`,
				subjectClaim: `external_sub`
			})
		};
		if (typeof a.payload.sub != `string` || a.payload.sub.length === 0) return { kind: `not-authenticated` };
		let o = e.strategy.acceptCurrentVercelProject && isCurrentVercelProjectToken({
			issuer: e.strategy.issuer,
			payload: a.payload
		}), s = o && isCurrentVercelEnvironmentToken({ payload: a.payload });
		return !o && !areTokenClaimMatchersSatisfied(a.payload, e.strategy) ? { kind: `caller-not-allowed` } : {
			kind: `authenticated`,
			principal: createJwtAuthenticatedCallerPrincipal({
				authenticator: `oidc`,
				payload: a.payload,
				principalType: s ? `runtime` : `service`
			})
		};
	} catch {
		return { kind: `not-authenticated` };
	}
}
async function getOidcRemoteJwks(e) {
	let n = await getOidcDiscoveryDocument(e.discoveryUrl), r = oidcJwksCache.get(n.jwks_uri);
	if (r !== void 0) return r;
	let i = kn(new URL(n.jwks_uri));
	return oidcJwksCache.set(n.jwks_uri, i), i;
}
async function getOidcDiscoveryDocument(e) {
	let t = oidcDiscoveryDocumentCache.get(e);
	if (t !== void 0) return await t;
	let n = fetch(e, { headers: { accept: `application/json` } }).then(async (e) => {
		if (!e.ok) throw Error(`Discovery route returned HTTP ${e.status}.`);
		return oidcDiscoveryDocumentSchema.parse(await e.json());
	}).catch((t) => {
		throw oidcDiscoveryDocumentCache.delete(e), t;
	});
	return oidcDiscoveryDocumentCache.set(e, n), await n;
}
function isCurrentVercelProjectToken(e) {
	if (!e.issuer.startsWith(`https://oidc.vercel.com`)) return !1;
	let t = process.env.VERCEL_PROJECT_ID?.trim();
	return t === void 0 || t.length === 0 ? !1 : typeof e.payload.project_id == `string` && e.payload.project_id === t;
}
function currentVercelProjectMatches(e) {
	let t = process.env.VERCEL_PROJECT_ID?.trim();
	return t === void 0 || t.length === 0 ? !1 : typeof e.payload.project_id == `string` && e.payload.project_id === t;
}
function isCurrentVercelEnvironmentToken(e) {
	let t = getCurrentVercelEnvironment();
	return t === void 0 || t.length === 0 ? !1 : typeof e.payload.environment == `string` && e.payload.environment === t;
}
function currentVercelEnvironmentMatches(e) {
	let t = getCurrentVercelEnvironment();
	return t === void 0 || t.length === 0 ? !1 : typeof e.payload.environment == `string` && e.payload.environment === t;
}
function getCurrentVercelEnvironment() {
	return process.env.VERCEL_TARGET_ENV?.trim() || process.env.VERCEL_ENV?.trim() || void 0;
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/runtime/governance/auth/types.js
function createRuntimeSessionAuthContext(e) {
	return {
		attributes: e.attributes,
		authenticator: e.authenticator,
		issuer: e.issuer,
		principalId: e.principalId,
		principalType: e.principalType,
		subject: e.subject
	};
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/public/channels/auth.js
const vercelOidcLog = createLogger(`auth.vercel-oidc`);
async function runOidcVerification(e, t) {
	return e === null || e.length === 0 ? { kind: `not-authenticated` } : await authenticateOidcStrategy({
		strategy: {
			acceptCurrentVercelProject: t.acceptCurrentVercelProject,
			audiences: [...t.audiences],
			clockSkewSeconds: t.clockSkewSeconds ?? 30,
			discoveryUrl: t.discoveryUrl ?? `${t.issuer.replace(/\/$/, ``)}/.well-known/openid-configuration`,
			issuer: t.issuer,
			kind: `oidc`,
			...t.claims === void 0 ? {} : { claims: t.claims },
			...t.subjects === void 0 ? {} : { subjects: t.subjects }
		},
		token: e
	});
}
function extractBearerToken(e) {
	if (e === null) return null;
	let t = /^Bearer\s+(.+)$/i.exec(e)?.[1]?.trim();
	return t === void 0 || t.length === 0 ? null : t;
}
function createUnauthorizedResponse(e = {}) {
	let t = e.status ?? 401, n = e.code ?? (t === 403 ? `forbidden` : `unauthorized`), r = e.message ?? (t === 403 ? `Forbidden.` : `Authorization is required for this route.`), i = e.challenges ?? [], a = new Headers({ "cache-control": `no-store` });
	for (let e of i) a.append(`www-authenticate`, formatChallenge(e));
	return Response.json({
		code: n,
		error: r,
		ok: !1
	}, {
		headers: a,
		status: t
	});
}
function formatChallenge(e) {
	if (e.parameters === void 0 || Object.keys(e.parameters).length === 0) return e.scheme;
	let t = Object.entries(e.parameters).map(([e, t]) => `${e}="${escapeChallengeValue(t)}"`).join(`, `);
	return `${e.scheme} ${t}`;
}
function escapeChallengeValue(e) {
	return e.replaceAll(`\\`, `\\\\`).replaceAll(`"`, `\\"`);
}
async function routeAuth(e, t) {
	let n = Array.isArray(t) ? t : [t];
	try {
		for (let t of n) {
			let n = await t(e);
			if (n) return n;
		}
	} catch (e) {
		if (typeof e == `object` && e && `response` in e && e.response instanceof Response) return e.response;
		throw e;
	}
	return createUnauthorizedResponse({ challenges: [{ scheme: `Bearer` }] });
}
function localDev() {
	return (e) => process.env.VERCEL && process.env.VERCEL_ENV === `development` || isLoopbackRequest(e) ? LOCAL_DEV_SESSION_AUTH_CONTEXT : null;
}
const LOOPBACK_HOSTNAMES = /* @__PURE__ */ new Set([`localhost`, `[::1]`]), LOOPBACK_IPV4_PREFIX = /^127\./;
function isLoopbackRequest(e) {
	let t;
	try {
		t = new URL(e.url).hostname;
	} catch {
		return !1;
	}
	return !!(LOOPBACK_HOSTNAMES.has(t) || LOOPBACK_IPV4_PREFIX.test(t) || t.endsWith(`.localhost`));
}
const LOCAL_DEV_SESSION_AUTH_CONTEXT = {
	attributes: {},
	authenticator: `local-dev`,
	principalId: `local-dev`,
	principalType: `local-dev`
};
async function verifyVercelOidc(e, t = {}) {
	if (e === null || e.length === 0) return { ok: !1 };
	let n = decodeUnverifiedJwtClaims(e);
	if (n === null) return vercelOidcLog.debug(`Rejected token that failed to decode as a JWT.`), { ok: !1 };
	if (!n.issuer.startsWith(`https://oidc.vercel.com/`)) return vercelOidcLog.debug(`Rejected token whose issuer is not a Vercel OIDC issuer.`, { issuer: n.issuer }), { ok: !1 };
	if (n.audiences.length === 0) return vercelOidcLog.debug(`Rejected token with no audience claim.`, { issuer: n.issuer }), { ok: !1 };
	if (!n.audiences.some((e) => e.startsWith(`https://vercel.com/`))) return vercelOidcLog.debug(`Rejected token whose audience is not a Vercel audience.`, {
		audiences: n.audiences,
		issuer: n.issuer
	}), { ok: !1 };
	let r = await runOidcVerification(e, {
		acceptCurrentVercelProject: !0,
		audiences: n.audiences,
		issuer: n.issuer,
		subjects: t.subjects ?? []
	});
	return r.kind === `authenticated` ? (vercelOidcLog.debug(`Accepted Vercel OIDC token.`, {
		issuer: n.issuer,
		principalType: r.principal.principalType,
		subject: r.principal.subject
	}), {
		ok: !0,
		sessionAuth: createRuntimeSessionAuthContext(r.principal)
	}) : (vercelOidcLog.debug(`Rejected Vercel OIDC token after verification.`, {
		audiences: n.audiences,
		issuer: n.issuer,
		reason: r.kind,
		subjectsConfigured: (t.subjects ?? []).length > 0,
		...r.kind === `misconfigured` ? { detail: r.message } : {}
	}), { ok: !1 });
}
function vercelOidc(e = {}) {
	return async (t) => {
		let n = await verifyVercelOidc(extractBearerToken(t.headers.get(`authorization`)), e);
		return n.ok ? n.sessionAuth : null;
	};
}
function decodeUnverifiedJwtClaims(e) {
	let n;
	try {
		n = Mn(e);
	} catch {
		return null;
	}
	return typeof n.iss != `string` || n.iss.length === 0 ? null : {
		audiences: typeof n.aud == `string` ? [n.aud] : Array.isArray(n.aud) ? n.aud.filter((e) => typeof e == `string`) : [],
		issuer: n.iss
	};
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/public/connections/errors.js
var ConnectionAuthorizationRequiredError = class extends Error {
	connectionName;
	constructor(e, t) {
		super(t?.message ?? `Connection "${e}" requires authorization.`), this.name = `ConnectionAuthorizationRequiredError`, this.connectionName = e;
	}
}, ConnectionAuthorizationFailedError = class extends Error {
	connectionName;
	reason;
	retryable;
	constructor(e, t) {
		super(t?.message ?? `Connection "${e}" authorization failed.`), this.name = `ConnectionAuthorizationFailedError`, this.connectionName = e, this.reason = t?.reason, this.retryable = t?.retryable ?? !0;
	}
};
function isConnectionAuthorizationRequiredError(e) {
	return e instanceof Error && e.name === `ConnectionAuthorizationRequiredError`;
}
function isConnectionAuthorizationFailedError(e) {
	return e instanceof Error && e.name === `ConnectionAuthorizationFailedError`;
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/runtime/connections/types.js
function supportsInteractiveAuthorization(e) {
	return e?.startAuthorization !== void 0;
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/runtime/connections/validate-authorization.js
function validateAuthorizationSpec(e, t = `auth`) {
	if (typeof e != `object` || !e) return `The "${t}" field must be an object with a "getToken" method.`;
	let n = e;
	if (typeof n.getToken != `function`) return `The "${t}.getToken" field must be a function returning Promise<{ token }>.`;
	let r = n.startAuthorization !== void 0, i = n.completeAuthorization !== void 0;
	if (!r && !i && n.principalType !== void 0 && n.principalType !== `app` && n.principalType !== `user`) return `The "${t}.principalType" field must be "app" or "user".`;
	if (r !== i) return `The "${t}" field must provide either both "startAuthorization" and "completeAuthorization" (interactive OAuth) or neither (getToken-only). Got only "${r ? `startAuthorization` : `completeAuthorization`}".`;
	if (r && typeof n.startAuthorization != `function`) return `The "${t}.startAuthorization" field must be a function when provided.`;
	if (i && typeof n.completeAuthorization != `function`) return `The "${t}.completeAuthorization" field must be a function when provided.`;
	if (r && n.principalType !== `user`) return `Interactive authorization (startAuthorization + completeAuthorization) is restricted to "principalType": "user" in v1. App-level credentials must use a getToken-only definition.`;
	if (n.displayName !== void 0 && (typeof n.displayName != `string` || n.displayName.length === 0)) return `The "${t}.displayName" field must be a non-empty string when provided.`;
}
function normalizeAuthorizationSpec(e, t, n = `auth`) {
	let r = validateAuthorizationSpec(e, n);
	if (r !== void 0) throw Error(`${t} ${r}`);
	let i = e, a = extractVercelConnectMarker(i.vercelConnect), o = i.displayName;
	if (i.startAuthorization !== void 0 && i.completeAuthorization !== void 0) {
		let e = {
			completeAuthorization: i.completeAuthorization,
			getToken: i.getToken,
			principalType: `user`,
			startAuthorization: i.startAuthorization
		};
		return a !== void 0 && (e = {
			...e,
			vercelConnect: a
		}), o !== void 0 && (e = {
			...e,
			displayName: o
		}), e;
	}
	let s = {
		getToken: i.getToken,
		principalType: i.principalType ?? `app`
	};
	return a !== void 0 && (s = {
		...s,
		vercelConnect: a
	}), o !== void 0 && (s = {
		...s,
		displayName: o
	}), s;
}
function extractVercelConnectMarker(e) {
	if (typeof e != `object` || !e) return;
	let t = e.connector;
	if (!(typeof t != `string` || t.length === 0)) return { connector: t };
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/public/tool-result-narrowing.js
const DEFINITION_KEY = Symbol.for(`eve.definition-source-key`), REGISTRY_SYMBOL = Symbol.for(`eve.definition-source-registry`), registryContainer = globalThis;
registryContainer[REGISTRY_SYMBOL] === void 0 && (registryContainer[REGISTRY_SYMBOL] = /* @__PURE__ */ new Map());
const definitionSourceRegistry = registryContainer[REGISTRY_SYMBOL];
function stampDefinitionKey(t, n) {
	Object.defineProperty(t, DEFINITION_KEY, {
		configurable: !0,
		value: n
	});
}
function registerDefinitionSource(e, t) {
	let n = definitionSourceRegistry.get(e);
	if (n !== void 0 && !sameDefinitionSourceEntry(n, t)) {
		n.kind !== `ambiguous` && console.warn([
			`eve could not assign a unique toolResultFrom identity for ${JSON.stringify(e)}.`,
			`Conflicting definitions: ${formatDefinitionSourceForWarning(n)} and ${formatDefinitionSourceForWarning(t)}.`,
			`Multiple authored definitions share that fallback identity, so toolResultFrom will not match through it.`,
			`Use the original definition object loaded by eve so source-derived identity can be used instead.`
		].join(` `)), definitionSourceRegistry.set(e, { kind: `ambiguous` });
		return;
	}
	definitionSourceRegistry.set(e, t);
}
function sameDefinitionSourceEntry(e, t) {
	return e.kind === t.kind ? e.name === t.name : !1;
}
function formatDefinitionSourceForWarning(e) {
	return e.logicalPath === void 0 ? `${e.kind} "${e.name}"` : `${e.kind} "${e.name}" from "${e.logicalPath}"`;
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/public/definitions/connections/protocol.js
const PROTOCOL_KEY = Symbol.for(`eve.connection-protocol`);
function stampConnectionProtocol(e, t) {
	Object.defineProperty(e, PROTOCOL_KEY, {
		configurable: !0,
		value: t
	});
}
//#endregion
//#region node_modules/.pnpm/eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11_/node_modules/eve/dist/src/public/definitions/connections/mcp.js
function defineMcpClientConnection(e) {
	return e.auth !== void 0 && (e.auth = normalizeAuthorizationSpec(e.auth, `defineMcpClientConnection:`)), stampDefinitionKey(e, `connection:${e.url}`), stampConnectionProtocol(e, `mcp`), e;
}
//#endregion
//#region node_modules/.pnpm/@vercel+oidc@3.6.2/node_modules/@vercel/oidc/dist/get-context.js
var require_get_context = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var get_context_exports = {};
	__export(get_context_exports, {
		SYMBOL_FOR_REQ_CONTEXT: () => SYMBOL_FOR_REQ_CONTEXT,
		getContext: () => getContext
	});
	module.exports = __toCommonJS(get_context_exports);
	const SYMBOL_FOR_REQ_CONTEXT = Symbol.for("@vercel/request-context");
	function getContext() {
		return globalThis[SYMBOL_FOR_REQ_CONTEXT]?.get?.() ?? {};
	}
	0 && (module.exports = {
		SYMBOL_FOR_REQ_CONTEXT,
		getContext
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+oidc@3.6.2/node_modules/@vercel/oidc/dist/get-vercel-oidc-token-sync.js
var require_get_vercel_oidc_token_sync = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var get_vercel_oidc_token_sync_exports = {};
	__export(get_vercel_oidc_token_sync_exports, { getVercelOidcTokenSync: () => getVercelOidcTokenSync });
	module.exports = __toCommonJS(get_vercel_oidc_token_sync_exports);
	var import_get_context = require_get_context();
	function getVercelOidcTokenSync() {
		const token = (0, import_get_context.getContext)().headers?.["x-vercel-oidc-token"] ?? process.env.VERCEL_OIDC_TOKEN;
		if (!token) throw new Error(`The 'x-vercel-oidc-token' header is missing from the request.`);
		return token;
	}
	0 && (module.exports = { getVercelOidcTokenSync });
}));
//#endregion
//#region node_modules/.pnpm/@vercel+oidc@3.6.2/node_modules/@vercel/oidc/dist/token-error.js
var require_token_error = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var token_error_exports = {};
	__export(token_error_exports, { VercelOidcTokenError: () => VercelOidcTokenError });
	module.exports = __toCommonJS(token_error_exports);
	var VercelOidcTokenError = class extends Error {
		constructor(message, cause) {
			super(message);
			this.name = "VercelOidcTokenError";
			this.cause = cause;
		}
		toString() {
			if (this.cause) return `${this.name}: ${this.message}: ${this.cause}`;
			return `${this.name}: ${this.message}`;
		}
	};
	0 && (module.exports = { VercelOidcTokenError });
}));
//#endregion
//#region node_modules/.pnpm/@vercel+oidc@3.6.2/node_modules/@vercel/oidc/dist/get-vercel-oidc-token-with-refresh.js
var require_get_vercel_oidc_token_with_refresh = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var get_vercel_oidc_token_with_refresh_exports = {};
	__export(get_vercel_oidc_token_with_refresh_exports, { getVercelOidcToken: () => getVercelOidcToken });
	module.exports = __toCommonJS(get_vercel_oidc_token_with_refresh_exports);
	var import_get_vercel_oidc_token_sync = require_get_vercel_oidc_token_sync();
	var import_token_error = require_token_error();
	async function getVercelOidcToken(options) {
		let token = "";
		let err;
		try {
			token = (0, import_get_vercel_oidc_token_sync.getVercelOidcTokenSync)();
		} catch (error) {
			err = error;
		}
		try {
			const [{ getTokenPayload, isExpired }, { refreshToken }] = await Promise.all([await Promise.resolve().then(() => /* @__PURE__ */ __toESM(require_token_util())), await import("../vercel__oidc.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))]);
			if (!token || isExpired(getTokenPayload(token), options?.expirationBufferMs)) {
				await refreshToken(options);
				token = (0, import_get_vercel_oidc_token_sync.getVercelOidcTokenSync)();
			}
		} catch (error) {
			let message = err instanceof Error ? err.message : "";
			if (error instanceof Error) message = `${message}
${error.message}`;
			if (message) throw new import_token_error.VercelOidcTokenError(message);
			throw error;
		}
		return token;
	}
	0 && (module.exports = { getVercelOidcToken });
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/digest.js
var require_digest = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const node_crypto_1$17 = __require("node:crypto");
	const digest = (algorithm, data) => (0, node_crypto_1$17.createHash)(algorithm).update(data).digest();
	exports.default = digest;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/buffer_utils.js
var require_buffer_utils = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decoder = exports.encoder = void 0;
	exports.concat = concat;
	exports.p2s = p2s;
	exports.uint64be = uint64be;
	exports.uint32be = uint32be;
	exports.lengthAndInput = lengthAndInput;
	exports.concatKdf = concatKdf;
	const digest_js_1 = require_digest();
	exports.encoder = new TextEncoder();
	exports.decoder = new TextDecoder();
	const MAX_INT32 = 2 ** 32;
	function concat(...buffers) {
		const size = buffers.reduce((acc, { length }) => acc + length, 0);
		const buf = new Uint8Array(size);
		let i = 0;
		for (const buffer of buffers) {
			buf.set(buffer, i);
			i += buffer.length;
		}
		return buf;
	}
	function p2s(alg, p2sInput) {
		return concat(exports.encoder.encode(alg), new Uint8Array([0]), p2sInput);
	}
	function writeUInt32BE(buf, value, offset) {
		if (value < 0 || value >= MAX_INT32) throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
		buf.set([
			value >>> 24,
			value >>> 16,
			value >>> 8,
			value & 255
		], offset);
	}
	function uint64be(value) {
		const high = Math.floor(value / MAX_INT32);
		const low = value % MAX_INT32;
		const buf = /* @__PURE__ */ new Uint8Array(8);
		writeUInt32BE(buf, high, 0);
		writeUInt32BE(buf, low, 4);
		return buf;
	}
	function uint32be(value) {
		const buf = /* @__PURE__ */ new Uint8Array(4);
		writeUInt32BE(buf, value);
		return buf;
	}
	function lengthAndInput(input) {
		return concat(uint32be(input.length), input);
	}
	async function concatKdf(secret, bits, value) {
		const iterations = Math.ceil((bits >> 3) / 32);
		const res = new Uint8Array(iterations * 32);
		for (let iter = 0; iter < iterations; iter++) {
			const buf = new Uint8Array(4 + secret.length + value.length);
			buf.set(uint32be(iter + 1));
			buf.set(secret, 4);
			buf.set(value, 4 + secret.length);
			res.set(await (0, digest_js_1.default)("sha256", buf), iter * 32);
		}
		return res.slice(0, bits >> 3);
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/base64url.js
var require_base64url$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decode = exports.encode = exports.encodeBase64 = exports.decodeBase64 = void 0;
	const node_buffer_1$2 = __require("node:buffer");
	const buffer_utils_js_1 = require_buffer_utils();
	function normalize(input) {
		let encoded = input;
		if (encoded instanceof Uint8Array) encoded = buffer_utils_js_1.decoder.decode(encoded);
		return encoded;
	}
	const encode = (input) => node_buffer_1$2.Buffer.from(input).toString("base64url");
	exports.encode = encode;
	const decodeBase64 = (input) => new Uint8Array(node_buffer_1$2.Buffer.from(input, "base64"));
	exports.decodeBase64 = decodeBase64;
	const encodeBase64 = (input) => node_buffer_1$2.Buffer.from(input).toString("base64");
	exports.encodeBase64 = encodeBase64;
	const decode = (input) => new Uint8Array(node_buffer_1$2.Buffer.from(normalize(input), "base64url"));
	exports.decode = decode;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/util/errors.js
var require_errors = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.JWSSignatureVerificationFailed = exports.JWKSTimeout = exports.JWKSMultipleMatchingKeys = exports.JWKSNoMatchingKey = exports.JWKSInvalid = exports.JWKInvalid = exports.JWTInvalid = exports.JWSInvalid = exports.JWEInvalid = exports.JWEDecryptionFailed = exports.JOSENotSupported = exports.JOSEAlgNotAllowed = exports.JWTExpired = exports.JWTClaimValidationFailed = exports.JOSEError = void 0;
	var JOSEError = class extends Error {
		static code = "ERR_JOSE_GENERIC";
		code = "ERR_JOSE_GENERIC";
		constructor(message, options) {
			super(message, options);
			this.name = this.constructor.name;
			Error.captureStackTrace?.(this, this.constructor);
		}
	};
	exports.JOSEError = JOSEError;
	var JWTClaimValidationFailed = class extends JOSEError {
		static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
		code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
		claim;
		reason;
		payload;
		constructor(message, payload, claim = "unspecified", reason = "unspecified") {
			super(message, { cause: {
				claim,
				reason,
				payload
			} });
			this.claim = claim;
			this.reason = reason;
			this.payload = payload;
		}
	};
	exports.JWTClaimValidationFailed = JWTClaimValidationFailed;
	var JWTExpired = class extends JOSEError {
		static code = "ERR_JWT_EXPIRED";
		code = "ERR_JWT_EXPIRED";
		claim;
		reason;
		payload;
		constructor(message, payload, claim = "unspecified", reason = "unspecified") {
			super(message, { cause: {
				claim,
				reason,
				payload
			} });
			this.claim = claim;
			this.reason = reason;
			this.payload = payload;
		}
	};
	exports.JWTExpired = JWTExpired;
	var JOSEAlgNotAllowed = class extends JOSEError {
		static code = "ERR_JOSE_ALG_NOT_ALLOWED";
		code = "ERR_JOSE_ALG_NOT_ALLOWED";
	};
	exports.JOSEAlgNotAllowed = JOSEAlgNotAllowed;
	var JOSENotSupported = class extends JOSEError {
		static code = "ERR_JOSE_NOT_SUPPORTED";
		code = "ERR_JOSE_NOT_SUPPORTED";
	};
	exports.JOSENotSupported = JOSENotSupported;
	var JWEDecryptionFailed = class extends JOSEError {
		static code = "ERR_JWE_DECRYPTION_FAILED";
		code = "ERR_JWE_DECRYPTION_FAILED";
		constructor(message = "decryption operation failed", options) {
			super(message, options);
		}
	};
	exports.JWEDecryptionFailed = JWEDecryptionFailed;
	var JWEInvalid = class extends JOSEError {
		static code = "ERR_JWE_INVALID";
		code = "ERR_JWE_INVALID";
	};
	exports.JWEInvalid = JWEInvalid;
	var JWSInvalid = class extends JOSEError {
		static code = "ERR_JWS_INVALID";
		code = "ERR_JWS_INVALID";
	};
	exports.JWSInvalid = JWSInvalid;
	var JWTInvalid = class extends JOSEError {
		static code = "ERR_JWT_INVALID";
		code = "ERR_JWT_INVALID";
	};
	exports.JWTInvalid = JWTInvalid;
	var JWKInvalid = class extends JOSEError {
		static code = "ERR_JWK_INVALID";
		code = "ERR_JWK_INVALID";
	};
	exports.JWKInvalid = JWKInvalid;
	var JWKSInvalid = class extends JOSEError {
		static code = "ERR_JWKS_INVALID";
		code = "ERR_JWKS_INVALID";
	};
	exports.JWKSInvalid = JWKSInvalid;
	var JWKSNoMatchingKey = class extends JOSEError {
		static code = "ERR_JWKS_NO_MATCHING_KEY";
		code = "ERR_JWKS_NO_MATCHING_KEY";
		constructor(message = "no applicable key found in the JSON Web Key Set", options) {
			super(message, options);
		}
	};
	exports.JWKSNoMatchingKey = JWKSNoMatchingKey;
	var JWKSMultipleMatchingKeys = class extends JOSEError {
		[Symbol.asyncIterator];
		static code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
		code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
		constructor(message = "multiple matching keys found in the JSON Web Key Set", options) {
			super(message, options);
		}
	};
	exports.JWKSMultipleMatchingKeys = JWKSMultipleMatchingKeys;
	var JWKSTimeout = class extends JOSEError {
		static code = "ERR_JWKS_TIMEOUT";
		code = "ERR_JWKS_TIMEOUT";
		constructor(message = "request timed out", options) {
			super(message, options);
		}
	};
	exports.JWKSTimeout = JWKSTimeout;
	var JWSSignatureVerificationFailed = class extends JOSEError {
		static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
		code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
		constructor(message = "signature verification failed", options) {
			super(message, options);
		}
	};
	exports.JWSSignatureVerificationFailed = JWSSignatureVerificationFailed;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/random.js
var require_random = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var node_crypto_1$16 = __require("node:crypto");
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return node_crypto_1$16.randomFillSync;
		}
	});
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/iv.js
var require_iv = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.bitLength = bitLength;
	const errors_js_1 = require_errors();
	const random_js_1 = require_random();
	function bitLength(alg) {
		switch (alg) {
			case "A128GCM":
			case "A128GCMKW":
			case "A192GCM":
			case "A192GCMKW":
			case "A256GCM":
			case "A256GCMKW": return 96;
			case "A128CBC-HS256":
			case "A192CBC-HS384":
			case "A256CBC-HS512": return 128;
			default: throw new errors_js_1.JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
		}
	}
	exports.default = (alg) => (0, random_js_1.default)(new Uint8Array(bitLength(alg) >> 3));
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/check_iv_length.js
var require_check_iv_length = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const errors_js_1 = require_errors();
	const iv_js_1 = require_iv();
	const checkIvLength = (enc, iv) => {
		if (iv.length << 3 !== (0, iv_js_1.bitLength)(enc)) throw new errors_js_1.JWEInvalid("Invalid Initialization Vector length");
	};
	exports.default = checkIvLength;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/is_key_object.js
var require_is_key_object = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const util$1 = __require("node:util");
	exports.default = (obj) => util$1.types.isKeyObject(obj);
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/check_cek_length.js
var require_check_cek_length = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const errors_js_1 = require_errors();
	const is_key_object_js_1 = require_is_key_object();
	const checkCekLength = (enc, cek) => {
		let expected;
		switch (enc) {
			case "A128CBC-HS256":
			case "A192CBC-HS384":
			case "A256CBC-HS512":
				expected = parseInt(enc.slice(-3), 10);
				break;
			case "A128GCM":
			case "A192GCM":
			case "A256GCM":
				expected = parseInt(enc.slice(1, 4), 10);
				break;
			default: throw new errors_js_1.JOSENotSupported(`Content Encryption Algorithm ${enc} is not supported either by JOSE or your javascript runtime`);
		}
		if (cek instanceof Uint8Array) {
			const actual = cek.byteLength << 3;
			if (actual !== expected) throw new errors_js_1.JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
			return;
		}
		if ((0, is_key_object_js_1.default)(cek) && cek.type === "secret") {
			const actual = cek.symmetricKeySize << 3;
			if (actual !== expected) throw new errors_js_1.JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
			return;
		}
		throw new TypeError("Invalid Content Encryption Key type");
	};
	exports.default = checkCekLength;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/timing_safe_equal.js
var require_timing_safe_equal = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = __require("node:crypto").timingSafeEqual;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/cbc_tag.js
var require_cbc_tag = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = cbcTag;
	const node_crypto_1$15 = __require("node:crypto");
	const buffer_utils_js_1 = require_buffer_utils();
	function cbcTag(aad, iv, ciphertext, macSize, macKey, keySize) {
		const macData = (0, buffer_utils_js_1.concat)(aad, iv, ciphertext, (0, buffer_utils_js_1.uint64be)(aad.length << 3));
		const hmac = (0, node_crypto_1$15.createHmac)(`sha${macSize}`, macKey);
		hmac.update(macData);
		return hmac.digest().slice(0, keySize >> 3);
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/webcrypto.js
var require_webcrypto = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isCryptoKey = void 0;
	const crypto$3 = __require("node:crypto");
	const util = __require("node:util");
	exports.default = crypto$3.webcrypto;
	const isCryptoKey = (key) => util.types.isCryptoKey(key);
	exports.isCryptoKey = isCryptoKey;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/crypto_key.js
var require_crypto_key = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.checkSigCryptoKey = checkSigCryptoKey;
	exports.checkEncCryptoKey = checkEncCryptoKey;
	function unusable(name, prop = "algorithm.name") {
		return /* @__PURE__ */ new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
	}
	function isAlgorithm(algorithm, name) {
		return algorithm.name === name;
	}
	function getHashLength(hash) {
		return parseInt(hash.name.slice(4), 10);
	}
	function getNamedCurve(alg) {
		switch (alg) {
			case "ES256": return "P-256";
			case "ES384": return "P-384";
			case "ES512": return "P-521";
			default: throw new Error("unreachable");
		}
	}
	function checkUsage(key, usages) {
		if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
			let msg = "CryptoKey does not support this operation, its usages must include ";
			if (usages.length > 2) {
				const last = usages.pop();
				msg += `one of ${usages.join(", ")}, or ${last}.`;
			} else if (usages.length === 2) msg += `one of ${usages[0]} or ${usages[1]}.`;
			else msg += `${usages[0]}.`;
			throw new TypeError(msg);
		}
	}
	function checkSigCryptoKey(key, alg, ...usages) {
		switch (alg) {
			case "HS256":
			case "HS384":
			case "HS512": {
				if (!isAlgorithm(key.algorithm, "HMAC")) throw unusable("HMAC");
				const expected = parseInt(alg.slice(2), 10);
				if (getHashLength(key.algorithm.hash) !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
				break;
			}
			case "RS256":
			case "RS384":
			case "RS512": {
				if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5")) throw unusable("RSASSA-PKCS1-v1_5");
				const expected = parseInt(alg.slice(2), 10);
				if (getHashLength(key.algorithm.hash) !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
				break;
			}
			case "PS256":
			case "PS384":
			case "PS512": {
				if (!isAlgorithm(key.algorithm, "RSA-PSS")) throw unusable("RSA-PSS");
				const expected = parseInt(alg.slice(2), 10);
				if (getHashLength(key.algorithm.hash) !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
				break;
			}
			case "EdDSA":
				if (key.algorithm.name !== "Ed25519" && key.algorithm.name !== "Ed448") throw unusable("Ed25519 or Ed448");
				break;
			case "Ed25519":
				if (!isAlgorithm(key.algorithm, "Ed25519")) throw unusable("Ed25519");
				break;
			case "ES256":
			case "ES384":
			case "ES512": {
				if (!isAlgorithm(key.algorithm, "ECDSA")) throw unusable("ECDSA");
				const expected = getNamedCurve(alg);
				if (key.algorithm.namedCurve !== expected) throw unusable(expected, "algorithm.namedCurve");
				break;
			}
			default: throw new TypeError("CryptoKey does not support this operation");
		}
		checkUsage(key, usages);
	}
	function checkEncCryptoKey(key, alg, ...usages) {
		switch (alg) {
			case "A128GCM":
			case "A192GCM":
			case "A256GCM": {
				if (!isAlgorithm(key.algorithm, "AES-GCM")) throw unusable("AES-GCM");
				const expected = parseInt(alg.slice(1, 4), 10);
				if (key.algorithm.length !== expected) throw unusable(expected, "algorithm.length");
				break;
			}
			case "A128KW":
			case "A192KW":
			case "A256KW": {
				if (!isAlgorithm(key.algorithm, "AES-KW")) throw unusable("AES-KW");
				const expected = parseInt(alg.slice(1, 4), 10);
				if (key.algorithm.length !== expected) throw unusable(expected, "algorithm.length");
				break;
			}
			case "ECDH":
				switch (key.algorithm.name) {
					case "ECDH":
					case "X25519":
					case "X448": break;
					default: throw unusable("ECDH, X25519, or X448");
				}
				break;
			case "PBES2-HS256+A128KW":
			case "PBES2-HS384+A192KW":
			case "PBES2-HS512+A256KW":
				if (!isAlgorithm(key.algorithm, "PBKDF2")) throw unusable("PBKDF2");
				break;
			case "RSA-OAEP":
			case "RSA-OAEP-256":
			case "RSA-OAEP-384":
			case "RSA-OAEP-512": {
				if (!isAlgorithm(key.algorithm, "RSA-OAEP")) throw unusable("RSA-OAEP");
				const expected = parseInt(alg.slice(9), 10) || 1;
				if (getHashLength(key.algorithm.hash) !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
				break;
			}
			default: throw new TypeError("CryptoKey does not support this operation");
		}
		checkUsage(key, usages);
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/invalid_key_input.js
var require_invalid_key_input = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.withAlg = withAlg;
	function message(msg, actual, ...types) {
		types = types.filter(Boolean);
		if (types.length > 2) {
			const last = types.pop();
			msg += `one of type ${types.join(", ")}, or ${last}.`;
		} else if (types.length === 2) msg += `one of type ${types[0]} or ${types[1]}.`;
		else msg += `of type ${types[0]}.`;
		if (actual == null) msg += ` Received ${actual}`;
		else if (typeof actual === "function" && actual.name) msg += ` Received function ${actual.name}`;
		else if (typeof actual === "object" && actual != null) {
			if (actual.constructor?.name) msg += ` Received an instance of ${actual.constructor.name}`;
		}
		return msg;
	}
	exports.default = (actual, ...types) => {
		return message("Key must be ", actual, ...types);
	};
	function withAlg(alg, actual, ...types) {
		return message(`Key for the ${alg} algorithm must be `, actual, ...types);
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/ciphers.js
var require_ciphers = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const node_crypto_1$14 = __require("node:crypto");
	let ciphers;
	exports.default = (algorithm) => {
		ciphers ||= new Set((0, node_crypto_1$14.getCiphers)());
		return ciphers.has(algorithm);
	};
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/is_key_like.js
var require_is_key_like = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.types = void 0;
	const webcrypto_js_1 = require_webcrypto();
	const is_key_object_js_1 = require_is_key_object();
	exports.default = (key) => (0, is_key_object_js_1.default)(key) || (0, webcrypto_js_1.isCryptoKey)(key);
	const types = ["KeyObject"];
	exports.types = types;
	if (globalThis.CryptoKey || webcrypto_js_1.default?.CryptoKey) types.push("CryptoKey");
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/decrypt.js
var require_decrypt$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const node_crypto_1$13 = __require("node:crypto");
	const check_iv_length_js_1 = require_check_iv_length();
	const check_cek_length_js_1 = require_check_cek_length();
	const buffer_utils_js_1 = require_buffer_utils();
	const errors_js_1 = require_errors();
	const timing_safe_equal_js_1 = require_timing_safe_equal();
	const cbc_tag_js_1 = require_cbc_tag();
	const webcrypto_js_1 = require_webcrypto();
	const crypto_key_js_1 = require_crypto_key();
	const is_key_object_js_1 = require_is_key_object();
	const invalid_key_input_js_1 = require_invalid_key_input();
	const ciphers_js_1 = require_ciphers();
	const is_key_like_js_1 = require_is_key_like();
	function cbcDecrypt(enc, cek, ciphertext, iv, tag, aad) {
		const keySize = parseInt(enc.slice(1, 4), 10);
		if ((0, is_key_object_js_1.default)(cek)) cek = cek.export();
		const encKey = cek.subarray(keySize >> 3);
		const macKey = cek.subarray(0, keySize >> 3);
		const macSize = parseInt(enc.slice(-3), 10);
		const algorithm = `aes-${keySize}-cbc`;
		if (!(0, ciphers_js_1.default)(algorithm)) throw new errors_js_1.JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
		const expectedTag = (0, cbc_tag_js_1.default)(aad, iv, ciphertext, macSize, macKey, keySize);
		let macCheckPassed;
		try {
			macCheckPassed = (0, timing_safe_equal_js_1.default)(tag, expectedTag);
		} catch {}
		if (!macCheckPassed) throw new errors_js_1.JWEDecryptionFailed();
		let plaintext;
		try {
			const decipher = (0, node_crypto_1$13.createDecipheriv)(algorithm, encKey, iv);
			plaintext = (0, buffer_utils_js_1.concat)(decipher.update(ciphertext), decipher.final());
		} catch {}
		if (!plaintext) throw new errors_js_1.JWEDecryptionFailed();
		return plaintext;
	}
	function gcmDecrypt(enc, cek, ciphertext, iv, tag, aad) {
		const algorithm = `aes-${parseInt(enc.slice(1, 4), 10)}-gcm`;
		if (!(0, ciphers_js_1.default)(algorithm)) throw new errors_js_1.JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
		try {
			const decipher = (0, node_crypto_1$13.createDecipheriv)(algorithm, cek, iv, { authTagLength: 16 });
			decipher.setAuthTag(tag);
			if (aad.byteLength) decipher.setAAD(aad, { plaintextLength: ciphertext.length });
			const plaintext = decipher.update(ciphertext);
			decipher.final();
			return plaintext;
		} catch {
			throw new errors_js_1.JWEDecryptionFailed();
		}
	}
	const decrypt = (enc, cek, ciphertext, iv, tag, aad) => {
		let key;
		if ((0, webcrypto_js_1.isCryptoKey)(cek)) {
			(0, crypto_key_js_1.checkEncCryptoKey)(cek, enc, "decrypt");
			key = node_crypto_1$13.KeyObject.from(cek);
		} else if (cek instanceof Uint8Array || (0, is_key_object_js_1.default)(cek)) key = cek;
		else throw new TypeError((0, invalid_key_input_js_1.default)(cek, ...is_key_like_js_1.types, "Uint8Array"));
		if (!iv) throw new errors_js_1.JWEInvalid("JWE Initialization Vector missing");
		if (!tag) throw new errors_js_1.JWEInvalid("JWE Authentication Tag missing");
		(0, check_cek_length_js_1.default)(enc, key);
		(0, check_iv_length_js_1.default)(enc, iv);
		switch (enc) {
			case "A128CBC-HS256":
			case "A192CBC-HS384":
			case "A256CBC-HS512": return cbcDecrypt(enc, key, ciphertext, iv, tag, aad);
			case "A128GCM":
			case "A192GCM":
			case "A256GCM": return gcmDecrypt(enc, key, ciphertext, iv, tag, aad);
			default: throw new errors_js_1.JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
		}
	};
	exports.default = decrypt;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/is_disjoint.js
var require_is_disjoint = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const isDisjoint = (...headers) => {
		const sources = headers.filter(Boolean);
		if (sources.length === 0 || sources.length === 1) return true;
		let acc;
		for (const header of sources) {
			const parameters = Object.keys(header);
			if (!acc || acc.size === 0) {
				acc = new Set(parameters);
				continue;
			}
			for (const parameter of parameters) {
				if (acc.has(parameter)) return false;
				acc.add(parameter);
			}
		}
		return true;
	};
	exports.default = isDisjoint;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/is_object.js
var require_is_object = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = isObject;
	function isObjectLike(value) {
		return typeof value === "object" && value !== null;
	}
	function isObject(input) {
		if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") return false;
		if (Object.getPrototypeOf(input) === null) return true;
		let proto = input;
		while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
		return Object.getPrototypeOf(input) === proto;
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/aeskw.js
var require_aeskw = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.unwrap = exports.wrap = void 0;
	const node_buffer_1$1 = __require("node:buffer");
	const node_crypto_1$12 = __require("node:crypto");
	const errors_js_1 = require_errors();
	const buffer_utils_js_1 = require_buffer_utils();
	const webcrypto_js_1 = require_webcrypto();
	const crypto_key_js_1 = require_crypto_key();
	const is_key_object_js_1 = require_is_key_object();
	const invalid_key_input_js_1 = require_invalid_key_input();
	const ciphers_js_1 = require_ciphers();
	const is_key_like_js_1 = require_is_key_like();
	function checkKeySize(key, alg) {
		if (key.symmetricKeySize << 3 !== parseInt(alg.slice(1, 4), 10)) throw new TypeError(`Invalid key size for alg: ${alg}`);
	}
	function ensureKeyObject(key, alg, usage) {
		if ((0, is_key_object_js_1.default)(key)) return key;
		if (key instanceof Uint8Array) return (0, node_crypto_1$12.createSecretKey)(key);
		if ((0, webcrypto_js_1.isCryptoKey)(key)) {
			(0, crypto_key_js_1.checkEncCryptoKey)(key, alg, usage);
			return node_crypto_1$12.KeyObject.from(key);
		}
		throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types, "Uint8Array"));
	}
	const wrap = (alg, key, cek) => {
		const algorithm = `aes${parseInt(alg.slice(1, 4), 10)}-wrap`;
		if (!(0, ciphers_js_1.default)(algorithm)) throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
		const keyObject = ensureKeyObject(key, alg, "wrapKey");
		checkKeySize(keyObject, alg);
		const cipher = (0, node_crypto_1$12.createCipheriv)(algorithm, keyObject, node_buffer_1$1.Buffer.alloc(8, 166));
		return (0, buffer_utils_js_1.concat)(cipher.update(cek), cipher.final());
	};
	exports.wrap = wrap;
	const unwrap = (alg, key, encryptedKey) => {
		const algorithm = `aes${parseInt(alg.slice(1, 4), 10)}-wrap`;
		if (!(0, ciphers_js_1.default)(algorithm)) throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
		const keyObject = ensureKeyObject(key, alg, "unwrapKey");
		checkKeySize(keyObject, alg);
		const cipher = (0, node_crypto_1$12.createDecipheriv)(algorithm, keyObject, node_buffer_1$1.Buffer.alloc(8, 166));
		return (0, buffer_utils_js_1.concat)(cipher.update(encryptedKey), cipher.final());
	};
	exports.unwrap = unwrap;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/is_jwk.js
var require_is_jwk = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isJWK = isJWK;
	exports.isPrivateJWK = isPrivateJWK;
	exports.isPublicJWK = isPublicJWK;
	exports.isSecretJWK = isSecretJWK;
	const is_object_js_1 = require_is_object();
	function isJWK(key) {
		return (0, is_object_js_1.default)(key) && typeof key.kty === "string";
	}
	function isPrivateJWK(key) {
		return key.kty !== "oct" && typeof key.d === "string";
	}
	function isPublicJWK(key) {
		return key.kty !== "oct" && typeof key.d === "undefined";
	}
	function isSecretJWK(key) {
		return isJWK(key) && key.kty === "oct" && typeof key.k === "string";
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/get_named_curve.js
var require_get_named_curve = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.weakMap = void 0;
	const node_crypto_1$11 = __require("node:crypto");
	const errors_js_1 = require_errors();
	const webcrypto_js_1 = require_webcrypto();
	const is_key_object_js_1 = require_is_key_object();
	const invalid_key_input_js_1 = require_invalid_key_input();
	const is_key_like_js_1 = require_is_key_like();
	const is_jwk_js_1 = require_is_jwk();
	exports.weakMap = /* @__PURE__ */ new WeakMap();
	const namedCurveToJOSE = (namedCurve) => {
		switch (namedCurve) {
			case "prime256v1": return "P-256";
			case "secp384r1": return "P-384";
			case "secp521r1": return "P-521";
			case "secp256k1": return "secp256k1";
			default: throw new errors_js_1.JOSENotSupported("Unsupported key curve for this operation");
		}
	};
	const getNamedCurve = (kee, raw) => {
		let key;
		if ((0, webcrypto_js_1.isCryptoKey)(kee)) key = node_crypto_1$11.KeyObject.from(kee);
		else if ((0, is_key_object_js_1.default)(kee)) key = kee;
		else if ((0, is_jwk_js_1.isJWK)(kee)) return kee.crv;
		else throw new TypeError((0, invalid_key_input_js_1.default)(kee, ...is_key_like_js_1.types));
		if (key.type === "secret") throw new TypeError("only \"private\" or \"public\" type keys can be used for this operation");
		switch (key.asymmetricKeyType) {
			case "ed25519":
			case "ed448": return `Ed${key.asymmetricKeyType.slice(2)}`;
			case "x25519":
			case "x448": return `X${key.asymmetricKeyType.slice(1)}`;
			case "ec": {
				const namedCurve = key.asymmetricKeyDetails.namedCurve;
				if (raw) return namedCurve;
				return namedCurveToJOSE(namedCurve);
			}
			default: throw new TypeError("Invalid asymmetric key type for this operation");
		}
	};
	exports.default = getNamedCurve;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/ecdhes.js
var require_ecdhes = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ecdhAllowed = void 0;
	exports.deriveKey = deriveKey;
	exports.generateEpk = generateEpk;
	const node_crypto_1$10 = __require("node:crypto");
	const node_util_1$5 = __require("node:util");
	const get_named_curve_js_1 = require_get_named_curve();
	const buffer_utils_js_1 = require_buffer_utils();
	const errors_js_1 = require_errors();
	const webcrypto_js_1 = require_webcrypto();
	const crypto_key_js_1 = require_crypto_key();
	const is_key_object_js_1 = require_is_key_object();
	const invalid_key_input_js_1 = require_invalid_key_input();
	const is_key_like_js_1 = require_is_key_like();
	const generateKeyPair = (0, node_util_1$5.promisify)(node_crypto_1$10.generateKeyPair);
	async function deriveKey(publicKee, privateKee, algorithm, keyLength, apu = /* @__PURE__ */ new Uint8Array(0), apv = /* @__PURE__ */ new Uint8Array(0)) {
		let publicKey;
		if ((0, webcrypto_js_1.isCryptoKey)(publicKee)) {
			(0, crypto_key_js_1.checkEncCryptoKey)(publicKee, "ECDH");
			publicKey = node_crypto_1$10.KeyObject.from(publicKee);
		} else if ((0, is_key_object_js_1.default)(publicKee)) publicKey = publicKee;
		else throw new TypeError((0, invalid_key_input_js_1.default)(publicKee, ...is_key_like_js_1.types));
		let privateKey;
		if ((0, webcrypto_js_1.isCryptoKey)(privateKee)) {
			(0, crypto_key_js_1.checkEncCryptoKey)(privateKee, "ECDH", "deriveBits");
			privateKey = node_crypto_1$10.KeyObject.from(privateKee);
		} else if ((0, is_key_object_js_1.default)(privateKee)) privateKey = privateKee;
		else throw new TypeError((0, invalid_key_input_js_1.default)(privateKee, ...is_key_like_js_1.types));
		const value = (0, buffer_utils_js_1.concat)((0, buffer_utils_js_1.lengthAndInput)(buffer_utils_js_1.encoder.encode(algorithm)), (0, buffer_utils_js_1.lengthAndInput)(apu), (0, buffer_utils_js_1.lengthAndInput)(apv), (0, buffer_utils_js_1.uint32be)(keyLength));
		const sharedSecret = (0, node_crypto_1$10.diffieHellman)({
			privateKey,
			publicKey
		});
		return (0, buffer_utils_js_1.concatKdf)(sharedSecret, keyLength, value);
	}
	async function generateEpk(kee) {
		let key;
		if ((0, webcrypto_js_1.isCryptoKey)(kee)) key = node_crypto_1$10.KeyObject.from(kee);
		else if ((0, is_key_object_js_1.default)(kee)) key = kee;
		else throw new TypeError((0, invalid_key_input_js_1.default)(kee, ...is_key_like_js_1.types));
		switch (key.asymmetricKeyType) {
			case "x25519": return generateKeyPair("x25519");
			case "x448": return generateKeyPair("x448");
			case "ec": return generateKeyPair("ec", { namedCurve: (0, get_named_curve_js_1.default)(key) });
			default: throw new errors_js_1.JOSENotSupported("Invalid or unsupported EPK");
		}
	}
	const ecdhAllowed = (key) => [
		"P-256",
		"P-384",
		"P-521",
		"X25519",
		"X448"
	].includes((0, get_named_curve_js_1.default)(key));
	exports.ecdhAllowed = ecdhAllowed;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/check_p2s.js
var require_check_p2s = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = checkP2s;
	const errors_js_1 = require_errors();
	function checkP2s(p2s) {
		if (!(p2s instanceof Uint8Array) || p2s.length < 8) throw new errors_js_1.JWEInvalid("PBES2 Salt Input must be 8 or more octets");
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/pbes2kw.js
var require_pbes2kw = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decrypt = exports.encrypt = void 0;
	const node_util_1$4 = __require("node:util");
	const node_crypto_1$9 = __require("node:crypto");
	const random_js_1 = require_random();
	const buffer_utils_js_1 = require_buffer_utils();
	const base64url_js_1 = require_base64url$1();
	const aeskw_js_1 = require_aeskw();
	const check_p2s_js_1 = require_check_p2s();
	const webcrypto_js_1 = require_webcrypto();
	const crypto_key_js_1 = require_crypto_key();
	const is_key_object_js_1 = require_is_key_object();
	const invalid_key_input_js_1 = require_invalid_key_input();
	const is_key_like_js_1 = require_is_key_like();
	const pbkdf2 = (0, node_util_1$4.promisify)(node_crypto_1$9.pbkdf2);
	function getPassword(key, alg) {
		if ((0, is_key_object_js_1.default)(key)) return key.export();
		if (key instanceof Uint8Array) return key;
		if ((0, webcrypto_js_1.isCryptoKey)(key)) {
			(0, crypto_key_js_1.checkEncCryptoKey)(key, alg, "deriveBits", "deriveKey");
			return node_crypto_1$9.KeyObject.from(key).export();
		}
		throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types, "Uint8Array"));
	}
	const encrypt = async (alg, key, cek, p2c = 2048, p2s = (0, random_js_1.default)(/* @__PURE__ */ new Uint8Array(16))) => {
		(0, check_p2s_js_1.default)(p2s);
		const salt = (0, buffer_utils_js_1.p2s)(alg, p2s);
		const keylen = parseInt(alg.slice(13, 16), 10) >> 3;
		const derivedKey = await pbkdf2(getPassword(key, alg), salt, p2c, keylen, `sha${alg.slice(8, 11)}`);
		return {
			encryptedKey: await (0, aeskw_js_1.wrap)(alg.slice(-6), derivedKey, cek),
			p2c,
			p2s: (0, base64url_js_1.encode)(p2s)
		};
	};
	exports.encrypt = encrypt;
	const decrypt = async (alg, key, encryptedKey, p2c, p2s) => {
		(0, check_p2s_js_1.default)(p2s);
		const salt = (0, buffer_utils_js_1.p2s)(alg, p2s);
		const keylen = parseInt(alg.slice(13, 16), 10) >> 3;
		const derivedKey = await pbkdf2(getPassword(key, alg), salt, p2c, keylen, `sha${alg.slice(8, 11)}`);
		return (0, aeskw_js_1.unwrap)(alg.slice(-6), derivedKey, encryptedKey);
	};
	exports.decrypt = decrypt;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/check_key_length.js
var require_check_key_length = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const node_crypto_1$8 = __require("node:crypto");
	exports.default = (key, alg) => {
		let modulusLength;
		try {
			if (key instanceof node_crypto_1$8.KeyObject) modulusLength = key.asymmetricKeyDetails?.modulusLength;
			else modulusLength = Buffer.from(key.n, "base64url").byteLength << 3;
		} catch {}
		if (typeof modulusLength !== "number" || modulusLength < 2048) throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
	};
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/rsaes.js
var require_rsaes = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decrypt = exports.encrypt = void 0;
	const node_crypto_1$7 = __require("node:crypto");
	const node_util_1$3 = __require("node:util");
	const check_key_length_js_1 = require_check_key_length();
	const webcrypto_js_1 = require_webcrypto();
	const crypto_key_js_1 = require_crypto_key();
	const is_key_object_js_1 = require_is_key_object();
	const invalid_key_input_js_1 = require_invalid_key_input();
	const is_key_like_js_1 = require_is_key_like();
	const checkKey = (key, alg) => {
		if (key.asymmetricKeyType !== "rsa") throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be rsa");
		(0, check_key_length_js_1.default)(key, alg);
	};
	const RSA1_5 = (0, node_util_1$3.deprecate)(() => node_crypto_1$7.constants.RSA_PKCS1_PADDING, "The RSA1_5 \"alg\" (JWE Algorithm) is deprecated and will be removed in the next major revision.");
	const resolvePadding = (alg) => {
		switch (alg) {
			case "RSA-OAEP":
			case "RSA-OAEP-256":
			case "RSA-OAEP-384":
			case "RSA-OAEP-512": return node_crypto_1$7.constants.RSA_PKCS1_OAEP_PADDING;
			case "RSA1_5": return RSA1_5();
			default: return;
		}
	};
	const resolveOaepHash = (alg) => {
		switch (alg) {
			case "RSA-OAEP": return "sha1";
			case "RSA-OAEP-256": return "sha256";
			case "RSA-OAEP-384": return "sha384";
			case "RSA-OAEP-512": return "sha512";
			default: return;
		}
	};
	function ensureKeyObject(key, alg, ...usages) {
		if ((0, is_key_object_js_1.default)(key)) return key;
		if ((0, webcrypto_js_1.isCryptoKey)(key)) {
			(0, crypto_key_js_1.checkEncCryptoKey)(key, alg, ...usages);
			return node_crypto_1$7.KeyObject.from(key);
		}
		throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types));
	}
	const encrypt = (alg, key, cek) => {
		const padding = resolvePadding(alg);
		const oaepHash = resolveOaepHash(alg);
		const keyObject = ensureKeyObject(key, alg, "wrapKey", "encrypt");
		checkKey(keyObject, alg);
		return (0, node_crypto_1$7.publicEncrypt)({
			key: keyObject,
			oaepHash,
			padding
		}, cek);
	};
	exports.encrypt = encrypt;
	const decrypt = (alg, key, encryptedKey) => {
		const padding = resolvePadding(alg);
		const oaepHash = resolveOaepHash(alg);
		const keyObject = ensureKeyObject(key, alg, "unwrapKey", "decrypt");
		checkKey(keyObject, alg);
		return (0, node_crypto_1$7.privateDecrypt)({
			key: keyObject,
			oaepHash,
			padding
		}, encryptedKey);
	};
	exports.decrypt = decrypt;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/normalize_key.js
var require_normalize_key = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {};
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/cek.js
var require_cek = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.bitLength = bitLength;
	const errors_js_1 = require_errors();
	const random_js_1 = require_random();
	function bitLength(alg) {
		switch (alg) {
			case "A128GCM": return 128;
			case "A192GCM": return 192;
			case "A256GCM":
			case "A128CBC-HS256": return 256;
			case "A192CBC-HS384": return 384;
			case "A256CBC-HS512": return 512;
			default: throw new errors_js_1.JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
		}
	}
	exports.default = (alg) => (0, random_js_1.default)(new Uint8Array(bitLength(alg) >> 3));
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/asn1.js
var require_asn1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.fromX509 = exports.fromSPKI = exports.fromPKCS8 = exports.toPKCS8 = exports.toSPKI = void 0;
	const node_crypto_1$6 = __require("node:crypto");
	const node_buffer_1 = __require("node:buffer");
	const webcrypto_js_1 = require_webcrypto();
	const is_key_object_js_1 = require_is_key_object();
	const invalid_key_input_js_1 = require_invalid_key_input();
	const is_key_like_js_1 = require_is_key_like();
	const genericExport = (keyType, keyFormat, key) => {
		let keyObject;
		if ((0, webcrypto_js_1.isCryptoKey)(key)) {
			if (!key.extractable) throw new TypeError("CryptoKey is not extractable");
			keyObject = node_crypto_1$6.KeyObject.from(key);
		} else if ((0, is_key_object_js_1.default)(key)) keyObject = key;
		else throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types));
		if (keyObject.type !== keyType) throw new TypeError(`key is not a ${keyType} key`);
		return keyObject.export({
			format: "pem",
			type: keyFormat
		});
	};
	const toSPKI = (key) => {
		return genericExport("public", "spki", key);
	};
	exports.toSPKI = toSPKI;
	const toPKCS8 = (key) => {
		return genericExport("private", "pkcs8", key);
	};
	exports.toPKCS8 = toPKCS8;
	const fromPKCS8 = (pem) => (0, node_crypto_1$6.createPrivateKey)({
		key: node_buffer_1.Buffer.from(pem.replace(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, ""), "base64"),
		type: "pkcs8",
		format: "der"
	});
	exports.fromPKCS8 = fromPKCS8;
	const fromSPKI = (pem) => (0, node_crypto_1$6.createPublicKey)({
		key: node_buffer_1.Buffer.from(pem.replace(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, ""), "base64"),
		type: "spki",
		format: "der"
	});
	exports.fromSPKI = fromSPKI;
	const fromX509 = (pem) => (0, node_crypto_1$6.createPublicKey)({
		key: pem,
		type: "spki",
		format: "pem"
	});
	exports.fromX509 = fromX509;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/jwk_to_key.js
var require_jwk_to_key = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const node_crypto_1$5 = __require("node:crypto");
	const parse = (key) => {
		if (key.d) return (0, node_crypto_1$5.createPrivateKey)({
			format: "jwk",
			key
		});
		return (0, node_crypto_1$5.createPublicKey)({
			format: "jwk",
			key
		});
	};
	exports.default = parse;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/key/import.js
var require_import = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.importSPKI = importSPKI;
	exports.importX509 = importX509;
	exports.importPKCS8 = importPKCS8;
	exports.importJWK = importJWK;
	const base64url_js_1 = require_base64url$1();
	const asn1_js_1 = require_asn1();
	const jwk_to_key_js_1 = require_jwk_to_key();
	const errors_js_1 = require_errors();
	const is_object_js_1 = require_is_object();
	async function importSPKI(spki, alg, options) {
		if (typeof spki !== "string" || spki.indexOf("-----BEGIN PUBLIC KEY-----") !== 0) throw new TypeError("\"spki\" must be SPKI formatted string");
		return (0, asn1_js_1.fromSPKI)(spki, alg, options);
	}
	async function importX509(x509, alg, options) {
		if (typeof x509 !== "string" || x509.indexOf("-----BEGIN CERTIFICATE-----") !== 0) throw new TypeError("\"x509\" must be X.509 formatted string");
		return (0, asn1_js_1.fromX509)(x509, alg, options);
	}
	async function importPKCS8(pkcs8, alg, options) {
		if (typeof pkcs8 !== "string" || pkcs8.indexOf("-----BEGIN PRIVATE KEY-----") !== 0) throw new TypeError("\"pkcs8\" must be PKCS#8 formatted string");
		return (0, asn1_js_1.fromPKCS8)(pkcs8, alg, options);
	}
	async function importJWK(jwk, alg) {
		if (!(0, is_object_js_1.default)(jwk)) throw new TypeError("JWK must be an object");
		alg ||= jwk.alg;
		switch (jwk.kty) {
			case "oct":
				if (typeof jwk.k !== "string" || !jwk.k) throw new TypeError("missing \"k\" (Key Value) Parameter value");
				return (0, base64url_js_1.decode)(jwk.k);
			case "RSA": if ("oth" in jwk && jwk.oth !== void 0) throw new errors_js_1.JOSENotSupported("RSA JWK \"oth\" (Other Primes Info) Parameter value is not supported");
			case "EC":
			case "OKP": return (0, jwk_to_key_js_1.default)({
				...jwk,
				alg
			});
			default: throw new errors_js_1.JOSENotSupported("Unsupported \"kty\" (Key Type) Parameter value");
		}
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/check_key_type.js
var require_check_key_type = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.checkKeyTypeWithJwk = void 0;
	const invalid_key_input_js_1 = require_invalid_key_input();
	const is_key_like_js_1 = require_is_key_like();
	const jwk = require_is_jwk();
	const tag = (key) => key?.[Symbol.toStringTag];
	const jwkMatchesOp = (alg, key, usage) => {
		if (key.use !== void 0 && key.use !== "sig") throw new TypeError("Invalid key for this operation, when present its use must be sig");
		if (key.key_ops !== void 0 && key.key_ops.includes?.(usage) !== true) throw new TypeError(`Invalid key for this operation, when present its key_ops must include ${usage}`);
		if (key.alg !== void 0 && key.alg !== alg) throw new TypeError(`Invalid key for this operation, when present its alg must be ${alg}`);
		return true;
	};
	const symmetricTypeCheck = (alg, key, usage, allowJwk) => {
		if (key instanceof Uint8Array) return;
		if (allowJwk && jwk.isJWK(key)) {
			if (jwk.isSecretJWK(key) && jwkMatchesOp(alg, key, usage)) return;
			throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
		}
		if (!(0, is_key_like_js_1.default)(key)) throw new TypeError((0, invalid_key_input_js_1.withAlg)(alg, key, ...is_key_like_js_1.types, "Uint8Array", allowJwk ? "JSON Web Key" : null));
		if (key.type !== "secret") throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
	};
	const asymmetricTypeCheck = (alg, key, usage, allowJwk) => {
		if (allowJwk && jwk.isJWK(key)) switch (usage) {
			case "sign":
				if (jwk.isPrivateJWK(key) && jwkMatchesOp(alg, key, usage)) return;
				throw new TypeError(`JSON Web Key for this operation be a private JWK`);
			case "verify":
				if (jwk.isPublicJWK(key) && jwkMatchesOp(alg, key, usage)) return;
				throw new TypeError(`JSON Web Key for this operation be a public JWK`);
		}
		if (!(0, is_key_like_js_1.default)(key)) throw new TypeError((0, invalid_key_input_js_1.withAlg)(alg, key, ...is_key_like_js_1.types, allowJwk ? "JSON Web Key" : null));
		if (key.type === "secret") throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
		if (usage === "sign" && key.type === "public") throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
		if (usage === "decrypt" && key.type === "public") throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
		if (key.algorithm && usage === "verify" && key.type === "private") throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
		if (key.algorithm && usage === "encrypt" && key.type === "private") throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
	};
	function checkKeyType(allowJwk, alg, key, usage) {
		if (alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(alg)) symmetricTypeCheck(alg, key, usage, allowJwk);
		else asymmetricTypeCheck(alg, key, usage, allowJwk);
	}
	exports.default = checkKeyType.bind(void 0, false);
	exports.checkKeyTypeWithJwk = checkKeyType.bind(void 0, true);
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/encrypt.js
var require_encrypt$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const node_crypto_1$4 = __require("node:crypto");
	const check_iv_length_js_1 = require_check_iv_length();
	const check_cek_length_js_1 = require_check_cek_length();
	const buffer_utils_js_1 = require_buffer_utils();
	const cbc_tag_js_1 = require_cbc_tag();
	const webcrypto_js_1 = require_webcrypto();
	const crypto_key_js_1 = require_crypto_key();
	const is_key_object_js_1 = require_is_key_object();
	const invalid_key_input_js_1 = require_invalid_key_input();
	const iv_js_1 = require_iv();
	const errors_js_1 = require_errors();
	const ciphers_js_1 = require_ciphers();
	const is_key_like_js_1 = require_is_key_like();
	function cbcEncrypt(enc, plaintext, cek, iv, aad) {
		const keySize = parseInt(enc.slice(1, 4), 10);
		if ((0, is_key_object_js_1.default)(cek)) cek = cek.export();
		const encKey = cek.subarray(keySize >> 3);
		const macKey = cek.subarray(0, keySize >> 3);
		const algorithm = `aes-${keySize}-cbc`;
		if (!(0, ciphers_js_1.default)(algorithm)) throw new errors_js_1.JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
		const cipher = (0, node_crypto_1$4.createCipheriv)(algorithm, encKey, iv);
		const ciphertext = (0, buffer_utils_js_1.concat)(cipher.update(plaintext), cipher.final());
		const macSize = parseInt(enc.slice(-3), 10);
		return {
			ciphertext,
			tag: (0, cbc_tag_js_1.default)(aad, iv, ciphertext, macSize, macKey, keySize),
			iv
		};
	}
	function gcmEncrypt(enc, plaintext, cek, iv, aad) {
		const algorithm = `aes-${parseInt(enc.slice(1, 4), 10)}-gcm`;
		if (!(0, ciphers_js_1.default)(algorithm)) throw new errors_js_1.JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
		const cipher = (0, node_crypto_1$4.createCipheriv)(algorithm, cek, iv, { authTagLength: 16 });
		if (aad.byteLength) cipher.setAAD(aad, { plaintextLength: plaintext.length });
		const ciphertext = cipher.update(plaintext);
		cipher.final();
		return {
			ciphertext,
			tag: cipher.getAuthTag(),
			iv
		};
	}
	const encrypt = (enc, plaintext, cek, iv, aad) => {
		let key;
		if ((0, webcrypto_js_1.isCryptoKey)(cek)) {
			(0, crypto_key_js_1.checkEncCryptoKey)(cek, enc, "encrypt");
			key = node_crypto_1$4.KeyObject.from(cek);
		} else if (cek instanceof Uint8Array || (0, is_key_object_js_1.default)(cek)) key = cek;
		else throw new TypeError((0, invalid_key_input_js_1.default)(cek, ...is_key_like_js_1.types, "Uint8Array"));
		(0, check_cek_length_js_1.default)(enc, key);
		if (iv) (0, check_iv_length_js_1.default)(enc, iv);
		else iv = (0, iv_js_1.default)(enc);
		switch (enc) {
			case "A128CBC-HS256":
			case "A192CBC-HS384":
			case "A256CBC-HS512": return cbcEncrypt(enc, plaintext, key, iv, aad);
			case "A128GCM":
			case "A192GCM":
			case "A256GCM": return gcmEncrypt(enc, plaintext, key, iv, aad);
			default: throw new errors_js_1.JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
		}
	};
	exports.default = encrypt;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/aesgcmkw.js
var require_aesgcmkw = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.wrap = wrap;
	exports.unwrap = unwrap;
	const encrypt_js_1 = require_encrypt$4();
	const decrypt_js_1 = require_decrypt$4();
	const base64url_js_1 = require_base64url$1();
	async function wrap(alg, key, cek, iv) {
		const jweAlgorithm = alg.slice(0, 7);
		const wrapped = await (0, encrypt_js_1.default)(jweAlgorithm, cek, key, iv, /* @__PURE__ */ new Uint8Array(0));
		return {
			encryptedKey: wrapped.ciphertext,
			iv: (0, base64url_js_1.encode)(wrapped.iv),
			tag: (0, base64url_js_1.encode)(wrapped.tag)
		};
	}
	async function unwrap(alg, key, encryptedKey, iv, tag) {
		const jweAlgorithm = alg.slice(0, 7);
		return (0, decrypt_js_1.default)(jweAlgorithm, key, encryptedKey, iv, tag, /* @__PURE__ */ new Uint8Array(0));
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/decrypt_key_management.js
var require_decrypt_key_management = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const aeskw_js_1 = require_aeskw();
	const ECDH = require_ecdhes();
	const pbes2kw_js_1 = require_pbes2kw();
	const rsaes_js_1 = require_rsaes();
	const base64url_js_1 = require_base64url$1();
	const normalize_key_js_1 = require_normalize_key();
	const errors_js_1 = require_errors();
	const cek_js_1 = require_cek();
	const import_js_1 = require_import();
	const check_key_type_js_1 = require_check_key_type();
	const is_object_js_1 = require_is_object();
	const aesgcmkw_js_1 = require_aesgcmkw();
	async function decryptKeyManagement(alg, key, encryptedKey, joseHeader, options) {
		(0, check_key_type_js_1.default)(alg, key, "decrypt");
		key = await normalize_key_js_1.default.normalizePrivateKey?.(key, alg) || key;
		switch (alg) {
			case "dir":
				if (encryptedKey !== void 0) throw new errors_js_1.JWEInvalid("Encountered unexpected JWE Encrypted Key");
				return key;
			case "ECDH-ES": if (encryptedKey !== void 0) throw new errors_js_1.JWEInvalid("Encountered unexpected JWE Encrypted Key");
			case "ECDH-ES+A128KW":
			case "ECDH-ES+A192KW":
			case "ECDH-ES+A256KW": {
				if (!(0, is_object_js_1.default)(joseHeader.epk)) throw new errors_js_1.JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
				if (!ECDH.ecdhAllowed(key)) throw new errors_js_1.JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
				const epk = await (0, import_js_1.importJWK)(joseHeader.epk, alg);
				let partyUInfo;
				let partyVInfo;
				if (joseHeader.apu !== void 0) {
					if (typeof joseHeader.apu !== "string") throw new errors_js_1.JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
					try {
						partyUInfo = (0, base64url_js_1.decode)(joseHeader.apu);
					} catch {
						throw new errors_js_1.JWEInvalid("Failed to base64url decode the apu");
					}
				}
				if (joseHeader.apv !== void 0) {
					if (typeof joseHeader.apv !== "string") throw new errors_js_1.JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
					try {
						partyVInfo = (0, base64url_js_1.decode)(joseHeader.apv);
					} catch {
						throw new errors_js_1.JWEInvalid("Failed to base64url decode the apv");
					}
				}
				const sharedSecret = await ECDH.deriveKey(epk, key, alg === "ECDH-ES" ? joseHeader.enc : alg, alg === "ECDH-ES" ? (0, cek_js_1.bitLength)(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
				if (alg === "ECDH-ES") return sharedSecret;
				if (encryptedKey === void 0) throw new errors_js_1.JWEInvalid("JWE Encrypted Key missing");
				return (0, aeskw_js_1.unwrap)(alg.slice(-6), sharedSecret, encryptedKey);
			}
			case "RSA1_5":
			case "RSA-OAEP":
			case "RSA-OAEP-256":
			case "RSA-OAEP-384":
			case "RSA-OAEP-512":
				if (encryptedKey === void 0) throw new errors_js_1.JWEInvalid("JWE Encrypted Key missing");
				return (0, rsaes_js_1.decrypt)(alg, key, encryptedKey);
			case "PBES2-HS256+A128KW":
			case "PBES2-HS384+A192KW":
			case "PBES2-HS512+A256KW": {
				if (encryptedKey === void 0) throw new errors_js_1.JWEInvalid("JWE Encrypted Key missing");
				if (typeof joseHeader.p2c !== "number") throw new errors_js_1.JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
				const p2cLimit = options?.maxPBES2Count || 1e4;
				if (joseHeader.p2c > p2cLimit) throw new errors_js_1.JWEInvalid(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
				if (typeof joseHeader.p2s !== "string") throw new errors_js_1.JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
				let p2s;
				try {
					p2s = (0, base64url_js_1.decode)(joseHeader.p2s);
				} catch {
					throw new errors_js_1.JWEInvalid("Failed to base64url decode the p2s");
				}
				return (0, pbes2kw_js_1.decrypt)(alg, key, encryptedKey, joseHeader.p2c, p2s);
			}
			case "A128KW":
			case "A192KW":
			case "A256KW":
				if (encryptedKey === void 0) throw new errors_js_1.JWEInvalid("JWE Encrypted Key missing");
				return (0, aeskw_js_1.unwrap)(alg, key, encryptedKey);
			case "A128GCMKW":
			case "A192GCMKW":
			case "A256GCMKW": {
				if (encryptedKey === void 0) throw new errors_js_1.JWEInvalid("JWE Encrypted Key missing");
				if (typeof joseHeader.iv !== "string") throw new errors_js_1.JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
				if (typeof joseHeader.tag !== "string") throw new errors_js_1.JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
				let iv;
				try {
					iv = (0, base64url_js_1.decode)(joseHeader.iv);
				} catch {
					throw new errors_js_1.JWEInvalid("Failed to base64url decode the iv");
				}
				let tag;
				try {
					tag = (0, base64url_js_1.decode)(joseHeader.tag);
				} catch {
					throw new errors_js_1.JWEInvalid("Failed to base64url decode the tag");
				}
				return (0, aesgcmkw_js_1.unwrap)(alg, key, encryptedKey, iv, tag);
			}
			default: throw new errors_js_1.JOSENotSupported("Invalid or unsupported \"alg\" (JWE Algorithm) header value");
		}
	}
	exports.default = decryptKeyManagement;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/validate_crit.js
var require_validate_crit = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const errors_js_1 = require_errors();
	function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
		if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) throw new Err("\"crit\" (Critical) Header Parameter MUST be integrity protected");
		if (!protectedHeader || protectedHeader.crit === void 0) return /* @__PURE__ */ new Set();
		if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) throw new Err("\"crit\" (Critical) Header Parameter MUST be an array of non-empty strings when present");
		let recognized;
		if (recognizedOption !== void 0) recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
		else recognized = recognizedDefault;
		for (const parameter of protectedHeader.crit) {
			if (!recognized.has(parameter)) throw new errors_js_1.JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
			if (joseHeader[parameter] === void 0) throw new Err(`Extension Header Parameter "${parameter}" is missing`);
			if (recognized.get(parameter) && protectedHeader[parameter] === void 0) throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
		}
		return new Set(protectedHeader.crit);
	}
	exports.default = validateCrit;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/validate_algorithms.js
var require_validate_algorithms = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const validateAlgorithms = (option, algorithms) => {
		if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) throw new TypeError(`"${option}" option must be an array of strings`);
		if (!algorithms) return;
		return new Set(algorithms);
	};
	exports.default = validateAlgorithms;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwe/flattened/decrypt.js
var require_decrypt$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.flattenedDecrypt = flattenedDecrypt;
	const base64url_js_1 = require_base64url$1();
	const decrypt_js_1 = require_decrypt$4();
	const errors_js_1 = require_errors();
	const is_disjoint_js_1 = require_is_disjoint();
	const is_object_js_1 = require_is_object();
	const decrypt_key_management_js_1 = require_decrypt_key_management();
	const buffer_utils_js_1 = require_buffer_utils();
	const cek_js_1 = require_cek();
	const validate_crit_js_1 = require_validate_crit();
	const validate_algorithms_js_1 = require_validate_algorithms();
	async function flattenedDecrypt(jwe, key, options) {
		if (!(0, is_object_js_1.default)(jwe)) throw new errors_js_1.JWEInvalid("Flattened JWE must be an object");
		if (jwe.protected === void 0 && jwe.header === void 0 && jwe.unprotected === void 0) throw new errors_js_1.JWEInvalid("JOSE Header missing");
		if (jwe.iv !== void 0 && typeof jwe.iv !== "string") throw new errors_js_1.JWEInvalid("JWE Initialization Vector incorrect type");
		if (typeof jwe.ciphertext !== "string") throw new errors_js_1.JWEInvalid("JWE Ciphertext missing or incorrect type");
		if (jwe.tag !== void 0 && typeof jwe.tag !== "string") throw new errors_js_1.JWEInvalid("JWE Authentication Tag incorrect type");
		if (jwe.protected !== void 0 && typeof jwe.protected !== "string") throw new errors_js_1.JWEInvalid("JWE Protected Header incorrect type");
		if (jwe.encrypted_key !== void 0 && typeof jwe.encrypted_key !== "string") throw new errors_js_1.JWEInvalid("JWE Encrypted Key incorrect type");
		if (jwe.aad !== void 0 && typeof jwe.aad !== "string") throw new errors_js_1.JWEInvalid("JWE AAD incorrect type");
		if (jwe.header !== void 0 && !(0, is_object_js_1.default)(jwe.header)) throw new errors_js_1.JWEInvalid("JWE Shared Unprotected Header incorrect type");
		if (jwe.unprotected !== void 0 && !(0, is_object_js_1.default)(jwe.unprotected)) throw new errors_js_1.JWEInvalid("JWE Per-Recipient Unprotected Header incorrect type");
		let parsedProt;
		if (jwe.protected) try {
			const protectedHeader = (0, base64url_js_1.decode)(jwe.protected);
			parsedProt = JSON.parse(buffer_utils_js_1.decoder.decode(protectedHeader));
		} catch {
			throw new errors_js_1.JWEInvalid("JWE Protected Header is invalid");
		}
		if (!(0, is_disjoint_js_1.default)(parsedProt, jwe.header, jwe.unprotected)) throw new errors_js_1.JWEInvalid("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
		const joseHeader = {
			...parsedProt,
			...jwe.header,
			...jwe.unprotected
		};
		(0, validate_crit_js_1.default)(errors_js_1.JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, parsedProt, joseHeader);
		if (joseHeader.zip !== void 0) throw new errors_js_1.JOSENotSupported("JWE \"zip\" (Compression Algorithm) Header Parameter is not supported.");
		const { alg, enc } = joseHeader;
		if (typeof alg !== "string" || !alg) throw new errors_js_1.JWEInvalid("missing JWE Algorithm (alg) in JWE Header");
		if (typeof enc !== "string" || !enc) throw new errors_js_1.JWEInvalid("missing JWE Encryption Algorithm (enc) in JWE Header");
		const keyManagementAlgorithms = options && (0, validate_algorithms_js_1.default)("keyManagementAlgorithms", options.keyManagementAlgorithms);
		const contentEncryptionAlgorithms = options && (0, validate_algorithms_js_1.default)("contentEncryptionAlgorithms", options.contentEncryptionAlgorithms);
		if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg) || !keyManagementAlgorithms && alg.startsWith("PBES2")) throw new errors_js_1.JOSEAlgNotAllowed("\"alg\" (Algorithm) Header Parameter value not allowed");
		if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) throw new errors_js_1.JOSEAlgNotAllowed("\"enc\" (Encryption Algorithm) Header Parameter value not allowed");
		let encryptedKey;
		if (jwe.encrypted_key !== void 0) try {
			encryptedKey = (0, base64url_js_1.decode)(jwe.encrypted_key);
		} catch {
			throw new errors_js_1.JWEInvalid("Failed to base64url decode the encrypted_key");
		}
		let resolvedKey = false;
		if (typeof key === "function") {
			key = await key(parsedProt, jwe);
			resolvedKey = true;
		}
		let cek;
		try {
			cek = await (0, decrypt_key_management_js_1.default)(alg, key, encryptedKey, joseHeader, options);
		} catch (err) {
			if (err instanceof TypeError || err instanceof errors_js_1.JWEInvalid || err instanceof errors_js_1.JOSENotSupported) throw err;
			cek = (0, cek_js_1.default)(enc);
		}
		let iv;
		let tag;
		if (jwe.iv !== void 0) try {
			iv = (0, base64url_js_1.decode)(jwe.iv);
		} catch {
			throw new errors_js_1.JWEInvalid("Failed to base64url decode the iv");
		}
		if (jwe.tag !== void 0) try {
			tag = (0, base64url_js_1.decode)(jwe.tag);
		} catch {
			throw new errors_js_1.JWEInvalid("Failed to base64url decode the tag");
		}
		const protectedHeader = buffer_utils_js_1.encoder.encode(jwe.protected ?? "");
		let additionalData;
		if (jwe.aad !== void 0) additionalData = (0, buffer_utils_js_1.concat)(protectedHeader, buffer_utils_js_1.encoder.encode("."), buffer_utils_js_1.encoder.encode(jwe.aad));
		else additionalData = protectedHeader;
		let ciphertext;
		try {
			ciphertext = (0, base64url_js_1.decode)(jwe.ciphertext);
		} catch {
			throw new errors_js_1.JWEInvalid("Failed to base64url decode the ciphertext");
		}
		const result = { plaintext: await (0, decrypt_js_1.default)(enc, cek, ciphertext, iv, tag, additionalData) };
		if (jwe.protected !== void 0) result.protectedHeader = parsedProt;
		if (jwe.aad !== void 0) try {
			result.additionalAuthenticatedData = (0, base64url_js_1.decode)(jwe.aad);
		} catch {
			throw new errors_js_1.JWEInvalid("Failed to base64url decode the aad");
		}
		if (jwe.unprotected !== void 0) result.sharedUnprotectedHeader = jwe.unprotected;
		if (jwe.header !== void 0) result.unprotectedHeader = jwe.header;
		if (resolvedKey) return {
			...result,
			key
		};
		return result;
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwe/compact/decrypt.js
var require_decrypt$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.compactDecrypt = compactDecrypt;
	const decrypt_js_1 = require_decrypt$3();
	const errors_js_1 = require_errors();
	const buffer_utils_js_1 = require_buffer_utils();
	async function compactDecrypt(jwe, key, options) {
		if (jwe instanceof Uint8Array) jwe = buffer_utils_js_1.decoder.decode(jwe);
		if (typeof jwe !== "string") throw new errors_js_1.JWEInvalid("Compact JWE must be a string or Uint8Array");
		const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag, length } = jwe.split(".");
		if (length !== 5) throw new errors_js_1.JWEInvalid("Invalid Compact JWE");
		const decrypted = await (0, decrypt_js_1.flattenedDecrypt)({
			ciphertext,
			iv: iv || void 0,
			protected: protectedHeader,
			tag: tag || void 0,
			encrypted_key: encryptedKey || void 0
		}, key, options);
		const result = {
			plaintext: decrypted.plaintext,
			protectedHeader: decrypted.protectedHeader
		};
		if (typeof key === "function") return {
			...result,
			key: decrypted.key
		};
		return result;
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwe/general/decrypt.js
var require_decrypt$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.generalDecrypt = generalDecrypt;
	const decrypt_js_1 = require_decrypt$3();
	const errors_js_1 = require_errors();
	const is_object_js_1 = require_is_object();
	async function generalDecrypt(jwe, key, options) {
		if (!(0, is_object_js_1.default)(jwe)) throw new errors_js_1.JWEInvalid("General JWE must be an object");
		if (!Array.isArray(jwe.recipients) || !jwe.recipients.every(is_object_js_1.default)) throw new errors_js_1.JWEInvalid("JWE Recipients missing or incorrect type");
		if (!jwe.recipients.length) throw new errors_js_1.JWEInvalid("JWE Recipients has no members");
		for (const recipient of jwe.recipients) try {
			return await (0, decrypt_js_1.flattenedDecrypt)({
				aad: jwe.aad,
				ciphertext: jwe.ciphertext,
				encrypted_key: recipient.encrypted_key,
				header: recipient.header,
				iv: jwe.iv,
				protected: jwe.protected,
				tag: jwe.tag,
				unprotected: jwe.unprotected
			}, key, options);
		} catch {}
		throw new errors_js_1.JWEDecryptionFailed();
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/private_symbols.js
var require_private_symbols = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.unprotected = void 0;
	exports.unprotected = Symbol();
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/key_to_jwk.js
var require_key_to_jwk = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const node_crypto_1$3 = __require("node:crypto");
	const base64url_js_1 = require_base64url$1();
	const errors_js_1 = require_errors();
	const webcrypto_js_1 = require_webcrypto();
	const is_key_object_js_1 = require_is_key_object();
	const invalid_key_input_js_1 = require_invalid_key_input();
	const is_key_like_js_1 = require_is_key_like();
	const keyToJWK = (key) => {
		let keyObject;
		if ((0, webcrypto_js_1.isCryptoKey)(key)) {
			if (!key.extractable) throw new TypeError("CryptoKey is not extractable");
			keyObject = node_crypto_1$3.KeyObject.from(key);
		} else if ((0, is_key_object_js_1.default)(key)) keyObject = key;
		else if (key instanceof Uint8Array) return {
			kty: "oct",
			k: (0, base64url_js_1.encode)(key)
		};
		else throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types, "Uint8Array"));
		if (keyObject.type !== "secret" && ![
			"rsa",
			"ec",
			"ed25519",
			"x25519",
			"ed448",
			"x448"
		].includes(keyObject.asymmetricKeyType)) throw new errors_js_1.JOSENotSupported("Unsupported key asymmetricKeyType");
		return keyObject.export({ format: "jwk" });
	};
	exports.default = keyToJWK;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/key/export.js
var require_export = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.exportSPKI = exportSPKI;
	exports.exportPKCS8 = exportPKCS8;
	exports.exportJWK = exportJWK;
	const asn1_js_1 = require_asn1();
	const asn1_js_2 = require_asn1();
	const key_to_jwk_js_1 = require_key_to_jwk();
	async function exportSPKI(key) {
		return (0, asn1_js_1.toSPKI)(key);
	}
	async function exportPKCS8(key) {
		return (0, asn1_js_2.toPKCS8)(key);
	}
	async function exportJWK(key) {
		return (0, key_to_jwk_js_1.default)(key);
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/encrypt_key_management.js
var require_encrypt_key_management = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const aeskw_js_1 = require_aeskw();
	const ECDH = require_ecdhes();
	const pbes2kw_js_1 = require_pbes2kw();
	const rsaes_js_1 = require_rsaes();
	const base64url_js_1 = require_base64url$1();
	const normalize_key_js_1 = require_normalize_key();
	const cek_js_1 = require_cek();
	const errors_js_1 = require_errors();
	const export_js_1 = require_export();
	const check_key_type_js_1 = require_check_key_type();
	const aesgcmkw_js_1 = require_aesgcmkw();
	async function encryptKeyManagement(alg, enc, key, providedCek, providedParameters = {}) {
		let encryptedKey;
		let parameters;
		let cek;
		(0, check_key_type_js_1.default)(alg, key, "encrypt");
		key = await normalize_key_js_1.default.normalizePublicKey?.(key, alg) || key;
		switch (alg) {
			case "dir":
				cek = key;
				break;
			case "ECDH-ES":
			case "ECDH-ES+A128KW":
			case "ECDH-ES+A192KW":
			case "ECDH-ES+A256KW": {
				if (!ECDH.ecdhAllowed(key)) throw new errors_js_1.JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
				const { apu, apv } = providedParameters;
				let { epk: ephemeralKey } = providedParameters;
				ephemeralKey ||= (await ECDH.generateEpk(key)).privateKey;
				const { x, y, crv, kty } = await (0, export_js_1.exportJWK)(ephemeralKey);
				const sharedSecret = await ECDH.deriveKey(key, ephemeralKey, alg === "ECDH-ES" ? enc : alg, alg === "ECDH-ES" ? (0, cek_js_1.bitLength)(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
				parameters = { epk: {
					x,
					crv,
					kty
				} };
				if (kty === "EC") parameters.epk.y = y;
				if (apu) parameters.apu = (0, base64url_js_1.encode)(apu);
				if (apv) parameters.apv = (0, base64url_js_1.encode)(apv);
				if (alg === "ECDH-ES") {
					cek = sharedSecret;
					break;
				}
				cek = providedCek || (0, cek_js_1.default)(enc);
				const kwAlg = alg.slice(-6);
				encryptedKey = await (0, aeskw_js_1.wrap)(kwAlg, sharedSecret, cek);
				break;
			}
			case "RSA1_5":
			case "RSA-OAEP":
			case "RSA-OAEP-256":
			case "RSA-OAEP-384":
			case "RSA-OAEP-512":
				cek = providedCek || (0, cek_js_1.default)(enc);
				encryptedKey = await (0, rsaes_js_1.encrypt)(alg, key, cek);
				break;
			case "PBES2-HS256+A128KW":
			case "PBES2-HS384+A192KW":
			case "PBES2-HS512+A256KW": {
				cek = providedCek || (0, cek_js_1.default)(enc);
				const { p2c, p2s } = providedParameters;
				({encryptedKey, ...parameters} = await (0, pbes2kw_js_1.encrypt)(alg, key, cek, p2c, p2s));
				break;
			}
			case "A128KW":
			case "A192KW":
			case "A256KW":
				cek = providedCek || (0, cek_js_1.default)(enc);
				encryptedKey = await (0, aeskw_js_1.wrap)(alg, key, cek);
				break;
			case "A128GCMKW":
			case "A192GCMKW":
			case "A256GCMKW": {
				cek = providedCek || (0, cek_js_1.default)(enc);
				const { iv } = providedParameters;
				({encryptedKey, ...parameters} = await (0, aesgcmkw_js_1.wrap)(alg, key, cek, iv));
				break;
			}
			default: throw new errors_js_1.JOSENotSupported("Invalid or unsupported \"alg\" (JWE Algorithm) header value");
		}
		return {
			cek,
			encryptedKey,
			parameters
		};
	}
	exports.default = encryptKeyManagement;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwe/flattened/encrypt.js
var require_encrypt$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.FlattenedEncrypt = void 0;
	const base64url_js_1 = require_base64url$1();
	const private_symbols_js_1 = require_private_symbols();
	const encrypt_js_1 = require_encrypt$4();
	const encrypt_key_management_js_1 = require_encrypt_key_management();
	const errors_js_1 = require_errors();
	const is_disjoint_js_1 = require_is_disjoint();
	const buffer_utils_js_1 = require_buffer_utils();
	const validate_crit_js_1 = require_validate_crit();
	var FlattenedEncrypt = class {
		_plaintext;
		_protectedHeader;
		_sharedUnprotectedHeader;
		_unprotectedHeader;
		_aad;
		_cek;
		_iv;
		_keyManagementParameters;
		constructor(plaintext) {
			if (!(plaintext instanceof Uint8Array)) throw new TypeError("plaintext must be an instance of Uint8Array");
			this._plaintext = plaintext;
		}
		setKeyManagementParameters(parameters) {
			if (this._keyManagementParameters) throw new TypeError("setKeyManagementParameters can only be called once");
			this._keyManagementParameters = parameters;
			return this;
		}
		setProtectedHeader(protectedHeader) {
			if (this._protectedHeader) throw new TypeError("setProtectedHeader can only be called once");
			this._protectedHeader = protectedHeader;
			return this;
		}
		setSharedUnprotectedHeader(sharedUnprotectedHeader) {
			if (this._sharedUnprotectedHeader) throw new TypeError("setSharedUnprotectedHeader can only be called once");
			this._sharedUnprotectedHeader = sharedUnprotectedHeader;
			return this;
		}
		setUnprotectedHeader(unprotectedHeader) {
			if (this._unprotectedHeader) throw new TypeError("setUnprotectedHeader can only be called once");
			this._unprotectedHeader = unprotectedHeader;
			return this;
		}
		setAdditionalAuthenticatedData(aad) {
			this._aad = aad;
			return this;
		}
		setContentEncryptionKey(cek) {
			if (this._cek) throw new TypeError("setContentEncryptionKey can only be called once");
			this._cek = cek;
			return this;
		}
		setInitializationVector(iv) {
			if (this._iv) throw new TypeError("setInitializationVector can only be called once");
			this._iv = iv;
			return this;
		}
		async encrypt(key, options) {
			if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) throw new errors_js_1.JWEInvalid("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
			if (!(0, is_disjoint_js_1.default)(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) throw new errors_js_1.JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
			const joseHeader = {
				...this._protectedHeader,
				...this._unprotectedHeader,
				...this._sharedUnprotectedHeader
			};
			(0, validate_crit_js_1.default)(errors_js_1.JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, this._protectedHeader, joseHeader);
			if (joseHeader.zip !== void 0) throw new errors_js_1.JOSENotSupported("JWE \"zip\" (Compression Algorithm) Header Parameter is not supported.");
			const { alg, enc } = joseHeader;
			if (typeof alg !== "string" || !alg) throw new errors_js_1.JWEInvalid("JWE \"alg\" (Algorithm) Header Parameter missing or invalid");
			if (typeof enc !== "string" || !enc) throw new errors_js_1.JWEInvalid("JWE \"enc\" (Encryption Algorithm) Header Parameter missing or invalid");
			let encryptedKey;
			if (this._cek && (alg === "dir" || alg === "ECDH-ES")) throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${alg}`);
			let cek;
			{
				let parameters;
				({cek, encryptedKey, parameters} = await (0, encrypt_key_management_js_1.default)(alg, enc, key, this._cek, this._keyManagementParameters));
				if (parameters) if (options && private_symbols_js_1.unprotected in options) if (!this._unprotectedHeader) this.setUnprotectedHeader(parameters);
				else this._unprotectedHeader = {
					...this._unprotectedHeader,
					...parameters
				};
				else if (!this._protectedHeader) this.setProtectedHeader(parameters);
				else this._protectedHeader = {
					...this._protectedHeader,
					...parameters
				};
			}
			let additionalData;
			let protectedHeader;
			let aadMember;
			if (this._protectedHeader) protectedHeader = buffer_utils_js_1.encoder.encode((0, base64url_js_1.encode)(JSON.stringify(this._protectedHeader)));
			else protectedHeader = buffer_utils_js_1.encoder.encode("");
			if (this._aad) {
				aadMember = (0, base64url_js_1.encode)(this._aad);
				additionalData = (0, buffer_utils_js_1.concat)(protectedHeader, buffer_utils_js_1.encoder.encode("."), buffer_utils_js_1.encoder.encode(aadMember));
			} else additionalData = protectedHeader;
			const { ciphertext, tag, iv } = await (0, encrypt_js_1.default)(enc, this._plaintext, cek, this._iv, additionalData);
			const jwe = { ciphertext: (0, base64url_js_1.encode)(ciphertext) };
			if (iv) jwe.iv = (0, base64url_js_1.encode)(iv);
			if (tag) jwe.tag = (0, base64url_js_1.encode)(tag);
			if (encryptedKey) jwe.encrypted_key = (0, base64url_js_1.encode)(encryptedKey);
			if (aadMember) jwe.aad = aadMember;
			if (this._protectedHeader) jwe.protected = buffer_utils_js_1.decoder.decode(protectedHeader);
			if (this._sharedUnprotectedHeader) jwe.unprotected = this._sharedUnprotectedHeader;
			if (this._unprotectedHeader) jwe.header = this._unprotectedHeader;
			return jwe;
		}
	};
	exports.FlattenedEncrypt = FlattenedEncrypt;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwe/general/encrypt.js
var require_encrypt$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.GeneralEncrypt = void 0;
	const encrypt_js_1 = require_encrypt$3();
	const private_symbols_js_1 = require_private_symbols();
	const errors_js_1 = require_errors();
	const cek_js_1 = require_cek();
	const is_disjoint_js_1 = require_is_disjoint();
	const encrypt_key_management_js_1 = require_encrypt_key_management();
	const base64url_js_1 = require_base64url$1();
	const validate_crit_js_1 = require_validate_crit();
	var IndividualRecipient = class {
		parent;
		unprotectedHeader;
		key;
		options;
		constructor(enc, key, options) {
			this.parent = enc;
			this.key = key;
			this.options = options;
		}
		setUnprotectedHeader(unprotectedHeader) {
			if (this.unprotectedHeader) throw new TypeError("setUnprotectedHeader can only be called once");
			this.unprotectedHeader = unprotectedHeader;
			return this;
		}
		addRecipient(...args) {
			return this.parent.addRecipient(...args);
		}
		encrypt(...args) {
			return this.parent.encrypt(...args);
		}
		done() {
			return this.parent;
		}
	};
	var GeneralEncrypt = class {
		_plaintext;
		_recipients = [];
		_protectedHeader;
		_unprotectedHeader;
		_aad;
		constructor(plaintext) {
			this._plaintext = plaintext;
		}
		addRecipient(key, options) {
			const recipient = new IndividualRecipient(this, key, { crit: options?.crit });
			this._recipients.push(recipient);
			return recipient;
		}
		setProtectedHeader(protectedHeader) {
			if (this._protectedHeader) throw new TypeError("setProtectedHeader can only be called once");
			this._protectedHeader = protectedHeader;
			return this;
		}
		setSharedUnprotectedHeader(sharedUnprotectedHeader) {
			if (this._unprotectedHeader) throw new TypeError("setSharedUnprotectedHeader can only be called once");
			this._unprotectedHeader = sharedUnprotectedHeader;
			return this;
		}
		setAdditionalAuthenticatedData(aad) {
			this._aad = aad;
			return this;
		}
		async encrypt() {
			if (!this._recipients.length) throw new errors_js_1.JWEInvalid("at least one recipient must be added");
			if (this._recipients.length === 1) {
				const [recipient] = this._recipients;
				const flattened = await new encrypt_js_1.FlattenedEncrypt(this._plaintext).setAdditionalAuthenticatedData(this._aad).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).encrypt(recipient.key, { ...recipient.options });
				const jwe = {
					ciphertext: flattened.ciphertext,
					iv: flattened.iv,
					recipients: [{}],
					tag: flattened.tag
				};
				if (flattened.aad) jwe.aad = flattened.aad;
				if (flattened.protected) jwe.protected = flattened.protected;
				if (flattened.unprotected) jwe.unprotected = flattened.unprotected;
				if (flattened.encrypted_key) jwe.recipients[0].encrypted_key = flattened.encrypted_key;
				if (flattened.header) jwe.recipients[0].header = flattened.header;
				return jwe;
			}
			let enc;
			for (let i = 0; i < this._recipients.length; i++) {
				const recipient = this._recipients[i];
				if (!(0, is_disjoint_js_1.default)(this._protectedHeader, this._unprotectedHeader, recipient.unprotectedHeader)) throw new errors_js_1.JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
				const joseHeader = {
					...this._protectedHeader,
					...this._unprotectedHeader,
					...recipient.unprotectedHeader
				};
				const { alg } = joseHeader;
				if (typeof alg !== "string" || !alg) throw new errors_js_1.JWEInvalid("JWE \"alg\" (Algorithm) Header Parameter missing or invalid");
				if (alg === "dir" || alg === "ECDH-ES") throw new errors_js_1.JWEInvalid("\"dir\" and \"ECDH-ES\" alg may only be used with a single recipient");
				if (typeof joseHeader.enc !== "string" || !joseHeader.enc) throw new errors_js_1.JWEInvalid("JWE \"enc\" (Encryption Algorithm) Header Parameter missing or invalid");
				if (!enc) enc = joseHeader.enc;
				else if (enc !== joseHeader.enc) throw new errors_js_1.JWEInvalid("JWE \"enc\" (Encryption Algorithm) Header Parameter must be the same for all recipients");
				(0, validate_crit_js_1.default)(errors_js_1.JWEInvalid, /* @__PURE__ */ new Map(), recipient.options.crit, this._protectedHeader, joseHeader);
				if (joseHeader.zip !== void 0) throw new errors_js_1.JOSENotSupported("JWE \"zip\" (Compression Algorithm) Header Parameter is not supported.");
			}
			const cek = (0, cek_js_1.default)(enc);
			const jwe = {
				ciphertext: "",
				iv: "",
				recipients: [],
				tag: ""
			};
			for (let i = 0; i < this._recipients.length; i++) {
				const recipient = this._recipients[i];
				const target = {};
				jwe.recipients.push(target);
				const p2c = {
					...this._protectedHeader,
					...this._unprotectedHeader,
					...recipient.unprotectedHeader
				}.alg.startsWith("PBES2") ? 2048 + i : void 0;
				if (i === 0) {
					const flattened = await new encrypt_js_1.FlattenedEncrypt(this._plaintext).setAdditionalAuthenticatedData(this._aad).setContentEncryptionKey(cek).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).setKeyManagementParameters({ p2c }).encrypt(recipient.key, {
						...recipient.options,
						[private_symbols_js_1.unprotected]: true
					});
					jwe.ciphertext = flattened.ciphertext;
					jwe.iv = flattened.iv;
					jwe.tag = flattened.tag;
					if (flattened.aad) jwe.aad = flattened.aad;
					if (flattened.protected) jwe.protected = flattened.protected;
					if (flattened.unprotected) jwe.unprotected = flattened.unprotected;
					target.encrypted_key = flattened.encrypted_key;
					if (flattened.header) target.header = flattened.header;
					continue;
				}
				const { encryptedKey, parameters } = await (0, encrypt_key_management_js_1.default)(recipient.unprotectedHeader?.alg || this._protectedHeader?.alg || this._unprotectedHeader?.alg, enc, recipient.key, cek, { p2c });
				target.encrypted_key = (0, base64url_js_1.encode)(encryptedKey);
				if (recipient.unprotectedHeader || parameters) target.header = {
					...recipient.unprotectedHeader,
					...parameters
				};
			}
			return jwe;
		}
	};
	exports.GeneralEncrypt = GeneralEncrypt;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/dsa_digest.js
var require_dsa_digest = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = dsaDigest;
	const errors_js_1 = require_errors();
	function dsaDigest(alg) {
		switch (alg) {
			case "PS256":
			case "RS256":
			case "ES256":
			case "ES256K": return "sha256";
			case "PS384":
			case "RS384":
			case "ES384": return "sha384";
			case "PS512":
			case "RS512":
			case "ES512": return "sha512";
			case "Ed25519":
			case "EdDSA": return;
			default: throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
		}
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/node_key.js
var require_node_key = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = keyForCrypto;
	const node_crypto_1$2 = __require("node:crypto");
	const get_named_curve_js_1 = require_get_named_curve();
	const errors_js_1 = require_errors();
	const check_key_length_js_1 = require_check_key_length();
	const ecCurveAlgMap = /* @__PURE__ */ new Map([
		["ES256", "P-256"],
		["ES256K", "secp256k1"],
		["ES384", "P-384"],
		["ES512", "P-521"]
	]);
	function keyForCrypto(alg, key) {
		let asymmetricKeyType;
		let asymmetricKeyDetails;
		let isJWK;
		if (key instanceof node_crypto_1$2.KeyObject) {
			asymmetricKeyType = key.asymmetricKeyType;
			asymmetricKeyDetails = key.asymmetricKeyDetails;
		} else {
			isJWK = true;
			switch (key.kty) {
				case "RSA":
					asymmetricKeyType = "rsa";
					break;
				case "EC":
					asymmetricKeyType = "ec";
					break;
				case "OKP":
					if (key.crv === "Ed25519") {
						asymmetricKeyType = "ed25519";
						break;
					}
					if (key.crv === "Ed448") {
						asymmetricKeyType = "ed448";
						break;
					}
					throw new TypeError("Invalid key for this operation, its crv must be Ed25519 or Ed448");
				default: throw new TypeError("Invalid key for this operation, its kty must be RSA, OKP, or EC");
			}
		}
		let options;
		switch (alg) {
			case "Ed25519":
				if (asymmetricKeyType !== "ed25519") throw new TypeError(`Invalid key for this operation, its asymmetricKeyType must be ed25519`);
				break;
			case "EdDSA":
				if (!["ed25519", "ed448"].includes(asymmetricKeyType)) throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be ed25519 or ed448");
				break;
			case "RS256":
			case "RS384":
			case "RS512":
				if (asymmetricKeyType !== "rsa") throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be rsa");
				(0, check_key_length_js_1.default)(key, alg);
				break;
			case "PS256":
			case "PS384":
			case "PS512":
				if (asymmetricKeyType === "rsa-pss") {
					const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = asymmetricKeyDetails;
					const length = parseInt(alg.slice(-3), 10);
					if (hashAlgorithm !== void 0 && (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm)) throw new TypeError(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${alg}`);
					if (saltLength !== void 0 && saltLength > length >> 3) throw new TypeError(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${alg}`);
				} else if (asymmetricKeyType !== "rsa") throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be rsa or rsa-pss");
				(0, check_key_length_js_1.default)(key, alg);
				options = {
					padding: node_crypto_1$2.constants.RSA_PKCS1_PSS_PADDING,
					saltLength: node_crypto_1$2.constants.RSA_PSS_SALTLEN_DIGEST
				};
				break;
			case "ES256":
			case "ES256K":
			case "ES384":
			case "ES512": {
				if (asymmetricKeyType !== "ec") throw new TypeError("Invalid key for this operation, its asymmetricKeyType must be ec");
				const actual = (0, get_named_curve_js_1.default)(key);
				const expected = ecCurveAlgMap.get(alg);
				if (actual !== expected) throw new TypeError(`Invalid key curve for the algorithm, its curve must be ${expected}, got ${actual}`);
				options = { dsaEncoding: "ieee-p1363" };
				break;
			}
			default: throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
		}
		if (isJWK) return {
			format: "jwk",
			key,
			...options
		};
		return options ? {
			...options,
			key
		} : key;
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/hmac_digest.js
var require_hmac_digest = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = hmacDigest;
	const errors_js_1 = require_errors();
	function hmacDigest(alg) {
		switch (alg) {
			case "HS256": return "sha256";
			case "HS384": return "sha384";
			case "HS512": return "sha512";
			default: throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
		}
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/get_sign_verify_key.js
var require_get_sign_verify_key = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = getSignVerifyKey;
	const node_crypto_1$1 = __require("node:crypto");
	const webcrypto_js_1 = require_webcrypto();
	const crypto_key_js_1 = require_crypto_key();
	const invalid_key_input_js_1 = require_invalid_key_input();
	const is_key_like_js_1 = require_is_key_like();
	const jwk = require_is_jwk();
	function getSignVerifyKey(alg, key, usage) {
		if (key instanceof Uint8Array) {
			if (!alg.startsWith("HS")) throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types));
			return (0, node_crypto_1$1.createSecretKey)(key);
		}
		if (key instanceof node_crypto_1$1.KeyObject) return key;
		if ((0, webcrypto_js_1.isCryptoKey)(key)) {
			(0, crypto_key_js_1.checkSigCryptoKey)(key, alg, usage);
			return node_crypto_1$1.KeyObject.from(key);
		}
		if (jwk.isJWK(key)) {
			if (alg.startsWith("HS")) return (0, node_crypto_1$1.createSecretKey)(Buffer.from(key.k, "base64url"));
			return key;
		}
		throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types, "Uint8Array", "JSON Web Key"));
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/sign.js
var require_sign$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const crypto$2 = __require("node:crypto");
	const node_util_1$2 = __require("node:util");
	const dsa_digest_js_1 = require_dsa_digest();
	const hmac_digest_js_1 = require_hmac_digest();
	const node_key_js_1 = require_node_key();
	const get_sign_verify_key_js_1 = require_get_sign_verify_key();
	const oneShotSign = (0, node_util_1$2.promisify)(crypto$2.sign);
	const sign = async (alg, key, data) => {
		const k = (0, get_sign_verify_key_js_1.default)(alg, key, "sign");
		if (alg.startsWith("HS")) {
			const hmac = crypto$2.createHmac((0, hmac_digest_js_1.default)(alg), k);
			hmac.update(data);
			return hmac.digest();
		}
		return oneShotSign((0, dsa_digest_js_1.default)(alg), data, (0, node_key_js_1.default)(alg, k));
	};
	exports.default = sign;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/verify.js
var require_verify$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const crypto$1 = __require("node:crypto");
	const node_util_1$1 = __require("node:util");
	const dsa_digest_js_1 = require_dsa_digest();
	const node_key_js_1 = require_node_key();
	const sign_js_1 = require_sign$4();
	const get_sign_verify_key_js_1 = require_get_sign_verify_key();
	const oneShotVerify = (0, node_util_1$1.promisify)(crypto$1.verify);
	const verify = async (alg, key, signature, data) => {
		const k = (0, get_sign_verify_key_js_1.default)(alg, key, "verify");
		if (alg.startsWith("HS")) {
			const expected = await (0, sign_js_1.default)(alg, k, data);
			const actual = signature;
			try {
				return crypto$1.timingSafeEqual(actual, expected);
			} catch {
				return false;
			}
		}
		const algorithm = (0, dsa_digest_js_1.default)(alg);
		const keyInput = (0, node_key_js_1.default)(alg, k);
		try {
			return await oneShotVerify(algorithm, data, keyInput, signature);
		} catch {
			return false;
		}
	};
	exports.default = verify;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jws/flattened/verify.js
var require_verify$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.flattenedVerify = flattenedVerify;
	const base64url_js_1 = require_base64url$1();
	const verify_js_1 = require_verify$4();
	const errors_js_1 = require_errors();
	const buffer_utils_js_1 = require_buffer_utils();
	const is_disjoint_js_1 = require_is_disjoint();
	const is_object_js_1 = require_is_object();
	const check_key_type_js_1 = require_check_key_type();
	const validate_crit_js_1 = require_validate_crit();
	const validate_algorithms_js_1 = require_validate_algorithms();
	const is_jwk_js_1 = require_is_jwk();
	const import_js_1 = require_import();
	async function flattenedVerify(jws, key, options) {
		if (!(0, is_object_js_1.default)(jws)) throw new errors_js_1.JWSInvalid("Flattened JWS must be an object");
		if (jws.protected === void 0 && jws.header === void 0) throw new errors_js_1.JWSInvalid("Flattened JWS must have either of the \"protected\" or \"header\" members");
		if (jws.protected !== void 0 && typeof jws.protected !== "string") throw new errors_js_1.JWSInvalid("JWS Protected Header incorrect type");
		if (jws.payload === void 0) throw new errors_js_1.JWSInvalid("JWS Payload missing");
		if (typeof jws.signature !== "string") throw new errors_js_1.JWSInvalid("JWS Signature missing or incorrect type");
		if (jws.header !== void 0 && !(0, is_object_js_1.default)(jws.header)) throw new errors_js_1.JWSInvalid("JWS Unprotected Header incorrect type");
		let parsedProt = {};
		if (jws.protected) try {
			const protectedHeader = (0, base64url_js_1.decode)(jws.protected);
			parsedProt = JSON.parse(buffer_utils_js_1.decoder.decode(protectedHeader));
		} catch {
			throw new errors_js_1.JWSInvalid("JWS Protected Header is invalid");
		}
		if (!(0, is_disjoint_js_1.default)(parsedProt, jws.header)) throw new errors_js_1.JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
		const joseHeader = {
			...parsedProt,
			...jws.header
		};
		const extensions = (0, validate_crit_js_1.default)(errors_js_1.JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
		let b64 = true;
		if (extensions.has("b64")) {
			b64 = parsedProt.b64;
			if (typeof b64 !== "boolean") throw new errors_js_1.JWSInvalid("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
		}
		const { alg } = joseHeader;
		if (typeof alg !== "string" || !alg) throw new errors_js_1.JWSInvalid("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
		const algorithms = options && (0, validate_algorithms_js_1.default)("algorithms", options.algorithms);
		if (algorithms && !algorithms.has(alg)) throw new errors_js_1.JOSEAlgNotAllowed("\"alg\" (Algorithm) Header Parameter value not allowed");
		if (b64) {
			if (typeof jws.payload !== "string") throw new errors_js_1.JWSInvalid("JWS Payload must be a string");
		} else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) throw new errors_js_1.JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
		let resolvedKey = false;
		if (typeof key === "function") {
			key = await key(parsedProt, jws);
			resolvedKey = true;
			(0, check_key_type_js_1.checkKeyTypeWithJwk)(alg, key, "verify");
			if ((0, is_jwk_js_1.isJWK)(key)) key = await (0, import_js_1.importJWK)(key, alg);
		} else (0, check_key_type_js_1.checkKeyTypeWithJwk)(alg, key, "verify");
		const data = (0, buffer_utils_js_1.concat)(buffer_utils_js_1.encoder.encode(jws.protected ?? ""), buffer_utils_js_1.encoder.encode("."), typeof jws.payload === "string" ? buffer_utils_js_1.encoder.encode(jws.payload) : jws.payload);
		let signature;
		try {
			signature = (0, base64url_js_1.decode)(jws.signature);
		} catch {
			throw new errors_js_1.JWSInvalid("Failed to base64url decode the signature");
		}
		if (!await (0, verify_js_1.default)(alg, key, signature, data)) throw new errors_js_1.JWSSignatureVerificationFailed();
		let payload;
		if (b64) try {
			payload = (0, base64url_js_1.decode)(jws.payload);
		} catch {
			throw new errors_js_1.JWSInvalid("Failed to base64url decode the payload");
		}
		else if (typeof jws.payload === "string") payload = buffer_utils_js_1.encoder.encode(jws.payload);
		else payload = jws.payload;
		const result = { payload };
		if (jws.protected !== void 0) result.protectedHeader = parsedProt;
		if (jws.header !== void 0) result.unprotectedHeader = jws.header;
		if (resolvedKey) return {
			...result,
			key
		};
		return result;
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jws/compact/verify.js
var require_verify$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.compactVerify = compactVerify;
	const verify_js_1 = require_verify$3();
	const errors_js_1 = require_errors();
	const buffer_utils_js_1 = require_buffer_utils();
	async function compactVerify(jws, key, options) {
		if (jws instanceof Uint8Array) jws = buffer_utils_js_1.decoder.decode(jws);
		if (typeof jws !== "string") throw new errors_js_1.JWSInvalid("Compact JWS must be a string or Uint8Array");
		const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
		if (length !== 3) throw new errors_js_1.JWSInvalid("Invalid Compact JWS");
		const verified = await (0, verify_js_1.flattenedVerify)({
			payload,
			protected: protectedHeader,
			signature
		}, key, options);
		const result = {
			payload: verified.payload,
			protectedHeader: verified.protectedHeader
		};
		if (typeof key === "function") return {
			...result,
			key: verified.key
		};
		return result;
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jws/general/verify.js
var require_verify$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.generalVerify = generalVerify;
	const verify_js_1 = require_verify$3();
	const errors_js_1 = require_errors();
	const is_object_js_1 = require_is_object();
	async function generalVerify(jws, key, options) {
		if (!(0, is_object_js_1.default)(jws)) throw new errors_js_1.JWSInvalid("General JWS must be an object");
		if (!Array.isArray(jws.signatures) || !jws.signatures.every(is_object_js_1.default)) throw new errors_js_1.JWSInvalid("JWS Signatures missing or incorrect type");
		for (const signature of jws.signatures) try {
			return await (0, verify_js_1.flattenedVerify)({
				header: signature.header,
				payload: jws.payload,
				protected: signature.protected,
				signature: signature.signature
			}, key, options);
		} catch {}
		throw new errors_js_1.JWSSignatureVerificationFailed();
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/epoch.js
var require_epoch = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = (date) => Math.floor(date.getTime() / 1e3);
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/secs.js
var require_secs = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const minute = 60;
	const hour = minute * 60;
	const day = hour * 24;
	const week = day * 7;
	const year = day * 365.25;
	const REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
	exports.default = (str) => {
		const matched = REGEX.exec(str);
		if (!matched || matched[4] && matched[1]) throw new TypeError("Invalid time period format");
		const value = parseFloat(matched[2]);
		const unit = matched[3].toLowerCase();
		let numericDate;
		switch (unit) {
			case "sec":
			case "secs":
			case "second":
			case "seconds":
			case "s":
				numericDate = Math.round(value);
				break;
			case "minute":
			case "minutes":
			case "min":
			case "mins":
			case "m":
				numericDate = Math.round(value * minute);
				break;
			case "hour":
			case "hours":
			case "hr":
			case "hrs":
			case "h":
				numericDate = Math.round(value * hour);
				break;
			case "day":
			case "days":
			case "d":
				numericDate = Math.round(value * day);
				break;
			case "week":
			case "weeks":
			case "w":
				numericDate = Math.round(value * week);
				break;
			default:
				numericDate = Math.round(value * year);
				break;
		}
		if (matched[1] === "-" || matched[4] === "ago") return -numericDate;
		return numericDate;
	};
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/lib/jwt_claims_set.js
var require_jwt_claims_set = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const errors_js_1 = require_errors();
	const buffer_utils_js_1 = require_buffer_utils();
	const epoch_js_1 = require_epoch();
	const secs_js_1 = require_secs();
	const is_object_js_1 = require_is_object();
	const normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, "");
	const checkAudiencePresence = (audPayload, audOption) => {
		if (typeof audPayload === "string") return audOption.includes(audPayload);
		if (Array.isArray(audPayload)) return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
		return false;
	};
	exports.default = (protectedHeader, encodedPayload, options = {}) => {
		let payload;
		try {
			payload = JSON.parse(buffer_utils_js_1.decoder.decode(encodedPayload));
		} catch {}
		if (!(0, is_object_js_1.default)(payload)) throw new errors_js_1.JWTInvalid("JWT Claims Set must be a top-level JSON object");
		const { typ } = options;
		if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) throw new errors_js_1.JWTClaimValidationFailed("unexpected \"typ\" JWT header value", payload, "typ", "check_failed");
		const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
		const presenceCheck = [...requiredClaims];
		if (maxTokenAge !== void 0) presenceCheck.push("iat");
		if (audience !== void 0) presenceCheck.push("aud");
		if (subject !== void 0) presenceCheck.push("sub");
		if (issuer !== void 0) presenceCheck.push("iss");
		for (const claim of new Set(presenceCheck.reverse())) if (!(claim in payload)) throw new errors_js_1.JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
		if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) throw new errors_js_1.JWTClaimValidationFailed("unexpected \"iss\" claim value", payload, "iss", "check_failed");
		if (subject && payload.sub !== subject) throw new errors_js_1.JWTClaimValidationFailed("unexpected \"sub\" claim value", payload, "sub", "check_failed");
		if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) throw new errors_js_1.JWTClaimValidationFailed("unexpected \"aud\" claim value", payload, "aud", "check_failed");
		let tolerance;
		switch (typeof options.clockTolerance) {
			case "string":
				tolerance = (0, secs_js_1.default)(options.clockTolerance);
				break;
			case "number":
				tolerance = options.clockTolerance;
				break;
			case "undefined":
				tolerance = 0;
				break;
			default: throw new TypeError("Invalid clockTolerance option type");
		}
		const { currentDate } = options;
		const now = (0, epoch_js_1.default)(currentDate || /* @__PURE__ */ new Date());
		if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") throw new errors_js_1.JWTClaimValidationFailed("\"iat\" claim must be a number", payload, "iat", "invalid");
		if (payload.nbf !== void 0) {
			if (typeof payload.nbf !== "number") throw new errors_js_1.JWTClaimValidationFailed("\"nbf\" claim must be a number", payload, "nbf", "invalid");
			if (payload.nbf > now + tolerance) throw new errors_js_1.JWTClaimValidationFailed("\"nbf\" claim timestamp check failed", payload, "nbf", "check_failed");
		}
		if (payload.exp !== void 0) {
			if (typeof payload.exp !== "number") throw new errors_js_1.JWTClaimValidationFailed("\"exp\" claim must be a number", payload, "exp", "invalid");
			if (payload.exp <= now - tolerance) throw new errors_js_1.JWTExpired("\"exp\" claim timestamp check failed", payload, "exp", "check_failed");
		}
		if (maxTokenAge) {
			const age = now - payload.iat;
			const max = typeof maxTokenAge === "number" ? maxTokenAge : (0, secs_js_1.default)(maxTokenAge);
			if (age - tolerance > max) throw new errors_js_1.JWTExpired("\"iat\" claim timestamp check failed (too far in the past)", payload, "iat", "check_failed");
			if (age < 0 - tolerance) throw new errors_js_1.JWTClaimValidationFailed("\"iat\" claim timestamp check failed (it should be in the past)", payload, "iat", "check_failed");
		}
		return payload;
	};
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwt/verify.js
var require_verify = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.jwtVerify = jwtVerify;
	const verify_js_1 = require_verify$2();
	const jwt_claims_set_js_1 = require_jwt_claims_set();
	const errors_js_1 = require_errors();
	async function jwtVerify(jwt, key, options) {
		const verified = await (0, verify_js_1.compactVerify)(jwt, key, options);
		if (verified.protectedHeader.crit?.includes("b64") && verified.protectedHeader.b64 === false) throw new errors_js_1.JWTInvalid("JWTs MUST NOT use unencoded payload");
		const result = {
			payload: (0, jwt_claims_set_js_1.default)(verified.protectedHeader, verified.payload, options),
			protectedHeader: verified.protectedHeader
		};
		if (typeof key === "function") return {
			...result,
			key: verified.key
		};
		return result;
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwt/decrypt.js
var require_decrypt = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.jwtDecrypt = jwtDecrypt;
	const decrypt_js_1 = require_decrypt$2();
	const jwt_claims_set_js_1 = require_jwt_claims_set();
	const errors_js_1 = require_errors();
	async function jwtDecrypt(jwt, key, options) {
		const decrypted = await (0, decrypt_js_1.compactDecrypt)(jwt, key, options);
		const payload = (0, jwt_claims_set_js_1.default)(decrypted.protectedHeader, decrypted.plaintext, options);
		const { protectedHeader } = decrypted;
		if (protectedHeader.iss !== void 0 && protectedHeader.iss !== payload.iss) throw new errors_js_1.JWTClaimValidationFailed("replicated \"iss\" claim header parameter mismatch", payload, "iss", "mismatch");
		if (protectedHeader.sub !== void 0 && protectedHeader.sub !== payload.sub) throw new errors_js_1.JWTClaimValidationFailed("replicated \"sub\" claim header parameter mismatch", payload, "sub", "mismatch");
		if (protectedHeader.aud !== void 0 && JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) throw new errors_js_1.JWTClaimValidationFailed("replicated \"aud\" claim header parameter mismatch", payload, "aud", "mismatch");
		const result = {
			payload,
			protectedHeader
		};
		if (typeof key === "function") return {
			...result,
			key: decrypted.key
		};
		return result;
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwe/compact/encrypt.js
var require_encrypt$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CompactEncrypt = void 0;
	const encrypt_js_1 = require_encrypt$3();
	var CompactEncrypt = class {
		_flattened;
		constructor(plaintext) {
			this._flattened = new encrypt_js_1.FlattenedEncrypt(plaintext);
		}
		setContentEncryptionKey(cek) {
			this._flattened.setContentEncryptionKey(cek);
			return this;
		}
		setInitializationVector(iv) {
			this._flattened.setInitializationVector(iv);
			return this;
		}
		setProtectedHeader(protectedHeader) {
			this._flattened.setProtectedHeader(protectedHeader);
			return this;
		}
		setKeyManagementParameters(parameters) {
			this._flattened.setKeyManagementParameters(parameters);
			return this;
		}
		async encrypt(key, options) {
			const jwe = await this._flattened.encrypt(key, options);
			return [
				jwe.protected,
				jwe.encrypted_key,
				jwe.iv,
				jwe.ciphertext,
				jwe.tag
			].join(".");
		}
	};
	exports.CompactEncrypt = CompactEncrypt;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jws/flattened/sign.js
var require_sign$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.FlattenedSign = void 0;
	const base64url_js_1 = require_base64url$1();
	const sign_js_1 = require_sign$4();
	const is_disjoint_js_1 = require_is_disjoint();
	const errors_js_1 = require_errors();
	const buffer_utils_js_1 = require_buffer_utils();
	const check_key_type_js_1 = require_check_key_type();
	const validate_crit_js_1 = require_validate_crit();
	var FlattenedSign = class {
		_payload;
		_protectedHeader;
		_unprotectedHeader;
		constructor(payload) {
			if (!(payload instanceof Uint8Array)) throw new TypeError("payload must be an instance of Uint8Array");
			this._payload = payload;
		}
		setProtectedHeader(protectedHeader) {
			if (this._protectedHeader) throw new TypeError("setProtectedHeader can only be called once");
			this._protectedHeader = protectedHeader;
			return this;
		}
		setUnprotectedHeader(unprotectedHeader) {
			if (this._unprotectedHeader) throw new TypeError("setUnprotectedHeader can only be called once");
			this._unprotectedHeader = unprotectedHeader;
			return this;
		}
		async sign(key, options) {
			if (!this._protectedHeader && !this._unprotectedHeader) throw new errors_js_1.JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
			if (!(0, is_disjoint_js_1.default)(this._protectedHeader, this._unprotectedHeader)) throw new errors_js_1.JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
			const joseHeader = {
				...this._protectedHeader,
				...this._unprotectedHeader
			};
			const extensions = (0, validate_crit_js_1.default)(errors_js_1.JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, this._protectedHeader, joseHeader);
			let b64 = true;
			if (extensions.has("b64")) {
				b64 = this._protectedHeader.b64;
				if (typeof b64 !== "boolean") throw new errors_js_1.JWSInvalid("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
			}
			const { alg } = joseHeader;
			if (typeof alg !== "string" || !alg) throw new errors_js_1.JWSInvalid("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
			(0, check_key_type_js_1.checkKeyTypeWithJwk)(alg, key, "sign");
			let payload = this._payload;
			if (b64) payload = buffer_utils_js_1.encoder.encode((0, base64url_js_1.encode)(payload));
			let protectedHeader;
			if (this._protectedHeader) protectedHeader = buffer_utils_js_1.encoder.encode((0, base64url_js_1.encode)(JSON.stringify(this._protectedHeader)));
			else protectedHeader = buffer_utils_js_1.encoder.encode("");
			const data = (0, buffer_utils_js_1.concat)(protectedHeader, buffer_utils_js_1.encoder.encode("."), payload);
			const signature = await (0, sign_js_1.default)(alg, key, data);
			const jws = {
				signature: (0, base64url_js_1.encode)(signature),
				payload: ""
			};
			if (b64) jws.payload = buffer_utils_js_1.decoder.decode(payload);
			if (this._unprotectedHeader) jws.header = this._unprotectedHeader;
			if (this._protectedHeader) jws.protected = buffer_utils_js_1.decoder.decode(protectedHeader);
			return jws;
		}
	};
	exports.FlattenedSign = FlattenedSign;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jws/compact/sign.js
var require_sign$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CompactSign = void 0;
	const sign_js_1 = require_sign$3();
	var CompactSign = class {
		_flattened;
		constructor(payload) {
			this._flattened = new sign_js_1.FlattenedSign(payload);
		}
		setProtectedHeader(protectedHeader) {
			this._flattened.setProtectedHeader(protectedHeader);
			return this;
		}
		async sign(key, options) {
			const jws = await this._flattened.sign(key, options);
			if (jws.payload === void 0) throw new TypeError("use the flattened module for creating JWS with b64: false");
			return `${jws.protected}.${jws.payload}.${jws.signature}`;
		}
	};
	exports.CompactSign = CompactSign;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jws/general/sign.js
var require_sign$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.GeneralSign = void 0;
	const sign_js_1 = require_sign$3();
	const errors_js_1 = require_errors();
	var IndividualSignature = class {
		parent;
		protectedHeader;
		unprotectedHeader;
		options;
		key;
		constructor(sig, key, options) {
			this.parent = sig;
			this.key = key;
			this.options = options;
		}
		setProtectedHeader(protectedHeader) {
			if (this.protectedHeader) throw new TypeError("setProtectedHeader can only be called once");
			this.protectedHeader = protectedHeader;
			return this;
		}
		setUnprotectedHeader(unprotectedHeader) {
			if (this.unprotectedHeader) throw new TypeError("setUnprotectedHeader can only be called once");
			this.unprotectedHeader = unprotectedHeader;
			return this;
		}
		addSignature(...args) {
			return this.parent.addSignature(...args);
		}
		sign(...args) {
			return this.parent.sign(...args);
		}
		done() {
			return this.parent;
		}
	};
	var GeneralSign = class {
		_payload;
		_signatures = [];
		constructor(payload) {
			this._payload = payload;
		}
		addSignature(key, options) {
			const signature = new IndividualSignature(this, key, options);
			this._signatures.push(signature);
			return signature;
		}
		async sign() {
			if (!this._signatures.length) throw new errors_js_1.JWSInvalid("at least one signature must be added");
			const jws = {
				signatures: [],
				payload: ""
			};
			for (let i = 0; i < this._signatures.length; i++) {
				const signature = this._signatures[i];
				const flattened = new sign_js_1.FlattenedSign(this._payload);
				flattened.setProtectedHeader(signature.protectedHeader);
				flattened.setUnprotectedHeader(signature.unprotectedHeader);
				const { payload, ...rest } = await flattened.sign(signature.key, signature.options);
				if (i === 0) jws.payload = payload;
				else if (jws.payload !== payload) throw new errors_js_1.JWSInvalid("inconsistent use of JWS Unencoded Payload (RFC7797)");
				jws.signatures.push(rest);
			}
			return jws;
		}
	};
	exports.GeneralSign = GeneralSign;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwt/produce.js
var require_produce = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ProduceJWT = void 0;
	const epoch_js_1 = require_epoch();
	const is_object_js_1 = require_is_object();
	const secs_js_1 = require_secs();
	function validateInput(label, input) {
		if (!Number.isFinite(input)) throw new TypeError(`Invalid ${label} input`);
		return input;
	}
	var ProduceJWT = class {
		_payload;
		constructor(payload = {}) {
			if (!(0, is_object_js_1.default)(payload)) throw new TypeError("JWT Claims Set MUST be an object");
			this._payload = payload;
		}
		setIssuer(issuer) {
			this._payload = {
				...this._payload,
				iss: issuer
			};
			return this;
		}
		setSubject(subject) {
			this._payload = {
				...this._payload,
				sub: subject
			};
			return this;
		}
		setAudience(audience) {
			this._payload = {
				...this._payload,
				aud: audience
			};
			return this;
		}
		setJti(jwtId) {
			this._payload = {
				...this._payload,
				jti: jwtId
			};
			return this;
		}
		setNotBefore(input) {
			if (typeof input === "number") this._payload = {
				...this._payload,
				nbf: validateInput("setNotBefore", input)
			};
			else if (input instanceof Date) this._payload = {
				...this._payload,
				nbf: validateInput("setNotBefore", (0, epoch_js_1.default)(input))
			};
			else this._payload = {
				...this._payload,
				nbf: (0, epoch_js_1.default)(/* @__PURE__ */ new Date()) + (0, secs_js_1.default)(input)
			};
			return this;
		}
		setExpirationTime(input) {
			if (typeof input === "number") this._payload = {
				...this._payload,
				exp: validateInput("setExpirationTime", input)
			};
			else if (input instanceof Date) this._payload = {
				...this._payload,
				exp: validateInput("setExpirationTime", (0, epoch_js_1.default)(input))
			};
			else this._payload = {
				...this._payload,
				exp: (0, epoch_js_1.default)(/* @__PURE__ */ new Date()) + (0, secs_js_1.default)(input)
			};
			return this;
		}
		setIssuedAt(input) {
			if (typeof input === "undefined") this._payload = {
				...this._payload,
				iat: (0, epoch_js_1.default)(/* @__PURE__ */ new Date())
			};
			else if (input instanceof Date) this._payload = {
				...this._payload,
				iat: validateInput("setIssuedAt", (0, epoch_js_1.default)(input))
			};
			else if (typeof input === "string") this._payload = {
				...this._payload,
				iat: validateInput("setIssuedAt", (0, epoch_js_1.default)(/* @__PURE__ */ new Date()) + (0, secs_js_1.default)(input))
			};
			else this._payload = {
				...this._payload,
				iat: validateInput("setIssuedAt", input)
			};
			return this;
		}
	};
	exports.ProduceJWT = ProduceJWT;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwt/sign.js
var require_sign = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SignJWT = void 0;
	const sign_js_1 = require_sign$2();
	const errors_js_1 = require_errors();
	const buffer_utils_js_1 = require_buffer_utils();
	const produce_js_1 = require_produce();
	var SignJWT = class extends produce_js_1.ProduceJWT {
		_protectedHeader;
		setProtectedHeader(protectedHeader) {
			this._protectedHeader = protectedHeader;
			return this;
		}
		async sign(key, options) {
			const sig = new sign_js_1.CompactSign(buffer_utils_js_1.encoder.encode(JSON.stringify(this._payload)));
			sig.setProtectedHeader(this._protectedHeader);
			if (Array.isArray(this._protectedHeader?.crit) && this._protectedHeader.crit.includes("b64") && this._protectedHeader.b64 === false) throw new errors_js_1.JWTInvalid("JWTs MUST NOT use unencoded payload");
			return sig.sign(key, options);
		}
	};
	exports.SignJWT = SignJWT;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwt/encrypt.js
var require_encrypt = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EncryptJWT = void 0;
	const encrypt_js_1 = require_encrypt$1();
	const buffer_utils_js_1 = require_buffer_utils();
	const produce_js_1 = require_produce();
	var EncryptJWT = class extends produce_js_1.ProduceJWT {
		_cek;
		_iv;
		_keyManagementParameters;
		_protectedHeader;
		_replicateIssuerAsHeader;
		_replicateSubjectAsHeader;
		_replicateAudienceAsHeader;
		setProtectedHeader(protectedHeader) {
			if (this._protectedHeader) throw new TypeError("setProtectedHeader can only be called once");
			this._protectedHeader = protectedHeader;
			return this;
		}
		setKeyManagementParameters(parameters) {
			if (this._keyManagementParameters) throw new TypeError("setKeyManagementParameters can only be called once");
			this._keyManagementParameters = parameters;
			return this;
		}
		setContentEncryptionKey(cek) {
			if (this._cek) throw new TypeError("setContentEncryptionKey can only be called once");
			this._cek = cek;
			return this;
		}
		setInitializationVector(iv) {
			if (this._iv) throw new TypeError("setInitializationVector can only be called once");
			this._iv = iv;
			return this;
		}
		replicateIssuerAsHeader() {
			this._replicateIssuerAsHeader = true;
			return this;
		}
		replicateSubjectAsHeader() {
			this._replicateSubjectAsHeader = true;
			return this;
		}
		replicateAudienceAsHeader() {
			this._replicateAudienceAsHeader = true;
			return this;
		}
		async encrypt(key, options) {
			const enc = new encrypt_js_1.CompactEncrypt(buffer_utils_js_1.encoder.encode(JSON.stringify(this._payload)));
			if (this._replicateIssuerAsHeader) this._protectedHeader = {
				...this._protectedHeader,
				iss: this._payload.iss
			};
			if (this._replicateSubjectAsHeader) this._protectedHeader = {
				...this._protectedHeader,
				sub: this._payload.sub
			};
			if (this._replicateAudienceAsHeader) this._protectedHeader = {
				...this._protectedHeader,
				aud: this._payload.aud
			};
			enc.setProtectedHeader(this._protectedHeader);
			if (this._iv) enc.setInitializationVector(this._iv);
			if (this._cek) enc.setContentEncryptionKey(this._cek);
			if (this._keyManagementParameters) enc.setKeyManagementParameters(this._keyManagementParameters);
			return enc.encrypt(key, options);
		}
	};
	exports.EncryptJWT = EncryptJWT;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwk/thumbprint.js
var require_thumbprint = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.calculateJwkThumbprint = calculateJwkThumbprint;
	exports.calculateJwkThumbprintUri = calculateJwkThumbprintUri;
	const digest_js_1 = require_digest();
	const base64url_js_1 = require_base64url$1();
	const errors_js_1 = require_errors();
	const buffer_utils_js_1 = require_buffer_utils();
	const is_object_js_1 = require_is_object();
	const check = (value, description) => {
		if (typeof value !== "string" || !value) throw new errors_js_1.JWKInvalid(`${description} missing or invalid`);
	};
	async function calculateJwkThumbprint(jwk, digestAlgorithm) {
		if (!(0, is_object_js_1.default)(jwk)) throw new TypeError("JWK must be an object");
		digestAlgorithm ??= "sha256";
		if (digestAlgorithm !== "sha256" && digestAlgorithm !== "sha384" && digestAlgorithm !== "sha512") throw new TypeError("digestAlgorithm must one of \"sha256\", \"sha384\", or \"sha512\"");
		let components;
		switch (jwk.kty) {
			case "EC":
				check(jwk.crv, "\"crv\" (Curve) Parameter");
				check(jwk.x, "\"x\" (X Coordinate) Parameter");
				check(jwk.y, "\"y\" (Y Coordinate) Parameter");
				components = {
					crv: jwk.crv,
					kty: jwk.kty,
					x: jwk.x,
					y: jwk.y
				};
				break;
			case "OKP":
				check(jwk.crv, "\"crv\" (Subtype of Key Pair) Parameter");
				check(jwk.x, "\"x\" (Public Key) Parameter");
				components = {
					crv: jwk.crv,
					kty: jwk.kty,
					x: jwk.x
				};
				break;
			case "RSA":
				check(jwk.e, "\"e\" (Exponent) Parameter");
				check(jwk.n, "\"n\" (Modulus) Parameter");
				components = {
					e: jwk.e,
					kty: jwk.kty,
					n: jwk.n
				};
				break;
			case "oct":
				check(jwk.k, "\"k\" (Key Value) Parameter");
				components = {
					k: jwk.k,
					kty: jwk.kty
				};
				break;
			default: throw new errors_js_1.JOSENotSupported("\"kty\" (Key Type) Parameter missing or unsupported");
		}
		const data = buffer_utils_js_1.encoder.encode(JSON.stringify(components));
		return (0, base64url_js_1.encode)(await (0, digest_js_1.default)(digestAlgorithm, data));
	}
	async function calculateJwkThumbprintUri(jwk, digestAlgorithm) {
		digestAlgorithm ??= "sha256";
		const thumbprint = await calculateJwkThumbprint(jwk, digestAlgorithm);
		return `urn:ietf:params:oauth:jwk-thumbprint:sha-${digestAlgorithm.slice(-3)}:${thumbprint}`;
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwk/embedded.js
var require_embedded = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EmbeddedJWK = EmbeddedJWK;
	const import_js_1 = require_import();
	const is_object_js_1 = require_is_object();
	const errors_js_1 = require_errors();
	async function EmbeddedJWK(protectedHeader, token) {
		const joseHeader = {
			...protectedHeader,
			...token?.header
		};
		if (!(0, is_object_js_1.default)(joseHeader.jwk)) throw new errors_js_1.JWSInvalid("\"jwk\" (JSON Web Key) Header Parameter must be a JSON object");
		const key = await (0, import_js_1.importJWK)({
			...joseHeader.jwk,
			ext: true
		}, joseHeader.alg);
		if (key instanceof Uint8Array || key.type !== "public") throw new errors_js_1.JWSInvalid("\"jwk\" (JSON Web Key) Header Parameter must be a public key");
		return key;
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwks/local.js
var require_local = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createLocalJWKSet = createLocalJWKSet;
	const import_js_1 = require_import();
	const errors_js_1 = require_errors();
	const is_object_js_1 = require_is_object();
	function getKtyFromAlg(alg) {
		switch (typeof alg === "string" && alg.slice(0, 2)) {
			case "RS":
			case "PS": return "RSA";
			case "ES": return "EC";
			case "Ed": return "OKP";
			default: throw new errors_js_1.JOSENotSupported("Unsupported \"alg\" value for a JSON Web Key Set");
		}
	}
	function isJWKSLike(jwks) {
		return jwks && typeof jwks === "object" && Array.isArray(jwks.keys) && jwks.keys.every(isJWKLike);
	}
	function isJWKLike(key) {
		return (0, is_object_js_1.default)(key);
	}
	function clone(obj) {
		if (typeof structuredClone === "function") return structuredClone(obj);
		return JSON.parse(JSON.stringify(obj));
	}
	var LocalJWKSet = class {
		_jwks;
		_cached = /* @__PURE__ */ new WeakMap();
		constructor(jwks) {
			if (!isJWKSLike(jwks)) throw new errors_js_1.JWKSInvalid("JSON Web Key Set malformed");
			this._jwks = clone(jwks);
		}
		async getKey(protectedHeader, token) {
			const { alg, kid } = {
				...protectedHeader,
				...token?.header
			};
			const kty = getKtyFromAlg(alg);
			const candidates = this._jwks.keys.filter((jwk) => {
				let candidate = kty === jwk.kty;
				if (candidate && typeof kid === "string") candidate = kid === jwk.kid;
				if (candidate && typeof jwk.alg === "string") candidate = alg === jwk.alg;
				if (candidate && typeof jwk.use === "string") candidate = jwk.use === "sig";
				if (candidate && Array.isArray(jwk.key_ops)) candidate = jwk.key_ops.includes("verify");
				if (candidate) switch (alg) {
					case "ES256":
						candidate = jwk.crv === "P-256";
						break;
					case "ES256K":
						candidate = jwk.crv === "secp256k1";
						break;
					case "ES384":
						candidate = jwk.crv === "P-384";
						break;
					case "ES512":
						candidate = jwk.crv === "P-521";
						break;
					case "Ed25519":
						candidate = jwk.crv === "Ed25519";
						break;
					case "EdDSA":
						candidate = jwk.crv === "Ed25519" || jwk.crv === "Ed448";
						break;
				}
				return candidate;
			});
			const { 0: jwk, length } = candidates;
			if (length === 0) throw new errors_js_1.JWKSNoMatchingKey();
			if (length !== 1) {
				const error = new errors_js_1.JWKSMultipleMatchingKeys();
				const { _cached } = this;
				error[Symbol.asyncIterator] = async function* () {
					for (const jwk of candidates) try {
						yield await importWithAlgCache(_cached, jwk, alg);
					} catch {}
				};
				throw error;
			}
			return importWithAlgCache(this._cached, jwk, alg);
		}
	};
	async function importWithAlgCache(cache, jwk, alg) {
		const cached = cache.get(jwk) || cache.set(jwk, {}).get(jwk);
		if (cached[alg] === void 0) {
			const key = await (0, import_js_1.importJWK)({
				...jwk,
				ext: true
			}, alg);
			if (key instanceof Uint8Array || key.type !== "public") throw new errors_js_1.JWKSInvalid("JSON Web Key Set members must be public keys");
			cached[alg] = key;
		}
		return cached[alg];
	}
	function createLocalJWKSet(jwks) {
		const set = new LocalJWKSet(jwks);
		const localJWKSet = async (protectedHeader, token) => set.getKey(protectedHeader, token);
		Object.defineProperties(localJWKSet, { jwks: {
			value: () => clone(set._jwks),
			enumerable: true,
			configurable: false,
			writable: false
		} });
		return localJWKSet;
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/fetch_jwks.js
var require_fetch_jwks = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	const http = __require("node:http");
	const https = __require("node:https");
	const node_events_1 = __require("node:events");
	const errors_js_1 = require_errors();
	const buffer_utils_js_1 = require_buffer_utils();
	const fetchJwks = async (url, timeout, options) => {
		let get;
		switch (url.protocol) {
			case "https:":
				get = https.get;
				break;
			case "http:":
				get = http.get;
				break;
			default: throw new TypeError("Unsupported URL protocol.");
		}
		const { agent, headers } = options;
		const req = get(url.href, {
			agent,
			timeout,
			headers
		});
		const [response] = await Promise.race([(0, node_events_1.once)(req, "response"), (0, node_events_1.once)(req, "timeout")]);
		if (!response) {
			req.destroy();
			throw new errors_js_1.JWKSTimeout();
		}
		if (response.statusCode !== 200) throw new errors_js_1.JOSEError("Expected 200 OK from the JSON Web Key Set HTTP response");
		const parts = [];
		for await (const part of response) parts.push(part);
		try {
			return JSON.parse(buffer_utils_js_1.decoder.decode((0, buffer_utils_js_1.concat)(...parts)));
		} catch {
			throw new errors_js_1.JOSEError("Failed to parse the JSON Web Key Set HTTP response as JSON");
		}
	};
	exports.default = fetchJwks;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwks/remote.js
var require_remote = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.experimental_jwksCache = exports.jwksCache = void 0;
	exports.createRemoteJWKSet = createRemoteJWKSet;
	const fetch_jwks_js_1 = require_fetch_jwks();
	const errors_js_1 = require_errors();
	const local_js_1 = require_local();
	const is_object_js_1 = require_is_object();
	function isCloudflareWorkers() {
		return typeof WebSocketPair !== "undefined" || typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime !== "undefined" && EdgeRuntime === "vercel";
	}
	let USER_AGENT;
	if (typeof navigator === "undefined" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) USER_AGENT = `jose/v5.10.0`;
	exports.jwksCache = Symbol();
	function isFreshJwksCache(input, cacheMaxAge) {
		if (typeof input !== "object" || input === null) return false;
		if (!("uat" in input) || typeof input.uat !== "number" || Date.now() - input.uat >= cacheMaxAge) return false;
		if (!("jwks" in input) || !(0, is_object_js_1.default)(input.jwks) || !Array.isArray(input.jwks.keys) || !Array.prototype.every.call(input.jwks.keys, is_object_js_1.default)) return false;
		return true;
	}
	var RemoteJWKSet = class {
		_url;
		_timeoutDuration;
		_cooldownDuration;
		_cacheMaxAge;
		_jwksTimestamp;
		_pendingFetch;
		_options;
		_local;
		_cache;
		constructor(url, options) {
			if (!(url instanceof URL)) throw new TypeError("url must be an instance of URL");
			this._url = new URL(url.href);
			this._options = {
				agent: options?.agent,
				headers: options?.headers
			};
			this._timeoutDuration = typeof options?.timeoutDuration === "number" ? options?.timeoutDuration : 5e3;
			this._cooldownDuration = typeof options?.cooldownDuration === "number" ? options?.cooldownDuration : 3e4;
			this._cacheMaxAge = typeof options?.cacheMaxAge === "number" ? options?.cacheMaxAge : 6e5;
			if (options?.[exports.jwksCache] !== void 0) {
				this._cache = options?.[exports.jwksCache];
				if (isFreshJwksCache(options?.[exports.jwksCache], this._cacheMaxAge)) {
					this._jwksTimestamp = this._cache.uat;
					this._local = (0, local_js_1.createLocalJWKSet)(this._cache.jwks);
				}
			}
		}
		coolingDown() {
			return typeof this._jwksTimestamp === "number" ? Date.now() < this._jwksTimestamp + this._cooldownDuration : false;
		}
		fresh() {
			return typeof this._jwksTimestamp === "number" ? Date.now() < this._jwksTimestamp + this._cacheMaxAge : false;
		}
		async getKey(protectedHeader, token) {
			if (!this._local || !this.fresh()) await this.reload();
			try {
				return await this._local(protectedHeader, token);
			} catch (err) {
				if (err instanceof errors_js_1.JWKSNoMatchingKey) {
					if (this.coolingDown() === false) {
						await this.reload();
						return this._local(protectedHeader, token);
					}
				}
				throw err;
			}
		}
		async reload() {
			if (this._pendingFetch && isCloudflareWorkers()) this._pendingFetch = void 0;
			const headers = new Headers(this._options.headers);
			if (USER_AGENT && !headers.has("User-Agent")) {
				headers.set("User-Agent", USER_AGENT);
				this._options.headers = Object.fromEntries(headers.entries());
			}
			this._pendingFetch ||= (0, fetch_jwks_js_1.default)(this._url, this._timeoutDuration, this._options).then((json) => {
				this._local = (0, local_js_1.createLocalJWKSet)(json);
				if (this._cache) {
					this._cache.uat = Date.now();
					this._cache.jwks = json;
				}
				this._jwksTimestamp = Date.now();
				this._pendingFetch = void 0;
			}).catch((err) => {
				this._pendingFetch = void 0;
				throw err;
			});
			await this._pendingFetch;
		}
	};
	function createRemoteJWKSet(url, options) {
		const set = new RemoteJWKSet(url, options);
		const remoteJWKSet = async (protectedHeader, token) => set.getKey(protectedHeader, token);
		Object.defineProperties(remoteJWKSet, {
			coolingDown: {
				get: () => set.coolingDown(),
				enumerable: true,
				configurable: false
			},
			fresh: {
				get: () => set.fresh(),
				enumerable: true,
				configurable: false
			},
			reload: {
				value: () => set.reload(),
				enumerable: true,
				configurable: false,
				writable: false
			},
			reloading: {
				get: () => !!set._pendingFetch,
				enumerable: true,
				configurable: false
			},
			jwks: {
				value: () => set._local?.jwks(),
				enumerable: true,
				configurable: false,
				writable: false
			}
		});
		return remoteJWKSet;
	}
	exports.experimental_jwksCache = exports.jwksCache;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/jwt/unsecured.js
var require_unsecured = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.UnsecuredJWT = void 0;
	const base64url = require_base64url$1();
	const buffer_utils_js_1 = require_buffer_utils();
	const errors_js_1 = require_errors();
	const jwt_claims_set_js_1 = require_jwt_claims_set();
	const produce_js_1 = require_produce();
	var UnsecuredJWT = class extends produce_js_1.ProduceJWT {
		encode() {
			return `${base64url.encode(JSON.stringify({ alg: "none" }))}.${base64url.encode(JSON.stringify(this._payload))}.`;
		}
		static decode(jwt, options) {
			if (typeof jwt !== "string") throw new errors_js_1.JWTInvalid("Unsecured JWT must be a string");
			const { 0: encodedHeader, 1: encodedPayload, 2: signature, length } = jwt.split(".");
			if (length !== 3 || signature !== "") throw new errors_js_1.JWTInvalid("Invalid Unsecured JWT");
			let header;
			try {
				header = JSON.parse(buffer_utils_js_1.decoder.decode(base64url.decode(encodedHeader)));
				if (header.alg !== "none") throw new Error();
			} catch {
				throw new errors_js_1.JWTInvalid("Invalid Unsecured JWT");
			}
			return {
				payload: (0, jwt_claims_set_js_1.default)(header, base64url.decode(encodedPayload), options),
				header
			};
		}
	};
	exports.UnsecuredJWT = UnsecuredJWT;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/util/base64url.js
var require_base64url = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decode = exports.encode = void 0;
	const base64url = require_base64url$1();
	exports.encode = base64url.encode;
	exports.decode = base64url.decode;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/util/decode_protected_header.js
var require_decode_protected_header = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decodeProtectedHeader = decodeProtectedHeader;
	const base64url_js_1 = require_base64url();
	const buffer_utils_js_1 = require_buffer_utils();
	const is_object_js_1 = require_is_object();
	function decodeProtectedHeader(token) {
		let protectedB64u;
		if (typeof token === "string") {
			const parts = token.split(".");
			if (parts.length === 3 || parts.length === 5) [protectedB64u] = parts;
		} else if (typeof token === "object" && token) if ("protected" in token) protectedB64u = token.protected;
		else throw new TypeError("Token does not contain a Protected Header");
		try {
			if (typeof protectedB64u !== "string" || !protectedB64u) throw new Error();
			const result = JSON.parse(buffer_utils_js_1.decoder.decode((0, base64url_js_1.decode)(protectedB64u)));
			if (!(0, is_object_js_1.default)(result)) throw new Error();
			return result;
		} catch {
			throw new TypeError("Invalid Token or Protected Header formatting");
		}
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/util/decode_jwt.js
var require_decode_jwt = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decodeJwt = decodeJwt;
	const base64url_js_1 = require_base64url();
	const buffer_utils_js_1 = require_buffer_utils();
	const is_object_js_1 = require_is_object();
	const errors_js_1 = require_errors();
	function decodeJwt(jwt) {
		if (typeof jwt !== "string") throw new errors_js_1.JWTInvalid("JWTs must use Compact JWS serialization, JWT must be a string");
		const { 1: payload, length } = jwt.split(".");
		if (length === 5) throw new errors_js_1.JWTInvalid("Only JWTs using Compact JWS serialization can be decoded");
		if (length !== 3) throw new errors_js_1.JWTInvalid("Invalid JWT");
		if (!payload) throw new errors_js_1.JWTInvalid("JWTs must contain a payload");
		let decoded;
		try {
			decoded = (0, base64url_js_1.decode)(payload);
		} catch {
			throw new errors_js_1.JWTInvalid("Failed to base64url decode the payload");
		}
		let result;
		try {
			result = JSON.parse(buffer_utils_js_1.decoder.decode(decoded));
		} catch {
			throw new errors_js_1.JWTInvalid("Failed to parse the decoded payload as JSON");
		}
		if (!(0, is_object_js_1.default)(result)) throw new errors_js_1.JWTInvalid("Invalid JWT Claims Set");
		return result;
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/generate.js
var require_generate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.generateSecret = generateSecret;
	exports.generateKeyPair = generateKeyPair;
	const node_crypto_1 = __require("node:crypto");
	const node_util_1 = __require("node:util");
	const random_js_1 = require_random();
	const errors_js_1 = require_errors();
	const generate = (0, node_util_1.promisify)(node_crypto_1.generateKeyPair);
	async function generateSecret(alg, options) {
		let length;
		switch (alg) {
			case "HS256":
			case "HS384":
			case "HS512":
			case "A128CBC-HS256":
			case "A192CBC-HS384":
			case "A256CBC-HS512":
				length = parseInt(alg.slice(-3), 10);
				break;
			case "A128KW":
			case "A192KW":
			case "A256KW":
			case "A128GCMKW":
			case "A192GCMKW":
			case "A256GCMKW":
			case "A128GCM":
			case "A192GCM":
			case "A256GCM":
				length = parseInt(alg.slice(1, 4), 10);
				break;
			default: throw new errors_js_1.JOSENotSupported("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
		}
		return (0, node_crypto_1.createSecretKey)((0, random_js_1.default)(new Uint8Array(length >> 3)));
	}
	async function generateKeyPair(alg, options) {
		switch (alg) {
			case "RS256":
			case "RS384":
			case "RS512":
			case "PS256":
			case "PS384":
			case "PS512":
			case "RSA-OAEP":
			case "RSA-OAEP-256":
			case "RSA-OAEP-384":
			case "RSA-OAEP-512":
			case "RSA1_5": {
				const modulusLength = options?.modulusLength ?? 2048;
				if (typeof modulusLength !== "number" || modulusLength < 2048) throw new errors_js_1.JOSENotSupported("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
				return await generate("rsa", {
					modulusLength,
					publicExponent: 65537
				});
			}
			case "ES256": return generate("ec", { namedCurve: "P-256" });
			case "ES256K": return generate("ec", { namedCurve: "secp256k1" });
			case "ES384": return generate("ec", { namedCurve: "P-384" });
			case "ES512": return generate("ec", { namedCurve: "P-521" });
			case "Ed25519": return generate("ed25519");
			case "EdDSA": switch (options?.crv) {
				case void 0:
				case "Ed25519": return generate("ed25519");
				case "Ed448": return generate("ed448");
				default: throw new errors_js_1.JOSENotSupported("Invalid or unsupported crv option provided, supported values are Ed25519 and Ed448");
			}
			case "ECDH-ES":
			case "ECDH-ES+A128KW":
			case "ECDH-ES+A192KW":
			case "ECDH-ES+A256KW": {
				const crv = options?.crv ?? "P-256";
				switch (crv) {
					case void 0:
					case "P-256":
					case "P-384":
					case "P-521": return generate("ec", { namedCurve: crv });
					case "X25519": return generate("x25519");
					case "X448": return generate("x448");
					default: throw new errors_js_1.JOSENotSupported("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448");
				}
			}
			default: throw new errors_js_1.JOSENotSupported("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
		}
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/key/generate_key_pair.js
var require_generate_key_pair = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.generateKeyPair = generateKeyPair;
	const generate_js_1 = require_generate();
	async function generateKeyPair(alg, options) {
		return (0, generate_js_1.generateKeyPair)(alg, options);
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/key/generate_secret.js
var require_generate_secret = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.generateSecret = generateSecret;
	const generate_js_1 = require_generate();
	async function generateSecret(alg, options) {
		return (0, generate_js_1.generateSecret)(alg, options);
	}
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/runtime/runtime.js
var require_runtime$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "node:crypto";
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/util/runtime.js
var require_runtime = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = require_runtime$1().default;
}));
//#endregion
//#region node_modules/.pnpm/jose@5.10.0/node_modules/jose/dist/node/cjs/index.js
var require_cjs = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.cryptoRuntime = exports.base64url = exports.generateSecret = exports.generateKeyPair = exports.errors = exports.decodeJwt = exports.decodeProtectedHeader = exports.importJWK = exports.importX509 = exports.importPKCS8 = exports.importSPKI = exports.exportJWK = exports.exportSPKI = exports.exportPKCS8 = exports.UnsecuredJWT = exports.experimental_jwksCache = exports.jwksCache = exports.createRemoteJWKSet = exports.createLocalJWKSet = exports.EmbeddedJWK = exports.calculateJwkThumbprintUri = exports.calculateJwkThumbprint = exports.EncryptJWT = exports.SignJWT = exports.GeneralSign = exports.FlattenedSign = exports.CompactSign = exports.FlattenedEncrypt = exports.CompactEncrypt = exports.jwtDecrypt = exports.jwtVerify = exports.generalVerify = exports.flattenedVerify = exports.compactVerify = exports.GeneralEncrypt = exports.generalDecrypt = exports.flattenedDecrypt = exports.compactDecrypt = void 0;
	var decrypt_js_1 = require_decrypt$2();
	Object.defineProperty(exports, "compactDecrypt", {
		enumerable: true,
		get: function() {
			return decrypt_js_1.compactDecrypt;
		}
	});
	var decrypt_js_2 = require_decrypt$3();
	Object.defineProperty(exports, "flattenedDecrypt", {
		enumerable: true,
		get: function() {
			return decrypt_js_2.flattenedDecrypt;
		}
	});
	var decrypt_js_3 = require_decrypt$1();
	Object.defineProperty(exports, "generalDecrypt", {
		enumerable: true,
		get: function() {
			return decrypt_js_3.generalDecrypt;
		}
	});
	var encrypt_js_1 = require_encrypt$2();
	Object.defineProperty(exports, "GeneralEncrypt", {
		enumerable: true,
		get: function() {
			return encrypt_js_1.GeneralEncrypt;
		}
	});
	var verify_js_1 = require_verify$2();
	Object.defineProperty(exports, "compactVerify", {
		enumerable: true,
		get: function() {
			return verify_js_1.compactVerify;
		}
	});
	var verify_js_2 = require_verify$3();
	Object.defineProperty(exports, "flattenedVerify", {
		enumerable: true,
		get: function() {
			return verify_js_2.flattenedVerify;
		}
	});
	var verify_js_3 = require_verify$1();
	Object.defineProperty(exports, "generalVerify", {
		enumerable: true,
		get: function() {
			return verify_js_3.generalVerify;
		}
	});
	var verify_js_4 = require_verify();
	Object.defineProperty(exports, "jwtVerify", {
		enumerable: true,
		get: function() {
			return verify_js_4.jwtVerify;
		}
	});
	var decrypt_js_4 = require_decrypt();
	Object.defineProperty(exports, "jwtDecrypt", {
		enumerable: true,
		get: function() {
			return decrypt_js_4.jwtDecrypt;
		}
	});
	var encrypt_js_2 = require_encrypt$1();
	Object.defineProperty(exports, "CompactEncrypt", {
		enumerable: true,
		get: function() {
			return encrypt_js_2.CompactEncrypt;
		}
	});
	var encrypt_js_3 = require_encrypt$3();
	Object.defineProperty(exports, "FlattenedEncrypt", {
		enumerable: true,
		get: function() {
			return encrypt_js_3.FlattenedEncrypt;
		}
	});
	var sign_js_1 = require_sign$2();
	Object.defineProperty(exports, "CompactSign", {
		enumerable: true,
		get: function() {
			return sign_js_1.CompactSign;
		}
	});
	var sign_js_2 = require_sign$3();
	Object.defineProperty(exports, "FlattenedSign", {
		enumerable: true,
		get: function() {
			return sign_js_2.FlattenedSign;
		}
	});
	var sign_js_3 = require_sign$1();
	Object.defineProperty(exports, "GeneralSign", {
		enumerable: true,
		get: function() {
			return sign_js_3.GeneralSign;
		}
	});
	var sign_js_4 = require_sign();
	Object.defineProperty(exports, "SignJWT", {
		enumerable: true,
		get: function() {
			return sign_js_4.SignJWT;
		}
	});
	var encrypt_js_4 = require_encrypt();
	Object.defineProperty(exports, "EncryptJWT", {
		enumerable: true,
		get: function() {
			return encrypt_js_4.EncryptJWT;
		}
	});
	var thumbprint_js_1 = require_thumbprint();
	Object.defineProperty(exports, "calculateJwkThumbprint", {
		enumerable: true,
		get: function() {
			return thumbprint_js_1.calculateJwkThumbprint;
		}
	});
	Object.defineProperty(exports, "calculateJwkThumbprintUri", {
		enumerable: true,
		get: function() {
			return thumbprint_js_1.calculateJwkThumbprintUri;
		}
	});
	var embedded_js_1 = require_embedded();
	Object.defineProperty(exports, "EmbeddedJWK", {
		enumerable: true,
		get: function() {
			return embedded_js_1.EmbeddedJWK;
		}
	});
	var local_js_1 = require_local();
	Object.defineProperty(exports, "createLocalJWKSet", {
		enumerable: true,
		get: function() {
			return local_js_1.createLocalJWKSet;
		}
	});
	var remote_js_1 = require_remote();
	Object.defineProperty(exports, "createRemoteJWKSet", {
		enumerable: true,
		get: function() {
			return remote_js_1.createRemoteJWKSet;
		}
	});
	Object.defineProperty(exports, "jwksCache", {
		enumerable: true,
		get: function() {
			return remote_js_1.jwksCache;
		}
	});
	Object.defineProperty(exports, "experimental_jwksCache", {
		enumerable: true,
		get: function() {
			return remote_js_1.experimental_jwksCache;
		}
	});
	var unsecured_js_1 = require_unsecured();
	Object.defineProperty(exports, "UnsecuredJWT", {
		enumerable: true,
		get: function() {
			return unsecured_js_1.UnsecuredJWT;
		}
	});
	var export_js_1 = require_export();
	Object.defineProperty(exports, "exportPKCS8", {
		enumerable: true,
		get: function() {
			return export_js_1.exportPKCS8;
		}
	});
	Object.defineProperty(exports, "exportSPKI", {
		enumerable: true,
		get: function() {
			return export_js_1.exportSPKI;
		}
	});
	Object.defineProperty(exports, "exportJWK", {
		enumerable: true,
		get: function() {
			return export_js_1.exportJWK;
		}
	});
	var import_js_1 = require_import();
	Object.defineProperty(exports, "importSPKI", {
		enumerable: true,
		get: function() {
			return import_js_1.importSPKI;
		}
	});
	Object.defineProperty(exports, "importPKCS8", {
		enumerable: true,
		get: function() {
			return import_js_1.importPKCS8;
		}
	});
	Object.defineProperty(exports, "importX509", {
		enumerable: true,
		get: function() {
			return import_js_1.importX509;
		}
	});
	Object.defineProperty(exports, "importJWK", {
		enumerable: true,
		get: function() {
			return import_js_1.importJWK;
		}
	});
	var decode_protected_header_js_1 = require_decode_protected_header();
	Object.defineProperty(exports, "decodeProtectedHeader", {
		enumerable: true,
		get: function() {
			return decode_protected_header_js_1.decodeProtectedHeader;
		}
	});
	var decode_jwt_js_1 = require_decode_jwt();
	Object.defineProperty(exports, "decodeJwt", {
		enumerable: true,
		get: function() {
			return decode_jwt_js_1.decodeJwt;
		}
	});
	exports.errors = require_errors();
	var generate_key_pair_js_1 = require_generate_key_pair();
	Object.defineProperty(exports, "generateKeyPair", {
		enumerable: true,
		get: function() {
			return generate_key_pair_js_1.generateKeyPair;
		}
	});
	var generate_secret_js_1 = require_generate_secret();
	Object.defineProperty(exports, "generateSecret", {
		enumerable: true,
		get: function() {
			return generate_secret_js_1.generateSecret;
		}
	});
	exports.base64url = require_base64url();
	var runtime_js_1 = require_runtime();
	Object.defineProperty(exports, "cryptoRuntime", {
		enumerable: true,
		get: function() {
			return runtime_js_1.default;
		}
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+oidc@3.6.2/node_modules/@vercel/oidc/dist/verify-vercel-oidc-token.js
var require_verify_vercel_oidc_token = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var verify_vercel_oidc_token_exports = {};
	__export(verify_vercel_oidc_token_exports, { verifyVercelOidcToken: () => verifyVercelOidcToken });
	module.exports = __toCommonJS(verify_vercel_oidc_token_exports);
	var import_jose = require_cjs();
	const VERCEL_OIDC_ISSUER = "https://oidc.vercel.com";
	const VERCEL_OIDC_JWKS_URL = new URL("https://oidc.vercel.com/.well-known/jwks");
	const DEFAULT_ALGORITHMS = ["RS256"];
	const VERCEL_OIDC_JWKS = (0, import_jose.createRemoteJWKSet)(VERCEL_OIDC_JWKS_URL);
	async function verifyVercelOidcToken(token, options) {
		const { algorithms, projectId = process.env.VERCEL_PROJECT_ID, environment = process.env.VERCEL_TARGET_ENV || process.env.VERCEL_ENV, ownerId, ...verifyOptions } = options ?? {};
		if (projectId === "*" && ownerId === void 0 && !hasAudienceVerification(verifyOptions.audience)) throw new TypeError("Expected ownerId or audience to be provided when projectId is '*'.");
		const result = await (0, import_jose.jwtVerify)(token, VERCEL_OIDC_JWKS, {
			...verifyOptions,
			algorithms: algorithms ?? DEFAULT_ALGORITHMS
		});
		validateIssuer(result.payload.iss);
		validateClaim({
			actual: result.payload.project_id,
			claim: "project_id",
			env: "VERCEL_PROJECT_ID",
			expected: projectId,
			option: "projectId"
		});
		validateClaim({
			actual: result.payload.environment,
			claim: "environment",
			env: "VERCEL_TARGET_ENV or VERCEL_ENV",
			expected: environment,
			option: "environment"
		});
		validateOptionalClaim({
			actual: result.payload.owner_id,
			claim: "owner_id",
			expected: ownerId
		});
		return result;
	}
	function hasAudienceVerification(audience) {
		return Array.isArray(audience) ? audience.length > 0 : audience !== void 0;
	}
	function validateIssuer(actual) {
		if (actual !== VERCEL_OIDC_ISSUER && (typeof actual !== "string" || !actual.startsWith(`${VERCEL_OIDC_ISSUER}/`))) throw new TypeError(`Expected Vercel OIDC token iss claim to be "${VERCEL_OIDC_ISSUER}" or to start with "${VERCEL_OIDC_ISSUER}/".`);
	}
	function validateClaim({ actual, claim, env, expected, option }) {
		if (expected === "*") return;
		if (expected === void 0 || expected.length === 0) throw new TypeError(`Expected ${env} to be set or ${option} to be provided. Pass ${option}: '*' to allow any ${claim} claim.`);
		if (Array.isArray(expected) && typeof actual === "string" && expected.includes(actual)) return;
		if (actual !== expected) throw new TypeError(Array.isArray(expected) ? `Expected Vercel OIDC token ${claim} claim to be one of: ${expected.map((value) => `"${value}"`).join(", ")}.` : `Expected Vercel OIDC token ${claim} claim to be "${expected}".`);
	}
	function validateOptionalClaim({ actual, claim, expected }) {
		if (expected === void 0) return;
		if (actual !== expected) throw new TypeError(`Expected Vercel OIDC token ${claim} claim to be "${expected}".`);
	}
	0 && (module.exports = { verifyVercelOidcToken });
}));
//#endregion
//#region node_modules/.pnpm/@vercel+oidc@3.6.2/node_modules/@vercel/oidc/dist/auth-errors.js
var require_auth_errors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var auth_errors_exports = {};
	__export(auth_errors_exports, {
		AccessTokenMissingError: () => AccessTokenMissingError,
		RefreshAccessTokenFailedError: () => RefreshAccessTokenFailedError
	});
	module.exports = __toCommonJS(auth_errors_exports);
	var AccessTokenMissingError = class extends Error {
		constructor() {
			super("No authentication found. Please log in with the Vercel CLI (vercel login).");
			this.name = "AccessTokenMissingError";
		}
	};
	var RefreshAccessTokenFailedError = class extends Error {
		constructor(cause) {
			super("Failed to refresh authentication token.");
			this.name = "RefreshAccessTokenFailedError";
			if (cause !== void 0) this.cause = cause;
		}
	};
	0 && (module.exports = {
		AccessTokenMissingError,
		RefreshAccessTokenFailedError
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+oidc@3.6.2/node_modules/@vercel/oidc/dist/token-io.js
var require_token_io = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var token_io_exports = {};
	__export(token_io_exports, {
		findRootDir: () => findRootDir,
		getUserDataDir: () => getUserDataDir
	});
	module.exports = __toCommonJS(token_io_exports);
	var import_path = __toESM(__require("path"));
	var import_fs = __toESM(__require("fs"));
	var import_os$1 = __toESM(__require("os"));
	var import_token_error = require_token_error();
	function findRootDir() {
		try {
			let dir = process.cwd();
			while (dir !== import_path.default.dirname(dir)) {
				const pkgPath = import_path.default.join(dir, ".vercel");
				if (import_fs.default.existsSync(pkgPath)) return dir;
				dir = import_path.default.dirname(dir);
			}
		} catch (_e) {
			throw new import_token_error.VercelOidcTokenError("Token refresh only supported in node server environments");
		}
		return null;
	}
	function getUserDataDir() {
		if (process.env.XDG_DATA_HOME) return process.env.XDG_DATA_HOME;
		switch (import_os$1.default.platform()) {
			case "darwin": return import_path.default.join(import_os$1.default.homedir(), "Library/Application Support");
			case "linux": return import_path.default.join(import_os$1.default.homedir(), ".local/share");
			case "win32":
				if (process.env.LOCALAPPDATA) return process.env.LOCALAPPDATA;
				return null;
			default: return null;
		}
	}
	0 && (module.exports = {
		findRootDir,
		getUserDataDir
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+oidc@3.6.2/node_modules/@vercel/oidc/dist/oauth.js
var require_oauth = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var oauth_exports = {};
	__export(oauth_exports, {
		processTokenResponse: () => processTokenResponse,
		refreshTokenRequest: () => refreshTokenRequest
	});
	module.exports = __toCommonJS(oauth_exports);
	var import_os = __require("os");
	const VERCEL_ISSUER = "https://vercel.com";
	const VERCEL_CLI_CLIENT_ID = "cl_HYyOPBNtFMfHhaUn9L4QPfTZz6TP47bp";
	const userAgent = `@vercel/oidc node-${process.version} ${(0, import_os.platform)()} (${(0, import_os.arch)()}) ${(0, import_os.hostname)()}`;
	let _tokenEndpoint = null;
	async function getTokenEndpoint() {
		if (_tokenEndpoint) return _tokenEndpoint;
		const response = await fetch(`${VERCEL_ISSUER}/.well-known/openid-configuration`, { headers: { "user-agent": userAgent } });
		if (!response.ok) throw new Error("Failed to discover OAuth endpoints");
		const metadata = await response.json();
		if (!metadata || typeof metadata.token_endpoint !== "string") throw new Error("Invalid OAuth discovery response");
		const endpoint = metadata.token_endpoint;
		_tokenEndpoint = endpoint;
		return endpoint;
	}
	async function refreshTokenRequest(options) {
		const tokenEndpoint = await getTokenEndpoint();
		return await fetch(tokenEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"user-agent": userAgent
			},
			body: new URLSearchParams({
				client_id: VERCEL_CLI_CLIENT_ID,
				grant_type: "refresh_token",
				...options
			})
		});
	}
	async function processTokenResponse(response) {
		const json = await response.json();
		if (!response.ok) {
			const errorMsg = typeof json === "object" && json && "error" in json ? String(json.error) : "Token refresh failed";
			return [new Error(errorMsg)];
		}
		if (typeof json !== "object" || json === null) return [/* @__PURE__ */ new Error("Invalid token response")];
		if (typeof json.access_token !== "string") return [/* @__PURE__ */ new Error("Missing access_token in response")];
		if (json.token_type !== "Bearer") return [/* @__PURE__ */ new Error("Invalid token_type in response")];
		if (typeof json.expires_in !== "number") return [/* @__PURE__ */ new Error("Missing expires_in in response")];
		return [null, json];
	}
	0 && (module.exports = {
		processTokenResponse,
		refreshTokenRequest
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+oidc@3.6.2/node_modules/@vercel/oidc/dist/token-util.js
var require_token_util = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var token_util_exports = {};
	__export(token_util_exports, {
		assertVercelOidcTokenResponse: () => assertVercelOidcTokenResponse,
		findProjectInfo: () => findProjectInfo,
		getTokenPayload: () => getTokenPayload,
		getVercelOidcToken: () => getVercelOidcToken,
		getVercelOidcTokenFromCli: () => getVercelOidcTokenFromCli,
		getVercelToken: () => getVercelToken,
		isExpired: () => isExpired,
		loadToken: () => loadToken,
		saveToken: () => saveToken
	});
	module.exports = __toCommonJS(token_util_exports);
	var path = __toESM(__require("path"));
	var fs = __toESM(__require("fs"));
	var import_cli_exec = require_dist$1();
	var import_cli_config = require_dist$2();
	var import_token_error = require_token_error();
	var import_token_io = require_token_io();
	var import_oauth = require_oauth();
	var import_auth_errors = require_auth_errors();
	async function getVercelToken(options) {
		const configDir = (0, import_cli_config.getGlobalPathConfig)();
		const authConfig = (0, import_cli_config.tryReadAuthConfig)(configDir);
		if (!authConfig || !authConfig.token && !authConfig.refreshToken) throw new import_auth_errors.AccessTokenMissingError();
		if (isValidAccessToken(authConfig, options?.expirationBufferMs)) return authConfig.token;
		if (!authConfig.refreshToken) {
			(0, import_cli_config.writeAuthConfig)(configDir, {});
			throw new import_auth_errors.RefreshAccessTokenFailedError("No refresh token available");
		}
		try {
			const tokenResponse = await (0, import_oauth.refreshTokenRequest)({ refresh_token: authConfig.refreshToken });
			const [tokensError, tokens] = await (0, import_oauth.processTokenResponse)(tokenResponse);
			if (tokensError || !tokens) {
				(0, import_cli_config.writeAuthConfig)(configDir, {});
				throw new import_auth_errors.RefreshAccessTokenFailedError(tokensError);
			}
			const updatedConfig = {
				token: tokens.access_token,
				expiresAt: Math.floor(Date.now() / 1e3) + tokens.expires_in,
				refreshToken: tokens.refresh_token
			};
			(0, import_cli_config.writeAuthConfig)(configDir, updatedConfig);
			return updatedConfig.token;
		} catch (error) {
			(0, import_cli_config.writeAuthConfig)(configDir, {});
			if (error instanceof import_auth_errors.AccessTokenMissingError || error instanceof import_auth_errors.RefreshAccessTokenFailedError) throw error;
			throw new import_auth_errors.RefreshAccessTokenFailedError(error);
		}
	}
	function isValidAccessToken(authConfig, expirationBufferMs = 0) {
		if (!authConfig.token) return false;
		if (typeof authConfig.expiresAt !== "number") return true;
		const nowInSeconds = Math.floor(Date.now() / 1e3);
		const bufferInSeconds = expirationBufferMs / 1e3;
		return authConfig.expiresAt >= nowInSeconds + bufferInSeconds;
	}
	async function getVercelOidcTokenFromCli(projectId, teamId) {
		const args = [
			"project",
			"token",
			projectId,
			"--format=json"
		];
		if (teamId) args.push("--scope", teamId);
		try {
			const { stdout } = await (0, import_cli_exec.execVercelCli)(args);
			let parsedOutput;
			if (typeof stdout !== "string") throw new import_token_error.VercelOidcTokenError("Failed to refresh OIDC token: `vercel project token` did not return stdout");
			try {
				parsedOutput = JSON.parse(stdout);
			} catch {
				throw new import_token_error.VercelOidcTokenError("Failed to refresh OIDC token: `vercel project token` returned invalid JSON: " + stdout);
			}
			assertVercelOidcTokenResponse(parsedOutput);
			return parsedOutput;
		} catch (error) {
			if (error instanceof import_token_error.VercelOidcTokenError) throw error;
			let message = error instanceof Error ? error.message : "";
			const stderr = error instanceof import_cli_exec.VercelCliError ? error.stderr?.trim() : void 0;
			if (stderr && !message.includes(stderr)) message = `${message}
${stderr}`.trim();
			throw new import_token_error.VercelOidcTokenError(message ? `Failed to refresh OIDC token with the Vercel CLI: ${message}` : "Failed to refresh OIDC token with the Vercel CLI");
		}
	}
	async function getVercelOidcToken(authToken, projectId, teamId) {
		const url = `https://api.vercel.com/v1/projects/${projectId}/token?source=vercel-oidc-refresh${teamId ? `&teamId=${teamId}` : ""}`;
		const res = await fetch(url, {
			method: "POST",
			headers: { Authorization: `Bearer ${authToken}` }
		});
		if (!res.ok) throw new import_token_error.VercelOidcTokenError(`Failed to refresh OIDC token: ${res.statusText}`);
		const tokenRes = await res.json();
		assertVercelOidcTokenResponse(tokenRes);
		return tokenRes;
	}
	function assertVercelOidcTokenResponse(res) {
		if (!res || typeof res !== "object") throw new TypeError("Vercel OIDC token is malformed. Expected an object.");
		if (!("token" in res) || typeof res.token !== "string") throw new TypeError("Vercel OIDC token is malformed. Expected a string-valued token property.");
	}
	function findProjectInfo() {
		const dir = (0, import_token_io.findRootDir)();
		if (!dir) throw new import_token_error.VercelOidcTokenError("Unable to find project root directory. Have you linked your project with `vc link?`");
		const prjPath = path.join(dir, ".vercel", "project.json");
		if (!fs.existsSync(prjPath)) throw new import_token_error.VercelOidcTokenError("project.json not found, have you linked your project with `vc link?`");
		const prj = JSON.parse(fs.readFileSync(prjPath, "utf8"));
		if (typeof prj.projectId !== "string" && typeof prj.orgId !== "string") throw new TypeError("Expected a string-valued projectId property. Try running `vc link` to re-link your project.");
		return {
			projectId: prj.projectId,
			teamId: prj.orgId
		};
	}
	function saveToken(token, projectId) {
		const dir = (0, import_token_io.getUserDataDir)();
		if (!dir) throw new import_token_error.VercelOidcTokenError("Unable to find user data directory. Please reach out to Vercel support.");
		const tokenPath = path.join(dir, "com.vercel.token", `${projectId}.json`);
		const tokenJson = JSON.stringify(token);
		fs.mkdirSync(path.dirname(tokenPath), {
			mode: 504,
			recursive: true
		});
		fs.writeFileSync(tokenPath, tokenJson);
		fs.chmodSync(tokenPath, 432);
	}
	function loadToken(projectId) {
		const dir = (0, import_token_io.getUserDataDir)();
		if (!dir) throw new import_token_error.VercelOidcTokenError("Unable to find user data directory. Please reach out to Vercel support.");
		const tokenPath = path.join(dir, "com.vercel.token", `${projectId}.json`);
		if (!fs.existsSync(tokenPath)) return null;
		const token = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
		assertVercelOidcTokenResponse(token);
		return token;
	}
	function getTokenPayload(token) {
		const tokenParts = token.split(".");
		if (tokenParts.length !== 3) throw new import_token_error.VercelOidcTokenError("Invalid token.");
		const base64 = tokenParts[1].replace(/-/g, "+").replace(/_/g, "/");
		const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, "=");
		return JSON.parse(Buffer.from(padded, "base64").toString("utf8"));
	}
	function isExpired(token, bufferMs = 0) {
		return token.exp * 1e3 < Date.now() + bufferMs;
	}
	0 && (module.exports = {
		assertVercelOidcTokenResponse,
		findProjectInfo,
		getTokenPayload,
		getVercelOidcToken,
		getVercelOidcTokenFromCli,
		getVercelToken,
		isExpired,
		loadToken,
		saveToken
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+connect@0.2.6_ai@7.0.0-beta.178_zod@4.1.11__eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11__/node_modules/@vercel/connect/dist/authorization.js
var import_dist = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var src_exports = {};
	__export(src_exports, {
		AccessTokenMissingError: () => import_auth_errors.AccessTokenMissingError,
		RefreshAccessTokenFailedError: () => import_auth_errors.RefreshAccessTokenFailedError,
		getContext: () => import_get_context.getContext,
		getVercelOidcToken: () => import_get_vercel_oidc_token_with_refresh.getVercelOidcToken,
		getVercelOidcTokenSync: () => import_get_vercel_oidc_token_sync.getVercelOidcTokenSync,
		getVercelToken: () => import_token_util.getVercelToken,
		verifyVercelOidcToken: () => import_verify_vercel_oidc_token.verifyVercelOidcToken
	});
	module.exports = __toCommonJS(src_exports);
	var import_get_vercel_oidc_token_with_refresh = require_get_vercel_oidc_token_with_refresh();
	var import_get_vercel_oidc_token_sync = require_get_vercel_oidc_token_sync();
	var import_get_context = require_get_context();
	var import_verify_vercel_oidc_token = require_verify_vercel_oidc_token();
	var import_auth_errors = require_auth_errors();
	var import_token_util = require_token_util();
	0 && (module.exports = {
		AccessTokenMissingError,
		RefreshAccessTokenFailedError,
		getContext,
		getVercelOidcToken,
		getVercelOidcTokenSync,
		getVercelToken,
		verifyVercelOidcToken
	});
})))();
async function startAuthorization(connector, params, options) {
	if (!connector) throw new Error("connector is required");
	if (options?.callbackUrl !== void 0) validateCallbackUrl(options.callbackUrl);
	if (options?.webhook !== void 0) validateWebhookUrl(options.webhook);
	const vercelToken = options?.vercelToken ?? await (0, import_dist.getVercelOidcToken)();
	const endpoint = `https://api.vercel.com/v1/connect/authorize/${encodeURIComponent(connector)}`;
	const body = {
		...params,
		...options?.callbackUrl !== void 0 && { returnUrl: options.callbackUrl },
		...options?.webhook !== void 0 && { webhook: options.webhook },
		...options?.deviceCode !== void 0 && { deviceCode: options.deviceCode },
		...options?.expiresInMs !== void 0 && { expiresInMs: options.expiresInMs }
	};
	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${vercelToken}`
		},
		body: JSON.stringify(body)
	});
	if (!response.ok) {
		let errorText;
		try {
			errorText = await response.text();
		} catch {}
		throw new Error(`Failed to start authorization: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ""}`);
	}
	return await response.json();
}
function validateCallbackUrl(value) {
	let url;
	try {
		url = new URL(value);
	} catch {
		throw new Error(`Invalid callbackUrl: ${value}`);
	}
	if (url.protocol === "https:") return;
	if (url.protocol === "http:" && (url.hostname === "localhost" || url.hostname === "127.0.0.1")) return;
	throw new Error(`callbackUrl must be https:// or http://localhost, got: ${value}`);
}
function validateWebhookUrl(value) {
	let url;
	try {
		url = new URL(value);
	} catch {
		throw new Error(`Invalid webhook URL: ${value}`);
	}
	if (url.protocol !== "https:") throw new Error(`webhook must be https://, got: ${value}`);
}
//#endregion
//#region node_modules/.pnpm/@vercel+connect@0.2.6_ai@7.0.0-beta.178_zod@4.1.11__eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11__/node_modules/@vercel/connect/dist/token.js
var ConnectError = class extends Error {
	code;
	status;
	statusText;
	vendor;
	constructor(message, options = {}) {
		super(message);
		this.name = "ConnectError";
		this.code = options.code;
		this.status = options.status;
		this.statusText = options.statusText;
		this.vendor = options.vendor;
	}
};
var NoValidTokenError = class extends ConnectError {
	constructor(message, options) {
		super(message, options);
		this.name = "NoValidTokenError";
	}
};
var UserAuthorizationRequiredError = class extends ConnectError {
	constructor(message, options) {
		super(message, options);
		this.name = "UserAuthorizationRequiredError";
	}
};
var ConnectorInstallationRequiredError = class extends ConnectError {
	constructor(message, options) {
		super(message, options);
		this.name = "ConnectorInstallationRequiredError";
	}
};
async function getToken(connector, params, options) {
	const { token } = await getTokenResponse(connector, params, options);
	return token;
}
async function getTokenResponse(connector, params, options) {
	const bufferMs = params.validityBufferMs ?? DEFAULT_VALIDITY_BUFFER_MS;
	const cacheKey = tokenCacheKey(connector, params);
	if (options?.forceRefresh) cache.delete(cacheKey);
	else {
		const cached = cache.get(cacheKey);
		if (cached) {
			const now = Date.now();
			if (cached.response.expiresAt - now > bufferMs) {
				cached.lastUsed = now;
				return cached.response;
			}
			cache.delete(cacheKey);
		}
	}
	const vercelToken = options?.vercelToken ?? await (0, import_dist.getVercelOidcToken)();
	const endpoint = `https://api.vercel.com/v1/connect/token/${encodeURIComponent(connector)}`;
	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${vercelToken}`
		},
		body: JSON.stringify(params)
	});
	if (!response.ok) throw await createConnectErrorFromResponse(response, "Failed to get token");
	const data = await response.json();
	if (cache.size >= MAX_CACHE_SIZE) evictLru();
	cache.set(cacheKey, {
		response: data,
		lastUsed: Date.now()
	});
	return data;
}
async function revokeToken(connector, params, options) {
	const vercelToken = options?.vercelToken ?? await (0, import_dist.getVercelOidcToken)();
	const endpoint = `https://api.vercel.com/v1/connect/connectors/${encodeURIComponent(connector)}/tokens`;
	const response = await fetch(endpoint, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${vercelToken}`
		},
		body: JSON.stringify(params)
	});
	if (!response.ok) throw await createConnectErrorFromResponse(response, "Failed to revoke token");
	cache.clear();
}
/**
* Remove a single cached token entry for `(connector, params)` from the
* in-process cache.
*
* Targeted counterpart to {@link revokeToken}'s `cache.clear()`: it drops
* exactly the entry {@link getTokenResponse} would serve for these
* arguments, leaving every other connector/principal untouched. Use it
* when a credential is known to be bad (the resource server rejected the
* bearer with a `401`) so the next {@link getTokenResponse} re-fetches
* instead of re-serving the rejected token — without paying for a Connect
* round trip on every call the way {@link ConnectOptions.forceRefresh}
* does.
*
* The cache key is derived from `connector` plus every field of `params`,
* so pass the same `params` used for the original {@link getTokenResponse}
* call. No-op when no matching entry exists.
*/
function deleteTokenCacheEntry(connector, params) {
	cache.delete(tokenCacheKey(connector, params));
}
const DEFAULT_VALIDITY_BUFFER_MS = 3e4;
const MAX_CACHE_SIZE = 100;
const cache = /* @__PURE__ */ new Map();
/**
* Cache key for a `(connector, params)` pair. Stable across calls with
* equal arguments so {@link getTokenResponse} and
* {@link deleteTokenCacheEntry} address the same entry.
*/
function tokenCacheKey(connector, params) {
	return JSON.stringify({
		connector,
		...params
	});
}
function evictLru() {
	let oldestKey;
	let oldestTime = Infinity;
	for (const [key, entry] of cache) if (entry.lastUsed < oldestTime) {
		oldestTime = entry.lastUsed;
		oldestKey = key;
	}
	if (oldestKey !== void 0) cache.delete(oldestKey);
}
async function createConnectErrorFromResponse(response, fallbackMessage) {
	return createConnectError(response, await readConnectErrorResponse(response), fallbackMessage);
}
function createConnectError(response, parsedError, fallbackMessage) {
	const { code, message, bodyText } = parsedError;
	const errorOptions = connectErrorOptions(response, parsedError);
	if (code === "no_token") return new NoValidTokenError(message || bodyText || "No valid token available", errorOptions);
	if (code === "user_authorization_required") return new UserAuthorizationRequiredError(message || bodyText || "User authorization is required", errorOptions);
	if (code === "client_installation_required" || code === "connector_installation_required") return new ConnectorInstallationRequiredError(message || bodyText || "Connector installation is required", errorOptions);
	return new ConnectError(buildConnectResponseErrorMessage(response, parsedError, fallbackMessage), errorOptions);
}
async function readConnectErrorResponse(response) {
	let bodyText;
	try {
		bodyText = await response.text();
	} catch {}
	if (!bodyText) return {};
	try {
		const body = JSON.parse(bodyText);
		if (!isRecord(body)) return { bodyText };
		const error = isRecord(body.error) ? body.error : isRecord(body.err) ? body.err : void 0;
		if (!error) return {
			bodyText,
			vendor: vendorPayload(body)
		};
		return {
			bodyText,
			code: typeof error.code === "string" ? error.code : void 0,
			message: typeof error.message === "string" ? error.message : void 0,
			vendor: vendorPayload(error) ?? vendorPayload(body)
		};
	} catch {
		return { bodyText };
	}
}
function connectErrorOptions(response, parsedError) {
	return {
		code: parsedError.code,
		status: response.status,
		statusText: response.statusText,
		vendor: parsedError.vendor
	};
}
function buildConnectResponseErrorMessage(response, parsedError, fallbackMessage) {
	if (parsedError.message) return parsedError.message;
	return [
		`${fallbackMessage}:`,
		`${response.status}`,
		response.statusText,
		parsedError.code ? ` - ${parsedError.code}` : "",
		parsedError.bodyText ? ` - ${parsedError.bodyText}` : ""
	].filter(Boolean).join(" ");
}
function vendorPayload(error) {
	if (isRecord(error.vendor)) return error.vendor;
	if (isRecord(error.meta) && isRecord(error.meta.vendor)) return error.meta.vendor;
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
//#endregion
//#region node_modules/.pnpm/@vercel+connect@0.2.6_ai@7.0.0-beta.178_zod@4.1.11__eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11__/node_modules/@vercel/connect/dist/eve/connection-authorization.js
/**
* Eve adapter helper for `@vercel/connect`.
*
* {@link connect} turns a Vercel Connect OAuth connector id plus a
* principal type into a ready-made Eve
* {@link AuthorizationDefinition} that the connection runtime
* consumes directly. The helper collapses the ~100 lines of
* `getToken` / `startAuthorization` / `completeAuthorization`
* boilerplate each Connect-backed connection normally writes down
* to a single call:
*
* ```ts
* import { defineMcpClientConnection } from "eve/connections";
* import { connect } from "@vercel/connect/eve";
*
* export default defineMcpClientConnection({
*   url: "https://mcp.linear.app/sse",
*   description: "Linear workspace — issues, projects, cycles, and comments.",
*   auth: connect("linear"),
* });
* ```
*
* # Module layout
*
* This entrypoint is exposed at the `@vercel/connect/eve` subpath so
* consumers that don't use Eve never load it. `eve` is
* declared as an optional peer dependency: importing
* `@vercel/connect/eve` requires Eve to be installed in the consumer
* project, but the rest of `@vercel/connect` works without it.
*/
function connect(input) {
	const options = normalizeAuthorizationOptions(input);
	const vercelConnect = { connector: options.connector };
	const evict = makeEvict(options);
	if (options.principalType === "app") return {
		...buildNonInteractiveDefinition(options),
		vercelConnect,
		evict
	};
	return {
		...buildInteractiveDefinition(options),
		vercelConnect,
		evict
	};
}
/**
* Builds the {@link EveConnectAuthorizationDefinition.evict} callback for
* a connector. Resolves the same token params {@link getToken} uses for
* `principal`, then drops exactly that cache entry — leaving every other
* principal's cached token intact.
*
* When called with `revoke: true` it instead tears the grant down at
* Vercel Connect via {@link revokeToken} (best-effort, falling back to a
* local cache drop if the revoke request fails).
*/
function makeEvict(options) {
	return async ({ principal, connection, revoke }) => {
		const params = await buildTokenParams(options, principal, connection);
		if (revoke) try {
			await revokeToken(options.connector, {
				subject: params.subject,
				installationId: params.installationId
			}, options.connectOptions);
			return;
		} catch {}
		deleteTokenCacheEntry(options.connector, params);
	};
}
function normalizeAuthorizationOptions(input) {
	if (typeof input === "string") return { connector: input };
	return input;
}
function buildInteractiveDefinition(options) {
	return {
		principalType: "user",
		async getToken({ principal, connection }) {
			try {
				const response = await getTokenResponse(options.connector, await buildTokenParams(options, principal, connection), getTokenConnectOptions(options));
				return {
					token: response.token,
					expiresAt: response.expiresAt
				};
			} catch (error) {
				throw translate(error, "getToken", options);
			}
		},
		async startAuthorization({ principal, connection, callbackUrl, webhook }) {
			try {
				const response = await startAuthorization(options.connector, await buildTokenParams(options, principal, connection), {
					...options.connectOptions,
					callbackUrl: callbackUrl ?? webhook,
					deviceCode: true
				});
				return { challenge: {
					url: response.url,
					...response.deviceCode ? { userCode: response.deviceCode } : null,
					...response.expiresAt ? { expiresAt: new Date(response.expiresAt).toISOString() } : null,
					...options.instructions ? { instructions: options.instructions } : null
				} };
			} catch (error) {
				throw translate(error, "startAuthorization", options);
			}
		},
		async completeAuthorization({ principal, connection }) {
			try {
				const response = await getTokenResponse(options.connector, await buildTokenParams(options, principal, connection), options.connectOptions);
				return {
					token: response.token,
					expiresAt: response.expiresAt
				};
			} catch (error) {
				throw translate(error, "completeAuthorization", options);
			}
		}
	};
}
function buildNonInteractiveDefinition(options) {
	return {
		principalType: "app",
		async getToken({ principal, connection }) {
			try {
				const response = await getTokenResponse(options.connector, await buildTokenParams(options, principal, connection), getTokenConnectOptions(options));
				return {
					token: response.token,
					expiresAt: response.expiresAt
				};
			} catch (error) {
				throw translate(error, "getToken", options);
			}
		}
	};
}
/**
* Connect SDK options for `getToken` calls. When {@link
* EveAuthorizationOptions.validate} is set, forces a cache-bypassing
* re-fetch so a revoked-but-unexpired grant is caught instead of served
* from the in-process token cache.
*/
function getTokenConnectOptions(options) {
	if (!options.validate) return options.connectOptions;
	return {
		...options.connectOptions,
		forceRefresh: true
	};
}
async function buildTokenParams(options, principal, connection) {
	return {
		...options.tokenParams,
		subject: await resolveSubject(options, principal, connection)
	};
}
/**
* Resolves the Vercel Connect token subject for `principal`, applying
* the documented precedence: {@link EveAuthorizationOptions.createSubject}
* (when the connection context is in hand), then the deprecated
* {@link EveAuthorizationOptions.principalToSubject}, then the default
* principal mapping.
*
* Eve's runtime passes `connection` to every authorization callback, so
* on the `getToken` / `startAuthorization` / `completeAuthorization`
* paths `createSubject` always receives it. Only the adapter's own
* `evict` entry point may run without a context (its callers predate the
* context plumbing); in that case the resolution falls back past
* `createSubject` so eviction stays best-effort instead of throwing.
*/
function resolveSubject(options, principal, connection) {
	if (options.createSubject !== void 0 && connection !== void 0) return options.createSubject(principal, connection);
	if (options.principalToSubject !== void 0) return options.principalToSubject(principal);
	return principalToSubject(principal);
}
function principalToSubject(principal) {
	if (principal.type === "app") return { type: "app" };
	return {
		type: "user",
		id: principal.id,
		issuer: principal.issuer
	};
}
/**
* Translates raw Vercel Connect errors into Eve's public
* {@link ConnectionAuthorizationRequiredError} /
* {@link ConnectionAuthorizationFailedError} classes. Eve discriminates
* on `err.name` (not `instanceof`), so even if the consumer's bundle
* loads a different copy of `eve` than this helper, the
* runtime still recognizes the throw.
*/
function translate(error, phase, options) {
	const override = options.onError?.(error, phase);
	if (override !== void 0) return override;
	if (error instanceof UserAuthorizationRequiredError || error instanceof NoValidTokenError) {
		if (options.principalType === "app") return new ConnectionAuthorizationFailedError("connect", {
			message: error.message,
			reason: "app_not_installed",
			retryable: false
		});
		if (phase === "completeAuthorization") return new ConnectionAuthorizationFailedError("connect", { message: "Authorization did not complete. Vercel Connect still reports the user as unauthorized." });
		return new ConnectionAuthorizationRequiredError("connect", { message: error.message });
	}
	if (error instanceof ConnectorInstallationRequiredError) return new ConnectionAuthorizationFailedError("connect", {
		message: error.message,
		reason: "connector_installation_required",
		retryable: false
	});
	return error instanceof Error ? error : new Error(String(error));
}
//#endregion
//#region node_modules/.pnpm/@vercel+connect@0.2.6_ai@7.0.0-beta.178_zod@4.1.11__eve@0.11.10_ai@7.0.0-beta.178_zod@4.1.11__/node_modules/@vercel/connect/dist/eve/slack-credentials.js
/**
* Build {@link SlackChannelCredentials} backed by a Vercel Connect
* connector that stores a Slack workspace's bot token.
*
* The returned `botToken` is a function form, invoked once per
* inbound webhook so the chat adapter always picks up a fresh token
* from Vercel Connect (rotation, refresh, multi-workspace tenancy
* are all handled server-side).
*
* Slack bot tokens are app-scoped — one token per workspace install,
* shared across every end-user — so this helper calls Vercel Connect
* with `subject: { type: "app" }`. End-user identity (per-user OAuth
* into Slack) is a separate concern handled elsewhere.
*
* The optional `params` and `options` arguments mirror the signature
* of {@link getToken}, allowing callers to pass through fields like
* `installationId`, `scopes`, or `validityBufferMs`.
*
* ```ts
* import { slackRoute } from "eve/channels/slack";
* import { connectSlackCredentials } from "@vercel/connect/eve";
*
* export default slackRoute({
*   credentials: connectSlackCredentials("scl_..."),
* });
* ```
*
* Multi-workspace deployments can select a specific workspace install
* via `installationId`:
*
* ```ts
* connectSlackCredentials("scl_...", { installationId: workspaceId });
* ```
*/
function connectSlackCredentials(connector, params = {}, options) {
	return {
		botToken: () => getToken(connector, {
			...params,
			subject: { type: "app" }
		}, options),
		webhookVerifier: vercelOidc()
	};
}
//#endregion
export { Ae$2 as $, Si as A, n$2 as B, G as C, Na as D, Ja as E, ja as F, s$1 as G, d$3 as H, la as I, extractErrorId as J, createErrorId as K, lo as L, Y$1 as M, _a as N, Qa as O, b as P, recordErrorOnSpan as Q, oo as R, Bo as S, Ha as T, f$3 as U, c$2 as V, l$2 as W, formatErrorHint as X, formatError as Y, logError as Z, Mr as _, isPlainRecord as _t, defineMcpClientConnection as a, be$1 as at, $a as b, normalizeAuthorizationSpec as c, i$4 as ct, ConnectionAuthorizationRequiredError as d, re$2 as dt, Ie$1 as et, isConnectionAuthorizationFailedError as f, se$2 as ft, vercelOidc as g, isObject as gt, routeAuth as h, isNonEmptyString as ht, require_token_error as i, ae$2 as it, Wa as j, Sa as k, supportsInteractiveAuthorization as l, le$2 as lt, localDev as m, G$3 as mt, connect as n, Se$1 as nt, registerDefinitionSource as o, c$3 as ot, isConnectionAuthorizationRequiredError as p, $$4 as pt, createLogger as q, require_token_util as r, Te$1 as rt, stampDefinitionKey as s, de$2 as st, connectSlackCredentials as t, Re$1 as tt, ConnectionAuthorizationFailedError as u, pe$1 as ut, p$1 as v, isThenable as vt, H$1 as w, B$1 as x, t$1 as y, Pl as z };
