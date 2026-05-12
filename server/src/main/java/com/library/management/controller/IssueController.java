package com.library.management.controller;

import com.library.management.dto.request.IssueBookRequest;
import com.library.management.dto.response.ApiResponse;
import com.library.management.dto.response.IssueResponse;
import com.library.management.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @PostMapping("/issue")
    public ApiResponse<IssueResponse> issueBook(
            @RequestBody IssueBookRequest request) {

        return ApiResponse.<IssueResponse>builder()
                .success(true)
                .message("Book issued successfully")
                .data(issueService.issueBook(request))
                .build();
    }

    @PutMapping("/return/{issueId}")
    public ApiResponse<IssueResponse> returnBook(
            @PathVariable Long issueId) {

        return ApiResponse.<IssueResponse>builder()
                .success(true)
                .message("Book returned successfully")
                .data(issueService.returnBook(issueId))
                .build();
    }
}