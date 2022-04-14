const { MessageEmbed, Options } = require('discord.js');
const data = require('quick.db')

exports.run = async (client, message, args) => {   
    const ayarlar = require('../ayarlar.json');
    let prefix = await data.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;

    let kanal = await data.fetch(`otorolkanal.${message.guild.id}`)
    let rol = await data.fetch(`otorol.${message.guild.id}`)

    if(!rol) {rol = 'ayarlanmamış'} else {rol = `<@&${rol}>`}
    if(!kanal) {kanal = 'ayarlanmamış'} else {kanal = `<#${kanal}>`}

    //---------------------------------------------\\

    if(!message.member.permissions.has("ADMINISTRATOR")) {
        const a = new MessageEmbed()
        .setTitle(`Bu komutu kullanabilmek için Yönetici Yetkisine sahip olmalısın!`)
        .setColor('RED')
        message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
        return;
    }
    if(!rol && !kanal) {
        const a = new MessageEmbed()
        .setTitle(`Bu komutu kullanabilmek otorolün ayarlanmış olması gerek!`)
        .setColor('RED')
        message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
        return;
    }

     let mesaj = args
if(!mesaj) {
    const a = new MessageEmbed()
    .setTitle(`Bir otorol mesajı girmelisin!`)
    .setDescription(`örn: ${prefix}otorol-mesaj -kullanıcı-, -sunucu- adlı sunucumuza hoşgeldin! -rol- rolünü başarıyla verdim.\n
    Kullanabileceğin değişkenler: 
    -sunucu- == sunucu ismini belirtir
    -kullanıcı- == kullanıcının adını belirtir
    -rol- == otorol rolünü belirtir. 
    `)
    .setColor('RED')
    message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 15000);})
    return;
}
await data.set(`otorolmessage${message.guild.id}`, mesaj)
message.channel.send(`Otorol mesajın:`)
message.channel.send(`${mesaj} olarak ayarlandı! sıfırlamak için: ${prefix}otorol-mesaj sıfırla`)

if(args[0] == 'sıfırla') {
    let kontrol = await data.fetch(`otorolmessage${message.guild.id}`)
    if(!kontrol) {
        const a = new MessageEmbed()
        .setTitle(`Otorol mesajı zaten varsayılan!`)
        .setColor('RED')
        message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
        return;
    }
    await data.delete(`otorolmessage${message.guild.id}`)
    const a = new MessageEmbed()
        .setTitle(`Otorol mesajı varsayılan olarak ayarlandı!`)
        .setDescription(`otorol mesajı: **${message.author.tag} Sunucuya Katıldı! ${rol} Rolünü Başarıyla Verdim!**`)
        .setColor('RED')
        message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
        return;
}

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: '0'
};

exports.help = {
  name: 'otorol-mesaj',
  description: '',
  usage: '',
};