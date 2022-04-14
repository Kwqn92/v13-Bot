const Discord = require("discord.js");
const data = require("quick.db");
exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(
      new Discord.MessageEmbed().setTitle(
        " **`Mesajları Yönet` Yetkisine Sahip Değilsin!**"
      )
    ).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  if (!args[0]){
 const embed = new Discord.MessageEmbed()
 .setTitle("Lütfen Silinecek miktar giriniz.")
   message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})}
  if (args[0] > 100) {
  const b =  new Discord.MessageEmbed().setTitle(
      " Mesaj silme limiti `100` üzeri mesajı aynı anda silemem."
    )
     message.channel.send(
{embeds:[b] }
    ).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})}
  message.channel.bulkDelete(args[0]);
  const c =      new Discord.MessageEmbed()
  .setTitle("" + `${args[0]}` + " adet mesaj Başarıyla silindi."
  )
 message.channel
    .send(
 {embeds: [c]}
    )
    .then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['temizle'],
  permLevel: 0
};

exports.help = {
  name: "sil"
};