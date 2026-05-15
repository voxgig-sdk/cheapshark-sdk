# Cheapshark SDK utility: make_context
require_relative '../core/context'
module CheapsharkUtilities
  MakeContext = ->(ctxmap, basectx) {
    CheapsharkContext.new(ctxmap, basectx)
  }
end
