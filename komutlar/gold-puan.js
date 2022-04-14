const Discord = require("discord.js"),
  db = require("quick.db")


exports.run = async (bot, message, args) => {
  let kişi = message.mentions.users.first() || message.author;
  let lülü = await db.fetch(`para_${kişi.id}`)
  let para;
  if(!lülü){
    para = "0"
  }else{
    para = await db.fetch(`para_${kişi.id}`)
  }
  message.channel.send(`Kişi; ${kişi}\nPuan; `+para)
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["puanım","kredim","kredi",],
  permLevel: 0,
  kategori: "puan"
};

exports.help = {
  name: "puan",
  description: "puan",
  usage: "puan"
};