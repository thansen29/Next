class CreateList < ActiveRecord::Migration[5.1]
  def change
    create_table :lists do |t|
      t.integer :author_id, null: false
      t.string :title, null: false
      t.timestamps
    end
    add_index :lists, :author_id
    add_index :lists, :title, unique: true
  end
end
