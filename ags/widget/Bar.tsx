import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable, GLib, bind } from "astal"
import Hyprland from "gi://AstalHyprland"
import Tray from "gi://AstalTray"
import Dashboard from "./Dashboard"

const time = Variable("").poll(1000, 'date +"%I\n%M\n%p"')
const hypr = Hyprland.get_default()

function SysTray() {
    const tray = Tray.get_default()

    return <box vertical={true} className="Tray">
        {bind(tray, "items").as(items => items.map(item => {
            if (item.iconThemePath)
                App.add_icons(item.iconThemePath)

            const menu = item.create_menu()

            return <button
                className="icon"
                tooltipMarkup={bind(item, "tooltipMarkup")}
                onDestroy={() => menu?.destroy()}
                onClickRelease={self => {
                    menu?.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
                }}>
                <icon gIcon={bind(item, "gicon")} />
            </button>
        }))}
    </box>
}


function Workspaces() {

    return <box valign={Gtk.Align.CENTER} vexpandSet={false} vertical={true} className="Workspaces">

        {bind(hypr, "workspaces").as(wss => wss
            .filter(ws => !(ws.id >= -99 && ws.id <= -2)) // filter out special workspaces
            .sort((a, b) => a.id - b.id)
            .map(ws => (
                <box
                    className={bind(hypr, "focusedWorkspace").as(fw =>
                        ws === fw ? "ws focused" : "ws unfocused")}
                    vexpand={false}>
                </box>
            ))
        )}
    </box>
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
    return <window
        name={"Bar"}
        className={"Bar"}
        marginTop={5}
        marginBottom={5}
        marginLeft={5}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP
            | Astal.WindowAnchor.LEFT
            | Astal.WindowAnchor.BOTTOM}
        application={App}>

        <box>
            <Dashboard />
            <box className="Bar" vertical={true}>
                <box vexpand valign={Gtk.Align.START}></box>
                <Workspaces vexpand valign={Gtk.Align.CENTER} />
                <box vertical={true} vexpand valign={Gtk.Align.END}>
                    <SysTray />
                    <button>
                        <label label={time()} />
                    </button>
                </box>
            </box>
        </box>

    </window>
}
