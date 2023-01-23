import { ImageList, ImageListItem } from '@mui/material';
import { useSelector } from 'react-redux';

export const ImageGallery = () => {

  	const { active: note } = useSelector( state => state.journal)


  	return (
		<ImageList sx={{ width: '100%', height: 500 }} cols={ 4 } rowHeight={200}>
			{
				note.imageUrls.map( ( url ) => (
				<ImageListItem key={url}>
					<img
						src={`${url}?w=200&h=200&fit=crop&auto=format`}
						srcSet={`${url}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
						//alt={item.title}
						loading="lazy"
					/>
				</ImageListItem>
			))
	  	}
		</ImageList>
  	);
}