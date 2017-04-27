class ChatRoomPresenter

  include Virtus.model(strict: true)
  attribute :chat_room, ChatRoom

  def json_object
    ChatRoomsSerializer.new(chat_room).as_json
  end

end
