-- Cheapshark SDK error

local CheapsharkError = {}
CheapsharkError.__index = CheapsharkError


function CheapsharkError.new(code, msg, ctx)
  local self = setmetatable({}, CheapsharkError)
  self.is_sdk_error = true
  self.sdk = "Cheapshark"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CheapsharkError:error()
  return self.msg
end


function CheapsharkError:__tostring()
  return self.msg
end


return CheapsharkError
