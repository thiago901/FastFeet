import multer from 'multer';
import { resolve, extname } from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, filename, cb) => {
      crypto.randomBytes(16, (err, resp) => {
        if (err) return cb(err);

        return cb(null, resp.toString('hex') + extname(filename.originalname));
      });
    },
  }),
};
