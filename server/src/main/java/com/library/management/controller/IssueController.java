package com.library.management.controller;

import com.library.management.dto.request.IssueBookRequest;
import com.library.management.dto.response.ApiResponse;
import com.library.management.dto.response.IssueResponse;
import com.library.management.exception.BookAlreadyReturnedException;
import com.library.management.exception.IssueRecordNotFoundException;
import com.library.management.service.IssueService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
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
    @ExceptionHandler(IssueRecordNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<String> handleIssueRecordNotFound(
        IssueRecordNotFoundException ex) {

        return ApiResponse.<String>builder()
            .success(false)
            .message(ex.getMessage())
            .data(null)
            .build();
    }

    @ExceptionHandler(BookAlreadyReturnedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<String> handleBookAlreadyReturned(
        BookAlreadyReturnedException ex) {

    return ApiResponse.<String>builder()
            .success(false)
            .message(ex.getMessage())
            .data(null)
            .build();
    }
}