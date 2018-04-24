class CreateTask < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.integer :author_id, null: false
      t.string :title, null: false
      t.text :description
      t.timestamps
    end
    add_index :tasks, :author_id
    add_index :tasks, :title, unique: true
  end
end
