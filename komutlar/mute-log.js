const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})

if(args[0] === "sıfırla") {
const sıfırlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Uyarı Log Kanalı Sıfırla `)
.setColor('BLACK')
.setDescription(`Uyarı Log Kanalı Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds:[sıfırlandı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
db.delete(`uyarılog_${message.guild.id}`)
return;
}

let kanal = message.mentions.channels.first();   
if (!kanal) {
  const ayarlanmadı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)  
.setTitle(`${client.user.username} - Uyarı Log Kanalı Ayarla `)
.setColor('BLACK')
.setDescription(`Uyarı Log Kanalı Belirtiniz !  `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlanmadı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  return;
}
db.set(`uyarılog_${message.guild.id}`, kanal.id)
const ayarlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Uyarı Log Kanalı Ayarlandı `)
.setColor('BLACK')
.setDescription(`Uyarı Log Kanalı ${kanal} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlandı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['uyarılog', 'ulog', 'u-log'],
  permlevel: 0
}
exports.help = {
  name: 'uyarı-log',
  description: 'Kayıt Olunacak Kanalı Ayarlar',
  usage: '!kayıt-kanal #kanal'
}