// dependencies
const ms = require("ms");
const Enmap = require('enmap');
const https = require('https');
// discord
const Discord = require('discord.js');
const client = new Discord.client()
// enmap
client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep',
  autoEnsure: {
    Prefix: ".",
  }
});
// code. do not change unless you know what you're doing.
client.on("message", async (message) => {
// preventing death
  if(!message.guild || message.author.bot) return;
// enmap
  const guildConf = client.settings.get(message.guild.id);
/// basic command things
  if(message.content.indexOf(guildConf.prefix) !== 0) return;
  const args = message.content.split(/\s+/g);
  const command = args.shift().slice(guildConf.prefix.length).toLowerCase();
// commands
  if(command === "setings") {
    const adminRole = message.guild.roles.cache.find(role => role.name === 'Administrator');
    if(!adminRole) return message.reply('You do not have any administrator role! To create one, make a role named \'Administrator\'!');
    if(!message.member.roles.cache.has(adminRole.id)) {
      return message.reply("You do not have a role named \'Administrator\'!");
    }
    const [prop, ...value] = args;
    if(!client.settings.has(message.guild.id, prop)) {
      return message.reply("This is not a setting.\n Example: **.setconf Prefix** (prefix)");
    }   
    client.settings.set(message.guild.id, value.join(" "), prop);
    message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
   }
    if(command === "showconf") {
        let configProps = Object.keys(guildConf).map(prop => {
          return `**${prop}**: ${guildConf[prop]}`;
        });
        message.channel.send(`Server Configuration:
${configProps.join("\n")}`);
    }
    if(command === 'accept') {
        if (!message.member.roles.cache.find(r => r.name == "Recruitment")) return;
        let ign = args[0];
        var Embed0 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Usage: .accept (IGN) (Discord) (Rank) (Further Information)`)
            .setFooter("Made by Greenlio with inspiration from Joshplays05.")
        if (!ign) return message.reply(Embed0);

        var user = message.mentions.users.first();

        try {
            if (!user) user = await client.users.fetch(args[1], false);
        } catch (err) {

        };
        var Embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Usage: .accept (IGN) (Discord) (Rank) (Further Information)`)
            .setFooter("Invalid Discord Account!")
        if (!user) return message.reply(Embed1);
        var member;
        try {
            member = await message.guild.members.fetch(user);
        } catch (err) {
            member = null;
        }
        var Embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Usage: .accept (IGN) (Discord) (Rank) (Further Information)`)
            .setFooter("Invalid Discord Account!")
        if (!member) return message.reply(Embed1);

        let rank = args[2];
        var Embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Usage: .accept (IGN) (Discord) (Rank) (Further Information)`)
            .setFooter("Invalid Rank!")
        if (!rank) return message.channel.send(Embed1)

        let reason = args.splice(3).join(' ');
        if (!reason) {
            reason = "No information provided, congratulations!"
        }
        function parsedpt(department) {
            if (department == 'MF') return 'Military Force (MF)'
            if (department == 'PD') return 'Protection Department (PD)'
            if (department == 'Helper') return 'Helper'
            if (department == 'MTF') return 'Mobile Task Force (MTF)'
            if (department == 'SD') return 'Security Department (SD)'
            if (department == 'ScD') return 'Scientific Department (ScD)'
            if (department == 'Sct') return 'Scientist (Sct)'
            if (department == 'SP') return 'Security Personnel (SP)'
        }
        let workrank = parsedpt(rank)
        const usethis = new Discord.MessageEmbed()
        .setColor("#00ff15")
        .setTitle('Applications')
        .addField(`Results:`, `**Accepted!**`)
        .addField('**IGN**', ign, true)
        .addField('**Discord**', user, true)
        .addField('**Rank**', workrank, true)
        .addField('**Additional Information**', reason, true)
        .addField(`**IMPORTANT**`, `Please make sure to follow the rules given by department leadership.`)
        message.channel.send(usethis)
    }
    if(command === 'deny') {
        if (!message.member.roles.cache.find(r => r.name == "Recruitment")) return;
        let ign = args[0];
        var Embed0 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Usage: .deny (IGN) (Discord) (Rank) (Further Information)`)
            .setFooter("Made by Greenlio with inspiration from Joshplays05.")
        if (!ign) return message.reply(Embed0);

        var user = message.mentions.users.first();

        try {
            if (!user) user = await client.users.fetch(args[1], false);
        } catch (err) {

        };
        var Embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Usage: .deny (IGN) (Discord) (Rank) (Further Information)`)
            .setFooter("Invalid Discord Account!")
        if (!user) return message.reply(Embed1);
        var member;
        try {
            member = await message.guild.members.fetch(user);
        } catch (err) {
            member = null;
        }
        var Embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Usage: .deny (IGN) (Discord) (Rank) (Further Information)`)
            .setFooter("Invalid Discord Account!")
        if (!member) return message.reply(Embed1);

        let rank = args[2];
        var Embed1 = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Usage: .deny (IGN) (Discord) (Rank) (Further Information)`)
            .setFooter("Invalid Rank!")
        if (!rank) return message.channel.send(Embed1)

        const guildConf = client.settings.get(message.guild.id);
        if (guildConf.ServerPreset == 'Breached') {
            if(rank !== 'MTF') {
                if(rank !== 'SD') {
                    if(rank !== 'ScD') {
                        message.reply('You provided and invalid rank!\nFor this preset (Breached), the valid ranks are: ``ScD, SD, MTF``')
                        return;
                    }
                }
            }
        }
        if (guildConf.ServerPreset == 'Dangerzone') {
            if(rank !== 'MTF') {
                if(rank !== 'SD') {
                    if(rank !== 'ScD') {
                        message.reply('You provided and invalid rank!\nFor this preset (Dangerzone), the valid ranks are: ``ScD, SD, MTF``')
                        return;
                    }
                }
            }
        }
        if (guildConf.ServerPreset == 'CS45') {
            if(rank !== 'SP') {
                if(rank !== 'Sct') {
                    if(rank !== 'MTF') {
                        message.reply('You provided and invalid rank!\nFor this preset (CS45), the valid ranks are: ``Sct, SP, MTF``')
                        return;
                    }
                }
            }
        }
        if (guildConf.ServerPreset == 'IQPrison') {
            if(rank !== 'MF') {
                if(rank !== 'PD') {
                    if(rank !== 'Helper') {
                        message.reply('You provided and invalid rank!\nFor this preset (Prison), the valid ranks are: ``MF PD, Helper``')
                        return;
                    }
                }
            }
        }


        let reason = args.splice(3).join(' ');
        if (!reason) {
            reason = "No information provided, apply again sometime!"
        }
        function parsedpt(department) {
            if (department == 'MF') return 'Military Force (MF)'
            if (department == 'PD') return 'Protection Department (PD)'
            if (department == 'Helper') return 'Helper'
            if (department == 'MTF') return 'Mobile Task Force (MTF)'
            if (department == 'SD') return 'Security Department (SD)'
            if (department == 'ScD') return 'Scientific Department (ScD)'
            if (department == 'Sct') return 'Scientist (Sct)'
            if (department == 'SP') return 'Security Personnel (SP)'
        }
        let workrank = parsedpt(rank)
        const usethis = new Discord.MessageEmbed()
        .setColor("#FF6347")
        .setTitle('Applications')
        .addField(`Results:`, `**Denied.**`)
        .addField('**IGN**', ign, true)
        .addField('**Discord**', user, true)
        .addField('**Rank**', workrank, true)
        .addField('**Additional Information**', reason, true)
        .addField(`**IMPORTANT**`, `You have been denied. Apply again sometime!`)
        message.channel.send(usethis)
    }
    if(command === "invite") {
        message.author.send('Use this link to invite the bot.\nhttps://discord.com/api/oauth2/authorize?client_id=728281666250080266&permissions=117824&scope=bot')
        message.channel.send('Sent! Check DMs.')
    }
    if(command === "scp") {
        message.author.send(`Use this link to check out SCP-${args[0]}!\nhttp://www.scpwiki.com/scp-${args[0]}`)
        message.channel.send('Sent! Check DMs.')
    }
});


