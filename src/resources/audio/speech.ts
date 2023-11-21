// File generated from our OpenAPI spec by Stainless.

import * as Core from 'martian-node/core';
import { APIResource } from 'martian-node/resource';
import { type Response } from 'martian-node/_shims/index';
import * as SpeechAPI from 'martian-node/resources/audio/speech';

export class Speech extends APIResource {
  /**
   * Generates audio from the input text.
   */
  create(body: SpeechCreateParams, options?: Core.RequestOptions): Core.APIPromise<Response> {
    return this._client.post('/audio/speech', { body, ...options, __binaryResponse: true });
  }
}

export interface SpeechCreateParams {
  /**
   * The text to generate audio for. The maximum length is 4096 characters.
   */
  input: string;

  /**
   * One of the available [TTS models](https://platform.openai.com/docs/models/tts):
   * `tts-1` or `tts-1-hd`
   */
  model: (string & {}) | 'tts-1' | 'tts-1-hd';

  /**
   * The voice to use when generating the audio. Supported voices are `alloy`,
   * `echo`, `fable`, `onyx`, `nova`, and `shimmer`.
   */
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

  /**
   * The format to audio in. Supported formats are `mp3`, `opus`, `aac`, and `flac`.
   */
  response_format?: 'mp3' | 'opus' | 'aac' | 'flac';

  /**
   * The speed of the generated audio. Select a value from `0.25` to `4.0`. `1.0` is
   * the default.
   */
  speed?: number;
}

export namespace Speech {
  export import SpeechCreateParams = SpeechAPI.SpeechCreateParams;
}
