export default {
    applicationid: '15001500',
      client: '45004500',
      lang: 'EN',
}

export const newDocument = (doctype:String,doctypetext:String) => {
  return {
    doctype,
    doctypetext,
    validatemode: 'touch'
  }
};

export const initDocumentstatus = {
  docconfig: {},
  currentdocument: {},
  action: false,
  snackbaropen: false,
  snackbarseverity: '',
  handlesnackbarclose: () => { },
  snackbartext: '',
  yesaction: () => { },
  noaction: () => { },
  redirect: false,
  goback: false,
  dailogtitle:"",
  dailogtext:""
}