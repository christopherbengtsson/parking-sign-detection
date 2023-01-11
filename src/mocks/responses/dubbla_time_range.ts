export const mock = {
  modelVersion: '2022-10-12-preview',
  metadata: {
    width: 492,
    height: 1301,
  },
  readResult: {
    stringIndexType: 'TextElements',
    content: 'P\n1 tim\n8-22\nP\n(8-22)\nAvgift\n4 tim\n8-22\n(8-22)',
    pages: [
      {
        height: 1301,
        width: 492,
        angle: 0,
        pageNumber: 1,
        words: [
          {
            content: 'P',
            boundingBox: [139, 81, 313, 81, 324, 402, 139, 408],
            confidence: 0.995,
            span: {
              offset: 0,
              length: 1,
            },
          },
          {
            content: '1',
            boundingBox: [232, 496, 257, 496, 256, 551, 232, 551],
            confidence: 0.991,
            span: {
              offset: 2,
              length: 1,
            },
          },
          {
            content: 'tim',
            boundingBox: [268, 496, 340, 497, 340, 552, 267, 551],
            confidence: 0.998,
            span: {
              offset: 4,
              length: 3,
            },
          },
          {
            content: '8-22',
            boundingBox: [215, 566, 371, 569, 370, 624, 215, 621],
            confidence: 0.994,
            span: {
              offset: 8,
              length: 4,
            },
          },
          {
            content: 'P',
            boundingBox: [129, 613, 140, 613, 140, 633, 129, 633],
            confidence: 0.995,
            span: {
              offset: 13,
              length: 1,
            },
          },
          {
            content: '(8-22)',
            boundingBox: [185, 636, 395, 639, 394, 693, 184, 691],
            confidence: 0.994,
            span: {
              offset: 15,
              length: 6,
            },
          },
          {
            content: 'Avgift',
            boundingBox: [138, 767, 340, 765, 342, 841, 139, 845],
            confidence: 0.995,
            span: {
              offset: 22,
              length: 6,
            },
          },
          {
            content: '4',
            boundingBox: [160, 848, 201, 848, 200, 911, 160, 911],
            confidence: 0.991,
            span: {
              offset: 29,
              length: 1,
            },
          },
          {
            content: 'tim',
            boundingBox: [219, 848, 303, 848, 303, 912, 218, 911],
            confidence: 0.998,
            span: {
              offset: 31,
              length: 3,
            },
          },
          {
            content: '8-22',
            boundingBox: [145, 932, 322, 927, 322, 991, 144, 992],
            confidence: 0.928,
            span: {
              offset: 35,
              length: 4,
            },
          },
          {
            content: '(8-22)',
            boundingBox: [120, 1008, 347, 1003, 348, 1069, 125, 1077],
            confidence: 0.997,
            span: {
              offset: 40,
              length: 6,
            },
          },
        ],
        spans: [
          {
            offset: 0,
            length: 46,
          },
        ],
        lines: [
          {
            content: 'P',
            boundingBox: [143, 81, 370, 100, 364, 374, 139, 409],
            spans: [
              {
                offset: 0,
                length: 1,
              },
            ],
          },
          {
            content: '1 tim',
            boundingBox: [232, 496, 362, 497, 360, 552, 232, 551],
            spans: [
              {
                offset: 2,
                length: 5,
              },
            ],
          },
          {
            content: '8-22',
            boundingBox: [215, 566, 377, 570, 377, 623, 215, 621],
            spans: [
              {
                offset: 8,
                length: 4,
              },
            ],
          },
          {
            content: 'P',
            boundingBox: [129, 613, 152, 613, 152, 633, 129, 633],
            spans: [
              {
                offset: 13,
                length: 1,
              },
            ],
          },
          {
            content: '(8-22)',
            boundingBox: [184, 635, 396, 638, 395, 693, 183, 690],
            spans: [
              {
                offset: 15,
                length: 6,
              },
            ],
          },
          {
            content: 'Avgift',
            boundingBox: [138, 767, 341, 765, 342, 839, 139, 845],
            spans: [
              {
                offset: 22,
                length: 6,
              },
            ],
          },
          {
            content: '4 tim',
            boundingBox: [160, 850, 326, 848, 326, 912, 160, 908],
            spans: [
              {
                offset: 29,
                length: 5,
              },
            ],
          },
          {
            content: '8-22',
            boundingBox: [143, 930, 331, 927, 332, 990, 143, 992],
            spans: [
              {
                offset: 35,
                length: 4,
              },
            ],
          },
          {
            content: '(8-22)',
            boundingBox: [119, 1008, 349, 1002, 350, 1069, 121, 1076],
            spans: [
              {
                offset: 40,
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
