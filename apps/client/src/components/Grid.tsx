import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import type { ListOfGifs } from '@giffy/types'
import { Frame } from './Frame'

interface Props {
	data: ListOfGifs | undefined
}

export function Grid({ data }: Props) {
	const gifs = data?.gifs

	if (!gifs || gifs.length === 0) return null

	return (
		<ResponsiveMasonry
			className="w-full"
			columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4, 1280: 5, 1440: 6 }}
		>
			<Masonry className="space-x-2.5">
				{gifs.map(({ alt, id, images,title }) => (
					<Frame key={id} alt={alt} id={id} src={images.webp ?? images.gif} title={title} />
				))}
			</Masonry>
		</ResponsiveMasonry>
	)
}
