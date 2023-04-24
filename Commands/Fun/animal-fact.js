const { ChatInputCommandInteraction, ApplicationCommandOptionType, AttachmentBuilder, SlashCommandBuilder } = require("discord.js");
const axios = require("axios").default;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fact")
    .setDescription("Get a random fact about an animal")
    .addStringOption((options) =>
      options.setName("animal")
        .setDescription("Select an anima to get a fact about")
        .setRequired(true)
        .addChoices(
          { name: "Dog", value: "dog" },
          { name: "Cat", value: "cat" },
          { name: "Panda", value: "panda" },
          { name: "Fox", value: "fox" },
          { name: "Koala", value: "koala" },
        )
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {
    await interaction.deferReply();
    const option = interaction.options.getString("animal");
    const imageObject = await axios.get(`https://some-random-api.ml/img/${option.replace("bird", "birb")}`);
    const factObject = await axios.get(`https://some-random-api.ml/facts/${option}`);

    const attachment = new AttachmentBuilder(imageObject.data.link, { name: "image.png" });
    interaction.editReply({ content: factObject.data.fact, files: [attachment] });
  },
};