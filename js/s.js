addLayer("s", {
    name: "Copy Supernova", // Layer name
    symbol: "s", // Node symbol
    position: 0, // Horizontal position
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            st: new Decimal(0),
        }
    },
    color: "#ffe600ff",
    requires: new Decimal(1e154), // Requirement to unlock
    resource: "Copy Supernova", // Prestige currency name
    baseResource: "Copy Points", // Base resource name
    baseAmount() { return player.f.points }, // Get current base resource amount
    type: "static", // Type: static resource layer
    exponent: 0.01, // Prestige currency exponent
    gainMult() { // Multiplier for main currency
        mult = new Decimal(1)
        return mult
    },
    stg() { // Calculate the multiplier for main currency from bonuses
        st = new Decimal(1)
        if(hasUpgrade("s",15)) st = st.mul(upgradeEffect("s",15))
        if(hasUpgrade("p",54)) st = st.mul(player.a.points)
        if(hasMilestone("a",26)) st = st.mul(player.f.points.add(10).log10().add(10).log10())
        if(hasMilestone("a",31)) st = st.mul(challengeEffect("a", 11))
        if(hasMilestone("a",36)) st = st.mul(challengeEffect("a", 12))
        if(!player.s.points.gte(1)) st = new Decimal(0)

        return st
    },
    gainExp() { // Exponent for main currency
        exp = new Decimal(1)
        return exp
    },
    getNextAt() {
        let gain = new Decimal("1e154").pow(new Decimal(2).pow(player.s.points))
        return gain
    },
    upgrades: {
        11: {
            description: "m1 makes Neutron Star bonus Points gain speed",
            cost() { return new Decimal(100) },
            unlocked() { return true },
            effect(){
                let b = player.s.st
                if(hasMilestone("a",15)) b = b.mul(player.s.points.pow(player.a.points))
                b = b.pow(4)
                if(hasUpgrade("s",33)) b = b.pow(player.s.points.pow(0.5))
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
            currencyDisplayName: "Neutron Star",
            currencyInternalName: "st",
            currencyLayer: "s"
        },
        12: {
            description: "rp1 makes Neutron Star bonus Tension Points gain speed",
            cost() { return new Decimal(200) },
            unlocked() { return true },
            effect(){
                let b = player.s.st
                if(hasMilestone("a",15)) b = b.mul(player.s.points.pow(player.a.points))
                b = b.pow(2)
                if(hasUpgrade("s",33)) b = b.pow(player.s.points.pow(0.5))
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
            currencyDisplayName: "Neutron Star",
            currencyInternalName: "st",
            currencyLayer: "s"
        }, 
        13: {
            description: "bh1 makes Neutron Star bonus Impact Fragments gain speed",
            cost() { return new Decimal(400) },
            unlocked() { return true },
            effect(){
                let b = player.s.st
                if(hasMilestone("a",15)) b = b.mul(player.s.points.pow(player.a.points))
                if(hasUpgrade("s",33)) b = b.pow(player.s.points.pow(0.5))
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
            currencyDisplayName: "Neutron Star",
            currencyInternalName: "st",
            currencyLayer: "s"
        }, 
        14: {
            description: "s1 makes Neutron Star bonus Copy Multiplier",
            cost() { return new Decimal(400) },
            unlocked() { return true },
            effect(){
                let b = player.s.st.add(1).log10().mul(0.0025).add(1)
                if(hasUpgrade("s",33)) b = b.pow(player.s.points.pow(0.5))
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
            currencyDisplayName: "Neutron Star",
            currencyInternalName: "st",
            currencyLayer: "s"
        }, 
        15: {
            description: "sn2 makes Supernova count bonus Neutron Star gain speed",
            cost() { return new Decimal(350) },
            unlocked() { return player.s.points.gte(2) },
            effect(){
                let b = player.s.points.pow(2)
                return b;
            },
            effectDisplay() { return format(this.effect())+"x" },
            currencyDisplayName: "Neutron Star",
            currencyInternalName: "st",
            currencyLayer: "s"
        }, 
        21: {
            description: "t1 makes Copy Multiplier become 1.15 power",
            cost() { return new Decimal(1500) },
            unlocked() { return player.s.points.gte(2) },
            currencyDisplayName: "Neutron Star",
            currencyInternalName: "st",
            currencyLayer: "s"
        }, 
        22: {
            description: "bh2 makes Tension Points become 1.15 power",
            cost() { return new Decimal(1500) },
            unlocked() { return player.s.points.gte(2) },
            currencyDisplayName: "Neutron Star",
            currencyInternalName: "st",
            currencyLayer: "s"
        }, 
        23: {
            description: "qol1 Auto-buy p buyable 12",
            cost() { return new Decimal(1500) },
            unlocked() { return player.s.points.gte(2) },
            currencyDisplayName: "Neutron Star",
            currencyInternalName: "st",
            currencyLayer: "s"
        }, 
        24: {
            description: "m2 23 Seemingly debuff, actually buff Certain tension makes tension softcap effect /1.1",
            cost() { return new Decimal(10000) },
            unlocked() { return player.s.points.gte(3) },
            currencyDisplayName: "Neutron Star",
            currencyInternalName: "st",
            currencyLayer: "s"
        }, 
        25: {
            description: "qol2 Your Copy Points won't drop below 1",
            cost() { return new Decimal(10000) },
            unlocked() { return player.s.points.gte(3) },
            currencyDisplayName: "Neutron Star",
            currencyInternalName: "st",
            currencyLayer: "s"
        }, 
        31: {
            description: "m2 makes Points gain softcap threshold become 1.5 power",
            cost() { return new Decimal(50000) },
            unlocked() { return player.s.points.gte(3) && hasMilestone("a",26) },
            currencyDisplayName: "Neutron Star",
            currencyInternalName: "st",
            currencyLayer: "s"
        }, 
        32: {
            description: "chal1 Unlock a challenge",
            cost() { return new Decimal(250000) },
            unlocked() { return player.s.points.gte(4) },
            currencyDisplayName: "Neutron Star",
            currencyInternalName: "st",
            currencyLayer: "s"
        }, 
        33: {
            description: "meta1 28.Quadruple Tension  s first 4 upgrades become (Copy Supernova 0.5 power) power",
            cost() { return new Decimal(500000) },
            unlocked() { return player.s.points.gte(4) },
            currencyDisplayName: "Neutron Star",
            currencyInternalName: "st",
            currencyLayer: "s"
        }, 
        34: {
            description: "meta2 29. Quintuple Tension p first 5 upgrades directly affect Copy Points",
            cost() { return new Decimal(1000000) },
            unlocked() { return player.s.points.gte(4) },
            currencyDisplayName: "Neutron Star",
            currencyInternalName: "st",
            currencyLayer: "s"
        }, 
    },
    challenges: {
        11: {
            name() { return 'Extreme Conversion'},
            challengeDescription() { return 'f buyable 11 price conversion starts from 0, cannot be weakened or removed, challenge completion count based on its amount.'},
            rewardDescription() { 
                return `Current ${format(this.rewardEffect())}/100`
            },
            rewardEffect() {
                return new Decimal(player.s.challenges[11])
            },
            onExit() {
                player.s.challenges[11] = getBuyableAmount("f", 11).max(challengeEffect("s", 11)).max(0)
            },
            completionLimit: "1eeeee10",
            canComplete() { return true },
            resource() { return player.points },
            unlocked() { return hasUpgrade("s",32) }
        }
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
        "chl": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", () => 
                    `You have ${format(player.s.st)}(+${format(layers.s.stg())}/s) Neutron Stars`,
                    { "font-size": "20px" }
                ],
                "challenges",
            ],
            unlocked() { return hasUpgrade("s",32) }
        },
    },
    update(diff) {
        player.s.st = player.s.st.add(this.stg().mul(diff))
        if(hasUpgrade("p",54)) player.s.points = player.s.points.max(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "s", description: "s: Perform Supernova Reset", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasMilestone("a",11) }
})