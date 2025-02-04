import multer from 'multer'

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, 'public/images/')
	},
	filename: (_req, file, cb) => {
		cb(null, `${file.originalname}`)
	},
})

const upload = multer({ storage })

export const multerMiddleware = upload.single('file')
