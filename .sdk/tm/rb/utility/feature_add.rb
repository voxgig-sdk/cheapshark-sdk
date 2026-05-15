# Cheapshark SDK utility: feature_add
module CheapsharkUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
