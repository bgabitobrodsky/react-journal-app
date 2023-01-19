import { IconButton } from '@mui/material'
import { JournalLayout } from '../layout'
import { NoteView, NothingSelectedView } from '../view'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'

export const JournalPage = () => {

  const { isSaving } = useSelector( state => state.journal );

  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>

      <NothingSelectedView />
      {/*<NoteView />*/}

      <IconButton
        onClick={ onClickNewNote }
        size='large'
        sx={{
          color:'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        disabled={ isSaving }
      >
        <AddOutlined sx={{ fontsize: 30 }}/>

      </IconButton>

    </JournalLayout>
  )
}
