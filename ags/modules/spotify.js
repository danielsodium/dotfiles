import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js'
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Utils from 'resource:///com/github/Aylur/ags/utils.js'

const PLAY_ICON = 'media-playback-start-symbolic';
const PAUSE_ICON = 'media-playback-pause-symbolic';
const PREV_ICON = 'media-skip-backward-symbolic';
const NEXT_ICON = 'media-skip-forward-symbolic';

/** @param {number} length */
function lengthStr(length) {
    const min = Math.floor(length / 60);
    const sec = Math.floor(length % 60);
    const sec0 = sec < 10 ? '0' : '';
    return `${min}:${sec0}${sec}`;
}

/** @param {import('types/service/mpris').MprisPlayer} player */
const Player = player => {
    const img = Widget.Box({
        class_name: 'img',
        vpack: 'start',
        css: player.bind('cover_path').transform(p => `
            background-image: url('${p}');
        `),
    });

    const title = Widget.Label({
        class_name: 'title',
        wrap: false,
        hpack: 'start',
        label: player.bind('track_title').transform(t => t.slice(0, 18)),
    });

    const artist = Widget.Label({
        class_name: 'artist',
        wrap: false,
        hpack: 'start',
        label: player.bind('track_artists').transform(a => a.join(', ').slice(0, 20)),
    });

    const positionSlider = Widget.Slider({
        class_name: 'position',
        draw_value: false,
        on_change: ({ value }) => player.position = value * player.length,
        setup: self => {
            const update = () => {
                self.visible = player.length > 0;
                self.value = player.position / player.length;
            };
            self.hook(player, update);
            self.hook(player, update, 'position');
            self.poll(1000, update);
        },
    });

    return Widget.Box(
            { class_name: 'player' },
            img,
            Widget.Box(

                {
                    vertical: true,
                    hexpand: false,
                },
                title,
                artist,
                positionSlider
            ),
    );
}

export default () => Widget.Box({
    vertical: true,
    css: 'padding: 1px', // small hack to make sure it is visible
    visible: Mpris.bind('players').transform(p => p.length > 0),
    children: Mpris.bind('players').transform(p => p.map(Player)),
});