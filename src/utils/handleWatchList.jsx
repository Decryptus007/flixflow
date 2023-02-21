import { toast } from 'react-toastify';

export const addToWatchList = (movieObj) => {
  const customId = 'customId'
  const customIdAlready = 'customIdAlready'
  function add() {
    return toast.success('Added to your Watchlist', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      theme: "dark",
      toastId: customId
    });
  }
  function removeMovie() {
    return toast.warning('Removed from your Watchlist', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      theme: "dark",
      toastId: customIdAlready
    });
  }

  let watchlist = []
  const { id, image, title, year, starList, crew } = movieObj
  if (localStorage.getItem('watchlist') !== null) {
    watchlist = JSON.parse(localStorage.getItem('watchlist'))
    const hasId = watchlist.some(movie => movie.id === id);

    // Check if movie is not added
    if (!hasId) {
      let starActor;
      if (starList && starList.length > 0) {
        starActor = starList[0].name;
      } else if (crew) {
        starActor = crew.split(",")[0];
      } else {
        starActor = "Unknown";
      }

      watchlist = [
        {
          id: id,
          image: image,
          title: title,
          year: year,
          starActor: starActor
        },
        ...watchlist
      ];

      localStorage.setItem('watchlist', JSON.stringify(watchlist))
      add()
    } else {
      // Remove Movie from Watchlist
      watchlist = watchlist.filter(movie => movie.id !== id);

      localStorage.setItem('watchlist', JSON.stringify(watchlist))

      removeMovie()
    }
  } else {
    watchlist = [
      {
        id: id,
        image: image,
        title: title,
        year: year
      },
      ...watchlist
    ]

    localStorage.setItem('watchlist', JSON.stringify(watchlist))

    add()
  }
}

export function checkIfMovieExist(id) {
  let hasId

  if (localStorage.getItem('watchlist') !== null) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist'))
    hasId = watchlist.some(movie => movie.id === id);
  } else {
    hasId = false
  }

  return hasId
}

export function getWatchlistNo() {
  if (localStorage.getItem('watchlist') !== null) {
    const watchlistNo = JSON.parse(localStorage.getItem('watchlist')).length
    return watchlistNo
  } else {
    return '0'
  }
} 