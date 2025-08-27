addLayer("f", {
    name: "Copy Points", // Layer name
    symbol: "f", // Node symbol
    position: 0, // Horizontal position
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#3300ffff",
    requires() {
        let r = new Decimal(1)
        if(inChallenge("a",11)) r = new Decimal(Infinity)
        return r
    }, // Requirement to unlock
    resource: "Copy Points", // Prestige currency name
    baseResource: "Points", // Base resource name
    baseAmount() { return player.points }, // Get current base resource amount
    type: "normal", // Type: normal resource layer
    exponent: 0.0001, // Prestige currency exponent
    gainMult() { // Multiplier for main currency
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Exponent for main currency
        exp = new Decimal(1)
        return exp
    },
    mr() { 
        mr = new Decimal(1)
        if(hasMilestone("a",9)) mr = player.f.points.add(10).log10()
        mr = mr.pow(layers.f.mrpow())
        return mr
    },
    mrpow() { 
        mrpow = new Decimal(1)
        if(player.f.points.gte(inChallenge("a",12)?1e100:1e308)) mrpow = player.f.points.add(10).log10().div(inChallenge("a",12)?100:308)
        if(hasUpgrade("s",24)) mrpow = mrpow.div(1.1)
        mrpow = mrpow.max(1)
        return mrpow
    },
    m() { 
        m = new Decimal(1.01)
        if(hasMilestone("a",13)) m = m.add(upgradeEffect("p",35).div(hasMilestone("a",17)?new Decimal(5).sub(player.s.points).max(1):5))
        if(hasUpgrade("f",22)) m = m.mul(1.005)
        if(hasUpgrade("s",14)) m = m.mul(upgradeEffect("s",14))
        if(hasUpgrade("p",55)) m = m.pow(upgradeEffect("p",55))
        if(hasUpgrade("p",32)) m = m.pow(upgradeEffect("p",32))
        if(hasUpgrade("f",24)) m = m.pow(1.2)
        if(hasUpgrade("f",33)) m = m.pow(upgradeEffect("f",23))
        if(hasUpgrade("f",34)) m = m.pow(buyableEffect("p",12))
        m = m.pow(buyableEffect("a",12))
        m = m.pow(buyableEffect("f",11))
        if(hasUpgrade("s",21)) m = m.pow(1.15)
        if(hasMilestone("a",23)) m = m.pow(player.a.points)
        if(hasMilestone("a",29)) m = m.pow(player.s.upgrades.length+1)
        if(hasMilestone("a",33)) m = m.pow(player.f.upgrades.length+1)
        if(hasMilestone("a",25)) m = m.pow(challengeEffect("a", 11).add(1))
        if(hasUpgrade("s",34)) m = m.pow(32)
        m = m.root(layers.f.mr())
        return m
    },
    buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                if(x.gte(10) && !hasMilestone("a",19)) x = x.pow(3).div(100)
                var pow = new Decimal(2)
                if(hasUpgrade("f",43)) pow = pow.root(upgradeEffect("f",43))
                if(inChallenge("s",11)) pow = new Decimal(6)
                var c = new Decimal(1.618).pow(x.pow(pow)).floor()
                if(hasUpgrade("f",44) && !inChallenge("s",11)) c = c.root(upgradeEffect("f",43))
                return c
            },
            display() { return `Copy Multiplier<br />^${format(buyableEffect(this.layer, this.id), 2)}. (Next: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}). Cost: ${format(this.cost(getBuyableAmount(this.layer, this.id)))} Copy Points<br>Level: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.f.points.gte(this.cost()) },
            buy() {
                player.f.points = player.f.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return ""
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = player.f.points.add(10).log10().add(10).log10().add(10).log10().pow(x.mul(hasMilestone("a",18)?1:3.8))
                if(hasUpgrade("f",45)) eff = eff.pow(1.05)
                return eff
            },
            unlocked() { return hasMilestone("a",9) },
        },
    },
    milestones: {
        1: {
            requirementDescription: "1 Copy Point (current)",
            effectDescription: "Disable Copy Points reset",
            done() { return player.f.points.gte(1) }
        },
    },
    upgrades: {
        11: {
            description: "Points gain based on Copy Points",
            cost() { return new Decimal(2) },
            unlocked() { return true },
            effect(){
                let b = player.f.points.add(10).log10()
                if(hasUpgrade("f",21)) b = b.pow(buyableEffect("a",12))
                if(hasUpgrade("f",21)) b = b.pow(buyableEffect("p",12))
                if(hasUpgrade("f",25)) b = b.pow(upgradeEffect("f",23))
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },
        12: {
            description: "Tension Points gain based on Copy Points",
            cost() { return new Decimal(5) },
            unlocked() { return true },
            effect(){
                let b = player.f.points.add(10).log10()
                b = b.pow(buyableEffect("a",13))
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },
        13: {
            description: "Reduce p buyable 2 cost",
            cost() { return new Decimal(1e7) },
            unlocked() { return true },
        },
        14: {
            description: "10. Tension comes from stacking exponents Points gain becomes (Impact Points) power",
            cost() { return new Decimal(1e9) },
            unlocked() { return true },
            effect(){
                let b = player.a.points;
                return b;
            },
            effectDisplay() { return "^"+format(this.effect())},
        },
        15: {
            description: "Reduce p buyable 1 cost",
            cost() { return new Decimal(1e13) },
            unlocked() { return true },
        },
        21: {
            description: "12. Two make one Double tension p and a buyable 12 bonus upgrade 11 effect",
            cost() { return new Decimal(1e17) },
            unlocked() { return true },
        },
        22: {
            description: "14. All have multipliers, more tension Points, Tension Points, Impact Fragments x10, Copy Multiplier x1.005",
            cost() { return new Decimal(1e24) },
            unlocked() { return true },
        },
        23: {
            description: "15. Inflation Of course a form of tension Copy Points increase p buyable 11 effect",
            cost() { return new Decimal(1e32) },
            unlocked() { return true },
            effect(){
                let b = player.f.points.add(10).log10().add(10).log10()
                return b;
            },
            effectDisplay() { return "^"+format(this.effect())},
        },
        24: {
            description: "16. All have exponents, extreme tension Points, Tension Points, Impact Fragments ^1.05, Copy Multiplier ^1.2",
            cost() { return new Decimal(1e60) },
            unlocked() { return true },
        },
        25: {
            description: "17. Triple tension Upgrade 23 bonus upgrade 11 effect",
            cost() { return new Decimal(1e100) },
            unlocked() { return true },
        },
        31: {
            description: "22. Exponent of exponent Always tension a buyable 13 effect ^2",
            cost() { return new Decimal(1e308) },
            unlocked() { return player.s.points.gte(2) },
        },
        32: {
            description: "p upgrade 33 bonus p upgrade 32 effect",
            cost() { return new Decimal("1e450") },
            unlocked() { return player.s.points.gte(2) },
        },
        33: {
            description: "Upgrade 23 affects Copy Points",
            cost() { return new Decimal("1e520") },
            unlocked() { return player.s.points.gte(2) },
        },
        34: {
            description: "p buyable 12 affects Copy Points",
            cost() { return new Decimal("1e575") },
            unlocked() { return player.s.points.gte(2) },
        },
        35: {
            description: "p buyable 12 base based on Copy Points",
            cost() { return new Decimal("1e725") },
            unlocked() { return player.s.points.gte(3) },
            effect(){
                let b = player.f.points.add(10).log10().pow(0.005).sub(1)
                return b;
            },
            effectDisplay() { return "+"+format(this.effect())},
        },
        41: {
            description: "s upgrade 14 effect exponent bonus Points",
            cost() { return new Decimal("7.77e777") },
            unlocked() { return player.s.points.gte(3) },
        },
        42: {
            description: "s upgrade 12 effect bonus Points",
            cost() { return new Decimal("1e800") },
            unlocked() { return player.s.points.gte(3) },
        },
        43: {
            description: "Copy Supernova reduces f buyable 11 price growth exponent",
            cost() { return new Decimal("1e825") },
            unlocked() { return player.s.points.gte(3) },
            effect(){
                let b = player.s.points.add(10).log10()
                if(hasMilestone("a",32)) b = b.pow(player.a.milestones.length/30)
                return b;
            },
            effectDisplay() { return "root^"+format(this.effect())},
        },
        44: {
            description: "Previous upgrade affects price itself again",
            cost() { return new Decimal("1e925") },
            unlocked() { return player.s.points.gte(3) },
        },
        45: {
            description: "f buyable 11 effect ^1.05",
            cost() { return new Decimal("1e1050") },
            unlocked() { return player.s.points.gte(3) },
        },
    },
    tabFormat: {
        "main": {
            content: [
                "main-display",
                ["prestige-button", "", function () { return player.f.points.gte(1) ? { 'display': 'none' } : {} }],
                ["display-text", () =>
                    `9. Snowballing is also tense Copy Points x${format(layers.f.m())} per second, recommended to buy when slightly above price`,
                    { "font-size": "20px" }
                ],
                ["display-text", function () {
                    return hasMilestone("a", 9) ? `<text style = "color:red">Due to a milestone 9, Copy Multiplier takes ${format(layers.f.mr())} root</text>` : ""
                }],
                ["display-text", function () {
                    return layers.f.mrpow() > 1 ? `<text style = "color:red">Due to softcap, previous effect becomes ${format(layers.f.mrpow())} power</text>` : ""
                }],
                "blank",
                "buyables",
                "blank",
                "upgrades"
            ],
            unlocked() { return true }
        },
    },
    update(diff) {
        var pow11 = new Decimal(2)
        if(hasUpgrade("f",43)) pow11 = pow11.root(upgradeEffect("f",43))
        if(inChallenge("s",11)) pow11 = new Decimal(6)
        player.f.points = player.f.points.mul(this.m().pow(diff))
        if(hasUpgrade("s",25)) player.f.points = player.f.points.max(hasMilestone("a", 30) ? 1e10 : 1)
        if(hasMilestone("a", 25)) setBuyableAmount(this.layer, 11, player.f.points.pow(hasUpgrade("f",44) && !inChallenge("s",11) ? upgradeEffect("f",43) : 1).add(1).log10().div(0.2089785172762535).root(pow11).floor().add(1))
    },
    row: 0, // Row position
    autoUpgrade() { return hasMilestone("a", 30) },
    layerShown() { return hasMilestone("a", 4) }
})