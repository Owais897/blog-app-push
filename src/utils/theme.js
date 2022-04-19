import { _onThemeChange, _setTheme } from "../components/RootWrapper";

const STORAGE_KEY = "__theme_color__";

let ThemeColor;

const colors = [
  "#1890ff",
  "#87B73D",
  "#7F009F",
  "#FF0600",
  "#005CCC",
  "#FF7000",
  "#A48111",
  "#045D56",
  "#FFBC2B",
];

async function set(color) {
  await window.less.modifyVars({
    "@primary-color": color,
  });
  ThemeColor = color;
  localStorage.setItem(STORAGE_KEY, color);
  _setTheme(color);
}

function get() {
  let color = ThemeColor || localStorage.getItem(STORAGE_KEY);
  if (!color) {
    color = colors[0];
    localStorage.setItem(STORAGE_KEY, color);
    ThemeColor = color;
  }
  return color;
}

const Theme = {
  set,
  get,
  on_change: _onThemeChange,
  colors,
};

export default Theme;
