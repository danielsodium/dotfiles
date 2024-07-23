import Hyprland from "../widgets/hyprland.js";
import { Clock } from "../widgets/clock.js";
import Divider from "../widgets/divider.js";
import System from "../widgets/system.js";

const Bar = Widget.Window({
    name: `bar`, // name has to be unique
    class_name: "bar",
    monitor : 0,
    anchor: ["bottom", "left", "right"],
    exclusivity: "exclusive",
    margins: [0, 200, 0, 200],
    child: Widget.CenterBox({
        class_name: "bar",
        start_widget: Hyprland,
        end_widget: Widget.Box({
            hpack: "end",
        },
            System,
            Divider,
            Clock
        )
    }),
})

export default Bar;
