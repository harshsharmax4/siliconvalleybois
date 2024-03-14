import * as Core from '../../core';
import * as Errors from '../../error';
import OpenAI, { ClientOptions } from 'openai/index';
import { RequestInit } from 'node-fetch';

/** API Client for interfacing with the Azure OpenAI API. */
export interface AzureClientOptions extends ClientOptions {
  /**
   * Defaults to process.env['OPENAI_API_VERSION'].
   */
  apiVersion?: string | undefined;
  /**
   * Your Azure endpoint, including the resource, e.g. `https://example-resource.azure.openai.com/`
   */
  endpoint?: string | undefined;
  /**
   * A model deployment, if given, sets the base client URL to include `/deployments/{deployment}`.
   * Note: this means you won't be able to use non-deployment endpoints. Not supported with Assistants APIs.
   */
  deployment?: string | undefined;
  /**
   * Defaults to process.env['AZURE_OPENAI_API_KEY'].
   */
  apiKey?: string | undefined;
  /**
   * A function that returns a Microsoft Entra (formerly known as Azure Active Directory) access token, will be invoked on every request.
   */
  azureEntraTokenProvider?: (() => string) | undefined;
}

/** API Client for interfacing with the Azure OpenAI API. */
export class AzureOpenAI extends OpenAI {
  private _azureEntraTokenProvider: (() => string) | undefined;
  private _apiVersion: string;
  /**
   * API Client for interfacing with the Azure OpenAI API.
   *
   * @param {string | undefined} [opts.endpoint=process.env['OPENAI_API_VERSION'] ?? undefined]
   * @param {string | undefined} [opts.apiVersion=process.env['AZURE_OPENAI_ENDPOINT'] ?? undefined] - Your Azure endpoint, including the resource, e.g. `https://example-resource.azure.openai.com/`
   * @param {string | undefined} [opts.apiKey=process.env['AZURE_OPENAI_API_KEY'] ?? undefined]
   * @param {string | undefined} opts.deployment - A model deployment, if given, sets the base client URL to include `/deployments/{deployment}`.   * @param {string | null | undefined} [opts.organization=process.env['OPENAI_ORG_ID'] ?? null]
   * @param {string} [opts.baseURL=process.env['OPENAI_BASE_URL']] - Sets the base URL for the API.
   * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   */
  constructor({
    baseURL = Core.readEnv('OPENAI_BASE_URL'),
    apiKey = Core.readEnv('AZURE_OPENAI_API_KEY'),
    apiVersion = Core.readEnv('OPENAI_API_VERSION'),
    endpoint,
    deployment,
    azureEntraTokenProvider,
    ...opts
  }: AzureClientOptions = {}) {
    if (apiVersion === undefined) {
      throw new Errors.OpenAIError(
        "The OPENAI_API_VERSION environment variable is missing or empty; either provide it, or instantiate the AzureOpenAI client with an apiVersion option, like new AzureOpenAI({ apiVersion: 'My API Version' }).",
      );
    }

    if (typeof azureEntraTokenProvider === 'function') {
      opts.dangerouslyAllowBrowser = true;
    }

    if (!azureEntraTokenProvider && !apiKey) {
      throw new Errors.OpenAIError(
        'Missing credentials. Please pass one of `apiKey` and `azureEntraTokenProvider`, or set the `AZURE_OPENAI_API_KEY` environment variable.',
      );
    }

    if (azureEntraTokenProvider && apiKey) {
      throw new Errors.OpenAIError(
        'The `apiKey` and `azureEntraTokenProvider` arguments are mutually exclusive; Only one can be passed at a time.',
      );
    }

    // define a sentinel value to avoid any typing issues
    apiKey ??= API_KEY_SENTINEL;

    opts.defaultQuery = { ...opts.defaultQuery, 'api-version': apiVersion };

    if (!baseURL) {
      if (!endpoint) {
        endpoint = process.env['AZURE_OPENAI_ENDPOINT'];
      }

      if (!endpoint) {
        throw new Errors.OpenAIError(
          'Must provide one of the `baseURL` or `endpoint` arguments, or the `AZURE_OPENAI_ENDPOINT` environment variable',
        );
      }

      if (deployment) {
        baseURL = `${endpoint}/openai/deployments/${deployment}`;
      } else {
        baseURL = `${endpoint}/openai`;
      }
    } else {
      if (endpoint) {
        throw new Errors.OpenAIError('baseURL and endpoint are mutually exclusive');
      }
    }

    super({
      apiKey,
      baseURL,
      ...opts,
    });

    this._apiVersion = apiVersion;
    this._azureEntraTokenProvider = azureEntraTokenProvider;
  }

  override buildRequest<Req>(options: Core.FinalRequestOptions<Req>): {
    req: RequestInit;
    url: string;
    timeout: number;
  } {
    if (options.path in _deployments_endpoints) {
      const model = (options.body as any | undefined | null)?.model;
      if (model !== undefined && !this.baseURL.includes('/deployments')) {
        options.path = `/deployments/${model}${options.path}`;
      }
    }
    return super.buildRequest(options);
  }

  private _getAzureEntraToken(): string {
    const token = this._azureEntraTokenProvider?.();
    if (!token || typeof token !== 'string') {
      throw new Error(
        `Expected 'azureEntraTokenProvider' argument to defined and to return a string but it returned ${token}`,
      );
    }
    return token;
  }

  protected override async prepareOptions(options: Core.FinalRequestOptions<unknown>): Promise<void> {
    options.headers ??= {};

    const token = this._getAzureEntraToken();
    if (!options.headers['Authorization']) {
      options.headers['Authorization'] = `Bearer ${token}`;
    } else if (this.apiKey !== API_KEY_SENTINEL) {
      if (!options.headers['api-key']) {
        options.headers['api-key'] = this.apiKey;
      }
    } else {
      throw new Error('Unable to handle auth');
    }
    return super.prepareOptions(options);
  }
}

const _deployments_endpoints = new Set([
  '/completions',
  '/chat/completions',
  '/embeddings',
  '/audio/transcriptions',
  '/audio/translations',
  '/audio/speech',
  '/images/generations',
]);

const API_KEY_SENTINEL = '<Missing Key>';