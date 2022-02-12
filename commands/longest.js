exports.run = async (bot, message, args) => 
{
  if(message.channel.name === "rangi")
  {
    const rowAll = bot.dbsql.prepare('SELECT * FROM TPP').all();
    rowAll.sort((a, b) => b.longestKill - a.longestKill);
    for(let i = 0; i < rowAll.length;i++)
    {
      var member = message.guild.members.cache.find(r=> r.id === rowAll[i].discord_id);
      if(member != undefined)
      {
        if(member.roles.cache.find(m => m.id === "891397424298475542"))
        {
          continue;
        }
        else
        {
          var returnMessage = "Najdłuższy kill sezonu należy do " + rowAll[i].nickname +" i wynosi **" +Math.round(rowAll[i].longestKill)+"**m!";
          break;
        }
      }
    }
    message.channel.send(returnMessage);
  }
}
exports.help = {
    name:"longest",
    channel:"rangi"
}