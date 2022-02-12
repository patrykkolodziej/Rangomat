exports.run = async (bot, message, args) => 
{
  if(message.channel.id === "932386973811867678")
  {
    if(message.author.id === "248165905119313948" || message.author.id === "396003289654755328" || message.author.id === "397785664373915659"|| message.author.id === "718175853900726384")
    {
      let messageArray = message.content.split(" ");
      var teamSize = parseInt(messageArray[1]);
      if(isNaN(teamSize))
      {
        message.channel.send("Podaj liczbę graczy w teamie!");
        return;
      }
      var channel = message.guild.channels.cache.get("932407553273524245");
      var playersArray = channel.members;
      var nicknamesArray = [];
      var players = 0;
      for (let [snowflake, guildMember] of playersArray) 
      {
        var nickname = guildMember.nickname;
        if(!nickname)
        nickname = guildMember.user.username;
        if(messageArray.includes(nickname))
        {

        }
        else
        {
          players++;
          nicknamesArray.push(nickname)
        }
      }
      if(players === 0)
      {
        message.channel.send("Nie ma chętnych graczy!");
        return;
      }
      if(players <= teamSize)
      {
        message.channel.send("Nie uda się utworzyć dwóch teamów z taką pulą graczy!");
        return;
      }
      bot.shuffle(nicknamesArray);
      var teamsAmount = Math.ceil(players/teamSize);
      message.channel.send("Mamy " + players + " chętnych graczy.");
      var returnMessage = "Losujemy " + teamsAmount + " teamów po " + teamSize + " graczy.";
      if(messageArray.length > 2)
      {
        returnMessage += "\nZ losowania wykluczamy następujących graczy:"
        for(let i = 2; i< messageArray.length; i++)
        {
          returnMessage += " **" + messageArray[i] + "**";
        }
        returnMessage += "\n";
      }
      for(let i = 1; i<= teamsAmount; i++)
      {
        returnMessage += ("\n __**Team " + i +  "**__");
        var add = 0;
        if(i!=1)
        {
          var add = (i - 1) * teamSize;
        }
        returnMessage +="```";
        for(let j = 0; j<teamSize; j++)
        {
          if(nicknamesArray[j + add] === undefined)
            {
              returnMessage +="\nWolny slot";
            }
            else
            {
              returnMessage += "\n" + nicknamesArray[j + add];
            }
          }
          returnMessage +="```";
        }
        message.channel.send(returnMessage);
    }
  }
}
exports.help = {
    name:"losuj",
    channel:"customy"
}