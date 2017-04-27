puts "--------------------------- Started Seeding ----------------------------"
puts "------------------------------------------------------------------------"
5.times do |c|
  user = User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    password_confirmation: "defaultpw",
    password: "defaultpw",
    email: "test_user_#{c + 1}@example.com"
  )
  puts "  email: '#{user.email}' with password: 'defaultpw' created"
  puts "------------------------------------------------------------------------"
end
puts "-------------------------- Finished Seeding ----------------------------"
