let modInfo = {
    name: "Tension Tree",
    id: "tensiontree",
    author: "QwQe198",
    pointsName: "Points",
    modFiles: ["layers.js", "tree.js"],
    
    discordName: "",
    discordLink: "",
    initialStartPoints: new Decimal(0), // Used for hard resets and new players
    offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
    num: "0.0",
    name: "Coo Coo Coo", // Onomatopoeia for bird sounds, keeping the playful tone
}

let changelog = ``

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
let gain = new Decimal(layers.p.eff())
		if(hasUpgrade("p",11))gain=gain.pow(2)
		if(hasUpgrade("p",12))gain=gain.pow(2)
		if(hasUpgrade("p",13))gain=gain.pow(2)
		if(hasUpgrade("p",14))gain=gain.pow(2)
		if(hasUpgrade("p",15))gain=gain.pow(2)
if(hasUpgrade("f",14))gain=gain.pow(upgradeEffect("f",14))
if(hasUpgrade("s",11))gain=gain.mul(upgradeEffect("s",11))
gain=gain.mul(buyableEffect("p",11))
gain=gain.mul(buyableEffect("a",11))
if(hasUpgrade("f",22))gain=gain.mul(10)
if(hasUpgrade("f",11))gain=gain.mul(upgradeEffect("f",11))
if(hasUpgrade("f",42))gain=gain.mul(upgradeEffect("s",12))
if(hasUpgrade("f",24))gain=gain.pow(1.05)
if(hasUpgrade("f",41))gain=gain.pow(upgradeEffect("s",14))
if(hasMilestone("a",4))gain=gain.pow(0.25).div(1000)
if(gain.gte(1e100))gain=gain.pow(0.1).mul(1e90)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
