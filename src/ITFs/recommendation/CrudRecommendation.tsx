import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../common/CommonLogic';
import constant from '../common/constant'
import recommendationsQuery from '../queries/recommendationQuery'
import deleteRecommendation from '../mutations/DeleteRecommendation';
import { execGql, execGql_xx } from '../gqlclientconfig';

export const handleSave = async (currentdocument: any) => {
    var result: any = '', errorMessage = '', errors = new Array();
    return new Promise<void>(async(resolve, reject) => {
      
    
    try {
      let userForSave = {
        ...constant,
        name: nvl(currentdocument.name, ''),
        recodate: nvl(currentdocument.recodate, ''),
        cmp: nvl(currentdocument.cmp, ''),
        addupto: nvl(currentdocument.addupto, ''),
        sl: nvl(currentdocument.sl, ''),
        target1: nvl(currentdocument.target1, ''),
        target2: nvl(currentdocument.target2, ''),
        target3: nvl(currentdocument.target3, ''),
        target4: nvl(currentdocument.target4, ''),
        target5: nvl(currentdocument.target5, ''),
        target6: nvl(currentdocument.target6, ''),
        target7: nvl(currentdocument.target7, ''),
        target8: nvl(currentdocument.target8, ''),
        target9: nvl(currentdocument.target9, ''),
        
        weightage: nvl(currentdocument.weightage, ''),
        timeframe: nvl(currentdocument.timeframe, ''),
        _id:nvl(currentdocument._id, ''),
        t_id:nvl(currentdocument.t_id, ''),
      }
      result = await execGql('mutation', saveReccomendation, userForSave)
      if (!result) {
        console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
        reject({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      }
      else {
        resolve(result.data)
        return result.data;
      }
    }
    catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
    }
    
  }) 
  }
  
  export const handleDelete = async (_id: string) => {
    var result: any = '', errorMessage = '', errors = new Array();
    try {
      result = await execGql('mutation', deleteRecommendation, { _id })
      if (!result) {
      console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
    }
    else {
      return result.data;
    }
    }
    catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
      // return callback({"errors":errors,"errorMessage":errorMessage},'' );
    }
  }

  export async function getRecommendations(values: any) {
    var result: any = '', errorMessage = '', errors = new Array();
    try {
      result = await execGql('query', recommendationsQuery, values)
      if (!result) {
        console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
        return [];
        // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
      }
      else {
        //return result.data;
        return result.data.recommendations;
      }
    }
    catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
      // return callback({"errors":errors,"errorMessage":errorMessage},'' );
    }
    
  }