class ChatRoomPresenter

  include Virtus.model(strict: true)
  attribute :chat_room, ChatRoom

  def json_object
    {
      chat_room_id: chat_room.id,
      messages: serialized_messages
    }
  end

  private

    def serialized_messages
      chat_room.messages.order(created_at: :desc).limit(15).map do |message|
        MessagesSerializer.new(message).as_json
      end
    end

end
