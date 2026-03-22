export class EntidadeNaoEncontradaErro extends Error {
  constructor(entidade: string, id: string) {
    super(`${entidade} com id "${id}" não encontrado(a).`);
    this.name = 'EntidadeNaoEncontradaErro';
  }
}
