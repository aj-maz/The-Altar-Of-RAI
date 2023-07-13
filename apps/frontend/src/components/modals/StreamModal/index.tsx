import React from 'react'

import Modal from '../common/Modal'

interface Props {
  content: string
  isOpen: boolean
  onDismiss: () => void
  title?: string
}

const StreamModal: React.FC<Props> = (props) => {
  const { content, isOpen, onDismiss, title = '' } = props

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} width={900}>
      This is gonna be the stream modal
    </Modal>
  )
}

export default StreamModal
