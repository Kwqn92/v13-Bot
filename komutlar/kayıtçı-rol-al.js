const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => { const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if(!db.fetch(`kayitsistem_${message.guild.id}`)) {
      const embed = new discord.MessageEmbed()
  .setDescription(` Kayıt Sistemi Aktif Değil!.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)});
    } else {
let kayıtçı = db.fetch(`kgörevli_${message.guild.id}`)
let member = message.mentions.members.first();
if (!member) return message.channel.send(` Kayıt Görevlisi Rolü Vereceğiniz Kullanıcıyı Belirtiniz ! `).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})

member.roles.remove(kayıtçı)

const ayarlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Kayıt Görevlisi Rolü Alındı `)
.setColor('BLACK')
.setDescription(`<a:tokk:805037853360128060> ${member} Adlı Kullanıcıdan Kayıt Görevlisi Rolü Alındı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [ayarlandı]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
 db.delete(`kayıtsayı_${member.id}`) 
}}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['kayıtçıal'],
  permlevel: 2
}
exports.help = {
  name: 'kayıt-görevlisi-al',
  description: 'kayıtçı rolü verir',
  usage: '!kayıtçı-ver @kullanıcı'
}