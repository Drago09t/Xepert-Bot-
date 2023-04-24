const { SlashCommandBuilder } = require("@discordjs/builders");

const command = new SlashCommandBuilder()
  .setName("iq")
  .setDescription("Performs IQ simulation.");

async function execute(interaction) {
  const iq = Math.floor(Math.random() * 101) + 50;

  await interaction.reply(`Your IQ is ${iq}!`);
}

module.exports = {
  data: command,
  execute,
};