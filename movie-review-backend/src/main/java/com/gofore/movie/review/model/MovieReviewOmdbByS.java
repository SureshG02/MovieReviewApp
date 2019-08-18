package com.gofore.movie.review.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieReviewOmdbByS {	
	
	@JsonProperty("Search")
	private List<Search> search;
	
	private int totalResults;
	
	@JsonProperty("Response")
	private boolean response;

	@JsonProperty("Error")
	private String error;
	
}
