// server/utils/errors.ts
export class BaseError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_SERVER_ERROR'
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string = 'Bad Request') {
    super(message, 400, 'BAD_REQUEST');
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string = 'Not Found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class ConflictError extends BaseError {
  constructor(message: string = 'Conflict') {
    super(message, 409, 'CONFLICT');
  }
}

export class ValidationError extends BaseError {
  constructor(message: string = 'Validation Error', public errors?: any) {
    super(message, 422, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

export class RateLimitError extends BaseError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}

export class TokenExpiredError extends BaseError {
  constructor(message: string = 'Token expired') {
    super(message, 401, 'TOKEN_EXPIRED');
  }
}

export class AccountInactiveError extends BaseError {
  constructor(message: string = 'Account is inactive') {
    super(message, 403, 'ACCOUNT_INACTIVE');
  }
}