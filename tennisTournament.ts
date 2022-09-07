interface RoundsType {opponent1 : string;opponent2:string;matchID:string;round:number;pointsOfOpponent1:number;pointsOfOpponent2:number;winner:string}
interface PlayerDetailsType {Name : string ; Rank: number; country:string;playerID:string;matchesPlayed:number}
interface TennisTournamentType {playerDetails :PlayerDetailsType[];rounds:RoundsType[]}

const tennisTournament = {
    playerDetails: [
        {
            Name: "Somdev Devvarman",
            Rank: 4,
            country: "USA",
            matchesPlayed: 54,
        },
        {
            Name: "Manimaran",
            Rank: 1,
            country: "India",
            matchesPlayed: 96,
        },
        {
            Name: "Ramanathan Krishnan",
            Rank: 6,
            country: "England",
            matchesPlayed: 23,
        },
        {
            Name: "Vijay Amritraj",
            Rank: 7,
            country: "China",
            matchesPlayed: 54,
        },
        {
            Name: "Leander Paes",
            Rank: 3,
            country: "Africa",
            matchesPlayed: 91,
        },
        {
            Name: "Mahesh Bhupathi",
            Rank: 5,
            country: "Swiss",
            matchesPlayed: 45,
        },
        {
            Name: "Rohan Bopanna",
            Rank: 8,
            country: "Italy",
            matchesPlayed: 56,
        },
        {
            Name: "Sania Mirza",
            Rank: 2,
            country: "Romania",
            matchesPlayed: 57,
        },
    ]
} as TennisTournamentType

var noOfPlayers = tennisTournament.playerDetails.length

// Function 1 : Assigning playerID

function assignPlayerID(TournamentDetails : TennisTournamentType) : PlayerDetailsType[]{
    let GivenPlayerDetails  = TournamentDetails.playerDetails
    GivenPlayerDetails.forEach(function (Details) {
        function PlayerID(Object : any) {
            let rankString = String(Object.Rank)
            let suffix1 = String(Object.Name.slice(1, 2) + Object.Name.slice(Object.Name.length - 2, Object.Name.length - 1)).toUpperCase()
            let suffix2 = String(Object.Name.slice(0, 1) + Object.Name.slice(Object.Name.length - 1, Object.Name.length)).toUpperCase()
            return (String(`TTP_${rankString}${suffix1}${suffix2}`));
        }
        Details.playerID = PlayerID(Details)
    });
    return GivenPlayerDetails
}

tennisTournament.playerDetails = assignPlayerID(tennisTournament)

//console.log(tennisTournament);

// Function 2 : Sorting the players based on their ranks

function sortByRank(TournamentDetails : TennisTournamentType) {
    let GivenPlayerDetails = TournamentDetails.playerDetails
    GivenPlayerDetails.sort((player1, player2) => {
        return player1.Rank - player2.Rank
    })
    return GivenPlayerDetails
}

tennisTournament.playerDetails = sortByRank(tennisTournament)

// Function 3 : Sorting the players namelist based on their ranks

function sortNamelistByRank(nameList : string[]) {
    let list = tennisTournament.playerDetails.filter(element => nameList.includes(element.Name))
    list.sort((player1, player2) => (player1.Rank - player2.Rank))
    return (list.map(element => element.Name));
}

// Function 4 : Create match ID 

function createMatchId(matchDetails : RoundsType) : string {
    let suffix1 = String(matchDetails.opponent1.slice(0, 2)).toUpperCase()
    let suffix2 = String(matchDetails.opponent2.slice(matchDetails.opponent2.length - 2, matchDetails.opponent2.length)).toUpperCase()
    return (`TTM_${suffix1}${suffix2}`)
}

let playerNames = tennisTournament.playerDetails.map(playerDetails => playerDetails.Name)

// Function 5 : Make percentageList from player details

playerNames = tennisTournament.playerDetails.map(playerDetails => playerDetails.Name)

