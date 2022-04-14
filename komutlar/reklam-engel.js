const db = require('quick.db')
const Discord = require('discord.js')
 

exports.run = async (bot, message, args) => {
 const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix 
if(!message.member.permisions.has("ADMINISTRATOR")) {
  const embed = new Discord.MessageEmbed()
  .setDescription(` ${message.author} Komutu kullanmak için yetkin bulunmamakta.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
}
  if (args[0] === 'aç') {
     if(db.fetch(`lengel_${message.guild.id}`) == true) {
      const embed = new Discord.MessageEmbed()
  .setDescription(` ${message.author} Link Engelleme Zaten Aktif.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
    }
    
    db.set(`lengel_${message.guild.id}`, 'acik')
  const embed = new Discord.MessageEmbed()
  .setDescription(` ${message.author} Link Engelleme Başarıyla Aktif Hale Getirildi!.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
 
  }
  
  if (args[0] === 'kapat') {
    if(db.fetch(`lengel_${message.guild.id}`) == false) {
      const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Link Engelleme Zaten Kapalı`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
    }
  db.delete(`lengel_${message.guild.id}`)
const embed = new Discord.MessageEmbed()
  .setDescription(` ${message.author} Link Engelleme Başarıyla Kapatıldı`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
    
  }
 
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['l-engel'],
  permLevel: 0,
};
 
exports.help = {
  name: 'link-engel',
  description: 'Sa As ayarlarsın.',
  usage: 'sa-as'
};