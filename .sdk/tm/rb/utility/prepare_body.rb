# Cheapshark SDK utility: prepare_body
require_relative 'media'
module CheapsharkUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return CheapsharkUtilities.raw_body(ctx.reqdata) if CheapsharkUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
