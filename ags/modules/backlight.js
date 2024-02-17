
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Brightness from './brightness.js';

export const Backlight = () => Widget.Box({
    class_name: 'brightness',
    css: 'min-width: 180px',
    children: [
        Widget.Icon({icon: "weather-clear-symbolic"}),
        Widget.Slider({
            draw_value: false,
            hexpand: true,
            on_change: self => Brightness.screen_value = self.value,
            value: Brightness.bind('screen-value'),
        }),
    ],
});