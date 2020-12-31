import React from "react";
import DropDown from "./Dropdown";
import Convert from "./Convert";

const options = [
  { label: "Afrikaans", value: "af" },
  { label: "Arabic", value: "ar" },
  { label: "Hindi", value: "hi" },
  { label: "Dutch", value: "nl" },
];

const Translate = () => {
  const [language, setLanguage] = React.useState(options[0]);
  const [text, setText] = React.useState("");
  return (
    <div className="ui segment">
      <div className="ui form">
        <div className="field">
          <label>Enter Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
      <DropDown
        label="Select a language"
        selected={language}
        onSelect={setLanguage}
        options={options}
      />
      <hr />
      <h3 className="ui header">Output</h3>
      <Convert language={language} text={text} />
    </div>
  );
};

export default Translate;
