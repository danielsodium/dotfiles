const battery = await Service.import("battery")
const powerProfiles = await Service.import('powerprofiles')


const icon = battery.bind("icon_name");

function BatteryIcon() {
    return Widget.Icon({ 
        class_name: "system-icon",
        icon: icon
    });
}

const BatteryLabel = Widget.CenterBox({
    class_name: "dash-title",
    start_widget: Widget.Label({
        hpack: "start",
        label: "Battery"
    }),
    end_widget: Widget.Box({
        hpack: "end"
    },
        Widget.Label({
            label: battery.bind("percent").as(p => `${Math.floor(p)}%  `)
        }),
        Widget.Icon({
            icon: icon
        }),
    )
});

const label = Widget.Label({
    label: powerProfiles.bind('active_profile'),
})

const profileButton = (profile) => Widget.Button({
    class_name: powerProfiles.bind("active_profile").as((active) => {
        return (active === profile.Profile ? "button-active profile-button": "profile-button")
    }),
    child: Widget.Label({ label: profile.Profile}),
    on_clicked: () => {
        powerProfiles.active_profile = profile.Profile;
    },
})

const PowerProfiles = Widget.Box({
    class_name: "battery-profiles",
    vertical: true,
    setup: self => {
        self.children = powerProfiles.profiles.map(profileButton);
    }
});

const BatteryDash = Widget.Box({
    class_name: "dash-widget",
    vertical: true,
    visible: battery.bind('available'),
},
    BatteryLabel,
    PowerProfiles
)

export { BatteryIcon, BatteryDash }
