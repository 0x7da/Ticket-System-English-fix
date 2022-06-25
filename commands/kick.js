const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick ein Member.')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('Member Kicken')
      .setRequired(true))
    .addStringOption(option =>
        option.setName('raison')
        .setDescription('Grund für denn Kick')
        .setRequired(false)),
  async execute(interaction, client) {
    const user = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.options.getUser('target').id);
    const executer = client.guilds.cache.get(interaction.guildId).members.cache.get(interaction.user.id);

    if (!executer.permissions.has(client.discord.Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({
      content: 'Du hast nicht die erforderliche Berechtigung, um diesen Befehl auszuführen! (`KICK_MEMBERS`)',
      ephemeral: true
    });

    if (user.roles.highest.rawPosition > executer.roles.highest.rawPosition) return interaction.reply({
      content: 'Die Person, die Sie kicken möchten, steht über dich',
      ephemeral: true
    });

    if (!user.kickable) return interaction.reply({
      content: 'Die Person, die Sie Kicken möchten, ist über mir! Ich kann ihn daher nicht kicken.',
      ephemeral: true
    });

    if (interaction.options.getString('raison')) {
      user.kick(interaction.options.getString('raison'))
      interaction.reply({
        content: `**${user.user.tag}** Wurde erfolgreich gekickt!`
      });
    } else {
      user.kick()
      interaction.reply({
        content: `**${user.user.tag}** Wurde erfolgreich gekickt!`
      });
    };
  },
};