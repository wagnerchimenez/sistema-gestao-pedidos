export abstract class EventoDominio {
  public readonly ocorridoEm: Date;

  constructor() {
    this.ocorridoEm = new Date();
  }
}
