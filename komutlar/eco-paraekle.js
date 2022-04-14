const Discord = require("discord.js"),
      db = require(`quick.db`)

exports.run = async (client, message, args) => {
const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (message.author.id !== ayarlar.sahip) {
    return message.channel.send("Bu komutu Sadece Sahibim Kullanabilir.");
  }
  let kişi = message.mentions.users.first()
  let para = args[1]
  if(!kişi) return message.reply(`Lütfen birini etiketle!`)
  if(!para) return message.reply(`Lütfen bir wc gir!`)
let enis = client.users.cache.get(kişi.id)
  message.channel.send(`<@${kişi.id}> adlı şahsa **${para}** wc eklendi! `)
  db.add(`ecopara_${kişi.id}`, +para);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["para-ekle"],
  permLevel: 0
};

exports.help = {
  name: "para-ekle",
};