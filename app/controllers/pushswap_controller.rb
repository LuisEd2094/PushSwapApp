require 'json'
require 'net/http'  

class PushswapController < ApplicationController
    def send_data
        user_input = params[:input]
        if user_input.nil? || user_input.empty?
            flash[:error] = 'No input provided.'
        else
            values = user_input.split(/[\s,]+/).map(&:strip)
            json_data = { 'input' => values.map(&:to_i) }.to_json
            uri = URI('http://127.0.0.1:5000/receive_numbers')
            http = Net::HTTP.new(uri.host, uri.port)
            request = Net::HTTP::Post.new(uri.path,{'Content-Type' => 'application/json'})
            request.body = json_data
            response = http.request(request)
            
            if response.is_a?(Net::HTTPSuccess)
                data = JSON.parse(response.body)
                puts data.inspect # Print the response data to console
                # Alternatively, you can log the response data for further inspection
                #Rails.logger.info(data)
            else
                flash[:error] = 'Failed'
            end
        #redirect_to root_path
        end
    end
end
