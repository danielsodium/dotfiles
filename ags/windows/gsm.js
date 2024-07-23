const WINDOW_NAME = "gsm"

const session = Variable("?");

const Gsm = ({}) => {

    const shell = (self) => {
        const cmd = self.get_text();
        self.set_text("");

        let res = "";

        if (session.value == "?")
            res = Utils.exec(`/home/daniel/gsm/gsm ${cmd}`);
        else
            res = Utils.exec(`/home/daniel/gsm/gsm ${session.value} ${cmd}`);


        let parsed = {};
        parsed = JSON.parse(res.replaceAll('\"', '"'));
        console.log(parsed);

        if (Object.hasOwn(parsed, "run")) {

            console.log(parsed["run"]);
            Utils.execAsync(parsed["run"]);
        }
        if (Object.hasOwn(parsed, "close") && parsed["close"]) {
            App.toggleWindow("gsm");
        }
        if (Object.hasOwn(parsed, "output")) {
        }
        if (Object.hasOwn(parsed, "session")) {
            session.value = parsed["session"];
        }
    };


    const entry = Widget.Entry({
        hexpand: true,
        class_name: "gsm",
        on_accept: (self) => shell(self)
    });

    return Widget.Box({
        class_name: "launcher",
        children: [
            Widget.Label({
                class_name: "gsm-prompt",
                label: session.bind(), 
            }),
            entry,
        ],
        setup: self => self.hook(App, (_, windowName, visible) => {
            if (windowName !== WINDOW_NAME)
                return
            if (!visible) entry.set_text("");
        }),
    })
}

// there needs to be only one instance
const gsm = Widget.Window({
    name: WINDOW_NAME,
    class_name: WINDOW_NAME,
    setup: self => self.keybind("Escape", () => {
        App.closeWindow(WINDOW_NAME)
    }),
    visible: false,
    keymode: "exclusive",
    anchor: ["top"],
    margins: [5, 0, 0, 0],
    child: Gsm({
        width: 500,
        height: 200,
        spacing: 12,
    }),
})

export default gsm ;
