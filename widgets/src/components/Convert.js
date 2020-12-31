import React from "react";
import axios from "axios";

const apiKey = "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM";

export default function Convert({ language, text }) {
  const [translated, setTranslated] = React.useState("");
  const [debouncedText, setDebouncedText] = React.useState(translated);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedText(text);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [text]);

  React.useEffect(() => {
    axios({
      method: "POST",
      url: "https://translation.googleapis.com/language/translate/v2",
      params: {
        q: debouncedText,
        target: language.value,
        key: apiKey,
      },
    })
      .then((res) => {
        setTranslated(res.data.data.translations[0].translatedText);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [language, debouncedText]);

  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );
}
