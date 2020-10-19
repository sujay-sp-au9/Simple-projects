const keys = [{
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
{
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
{
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
{
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
{
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
{
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
{
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
{
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
{
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];



class Aoo extends React.Component {
  constructor(props) {
    super(props);
    this.audio1 = React.createRef();
    this.audio2 = React.createRef();
    this.audio3 = React.createRef();
    this.audio4 = React.createRef();
    this.audio5 = React.createRef();
    this.audio6 = React.createRef();
    this.audio7 = React.createRef();
    this.audio8 = React.createRef();
    this.audio9 = React.createRef();
    this.state = {
      power: "OFF",
      displayContent: "",
      volume: "",
      bank: "",
      value: 3 };

    this.powerOffOn = this.powerOffOn.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
  }
  powerOffOn() {
    if (this.state.power == "OFF")
    {
      this.setState({
        power: "ON" });

    } else

    {
      this.setState({
        power: "OFF",
        displayContent: "" });

    }
  }
  handleVolume() {
    this.setState({
      value: currentVal });

    console.log(this.state.value);
  }
  handleClick(e) {
    if (this.state.power == "ON") {
      const temp = e.target.id;
      this.setState({
        displayContent: e.target.id });

      document.getElementById(e.target.id).classList.add("active-button");
      const aud = document.getElementById(e.target.innerText);
      aud.onended = function () {
        document.getElementById(temp).classList.remove("active-button");
      };
      if (e.target.innerText == keys[0].keyTrigger)
      {
        this.auudio6.current.volume = 0;
        this.audio1.current.pause();
        this.audio1.current.currentTime = 0;
        this.audio1.current.play();
      } else
      if (e.target.innerText == keys[1].keyTrigger)
      {
        this.audio2.current.pause();
        this.audio2.current.currentTime = 0;
        this.audio2.current.play();
      } else
      if (e.target.innerText == keys[2].keyTrigger)
      {
        this.audio3.current.pause();
        this.audio3.current.currentTime = 0;
        this.audio3.current.play();
      } else
      if (e.target.innerText == keys[3].keyTrigger)
      {
        this.audio4.current.pause();
        this.audio4.current.currentTime = 0;
        this.audio4.current.play();
      } else
      if (e.target.innerText == keys[4].keyTrigger)
      {
        this.audio5.current.pause();
        this.audio5.current.currentTime = 0;
        this.audio5.current.play();
      } else
      if (e.target.innerText == keys[5].keyTrigger)
      {

        this.audio6.current.pause();
        this.audio6.current.currentTime = 0;
        this.audio6.current.play();
      } else
      if (e.target.innerText == keys[6].keyTrigger)
      {
        this.audio7.current.pause();
        this.audio7.current.currentTime = 0;
        this.audio7.current.play();
      } else
      if (e.target.innerText == keys[7].keyTrigger)
      {
        this.audio8.current.pause();
        this.audio8.current.currentTime = 0;
        this.audio8.current.play();
      } else

      {
        this.audio9.current.pause();
        this.audio9.current.currentTime = 0;
        this.audio9.current.play();
      }
    }
  }
  render() {
    return (
      React.createElement("div", { id: "drum-machine" },
      React.createElement("div", { id: "pads" },
      React.createElement("div", { className: "drum-pad", id: keys[0].id, onClick: this.handleClick }, keys[0].keyTrigger,
      React.createElement("audio", { ref: this.audio1, src: keys[0].url, className: "clip", id: keys[0].keyTrigger })),

      React.createElement("div", { className: "drum-pad", id: keys[1].id, onClick: this.handleClick }, keys[1].keyTrigger,
      React.createElement("audio", { ref: this.audio2, src: keys[1].url, className: "clip", id: keys[1].keyTrigger })),

      React.createElement("div", { className: "drum-pad", id: keys[2].id, onClick: this.handleClick }, keys[2].keyTrigger,
      React.createElement("audio", { ref: this.audio3, src: keys[2].url, className: "clip", id: keys[2].keyTrigger })),

      React.createElement("div", { className: "drum-pad", id: keys[3].id, onClick: this.handleClick }, keys[3].keyTrigger,
      React.createElement("audio", { ref: this.audio4, src: keys[3].url, className: "clip", id: keys[3].keyTrigger })),

      React.createElement("div", { className: "drum-pad", id: keys[4].id, onClick: this.handleClick }, keys[4].keyTrigger,
      React.createElement("audio", { ref: this.audio5, src: keys[4].url, className: "clip", id: keys[4].keyTrigger })),

      React.createElement("div", { className: "drum-pad", id: keys[5].id, onClick: this.handleClick }, keys[5].keyTrigger,
      React.createElement("audio", { ref: this.audio6, src: keys[5].url, className: "clip", id: keys[5].keyTrigger })),

      React.createElement("div", { className: "drum-pad", id: keys[6].id, onClick: this.handleClick }, keys[6].keyTrigger,
      React.createElement("audio", { ref: this.audio7, src: keys[6].url, className: "clip", id: keys[6].keyTrigger })),

      React.createElement("div", { className: "drum-pad", id: keys[7].id, onClick: this.handleClick }, keys[7].keyTrigger,
      React.createElement("audio", { ref: this.audio8, src: keys[7].url, className: "clip", id: keys[7].keyTrigger })),

      React.createElement("div", { className: "drum-pad", id: keys[8].id, onClick: this.handleClick }, keys[8].keyTrigger,
      React.createElement("audio", { ref: this.audio9, src: keys[8].url, className: "clip", id: keys[8].keyTrigger }))),


      React.createElement("div", { id: "display" },
      React.createElement("button", { className: "btn btn-primary size", onClick: this.powerOffOn }, "Power"),
      React.createElement("textarea", { className: "text-center lead", value: this.state.displayContent + "    " + this.state.power }),
      React.createElement("input", { type: "range", step: "0.01", min: "0", max: "1", defaultValue: "3", onChange: this.handleVolume }),
      React.createElement("button", { className: "btn btn-primary size" }, "Bank"))));



  }}

ReactDOM.render(React.createElement(Aoo, null), document.getElementById("root"));
const tempFunction = document.addEventListener('keydown', e => {
  const audio = document.getElementById(e.key.toUpperCase());
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    const parent = audio.parentNode;
    parent.classList.add("active-button");
    audio.play();
    document.addEventListener("keydown", tempFunction);
  }
});