import { IconButton } from '@mui/material'
import { JournalLayout } from '../layout'
import { NoteView, NothingSelectedView } from '../view'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { createNewNote } from '../../store/journal'

export const JournalPage = () => {

  const { isSaving, active } = useSelector( state => state.journal );

  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch( createNewNote() );
  }

  return (
    <JournalLayout>

      { (!!active)
        ? <NoteView />
        :<NothingSelectedView />
      }

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
