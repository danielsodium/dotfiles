import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widget/Bar"
import DashWin from "./widget/DashWin"

App.start({
    css: style,
    main() {
        DashWin(),
        Bar(App.get_monitors()[0])
    },
})
