class Api::TasksController < ApplicationController
    def index 
        @tasks = Task.all
            .where(list_id: params[:id])
    end 

    def create
        title = task_params['title']
        desc = task_params['description']
        list_id = task_params['list_id']
        @task = Task.new(user_id: current_user.id, list_id: list_id, title: title, description: desc)
        if @task.save
            render :show
        else
          render json: { route: "You must give your task a title" }, status: 422
        end 
    end 

    def show
        @task = Task.find(params[:id])
    end 

    def update
        @task = Task.find(params[:id])
        if params["title"] || params["description"]
            if params["title"]
                @task.title = params["title"]
            end 

            if params["description"]
                @task.description = params["description"]
            end 
        else 
            @task.completed = !@task.completed
        end 

        if @task.save!
            render :show
        else 
            render json: { error: @task.errors.full_messages }
        end 
    end 

    def destroy
        task = Task.find(params[:id])
        task.destroy!
        render json: { message: "Deleted the record"}
    end 


    def task_params
        params.require(:task).permit(:title, :description, :list_id)
    end 
end
