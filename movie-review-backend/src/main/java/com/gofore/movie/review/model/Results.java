package com.gofore.movie.review.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Model maps to results field in nyttimes api.
 * @author sugupta
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Results {
	private String display_title;
	private String mpaa_rating;
	private String critics_pick;
	private String byline;
	private String headline;
	private String summary_short;
	private String publication_date;
	private String opening_date;
	private String date_updated;
	private Link link;
	private Multimedia multimedia;

	@Data
	private class Multimedia {
		private String type;
		private String src;
		private int width;
		private int height;
	}

	@Data
	private class Link {
		private String type;
		private String url;
		private String suggested_link_text;
	}
}
