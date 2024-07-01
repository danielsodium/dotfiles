const audio = await Service.import("audio")
const battery = await Service.import("battery")
const systemtray = await Service.import("systemtray")
const network = await Service.import('network')

import Pipe from "./pipe.js";
import Media from "./media.js";


const WifiIndicator = () => Widget.Box({
    children: [
        Widget.Icon({
            icon: network.wifi.bind('icon_name'),
        })
    ],
})

const WiredIndicator = () => Widget.Icon({
    icon: network.wired.bind('icon_name'),
})

const NetworkIndicator = () => Widget.Stack({
    children: {
        wifi: WifiIndicator(),
        wired: WiredIndicator(),
    },
    shown: network.bind('primary').as(p => p || 'wifi'),
})

function Volume() {
    const icons = {
        101: "overamplified",
        67: "high",
        34: "medium",
        1: "low",
        0: "muted",
    }

    function getIcon() {
        const icon = audio.speaker.is_muted ? 0 : [101, 67, 34, 1, 0].find(
            threshold => threshold <= audio.speaker.volume * 100)

        return `audio-volume-${icons[icon]}-symbolic`
    }

    const icon = Widget.Icon({
        icon: Utils.watch(getIcon(), audio.speaker, getIcon),
    })

    const slider = Widget.Slider({
        hexpand: true,
        draw_value: false,
        on_change: ({ value }) => audio.speaker.volume = value,
        setup: self => self.hook(audio.speaker, () => {
            self.value = audio.speaker.volume || 0
        }),
    })

    return Widget.Box({
        class_name: "volume",
        children: [icon, slider],
    })
}

    
function BatteryLabel() {
    const value = battery.bind("percent").as(p =>
        `  ${Math.floor(p)}%`)
    const icon = battery.bind("percent").as(p =>
        `battery-level-${Math.floor(p / 10) * 10}-symbolic`)

    return Widget.Box({
        class_name: "battery",
        visible: battery.bind("available"),
        children: [
            Widget.Icon({ icon }),
            Widget.Label({label :value})
        ],
    })
}

function SysTray() {
    const items = systemtray.bind("items")
        .as(items => items.map(item => Widget.Button({
            child: Widget.Icon({ icon: item.bind("icon") }),
            on_primary_click: (_, event) => item.activate(event),
            on_secondary_click: (_, event) => item.openMenu(event),
            tooltip_markup: item.bind("tooltip_markup"),
        })))

    return Widget.Box({
        children: items,
    })
}

const SystemWindow = () => {
    return Widget.Box({
        class_name: "syswindow",
        vertical: true,
        spacing: 8,
        children: [
            BatteryLabel(),
            Volume(),
            SysTray()
        ],
    })
}

export default SystemWindow;
