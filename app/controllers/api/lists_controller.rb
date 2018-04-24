class ListsController < ApplicationController
    def index 
        debugger
        @lists = List.all
        # where author id == current user id
        # order alphabetically
    end 

    def create
        debugger
        @list = List.new(list_params)
        if @list.save
            render :show
        else
          render json: { route: "You must give your list a title" }, status: 422
        end 
    end 

    def show
        @list = List.find(params[:id])
    end 

    def update
        # @list = List.find(params[:id])
        # current user.lists.find(params[:id])
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
