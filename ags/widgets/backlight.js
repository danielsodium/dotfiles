import brightness from '../services/brightness.js';

const slider = Widget.Slider({
    hexpand: true,
    drawValue: false,
    on_change: self => brightness.screen_value = self.value,
    value: brightness.bind('screen-value'),
});

const label = Widget.CenterBox({
    class_name: "dash-title",
    hpack: "start",
    start_widget: Widget.Label({
        label: "Brightness"
    })
});

const BacklightDash = Widget.Box({
    vertical: true,
    class_name: "dash-widget",
},
    label,
    Widget.Box({
        vertical: true,
        hpack: "start",
        class_name: "dash-inner-widget"
    },
        Widget.Box({},
            Widget.Icon({
                class_name: "system-icon",
                icon: "display-brightness-symbolic"
            }),
            slider
        )
    )
);

export { BacklightDash };
