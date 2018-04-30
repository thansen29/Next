class Api::ListsController < ApplicationController
    def index 
        @lists = List.all
            .where(user_id: current_user.id)
            .includes(:tasks)
    end 

    def create
        @list = List.new(user_id: current_user.id, title: list_params['title'])
        if @list.save
            render :show
        else
          render json: { list: "You must give your list a title" }, status: 422
        end 
    end 

    def show
        @list = List.find(params[:id])
    end 

    def update
        @list = List.find(params[:id])
        if @list.update(title: list_params['title'])
            render :show
        else 
          render json: { list: "You must give your list a title" }, status: 422            
        end 
    end 

    def delete
        list = List.find(params[:id])
        list.destroy!
        render json: {}
    end 


    def list_params
        params.require(:list).permit(:title)
    end 
end
