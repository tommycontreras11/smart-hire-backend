import { Request, Response, NextFunction } from 'express';

interface Path {
  path: string;
  method: string;
  all?: boolean;
}

export const unless = (
  datas: Array<Path>,
  middleware: (req: Request, res: Response, next: NextFunction) => void | Promise<void>
) => {
  return function (req: Request, res: Response, next: NextFunction): void {
    const exclude = datas.find((data) => {
      if (data.path.includes('/:')) {
        const split1 = data.path.split('/');
        const split2 = req.path.split('/');
        const formatted1: Array<string> = [];
        const formatted2: Array<string> = [];

        if (split1.length === split2.length) {
          split1.forEach((d, i) => {
            if (!d.includes(':')) {
              formatted1.push(d);
              formatted2.push(split2[i]);
            }
          });

          if (formatted1.join('/') === formatted2.join('/')) {
            return data;
          }
          return null;
        }
        return null;
      } else {
        return (
          (data.method === req.method && data.path === req.path) ||
          (data.all && req.path.includes(data.path))
        );
      }
    });

    if (exclude) {
      next();
    } else {
      middleware(req, res, next);
    }
  };
};
