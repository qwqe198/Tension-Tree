addLayer("s", {
    name: "Duplication Supernova",
    symbol: "s",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            st: new Decimal(0),
        }
    },
    color: "#ffe600ff",
    requires: new Decimal(1e154),
    resource: "Duplication Supernova",
    baseResource: "Duplication Points",
    baseAmount() { return player.f.points },
    type: "static",
    exponent: 0.01,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    stg() {
        st = new Decimal(1)
        if(hasUpgrade("s",15)) st = st.mul(upgradeEffect("s",15))
        if(hasUpgrade("p",54)) st = st.mul(player.a.points)
        if(!player.s.points.gte(1)) st = new Decimal(0)
        return st
    },
    gainExp() {
        exp = new Decimal(1)
        return exp
    },
    getNextAt() {
        let gain = new Decimal("1e154").pow(new Decimal(2).pow(player.s.points))
        return gain
    },
    upgrades: {
        11: {
            description: "m1: Neutron Stars boost points gain speed",
            cost() { return new Decimal(100) },
            unlocked() { return true },
            effect() {
                let b = player.s.st
                if(hasMilestone("a",15)) b = b.mul(player.s.points.pow(player.a.points))
                b = b.pow(4)
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
            currencyDisplayName: "Neutron Stars",
            currencyInternalName: "st",
            currencyLayer: "s"
        },
        12: {
            description: "rp1: Neutron Stars boost Tension Points gain speed",
            cost() { return new Decimal(200) },
            unlocked() { return true },
            effect() {
                let b = player.s.st
                if(hasMilestone("a",15)) b = b.mul(player.s.points.pow(player.a.points))
                b = b.pow(2)
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
            currencyDisplayName: "Neutron Stars",
            currencyInternalName: "st",
            currencyLayer: "s"
        },
        13: {
            description: "bh1: Neutron Stars boost Impact Fragments gain speed",
            cost() { return new Decimal(400) },
            unlocked() { return true },
            effect() {
                let b = player.s.st
                if(hasMilestone("a",15)) b = b.mul(player.s.points.pow(player.a.points))
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
            currencyDisplayName: "Neutron Stars",
            currencyInternalName: "st",
            currencyLayer: "s"
        },
        14: {
            description: "s1: Neutron Stars boost duplication multiplier",
            cost() { return new Decimal(400) },
            unlocked() { return true },
            effect() {
                let b = player.s.st.add(1).log10().mul(0.0025).add(1)
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
            currencyDisplayName: "Neutron Stars",
            currencyInternalName: "st",
            currencyLayer: "s"
        },
        15: {
            description: "sn2: Supernova count boosts Neutron Stars gain speed",
            cost() { return new Decimal(350) },
            unlocked() { return player.s.points.gte(2) },
            effect() {
                let b = player.s.points.pow(2)
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
            currencyDisplayName: "Neutron Stars",
            currencyInternalName: "st",
            currencyLayer: "s"
        },
        21: {
            description: "t1: Duplication multiplier becomes 1.15th power",
            cost() { return new Decimal(1500) },
            unlocked() { return player.s.points.gte(2) },
            currencyDisplayName: "Neutron Stars",
            currencyInternalName: "st",
            currencyLayer: "s"
        },
        22: {
            description: "bh2: Tension Points become 1.15th power",
            cost() { return new Decimal(1500) },
            unlocked() { return player.s.points.gte(2) },
            currencyDisplayName: "Neutron Stars",
            currencyInternalName: "st",
            currencyLayer: "s"
        },
        23: {
            description: "qol1: Auto-buy p buyable 12",
            cost() { return new Decimal(1500) },
            unlocked() { return player.s.points.gte(2) },
            currencyDisplayName: "Neutron Stars",
            currencyInternalName: "st",
            currencyLayer: "s"
        },
        24: {
            description: "m2 23: Appears as debuff but actually buff - certain Tension reduces milestone 14 effect by 1.1x",
            cost() { return new Decimal(10000) },
            unlocked() { return player.s.points.gte(3) },
            currencyDisplayName: "Neutron Stars",
            currencyInternalName: "st",
            currencyLayer: "s"
        },
        25: {
            description: "qol2: Your Duplication Points won't go below 1",
            cost() { return new Decimal(10000) },
            unlocked() { return player.s.points.gte(3) },
            currencyDisplayName: "Neutron Stars",
            currencyInternalName: "st",
            currencyLayer: "s"
        },
    },
    tabFormat: {
        "upg": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", () => 
                    `You have ${format(player.s.st)}(+${format(layers.s.stg())}/s) Neutron Stars`,
                    { "font-size": "20px" }
                ],
                "upgrades",
            ],
            unlocked() { return true }
        },
        "buy": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", () => 
                    `You have ${format(player.s.st)}(+${format(layers.s.stg())}/s) Neutron Stars`,
                    { "font-size": "20px" }
                ],
                "buyables",
            ],
            unlocked() { return true }
        },
    },
    update(diff) {
        player.s.st = player.s.st.add(this.stg().mul(diff))
        if(hasUpgrade("p",54)) player.s.points = player.s.points.max(1)
    },
    row: 1,
    hotkeys: [
        { key: "s", description: "s: Perform Supernova reset", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasMilestone("a",11) }
})