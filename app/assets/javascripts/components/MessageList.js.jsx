class MessageList extends React.Component {
  render(){
    return <div className="row">
      { this.messagesList() }
    </div>
  }

  messagesList(){
    const { messages } = this.props

    return messages.map((message, index) =>
      <div className="col-sm-12" key={ index }>
        <div className="col-md-1">

        </div>
        <div className="col-md-11">
          <p className="card-text">
            <span className="text-muted"> { message.user.full_name }  at { message.written_at } says</span>
            <br/>
            { message.body }
          </p>
        </div>
      </div>
    );
  }
}
