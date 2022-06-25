const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Füge jemanden hinzu, zum Ticket')
    .addUserOption(option =>
      option.setName('target')
      .setDescription('@Mitglied, das zum Ticket hinzugefügt werden soll')
      .setRequired(true)),
  async execute(interaction, client) {
    const chan = client.channels.cache.get(interaction.channelId);
    const user = interaction.options.getUser('target');

    if (chan.name.includes('ticket')) {
      chan.edit({
        permissionOverwrites: [{
          id: user,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
          id: interaction.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
          {
            id: client.config.roleSupport,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
      ],
      }).then(async () => {
        interaction.reply({
          content: `<@${user.id}> wurde dem Ticket hinzugefügt!`
        });
      });
    } else {
      interaction.reply({
        content: 'Du bist nicht auf einem Ticket!',
        ephemeral: true
      });
    };
  },
};
