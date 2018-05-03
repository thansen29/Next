class UpdateIndexes < ActiveRecord::Migration[5.1]
  def change
    remove_column :lists, :title
    remove_column :tasks, :title

    add_column :lists, :title, :string, null: false
    add_column :tasks, :title, :string, null: false
  end
end
