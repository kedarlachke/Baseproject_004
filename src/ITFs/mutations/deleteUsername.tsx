import gql from 'graphql-tag';
export default  gql`
mutation deleteUsername
(
  
  $applicationid:String,
  $client:String,
  $lang:String,
  $username:String,
  $_id:String
 
)
{
    deleteUsername(
   applicationid: $applicationid,
    client: $client,
    lang: $lang,
    username: $username,
    _id:$_id
      )
      {
    username
         }
    }
  
`;
