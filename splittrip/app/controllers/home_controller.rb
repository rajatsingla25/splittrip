class HomeController < ApplicationController
  def index
  end

  def profile
    @person = Person.find_by(:user_id => current_user.id)
    @contact = current_user.contact
  end

  def create
  end

  def create_profile
  	Person.create(
  			user_id: current_user.id,
  			username: params[:username],
  			name: params[:name],
  			gender: params[:gender],
  			dob: params[:dob]
  		)
  	return redirect_to '/profile'
  end

  def edit
    @person = Person.find_by(:user_id => current_user.id)
    @contact = current_user.contact
  end

  def edit_profile
  	person = Person.find_by(user_id: current_user.id)
  	person.username = params[:username]
  	person.name = params[:name]
  	person.gender = params[:gender]
  	person.dob = params[:dob]
  	person.save
  	contact = current_user.contact
  	if not contact
  		contact = Contact.new
  		contact.user_id = current_user.id
  	end
  	if(params[:phone] != "")
  		contact.phone = params[:phone]
  		contact.save
  	end
  	if(params[:address] != "")
  		contact.address = params[:address]
  		contact.save
  	end
  	if(params[:city] != "")
  		contact.city = params[:city]
  		contact.save
  	end
  	if(params[:pin] != "")
  		contact.pin = params[:pin]
  		contact.save
  	end
  	return redirect_to '/profile'
  end
end
