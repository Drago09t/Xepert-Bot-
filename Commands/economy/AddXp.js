const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const User = require("../../Models/User.js");

module.exports = {
  premiumOnly: false,
  Cooldown: true,
  data: new SlashCommandBuilder()
    .setName("xp-add")
    .setDescription("Add xp to a member")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Target @member")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option.setName("xp").setDescription("Amount of Xp").setRequired(false)
    ),
  async execute(interaction) {
    const member = interaction.options.getMember("member");
    const xpAmount = interaction.options.getNumber("xp");
    if (member.id == interaction.user.id) {
      return interaction.reply({
        content: "You can't add xp to yourself",
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
    user = await User.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $inc: { xp: xpAmount },
      },
      { upsert: true, new: true }
    );

    let { xp, level } = user;

    if (xp >= level * 100) {
      ++level;
      xp = 0;

      await User.updateOne(
        {
          guildId,
          userId,
        },
        {
          level,
          xp,
        }
      );
    }
    interaction.reply({ content: `Added ${xpAmount} to <@${userId}>`, ephemeral: true });
    const embed = new EmbedBuilder()
      .setTitle(`GG!`)
      .setDescription(
        `<@${interaction.user.id}> added ${xpAmount} xp to your account now you are ${level}`
      )
      .setColor("Random");
    try {
      member.send({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
  },
};
