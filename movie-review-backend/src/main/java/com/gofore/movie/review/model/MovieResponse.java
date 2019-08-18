package com.gofore.movie.review.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * MovieResponse returned to front end.
 * @author sugupta
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieResponse {
	
	/**
	 * List holds movie summary data for all movies.
	 */
	private List<MovieSummary> movieSummaryList;
	private double pageNumber;
	private String error;
}
