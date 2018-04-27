class Api::UsersController < ApplicationController
    def create
        debugger
      @user = User.new(user_params)
      if @user.save
        login(@user)
        render :show
      elsif User.find_by(email: params[:user][:email])
        if @user.errors[:password].empty?
          render json: { email: 'This email address is already taken' },
            status: 422
        else
          render json: { email: 'This email address is already taken',
            password: 'Your password must be at least 5 characters' },
            status: 422
        end
      else
        render json: { password: 'Your password must be at least 5 characters long'},
          status: 422
      end
    end

    private 

    def user_params
        params.require(:user).permit(:email, :password)
    end

end 