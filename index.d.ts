import { Request, Response, NextFunction } from "express";
interface ScrawnyOptions {
    allowed?: string[];
    log?: boolean;
    format?: string;
}
/**
 * @description: Scrawny middleware
 */
declare const scrawny: (options?: ScrawnyOptions) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default scrawny;
