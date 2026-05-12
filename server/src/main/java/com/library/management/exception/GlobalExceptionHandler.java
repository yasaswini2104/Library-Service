package com.library.management.exception;

import com.library.management.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BookUnavailableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<String> handleBookUnavailable(
            BookUnavailableException ex) {

        return ApiResponse.<String>builder()
                .success(false)
                .message(ex.getMessage())
                .data(null)
                .build();
    }

    @ExceptionHandler(MaxBookLimitExceededException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<String> handleMaxBookLimitExceeded(
            MaxBookLimitExceededException ex) {

        return ApiResponse.<String>builder()
                .success(false)
                .message(ex.getMessage())
                .data(null)
                .build();
    }

    @ExceptionHandler(MemberNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<String> handleMemberNotFound(
            MemberNotFoundException ex) {

        return ApiResponse.<String>builder()
                .success(false)
                .message(ex.getMessage())
                .data(null)
                .build();
    }

    @ExceptionHandler(DuplicateMemberException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<String> handleDuplicateMember(
            DuplicateMemberException ex) {

        return ApiResponse.<String>builder()
                .success(false)
                .message(ex.getMessage())
                .data(null)
                .build();
    }

}