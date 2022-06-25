const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Gibt die Infos für den Bot.'),
  async execute(interaction, client) {
    const embed = new client.discord.MessageEmbed()
      .setColor('ff9600')
      .setAuthor('Bot Info', client.user.avatarURL())
      .setDescription('WrldWide\n\nDanke für deine Interesse, über mich zu zeigen.\n\nBot Entwickler <@825013296239345664>')
      .setFooter(client.config.footerText, client.user.avatarURL())
      .setTimestamp();

    await interaction.reply({
      embeds: [embed]
    });
  },
};