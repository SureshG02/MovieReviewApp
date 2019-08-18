package com.gofore.movie.review.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * Model to map response coming from nytimes api.
 * @author sugupta
 *
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieReviewNyt {

	private String status;
	private String copyright;
	private boolean has_more;
	private int num_results;
	private List<Results> results;
}
