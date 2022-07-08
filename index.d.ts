import type { Request, Response, NextFunction } from "express";

interface ScrawnyOptions {
  allowed?: string[];
  log?: boolean;
  format?: string;
}

type Scrawny = (
  options?: ScrawnyOptions
) => (req: Request, res: Response, next: NextFunction) => void;

type ScrawnyAllowed = string;

type ScrawnyActiveValue = boolean;

type ScrawnyFormat = string;
