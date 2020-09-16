
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
        var statTable = `<tr> 
    <td> ${inputValue} </td>
    <td> ${timePlayed} </td> 
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

        
        var matchRes = responseM.summary.all;
        var mKills = matchRes.kills;
        var gulKills = matchRes.gulagKills;
        var headPer = matchRes.headshotPercentage;
        var headPerConv = headPer * 100
        var headPerConvLim = headPerConv.toFixed(3)
        var mKd = matchRes.kdRatio;
        var mKdCap = mKd .toFixed(3)
        var killsPerGame = matchRes.killsPerGame;
        var teamsWiped = matchRes.objectiveTeamWiped;
        var mtimePlayed = matchRes.timePlayed;
        console.log(matchRes)

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