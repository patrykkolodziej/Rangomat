module.exports = {
    name: 'ready',
    once: true,
    async execute(bot) {
       bot.user.setPresence({
        status: 'online',
        activity: {
            name: "By #3166 wiotq",
            state: 'test',
            details: 'details',
            type: "PLAYING"
        },
    });
        console.log("Ready");
    }
}
