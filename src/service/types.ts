export interface Boundry {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  x4: number;
  y4: number;
}

export interface Ocr {
  text: string;
  boundries: Boundry[];
}

export interface BoundingBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Sign {
  label: string;
  boundry: BoundingBox;
}

export interface Result {
  ocr: Ocr[];
  sign: Sign;
}

export interface RootObject {
  result: Result[];
}

export interface IResult {
  label: string;
  probability: number;
  boundingBoxes: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  nestedSigns?: IResult[];
}
