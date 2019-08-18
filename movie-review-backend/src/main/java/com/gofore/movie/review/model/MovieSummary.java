package com.gofore.movie.review.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieSummary {
	private String title;
	private String poster;
	
	//Movie Information View from OMDB. 
	private String year;
	private String plot;
	private String imdbRating;
	private String imdbVotes;
	private String language;
	
	//summary_short from NYT.
	private String summary_short;
}
