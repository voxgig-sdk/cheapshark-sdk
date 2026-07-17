-- Cheapshark SDK exists test

local sdk = require("cheapshark_sdk")

describe("CheapsharkSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
