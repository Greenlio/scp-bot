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
            if else return department
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
            if else return department
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
        message.channel.send('no.')
    }
    if(command === "amogus") {
        message.channel.send('sus.')
    }

    if(command === "scp") {
//credit to nick512 for making this
        if (!isNaN(args[1]) && args[1] < 9999) {
            msg.channel.send("http://www.scpwiki.com/scp-" + args[1])
        } else {
            msg.channel.send("give me an scp number")
        }
//end credit to nick512 for making this
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
        try {
            const code = args.join(" ");
            if (!code) return message.channel.send("Missing Arg-1")
            let evaled = eval(code);
	    

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
            if(clean(evaled).contains(client.token)) return message.channel.send('[SecuroServ] Security threat spotted and cancelled.');
            message.channel.send(clean(evaled), {
                code: "xl"
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
});

client.login('put your token here or sus')
