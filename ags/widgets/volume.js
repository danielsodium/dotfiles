const audio = await Service.import("audio");

function VolumeIcon() {
    const icons = {
        101: "overamplified",
        67: "high",
        34: "medium",
        1: "low",
        0: "muted",
    }

    function getIcon() {
        const icon = audio.speaker.is_muted ? 0 : [101, 67, 34, 1, 0].find(
            threshold => threshold <= audio.speaker.volume * 100)

        return `audio-volume-${icons[icon]}-symbolic`
    }

    return Widget.Icon({
        class_name: "system-icon",
        icon: Utils.watch(getIcon(), audio.speaker, getIcon),
    })
}

function MicrophoneIcon() {
    const icons = {
        66: "high",
        34: "medium",
        1: "low",
        0: "muted",
    }

    function getIcon() {
        const icon = audio.microphone.is_muted ? 0 : [101, 66, 34, 1, 0].find(threshold => threshold <= audio.microphone.volume * 100)
        return `microphone-sensitivity-${icons[icon]}-symbolic`
    }

    return Widget.Icon({
        class_name: "system-icon",
        icon: Utils.watch(getIcon(), audio.microphone, getIcon),
    })
}

const VolumeLabel = Widget.CenterBox({
    class_name: "dash-title",
    hpack: "start",
    start_widget: Widget.Label({
        label: "Volume"
    })
});

const VolumeSlider = (type = 'speaker') => Widget.Slider({
    hexpand: true,
    drawValue: false,
    onChange: ({ value }) => audio[type].volume = value,
    value: audio[type].bind('volume'),
})

const SpeakerSlider = Widget.Box({
    class_name: "dash-inner-widget",
    vertical: true,
    hpack: "start",
},
    Widget.Label({
        class_name: "volume-title",
        hpack: "start",
        label: audio.speaker.bind("description")
    }),
    Widget.Box({},
        VolumeIcon(),
        VolumeSlider('speaker')
    )
);

const MicSlider = Widget.Box({
    class_name: "dash-inner-widget",
    vertical: true,
    hpack: "start",
},
    Widget.Label({
        class_name: "volume-title",
        hpack: "start",
        label: audio.microphone.bind("description")
    }),
    Widget.Box({},
        MicrophoneIcon(),
        VolumeSlider('microphone')
    )
);

const VolumeDash = Widget.Box({
    vertical: true,
    hexpand: true,
    class_name: "dash-widget",
},
    VolumeLabel,
    SpeakerSlider,
    MicSlider
);


export { VolumeIcon, VolumeDash }
