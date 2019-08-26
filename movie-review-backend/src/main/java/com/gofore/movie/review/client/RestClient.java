package com.gofore.movie.review.client;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.gofore.movie.review.model.MovieResponse;
import com.gofore.movie.review.model.MovieReviewNyt;
import com.gofore.movie.review.model.MovieReviewOmdbByS;
import com.gofore.movie.review.model.MovieReviewOmdbByT;
import com.gofore.movie.review.model.MovieSummary;
import com.gofore.movie.review.model.Results;
import com.gofore.movie.review.model.Search;

@Component("restClient")
public class RestClient {

	private static final Logger logger = LoggerFactory.getLogger(RestClient.class);
	
	@Autowired
	private RestTemplate restTemplate;

	@Value("${omdb.url}")
	private String omdbUrl;

	@Value("${omdb.apikey}")
	private String omdbUrlApikey;
	
	@Value("${nyt.url}")
	private String nytUrl;
	
	@Value("${nyt.apikey}")
	private String nytUrlApikey;
	
	/**
	 * Fetches movie review data from OMDB API and NYT API for each movie title and returns MovieResponse.
	 * @param movieSearch
	 * @param page
	 * @return MovieResponse
	 * @throws InterruptedException
	 */
	public MovieResponse generateMovieSummary(String movieSearch, Integer page) throws InterruptedException {
		List<MovieSummary> summaryList = new ArrayList<MovieSummary>();
		MovieResponse response = new MovieResponse();
		String omdbUrlByS = "";
		try {
			if (page != null) {
				omdbUrlByS = omdbUrl + "/?s=" + movieSearch + "&page=" + page.intValue() + "&apikey=" + omdbUrlApikey;
			} else {
				omdbUrlByS = omdbUrl + "/?s=" + movieSearch + "&apikey=" + omdbUrlApikey;
			}
			
			MovieReviewOmdbByS movieReviewOmdbByS = restTemplate.getForEntity(omdbUrlByS, MovieReviewOmdbByS.class)
					.getBody();
			if (movieReviewOmdbByS.isResponse()) {
				Iterator<Search> iter = movieReviewOmdbByS.getSearch().iterator();
				while (iter.hasNext()) {
					Search search = iter.next();
					MovieSummary summary = new MovieSummary();
					//Async call to omdb api
					CompletableFuture<MovieSummary> omdb = setMovieReviewsFromOmdb(search.getTitle(), summary);
					//Async call to nyt api
					CompletableFuture<MovieSummary> nyt = setSummaryShortFromNyt(search.getTitle(), summary);
					//Wait till above 2 apis complete their job.
 					CompletableFuture.allOf(omdb, nyt).join();			
					summaryList.add(summary);
				}
				response.setMovieSummaryList(summaryList);
				response.setPageNumber(Math.ceil(movieReviewOmdbByS.getTotalResults() / 10.0));
			} else {
				response.setError(movieReviewOmdbByS.getError());
			}

		} catch (Exception e) {
			response.setError(e.getMessage());
		}
		return response;
	}
	
	@Async
	private CompletableFuture<MovieSummary> setMovieReviewsFromOmdb(String title, MovieSummary summary) {
		//logger.info("setMovieReviewsFromOmdb");
		MovieReviewOmdbByT movieReviewByT = restTemplate
				.getForEntity(omdbUrl + "/?t=" + title + "&apikey=" + omdbUrlApikey,
						MovieReviewOmdbByT.class)
				.getBody();
		summary.setTitle(movieReviewByT.getTitle());
		summary.setPlot(movieReviewByT.getPlot());
		summary.setPoster(movieReviewByT.getPoster());
		summary.setYear(movieReviewByT.getYear());
		summary.setImdbRating(movieReviewByT.getImdbRating());
		summary.setImdbVotes(movieReviewByT.getImdbVotes());
		summary.setLanguage(movieReviewByT.getLanguage());
		return CompletableFuture.completedFuture(summary);
	}
	
	@Async
	private CompletableFuture<MovieSummary> setSummaryShortFromNyt(String title, MovieSummary summary) {
		//logger.info("setSummaryShortFromNyt");
		MovieReviewNyt movieReviewNyt = restTemplate
				.getForEntity(nytUrl + "api-key=" + nytUrlApikey + "&query=" + title,
						MovieReviewNyt.class)
				.getBody();
		if(movieReviewNyt.getNum_results() == 0) {
			summary.setSummary_short("N/A");
		}
		Iterator<Results> iterNyt = movieReviewNyt.getResults().iterator();
		while (iterNyt.hasNext()) {
			Results result = iterNyt.next();
			if (result.getDisplay_title().equalsIgnoreCase(title)) {
				summary.setSummary_short(result.getSummary_short());
			}
		}
		return CompletableFuture.completedFuture(summary);
	}
}
