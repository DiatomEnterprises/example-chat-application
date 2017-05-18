class ChatRoomsChannel < ApplicationCable::Channel

  def subscribed
    stream_from "chat_rooms_#{params['chat_room_id']}_channel"
  end

  def unsubscribed
    stop_all_streams
  end

  def send_message(data)
    message = current_user.messages.create(body: data['body'], chat_room_id: data['chat_room_id'])
    if message.errors.present?
      transmit({type: 'errors', data: message.errors.full_messages})
    else
      MessageBroadcastJob.perform_later(message.id)
    end
  end
end
