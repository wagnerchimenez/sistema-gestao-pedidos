export class NegocioErro extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = 'NegocioErro';
  }
}
