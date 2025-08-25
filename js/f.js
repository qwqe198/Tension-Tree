addLayer("f", {
    name: "Duplication Points",
    symbol: "f",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#3300ffff",
    requires: new Decimal(1),
    resource: "Duplication Points",
    baseResource: "Points",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.0001,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        exp = new Decimal(1)
        return exp
    },
    mr() {
        mr = new Decimal(1)
        mrpow = new Decimal(1)
        if(player.f.points.gte(1e308)) mrpow = player.f.points.add(10).log10().div(308).max(1)
        if(hasUpgrade("s",24)) mrpow = mrpow.div(1.1)
        if(hasMilestone("a",9)) mr = player.f.points.add(10).log10()
        mr = mr.pow(mrpow)
        return mr
    },
    m() {
        m = new Decimal(1.01)
        if(hasMilestone("a",13)) m = m.add(upgradeEffect("p",35).div(hasMilestone("a",17)?new Decimal(5).sub(player.s.points).max(1):5))
        if(hasUpgrade("f",22)) m = m.mul(1.005)
        if(hasUpgrade("s",14)) m = m.mul(upgradeEffect("s",14))
        if(hasUpgrade("p",32)) m = m.pow(upgradeEffect("p",32))
        if(hasUpgrade("f",24)) m = m.pow(1.2)
        if(hasUpgrade("f",33)) m = m.pow(upgradeEffect("f",23))
        if(hasUpgrade("f",34)) m = m.pow(buyableEffect("p",12))
        m = m.pow(buyableEffect("a",12))
        m = m.pow(buyableEffect("f",11))
        if(hasUpgrade("s",21)) m = m.pow(1.15)
        m = m.root(layers.f.mr())
        return m
    },
    buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                if(x.gte(10)&&!hasMilestone("a",19)) x = x.pow(3).div(100)
                var c = new Decimal(1.618).pow(x.pow(2)).floor()
                return c
            },
            display() { return `Duplication multiplier<br />^${format(buyableEffect(this.layer, this.id), 2)}. (Next: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}). Cost: ${format(this.cost(getBuyableAmount(this.layer, this.id)))} Duplication Points<br>Level: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.f.points.gte(this.cost()) },
            buy() {
                player.f.points = player.f.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() { return "" },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = player.f.points.add(10).log10().add(10).log10().add(10).log10().pow(x.mul(hasMilestone("a",18)?1:3.8))
                return eff
            },
            unlocked() { return hasMilestone("a",9) },
        },
    },
    milestones: {
        1: {
            requirementDescription: "1 Duplication Point",
            effectDescription: "Disable Duplication Points reset",
            done() { return player.f.points.gte(1) }
        },
    },
    upgrades: {
        11: {
            description: "Points gain increases based on Duplication Points",
            cost() { return new Decimal(2) },
            unlocked() { return true },
            effect() {
                let b = player.f.points.add(10).log10()
                if(hasUpgrade("f",21)) b = b.pow(buyableEffect("a",12))
                if(hasUpgrade("f",21)) b = b.pow(buyableEffect("p",12))
                if(hasUpgrade("f",25)) b = b.pow(upgradeEffect("f",23))
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },
        12: {
            description: "Tension Points gain increases based on Duplication Points",
            cost() { return new Decimal(5) },
            unlocked() { return true },
            effect() {
                let b = player.f.points.add(10).log10()
                b = b.pow(buyableEffect("a",13))
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },
        13: {
            description: "Reduce cost of p's second buyable",
            cost() { return new Decimal(1e7) },
            unlocked() { return true },
        },
        14: {
            description: "10. Tension comes from exponential stacking Points gain becomes original^(Impact Points)",
            cost() { return new Decimal(1e9) },
            unlocked() { return true },
            effect() {
                let b = player.a.points;
                return b;
            },
            effectDisplay() { return "^"+format(this.effect())},
        },
        15: {
            description: "Reduce cost of p's first buyable",
            cost() { return new Decimal(1e13) },
            unlocked() { return true },
        },
        21: {
            description: "12. Two bonuses in one - Double Tension p and a buyable 12 boosts upgrade 11 effect",
            cost() { return new Decimal(1e17) },
            unlocked() { return true },
        },
        22: {
            description: "14 Everything has multipliers - More Tension Points, Tension Points, Impact Fragments x10, Duplication multiplier x1.005",
            cost() { return new Decimal(1e24) },
            unlocked() { return true },
        },
        23: {
            description: "15. Inflation - A manifestation of Tension Duplication Points increase p buyable 11 effect",
            cost() { return new Decimal(1e32) },
            unlocked() { return true },
            effect() {
                let b = player.f.points.add(10).log10().add(10).log10()
                return b;
            },
            effectDisplay() { return "^"+format(this.effect())},
        },
        24: {
            description: "16 Everything has exponents - Extreme Tension Points, Tension Points, Impact Fragments^1.05, Duplication multiplier^1.2",
            cost() { return new Decimal(1e60) },
            unlocked() { return true },
        },
        25: {
            description: "17 Triple Tension Upgrade 23 boosts upgrade 11 effect",
            cost() { return new Decimal(1e100) },
            unlocked() { return true },
        },
        31: {
            description: "22 Exponent of exponents - Must be Tension a buyable 13 effect^2",
            cost() { return new Decimal(1e308) },
            unlocked() { return player.s.points.gte(2) },
        },
        32: {
            description: "p upgrade 33 boosts p upgrade 32 effect",
            cost() { return new Decimal("1e450") },
            unlocked() { return player.s.points.gte(2) },
        },
        33: {
            description: "Upgrade 23 affects Duplication Points",
            cost() { return new Decimal("1e520") },
            unlocked() { return player.s.points.gte(2) },
        },
        34: {
            description: "p buyable 12 affects Duplication Points",
            cost() { return new Decimal("1e575") },
            unlocked() { return player.s.points.gte(2) },
        },
        35: {
            description: "p buyable 12 base increases based on Duplication Points",
            cost() { return new Decimal("1e725") },
            unlocked() { return player.s.points.gte(3) },
            effect() {
                let b = player.f.points.add(10).log10().pow(0.005).sub(1)
                return b;
            },
            effectDisplay() { return "+"+format(this.effect())},
        },
        41: {
            description: "s upgrade 14 effect exponentially boosts points",
            cost() { return new Decimal("7.77e777") },
            unlocked() { return player.s.points.gte(3) },
        },
        42: {
            description: "s upgrade 12 effect boosts points",
            cost() { return new Decimal("1e800") },
            unlocked() { return player.s.points.gte(3) },
        },
    },
    tabFormat: {
        "main": {
            content: [
                "main-display",
                ["prestige-button", "", function () { return hasMilestone("f", 1) ? { 'display': 'none' } : {} }],
                ["display-text", () => 
                    `9. Snowball effect also has Tension Duplication Points multiply by ${format(layers.f.m())}/sec, recommended to buy when Duplication Points are slightly higher than cost`,
                    { "font-size": "20px" }
                ],
                "milestones",
                "blank",
                "buyables",
                "blank",
                "upgrades"
            ],
            unlocked() { return true }
        },
    },
    update(diff) {
        player.f.points = player.f.points.mul(this.m().pow(diff))
        if(hasUpgrade("s",25)) player.f.points = player.f.points.max(1)
    },
    row: 0,
    layerShown() { return hasMilestone("a", 4) }
})