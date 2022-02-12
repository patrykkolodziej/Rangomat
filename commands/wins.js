exports.run = async (bot, message, args) => 
{
  if(message.channel.name === "rangi")
  {
    const rowAll = bot.dbsql.prepare('SELECT * FROM TPP').all();
    let messageArray = message.content.split(" ");
    var size = parseInt(messageArray[1])
    if(isNaN(size))
    {
      var size = 10;
    }
    else
    {
      size = parseInt(messageArray[1])
    }
    var winArray = [];
    for(let i = 0; i<rowAll.length;i++)
    {
      var wins = (rowAll[i].wins / rowAll[i].roundsPlayed)*100;
      winArray.push([rowAll[i].nickname,Math.round(wins)]);
    }
    winArray.sort((a, b) => b[1] - a[1]);
    if(winArray.length <= size)
    {
      size = winArray.length;
    }
    var returnMessage = "";
    var number = 1;
    for(let i = 0; i < size; i++)
    {
      var member = message.guild.members.cache.find(r=> r.id === rowAll[i].discord_id);
      if(member != undefined)
      {
        if(member.roles.cache.find(m => m.id === "891397424298475542"))
        {
          if(size < rowAll.length)
          {
            size += 1;
          }
          continue;
        }
        else
        {
          returnMessage += "\n**"+(number)+"**" + "."+ winArray[i][0] + " : " + winArray[i][1]+"%.";
          number++;
        }
      }
      else
      {
        if(size < rowAll.length)
          {
            size += 1;
          }
        continue;
      }
    }
    message.channel.send("__**Top"+(number - 1)+"**__ by win percentage.");
    message.channel.send(returnMessage);
  }
}
exports.help = {
    name:"wins",
    channel:"rangi"
}