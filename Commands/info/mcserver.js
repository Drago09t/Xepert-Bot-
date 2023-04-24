const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


module.exports = {
  data: new SlashCommandBuilder()
    .setName('mcserver')
    .setDescription('Shows information about a Minecraft server')
    .addStringOption(option =>
      option.setName('server')
        .setDescription('IP address or hostname of the Minecraft server')
        .setRequired(true)),
  async execute(interaction) {
    const serverAddress = interaction.options.getString('server');

    try {
      const response = await fetch(`https://api.mcsrvstat.us/2/${serverAddress}`);
      const data = await response.json();

      if (data.online === true) {
        const serverStatus = 'Online';
        const playerCount = data.players ? data.players.online : 0;

        const embed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle(`Minecraft Server Information: ${serverAddress}`)
          .addFields(
            { name: 'Status', value: `${serverStatus}` })
          .addFields({ name: 'Players Online', value: `${playerCount}` }
          )
          .setTimestamp();

        interaction.reply({ embeds: [embed] });
      } else {
        const serverStatus = 'Offline';

        const embed = new
          EmbedBuilder()
          .setColor('#0099ff')
          .setTitle(`Minecraft Server Information: ${serverAddress}`)
          .addFields(
            { name: 'Status', value: `${serverStatus}` },
          )
          .setTimestamp();

        interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      console.error(error);
      interaction.reply(`An error occurred while retrieving information for server: ${serverAddress}`);
    }
  },
};