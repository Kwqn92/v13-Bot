const Discord = require("discord.js");
const data = require("quick.db");
const generator = require('generate-password')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  if (message.author.id !== ayarlar.sahip)
    return message.channel.send(
      new Discord.MessageEmbed().setTitle(
        " **`Bu komutu Yalnızca Sahibim Kullanabilir!!**"
      )
    ).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
    let muser = ''
    let user = message.mentions.users.first()
    if(!user) {
      muser = message.author.id
    } else {
      muser = user.id
    }

    let passwd = generator.generate({
        numbers: false,
        length: 10
    })
data.set(`${passwd}_${client.id}`,passwd)
const asd = await data.fetch(`${passwd}_${client.id}`)
console.log(asd)
   // client.users.cache.get(muser).send(`Selam! İşte Kodun: ${passwd} Kodu kullanmak için: p!kod-kullan [KOD] komutunu kullanmalısın!`)

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kod-olustur'],
  permLevel: 0
};

exports.help = {
  name: "kod-oluştur"
};