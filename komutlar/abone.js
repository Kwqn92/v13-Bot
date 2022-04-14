const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args) => { 
 // <a:tokk:805037853360128060>    <a:unlem:805037824369885214>     <a:yon:805037800428142592>
  const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix

  
  let log = await db.fetch(`abonelog_${message.guild.id}`)
  let rol = await db.fetch(`abonerole_${message.guild.id}`)
  let a = await db.fetch(`aboney_${message.guild.id}`)
  if(!log || !rol ||!a) return message.channel.send(`Lütfen Log Kanalı Abone Rolü ya da Abone Yetkilisi Rollerini Ayarlayın!`).then(x => {
    message.delete()
    setTimeout(() => {
      x.delete()
    }, 5000);
  })
    
  
   if(!message.member.roles.cache.has(a)) return message.channel.send(`Bu Komutu Kullanabilmek İçin <@&${a}> Rolüne İhtiyacın Var!`).then(x => {
    message.delete()
    setTimeout(() => {
      x.delete()
    }, 5000);
  })
   
  
  let user = message.mentions.users.first()
  if(!user) return message.reply(`Bir Kullanıcı etiketle!`).then(x => {
    message.delete()
    setTimeout(() => {
      x.delete()
    }, 5000);
  })
   
  
  user.roles.add(rol)
  message.react('❤');
  
  const as = new Discord.MessageEmbed()
  .setColor('RED')
  .setDescription(`${user} Adlı Kullanıcıya Abone Rolü Verildi!`)
  .setFooter(`Yetkili <@${message.author.id}>`)
  
  client.channels.cache.get(log).send({embeds: [as]}).then(x => {
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
  name: 'abone',
  description: '',
  usage: '',
  examples: ''
};