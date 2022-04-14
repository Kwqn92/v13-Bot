const Discord = require("discord.js");
const data = require("quick.db");
exports.run = async (client, message, args) => {
 
let money = await data.fetch(`ecopara_${message.author.id}`)

/* ------------------------------------------------------ */

let muser = message.mentions.users.first() 
let miktar = args[1]
if(!muser) return message.channel.send("wc göndereceğin kullanıcıyı etiketlemelisin!").then(x => {setTimeout(() => {x.delete()}, 5000);})
if(!miktar) return message.channel.send("kaç wc göndereceğini belirtmelisin!").then(x => {setTimeout(() => {x.delete()}, 5000);})
if(money < miktar) return message.channel.send(`**${miktar}** kadar wc paran yok!`).then(x => {setTimeout(() => {x.delete()}, 5000);})
if(muser.id == message.author.id) return message.channel.send(`${muser} kişiye **${miktar}** wc gönderildi!.. ama neden kendine wc yollarsın ki?`).then(x => {setTimeout(() => {x.delete()}, 5000);})

await data.add(`ecopara_${muser.id}`, miktar)
await data.add(`ecopara_${message.author.id}`, -miktar)
return message.channel.send(`${muser} kişiye **${miktar}** wc gönderildi!`).then(x => {setTimeout(() => {x.delete()}, 5000);})
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [''],
  permLevel: 0
};

exports.help = {
  name: "gönder"
};