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

//console.log(tennisTournament);

// Function 2 : Sorting the players based on their ranks

function sortByRank(TournamentDetails) {
    let GivenPlayerDetails = TournamentDetails.playerDetails
    GivenPlayerDetails.sort((player1, player2) => {
        return player1.Rank - player2.Rank
    })
    return GivenPlayerDetails
}

tennisTournament.playerDetails = sortByRank(tennisTournament)

// Create match ID 

function createMatchId(matchDetails) {
    suffix1 = String(matchDetails.opponent1.slice(0, 2)).toUpperCase()
    suffix2 = String(matchDetails.opponent2.slice(matchDetails.opponent2.length - 2, matchDetails.opponent2.length)).toUpperCase()
    return (`TTM_${suffix1}${suffix2}`)
}

playerNames = tennisTournament.playerDetails.map(playerDetails => playerDetails.Name)

// Function 3 : Making match Shedule

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
            if ( element.round == roundNumber){
                points1 = Math.round((Math.random()) * 9)
                points2 = Math.round((Math.random()) * 9)
                element.pointsOfOpponent1 = points1
                element.pointsOfOpponent2 = points2
                if (points1 > points2) {
                    element.winner = element.opponent1
                } else if (points1 < points2) {
                    element.winner = element.opponent2
                } else if (points1 == points2) {
                    toss = Math.floor(Math.random() * 2)
                    if (toss == 0) {
                        element.winner = element.opponent1
                    } else {
                        element.winner = element.opponent2
                    }
                }
            }        
        })

        winners = []
        roundDetails.forEach(function (element) {
            if (element.round == roundNumber){
                winners.push(element.winner)
            }
        })

        playerNameList = winners
        roundNumber = roundNumber + 1
    }
    while(playerNameList.length >1)

    return roundDetails
}

tennisTournament.rounds = makeShedule(playerNames)


//Update no of matches played by by the player

function updateMatchCount(player){
    playerData = tennisTournament.playerDetails
    playerData.forEach(function (element) {
        if (element.Name == player) {
            element.matchesPlayed = element.matchesPlayed + 1
        }
    })
    return playerData;
}

rounds = tennisTournament.rounds


rounds.forEach(function (element){
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