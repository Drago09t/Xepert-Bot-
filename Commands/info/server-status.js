const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {
  premiumOnly: false,
  data: new SlashCommandBuilder()
    .setName("status-members")
    .setDescription("Let's see what the status of the members are in this guild").addStringOption(option =>
      option.setName("status")
        .setDescription("Please select the status")
        .setRequired(true)
        .addChoices(
          { name: "Online", value: "Online" },
          { name: "Offline", value: "Offline" },
        )
    ),

  async execute(interaction, client) {

    const { options, guildId, member, user, guild, customId } = interaction;

    const status = options.getString("status");

    guild.members.fetch({ withPresences: true }).then(fetchedMembers => {
      const totalOnline = fetchedMembers.filter(member => member.presence?.status === 'online');
      const totalOffline = fetchedMembers.filter(member => member.presence?.status === 'offline');

      if (status === `Online`) {

        interaction.reply({ content: `${totalOnline.size} are online in this guild!`, ephemeral: true })
        console.log(`There are currently ${totalOnline.size} members online in this guild!`);

      }
      // Currently problems with the api with finding offline members

      if (status === `Offline`) {

        interaction.reply({ content: `${totalOffline.size} are offline in this guild!`, ephemeral: true })
        console.log(`There are currently ${totalOffline.size} members offline in this guild!`);

      }
      /*
        interaction.reply({content: `${totalOffline.size} are online in this guild!`, ephemeral: true})
        interaction.reply({content: `${totalOnline.size} are online in this guild!`, ephemeral: true})
        console.log(`There are currently ${totalOnline.size} members online in this guild!`);
        console.log(`There are currently ${totalOffline.size} members offline in this guild!`);
      
      */
      /////////////CREDIT: ON PROF.!!!!!!!!!!!!!!!!!!//////////////////////////////////////////////////
      /////////////CREDIT: ON PROF.!!!!!!!!!!!!!!!!!!//////////////////////////////////////////////////
      /////////////CREDIT: ON PROF.!!!!!!!!!!!!!!!!!!//////////////////////////////////////////////////

      /////////////CREDIT: ON PROF.!!!!!!!!!!!!!!!!!!//////////////////////////////////////////////////
      /////////////CREDIT: ON PROF.!!!!!!!!!!!!!!!!!!//////////////////////////////////////////////////
      /////////////CREDIT: ON PROF.!!!!!!!!!!!!!!!!!!//////////////////////////////////////////////////
      /////////////CREDIT: ON PROF.!!!!!!!!!!!!!!!!!!//////////////////////////////////////////////////


    });

  }

}