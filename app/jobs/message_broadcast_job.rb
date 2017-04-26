class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    serialized_message = MessagesSerializer.new(message).as_json
    ActionCable.server.broadcast("chat_rooms_#{message.chat_room.id}_channel", message: serialized_message)
  end

end
