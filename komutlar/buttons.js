const {MessageActionRow ,Discord, MessageButton, MessageSelectMenu} = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args, interaction) => { 
const ayarlar = require('../ayarlar.json')
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix

const row = new MessageActionRow()
.setComponents(
    new MessageButton()
    .setCustomId('asd')
    .setLabel('Tıkla!')
    .setStyle('DANGER')
)




message.reply({content: 'Test mesajı!', components: [row]})
};
exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: '0'
};

exports.help = {
  name: 'button',
  description: '',
  usage: '',
  examples: ''
};