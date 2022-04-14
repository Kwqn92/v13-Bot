const  { Client,
  Intents,
   Util,
   Collection,
   MessageEmbed, 
   MessageActionRow,
    MessageButton} = require('discord.js');//
const client = new Client({intents: Object.values(Intents.FLAGS).reduce((p,c) => p + c, 0)});//
/**
 * !  intents: [
 * !  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
 * ! Intents.FLAGS.GUILD_BANS,
 * ! Intents.FLAGS.GUILDS,
 * ! Intents.FLAGS.DIRECT_MESSAGES,
 *  ! Intents.FLAGS.GUILD_MESSAGES,
 *  ! Intents.FLAGS.GUILD_BANS,
    
  ]
 */
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms');//
const tags = require('common-tags');
const { Server } = require('https');
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Collection();//
client.aliases = new Collection();//

fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    console.log(`‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
    ${files.length} komut yüklenecek.
‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        console.log(`[KOMUT] | ${props.help.name} Eklendi.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
    if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);



//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\

client.on('guildMemberAdd', async(member) => {
  let kanal = await db.fetch(`otorolkanal.${member.guild.id}`)
  let rol = await db.fetch(`otorol.${member.guild.id}`)
  let mesaj = await db.fetch(`otorolmessage${member.guild.id}`)

/*let mesaj2 = mesaj.replace(`-kullanıcı-`, member)
                  .replace(`-sunucu-`, member.guild.name)
                  .replace(`-rol-`, `<@&${rol}>`)*/

  if(!rol || !kanal) return;

    if(!mesaj) {
      const a = new MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`${member} Sunucuya Katıldı! <@&${rol}> Rolünü Başarıyla Verdim!`)
    .setAuthor({name: `${client.user.username} Otorol Sistemi`, iconURL: client.user.avatarURL()})
    client.channels.cache.get(kanal).send({embeds: [a]})
  
    } else {
      const a = new MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`**${mesaj}**`)
    .setAuthor({name: `${client.user.username} Otorol Sistemi`, iconURL: client.user.avatarURL()})
    client.channels.cache.get(kanal).send({embeds: [a]})
  
    }
  
 
})

//--------------------------------------------------------------------------------------\\

client.on('guildCreate', guild => {
  const a = new MessageEmbed()
  .setThumbnail()
  .setColor('GREEN')
  .setTitle(`Bir sunucuya eklendim!`)
  .addField('**Sunucu adı**', guild.name)
  .addField('**Sunucu sahibi**', `<@${guild.owner.id} + **${guild.owner.id}**`)
  .addField('**Sunucu kişi sayısı**', guild.memberCount)
  client.channels.cache.get("963882036463013938").send({embeds: [a]})
})

client.on('guildDelete', guild => {
  const a = new MessageEmbed()
  .setThumbnail()
  .setColor('RED')
  .setTitle(`Bir sunucudan atıldım!`)
  .addField('**Sunucu adı**', guild.name)
  .addField('**Sunucu sahibi**', `<@${guild.owner.id} + **${guild.owner.id}**`)
  .addField('**Sunucu kişi sayısı**', guild.memberCount)
  client.channels.cache.get("963882054217531392").send({embeds: [a]})
})


