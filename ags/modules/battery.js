const battery = await Service.import('battery')

export const Battery = () => Widget.Box({
    class_name: 'battery',
    vertical: false,
    visible: battery.bind('available'),
    children: [
        Widget.Icon({
            icon: battery.bind('icon_name')
        }),
        Widget.Label({
            label: battery.bind('percent').transform(p => ` ${p}% `) 
        }),
        Widget.Label({
            label: battery.bind('time-remaining')
                .transform(s => `(${Math.floor(Math.floor(s/60)/60)}:${Math.floor((s/60)%60)})`)
        }),
        
    ],
});

