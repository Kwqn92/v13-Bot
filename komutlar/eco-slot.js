const Discord = require("discord.js");
const data = require("quick.db");
exports.run = async (client, message, args) => {
 
let money = await data.fetch(`ecopara_${message.author.id}`)
let slots = [
    "π°", "π°", "π°", "π°", "π°", "π°", "π°", "π°", "π°", "π°", "π°", "π°","π°","π°",
    "π", "π", "π", "π","π","π","π","π","π","π",
    "β","β","β","β","β","β","β","β",
    "π","π","π","π","π",
    "π°", "π°", "π°", "π°", "π°", "π°", "π°", "π°", "π°", "π°", "π°", "π°","π°","π°",
    "π", "π", "π", "π","π",
    "β","β","β",
    "π","π"
]

let miktar = args[0]
if(!miktar) return message.channel.send("kaΓ§ wc oynayacaΔΔ±nΔ± belirtmelisin!").then(x => {setTimeout(() => {x.delete()}, 5000);})
if(money < miktar) return message.channel.send(`**${miktar}** kadar wc paran yok!`).then(x => {setTimeout(() => {x.delete()}, 5000);})

var slot1 = slots[Math.floor(Math.random() * slots.length)];
var slot2 = slots[Math.floor(Math.random() * slots.length)];
var slot3 = slots[Math.floor(Math.random() * slots.length)];
/* ------------------------------------------------------ */
let mik;
if(slot1 == slot2 && slot1 == slot3 && slot2 == slot3) {
    if(slot1 == "π") {
        mik = miktar * 40
    }
    if(slot1 == "β") {
        mik = miktar * 30
    }
    
    if(slot1 == "π") {
        mik = miktar * 20
    }
    if(slot1 == "π°") {
        mik = miktar * 2
    }
    
    const a = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`
    ${slot1} : ${slot2} : ${slot3}

    **KazandΔ±n!** **+${mik} wc**
    `)
    message.channel.send({embeds: [a]})
    await data.add(`ecopara_${message.author.id}`,mik)
    
} else {
    const a = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`
    ${slot1} : ${slot2} : ${slot3}

    **Kaybettin!** **-${miktar} wc**
    `)
    message.channel.send({embeds: [a]})
    await data.add(`ecopara_${message.author.id}`, -miktar)
}


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [''],
  permLevel: 0
};

exports.help = {
  name: "slot"
};