package com.gofore.movie.review.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Link {
	private String type;
	private String url;
	private String suggested_link_text;
}
