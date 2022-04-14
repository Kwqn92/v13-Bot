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
   if(!args[0]) {
    const a = new MessageEmbed()
    .setAuthor({iconURL: client.user.avatarURL(), name: `${client.user.username} - Otorol Sistemi`})
    .addField('Otorol Ayarla',`${prefix}otorol ayarla [rol] [kanal]`,true)
    .addField('Otorol Sıfırla',`${prefix}otorol sıfırla [rol]/[kanal]`,true)
    .addField(`Sadece kanal/rolü sıfırlamak için`,`${prefix}otorol sıfırla rol/kanal`)
    .setDescription(`**Otorol:** ${rol}\n**Kanal:** ${kanal}`)

    .setColor('RANDOM')
    message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 15000);})
   }
   if(args[0] == 'ayarla' || args[0] == 'Ayarla') {


   if(args[1] == 'rol') {
    let rol = message.mentions.roles.first()
    if(!rol) {
      const a = new MessageEmbed()
      .setTitle(`Lütfen Bir Rol etiketle!`)
      .setColor('RED')
      message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
      return;
  }
  data.set(`otorol.${message.guild.id}`,rol.id)
  const a = new MessageEmbed()
      .setDescription(`**Otorol** ${rol} **Olarak ayarlandı!**`)
      .setColor('GREEN')
      message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
   }
   if(args[1] == 'kanal') {
    let kanal = message.mentions.channels.first()
    if(!kanal) {
      const a = new MessageEmbed()
      .setTitle(`Lütfen Bir Kanal etiketle!`)
      .setColor('RED')
      message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
      return;
  }
  data.set(`otorolkanal.${message.guild.id}`,kanal.id)
  const a = new MessageEmbed()
  .setDescription(`**Otorol Kanalı** ${kanal} **Olarak ayarlandı!**`)
  .setColor('GREEN')
  message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
   }
   if(!args[1]) {
    let rol = message.mentions.roles.first()
    let kanal = message.mentions.channels.first() 
    if(!rol) {
        const a = new MessageEmbed()
        .setTitle(`Lütfen Bir Rol etiketle!`)
        .setFooter({name: `eğer sadece rol/kanal ayarlamak istiyorsanız ${prefix}otorol ayarla rol/kanal`})
        .setColor('RED')
        message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
        return;
    }
    if(!kanal) {
        const a = new MessageEmbed()
        .setTitle(`Lütfen Bir Kanal etiketle!`)
        .setFooter({name: `eğer sadece rol/kanal ayarlamak istiyorsanız ${prefix}otorol ayarla rol/kanal`})
        .setColor('RED')
        message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
        return;
    }
    data.set(`otorol.${message.guild.id}`,rol.id)
    data.set(`otorolkanal.${message.guild.id}`,kanal.id)
    const a = new MessageEmbed()
        .setDescription(`**Otorol Başarıyla** ${rol} ve ${kanal} **Olarak ayarlandı!**`)
        .setColor('GREEN')
        message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
   }
   }
   if(args[0] == 'sıfırla' || args[0] == 'Sıfırla') {
       if(args[1] == 'rol') {
        let rols = await data.fetch(`otorol.${message.guild.id}`)
        let kanal = await data.fetch(`otorolkanal.${message.guild.id}`)
          if(!rols) {
            const a = new MessageEmbed()
            .setTitle(`Otorol Zaten Ayarlanmamış!`)
            .setColor('RED')
            message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
            return;
          }
          data.delete(`otorol.${message.guild.id}`)
          const a = new MessageEmbed()
        .setTitle(`Otorol Başarıyla sıfırlanı!`)
        .setColor('GREEN')
        message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
        return;
       }
       if(args[1] == 'kanal') {
        let rol = await data.fetch(`otorol.${message.guild.id}`)
        let kanasl = await data.fetch(`otorolkanal.${message.guild.id}`)
        if(!kanasl) {
            const a = new MessageEmbed()
            .setTitle(`Otorol Kanalı Zaten Ayarlanmamış!`)
            .setColor('RED')
            message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
            return;
          }
          data.delete(`otorolkanal.${message.guild.id}`)
          const a = new MessageEmbed()
        .setTitle(`Otorol Kanalı Başarıyla sıfırlanı!`)
        .setColor('GREEN')
        message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
        return;
    }
    if(!args[1]) {
        let rol1 = await data.fetch(`otorol.${message.guild.id}`)
    let kanal1 = await data.fetch(`otorolkanal.${message.guild.id}`)
        if(!rol1 || !kanal1) {
            const b = new MessageEmbed()
            .setTitle(`Otorol Kanalı Zaten Ayarlanmamış!`)
            .setColor('RED')
            message.reply({embeds: [b]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
            
          
          data.delete(`otorolkanal.${message.guild.id}`)
          data.delete(`otorol.${message.guild.id}`)
          const a = new MessageEmbed()
        .setTitle(`Otorol Başarıyla sıfırlanı!`)
        .setColor('GREEN')
        message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
        return;
        }
    }
   }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: '0'
};

exports.help = {
  name: 'otorol',
  description: '',
  usage: '',
};