function makePercentageList(TournamentDetails : TennisTournamentType ) {
    let playerDetails = TournamentDetails.playerDetails
    let percentageList = []
    let initial = 100
    for (let i = 0; i < playerDetails.length; i++) {
        let subObject : any = {}
        subObject.Name = playerDetails[i].Name
        subObject.percentage = initial
        percentageList.push(subObject)
        initial = initial - (((128/noOfPlayers) / 100) * initial)
    }
    return (percentageList);
}

var percentageListOfPlayers = makePercentageList(tennisTournament)

// Function 6 : Predicting winners based on their rank probability

function predictWinner(opponent1 : string, opponent2 : string) : string{

    let player1 = opponent1
    let player2 = opponent2

    let drawList : string[] = []

    let percentageOfPlayer1 = percentageListOfPlayers.filter(element => element.Name == player1)[0].percentage
    let percentageOfPlayer2 = percentageListOfPlayers.filter(element => element.Name == player2)[0].percentage

    let probabilityOfPlayer1 = Math.round((percentageOfPlayer1 / (percentageOfPlayer1 + percentageOfPlayer2)) * 100)
    for (let i = 1; i <= probabilityOfPlayer1; i++) {
        drawList.push(player1)
    }

    let probabilityOfPlayer2 = (Math.abs(100 - probabilityOfPlayer1))

    for (let i = 1; i <= probabilityOfPlayer2; i++) {
        drawList.push(player2)
    }
    let lengthOfDrawList = (probabilityOfPlayer1 + probabilityOfPlayer2)

    let drawNumber = Math.floor(Math.random() * lengthOfDrawList)

    let winner = drawList[drawNumber]
    return winner
}

// Function 7 : Making match Shedule

function makeShedule(NameList : string[]) : RoundsType[] {
    let roundDetails = []
    let playerNameList = NameList
    var roundNumber = 1
    do {
        for (let j = 0; j < playerNameList.length / 2; j += 2) {
            let subMatch1 :any= {}
            subMatch1.opponent1 = playerNameList[j]
            subMatch1.opponent2 = playerNameList[playerNameList.length - 1 - j]
            subMatch1.matchID = createMatchId(subMatch1)
            subMatch1.round = roundNumber
            roundDetails.push(subMatch1)
        }
        for (let k = (playerNameList.length / 2) - 1; k >= 1; k -= 2) {
            let subMatch2 :any= {}
            subMatch2.opponent1 = playerNameList[k]
            subMatch2.opponent2 = playerNameList[playerNameList.length - 1 - k]
            subMatch2.matchID = createMatchId(subMatch2)
            subMatch2.round = roundNumber
            roundDetails.push(subMatch2)
        }

        let match = roundDetails
        match.forEach(function (element) {
            if (element.round == roundNumber) {
                let playerOne = element.opponent1
                let playerTwo = element.opponent2
                element.winner = predictWinner(playerOne, playerTwo)
            }
        })

        var winners : string[] = []
        roundDetails.forEach(function (element) {
            if (element.round == roundNumber) {
                winners.push(element.winner)
            }
        })
        winners = sortNamelistByRank(winners)
        playerNameList = winners
        roundNumber = roundNumber + 1
    }
    while (winners.length > 1)

    return roundDetails
}

tennisTournament.rounds = makeShedule(playerNames)

// Function 8 : Update no of matches played by by the player

function updateMatchCount(player:string) {
    let playerData = tennisTournament.playerDetails
    playerData.forEach(function (element) {
        if (element.Name == player) {
            element.matchesPlayed = element.matchesPlayed + 1
        }
    })
    return playerData;
}

let rounds = tennisTournament.rounds


rounds.forEach(function (element) {
    updateMatchCount(element.opponent1)
    updateMatchCount(element.opponent2)
})

// Printing results

console.log("PLAYER'S DATA");
console.log(tennisTournament.playerDetails);
//console.table(tennisTournament.rounds);

// filtering rounds separately for eight players
console.log("ROUND 1 :");
console.log(tennisTournament.rounds.filter(element => element.round == 1))
console.log("ROUND 2 :");
console.log(tennisTournament.rounds.filter(element => element.round == 2))
console.log("ROUND 3 :");
console.log(tennisTournament.rounds.filter(element => element.round == 3))
