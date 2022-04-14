const discord = require('discord.js')
const db = require('quick.db')
exports.run = async(client, message, args) => {
const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix 
if(!args[0]){
const yardım = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Yardım`)
.setColor('BLACK')
.setDescription(`<a:Arrowr:939612945619488778>  **|** **${prefix}yardım moderasyon** = Moderasyon Komutlarını Gösterir\n<a:Arrowr:939612945619488778> **|** **${prefix}yardım kayıt** = Kayıt Komutlarını Gösterir\n<a:Arrowr:939612945619488778> **|** **${prefix}yardım sahip** = Sahip Komutlarını Gösterir\n<a:Arrowr:939612945619488778> **|** **${prefix}yardım koruma** = Koruma Komutlarını Gösterir(YENİ)\n<a:Arrowr:939612945619488778> **|** **${prefix}yardım gold** = Gold Sistemi Hakkında Bilgi Verir`)
.addField("**» Linkler**"," [Davet Et](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8) [Destek Sunucusu(Yakında)](https://discord.gg/developer)")
    .addField("» **Kullanıcılar**",client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
    .addField("» **Sunucular**", client.guilds.cache.size.toLocaleString(), true)
    .addField("» **Kanallar**", client.channels.cache.size.toLocaleString(), true)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send({embeds: [yardım]})
}
  
  if(args[0] == 'koruma') {
    //<a:Arrowr:939612945619488778> **|** **${prefix}küfür-engel** = Sunucuda(düzenlense bile) Küfürleri Engeller\n
       const koruma = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} -  Moderasyon Komutları`)
.setDescription(`
<a:Arrowr:939612945619488778> **|** **${prefix}küfür-engel** = Sunucuda(düzenlense bile) Küfürleri Engeller.
\n<a:Arrowr:939612945619488778> **|** **${prefix}link-engel** = Sunucuda link Paylaşılmasını Engellersiniz.
\n<a:Arrowr:939612945619488778> **|** **${prefix}kanal-koruma** = Sunucuda Kanal silinmesini Engellersiniz.
\n<a:Arrowr:939612945619488778> **|** **${prefix}rol-koruma** = Sunucuda Rol Silinmesini Engellersiniz.
\n<a:Arrowr:939612945619488778> **|** **${prefix}yeni-hesap-koruma** = Sunucuya Fake Hesapla Giren Kişileri Algılar.`)
       .addField("**» Linkler**"," [Davet Et](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8) [Destek Sunucusu](https://discord.gg/47dqryjAr9)")
  .setColor('BLACK')
.setThumbnail(client.user.avatarURL())
.setFooter({text: `Komut ${message.author.tag} Tarafından Kullanıldı ! `})
message.channel.send({embeds: [koruma]})
  }
  
 if(args[0] == 'moderasyon'){
   const moderasyon = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} -  Moderasyon Komutları`)
.setDescription(`
<a:Arrowr:939612945619488778> **|** **${prefix}komutlar-kanalı** = Botun sadece kullanılacağı kanalı ayarlarsınız.
\n<a:Arrowr:939612945619488778> **|** **${prefix}ban** = Belirlediğiniz Kullanıcıyı Banlarsınız.
\n<a:Arrowr:939612945619488778> **|** **${prefix}kanal-sil** = girdiğiniz isimle aynı olan tüm kanalları siler.
\n<a:Arrowr:939612945619488778> **|** **${prefix}otorol** = Otorolü Ayarlarsınız.
\n<a:Arrowr:939612945619488778> **|** **${prefix}loglar** = Log kanallarını otomatik olarak kurar ve ayarlar.
\n<a:Arrowr:939612945619488778> **|** **${prefix}sayaç-ayarla** = Sayacı Ayarlarsınız.
\n<a:Arrowr:939612945619488778> **|** **${prefix}sayaç-sıfırla** = Sayacı Sıfırlarsınız.
\n<a:Arrowr:939612945619488778> **|** **${prefix}prefix ayarla** = Sunucuya Özel Prefix Ayarlarsınız.
\n<a:Arrowr:939612945619488778> **|** **${prefix}prefix sıfırla** = Prefixi Sıfırlarsınız.
\n<a:Arrowr:939612945619488778> **|** **${prefix}duyuru-kanal** = Duyuru Kanalını Ayarlarsınız.
\n<a:Arrowr:939612945619488778> **|** **${prefix}duyuru** = Ayarkadığınız Duyuru Kanalına Duyuru Atarsınız.
\n<a:Arrowr:939612945619488778> **|** **${prefix}temizle** = Sohbetteki En Fazla 100 Mesajı Siler.
\n<a:Arrowr:939612945619488778> **|** **${prefix}nuke** = Kanalı Siler Ve Aynı isim/yetkilerle Tekrar açar.
\n<a:Arrowr:939612945619488778> **|** **${prefix}rol-al** = Belirttiğiniz Kullanıcıdan Rol Alırsınız.
\n<a:Arrowr:939612945619488778> **|** **${prefix}rol-ver** = Belirttiğiniz Kullanıcıya Rol Verirsiniz.
\n<a:Arrowr:939612945619488778> **|** **${prefix}mute-log** = Mute Görevlisi Log Kanalını Ayarlarsınız.
\n<a:Arrowr:939612945619488778> **|** **${prefix}mute-görevli** = Mute Görevlisi Rolünü Ayarlarsınız.
\n<a:Arrowr:939612945619488778> **|** **${prefix}selam-sistemi** = Birisi selam verince botun otomatik cevap vermesini sağlarsınız.
\n<a:Arrowr:939612945619488778> **|** **${prefix}mute** = Etiketlediğiniz Kullanıcıyı Susturursunuz.
\n<a:Arrowr:939612945619488778> **|** **${prefix}unmute** = Mutelediğiniz Kullanıcının Mutesini Kaldırırsınız.`)
 .addField("**» Linkler**"," [Davet Et](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8) [Destek Sunucusu](https://discord.gg/47dqryjAr9)")
  .setColor('BLACK')
.setThumbnail(client.user.avatarURL())
.setFooter({text:`Komut ${message.author.tag} Tarafından Kullanıldı ! `})
message.channel.send({embeds: [moderasyon]})
 }
  if(args[0] == 'kayıt'){
  const kayıt = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Kayıt Komutları`)
