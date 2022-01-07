import React, { useMemo, useEffect, useState,useRef } from 'react'
import { connect } from 'react-redux'
import AddFabButton from '../common/Fab/AddFabButton'
import Table from '../common/table/Table'
import Column from '../common/table/Column'
import { Redirect, withRouter } from 'react-router-dom'
import {addusers} from '../Redux/ActionCreators'
//import { getRecommendations } from '../Redux/reducers/actions'
import useSaveAction from '../Hooks/useSaveAction'
import recommendationsQuery from '../queries/recommendationQuery'
import useTableAction from '../Hooks/useTableAction'
import * as doctypes from '../common/Doctypes';
import {useAltKey,useKey} from '../common/shortcurkeys'
import Loader from '../common/Loader/Loader'
import {handleDelete, getRecommendations,handleSave} from './CrudRecommendation'
import Messagesnackbar from '../common/Alert/Alert'
import AlertDialog from '../common/PopupModals/ConfirmationModal'
function RecommendationList() {
   const query = useMemo(()=>(recommendationsQuery),[1])
   const [tableData,loaderDisplay,docno, setDocno,redirect, setRedirect]:any=useTableAction(query,"recommendation")
   let tabledata:any=[]
   if(tableData) {
    tabledata= [...tableData]
   }
   const setDocStatus = (id: string, redirect: boolean) => {
    setDocno(id)
    setRedirect(redirect)
  }
  if (redirect) {
    let redirectpath = '/recommendationedit?_id=' + docno
    return <Redirect push to={redirectpath} /> 
  } else
   return (
        <div className="card">
            <Loader display={loaderDisplay}/>
          <div className="card-body">
          <Table
                data={tabledata}
                defaultNoOfRows={10}
                actionColWidth={80}
                headerText="User List"
                 addNew={setDocStatus}
                 onRowClick={setDocStatus}
                // searchref={inpref}
                actions={[
                  // {
                  //   action: (id: any) => {
                  //     setDocStatus(id, true)
                  //   },
                  //   icon: 'fas fa-edit',
                  //   text: 'Edit',
                  //   className: 'table-button submit',
                  // },
                  {
                    action: (id: any) => {
                        alert("delete")
                    //   currentdocument["_id"]=id;
                    //   setDocumentAction('delete')
                    //   loadDataTable();
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
    )
}

export default RecommendationList
