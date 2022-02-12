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
    rowAll.sort((a, b) => b.skillPoints - a.skillPoints);
    if(rowAll.length <= size)
    {
      size = rowAll.length;
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
          returnMessage += "\n**"+(number)+"**" + "."+ rowAll[i].nickname + " : " + rowAll[i].skillPoints+"pkt.";
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
    message.channel.send("__**Top"+(number-1)+"**__ by score.");
    message.channel.send(returnMessage);
  }
}
exports.help = {
    name:"top",
    channel:"rangi"
}