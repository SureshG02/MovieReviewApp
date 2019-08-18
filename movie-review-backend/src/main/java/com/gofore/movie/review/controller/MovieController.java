package com.gofore.movie.review.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.gofore.movie.review.client.RestClient;
import com.gofore.movie.review.model.MovieResponse;

@CrossOrigin
@RestController
public class MovieController {

	@Autowired
	private RestClient restClient;
	
	List<MovieResponse> list = new ArrayList<MovieResponse>();
	
	/**
	 * 
	 * @param movieSearch
	 * @param page
	 * @return ResponseEntity<MovieResponse>
	 * @throws InterruptedException
	 */
	@RequestMapping(value = {"/movie/review/", "/movie/review"}, method = RequestMethod.GET)
	public ResponseEntity<MovieResponse>  movieReviewList(@RequestParam(name = "title") String movieSearch,
			@RequestParam(name = "page", required = false) Integer page) throws InterruptedException {

		MovieResponse reviewOmdb = restClient.generateMovieSummary(movieSearch, page);
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(reviewOmdb);
	}

}
