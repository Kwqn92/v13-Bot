const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args) => {   const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
 
     let görevli = await db.fetch(`kgörevli_${message.guild.id}`)
      let log = await db.fetch(`kayitlog_${message.guild.id}`)
      let kanal = await db.fetch(`kayitknl_${message.guild.id}`)
      let kayıtlı = await db.fetch(`kayitli_${message.guild.id}`)
      let kayıtsız = await db.fetch(`kayitsiz_${message.guild.id}`)
      let erkek = await db.fetch(`erkekkayit_${message.guild.id}`)
  let bayan = await db.fetch(`bayankayit_${message.guild.id}`)

   if(!db.fetch(`kayitsistem_${message.guild.id}`)) {
      const embed = new Discord.MessageEmbed()
  .setDescription(`<a:unlem:805037824369885214> Kayıt Sistemi Aktif Değil!.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
    } else {
if(!message.member.roles.cache.has(görevli)){
    const embed = new Discord.MessageEmbed()
  .setDescription(`<a:unlem:805037824369885214> Komutu kullanmak için <@&${görevli}> Rolüne Sahip Olman Gerek.`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: {embed}}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
}
if(message.channel.id !== kanal) {
     const embed = new Discord.MessageEmbed()
  .setDescription(` Komutu kullanmak için <#${kanal}> kanalında Kullanılır`)
  .setColor('0x800d0d')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)});
}
if (!erkek) return message.channel.send(` Sunucuda Kayıtlı Ayarlanmadığı İçin Komut Kullanılamaz ! `).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})

 

let member = message.mentions.members.first();
if (!member) return message.channel.send(`Kayıt Edeceğin Kullanıcıyı Belirtmelisin ! `).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
let isim = args[1]
if (!isim) return message.channel.send(`İsmini Belirtmelisin ! `).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
let yaş = args[2]
if (!yaş) return message.channel.send(`Yaşını Belirtmelisin ! `).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
member.setNickname(`${isim} | ${yaş}`)

member.roles.remove(kayıtsız)
member.roles.add(kayıtlı)
  
      
  const embed = new Discord.MessageEmbed()
  .setDescription(` ${member} **Adlı Kullanıcı Başarıyla Kayıt Edildi!** Kayıt Eden Yetkili: ${message.member.displayName}\n\n Yeni İsim: ${isim} | ${yaş} \n Alınan Rol: <@&${kayıtsız}>\n Verilen Rol(ler): <@&${erkek}>`)
  .setColor('RANDOM')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
  client.channels.cache.get(log).send({embeds: [embed]})
      
        const embed2 = new Discord.MessageEmbed()
  .setDescription(` ${member} **Adlı Kullanıcı Başarıyla Kayıt Edildi.** `)
  .setColor('RANDOM')
  .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
  message.channel.send({embeds: [embed2]}).then(x => { message.delete();setTimeout(() => {x.delete()}, 5000)})
      db.add(`kayıtsayı_${message.author.id}`, 1)
      
      
      

}};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayıtet'],
  permLevel: '0'
};

exports.help = {
  name: 'kayıt',
  description: '',
  usage: '',
};