client.on('guildMemberAdd', member => { 
    let kontrols = db.fetch(`girismsg${member.guild.id}`)
    let kanal =  db.fetch(`girismsgknl${member.guild.id}`)
   let adminlog =  db.fetch(`adminlog_${member.guild.id}`)
  let adminrol =  db.fetch(`adminrol_${member.guild.id}`)
  if(!kontrols) return;
  if(!kanal) return;
  
  
 let aylartoplam = {
    "01": "Ocak",
        "02": "Şubat",
        "03": "Mart",
        "04": "Nisan",
        "05": "Mayıs",
        "06": "Haziran",
        "07": "Temmuz",
        "08": "Ağustos",
        "09": "Eylül",
        "10": "Ekim",
        "11": "Kasım",
        "12": "Aralık"
  }
 let aylar = aylartoplam 
let user = client.users.cache.get(member.id);
require("moment-duration-format");
let kayıtçı = db.fetch(`kgörevli_${member.guild.id}`)

    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment.duration(kurulus).format("D")   
    var kontrol;
    if (gün < 30) kontrol = 'Güvenilir Değil'
    if (gün > 30) kontrol = 'Güvenilir'   
 
 

const guvenlik = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Yeni Üye`)
.setDescription(`Hoşgeldin ${member} seninle Beraber **${member.guild.memberCount || "DiscordAPI"}** Kişiye Ulaştık \n\nKayıt Olabilmen İçin Yetkililere İsmini Yaşını Söylemelisin.\nHesabın Kurulduğu Tarih: **${moment(user.createdAt).format('DD')} ${aylar[moment(user.createdAt).format('MM')]} ${moment(user.createdAt).format('YYYY HH:mm:ss')}**\n\n<@&${kayıtçı}> **Rolündeki yetkililer seninle ilgilenecektir**`)
.setColor('GREEN')
.setThumbnail(member.user.avatarURL())
.setFooter(`${member.user.username} Adlı Kullanıcı Katıldı !`)
client.channels.cache.get(kanal).send({embeds: [guvenlik]})  
  client.channels.cache.get(kanal).send(`<@&${kayıtçı}>`)
  .console.log(`Yeni Kullanıcı`)
})

//--------------------------------------------------------------------------------------\\

client.on('guildMemberAdd', async member => {
let sayac =   db.fetch(`sayac_${member.guild.id}`)
   let kanal = db.fetch(`sayacknl_${member.guild.id}`)
  if(!kanal || !sayac) return
  
  const saya1c = new MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Sayaç`)
  .setDescription(`${member} Adlı Kullanıcı Sunucuya İniş Yaptı!! Sunucu ${member.guild.memberCount} Kişi Oldu. ${sayac} Kişi Olmamıza, ${sayac - member.guild.memberCount} Kişi Kaldı!`)
.setColor('GREEN')
.setThumbnail(member.user.avatarURL())
.setFooter(`${member.user.username} Adlı Kullanıcı Katıldı !`)
  client.channels.cache.get(kanal).send({embeds: [saya1c]})
})
client.on('guildMemberRemove', async member => {
   let adminlog = await db.fetch(`adminlog_${member.guild.id}`)
  let adminrol = await db.fetch(`adminrol_${member.guild.id}`)
let sayac =   db.fetch(`sayac_${member.guild.id}`)
   let kanal = db.fetch(`sayacknl_${member.guild.id}`)
  if(!kanal || !sayac) return
  
  const sayac2 = new MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Sayaç`)
  .setDescription(`${member.user.username} Adlı Kullanıcı Sunucudan Çıktı! Sunucu ${member.guild.memberCount} Kişi Kaldı. ${sayac} Kişi Olmamıza, ${sayac - member.guild.memberCount} Kişi Kaldı!`)
.setColor('RED')
.setThumbnail(member.user.avatarURL())
.setFooter(`${member.user.username} Adlı Kullanıcı Ayrıldı !`)
  client.channels.cache.get(kanal).send({embeds: [sayac2]})
})

client.on('message', async member => {
let sayac =   db.fetch(`sayac_${member.guild.id}`)
   let kanal = db.fetch(`sayacknl_${member.guild.id}`)
  if(!kanal || !sayac) return
  
  if(sayac <= member.guild.members.cache.size) {
    const sayac3 = new MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Sayaç`)
  .setDescription(`Sunucumuz Hedefine Ulaştı! Lütfen Yeni Bir Hedef Belirle`)
.setColor('RED')
.setThumbnail(client.user.avatarURL())
 member.guild.owner.send({embeds: [sayac3]});
      db.delete(`sayac_${member.guild.id}`);
      db.delete(`sayacknl_${member.guild.id}`);
  }
})

//--------------------------------------------------------------------------------------\\

