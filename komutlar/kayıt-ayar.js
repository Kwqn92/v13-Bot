const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args) => {   const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix

  
      let görevli = await db.fetch(`kgörevli_${message.guild.id}`)
      let log =     await db.fetch(`kayitlog_${message.guild.id}`)
      let kanal =   await db.fetch(`kayitknl_${message.guild.id}`)
      let kayıtlı = await db.fetch(`kayitli_${message.guild.id}`)
      let kayıtsız =await db.fetch(`kayitsiz_${message.guild.id}`)
      let erkek =   await db.fetch(`erkekkayit_${message.guild.id}`)
      let bayan =   await db.fetch(`bayankayit_${message.guild.id}`)
      let kayıt =   await db.fetch(`kayitsistem_${message.guild.id}`)
      let giris   = await db.fetch(`girismsg${message.guild.id}`)
      let knl =     await db.fetch(`girismsgknl${message.guild.id}`)
          
     
  
  
       if(!db.fetch(`kayitsistem_${message.guild.id}`)) {
      const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Kayıt Sistemi Aktif Değil!.`)
  .setColor('0x800d0d')
 .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
    } else {
  
if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(` Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin`).then(x => {
  message.delete()
  setTimeout(() => {
    x.delete()
  }, 5000);
})
  
  if(!args[0]) {
      const embed = new Discord.MessageEmbed()
  .setDescription(`Ayarlamalar Hakkında Bilgi için: **${prefix}kayıtayar bilgi** \n\nKullanabileceğin Komutlar: **${prefix}kayıtayar kayıtlı** | **${prefix}kayıtayar kayıtsız** | **${prefix}kayıtayar görevli** | **${prefix}kayıtayar kanal** | **${prefix}kayıtayar log** | **${prefix}kayıtayar erkek** | **${prefix}kayıtayar kadın** | **${prefix}kayıtayar giriş-mesaj** `)
  .setColor('0x800d0d')
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 50000);
    })
  }
  
      if(args[0] == 'kanal') {
      let kanal = message.mentions.channels.first()
     if(!kanal) {
             const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Bir Kayıt Kanal Etiketle!!.`)
  .setColor('0x800d0d')
 .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
     }
        db.set(`kayitknl_${message.guild.id}`,kanal.id)
              const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Kayıt Kanalı ${kanal} Olarak Ayarlandı!.`)
  .setColor('0x800d0d')
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
      }
  
      if(args[0] == 'log') {
        let kanal = message.mentions.channels.first()
     if(!kanal) {
             const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Bir Kayıt Log Kanalı Etiketle!!.`)
  .setColor('0x800d0d')
  .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]})
     }
        db.set(`kayitlog_${message.guild.id}`,kanal.id)
              const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Kayıt Log Kanalı ${kanal} Olarak Ayarlandı!.`)
  .setColor('0x800d0d')
  .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
      }
      
      if(args[0] == 'giriş-mesaj'){
        let görevli = await db.fetch(`kgörevli_${message.guild.id}`)
        if(görevli == undefined) return message.channel.send(`Lütfen Öncelikle \`${prefix}kayıtayar görevli\` Komutunu Aktif Ediniz..`).then(x => {
          message.delete()
          setTimeout(() => {
            x.delete()
          }, 5000);
        }); else {
                let kanal = message.mentions.channels.first()
     if(!kanal) {
             const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Bir Giriş Mesaj Kanalı Etiketle!!.`)
  .setColor('0x800d0d')
  .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
     }
        db.set(`girismsgknl${message.guild.id}`,kanal)
        db.set(`girismsg${message.guild.id}`, 'a')
              const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Giriş Mesaj Kanalı ${kanal} Olarak Ayarlandı!.`)
  .setColor('0x800d0d')
  .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
      }}
      
      if(args[0] == 'kayıtsız') {
        let kanal = message.mentions.roles.first()
     if(!kanal) {
             const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Bir Kayıtsız üye Rol Etiketle!!.`)
  .setColor('0x800d0d')
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
     }
        db.set(`kayitsiz_${message.guild.id}`,kanal)
              const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Kayıtsız Rolü ${kanal} Olarak Ayarlandı!.`)
  .setColor('0x800d0d')
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
      }
      
      if(args[0] =='kayıtlı'){
         let kanal = message.mentions.roles.first()
     if(!kanal) {
             const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Bir Kayıtlı Üye Rol Etiketle!!.`)
  .setColor('0x800d0d')
  .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
     }
        db.set(`kayitli_${message.guild.id}`,kanal)
              const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Kayıtlı üye Rolü ${kanal} Olarak Ayarlandı!.`)
  .setColor('0x800d0d')
  .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]})
      }
      if(args[0] == 'görevli') {
         let kanal = message.mentions.roles.first()
     if(!kanal) {
             const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Bir Kayıt Görevlisi Rolü Etiketle!!.`)
  .setColor('0x800d0d')
  .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
     }
        db.set(`kgörevli_${message.guild.id}`,kanal)
              const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Kayıt Görevlisi Rolü ${kanal} Olarak Ayarlandı!.`)
  .setColor('0x800d0d')
  .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
      }
      
      if(args[0] == 'erkek') {
        let kanal = message.mentions.roles.first()
     if(!kanal) {
             const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Bir Erkek üye Rol Etiketle!!.`)
  .setColor('0x800d0d')
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
     }
        db.set(`erkekkayit_${message.guild.id}`,kanal)
              const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Erkek Üye Rolü ${kanal} Olarak Ayarlandı!.`)
  .setColor('0x800d0d')
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
      }
        if(args[0] == 'kadın') {
        let kanal = message.mentions.roles.first()
     if(!kanal) {
             const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Bir Kadın üye Rol Etiketle!!.`)
  .setColor('0x800d0d')
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
     }
        db.set(`bayankayit_${message.guild.id}`,kanal)
              const embed = new Discord.MessageEmbed()
  .setDescription(`${message.author} Kadın Üye Rolü ${kanal} Olarak Ayarlandı!.`)
  .setColor('0x800d0d')
 .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
      }

      
    

}
      if(!kayıt) {kayıt = 'Kapalı'} else {kayıt= 'Aktif'}
      if(!kanal) {kanal = 'Ayarlamamış'} else {kanal= `<#${kanal}>`}
      if(!görevli) {görevli = 'Ayarlamamış'} else {görevli= `<@&${görevli}>`}
      if(!log) {log = 'Ayarlamamış'} else {log= `<#${log}>`}
      if(!kayıtlı) {kayıtlı = 'Ayarlamamış'} else {kayıtlı= `<@&${kayıtlı}>`}
      if(!kayıtsız) {kayıtsız = 'Ayarlamamış'} else {kayıtsız= `<@&${kayıtsız}>`}
      if(!erkek) {erkek = 'Ayarlamamış'} else {erkek= `<@&${erkek}>`}
      if(!bayan) {bayan = 'Ayarlamamış'} else {bayan= `<@&${bayan}>`}    
      if(!giris) {giris = 'Kapalı'} else {giris= 'Aktif'}
      if(!knl) {knl = 'Ayarlamamış'} else {knl= `<#${knl}>`}
  if(args[0] == 'bilgi') {
              const embed = new Discord.MessageEmbed()
        .addField('⚒ Kayıt Sistemi:', kayıt, true)
        .addField('⚒ Kanal', `${kanal}`,true)
        .addField('⚒ Log Kanalı',`${log}` ,true)
        .addField('⚒ Görevli Rol',`${görevli}` ,true)
        .addField('⚒ Kayıtsız Üye Rol',`${kayıtsız}`, true)
        .addField('⚒ Kayıtlı üye Rol', `${kayıtlı}`,true)
        .addField('⚒ Bayan Üye Rol',`${bayan}` ,true)
        .addField('⚒ Erkek Üye Rol',`${erkek}` ,true)
        .addField('⚒ Giriş Mesaj', `${giris} | ${knl}`,true)

        
  .setColor('RANDOM')
  .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
              .setFooter(message.author.tag + ` Tarafından İstendi`)
  .setTimestamp()
    message.channel.send({embeds: [embed]}).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 10000);
    })
  }      
                                               };
exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: '0'
};

exports.help = {
  name: 'kayıtayar',
  description: '',
  usage: '',
  examples: ''
};