const {
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = {
  premiumOnly: false,
  data: new SlashCommandBuilder()
    .setName("help")

    .setDescription("Get a list of all the commands from the discord bot."),
  async execute(interaction) {

    const { client } = interaction;

    const emojis = {
      suggestions: "<:utility181:1082695793347141634>",
      reactionroles: "<a:9147_Wand_Pink:1078366939820326982>",
      premium: "<a:3587crown:1082383219820859554>",
      info: "<a:gaming_bongo_cat:1082731813459476550>",
      developer: "<a:NO_check:1082727435474325525>",
      economy: "<a:MTF_Credits:1082731156711149721>",
      applications: "<a:utility:1082696566319632494>",
      botshop: "<a:check_yes:1082727401513046016>",
      fun: "<a:christmas_popcat:963315093091786782>",
      giveaways: "<a:zzuu_babi_birthday:1082730617835364352>",
      moderation: "<a:error:1082727238014861433>",
      music: "<a:DP_amatcha_musicjam94:1091031672813793363>",
      roles: "<a:1003checkraveninha:1078366137965875310>",
      services: "<a:arrow1:1082725005760143362>",
      suggest: "<a:mrvl_milkandmocha_fun:1082731739656495134>",
      ticket: "<:ticket:1043589620140609567>",
      videos: "<a:bear_music_dance:1082727097832845343>",
      setup: "<:utilitybanhammer:1082695459325358101>",
      games: "<a:TPR_NitroHypesquad:850022722892595200>",
    };

    function getCommand(name) {
      const getCommandID = client.application.commands.cache
        .filter((cmd) => cmd.name === name) // Filter by command name
        .map((cmd) => cmd.id); // Map to just the ID property

      return getCommandID;
    }

    const directories = [
      ...new Set(client.commands.map((cmd) => cmd.folder)),
    ];

    const formatString = (str) =>
      `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {
      const getCommands = client.commands
        .filter((cmd) => cmd.folder === dir)
        .map((cmd) => {
          return {
            name: cmd.data.name,
            description:
              cmd.data.description ||
              "There is no description for this command.",
          };
        });

      return {
        directory: formatString(dir),
        commands: getCommands,
      };
    });

    const embed = new EmbedBuilder()
      .setDescription("See lists of commands by selecting a category down below!")
      .setImage(`https://media.discordapp.net/attachments/1091125302765289573/1091855055042388080/x7MHJvl_2.png`)
      .setColor("#e72c4f")
      .setAuthor({ name: `${client.user.username}'s Commands`, iconURL: client.user.avatarURL() });

    const components = (state) => [
      new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("help-menu")

          .setPlaceholder("Find a category")
          .setDisabled(state)
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `Commands from ${cmd.directory} category.`,
                emoji: emojis[cmd.directory.toLowerCase() || null],
              };
            })
          )
      ),
    ];

    const initialMessage = await interaction.reply({
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) =>
      interaction.user.id === interaction.member.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: ComponentType.StringSelect,
    });

    collector.on("collect", (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );

      const categoryEmbed = new EmbedBuilder()
        .setTitle(`${emojis[directory.toLowerCase() || null]}  ${formatString(directory)} commands`)
        .setImage(`https://media.discordapp.net/attachments/1091125302765289573/1091860821300215899/x7MHJvl_3.png`)
        .setDescription(
          `A list of all the commands categorized under ${directory}.`
        )
        .setColor("#e72c4f")
        .addFields(
          category.commands.map((cmd) => {
            return {
              name: `</${cmd.name}:${getCommand(cmd.name)}>`,
              value: `\`${cmd.description}\``,
              inline: true,
            };
          })
        );

      interaction.update({ embeds: [categoryEmbed] });
    });

    collector.on("end", () => {
      initialMessage.edit({ components: components(true) });
    });
  },
};