import { DealEntity } from './entity/DealEntity';
import { GameEntity } from './entity/GameEntity';
import { StoreEntity } from './entity/StoreEntity';
export type * from './CheapsharkTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CheapsharkEntityBase } from './CheapsharkEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class CheapsharkSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Deal(entopts?: Record<string, any>): DealEntity;
    Game(entopts?: Record<string, any>): GameEntity;
    Store(entopts?: Record<string, any>): StoreEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CheapsharkSDK;
    tester(testopts?: any, sdkopts?: any): CheapsharkSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CheapsharkSDK;
export { stdutil, config, BaseFeature, CheapsharkEntityBase, CheapsharkSDK, SDK, };
export type { DirectResult };
