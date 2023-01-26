import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';
import { CloseOutlined, DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"

import { useForm } from "../../hooks"
import { removeActive, setActiveNote, startDeletingNote, startFileUpload, startSaveNewNote, startSaveNote, startSavingNewNote, startUpdateNote } from "../../store/journal"
import { ImageGallery } from "../components"

export const NoteView = () => {

	const dispatch = useDispatch();

	const { active: note, messageSaved, isSaving } = useSelector( state => state.journal );

	const { body, title, date, onInputChange, formState } = useForm( note );

	const dateString = useMemo(() => {
		const newDate = new Date( date );
		return newDate.toUTCString();
	}, [ date ]);

	const fileInputRef = useRef();

	useEffect(() => {
	  	dispatch( setActiveNote( formState ));
	
	}, [ formState ]);

	useEffect(() => {
	  	if( messageSaved.length > 0 ){
			Swal.fire( messageSaved, '' , 'success' );
		}
	
	}, [ messageSaved ])
	
	
	const onSaveNote = () => {
        if( !!note.id ){
            dispatch( startUpdateNote() );
        }else{
            dispatch( startSaveNewNote() );
        }
	}

	const onFileInputChange = ({ target }) => {
		if( target.files === 0 ) return;

		dispatch( startFileUpload( target.files ));
	}

    const onDelete = () => {
        if( !!note.id ){
            dispatch( startDeletingNote() );
        }else{
            dispatch( removeActive() );
        }
    }

    const onClose = () => {
        dispatch( removeActive() );
    }

	return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            {
                ( !note.id )?
                <Grid container>
                <Typography fontSize={ 30 }> New Note </Typography>
                </Grid>
                : null                
            }
            <Grid item>
				<Typography fontSize={ 20 } fontWeight='light'>{ dateString }</Typography>
			</Grid>
			<Grid item>
				<input 
					type="file" 
					multiple
					onChange={ onFileInputChange }
					style={{ display:'none' }}
					ref={ fileInputRef }
				/>

				<IconButton
					color="primary"
					disabled={ isSaving }
					onClick= { () => fileInputRef.current.click() }
				>
					<UploadOutlined />
				</IconButton>

				<Button 
					color='primary' 
					sx={{ p: 2}}
					onClick={ onSaveNote }
					disabled={ isSaving }
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

            <Grid container
                justifyContent='end'
            >
                <Button
                    onClick={ onDelete }
                    sx={{ mt:2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
                <Button
                    onClick={ onClose }
                    sx={{ mt:2 }}
                    color="primary"
                >
                    <CloseOutlined />
                    Cerrar
                </Button>
            </Grid>

			<ImageGallery 
                images={ note?.imageUrls }
            />
		</Grid>
	)
}
