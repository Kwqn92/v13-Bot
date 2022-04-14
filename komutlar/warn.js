const Discord = require('discord.js');
const data = require('quick.db')
const config = require('../config.json')
exports.run = async(client, message, args) => {
let x = config.x;
let wsis = data.fetch(`warnsistem_${message.guild.id}`)
if(!wsis) {
    const a = new Discord.MessageEmbed()
    .setColor('DARK_BUT_NOT_BLACK')
    .setTitle(`${x} Uyarı sistemi aktif değil!`)
    message.reply({embeds: [a]})
  return;
}



let log = data.fetch(`uyarılog_${message.guild.id}`)
let yetkili = data.fetch(`wutey_${message.guild.id}`)
if(!log && !yetkili) {
    const a = new Discord.MessageEmbed()
    .setColor('DARK_BUT_NOT_BLACK')
    .setTitle(`${x} Uyarı sistemi log kanalı ya da yetkili rolü ayarlanmamış!`)
    message.reply({embeds: [a]})
  return;
}


    let user = message.mentions.users.first();
  let reason = args.join(' ');
    if(!reason) {reason = "Belirtilmemiş"}
  if (!user) return message.channel.send('Birisini Etiketlemen Gerek!')

await data.push(`userwarns_${user.id}`,reason)
await data.push(`userwarnsmod_${message.guild.id}`, message.author.id)
await data.add(`userwar_${user.id}`,1)

const b = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle(`${client.user.username} Warn sistemi`)
.addField(`Uyarılan kişi`, `<@${user.id}>(${user.id})`)
.addField(`Yetkili`, message.author.tag)
.addField(`sebep:`, reason)
.setTimestamp()
client.channels.cache.get(log).send({embeds: [b]})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'uyar',
  description: 'İstediğiniz kişiyi uyarır.',
  usage: 'uyar [kullanıcı] [sebep]'
};