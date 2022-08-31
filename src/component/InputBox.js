import React from "react";
import styled from "styled-components";

export default class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      name: "",
      text: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleGetTime = this.handleGetTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(e) {
    this.setState({ text: e.currentTarget.value });
  }

  handleNameChange(e) {
    this.setState({ name: e.currentTarget.value });
  }

  handleGetTime(fmt) {
    const date = new Date();
    const o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小時
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  }

  handleSubmit() {
    const {
      isShowInputBox,
      onSubmitMessage,
      isReset,
      isChild,
      id
    } = this.props;
    const { name, text } = this.state;

    if (!text) {
      return;
    }

    onSubmitMessage(
      {
        name: name || "路人",
        text,
        time: this.handleGetTime("yyyy-MM-dd hh:mm:ss"),
        responseArray: []
      },
      isChild,
      id
    );

    if (isReset) {
      this.setState({
        name: "",
        text: ""
      });
    }

    // 控制編輯訊息的輸入框狀態
    isShowInputBox && isShowInputBox();
  }

  componentDidMount() {
    this.setState({
      name: this.props.propsName || "",
      text: this.props.propsValue || ""
    });
  }

  render() {
    const { name, text } = this.state;
    return (
      <InputBoxWrap>
        <Nickname
          type="text"
          placeholder="name"
          value={name}
          onChange={this.handleNameChange}
        />

        <Textarea
          placeholder="comment..."
          value={text}
          onChange={this.handleTextChange}
        />
        <Submit onClick={this.handleSubmit}>Submit</Submit>
      </InputBoxWrap>
    );
  }
}

InputBox.defaultProps = {
  isReset: true,
  isChild: false
};

const Submit = styled.button`
  background-color: #92c8f4;
  border: none;
  border-radius: 10px;
  height: 40px;
  width: 80px;
  cursor: pointer;
  transition: all 0.5s ease;
  user-select: none;
  coloe: #043465;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #febfcf;
  }
`;

const Nickname = styled.input`
  border: 2px solid #bfd6fc;
  margin-right: 20px;
  border-radius: 10px;
  padding: 0 10px;
  width: 150px;
  height: 30px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  border: 2px solid #bfd6fc;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  height: 200px;
  resize: none;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

const InputBoxWrap = styled.div`
  margin: 0 auto 20px;
  width: 500px;
  max-width: 100%;
`;
