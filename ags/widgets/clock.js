
const time = Variable('', {
    poll: [1000, 'date "+%-I:%M %p"'],
});

const weekday = Variable('', {
    //poll: [1000, 'date "+%A\n%B %d, %Y"'],
    poll: [10000, '/home/daniel/.config/ags/widgets/date.sh'],
});

const date = Variable('', {
    //poll: [1000, 'date "+%A\n%B %d, %Y"'],
    poll: [1000, 'date "+%Y년 %-m월 %-d일"'],
});

const Clock = Widget.Box({
    class_name: "widget clock",

    },
    Widget.Label({
        class_name: "clock-label",
        label: time.bind()
    })
);

const Day = Widget.Box({
    class_name: "clock-widget",
    vertical: true,
    hpack: "start",
    },
    Widget.Label({
        hpack: "start",
        class_name: "dash-clock",
        label: weekday.bind()
    }),
    Widget.Label({
        hpack: "start",
        class_name: "dash-clock",
        label: date.bind()
    })
);

export { Clock, Day } ;
