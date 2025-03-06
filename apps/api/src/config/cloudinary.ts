import { v2 as cloudinary } from 'cloudinary'
;(async () => {
	// Configuration
	cloudinary.config({
		cloud_name: 'dm5rzwoa3',
		api_key: '844888962214969',
		api_secret: process.env.CLOUDINARY_API_KEY, // Click 'View API Keys' above to copy your API secret
	})
})()
