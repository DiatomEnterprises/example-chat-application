class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chat_room

  validates :body, presence: true, length: {minimum: 2, maximum: 1000}

end
