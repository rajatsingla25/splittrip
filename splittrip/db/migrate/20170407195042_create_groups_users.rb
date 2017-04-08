class CreateGroupsUsers < ActiveRecord::Migration
  def change
    create_table :groups_users do |t|
      t.integer :group_id
      t.integer :user_id
      t.string :position

      t.timestamps null: false
    end
  end
end
