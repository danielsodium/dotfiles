import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js';
import Battery from 'resource:///com/github/Aylur/ags/service/battery.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';
import { Clock, SysTray } from './modules/modules.js'
import { Dashboard } from './dashboard.js'


// widgets can be only assigned as a child in one container
// so to make a reuseable widget, make it a function
// then you can simply instantiate one by calling it
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
        Clock(),
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
        Dashboard()
    ],
};
