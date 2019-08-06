import React from 'react'
import { Message } from 'semantic-ui-react'

const Notification = ({ text }) => {
  text=''
  return(
    <Message positive>
      <Message.Header>The operation was successful</Message.Header>
      <p>You have added a blog to the database. Refresh the page to see the blog. {text}</p>
    </Message>
  )
}

export default Notification