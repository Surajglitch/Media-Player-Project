export {removeperson} from '../reducers/personSlice'
import axios from '../../utils/axios'
import { loadperson } from '../reducers/personSlice'



export const asyncloadperson  = (id)=> async(dispatach , detState) =>{
  try{
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const CombinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const MovieCredits = await axios.get(`/person/${id}/movie_credits`);
    const TvCredits = await axios.get(`/person/${id}/tv_credits`);
    
    let theultimate  = {
      details:detail.data,
      externalid:externalid.data,
      CombinedCredits:CombinedCredits.data,
      MovieCredits:MovieCredits.data,
      TvCredits:TvCredits.data,
      
    }
    console.log(theultimate);

    dispatach(loadperson(theultimate));
  }
  catch(err){
    console.log(err)
  }
}
