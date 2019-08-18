package com.gofore.movie.review;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.gofore.movie.review.client.RestClient;
import com.gofore.movie.review.controller.MovieController;
import com.gofore.movie.review.model.MovieResponse;
import com.gofore.movie.review.model.MovieSummary;

@RunWith(SpringRunner.class)
@WebMvcTest(value = MovieController.class, secure = false)
public class MovieControllerUnitTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private RestClient restClient;

	@Test
	public void getMovieSummary() {
		List<MovieSummary> movieSummaryList = new ArrayList<MovieSummary>();
		movieSummaryList.add(new MovieSummary("Batman v Superman: Dawn of Justice",
				"https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
				"2016",
				"Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.",
				"6.5", "580,423", "English",
				"The film, pitting Ben Affleck against Henry Cavill, largely serves as an extended trailer for a slate of coming DC Comics movies like Wonder Woman."));
		try {
			MovieResponse response = new MovieResponse(movieSummaryList, 37, "");
			Mockito.when(restClient.generateMovieSummary("Batman", 1)).thenReturn(response);
			RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/movie/review?title=Batman&page=1")
					.accept(MediaType.APPLICATION_JSON);
			MvcResult result = mockMvc.perform(requestBuilder).andReturn();
			String expected = "{\"movieSummaryList\":[{\"title\":\"Batman v Superman: Dawn of Justice\",\"poster\":\"https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg\",\"year\":\"2016\",\"plot\":\"Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.\",\"imdbRating\":\"6.5\",\"imdbVotes\":\"580,423\",\"language\":\"English\",\"summary_short\":\"The film, pitting Ben Affleck against Henry Cavill, largely serves as an extended trailer for a slate of coming DC Comics movies like Wonder Woman.\"}],\"pageNumber\":37.0,\"error\":\"\"}";					
			assertEquals(expected, result.getResponse().getContentAsString());
		} catch (Exception e) {
			System.out.println(e.getLocalizedMessage());

		}

	}
}
