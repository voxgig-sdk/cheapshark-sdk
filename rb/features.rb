# Cheapshark SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CheapsharkFeatures
  def self.make_feature(name)
    case name
    when "base"
      CheapsharkBaseFeature.new
    when "test"
      CheapsharkTestFeature.new
    else
      CheapsharkBaseFeature.new
    end
  end
end
