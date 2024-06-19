import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { QueryFailedError } from 'typeorm';
import { HttpAdapterHost } from '@nestjs/core';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const responseBody = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(request),
        message: exception.getResponse(),
      };
      httpAdapter.reply(response, responseBody, status);
    } else if (
      exception instanceof QueryFailedError &&
      exception['code'] === '23505'
    ) {
      // Handle duplicate key violation errors
      const status = HttpStatus.CONFLICT; // 409 Conflict
      const responseBody = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(request),
        message: exception['detail'],
      };
      httpAdapter.reply(response, responseBody, status);
    } else {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      const responseBody = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(request),
        message: 'Internal server error',
      };
      httpAdapter.reply(response, responseBody, status);
    }
  }

  handleError(err: any) {
    console.error('Event err', err.response);
  }
}
