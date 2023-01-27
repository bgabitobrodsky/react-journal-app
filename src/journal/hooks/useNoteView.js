import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useForm } from "../../hooks";
import { removeActive, setActiveNote, startDeletingNote, startFileUpload, startSaveNewNote, startUpdateNote } from "../../store/journal";
import 'sweetalert2/dist/sweetalert2.css';

export const useNoteView = () => {
    const dispatch = useDispatch();

	const { active: note, messageSaved, isSaving } = useSelector( state => state.journal );

	const { body, title, date, onInputChange, formState } = useForm( note );

	const dateString = useMemo(() => {
		const newDate = new Date( date );
		return newDate.toUTCString();
	}, [ date ]);

    const isNewNote = useMemo(() => {
        return !note.id
    }, [ note.id ]);

    const imageUrls = useMemo(() => {
        return note.imageUrls
    }, [ note.imageUrls ]);

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


    return {
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
    }
}