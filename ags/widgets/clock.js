
const time = Variable('', {
    poll: [1000, 'date "+%-I:%M %p"'],
});

const date = Variable('', {
    poll: [1000, 'date "+%A\n%B %d, %Y"'],
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
    },
    Widget.Label({
        class_name: "dash-clock",
        label: date.bind()
    })
);

export { Clock, Day } ;
