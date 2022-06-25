const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban eine Person.')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('Member Sperren')
      .setRequired(true))
    .addStringOption(option =>
      option.setName('raison')
      .setDescription('Grund für den Bann')
      .setRequired(false)),
  async execute(interaction, client) {
    const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({
      content: 'Du hast nicht die erforderliche Berechtigung, um diesen Befehl auszuführen! (`BAN_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'Die Person, die Sie bannen möchten, steht über dich',
      ephemeral: true
    });

    if (!user.bannable) return interaction.reply({
      content: 'Die Person, die Sie bannen möchten, ist über mir! Ich kann ihn daher nicht bannen.',
      ephemeral: true
    });

    if (interaction.options.getString('raison')) {
      user.ban({
        reason: interaction.options.getString('raison'),
        days: 1
      });
      interaction.reply({
        content: `**${user.user.tag}** Wurde erfolgreich verbannt!`
      });
    } else {
      user.ban({
        days: 1
      });
      interaction.reply({
        content: `**${user.user.tag}** Wurde erfolgreich verbannt!`
      });
    };
  },
};