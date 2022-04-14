const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');


module.exports = client => {
  console.log(`[BOT] | BOT AKTIF!!`);
  console.log(`[BOT] | (${client.user.username}) HAZIR !
  ‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒`);


  client.user.setStatus("idle");
  client.user.setActivity("_ƤᾋҬȒὋƝ Bot V2 Yayında!", { type: "STREAMING"}); //// TYPE - WATCHING , PLAYING , LISTENING gibi değiştirilebilir.
  console.log(`ABILERE SELAM ÇATIŞMAYA DEWAM`);

};
