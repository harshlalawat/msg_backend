import { RequestHandler } from "express";

export type RequestHandler1 = (
    request: Parameters<RequestHandler>[0] & {
        session: "65656"
    },
    response: Parameters<RequestHandler>[1],
    next: Parameters<RequestHandler>[2]
) => ReturnType<RequestHandler>
