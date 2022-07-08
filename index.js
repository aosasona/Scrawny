"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
/**
 * @description: Scrawny middleware
 */
const scrawny = (options) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const start = new Date().getTime();
    // Get response properties
    const { statusCode } = res;
    next();
    let opts = options;
    // Set default options
    if (!opts.allowed && !opts.format) {
        opts = Object.assign(Object.assign({}, opts), { allowed: ["status", "protocol", "path", "method"] });
    }
    if (!opts.dateFormat) {
        opts = Object.assign(Object.assign({}, opts), { dateFormat: "UTC" });
    }
    //  Extract options
    const { allowed, format, log, dateFormat } = opts;
    const end = new Date().getTime();
    //  Total time taken
    const diff = end - start;
    // Get request properties
    const { body, params, query, method, hostname, headers, baseUrl, originalUrl, protocol, httpVersion, } = req;
    //  Force status to be allowed
    if ((allowed === null || allowed === void 0 ? void 0 : allowed.length) && !(allowed === null || allowed === void 0 ? void 0 : allowed.includes("status"))) {
        allowed === null || allowed === void 0 ? void 0 : allowed.push("status");
    }
    //  ONLY log if log mode is enabled
    if (log) {
        // Log object
        const logObject = {
            status: chalk_1.default.yellowBright(statusCode.toString()),
            host: `- ${(headers === null || headers === void 0 ? void 0 : headers.host) || hostname} -`,
            method: chalk_1.default.blue.bold(`[${method}]`),
            protocol: protocol.toUpperCase() + " " + httpVersion,
            path: chalk_1.default.green.bold(baseUrl),
            body: `\n${chalk_1.default.bold("body")}: ${JSON.stringify(body)}`,
            headers: `\n${chalk_1.default.bold("headers")}: ${JSON.stringify(headers)}`,
            query: `\n${chalk_1.default.bold("query")}: ${JSON.stringify(query)}`,
            params: `\n${chalk_1.default.bold("params")}: ${JSON.stringify(params)}`,
            url: `\n${chalk_1.default.bold("url")}: ${protocol}://${(headers === null || headers === void 0 ? void 0 : headers.host) || hostname}${originalUrl}`,
            time: " - " + (diff > 800 ? chalk_1.default.red(`${diff}ms`) : `${diff}ms`),
            date: (dateFormat === null || dateFormat === void 0 ? void 0 : dateFormat.toLowerCase()) === "utc"
                ? `[${chalk_1.default.bold(new Date().toUTCString())}]`
                : (dateFormat === null || dateFormat === void 0 ? void 0 : dateFormat.toLowerCase()) === "iso"
                    ? `[${chalk_1.default.bold(new Date().toISOString())}]`
                    : `[${chalk_1.default.bold(new Date().toLocaleString())}]`,
        };
        // Check if option is allowed
        const isAllowed = (option) => {
            if ((allowed === null || allowed === void 0 ? void 0 : allowed.length) && allowed.includes(option)) {
                return logObject[option];
            }
            return "";
        };
        let logFormat;
        // Check if format is set
        if (format) {
            logFormat = format === null || format === void 0 ? void 0 : format.toLowerCase();
            // Replace format with allowed options
            Object.keys(logObject).forEach((key) => {
                logFormat = logFormat === null || logFormat === void 0 ? void 0 : logFormat.replace(`[${key.toLowerCase()}]`, logObject[key]);
            });
            console.log(logFormat);
            return;
        }
        console.log(`${isAllowed("date")} ${isAllowed("status")} ${isAllowed("method")} ${isAllowed("protocol")} ${isAllowed("host")} ${isAllowed("path")} ${isAllowed("time")} ${isAllowed("url")} ${isAllowed("body")} ${isAllowed("headers")} ${isAllowed("params")} ${isAllowed("query")}`);
        return;
    }
});
exports.default = scrawny;
