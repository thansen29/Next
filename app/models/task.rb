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
    validates :user, :title, :list, presence: true
    validates :completed, inclusion: { in: [true, false] }

    belongs_to :user
    belongs_to :list
end 
