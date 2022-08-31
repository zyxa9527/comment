import React from "react";
import { connect } from "react-redux";
import { addMessage } from "../redux/action/message";
import styled from "styled-components";
import InputBox from "../component/InputBox";
import MessageContainer from "../component/MessageContainer";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.handleSumbitMessage = this.handleSumbitMessage.bind(this);
  }

  handleSumbitMessage(e) {
    const { addMessage, messageList } = this.props;
    addMessage([
      {
        id: Date.now(),
        ...e
      },
      ...messageList
    ]);
  }

  componentDidMount() {
    const { addMessage } = this.props;
    if (localStorage.getItem("messageData")) {
      const messageList = JSON.parse(localStorage.getItem("messageData"));
      messageList && addMessage(messageList);
    }
  }

  render() {
    const { messageList } = this.props;
    return (
      <HomeWrap>
        <Title> Comment </Title>
        <InputBox onSubmitMessage={this.handleSumbitMessage} />
        <MessageContainer messageList={messageList} />
      </HomeWrap>
    );
  }
}

const Title = styled.h1`
  margin: 0 auto 15px;
  color: #043465;
  text-align: center;
`;

const HomeWrap = styled.div`
  background: white;
  margin: auto;
  padding: 15px;
  width: 700px;
  border-radius: 10px;
`;

const mapStateToProps = (state) => ({
  messageList: state.messageList
});

const mapDispatchToProps = (dispatch) => ({
  addMessage: (e) => {
    dispatch(addMessage(e));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
