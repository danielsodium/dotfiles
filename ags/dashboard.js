
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { Backlight } from './modules/backlight.js'
import { Volume } from './modules/volume.js'
import { SysTray } from './modules/modules.js'
import { Battery } from './modules/battery.js'
import { Applauncher } from './modules/launcher.js'
import Media from './modules/spotify.js'
import StackState from "./modules/stackstate.js";
import { timeout, exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js';
import PopupWindow from './popup.js';
const DashState = new StackState("Search");


export const Dashboard = (monitor = 0) => PopupWindow({
    name: `dash`, // name has to be unique
    monitor,
    visible: false,
    layer: 'top',
    keymode: "on-demand",
    popup: true,
    anchor: ['left', 'top', 'bottom'],

    child: Widget.CenterBox({
        spacing: 1,
        vertical: true,
        class_name: 'dash',
        start_widget: Widget.Box({
            spacing: 1,
            vertical: true,
            children: [
                Widget.Box({
                    children: [Widget.Label({
                        class_name: 'clock',
                        setup: self => execAsync(['date', '+%-I:%M %p']).then(date => self.label = date)
                    }),]
                }),
                Widget.Box({
                    children: [Widget.Label({
                        class_name: 'date',
                        setup: self => execAsync(['date', '+%m/%d/%Y\n%A']).then(date => self.label = date)
                    }),]
                }),
                Applauncher()
            ]
        }),
        end_widget: Widget.Box({
            vertical: true,
            vpack: 'end',
            children: [
                Media(),
                SysTray(),
                Battery(),
                Volume(),
                Backlight(),
            ]
        })
    })
    
})

function toggle(value) {

    const current = DashState.value;
    if (current == value && App.getWindow("dash").visible) App.closeWindow("dash");
    else {
        App.openWindow("dash");
        LauncherState.value = value;
    }

}

globalThis.toggleLauncher = () => toggle("Search");