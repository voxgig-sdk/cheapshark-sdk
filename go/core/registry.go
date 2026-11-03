package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewDealEntityFunc func(client *CheapsharkSDK, entopts map[string]any) CheapsharkEntityBase

var NewGameEntityFunc func(client *CheapsharkSDK, entopts map[string]any) CheapsharkEntityBase

var NewStoreEntityFunc func(client *CheapsharkSDK, entopts map[string]any) CheapsharkEntityBase

