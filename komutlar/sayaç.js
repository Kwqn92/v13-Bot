const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args) => { 
const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
if(!message.member.permissions.has("ADMINISTRATOR")) {
    const embed = new Discord.MessageEmbed()
  .setDescription(` ${message.author} Komutu kullanmak için yetkin bulunmamakta.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
}
  
  let sayac = await db.fetch(`sayac_${message.guild.id}`)
  let kanalk = await db.fetch(`sayacknl_${message.guild.id}`)
  
  if(sayac == true) return message.reply(` Sayaç Zaten Ayarlı!(${kanal} | ${hedef})`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  
  let hedef = args[0]
  let kanal = message.mentions.channels.first()
  
  if(!hedef || !kanal) return message.channel.send(` Lütfen Bir Üye Hedefi Ve Kanal Belirle! Doğru Kullanım: ${prefix}sayaç-ayarla 25 #sayaç`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  
  db.set(`sayac_${message.guild.id}`,hedef)
  db.set(`sayacknl_${message.guild.id}`,kanal.id)
  
  message.channel.send(`sayaç Başarıyla Ayarlandı! Sıfırlamak İçin: ${prefix}sayaç-sıfırla`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
};
exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: '0'
};

exports.help = {
  name: 'sayaç-ayarla',
  description: '',
  usage: '',
  examples: ''
};