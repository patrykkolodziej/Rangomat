exports.run = async (bot, message, args) => 
{
  if(message.channel.name === "rangi")
  {
    var discordName = message.guild.member(message.author).nickname;
    if(!discordName)
      discordName = message.author.username;
    let messageArray = message.content.split(" ");
    var returnMessage = "";
    var dbstats = undefined;
    if(messageArray.length === 1)
    {
      dbstats = bot.dbsql.prepare("SELECT * FROM TPP WHERE nickname=?").get(discordName);
      if(dbstats === undefined)
       {
         returnMessage +="Nie znaleziono gracza o nicku " + discordName + " w bazie danych!";
         message.channel.send(returnMessage);
         return;
       }
      returnMessage +="__Twoje statystki__\n";
    }
    else
    {
      dbstats = bot.dbsql.prepare("SELECT * FROM TPP WHERE nickname=?").get(messageArray[1]);
      if(dbstats === undefined)
       {
         
         returnMessage +="Nie znaleziono gracza o nicku " + messageArray[1] + " w bazie danych!";
         message.channel.send(returnMessage);
         return;
       }
      returnMessage +="__Statystki "+ messageArray[1] +"__\n";
    }
    returnMessage +="``` Liczba punktów: "+dbstats['skillPoints']+"\n Liczba zagranych gier: "+ dbstats['roundsPlayed']+"\n Liczba wygranych gier: "+ dbstats['wins']+"\n Procent wygranych gier: "+Math.round((dbstats['wins']/dbstats['roundsPlayed'])*100) + "%\n średnie obrażenia na gre: " + Math.round(dbstats['damageDealt'] / dbstats['roundsPlayed'])+ "\n średnie KDA na gre: "+((dbstats['kills'] + dbstats['assists'])/dbstats['losses']).toFixed(2)+ "\n Procent gier zakończonych w top10: "+Math.round((dbstats['top10s']/dbstats['roundsPlayed'])*100)+"%\n Procent zabójstw w głowe: "+ Math.round((dbstats['headshotKills'] / dbstats['kills']*100))+"%"+"```" ;
      message.channel.send(returnMessage);
  }
}
exports.help = {
    name:"staty",
    channel:"rangi"
}