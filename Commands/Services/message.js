const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  premiumOnly: true,
  data: new SlashCommandBuilder()
    .setName("message")
    .setDescription("Sends a message to a chosen user.")
    .setDMPermission(true)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to send the message to.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to send.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { options } = interaction;

    const user = options.getUser("user");
    const message = options.getString("message");

    if (user.id !== "1023810715250860105") {
      try {
        const channel = await user.createDM();
        await channel.send(
          `<@${interaction.user.id}> sent you the following message: \`${message}\``
        );
      } catch (err) {
        console.error(err);
        return interaction.reply({
          content: "Something went wrong. Please try again later.",
          ephemeral: true,
        });
      }

      return interaction.reply({
        content: `Successfully sent <@${user.id}> the following message: \`${message}\``,
        ephemeral: true,
      });
    } else {
      return interaction.reply({
        content:
          "The bot can't send messages to himself. Check the user and try again.",
        ephemeral: true,
      });
    }
  },
};