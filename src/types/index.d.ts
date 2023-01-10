import { ISign } from './signPrediction';

export * from './textDetection';
export * from './signPrediction';

export interface IResult extends ISign {
  textContent?: ITextContent[];
}
