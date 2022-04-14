const dc = require("discord.js")
exports.run = async(client, message, args) => {

  if(!message.member.permissions.has("ADMINISTRATOR")) return;
  let channelp = message.channel.parentID
 message.channel.delete(message.channel).then
  message.channel.clone().then(z => {
    let kanal = z.guild.channels.cache.find(c => c.name === z.name && c.position === z.position)
    kanal.setParent(
    kanal.guild.channels.cache.find(channel => channel.id === channelp))
    const embed = new dc.MessageEmbed()
    .setTitle(" Bu Kanal Başarıyla Nukelandı!")
    .setColor("ORANGE")
    .setImage("https://cdn.discordapp.com/attachments/779937117300195338/779937292528910347/unnamed.gif")
    z.send({embeds: [embed]}).then(x => { setTimeout(() => {x.delete()}, 5000)})
    })
  };
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ["nuke"],
  permLevel: 0
}
exports.help = {
  name: "nuke"
  }