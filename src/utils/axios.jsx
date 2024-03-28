import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmYwNGMyYzViMjcxNzk0N2FjZWZhMjY1NzM4MmM2OSIsInN1YiI6IjY1ZmJmN2QxN2Y2YzhkMDE2MzZjMDVkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nV2fllSg_zqsZS21gtq6tUXanhDMARHOgdjPRVqQLgc'
    }
})

export default instance;