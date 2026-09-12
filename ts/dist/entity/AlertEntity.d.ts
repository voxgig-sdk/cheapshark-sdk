import { CheapsharkEntityBase } from '../CheapsharkEntityBase';
import type { CheapsharkSDK } from '../CheapsharkSDK';
import type { Control } from '../types';
import type { Alert, AlertListMatch, AlertCreateData, AlertRemoveMatch } from '../CheapsharkTypes';
declare class AlertEntity extends CheapsharkEntityBase<Alert> {
    constructor(client: CheapsharkSDK, entopts: any);
    make(this: AlertEntity): AlertEntity;
    list(this: any, reqmatch?: AlertListMatch, ctrl?: Control): Promise<AlertEntity[]>;
    create(this: any, reqdata?: AlertCreateData, ctrl?: Control): Promise<AlertEntity>;
    remove(this: any, reqmatch?: AlertRemoveMatch, ctrl?: Control): Promise<AlertEntity>;
}
export { AlertEntity };
