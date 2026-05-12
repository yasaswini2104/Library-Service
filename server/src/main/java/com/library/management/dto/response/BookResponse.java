package com.library.management.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookResponse {

    private Long bookId;

    private String title;

    private String author;

    private Boolean availability;
}
