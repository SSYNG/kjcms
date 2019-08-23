package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private MyUserDetailsService myUserDetailsService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private MyurlAuthenticationSuccessHandler myurlAuthenticationSuccessHandler;
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
		.antMatchers("/admin/**").hasAnyRole("ADMIN")
		.antMatchers("/user/pub/").hasAnyRole("ADMIN","USER")
		.antMatchers("/static/**","/assets*/**","/user/reg","user/doreg","user/index").permitAll()
		.anyRequest().authenticated()
		.and().formLogin().loginPage("/user/login").permitAll()
		.successForwardUrl("/user/index")
		.successHandler(myurlAuthenticationSuccessHandler)
		.and().logout().permitAll()
		.and()
		.exceptionHandling().accessDeniedPage("/accessDenied")
		.and()
		.csrf().disable();
	}
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(myUserDetailsService).passwordEncoder(passwordEncoder);
	}
}
