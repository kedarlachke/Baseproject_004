import gql from 'graphql-tag';
export default  gql`
mutation deleteRecommendation
(
  
  $applicationid:String,
  $client:String,
  $lang:String,
  $_id:String
 
)
{
    deleteRecommendation(
   applicationid: $applicationid,
    client: $client,
    lang: $lang,
    _id:$_id
      )
      {
        _id
         }
    }
  
`;