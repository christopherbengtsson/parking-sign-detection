import { IBoundingBoxes, IImageSize } from './signPrediction';

export interface IOcr {
  modelVersion: string;
  metadata: IImageSize;
  readResult: IReadResult;
}

export interface IReadResult {
  stringIndexType: string;
  content: string;
  pages: IPage[];
  styles: any[];
  modelVersion: string;
}

export interface IPage {
  height: number;
  width: number;
  angle: number;
  pageNumber: number;
  words: IWord[];
  spans: ISpan[];
  lines: ILine[];
}

export interface IWord {
  content: string;
  boundingBox: number[];
  confidence: number;
  span: ISpan;
}

export interface ISpan {
  offset: number;
  length: number;
}

export interface ILine {
  content: string;
  boundingBox: number[];
  spans: ISpan[];
}

export interface ITextContent {
  content: string;
  textBoundry: number[];
  normalizedTextBoundry: IBoundingBoxes;
}
