import React from 'react'

const Notification = ({ color, text }) => {
  return(
    <p>{`This is the color: ${color} and this is the text: ${text}`}</p>
  )
}

export default Notification