const Discord = require('discord.js')
const data = require('quick.db')
const config = require('../ayarlar.json')
exports.run = async (client, message, args) => { 
 // <a:tokk:805037853360128060>    <a:unlem:805037824369885214>     <a:yon:805037800428142592>
 
  let prefix = data.fetch(`prefix_${message.guild.id}`) || config.prefix
  
  if(!message.member.permissions.has("ADMINISTRATOR")) {
    const a = new MessageEmbed()
    .setTitle(`Bu komutu kullanabilmek için Yönetici Yetkisine sahip olmalısın!`)
    .setColor('RED')
    message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
    return;
}
  /* ------------------------------------------------------- */
  let hedef = ''
 //// let sayac = await data.fetch(`sayac_${message.guild.id}`)
 // let kanalk = await data.fetch(`sayacknl_${message.guild.id}`)
  var count = message.guild.memberCount
  if(count < 50) {
    hedef = '50'
  } else
  if(count > 50 < 100) {
    hedef = '100'
  } else
  if(count > 100 < 500) {
    hedef = '200'
  } else
  if(count > 200 < 500) {
    hedef = '500'
  }

const sayaç = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`**Sayaç log kanalı kuruldu! sayaç otomatik olarak: ${hedef} ayarlandı.`)
.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})  
.setTitle(`${client.user.username} - Sayaç Log`)
.setThumbnail(client.user.avatarURL())

const mutelog = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`**Mute log kanalı başarıyla ayarlandı!`)
.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})  
.setTitle(`${client.user.username} - Mute Log`)
.setThumbnail(client.user.avatarURL())

const kkoruma = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`**Kanal koruma log kanalı başarıyla ayarlandı!`)
.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})  
.setTitle(`${client.user.username} - Kanal koruma Log`)
.setThumbnail(client.user.avatarURL())

const rkoruma = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`**Rol koruma log kanalı başarıyla ayarlandı!`)
.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})  
.setTitle(`${client.user.username} - Rol koruma Log`)
.setThumbnail(client.user.avatarURL())

const kayıtlog = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`**Kayıt log kanalı başarıyla ayarlandı!`)
.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})  
.setTitle(`${client.user.username} - Kayıt Log`)
.setThumbnail(client.user.avatarURL())

const otorol = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`**Otorol log kanalı kuruldu! verilecek otomatik rolü ayarlamak için: ${prefix}otorol ayarla [rol]`)
.setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})  
.setTitle(`${client.user.username} - OtoRol Log`)
.setThumbnail(client.user.avatarURL())
  /* ------------------------------------------------------- */
  let every = message.guild.roles.cache.find(r => r.name === '@everyone')
  
    message.guild.channels.create('LOG-KANALLARI', {reason: 'log kanalları kategori', type: 'GUILD_CATEGORY'}).then(x => {
      x.permissionOverwrites.edit(every, {
        VIEW_CHANNEL: false
      })
    })
//!  -------------------------------------------------------*/


setTimeout(() => {
   message.guild.channels.create('sayaç', {reason: 'for log', }).then(x => {
      x.permissionOverwrites.edit(every, {
        VIEW_CHANNEL: false
      })
              data.set(`sayac_${x.guild.id}`,hedef)
            data.set(`sayacknl_${x.guild.id}`,x.id)
      x.send({embeds: [sayaç]})
      x.setParent(message.guild.channels.cache.find(channel => channel.name === "LOG-KANALLARI"), {reason: 'taşıma'})
    })
  }, 1000);
//!  -------------------------------------------------------*/

//!  -------------------------------------------------------*/    
setTimeout(() => {
message.guild.channels.create('kayıt-log', {reason: 'for log', }).then(x => {
  x.permissionOverwrites.edit(every, {
    VIEW_CHANNEL: false
  })
  data.set(`kayitlog_${x.guild.id}`,x.id)
  data.set(`kayitsistem_${x.guild.id}`, 'acik')
  x.send({embeds: [kayıtlog]})
  x.setParent(message.guild.channels.cache.find(channel => channel.name === "LOG-KANALLARI"), {reason: 'taşıma'})
})
}, 3000);
//!  -------------------------------------------------------*/

//!  -------------------------------------------------------*/   
setTimeout(() => { 
message.guild.channels.create('kanal-log', {reason: 'for log', }).then(x => {
  x.permissionOverwrites.edit(every, {
    VIEW_CHANNEL: false
  })
  data.set(`kkoruma_${x.guild.id}`, 'acik')
  data.set(`kkorumalog_${x.guild.id}`, x.id)
  x.send({embeds: [kkoruma]})
  x.setParent(message.guild.channels.cache.find(channel => channel.name === "LOG-KANALLARI"), {reason: 'taşıma'})
})
}, 5000);
//!  -------------------------------------------------------*/

//!  -------------------------------------------------------*/    
setTimeout(() => { 
message.guild.channels.create('rol-log', {reason: 'for log', }).then(x => {
  x.permissionOverwrites.edit(every, {
    VIEW_CHANNEL: false
  })
  data.set(`rolk_${x.guild.id}`, 'acik')
  data.set(`rolklog_${x.guild.id}`, x.id)
  x.send({embeds: [rkoruma]})
  x.setParent(message.guild.channels.cache.find(channel => channel.name === "LOG-KANALLARI"), {reason: 'taşıma'})
})
}, 7000);
//!  -------------------------------------------------------*/

  
//}, 10000);
//!  -------------------------------------------------------*/    
setTimeout(() => { 
  message.guild.channels.create('otorol', {reason: 'for log', }).then(x => {
    x.permissionOverwrites.edit(every, {
      VIEW_CHANNEL: false
    })
    data.set(`otorolkanal.${x.guild.id}`,x.id)
    x.send({embeds: [otorol]})
    x.setParent(message.guild.channels.cache.find(channel => channel.name === "LOG-KANALLARI"), {reason: 'taşıma'})
  })
}, 10000);
//!  -------------------------------------------------------*/
setTimeout(() => { 
message.guild.channels.create('mute-log', {reason: 'for log', }).then(x => {
  x.permissionOverwrites.edit(every, {
    VIEW_CHANNEL: false
  })
  data.set(`mutelog_${x.guild.id}`, x.id)
  x.send({embeds: [mutelog]})
  x.setParent(message.guild.channels.cache.find(channel => channel.name === "LOG-KANALLARI"), {reason: 'taşıma'})
})
}, 12000);

setTimeout(() => {
  message.channel.send(`Tüm Log kanalları başarıyla kuruldu!`)
}, 15000);

}
exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: '0'
};

exports.help = {
  name: 'loglar',
  description: '',
  usage: '',
  examples: ''
};