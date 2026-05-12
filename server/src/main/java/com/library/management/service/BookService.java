package com.library.management.service;

import com.library.management.dto.request.BookRequest;
import com.library.management.dto.response.BookResponse;
import com.library.management.entity.Book;
import com.library.management.exception.BookNotFoundException;
import com.library.management.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public BookResponse addBook(BookRequest request) {

        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .availability(true)
                .build();

        Book savedBook = bookRepository.save(book);

        return mapToResponse(savedBook);
    }

    public List<BookResponse> getAllBooks() {

        return bookRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<BookResponse> getAvailableBooks() {

        return bookRepository.findByAvailabilityTrue()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<BookResponse> searchByTitle(String title) {

        return bookRepository.findByTitleContainingIgnoreCase(title)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<BookResponse> searchByAuthor(String author) {

        return bookRepository.findByAuthorContainingIgnoreCase(author)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public Book findBookById(Long bookId) {

        return bookRepository.findById(bookId)
                .orElseThrow(() ->
                        new BookNotFoundException("Book not found with ID: " + bookId));
    }

    public void updateAvailability(Long bookId, Boolean availability) {

        Book book = findBookById(bookId);

        book.setAvailability(availability);

        bookRepository.save(book);
    }

    private BookResponse mapToResponse(Book book) {

        return BookResponse.builder()
                .bookId(book.getBookId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .availability(book.getAvailability())
                .build();
    }
}
