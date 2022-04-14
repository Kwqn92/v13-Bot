const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async (client, message, args) => {
     if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("Bu Komutu Kullanabilmek İçin **Ban** Yetkisine Sahip Olman Gerek .").then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
 
const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first() || client.users.cache.get(args[0])
  if (!user) return message.reply(' Kimi banlayacağını yazmalısın.').then(x => {
    message.delete()
    setTimeout(() => {
      x.delete()
    }, 5000);
  })
  if (reason.length < 1) return message.reply(' Ban sebebini yazmalısın.').then(x => {
    message.delete()
    setTimeout(() => {
      x.delete()
    }, 5000);
  })
  if(user == message.author) return message.reply(' Kendini Banlayamazsın.').then(x => {
    message.delete()
    setTimeout(() => {
      x.delete()
    }, 5000);
  })
  guild.members.ban(user, { reason: reason });
  message.channel.send(" Kullanıcı başarıyla banlandı.").then(x => {
    message.delete()
    setTimeout(() => {
      x.delete()
    }, 5000);
  })

  const embed = new Discord.MessageEmbed()
    .setColor(0x000000)
    .setTimestamp()
    .addField('Eylem:', 'Ban')
    .addField('Kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Sebep', reason);
message.channel.send({embeds: [embed]}).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3,
  kategori: "mod"
};
exports.help = { 
	name: 'ban', 
	description: 'Belirttiğiniz kişiyi sunucudan banlarsınız.', 
	usage: 'ban' 
}