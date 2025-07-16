import multer, { FileFilterCallback } from "multer";

export interface UploaderMiddlewareOptions {
    types?: string[];
    fieldName?: string
}

export class Uploader {
    public fileFilter = (types?: Array<string> ) => {
        return (req: Req, file: Express.Multer.File, cb: FileFilterCallback) => {
            const type = file.mimetype;
            if(!types) return cb(null, true)
            if(types.length === 0) return cb(null, true);

            if(types.some((accepted: string) => type === accepted)) {
                return cb(null, true)
            }else {
                req.uploaderError = new Error(`we only accept these types: ${types}`)
                return cb(null, false)
            }
        }
    }

    public storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, this.uploadDir || this.defaultUploadDir)
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + Date.now())
        }
    })

    public defaultUploadDir = "upload/"

    constructor(public uploadDir?: string) {}

    uploadMultipleFiles(options: UploaderMiddlewareOptions) {
        return multer({ storage: this.storage, fileFilter: this.fileFilter(options.types) })
            .array(options.fieldName || 'file');
    }

    uploadSingleFile(options: UploaderMiddlewareOptions) {
        return multer({ storage: this.storage, fileFilter: this.fileFilter(options.types) })
            .single(options.fieldName || 'file')
    }
}