import { CheapsharkEntityBase } from '../CheapsharkEntityBase';
import type { CheapsharkSDK } from '../CheapsharkSDK';
import type { Control } from '../types';
import type { Game, GameListMatch } from '../CheapsharkTypes';
declare class GameEntity extends CheapsharkEntityBase<Game> {
    constructor(client: CheapsharkSDK, entopts: any);
    make(this: GameEntity): GameEntity;
    list(this: any, reqmatch?: GameListMatch, ctrl?: Control): Promise<GameEntity[]>;
}
export { GameEntity };
