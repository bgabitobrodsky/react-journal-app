import { CloseOutlined, DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"

import { ImageGallery } from "../components"
import { useNoteView } from "../hooks/useNoteView";

export const NoteView = () => {

	const {
        isNewNote,
        fileInputRef,
        dateString,
        body, 
        title,
        isSaving,
        imageUrls,
        onInputChange, 
        onClose,
        onDelete,
        onFileInputChange,
        onSaveNote,
    } = useNoteView();

	return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            {
                ( isNewNote )?
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
                images={ imageUrls }
            />
		</Grid>
	)
}
