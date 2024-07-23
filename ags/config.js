import Bar from "./windows/bar.js"
import Launcher from "./windows/launcher.js"
import Gsm from "./windows/gsm.js"
import Dash from "./windows/dash.js"

App.config({
    style: "./css/style.css",
    windows: [
        Bar,
        Launcher,
        Gsm,
        Dash,
    ],
})
