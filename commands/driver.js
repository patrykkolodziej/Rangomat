exports.run = async (bot, message, args) => 
{
  if(message.channel.name === "rangi")
  {
    const rowAll = bot.dbsql.prepare('SELECT * FROM TPP').all();
    rowAll.sort((a, b) => b.rideDistance - a.rideDistance);
    var returnMessage = "Najwięcej kilometrów w sezonie przejechał " + rowAll[0].nickname +" -> **" +(rowAll[0].rideDistance / 1000).toFixed(2)+"**km!";
    message.channel.send(returnMessage);
  }
}
exports.help = {
    name:"driver",
    channel:"rangi"
}