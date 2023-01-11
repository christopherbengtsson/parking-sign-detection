export const mock = {
  modelVersion: '2022-10-12-preview',
  metadata: {
    width: 1000,
    height: 601,
  },
  readResult: {
    stringIndexType: 'TextElements',
    content: '8 - 17\n(9 - 18)\nÖvningskörning.com',
    pages: [
      {
        height: 601,
        width: 1000,
        angle: 0.4183,
        pageNumber: 1,
        words: [
          {
            content: '8',
            boundingBox: [435, 390, 452, 391, 452, 420, 435, 421],
            confidence: 0.995,
            span: {
              offset: 0,
              length: 1,
            },
          },
          {
            content: '-',
            boundingBox: [461, 391, 478, 391, 477, 419, 460, 420],
            confidence: 0.995,
            span: {
              offset: 2,
              length: 1,
            },
          },
          {
            content: '17',
            boundingBox: [486, 391, 523, 390, 523, 421, 486, 419],
            confidence: 0.998,
            span: {
              offset: 4,
              length: 2,
            },
          },
          {
            content: '(9',
            boundingBox: [422, 426, 453, 427, 454, 462, 422, 462],
            confidence: 0.994,
            span: {
              offset: 7,
              length: 2,
            },
          },
          {
            content: '-',
            boundingBox: [461, 427, 477, 427, 478, 461, 461, 462],
            confidence: 0.995,
            span: {
              offset: 10,
              length: 1,
            },
          },
          {
            content: '18)',
            boundingBox: [484, 427, 540, 427, 542, 462, 485, 461],
            confidence: 0.998,
            span: {
              offset: 12,
              length: 3,
            },
          },
          {
            content: 'Övningskörning.com',
            boundingBox: [611, 550, 936, 556, 935, 591, 609, 590],
            confidence: 0.942,
            span: {
              offset: 16,
              length: 18,
            },
          },
        ],
        spans: [
          {
            offset: 0,
            length: 34,
          },
        ],
        lines: [
          {
            content: '8 - 17',
            boundingBox: [433, 390, 527, 389, 528, 420, 433, 421],
            spans: [
              {
                offset: 0,
                length: 6,
              },
            ],
          },
          {
            content: '(9 - 18)',
            boundingBox: [421, 425, 542, 426, 542, 462, 421, 461],
            spans: [
              {
                offset: 7,
                length: 8,
              },
            ],
          },
          {
            content: 'Övningskörning.com',
            boundingBox: [609, 550, 951, 553, 951, 591, 608, 589],
            spans: [
              {
                offset: 16,
                length: 18,
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
