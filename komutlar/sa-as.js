const db = require('quick.db')
const Discord = require('discord.js')
 

exports.run = async (bot, message, args) => {
    const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (!args[0]) return message.channel.send(`Aktifleştirmeli yada kapatmalısın!! Örnek: **${prefix}selam-sistemi Aktif**`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(' Bu komutu kullanmak için \`MESAJLARI_YÖNET\` yetkisine sahip olmalısın!').then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
 
  if (args[0] === 'aktif') {
    
    db.set(`saas_${message.guild.id}`, 'acik')
    message.channel.send(`Artık Birisi Selam Verince Bot Cevap Verecek. Kapatmak için "\`${prefix}selam-sistemi\`".`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
 
  }
  
  if (args[0] === 'kapat') {
    
    db.set(`saas_${message.guild.id}`, 'kapali')
    message.channel.send(`Artık Biri Selam Verince Cevap Vermicek.`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})

  }
 
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sa-as'],
  permLevel: 0,
  kategori: "Ayarlar"
};
 
exports.help = {
  name: 'selam-sistemi',
  description: 'Sa As ayarlarsın.',
  usage: 'sa-as'
};