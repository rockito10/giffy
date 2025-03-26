import { v2 as cloudinary } from 'cloudinary'
;(async () => {
	// Configuration
	cloudinary.config({
		cloud_name: 'dm5rzwoa3',
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLODUINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
	})
})()
