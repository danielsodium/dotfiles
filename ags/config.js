import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js';
import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Battery from 'resource:///com/github/Aylur/ags/service/battery.js';
import SystemTray from 'resource:///com/github/Aylur/ags/service/systemtray.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js';
import Brightness from './brightness.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';

const popup = Variable(false);

// widgets can be only assigned as a child in one container
// so to make a reuseable widget, make it a function
// then you can simply instantiate one by calling it

const BatteryLabel = () => Widget.Box({
    class_name: 'battery',
    vertical: 1,
    visible: Battery.bind('available'),
    children: [

        Widget.Label({
            label: Battery.bind('percent').transform(p => {
                return `\n${p}\nBP`;
            }),
        }),    
    ],

});

const SysTray = () => Widget.Box({
    visible: false,
    vertical: 1,
    children: SystemTray.bind('items').transform(items => {
        return items.map(item => Widget.Button({
            child: Widget.Icon({ binds: [['icon', item, 'icon']] }),
            on_primary_click: (_, event) => item.openMenu(event),
            on_secondary_click: (_, event) => item.activate(event),
        }));
    }),
    setup: self => self.hook(popup, () => {
        self.visible = popup.value;
    })

});
const Workspaces = () => Widget.Box({
    vertical: true,
    class_name: 'workspaces',
    children: Hyprland.bind('workspaces').transform(ws => {
        return ws.map(({ id }) => Widget.Button({
            on_clicked: () => Hyprland.sendMessage(`dispatch workspace ${id}`),
            child: Widget.Icon({
                icon: Hyprland.active.workspace.bind('id')
                .transform(i => `${(i == id) ? 'radio-checked-symbolic' : 'radio-symbolic'}`)
            }),
        }));
    }),
});

const Tray = () => Widget.Revealer({

    reveal_child: false,
    transition_duration: 1000,
    transition: 'slide_right',
    child: SysTray,
});

const Clock = () => Widget.Button({
    class_name: 'clock',
    setup: self => {
        self.poll(1000, self => execAsync(['date', '+%I\n%M\n%p'])
            .then(date => self.label = date));
        popup.value = false;
    },


    on_clicked: () => {
        popup.value = !popup.value
    },

});

const Volume = () => Widget.Box({
    class_name: 'volume',
    css: 'min-width: 180px',
    children: [
        Widget.Icon().hook(Audio, self => {
            if (!Audio.speaker)
                return;

            const category = {
                101: 'overamplified',
                67: 'high',
                34: 'medium',
                1: 'low',
                0: 'muted',
            };

            const icon = Audio.speaker.is_muted ? 0 : [101, 67, 34, 1, 0].find(
                threshold => threshold <= Audio.speaker.volume * 100);

            self.icon = `audio-volume-${category[icon]}-symbolic`;
        }, 'speaker-changed'),
        Widget.Slider({
            hexpand: true,
            draw_value: false,
            on_change: ({ value }) => Audio.speaker.volume = value,
            setup: self => self.hook(Audio, () => {
                self.value = Audio.speaker?.volume || 0;
            }, 'speaker-changed'),
        }),
    ],
});

const Backlight = () => Widget.Box({
    class_name: 'brightness',
    css: 'min-width: 180px',
    children: [
        Widget.Icon({icon: "weather-clear-symbolic"}),
        Widget.Slider({
            draw_value: false,
            hexpand: true,
            on_change: self => Brightness.screen_value = self.value,
            value: Brightness.bind('screen-value'),
        }),
    ],
});



const startModules = () => Widget.Box({
    spacing: 1,
    vertical: true,
    children: [
        Workspaces()
    ]
})

const endModules = () => Widget.Box({
    spacing: 10,
    vertical: true,
    vpack: 'end',
    children: [
        SysTray(),
        BatteryLabel(),
        Clock(),
    ]
})

const dash = () => Widget.Box({
    spacing: 1,
    vertical: true,
    vpack: 'end',
    class_name: 'dashboard',
    children: [
        Volume(),
        Backlight(),
    ]
})


const Bar = (monitor = 0) => Widget.Window({
    name: `bar-${monitor}`, // name has to be unique
    class_name: 'bar',
    monitor,
    anchor: ['left', 'top', 'bottom'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
        vertical: true,
        start_widget: startModules(),
        end_widget: endModules()
    }),
});

const Welcomer = (monitor = 0) => Widget.Window({
    name: `Welcomer-${monitor}`, // name has to be unique
    class_name: 'welcome',
    monitor,
    anchor: ['left', 'bottom'],
    exclusivity: 'ignore',
    layer: 'background',
    child: Widget.Label({
        class_name : "message",
        setup: self => execAsync(['date', '+%A\n%m.%d.%Y']).then(date => self.label = date)
    })
});

const Dashboard = (monitor = 0) => Widget.Window({
    name: `dash-${monitor}`, // name has to be unique
    class_name: 'dash',
    monitor,
    anchor: ['top', 'right'],
    exclusivity: 'ignore',
    layer: 'background',
    child: dash()
})



import { monitorFile } from 'resource:///com/github/Aylur/ags/utils.js';

monitorFile(
    `${App.configDir}/style.css`,
    function () {
        App.resetCss();
        App.applyCss(`${App.configDir}/style.css`);
    },
);

export default {
    style: App.configDir + '/style.css',
    windows: [
        Bar(),
        Welcomer(),
        Dashboard(),
    ],
};
