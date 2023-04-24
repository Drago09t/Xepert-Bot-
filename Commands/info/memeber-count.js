// A member count command for discord.js version 14! (Including bot count and user count)

const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

const embed = new EmbedBuilder();

module.exports = {
    data: new SlashCommandBuilder()
    .setName("member-count")
    .setDescription("Shows the amount of members in this server!"),
    async execute(interaction) {

        const memberCount = (await interaction.guild.members.fetch()).filter(member => !member.user.bot).size;
        const totalCount = interaction.guild.memberCount;
        const botCount = (await interaction.guild.members.fetch()).filter(member => member.user.bot).size;

        interaction.reply({embeds: [embed.setDescription(`
        There are a total of **${totalCount}** members in this server! Bots: **${botCount}** - Users: **${memberCount}**!
        `).setColor('Orange')]})
    },
};