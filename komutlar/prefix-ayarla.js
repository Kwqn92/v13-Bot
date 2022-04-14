const {Discord,MessageEmbed} = require('discord.js')
const data = require('quick.db')

exports.run = async (client, message, args) => {   
    const ayarlar = require('../ayarlar.json');
    let prefix = await data.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;


    if(!message.member.permissions.has("ADMINISTRATOR")) {
        const a = new MessageEmbed()
        .setTitle(`Bu komutu kullanabilmek için Yönetici Yetkisine sahip olmalısın!`)
        .setColor('RED')
        message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
        return;
    }
    //---------------------------------------------\\
    let q = ''
let pref = data.get(`prefixs_${message.guild.id}`)
if(!pref) pref = 'p!'; else {
    q = pref.toString()
}
    if(!args[0]) {
        const a = new MessageEmbed()
        .setAuthor({iconURL: client.user.avatarURL(), name: `${client.user.username} - Otorol Sistemi`})
        .addField('Prefix Ayarla',`${prefix}prefix ayarla **[prefix]**`,true)
        .addField('Prefix Sıfırla',`${prefix}prefix sıfırla`,true)
        .setFooter({text: `Şu ana kadar ayarlanmış olan prefixleri görmek için: ${prefix}prefix list`})
        .setColor('GREEN')
        message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 15000);})
        console.log(pref)
    }
    if(args[0] == 'list' || args[0] == 'List' || args[0] == 'liste' || args[0] == 'Liste') {
        const b = new MessageEmbed()
        .setColor('GOLD')
        .setDescription('**'+pref+'**')
        message.reply({embeds: [b]}).then(x => {setTimeout(() => {x.delete()}, 15000);})
    }
    if(args[0] == 'ayarla' || args[0] == 'Ayarla') {
        let prefiks = args[1]
        if(!prefiks) {
            const a = new MessageEmbed()
            .setTitle(`Lütfen Bir prefix Belirt!`)
            .setColor('RED')
            message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
            return;
        }
        data.set(`prefix_${message.guild.id}`,prefiks)
        data.push(`prefixs_${message.guild.id}`,prefiks)
        const a = new MessageEmbed()
        .setTitle(`Prefix Başarıyla ${prefiks} olarak ayarlandı!`)
        .setColor('GREEN')
        message.reply({embeds: [a]}).then(x => {setTimeout(() => {x.delete()}, 5000);})
        return;
    }
    if(args[0] == 'sıfırla' || args[0] == 'Sıfırla') {
        data.delete(`prefix_${message.guild.id}`)
        data.delete(`prefixs_${message.guild.id}`)
        const a = new MessageEmbed()
        .setTitle(`Prefix Başarıyla Sıfırlanı!`)
        .setColor('GREEN')
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
  name: 'prefix',
  description: '',
  usage: '',
};