class GroupController < ApplicationController
  def index
  	@groups = current_user.groups
  end

  def create
  end

  def create_group
  	group = Group.create(
  			name: params[:name],
  			no_of_members: 0
  		)

  	GroupsUser.create(
  			group_id: group.id,
  			user_id: current_user.id,
  			position: 'admin'
  		)
  	return redirect_to '/groups'
  end

  def show
  	@group = Group.find(params[:group_id])
  	@members = @group.members
  end

  def add_participant
  	data = {}
  	message = nil
  	groups_users_id = nil
  	person = Person.find_by(username: params[:username])
  	if(person)
  		group_user = GroupsUser.find_by(user_id: person.user_id, group_id: params[:group_id])
  		if group_user
  			status = false
  			message = 'User Already Added'
  		else
  			status = true
	  		group_user = GroupsUser.create(
	  				user_id: person.user_id,
	  				group_id: params[:group_id],
	  				position: 'member'	
	  			)
	  		groups_users_id = group_user.id
	  		group = Group.find(params[:group_id])
	  		group.no_of_members += 1;
	  		group.save
	  	end
  	else
  		status = false
  		message = 'User NOT Found!'
  	end
  	data['status'] = status
  	data['person'] = person
  	data['message'] = message
  	data['groups_users_id'] = groups_users_id
  	render json: data
  end

  def remove_participant
  	group_user = GroupsUser.find(params[:groups_users_id])
  	group = Group.find(group_user.group_id)
	group.no_of_members -= 1;
	group.save
  	group_user.destroy

  	render json: group_user
  end

  def make_admin_participant
	group_user = GroupsUser.find(params[:groups_users_id])
  	group_user.position = 'admin'
  	group_user.save
  	render json: group_user	
  end

end
