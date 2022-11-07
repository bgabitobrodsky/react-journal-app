import { JournalLayout } from '../layout'
import { NoteView, NothingSelectedView } from '../view'

export const JournalPage = () => {
  return (
    <JournalLayout>

      {/*<NothingSelectedView />*/}

      <NoteView />

    </JournalLayout>
  )
}
