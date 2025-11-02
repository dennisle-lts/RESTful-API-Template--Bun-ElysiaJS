import z from "zod";

namespace ExceptionModel {
  export const problemDetails = z.object({
    type: z.string(),
    title: z.string(),
    detail: z.string(),
    status: z.number(),
    instance: z.url(),
  });

  export type ProblemDetails = z.infer<typeof problemDetails>;
}

export default ExceptionModel;
