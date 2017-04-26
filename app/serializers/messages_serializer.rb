class MessagesSerializer < ActiveModel::Serializer
  attributes :id, :body, :written_at

  belongs_to :user, serializer: UsersSerializer

  def written_at
    object.timestamp
  end
end
