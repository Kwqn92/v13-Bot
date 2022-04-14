const db = require("quick.db");
const Discord = require("discord.js");

exports.run = (client, message, args) => {
  const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
 if (message.author.id !== ayarlar.sahip) {
    return message.channel.send("Bu komutu Sadece Sahibim Kullanabilir.");
  }

  let şahıs = message.mentions.users.first()

  if (!şahıs) return message.channel.send("Gold verilecek Kişiyi etiketle.");
  let enis = client.users.cache.get(şahıs.id)
  message.channel.send(`\`${şahıs.tag}\` artık **Gold** Üye`);
  client.channels.cache.get("963882329913323530").send(`${şahıs} Adlı Kullanıcı Artık Gold Üye!`)
db.push(`goldlar`, şahıs.tag)
  db.set(`gold_${şahıs.id}`, "acik");
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "yapımcı"
};
exports.help = {
  name: "goldyap",
  description: "Napcan?",
  usage: "goldyap"
};