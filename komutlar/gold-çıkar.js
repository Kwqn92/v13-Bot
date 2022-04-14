const db = require(`quick.db`)

exports.run = async(client, message, args) => {
  const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
   if (message.author.id !== ayarlar.sahip) {
    return message.channel.send("Bu komutu Sadece Sahibim Kullanabilir.");
  }
let kisi = message.mentions.users.first()
if(!kisi){
message.reply(`Lütfen birini Etiketle.`)
return
}
db.delete(`gold_${kisi.id}`)
    let enis = client.users.cache.get(kisi.id)
    client.channels.cache.get('806477821836263454').send(`${kisi} Adlı Kullanıcı Artık Gold Değil!`)
message.channel.send(`Başarıyla **${kisi}** adlı kişinin **Gold** üyesi alındı!`)
return
}
exports.conf = {
enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "puan"
}
exports.help = {
name: "gold-çıkar",
  description: "sa",
  usage: "as"
}