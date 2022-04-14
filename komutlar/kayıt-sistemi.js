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

 if(!args[0]) return message.channel.send(`Eksik Komut! Doğru Kullanım: \`${prefix}kayıt-sistemi aç\` / \`${prefix}kayıt-sistemi kapat\` `).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})
                                             
                                             
  if (args[0] === 'aç') {
     if(db.fetch(`kayitsistem_${message.guild.id}`) == true) {
      const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Kayıt Sistemi Zaten Aktif.`)
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
    
    db.set(`kayitsistem_${message.guild.id}`, 'acik')
  const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Kayıt Sistemi Başarıyla Aktif Hale Getirildi!.`)
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
    if(db.fetch(`kayitsistem_${message.guild.id}`) == false) {
      const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Kayıt Sistemi Zaten De-Aktif.`)
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
    
    
    
    db.delete(`kayitsistem_${message.guild.id}`)
    db.delete(`kgörevli_${message.guild.id}`)
    db.delete(`kayitlog_${message.guild.id}`)
    db.delete(`kayitknl_${message.guild.id}`)
    db.delete(`kayitli_${message.guild.id}`)
    db.delete(`kayitsiz_${message.guild.id}`)
    db.delete(`erkekkayit_${message.guild.id}`)
    db.delete(`bayankayit_${message.guild.id}`)
    db.delete(`kayitsistem_${message.guild.id}`)
    db.delete(`girismsg${message.guild.id}`)
    db.delete(`girismsgknl${message.guild.id}`)
const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Kayıt sistemi Başarıyla De-Aktif Hale Getirildi!.`)
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
  name: 'kayıt-sistemi',
  description: 'Sa As ayarlarsın.',
  usage: 'sa-as'
};