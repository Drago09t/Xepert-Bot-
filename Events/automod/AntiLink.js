const { Client, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const automod = require("../../Models/automod");

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
    if (requireDB.AntiLink === false) return;

    const ragex =
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
    const embed = new EmbedBuilder()
      .setColor("#2f3136")
      .setDescription(`:warning: | <@${message.author.id}> has sent a link.`);

    if (ragex.test(message.content)) {
      try {
        await message.delete();
      } catch (err) {
        return;
      }

      const logChannel = client.channels.cache.get(requireDB.LogChannel);

      const msg = await message.channel.send({ embeds: [embed] });
      setTimeout(async () => {
        await msg.delete();
      }, 5000);
      logChannel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("#2f3136")
            .setDescription(
              `<@${message.author.id}> has sent a link.\n\`\`\`${message.content}\`\`\``
            ),
        ],
      });
    }
  },
};
