class UsersSerializer < ActiveModel::Serializer
  attributes :id, :full_name

  def full_name
    object.first_name + " " + object.last_name
  end
  
end
