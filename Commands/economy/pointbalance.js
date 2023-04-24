const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const pointSchema = require('../../Models/point')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("point-balance")
    .setDescription(" Check how many points you have !"),

  async execute(interaction, client) {
    let Data = await pointSchema.findOne({ User: interaction.user.id })

    if (!Data) {
      interaction.reply({ content: `Sorry ${interaction.user} but you dont have an account!`, ephermal: true })
    }
    if (Data) {
      const data = new EmbedBuilder()
        .setColor('Blue')
        .setDescription(`You have ${Data.Points} points ${interaction.user}`)

      interaction.reply({ embeds: [data] })
    }
  }
}