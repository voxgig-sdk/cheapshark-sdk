package voxgigcheapsharksdk

import (
	"github.com/voxgig-sdk/cheapshark-sdk/go/core"
	"github.com/voxgig-sdk/cheapshark-sdk/go/entity"
	"github.com/voxgig-sdk/cheapshark-sdk/go/feature"
	_ "github.com/voxgig-sdk/cheapshark-sdk/go/utility"
)

// Type aliases preserve external API.
type CheapsharkSDK = core.CheapsharkSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CheapsharkEntity = core.CheapsharkEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CheapsharkError = core.CheapsharkError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAlertEntityFunc = func(client *core.CheapsharkSDK, entopts map[string]any) core.CheapsharkEntity {
		return entity.NewAlertEntity(client, entopts)
	}
	core.NewDealEntityFunc = func(client *core.CheapsharkSDK, entopts map[string]any) core.CheapsharkEntity {
		return entity.NewDealEntity(client, entopts)
	}
	core.NewGameEntityFunc = func(client *core.CheapsharkSDK, entopts map[string]any) core.CheapsharkEntity {
		return entity.NewGameEntity(client, entopts)
	}
	core.NewStoreEntityFunc = func(client *core.CheapsharkSDK, entopts map[string]any) core.CheapsharkEntity {
		return entity.NewStoreEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCheapsharkSDK = core.NewCheapsharkSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewCheapsharkSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *CheapsharkSDK  { return NewCheapsharkSDK(nil) }
func Test() *CheapsharkSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
