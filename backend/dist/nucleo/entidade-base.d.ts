export declare abstract class EntidadeBase {
    readonly id: string;
    criadoEm: Date;
    atualizadoEm: Date;
    protected constructor(id?: string, criadoEm?: Date, atualizadoEm?: Date);
    equals(outra: EntidadeBase): boolean;
}
