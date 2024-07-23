import { Day } from "../widgets/clock.js";
import { BatteryDash } from "../widgets/battery.js";
import { VolumeDash } from "../widgets/volume.js";
import { TrayDash } from "../widgets/tray.js";
import { BacklightDash } from "../widgets/backlight.js";
import { MediaDash } from "../widgets/media.js";

const DashWidgets = Widget.Box({
    class_name: "dash",
    vertical: true,
    vpack: "start",
},
    Day,

    MediaDash,
    BatteryDash,
    VolumeDash,
    BacklightDash,
    TrayDash,
);

const Dash = Widget.Window({
    name: `dash`, // name has to be unique
    class_name: "dash",
    monitor : 0,
    anchor: ["left", "top", "bottom"],
    layer: "overlay",
    visible: false,
    margins: [5, 0, 5, 0],
    child: DashWidgets,
    setup: self => self.keybind("Escape", () => {
        App.closeWindow(WINDOW_NAME)
    }),
})

export default Dash;
