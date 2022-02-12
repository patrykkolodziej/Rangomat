exports.run = async (bot, message, args) => 
{
  if(message.channel.name === "rangi")
  {
    const rowAll = bot.dbsql.prepare('SELECT * FROM TPP').all();
    rowAll.sort((a, b) => b.swimDistance - a.swimDistance);
    var returnMessage = "Najwięcej kilometrów w sezonie przepłynął " + rowAll[0].nickname +" -> **" +(rowAll[0].swimDistance / 1000).toFixed(2)+"**km!";
    message.channel.send(returnMessage);
  }
}
exports.help = {
    name:"swim",
    channel:"rangi"
}