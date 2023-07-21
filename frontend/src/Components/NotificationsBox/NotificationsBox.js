import React, { useContext } from 'react'
import { ProductContext } from '../../Data/ProductContext'


function NotificationsBox() {

    const {notification} = useContext(ProductContext);

    console.log(notification);

  return (
    <div>{notification}</div>
  )
}

export default NotificationsBox