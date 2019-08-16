package com.gofore.movie.review.model;

import lombok.Data;

@Data
public class Link {
	private String type;
	private String url;
	private String suggested_link_text;
}
