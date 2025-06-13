import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODAzM2FkMjU5YmUwNWZiMzdmMmMyZGJkZDgxYjJlNyIsIm5iZiI6MTc0OTcxMDM0My4wMDgsInN1YiI6IjY4NGE3NjA2NTQ3Nzk4MTFmNDMwMjgzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w7jPm3c7hY1FH6OAXj-fcxB6TO_pDpkgjYpJst_WjBU',
  },
});

export default api;
