const Discord = require('discord.js')
const db = require('quick.db')
const ms = require("ms");
exports.run = async (client, message, args) => { 

 const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
 let para = await db.fetch(`para_${message.author.id}`)
  
if(!args[0]){
const kayıt = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Market Komutları`)
.setColor('BLACK')
.setDescription(`Marketimizde Bulunan ürünler;\n\n **${prefix}market gold-üyelik** : Gold Üyelik Alırsınız\n[Daha Fazlası Yakında!]`)
.addField("**» Bot Davet**"," [Davet Et](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8)")
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [kayıt]})
 }
 
 
 
 
    let kişi = message.mentions.users.first()
 if(!kişi) return message.channel.send(`Eksik Komut! Doğru Kullanım: \`${prefix}gold-al @kişi\`\nNot: Kendinize Gold Üye Almak İstiyorsanız Kendinizi etiketleyin!`)
 
 
 if(para > 200) {
   db.add(`para_${message.author.id}`,-200)
   db.set(`gold_${kişi.id}`, "acik");
   message.channel.send(`${kişi} Adlı Kişiye Gold Üye Alma Başarılı!`)
   if(kişi.id == message.author.id) {
     client.channels.cache.get('963882329913323530').send(`${kişi} Adlı Kullanıcı Marketten Gold Üyelik Aldı!`)
   } else {
     client.channels.cache.get('963882329913323530').send(`${message.author.tag} , ${kişi} Adlı Kullanıcıya Marketten Gold Üyelik Hediye etti!`)
   }
   
   
               setTimeout(async () => {
const i = await db.fetch(`gold_${kişi.id}`)
if(i !== 'acik') return;
  kişi.send(`Aldığın Gold Üyeliğin Süresi Bitti! Tekrar Almak İçin ${prefix}gold-al`)
db.delete(`gold_${kişi.id}`)
              }, 86400000);

 } else {
   message.channel.send(`Senin Puanın 200'nin Üstünde Değil! Lütfen 200 veya üstü Puana Sahip iken Bu Komutu Kullan`)
   
 }
 
  

 
};
exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: '0'
};

exports.help = {
  name: 'gold-al',
  description: '',
  usage: '',
  examples: ''
};