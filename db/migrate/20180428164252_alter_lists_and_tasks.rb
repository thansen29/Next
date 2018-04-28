class AlterListsAndTasks < ActiveRecord::Migration[5.1]
  def change
    remove_column :lists, :author_id
    remove_column :tasks, :author_id

    add_column :lists, :user_id, :integer, null: false
    add_column :tasks, :user_id, :integer, null: false

    add_index :lists, :user_id
    add_index :tasks, :user_id
    
  end
end
