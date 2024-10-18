Rails.application.config.session_store :cookie_store, 
  key: '_xtrack_api_session', 
  same_site: :none, 
  secure: Rails.env.production?,  # Ensure Secure cookies only in production
  domain: '.xtrack.ing'           # Set cookie to work across domains, adjust as needed
