import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable, GLib, bind } from "astal"
import Battery from "gi://AstalBattery"

function secondsToHMS(seconds: number) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);

    // Ensure hours and minutes are always two digits
    let hoursFormatted = String(hours).padStart(2, '0');
    let minutesFormatted = String(minutes).padStart(2, '0');

    return `${hoursFormatted}:${minutesFormatted}`;
}
export default function BatteryPercent() {

    const bat = Battery.get_default()
    return <box className="Battery"
        visible={bind(bat, "isPresent")}>
        <icon icon={bind(bat, "batteryIconName")} />
        <label label={bind(bat, "percentage").as(p =>
            ` ${Math.floor(p * 100)}%`
        )} />
        <label label={bind(bat, "timeToEmpty").as(p =>
            ` (${secondsToHMS(p)})`
        )} />
    </box>
}