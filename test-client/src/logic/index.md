foreach sign
check if:
p-sign (P) - set p-sign valid rules
time range (13-18) - set time range valid rules
time limit (2 tim) - set time limit valid rules
length range (0-60m) - set length range rules
p-skiva - set p-skiva true
p-skiva (sign) - set p-skiva true
avgift - set avgift true
tillstånd - set tillstånd true
has nested signs
foreach sign
foreach warning_sign

foreach warning*sign
check if:
time range (13-18) - set time range invalid rules
time limit (2 tim) - set time limit invalid rules
length range (0-60m) - set length range prohibited rules
prohibited*\* (sign) - set prohibited rules
has nested signs
foreach sign
foreach warning_sign

===

```typescript
[
    {
        allowed: {
                sign: p-sign
                validRules: 24h etc
                within: { from: Date, to: Date }
        }
    },
    {
        allowed: {
                sign: sign,
                pskiva: true,
                timeLimit: 60,
                within: { from: Date, to: Date }
        }
    },
    {
        prohibited: {
                prohibited_parking: true,
                within: { from: Date, to: Date }
        }
    }
];

// things that needs confirmation for valid parking
doubleChecks: {
    tillstånd: (input_from_user) => final_reault,
    besökare: (input_from_user) => final_reault,
};

// Object to evaluate result in UI
final_reault: {
    valid: boolean, // green/red
    validRange: { from: Date, to: Date }, // either when valid ends or when valid starts?
    prerequisites: {
        pskiva: boolean,
        maxMin: 60,
        avgift: boolean,
        tillstånd: boolean,
        besökare: boolean,
    }
};
```

```typescript
[
  {
    allowed:true,
    pSign:true,
    valid () => pSign()
  },
  {
    allowed: true,
    pDisk:true,
    maxMinutes:60, // only applies if withinRange not returns inRangeToday
    valid: () => withinRange(maxMinutes?)
  },
  {
    allowed: false,
    every_day:true,
    valid: () => withinRange()
  }
]
```
