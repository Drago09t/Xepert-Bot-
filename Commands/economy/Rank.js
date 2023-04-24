const {
  SlashCommandBuilder,
  EmbedBuilder,
  Embed,
  PermissionFlagsBits,
  Client,
  AttachmentBuilder,
} = require("discord.js");
const Levels = require("discord.js-leveling");
const Canvacord = require("canvacord");
const { profileImage } = require("discord-arts");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Get info about someones rank")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { options, guildId, user } = interaction;

    const member = options.getMember("user") || user;

    const target = options.getMember("member");

    await interaction.deferReply()

    const levelUser = await Levels.fetch(member.id, guildId);

    const embed = new EmbedBuilder();

    if (!levelUser)
      return interaction.followUp({
        content: "Seems like this user has not earned any xp so far",
        ephemeral: true,
      });

    var xpRequired = Levels.xpFor(levelUser.level + 1);

    const rawLeaderboard = await Levels.fetchLeaderboard(guildId, 10);
    const leaderboard = await Levels.computeLeaderboard(
      client,
      rawLeaderboard,
      true
    );
    const buffer = await profileImage(member.id, {
      borderColor: ['#000000', '#ffffff'],
      presenceStatus: member.presence?.status ?? 'invisible',
      badgesFrame: true,
      usernameColor: '#09ede6',
      customBackground: 'https://cdn.discordapp.com/attachments/1038452103233933392/1063241541243654144/3402026.png',
      customBadges: ['https://cdn.discordapp.com/attachments/1057666280649396285/1060327109437968434/20221106_175946_0000-removebg-preview.png'],
      squareAvatar: true,
      rankData: {
        currentXp: levelUser.xp,
        requiredXp: xpRequired,
        level: levelUser.level,
        barColor: "#09ede6",
      }
    })
    const Img = new AttachmentBuilder(buffer, { name: 'rank.png' })

    embed
      .setDescription(
        ` > **Here you can see your rank card if you want to see your rank card write /rank** `
      )
      .setColor("#36393F")
      .setFooter({ text: `${user.tag}'s Rank` })
      .setImage("attachment://rank.png")
      .setTitle(`***${user.tag}'s*** Rank Card`)
      .setURL(
        "https://discord.com/channels/996449906942287923/1054502717881581608"
      )
      .setTimestamp();

    return interaction.followUp({ embeds: [embed], files: [Img] });
  },
};


/**
 * @info Made by kaj/ updatet by shoczy
 * @info Support Discord https://discord.gg/kCh8cC2fEs
 */