package com.gofore.movie.review.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Search {

	@JsonProperty("Title")
	private String title;
	
	@JsonProperty("Year")
	private String year;
	
	
	private String imdbID;
	
	@JsonProperty("Type")
	private String type;
	
	@JsonProperty("Poster")
	private String poster;
	
}