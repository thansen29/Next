Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :lists, only: [:index, :show, :update, :create, :destroy]
    get 'tasks/lists/:id', to: 'tasks#index'
    resources :tasks, only: [:show, :update, :create, :destroy] 


     
  end 
end
