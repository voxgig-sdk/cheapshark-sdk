<?php
declare(strict_types=1);

// Cheapshark SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

CheapsharkUtility::setRegistrar(function (CheapsharkUtility $u): void {
    $u->clean = [CheapsharkClean::class, 'call'];
    $u->done = [CheapsharkDone::class, 'call'];
    $u->make_error = [CheapsharkMakeError::class, 'call'];
    $u->feature_add = [CheapsharkFeatureAdd::class, 'call'];
    $u->feature_hook = [CheapsharkFeatureHook::class, 'call'];
    $u->feature_init = [CheapsharkFeatureInit::class, 'call'];
    $u->fetcher = [CheapsharkFetcher::class, 'call'];
    $u->make_fetch_def = [CheapsharkMakeFetchDef::class, 'call'];
    $u->make_context = [CheapsharkMakeContext::class, 'call'];
    $u->make_options = [CheapsharkMakeOptions::class, 'call'];
    $u->make_request = [CheapsharkMakeRequest::class, 'call'];
    $u->make_response = [CheapsharkMakeResponse::class, 'call'];
    $u->make_result = [CheapsharkMakeResult::class, 'call'];
    $u->make_point = [CheapsharkMakePoint::class, 'call'];
    $u->make_spec = [CheapsharkMakeSpec::class, 'call'];
    $u->make_url = [CheapsharkMakeUrl::class, 'call'];
    $u->param = [CheapsharkParam::class, 'call'];
    $u->prepare_auth = [CheapsharkPrepareAuth::class, 'call'];
    $u->prepare_body = [CheapsharkPrepareBody::class, 'call'];
    $u->prepare_headers = [CheapsharkPrepareHeaders::class, 'call'];
    $u->prepare_method = [CheapsharkPrepareMethod::class, 'call'];
    $u->prepare_params = [CheapsharkPrepareParams::class, 'call'];
    $u->prepare_path = [CheapsharkPreparePath::class, 'call'];
    $u->prepare_query = [CheapsharkPrepareQuery::class, 'call'];
    $u->result_basic = [CheapsharkResultBasic::class, 'call'];
    $u->result_body = [CheapsharkResultBody::class, 'call'];
    $u->result_headers = [CheapsharkResultHeaders::class, 'call'];
    $u->transform_request = [CheapsharkTransformRequest::class, 'call'];
    $u->transform_response = [CheapsharkTransformResponse::class, 'call'];
});
