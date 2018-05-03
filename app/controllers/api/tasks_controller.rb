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

    # def update
    #     # @list = List.find(params[:id])
    #     # current user.lists.find(params[:id])
    # end 

    def destroy
        task = Task.find(params[:id])
        task.destroy!
        render json: {}
    end 


    def task_params
        params.require(:task).permit(:title, :description, :list_id)
    end 
end
