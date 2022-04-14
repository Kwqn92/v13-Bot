const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args) => { 
 // <a:tokk:805037853360128060>    <a:unlem:805037824369885214>     <a:yon:805037800428142592>
const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
if(!message.member.permissions.has("ADMINASTRATOR")) {
    const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`)
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
  
  if(args[0] == 'sıfırla'){
      let a = await db.fetch(`abonerole_${message.guild.id}`)
      if(a == false) return message.channel.send(`Abone Rolü Zaten Ayarlı Değil!`).then(x => {
        message.delete()
        setTimeout(() => {
          x.delete()
        }, 5000);
      })
    db.delete(`abonerole_${message.guild.id}`)
    message.chanel.send(`Abone Rolü Başarıyla Sıfırlandı!`).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
  }
  
  
  
  let role = message.mentions.roles.first()
  if(!role) return message.channel.send(`Bir Abone Rolü Belirt! Not: Abone Sisteminin Çalışması İçin Botun Rolünü Abone Rolü & Kullanıcı Rolünün Üstüne Alın`).then(x => {
    message.delete()
    setTimeout(() => {
      x.delete()
    }, 5000);
  })
  
  db.set(`abonerole_${message.guild.id}`,role.id)
  message.channel.send(`Abone Rolü Başarıyla ${role} Olarak Ayarlandı!`).then(x => {
    message.delete()
    setTimeout(() => {
      x.delete()
    }, 5000);
  })

  
  
};
exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: '0'
};

exports.help = {
  name: 'abone-rol',
  description: '',
  usage: '',
  examples: ''
};