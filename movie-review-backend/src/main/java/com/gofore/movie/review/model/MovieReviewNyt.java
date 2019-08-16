package com.gofore.movie.review.model;

import java.util.List;

import lombok.Data;

@Data
public class MovieReviewNyt {

	private String status;
	private String copyright;
	private boolean has_more;
	private int num_results;
	private List<Results> results;
}
