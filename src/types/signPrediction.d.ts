export interface IResult extends ISign {
  textContent: string[];
}

export interface ISign {
  label: string;
  probability: number;
  boundingBoxes: IBoundingBoxes;
  nestedSign?: ISign;
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
