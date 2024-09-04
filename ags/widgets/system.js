import { VolumeIcon } from "./volume.js";
import { BatteryIcon } from "./battery.js";
import { NetworkIcon } from "./wifi.js";

const System = Widget.Button({
    class_name: "widget bar-system",
    child: Widget.Box({},
        VolumeIcon(),
        NetworkIcon(),
        BatteryIcon(),
    ),
    on_primary_click: () => { 
        App.ToggleWindow("dash"); 
    }
})

export default System;
