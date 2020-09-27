
// Taking input and displaying the value into the table

var searchInput = document.getElementById('statsInput');
var searchButton = document.getElementById('searchButton');
var platInput = document.getElementById('platInput');

// function for the ajax call to get the current stats and populate them to the table 

function getCurrentStats(inputValue, platformValue) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${inputValue}/${platformValue}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
            "x-rapidapi-key": "3d89a34d3cmshc035eb7f8e6a3f2p12c4fcjsnea2565e57614"
        }
    }

    $.ajax(settings).then(function (response) {
        let brRes = response.br
        var kills = brRes.kills;
        var kd = brRes.kdRatio;
        var kdLimit = kd.toFixed(3)
        var topTen = brRes.topTen;
        var topFive = brRes.topFive;
        var wins = brRes.wins
        var timePlayed = brRes.timePlayed;
        var timeDay = (timePlayed / 86400).toFixed(3);
        var statTable = `<tr> 
    <td> ${inputValue} </td>
    <td> ${timeDay} </td> 
    <td> ${wins} </td> 
    <td> ${topFive} </td> 
    <td> ${topTen} </td> 
    <td> ${kills} </td> 
    <td> ${kdLimit} </td>   
    <td> <button><i class="fas fa-search"></i> </button></td>
    </tr>`;

        $('#statTable').append(statTable);

    });

};

function getMatchStats(inputValue, platformValue) {
    var settingsMatch = {
        "async": true,
        "crossDomain": true,
        "url": `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone-matches/${inputValue}/${platformValue}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
            "x-rapidapi-key": "3d89a34d3cmshc035eb7f8e6a3f2p12c4fcjsnea2565e57614"
        }
    }

    $.ajax(settingsMatch).then(function (responseM) {

        // Variables for the summary of last 20 matches
        var matchRes = responseM.summary.all;
        var mKills = matchRes.kills;
        var gulKills = matchRes.gulagKills;
        var headPer = matchRes.headshotPercentage;
        var headPerConv = headPer * 100
        var headPerConvLim = headPerConv.toFixed(3)
        var mKd = matchRes.kdRatio;
        var mKdCap = mKd.toFixed(3)
        var killsPerGame = matchRes.killsPerGame;
        var teamsWiped = matchRes.objectiveTeamWiped;
        var mtimePlayed = (matchRes.timePlayed / 3600).toFixed(3);
        console.log(responseM)

        // Variables for each individual cards
        let matchCard = responseM.matches;


        // Table for the last 20 day stats

        var matchTable = `<tr> 
        <td> ${inputValue} </td>
        <td>${mtimePlayed} </td> 
        <td>Wins Holder </td> 
        <td>${headPerConvLim} </td> 
        <td> ${mKills} </td> 
        <td> ${gulKills} </td> 
        <td> ${killsPerGame}</td> 
        <td> ${mKdCap} </td> 
        <td> ${teamsWiped} </td>   
        </tr>`;

        


        // This is a for loop that is going through the last 5 matches (it is doing 5 because of my HTML)
        for (let i = 0; i < matchCard.length; i++) {
            let matchNumber = i+1;
            let startTimeUtc = matchCard[i].utcStartSeconds;
            let startTime = new Date(startTimeUtc *1000);
            let startTimeFinal = startTime.toLocaleString();
            let dateArray = startTimeFinal.split(",")
            let date = dateArray[0];
            let time = dateArray[1];
            
            let duration = ((matchCard[i].duration)/60000).toFixed(1);
            let place = matchCard[i].playerStats.teamPlacement;
            let cardKills = matchCard[i].playerStats.kills;
            let cardKd = (matchCard[i].playerStats.kdRatio).toFixed(3);
            let mode = matchCard[i].mode.substring(5);
            let cardDeaths = matchCard[i].playerStats.deaths;

            // Table for the per match stats cards
            var matchCards = `            
            <div class="cardPopulation">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title matchNumber"><b>Match</b> ${matchNumber}</h5>
                    <div class="row">
                    <p class="matchStats col-6"><b>Start Date:</b> ${date} </p>
                    <p class="matchStats col-6"><b>Start Time:</b> ${time} </p>
                    </div>
                    <p class="matchStats"><b>Mode:</b> ${mode} </p>
                    <p class="matchStats"><b>Minutes:</b> ${duration} </p>
                    <p class ="matchStats" id="place"><b>Place:</b> ${place}</p>
                    <p class ="matchStats" id="kills"><b>Kills:</b> ${cardKills}</p>
                    <p class ="matchStats" id="deaths"><b>Deaths:</b> ${cardDeaths}</p>
                    <p class ="matchStats" id="kd"><b>K/D Ratio:</b> ${cardKd}</p>
                </div>
            </div>
        </div>
            `
            $('#match'+ matchNumber).append(matchCards);
        }


        $('#mTable').append(matchTable);
        

    });

};

searchButton.addEventListener('click', function (event) {
    event.preventDefault();

    var inputValue = searchInput.value;
    var platformValue = platInput.value;

    getCurrentStats(inputValue, platformValue);
    setTimeout(() => {
        getMatchStats(inputValue, platformValue);
    }, 3000);

    searchInput.value = '';
    platInput.value = '';
});


//This is all old stuff I started working on and then changed but might use later. 

// $(".matchBtn").click(function(e){
//     e.preventDefault();
//     var settingsMatch = {
//         "async": true,
//         "crossDomain": true,
//         "url": `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone-matches/${inputValue}/${platformValue}`,
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
//             "x-rapidapi-key": "3d89a34d3cmshc035eb7f8e6a3f2p12c4fcjsnea2565e57614"
//         }
//     }

//     $.ajax(settingsMatch).done(function (response) {
//         console.log(response);

//     

// });

//  $('table').val(localStorage.getItem(statTable))

{/* <p class ="matchStats" id="fcd">First Cir Down:</p>
<p class ="matchStats" id="scd">Second Cir Down:</p>
<p class ="matchStats" id="tcd">Third Cir Down:</p>
<p class ="matchStats" id="frcd">Fourth Cir Down:</p>
<p class ="matchStats" id="ficd">Fifth Cir Down:</p> */}