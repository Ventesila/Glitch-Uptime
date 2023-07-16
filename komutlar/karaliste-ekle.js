const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("croxydb")

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('karaliste-ekle')
    .setDescription('Bot sahibi özel komutu.')
    .setDMPermission(false)
    .addUserOption(option =>
        option
            .setName('kullanıcı')
            .setDescription('Karalisteye eklenecek kullanıcıyı belirtin.')
            .setRequired(true))
    .addStringOption(option =>
        option
            .setName('sebep')
            .setDescription('Karalisteye ekleme sebebini belirtin.')
            .setRequired(true)),
  
    async execute(client, interaction) {   
     
      const YetkiYok = new EmbedBuilder()
      .setDescription(`<:no:1117512106833612883> Bu komutu kullanabilmek için **Bot sahibi** olmalısın.`)
      .setColor('Red')
      .setTitle("Hata")
        
      const KaralisteAlınamaz = new EmbedBuilder()
        .setDescription(`<:no:1117512106833612883> **Bot sahipleri bu komutdan etkilenmez.**`)
        .setColor('Red')
        .setTitle("Hata")
      
      if(interaction.user.id !== "1112637700604960880" && interaction.user.id !== "788717157919096854" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB" && interaction.user.id !== "SAHİB"){
      return interaction.reply({embeds: [YetkiYok]});
}
      const kullanıcı = interaction.options.getUser('kullanıcı');
      const sebep = interaction.options.getString('sebep');
      const Karaliste = db.fetch(`Karaliste_${kullanıcı.id}`)
      
      const KaralisteEklendi = new EmbedBuilder()
      .setDescription(`<:yes:1117512041419251752> ${kullanıcı} **adlı kullanıcı karalisteye eklendi, artık botu kullanamayacak.**`)
      .setColor('Green')
      .setTitle("Başarılı")
      
      const KaralisteyeAlındı = new EmbedBuilder()
         .setColor("Red")
         .setTitle("Bir kullanıcı karalisteye eklendi")
         .addFields({name: ` **Kullanıcı adı**`, value: `${kullanıcı}`})
         .addFields({name: ` **Kullanıcı tagı**`, value: `${kullanıcı.tag}`})
         .addFields({name: ` **Kullanıcı id**`, value: `${kullanıcı.id}`})
         .addFields({name: ` **Yetkili adı**`, value: `${interaction.user}`})
         .addFields({name: ` **Yetkili tagı**`, value: `${interaction.user.tag}`})
         .addFields({name: ` **Yetkili id**`, value: `${interaction.user.id}`})
         .addFields({name: ` **Karaliste eklenme sebebi**`, value: `${sebep}`})
      
    //  if(interaction.member.roles.cache.has === "1064963065726111754") return interaction.reply({embeds: [KaralisteAlınamaz]})
     
      if(!Karaliste) {
        
      db.set(`Karaliste_${kullanıcı.id}`, true)
      db.set(`KaralisteSebep_${kullanıcı.id}`, sebep)
    //  db.delete(`UptimeLink_${kullanıcı.id}`)
      interaction.reply({embeds: [KaralisteEklendi]})
      client.channels.cache.get("1094246311424950292").send({embeds: [KaralisteyeAlındı]})
     
      } else {
  
      const KaralistedeVar = new EmbedBuilder()
      .setDescription(`:x: ${kullanıcı} **adlı kullanıcı zaten karalistede bulunuyor.**`)
      .setColor('Red')
      .setTitle("Hata")
      
      interaction.reply({embeds: [KaralistedeVar]})
  
       }
    }
}


