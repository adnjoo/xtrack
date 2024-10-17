class Api::HelloController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    render json: { message: 'Hello, world!' }
  end
end
