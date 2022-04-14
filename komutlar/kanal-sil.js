const Discord = require("discord.js");
const data = require("quick.db");
exports.run = async (client, message, args) => {
 
if(!message.guild) {
    const a = new Discord.MessageEmbed()
    .setTitle(`Bu Sadece Sunucularda kullanabilirsin!`)
    .setColor('RED')
    message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
    return;
}
let kanal = args[0]
if(!args[0]) {
    const a = new Discord.MessageEmbed()
    .setTitle(`Lütfen bir kanal adı belirt! ismi aynı olan kanalların tamamı silinecektir!`)
    .setColor('RED')
    message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
    return; 
}

//let kontrol = message.guild.channels.cache.find(channel => {})

let kontrol = message.guild.channels.cache.filter(i => i.name == kanal).forEach(ch => ch.delete())



message.channel.send(`${kanal} adındaki tüm kanallar başarıyla silindi!`)

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kanal-temizle'],
  permLevel: 0
};

exports.help = {
  name: "kanal-sil"
};