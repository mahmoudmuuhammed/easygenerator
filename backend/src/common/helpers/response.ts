import { JsonResponse } from '../types/httpResponse';

// Shared response helper
export class ResponseBuilder {
  public static json<T>(data: T): JsonResponse<T> {
    return {
      data,
    };
  }
}
