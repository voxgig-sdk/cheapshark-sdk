import { CheapsharkEntityBase } from '../CheapsharkEntityBase';
import type { CheapsharkSDK } from '../CheapsharkSDK';
import type { Control } from '../types';
import type { Deal, DealListMatch } from '../CheapsharkTypes';
declare class DealEntity extends CheapsharkEntityBase<Deal> {
    constructor(client: CheapsharkSDK, entopts: any);
    make(this: DealEntity): DealEntity;
    list(this: any, reqmatch?: DealListMatch, ctrl?: Control): Promise<DealEntity[]>;
}
export { DealEntity };
