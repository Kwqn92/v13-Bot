const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})

if(args[0] === "sıfırla") {
const sıfırlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Rol Koruma Sıfırla `)
.setColor('BLACK')
.setDescription(`Rol Koruma Kanalı Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [sıfırlandı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
db.delete(`rolk_${message.guild.id}`)
  db.delete(`rolklog_${message.guild.id}`)
return;
}

let kanal = message.mentions.channels.first();   
if (!kanal) {
  const ayarlanmadı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)  
.setTitle(`${client.user.username} - Rol Koruma Ayarla `)
.setColor('BLACK')
.setDescription(`Rol Koruma Kanalı Belirtiniz !  `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlanmadı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  return;
}
db.set(`rolk_${message.guild.id}`, 'acik')
db.set(`rolklog_${message.guild.id}`, kanal.id)
const ayarlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Rol Koruma Ayarlandı `)
.setColor('BLACK')
.setDescription(` Rol Koruma Kanalı ${kanal} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlandı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['rolkoruma', 'rkoruma', 'r-koruma'],
  permlevel: 0
}
exports.help = {
  name: 'rol-koruma',
  description: 'Kayıt Olunacak Kanalı Ayarlar',
  usage: ''
}