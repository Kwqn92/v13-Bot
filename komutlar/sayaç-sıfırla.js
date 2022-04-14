const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args) => { 

  
if(!message.member.permissions.has("ADMINISTRATOR")) {
    const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
}
  
      if(db.fetch(`sayac_${message.guild.id}`) == false) return message.reply(` Sayaç Zaten Kapalı!`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
    
    db.delete(`sayac_${message.guild.id}`)
     db.delete(`sayacknl_${message.guild.id}`)
const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Sayaç Başarıyla Sıfırlandı!`)
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
  name: 'sayaç-sıfırla',
  description: '',
  usage: '',
  examples: ''
};