const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`);

if (args[0] === "sıfırla") {
const sıfırlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - uyarı Yetkilisi Rol Sıfırla `)
.setColor('BLACK')
.setDescription(`Sunucu İçin Ayarladığınız uyarı Yetkilisi Rolü Başarıyla Sıfırlandı !`)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [sıfırlandı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
db.delete(`wutey_${message.guild.id}`)
return;
}

let rol = message.mentions.roles.first();   
if (!rol) {
  const ayarlanmadı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - uyarı Yetkilisi Rol Ayarla `)
.setColor('BLACK')
.setDescription(`Ayarlayacağınız uyarı Yetkilisi Rolünü Belirtiniz ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlanmadı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  return;
}
db.set(`wutey_${message.guild.id}`, rol.id)
const ayarlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - uyarı Yetkilisi Rol Ayarlandı `)
.setColor('BLACK')
.setDescription(`uyarı Yetkilisi Rolü Başarıyla ${rol} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlandı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['uyarıgörevli', 'ugörevli', 'u-görevli'],
  permlevel: 0
}
exports.help = {
  name: 'uyarı-görevli',
  description: 'erkek rolünü ayarlar',
  usage: '!erkek-rol @rol'
}