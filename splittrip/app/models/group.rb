class Group < ActiveRecord::Base

	def members
		groups_users = GroupsUser.where(group_id: self.id)
		members = []
		groups_users.each do |group_user|
			members << Person.find_by(user_id: group_user.user_id)
		end
		return members
	end
end
