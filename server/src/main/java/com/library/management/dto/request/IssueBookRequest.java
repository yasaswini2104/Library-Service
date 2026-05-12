package com.library.management.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IssueBookRequest {
    private Long bookId;
    private Long memberId;
}