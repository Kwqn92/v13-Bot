const ayarlar = require('../ayarlar.json');
const db = require("quick.db");
const Discord = require('discord.js')
let talkedRecently = new Set();
module.exports = async message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, );
  let client = message.client;
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if(!message.guild) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    } else {
      if(command == '') return
      message.channel.send(`"**${command}**" Adında Bir Komut Bulunamadı`).then(x => {
        message.delete()
        setTimeout(() => {
          x.delete()
        }, 5000);
      })
      
     
       
  }


  }
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
let sahip = ayarlar.sahip;
  if(cmd && cmd.help.name !== 'bakım' && message.author.id !== sahip) { 

  const neblmölçmedimikamk = db.fetch(client.user.id);
  const mesajisteamk = db.fetch(`a${client.user.id}`) || "Bilinmiyor"
  if(neblmölçmedimikamk == true) {
  message.react('❌');
   message.channel.send(`***${message.author}*** Şu An Bakımdayım!\nBakım sebebi: **${mesajisteamk}** .\nBakıma alan: <@${sahip}>\nUzun Süre Bakımdan Çıkmazsam Sahibime Ulaş!`);
   setTimeout(() => {
    message.delete()
  }, 5000);
  return;  
};
  };
 
    if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  } 
};
