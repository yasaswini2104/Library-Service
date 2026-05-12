package com.library.management.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.management.dto.request.MemberRequest;
import com.library.management.dto.response.ApiResponse;
import com.library.management.dto.response.MemberBookResponse;
import com.library.management.dto.response.MemberResponse;
import com.library.management.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ApiResponse<MemberResponse> registerMember(
            @RequestBody MemberRequest request) {

        return ApiResponse.<MemberResponse>builder()
                .success(true)
                .message("Member registered successfully")
                .data(memberService.registerMember(request))
                .build();
    }

    @GetMapping("/{memberId}")
    public ApiResponse<MemberResponse> getMemberById(
            @PathVariable Long memberId) {

        return ApiResponse.<MemberResponse>builder()
                .success(true)
                .message("Member fetched successfully")
                .data(memberService.getMemberById(memberId))
                .build();
    }

    @GetMapping("/{memberId}/books")
    public ApiResponse<List<MemberBookResponse>> getBooksIssuedToMember(
            @PathVariable Long memberId) {

        return ApiResponse.<List<MemberBookResponse>>builder()
                .success(true)
                .message("Issued books fetched successfully")
                .data(memberService.getBooksIssuedToMember(memberId))
                .build();
    }
}
