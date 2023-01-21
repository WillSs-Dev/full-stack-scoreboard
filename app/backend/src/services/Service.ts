export default abstract class Service {
  abstract getAll(): Array<Response>;
  abstract getById(id: number): Response;
}
