const { query } = await Service.import("applications")
const WINDOW_NAME = "applauncher"

const selection = Variable(null);


const Applauncher = ({ width = 500, height = 500, spacing = 12 }) => {
    // list of application buttons
    let applications = query("")

    // container holding the buttons
    // repopulate the box, so the most frequent apps are on top of the list
    function repopulate() {
        applications = query("")
        selection.value = null;
    }

    // search entry
    const entry = Widget.Entry({
        hexpand: true,
        class_name: "launcher",

        // to launch the first item on Enter
        on_accept: () => {
            // make sure we only consider visible (searched for) applications
	    const results = applications.filter((item) => item.visible);
            if (results[0]) {
                App.toggleWindow(WINDOW_NAME)
                results[0].launch()
            }
        },

        // filter out the list
        on_change: ({ text }) => applications.forEach(item => {
            item.visible = item.match(text ?? "")
            if ((selection == null || !selection.visible) && text !== "") {
                const results = applications.filter((item) => item.visible);
                if (results[0]) {
                    selection.value = results[0].icon_name;
                }
                else {
                    selection.value = null;
                }
            }
            else if (text === "") selection.value = null;
        }),
    })

    return Widget.Box({
        class_name: "launcher",
        children: [
            Widget.Icon({ 
                class_name: "launcher",
                size: 20,
                icon: "edit-find-symbolic" 
            }),
            entry,
            Widget.Icon({
                class_name: "launcher",
                size: 20,
                icon: selection.bind()

            })
        ],
        setup: self => self.hook(App, (_, windowName, visible) => {
            if (windowName !== WINDOW_NAME)
                return

            // when the applauncher shows up
            if (visible) {
                repopulate()
                entry.text = ""
                entry.grab_focus()
            }
        }),
    })
}

// there needs to be only one instance
const applauncher = Widget.Window({
    name: WINDOW_NAME,
    class_name: WINDOW_NAME,
    setup: self => self.keybind("Escape", () => {
        App.closeWindow(WINDOW_NAME)
    }),
    visible: false,
    keymode: "exclusive",
    anchor: ["top"],
    margins: [5, 0, 0, 0],
    child: Applauncher({
        width: 500,
        height: 200,
        spacing: 12,
    }),
})

export default applauncher;
