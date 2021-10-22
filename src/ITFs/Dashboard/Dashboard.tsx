import React, { useState } from 'react'
import AppbarBottom from '../common/AppBarBottom/AppbarBottom'
import AddFabButton from '../common/Fab/AddFabButton'
import Customers from '../Customers/Customers'
import Customer from '../Customers/customer'
import Projects from '../Projects/Projects'
import Header from './Header/Header'
import IndicatorCards from './Indicators/IndicatorCards'
import {SideBar} from './Menu/SideBar'
import { Input } from '../common/InputFields/Input/Input'
import { Select } from '../common/InputFields/Select/Select'
import Inventery from '../Inventory/Inventery'
import { Button } from '../common/Button/Button'
import {connect} from 'react-redux'
import UserComponent from '../User/UserComponent'
import UserListComponent from '../User/UserListComponent'
import {BrowserRouter as Rounter, Route, Switch} from 'react-router-dom'
//import {getUsers,addusers} from '../Redux/ActionCreators'

function displaySelectedComponent(displayItem: string) {
  let selectedComp = null
  switch (displayItem) {
    case 'Dashboard':
      selectedComp = (
        <>
          <IndicatorCards />
          <div className="recent-grid">
            <Projects />
            <Customers />
          </div>
        </>
      )
      break

    case 'Projects':
      selectedComp = (
        <>
          <Projects />
          <AddFabButton />
        </>
      )
      break
    case 'Customers':
      selectedComp = (
        <>
          {/* <TextField label="abc"></TextField>
            <Checkbox></Checkbox>
            <Switch></Switch> */}
          {/* <AppbarBottom/>   */}
          
          <Button wd="4" label="Resgister" className={'btn1'} />
        </>
      )
      break
    case 'Orders':
      selectedComp = (
        <>
          <Customer />
        </>
      )
      break
    case 'Inventory':
      selectedComp = (
        <>
          <Inventery />
        </>
      )
      break
      case 'Users':
      selectedComp = (
        <>
          <UserListComponent/>
        </>
      )
      break
    default:
      break
  }
  return selectedComp
}

const DashboardComponent = (props: any) => {
  return (
    <>
      <IndicatorCards />
      <div className="recent-grid">
        <Projects />
        <Customers />
      </div>
    </>
  )
}

function Dashboard(props: any) {
  // getUsers({applicationid:'15001500',client:'45004500',lang: 'EN'}).then((users:any)=>{
  //   if(props){
  //   props.addusers(users)
  // }
  // });
  console.log('in dashboard')
  const [displayComponent, setDisplayComponent] = useState('Dashboard')
  return (
    <Rounter>
  
      <input type="checkbox" id="nav-toggle" />
      <SideBar selectcomponent={setDisplayComponent} />
      <div className="main-content">
        <Header title={displayComponent} />
        <main>
          <Switch>
            <Route exact path="/">
              <DashboardComponent {...props}/>
            </Route>
            <Route exact path="/Users">
              <UserListComponent {...props}/>
            </Route>
            <Route exact path="/useredit">
              <UserComponent {...props}/>
            </Route>
          {/* {displaySelectedComponent(displayComponent)} */}
          </Switch>
        </main>
      </div>
      </Rounter>
    
  )
}

const mapStateToProps=(state:any)=>{
return {
  users:state.users
}
}
const mapdispatcherToProp=(dispatch:any)=>{
  return {
    //addusers :(users:any)=> dispatch(addusers(users))
  }
}
export default connect(mapStateToProps,mapdispatcherToProp)(Dashboard);
