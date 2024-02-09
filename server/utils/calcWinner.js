
function calcWinner(data){
    const scores = data.map(team => team.score)
    const winningScore = Math.min(...scores)
    const teams = data.filter(team => team.score === winningScore)

    let points=0;
    if(teams.length === 1){
        points =1;
    } else if(teams.length > 1){
        points = 0.5;
    }
    else {
        console.log('Error Something went wrong')
    }
    return {points, teams}
}

module.exports = calcWinner;