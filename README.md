# Scrawny

An open-source, light-weight, simple request logger for Node.js.

## Installation

You can install Scrawny by running any of the following command:

```bash
npm install scrawny
```

OR

```bash
yarn add scrawny
```

## Usage

Using Scrawny is very easy and here's how to do it. It also has built-in typescript declarations.

### Typescript and ES6

```typescript
import express, { Express } from "express";
import scrawny from "Scrawny";

const app: Express = express();

app.use(
  scrawny({
    /* options */
  })
);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
```

### JavaScript - CommonJS

```js
const express = require("express");
const { default: scrawny } = require("Scrawny");

const app = express();

app.use(
  scrawny({
    /* options */
  })
);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
```

### Options

> **Note:** These are optional.

- **allowed**: an array of data you want to log.
- **format**: a string containing your required format of the data you want to log. While using this option, you don't need to use the `allowed` option.
- **dateFormat**: type of date format you want to use (default: UTC, others: ISO, "Locale").
- **log**: a boolean value to enable/disable the logger; default is `false` so it doesn't run in production.
  > You can enable this only in development mode by passing `log: process.env.NODE_ENV !== "production",` to the options.

### Allowed Fields

```js
allowed: [
      "status",
      "host",
      "method",
      "url",
      "protocol",
      "path",
      "body",
      "params",
      "query",
      "time",
    ],
```

- status: the status code of the response.
- host: the hostname of the current server.
- method: the HTTP method of the request.
- url: the full URL of the request.
- protocol: the protocol of the request.
- path: the path/route of the request.
- body: the body of the request.
- params: the params of the request.
- query: the query of the request.
- time: the time it took to respond.
- date: the date of the request.

### Format - SAMPLE

```js
{
  format: "[STATUS] [METHOD] [PATH] [TIME]";
}
```

> **Note:** You can use the following fields:
>
> - [STATUS]
> - [METHOD]
> - [PATH]
> - [TIME]
> - [DATE]
> - [HOST]
> - [PROTOCOL]
> - [BODY]
> - [PARAMS]
> - [QUERY]
>
> It is also case-insensitive.

Found bugs? Let me know!
You can also fork this project on [GitHub](https://github.com/aosasona/scrawny) and tinker with it.
