const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (bot, message, args) => {
 const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Bu Komutu Kullanabilmek İçin **Mesajları Yönet** Yetkisine Sahip Olman Gerek .").then(x => {
    message.delete()
    setTimeout(() => {
      x.delete()
    }, 5000);
  })
  // <a:tokk:805037853360128060>    <a:unlem:805037824369885214>     <a:yon:805037800428142592>
let client = bot;
let kanal = db.fetch(`duyuru_${message.guild.id}`)
let uyuru = args.join(' ').slice(0)
if(!kanal) return message.reply(' Duyuru Kanalı Ayarlanmamış!').then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})

if(!uyuru) return message.channel.send(`Lütfen Duyurunu Yaz!`).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})
  
  const ayarlandı = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Duyuru Sistemi `)
.setColor('BLACK')
.setDescription(uyuru)
.setThumbnail(message.guild.iconURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
client.channels.cache.get(kanal).send({embeds: [ayarlandı]}).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})


}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['duyuruyap','duyuru-yap'],
    permLevel: 0
}

exports.help = {
    name: 'duyuru',
    description: 'Sunucuya giren kullanıcıya seçtiğiniz rolü otomatik verir.',
    usage: 'otorol <@rol>'
}