client.on('message', async message => {
if (message.content === '!fakekatıl') { 
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});

client.on('message', async message => {
if (message.content === '!fakeayrıl') { 
  client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
    }
});

//--------------------------------------------------------------------------------------\\

client.on("message", async msg => {

if(!msg.guild) return;
  const i = await db.fetch(`saas_${msg.guild.id}`);
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 's.a' || msg.content.toLowerCase() == 'selamun aleyküm') {
          try {

                  return msg.channel.send(`**Aleyküm Selam** <@${msg.author.id}> **Hoşgeldin** :)`).then(x => {
                    
                    setTimeout(() => {
                      x.delete()
                    }, 5000);
                  })
          } catch(err) {
            console.log(err);
          }
      }
      if(msg.content.toLowerCase() == 'hb' || msg.content.toLowerCase() == 'hoşbulduk'|| msg.content.toLowerCase() == 'hoşbuldum' || msg.content.toLowerCase() == 'hosbulduk'){
        try {

                  return msg.channel.send(`Nasılsın ?`).then(x => {
                    message.delete()
                    setTimeout(() => {
                      x.delete()
                    }, 5000);
                  })
          } catch(err) {
            console.log(err);
          }
      }
        if(msg.content.toLowerCase() == 'ii' || msg.content.toLowerCase() == 'iyi'|| msg.content.toLowerCase() == 'harika' || msg.content.toLowerCase() == 'güzel'){
        try {

                  return msg.channel.send(`Allah İyilik Versin`).then(x => {
                    message.delete()
                    setTimeout(() => {
                      x.delete()
                    }, 5000);
                  })
          } catch(err) {
            console.log(err);
          }
      }
        if(msg.content.toLowerCase() == 'kotu' || msg.content.toLowerCase() == 'kötü'|| msg.content.toLowerCase() == 'sanane' || msg.content.toLowerCase() == 'napıcan'){
        try {

                  return msg.channel.send(`Üzüldüm :(`).then(x => {
                    message.delete()
                    setTimeout(() => {
                      x.delete()
                    }, 5000);
                  })
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (i == 'kapali') {
    
    }
    if (!i) return;

    });
//--------------------------------------------------------------------------------------\\

  client.on("message", async msg => {
  if(!msg.guild) return;
 const i = await db.fetch(`kengel_${msg.guild.id}`)
    if (i == "acik") {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.permissions.has("MANAGE_ROLES")) {       
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(x => {
                        message.delete()
                        setTimeout(() => {
                          x.delete()
                        }, 5000);
                      })
            }           
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});
//--------------------------------------------------------------------------------------\\

client.on('guildMemberAdd', async member => {
  let mutelimi = db.fetch(`muteli_${member.id + member.guild.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
var rol =db.fetch(`muteroluid_${member.guild.id}`);
    let log = db.fetch(`mutelog_${member.guild.id}`)
    let kanal = client.channels.cache.get(log)
  let rol2 = member.guild.roles.cache.find(r => r.name === rol);
  if(mutelimi == 'muteli') {
  
member.roles.add(rol)
    kanal.send(`${member} Adlı Kullanıcı Kendini Zeki Sandı! Sunucudan Çıkıp Geri Girdi Fakat Mutesi Devam Ettiği İçin Tekrar Susturuldu!`)
    member.send(`Muteli iken Çıktığın İçin Tekrar Mutelendin!`)
  }  
  if(!mutelimi) return;

})
//--------------------------------------------------------------------------------------\\

client.on('message', async message => {
  let kontrol = await db.fetch(`gold_${message.author.id}`)
  
  if(!kontrol) return;
  
  if(message.content.toLowerCase() === 'sa' ||message.content.toLowerCase() === 'selam' ||message.content.toLowerCase() === 'selamınaleyküm'|| message.content.toLowerCase() === 'selamın aleyküm'){
    const goldss = new MessageEmbed()
    
    
    .setColor('GOLD')
    .setDescription(`Bir Gold Üye Buralarda! Hoşgeldin :)`).then(x => {
      message.delete()
      setTimeout(() => {
        x.delete()
      }, 5000);
    })
    message.channel.send({embeds: [goldss]})
  }
})



//--------------------------------------------------------------------------------------\\
client.on("guildMemberAdd", async member => {
  if(!member.guild) return;
  let t = await db.fetch(`sesknl_${member.guild.id}`)
  if(!t) return;
  let channel = client.channels.cache.get(t);
  channel.setName("Son Üye: " + member.user.username);
});
//--------------------------------------------------------------------------------------\\



client.on("channelDelete", async function(channel,member) {
let rol = await    db.fetch(`kkoruma_${channel.guild.id}`)
let log = await    db.fetch(`kkorumalog_${channel.guild.id}`)
  if (rol == true) {
const guild = channel.guild.cache;
let channelp = channel.parentID;
  channel.clone().then(z => {
    let kanal = z.guild.channels.cache.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.cache.find(channel => channel.id === channelp)
      
)
  client.channels.cache.get(log).send(`${kanal} Adlı Kanal Silindi! Fakat Kanal Koruma Aktif Olduğu İçin Geri Oluşturdum.`)
  });

    
    
  }
  if(!rol) return;
})

//--------------------------------------------------------------------------------------\\



 client.on("message", async msg => {
  if(!msg.guild) return;
 const i = await db.fetch(`lengel_${msg.guild.id}`)
    if (i == "acik") {
        const kufur = ["discord.app", "discord.gg", ".party", ".com", ".az", ".net", ".io", ".gg", ".me", "https", "http", ".com.tr", ".org", ".tr", ".gl", "glicht.me/", ".rf.gd", ".biz", "www.", "www"];
    if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.permissions.has("BAN_MEMBERS")) {
                  msg.delete();       
                      return msg.reply('Bu Sunucuda Link Engelleme Aktiftir.').then(x => {
                        message.delete()
                        setTimeout(() => {
                          x.delete()
                        }, 5000);
                      })
            }           
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

//--------------------------------------------------------------------------------------\\

client.on("roleDelete", async role => {
 let rk = db.fetch(`rolk_${role.guild.id}`)
 let knl = db.fetch(`rolklog_${role.guild.id}`)
 if(rk == 'acik') {
         const entry = await role.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.guild.roles.create({ data: {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
}, reason: 'Silinen Rol Açıldı.'})
   
   client.channels.cache.get(knl).send(`Bir Rol Silindi! Fakat Rol Koruma Açık Olduğu İçin Rolü Tekrar Oluşturdum`)
}})

//--------------------------------------------------------------------------------------\\

client.on('message', async message => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  if(!message.guild) return;
  if(message.content.toLowerCase() == "prefix") {
    message.reply(`Bu sunucuda ayarlı prefix(**${prefix}**)`)
  }
})

//--------------------------------------------------------------------------------------\\

