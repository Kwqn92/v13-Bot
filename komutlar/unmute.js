const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db');


module.exports.run = async (bot, message, args) => {
 
const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  let görevli = db.fetch(`mutey_${message.guild.id}`)

  let log = db.fetch(`mutelog_${message.guild.id}`) || message.channel.id

    
  if(!görevli) return message.reply(` Lütfen Öncelikle Görevli Rolü ve Log Kanalını Ayarlayın`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  if (!message.member.permissions.has("KICK_MEMBERS"))
    return message.reply(`Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  let mutekisi = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  
  if(!message.member.roles.cache.has(görevli)) return message.reply(` Bu Komutu Kullanmak İçin <@&${görevli}> Rolüne İhtiyacın Var!`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
    let mutelimi = db.fetch(`muteli_${mutekisi.id + message.guild.id}`)
  if(!mutelimi) return message.reply(`Bu Kullanıcı Zaten Muteli Değil!`)
  if (!mutekisi)
    return message.reply(
      ` Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; **${prefix}unmute @kullanıcı**`
    ).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  var muterole1 =db.fetch(`muteroluid_${message.guild.id}`);
var muterole2 = message.guild.roles.cache.find(r => r.id === muterole1);
  
  await mutekisi.roles.remove(muterole2.id);
  db.delete(`muteli_${mutekisi.id + message.guild.id}`)
db.delete(`süre_${message.mentions.users.first().id + message.guild.id}`)
  bot.channels.cache.get(log).send(
    new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL())
    .setColor(0x00ae86)
    .setAuthor("UnMute")
    .setTimestamp()
    .addField("**Kullanıcı:**", `<@${mutekisi.id}>`)
    .addField("**Yetkili:**", message.author.username)
    .setFooter(bot.user.username, bot.user.avatarURL())
  ).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})

 
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "unmute",
  description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar.",
  usage: "mute <@kullanıcı> <1sn/1dk/1sa/1g>"
};
