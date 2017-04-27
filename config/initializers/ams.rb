require 'active_model_serializers'

ActiveModelSerializers.config.adapter = :json_api
ActiveModelSerializers.config.default_includes = '**'
