package com.library.management.service;

import com.library.management.dto.request.IssueBookRequest;
import com.library.management.dto.response.IssueResponse;
import com.library.management.entity.Book;
import com.library.management.entity.IssueRecord;
import com.library.management.entity.Member;
import com.library.management.exception.BookUnavailableException;
import com.library.management.exception.MaxBookLimitExceededException;
import com.library.management.repository.IssueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;
    private final BookService bookService;
    private final MemberService memberService;

    public IssueResponse issueBook(IssueBookRequest request) {

        Book book = bookService.findBookById(request.getBookId());

        Member member = memberService.findMemberById(request.getMemberId());

        validateBookAvailability(book);

        validateMemberBookLimit(member.getMemberId());

        IssueRecord issueRecord = IssueRecord.builder()
                .book(book)
                .member(member)
                .issueDate(LocalDate.now())
                .build();

        IssueRecord savedIssue = issueRepository.save(issueRecord);

        bookService.updateAvailability(book.getBookId(), false);

        return mapToResponse(savedIssue);
    }

    private void validateBookAvailability(Book book) {

        if (!book.getAvailability()) {
            throw new BookUnavailableException(
                    "Book is currently unavailable");
        }
    }

    private void validateMemberBookLimit(Long memberId) {

        long activeBooks =
                issueRepository.countByMemberMemberIdAndReturnDateIsNull(memberId);

        if (activeBooks >= 3) {
            throw new MaxBookLimitExceededException(
                    "Member already has maximum allowed books");
        }
    }

    public IssueRecord findIssueById(Long issueId) {

        return issueRepository.findById(issueId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Issue record not found with ID: " + issueId));
    }

    private IssueResponse mapToResponse(IssueRecord issueRecord) {

        return IssueResponse.builder()
                .issueId(issueRecord.getIssueId())
                .bookId(issueRecord.getBook().getBookId())
                .bookTitle(issueRecord.getBook().getTitle())
                .memberId(issueRecord.getMember().getMemberId())
                .memberName(issueRecord.getMember().getName())
                .issueDate(issueRecord.getIssueDate())
                .returnDate(issueRecord.getReturnDate())
                .build();
    }
}