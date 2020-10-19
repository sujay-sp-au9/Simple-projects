function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3];
const ops = ['+', '-', '*', '/', '='];
class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      curr: '',
      operand1: 0,
      operator: undefined });_defineProperty(this, "handleEvent",

    (e) =>
    {
      const { curr, operand1, operator } = this.state;
      if (e.target.innerText === 'AC')
      this.setState({
        curr: '',
        operand1: 0,
        operator: undefined });else

      if (e.target.innerText === '.' && !curr.includes('.') && curr.length > 0)
      this.setState({
        curr: curr + e.target.innerText });else

      if (!Number.isNaN(Number(e.target.innerText)))
      {
        if (operand1 > 0 && !operator)
        this.setState({
          curr: e.target.innerText,
          operand1: 0 });else

        if (curr.length < 9)
        this.setState({
          curr: curr + e.target.innerText });

      } else

      {
        if (!operator && curr != '')
        {
          if (e.target.innerText != '=')
          this.setState({
            operand1: curr,
            operator: e.target.innerText,
            curr: '' });

        } else
        if (operand1.length > 0 && curr.length < 1)
        {
          if (e.target.innerText != '=')
          this.setState({
            operator: e.target.innerText });

        } else
        {
          const evalu = eval(`${operand1} ${operator} ${curr}`);
          const evalued = evalu.toFixed(3);
          if (e.target.innerText == '=')
          {
            this.setState({
              curr: '',
              operator: undefined,
              operand1: evalued });

          } else
          {
            this.setState({
              curr: '',
              operator: e.target.innerText,
              operand1: evalued });

          }
        }
      }
    });}
  render() {
    return (
      React.createElement("div", { class: "container calculator" },
      React.createElement("p", { style: { position: 'absolute', top: 0, color: 'white' } }, "Please avoid use of negative numbers as it only a simple calculator"),
      React.createElement("div", { class: "display" }, this.state.operand1 == 0 ? this.state.curr : this.state.operand1 + (this.state.operator ? this.state.operator : "") + this.state.curr),
      React.createElement("div", { id: "numbers" },
      React.createElement("button", { onClick: this.handleEvent, class: "big-h ac red", key: "AC" }, "AC"),
      nums.map(num => React.createElement("button", { onClick: this.handleEvent, class: "grey", key: num }, num)),
      React.createElement("button", { onClick: this.handleEvent, class: "big-h grey", key: "zero" }, "0"),
      React.createElement("button", { onClick: this.handleEvent, class: "grey", key: "period" }, ".")),

      React.createElement("div", { id: "operations" },
      ops.map(op => React.createElement("button", { onClick: this.handleEvent, class: "orange", key: op }, op)))));




  }}

ReactDOM.render(React.createElement(App, null), document.getElementById("roott"));