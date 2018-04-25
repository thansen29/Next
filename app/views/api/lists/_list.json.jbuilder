json.extract! list, :id, :title

json.tasks do
  list.tasks.each do |task|
    json.set! task.id do
      json.id task.id
    end
  end
end