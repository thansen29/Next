json.extract! list, :id, :author_id, :title

json.tasks do
  list.tasks.each do |task|
    json.set! task.id do
      json.id task.id
      json.userId task.author_id
      json.title task.title
      json.description task.description
      json.createdAt task.created_at
    end
  end
end