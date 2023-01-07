interface IResult {
  valid: boolean; // green/red
  validRange: { from: Date; to: Date }; // either when valid ends or when valid starts?
  prerequisites?: {
    pDisk?: boolean;
    maxMinutes?: number;
    fee?: boolean;
    permit?: boolean;
    visitor?: boolean;
  };
}
export const validateRules = (rules: any[]) => {
  let result: IResult = {};

  const allowed = rules.filter(({ allowed }) => allowed).reverse();
  const prohibited = rules.filter(({ allowed }) => !allowed).reverse();

  for (let i = 0, len = allowed.length; i < len; i++) {
    const rule = allowed[i];

    if (rule.valid) {
      result.valid = true;
      result.validRange = { from: rule.range.from, to: rule.range.to };

      ["pDisk", "maxMinutes", "fee", "permit", "visitor"].forEach((key) => {
        if (rule[key]) {
          if (!result.prerequisites) result.prerequisites = {};

          result.prerequisites[key] = rule[key];
        }
      });

      break;
    }
  }

  for (let i = 0, len = prohibited.length; i < len; i++) {
    const rule = prohibited[i];

    if (rule.valid) {
      result.valid = false;
      result.validRange = { from: rule.range.from, to: rule.range.to };

      break;
    }
  }

  console.log(
    `${result.valid ? "Yes you can" : "No you can't"} park here between ${
      result.validRange.from
    } to ${result.validRange.to}`
  );
};
