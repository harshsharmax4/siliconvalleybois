// File generated from our OpenAPI spec by Stainless.

import * as Core from 'martian-node/core';
import { APIPromise } from 'martian-node/core';
import { APIResource } from 'martian-node/resource';
import * as ChatCompletionsAPI from 'martian-node/resources/chat/completions';
import * as CompletionsAPI from 'martian-node/resources/completions';
import * as Shared from 'martian-node/resources/shared';
import { Stream } from 'martian-node/streaming';

export class Completions extends APIResource {
  /**
   * Creates a model response for the given chat conversation.
   */
  create(
    body: ChatCompletionCreateParamsNonStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<ChatCompletion>;
  create(
    body: ChatCompletionCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatCompletionChunk>>;
  create(
    body: ChatCompletionCreateParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatCompletionChunk> | ChatCompletion>;
  create(
    body: ChatCompletionCreateParams,
    options?: Core.RequestOptions,
  ): APIPromise<ChatCompletion> | APIPromise<Stream<ChatCompletionChunk>> {
    return this._client.post('/chat/completions', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<ChatCompletion>
      | APIPromise<Stream<ChatCompletionChunk>>;
  }
}

/**
 * Represents a chat completion response returned by model, based on the provided
 * input.
 */
export interface ChatCompletion {
  /**
   * A unique identifier for the chat completion.
   */
  id: string;

  /**
   * A list of chat completion choices. Can be more than one if `n` is greater
   * than 1.
   */
  choices: Array<ChatCompletion.Choice>;

  /**
   * The Unix timestamp (in seconds) of when the chat completion was created.
   */
  created: number;

  /**
   * The model used for the chat completion.
   */
  model: string;

  /**
   * The object type, which is always `chat.completion`.
   */
  object: 'chat.completion';

  /**
   * This fingerprint represents the backend configuration that the model runs with.
   *
   * Can be used in conjunction with the `seed` request parameter to understand when
   * backend changes have been made that might impact determinism.
   */
  system_fingerprint?: string;

  /**
   * Usage statistics for the completion request.
   */
  usage?: CompletionsAPI.CompletionUsage;
}

export namespace ChatCompletion {
  export interface Choice {
    /**
     * The reason the model stopped generating tokens. This will be `stop` if the model
     * hit a natural stop point or a provided stop sequence, `length` if the maximum
     * number of tokens specified in the request was reached, `content_filter` if
     * content was omitted due to a flag from our content filters, `tool_calls` if the
     * model called a tool, or `function_call` (deprecated) if the model called a
     * function.
     */
    finish_reason: 'stop' | 'length' | 'tool_calls' | 'content_filter' | 'function_call';

    /**
     * The index of the choice in the list of choices.
     */
    index: number;

    /**
     * A chat completion message generated by the model.
     */
    message: ChatCompletionsAPI.ChatCompletionMessage;
  }
}

export interface ChatCompletionAssistantMessageParam {
  /**
   * The contents of the assistant message.
   */
  content: string | null;

  /**
   * The role of the messages author, in this case `assistant`.
   */
  role: 'assistant';

  /**
   * Deprecated and replaced by `tool_calls`. The name and arguments of a function
   * that should be called, as generated by the model.
   */
  function_call?: ChatCompletionAssistantMessageParam.FunctionCall;

  /**
   * The tool calls generated by the model, such as function calls.
   */
  tool_calls?: Array<ChatCompletionMessageToolCall>;
}

export namespace ChatCompletionAssistantMessageParam {
  /**
   * Deprecated and replaced by `tool_calls`. The name and arguments of a function
   * that should be called, as generated by the model.
   */
  export interface FunctionCall {
    /**
     * The arguments to call the function with, as generated by the model in JSON
     * format. Note that the model does not always generate valid JSON, and may
     * hallucinate parameters not defined by your function schema. Validate the
     * arguments in your code before calling your function.
     */
    arguments: string;

    /**
     * The name of the function to call.
     */
    name: string;
  }
}

/**
 * Represents a streamed chunk of a chat completion response returned by model,
 * based on the provided input.
 */
export interface ChatCompletionChunk {
  /**
   * A unique identifier for the chat completion. Each chunk has the same ID.
   */
  id: string;

  /**
   * A list of chat completion choices. Can be more than one if `n` is greater
   * than 1.
   */
  choices: Array<ChatCompletionChunk.Choice>;

  /**
   * The Unix timestamp (in seconds) of when the chat completion was created. Each
   * chunk has the same timestamp.
   */
  created: number;

  /**
   * The model to generate the completion.
   */
  model: string;

  /**
   * The object type, which is always `chat.completion.chunk`.
   */
  object: 'chat.completion.chunk';

  /**
   * This fingerprint represents the backend configuration that the model runs with.
   * Can be used in conjunction with the `seed` request parameter to understand when
   * backend changes have been made that might impact determinism.
   */
  system_fingerprint?: string;
}

export namespace ChatCompletionChunk {
  export interface Choice {
    /**
     * A chat completion delta generated by streamed model responses.
     */
    delta: Choice.Delta;

    /**
     * The reason the model stopped generating tokens. This will be `stop` if the model
     * hit a natural stop point or a provided stop sequence, `length` if the maximum
     * number of tokens specified in the request was reached, `content_filter` if
     * content was omitted due to a flag from our content filters, `tool_calls` if the
     * model called a tool, or `function_call` (deprecated) if the model called a
     * function.
     */
    finish_reason: 'stop' | 'length' | 'tool_calls' | 'content_filter' | 'function_call' | null;

    /**
     * The index of the choice in the list of choices.
     */
    index: number;
  }

  export namespace Choice {
    /**
     * A chat completion delta generated by streamed model responses.
     */
    export interface Delta {
      /**
       * The contents of the chunk message.
       */
      content?: string | null;

      /**
       * Deprecated and replaced by `tool_calls`. The name and arguments of a function
       * that should be called, as generated by the model.
       */
      function_call?: Delta.FunctionCall;

      /**
       * The role of the author of this message.
       */
      role?: 'system' | 'user' | 'assistant' | 'tool';

      tool_calls?: Array<Delta.ToolCall>;
    }

    export namespace Delta {
      /**
       * Deprecated and replaced by `tool_calls`. The name and arguments of a function
       * that should be called, as generated by the model.
       */
      export interface FunctionCall {
        /**
         * The arguments to call the function with, as generated by the model in JSON
         * format. Note that the model does not always generate valid JSON, and may
         * hallucinate parameters not defined by your function schema. Validate the
         * arguments in your code before calling your function.
         */
        arguments?: string;

        /**
         * The name of the function to call.
         */
        name?: string;
      }

      export interface ToolCall {
        index: number;

        /**
         * The ID of the tool call.
         */
        id?: string;

        function?: ToolCall.Function;

        /**
         * The type of the tool. Currently, only `function` is supported.
         */
        type?: 'function';
      }

      export namespace ToolCall {
        export interface Function {
          /**
           * The arguments to call the function with, as generated by the model in JSON
           * format. Note that the model does not always generate valid JSON, and may
           * hallucinate parameters not defined by your function schema. Validate the
           * arguments in your code before calling your function.
           */
          arguments?: string;

          /**
           * The name of the function to call.
           */
          name?: string;
        }
      }
    }
  }
}

export type ChatCompletionContentPart = ChatCompletionContentPartText | ChatCompletionContentPartImage;

export interface ChatCompletionContentPartImage {
  image_url: ChatCompletionContentPartImage.ImageURL;

  /**
   * The type of the content part.
   */
  type: 'image_url';
}

export namespace ChatCompletionContentPartImage {
  export interface ImageURL {
    /**
     * Either a URL of the image or the base64 encoded image data.
     */
    url: string;

    /**
     * Specifies the detail level of the image.
     */
    detail?: 'auto' | 'low' | 'high';
  }
}

export interface ChatCompletionContentPartText {
  /**
   * The text content.
   */
  text: string;

  /**
   * The type of the content part.
   */
  type: 'text';
}

/**
 * Specifying a particular function via `{"name": "my_function"}` forces the model
 * to call that function.
 */
export interface ChatCompletionFunctionCallOption {
  /**
   * The name of the function to call.
   */
  name: string;
}

export interface ChatCompletionFunctionMessageParam {
  /**
   * The return value from the function call, to return to the model.
   */
  content: string | null;

  /**
   * The name of the function to call.
   */
  name: string;

  /**
   * The role of the messages author, in this case `function`.
   */
  role: 'function';
}

/**
 * A chat completion message generated by the model.
 */
export interface ChatCompletionMessage {
  /**
   * The contents of the message.
   */
  content: string | null;

  /**
   * The role of the author of this message.
   */
  role: 'assistant';

  /**
   * Deprecated and replaced by `tool_calls`. The name and arguments of a function
   * that should be called, as generated by the model.
   */
  function_call?: ChatCompletionMessage.FunctionCall;

  /**
   * The tool calls generated by the model, such as function calls.
   */
  tool_calls?: Array<ChatCompletionMessageToolCall>;
}

export namespace ChatCompletionMessage {
  /**
   * Deprecated and replaced by `tool_calls`. The name and arguments of a function
   * that should be called, as generated by the model.
   */
  export interface FunctionCall {
    /**
     * The arguments to call the function with, as generated by the model in JSON
     * format. Note that the model does not always generate valid JSON, and may
     * hallucinate parameters not defined by your function schema. Validate the
     * arguments in your code before calling your function.
     */
    arguments: string;

    /**
     * The name of the function to call.
     */
    name: string;
  }
}

export type ChatCompletionMessageParam =
  | ChatCompletionSystemMessageParam
  | ChatCompletionUserMessageParam
  | ChatCompletionAssistantMessageParam
  | ChatCompletionToolMessageParam
  | ChatCompletionFunctionMessageParam;

export interface ChatCompletionMessageToolCall {
  /**
   * The ID of the tool call.
   */
  id: string;

  /**
   * The function that the model called.
   */
  function: ChatCompletionMessageToolCall.Function;

  /**
   * The type of the tool. Currently, only `function` is supported.
   */
  type: 'function';
}

export namespace ChatCompletionMessageToolCall {
  /**
   * The function that the model called.
   */
  export interface Function {
    /**
     * The arguments to call the function with, as generated by the model in JSON
     * format. Note that the model does not always generate valid JSON, and may
     * hallucinate parameters not defined by your function schema. Validate the
     * arguments in your code before calling your function.
     */
    arguments: string;

    /**
     * The name of the function to call.
     */
    name: string;
  }
}

/**
 * Specifies a tool the model should use. Use to force the model to call a specific
 * function.
 */
export interface ChatCompletionNamedToolChoice {
  function?: ChatCompletionNamedToolChoice.Function;

  /**
   * The type of the tool. Currently, only `function` is supported.
   */
  type?: 'function';
}

export namespace ChatCompletionNamedToolChoice {
  export interface Function {
    /**
     * The name of the function to call.
     */
    name: string;
  }
}

/**
 * The role of the author of a message
 */
export type ChatCompletionRole = 'system' | 'user' | 'assistant' | 'tool' | 'function';

export interface ChatCompletionSystemMessageParam {
  /**
   * The contents of the system message.
   */
  content: string | null;

  /**
   * The role of the messages author, in this case `system`.
   */
  role: 'system';
}

export interface ChatCompletionTool {
  function: Shared.FunctionDefinition;

  /**
   * The type of the tool. Currently, only `function` is supported.
   */
  type: 'function';
}

/**
 * Controls which (if any) function is called by the model. `none` means the model
 * will not call a function and instead generates a message. `auto` means the model
 * can pick between generating a message or calling a function. Specifying a
 * particular function via
 * `{"type: "function", "function": {"name": "my_function"}}` forces the model to
 * call that function.
 *
 * `none` is the default when no functions are present. `auto` is the default if
 * functions are present.
 */
export type ChatCompletionToolChoiceOption = 'none' | 'auto' | ChatCompletionNamedToolChoice;

export interface ChatCompletionToolMessageParam {
  /**
   * The contents of the tool message.
   */
  content: string | null;

  /**
   * The role of the messages author, in this case `tool`.
   */
  role: 'tool';

  /**
   * Tool call that this message is responding to.
   */
  tool_call_id: string;
}

export interface ChatCompletionUserMessageParam {
  /**
   * The contents of the user message.
   */
  content: string | Array<ChatCompletionContentPart> | null;

  /**
   * The role of the messages author, in this case `user`.
   */
  role: 'user';
}

/**
 * @deprecated ChatCompletionMessageParam should be used instead
 */
export type CreateChatCompletionRequestMessage = ChatCompletionMessageParam;

export type ChatCompletionCreateParams =
  | ChatCompletionCreateParamsNonStreaming
  | ChatCompletionCreateParamsStreaming;

export type ModelType =
  | (string & {})
  | 'router'
  | 'claude-v1'
  | 'claude-v2'
  | 'claude-instant-v1'
  | 'llama-2-70b-chat'
  | 'gpt-3.5-turbo'
  | 'gpt-4-32k'
  | 'gpt-4'
  | 'gpt-4-turbo-128k';

export interface ChatCompletionCreateParamsBase {
  /**
   * A list of messages comprising the conversation so far.
   * [Example Python code](https://cookbook.openai.com/examples/how_to_format_inputs_to_chatgpt_models).
   */
  messages: Array<ChatCompletionMessageParam>;

  /**
   * ID of the model to use. See the
   * [model endpoint compatibility](https://platform.openai.com/docs/models/model-endpoint-compatibility)
   * table for details on which models work with the Chat API.
   */
  model: ModelType | ModelType[];

  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their
   * existing frequency in the text so far, decreasing the model's likelihood to
   * repeat the same line verbatim.
   *
   * [See more information about frequency and presence penalties.](https://platform.openai.com/docs/guides/gpt/parameter-details)
   */
  frequency_penalty?: number | null;

  /**
   * Deprecated in favor of `tool_choice`.
   *
   * Controls which (if any) function is called by the model. `none` means the model
   * will not call a function and instead generates a message. `auto` means the model
   * can pick between generating a message or calling a function. Specifying a
   * particular function via `{"name": "my_function"}` forces the model to call that
   * function.
   *
   * `none` is the default when no functions are present. `auto`` is the default if
   * functions are present.
   */
  function_call?: 'none' | 'auto' | ChatCompletionFunctionCallOption;

  /**
   * Deprecated in favor of `tools`.
   *
   * A list of functions the model may generate JSON inputs for.
   */
  functions?: Array<ChatCompletionCreateParams.Function>;

  /**
   * Modify the likelihood of specified tokens appearing in the completion.
   *
   * Accepts a JSON object that maps tokens (specified by their token ID in the
   * tokenizer) to an associated bias value from -100 to 100. Mathematically, the
   * bias is added to the logits generated by the model prior to sampling. The exact
   * effect will vary per model, but values between -1 and 1 should decrease or
   * increase likelihood of selection; values like -100 or 100 should result in a ban
   * or exclusive selection of the relevant token.
   */
  logit_bias?: Record<string, number> | null;

  /**
   * The maximum number of [tokens](/tokenizer) to generate in the chat completion.
   *
   * The total length of input tokens and generated tokens is limited by the model's
   * context length.
   * [Example Python code](https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken)
   * for counting tokens.
   */
  max_tokens?: number | null;

  /**
   * How many chat completion choices to generate for each input message.
   */
  n?: number | null;

  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on
   * whether they appear in the text so far, increasing the model's likelihood to
   * talk about new topics.
   *
   * [See more information about frequency and presence penalties.](https://platform.openai.com/docs/guides/gpt/parameter-details)
   */
  presence_penalty?: number | null;

  /**
   * An object specifying the format that the model must output.
   *
   * Setting to `{ "type": "json_object" }` enables JSON mode, which guarantees the
   * message the model generates is valid JSON.
   *
   * **Important:** when using JSON mode, you **must** also instruct the model to
   * produce JSON yourself via a system or user message. Without this, the model may
   * generate an unending stream of whitespace until the generation reaches the token
   * limit, resulting in increased latency and appearance of a "stuck" request. Also
   * note that the message content may be partially cut off if
   * `finish_reason="length"`, which indicates the generation exceeded `max_tokens`
   * or the conversation exceeded the max context length.
   */
  response_format?: ChatCompletionCreateParams.ResponseFormat;

  /**
   * This feature is in Beta. If specified, our system will make a best effort to
   * sample deterministically, such that repeated requests with the same `seed` and
   * parameters should return the same result. Determinism is not guaranteed, and you
   * should refer to the `system_fingerprint` response parameter to monitor changes
   * in the backend.
   */
  seed?: number | null;

  /**
   * Up to 4 sequences where the API will stop generating further tokens.
   */
  stop?: string | null | Array<string>;

  /**
   * If set, partial message deltas will be sent, like in ChatGPT. Tokens will be
   * sent as data-only
   * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format)
   * as they become available, with the stream terminated by a `data: [DONE]`
   * message.
   * [Example Python code](https://cookbook.openai.com/examples/how_to_stream_completions).
   */
  stream?: boolean | null;

  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will
   * make the output more random, while lower values like 0.2 will make it more
   * focused and deterministic.
   *
   * We generally recommend altering this or `top_p` but not both.
   */
  temperature?: number | null;

  /**
   * Controls which (if any) function is called by the model. `none` means the model
   * will not call a function and instead generates a message. `auto` means the model
   * can pick between generating a message or calling a function. Specifying a
   * particular function via
   * `{"type: "function", "function": {"name": "my_function"}}` forces the model to
   * call that function.
   *
   * `none` is the default when no functions are present. `auto` is the default if
   * functions are present.
   */
  tool_choice?: ChatCompletionToolChoiceOption;

  /**
   * A list of tools the model may call. Currently, only functions are supported as a
   * tool. Use this to provide a list of functions the model may generate JSON inputs
   * for.
   */
  tools?: Array<ChatCompletionTool>;

  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the
   * model considers the results of the tokens with top_p probability mass. So 0.1
   * means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   */
  top_p?: number | null;

  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor
   * and detect abuse.
   * [Learn more](https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids).
   */
  user?: string;
}

export namespace ChatCompletionCreateParams {
  export interface Function {
    /**
     * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain
     * underscores and dashes, with a maximum length of 64.
     */
    name: string;

    /**
     * The parameters the functions accepts, described as a JSON Schema object. See the
     * [guide](https://platform.openai.com/docs/guides/gpt/function-calling) for
     * examples, and the
     * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
     * documentation about the format.
     *
     * To describe a function that accepts no parameters, provide the value
     * `{"type": "object", "properties": {}}`.
     */
    parameters: Shared.FunctionParameters;

    /**
     * A description of what the function does, used by the model to choose when and
     * how to call the function.
     */
    description?: string;
  }

  /**
   * An object specifying the format that the model must output.
   *
   * Setting to `{ "type": "json_object" }` enables JSON mode, which guarantees the
   * message the model generates is valid JSON.
   *
   * **Important:** when using JSON mode, you **must** also instruct the model to
   * produce JSON yourself via a system or user message. Without this, the model may
   * generate an unending stream of whitespace until the generation reaches the token
   * limit, resulting in increased latency and appearance of a "stuck" request. Also
   * note that the message content may be partially cut off if
   * `finish_reason="length"`, which indicates the generation exceeded `max_tokens`
   * or the conversation exceeded the max context length.
   */
  export interface ResponseFormat {
    /**
     * Must be one of `text` or `json_object`.
     */
    type?: 'text' | 'json_object';
  }

  export type ChatCompletionCreateParamsNonStreaming =
    ChatCompletionsAPI.ChatCompletionCreateParamsNonStreaming;
  export type ChatCompletionCreateParamsStreaming = ChatCompletionsAPI.ChatCompletionCreateParamsStreaming;
}

/**
 * @deprecated Use ChatCompletionCreateParams instead
 */
export type CompletionCreateParams = ChatCompletionCreateParams;

export interface ChatCompletionCreateParamsNonStreaming extends ChatCompletionCreateParamsBase {
  /**
   * If set, partial message deltas will be sent, like in ChatGPT. Tokens will be
   * sent as data-only
   * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format)
   * as they become available, with the stream terminated by a `data: [DONE]`
   * message.
   * [Example Python code](https://cookbook.openai.com/examples/how_to_stream_completions).
   */
  stream?: false | null;
}

/**
 * @deprecated Use ChatCompletionCreateParamsNonStreaming instead
 */
export type CompletionCreateParamsNonStreaming = ChatCompletionCreateParamsNonStreaming;

export interface ChatCompletionCreateParamsStreaming extends ChatCompletionCreateParamsBase {
  /**
   * If set, partial message deltas will be sent, like in ChatGPT. Tokens will be
   * sent as data-only
   * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format)
   * as they become available, with the stream terminated by a `data: [DONE]`
   * message.
   * [Example Python code](https://cookbook.openai.com/examples/how_to_stream_completions).
   */
  stream: true;
}

/**
 * @deprecated Use ChatCompletionCreateParamsStreaming instead
 */
export type CompletionCreateParamsStreaming = ChatCompletionCreateParamsStreaming;

export namespace Completions {
  export import ChatCompletion = ChatCompletionsAPI.ChatCompletion;
  export import ChatCompletionAssistantMessageParam = ChatCompletionsAPI.ChatCompletionAssistantMessageParam;
  export import ChatCompletionChunk = ChatCompletionsAPI.ChatCompletionChunk;
  export import ChatCompletionContentPart = ChatCompletionsAPI.ChatCompletionContentPart;
  export import ChatCompletionContentPartImage = ChatCompletionsAPI.ChatCompletionContentPartImage;
  export import ChatCompletionContentPartText = ChatCompletionsAPI.ChatCompletionContentPartText;
  export import ChatCompletionFunctionCallOption = ChatCompletionsAPI.ChatCompletionFunctionCallOption;
  export import ChatCompletionFunctionMessageParam = ChatCompletionsAPI.ChatCompletionFunctionMessageParam;
  export import ChatCompletionMessage = ChatCompletionsAPI.ChatCompletionMessage;
  export import ChatCompletionMessageParam = ChatCompletionsAPI.ChatCompletionMessageParam;
  export import ChatCompletionMessageToolCall = ChatCompletionsAPI.ChatCompletionMessageToolCall;
  export import ChatCompletionNamedToolChoice = ChatCompletionsAPI.ChatCompletionNamedToolChoice;
  export import ChatCompletionRole = ChatCompletionsAPI.ChatCompletionRole;
  export import ChatCompletionSystemMessageParam = ChatCompletionsAPI.ChatCompletionSystemMessageParam;
  export import ChatCompletionTool = ChatCompletionsAPI.ChatCompletionTool;
  export import ChatCompletionToolChoiceOption = ChatCompletionsAPI.ChatCompletionToolChoiceOption;
  export import ChatCompletionToolMessageParam = ChatCompletionsAPI.ChatCompletionToolMessageParam;
  export import ChatCompletionUserMessageParam = ChatCompletionsAPI.ChatCompletionUserMessageParam;
  /**
   * @deprecated ChatCompletionMessageParam should be used instead
   */
  export import CreateChatCompletionRequestMessage = ChatCompletionsAPI.CreateChatCompletionRequestMessage;
  export import ChatCompletionCreateParams = ChatCompletionsAPI.ChatCompletionCreateParams;
  export import CompletionCreateParams = ChatCompletionsAPI.CompletionCreateParams;
  export import ChatCompletionCreateParamsNonStreaming = ChatCompletionsAPI.ChatCompletionCreateParamsNonStreaming;
  export import CompletionCreateParamsNonStreaming = ChatCompletionsAPI.CompletionCreateParamsNonStreaming;
  export import ChatCompletionCreateParamsStreaming = ChatCompletionsAPI.ChatCompletionCreateParamsStreaming;
  export import CompletionCreateParamsStreaming = ChatCompletionsAPI.CompletionCreateParamsStreaming;
}
