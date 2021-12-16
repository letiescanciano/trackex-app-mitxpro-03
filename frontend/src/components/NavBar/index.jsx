import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { AuthContext } from '../../contexts/AuthContext'

import logo from './logo.svg'

const NavBarContainer = styled.div`
  height: 100vh;
  border-right: 1px solid white;
`

const Logo = styled.img`
  padding: 32px;
  width: 150px;
`

const Menu = styled.ul`
  padding: 32px 0;
  list-style-type: none;
`

const MenuItem = styled.li`
  padding: 8px 16px;
  /* color: ${({ active }) => active && '#ff7661'};
  font-weight: ${props => {
    return props.active === true && 'bold'
  }}; */
  ${props => {
    return (
      props.active &&
      css`
        color: #ff7661;
        font-weight: bold;
      `
    )
  }}
`
const NavBar = () => {
  const { logout } = useContext(AuthContext)
  return (
    <NavBarContainer>
      <Logo src={logo} />
      <Menu>
        <MenuItem>Dashboard</MenuItem>
        <MenuItem>Calendar</MenuItem>
        <MenuItem active={true}>Transactions</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </NavBarContainer>
  )
}

export { NavBar } //named export
