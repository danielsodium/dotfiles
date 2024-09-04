const mpris = await Service.import('mpris')

const FALLBACK_ICON = "audio-x-generic-symbolic"
const PLAY_ICON = "media-playback-start-symbolic"
const PAUSE_ICON = "media-playback-pause-symbolic"
const PREV_ICON = "media-skip-backward-symbolic"
const NEXT_ICON = "media-skip-forward-symbolic"

const Player = player => Widget.Box({
    class_name: "dash-media",
    css: player.bind("cover_path").transform(p => `
background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)),url('${p}');`),
},
    Widget.CenterBox({
        hexpand: true,
        class_name: "media-label",
        start_widget: Widget.Box({
            vertical: true,
        },
            Widget.Label({
                truncate: 'end',
                maxWidthChars: 24,
                wrap: true,
                class_name: "media-cut",
                hpack: "start",
            }).hook(player, label => {
                    const { track_title } = player;
                    label.label = `${track_title.split('(')[0].split('-')[0]}`;
                }),
            Widget.Label({
                truncate: 'end',
                maxWidthChars: 24,
                wrap: true,
                class_name: "media-cut",
                hpack: "start",
            }).hook(player, label => {
                    const { track_artists } = player;
                    label.label = `${track_artists[0]}`;
                }),

        ),
        end_widget: Widget.Box({
            hpack: "end"
        },
            Widget.Button({
                class_name: "media-button",
                on_clicked: () => player.previous(),
                visible: player.bind("can_go_prev"),
                child: Widget.Icon(PREV_ICON),
            }),


            Widget.Button({
                class_name: "media-button",
                on_clicked: () => player.playPause(),
                visible: player.bind("can_play"),
                child: Widget.Icon({
                    icon: player.bind("play_back_status").transform(s => {
                        switch (s) {
                            case "Playing": return PAUSE_ICON
                            case "Paused":
                            case "Stopped": return PLAY_ICON
                        }
                    }),
                }),
            }),

            Widget.Button({
                class_name: "media-button",
                on_clicked: () => player.next(),
                visible: player.bind("can_go_next"),
                child: Widget.Icon(NEXT_ICON),
            })



        )
    })
)

const MediaDash = Widget.Box({
    vertical: true,
    children: mpris.bind('players').as(p => p.map(Player))
})

export { MediaDash }
