const db = require('quick.db')
const Discord = require('discord.js')
 
 
exports.run = async (bot, message, args) => {  const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin`).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})

 if(!args[0]) return message.channel.send(`Eksik Komut! Doğru Kullanım: \`${prefix}uyarı-sistemi aç\` / \`${prefix}uyarı-sistemi kapat\` `).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})
                                             
                                             
  if (args[0] === 'aç') {
     if(db.fetch(`warnsistem_${message.guild.id}`) == true) {
      const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Uyarı Sistemi Zaten Aktif.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
    }
    
    db.set(`warnsistem_${message.guild.id}`, 'acik')
  const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Uyarı Sistemi Başarıyla Aktif Hale Getirildi!.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
 
  }
  
  if (args[0] === 'kapat') {
    if(db.fetch(`warnsistem_${message.guild.id}`) == false) {
      const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Uyarı Sistemi Zaten De-Aktif.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
    }
    
    
    db.delete(`warnsistem_${message.guild.id}`)
    db.delete(`wutey_${message.guild.id}`)
    db.delete(`uyarılog_${message.guild.id}`)
const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Uyarı sistemi Başarıyla De-Aktif Hale Getirildi!.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
    
  }
 
}
//codare
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "Ayarlar"
};
 
exports.help = {
  name: 'uyarı-sistemi',
  description: 'Sa As ayarlarsın.',
  usage: 'sa-as'
};