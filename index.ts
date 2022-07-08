import { Request, Response, NextFunction } from "express";
import { default as chalk } from "chalk";

interface ScrawnyOptions {
  allowed?: string[];
  log?: boolean;
  format?: string;
  dateFormat?: string;
}

/**
 * @description: Scrawny middleware
 */

const scrawny =
  (options: ScrawnyOptions) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const start = new Date().getTime();

    // Get response properties
    const { statusCode } = res;

    next();

    let opts = options;

    // Set default options
    if (!opts.allowed && !opts.format) {
      opts = {
        ...opts,
        allowed: ["status", "protocol", "path", "method"],
      };
    }
    if (!opts.dateFormat) {
      opts = {
        ...opts,
        dateFormat: "UTC",
      };
    }

    //  Extract options
    const { allowed, format, log, dateFormat } = opts;

    const end = new Date().getTime();

    //  Total time taken
    const diff = end - start;

    // Get request properties
    const {
      body,
      params,
      query,
      method,
      hostname,
      headers,
      baseUrl,
      originalUrl,
      protocol,
      httpVersion,
    } = req;

    //  Force status to be allowed
    if (allowed?.length && !allowed?.includes("status")) {
      allowed?.push("status");
    }

    //  ONLY log if log mode is enabled
    if (log) {
      // Log object
      const logObject: any = {
        status: chalk.yellowBright(statusCode.toString()),
        host: `- ${headers?.host || hostname} -`,
        method: chalk.blue.bold(`[${method}]`),
        protocol: protocol.toUpperCase() + " " + httpVersion,
        path: chalk.green.bold(baseUrl),
        body: `\n${chalk.bold("body")}: ${JSON.stringify(body)}`,
        headers: `\n${chalk.bold("headers")}: ${JSON.stringify(headers)}`,
        query: `\n${chalk.bold("query")}: ${JSON.stringify(query)}`,
        params: `\n${chalk.bold("params")}: ${JSON.stringify(params)}`,
        url: `\n${chalk.bold("url")}: ${protocol}://${
          headers?.host || hostname
        }${originalUrl}`,
        time: " - " + (diff > 800 ? chalk.red(`${diff}ms`) : `${diff}ms`),
        date:
          dateFormat?.toLowerCase() === "utc"
            ? `[${chalk.bold(new Date().toUTCString())}]`
            : dateFormat?.toLowerCase() === "iso"
            ? `[${chalk.bold(new Date().toISOString())}]`
            : `[${chalk.bold(new Date().toLocaleString())}]`,
      };

      // Check if option is allowed
      const isAllowed = (option: string): string | void => {
        if (allowed?.length && allowed.includes(option)) {
          return logObject[option];
        }
        return "";
      };

      let logFormat: string;

      // Check if format is set
      if (format) {
        logFormat = format?.toLowerCase();

        // Replace format with allowed options
        Object.keys(logObject).forEach((key) => {
          logFormat = logFormat?.replace(
            `[${key.toLowerCase()}]`,
            logObject[key]
          );
        });

        console.log(logFormat);
        return;
      }

      console.log(
        `${isAllowed("date")} ${isAllowed("status")} ${isAllowed(
          "method"
        )} ${isAllowed("protocol")} ${isAllowed("host")} ${isAllowed(
          "path"
        )} ${isAllowed("time")} ${isAllowed("url")} ${isAllowed(
          "body"
        )} ${isAllowed("headers")} ${isAllowed("params")} ${isAllowed("query")}`
      );
      return;
    }
  };

export default scrawny;
