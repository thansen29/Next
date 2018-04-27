class Api::SessionsController < ApplicationController
    def create
      @user = User.find_by_credentials(params[:email], params[:password])
      if @user
        login(@user)
        render :show
      else
        render json: { credentials: 'The username or password did not match. Please try again'},
        status: 401
      end
    end
  
    def destroy
      if current_user.nil?
        render json: { logout: 'Not logged in' }, status: 422 
      else
        logout
        render json: {}
      end
    end
  end