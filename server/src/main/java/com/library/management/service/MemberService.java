package com.library.management.service;

import com.library.management.dto.request.MemberRequest;
import com.library.management.dto.response.MemberBookResponse;
import com.library.management.dto.response.MemberResponse;
import com.library.management.entity.IssueRecord;
import com.library.management.entity.Member;
import com.library.management.exception.DuplicateMemberException;
import com.library.management.exception.MemberNotFoundException;
import com.library.management.repository.IssueRepository;
import com.library.management.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final IssueRepository issueRepository;

    public MemberResponse registerMember(MemberRequest request) {

        if (memberRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateMemberException(
                    "Member already exists with email: " + request.getEmail());
        }

        Member member = Member.builder()
                .name(request.getName())
                .email(request.getEmail())
                .build();

        Member savedMember = memberRepository.save(member);

        return mapToResponse(savedMember);
    }

    public MemberResponse getMemberById(Long memberId) {

        Member member = findMemberById(memberId);

        return mapToResponse(member);
    }

    public Member findMemberById(Long memberId) {

        return memberRepository.findById(memberId)
                .orElseThrow(() ->
                        new MemberNotFoundException(
                                "Member not found with ID: " + memberId));
    }

    public List<MemberBookResponse> getBooksIssuedToMember(Long memberId) {
        findMemberById(memberId);
        List<IssueRecord> issueRecords =
                issueRepository.findByMemberMemberIdAndReturnDateIsNull(memberId);

        return issueRecords.stream()
                .map(issue -> MemberBookResponse.builder()
                        .bookId(issue.getBook().getBookId())
                        .title(issue.getBook().getTitle())
                        .author(issue.getBook().getAuthor())
                        .build())
                .toList();
    }

    private MemberResponse mapToResponse(Member member) {

        return MemberResponse.builder()
                .memberId(member.getMemberId())
                .name(member.getName())
                .email(member.getEmail())
                .build();
    }
}
