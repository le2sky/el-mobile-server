import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (!(exception instanceof HttpException)) {
      Logger.error(exception);
      exception = new InternalServerErrorException(
        '예기치 못한 서버 오류 발생',
      );
    }

    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as {
      error: string;
      statusCode: number;
      message: string | string[];
    };

    // string 있을때 { statusCode: 401, message: 'it it unauthorized error', error: 'Unauthorized' },
    // 없을 때 { statusCode: 401, message: 'Unauthorized' },
    // message 있도록 쓰는거 권장

    response.status(status).json({
      success: false,
      timeStamp: new Date(),
      path: request.url,
      statusCode: status,
      message: errorResponse.message,
    });
  }
}
