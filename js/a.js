addLayer("a", {
    name: "Impact Points",
    symbol: "a",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            sp: new Decimal(0),
        }
    },
    color: "#ff0000ff",
    requires: new Decimal(1e25),
    resource: "Impact Points",
    baseResource: "Points",
    baseAmount() { return player.points },
    type: "static",
    exponent: 1,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    spg() {
        sp = player.a.points.mul(player.points.add(10).log10())
        if(hasMilestone("a",4)) sp = sp.mul(player.p.points.add(10).log10())
        if(hasMilestone("a",9)) sp = sp.mul(player.f.points.add(10).log10())
        if(hasMilestone("a",6)) sp = sp.mul(player.a.milestones.length+1)
        if(hasMilestone("a",7)) sp = sp.mul(layers.p.eff().add(1))
        if(hasUpgrade("f",22)) sp = sp.mul(10)
        if(hasUpgrade("s",13)) sp = sp.mul(upgradeEffect("s",13))
        if(hasUpgrade("f",24)) sp = sp.pow(1.05)
        sp = sp.pow(player.a.points.max(1))
        return sp
    },
    gainExp() {
        exp = new Decimal(1)
        return exp
    },
    getNextAt() {
        let gain = new Decimal(1e25).pow(new Decimal(2).pow(player.a.points))
        return gain
    },
    milestones: {
        1: {
            requirementDescription: "1 Impact Point (6. Highly Tensioned Name)",
            effectDescription: "Tension Points gain ^0.5 then /2, unlock Impact Fragments, p upgrade 25 effect changed to unlock a challenge",
            done() { return player.a.points.gte(1) }
        },
        2: {
            requirementDescription: "2 Gain 1 point in the breathtaking challenge",
            effectDescription: "7 Tensioned bonus If you buy both upgrades, p upgrade 22 first effect ^10, p upgrade 23 second effect ^80",
            done() { return player.points.gte(1) && inChallenge("p",11) }
        },
        3: {
            requirementDescription: "3 Gain 2 base point gain",
            effectDescription: "8. Ultra-fast production You gain 1 billionth of Tension Points per second",
            done() { return layers.p.eff().gte(2) }
        },
        4: {
            requirementDescription: "4 2 Impact Points",
            effectDescription: "Points gain ^0.25 then /1000, unlock Duplication Points, Tension Points also increase Impact Fragment gain, Impact Fragments ^ (Impact Points)",
            done() { return player.a.points.gte(2) }
        },
        5: {
            requirementDescription: "5 1e6 Impact Fragments",
            effectDescription: "Unlock second a buyable",
            done() { return player.a.sp.gte(1e6) }
        },
        6: {
            requirementDescription: "6 Gain 4 base point gain",
            effectDescription: "Impact Fragments x (milestones + 1)",
            done() { return layers.p.eff().gte(4) }
        },
        7: {
            requirementDescription: "7 Gain 1e30 points in the breathtaking challenge",
            effectDescription: "Impact Fragments x (base point gain + 1)",
            done() { return player.points.gte(1e30) && inChallenge("p",11) }
        },
        8: {
            requirementDescription: "8 Gain 10 base point gain",
            effectDescription: "Reduce cost of a's second buyable",
            done() { return layers.p.eff().gte(10) }
        },
        9: {
            requirementDescription: "9 3 Impact Points",
            effectDescription: "Tension Points effect ^0.5 then /2, (18 Reverse snowball, looping tension) Duplication multiplier rooted by (magnitude of Duplication Points), but Duplication Points boost Impact Fragment gain. Auto-buy p upgrades, if f upgrade 14 is bought, remove /2 effect",
            done() { return player.a.points.gte(3) }
        },
        10: {
            requirementDescription: "10 19 is really looping, so much tension 2nd milestone, but at 3 Impact Points",
            effectDescription: "Unlock third a buyable",
            done() { return player.points.gte(1) && inChallenge("p",11) && player.a.points.gte(3) }
        },
        11: {
            requirementDescription: "11 8th milestone, but at 3 Impact Points",
            effectDescription: "20 Supernova, cosmic-level tension Unlock Duplication Supernova",
            done() { return layers.p.eff().gte(10) && player.a.points.gte(3) }
        },
        12: {
            requirementDescription: "12 Gain 1 Duplication Supernova",
            effectDescription: "Auto-buy p buyable 11",
            done() { return player.s.points.gte(1) }
        },
        13: {
            requirementDescription: "13 1e40 Impact Fragments",
            effectDescription: "p layer upgrade 35's one-fifth bonus to duplication multiplier",
            done() { return player.a.sp.gte(1e40) }
        },
        14: {
            requirementDescription: "14 Gain 1e308 Duplication Points",
            effectDescription: "21 Tensioned softcap Milestone 9 effect 2 becomes original (magnitude of Duplication Points/308)th power (not less than 1)",
            done() { return player.f.points.gte(1e308) }
        },
        15: {
            requirementDescription: "15 Gain 2 Duplication Supernovas",
            effectDescription: "Duplication Supernova's (Impact Points)th power bonus to s first 3 upgrade effects",
            done() { return player.s.points.gte(2) }
        },
        16: {
            requirementDescription: "16 Gain 1e128 Tension Points",
            effectDescription: "Each Duplication Supernova increases p buyable 12 base by +0.01",
            done() { return player.p.points.gte(1e128) }
        },
        17: {
            requirementDescription: "17 Gain 3 Duplication Supernovas",
            effectDescription: "Milestone 13 effect changed to (5 - Duplication Supernovas)th root (not less than 1)",
            done() { return player.s.points.gte(3) }
        },
        18: {
            requirementDescription: "18 4 Impact Points",
            effectDescription: "p buyable 11 effect and Tension Points gain rooted by (Impact Points), weaken f buyable 11 effect, 25 Tension upgrade Modify p challenge 11, and reset all p except challenges when entering",
            done() { return player.a.points.gte(4) }
        },
        19: {
            requirementDescription: "19 Gain 1e64 points in breathtaking challenge 2",
            effectDescription: "Remove f buyable 11 reduction",
            done() { return player.points.gte(1e64) && inChallenge("p",11) && hasMilestone("a",18)}
        },
        20: {
            requirementDescription: "20 Gain 1e72 points in breathtaking challenge 2",
            effectDescription: "Reduce a buyable 13 cost, 26 Golden Tension Unlock gilding (coo coo coo)",
            done() { return player.points.gte(1e72) && inChallenge("p",11) && hasMilestone("a",18)}
        },
    },
    buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = new Decimal(1.618).pow(x.pow(1.5)).floor()
                return c
            },
            display() { return `Points gain<br />x${format(buyableEffect(this.layer, this.id), 2)}. (Next: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}). Cost: ${format(this.cost(getBuyableAmount(this.layer, this.id)))} Impact Fragments<br>Level: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.a.sp.gte(this.cost()) },
            buy() {
                player.a.sp = player.a.sp.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() { return "" },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = player.a.sp.add(10).log10().pow(x)
                if(hasUpgrade("p",53)) eff = eff.pow(buyableEffect("p", 12))
                return eff
            },
            unlocked() { return hasMilestone("a",1) },
        },
        12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = new Decimal(1.618).pow(x.pow(1.5).add(29)).floor()
                if(hasMilestone("a",8)) c = new Decimal(1.618).pow(x.pow(1.5)).floor()
                return c
            },
            display() { return `Duplication multiplier<br />^${format(buyableEffect(this.layer, this.id), 2)}. (Next: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}). Cost: ${format(this.cost(getBuyableAmount(this.layer, this.id)))} Impact Fragments<br>Level: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.a.sp.gte(this.cost()) },
            buy() {
                player.a.sp = player.a.sp.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() { return "" },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = x.mul(0.1).add(1)
                return eff
            },
            unlocked() { return hasMilestone("a",5) },
        },
        13: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = new Decimal(1.618).pow(x.pow(3).add(100)).floor()
                if(hasMilestone("a",20)) c = new Decimal(1.618).pow(x.pow(3)).floor()
                return c
            },
            display() { return `f upgrade 12 effect<br />^${format(buyableEffect(this.layer, this.id), 2)}. (Next: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}). Cost: ${format(this.cost(getBuyableAmount(this.layer, this.id)))} Impact Fragments<br>Level: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.a.sp.gte(this.cost()) },
            buy() {
                player.a.sp = player.a.sp.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() { return "" },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = x.add(1).pow(0.5)
                if(hasUpgrade("f",31)) eff = eff.pow(2)
                return eff
            },
            unlocked() { return hasMilestone("a",10) },
        },
    },
    tabFormat: {
        "mil": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", () => 
                    `You have ${format(player.a.sp)}(+${format(layers.a.spg())}/s) Impact Fragments`,
                    { "font-size": "20px" }
                ],
                "milestones",
            ],
            unlocked() { return true }
        },
        "buy": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", () => 
                    `You have ${format(player.a.sp)}(+${format(layers.a.spg())}/s) Impact Fragments`,
                    { "font-size": "20px" }
                ],
                "buyables",
            ],
            unlocked() { return true }
        },
    },
    update(diff) {
        player.a.sp = player.a.sp.add(this.spg().mul(diff))
    },
    row: 2,
    hotkeys: [
        { key: "a", description: "a: Perform Impact reset", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade("p",25) || player.a.points.gte(1) }
})