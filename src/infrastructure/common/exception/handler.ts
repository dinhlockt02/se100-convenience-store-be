import {
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotImplementedException,
} from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { CoreException } from 'src/core/exceptions';

export const HandleExeption = (err: CoreException.BussinessException) => {
  if (err instanceof CoreException.NotFoundException) {
    throw new NotFoundException(err.message);
  }
  if (err instanceof CoreException.UnauthotizedException) {
    throw new UnauthorizedException(err.message);
  }
  if (err instanceof CoreException.ValidationException) {
    throw new BadRequestException(err.errors);
  }
  if (err instanceof CoreException.ConflictException) {
    throw new ConflictException(err.message);
  }
  if (err instanceof CoreException.NotImplemented) {
    throw new NotImplementedException();
  }
  throw new InternalServerErrorException(err.message);
};

export const apiResponseNotFoundOptions: ApiResponseOptions = {
  status: 404,
  description: 'Resource not found',
};

export const apiResponseUnauthorizedOptions: ApiResponseOptions = {
  status: 401,
  description: 'Unauthorized',
};

export const apiResponseBadRequestOptions: ApiResponseOptions = {
  status: 400,
  description: 'Bad request, possibly due to failed validations ',
};

export const apiResponseConflictOptions: ApiResponseOptions = {
  status: 409,
  description:
    'Conflict with server state, possibly due to existing resouce, ...',
};

export const apiResponseInternalServerOptions: ApiResponseOptions = {
  status: 500,
  description: 'Internal server error, maybe unexpected behavior has occurred',
};
