const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");
const logSchema = require("../../Models/Logs");
let newdata;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-logs")
    .setDescription("Setup your logging channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((options) =>
      options
        .setName("channel")
        .setDescription("Channel for logging")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { channel, guildId, options } = interaction;
    const logChannel = options.getChannel("channel");
    const embed = new EmbedBuilder();

    const Data = await logSchema.findOne({ Guild: guildId }).catch((err) => {});
    if (!Data) {
      newdata = new logSchema({
        Guild: guildId,
        Channel: logChannel.id,
      });
      newdata.save();
      interaction.reply({
        content: "**Everything is setup and ready to go**",
        embeds: [
          embed
            .setDescription("Successfully setup audit log system")
            .setColor("Green")
            .setTimestamp(),
        ],
      });
    } else {
      logSchema.deleteOne({ Guild: guildId });
      newdata = new logSchema({
        Guild: guildId,
        Channel: logChannel.id,
      });
      newdata.save();
      interaction.reply({
        content: "**Everything is setup and ready to go**",
        embeds: [
          embed
            .setDescription("Successfully setup audit log system with a new channel and deleted old one")
            .setColor("Green")
            .setTimestamp(),
        ],
      });
    }
  },
};