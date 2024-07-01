const notifications = await Service.import("notifications")

import Navigation from "./widgets/navigation.js"
import System from "./widgets/system.js"
import SystemWindow from "./widgets/syswin.js"
import PopupWindow from "./popupwindow.js"
import AppLauncher from "./widgets/launcher.js"

function Notification() {
    const popups = notifications.bind("popups")
    return Widget.Box({
        class_name: "notification",
        visible: popups.as(p => p.length > 0),
        children: [
            Widget.Icon({
                icon: "preferences-system-notifications-symbolic",
            }),
            Widget.Label({
                label: popups.as(p => p[0]?.summary || ""),
            }),
        ],
    })
}


function syswin(monitor = 0) {
    return Widget.Window({
        name: `syswin`, // name has to be unique
        class_name: "syswin",
        visible: false,
        monitor,
        anchor: ["bottom", "right"],
        margins: [5, 5, 5, 5],
        child: SystemWindow()
    })
}




function Bar(monitor = 0) {
    return Widget.Window({
        name: `bar-${monitor}`, // name has to be unique
        class_name: "bar",
        monitor,
        anchor: ["bottom", "left", "right"],
        exclusivity: "exclusive",
        margins: [0, 5, 5, 5],
        child: Widget.CenterBox({
            css:"min-height: 50px; padding: 0px 20px 0px 20px;",
            start_widget: Navigation(),
            end_widget: System(),
        }),
    })
}



App.config({
    style: "./style.css",
    windows: [

        AppLauncher,
        syswin(),
        Bar(),
    ],
})

