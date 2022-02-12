exports.run = async (bot, message, args) => 
{
  if(message.channel.name === "rangi")
  {
    var discordName = message.guild.member(message.author).nickname;
    if(!discordName)
      discordName = message.author.username;
    var pubgID = bot.pubgAPI.getPlayerID(bot,discordName);
    var returnMessage = "";
    if(pubgID === 0)
    {
      returnMessage += "Witaj, ustaw pseudonim na serwerze identyczny jak nick w grze!";
      message.reply(returnMessage);
      return;
    }
    var returnMessage = "";
    if(pubgID === -1)
    {
      returnMessage += "Witaj, wystąpił błąd w połączeniu z PUBG API, spróbuj ponownie za minutę.";
      message.reply(returnMessage);
      return;
    }
    var stats = bot.pubgAPI.getPlayerStats(bot,pubgID);
    if(stats === -1)
    {
      returnMessage += "Witaj, wystąpił błąd w połączeniu z PUBG API, spróbuj ponownie za minutę.";
      message.reply(returnMessage);
      return;
    }
    var rank = bot.ranks.getRank(stats);
    if (rank['skill'] == "-1")
    {
      returnMessage += "Musisz zagrać przynajmniej 75 gier w trybie squad tpp tym sezonie aby otrzymać rangę! Narazie rozegrałeś " + stats['roundsPlayed'] + " gier.";
      message.reply(returnMessage);
      return;
    }
    const checkDiscordID = bot.dbsql.prepare("SELECT discord_id FROM TPP WHERE discord_id=?").get(message.author.id);
    const checkPUBGID = bot.dbsql.prepare("SELECT pubg_id FROM TPP WHERE pubg_id=?").get(pubgID);
    const insertInto = bot.dbsql.prepare('INSERT INTO TPP(discord_id, pubg_id, nickname , assists, damageDealt, kills, longestKill, roundsPlayed, wins, headshotKills, top10s, losses, skillPoints, rank, rideDistance, swimDistance ,roundMostKills) VALUES (?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,?, ?,?,?,?,?)');
    const ranks = 
      {
      'Iron' : 1,
      'Bronze' : 2,
      'Silver' : 3,
      'Gold' : 4,
      'Platinum':5,
      'Diamond':6,
      'Master':7,
      'Grandmaster':8,
      'Challenger':9,
      'Odpaleniec': 10     
      };
    var entityData = 
    {
      'discordID' : message.author.id,
      'newRank' : ranks[rank['rank']],
      'oldRank' : ranks[rank['rank']],
      'guild' : message.guild,
      'nessage' : message
    }
    if(checkDiscordID === undefined)
    {
      if(checkPUBGID === undefined)
      {
        returnMessage += "Witaj, otrzymujesz rangę _" +rank['rank'] +"_, jeżeli uznasz, że poprawiłeś swoje statystki i chcesz je zaaktualizować to wpisz ponownie !ranga, jeżeli chcesz podejrzeć kogoś lub swoje statystki wpisz !staty <nick>.\n";
        returnMessage +="__Twoje statystki__\n";
        returnMessage +="``` Liczba punktów: "+rank['skill']+"\n Liczba zagranych gier: "+ stats['roundsPlayed']+"\n Liczba wygranych gier: "+ stats['wins']+"\n Procent wygranych gier: "+Math.round((stats['wins']/stats['roundsPlayed'])*100) + "%\n średnie obrażenia na gre: " + Math.round(stats['damageDealt'] / stats['roundsPlayed'])+ "\n średnie KDA na gre: "+((stats['kills'] + stats['assists'])/stats['losses']).toFixed(2)+ "\n Procent gier zakończonych w top10: "+Math.round((stats['top10s']/stats['roundsPlayed'])*100)+"%\n Procent zabójstw w głowe: "+ Math.round((stats['headshotKills'] / stats['kills']*100))+"%"+"```" ;
        insertInto.run(message.author.id,pubgID,discordName, stats['assists'],stats['damageDealt'],stats['kills'],stats['longestKill'],stats['roundsPlayed'],stats['wins'],stats['headshotKills'],stats['top10s'],stats['losses'],rank['skill'],rank['rank'],stats['rideDistance'], stats['swimDistance'],stats['roundMostKills']);
        message.reply(returnMessage);
        bot.ranks.setRank(entityData);
        return;
      }
    }
    else
    {
      if(checkPUBGID===undefined)
      {
        returnMessage += "Niestety nastąpił błąd, konto pubg jest przypisane do innego discorda. Jeżeli naszła pomyłka skontaktuj się z moderatorem.";
        message.reply(returnMessage);
        return;
      }
      var dbstats = bot.dbsql.prepare("SELECT * FROM TPP WHERE pubg_id=?").get(pubgID);
      if(dbstats.nickname != discordName)
      {
        const update = bot.dbsql.prepare('UPDATE TPP SET nickname = ? WHERE pubg_id = ?').run(discordName,pubgID)
      }
      if(ranks[dbstats.rank] >=  ranks[rank['rank']])
      {
        returnMessage += "Niestety nie poprawiłeś swoich statystyk.\n";
        if(dbstats.skillPoints < rank['skill'])
        {
          const update = bot.dbsql.prepare('UPDATE TPP SET assists = ?, damageDealt = ?, kills = ?, longestKill = ?, roundsPlayed = ?, wins = ?, headshotKills = ?, top10s = ?,losses = ?, skillPoints = ?, rideDistance = ?, swimDistance = ?,roundMostKills = ? WHERE pubg_id = ?').run(stats['assists'],stats['damageDealt'],stats['kills'],stats['longestKill'],stats['roundsPlayed'],stats['wins'],stats['headshotKills'],stats['top10s'],stats['losses'],rank['skill'],stats['rideDistance'], stats['swimDistance'],stats['roundMostKills'],pubgID); 
          dbstats = bot.dbsql.prepare("SELECT * FROM TPP WHERE pubg_id=?").get(pubgID);
        }
        returnMessage +="__Twoje statystki__\n";
        returnMessage +="``` Liczba punktów: "+dbstats['skillPoints']+"\n Liczba zagranych gier: "+ dbstats['roundsPlayed']+"\n Liczba wygranych gier: "+ dbstats['wins']+"\n Procent wygranych gier: "+Math.round((dbstats['wins']/dbstats['roundsPlayed'])*100) + "%\n średnie obrażenia na gre: " + Math.round(dbstats['damageDealt'] / dbstats['roundsPlayed'])+ "\n średnie KDA na gre: "+((dbstats['kills'] + dbstats['assists'])/dbstats['losses']).toFixed(2)+ "\n Procent gier zakończonych w top10: "+Math.round((dbstats['top10s']/dbstats['roundsPlayed'])*100)+"%\n Procent zabójstw w głowe: "+ Math.round((dbstats['headshotKills'] / dbstats['kills']*100))+"%"+"```" ;
        message.reply(returnMessage);
        return;
      }
      if(ranks[dbstats.rank] < ranks[rank['rank']])
      {
        returnMessage += "Gratulacje, właśnie awansowałeś na rangę _" + rank['rank'] + "_!\n";
        const update = bot.dbsql.prepare('UPDATE TPP SET assists = ?, damageDealt = ?, kills = ?, longestKill = ?, roundsPlayed = ?, wins = ?, headshotKills = ?, top10s = ?,losses = ?, skillPoints = ?,rank = ?, rideDistance = ?, swimDistance = ?,roundMostKills = ? WHERE pubg_id = ?').run(stats['assists'],stats['damageDealt'],stats['kills'],stats['longestKill'],stats['roundsPlayed'],stats['wins'],stats['headshotKills'],stats['top10s'],stats['losses'],rank['skill'], rank['rank'],stats['rideDistance'], stats['swimDistance'],stats['roundMostKills'],pubgID); 
        dbstats = bot.dbsql.prepare("SELECT * FROM TPP WHERE pubg_id=?").get(pubgID);
        returnMessage +="__Twoje statystki__\n";
        returnMessage +="``` Liczba punktów: "+dbstats['skillPoints']+"\n Liczba zagranych gier: "+ dbstats['roundsPlayed']+"\n Liczba wygranych gier: "+ dbstats['wins']+"\n Procent wygranych gier: "+Math.round((dbstats['wins']/dbstats['roundsPlayed'])*100) + "%\n średnie obrażenia na gre: " + Math.round(dbstats['damageDealt'] / dbstats['roundsPlayed'])+ "\n średnie KDA na gre: "+((dbstats['kills'] + dbstats['assists'])/dbstats['losses']).toFixed(2)+ "\n Procent gier zakończonych w top10: "+Math.round((dbstats['top10s']/dbstats['roundsPlayed'])*100)+"%\n Procent zabójstw w głowe: "+ Math.round((dbstats['headshotKills'] / dbstats['kills']*100))+"%"+"```" ;
        entityData['oldRank'] = ranks[dbstats.rank];
        bot.ranks.setRank(entityData);
        message.reply(returnMessage);
        return;
      }
    }
    returnMessage += "Wystąpił błąd w działaniu bota, poinformuj technika!";
    message.reply(returnMessage);
  }
}
exports.help = {
    name:"ranga",
    channel:"rangi"
}