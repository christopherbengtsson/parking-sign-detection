export const mock = {
  modelVersion: '2022-10-12-preview',
  metadata: {
    width: 960,
    height: 1280,
  },
  readResult: {
    stringIndexType: 'TextElements',
    content: '30 min',
    pages: [
      {
        height: 1280,
        width: 960,
        angle: 2.3884,
        pageNumber: 1,
        words: [
          {
            content: '30',
            boundingBox: [282, 952, 407, 954, 405, 1058, 282, 1047],
            confidence: 0.959,
            span: {
              offset: 0,
              length: 2,
            },
          },
          {
            content: 'min',
            boundingBox: [496, 956, 722, 971, 715, 1072, 492, 1063],
            confidence: 0.998,
            span: {
              offset: 3,
              length: 3,
            },
          },
        ],
        spans: [
          {
            offset: 0,
            length: 6,
          },
        ],
        lines: [
          {
            content: '30 min',
            boundingBox: [282, 952, 741, 968, 735, 1072, 282, 1050],
            spans: [
              {
                offset: 0,
                length: 6,
              },
            ],
          },
        ],
      },
    ],
    styles: [],
    modelVersion: '2022-04-30-slim',
  },
};
