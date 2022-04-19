import React, { useEffect, useState } from "react";
import Lang from "../../utils/i18n";
import Theme from "../../utils/theme";

let setCssFromOutside;
let _setTheme_;
let _setLangId_;
let _cb_lang_;
let _cb_theme_;

export const LangContext = React.createContext();
export const ThemeContext = React.createContext();
export const _setTheme = (val) => _setTheme_ && _setTheme_(val);
export const _setLang = (val) => _setLangId_ && _setLangId_(val);

export function setPopoverWidth(width) {
  setCssFromOutside(`
    .ant-popover {
        width: ${width};
      }      
    `);
}

export function openFile({ accept, multiple = true, onChange }) {
  const ip = document.getElementById("global_file_input");
  if (accept) ip.setAttribute("accept", accept);
  if (multiple) ip.setAttribute("multiple", multiple);
  if (onChange) ip.onchange = (e) => onChange && onChange(e.target.files);
  ip.click();
}

export function _onLangChange(cb) {
  _cb_lang_ = cb;
}

export function _onThemeChange(cb) {
  _cb_theme_ = cb;
}

export default function RootWrapper({ children }) {
  const [css, setCss] = useState();
  const [theme, setTheme] = useState(Theme.get());
  const [langId, setLangId] = useState(Lang.get().id);

  useEffect(() => {
    setCssFromOutside = setCss;
    _setTheme_ = setTheme;
    _setLangId_ = setLangId;
  }, []);

  useEffect(() => {
    typeof _cb_lang_ === "function" && _cb_lang_(Lang.get());
    // document.documentElement.dir = Lang.langs[langId].rtl ? "rtl" : "ltr";
  }, [langId]);

  useEffect(() => {
    typeof _cb_theme_ === "function" && _cb_theme_(Theme.get());
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: Theme.set }}>
      <LangContext.Provider value={{ langId, setLangId: Lang.set }}>
        {children}
        {css ? <style>{css}</style> : null}
        <input id="global_file_input" type="file" style={{ display: "none" }} />
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}
