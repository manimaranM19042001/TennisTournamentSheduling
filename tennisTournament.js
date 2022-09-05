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
}

// Function 1 : Assigning playerID

function assignPlayerID(TournamentDetails) {
    let GivenPlayerDetails = TournamentDetails.playerDetails
    GivenPlayerDetails.forEach(function (Details) {
        function PlayerID(Object) {
            let rankString = String(Object.Rank)
            suffix1 = String(Object.Name.slice(1, 2) + Object.Name.slice(Object.Name.length - 2, Object.Name.length - 1)).toUpperCase()
            suffix2 = String(Object.Name.slice(0, 1) + Object.Name.slice(Object.Name.length - 1, Object.Name.length)).toUpperCase()
            return (String(`TTP_${rankString}${suffix1}${suffix2}`));
        }
        Details.playerID = PlayerID(Details)
    });
    return GivenPlayerDetails
}

tennisTournament.playerDetails = assignPlayerID(tennisTournament)

// Function 2 : Sorting the playersdetails based on their ranks

function sortByRank(TournamentDetails) {
    let GivenPlayerDetails = TournamentDetails.playerDetails
    GivenPlayerDetails.sort((player1, player2) => {
        return player1.Rank - player2.Rank
    })
    return GivenPlayerDetails
}

tennisTournament.playerDetails = sortByRank(tennisTournament)

// Function 3 : Sorting the players namelist based on their ranks

function sortNamelistByRank(nameList) {
    list = tennisTournament.playerDetails.filter(element => nameList.includes(element.Name))
    list.sort((player1, player2) => (player1.Rank - player2.Rank))
    return (list.map(element => element.Name));
}

// Function 4 : Create match ID 

function createMatchId(matchDetails) {
    suffix1 = String(matchDetails.opponent1.slice(0, 2)).toUpperCase()
    suffix2 = String(matchDetails.opponent2.slice(matchDetails.opponent2.length - 2, matchDetails.opponent2.length)).toUpperCase()
    return (`TTM_${suffix1}${suffix2}`)
}

playerNames = tennisTournament.playerDetails.map(playerDetails => playerDetails.Name)

// Function 5 : Predicting winners based on their rank probability

function predictWinner(opponent1, opponent2) {

    playerDetails = tennisTournament.playerDetails

    player1 = opponent1
    player2 = opponent2

    drawList = []

    rankOfPlayer1 = playerDetails.filter(element => element.Name == player1)[0].Rank
    rankOfPlayer2 = playerDetails.filter(element => element.Name == player2)[0].Rank

    probabilityOfPlayer1 = Math.floor(100 / rankOfPlayer1)

    for (i = 1; i <= probabilityOfPlayer1; i++) {
        drawList.push(player1)
    }

    probabilityOfPlayer2 = Math.floor(100 / Math.abs(rankOfPlayer2 - rankOfPlayer1))

    for (i = 1; i <= probabilityOfPlayer2; i++) {
        drawList.push(player2)
    }
    lengthOfDrawList = (probabilityOfPlayer1 + probabilityOfPlayer2)

    drawNumber = Math.floor(Math.random() * lengthOfDrawList)

    winner = drawList[drawNumber]
    return winner
}

// Function 6 : Making match Shedule

function makeShedule(NameList) {
    roundDetails = []
    playerNameList = NameList
    var roundNumber = 1
    i = 1
    do {
        for (j = 0; j < playerNameList.length / 2; j += 2) {
            subMatch1 = {}
            subMatch1.opponent1 = playerNameList[j]
            subMatch1.opponent2 = playerNameList[playerNameList.length - 1 - j]
            subMatch1.matchID = createMatchId(subMatch1)
            subMatch1.round = roundNumber
            roundDetails.push(subMatch1)
        }
        for (k = (playerNameList.length / 2) - 1; k >= 1; k -= 2) {
            subMatch2 = {}
            subMatch2.opponent1 = playerNameList[k]
            subMatch2.opponent2 = playerNameList[playerNameList.length - 1 - k]
            subMatch2.matchID = createMatchId(subMatch2)
            subMatch2.round = roundNumber
            roundDetails.push(subMatch2)
        }

        match = roundDetails
        match.forEach(function (element) {
            if (element.round == roundNumber) {
                playerOne = element.opponent1
                playerTwo = element.opponent2
                element.winner = predictWinner(playerOne, playerTwo)
            }
        })

        winners = []
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

// Function 7 : Update no of matches played by by the player

function updateMatchCount(player) {
    playerData = tennisTournament.playerDetails
    playerData.forEach(function (element) {
        if (element.Name == player) {
            element.matchesPlayed = element.matchesPlayed + 1
        }
    })
    return playerData;
}

rounds = tennisTournament.rounds


rounds.forEach(function (element) {
    updateMatchCount(element.opponent1)
    updateMatchCount(element.opponent2)
})

// Printing results

console.log("PLAYER'S DATA");
console.table(tennisTournament.playerDetails);
//console.table(tennisTournament.rounds);

// filtering rounds separately
console.log("ROUND 1 :");
console.table(tennisTournament.rounds.filter(element => element.round == 1))
console.log("ROUND 2 :");
console.table(tennisTournament.rounds.filter(element => element.round == 2))
console.log("ROUND 3 :");
console.table(tennisTournament.rounds.filter(element => element.round == 3))
