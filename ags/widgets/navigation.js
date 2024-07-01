
import Workspaces from "./workspaces.js"
import Pipe from "./pipe.js"

function Search() {
     return Widget.Box({
        class_name: "search",
        children: [
            Widget.Icon({ icon: "edit-find-symbolic" })
        ],
    })
}

function SideButton() {
     return Widget.Box({
        class_name: "sidebutton",
        children: [
            Widget.Icon({ icon: "sidebar-show-symbolic" })
        ],
    })
}
// layout of the bar
const Navigation = () => {
    return Widget.Box({
        spacing: 8,
        children: [
            Search(),
            SideButton(),
            Pipe(),
            Workspaces(),
        ],
    })
}

export default Navigation;

