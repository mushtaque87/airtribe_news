declare module 'express-group-routes' {
  import { Router } from 'express';

  type GroupCallback = (router: Router) => void;

  export function group(prefix: string, callback: GroupCallback): Router;
}
