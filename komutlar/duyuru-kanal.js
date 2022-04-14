const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
   // <a:tokk:805037853360128060>    <a:unlem:805037824369885214>     <a:yon:805037800428142592>
  if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`<a:unlem:805037824369885214> Bu komutu kullanabilmek için "\`Mesajları Yönet\`" yetkisine sahip olmalısın`).then(x => {
    message.delete()
    setTimeout(() => {
      x.delete()
    }, 5000);
  })
const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
if(args[0] === "sıfırla") {
const sıfırlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Duyuru Kanal Sıfırla `)
.setColor('BLACK')
.setDescription(` Duyuru Olunacak Kanal Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [sıfırlandı]}).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})
db.delete(`duyuru_${message.guild.id}`)
return;
}

let kanal = message.mentions.channels.first();   
if (!kanal) {
  const ayarlanmadı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)  
.setTitle(`${client.user.username} - Duyuru Kanal Ayarla `)
.setColor('BLACK')
.setDescription(` Duyuru Olunacak Kanalı Belirtiniz !  `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlanmadı]}).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})
}
db.set(`duyuru_${message.guild.id}`, kanal.id)
const ayarlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Duyuru Kanal Ayarlandı `)
.setColor('BLACK')
.setDescription(` Duyuru Olunacak Kanal ${kanal} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlandı]}).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['duyurukanal', 'dkanal', 'd-kanal'],
  permlevel: 0
}
exports.help = {
  name: 'duyuru-kanal',
  description: 'Kayıt Olunacak Kanalı Ayarlar',
  usage: '!kayıt-kanal #kanal'
}