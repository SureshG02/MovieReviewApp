package com.gofore.movie.review.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Model maps to search json field in omdb api by search parameter.
 * @author sugupta
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
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
