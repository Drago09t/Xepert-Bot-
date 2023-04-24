const { SlashCommandBuilder } = require("discord.js")
const pointSchema = require('../../Models/point')


module.exports = {
  data: new SlashCommandBuilder()
    .setName("points")
    .setDescription("Create or delete your points account!")
    .addStringOption(
      option =>
        option.setName("options")
          .setDescription("Options")
          .addChoices(
            { name: "Create", value: "create" },
            { name: "Delete", value: "delete" },
          ).setRequired(true)),

  async execute(interaction, client) {
    const { options, user, guild } = interaction

    let Data = await pointSchema.findOne({ User: user.id }).catch(err => { })

    switch (options.getString("options")) {
      case "create": {
        if (Data)
          return interaction.reply({ content: `You already have the point system setup! ${user}` })


        Data = new pointSchema({
          User: user.id,
          Points: 1
        })

        await Data.save()

        interaction.reply({ content: "You set up the point system for yourself!", ephemeral: true })

      }
        break;

      case "delete": {
        if (!Data) return interaction.reply({ content: "Please create an account for yourself first :)", ephemeral: true })

        await Data.delete()

        interaction.reply({ content: " System Deleted! " })

      }
        break;



    }
  }
}

