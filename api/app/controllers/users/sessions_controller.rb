class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def show_current_user
    if user_signed_in?
      render json: { email: current_user.email }, status: :ok
    else
      render json: { error: 'Not logged in' }, status: :unauthorized
    end
  end

  private

  def respond_with(resource, _opts = {})
    render json: resource, status: :ok
  end

  def respond_to_on_destroy
    head :no_content
  end


  # Override the `set_flash_message!` method to avoid flash usage in API
  def set_flash_message!(*args)
    # No-op to disable flash messages
  end
end
