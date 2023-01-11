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
        nestedBoundry: {
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
            nestedBoundry: {
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
        nestedBoundry: {
          left: 802,
          top: 787,
          width: 287,
          height: 112,
        },
      },
      {
        content: '8-18',
        textBoundry: [805, 934, 1073, 931, 1073, 1032, 803, 1032],
        nestedBoundry: {
          left: 803,
          top: 931,
          width: 270,
          height: 101,
        },
      },
      {
        content: 'p',
        textBoundry: [630, 1030, 671, 1029, 672, 1070, 631, 1070],
        nestedBoundry: {
          left: 630,
          top: 1029,
          width: 42,
          height: 41,
        },
      },
      {
        content: '(8-14)',
        textBoundry: [749, 1072, 1113, 1065, 1115, 1180, 750, 1185],
        nestedBoundry: {
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
        nestedBoundry: {
          left: 818,
          top: 1254,
          width: 253,
          height: 112,
        },
      },
      {
        content: 'dagar',
        textBoundry: [723, 1397, 1104, 1388, 1107, 1510, 725, 1521],
        nestedBoundry: {
          left: 723,
          top: 1388,
          width: 384,
          height: 133,
        },
      },
      {
        content: '23-04',
        textBoundry: [667, 1551, 1087, 1530, 1090, 1633, 671, 1654],
        nestedBoundry: {
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
        nestedBoundry: {
          left: 282,
          top: 952,
          width: 459,
          height: 120,
        },
      },
    ],
  },
];

export const two_hours = [
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
        content: '2 tim',
        textBoundry: [282, 952, 741, 968, 735, 1072, 282, 1050],
        nestedBoundry: {
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
        nestedBoundry: {
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
        nestedBoundry: {
          left: 424,
          top: 736,
          width: 299,
          height: 122,
        },
      },
      {
        content: '(0-8)',
        textBoundry: [364, 910, 791, 927, 786, 1067, 361, 1049],
        nestedBoundry: {
          left: 361,
          top: 910,
          width: 430,
          height: 157,
        },
      },
      {
        content: '0-8',
        textBoundry: [427, 1117, 718, 1120, 714, 1243, 427, 1242],
        nestedBoundry: {
          left: 427,
          top: 1117,
          width: 291,
          height: 126,
        },
      },
    ],
  },
];

export const prohibited_even = [
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
        nestedBoundry: {
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
        label: 'prohibited_parking_even',
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
        nestedBoundry: {
          left: 424,
          top: 736,
          width: 299,
          height: 122,
        },
      },
      {
        content: '(0-8)',
        textBoundry: [364, 910, 791, 927, 786, 1067, 361, 1049],
        nestedBoundry: {
          left: 361,
          top: 910,
          width: 430,
          height: 157,
        },
      },
      {
        content: '0-8',
        textBoundry: [427, 1117, 718, 1120, 714, 1243, 427, 1242],
        nestedBoundry: {
          left: 427,
          top: 1117,
          width: 291,
          height: 126,
        },
      },
    ],
  },
];

export const prohibited_range = [
  {
    label: 'prohibited_parking',
    probability: 0.9989409446716309,
    boundingBoxes: {
      left: 374.9634027481079,
      top: 152.69165420532227,
      width: 210.8786106109619,
      height: 221.51803892850876,
    },
  },
  {
    label: 'warning_sign',
    probability: 0.9990993142127991,
    boundingBoxes: {
      left: 395.84293961524963,
      top: 375.4647664427757,
      width: 163.5366976261139,
      height: 100.11083149909973,
    },
    textContent: [
      {
        content: '8 - 17',
        textBoundry: [433, 390, 527, 389, 528, 420, 433, 421],
        nestedBoundry: {
          left: 433,
          top: 390,
          width: 94,
          height: 30,
        },
      },
      {
        content: '(9 - 18)',
        textBoundry: [421, 425, 542, 426, 542, 462, 421, 461],
        nestedBoundry: {
          left: 421,
          top: 426,
          width: 121,
          height: 35,
        },
      },
    ],
  },
];

export const double_time_range = [
  {
    label: 'p_sign',
    probability: 0.8909845352172852,
    boundingBoxes: {
      left: 76.26851963996887,
      top: 47.32781183719635,
      width: 346.2076463699341,
      height: 406.5520701110363,
    },
    textContent: [
      {
        content: 'p',
        textBoundry: [143, 81, 370, 100, 364, 374, 139, 409],
        nestedBoundry: {
          left: 143,
          top: 100,
          width: 221,
          height: 274,
        },
      },
    ],
  },
  {
    label: 'sign',
    probability: 0.9812540411949158,
    boundingBoxes: {
      left: 52.658644795417786,
      top: 461.58943098783493,
      width: 401.529074549675,
      height: 265.0403059720993,
    },
    nestedSigns: [
      {
        label: 'parking_disk',
        probability: 0.9724301099777222,
        boundingBoxes: {
          left: 88.76633763313293,
          top: 509.6538876593113,
          width: 96.77797222137451,
          height: 170.05577245354652,
        },
        textContent: [
          {
            content: 'p',
            textBoundry: [129, 613, 152, 613, 152, 633, 129, 633],
            nestedBoundry: {
              left: 129,
              top: 613,
              width: 23,
              height: 20,
            },
          },
        ],
      },
    ],
    textContent: [
      {
        content: '1 tim',
        textBoundry: [232, 496, 362, 497, 360, 552, 232, 551],
        nestedBoundry: {
          left: 232,
          top: 497,
          width: 128,
          height: 54,
        },
      },
      {
        content: '8-22',
        textBoundry: [215, 566, 377, 570, 377, 623, 215, 621],
        nestedBoundry: {
          left: 215,
          top: 570,
          width: 162,
          height: 51,
        },
      },
      {
        content: 'p',
        textBoundry: [129, 613, 152, 613, 152, 633, 129, 633],
        nestedBoundry: {
          left: 129,
          top: 613,
          width: 23,
          height: 20,
        },
      },
      {
        content: '(8-22)',
        textBoundry: [184, 635, 396, 638, 395, 693, 183, 690],
        nestedBoundry: {
          left: 184,
          top: 638,
          width: 211,
          height: 52,
        },
      },
    ],
  },
  {
    label: 'sign',
    probability: 0.998453676700592,
    boundingBoxes: {
      left: 53.50818943977356,
      top: 741.2684156894684,
      width: 350.1664402484894,
      height: 357.5953732728958,
    },
    textContent: [
      {
        content: 'avgift',
        textBoundry: [138, 767, 341, 765, 342, 839, 139, 845],
        nestedBoundry: {
          left: 139,
          top: 767,
          width: 202,
          height: 72,
        },
      },
      {
        content: '4 tim',
        textBoundry: [160, 850, 326, 848, 326, 912, 160, 908],
        nestedBoundry: {
          left: 160,
          top: 850,
          width: 166,
          height: 58,
        },
      },
      {
        content: '8-22',
        textBoundry: [143, 930, 331, 927, 332, 990, 143, 992],
        nestedBoundry: {
          left: 143,
          top: 930,
          width: 188,
          height: 60,
        },
      },
      {
        content: '(8-22)',
        textBoundry: [119, 1008, 349, 1002, 350, 1069, 121, 1076],
        nestedBoundry: {
          left: 121,
          top: 1008,
          width: 228,
          height: 61,
        },
      },
    ],
  },
];
