exports.run = async (bot, message, args) => 
{
  if(message.channel.name === "rangi")
  {
    var returnMessage = 'Witaj, wprowadziłeś nieznaną komendę.';
    returnMessage += "\nDostępne komendy to:```!ranga \n!top \n!adr \n!kda \n!staty \n!longest```"; 
    bot.users.fetch(message.author.id, false).then((user) => {
  user.send(returnMessage);
  });
  message.channel.lastMessage.delete();
  }
}
exports.help = {
    name:"help",
    channel:"rangi"
}