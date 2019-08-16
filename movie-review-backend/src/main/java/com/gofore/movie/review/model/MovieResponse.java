package com.gofore.movie.review.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieResponse {
	private List<MovieSummary> movieSummaryList;
	private double pageNumber;
	private String error;
}
