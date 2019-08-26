export const FINDMOVIESPENDING = 'FINDMOVIESPENDING';
export const FINDMOVIESSUCCESS = 'FINDMOVIESSUCCESS';
export const FINDMOVIESERROR = 'FINDMOVIESERROR';
export const HANDLECLOSE = 'HANDLECLOSE';
export const NEXTPAGECLICK = 'NEXTPAGECLICK';
export const PREVPAGECLICK = 'PREVPAGECLICK';
export const MOVIESEARCHPARAM = 'MOVIESEARCHPARAM';

export function enterMovieSearchParam(searchParam) {
	const action = {
		type: MOVIESEARCHPARAM,
		searchParam
	}
	return action;
}

export function findMovies(query, page) {
	const url = `http://localhost:1035/movie/review?title=${query}&page=${page}`;
	return dispatch => {
		dispatch({
			type: FINDMOVIESPENDING
		});
	return fetch(url, {
			method: 'GET'
		}).then(response => response.json())
			.then(resObj => {
				if (resObj.error) {
					dispatch({
						type: FINDMOVIESERROR,
						error: resObj.error
					});
				} else {
					dispatch({
						type: FINDMOVIESSUCCESS,
						resObj,
						page
					});
				}
			}
			)
			.catch(error => {
				dispatch({
					type: FINDMOVIESERROR,
					error: 'Error while fetching data from backend.'
				});
			});
	}
}
export function handleClose() {
	const action = {
		type: HANDLECLOSE,
	}
	return action;
}

export function nextPageClick() {
	const action = {
		type: NEXTPAGECLICK
	}
	return action;
}

export function prevPageClick() {
	const action = {
		type: PREVPAGECLICK
	}
	return action;
}

