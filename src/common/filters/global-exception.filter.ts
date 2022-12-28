import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.status || exception.statusCode || '500';
    const message = exception.message || 'Internal server error';
    const error = exception.error || 'internal_server_error';

    response.status(status).json(
      exception.response || {
        message,
        error,
      },
    );
  }
}
