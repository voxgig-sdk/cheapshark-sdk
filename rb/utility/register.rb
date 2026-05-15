# Cheapshark SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CheapsharkUtility.registrar = ->(u) {
  u.clean = CheapsharkUtilities::Clean
  u.done = CheapsharkUtilities::Done
  u.make_error = CheapsharkUtilities::MakeError
  u.feature_add = CheapsharkUtilities::FeatureAdd
  u.feature_hook = CheapsharkUtilities::FeatureHook
  u.feature_init = CheapsharkUtilities::FeatureInit
  u.fetcher = CheapsharkUtilities::Fetcher
  u.make_fetch_def = CheapsharkUtilities::MakeFetchDef
  u.make_context = CheapsharkUtilities::MakeContext
  u.make_options = CheapsharkUtilities::MakeOptions
  u.make_request = CheapsharkUtilities::MakeRequest
  u.make_response = CheapsharkUtilities::MakeResponse
  u.make_result = CheapsharkUtilities::MakeResult
  u.make_point = CheapsharkUtilities::MakePoint
  u.make_spec = CheapsharkUtilities::MakeSpec
  u.make_url = CheapsharkUtilities::MakeUrl
  u.param = CheapsharkUtilities::Param
  u.prepare_auth = CheapsharkUtilities::PrepareAuth
  u.prepare_body = CheapsharkUtilities::PrepareBody
  u.prepare_headers = CheapsharkUtilities::PrepareHeaders
  u.prepare_method = CheapsharkUtilities::PrepareMethod
  u.prepare_params = CheapsharkUtilities::PrepareParams
  u.prepare_path = CheapsharkUtilities::PreparePath
  u.prepare_query = CheapsharkUtilities::PrepareQuery
  u.result_basic = CheapsharkUtilities::ResultBasic
  u.result_body = CheapsharkUtilities::ResultBody
  u.result_headers = CheapsharkUtilities::ResultHeaders
  u.transform_request = CheapsharkUtilities::TransformRequest
  u.transform_response = CheapsharkUtilities::TransformResponse
}
