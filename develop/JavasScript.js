
// Taking input and displaying the value into the table

var searchInput = document.getElementById('statsInput');
var searchButton = document.getElementById('searchButton');
var platInput = document.getElementById('platInput');

function getCurrentStats (inputValue, platformValue){
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
    var scorePerMin = brRes.scorePerMinute;
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
    <td> ${kd} </td>  
    
    </tr>`;

    $('table').append(statTable);

});

};

function getMatchStats (inputValue, platformValue){


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

$.ajax(settingsMatch).then(function (response) {

    console.log(response);

});

};

searchButton.addEventListener('click', function (event) {
    event.preventDefault();

    var inputValue = searchInput.value;
    var platformValue = platInput.value;

    getCurrentStats(inputValue, platformValue);
        setTimeout(() => {
            getMatchStats (inputValue, platformValue);
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