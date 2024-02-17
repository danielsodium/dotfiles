const mpris = await Service.import('mpris')

/** @param {import('types/service/mpris').MprisPlayer} player */
const Player = player => Widget.Button({
    onClicked: () => player.playPause(),
    child: Widget.Label().hook(player, label => {
        const { track_artists, track_title } = player;
        label.label = `${track_title}\n${track_artists[0]}`;
    }),
})

export const Media = () => Widget.Box({
    children: mpris.bind('players').transform(p => p.map(Player))
})