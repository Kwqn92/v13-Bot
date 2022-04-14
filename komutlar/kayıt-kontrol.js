const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args) => {   const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
   if(!db.fetch(`kayitsistem_${message.guild.id}`)) {
      const embed = new Discord.MessageEmbed()
  .setDescription(` Kayıt Sistemi Aktif Değil!.`)
  .setColor('RANDOM')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
    } else {
  
      
      let isim = message.mentions.users.first() || message.author.tag || args[0]
      if(!isim) {
          const kayıt = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username}`)
.setColor('BLACK')
.setDescription(`Lütfen Bir Kullanıcı/id Belirtin`)
          .setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [kayıt]}).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})
      }
      let kontrol = await db.fetch(`kayıtsayı_${isim}`)|| "0"
           const kayıt = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username}`)
.setColor('BLACK')
.setDescription(`Bu Kullanıcının(${isim}) Kayıt Sayısı: ${kontrol}`)
          .setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [kayıt]}).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})
  
  
  
  
}};
exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: '0'
};

exports.help = {
  name: 'kayıt-sayı',
  description: '',
  usage: '',
};