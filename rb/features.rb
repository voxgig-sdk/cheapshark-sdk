# Cheapshark SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CheapsharkFeatures
  def self.make_feature(name)
    case name
    when "base"
      CheapsharkBaseFeature.new
    when "ratelimit"
      CheapsharkRatelimitFeature.new
    when "retry"
      CheapsharkRetryFeature.new
    when "test"
      CheapsharkTestFeature.new
    when "timeout"
      CheapsharkTimeoutFeature.new
    else
      CheapsharkBaseFeature.new
    end
  end
end
