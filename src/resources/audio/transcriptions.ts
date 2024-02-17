// File generated from our OpenAPI spec by Stainless.

import * as Core from 'openai/core';
import { APIResource } from 'openai/resource';
import * as TranscriptionsAPI from 'openai/resources/audio/transcriptions';
import { type Uploadable, multipartFormRequestOptions } from 'openai/core';
import { WhisperSegment } from './types';

export class Transcriptions extends APIResource {
  /**
   * Transcribes audio into the input language.
   */
  create(
    body: TranscriptionCreateParams & { response_format: 'json' },
    options?: Core.RequestOptions,
  ): Core.APIPromise<Transcription>;
  create(
    body: TranscriptionCreateParams & { response_format: 'verbose_json' },
    options?: Core.RequestOptions,
  ): Core.APIPromise<VerboseTranscription>;
  create(
    body: TranscriptionCreateParams & { response_format: 'srt' | 'text' | 'vtt' },
    options?: Core.RequestOptions,
  ): Core.APIPromise<string>;
  create(
    body: TranscriptionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Transcription | VerboseTranscription | string> {
    return this._client.post('/audio/transcriptions', multipartFormRequestOptions({ body, ...options }));
  }
}

export interface Transcription {
  text: string;
}

export interface VerboseTranscription extends Transcription {
  text: string;
  task: 'transcribe';
  language: string;
  duration: number;
  segments: WhisperSegment[];
}

export interface TranscriptionCreateParams {
  /**
   * The audio file object (not file name) to transcribe, in one of these formats:
   * flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.
   */
  file: Uploadable;

  /**
   * ID of the model to use. Only `whisper-1` is currently available.
   */
  model: (string & {}) | 'whisper-1';

  /**
   * The language of the input audio. Supplying the input language in
   * [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will
   * improve accuracy and latency.
   */
  language?: string;

  /**
   * An optional text to guide the model's style or continue a previous audio
   * segment. The
   * [prompt](https://platform.openai.com/docs/guides/speech-to-text/prompting)
   * should match the audio language.
   */
  prompt?: string;

  /**
   * The format of the transcript output, in one of these options: `json`, `text`,
   * `srt`, `verbose_json`, or `vtt`.
   */
  response_format?: 'json' | 'text' | 'srt' | 'verbose_json' | 'vtt';

  /**
   * The sampling temperature, between 0 and 1. Higher values like 0.8 will make the
   * output more random, while lower values like 0.2 will make it more focused and
   * deterministic. If set to 0, the model will use
   * [log probability](https://en.wikipedia.org/wiki/Log_probability) to
   * automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;

  /**
   * The timestamp granularities to populate for this transcription. Any of these
   * options: `word`, or `segment`. Note: There is no additional latency for segment
   * timestamps, but generating word timestamps incurs additional latency.
   */
  timestamp_granularities?: Array<'word' | 'segment'>;
}

export namespace Transcriptions {
  export import Transcription = TranscriptionsAPI.Transcription;
  export import TranscriptionCreateParams = TranscriptionsAPI.TranscriptionCreateParams;
}
