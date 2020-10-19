const initialState = `
# header
## header2
[Visit](https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-markdown-previewer)
\`<div></div>\`
\`\`\`
let x=1;
let y=2;
\`\`\`
- ListItem1
- ListItem2
- ListItem3

> Block Quotes!
**BoldText**
_ItalicText_
![React](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png)
`;

class Ex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: initialState };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      text: e.target.value });

  }
  render() {
    const { text } = this.state;
    const markedDown = marked(text, { breaks: true });
    return (
      React.createElement("div", null,
      React.createElement("h1", null, "Convert your markdown"),
      React.createElement("div", { class: "row" },
      React.createElement("div", { class: "col-6" },
      React.createElement("h4", null, "Editor"),
      React.createElement("textarea", { class: "form-control rounded", id: "editor", value: this.state.text, onChange: this.handleChange })),

      React.createElement("div", { class: "rounded col-6" },
      React.createElement("h4", null, "Preview"),
      React.createElement("div", { class: "preview" },
      React.createElement("p", { class: "p-2", id: "preview", dangerouslySetInnerHTML: { __html: markedDown } }))))));




  }}

ReactDOM.render(React.createElement(Ex, null), document.getElementById("app"));