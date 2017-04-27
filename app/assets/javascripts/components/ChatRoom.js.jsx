class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: props.chat_room.messages,
      onlineUsers: [] // Need to implement this functionality
    };
  }
  newMessage(message){
    const { messages } = this.state;
    let msgs = messages;
    if(msgs.length >= 15) {
      msgs.shift();
    }
    msgs.push(message);
    this.setState({messages: msgs});
  }
  componentDidMount(){
    App.chatChannel = App.cable.subscriptions.create({
      channel: "ChatRoomsChannel",
      chat_room_id: this.props.chat_room.id,
    }, {
      connected: () => {
        // TODO: Something on new connection
      },
      disconnected: () => {
        // TODO: Something on disconnection
      },
      received: (data) => {
        this.newMessage(data['message']);
      }
    });
  }
  render() {
    const { messages } = this.state;

    return (
      <div className="row">
        <div className="col-sm-12">
          <MessageList messages={ messages } />
        </div>
        { this.form() }
      </div>
    )
  }
  form(){
    return (
      <div className="col-sm-12">
        <form className="form-inline" onSubmit={ this.postMessage.bind(this) }>
          <div className="form-group col-sm-11">
            <input style={{width: "100%"}} ref="body" type="text" className="form-control" placeholder="Text..." />
          </div>
          <div className="form-group col-sm-1">
            <button type="submit" className="btn btn-primary">send</button>
          </div>
        </form>
      </div>
    )
  }
  postMessage(event){
    event.preventDefault();
    App.chatChannel.perform("send_message", { chat_room_id: this.props.chat_room.id, body: this.refs.body.value });
    this.refs.body.value = "";
  }
}
