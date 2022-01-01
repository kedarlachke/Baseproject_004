import {useState} from 'react'
import { getDocumenForSave } from '../common/CommonLogic';
import {initDocumentstatus,newDocument} from '../common/constant'

function useSaveAction(handleDelete:any, handleSave:any,handleSaveCheck:any,doctype:String,doctypetext:String,
  resetFocus:any ) {
        const [currentdocument, modifydocument] = useState({})
  const [documentstatus, setDocumentstatus] = useState(initDocumentstatus)
  const [redirect, goBack] = useState(false)
  const doctyp= doctype
  const doctyptxt= doctypetext
  const closeSnackBar=()=>{
    let docstatus={...documentstatus}
      docstatus.snackbaropen=false;
    setDocumentstatus(docstatus)
  }
    const setDocumentAction = async (action: string) => {
        let currentDoc:any = { ...currentdocument }
        currentDoc.doctype = doctyp;
        currentDoc.doctypetext=doctyptxt;
        const { doctypetext, docnoprefix, doctype } = currentDoc;
        let action_type = '';
        let isNew = false;
        if (action == 'save_new') {
          action_type = 'save';
          isNew = true;
        }
        else {
          action_type = action
        }
        let docstatus = {...documentstatus}
        switch (action_type) {
          case 'delete':
            docstatus = {...documentstatus}
            docstatus.action= true;
            docstatus.dailogtitle= doctypetext + ' Deletion';
            docstatus.dailogtext= 'Delete ' + doctypetext + '?'
            docstatus.yesaction= async () => {
              await handleDelete(currentDoc._id)
              modifydocument(newDocument(doctype,doctypetext))
                docstatus.action= false;
                docstatus.snackbaropen=true;
                docstatus.snackbarseverity='success';
                docstatus.snackbartext= doctypetext + ' Deleted'
                setDocumentstatus({...docstatus})
            }
              docstatus.noaction= () => {
              docstatus.action = false;
              setDocumentstatus({...docstatus})
            }
            setDocumentstatus(docstatus);
            resetFocus()
            break;
          case 'clear':
            docstatus = {...documentstatus}
            docstatus.action= true,
            docstatus.dailogtitle= ' Clear ' + doctypetext,
            docstatus.dailogtext = 'Clear un-saved  ' + doctypetext + '?',
            docstatus.yesaction = () => {
                modifydocument(newDocument(doctype,doctypetext))
                docstatus.action= false
                docstatus.snackbaropen= true
                docstatus.snackbarseverity= 'success',
                docstatus.snackbartext= doctypetext + ' Cleared'
                setDocumentstatus(docstatus);
               
              },
              docstatus.noaction= () => {
                docstatus.action= false
                setDocumentstatus(docstatus);
              }
              setDocumentstatus(docstatus);  
              resetFocus()      
            break;
    
          case 'save':
            currentDoc.validatemode = 'save';
            currentDoc = handleSaveCheck(currentDoc);
            let isSaveOk = !Object.keys(currentDoc.errorsAll).some((x: any) => currentDoc.errorsAll[x]);
            currentDoc = getDocumenForSave(currentDoc)
            if (!isSaveOk) {
              modifydocument({...currentDoc})
              docstatus.snackbaropen = true
              docstatus.snackbarseverity = 'error'
              docstatus.snackbartext = 'Errors found'
              setDocumentstatus(docstatus);
            }
            else {
              if (isNew){           
                await handleSave(currentDoc)
                modifydocument(newDocument(doctype,doctypetext))
              }else {
                let retdoc:any=await handleSave(currentDoc)
                modifydocument({...retdoc["save"+doctypetext]})
                
              }
              docstatus.snackbaropen = true;
              docstatus.snackbarseverity = 'success';
              docstatus.snackbartext = doctypetext + ' Saved';
              setDocumentstatus(docstatus);
            }
            resetFocus();
            break;
        }
      }
      return [setDocumentAction,documentstatus,setDocumentstatus,currentdocument,modifydocument,redirect, goBack,closeSnackBar]
}

export default useSaveAction
