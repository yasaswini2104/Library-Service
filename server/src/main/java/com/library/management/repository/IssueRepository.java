package com.library.management.repository;

import com.library.management.entity.IssueRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<IssueRecord, Long> {
    long countByMemberMemberIdAndReturnDateIsNull(Long memberId);
    boolean existsByBookBookIdAndReturnDateIsNull(Long bookId);
    List<IssueRecord> findByMemberMemberIdAndReturnDateIsNull(Long memberId);
}