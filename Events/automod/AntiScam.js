const {
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");
const automod = require("../../Models/automod");
const AntiScam = require("../../Systems/ScamLinks.json");

module.exports = {
  name: "messageCreate",
  /**
 * 
 * @param {Client} client 
 */
  async execute(message, client) {
    if (!message.guild) return;
    if (message.author.bot) return;

    const guild = message.guild;

    let requireDB = await automod.findOne({ Guild: guild.id });
    if (!requireDB) return;
    if (requireDB.AntiScam === false) return;

    const scamlinks = AntiScam.known_links;

    const embed = new EmbedBuilder()
      .setColor("#2f3136")
      .setDescription(
        `:warning: | <@${message.author.id}> has sent a harmful link.`
      );

    for (let i in scamlinks) {
      if (message.content.toLowerCase().includes(scamlinks[i].toLowerCase())) {
        try {
          await message.delete();
        } catch (err) {
          return;
        }

        const logChannel = client.channels.cache.get(requireDB.LogChannel);
        const msg = await message.channel.send({ embeds: [embed] });

        const buttons = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Kick")
            .setEmoji("⚒️")
            .setCustomId("kick")
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setLabel("Ban")
            .setEmoji("🔨")
            .setCustomId("ban")
            .setStyle(ButtonStyle.Danger)
        );
        setTimeout(async () => {
          await msg.delete();
        }, 5000);
        const text = await logChannel.send({
          embeds: [
            new EmbedBuilder()
              .setColor("#2f3136")
              .setDescription(
                `<@${message.author.id}> has sent a harmful link.\n\`\`\`${message.content}\`\`\``
              ),
          ],
          components: [buttons],
        });
        const col = text.createMessageComponentCollector();
        col.on("collect", async (m) => {
          switch (m.customId) {
            case "kick":
              if (!m.member.permissions.has(PermissionFlagsBits.KickMembers))
                return m.reply({
                  content: "You don't have permission to kick",
                  ephemeral: true,
                });
              const embed = new EmbedBuilder()
                .setTitle("Kicked")
                .setDescription(
                  `You have been kicked from \`${message.guild.name}\` for sending scam links`
                )
                .setColor("#2f3136");

              m.reply({
                content: `Kicked ${message.author.tag}`,
                ephemeral: true,
              });
              message.member
                .send({
                  embeds: [embed],
                })
                .then(() => {
                  message.member.kick({ reason: "Sending scam links" });
                });
              break;
            case "ban":
              if (!m.member.permissions.has(PermissionFlagsBits.KickMembers))
                return m.reply({
                  content: "You don't have permission to ban",
                  ephemeral: true,
                });
              const embedss = new EmbedBuilder()
                .setTitle("Ban")
                .setDescription(
                  `You have been Banned from \`${message.guild.name}\` for sending scam links`
                )
                .setColor("#2f3136");
              m.reply({
                content: `banned ${message.author.tag}`,
                ephemeral: true,
              });
              message.member
                .send({
                  embeds: [embedss],
                })
                .then(() => {
                  message.member.ban({ reason: "Sending scam links" });
                });
              break;
          }
        });
      }
    }
  },
};