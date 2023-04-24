const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const User = require("../../Models/User.js");

module.exports = {
  premiumOnly: true,
  Cooldown: true,
  data: new SlashCommandBuilder()
    .setName("xp-remove")
    .setDescription("Remove xp to a member")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Target @member")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("xp")
        .setDescription("Amount of Xp to remove")
        .setRequired(false)
    ),
  async execute(interaction) {
    const member = interaction.options.getMember("member");
    const xpAmount = interaction.options.getNumber("xp");
    if (member.id == interaction.user.id) {
      return interaction.reply({
        content: "You can't remove your own xp!",
        ephemeral: true,
      });
    }
    let user;

    const guildId = member.guild.id;
    const userId = member.user.id;

    user = await User.findOne({ guildId, userId });

    if (!user) {
      user = {
        level: 1,
        xp: 0,
      };
    }
    if (user.xp < xpAmount) {
      interaction.reply({ content: `<@${userId}> doesn't have that much xp`, ephemeral: true });
    }
    user.xp -= xpAmount;
    user.save();
    interaction.reply({ content: `Removed ${xpAmount} from <@${userId}>`, ephemeral: true });
    const embed = new EmbedBuilder()
      .setTitle(`D:`)
      .setDescription(
        `<@${interaction.user.id}> removed ${xpAmount} to your account`
      )
      .setColor("Random");
    try {
      member.send({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
  },
};
