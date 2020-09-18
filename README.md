# Ian's Warzone Project

## Description 
The goal here is to build a site that allows people to input their gamer tag as well as tags of friends. When they search for that tag we will do an API call and populate a table with stats based on their return. We will then save that info to local storage so that they can compare their stats against friends as they continue to search. 

### User Story
AS a Warzone player, I want to see my teams stats in one place, so that I can stay up to date without having to be on my system.

## How to use

Just enter your gamer tag and then the system you play on and press get stats. It will then pull your current stats and after three seconds will load your last 20 game stats. The delay is caused by the API not allowing two request that fast. 

<ins>API Used</ins><br>
For this project I am using an API from rapidAPI by elreco. You can find the API here<br> 
https://rapidapi.com/elreco/api/call-of-duty-modern-warfare?utm_source=google&utm_medium=cpc&utm_campaign=Beta_106137314761&utm_term=%2Bwarzone%20%2Bapi_b&gclid=Cj0KCQjwtZH7BRDzARIsAGjbK2ZCoKoZ6Pap7k69LcEomgw_R3y1pw3mnsRlimxZBhV59xJsUOeGmG4aAqU8EALw_wcB


