export class RouteOverrideError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "[AUG_ERROR]RoutOverride";
  }
}
