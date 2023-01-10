export const pskiva_förbud = [
  {
    label: 'p_sign',
    probability: 0.9999957084655762,
    boundingBoxes: {
      left: 526.4325375556946,
      top: 125.41705322265625,
      width: 679.1656832695007,
      height: 575.3560180664062,
    },
    textContent: [
      {
        content: 'p',
        textBoundry: [650, 180, 1046, 207, 1014, 638, 657, 654],
        normalizedTextBoundry: {
          left: 650,
          top: 180,
          width: 396,
          height: 474,
        },
      },
    ],
  },
  {
    label: 'sign',
    probability: 0.9999982714653015,
    boundingBoxes: {
      left: 532.4479475021362,
      top: 726.8636474609375,
      width: 633.2873320579529,
      height: 530.744384765625,
    },
    nestedSigns: [
      {
        label: 'parking_disk',
        probability: 0.8094480037689209,
        boundingBoxes: {
          left: 566.8002626299858,
          top: 850.6092529296875,
          width: 186.69388109445572,
          height: 269.5269775390625,
        },
        textContent: [
          {
            content: 'p',
            textBoundry: [630, 1030, 671, 1029, 672, 1070, 631, 1070],
            normalizedTextBoundry: {
              left: 630,
              top: 1029,
              width: 42,
              height: 41,
            },
          },
        ],
      },
    ],
    textContent: [
      {
        content: '1 tim',
        textBoundry: [803, 788, 1089, 787, 1089, 899, 802, 894],
        normalizedTextBoundry: {
          left: 802,
          top: 787,
          width: 287,
          height: 112,
        },
      },
      {
        content: '8-18',
        textBoundry: [805, 934, 1073, 931, 1073, 1032, 803, 1032],
        normalizedTextBoundry: {
          left: 803,
          top: 931,
          width: 270,
          height: 101,
        },
      },
      {
        content: 'p',
        textBoundry: [630, 1030, 671, 1029, 672, 1070, 631, 1070],
        normalizedTextBoundry: {
          left: 630,
          top: 1029,
          width: 42,
          height: 41,
        },
      },
      {
        content: '(8-14)',
        textBoundry: [749, 1072, 1113, 1065, 1115, 1180, 750, 1185],
        normalizedTextBoundry: {
          left: 749,
          top: 1065,
          width: 366,
          height: 120,
        },
      },
    ],
  },
  {
    label: 'warning_sign',
    probability: 0.9998893737792969,
    boundingBoxes: {
      left: 549.7977329492569,
      top: 1240.5015869140625,
      width: 585.8952004909515,
      height: 449.888916015625,
    },
    nestedSigns: [
      {
        label: 'prohibited_parking',
        probability: 0.9334332346916199,
        boundingBoxes: {
          left: 582.4655610918999,
          top: 1260.486083984375,
          width: 183.2443420290947,
          height: 208.577392578125,
        },
      },
    ],
    textContent: [
      {
        content: 'alla',
        textBoundry: [818, 1259, 1068, 1254, 1071, 1362, 820, 1366],
        normalizedTextBoundry: {
          left: 818,
          top: 1254,
          width: 253,
          height: 112,
        },
      },
      {
        content: 'dagar',
        textBoundry: [723, 1397, 1104, 1388, 1107, 1510, 725, 1521],
        normalizedTextBoundry: {
          left: 723,
          top: 1388,
          width: 384,
          height: 133,
        },
      },
      {
        content: '23-04',
        textBoundry: [667, 1551, 1087, 1530, 1090, 1633, 671, 1654],
        normalizedTextBoundry: {
          left: 667,
          top: 1530,
          width: 423,
          height: 124,
        },
      },
    ],
  },
];

export const thirty_mins = [
  {
    label: 'p_sign',
    probability: 0.9971875548362732,
    boundingBoxes: {
      left: 193.81339073181152,
      top: 206.65969848632812,
      width: 662.0499515533447,
      height: 685.5604553222656,
    },
  },
  {
    label: 'sign',
    probability: 0.9200109839439392,
    boundingBoxes: {
      left: 209.03271675109863,
      top: 892.0660400390625,
      width: 606.8548107147217,
      height: 240.47042846679688,
    },
    textContent: [
      {
        content: '30 min',
        textBoundry: [282, 952, 741, 968, 735, 1072, 282, 1050],
        normalizedTextBoundry: {
          left: 282,
          top: 952,
          width: 459,
          height: 120,
        },
      },
    ],
  },
];

export const prohibited_odd = [
  {
    label: 'p_sign',
    probability: 0.9872264266014099,
    boundingBoxes: {
      left: 152.20685005187988,
      top: 7.953214645385742,
      width: 683.563756942749,
      height: 618.0407524108887,
    },
    textContent: [
      {
        content: 'p',
        textBoundry: [242, 73, 690, 71, 684, 438, 282, 545],
        normalizedTextBoundry: {
          left: 242,
          top: 71,
          width: 448,
          height: 474,
        },
      },
    ],
  },
  {
    label: 'warning_sign',
    probability: 0.9687889814376831,
    boundingBoxes: {
      left: 147.4203586578369,
      top: 650.8567810058594,
      width: 646.4454174041748,
      height: 687.2705459594727,
    },
    nestedSigns: [
      {
        label: 'prohibited_parking_odd',
        probability: 0.3946739435195923,
        boundingBoxes: {
          left: 187.5287890434265,
          top: 689.1689777374268,
          width: 205.0961136817932,
          height: 194.5120334625244,
        },
      },
    ],
    textContent: [
      {
        content: '0-8',
        textBoundry: [426, 736, 723, 743, 721, 858, 424, 848],
        normalizedTextBoundry: {
          left: 424,
          top: 736,
          width: 299,
          height: 122,
        },
      },
      {
        content: '(0-8)',
        textBoundry: [364, 910, 791, 927, 786, 1067, 361, 1049],
        normalizedTextBoundry: {
          left: 361,
          top: 910,
          width: 430,
          height: 157,
        },
      },
      {
        content: '0-8',
        textBoundry: [427, 1117, 718, 1120, 714, 1243, 427, 1242],
        normalizedTextBoundry: {
          left: 427,
          top: 1117,
          width: 291,
          height: 126,
        },
      },
    ],
  },
];
