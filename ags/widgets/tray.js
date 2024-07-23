const systemtray = await Service.import('systemtray')

const SysTrayItem = item => Widget.Button({
    class_name: "tray-item",
    child: Widget.Icon().bind('icon', item, 'icon'),
    tooltipMarkup: item.bind('tooltip_markup'),
    onPrimaryClick: (_, event) => item.openMenu(event),
    onSecondaryClick: (_, event) => item.activate(event),
});

const TrayDash = Widget.Box({
    class_name: "dash-widget",
    children: systemtray.bind('items').as(i => i.map(SysTrayItem))
});

export { TrayDash }
