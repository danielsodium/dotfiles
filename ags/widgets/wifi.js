
const network = await Service.import('network')

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

const NetworkIcon = () => Widget.Stack({
    class_name: "system-icon",
    children: {
        wifi: WifiIndicator(),
        wired: WiredIndicator(),
    },
    shown: network.bind('primary').as(p => p || 'wifi'),
})

export { NetworkIcon };
