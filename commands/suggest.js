var Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'suggest',
    description: 'Suggest a feature.',
    cooldown: '5',
    async execute(msg, args, client) {
        if (msg.member.roles.cache.find(r => r.name == "Suggestions Blacklist")) return;
        let ign = args[0];
        var Embed0 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Usage: .suggest (Suggestion)`)
            .setFooter("Made by Greenlio.")
        if (!ign) return msg.reply(Embed0);
  
        const usethis = new Discord.MessageEmbed()
        .setColor('#808080')
        .setTitle('Suggestions')
        .addField(`Author:`, msg.author.tag)
        .addField('**Suggestion:**', `${args.splice(0).join(' ')}`, true)
        .addField(`**IMPORTANT**`, `Suggestions are not guaranteed to be implemented!`)
        msg.channel.send(usethis).then(function (message) {
            message.react("👍")
            message.react("👎")
          }).catch(function() {
            console.log('error in suggest cmd, pls fix')
           });
    }
}
