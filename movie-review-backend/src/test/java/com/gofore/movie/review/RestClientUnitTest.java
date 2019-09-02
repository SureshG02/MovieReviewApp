package com.gofore.movie.review;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gofore.movie.review.client.RestClient;
import com.gofore.movie.review.model.MovieResponse;
import com.gofore.movie.review.model.MovieReviewNyt;
import com.gofore.movie.review.model.MovieReviewOmdbByS;
import com.gofore.movie.review.model.MovieReviewOmdbByT;
import com.gofore.movie.review.model.MovieSummary;
import com.gofore.movie.review.model.Results;
import com.gofore.movie.review.model.Search;

@RunWith(SpringRunner.class)
@RestClientTest(RestClient.class)
public class RestClientUnitTest {

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private RestClient client;

	@Autowired
	private MockRestServiceServer server;

	@Autowired
	private ObjectMapper mapper;

	@Value("${omdb.url}")
	private String omdbUrl;

	@Value("${omdb.apikey}")
	private String omdbUrlApikey;

	@Value("${nyt.url}")
	private String nytUrl;

	@Value("${nyt.apikey}")
	private String nytUrlApikey;

	@Before
	public void setUp() throws Exception {
		server = MockRestServiceServer.createServer(restTemplate);
		final String omdbUrlByS = omdbUrl + "/?s=" + "batman" + "&apikey=" + omdbUrlApikey;
		final String omdbUrlByT = omdbUrl + "/?t=" + "Batman%20Begins" + "&apikey=" + omdbUrlApikey;
		final String nytUrlByQuery = nytUrl + "api-key=" + nytUrlApikey + "&query=" + "Batman%20Begins";

		List<Search> search = new ArrayList<Search>(Arrays.asList(new Search("Batman Begins", "2005", "tt0372784",
				"movie",
				"https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg")));
		String movieReviewOmdbByS = mapper.writeValueAsString(new MovieReviewOmdbByS(search, 366, true, null));
		this.server.expect(requestTo(omdbUrlByS))
				.andRespond(withSuccess(movieReviewOmdbByS, MediaType.APPLICATION_JSON));

		String movieReviewByT = mapper.writeValueAsString(new MovieReviewOmdbByT("Batman Begins", "2005", "PG-13",
				"15 Jun 2005", "140 min", "Action, Adventure", "Christopher Nolan",
				"Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)",
				"Christian Bale, Michael Caine, Liam Neeson, Katie Holmes",
				"After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
				"English, Urdu, Mandarin", "USA, UK", "Nominated for 1 Oscar. Another 14 wins & 72 nominations.",
				"https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
				null, "70", "8.2", "1,207,358", "tt0372784", "movie", "18 Oct 2005", "$204,100,000",
				"Warner Bros. Pictures", "https://www.warnerbros.com/batman-begins", "True"));
		this.server.expect(requestTo(omdbUrlByT)).andRespond(withSuccess(movieReviewByT, MediaType.APPLICATION_JSON));

		String movieReviewNyt = mapper.writeValueAsString(
				new MovieReviewNyt("OK", "Copyright (c) 2019 The New York Times Company. All Rights Reserved.", false,
						0, new ArrayList<Results>()));
		this.server.expect(requestTo(nytUrlByQuery))
				.andRespond(withSuccess(movieReviewNyt, MediaType.APPLICATION_JSON));
	}

	@Test
	public void whenCallingGenerateMovieSummary_thenClientExecutesCorrectCall() throws Exception {
		MovieResponse response = this.client.generateMovieSummary("batman");
		List<MovieSummary> movieSummaryList = new ArrayList<MovieSummary>(Arrays.asList(new MovieSummary(
				"Batman Begins",
				"https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
				"2005",
				"After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
				"8.2", "1,207,358", "English, Urdu, Mandarin", "N/A")));
		String expected = mapper.writeValueAsString(new MovieResponse(movieSummaryList, 37, null));
		assertEquals(expected, mapper.writeValueAsString(response));
	}

}
