import { CheapsharkEntityBase } from '../CheapsharkEntityBase';
import type { CheapsharkSDK } from '../CheapsharkSDK';
import type { Control } from '../types';
import type { Store, StoreListMatch } from '../CheapsharkTypes';
declare class StoreEntity extends CheapsharkEntityBase<Store> {
    constructor(client: CheapsharkSDK, entopts: any);
    make(this: StoreEntity): StoreEntity;
    list(this: any, reqmatch?: StoreListMatch, ctrl?: Control): Promise<StoreEntity[]>;
}
export { StoreEntity };
