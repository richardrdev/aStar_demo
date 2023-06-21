import Entity from '../Model/Entities/Entity';
import TileModel from '../Model/TileModel';

interface TileStep {
    direction: string;
    tile: TileModel;
}

interface TileStepNullable {
    direction: string;
    tile: TileModel | null;
}

interface TileState {
    entity: Entity | null;
    considered: boolean;
    inPath: boolean;
    inPathEntrance: string;
    inPathExit: string;
    isClosed: boolean;
    fScore: number;
}

export { TileStep, TileStepNullable, TileState };
