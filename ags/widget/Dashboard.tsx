import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable, GLib, bind } from "astal"
import Panel from "./Panel"
import Battery from "./Battery"

const date = Variable("").poll(1000, 'date +"%A\n%B %d, %Y"')

export default function Dashboard() {
    return (<revealer
        revealChild={false}
        setup={(self) => {
            App.connect('window-toggled', (app) => {
                const win = app.get_window("Dashboard");
                const vis = win?.get_visible();
                if (win?.name === "Dashboard") {
                    self.set_reveal_child(vis ?? false);
                }
            });
        }}
        transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
        transitionDuration={400}
    >
        <box vertical className="dashboard">
            <box className="dash-title">
                <label label={date()} />
            </box>
            <box vexpand ></box>
            <Panel valign={Gtk.Align.END}/>
            <Battery />
        </box>
    </revealer>)
}