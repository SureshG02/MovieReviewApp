package com.gofore.movie.review.client;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
					MovieReviewOmdbByT movieReviewByT = restTemplate
							.getForEntity("http://www.omdbapi.com/?" + "apikey=e7dab2c4" + "&t=" + search.getTitle(),
									MovieReviewOmdbByT.class)
							.getBody();
					summary.setTitle(movieReviewByT.getTitle());
					summary.setPlot(movieReviewByT.getPlot());
					summary.setPoster(movieReviewByT.getPoster());
					summary.setYear(movieReviewByT.getYear());
					summary.setImdbRating(movieReviewByT.getImdbRating());
					summary.setImdbVotes(movieReviewByT.getImdbVotes());
					summary.setLanguage(movieReviewByT.getLanguage());
					MovieReviewNyt movieReviewNyt = restTemplate
							.getForEntity(nytUrl + "api-key=" + nytUrlApikey + "&query=" + search.getTitle(),
									MovieReviewNyt.class)
							.getBody();
					if(movieReviewNyt.getNum_results() == 0) {
						summary.setSummary_short("N/A");
					}
					Iterator<Results> iterNyt = movieReviewNyt.getResults().iterator();
					while (iterNyt.hasNext()) {
						Results result = iterNyt.next();
						if (result.getDisplay_title().equalsIgnoreCase(search.getTitle())) {
							summary.setSummary_short(result.getSummary_short());
						}
					}
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
}
