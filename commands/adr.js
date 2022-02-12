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
    var damageArray = [];
    for(let i = 0; i<rowAll.length;i++)
    {
      var avargeDamage = rowAll[i].damageDealt / rowAll[i].roundsPlayed;
      damageArray.push([rowAll[i].nickname,Math.round(avargeDamage)]);
    }
    damageArray.sort((a, b) => b[1] - a[1]);
    if(damageArray.length <= size)
    {
      size = damageArray.length;
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
          returnMessage += "\n**"+(number)+"**" + "."+ damageArray[i][0] + " : " + damageArray[i][1]+"dmg.";
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
    message.channel.send("__**Top"+(number - 1)+"**__ by ADR.");
    message.channel.send(returnMessage);
  }
}
exports.help = {
    name:"adr",
    channel:"rangi"
}