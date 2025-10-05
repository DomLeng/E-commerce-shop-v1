import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    }
})

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = mimetypes.test(file.mimetype)

    if (mimetype && extname) {
        cb(null, true)
    } else {
        cb(new Error('Images only! Please upload only image files.'), false)
    }
}

const upload = multer({ 
    storage, 
    fileFilter,
    limits:{
        fileSize: 1024 * 1024 * 5 
    }
 })
const uploadSingleImage = upload.single('image')

router.post('/', (req, res) => {
    uploadSingleImage(req,res, function (err) {
        if (err) {
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).send({message: 'File too larget. Maximum size is 5MB'})
                }
            }   
            return res.status(400).send({message: err.message})            
        }  

        if (!req.file) {
            return res.status(400).send({message: 'No file uploaded'})
        }
        
        res.status(200).send({
            message:'Image uploaded successfully',
            image: `/${req.file.path.replace(/\\/g, '/')}`
        })
    })
})

export default router
