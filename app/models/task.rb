# == Schema Information
#
# Table name: tasks
#
#  id          :integer          not null, primary key
#  author_id   :integer          not null
#  title       :string           not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Task < ApplicationRecord 
    validates :author, :title, presence: true

    belongs_to :author,
        class_name: :User,
        foreign_key: :author_id

    belongs_to :list
end 
