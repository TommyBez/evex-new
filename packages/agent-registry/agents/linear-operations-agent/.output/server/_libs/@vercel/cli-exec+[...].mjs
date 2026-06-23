import { fileURLToPath as __eveFileURLToPath } from "node:url";
import { dirname as __eveDirname } from "node:path";
__eveDirname(__eveFileURLToPath(import.meta.url));
import { r as __require, t as __commonJSMin } from "../../_runtime.mjs";
//#region node_modules/.pnpm/@vercel+cli-exec@1.0.0/node_modules/@vercel/cli-exec/dist/errors.js
var require_errors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
	var errors_exports = {};
	__export(errors_exports, {
		VercelCliError: () => VercelCliError,
		assertValidCwd: () => assertValidCwd,
		getCliNotFoundMessage: () => getCliNotFoundMessage,
		toVercelCliError: () => toVercelCliError
	});
	module.exports = __toCommonJS(errors_exports);
	var import_promises$3 = __require("node:fs/promises");
	var VercelCliError = class extends Error {
		constructor(options) {
			super(options.message);
			this.name = "VercelCliError";
			this.code = options.code;
			this.invocation = options.invocation;
			this.stdout = options.stdout;
			this.stderr = options.stderr;
			this.exitCode = options.exitCode;
			if (options.cause !== void 0) this.cause = options.cause;
		}
	};
	function getCliNotFoundMessage(diagnostics) {
		const details = [];
		const { localBinSearch } = diagnostics;
		if (localBinSearch.stopReason === "project-root-marker") details.push(`Local bin lookup stopped at ${JSON.stringify(localBinSearch.stoppedAt)} (${JSON.stringify(localBinSearch.markerPath)}).`);
		else if (localBinSearch.stopReason === "filesystem-root") details.push(`No project root marker was found from ${JSON.stringify(localBinSearch.searchRoot)}; local bin lookup reached the filesystem root.`);
		for (const skippedNodeModules of localBinSearch.skippedNodeModules) details.push(`Skipped ${JSON.stringify(skippedNodeModules.directory)}: ${skippedNodeModules.reason}.`);
		for (const skippedLocalBin of diagnostics.skippedLocalBins) details.push(`Skipped ${JSON.stringify(skippedLocalBin.candidate)}: ${skippedLocalBin.reason}.`);
		if (details.length === 0) return "Unable to find a usable Vercel CLI installation.";
		return ["Unable to find a usable Vercel CLI installation.", ...details].join("\n");
	}
	async function assertValidCwd(cwd) {
		try {
			if (!(await (0, import_promises$3.stat)(cwd)).isDirectory()) throw new Error("not a directory");
		} catch {
			throw new VercelCliError({
				code: "VERCEL_CLI_INVALID_CWD",
				message: `Working directory ${JSON.stringify(cwd)} does not exist or is not a directory.`
			});
		}
	}
	function toVercelCliError(invocation, error) {
		if (typeof error === "object" && error !== null) {
			const execaError = error;
			if (execaError.code === "ENOENT") return new VercelCliError({
				code: "VERCEL_CLI_NOT_FOUND",
				message: `Unable to find Vercel CLI command ${JSON.stringify(invocation.command)}.`,
				invocation,
				cause: error
			});
			if (execaError.code === "EACCES" || execaError.code === "EPERM") return new VercelCliError({
				code: "VERCEL_CLI_PERMISSION_DENIED",
				message: `Permission denied while executing Vercel CLI command ${JSON.stringify(invocation.command)}.`,
				invocation,
				cause: error
			});
			if (execaError.timedOut) return new VercelCliError({
				code: "VERCEL_CLI_TIMED_OUT",
				message: `Timed out while executing Vercel CLI command ${JSON.stringify(invocation.command)}.`,
				invocation,
				stdout: execaError.stdout,
				stderr: execaError.stderr,
				cause: error
			});
			if (execaError.isCanceled) return new VercelCliError({
				code: "VERCEL_CLI_CANCELED",
				message: `Canceled while executing Vercel CLI command ${JSON.stringify(invocation.command)}.`,
				invocation,
				stdout: execaError.stdout,
				stderr: execaError.stderr,
				cause: error
			});
			if (execaError.signal) return new VercelCliError({
				code: "VERCEL_CLI_SIGNALED",
				message: `Vercel CLI command ${JSON.stringify(invocation.command)} exited due to signal ${execaError.signal}.`,
				invocation,
				stdout: execaError.stdout,
				stderr: execaError.stderr,
				cause: error
			});
			if (typeof execaError.exitCode === "number") return new VercelCliError({
				code: "VERCEL_CLI_ERRORED",
				message: execaError.shortMessage ?? execaError.message ?? `Vercel CLI command ${JSON.stringify(invocation.command)} exited with code ${execaError.exitCode}.`,
				invocation,
				stdout: execaError.stdout,
				stderr: execaError.stderr,
				exitCode: execaError.exitCode,
				cause: error
			});
		}
		return new VercelCliError({
			code: "VERCEL_CLI_EXEC_FAILED",
			message: `Could not execute Vercel CLI command ${JSON.stringify(invocation.command)}.`,
			invocation,
			cause: error
		});
	}
	0 && (module.exports = {
		VercelCliError,
		assertValidCwd,
		getCliNotFoundMessage,
		toVercelCliError
	});
}));
//#endregion
//#region node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js
var require_windows = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = isexe;
	isexe.sync = sync;
	var fs$2 = __require("fs");
	function checkPathExt(path, options) {
		var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
		if (!pathext) return true;
		pathext = pathext.split(";");
		if (pathext.indexOf("") !== -1) return true;
		for (var i = 0; i < pathext.length; i++) {
			var p = pathext[i].toLowerCase();
			if (p && path.substr(-p.length).toLowerCase() === p) return true;
		}
		return false;
	}
	function checkStat(stat, path, options) {
		if (!stat.isSymbolicLink() && !stat.isFile()) return false;
		return checkPathExt(path, options);
	}
	function isexe(path, options, cb) {
		fs$2.stat(path, function(er, stat) {
			cb(er, er ? false : checkStat(stat, path, options));
		});
	}
	function sync(path, options) {
		return checkStat(fs$2.statSync(path), path, options);
	}
}));
//#endregion
//#region node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js
var require_mode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = isexe;
	isexe.sync = sync;
	var fs$1 = __require("fs");
	function isexe(path, options, cb) {
		fs$1.stat(path, function(er, stat) {
			cb(er, er ? false : checkStat(stat, options));
		});
	}
	function sync(path, options) {
		return checkStat(fs$1.statSync(path), options);
	}
	function checkStat(stat, options) {
		return stat.isFile() && checkMode(stat, options);
	}
	function checkMode(stat, options) {
		var mod = stat.mode;
		var uid = stat.uid;
		var gid = stat.gid;
		var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
		var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
		var u = parseInt("100", 8);
		var g = parseInt("010", 8);
		var o = parseInt("001", 8);
		var ug = u | g;
		return mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
	}
}));
//#endregion
//#region node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js
var require_isexe = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	__require("fs");
	var core;
	if (process.platform === "win32" || global.TESTING_WINDOWS) core = require_windows();
	else core = require_mode();
	module.exports = isexe;
	isexe.sync = sync;
	function isexe(path, options, cb) {
		if (typeof options === "function") {
			cb = options;
			options = {};
		}
		if (!cb) {
			if (typeof Promise !== "function") throw new TypeError("callback not provided");
			return new Promise(function(resolve, reject) {
				isexe(path, options || {}, function(er, is) {
					if (er) reject(er);
					else resolve(is);
				});
			});
		}
		core(path, options || {}, function(er, is) {
			if (er) {
				if (er.code === "EACCES" || options && options.ignoreErrors) {
					er = null;
					is = false;
				}
			}
			cb(er, is);
		});
	}
	function sync(path, options) {
		try {
			return core.sync(path, options || {});
		} catch (er) {
			if (options && options.ignoreErrors || er.code === "EACCES") return false;
			else throw er;
		}
	}
}));
//#endregion
//#region node_modules/.pnpm/which@2.0.2/node_modules/which/which.js
var require_which = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
	const path$4 = __require("path");
	const COLON = isWindows ? ";" : ":";
	const isexe = require_isexe();
	const getNotFoundError = (cmd) => Object.assign(/* @__PURE__ */ new Error(`not found: ${cmd}`), { code: "ENOENT" });
	const getPathInfo = (cmd, opt) => {
		const colon = opt.colon || COLON;
		const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [...isWindows ? [process.cwd()] : [], ...(opt.path || process.env.PATH || "").split(colon)];
		const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
		const pathExt = isWindows ? pathExtExe.split(colon) : [""];
		if (isWindows) {
			if (cmd.indexOf(".") !== -1 && pathExt[0] !== "") pathExt.unshift("");
		}
		return {
			pathEnv,
			pathExt,
			pathExtExe
		};
	};
	const which = (cmd, opt, cb) => {
		if (typeof opt === "function") {
			cb = opt;
			opt = {};
		}
		if (!opt) opt = {};
		const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
		const found = [];
		const step = (i) => new Promise((resolve, reject) => {
			if (i === pathEnv.length) return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
			const ppRaw = pathEnv[i];
			const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
			const pCmd = path$4.join(pathPart, cmd);
			resolve(subStep(!pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd, i, 0));
		});
		const subStep = (p, i, ii) => new Promise((resolve, reject) => {
			if (ii === pathExt.length) return resolve(step(i + 1));
			const ext = pathExt[ii];
			isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
				if (!er && is) if (opt.all) found.push(p + ext);
				else return resolve(p + ext);
				return resolve(subStep(p, i, ii + 1));
			});
		});
		return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
	};
	const whichSync = (cmd, opt) => {
		opt = opt || {};
		const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
		const found = [];
		for (let i = 0; i < pathEnv.length; i++) {
			const ppRaw = pathEnv[i];
			const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
			const pCmd = path$4.join(pathPart, cmd);
			const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
			for (let j = 0; j < pathExt.length; j++) {
				const cur = p + pathExt[j];
				try {
					if (isexe.sync(cur, { pathExt: pathExtExe })) if (opt.all) found.push(cur);
					else return cur;
				} catch (ex) {}
			}
		}
		if (opt.all && found.length) return found;
		if (opt.nothrow) return null;
		throw getNotFoundError(cmd);
	};
	module.exports = which;
	which.sync = whichSync;
}));
//#endregion
//#region node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js
var require_path_key = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const pathKey = (options = {}) => {
		const environment = options.env || process.env;
		if ((options.platform || process.platform) !== "win32") return "PATH";
		return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
	};
	module.exports = pathKey;
	module.exports.default = pathKey;
}));
//#endregion
//#region node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const path$3 = __require("path");
	const which = require_which();
	const getPathKey = require_path_key();
	function resolveCommandAttempt(parsed, withoutPathExt) {
		const env = parsed.options.env || process.env;
		const cwd = process.cwd();
		const hasCustomCwd = parsed.options.cwd != null;
		const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
		if (shouldSwitchCwd) try {
			process.chdir(parsed.options.cwd);
		} catch (err) {}
		let resolved;
		try {
			resolved = which.sync(parsed.command, {
				path: env[getPathKey({ env })],
				pathExt: withoutPathExt ? path$3.delimiter : void 0
			});
		} catch (e) {} finally {
			if (shouldSwitchCwd) process.chdir(cwd);
		}
		if (resolved) resolved = path$3.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
		return resolved;
	}
	function resolveCommand(parsed) {
		return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
	}
	module.exports = resolveCommand;
}));
//#endregion
//#region node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/escape.js
var require_escape = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
	function escapeCommand(arg) {
		arg = arg.replace(metaCharsRegExp, "^$1");
		return arg;
	}
	function escapeArgument(arg, doubleEscapeMetaChars) {
		arg = `${arg}`;
		arg = arg.replace(/(?=(\\+?)?)\1"/g, "$1$1\\\"");
		arg = arg.replace(/(?=(\\+?)?)\1$/, "$1$1");
		arg = `"${arg}"`;
		arg = arg.replace(metaCharsRegExp, "^$1");
		if (doubleEscapeMetaChars) arg = arg.replace(metaCharsRegExp, "^$1");
		return arg;
	}
	module.exports.command = escapeCommand;
	module.exports.argument = escapeArgument;
}));
//#endregion
//#region node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js
var require_shebang_regex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = /^#!(.*)/;
}));
//#endregion
//#region node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js
var require_shebang_command = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const shebangRegex = require_shebang_regex();
	module.exports = (string = "") => {
		const match = string.match(shebangRegex);
		if (!match) return null;
		const [path, argument] = match[0].replace(/#! ?/, "").split(" ");
		const binary = path.split("/").pop();
		if (binary === "env") return argument;
		return argument ? `${binary} ${argument}` : binary;
	};
}));
//#endregion
//#region node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const fs = __require("fs");
	const shebangCommand = require_shebang_command();
	function readShebang(command) {
		const size = 150;
		const buffer = Buffer.alloc(size);
		let fd;
		try {
			fd = fs.openSync(command, "r");
			fs.readSync(fd, buffer, 0, size, 0);
			fs.closeSync(fd);
		} catch (e) {}
		return shebangCommand(buffer.toString());
	}
	module.exports = readShebang;
}));
//#endregion
//#region node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/parse.js
var require_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const path$2 = __require("path");
	const resolveCommand = require_resolveCommand();
	const escape = require_escape();
	const readShebang = require_readShebang();
	const isWin = process.platform === "win32";
	const isExecutableRegExp = /\.(?:com|exe)$/i;
	const isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
	function detectShebang(parsed) {
		parsed.file = resolveCommand(parsed);
		const shebang = parsed.file && readShebang(parsed.file);
		if (shebang) {
			parsed.args.unshift(parsed.file);
			parsed.command = shebang;
			return resolveCommand(parsed);
		}
		return parsed.file;
	}
	function parseNonShell(parsed) {
		if (!isWin) return parsed;
		const commandFile = detectShebang(parsed);
		const needsShell = !isExecutableRegExp.test(commandFile);
		if (parsed.options.forceShell || needsShell) {
			const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
			parsed.command = path$2.normalize(parsed.command);
			parsed.command = escape.command(parsed.command);
			parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
			parsed.args = [
				"/d",
				"/s",
				"/c",
				`"${[parsed.command].concat(parsed.args).join(" ")}"`
			];
			parsed.command = process.env.comspec || "cmd.exe";
			parsed.options.windowsVerbatimArguments = true;
		}
		return parsed;
	}
	function parse(command, args, options) {
		if (args && !Array.isArray(args)) {
			options = args;
			args = null;
		}
		args = args ? args.slice(0) : [];
		options = Object.assign({}, options);
		const parsed = {
			command,
			args,
			options,
			file: void 0,
			original: {
				command,
				args
			}
		};
		return options.shell ? parsed : parseNonShell(parsed);
	}
	module.exports = parse;
}));
//#endregion
//#region node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/lib/enoent.js
var require_enoent = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const isWin = process.platform === "win32";
	function notFoundError(original, syscall) {
		return Object.assign(/* @__PURE__ */ new Error(`${syscall} ${original.command} ENOENT`), {
			code: "ENOENT",
			errno: "ENOENT",
			syscall: `${syscall} ${original.command}`,
			path: original.command,
			spawnargs: original.args
		});
	}
	function hookChildProcess(cp, parsed) {
		if (!isWin) return;
		const originalEmit = cp.emit;
		cp.emit = function(name, arg1) {
			if (name === "exit") {
				const err = verifyENOENT(arg1, parsed);
				if (err) return originalEmit.call(cp, "error", err);
			}
			return originalEmit.apply(cp, arguments);
		};
	}
	function verifyENOENT(status, parsed) {
		if (isWin && status === 1 && !parsed.file) return notFoundError(parsed.original, "spawn");
		return null;
	}
	function verifyENOENTSync(status, parsed) {
		if (isWin && status === 1 && !parsed.file) return notFoundError(parsed.original, "spawnSync");
		return null;
	}
	module.exports = {
		hookChildProcess,
		verifyENOENT,
		verifyENOENTSync,
		notFoundError
	};
}));
//#endregion
//#region node_modules/.pnpm/cross-spawn@7.0.6/node_modules/cross-spawn/index.js
var require_cross_spawn = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const cp = __require("child_process");
	const parse = require_parse();
	const enoent = require_enoent();
	function spawn(command, args, options) {
		const parsed = parse(command, args, options);
		const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
		enoent.hookChildProcess(spawned, parsed);
		return spawned;
	}
	function spawnSync(command, args, options) {
		const parsed = parse(command, args, options);
		const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
		result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
		return result;
	}
	module.exports = spawn;
	module.exports.spawn = spawn;
	module.exports.sync = spawnSync;
	module.exports._parse = parse;
	module.exports._enoent = enoent;
}));
//#endregion
//#region node_modules/.pnpm/strip-final-newline@2.0.0/node_modules/strip-final-newline/index.js
var require_strip_final_newline = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = (input) => {
		const LF = typeof input === "string" ? "\n" : "\n".charCodeAt();
		const CR = typeof input === "string" ? "\r" : "\r".charCodeAt();
		if (input[input.length - 1] === LF) input = input.slice(0, input.length - 1);
		if (input[input.length - 1] === CR) input = input.slice(0, input.length - 1);
		return input;
	};
}));
//#endregion
//#region node_modules/.pnpm/npm-run-path@4.0.1/node_modules/npm-run-path/index.js
var require_npm_run_path = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const path$1 = __require("path");
	const pathKey = require_path_key();
	const npmRunPath = (options) => {
		options = {
			cwd: process.cwd(),
			path: process.env[pathKey()],
			execPath: process.execPath,
			...options
		};
		let previous;
		let cwdPath = path$1.resolve(options.cwd);
		const result = [];
		while (previous !== cwdPath) {
			result.push(path$1.join(cwdPath, "node_modules/.bin"));
			previous = cwdPath;
			cwdPath = path$1.resolve(cwdPath, "..");
		}
		const execPathDir = path$1.resolve(options.cwd, options.execPath, "..");
		result.push(execPathDir);
		return result.concat(options.path).join(path$1.delimiter);
	};
	module.exports = npmRunPath;
	module.exports.default = npmRunPath;
	module.exports.env = (options) => {
		options = {
			env: process.env,
			...options
		};
		const env = { ...options.env };
		const path = pathKey({ env });
		options.path = env[path];
		env[path] = module.exports(options);
		return env;
	};
}));
//#endregion
//#region node_modules/.pnpm/mimic-fn@2.1.0/node_modules/mimic-fn/index.js
var require_mimic_fn = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const mimicFn = (to, from) => {
		for (const prop of Reflect.ownKeys(from)) Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
		return to;
	};
	module.exports = mimicFn;
	module.exports.default = mimicFn;
}));
//#endregion
//#region node_modules/.pnpm/onetime@5.1.2/node_modules/onetime/index.js
var require_onetime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const mimicFn = require_mimic_fn();
	const calledFunctions = /* @__PURE__ */ new WeakMap();
	const onetime = (function_, options = {}) => {
		if (typeof function_ !== "function") throw new TypeError("Expected a function");
		let returnValue;
		let callCount = 0;
		const functionName = function_.displayName || function_.name || "<anonymous>";
		const onetime = function(...arguments_) {
			calledFunctions.set(onetime, ++callCount);
			if (callCount === 1) {
				returnValue = function_.apply(this, arguments_);
				function_ = null;
			} else if (options.throw === true) throw new Error(`Function \`${functionName}\` can only be called once`);
			return returnValue;
		};
		mimicFn(onetime, function_);
		calledFunctions.set(onetime, callCount);
		return onetime;
	};
	module.exports = onetime;
	module.exports.default = onetime;
	module.exports.callCount = (function_) => {
		if (!calledFunctions.has(function_)) throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
		return calledFunctions.get(function_);
	};
}));
//#endregion
//#region node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/core.js
var require_core = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SIGNALS = void 0;
	exports.SIGNALS = [
		{
			name: "SIGHUP",
			number: 1,
			action: "terminate",
			description: "Terminal closed",
			standard: "posix"
		},
		{
			name: "SIGINT",
			number: 2,
			action: "terminate",
			description: "User interruption with CTRL-C",
			standard: "ansi"
		},
		{
			name: "SIGQUIT",
			number: 3,
			action: "core",
			description: "User interruption with CTRL-\\",
			standard: "posix"
		},
		{
			name: "SIGILL",
			number: 4,
			action: "core",
			description: "Invalid machine instruction",
			standard: "ansi"
		},
		{
			name: "SIGTRAP",
			number: 5,
			action: "core",
			description: "Debugger breakpoint",
			standard: "posix"
		},
		{
			name: "SIGABRT",
			number: 6,
			action: "core",
			description: "Aborted",
			standard: "ansi"
		},
		{
			name: "SIGIOT",
			number: 6,
			action: "core",
			description: "Aborted",
			standard: "bsd"
		},
		{
			name: "SIGBUS",
			number: 7,
			action: "core",
			description: "Bus error due to misaligned, non-existing address or paging error",
			standard: "bsd"
		},
		{
			name: "SIGEMT",
			number: 7,
			action: "terminate",
			description: "Command should be emulated but is not implemented",
			standard: "other"
		},
		{
			name: "SIGFPE",
			number: 8,
			action: "core",
			description: "Floating point arithmetic error",
			standard: "ansi"
		},
		{
			name: "SIGKILL",
			number: 9,
			action: "terminate",
			description: "Forced termination",
			standard: "posix",
			forced: true
		},
		{
			name: "SIGUSR1",
			number: 10,
			action: "terminate",
			description: "Application-specific signal",
			standard: "posix"
		},
		{
			name: "SIGSEGV",
			number: 11,
			action: "core",
			description: "Segmentation fault",
			standard: "ansi"
		},
		{
			name: "SIGUSR2",
			number: 12,
			action: "terminate",
			description: "Application-specific signal",
			standard: "posix"
		},
		{
			name: "SIGPIPE",
			number: 13,
			action: "terminate",
			description: "Broken pipe or socket",
			standard: "posix"
		},
		{
			name: "SIGALRM",
			number: 14,
			action: "terminate",
			description: "Timeout or timer",
			standard: "posix"
		},
		{
			name: "SIGTERM",
			number: 15,
			action: "terminate",
			description: "Termination",
			standard: "ansi"
		},
		{
			name: "SIGSTKFLT",
			number: 16,
			action: "terminate",
			description: "Stack is empty or overflowed",
			standard: "other"
		},
		{
			name: "SIGCHLD",
			number: 17,
			action: "ignore",
			description: "Child process terminated, paused or unpaused",
			standard: "posix"
		},
		{
			name: "SIGCLD",
			number: 17,
			action: "ignore",
			description: "Child process terminated, paused or unpaused",
			standard: "other"
		},
		{
			name: "SIGCONT",
			number: 18,
			action: "unpause",
			description: "Unpaused",
			standard: "posix",
			forced: true
		},
		{
			name: "SIGSTOP",
			number: 19,
			action: "pause",
			description: "Paused",
			standard: "posix",
			forced: true
		},
		{
			name: "SIGTSTP",
			number: 20,
			action: "pause",
			description: "Paused using CTRL-Z or \"suspend\"",
			standard: "posix"
		},
		{
			name: "SIGTTIN",
			number: 21,
			action: "pause",
			description: "Background process cannot read terminal input",
			standard: "posix"
		},
		{
			name: "SIGBREAK",
			number: 21,
			action: "terminate",
			description: "User interruption with CTRL-BREAK",
			standard: "other"
		},
		{
			name: "SIGTTOU",
			number: 22,
			action: "pause",
			description: "Background process cannot write to terminal output",
			standard: "posix"
		},
		{
			name: "SIGURG",
			number: 23,
			action: "ignore",
			description: "Socket received out-of-band data",
			standard: "bsd"
		},
		{
			name: "SIGXCPU",
			number: 24,
			action: "core",
			description: "Process timed out",
			standard: "bsd"
		},
		{
			name: "SIGXFSZ",
			number: 25,
			action: "core",
			description: "File too big",
			standard: "bsd"
		},
		{
			name: "SIGVTALRM",
			number: 26,
			action: "terminate",
			description: "Timeout or timer",
			standard: "bsd"
		},
		{
			name: "SIGPROF",
			number: 27,
			action: "terminate",
			description: "Timeout or timer",
			standard: "bsd"
		},
		{
			name: "SIGWINCH",
			number: 28,
			action: "ignore",
			description: "Terminal window size changed",
			standard: "bsd"
		},
		{
			name: "SIGIO",
			number: 29,
			action: "terminate",
			description: "I/O is available",
			standard: "other"
		},
		{
			name: "SIGPOLL",
			number: 29,
			action: "terminate",
			description: "Watched event",
			standard: "other"
		},
		{
			name: "SIGINFO",
			number: 29,
			action: "ignore",
			description: "Request for process information",
			standard: "other"
		},
		{
			name: "SIGPWR",
			number: 30,
			action: "terminate",
			description: "Device running out of power",
			standard: "systemv"
		},
		{
			name: "SIGSYS",
			number: 31,
			action: "core",
			description: "Invalid system call",
			standard: "other"
		},
		{
			name: "SIGUNUSED",
			number: 31,
			action: "terminate",
			description: "Invalid system call",
			standard: "other"
		}
	];
}));
//#endregion
//#region node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/realtime.js
var require_realtime = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SIGRTMAX = exports.getRealtimeSignals = void 0;
	const getRealtimeSignals = function() {
		const length = SIGRTMAX - SIGRTMIN + 1;
		return Array.from({ length }, getRealtimeSignal);
	};
	exports.getRealtimeSignals = getRealtimeSignals;
	const getRealtimeSignal = function(value, index) {
		return {
			name: `SIGRT${index + 1}`,
			number: SIGRTMIN + index,
			action: "terminate",
			description: "Application-specific signal (realtime)",
			standard: "posix"
		};
	};
	const SIGRTMIN = 34;
	const SIGRTMAX = 64;
	exports.SIGRTMAX = SIGRTMAX;
}));
//#endregion
//#region node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/signals.js
var require_signals$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getSignals = void 0;
	var _os$1 = __require("os");
	var _core = require_core();
	var _realtime = require_realtime();
	const getSignals = function() {
		const realtimeSignals = (0, _realtime.getRealtimeSignals)();
		return [..._core.SIGNALS, ...realtimeSignals].map(normalizeSignal);
	};
	exports.getSignals = getSignals;
	const normalizeSignal = function({ name, number: defaultNumber, description, action, forced = false, standard }) {
		const { signals: { [name]: constantSignal } } = _os$1.constants;
		const supported = constantSignal !== void 0;
		return {
			name,
			number: supported ? constantSignal : defaultNumber,
			description,
			supported,
			action,
			forced,
			standard
		};
	};
}));
//#endregion
//#region node_modules/.pnpm/human-signals@2.1.0/node_modules/human-signals/build/src/main.js
var require_main = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.signalsByNumber = exports.signalsByName = void 0;
	var _os = __require("os");
	var _signals = require_signals$1();
	var _realtime = require_realtime();
	const getSignalsByName = function() {
		return (0, _signals.getSignals)().reduce(getSignalByName, {});
	};
	const getSignalByName = function(signalByNameMemo, { name, number, description, supported, action, forced, standard }) {
		return {
			...signalByNameMemo,
			[name]: {
				name,
				number,
				description,
				supported,
				action,
				forced,
				standard
			}
		};
	};
	exports.signalsByName = getSignalsByName();
	const getSignalsByNumber = function() {
		const signals = (0, _signals.getSignals)();
		const length = _realtime.SIGRTMAX + 1;
		const signalsA = Array.from({ length }, (value, number) => getSignalByNumber(number, signals));
		return Object.assign({}, ...signalsA);
	};
	const getSignalByNumber = function(number, signals) {
		const signal = findSignalByNumber(number, signals);
		if (signal === void 0) return {};
		const { name, description, supported, action, forced, standard } = signal;
		return { [number]: {
			name,
			number,
			description,
			supported,
			action,
			forced,
			standard
		} };
	};
	const findSignalByNumber = function(number, signals) {
		const signal = signals.find(({ name }) => _os.constants.signals[name] === number);
		if (signal !== void 0) return signal;
		return signals.find((signalA) => signalA.number === number);
	};
	exports.signalsByNumber = getSignalsByNumber();
}));
//#endregion
//#region node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/error.js
var require_error = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { signalsByName } = require_main();
	const getErrorPrefix = ({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled }) => {
		if (timedOut) return `timed out after ${timeout} milliseconds`;
		if (isCanceled) return "was canceled";
		if (errorCode !== void 0) return `failed with ${errorCode}`;
		if (signal !== void 0) return `was killed with ${signal} (${signalDescription})`;
		if (exitCode !== void 0) return `failed with exit code ${exitCode}`;
		return "failed";
	};
	const makeError = ({ stdout, stderr, all, error, signal, exitCode, command, escapedCommand, timedOut, isCanceled, killed, parsed: { options: { timeout } } }) => {
		exitCode = exitCode === null ? void 0 : exitCode;
		signal = signal === null ? void 0 : signal;
		const signalDescription = signal === void 0 ? void 0 : signalsByName[signal].description;
		const execaMessage = `Command ${getErrorPrefix({
			timedOut,
			timeout,
			errorCode: error && error.code,
			signal,
			signalDescription,
			exitCode,
			isCanceled
		})}: ${command}`;
		const isError = Object.prototype.toString.call(error) === "[object Error]";
		const shortMessage = isError ? `${execaMessage}\n${error.message}` : execaMessage;
		const message = [
			shortMessage,
			stderr,
			stdout
		].filter(Boolean).join("\n");
		if (isError) {
			error.originalMessage = error.message;
			error.message = message;
		} else error = new Error(message);
		error.shortMessage = shortMessage;
		error.command = command;
		error.escapedCommand = escapedCommand;
		error.exitCode = exitCode;
		error.signal = signal;
		error.signalDescription = signalDescription;
		error.stdout = stdout;
		error.stderr = stderr;
		if (all !== void 0) error.all = all;
		if ("bufferedData" in error) delete error.bufferedData;
		error.failed = true;
		error.timedOut = Boolean(timedOut);
		error.isCanceled = isCanceled;
		error.killed = killed && !timedOut;
		return error;
	};
	module.exports = makeError;
}));
//#endregion
//#region node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/stdio.js
var require_stdio = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const aliases = [
		"stdin",
		"stdout",
		"stderr"
	];
	const hasAlias = (options) => aliases.some((alias) => options[alias] !== void 0);
	const normalizeStdio = (options) => {
		if (!options) return;
		const { stdio } = options;
		if (stdio === void 0) return aliases.map((alias) => options[alias]);
		if (hasAlias(options)) throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map((alias) => `\`${alias}\``).join(", ")}`);
		if (typeof stdio === "string") return stdio;
		if (!Array.isArray(stdio)) throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
		const length = Math.max(stdio.length, aliases.length);
		return Array.from({ length }, (value, index) => stdio[index]);
	};
	module.exports = normalizeStdio;
	module.exports.node = (options) => {
		const stdio = normalizeStdio(options);
		if (stdio === "ipc") return "ipc";
		if (stdio === void 0 || typeof stdio === "string") return [
			stdio,
			stdio,
			stdio,
			"ipc"
		];
		if (stdio.includes("ipc")) return stdio;
		return [...stdio, "ipc"];
	};
}));
//#endregion
//#region node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/signals.js
var require_signals = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = [
		"SIGABRT",
		"SIGALRM",
		"SIGHUP",
		"SIGINT",
		"SIGTERM"
	];
	if (process.platform !== "win32") module.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
	if (process.platform === "linux") module.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
}));
//#endregion
//#region node_modules/.pnpm/signal-exit@3.0.7/node_modules/signal-exit/index.js
var require_signal_exit = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var process = global.process;
	const processOk = function(process) {
		return process && typeof process === "object" && typeof process.removeListener === "function" && typeof process.emit === "function" && typeof process.reallyExit === "function" && typeof process.listeners === "function" && typeof process.kill === "function" && typeof process.pid === "number" && typeof process.on === "function";
	};
	/* istanbul ignore if */
	if (!processOk(process)) module.exports = function() {
		return function() {};
	};
	else {
		var assert = __require("assert");
		var signals = require_signals();
		var isWin = /^win/i.test(process.platform);
		var EE = __require("events");
		/* istanbul ignore if */
		if (typeof EE !== "function") EE = EE.EventEmitter;
		var emitter;
		if (process.__signal_exit_emitter__) emitter = process.__signal_exit_emitter__;
		else {
			emitter = process.__signal_exit_emitter__ = new EE();
			emitter.count = 0;
			emitter.emitted = {};
		}
		if (!emitter.infinite) {
			emitter.setMaxListeners(Infinity);
			emitter.infinite = true;
		}
		module.exports = function(cb, opts) {
			/* istanbul ignore if */
			if (!processOk(global.process)) return function() {};
			assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
			if (loaded === false) load();
			var ev = "exit";
			if (opts && opts.alwaysLast) ev = "afterexit";
			var remove = function() {
				emitter.removeListener(ev, cb);
				if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) unload();
			};
			emitter.on(ev, cb);
			return remove;
		};
		var unload = function unload() {
			if (!loaded || !processOk(global.process)) return;
			loaded = false;
			signals.forEach(function(sig) {
				try {
					process.removeListener(sig, sigListeners[sig]);
				} catch (er) {}
			});
			process.emit = originalProcessEmit;
			process.reallyExit = originalProcessReallyExit;
			emitter.count -= 1;
		};
		module.exports.unload = unload;
		var emit = function emit(event, code, signal) {
			/* istanbul ignore if */
			if (emitter.emitted[event]) return;
			emitter.emitted[event] = true;
			emitter.emit(event, code, signal);
		};
		var sigListeners = {};
		signals.forEach(function(sig) {
			sigListeners[sig] = function listener() {
				/* istanbul ignore if */
				if (!processOk(global.process)) return;
				if (process.listeners(sig).length === emitter.count) {
					unload();
					emit("exit", null, sig);
					/* istanbul ignore next */
					emit("afterexit", null, sig);
					/* istanbul ignore next */
					if (isWin && sig === "SIGHUP") sig = "SIGINT";
					/* istanbul ignore next */
					process.kill(process.pid, sig);
				}
			};
		});
		module.exports.signals = function() {
			return signals;
		};
		var loaded = false;
		var load = function load() {
			if (loaded || !processOk(global.process)) return;
			loaded = true;
			emitter.count += 1;
			signals = signals.filter(function(sig) {
				try {
					process.on(sig, sigListeners[sig]);
					return true;
				} catch (er) {
					return false;
				}
			});
			process.emit = processEmit;
			process.reallyExit = processReallyExit;
		};
		module.exports.load = load;
		var originalProcessReallyExit = process.reallyExit;
		var processReallyExit = function processReallyExit(code) {
			/* istanbul ignore if */
			if (!processOk(global.process)) return;
			process.exitCode = code || 0;
			emit("exit", process.exitCode, null);
			/* istanbul ignore next */
			emit("afterexit", process.exitCode, null);
			/* istanbul ignore next */
			originalProcessReallyExit.call(process, process.exitCode);
		};
		var originalProcessEmit = process.emit;
		var processEmit = function processEmit(ev, arg) {
			if (ev === "exit" && processOk(global.process)) {
				/* istanbul ignore else */
				if (arg !== void 0) process.exitCode = arg;
				var ret = originalProcessEmit.apply(this, arguments);
				/* istanbul ignore next */
				emit("exit", process.exitCode, null);
				/* istanbul ignore next */
				emit("afterexit", process.exitCode, null);
				/* istanbul ignore next */
				return ret;
			} else return originalProcessEmit.apply(this, arguments);
		};
	}
}));
//#endregion
//#region node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/kill.js
var require_kill = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const os = __require("os");
	const onExit = require_signal_exit();
	const DEFAULT_FORCE_KILL_TIMEOUT = 1e3 * 5;
	const spawnedKill = (kill, signal = "SIGTERM", options = {}) => {
		const killResult = kill(signal);
		setKillTimeout(kill, signal, options, killResult);
		return killResult;
	};
	const setKillTimeout = (kill, signal, options, killResult) => {
		if (!shouldForceKill(signal, options, killResult)) return;
		const timeout = getForceKillAfterTimeout(options);
		const t = setTimeout(() => {
			kill("SIGKILL");
		}, timeout);
		// istanbul ignore else
		if (t.unref) t.unref();
	};
	const shouldForceKill = (signal, { forceKillAfterTimeout }, killResult) => {
		return isSigterm(signal) && forceKillAfterTimeout !== false && killResult;
	};
	const isSigterm = (signal) => {
		return signal === os.constants.signals.SIGTERM || typeof signal === "string" && signal.toUpperCase() === "SIGTERM";
	};
	const getForceKillAfterTimeout = ({ forceKillAfterTimeout = true }) => {
		if (forceKillAfterTimeout === true) return DEFAULT_FORCE_KILL_TIMEOUT;
		if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
		return forceKillAfterTimeout;
	};
	const spawnedCancel = (spawned, context) => {
		if (spawned.kill()) context.isCanceled = true;
	};
	const timeoutKill = (spawned, signal, reject) => {
		spawned.kill(signal);
		reject(Object.assign(/* @__PURE__ */ new Error("Timed out"), {
			timedOut: true,
			signal
		}));
	};
	const setupTimeout = (spawned, { timeout, killSignal = "SIGTERM" }, spawnedPromise) => {
		if (timeout === 0 || timeout === void 0) return spawnedPromise;
		let timeoutId;
		const timeoutPromise = new Promise((resolve, reject) => {
			timeoutId = setTimeout(() => {
				timeoutKill(spawned, killSignal, reject);
			}, timeout);
		});
		const safeSpawnedPromise = spawnedPromise.finally(() => {
			clearTimeout(timeoutId);
		});
		return Promise.race([timeoutPromise, safeSpawnedPromise]);
	};
	const validateTimeout = ({ timeout }) => {
		if (timeout !== void 0 && (!Number.isFinite(timeout) || timeout < 0)) throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
	};
	const setExitHandler = async (spawned, { cleanup, detached }, timedPromise) => {
		if (!cleanup || detached) return timedPromise;
		const removeExitHandler = onExit(() => {
			spawned.kill();
		});
		return timedPromise.finally(() => {
			removeExitHandler();
		});
	};
	module.exports = {
		spawnedKill,
		spawnedCancel,
		setupTimeout,
		validateTimeout,
		setExitHandler
	};
}));
//#endregion
//#region node_modules/.pnpm/is-stream@2.0.1/node_modules/is-stream/index.js
var require_is_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const isStream = (stream) => stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
	isStream.writable = (stream) => isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
	isStream.readable = (stream) => isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
	isStream.duplex = (stream) => isStream.writable(stream) && isStream.readable(stream);
	isStream.transform = (stream) => isStream.duplex(stream) && typeof stream._transform === "function";
	module.exports = isStream;
}));
//#endregion
//#region node_modules/.pnpm/get-stream@6.0.1/node_modules/get-stream/buffer-stream.js
var require_buffer_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { PassThrough: PassThroughStream } = __require("stream");
	module.exports = (options) => {
		options = { ...options };
		const { array } = options;
		let { encoding } = options;
		const isBuffer = encoding === "buffer";
		let objectMode = false;
		if (array) objectMode = !(encoding || isBuffer);
		else encoding = encoding || "utf8";
		if (isBuffer) encoding = null;
		const stream = new PassThroughStream({ objectMode });
		if (encoding) stream.setEncoding(encoding);
		let length = 0;
		const chunks = [];
		stream.on("data", (chunk) => {
			chunks.push(chunk);
			if (objectMode) length = chunks.length;
			else length += chunk.length;
		});
		stream.getBufferedValue = () => {
			if (array) return chunks;
			return isBuffer ? Buffer.concat(chunks, length) : chunks.join("");
		};
		stream.getBufferedLength = () => length;
		return stream;
	};
}));
//#endregion
//#region node_modules/.pnpm/get-stream@6.0.1/node_modules/get-stream/index.js
var require_get_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { constants: BufferConstants } = __require("buffer");
	const stream = __require("stream");
	const { promisify } = __require("util");
	const bufferStream = require_buffer_stream();
	const streamPipelinePromisified = promisify(stream.pipeline);
	var MaxBufferError = class extends Error {
		constructor() {
			super("maxBuffer exceeded");
			this.name = "MaxBufferError";
		}
	};
	async function getStream(inputStream, options) {
		if (!inputStream) throw new Error("Expected a stream");
		options = {
			maxBuffer: Infinity,
			...options
		};
		const { maxBuffer } = options;
		const stream = bufferStream(options);
		await new Promise((resolve, reject) => {
			const rejectPromise = (error) => {
				if (error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) error.bufferedData = stream.getBufferedValue();
				reject(error);
			};
			(async () => {
				try {
					await streamPipelinePromisified(inputStream, stream);
					resolve();
				} catch (error) {
					rejectPromise(error);
				}
			})();
			stream.on("data", () => {
				if (stream.getBufferedLength() > maxBuffer) rejectPromise(new MaxBufferError());
			});
		});
		return stream.getBufferedValue();
	}
	module.exports = getStream;
	module.exports.buffer = (stream, options) => getStream(stream, {
		...options,
		encoding: "buffer"
	});
	module.exports.array = (stream, options) => getStream(stream, {
		...options,
		array: true
	});
	module.exports.MaxBufferError = MaxBufferError;
}));
//#endregion
//#region node_modules/.pnpm/merge-stream@2.0.0/node_modules/merge-stream/index.js
var require_merge_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const { PassThrough } = __require("stream");
	module.exports = function() {
		var sources = [];
		var output = new PassThrough({ objectMode: true });
		output.setMaxListeners(0);
		output.add = add;
		output.isEmpty = isEmpty;
		output.on("unpipe", remove);
		Array.prototype.slice.call(arguments).forEach(add);
		return output;
		function add(source) {
			if (Array.isArray(source)) {
				source.forEach(add);
				return this;
			}
			sources.push(source);
			source.once("end", remove.bind(null, source));
			source.once("error", output.emit.bind(output, "error"));
			source.pipe(output, { end: false });
			return this;
		}
		function isEmpty() {
			return sources.length == 0;
		}
		function remove(source) {
			sources = sources.filter(function(it) {
				return it !== source;
			});
			if (!sources.length && output.readable) output.end();
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/stream.js
var require_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const isStream = require_is_stream();
	const getStream = require_get_stream();
	const mergeStream = require_merge_stream();
	const handleInput = (spawned, input) => {
		if (input === void 0 || spawned.stdin === void 0) return;
		if (isStream(input)) input.pipe(spawned.stdin);
		else spawned.stdin.end(input);
	};
	const makeAllStream = (spawned, { all }) => {
		if (!all || !spawned.stdout && !spawned.stderr) return;
		const mixed = mergeStream();
		if (spawned.stdout) mixed.add(spawned.stdout);
		if (spawned.stderr) mixed.add(spawned.stderr);
		return mixed;
	};
	const getBufferedData = async (stream, streamPromise) => {
		if (!stream) return;
		stream.destroy();
		try {
			return await streamPromise;
		} catch (error) {
			return error.bufferedData;
		}
	};
	const getStreamPromise = (stream, { encoding, buffer, maxBuffer }) => {
		if (!stream || !buffer) return;
		if (encoding) return getStream(stream, {
			encoding,
			maxBuffer
		});
		return getStream.buffer(stream, { maxBuffer });
	};
	const getSpawnedResult = async ({ stdout, stderr, all }, { encoding, buffer, maxBuffer }, processDone) => {
		const stdoutPromise = getStreamPromise(stdout, {
			encoding,
			buffer,
			maxBuffer
		});
		const stderrPromise = getStreamPromise(stderr, {
			encoding,
			buffer,
			maxBuffer
		});
		const allPromise = getStreamPromise(all, {
			encoding,
			buffer,
			maxBuffer: maxBuffer * 2
		});
		try {
			return await Promise.all([
				processDone,
				stdoutPromise,
				stderrPromise,
				allPromise
			]);
		} catch (error) {
			return Promise.all([
				{
					error,
					signal: error.signal,
					timedOut: error.timedOut
				},
				getBufferedData(stdout, stdoutPromise),
				getBufferedData(stderr, stderrPromise),
				getBufferedData(all, allPromise)
			]);
		}
	};
	const validateInputSync = ({ input }) => {
		if (isStream(input)) throw new TypeError("The `input` option cannot be a stream in sync mode");
	};
	module.exports = {
		handleInput,
		makeAllStream,
		getSpawnedResult,
		validateInputSync
	};
}));
//#endregion
//#region node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/promise.js
var require_promise = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const nativePromisePrototype = (async () => {})().constructor.prototype;
	const descriptors = [
		"then",
		"catch",
		"finally"
	].map((property) => [property, Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)]);
	const mergePromise = (spawned, promise) => {
		for (const [property, descriptor] of descriptors) {
			const value = typeof promise === "function" ? (...args) => Reflect.apply(descriptor.value, promise(), args) : descriptor.value.bind(promise);
			Reflect.defineProperty(spawned, property, {
				...descriptor,
				value
			});
		}
		return spawned;
	};
	const getSpawnedPromise = (spawned) => {
		return new Promise((resolve, reject) => {
			spawned.on("exit", (exitCode, signal) => {
				resolve({
					exitCode,
					signal
				});
			});
			spawned.on("error", (error) => {
				reject(error);
			});
			if (spawned.stdin) spawned.stdin.on("error", (error) => {
				reject(error);
			});
		});
	};
	module.exports = {
		mergePromise,
		getSpawnedPromise
	};
}));
//#endregion
//#region node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/command.js
var require_command = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const normalizeArgs = (file, args = []) => {
		if (!Array.isArray(args)) return [file];
		return [file, ...args];
	};
	const NO_ESCAPE_REGEXP = /^[\w.-]+$/;
	const DOUBLE_QUOTES_REGEXP = /"/g;
	const escapeArg = (arg) => {
		if (typeof arg !== "string" || NO_ESCAPE_REGEXP.test(arg)) return arg;
		return `"${arg.replace(DOUBLE_QUOTES_REGEXP, "\\\"")}"`;
	};
	const joinCommand = (file, args) => {
		return normalizeArgs(file, args).join(" ");
	};
	const getEscapedCommand = (file, args) => {
		return normalizeArgs(file, args).map((arg) => escapeArg(arg)).join(" ");
	};
	const SPACES_REGEXP = / +/g;
	const parseCommand = (command) => {
		const tokens = [];
		for (const token of command.trim().split(SPACES_REGEXP)) {
			const previousToken = tokens[tokens.length - 1];
			if (previousToken && previousToken.endsWith("\\")) tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
			else tokens.push(token);
		}
		return tokens;
	};
	module.exports = {
		joinCommand,
		getEscapedCommand,
		parseCommand
	};
}));
//#endregion
//#region node_modules/.pnpm/execa@5.1.1/node_modules/execa/index.js
var require_execa = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	const path = __require("path");
	const childProcess = __require("child_process");
	const crossSpawn = require_cross_spawn();
	const stripFinalNewline = require_strip_final_newline();
	const npmRunPath = require_npm_run_path();
	const onetime = require_onetime();
	const makeError = require_error();
	const normalizeStdio = require_stdio();
	const { spawnedKill, spawnedCancel, setupTimeout, validateTimeout, setExitHandler } = require_kill();
	const { handleInput, getSpawnedResult, makeAllStream, validateInputSync } = require_stream();
	const { mergePromise, getSpawnedPromise } = require_promise();
	const { joinCommand, parseCommand, getEscapedCommand } = require_command();
	const DEFAULT_MAX_BUFFER = 1e3 * 1e3 * 100;
	const getEnv = ({ env: envOption, extendEnv, preferLocal, localDir, execPath }) => {
		const env = extendEnv ? {
			...process.env,
			...envOption
		} : envOption;
		if (preferLocal) return npmRunPath.env({
			env,
			cwd: localDir,
			execPath
		});
		return env;
	};
	const handleArguments = (file, args, options = {}) => {
		const parsed = crossSpawn._parse(file, args, options);
		file = parsed.command;
		args = parsed.args;
		options = parsed.options;
		options = {
			maxBuffer: DEFAULT_MAX_BUFFER,
			buffer: true,
			stripFinalNewline: true,
			extendEnv: true,
			preferLocal: false,
			localDir: options.cwd || process.cwd(),
			execPath: process.execPath,
			encoding: "utf8",
			reject: true,
			cleanup: true,
			all: false,
			windowsHide: true,
			...options
		};
		options.env = getEnv(options);
		options.stdio = normalizeStdio(options);
		if (process.platform === "win32" && path.basename(file, ".exe") === "cmd") args.unshift("/q");
		return {
			file,
			args,
			options,
			parsed
		};
	};
	const handleOutput = (options, value, error) => {
		if (typeof value !== "string" && !Buffer.isBuffer(value)) return error === void 0 ? void 0 : "";
		if (options.stripFinalNewline) return stripFinalNewline(value);
		return value;
	};
	const execa = (file, args, options) => {
		const parsed = handleArguments(file, args, options);
		const command = joinCommand(file, args);
		const escapedCommand = getEscapedCommand(file, args);
		validateTimeout(parsed.options);
		let spawned;
		try {
			spawned = childProcess.spawn(parsed.file, parsed.args, parsed.options);
		} catch (error) {
			return mergePromise(new childProcess.ChildProcess(), Promise.reject(makeError({
				error,
				stdout: "",
				stderr: "",
				all: "",
				command,
				escapedCommand,
				parsed,
				timedOut: false,
				isCanceled: false,
				killed: false
			})));
		}
		const spawnedPromise = getSpawnedPromise(spawned);
		const timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise);
		const processDone = setExitHandler(spawned, parsed.options, timedPromise);
		const context = { isCanceled: false };
		spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned));
		spawned.cancel = spawnedCancel.bind(null, spawned, context);
		const handlePromise = async () => {
			const [{ error, exitCode, signal, timedOut }, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone);
			const stdout = handleOutput(parsed.options, stdoutResult);
			const stderr = handleOutput(parsed.options, stderrResult);
			const all = handleOutput(parsed.options, allResult);
			if (error || exitCode !== 0 || signal !== null) {
				const returnedError = makeError({
					error,
					exitCode,
					signal,
					stdout,
					stderr,
					all,
					command,
					escapedCommand,
					parsed,
					timedOut,
					isCanceled: context.isCanceled,
					killed: spawned.killed
				});
				if (!parsed.options.reject) return returnedError;
				throw returnedError;
			}
			return {
				command,
				escapedCommand,
				exitCode: 0,
				stdout,
				stderr,
				all,
				failed: false,
				timedOut: false,
				isCanceled: false,
				killed: false
			};
		};
		const handlePromiseOnce = onetime(handlePromise);
		handleInput(spawned, parsed.options.input);
		spawned.all = makeAllStream(spawned, parsed.options);
		return mergePromise(spawned, handlePromiseOnce);
	};
	module.exports = execa;
	module.exports.sync = (file, args, options) => {
		const parsed = handleArguments(file, args, options);
		const command = joinCommand(file, args);
		const escapedCommand = getEscapedCommand(file, args);
		validateInputSync(parsed.options);
		let result;
		try {
			result = childProcess.spawnSync(parsed.file, parsed.args, parsed.options);
		} catch (error) {
			throw makeError({
				error,
				stdout: "",
				stderr: "",
				all: "",
				command,
				escapedCommand,
				parsed,
				timedOut: false,
				isCanceled: false,
				killed: false
			});
		}
		const stdout = handleOutput(parsed.options, result.stdout, result.error);
		const stderr = handleOutput(parsed.options, result.stderr, result.error);
		if (result.error || result.status !== 0 || result.signal !== null) {
			const error = makeError({
				stdout,
				stderr,
				error: result.error,
				signal: result.signal,
				exitCode: result.status,
				command,
				escapedCommand,
				parsed,
				timedOut: result.error && result.error.code === "ETIMEDOUT",
				isCanceled: false,
				killed: result.signal !== null
			});
			if (!parsed.options.reject) return error;
			throw error;
		}
		return {
			command,
			escapedCommand,
			exitCode: 0,
			stdout,
			stderr,
			failed: false,
			timedOut: false,
			isCanceled: false,
			killed: false
		};
	};
	module.exports.command = (command, options) => {
		const [file, ...args] = parseCommand(command);
		return execa(file, args, options);
	};
	module.exports.commandSync = (command, options) => {
		const [file, ...args] = parseCommand(command);
		return execa.sync(file, args, options);
	};
	module.exports.node = (scriptPath, args, options = {}) => {
		if (args && !Array.isArray(args) && typeof args === "object") {
			options = args;
			args = [];
		}
		const stdio = normalizeStdio.node(options);
		const defaultExecArgv = process.execArgv.filter((arg) => !arg.startsWith("--inspect"));
		const { nodePath = process.execPath, nodeOptions = defaultExecArgv } = options;
		return execa(nodePath, [
			...nodeOptions,
			scriptPath,
			...Array.isArray(args) ? args : []
		], {
			...options,
			stdin: void 0,
			stdout: void 0,
			stderr: void 0,
			stdio,
			shell: false
		});
	};
}));
//#endregion
//#region node_modules/.pnpm/@vercel+cli-exec@1.0.0/node_modules/@vercel/cli-exec/dist/envpath.js
var require_envpath = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
	var envpath_exports = {};
	__export(envpath_exports, {
		getEnvPath: () => getEnvPath,
		prependPathEntries: () => prependPathEntries,
		setEnvPath: () => setEnvPath,
		splitPath: () => splitPath
	});
	module.exports = __toCommonJS(envpath_exports);
	var import_node_path$4 = __toESM(__require("node:path"));
	function prependPathEntries(pathValue, directories) {
		const pathParts = pathValue.split(import_node_path$4.default.delimiter).filter(Boolean);
		const prepended = [];
		for (const directory of directories) if (!pathParts.includes(directory) && !prepended.includes(directory)) prepended.push(directory);
		if (prepended.length === 0) return pathValue;
		return pathValue === "" || pathValue === import_node_path$4.default.delimiter ? `${prepended.join(import_node_path$4.default.delimiter)}${pathValue}` : [...prepended, pathValue].join(import_node_path$4.default.delimiter);
	}
	function splitPath(pathValue) {
		return pathValue.split(import_node_path$4.default.delimiter).filter(Boolean);
	}
	function getEnvPath(env = process.env) {
		if (process.platform !== "win32") return env.PATH ?? "";
		const pathKeys = Object.keys(env).filter((key) => key.toLowerCase() === "path");
		for (let index = pathKeys.length - 1; index >= 0; index--) {
			const value = env[pathKeys[index]];
			if (value !== void 0) return value;
		}
		return "";
	}
	function setEnvPath(env = process.env, pathValue) {
		if (process.platform !== "win32") return {
			...env,
			PATH: pathValue
		};
		const normalizedEnv = { ...env };
		for (const key of Object.keys(normalizedEnv)) if (key !== "PATH" && key.toLowerCase() === "path") delete normalizedEnv[key];
		normalizedEnv.PATH = pathValue;
		return normalizedEnv;
	}
	0 && (module.exports = {
		getEnvPath,
		prependPathEntries,
		setEnvPath,
		splitPath
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+cli-exec@1.0.0/node_modules/@vercel/cli-exec/dist/errutils.js
var require_errutils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
	var errutils_exports = {};
	__export(errutils_exports, {
		getErrorMessage: () => getErrorMessage,
		isMissingPathError: () => isMissingPathError
	});
	module.exports = __toCommonJS(errutils_exports);
	function getErrorMessage(error) {
		if (error instanceof Error) return error.message;
		return String(error);
	}
	function isMissingPathError(error) {
		return typeof error === "object" && error !== null && "code" in error && (error.code === "ENOENT" || error.code === "ENOTDIR");
	}
	0 && (module.exports = {
		getErrorMessage,
		isMissingPathError
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+cli-exec@1.0.0/node_modules/@vercel/cli-exec/dist/fsutils.js
var require_fsutils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
	var fsutils_exports = {};
	__export(fsutils_exports, {
		getCanonicalPath: () => getCanonicalPath,
		getCommandBase: () => getCommandBase,
		getDirectoriesBetween: () => getDirectoriesBetween,
		isNodeScript: () => isNodeScript,
		isSubpath: () => isSubpath,
		statIfExists: () => statIfExists
	});
	module.exports = __toCommonJS(fsutils_exports);
	var import_promises$2 = __require("node:fs/promises");
	var import_node_path$3 = __toESM(__require("node:path"));
	var import_errutils = require_errutils();
	async function getCanonicalPath(filePath) {
		try {
			return await (0, import_promises$2.realpath)(filePath);
		} catch {
			return filePath;
		}
	}
	function getDirectoriesBetween(parent, child) {
		const directories = [];
		let current = import_node_path$3.default.resolve(child);
		const resolvedParent = import_node_path$3.default.resolve(parent);
		while (true) {
			directories.push(current);
			if (current === resolvedParent) return directories.reverse();
			const next = import_node_path$3.default.dirname(current);
			if (next === current) return [];
			current = next;
		}
	}
	async function statIfExists(filePath) {
		try {
			return { stats: await (0, import_promises$2.stat)(filePath) };
		} catch (error) {
			if ((0, import_errutils.isMissingPathError)(error)) return { missing: true };
			return { reason: `could not inspect: ${(0, import_errutils.getErrorMessage)(error)}` };
		}
	}
	function isNodeScript(filePath) {
		return [
			".js",
			".cjs",
			".mjs"
		].includes(import_node_path$3.default.extname(filePath));
	}
	function isSubpath(parent, child) {
		const relativePath = import_node_path$3.default.relative(parent, child);
		return relativePath === "" || relativePath !== "" && !relativePath.startsWith("..") && !import_node_path$3.default.isAbsolute(relativePath);
	}
	function getCommandBase(command) {
		const extension = import_node_path$3.default.extname(command).toLowerCase();
		if (process.platform === "win32" && [".cmd", ".exe"].includes(extension)) return import_node_path$3.default.basename(command, extension);
		return import_node_path$3.default.basename(command);
	}
	0 && (module.exports = {
		getCanonicalPath,
		getCommandBase,
		getDirectoriesBetween,
		isNodeScript,
		isSubpath,
		statIfExists
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+cli-exec@1.0.0/node_modules/@vercel/cli-exec/dist/safety.js
var require_safety = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
	var safety_exports = {};
	__export(safety_exports, {
		getSkippedNodeModulesReason: () => getSkippedNodeModulesReason,
		getUnsafeDirectoryReason: () => getUnsafeDirectoryReason,
		getUnsafePackageBinReason: () => getUnsafePackageBinReason,
		getUnsafePackageDirectoryReason: () => getUnsafePackageDirectoryReason,
		getUnsafePackageFileReason: () => getUnsafePackageFileReason,
		getUnsafeStatsReason: () => getUnsafeStatsReason
	});
	module.exports = __toCommonJS(safety_exports);
	var import_promises$1 = __require("node:fs/promises");
	var import_node_path$2 = __toESM(__require("node:path"));
	var import_errutils = require_errutils();
	var import_fsutils = require_fsutils();
	async function getSkippedNodeModulesReason(nodeModulesDirectory, parentDirectories) {
		const parentDirectory = import_node_path$2.default.dirname(nodeModulesDirectory);
		parentDirectories ??= [parentDirectory];
		for (const directory of parentDirectories) {
			let unsafeParentReason;
			try {
				unsafeParentReason = await getUnsafeDirectoryReason(directory);
			} catch (error) {
				unsafeParentReason = `could not inspect: ${(0, import_errutils.getErrorMessage)(error)}`;
			}
			if (unsafeParentReason) return `${directory} is ${unsafeParentReason}`;
		}
		const result = await (0, import_fsutils.statIfExists)(nodeModulesDirectory);
		if ("missing" in result) return null;
		if ("reason" in result) return result.reason;
		if (!result.stats.isDirectory()) return "not a directory";
		const unsafeNodeModulesReason = getUnsafeStatsReason(result.stats);
		if (unsafeNodeModulesReason) return unsafeNodeModulesReason;
		return await getSkippedLocalBinDirectoryReason(import_node_path$2.default.join(nodeModulesDirectory, ".bin"));
	}
	async function getSkippedLocalBinDirectoryReason(localBinDirectory) {
		const result = await (0, import_fsutils.statIfExists)(localBinDirectory);
		if ("missing" in result) return null;
		if ("reason" in result) return `${localBinDirectory} ${result.reason}`;
		if (!result.stats.isDirectory()) return `${localBinDirectory} is not a directory`;
		const unsafeLocalBinReason = getUnsafeStatsReason(result.stats);
		return unsafeLocalBinReason ? `${localBinDirectory} is ${unsafeLocalBinReason}` : null;
	}
	async function getUnsafePackageBinReason(nodeModulesDirectory, packageDirectory, binPath) {
		const unsafePackageDirectoryReason = await getUnsafePackageDirectoryReason(nodeModulesDirectory, packageDirectory);
		if (unsafePackageDirectoryReason) return unsafePackageDirectoryReason;
		return await getUnsafePackageFileReason(packageDirectory, binPath);
	}
	async function getUnsafePackageDirectoryReason(nodeModulesDirectory, packageDirectory) {
		const directoriesToCheck = (0, import_fsutils.getDirectoriesBetween)(nodeModulesDirectory, packageDirectory);
		if (directoriesToCheck.length === 0) return `${packageDirectory} resolves outside local node_modules`;
		for (const directory of directoriesToCheck) {
			const reason = await getUnsafeDirectoryReason(directory);
			if (reason) return `${directory} is ${reason}`;
		}
		return null;
	}
	async function getUnsafePackageFileReason(packageDirectory, filePath) {
		const directoriesToCheck = (0, import_fsutils.getDirectoriesBetween)(packageDirectory, import_node_path$2.default.dirname(filePath));
		if (directoriesToCheck.length === 0) return `${filePath} resolves outside package`;
		for (const directory of directoriesToCheck) {
			const reason2 = await getUnsafeDirectoryReason(directory);
			if (reason2) return `${directory} is ${reason2}`;
		}
		const reason = await getUnsafeFileReason(filePath);
		return reason ? `${filePath} is ${reason}` : null;
	}
	async function getUnsafeDirectoryReason(directory) {
		const stats = await (0, import_promises$1.stat)(directory);
		if (!stats.isDirectory()) return "not a directory";
		return getUnsafeStatsReason(stats);
	}
	async function getUnsafeFileReason(filePath) {
		const stats = await (0, import_promises$1.stat)(filePath);
		if (!stats.isFile()) return "not a file";
		return getUnsafeStatsReason(stats);
	}
	function getUnsafeStatsReason(stats) {
		const getuid = process.geteuid ?? process.getuid;
		if (typeof getuid !== "function") return null;
		const uid = getuid();
		if ((stats.mode & 18) !== 0) {
			if ((stats.mode & 2) !== 0) return "world-writable";
			return "group-writable";
		}
		if (stats.uid !== uid) return `owned by uid ${stats.uid}, current uid is ${uid}`;
		return null;
	}
	0 && (module.exports = {
		getSkippedNodeModulesReason,
		getUnsafeDirectoryReason,
		getUnsafePackageBinReason,
		getUnsafePackageDirectoryReason,
		getUnsafePackageFileReason,
		getUnsafeStatsReason
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+cli-exec@1.0.0/node_modules/@vercel/cli-exec/dist/lookup.js
var require_lookup = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
	var lookup_exports = {};
	__export(lookup_exports, {
		clearCachedCliInvocation: () => clearCachedCliInvocation,
		clearVercelCliLookupCache: () => clearVercelCliLookupCache,
		findVercelCli: () => findVercelCli,
		getLocalBinSearch: () => getLocalBinSearch,
		resolveCachedCliInvocation: () => resolveCachedCliInvocation,
		toVercelCliInvocation: () => toVercelCliInvocation
	});
	module.exports = __toCommonJS(lookup_exports);
	var import_promises = __require("node:fs/promises");
	var import_node_path$1 = __toESM(__require("node:path"));
	var import_envpath = require_envpath();
	var import_errutils = require_errutils();
	var import_fsutils = require_fsutils();
	var import_safety = require_safety();
	const cliInvocationCache = /* @__PURE__ */ new Map();
	async function findVercelCli(options = {}) {
		const resolution = await resolveCachedCliInvocation(import_node_path$1.default.resolve(options.cwd ?? process.cwd()), options.path ?? (0, import_envpath.getEnvPath)(process.env));
		return resolution.found ? toVercelCliInvocation(resolution) : null;
	}
	function resolveCachedCliInvocation(cwd, pathValue) {
		const cacheKey = getCliInvocationCacheKey(cwd, pathValue);
		if (cliInvocationCache.has(cacheKey)) return cliInvocationCache.get(cacheKey);
		const resolution = resolveCliInvocation(cwd, pathValue).catch((error) => {
			cliInvocationCache.delete(cacheKey);
			throw error;
		});
		cliInvocationCache.set(cacheKey, resolution);
		return resolution;
	}
	function toVercelCliInvocation(resolution) {
		return {
			command: resolution.command,
			commandArgs: resolution.commandArgs,
			source: resolution.source
		};
	}
	function clearVercelCliLookupCache() {
		cliInvocationCache.clear();
	}
	function clearCachedCliInvocation(cwd, pathValue) {
		cliInvocationCache.delete(getCliInvocationCacheKey(cwd, pathValue));
	}
	async function resolveCliInvocation(cwd, pathValue) {
		const localBinSearch = await getLocalBinSearch(cwd);
		const diagnostics = {
			localBinSearch: localBinSearch.diagnostics,
			skippedLocalBins: []
		};
		const resolvedPath = (0, import_envpath.prependPathEntries)(pathValue, localBinSearch.directories);
		for (const command of getVercelCommandNames()) {
			const resolvedCommand = await findCommandInPath(command, resolvedPath, cwd, localBinSearch, diagnostics);
			if (!resolvedCommand) continue;
			if ((0, import_fsutils.isNodeScript)(resolvedCommand.realPath)) return {
				found: true,
				command: process.execPath,
				commandArgs: [resolvedCommand.realPath],
				source: resolvedCommand.source,
				diagnostics
			};
			return {
				found: true,
				command: resolvedCommand.realPath,
				commandArgs: [],
				source: resolvedCommand.source,
				diagnostics
			};
		}
		return {
			found: false,
			diagnostics
		};
	}
	async function findCommandInPath(command, pathValue, cwd, localBinSearch, diagnostics) {
		for (const directory of (0, import_envpath.splitPath)(pathValue)) {
			const candidate = getPathCommandCandidate(directory, command, cwd);
			try {
				if (await canAccessCommandCandidate(candidate, localBinSearch, diagnostics)) {
					const resolvedCommand = await resolveCommandCandidate(command, candidate, localBinSearch, diagnostics);
					if (resolvedCommand) return resolvedCommand;
				}
			} catch {}
		}
		return null;
	}
	function getPathCommandCandidate(directory, command, cwd) {
		const candidateDirectory = import_node_path$1.default.isAbsolute(directory) ? directory : import_node_path$1.default.resolve(cwd, directory);
		return import_node_path$1.default.join(candidateDirectory, command);
	}
	async function canAccessCommandCandidate(candidate, localBinSearch, diagnostics) {
		try {
			await (0, import_promises.access)(candidate, process.platform === "win32" ? import_promises.constants.F_OK : import_promises.constants.F_OK | import_promises.constants.X_OK);
			return true;
		} catch (error) {
			if (!(0, import_errutils.isMissingPathError)(error)) await recordInaccessibleLocalBinCandidate(candidate, error, localBinSearch, diagnostics);
			return false;
		}
	}
	async function recordInaccessibleLocalBinCandidate(candidate, error, localBinSearch, diagnostics) {
		const localBinCandidate = await classifyPathLocalBinCandidate(candidate, localBinSearch.directories);
		if (!localBinCandidate) return;
		recordSkippedLocalBin(diagnostics, candidate, "reason" in localBinCandidate ? localBinCandidate.reason : `local bin is not accessible: ${(0, import_errutils.getErrorMessage)(error)}`);
	}
	async function resolveCommandCandidate(command, candidate, localBinSearch, diagnostics) {
		if (!(await (0, import_promises.stat)(candidate)).isFile()) return null;
		const realPath = await (0, import_promises.realpath)(candidate);
		const localBinCandidate = await classifyPathLocalBinCandidate(candidate, localBinSearch.directories);
		if (!localBinCandidate) return {
			realPath,
			source: "path"
		};
		if ("reason" in localBinCandidate) {
			recordSkippedLocalBin(diagnostics, candidate, localBinCandidate.reason);
			return null;
		}
		const localPackageBinResult = await getLocalVercelPackageBin(command, localBinCandidate.directory);
		if ("reason" in localPackageBinResult) {
			recordSkippedLocalBin(diagnostics, candidate, localPackageBinResult.reason);
			return null;
		}
		return {
			realPath: localPackageBinResult.binPath,
			source: "local-bin"
		};
	}
	function recordSkippedLocalBin(diagnostics, candidate, reason) {
		diagnostics.skippedLocalBins.push({
			candidate,
			reason
		});
	}
	function getVercelCommandNames() {
		const commandBases = ["vercel"];
		if (process.platform !== "win32") return commandBases;
		const extensions = [
			".cmd",
			".exe",
			""
		];
		return commandBases.flatMap((command) => extensions.map((extension) => `${command}${extension}`));
	}
	async function getLocalBinSearch(cwd) {
		const searchRoot = await (0, import_fsutils.getCanonicalPath)(import_node_path$1.default.resolve(cwd));
		const ancestorSearch = await getAncestorDirectorySearch(searchRoot);
		const skippedNodeModules = [];
		const directories = [];
		for (const directory of ancestorSearch.directories) {
			const nodeModulesDirectory = import_node_path$1.default.join(directory, "node_modules");
			const parentDirectories = ancestorSearch.stopReason === "project-root-marker" ? (0, import_fsutils.getDirectoriesBetween)(ancestorSearch.stoppedAt, directory) : (0, import_fsutils.getDirectoriesBetween)(directory, searchRoot);
			const skippedReason = await (0, import_safety.getSkippedNodeModulesReason)(nodeModulesDirectory, parentDirectories);
			if (skippedReason) {
				skippedNodeModules.push({
					directory: nodeModulesDirectory,
					reason: skippedReason
				});
				continue;
			}
			directories.push(import_node_path$1.default.join(nodeModulesDirectory, ".bin"));
		}
		return {
			directories,
			diagnostics: {
				searchRoot,
				stoppedAt: ancestorSearch.stoppedAt,
				stopReason: ancestorSearch.stopReason,
				markerPath: ancestorSearch.markerPath,
				skippedNodeModules
			}
		};
	}
	async function getAncestorDirectorySearch(cwd) {
		const directories = [];
		let current = import_node_path$1.default.resolve(cwd);
		while (true) {
			directories.push(current);
			const marker = await getProjectRootMarker(current);
			if (marker) return {
				directories,
				stoppedAt: current,
				stopReason: "project-root-marker",
				markerPath: marker.path
			};
			const parent = import_node_path$1.default.dirname(current);
			if (parent === current) return {
				directories,
				stoppedAt: current,
				stopReason: "filesystem-root"
			};
			current = parent;
		}
	}
	async function getProjectRootMarker(directory) {
		const gitPath = import_node_path$1.default.join(directory, ".git");
		try {
			await (0, import_promises.stat)(gitPath);
			return { path: gitPath };
		} catch {}
		return null;
	}
	async function getLocalBinDirectory(filePath, localBinDirectories) {
		const resolvedFilePath = import_node_path$1.default.resolve(filePath);
		let canonicalFilePath = resolvedFilePath;
		try {
			canonicalFilePath = import_node_path$1.default.join(await (0, import_promises.realpath)(import_node_path$1.default.dirname(resolvedFilePath)), import_node_path$1.default.basename(resolvedFilePath));
		} catch {}
		for (let localBinDirectory of localBinDirectories) {
			try {
				localBinDirectory = await (0, import_promises.realpath)(localBinDirectory);
			} catch {}
			if (canonicalFilePath.startsWith(`${localBinDirectory}${import_node_path$1.default.sep}`)) return localBinDirectory;
		}
		return null;
	}
	async function getNodeModulesBinDirectory(filePath) {
		const candidateDirectory = import_node_path$1.default.resolve(import_node_path$1.default.dirname(filePath));
		const directories = [candidateDirectory];
		try {
			const canonicalDirectory = await (0, import_promises.realpath)(candidateDirectory);
			if (!directories.includes(canonicalDirectory)) directories.push(canonicalDirectory);
		} catch {}
		for (const directory of directories) if (import_node_path$1.default.basename(directory) === ".bin" && import_node_path$1.default.basename(import_node_path$1.default.dirname(directory)) === "node_modules") return directory;
		return null;
	}
	async function classifyPathLocalBinCandidate(filePath, localBinDirectories) {
		const localBinDirectory = await getLocalBinDirectory(filePath, localBinDirectories);
		if (localBinDirectory) return { directory: localBinDirectory };
		const nodeModulesBinDirectory = await getNodeModulesBinDirectory(filePath);
		if (!nodeModulesBinDirectory) return null;
		const nodeModulesDirectory = import_node_path$1.default.dirname(nodeModulesBinDirectory);
		const skippedReason = await (0, import_safety.getSkippedNodeModulesReason)(nodeModulesDirectory);
		if (skippedReason) return { reason: `local node_modules is ${skippedReason}` };
		return { reason: "local bin is outside project lookup boundary" };
	}
	async function getLocalVercelPackageBin(command, localBinDirectory) {
		const commandBase = (0, import_fsutils.getCommandBase)(command);
		const nodeModulesDirectory = import_node_path$1.default.dirname(localBinDirectory);
		if (commandBase !== "vercel" || import_node_path$1.default.basename(nodeModulesDirectory) !== "node_modules") return { reason: "not a local vercel bin" };
		try {
			const localPackage = await getLocalVercelPackage(nodeModulesDirectory);
			if ("reason" in localPackage) return localPackage;
			const packageJsonResult = await readLocalVercelPackageJson(localPackage.realPackageDirectory);
			if ("reason" in packageJsonResult) return packageJsonResult;
			localPackage.packageJson = packageJsonResult.packageJson;
			return await getDeclaredLocalVercelPackageBin(localPackage, commandBase);
		} catch (error) {
			return { reason: `could not validate local vercel package: ${(0, import_errutils.getErrorMessage)(error)}` };
		}
	}
	async function getLocalVercelPackage(nodeModulesDirectory) {
		const packageDirectory = import_node_path$1.default.join(nodeModulesDirectory, "vercel");
		const realNodeModulesDirectory = await (0, import_promises.realpath)(nodeModulesDirectory);
		const realPackageDirectory = await (0, import_promises.realpath)(packageDirectory);
		if (!(0, import_fsutils.isSubpath)(realNodeModulesDirectory, realPackageDirectory)) return { reason: "local vercel package resolves outside local node_modules" };
		const unsafePackageDirectoryReason = await (0, import_safety.getUnsafePackageDirectoryReason)(realNodeModulesDirectory, realPackageDirectory);
		if (unsafePackageDirectoryReason) return { reason: `local vercel package is unsafe: ${unsafePackageDirectoryReason}` };
		return {
			realNodeModulesDirectory,
			realPackageDirectory,
			packageJson: {}
		};
	}
	async function readLocalVercelPackageJson(realPackageDirectory) {
		const packageJsonPath = import_node_path$1.default.join(realPackageDirectory, "package.json");
		const realPackageJsonPath = await (0, import_promises.realpath)(packageJsonPath);
		if (!(0, import_fsutils.isSubpath)(realPackageDirectory, realPackageJsonPath)) return { reason: "local vercel package.json resolves outside package" };
		const unsafePackageJsonReason = await (0, import_safety.getUnsafePackageFileReason)(realPackageDirectory, realPackageJsonPath);
		if (unsafePackageJsonReason) return { reason: `local vercel package.json is unsafe: ${unsafePackageJsonReason}` };
		const packageJson = JSON.parse(await (0, import_promises.readFile)(realPackageJsonPath, "utf8"));
		if (packageJson.name !== "vercel") return { reason: "local vercel package.json does not have name \"vercel\"" };
		return { packageJson };
	}
	async function getDeclaredLocalVercelPackageBin(localPackage, commandBase) {
		const { packageJson, realNodeModulesDirectory, realPackageDirectory } = localPackage;
		const binTarget = getPackageBinTarget(packageJson, commandBase);
		if (!binTarget) return { reason: "local vercel package does not declare bin.vercel" };
		const declaredBinPath = import_node_path$1.default.resolve(realPackageDirectory, binTarget);
		const realDeclaredBinPath = await (0, import_promises.realpath)(declaredBinPath);
		if (!(0, import_fsutils.isSubpath)(realPackageDirectory, realDeclaredBinPath)) return { reason: "local vercel package bin resolves outside package" };
		const unsafePackageBinReason = await (0, import_safety.getUnsafePackageBinReason)(realNodeModulesDirectory, realPackageDirectory, realDeclaredBinPath);
		if (unsafePackageBinReason) return { reason: `local vercel package bin is unsafe: ${unsafePackageBinReason}` };
		if (process.platform !== "win32" && !(0, import_fsutils.isNodeScript)(realDeclaredBinPath)) try {
			await (0, import_promises.access)(realDeclaredBinPath, import_promises.constants.F_OK | import_promises.constants.X_OK);
		} catch (error) {
			return { reason: `local vercel package bin is not executable: ${(0, import_errutils.getErrorMessage)(error)}` };
		}
		return { binPath: realDeclaredBinPath };
	}
	function getPackageBinTarget(packageJson, command) {
		const bin = packageJson.bin;
		if (typeof bin === "string") return command === "vercel" ? bin : null;
		if (bin && typeof bin === "object") {
			const target = bin[command];
			if (typeof target === "string") return target;
		}
		return null;
	}
	function getCliInvocationCacheKey(cwd, pathValue) {
		return `${cwd}\0${pathValue}`;
	}
	0 && (module.exports = {
		clearCachedCliInvocation,
		clearVercelCliLookupCache,
		findVercelCli,
		getLocalBinSearch,
		resolveCachedCliInvocation,
		toVercelCliInvocation
	});
}));
//#endregion
//#region node_modules/.pnpm/@vercel+cli-exec@1.0.0/node_modules/@vercel/cli-exec/dist/exec.js
var require_exec = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
	var exec_exports = {};
	__export(exec_exports, { execVercelCli: () => execVercelCli });
	module.exports = __toCommonJS(exec_exports);
	var import_node_path = __toESM(__require("node:path"));
	var import_execa = __toESM(require_execa());
	var import_envpath = require_envpath();
	var import_errors = require_errors();
	var import_lookup = require_lookup();
	async function execVercelCli(args, options = {}) {
		const cwd = import_node_path.default.resolve(options.cwd ?? process.cwd());
		await (0, import_errors.assertValidCwd)(cwd);
		const env = mergeExecEnv(options.env);
		const pathValue = (0, import_envpath.getEnvPath)(env);
		try {
			return await execResolvedVercelCli(args, options, cwd, env, pathValue);
		} catch (error) {
			if (error instanceof import_errors.VercelCliError && error.code === "VERCEL_CLI_NOT_FOUND") {
				(0, import_lookup.clearCachedCliInvocation)(cwd, pathValue);
				return await execResolvedVercelCli(args, options, cwd, env, pathValue);
			}
			throw error;
		}
	}
	async function execResolvedVercelCli(args, options, cwd, env, pathValue) {
		const invocation = await resolveInvocationOrThrow(cwd, pathValue);
		try {
			const execaOptions = {
				input: options.input,
				stdio: options.stdio,
				stdin: options.stdin,
				stdout: options.stdout,
				stderr: options.stderr,
				timeout: options.timeout,
				cwd,
				env: await prependLocalBinsToEnvPath(cwd, env),
				windowsHide: true
			};
			if (options.signal) execaOptions.signal = options.signal;
			const { stdout, stderr } = await (0, import_execa.default)(invocation.command, [...invocation.commandArgs, ...args], execaOptions);
			return {
				stdout,
				stderr,
				invocation
			};
		} catch (error) {
			throw (0, import_errors.toVercelCliError)(invocation, error);
		}
	}
	async function resolveInvocationOrThrow(cwd, pathValue) {
		const resolution = await (0, import_lookup.resolveCachedCliInvocation)(cwd, pathValue);
		if (!resolution.found) throw new import_errors.VercelCliError({
			code: "VERCEL_CLI_NOT_FOUND",
			message: (0, import_errors.getCliNotFoundMessage)(resolution.diagnostics)
		});
		return (0, import_lookup.toVercelCliInvocation)(resolution);
	}
	function mergeExecEnv(env) {
		if (!env) return process.env;
		return {
			...process.env,
			...env
		};
	}
	async function prependLocalBinsToEnvPath(cwd, env = process.env) {
		const localPath = await prependLocalBinsToPath(cwd, (0, import_envpath.getEnvPath)(env));
		return (0, import_envpath.setEnvPath)(env, (0, import_envpath.prependPathEntries)(localPath, [import_node_path.default.dirname(process.execPath)]));
	}
	async function prependLocalBinsToPath(cwd, pathValue = "") {
		return (0, import_envpath.prependPathEntries)(pathValue, (await (0, import_lookup.getLocalBinSearch)(cwd)).directories);
	}
	0 && (module.exports = { execVercelCli });
}));
//#endregion
//#region node_modules/.pnpm/@vercel+cli-exec@1.0.0/node_modules/@vercel/cli-exec/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
		VercelCliError: () => import_errors.VercelCliError,
		clearVercelCliLookupCache: () => import_lookup.clearVercelCliLookupCache,
		execVercelCli: () => import_exec.execVercelCli,
		findVercelCli: () => import_lookup.findVercelCli
	});
	module.exports = __toCommonJS(src_exports);
	var import_errors = require_errors();
	var import_exec = require_exec();
	var import_lookup = require_lookup();
	0 && (module.exports = {
		VercelCliError,
		clearVercelCliLookupCache,
		execVercelCli,
		findVercelCli
	});
}));
//#endregion
export { require_dist as t };
