import React, { useContext, useState} from 'react'
import { ProductContext } from '../../Data/ProductContext'


function NotificationsBox({ }) {


    // const [text, setText] = useState();
    const {notification} = useContext(ProductContext);

    console.log(notification);

  return (
    <div>{notification}</div>
  )
}

export default NotificationsBox