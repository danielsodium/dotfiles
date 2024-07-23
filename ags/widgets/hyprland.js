const hyprland = await Service.import('hyprland')

const dispatch = ws => hyprland.messageAsync(`dispatch workspace ${ws}`);

const Hyprland = Widget.Box({
    class_name: "widget",
}, Widget.EventBox({
    onScrollUp: () => dispatch('+1'),
    onScrollDown: () => dispatch('-1'),
    child: Widget.Box({
        class_name: "hyprland-button-box",
        children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Label({
            attribute: i,
            label: "",
            class_name: "hyprland-button",
            setup: (self) => self.hook(hyprland, () => {
                    self.toggleClassName(
                      "active",
                      hyprland.active.workspace.id === i,
                    );
            })
        })),

        setup: self => self.hook(hyprland, () => self.children.forEach(btn => {
            btn.visible = hyprland.workspaces.some(ws => ws.id === btn.attribute);
        })),
    }),
}));

export default Hyprland;
