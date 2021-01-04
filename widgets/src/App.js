import React from "react";
import Header from "./components/Header";
import Route from "./components/Route";
import WikiSearch from "./components/WikiSearch";
import Dropdown from "./components/Dropdown";
import Accordion from "./components/Accordion";
import Translate from "./components/Translate";

const items = [
  {
    title: "What is React?",
    content: "React is a frontend javascript framework",
  },
  { title: "Why use React?", content: "Engineers' Choice" },
  { title: "How do you use React?", content: "By creating components, duh" },
];

const options = [
  { label: "The Color Red", value: "red" },
  { label: "The Color Green", value: "green" },
  { label: "A Shade of Blue", value: "blue" },
];

export default function App() {
  const [selected, setSelected] = React.useState(options[0]);
  return (
    <div className="ui segment">
      <Header />
      <Route path="/">
        <Accordion items={items} />
      </Route>
      <Route path="/search">
        <WikiSearch />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
      <Route path="/dropdown">
        <Dropdown
          options={options}
          selected={selected}
          onSelect={setSelected}
        />
        <h1 style={{ marginTop: "10%", color: selected.value }}>
          Example text
        </h1>
      </Route>
    </div>
  );
}
