# WIA-CARBON-CREDIT-MICRO

A standardized system for tracking, trading, and rewarding individual-level carbon reduction actions.

## Overview

WIA-CARBON-CREDIT-MICRO enables everyday people to earn carbon credits from their daily sustainable choices - from using public transit to reducing food waste. Unlike traditional carbon markets focused on large industrial offsets, this standard democratizes carbon accounting at the individual level.

## Philosophy: Hongik Ingan

"Benefit all humanity" - Climate action must be inclusive. Every person can contribute to planetary health through small daily choices. This standard makes those contributions measurable and rewardable.

## Directory Structure

```
carbon-credit-micro/
+-- README.md                    # This file
+-- spec/
|   +-- CARBON-CREDIT-MICRO-v1.0.md  # Technical specification
+-- simulator/
|   +-- index.html               # Interactive carbon tracker
+-- ebook/
    +-- en/
    |   +-- index.html           # English ebook
    |   +-- chapter-01.html ~ chapter-08.html
    +-- ko/
        +-- index.html           # Korean ebook
        +-- chapter-01.html ~ chapter-08.html
```

## Key Features

1. **Micro Actions**: Track carbon savings from daily choices
2. **Verified Calculation**: Science-based emission factors
3. **Token System**: Fungible credits for trading
4. **Marketplace**: Redeem or trade earned credits
5. **Community Pools**: Collective carbon goals
6. **Gamification**: Achievements and streaks
7. **Corporate Integration**: Employee sustainability programs
8. **Blockchain Optional**: Transparent ledger support

## Action Categories

```
[TRANSPORT]  Public transit, cycling, EV charging
[ENERGY]     Solar usage, reduced consumption
[FOOD]       Plant-based meals, food waste reduction
[CONSUMER]   Secondhand purchases, repair over replace
[DIGITAL]    Reduced streaming, efficient devices
[COMMUNITY]  Tree planting, local cleanup
```

## Credit Calculation Example

```json
{
  "action": "bike_commute",
  "distance_km": 10,
  "baseline_mode": "car",
  "calculation": {
    "baseline_emission_kg": 2.3,
    "actual_emission_kg": 0,
    "credits_earned": 2.3
  },
  "verification": "gps_tracked",
  "timestamp": "2025-12-21T08:30:00Z"
}
```

## Credit Value

```
1 Micro Carbon Credit (MCC) = 1 kg CO2e avoided

Redemption options:
- Cash out (market rate)
- Donate to offset projects
- Trade for sustainable products
- Pool for community goals
```

## Integration Points

- Public transit payment systems
- Electric vehicle charging networks
- Smart home energy monitors
- Food delivery apps (plant-based tracking)
- Banking apps (green spending rewards)
- Corporate sustainability platforms

## Simulator

The interactive simulator allows you to:
- Log daily carbon-saving actions
- Calculate credits earned
- View cumulative impact
- Set reduction goals
- Join community challenges

## Related Standards

- WIA-OCEAN-PLASTIC-TRACK: Environmental tracking
- WIA-FOOD-ALLERGY-PASSPORT: Consumer health
- WIA-SUPPLY-CHAIN-TRACE: Product lifecycle

## License

Creative Commons Attribution 4.0 International (CC BY 4.0)

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12 | Initial release |
