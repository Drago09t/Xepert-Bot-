// make sure to be happy in your life djs nerd

const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require('ms');

module.exports = {
  premiumOnly: false,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Get the ping of Bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const { client, inter } = interaction;
    const pinged = new EmbedBuilder()
      .setTitle('API latence')
      .setColor("White")
      .setDescription(`Pong! API latency is **${Math.round(client.ws.ping)} ms** 🛰️ , Last heartbeat calculated ago **${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })}**`)
      .setTimestamp();

    interaction.reply({ embeds: [pinged] });

  },
};