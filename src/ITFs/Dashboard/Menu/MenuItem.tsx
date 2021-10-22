import React from 'react'
import {Link} from 'react-router-dom'
function MenuItem(props: any) {
  const { menuname, iconname, active, selectItem,slug } = props
  console.log('Menu Item ==>' + menuname)
  return (
    <Link to={slug}>
    <li onClick={() => selectItem(menuname)}>
      <a className={active}>
        <span className={iconname}></span>
        <span>{menuname}</span>
      </a>
    </li>
    </Link>
  )
}

export const M_MenuItem = React.memo(MenuItem)
