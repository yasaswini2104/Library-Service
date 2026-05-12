package com.library.management.controller;

import com.library.management.dto.request.BookRequest;
import com.library.management.dto.response.ApiResponse;
import com.library.management.dto.response.BookResponse;
import com.library.management.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @PostMapping
    public ApiResponse<BookResponse> addBook(
            @RequestBody BookRequest request) {

        return ApiResponse.<BookResponse>builder()
                .success(true)
                .message("Book added successfully")
                .data(bookService.addBook(request))
                .build();
    }

    @GetMapping
    public ApiResponse<List<BookResponse>> getAllBooks() {

        return ApiResponse.<List<BookResponse>>builder()
                .success(true)
                .message("Books fetched successfully")
                .data(bookService.getAllBooks())
                .build();
    }

    @GetMapping("/available")
    public ApiResponse<List<BookResponse>> getAvailableBooks() {

        return ApiResponse.<List<BookResponse>>builder()
                .success(true)
                .message("Available books fetched successfully")
                .data(bookService.getAvailableBooks())
                .build();
    }

    @GetMapping("/search/title")
    public ApiResponse<List<BookResponse>> searchByTitle(
            @RequestParam String title) {

        return ApiResponse.<List<BookResponse>>builder()
                .success(true)
                .message("Books fetched successfully")
                .data(bookService.searchByTitle(title))
                .build();
    }

    @GetMapping("/search/author")
    public ApiResponse<List<BookResponse>> searchByAuthor(
            @RequestParam String author) {

        return ApiResponse.<List<BookResponse>>builder()
                .success(true)
                .message("Books fetched successfully")
                .data(bookService.searchByAuthor(author))
                .build();
    }
}

