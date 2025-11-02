import Elysia from "elysia";
import type ExceptionModel from "./exception.model";

const globalExceptionController = new Elysia().onError(
  { as: "global" },
  ({ code, error, status, request }) => {
    const problem = (
      type: string,
      title: string,
      detail: string,
      http: number,
      url: string
    ) => {
      const exception: ExceptionModel.ProblemDetails = {
        type,
        title,
        detail,
        status: http,
        instance: url ?? "",
      };
      return status(http, exception);
    };

    if (code === "NOT_FOUND")
      return problem(
        "https://example.com/errors/not-found",
        "Not Found",
        "The requested resource does not exist.",
        404,
        request.url
      );

    if (code === "VALIDATION") {
      const details = (error as any).all
        .map((e: any) => `${e.path}: ${e.message}`)
        .join("; ");
      return problem(
        "https://example.com/errors/validation",
        "Bad Request",
        details,
        400,
        request.url
      );
    }

    console.error("🛑 Unexpected error:", error);
    return problem(
      "https://example.com/errors/internal",
      "Internal Server Error",
      "Something went wrong on the server.",
      500,
      request.url
    );
  }
);

export default globalExceptionController;
