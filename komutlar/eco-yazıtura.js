const Discord = require("discord.js");
const data = require("quick.db");
exports.run = async (client, message, args) => {
 
let money = await data.fetch(`ecopara_${message.author.id}`)
let slots = ["y","t"]
let miktar = args[0]
if(!miktar) return message.channel.send("kaç wc oynayacağını belirtmelisin!").then(x => {setTimeout(() => {x.delete()}, 5000);})
let select = args[1]
if(!select) {select = "y"}
if(money < miktar) return message.channel.send(`**${miktar}** kadar wc paran yok!`).then(x => {setTimeout(() => {x.delete()}, 5000);})

var slot1 = slots[Math.floor(Math.random() * slots.length)];
console.log(slot1)
console.log(select)
/* ------------------------------------------------------ */
let mik = miktar * 2


if(select ==  slot1) {
    
    const a = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`
    ${slot1}
    **Kazandın!** **+${mik} wc**
    `)
    message.channel.send({embeds: [a]})
    await data.add(`ecopara_${message.author.id}`,mik)
    
} else {
    const a = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`
    ${slot1}

    **Kaybettin!** **-${miktar} wc**
    `)
    message.channel.send({embeds: [a]})
    await data.add(`ecopara_${message.author.id}`, -miktar)
}


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yt'],
  permLevel: 0
};

exports.help = {
  name: "yazıtura"
};