class Api::TasksController < ApplicationController
    def index
        @tasks = Task.all
            .where(list_id: params[:id])
    end

    def all
        @tasks = Task.all
            .where(user_id: current_user.id)

            render :index
    end

    def create
        @task = Task.new(task_params)
        @task.user_id = current_user.id
        if @task.save
            render :show
        else
          render json: { route: "You must give your task a title" }, status: 422
        end
    end

    def show
        @task = Task.find(params[:id])
    end

    # separate when editing title, description, or completion
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
