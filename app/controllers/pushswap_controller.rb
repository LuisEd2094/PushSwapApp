require 'json'
require 'net/http'  

class PushswapController < ApplicationController
    def send_data
        user_input = params[:input]
        if user_input.nil? || user_input.empty?
            flash[:error] = 'No input provided.'
        else
            values = user_input.split(/,|\n/).map(&:strip)
            json_data = values.to_json
            uri = URI('http://127.0.0.1:5000/receive_json')
            http = Net::HTTP.new(uri.host, uri.port)
            request = Net::HTTP::Post.new(uri.path,{'Content-Type' => 'application/json'})
            request.body = json_data
            response = http.request(request)
            
            if response.code == '200'
                flash[:success] = 'Data sent'
            else
                flash[:error] = 'Failed'
            end
        redirect_to root_path
        end
    end
end
