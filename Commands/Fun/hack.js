
const { SlashCommandBuilder } = require("discord.js")
const ms = require("ms")


module.exports = { 
  premiumOnly: false,
  data: new SlashCommandBuilder()
	.setName("hack")
	.setDescription("heck someone")
	.addUserOption((option) =>
		option
			.setName("target")
			.setDescription("The user to heck")
			.setRequired(true)
	),


  async execute(interaction) {
    const { channel, client, options } = interaction;
	const victim = options.getMember("target")

	await interaction
		.editReply(`Hacking ${victim.displayName}....`)
		.catch((err) => {})

	const time = "1s"
	setTimeout(async function () {
		await interaction
			.reply(
				`Finding ${victim.displayName}'s `
			)
			.catch((err) => {})
	}, ms(time))

	const time1 = "6s"
	setTimeout(async function () {
		await interaction
			.editReply(
				`E-Mail: ${victim.displayName}@gmail.com \nPassword: ********`
			)
			.catch((err) => {})
	}, ms(time1))

	const time2 = "9s"
	setTimeout(async function () {
		await interaction
			.editReply("")
			.catch((err) => {})
	}, ms(time2))

	const time3 = "15s"
	setTimeout(async function () {
		await interaction
			.editReply("")
			.catch((err) => {})
	}, ms(time3))

	const time4 = "21s"
	setTimeout(async function () {
		await interaction
			.editReply("")
			.catch((err) => {})
	}, ms(time4))

	const time5 = "28s"
	setTimeout(async function () {
		await interaction
			.editReply("")
			.catch((err) => {})
	}, ms(time5))

	const time6 = "31s"
	setTimeout(async function () {
		await interaction.editReply("").catch((err) => {})
	}, ms(time6))

	const time7 = "38s"
	setTimeout(async function () {
		await interaction
			.editReply("")
			.catch((err) => {})
	}, ms(time7))

	const time8 = "41s"
	setTimeout(async function () {
		await interaction
			.editReply(`Finished hacking ${victim.displayName}`)
			.catch((err) => {})
	}, ms(time8))
 }
};