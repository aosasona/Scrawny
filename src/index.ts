import { Request, Response, NextFunction } from "express";
import { default as chalk } from "chalk";

interface ScrawnyOptions {
  allowed?: string[];
  log?: boolean;
  format?: string;
}

const scrawny =
  (options?: ScrawnyOptions) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const start = new Date().getTime();
    // Get response properties
    const { statusCode } = res;

    next();

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

    // Get allowed options
    const { allowed } = options || {
      allowed: ["status", "protocol", "path", "method"],
    };

    // Check if log mode is enabled
    const { log } = options || { log: false };

    // Get format
    let { format } = options || { format: "" };

    // Force status to be allowed
    if (!allowed?.includes("status")) {
      allowed?.push("status");
    }

    // ONLY log if log mode is enabled

    if (log) {
      // Check if option is allowed
      const isAllowed = (option: string): string | void => {
        if (allowed && allowed.includes(option)) {
          return log[option];
        }
        return "";
      };

      // Log object
      const log: any = {
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
        date: `[${chalk.bold(new Date().toLocaleString())}]`,
      };

      if (!format) {
        console.log(
          `${isAllowed("date")} ${isAllowed("status")} ${isAllowed(
            "method"
          )} ${isAllowed("protocol")} ${isAllowed("host")} ${isAllowed(
            "path"
          )} ${isAllowed("time")} ${isAllowed("url")} ${isAllowed(
            "body"
          )} ${isAllowed("headers")} ${isAllowed("params")} ${isAllowed(
            "query"
          )}`
        );
      } else {
        format = format?.toLowerCase();

        // Replace format with allowed options
        Object.keys(log).forEach((key) => {
          format = format?.replace(`[${key.toLowerCase()}]`, log[key]);
        });

        console.log(format);
      }
    }
  };

export default scrawny;
