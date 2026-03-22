import { v4 as uuidv4 } from 'uuid';

export abstract class EntidadeBase {
  public readonly id: string;
  public criadoEm: Date;
  public atualizadoEm: Date;

  protected constructor(id?: string, criadoEm?: Date, atualizadoEm?: Date) {
    this.id = id ?? uuidv4();
    this.criadoEm = criadoEm ?? new Date();
    this.atualizadoEm = atualizadoEm ?? new Date();
  }

  equals(outra: EntidadeBase): boolean {
    return this.id === outra.id;
  }
}
