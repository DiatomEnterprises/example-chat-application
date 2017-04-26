class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: props.json_object.messages.reverse(),
      onlineUsers: []
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
      chat_room_id: this.props.json_object.chat_room_id,
    }, {
      connected: () => {

      },
      disconnected: () => {

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
        <div className="col-sm-12">
          { this.form() }
        </div>
      </div>
    )
  }
  form(){
    return (
      <form className="form-inline" onSubmit={ this.postMessage.bind(this) }>
        <div class="form-group">
          <input ref="body" type="text" className="form-control" placeholder="Text..." />
        </div>
        <button type="submit" className="btn btn-primary">send</button>
      </form>
    )
  }
  postMessage(event){
    event.preventDefault();
    App.chatChannel.perform("send_message", { chat_room_id: this.props.json_object.chat_room_id, body: this.refs.body.value });
    this.refs.body.value = "";
  }
}
