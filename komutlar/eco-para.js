const Discord = require("discord.js");
const data = require("quick.db");
exports.run = async (client, message, args) => {
 
let money = await data.fetch(`ecopara_${message.author.id}`) || "0"

/* ------------------------------------------------------ */

let user;
let muser = message.mentions.users.first()

if(!muser) {
    user = message.author.id;
} else 
 if(muser) {
     user = muser.id
 }
 
const a = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`<@${user}> **adlı kullanıcının parası: ${money} wc**`)
.setTimestamp()
message.channel.send({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [''],
  permLevel: 0
};

exports.help = {
  name: "para"
};