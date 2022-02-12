const { prefix, token, api } = require("./config.json");
var Database = require('better-sqlite3');
var db = new Database('./database/db.db', { verbose: console.log });
const { Client, Intents, Collection } = require('discord.js-12');
const DiscordBot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS] });
DiscordBot.Database = Database;
DiscordBot.dbsql = db;
DiscordBot.shuffle = require('./utils/shuffle.js').shuffle;
DiscordBot.pubgAPI = require('./utils/pubg_api.js');
DiscordBot.ranks = require('./utils/ranks.js');
DiscordBot.config = require("./config.json");

const fs = require("fs");

DiscordBot.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
    const props = require(`./commands/${file}`)
    console.log(`${file} loaded`)
    DiscordBot.commands.set(props.help.name, props)
}

const eventFiles = fs.readdirSync('./events/').filter(f => f.endsWith('.js'))

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if(event.once) {
        DiscordBot.once(event.name, (...args) => event.execute(...args, DiscordBot))
    } else {
        DiscordBot.on(event.name, (...args) => event.execute(...args, DiscordBot))
    }
}


DiscordBot.on("message", async Message => {
    
    if(Message.author.DiscordBot) return;
    if(Message.channel.type === "dm") return;

    let MessageArray = Message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);


    if(!cmd.startsWith(prefix)) return;

  
    let commandfile = DiscordBot.commands.get(cmd.slice(prefix.length));
    if(commandfile) 
    {
      commandfile.run(DiscordBot,Message,args);
    }
    else
    {
      Message.content = "!help";
      MessageArray = Message.content.split(" ");
      cmd = MessageArray[0];
      args = MessageArray.slice(1);
      commandfile = DiscordBot.commands.get(cmd.slice(prefix.length));
      if(commandfile) 
      {
        commandfile.run(DiscordBot,Message,args);
      }
    }

});
DiscordBot.login(token);


