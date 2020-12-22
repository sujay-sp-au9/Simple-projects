import React from "react";

export default class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { span: 1 };
    this.imageRef = React.createRef();
  }
  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpan);
  }
  setSpan = () => {
    let rowHeight = getComputedStyle(document.querySelector(".image-list"))
      .gridAutoRows;
    const regEx = /\d+/;
    rowHeight = regEx.exec(rowHeight)[0];
    this.setState({
      span: Math.ceil(this.imageRef.current.clientHeight / rowHeight),
    });
  };
  render() {
    const { image } = this.props;
    return (
      <div style={{ gridRowEnd: `span ${this.state.span}` }}>
        <img
          ref={this.imageRef}
          src={image.urls.regular}
          alt={image.description}
          loading={this.props.loading || "auto"}
        />
      </div>
    );
  }
}
