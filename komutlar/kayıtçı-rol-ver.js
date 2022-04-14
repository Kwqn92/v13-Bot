const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
   if(!db.fetch(`kayitsistem_${message.guild.id}`)) {
      const embed = new discord.MessageEmbed()
  .setDescription(`<a:unlem:805037824369885214> Kayıt Sistemi Aktif Değil!.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
    } else {
let kayıtçı = db.fetch(`kgörevli_${message.guild.id}`)
let member = message.mentions.members.first();
if (!kayıtçı) return message.channel.send(` Kayıt Görevlisi Rolü Ayarlanmadığı İçin Bu Komudu Kullanamazsınız ! `).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
if (!member) return message.channel.send(` Kayıt Görevlisi Rolü Vereceğiniz Kullanıcıyı Belirtiniz ! `).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})

member.roles.add(kayıtçı)
const ayarlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Kayıt Görevlisi Rolü Verildi `)
.setColor('BLACK')
.setDescription(` ${member} Adlı Kullanıcıya Kayıt Görevlisi Rolü Verildi ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlandı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
 db.set(`kayıtsayı_${member.id}`, 1) 
}}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['kayıtçıver'],
  permlevel: 2
}
exports.help = {
  name: 'kayıt-görevlisi-ver',
  description: 'kayıtçı rolü verir',
  usage: '!kayıtçı-ver @kullanıcı'
}