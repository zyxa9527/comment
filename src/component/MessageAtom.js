import React from "react";
import { connect } from "react-redux";
import { addMessage } from "../redux/action/message";
import styled from "styled-components";

class MessageAtom extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { name, time, value } = this.props;
    return (
      <>
        <Info>
          <span>{name}</span> {time} send message
        </Info>
        <Message>{value}</Message>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(MessageAtom);

const Message = styled.pre`
  margin: 0;
  padding: 10px 0;
  color: #303233;
  font-size: 16px;
`;

const Info = styled.p`
  color: #666;
  font-size: 14px;

  span {
    color: #00a0e9;
    font-weight: bold;
  }
`;
