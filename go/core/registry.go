package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAlertEntityFunc func(client *CheapsharkSDK, entopts map[string]any) CheapsharkEntity

var NewDealEntityFunc func(client *CheapsharkSDK, entopts map[string]any) CheapsharkEntity

var NewGameEntityFunc func(client *CheapsharkSDK, entopts map[string]any) CheapsharkEntity

var NewStoreEntityFunc func(client *CheapsharkSDK, entopts map[string]any) CheapsharkEntity

