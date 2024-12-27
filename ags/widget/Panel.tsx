import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable, GLib, bind } from "astal"
import Wp from "gi://AstalWp"
import Brightness from "./Brightness"
import PowerProfiles from "gi://AstalPowerProfiles"
const date = Variable("").poll(1000, 'date +"%A\n%B %d, %Y"')

function BatterySaver() {
    const powerprofiles = PowerProfiles.get_default()
    const savebattery = Variable(false)

    function setupSaver() {
        if (powerprofiles.activeProfile == "power-saver")
            savebattery.set(true)
        else
            savebattery.set(false)
    }

    function toggleSaver() {
        savebattery.set(!savebattery.get())
        if (savebattery.get())
            powerprofiles.set_active_profile("power-saver")
        else
            powerprofiles.set_active_profile("balanced")
    }

    return <box>
        <button setup={setupSaver} onClicked={toggleSaver} className={bind(savebattery).as(v => v ? "panel-button on" : "panel-button off")}>
            <icon icon={"battery-level-20-symbolic"} />
        </button>
    </box>
}

function Sliders() {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!
    const brightness = Brightness.get_default()

    return <box vertical className="sliders">
        <box className="audio-slider">
            <icon icon={bind(speaker, "volumeIcon")} />
            <slider
                hexpand
                onDragged={({ value }) => speaker.volume = value}
                value={bind(speaker, "volume")}
            />

        </box>
        <box className="brightness-slider">
            <icon icon={'display-brightness-symbolic'} />
            <slider
                hexpand
                value={bind(brightness, "screen")}
                onDragged={({ value }) => brightness.screen = value} />
        </box>
    </box>
}


export default function Panel() {
    return (
        <box vertical className="panel">
            <box vertical valign={Gtk.Align.START} className="panel-strip">
                <BatterySaver />
            </box>
            <box vertical valign={Gtk.Align.START} className="panel-strip">
                <Sliders />
            </box>

        </box>
    )
}