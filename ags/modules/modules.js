
import SystemTray from 'resource:///com/github/Aylur/ags/service/systemtray.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { exec, execAsync } from 'resource:///com/github/Aylur/ags/utils.js';

export const Clock = () => Widget.Button({
    class_name: 'clocktwo',
    setup: self => {
        self.poll(1000, self => execAsync(['date', '+%I\n%M\n%p'])
            .then(date => self.label = date));
    }
});

export const SysTray = () => Widget.Box({
    visible: false,
    class_name: "sys",
    vertical: 0,
    children: SystemTray.bind('items').transform(items => {
        return items.map(item => Widget.Button({
            child: Widget.Icon().bind('icon', item, 'icon'),
            tooltipMarkup: item.bind('tooltip_markup'), 
            on_primary_click: (_, event) => item.openMenu(event),
            on_secondary_click: (_, event) => item.activate(event),
        }));
    })

});