client.on('ready', () => {
    console.log(`SCP Public Bot online!`)
    setInterval(() => {
        const index = list[Math.floor(Math.random() * list.length)];
        if (index == `on CS45`) {
            client.user.setActivity(index, {
                type: "PLAYING",
            })
        } else if (index == `on Dangerzone`) {
            client.user.setActivity(index, {
                type: "PLAYING",
            })
        } else if (index == `on Breached`) {
            client.user.setActivity(index, {
                type: "PLAYING",
            })
        }
    }, 60000);
});


//-------------------------=-=Command Handler=-=-------------------------
var fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});


//-------------------------=-=Eval Command=-=-------------------------

const prefix = '.';
const clean = text => {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

client.on("message", message => {
    const args = message.content.split(" ").slice(1);
    var prefix = '.';
    if (message.content.startsWith(prefix + "eval")) {
        if (message.author.id !== '239827986709217281') return;
	if (args.join(" ") == "client.token") return message.channel.send('[SecuroServ] Security threat spotted and cancelled.')
        try {
            const code = args.join(" ");
            if (!code) return message.channel.send("Missing Arg-1")
            let evaled = eval(code);
	    

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), {
                code: "xl"
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
});

const asdfiadfsdufghsdfughssdfgfdsfgsdfg = 'my token, not yours!'
