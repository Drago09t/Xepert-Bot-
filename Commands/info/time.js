const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js")


module.exports = {
  data: new SlashCommandBuilder()
    .setName("timer")
    .setDescription("Set a timer")
    .addIntegerOption((option) =>
      option
        .setName("seconds")
        .setDescription("The time in seconds")
        .setMinValue(1)
        .setMaxValue(86400)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reminder")
        .setDescription("What to remind you about")
        .setRequired(true)
    ),



  async execute(interaction) {
    const { options } = interaction;
    const time = options.getInteger("seconds")
    const subject = options.getString("reminder")
    const milliseconds = time * 1000

    const createdEmbed = new EmbedBuilder()
      .setColor(Colors.Greyple)
      .setTitle("Timer Set")
      .setAuthor({
        name: `${interaction.member.user.tag}'s Timer ⏱️`,
        iconURL: interaction.member.displayAvatarURL({
          size: 4096,
          dynamic: true,
        }),
      })
      .setDescription(
        `In **${time} seconds**, I will remind you about **${subject}**`
      )
      .setTimestamp()

    const doneEmbed = new EmbedBuilder()
      .setColor(Colors.DarkGold)
      .setTitle("Timer Up!")
      .setAuthor({
        name: `${interaction.member.user.tag}'s Timer ⏱️`,
        iconURL: interaction.member.displayAvatarURL({
          size: 4096,
          dynamic: true,
        }),
      })
      .setDescription(`**${subject}**\nTime set: **${time} seconds**`)
      .setTimestamp()

    await interaction.reply({
      embeds: [createdEmbed],
    })

    setTimeout(async () => {
      await interaction
        .reply({
          embeds: [doneEmbed],
        })
        .catch((err) => {
          return
        })
      interaction.member.send(
        `<@${interaction.member.id}> The timer you set **${time} seconds** ago is up! Reminder: **${subject}**`
      )
    }, milliseconds)
  }
}