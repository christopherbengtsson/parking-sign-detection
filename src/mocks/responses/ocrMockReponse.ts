import { IOcr } from '../../types';

export const mockedOcrResponse: IOcr = {
  modelVersion: '2022-10-12-preview',
  metadata: {
    width: 960,
    height: 1280,
  },
  readResult: {
    stringIndexType: 'TextElements',
    content: 'P\n2 tim\n7-20\nTorsd\n0-8',
    pages: [
      {
        height: 1280,
        width: 960,
        angle: -3.5125,
        pageNumber: 1,
        words: [
          {
            content: 'P',
            boundingBox: [292, 121, 459, 109, 487, 400, 320, 417],
            confidence: 0.994,
            span: {
              offset: 0,
              length: 1,
            },
          },
          {
            content: '2',
            boundingBox: [374, 484, 412, 482, 415, 548, 376, 550],
            confidence: 0.996,
            span: {
              offset: 2,
              length: 1,
            },
          },
          {
            content: 'tim',
            boundingBox: [440, 481, 535, 478, 538, 544, 442, 547],
            confidence: 0.998,
            span: {
              offset: 4,
              length: 3,
            },
          },
          {
            content: '7-20',
            boundingBox: [387, 572, 548, 566, 551, 632, 389, 638],
            confidence: 0.98,
            span: {
              offset: 8,
              length: 4,
            },
          },
          {
            content: 'Torsd',
            boundingBox: [456, 701, 643, 690, 647, 757, 459, 769],
            confidence: 0.995,
            span: {
              offset: 13,
              length: 5,
            },
          },
          {
            content: '0-8',
            boundingBox: [498, 780, 618, 768, 624, 835, 502, 846],
            confidence: 0.971,
            span: {
              offset: 19,
              length: 3,
            },
          },
        ],
        spans: [
          {
            offset: 0,
            length: 22,
          },
        ],
        lines: [
          {
            content: 'P',
            boundingBox: [292, 122, 526, 109, 547, 386, 324, 417],
            spans: [
              {
                offset: 0,
                length: 1,
              },
            ],
          },
          {
            content: '2 tim',
            boundingBox: [371, 484, 561, 477, 563, 543, 374, 550],
            spans: [
              {
                offset: 2,
                length: 5,
              },
            ],
          },
          {
            content: '7-20',
            boundingBox: [386, 572, 568, 566, 570, 632, 386, 639],
            spans: [
              {
                offset: 8,
                length: 4,
              },
            ],
          },
          {
            content: 'Torsd',
            boundingBox: [456, 702, 651, 690, 655, 757, 459, 769],
            spans: [
              {
                offset: 13,
                length: 5,
              },
            ],
          },
          {
            content: '0-8',
            boundingBox: [498, 783, 626, 768, 632, 835, 502, 845],
            spans: [
              {
                offset: 19,
                length: 3,
              },
            ],
          },
        ],
      },
    ],
    styles: [],
    modelVersion: '2022-04-30',
  },
};
