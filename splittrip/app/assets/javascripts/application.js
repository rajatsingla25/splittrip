// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

function main(){
	var add_participant = document.getElementsByClassName("add_participant")[0]
	var remove_participant = document.getElementsByClassName("remove_participant")
	var make_admin_participant = document.getElementsByClassName("make_admin_participant")
	console.log(remove_participant)
	if(add_participant)
	{	console.log("add_participant")
		add_participant.addEventListener("submit", function(event){
			event.preventDefault();
			console.log(event)
			console.log(this)
			var url = '/groups/participant/add'
			var info = {
				username: this[2].value,
				group_id: this.id.slice(9)
			}

			var current_element = this

			$.ajax({
				url: url,
				method: 'post',
				data: info,
				success: function(data){
					console.log(data);
					if(data.status)
					{	var members_list = document.getElementById("members_list")
						var list_item = document.createElement("li");
						
						var inner_element1 = document.createElement("span");
						var text1 = document.createTextNode(data.person.name + " ");
						inner_element1.appendChild(text1);

						var inner_element2 = document.createElement("span");
						var text2 = document.createTextNode("member ")
						inner_element2.appendChild(text2);

						var inner_element3 = document.createElement("a");
						inner_element3.setAttribute('href',"/groups/participant/remove");
						inner_element3.className = 'remove_participant'
						inner_element3.id = 'participant_' + data.groups_users_id
						inner_element3.innerHTML = 'Remove '

						var inner_element4 = document.createElement("a");
						inner_element4.setAttribute('href',"/groups/participant/make_admin");
						inner_element4.className = 'make_admin_participant'
						inner_element4.id = 'participant_' + data.groups_users_id
						inner_element4.innerHTML = 'Make Admin'

						list_item.appendChild(inner_element1)
						list_item.appendChild(inner_element2)
						list_item.appendChild(inner_element3)
						list_item.appendChild(inner_element4)
						members_list.appendChild(list_item)

						current_element[2].value = ""
					}
					else
					{
						document.getElementById('result').innerHTML = data.message
					}
				},
				error: function(){
					alert("Error")
				}
			})
		})
	}

	if(remove_participant.length > 0)
	{
		for(var i=0; i<remove_participant.length; i++)
		{	remove_participant[i].addEventListener("click", function(event){
				console.log("remove_participant")
				event.preventDefault();
				console.log(event)
				console.log(this)
				var url = '/groups/participant/remove'
				var info = {
					groups_users_id: this.id.slice(12)
				}

				var current_element = this

				$.ajax({
					url: url,
					method: 'post',
					data: info,
					success: function(){
						var child = current_element.parentNode
						var parent = child.parentNode
						parent.removeChild(child)
					},
					error: function(){
						alert("Error")
					}
				})
			})
		}
	}

	if(make_admin_participant.length > 0)
	{
		for(var i=0; i<make_admin_participant.length; i++)
		{	make_admin_participant[i].addEventListener("click", function(event){
				console.log("make_admin_participant")
				event.preventDefault();
				console.log(event)
				console.log(this)
				var url = '/groups/participant/make_admin'
				var info = {
					groups_users_id: this.id.slice(12)
				}
				
				var current_element = this

				$.ajax({
					url: url,
					method: 'post',
					data: info,
					success: function(){
						current_element.previousElementSibling.previousElementSibling.innerHTML = "admin"
					},
					error: function(){
						alert("Error")
					}
				})
			})
		}
	}
}

window.addEventListener("load", function(){
	main();
})
