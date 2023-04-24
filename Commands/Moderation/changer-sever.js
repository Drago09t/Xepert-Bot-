const { SlashCommandBuilder } = require('discord.js');
const { Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, CommandInteraction, MessageSelectMenu, ModalBuilder, TextInputBuilder, TextInputStyle, PermissionsBitField, PermissionsFlagsBits } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("change-server")
    .setDescription("To change name")
    .addStringOption(option =>
      option.setName('name')
        .setDescription('name')
        .setRequired(true)
    ),

  async execute(interaction, options, args) {

    let xxs = interaction.options.getString('name')


    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: 'For Owners Only!', ephemeral: true })


    await interaction.guild.setName(xxs)

    await interaction.reply({ content: 'Changed successfully!', ephemeral: true })


  }
}