.setColor('BLACK')
.setDescription(`
<a:Arrowr:939612945619488778> **|** **${prefix}kayıt-sistemi** = Kayıt Sistemini Açar/kapatır.
\n<a:Arrowr:939612945619488778> **|** **${prefix}kayıtayar** = Kayıt Rollerini/kanallarını Ayarlarsınız.
\n<a:Arrowr:939612945619488778> **|** **${prefix}kayıt-görevlisi-ver** = Kullanıcıya Kayıt Görevlisi Rolü Verir.
\n<a:Arrowr:939612945619488778> **|** **${prefix}kayıt-görevlisi-al** = Kullanıcıdan Kayıt Görevlisi Rolünü Alır.
\n<a:Arrowr:939612945619488778> **|** **${prefix}erkek** = erkek Kullanıcıları Kayıt Edersiniz.
\n<a:Arrowr:939612945619488778> **|** **${prefix}kız** = kız Kullanıcıları Kayıt edersiniz.
\n<a:Arrowr:939612945619488778> **|** **${prefix}kayıt** = erkek/kız Olmadan Direkt Kullanıcıları Kayıt Edersiniz.`)
   .addField("**» Linkler**"," [Davet Et](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8) [Destek Sunucusu](https://discord.gg/47dqryjAr9)")

  .setThumbnail(client.user.avatarURL())
.setFooter({text: `Komut ${message.author.tag} Tarafından Kullanıldı ! `})
message.channel.send({embeds: [kayıt]})
  }
  if(args[0] == 'sahip'){
  const sahip = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Sahip Komutları`)
.setColor('BLACK')
.setDescription(`
\n<a:Arrowr:939612945619488778> **|** **${prefix}bakım** = Botu Bakıma Alır.
\n<a:Arrowr:939612945619488778> **|** **${prefix}gold-ver** = Etiketlediğiniz Kullanıcıya Gold Üye Verir.
\n<a:Arrowr:939612945619488778> **|** **${prefix}gold-al** = Etiketlediğiniz Kullanıcının Gold Üyeliğini Bitirir.
\n<a:Arrowr:939612945619488778> **|** **${prefix}kod-oluştur** = Gold Üyelik İçin Gold Üye Kodu Oluşturur.
\n<a:Arrowr:939612945619488778> **|** **${prefix}blacklist** = Etiketlediğiniz Kullanıcıyı Blackliste Alır.`)
.addField("**» Linkler**"," [Davet Et](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8) [Destek Sunucusu](https://discord.gg/47dqryjAr9)")
 
  .setThumbnail(client.user.avatarURL())
.setFooter({text: `Komut ${message.author.tag} Tarafından Kullanıldı ! `})
message.channel.send({embeds: [sahip]})
  }
  
  if(args[0] == 'gold') {
    const embed = new discord.MessageEmbed()
.setColor('RANDOM')
.addField('**<a:Arrowr:939612945619488778>> Gold Sistemi Nedir ?**', 'Gold Sistemi, Bottaki Birçok Premium Komutu Kullanmanızı Sağlar. Gold Sistemini `Ücretli` & `Puan Sistemi` İle Alabilirsiniz.')
.addField('**<a:Arrowr:939612945619488778> Gold  Üyelik Nasıl Alınır ?**', 'Gold Üyelik Almak İçin; Sahibime Ulaşabilir, Botu sunucunuza Ekleyebilir(ekstra puan kazanıyorsunuz), Botun Olduğu Sunucularda Sohbet Ederek Ekstra Puan Kazanıp, p!gold-al @kişi Komutu İle İster Kendinize İster Arkadaşınıza 1 Günlük Gold Üyelik Alabilirsiniz.')
.addField('**<a:Arrowr:939612945619488778> Gold Sistemi Komutları**',`<a:Arrowr:939612945619488778>> **${prefix}günlük** = Günlük Puan Almanızı Sağlar\n<a:yon:805037800428142592> **${prefix}puan** = Kendinizin veya Etiketlediğiniz Kişinin Puanını Gösterir\n<a:yon:805037800428142592> **${prefix}gold-al** = Sahip Olduğunuz Puanlarla 1 Günlük Gold Üyelik Alırsınız`)
.addField("**» Linkler**"," [Davet Et](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8) [Destek Sunucusu](https://discord.gg/47dqryjAr9)")
.setTimestamp()
.setThumbnail(client.user.avatarURL({dynamic: true}))
message.channel.send({embeds: [embed]})
  }
}
exports.conf = {
enabled: true,
guildonly: false,
aliases: ['h', 'y', 'help'],
permlevel: 0
}
exports.help = {
name: 'yardım',
description: '',
usage: ''
}
