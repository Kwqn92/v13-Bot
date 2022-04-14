const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args) => { 
const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
if(!message.member.permissions.has("MANAGE_CHANELS")) {
    const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
}
  if(args[0] == 'sıfırla') {
    let t = await db.fetch(`sesknl_${message.guild.id}`)
    if(t == false) {
          const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Ses Kanalı Zaten Ayarlanmamış!`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
    } else {
      db.delete(`sesknl_${message.guild.id}`)
          const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Ses Kanalı Başarıyla Sıfırlandı!.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
    }
  }
  let id = args[0]
  if(!id)  {
        const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Lütfen Bir Ses Kanalı ID'si Gir`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  }

  db.set(`sesknl_${message.guild.id}`,id) 
  const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Son Üye ${id} ID'sine Sahip Ses Kanalında Gösterilecek!`)
.setColor('0x800d0d')
.setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
.setTimestamp()
  message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
};
exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: '0'
};

exports.help = {
  name: 'son-üye-ses',
  description: '',
  usage: '',
  examples: ''
};