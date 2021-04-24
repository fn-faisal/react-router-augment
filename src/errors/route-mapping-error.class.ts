export class RouteMappingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "[AUG_ERROR]RouteMapping";
  }
}
