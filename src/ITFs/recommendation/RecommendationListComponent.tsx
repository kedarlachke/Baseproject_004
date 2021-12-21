import React, { useMemo, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import AddFabButton from '../common/Fab/AddFabButton'
import Table from '../common/table/Table'
import Column from '../common/table/Column'
import { Redirect, withRouter } from 'react-router-dom'
import {addusers} from '../Redux/ActionCreators'
import { getRecommendations } from '../Redux/reducers/actions'
import * as doctypes from '../common/Doctypes';
export const UserListComponent = (props: any) => {

  const{recommendatios} = props
  const [docno, setDocno] = useState('NO-ID')
  const [redirect, setRedirect] = useState(false)
  const [recommendations, setRecommendations] = useState([]) 
  const setDocStatus = (id: string, redirect: boolean) => {
    setDocno(id)
    setRedirect(redirect)
  }
  const goback = () => {
    setDocno('')
    setRedirect(redirect)
  }

  useEffect(() => {
    getRecommendations({applicationid:'15001500',client:'45004500',lang: 'EN'}).then((data:any)=>{
      if(props){
        setRecommendations(data)
    }
    });
    return () => {
      
    }
  }, [])
  let tabledata:any = []
  if(recommendations){
    tabledata =useMemo(() => [...recommendations], [recommendations])
}

  if (redirect) {
    let redirectpath = '/recommendationedit?_id=' + docno
    return <Redirect push to={redirectpath} /> 
  } else
    return (
      <div className="projects">
        <div className="card">
          <div className="card-body">
            
              <Table
                data={tabledata}
                defaultNoOfRows={10}
                actionColWidth={80}
                headerText="User List"
                addNew={setDocStatus}
                actions={[
                  {
                    action: (id: any) => {
                      setDocStatus(id, true)
                    },
                    icon: 'fas fa-edit',
                    text: 'Edit',
                    className: 'table-button submit',
                  },
                  {
                    action: (id: any) => {
                      alert(id)
                    },
                    icon: 'fas fa-trash-alt',
                    text: 'delete',
                    className: 'table-button danger',
                  }
                ]}
              >
                <Column fieldname="name" columnname="Name"></Column>
                <Column fieldname="timeframe" columnname="Time Frame"></Column>
                <Column fieldname="target1" columnname="Target 1"></Column>
                <Column fieldname="target2" columnname="Target 2"></Column>
                <Column fieldname="target3" columnname="Target 3"></Column>
              </Table>
            
          </div>
        </div>
        <AddFabButton action={setDocStatus} />
      </div>
    )
}

const mapStateToProps = (state: any) => {
  console.log("-------documents----",state.documents.documents)
  const recdoc = state?.documents?.documents?.filter((document:any) => document.doctype==doctypes.RECOMMENDATION )
  console.log("-------recdoc----",recdoc)
  return({
  users: state.documents.users,
  docnos: state.documents.docnos,
  companies: state.documents.companies,
  recommendations:recdoc
})}

const mapdispatcherToProp=(dispatch:any)=>{
  return {
    addusers :(users:any)=> dispatch(addusers(users))
  }
}
export default withRouter(
  connect(mapStateToProps,mapdispatcherToProp)(UserListComponent)
)
