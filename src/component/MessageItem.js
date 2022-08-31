import React from "react";
import { connect } from "react-redux";
import { addMessage } from "../redux/action/message";
import styled from "styled-components";
import InputBox from "../component/InputBox";
import MessageAtom from "../component/MessageAtom";

class MessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      isShowResponse: false
    };

    this.handleSumbitMessage = this.handleSumbitMessage.bind(this);
    this.handleToggleResponse = this.handleToggleResponse.bind(this);
  }

  handleSumbitMessage(e) {
    const { addMessage, messageList, id } = this.props;

    const cloneMessageList = Object.assign([], messageList);

    cloneMessageList.find((element) => {
      if (id === element.id) {
        element.responseArray = [
          {
            id: Date.now(),
            name: e.name,
            text: e.text,
            time: e.time
          },
          ...element.responseArray
        ];
      }
    });

    addMessage(cloneMessageList);
  }

  handleToggleResponse() {
    const { isShowResponse } = this.state;
    this.setState({ isShowResponse: !isShowResponse });
  }

  render() {
    const { responseArray, name, time, value, id } = this.props;
    const { isShowResponse } = this.state;
    return (
      <MessageItemWrap>
        <MessageAtom id={id} name={name} time={time} value={value} />

        {responseArray &&
          responseArray.map((element, index) => {
            return (
              <ResponseMessage key={index}>
                <MessageAtom
                  id={element.id}
                  name={element.name}
                  time={element.time}
                  value={element.text}
                />
              </ResponseMessage>
            );
          })}

        <ResponseButton
          isShow={isShowResponse}
          onClick={this.handleToggleResponse}
        >
          reply
        </ResponseButton>

        {isShowResponse && (
          <InputBox
            isShowInputBox={this.handleToggleResponse}
            onSubmitMessage={this.handleSumbitMessage}
          />
        )}
      </MessageItemWrap>
    );
  }
}

const mapStateToProps = (state) => ({
  messageList: state.messageList
});

const mapDispatchToProps = (dispatch) => ({
  addMessage: (e) => {
    dispatch(addMessage(e));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageItem);

const ResponseButton = styled.div`
  display: inline-block;
  margin-bottom: ${(props) => props.isShow && "15px"};
  max-width: 80px;
  height: 30px;
  cursor: pointer;
  color: #00a0e9;
  font-size: 14px;
  line-height: 30px;
  user-select: none;

  &:hover {
    color: #37c0ff;
  }
`;

const ResponseMessage = styled.div`
  margin: 5px 0 0 40px;
`;

const MessageItemWrap = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 10px;
  background: #f2f7ff;
  width: 500px;
  box-shadow: 0 3px 10px #dce3ef;
  box-sizing: border-box;

  p {
    margin: 0;
  }
`;
