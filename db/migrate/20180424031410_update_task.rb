class UpdateTask < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :list_id, :integer
  end
end
