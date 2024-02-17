export const Padding = (name, {
    css = "",
    hexpand = true,
    vexpand = true,
} = {}) => Widget.EventBox({
    hexpand,
    vexpand,
    can_focus: false,
    child: Widget.Box({ css }),
    setup: w => w.on("button-press-event", () => App.toggleWindow(name)),
})

const PopupRevealer = (
    name,
    child,
    transition = "slide_right",
) => Widget.Box(
    { css: "padding: 1px;" },
    Widget.Revealer({
        transition,
        child: Widget.Box({
            class_name: "window-content",
            child,
        }),
        transitionDuration: 300,
        setup: self => self.hook(App, (_, wname, visible) => {
            if (wname === name) {
                if(visible) self.reveal_child = true;
                else self.reveal_child = false;
            }
        }),
    }),
)
const Layout = (name, child, transition) => (
    Widget.CenterBox({},
        Padding(name),
        Widget.CenterBox(
            { vertical: true },
            PopupRevealer(name, child, transition),
        ),
        Padding(name),
    )
)

export default ({
    name,
    child,
    layout = "center",
    transition,
    exclusivity = "ignore",
    ...props
}) => Widget.Window({
    name,
    class_names: [name, "popup-window"],
    popup: true,
    visible: false,
    keymode: "on-demand",
    exclusivity,
    layer: "top",
    anchor: ["top", "bottom", "left"],
    child: Layout(name, child, transition),
    ...props,
})