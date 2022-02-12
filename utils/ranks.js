const struct = (...keys) => ((...v) => keys.reduce((o, k, i) => {o[k] = v[i]; return o} , {}))


const rank = struct('id', 'name', 'guildID')


module.exports = 
{ 
   getRank: function(playerData)
   {
    var avargeDamage = playerData['damageDealt'] / playerData['roundsPlayed'];
    var avargeKDA = (playerData['kills'] + playerData['assists']) / playerData['losses'];
    var winRatio = (playerData['wins'] / playerData['roundsPlayed']) * 4000;
    var skillRatio = Math.round(((avargeKDA * 100) + avargeDamage + winRatio)/3);

    var returnData = [];
    if(playerData['roundsPlayed'] < 75)
    {
      returnData['skill'] = -1;
     return returnData;
    }
    returnData['skill'] = skillRatio;
    switch(true)
    {
      case(skillRatio <= 99):
         returnData['rank'] = "Iron";
         return returnData;
      case(skillRatio <= 199):
        returnData['rank'] = "Bronze";
        return returnData;
      case(skillRatio <= 299):
        returnData['rank'] = "Silver";
        return returnData;
      case(skillRatio <= 399):
        returnData['rank'] = "Gold";
        return returnData;
      case(skillRatio <= 499):
        returnData['rank'] = "Platinum";
        return returnData;
      case(skillRatio <= 599):
        returnData['rank'] = "Diamond";
        return returnData;
      case(skillRatio <= 699):
        returnData['rank'] = "Master";
        return returnData;
      case(skillRatio <= 799):
        returnData['rank'] = "Grandmaster";
        return returnData;
      case(skillRatio <= 899):
        returnData['rank'] = "Challenger";
        return returnData;
    case(skillRatio >= 900):
        returnData['rank'] = "Odpaleniec";
        return returnData;
    }

   },
   setRank: function(data)
   {
     var ranksArray = 
     [
       rank(1, 'Iron' , data['guild'].roles.cache.find(role => role.name == "Iron")),
       rank(2,'Bronze' , data['guild'].roles.cache.find(role => role.name == "Bronze")),
       rank(3,'Silver' , data['guild'].roles.cache.find(role => role.name == "Silver")),
       rank(4,'Gold' , data['guild'].roles.cache.find(role => role.name == "Gold")),
       rank(5,'Platinum' , data['guild'].roles.cache.find(role => role.name == "Platinum")),
       rank(6,'Diamond' , data['guild'].roles.cache.find(role => role.name == "Diamond")),
       rank(7,'Master' , data['guild'].roles.cache.find(role => role.name == "Master")),
       rank(8,'Grandmaster' , data['guild'].roles.cache.find(role => role.name == "Grandmaster")),
       rank(9,'Challenger' , data['guild'].roles.cache.find(role => role.name == "Challenger")),
       rank(10,'Odpaleniec' , data['guild'].roles.cache.find(role => role.name == "Odpaleniec"))     
     ];
     for(let i = 0; i<10; i++)
     {
           data['guild'].members.cache.get(data['discordID']).roles.remove(ranksArray[i].guildID);
     }
    data['guild'].members.cache.get(data['discordID']).roles.add(ranksArray[data['newRank']-1].guildID);
   }
}
