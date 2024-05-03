// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Errors from './error';
import * as Uploads from './uploads';
import { OpenAI } from './client';
import { AzureClientOptions, AzureOpenAI } from './lib/azure/azure';

export { OpenAI };
export { AzureClientOptions, AzureOpenAI };
export default OpenAI;

export import toFile = Uploads.toFile;
export import fileFromPath = Uploads.fileFromPath;

export const {
  OpenAIError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} = Errors;

export * from './client';
