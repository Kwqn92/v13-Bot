const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  if (!message.member.permission.has("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})

if (args[0] === "sıfırla") {
const sıfırlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Mute Yetkili Rol Sıfırla `)
.setColor('BLACK')
.setDescription(`Sunucu İçin Ayarladığınız Mute Yetkili Rolü Başarıyla Sıfırlandı !`)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [sıfırlandı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
db.delete(`mutey_${message.guild.id}`)
return;
}

let rol = message.mentions.roles.first();   
if (!rol) {
  const ayarlanmadı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Mute Yetkili Rol Ayarla `)
.setColor('BLACK')
.setDescription(`Ayarlayacağınız Mute Yetkili Rolünü Belirtiniz ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlanmadı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  return;
}
db.set(`mutey_${message.guild.id}`, rol.id)
const ayarlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Mute Yetkili Rol Ayarlandı `)
.setColor('BLACK')
.setDescription(`Mute Yetkili Rolü Başarıyla ${rol} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlandı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['mutegörevli', 'mgörevli', 'm-görevli'],
  permlevel: 0
}
exports.help = {
  name: 'mute-görevli',
  description: 'erkek rolünü ayarlar',
  usage: '!erkek-rol @rol'
}