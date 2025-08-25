addLayer("p", {
    name: "Tension Points",
    symbol: "p",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#00FF00",
    requires: new Decimal(10),
    resource: "Tension Points",
    baseResource: "Points",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.1,
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("p",22)) mult = mult.mul(new Decimal(3.3333).pow(hasMilestone("a",2)&&hasUpgrade("p",23)?10:1))
        if(hasUpgrade("p",23)) mult = mult.div(new Decimal(1.1111).pow(hasMilestone("a",2)&&hasUpgrade("p",22)?80:1))
        if(hasUpgrade("p",31)) mult = mult.mul(upgradeEffect("p", 31))
        if(hasUpgrade("f",12)) mult = mult.mul(upgradeEffect("f",12))
        if(hasUpgrade("p",34)) mult = mult.pow(buyableEffect("a",12))
        if(hasUpgrade("f",22)) mult = mult.mul(10)
        if(hasUpgrade("s",12)) mult = mult.mul(upgradeEffect("s",12))
        if(hasUpgrade("f",24)) mult = mult.pow(1.05)
        if(hasUpgrade("s",22)) mult = mult.pow(1.15)

        if(hasMilestone("a",1)) mult = mult.pow(0.5).div(2)
        if(hasMilestone("a",18)) mult = mult.root(player.a.points)
        if(mult.gte(1e100)) mult = mult.pow(0.1).mul(1e90)
        return mult
    },
    gainExp() {
        exp = new Decimal(1)
        if(hasUpgrade("p",22)) exp = exp.sub(0.25)
        if(hasUpgrade("p",23)) exp = exp.add(0.333)
        if(hasUpgrade("p",35)) exp = exp.add(upgradeEffect("p",35).mul(10))
        return exp
    },
    eff() {
        let eff = player.p.points.add(1).log10().mul(0.1).add(1)
        eff = eff.pow(buyableEffect("p",12))
        if(hasUpgrade("p",33)) eff = eff.pow(upgradeEffect("p",33))
        if(inChallenge("p",11)&&!hasMilestone("a", 18)) eff = eff.div(10)
        if(hasMilestone("a",9)) eff = eff.pow(0.5).div(hasUpgrade("f",14)?1:2)
        if(inChallenge("p",11)&&hasMilestone("a", 18)) eff = new Decimal(1)
        return eff
    },
    effectDescription() { return `Base points gain ${format(layers.p.eff())}` },
    upgrades: {
        11: {
            description: "1.Ultimate exponent - Points gain squared",
            cost() { return new Decimal(1) },
            unlocked() { return true },
        },
        12: {
            description: "Points gain squared",
            cost() { return new Decimal(2) },
            unlocked() { return true },
        },
        13: {
            description: "Points gain squared",
            cost() { return new Decimal(3) },
            unlocked() { return true },
        },
        14: {
            description: "Points gain squared",
            cost() { return new Decimal(5) },
            unlocked() { return true },
        },
        15: {
            description: "Points gain squared",
            cost() { return new Decimal(8) },
            unlocked() { return true },
        },
        21: {
            description: "Unlock a buyable",
            cost() { return new Decimal(13) },
            unlocked() { return true },
        },
        22: {
            description: "3.Huge multiplier - Tension Points gain x3.3333, but exponent -0.025",
            cost() { return new Decimal(144) },
            unlocked() { return true },
        },
        23: {
            description: "4.Huge exponent - Tension Points gain exponent +0.0333, but gain /1.1111",
            cost() { return new Decimal(377) },
            unlocked() { return true },
        },
        24: {
            description: "Unlock second buyable",
            cost() { return new Decimal(2584) },
            unlocked() { return true },
        },
        25: {
            description: "Unlock a new layer",
            cost() { return new Decimal(10946) },
            unlocked() { return true },
        },
        31: {
            description: "Tension Points gain increases based on Impact Fragments",
            cost() { return new Decimal(50) },
            unlocked() { return hasMilestone("a",1) },
            effect() {
                let b = player.a.sp.add(10).log10();
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
        },
        32: {
            description: "Duplication multiplier increases based on Tension Points",
            cost() { return new Decimal(150) },
            unlocked() { return hasMilestone("a",4) },
            effect() {
                let b = player.p.points.add(1).log10().mul(0.1).add(1);
                if(hasUpgrade("f",32)) b = b.pow(upgradeEffect("p",33))
                return b;
            },
            effectDisplay() { return "^"+format(this.effect())},
        },
        33: {
            description: "Duplication Points also boost base points gain",
            cost() { return new Decimal(10000) },
            unlocked() { return hasMilestone("a",4) },
            effect() {
                let b = player.f.points.add(1).log10().add(1).log10().mul(0.1).add(1);
                return b;
            },
            effectDisplay() { return "^"+format(this.effect())},
        },
        34: {
            description: "11.One buyable, multiple effects - The beauty of Tension - a buyable 12 also increases Tension Points gain",
            cost() { return new Decimal(100000) },
            unlocked() { return hasMilestone("a",4) },
        },
        35: {
            description: "13.Extreme boost - Tension Points gain exponent +1e-8*upgrade count^5",
            cost() { return new Decimal(1000000) },
            unlocked() { return hasMilestone("a",4) },
            effect() {
                let b = new Decimal(player.p.upgrades.length).pow(5).mul(1e-8)
                return b;
            },
            effectDisplay() { return "+"+format(this.effect())},
        },
        41: {
            description: "Tension!",
            cost() { return new Decimal(1e7) },
            unlocked() { return hasMilestone("a",4) },
        },
        42: {
            description: "Tension!!",
            cost() { return new Decimal(2.5e7) },
            unlocked() { return hasMilestone("a",4) },
        },
        43: {
            description: "Tension!!!",
            cost() { return new Decimal(2e8) },
            unlocked() { return hasMilestone("a",4) },
        },
        44: {
            description: "Tension!!!!",
            cost() { return new Decimal(1e12) },
            unlocked() { return hasMilestone("a",4) },
        },
        45: {
            description: "Tension!!!!!",
            cost() { return new Decimal(1e24) },
            unlocked() { return hasMilestone("a",4) },
        },
        51: {
            description: "Upgrade 35 boosts buyable 12 base",
            cost() { return new Decimal(1e140) },
            unlocked() { return hasMilestone("a",9) },
        },
        52: {
            description: "24.Frugal Tension - p buyable 12 becomes cheaper",
            cost() { return new Decimal(7.77e177) },
            unlocked() { return hasMilestone("a",9) },
        },
        53: {
            description: "Buyable 12 boosts a buyable 11",
            cost() { return new Decimal(100000) },
            unlocked() { return hasMilestone("a",18) },
        },
        54: {
            description: "Neutron Stars gain +(Impact Points), your Duplication Supernovas won't go below 1",
            cost() { return new Decimal(1e16) },
            unlocked() { return hasMilestone("a",18) },
        },
    },
    buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = new Decimal(1.618).pow(x.add(6)).floor()
                if(hasUpgrade("f",15)) c = new Decimal(1.618).pow(x).floor()
                return c
            },
            display() { return `Points gain<br />x${format(buyableEffect(this.layer, this.id), 2)}. (Next: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}). Cost: ${format(this.cost(getBuyableAmount(this.layer, this.id)))} Tension Points<br>Level: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.p.points.gte(this.cost()) },
            buy() {
                player.p.points = player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "2.The effect of great Tension"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = new Decimal(10).pow(x)
                if(hasUpgrade("f",23)) eff = eff.pow(upgradeEffect("f", 23))
                if(hasMilestone("a",18)) eff = eff.root(player.a.points)
                return eff
            },
            unlocked() { return hasUpgrade("p",21) },
        },
        12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = new Decimal(1.618).pow(x.pow(2).add(16)).floor()
                if(hasUpgrade("f",13)) c = new Decimal(1.618).pow(x.pow(hasUpgrade("p",52)?1.9:2)).floor()
                return c
            },
            display() { return `Tension Points effect<br />^${format(buyableEffect(this.layer, this.id), 2)}. (Next: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}). Cost: ${format(this.cost(getBuyableAmount(this.layer, this.id)))} Tension Points<br>Level: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.p.points.gte(this.cost()) },
            buy() {
                player.p.points = player.p.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "5.Another form of Tension - Exponential boost"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var base = new Decimal(0.1)
                
                if(hasMilestone("a", 16)) base = base.add(player.s.points.mul(0.01))
                if(hasUpgrade("p",51)) base = base.add(upgradeEffect("p", 35))
                if(hasUpgrade("f",35)) base = base.add(upgradeEffect("f", 35))
                var eff = x.mul(base).add(1)
                return eff
            },
            unlocked() { return hasUpgrade("p",24) },
        },
    },
    challenges: {
        11: {
            name() { return hasMilestone("a", 18)? "Breathtaking Challenge 2":'Breathtaking Challenge'},
            challengeDescription() { return hasMilestone("a", 18)? "Base points gain fixed at 1":'Base points gain finally /10.'},
            rewardDescription() { 
                return `Current highest ${format(this.rewardEffect())}`
            },
            rewardEffect() {
                return new Decimal(player.p.challenges[11])
            },
            goal: 0,
            onEnter() {
                if(hasMilestone("a", 18)) player.p.points = new Decimal(0)
                if(hasMilestone("a", 18)) player.p.buyables[11] = new Decimal(0)
                if(hasMilestone("a", 18)) player.p.buyables[12] = new Decimal(0)
                if(hasMilestone("a", 18)) player.p.upgrades = []
            },
            onExit() {
                player.p.challenges[11] = player.points.max(challengeEffect("p", 11)).max(0)
            },
            completionLimit: "1eeeee10",
            canComplete() { return true },
            resource() { return player.points },
            unlocked() { return hasUpgrade("p",25) && hasMilestone("a", 1) }
        }
    },
    row: 0,
    hotkeys: [
        { key: "p", description: "p: Perform prestige reset", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    passiveGeneration() {
        if (hasMilestone("a", 3)) return 1
        return 0
    },
    layerShown() { return true },
    update(diff) {
        if(hasMilestone("a", 12)) setBuyableAmount(this.layer, 11, player.p.points.add(1).log10().div(0.2089785172762535).floor().add(1))
        if(hasUpgrade("s", 23)) setBuyableAmount(this.layer, 12, player.p.points.add(1).log10().div(0.2089785172762535).root(hasUpgrade("p",52)?1.9:2).floor().add(1))
    },
    autoUpgrade() { return hasMilestone("a", 9) },
})