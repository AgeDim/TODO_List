package com.example.backtodo.security;

import com.example.backtodo.entity.UserEntity;
import com.example.backtodo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;

@Component
public class JwtFilter extends GenericFilterBean {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void doFilter(javax.servlet.ServletRequest servletRequest, javax.servlet.ServletResponse servletResponse, javax.servlet.FilterChain filterChain) throws IOException, javax.servlet.ServletException {
        String token = jwtUtils.getTokenFromRequest((HttpServletRequest) servletRequest);
        if (token != null && jwtUtils.validateToken(token)) {
            String email = jwtUtils.getEmailFromToken(token);
            UserEntity user = userRepository.findByEmail(email);
            if (user != null) {
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, "", null);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
}