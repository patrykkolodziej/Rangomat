
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = 
{ 
  getPlayerID: function(client,discordName)
  {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'https://api.pubg.com/shards/pc-eu/players?filter[playerNames]=' + discordName, false);
    xmlHttp.setRequestHeader("Authorization", "Bearer " + client.config.api);
    xmlHttp.setRequestHeader("accept", "application/vnd.api+json");
    xmlHttp.send(null);
    if(xmlHttp.responseText == "")
    {
      return -1;
    }
    var resposne = JSON.parse(xmlHttp.responseText)
    if(resposne.errors)
      return 0;
    else
      return JSON.parse(xmlHttp.responseText).data[0].id;
  },
  getPlayerStats: function(client,playerID)
  {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", 'https://api.pubg.com/shards/steam/players/'+playerID+'/seasons/division.bro.official.pc-2018-15?filter[gamepad]=false', false);
  xmlHttp.setRequestHeader("Authorization", "Bearer " + client.config.api);
  xmlHttp.setRequestHeader("accept", "application/vnd.api+json");
  xmlHttp.send(null);
  if(xmlHttp.responseText == "")
  {
      return -1;
  }
  return playerData = JSON.parse(xmlHttp.responseText).data.attributes.gameModeStats.squad;
  }
}
