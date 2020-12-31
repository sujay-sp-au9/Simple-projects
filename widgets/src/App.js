import React from "react";
// import Accordion from "./components/Accordion";

// const items = [
//   {
//     title: "What is React?",
//     content: "React is a frontend javascript framework",
//   },
//   { title: "Why use React?", content: "Engineers' Choice" },
//   { title: "How do you use React?", content: "By creating components, duh" },
// ];

// export default function App() {
//   return (
//     <div>
//       <Accordion items={items} />
//     </div>
//   );
// }
// import WikiSearch from "./components/WikiSearch";
// import Dropdown from "./components/Dropdown";

// const options = [
//   { label: "The Color Red", value: "red" },
//   { label: "The Color Green", value: "green" },
//   { label: "A Shade of Blue", value: "blue" },
// ];

// export default function App() {
//   const [selected, setSelected] = useState(options[0]);
//   return (
//     <div className="ui segment">
//       <Dropdown options={options} selected={selected} onSelect={setSelected} />
//       <h1 style={{ marginTop: "10%", color: selected.value }}>Example text</h1>
//     </div>
//   );
// }
import Translate from "./components/Translate";

export default function App() {
  return <Translate />;
}
