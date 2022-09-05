interface roundsType {opponent1 : string;opponent2:string;matchID:string;round:number;pointsOfOpponent1:number;pointsOfOpponent2:number;winner:string}
interface playerDetailsType {Name : string ; Rank: number; country:string;playerID:string}
interface tennisTournamentType {playerDetails :playerDetailsType[];rounds:roundsType[]}

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
} as tennisTournamentType

// Function 1 : Assigning playerID

function assignPlayerID(TournamentDetails : tennisTournamentType) : playerDetailsType[]{
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

function sortByRank(TournamentDetails : tennisTournamentType) {
    let GivenPlayerDetails = TournamentDetails.playerDetails
    GivenPlayerDetails.sort((player1, player2) => {
        return player1.Rank - player2.Rank
    })
    return GivenPlayerDetails
}

tennisTournament.playerDetails = sortByRank(tennisTournament)

// Create match ID 

function createMatchId(matchDetails : roundsType) : string {
    let suffix1 = String(matchDetails.opponent1.slice(0, 2)).toUpperCase()
    let suffix2 = String(matchDetails.opponent2.slice(matchDetails.opponent2.length - 2, matchDetails.opponent2.length)).toUpperCase()
    return (`TTM_${suffix1}${suffix2}`)
}

// Finding no of rounds

function findNoOfRounds(playersCount : number) {
    let initial = playersCount
    let start = 2
    let listOfPlayersCount : number [] = []
    let listOfRoundsCount : number [] = []
    for (let i = 1; i < playersCount; i++) {
        listOfPlayersCount.push(start)
        listOfRoundsCount.push(i)
        start = start * 2
        if (start > playersCount) {
            break
        }
    }
    let index = listOfPlayersCount.indexOf(initial)
    let noOfRounds = listOfRoundsCount[index]
    return noOfRounds
}

let playerNames: string []= tennisTournament.playerDetails.map(playerDetails => playerDetails.Name)

let noOfRoundsOfTheTournament = findNoOfRounds(playerNames.length)

// Function 3 : Making match Shedule

function makeShedule(NameList : string[]) : roundsType[] {
    let roundDetails = []
    let playerNameList = NameList
    var roundNumber = 1
    for (let i = 0; i < noOfRoundsOfTheTournament; i++) {

        for (let j = 0; j < playerNameList.length / 2; j += 2) {
            let subMatch1 :any = {}
            subMatch1.opponent1 = playerNameList[j]
            subMatch1.opponent2 = playerNameList[playerNameList.length - 1 - j]
            subMatch1.matchID = createMatchId(subMatch1)
            subMatch1.round = roundNumber
            roundDetails.push(subMatch1)
        }
        for (let k = (playerNameList.length / 2) - 1; k >= 1; k -= 2) {
            let subMatch2 : any = {}
            subMatch2.opponent1 = playerNameList[k]
            subMatch2.opponent2 = playerNameList[playerNameList.length - 1 - k]
            subMatch2.matchID = createMatchId(subMatch2)
            subMatch2.round = roundNumber
            roundDetails.push(subMatch2)
        }

        let match = roundDetails
        match.forEach(function (element) {
            if ( element.round == roundNumber){
                let points1 = Math.round((Math.random()) * 9)
                let points2 = Math.round((Math.random()) * 9)
                element.pointsOfOpponent1 = points1
                element.pointsOfOpponent2 = points2
                if (points1 > points2) {
                    element.winner = element.opponent1
                } else if (points1 < points2) {
                    element.winner = element.opponent2
                } else if (points1 == points2) {
                    let toss = Math.floor(Math.random() * 2)
                    if (toss == 0) {
                        element.winner = element.opponent1
                    } else {
                        element.winner = element.opponent2
                    }
                }
            }        
        })

        let winners : string[] = []
        roundDetails.forEach(function (element) {
            if (element.round == roundNumber){
                winners.push(element.winner)
            }
        })

        playerNameList = winners
        roundNumber = roundNumber + 1
    }
    return roundDetails
}

tennisTournament.rounds = makeShedule(playerNames)

// Printing results

console.log(tennisTournament);