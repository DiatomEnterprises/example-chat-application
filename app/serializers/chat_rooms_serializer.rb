class ChatRoomsSerializer < ActiveModel::Serializer
  attributes :id, :title

  has_many :messages, serializer: MessagesSerializer
  
end
