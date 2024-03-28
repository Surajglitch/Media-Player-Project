export {removemovie} from '../reducers/movieSlice'
import axios from '../../utils/axios'
import { loadmovie } from '../reducers/movieSlice'



export const asyncloadmovie  = (id)=> async(dispatach , detState) =>{
  try{
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchprovider = await axios.get(`/movie/${id}/watch/providers`);
    const translations = await axios.get(`/movie/${id}/translations`);
    
    let theultimate  = {
      details:detail.data,
      externalid:externalid.data,
      recommendations:recommendations.data.results,
      similar:similar.data.results,
      translations:translations.data.translations.map((t=>t.english_name)),
      videos:videos.data.results.find( m => m.type === "Trailer"),
      watchprovider:watchprovider.data.results.IN,
    }

    dispatach(loadmovie(theultimate));
  }
  catch(err){
    console.log(err)
  }
}
