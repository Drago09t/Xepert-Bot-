const { SlashCommandBuilder, ChannelType, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('changelogs')
    .setDescription('Announce a change to the bot')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
      option.setName('bot')
        .setDescription('Bot that made the changes')
        .setRequired(true)
    )
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Channel has sent')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('added')
        .setDescription('Added Changelogs')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('removed')
        .setDescription('Removed Changelogs')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('fixed')
        .setDescription('Fixed Changelogs')
        .setRequired(false)
    ),
  async execute(interaction) {
    const { options, guild, member } = interaction
    const channel = interaction.options.getChannel('channel');
    const bot = options.getUser('bot')
    const added = options.getString('added') || ' '
    const fixed = options.getString('fixed') || ' '
    const removed = options.getString('removed') || ' '

    const embed = new EmbedBuilder()
      .setTitle(`**NEW UPDATE**`)
      .setDescription(`${bot} *Changelog* \n\n[+] Added: **${added}**\n\n[%] Fixed: **${fixed}**\n\n[-] Removed:**${removed}**`)
      .setFooter({ text: "YNAIOB support", iconURL: 'https://media.tenor.com/o0e6lIDmtJAAAAAM/goku-black.gif' })
      .setTimestamp()


    let sendChannel = channel.send({ embeds: [embed] })
    if (!sendChannel) {
      return interaction.reply({ content: 'There was an error! Try Againg later', ephemeral: true })
    } else {
      return interaction.reply({ content: 'Sent successfully', ephemeral: true })
    }

  }
};