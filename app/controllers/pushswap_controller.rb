require 'json'
require 'net/http'  

class PushswapController < ApplicationController
    def send_data
        user_input = params[:input]
        if request.post? && (user_input.nil? || user_input.empty?)
            flash[:error] = 'No input provided.'
        elsif request.post?
            values = user_input.split(/[\s,]+/).map(&:strip)
            json_data = { 'input' => values }.to_json
            begin
                uri = URI('http://127.0.0.1:5000/receive_numbers')
                http = Net::HTTP.new(uri.host, uri.port)
                request = Net::HTTP::Post.new(uri.path,{'Content-Type' => 'application/json'})
                request.body = json_data
                response = http.request(request)
                rescue Errno::ECONNREFUSED => e
                    # Handle the connection refusal error
                    flash[:error] = "Connection refused. Please try again later."
                    redirect_to root_path
            end
            
            if response.is_a?(Net::HTTPSuccess)
                data = JSON.parse(response.body)
                puts data
                render json: {success: true, data: data}
                
                 # Print the response data to console
                # Alternatively, you can log the response data for further inspection
                #Rails.logger.info(data)
            else
                flash[:error] = 'Failed'
            end
            #redirect_to root_path
        end
    end
end
