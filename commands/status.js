var Discord = require('discord.js');
const ms = require('ms');
const fetch = require('node-fetch');


module.exports = {
    name: 'status',
    description: 'Check server status.',
    cooldown: '0',
    async execute(msg, args, client) {
        if (msg.guild.id !== '799137817741099047') return;
        if (msg.member.roles.cache.find(r => r.name == "Status Blacklist")) return;

        var https = require('https');

        https.get('https://docs.greenlio.link', function(res) {
          if (res.statusCode == '200') {
              msg.author.send(`**Docs** are online!\nRequested by: ${msg.author.tag}`)
          } else {
            msg.author.send(`**Docs** are offline.\nRequested by: ${msg.author.tag}`)
          }
        });
        https.get('https://docs.greenlio.link', function(res) {
            if (res.statusCode == '200') {
                msg.author.send(`**Beta and Main Bots** are online!\nRequested by: ${msg.author.tag}`)
            } else {
              msg.author.send(`**Beta and Main Bots** are offline.\nRequested by: ${msg.author.tag}`)
            }
          });
        const util = require('minecraft-server-util');

        util.status('breached.minehut.gg')
            .then((response) => {
                if(response.maxPlayers == 0) {
                    msg.author.send(`**Breached** is offline.\nRequested by: ${msg.author.tag}`)
                } else {
                    msg.author.send(`**Breached** is online!\nRequested by: ${msg.author.tag}`)
                }
            });
        util.status('dangerzone.minehut.gg')
            .then((response) => {
                if(response.maxPlayers == 0) {
                    msg.author.send(`**Dangerzone** is offline.\nRequested by: ${msg.author.tag}`)
                } else {
                    msg.author.send(`**Dangerzone** is online!\nRequested by: ${msg.author.tag}`)
                }
            });
        util.status('cs45.minehut.gg')
        .then((response) => {
            if(response.maxPlayers == 0) {
                msg.author.send(`**CS45** is offline.\nRequested by: ${msg.author.tag}`)
            } else {
                msg.author.send(`**CS45** is online!\nRequested by: ${msg.author.tag}`)
            }
        });
        util.status('iqprison.minehut.gg')
        .then((response) => {
            if(response.maxPlayers == 0) {
                msg.author.send(`**IQPrison** is offline.\nRequested by: ${msg.author.tag}`)
            } else {
                msg.author.send(`**IQPrison** is online!\nRequested by: ${msg.author.tag}`)
            }
        });
        msg.channel.send('Status Scan complete! Check DMs.')

        console.log('status go brr', code)
    }
}
