import { ITextContent } from './textDetection';

export interface ISign {
  label: string;
  probability: number;
  boundingBoxes: IBoundingBoxes;
  nestedSigns?: ISign[];
}

export interface IBoundingBoxes {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface IImageSize {
  width: number;
  height: number;
}
