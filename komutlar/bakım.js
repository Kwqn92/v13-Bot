const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {
  const ayarlar = require('../ayarlar.json')
if(message.author.id !== ayarlar.sahip) return; 
function gönderkardesim(content) {
const infoEmbed = new Discord.MessageEmbed()
.setColor('BLUE')
.setDescription(content)
.setTimestamp()
.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }));
return message.channel.send({embeds: [infoEmbed]})
};

const durum = await database.fetch(client.user.id);
if(durum == true) {
  let log = "963882470883864596"
  const zamanaga = database.fetch(client.user.id+':)');
  const mesajisteamk = database.fetch(`a${client.user.id}`) || "Bilinmiyor"
  client.channels.cache.get(log).send(`${Date.now() - zamanaga.time} **zamanında** \`${mesajisteamk}\` **sebebiyle olan bakım bitirildi!**`)  
await database.delete(client.user.id);
return gönderkardesim(' Bakım artık sona erdi.')

} else {
let a = args.join(' ')
if(!a) return;
await database.set(client.user.id, true,);
await database.set(`a${client.user.id}`,a);
database.set(client.user.id+':)', { 
author: message.author,
time: Date.now() 
});
const mesajisteamk = database.fetch(`a${client.user.id}`) || "Bilinmiyor"
let log = "963882470883864596"
client.channels.cache.get(log).send(`${Date.now()} **zamanında** \`${mesajisteamk}\` **sebebiyle bakıma alındı**`)
return gönderkardesim(`${a}, Bakım modu açıldı.\nArtık hiç bir kimse komutları kullanamayacak.`)
};


}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bakım'],
  permLevel: 0
};
 
exports.help = {
  name: 'bakım'
};