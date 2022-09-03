const tennisTournament = {
    playerDetails: [
        {
            Name: "Somdev Devvarman",
            Rank: 4,
            country: "USA",
        },
        {
            Name: "Manimaran",
            Rank: 1,
            country: "India",
        },
        {
            Name: "Ramanathan Krishnan",
            Rank: 6,
            country: "England",
        },
        {
            Name: "Vijay Amritraj",
            Rank: 7,
            country: "China",
        },
        {
            Name: "Leander Paes",
            Rank: 3,
            country: "Africa",
        },
        {
            Name: "Mahesh Bhupathi",
            Rank: 5,
            country: "Swiss",
        },
        {
            Name: "Rohan Bopanna",
            Rank: 8,
            country: "Italy",
        },
        {
            Name: "Sania Mirza",
            Rank: 2,
            country: "Romania",
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

// Finding no of rounds

function findNoOfRounds(playersCount) {
    initial = playersCount
    start = 2
    listOfPlayersCount = []
    listOfRoundsCount = []
    for (i = 1; i < playersCount; i++) {
        listOfPlayersCount.push(start)
        listOfRoundsCount.push(i)
        start = start * 2
        if (start > playersCount) {
            break
        }
    }
    index = listOfPlayersCount.indexOf(initial)
    noOfRounds = listOfRoundsCount[index]
    return noOfRounds
}

playerNames = tennisTournament.playerDetails.map(playerDetails => playerDetails.Name)

noOfRoundsOfTheTournament = findNoOfRounds(playerNames.length)

// Function 3 : Making match Shedule

function makeShedule(NameList) {
    roundDetails = {}
    playerNameList = NameList
    for (i = 0; i < noOfRoundsOfTheTournament; i++) {
        var roundName = `round${i + 1}`
        matches = []
        serialNo1 = 1
        for (j = 0; j < playerNameList.length / 2; j += 2) {
            subMatch1 = {}
            subMatch1.matchNo = serialNo1
            subMatch1.opponent1 = playerNameList[j]
            subMatch1.opponent2 = playerNameList[playerNameList.length - 1 - j]
            subMatch1.matchID = createMatchId(subMatch1)
            matches.push(subMatch1)
            serialNo1++
        }
        serialNo2 = (matches.length) + 1
        for (k = (playerNameList.length / 2) - 1; k >= 1; k -= 2) {
            subMatch2 = {}
            subMatch2.matchNo = serialNo2
            subMatch2.opponent1 = playerNameList[k]
            subMatch2.opponent2 = playerNameList[playerNameList.length - 1 - k]
            subMatch2.matchID = createMatchId(subMatch2)
            matches.push(subMatch2)
            serialNo2++
        }

        match = matches
        match.forEach(function (element) {
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
        })

        winners = []
        matches.forEach(function (element) {
            winners.push(element.winner)
        })

        roundDetails[`${roundName}`] = matches
        playerNameList = winners
    }
    return roundDetails
}

tennisTournament.rounds = makeShedule(playerNames)

console.table(tennisTournament.playerDetails);

roundObj = tennisTournament.rounds

for (roundDetails in roundObj) {
    console.log((roundDetails).toUpperCase(), ":")
    console.table(roundObj[roundDetails])
}
