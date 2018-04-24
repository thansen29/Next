Rails.application.config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, '787448972798-f8id0ocip687bcmi26vuc5sjnfkm3f18.apps.googleusercontent.com', 'C0BZ0agphHXK9vE6DHrHn5R1'
end
# provider :facebook,      ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET']