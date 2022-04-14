const db = require('quick.db')
const Discord = require('discord.js')
 
exports.run = async (bot, message, args) => {  const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
if(!message.member.permissions.has("ADMINISTRATOR")) {
  const embed = new Discord.MessageEmbed()
  .setDescription(` ${message.author} Komutu kullanmak için yetkin bulunmamakta.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
}
  if (args[0] === 'aç') {
     if(db.fetch(`kengel_${message.guild.id}`) == true) {
      const embed = new Discord.MessageEmbed()
  .setDescription(` ${message.author} Küfür Engel Sistemi Zaten Aktif.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
    }
    
    db.set(`kengel_${message.guild.id}`, 'acik')
  const embed = new Discord.MessageEmbed()
  .setDescription(` ${message.author} Küfür Engel Sistemi Başarıyla Aktif Hale Getirildi!.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
 
  }
  
  if (args[0] === 'kapat') {
    if(db.fetch(`kengel_${message.guild.id}`) == false) {
      const embed = new Discord.MessageEmbed()
  .setDescription(` ${message.author} Küfür Engel Sistemi Zaten Kapalı`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
    }
  db.delete(`kengel_${message.guild.id}`)
const embed = new Discord.MessageEmbed()
  .setDescription(` ${message.author} Küfür Engel Sistemi Başarıyla Kapatıldı`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
    
  }
 
}
//codare
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['k-engel'],
  permLevel: 0,
  kategori: "Ayarlar"
};
 
exports.help = {
  name: 'küfür-engel',
  description: 'Sa As ayarlarsın.',
  usage: 'sa-as'
};