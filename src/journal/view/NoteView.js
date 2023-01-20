import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks"
import { setActiveNote, startSaveNote } from "../../store/journal"
import { ImageGallery } from "../components"

export const NoteView = () => {

	const dispatch = useDispatch();

	const { active: note } = useSelector( state => state.journal );

	const { body, title, date, onInputChange, formState } = useForm( note );

	const dateString = useMemo(() => {
		const newDate = new Date( date );
		return newDate.toUTCString();
	}, [ date ]);

	useEffect(() => {
	  	dispatch( setActiveNote( formState ));
	
	}, [ formState ])
	
	const onSaveNote = () => {
		dispatch( startSaveNote() );
	}

	return (
		<Grid container direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
			<Grid item>
				<Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
			</Grid>
			<Grid item>
				<Button 
					color='primary' 
					sx={{ p: 2}}
					onClick={ onSaveNote }
				>
					<SaveOutlined sx={{ fontSize: 30, mr: 1}} />
					Guardar
				</Button>
			</Grid>

			<Grid container>
				<TextField
					type='text'
					variant="filled"
					fullWidth
					label='Título'
					placeholder="Ingrese un título"
					sx={{ border: 'none', mb: 1}}
					name="title"
					onChange={ onInputChange }
					value={ title }
				/>
				<TextField
					type='text'
					variant="filled"
					fullWidth
					multiline
					placeholder="¿Qué sucedió hoy?"
					minRows={ 5 }
					sx={{ border: 'none', mb: 1}}
					name="body"
					onChange={ onInputChange }
					value={ body }
				/>
			</Grid>

			<ImageGallery />
		</Grid>
	)
}
