const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db');


module.exports.run = async (bot, message, args) => {
 
  const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  let görevli = db.fetch(`mutey_${message.guild.id}`)

  let log = db.fetch(`mutelog_${message.guild.id}`)
   
  if(!log || !görevli) return message.reply(` Lütfen Öncelikle Görevli Rolü ya da Log Kanalını Ayarlayın`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  let mutekisi = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  
  if(!message.member.roles.cache.has(görevli) || !message.member.permissions.has("MANAGE_ROLES")) return message.reply(` Bu Komutu Kullanmak İçin <@&${görevli}> Rolüne İhtiyacın Var!`).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  
  if (!mutekisi)
    return message.reply(
      ` Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; **${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g> [Sebep]**`
    ).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  if (mutekisi.permissions.has("MANAGE_MESSAGES"))
    return message.reply(
      ` Yetkili bir kişiyi muteleyemem! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g> [Sebep]\``
    ).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
  let sebep = args.splice(2, args.length).join(" ");
  var muterole1 =db.fetch(`muteroluid_${message.guild.id}`);
var muterole2 = message.guild.roles.cache.find(r => r.id === muterole1);
if (!muterole2) {
    try {
     muterole2 = await message.guild.roles.create({ 
            data: {
                name: "Muted",
                color: "#000",
                permissions: []
              },
            reason: 'Muteli Rolü' 
            })
        db.set(`muteroluid_${message.guild.id}`, muterole2.id);
        message.guild.channels.cache.forEach(async (channel) => {
            await channel.createOverwrite(muterole2, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
                  CONNECT: false
              });
          });
} catch (err) {
    console.log(err);
}
};
  let mutezaman = args[1]
    .replace(`sn`, `s`)
    .replace(`dk`, `m`)
    .replace(`sa`, `h`)
    .replace(`g`, `d`);

  if (!mutezaman) return message.reply(` Lütfen bir zaman giriniz! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g> [Sebep]\``).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})

  await mutekisi.roles.add(muterole2.id);
  db.set(`muteli_${mutekisi.id + message.guild.id}`, 'muteli')
db.set(`süre_${message.mentions.users.first().id + message.guild.id}`, mutezaman)
  bot.channels.cache.get(log).send(
    new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL())
    .setColor(0x00ae86)
    .setAuthor("Mute Sistemi")
    .setTimestamp()
    .addField("**Kullanıcı:**", `<@${mutekisi.id}>`)
    .addField("**Yetkili:**", message.author)
    .addField("**Süre:**", args[1])
    .addField("**Sebep:**", `${sebep === "" ? "Sebep belirtilmemiş." : sebep}`)
    .setFooter( bot.user.username, bot.user.avatarURL())
  );

      setTimeout(function() {
        mutekisi.roles.remove(muterole2.id);
        message.channel.send(`<@${mutekisi.id}> kullanıcısının Mutesi Kaldırıldı!`);
     db.delete(`muteli_${mutekisi.id + message.guild.id}`)
    db.delete(`süre_${message.mentions.users.first().id + message.guild.id}`)
      }, ms(mutezaman));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "mute",
  description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar.",
  usage: "mute <@kullanıcı> <1sn/1dk/1sa/1g>"
};
