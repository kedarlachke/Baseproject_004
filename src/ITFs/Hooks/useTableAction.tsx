
import {useState,useEffect} from 'react'
import { execGql, execGql_xx } from '../gqlclientconfig';
import constant,{initDocumentstatus,newDocument} from '../common/constant';

function useTableAction(graphQuery:any, doctype:String) {
    const [tableData, setTableData] = useState([])
    const [loaderDisplay, setloaderDisplay] = useState(false) 
    const [docno, setDocno] = useState('NO-ID')
    const [redirect, setRedirect] = useState(false)
    const values = {...constant}
   useEffect(() => {
    setloaderDisplay(!loaderDisplay) 
    getTableData().then((data:any)=>{
      
           setTableData(data)
           setloaderDisplay(loaderDisplay)         
       });
     return () => {
       
     }
   }, [])

   const getTableData = () => {
        var result: any = '';
        return new Promise(async(reolve,reject)=>{
          try {       
            result = await execGql('query', graphQuery, values)
            if (!result) {
              console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
              alert("No data to display")
              reject("No data to display")
              // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
            }
            else {
              console.log(result.data[doctype+"s"])
              reolve(result.data[doctype+"s"])
            }
          }
          catch (err:any) {
            let errors = err.errorsGql;
            let errorMessage = err.errorMessageGql;
            console.log({ "errors": errors, "errorMessage": errorMessage })
            reject({ "errors": errors, "errorMessage": errorMessage })
            
          }
        })
      }
      return [tableData,loaderDisplay,docno, setDocno,redirect, setRedirect]
}

export default useTableAction
