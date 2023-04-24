const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const welcomeSchema = require('../../Models/welcomeSchema');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('welcomesetup')
    .setDescription('Create a server welcome system')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // Solo administrador
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Choose the channel where you want the welcomes to come out')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('welcomedesc')
        .setDescription('Enter the message description')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('welcomeimg')
        .setDescription('Insert the image you want to output')
        .setRequired(false)
    ),
  async execute(interaction) {
    const { options } = interaction
    const welcomeChannel = options.getChannel('channel');
    const welcomeMessage = options.getString('welcomedesc') || ' ';
    const welcomeImage = options.getString('welcomeimg') || ' ';

    if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: "I don't have permissions for this", ephemeral: true })
    }

    welcomeSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
      if (!data) {
        await welcomeSchema.create({
          Guild: interaction.guild.id,
          Channel: welcomeChannel.id,
          MessageDes: welcomeMessage,
          ImagenDesc: welcomeImage
        })
        await interaction.reply({ content: "The welcome system was created correctly", ephemeral: true })
      }
      if (err) {
        await interaction.reply({ content: "An error has occurred", ephemeral: true })
        console.log(err);
      }
    })
  }
};