import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React, { useCallback } from "react";
import { useLang } from "../../hooks/useLang";
import Lang from "../../utils/i18n";

export default function LangChanger({ style }) {
  const langId = useLang()[3];

  const onClick = useCallback((e) => {
    Lang.set(e.key);
  }, []);

  const menu = (
    <Menu onClick={onClick}>
      {Object.keys(Lang.langs).map((langId) => (
        <Menu.Item style={{ textTransform: "capitalize" }} key={langId}>
          {langId.toUpperCase()} - {Lang.langs[langId].translations.lang_name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown trigger="click" overlay={menu}>
      <Button
        style={{
          textTransform: "uppercase",
          borderRadius: 999,
          ...(style || {}),
        }}
      >
        {langId} <DownOutlined />
      </Button>
    </Dropdown>
  );
}
