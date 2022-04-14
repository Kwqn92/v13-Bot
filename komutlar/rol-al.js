const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    const ayarlar = require('../ayarlar.json')
            let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
if (!message.member.permissions.has('MANAGE_ROLES')) return message.channel.send(' Bu komutu kullanabilmek için "\`Rolleri Yönet\`" yetkisine sahip olmalısın.').then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
var member = message.mentions.members.first();
  
var role = message.mentions.roles.first() 
if (!member) return message.channel.send(' Lütfen bir kullanıcıyı etiketleyin.').then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
if (!role) return message.channel.send(' Lütfen Bir Rol Etiketleyin.').then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  if (!message.author.id !== message.guild.owner && message.member.roles.highest.comparePositionTo(role) < 1) {
    
    
    
  return message.channel.send(` Alınacak rol sizin rolünüzün üstünde bu yüzden rolü **veremiyorum!**`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  }
  try{
await (member.roles.remove(role.id))
 message.channel.send(new Discord.MessageEmbed().setDescription(` ${member} isimli üyenin \`${role.name}\` isimli yetkisi başarıyla alındı!`)  .setFooter('komutu kullanan yetkili ' + message.author.tag, message.author.avatarURL).setColor('#D2EE07')).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
    
  } catch (e) {
    console.log(e);
    message.channel.send(' Hata oluştu! Lütfen Tekar Dene').then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  }
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rolal'],
  permLevel: 0
};

exports.help = {
  name: 'rol-al',
  description: 'Belirttiğiniz kullanıcıdan belirttiğiniz rolü alır.',
  usage: 'rol-al'
};
