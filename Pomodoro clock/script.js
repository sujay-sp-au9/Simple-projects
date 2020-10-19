function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const audio = document.getElementById("beep");
class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "convertTime",












    count => {
      const minutes = Math.floor(count / 60);
      let seconds = count % 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      return `${minutes}:${seconds}`;
    });_defineProperty(this, "handleBreakIncrease",
    () => {
      const { breakCount } = this.state;
      if (breakCount < 60) {
        this.setState({
          breakCount: breakCount + 1 });

      }
    });_defineProperty(this, "handleBreakDecrease",
    () => {
      const { breakCount } = this.state;
      if (breakCount > 1) {
        this.setState({
          breakCount: breakCount - 1 });

      }
    });_defineProperty(this, "handleSessionIncrease",
    () => {
      const { sessionCount } = this.state;
      if (sessionCount < 60) {
        this.setState({
          sessionCount: sessionCount + 1,
          currentTimer: (sessionCount + 1) * 60 });

      }
    });_defineProperty(this, "handleSessionDecrease",
    () => {
      const { sessionCount } = this.state;
      if (sessionCount > 1) {
        this.setState({
          sessionCount: sessionCount - 1,
          currentTimer: (sessionCount - 1) * 60 });

      }
    });_defineProperty(this, "handlePlayPause",
    () => {
      const { isPlaying } = this.state;
      if (isPlaying) {
        clearInterval(this.loop);
        this.setState({
          isPlaying: false });

      } else
      {
        this.setState({
          isPlaying: true });

        this.loop = setInterval(() => {
          const { currentTimer, currentLabel, breakCount, sessionCount } = this.state;
          if (currentTimer == 0 && currentLabel == "Session") {
            audio.play();
            this.setState({
              currentTimer: breakCount * 60,
              currentLabel: "Break" });

          } else
          if (currentTimer == 0 && currentLabel == "Break") {
            audio.play();
            this.setState({
              currentTimer: sessionCount * 60,
              currentLabel: "Session" });

          } else
          {
            this.setState({
              currentTimer: currentTimer - 1 });

          }}, 1000);
      }
    });_defineProperty(this, "handleReset",
    () => {
      audio.pause();
      audio.currentTime = 0;
      clearInterval(this.loop);
      this.setState({
        breakCount: 5,
        sessionCount: 25,
        currentLabel: "Session",
        currentTimer: 25 * 60,
        isPlaying: false });

    });this.loop = undefined;this.state = { breakCount: 5, sessionCount: 25, currentLabel: "Session", currentTimer: 25 * 60, isPlaying: false };}componentWillUnmount() {clearInterval(this.loop);}
  render() {
    const { breakCount, sessionCount, currentLabel, currentTimer, isPlaying } = this.state;
    return (
      React.createElement("div", { id: "wrapper" },
      React.createElement("h1", null, "Pomodoro Clock"),
      React.createElement("div", { class: "flex" },
      React.createElement(SetTimer, { text: "Break", count: breakCount, handleIncrease: this.handleBreakIncrease, handleDecrease: this.handleBreakDecrease }),
      React.createElement(SetTimer, { text: "Session", count: sessionCount, handleIncrease: this.handleSessionIncrease, handleDecrease: this.handleSessionDecrease })),

      React.createElement("div", { id: "clock-container" },
      React.createElement("h3", { id: "currentLabel" }, currentLabel),
      React.createElement("h1", { id: "clock-count", className: currentTimer < 60 ? "text-danger" : "" + "text-monospace" }, this.convertTime(currentTimer)),
      React.createElement("button", { className: "btn-sm", onClick: this.handlePlayPause }, React.createElement("span", { className: `fa fa-${isPlaying ? 'pause' : 'play'}` })),
      React.createElement("button", { className: "btn-sm", onClick: this.handleReset }, React.createElement("span", { className: "fa fa-sync" })))));



  }}

const SetTimer = (props) =>
React.createElement("div", { id: "timer-container" },
React.createElement("h3", { id: props.text + "-label" },
props.text, " Length"),

React.createElement("div", { class: "flex" },
React.createElement("button", { onClick: props.handleIncrease, id: props.text + "-increment" },
React.createElement("i", { className: "fa fa-arrow-up" })),

React.createElement("span", null,
props.count),

React.createElement("button", { onClick: props.handleDecrease, id: props.text + "-decrement" },
React.createElement("i", { className: "fa fa-arrow-down" }))));




ReactDOM.render(React.createElement(App, null), document.getElementById("root"));