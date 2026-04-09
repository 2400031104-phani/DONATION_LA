package com.donatehub.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SuppressWarnings("all")
public class AuthResponse {
    private String token;
    private String type;
    private Long userId;
    private String email;
    private String username;
    private String firstName;
    private String lastName;
    private String role;
}
