const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { execute } = require('./point')
const pointSchema = require('../../Models/point')


module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-points")
    .setDescription(" Add points to a user ")
    .addNumberOption(option =>
      option.setName("number")
        .setDescription("Number of points to add")
        .setRequired(true))
    .addUserOption(option =>
      option.setName("user")
        .setDescription("User to give points to")
        .setRequired(true)),

  async execute(interaction, client) {
    const amount = interaction.options.getNumber("number")
    const target = interaction.options.getUser("user")
    let Data = await pointSchema.findOne({ User: target.id })
    let UserD = await pointSchema.findOne({ User: interaction.user.id })
    if (interaction.user.id === target.id) interaction.reply({ content: `${interaction.user} you are not allowed to give your self points silly :smile:` })
    if (interaction.user.id === target.id) return; // so it doesnt over lap if you chose your own self if you dont have an account!

    if (!UserD) {
      interaction.reply({ content: `Sorry ${interaction.user} you must have an account make one using </points:1092344289444507769> comamnd`, ephermal: true })
    }
    if (!Data) {
      interaction.reply({ content: `Sorry but ${target} doesnt have an account please ask him to make an account!  `, ephermal: true })
    }


    if (UserD && Data) {

      Data.Points += amount

      await Data.save();


      const embed = new EmbedBuilder()
        .setColor('DarkGrey')
        .setDescription(`You have given ${amount} to ${target}. Have fun ${target}!\n  User now has ${Data.Points}`)

      interaction.reply({ embeds: [embed] })
    }
  }
}