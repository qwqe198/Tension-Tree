addLayer("a", {
    name: "Impact Points", // Layer name
    symbol: "a", // Node symbol
    position: 0, // Horizontal position
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            sp: new Decimal(0),
        }
    },
    color: "#ff0000ff",
    requires: new Decimal(1e25), // Requirement to unlock
    resource: "Impact Points", // Prestige currency name
    baseResource: "Points", // Base resource name
    baseAmount() { return player.points }, // Get current base resource amount
    type: "static", // Type: static resource layer
    exponent: 1, // Prestige currency exponent
    gainMult() { // Multiplier for main currency
        mult = new Decimal(1)
        return mult
    },
    spg() { // Calculate impact fragment generation
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
    gainExp() { // Exponent for main currency
        exp = new Decimal(1)
        return exp
    },
    getNextAt() {
        let gain = new Decimal(1e25).pow(new Decimal(2).pow(player.a.points))
        return gain
    },
    milestones: {
        1: {
            requirementDescription: "1 Impact Point (6. Highly Tense Name)",
            effectDescription: "Tension Points gain ^0.5 then /2, unlock Impact Fragments, p upgrade 25 effect changed to unlock a challenge",
            done() { return player.a.points.gte(1) }
        },
        2: {
            requirementDescription: "2 Get 1 point in the Shocking Challenge",
            effectDescription: "7 Rich Tension Bonus If you bought both upgrades, p upgrade 22 first effect ^10, p upgrade 23 second effect ^80",
            done() { return player.points.gte(1) && inChallenge("p",11) }
        },
        3: {
            requirementDescription: "3 Get 2 base point gain",
            effectDescription: "8. Ultra-Fast Production You gain 1e-9x Tension Points per second",
            done() { return layers.p.eff().gte(2) }
        },
        4: {
            requirementDescription: "4 2 Impact Points",
            effectDescription: "Points gain ^0.25 then /1000, unlock Copy Points, Tension Points also increase Impact Fragment gain, Impact Fragments ^ (Impact Points)",
            done() { return player.a.points.gte(2) }
        },
        5: {
            requirementDescription: "5 1e6 Impact Fragments",
            effectDescription: "Unlock second a buyable",
            done() { return player.a.sp.gte(1e6) }
        },
        6: {
            requirementDescription: "6 Get 4 base point gain",
            effectDescription: "Impact Fragments x (milestones + 1)",
            done() { return layers.p.eff().gte(4) }
        },
        7: {
            requirementDescription: "7 Get 1e30 points in the Shocking Challenge",
            effectDescription: "Impact Fragments x (base point gain + 1)",
            done() { return player.points.gte(1e30) && inChallenge("p",11) }
        },
        8: {
            requirementDescription: "8 Get 10 base point gain",
            effectDescription: "Reduce second a buyable cost",
            done() { return layers.p.eff().gte(10) }
        },
        9: {
            requirementDescription: "9 3 Impact Points",
            effectDescription: "Tension Points effect ^0.5 then /2, (18 Reverse Snowball, Cyclic Tension) Copy multiplier takes (Copy Points magnitude) root, but Copy Points increase Impact Fragment gain. Auto-buy p upgrades, if f upgrade 14 is bought, remove /2 effect",
            done() { return player.a.points.gte(3) }
        },
        10: {
            requirementDescription: "10 19 Really Cyclic, So Tense 2nd milestone, but at 3 Impact Points",
            effectDescription: "Unlock third a buyable",
            done() { return player.points.gte(1) && inChallenge("p",11) && player.a.points.gte(3) }
        },
        11: {
            requirementDescription: "11 8th milestone, but at 3 Impact Points",
            effectDescription: "20 Supernova, Cosmic-Level Tension Unlock Copy Supernova",
            done() { return layers.p.eff().gte(10) && player.a.points.gte(3) }
        },
        12: {
            requirementDescription: "12 Get 1 Copy Supernova",
            effectDescription: "Auto-buy p buyable 11",
            done() { return player.s.points.gte(1) }
        },
        13: {
            requirementDescription: "13 1e40 Impact Fragments",
            effectDescription: "p layer upgrade 35 one-fifth bonus to copy multiplier",
            done() { return player.a.sp.gte(1e40) }
        },
        14: {
            requirementDescription: "14 Get 1e308 Copy Points (softcap)",
            effectDescription: "21 Tense Softcap Milestone 9 effect 2 becomes (Copy Points magnitude/308) power (minimum 1)",
            done() { return player.f.points.gte(1e308) }
        },
        15: {
            requirementDescription: "15 Get 2 Copy Supernovas",
            effectDescription: "Copy Supernova's (Impact Points) power bonus to first 3 s upgrade effects",
            done() { return player.s.points.gte(2) }
        },
        16: {
            requirementDescription: "16 Get 1e128 Tension Points",
            effectDescription: "Each Copy Supernova increases p buyable 12 base by +0.01",
            done() { return player.p.points.gte(1e128) }
        },
        17: {
            requirementDescription: "17 Get 3 Copy Supernovas",
            effectDescription: "Milestone 13 effect becomes (5 - Copy Supernovas)分之一 (minimum 1)",
            done() { return player.s.points.gte(3) }
        },
        18: {
            requirementDescription: "18 4 Impact Points",
            effectDescription: "p buyable 11 effect and Tension Points gain take (Impact Points) root, weaken f buyable 11 effect, 25 Tension Upgrade Modify p challenge 11, reset all p except challenges when entering",
            done() { return player.a.points.gte(4) }
        },
        19: {
            requirementDescription: "19 Get 1e64 points in Shocking Challenge 2",
            effectDescription: "Remove f buyable 11 conversion",
            done() { return player.points.gte(1e64) && inChallenge("p",11) && hasMilestone("a",18) }
        },
        20: {
            requirementDescription: "20 Get 1e72 points in Shocking Challenge 2",
            effectDescription: "Reduce a buyable 13 cost, 26 Golden Tension Unlock Gilding",
            done() { return player.points.gte(1e72) && inChallenge("p",11) && hasMilestone("a",18) }
        },
        21: {
            requirementDescription: "21 Get 2 p gilding score",
            effectDescription: "p gilding score 1% bonus to Tension Points gain exponent",
            done() { return challengeEffect("a", 11).gte(2) }
        },
        22: {
            requirementDescription: "22 Get 4 p gilding score",
            effectDescription: "p gilding score 1% bonus to p buyable 12 base",
            done() { return challengeEffect("a", 11).gte(4) }
        },
        23: {
            requirementDescription: "23 27. Dual Milestone Tension Get 1e25 Copy Points on top of previous milestone",
            effectDescription: "Copy multiplier ^ (Impact Points)",
            done() { return hasMilestone("a",22) && player.f.points.gte(1e25) }
        },
        24: {
            requirementDescription: "24 15th milestone but at 4 Impact Points",
            effectDescription: "Unlock f gilding",
            done() { return hasMilestone("a",18) && player.s.points.gte(2) }
        },
        25: {
            requirementDescription: "25 Get 1 f gilding score",
            effectDescription: "Auto-buy first Copy Points buyable, Copy multiplier becomes (f gilding score + 1) power",
            done() { return challengeEffect("a", 12).gte(1) }
        },
        26: {
            requirementDescription: "26 17th milestone but at 4 Impact Points",
            effectDescription: "Neutron Star gain x (Copy Points double magnitude), unlock new Neutron Star tree upgrade at 3 Supernovas",
            done() { return hasMilestone("a",18) && player.s.points.gte(3) }
        },
        27: {
            requirementDescription: "27 Get 1e1000 Copy Points",
            effectDescription: "a buyable 12 effect ^1.1",
            done() { return player.f.points.gte("1e1000") }
        },
        28: {
            requirementDescription: "28 Get 5.7 p gilding score",
            effectDescription: "Base point gain x (milestones/25)",
            done() { return challengeEffect("a", 11).gte(5.7) }
        },
        29: {
            requirementDescription: "29 Get 1.4 f gilding score",
            effectDescription: "Copy multiplier becomes (s upgrades + 1) power",
            done() { return challengeEffect("a", 12).gte(1.4) }
        },
        30: {
            requirementDescription: "30 Get 4 Copy Supernovas",
            effectDescription: "Auto-buy f upgrades, your Copy Points won't drop below 1e10 (requires corresponding upgrade), Tension Points gain ^ (1 + milestones * 0.01)",
            done() { return player.s.points.gte("4") }
        },
        31: {
            requirementDescription: "31 Get 6.6 p gilding score",
            effectDescription: "Neutron Star gain x (p gilding score)",
            done() { return challengeEffect("a", 11).gte(6.6) }
        },
        32: {
            requirementDescription: "32 Complete 4 Extreme Conversions",
            effectDescription: "f upgrade 43 effect ^ (milestones/30)",
            done() { return player.s.challenges[11] >= 4 }
        },
        33: {
            requirementDescription: "33 Get 1e1725 Copy Points",
            effectDescription: "Copy multiplier ^ (f upgrade count + 1)",
            done() { return player.f.points.gte("1e1725") }
        },
        34: {
            requirementDescription: "34 Complete 5 Extreme Conversions",
            effectDescription: "p upgrade 33 effect ^ (milestones/30)",
            done() { return player.s.challenges[11] >= 5 }
        },
        35: {
            requirementDescription: "35 Get 7.3 p gilding score",
            effectDescription: "30. Tension from Milestones Tension!",
            done() { return challengeEffect("a", 11).gte(7.3) }
        },
        36: {
            requirementDescription: "36 Get 2.15 f gilding score",
            effectDescription: "31. Multi-Function Tension Tension!! Neutron Star gain x (f gilding score) (endgame)",
            done() { return challengeEffect("a", 12).gte(2.15) }
        },
    },
    buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = new Decimal(1.618).pow(x.pow(1.5)).floor()
                return c
            },
            display() { return `Points Gain<br />x${format(buyableEffect(this.layer, this.id), 2)}. (Next: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}). Cost: ${format(this.cost(getBuyableAmount(this.layer, this.id)))} Impact Fragments<br>Level: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.a.sp.gte(this.cost()) },
            buy() {
                player.a.sp = player.a.sp.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return ""
            },
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
            display() { return `Copy Multiplier<br />^${format(buyableEffect(this.layer, this.id), 2)}. (Next: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}). Cost: ${format(this.cost(getBuyableAmount(this.layer, this.id)))} Impact Fragments<br>Level: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.a.sp.gte(this.cost()) },
            buy() {
                player.a.sp = player.a.sp.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return ""
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = x.mul(0.1).add(1)
                if(hasMilestone("a",27)) eff = eff.pow(1.1)
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
            display() { return `f Upgrade 12 Effect<br />^${format(buyableEffect(this.layer, this.id), 2)}. (Next: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}). Cost: ${format(this.cost(getBuyableAmount(this.layer, this.id)))} Impact Fragments<br>Level: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.a.sp.gte(this.cost()) },
            buy() {
                player.a.sp = player.a.sp.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return ""
            },
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
        "chl": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "challenges",
            ],
            unlocked() { return hasMilestone("a", 20) }
        },
    },
    challenges: {
        11: {
            name() { return 'p Gilding'},
            challengeDescription() { return 'Disable f layer, gain score based on highest Tension Points during gilding.'},
            rewardDescription() { 
                return `Gilding Score:${format(this.rewardEffect())}`
            },
            rewardEffect() {
                let re = new Decimal(0)
                if(inChallenge("a",11)) re = re.max(player.p.points.add(1).log10().pow(0.5)).max(challengeEffect("a", 11))
                if(!inChallenge("a",11)) re = re.max(player.a.challenges[11])
                return re
            },
            goal: 0,
            onExit() {
                player.a.challenges[11] = player.p.points.add(1).log10().pow(0.5).max(challengeEffect("a", 11)).max(0)
            },
            completionLimit: "1eeeee10",
            canComplete() { return true },
            resource() { return player.p.points },
            unlocked() { return hasMilestone("a", 20) }
        },
        12: {
            name() { return 'f Gilding'},
            challengeDescription() { return 'Disable p layer, Copy Points softcap starts from 1e100, gain score based on highest Copy Points during gilding.'},
            rewardDescription() { 
                return `Gilding Score:${format(this.rewardEffect())}`
            },
            rewardEffect() {
                let re = new Decimal(0)
                if(inChallenge("a",12)) re = re.max(player.f.points.add(1).log10().add(1).log10()).max(challengeEffect("a", 12))
                if(!inChallenge("a",12)) re = re.max(player.a.challenges[12])
                return re
            },
            goal: 0,
            onExit() {
                player.a.challenges[12] = player.f.points.add(1).log10().add(1).log10().max(challengeEffect("a", 12)).max(0)
            },
            completionLimit: "1eeeee10",
            canComplete() { return true },
            resource() { return player.f.points },
            unlocked() { return hasMilestone("a", 24) }
        }
    },
    update(diff) {
        player.a.sp = player.a.sp.add(this.spg().mul(diff))
    },
    row: 2, // Row position
    hotkeys: [
        { key: "a", description: "a: Perform Impact Reset", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade("p",25) || player.a.points.gte(1) }
})